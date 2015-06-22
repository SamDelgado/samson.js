
function setHeaderHeight() {
  var max = 200; min = 50;
  return (Math.floor(Math.random()*(max-min+1) + min)) + "px";
}

var header_height = setHeaderHeight();

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
      "height": "60px",
      "line-height": "60px",
      "width": "50%",
      "Transform": "translate(-50%,-50%)",
      "color": "#ffffff",
      "font-size": "3rem",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

  domEvents: {

    'touch' : function(event) {
      console.log("Header Hit");
    }

  },

  appEvents: {

    'app:initialized': function() {
      App.emit('header:show');
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
      if (App.router.pageCache[data.nextPage].fullscreen) {
        App.DOM[data.inactivePageElement].style.top = "";
        this.handleHeader("remove");
      } else {
        App.DOM[data.inactivePageElement].style.top = this.headerHeight;
        this.handleHeader("add");
      }

      callback();
    },
    duringAnimate: function(data) { // no callback
      this.setState({title: data.nextPage});
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

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // cache the header element
    App.DOM.samson_header = this.element;

    callback();

  }

};
