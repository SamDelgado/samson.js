
module.exports = {

  el: 'samson_sidemenu',
  template: require("./template.jade"),
  style: {

    "#samson_sidemenu": {
      "position": "absolute",
      "z-index": 11,
      "left": "-240px",
      "top": "60px",
      "bottom": "0",
      "width" : "240px",
      "background-color": Colors.gray,
      "transition": "all 0.2s ease-in-out",
      "Transform": "translate3d(0,0,0)"
    },

    "#samson_sidemenu.open": {
      "Transform": "translate3d(240px,0,0)"
    },

    ".sidemenu_item": {
      width: "100%",
      padding: "5px 0 5px 0",
      color: Colors.white,
      "text-align": "center",
      "font-size": "2rem"
    },

    ".sidemenu_item:active": {
      "background-color": Colors.turquoise
    }

  },

  domEvents: {

    'touch' : function(event) {
      console.log("SideMenu Hit");
    },

    'touch .sidemenu_item': function(event) {

      this.element.classList.remove("open");
      App.emit("faded-overlay:hide");

      var page = event.target.getAttribute("data-page");

      // only navigate if they aren't on the page
      if (page !== App.Router.currentPage) {
        App.Router.navigate(page, "right");
      }

    }

  },

  appEvents: {

    'header-button:hit': function() {
      this.handleSideMenu();
    },

    'faded-overlay:hit': function() {
      this.element.classList.remove("open");
    }

  },

  extend: {
    handleSideMenu: function() {

      // if the sidemenu is closed then open it, if open then close it
      if (this.element.classList.contains("open")) {
        this.element.classList.remove("open");
      } else {
        this.element.classList.add("open");
      }
    }
  },

  router: {
    beforeAnimate: function(data, callback) {

      callback();
    },

    duringAnimate: function(data) { // no callback

    }
  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {

      pages: [
        {page:"home", display:"Home"},
        {page:"login", display:"Login"}
      ]

    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the sidemenu element
    App.DOM.samson_sidemenu = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the sidemenu element from the cache
    delete App.DOM.samson_sidemenu;

    callback();

  }

};
