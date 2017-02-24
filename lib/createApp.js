var Samson = require('./index');
var Utils = require('./utils');
var addEvents = require('./addEvents'); // Events mixin that adds on, off, and emit methods to an object
//var createRouter = require('./createRouter');

var Async = require('async-lite'); // async helper functions
var Gator = require('gator'); // event delegation

// Bundle the Config, Components, Controllers, Modules, and Pages straight from their respective app folders so the user doesn't have to worry about it
var Setup = require('samson');
var Config = Setup.Config;
var Components = Setup.Components;
var Controllers = Setup.Controllers;
var Modules = Setup.Modules;
var Pages = Setup.Pages;

// Reserved properties for the app object. All properties starting with _ are also reserved
var reserved_props = ["DOM", "Config", "Data", "styleSheet", "baseStyle", "style", "Components", "setComponents", "Controllers", "Router", "Pages", "on", "emit", "off"];

// Configures and returns the app object
module.exports = function createApp(callback) {

  if (App._isConfigured === true) {

    Samson.log("You have already created a Samson App. Everything is going to break now.");

  } else {

    /**** Configure the Samson App ****/

    // Make the app object an event bus
    addEvents(App);

    // setup where cached DOM objects are stored
    App.DOM = {};

    // setup the app's data
    App.Data = Config.data || {};

    // setup the app's custom config
    App.Config = Config.custom || {};

    // setup the app's controllers
    App.Controllers = Controllers || {};

    // setup the app's pages
    App.Pages = Pages || {};

    // setup the app's base components
    App.setComponents = Config.setComponents || function() { return (Components || {}); };
    App._components = App.setComponents();
    App.Components = {};

    /* First setup the required DOM elements and components of a Samson App */

    // add the core divs to the body
    // #samson_app, #samson_pages, #samson_page_1, #samson_page_2, #samson_faded_overlay, #samson_transparent_overlay
    App.DOM.samson_app = document.createElement("div");
    App.DOM.samson_app.id = "samson_app";

    App.DOM.samson_pages = document.createElement("div");
    App.DOM.samson_pages.id = "samson_pages";

    App.DOM.samson_page_1 = document.createElement("div");
    App.DOM.samson_page_1.id = "samson_page_1";
    App.DOM.samson_page_1.classList.add("samson_page", "active");
    App.DOM.samson_pages.appendChild(App.DOM.samson_page_1);

    App.DOM.samson_page_2 = document.createElement("div");
    App.DOM.samson_page_2.id = "samson_page_2";
    App.DOM.samson_page_2.classList.add("samson_page");
    App.DOM.samson_pages.appendChild(App.DOM.samson_page_2);

    App.DOM.samson_app.appendChild(App.DOM.samson_pages);

    document.body.appendChild(App.DOM.samson_app); // add the base divs to the body

    // setup the app's router after loading any extra components
    App.Router = Samson.createRouter(Config.router || {});

    // add any unreserved properties to the app object that were passed into the extend property of the Config object
    var custom = Config.extend;
    if (custom) Utils.extend(App, custom, reserved_props);

    // add any Modules that will live directly on the App namespace
    if (Modules) Utils.extend(App, Modules, reserved_props);

    // setup the Samson App delegate for DOM event listeners
    App.delegate = Gator(App.DOM.samson_app);

    // Load any other components
    var keys = Object.keys(App._components);
    Async.each(keys, function(key, cb) {

      App.Components[key] = Samson.createComponent(App._components[key], false);
      App.Components[key].parent = {element: App.DOM.samson_app, delegate: App.delegate};

      App.Components[key]._render(false, null, function() {
        cb();
      });

    }, function() {

      // the Samson App is now configured
      App._isConfigured = true;

      callback();

    });

  }

};
