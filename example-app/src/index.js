
/* GLOBALS: App */

var Samson = require('samson.js');

var SamsonAppConfig = require('config');

var App = Samson.createApp(SamsonAppConfig);

module.exports = App;

// Make 'App' global for quick access
global.App = App;

DEBUG && App.log("Prepare to launch");

App.launch();
