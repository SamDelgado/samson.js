
module.exports = {

  name: 'home',
  subPageOf: false,
  previousPage: false,
  template: require("./template.jade"),
  style: {

    "#home-page": {
      position: "absolute",
      width: "100%",
      height: "100%"
    },

    ".home-page-title": {
      "width": "100%",
      "font-size": "3rem",
      "text-align": "center",
      "color": Colors.turquoise
    }

  },

  domEvents : {

    'touch' : function(event, target) {
      console.log("Home Page hit");
    }

  },

  appEvents : {

  },

  extend : {

  },

  components : {

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      name: "Home Page"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    App.Data.HeaderTitle = "Home";

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    //this.topBox.off('clicked');

    callback();

  }

};
