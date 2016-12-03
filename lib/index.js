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

// keep version in sync with package.json
Samson.VERSION = '0.3.2';

// make Samson global
global.Samson = Samson;

// attach jQuery to Samson
Samson.$ = global.$;

// attach async-lite to Samson
Samson.Async = require('async-lite');

// attach the App constructor function
Samson.SamsonApp = require('./app');

// instantiate the app at Samson.App and make it global
global.App = Samson.App = new Samson.SamsonApp();

// Samson.DOM will cache references to any Samson created DOM elements like #samson_app
Samson.App.DOM = Samson.DOM = {};

// attach the Events mixin that adds on, off, and emit methods to an object
Samson.Events = require('./events');

// make the main app object an event bus
Samson.Events(Samson.App);

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

Samson.createApp = function(options, callback) {

  if (!Samson.App._isConfigured) {

    Samson.App.configure(options, function() {
      callback(); // the App object is global so don't return it in the callback
    });

  } else {
    throw new Error("You have already created a Samson App. Everything is going to break now.");
  }

};
