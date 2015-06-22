
module.exports = {

  el: 'home-top-box',
  template: require("./template.jade"),
  style: require('./style'),

  events : {

    'touch' : function topBoxClick(event, target) {
      App.emit("topBox:clicked", "Home Top Box was clicked");
    },

    'touch #blackBox' : function blackBoxClick(event, target) {
      console.log("Home Black Box hit");
    }

  },

  custom : {

    size: "huge"

  },

  components : {
    blackBox : require("./blackBox")
  },

  // must return an object that will set the initial state of the component. this object will be passed to the templating engine
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
