/*!
 * Samson.js
 * Copyright(c) 2016 Sam Delgado
 * MIT Licensed
 */

// require jquery and jquery-touch-events
var $ = require('jquery');
var loadTouchEvents = require('jquery-touch-events');
loadTouchEvents($);

var Samson = require('./samson');

// Instantiate Samson App object
var instantiateApp = require('./app/instantiate'); // function that creates the base Samson.App object
Samson.App = instantiateApp();
Samson.App.$ = $; // attach jQuery to Samson.App

// Custom Logging prefixed with [Samson]
Samson.log = console.log.bind(console, '[Samson]');

Samson.createComponent = require('./createComponent');
Samson.createRouter = require('./createRouter');

// Create and configure the Samson.App object
Samson.createApp = require('./app/create');

module.exports = function loadSamson(GLOBAL_APP_NAME) {

  // If typeof GLOBAL_APP_NAME === 'string', make the specified name a global object
  // If typeof GLOBAL_APP_NAME === true, make 'App' a global object
  if (GLOBAL_APP_NAME) {
    Samson.App._isGlobal = true;
    GLOBAL_APP_NAME = typeof GLOBAL_APP_NAME === 'string' ? GLOBAL_APP_NAME : 'App';
    global[GLOBAL_APP_NAME] = Samson.App;
  }

  return Samson;

};
