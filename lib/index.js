/*!
 * Samson.js
 * Copyright(c) 2016 Sam Delgado
 * MIT Licensed
 */

// require jquery and jquery-touch-events
global.$ = require('jquery');
require('jquery-touch-events');

// create the Samson object that will be exported
module.exports = Samson = {};

// make Samson global
global.Samson = Samson;

// keep version in sync with package.json
Samson.VERSION = '0.3.0';

// make the App object global by default
Samson.IS_GLOBAL = true;

// attach jQuery to Samson
Samson.$ = global.$;

// attach async-lite to Samson
Samson.Async = require('async-lite');

// Samson.DOM will cache references to any Samson created DOM elements like #samson_app
Samson.DOM = {};

// the instantiated app will be attached to Samson.App for quick access
Samson.App;

// attach the Events mixin that adds on, off, and emit methods to an object
Samson.Events = require('./events');

// attach the Router constructor function
Samson.Router = require('./router');
Samson.createRouter = function(options) {
  var router = new Samson.Router(options);
  return router;
};

// attach the Component constructor function
Samson.Component = require('./component');
Samson.createComponent = function(options, add_events) {
  var component = new Samson.Component(options);
  if (add_events) Samson.Events(component);
  return component;
};

// attach the App constructor function
Samson.SamsonApp = require('./app');
Samson.createApp = function(options, callback) {

  if (Samson.App) {
    console.err("You have already created a Samson App object");
    callback();
  } else {
    Samson.App = new Samson.SamsonApp();
    Samson.Events(Samson.App); // make the main app object an event bus
    Samson.App.DOM = Samson.DOM;

    // make the App object global by default
    Samson.IS_GLOBAL = options.isGlobal === false ? false : true;
    if (Samson.IS_GLOBAL) { global.App = Samson.App; }

    Samson.App.configure(options, function() {

      // if the App object is global then don't return it in the callback
      if (Samson.IS_GLOBAL) {
        callback();
      } else {
        callback(Samson.App);
      }
    });

  }

};
