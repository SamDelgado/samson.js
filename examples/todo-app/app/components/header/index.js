
function setHeaderHeight() {
  var max = 200; min = 50;
  return (Math.floor(Math.random()*(max-min+1) + min)) + "px";
}

var header_height = "60px";// setHeaderHeight();

module.exports = {

  el: 'samson_header',
  template: require("./template.jade"),
  style: {

    "#samson_header": {
      "position": "absolute",
      "left": "0",
      "right": "0",
      "top": "0",
      "height": header_height,
      "z-index": 3,
      "box-shadow": "0 0 8px rgba(0,0,0,0.3)",
      "opacity": 1,
      "background-color": "#000000",
      "transition": "all 0.6s ease",
      "Transform": "translate3d(0,-" + header_height + ",0)"
    },

    "#samson_header.show": {
      "opacity": 1,
      "Transform": "translate3d(0,0,0)"
    },

    "#samson_header_title": {
      "position": "absolute",
      "left": "50%",
      "top": "50%",
      "height": "40px",
      "line-height": "40px",
      "width": "60%",
      "Transform": "translate(-50%,-50%)",
      "color": "#ffffff",
      "font-size": "3rem",
      "text-align": "center",
      "vertical-align": "middle"
    },

    "#samson_header_button": {
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "height": "40px",
      "line-height": "40px",
      "width": "40px",
      "color": "#ffffff",
      "font-size": "4rem",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

  domEvents: {

    'touch' : function(event) {
      console.log("Header Hit");
    },

    'touch #samson_header_button': function() {
      App.emit('header-button:hit');
    }

  },

  appEvents: {

    'app:initialized': function() {
      this.handleHeader("add");
    },

    'header:show': function() {
      this.handleHeader("add");
    },

    'header:hide': function() {
      this.handleHeader("remove");
    }

  },

  extend: {
    headerHeight: header_height,
    handleHeader: function(kind) {
      this.element.classList[kind]("show");
    }
  },

  router: {
    beforeAnimate: function(data, callback) {

      // if the page is fullscreen, then hide the header and stretch the page to the top of the screen
      if (App.Router.pageCache[data.nextPage].fullscreen) {
        App.DOM[data.inactivePageElement].style.top = "";
        this.handleHeader("remove");
      } else {
        App.DOM[data.inactivePageElement].style.top = this.headerHeight;
        this.handleHeader("add");
      }

      callback();
    },

    duringAnimate: function(data) { // no callback
      this.setState({title: App.Data.HeaderTitle});
    }
  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      title: "Header"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    if (!App.Data.HeaderTitle) {
      App.Data.HeaderTitle = "Home";
    }

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the header element
    App.DOM.samson_header = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the header element from the chache
    delete App.DOM.samson_header;

    callback();

  }

};
