
module.exports = {

  name: 'login',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),
  style: {

    "#login-page": {
      position: "absolute",
      width: "100%",
      height: "100%",
      "background-color": Colors.lightGray,
      "text-align": "center",
      color: "white",
      "font-size": "4rem"
    }

  },

  extend: {
    fullscreen: true,
  },

  events : {

  },

  appEvents : {
    'something' : function() {
      App.router.navigate("home");
    }
  },

  setComponents : function() {

    var components = {};
    components.redBox = require('./redBox');

    if (App.models.show_top_box) {
      components.topBox = require('./topBox');
    }

    return components;

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      name: "Login Page"
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

    callback();

  }

};
