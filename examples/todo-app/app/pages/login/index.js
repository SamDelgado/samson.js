
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
      height: "100%"
    },

    ".login-page-title": {
      "width": "100%",
      "font-size": "3rem",
      "text-align": "center",
      "color": Colors.blue
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    'touch' : function(event, target) {
      console.log("Login Page hit");
    }

  },

  appEvents : {
  },

  setComponents : function() {

    var components = {};

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

    App.Data.HeaderTitle = "Login";

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
