
module.exports = {

  name: 'home',
  subPageOf: false,
  previousPage: false,
  template: require("./template.jade"),
  style: {

    "#home-page": {
      position: "absolute",
      width: "100%",
      height: "100%",
      "background-color": Colors.lightGray,
      "text-align": "center",
      color: "white",
      "font-size": "4rem"
    }

  },

  domEvents : {

    'touch' : function clickHomePage(event, target) {
      this.customHandler();
    }

  },

  appEvents : {

    'topBox:clicked': function(data, event) {
      console.log(data);
    }

  },

  extend : {

    customHandler: function() {
      console.log("Custom handler called. Home Page hit");
    }

  },

  components : {

    topBox : require('./topBox'),
    blueBox : require('./blueBox')
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
