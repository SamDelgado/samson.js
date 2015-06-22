
module.exports = {

  el: 'blueBox',
  template: require("./template.jade"),
  style: require('./style'),

  events : {

    'touch' : function(event) {
      App.router.navigate("login");
    }

  },

  components : {},

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      printDate : Date.now(),
      name: "sam"
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
