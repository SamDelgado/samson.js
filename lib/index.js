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

// Create and configure the Samson.App object
Samson.createApp = require('./app/create');

module.exports = function loadSamson(MAKE_APP_GLOBAL) {

  // If MAKE_APP_GLOBAL === true, make App a global object
  if (MAKE_APP_GLOBAL === true) {
    Samson.App._isGlobal = true;
    global.App = Samson.App;
  }

  return Samson;

};
