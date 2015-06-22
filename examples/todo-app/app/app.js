
var Log = require('modules/log');
var Samson = require('samson.js');

// pass in the name of the app object if you want it added to the global scope
var App = Samson.createApp("App");

// add the app name to the global scope if name is passed in
global.App = App;
window.App = App;

global.Colors = require('common/colors');

// Samson App options
var options = {

  style : require('common/styles'),

  components : require('components'),

  pages: require("pages"),

  // any custom methods/properties you want attached directly to the app object. the context will be the app object
  custom: {
    models : {},
    collections : {}
  },

  router : {
    animations: require("common/router_animations"),
    defaultNavigateAnimation: "right",
    defaultBackAnimation: "left",
    beforeNavigate: function(data, callback) {
      var error = "You suck at navigating";
      //callback(error); // pass error message through to stop the router navigation from completing
      callback();
    },
    afterNavigate: function(data, callback) {
      callback();
    },
    beforeAnimate: function(data, callback) {
      callback();
    },
    duringAnimate: function(data) { // no callback
      //Log("Router during animate");
    },
    afterAnimate: function(data, callback) {
      callback();
    },
    beforeBack: function(data, callback) {
      callback();
    },
    afterBack: function(data, callback) {
      callback();
    }
  }

};

App.configure(options, function() {

  // The Samson App is now configured and ready to use
  Log("Samson app has been initialized");

  var startApp = require('./init');

  // if we detect cordova then wait for the deviceready event
  if (typeof window.cordova === 'object') {

    document.addEventListener('deviceready', function () {
      Log("Device is now ready");
      startApp();
    }, false);

  } else {

    startApp();

  }

});
