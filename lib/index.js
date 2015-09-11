/*!
 * Samson.js
 * Copyright(c) 2015 Sam Delgado
 * MIT Licensed
 */

// create the Samson object that will be exported
module.exports = Samson = {};

Samson.VERSION = '0.2.9'; // keep in sync with package.json

// attach jQuery to Samson
if ($ || jQuery) {
  Samson.$ = $ || jQuery;
} else {

  if (typeof exports === 'object') {
    Samson.$ = require('jquery');
  } else {
    throw new Error("Samson requires jQuery to function!");
  }

}

Samson.Events = require('./events'); // a mixin that will attach on, off, and emit methods to an object

Samson.Router = require('./router');
Samson.createRouter = function(options) {
  var router = new Samson.Router(options);
  return router;
};

Samson.Component = require('./component');
Samson.createComponent = function(options, add_events) {
  var component = new Samson.Component(options);
  if (add_events) Samson.Events(component);
  return component;
};

// Samson.DOM will cache references to any Samson created DOM elements like #samson_app
Samson.DOM = {};

// the instantiated app will be attached to Samson.App for quick access
Samson.App;

// only one Samson App can exist at a time, so if one has already been created, simply return it
Samson.createApp = function() {
  if (Samson.App) {
    return Samson.App;
  } else {
    Samson.App = new SamsonApp();
    Samson.Events(Samson.App); // make the main app object an event bus
    Samson.App.DOM = Samson.DOM;
    Samson.App.Data = {};
    return Samson.App;
  }
};

// the SamsonApp class
function SamsonApp() {
  this._isConfigured = false;
}

// reserved properties for the Samson.App object. all properties starting with _ are also reserved
var reserved_props = ["$", "DOM", "Async", "Data", "styleSheet", "baseStyle", "style", "components", "setComponents", "Router", "Pages", "do", "on", "emit", "off"];

var Utils = require('./utils');
var async = require('async-lite');

SamsonApp.prototype.configure = function(options, callback) {

  var self = this;

  if (!this._isConfigured) {

    // add jQuery to the app object for quick access
    this.$ = Samson.$;

    // setup the app's pages
    this.Pages = options.Pages || options.pages || {};

    // setup the app's base components
    this.setComponents = options.setComponents || function() { return (options.components || {}); };
    this.components = this.setComponents();

    /* First setup the required DOM elements and components of a Samson App */

    // add the core divs to the body
    // #samson_app, #samson_pages, #samson_page_1, #samson_page_2, #samson_faded_overlay, #samson_transparent_overlay
    Samson.DOM.samson_app = document.createElement("div");
    Samson.DOM.samson_app.id = "samson_app";

    Samson.DOM.samson_pages = document.createElement("div");
    Samson.DOM.samson_pages.id = "samson_pages";

    Samson.DOM.samson_page_1 = document.createElement("div");
    Samson.DOM.samson_page_1.id = "samson_page_1";
    Samson.DOM.samson_page_1.classList.add("samson_page", "active");
    Samson.DOM.samson_pages.appendChild(Samson.DOM.samson_page_1);

    Samson.DOM.samson_page_2 = document.createElement("div");
    Samson.DOM.samson_page_2.id = "samson_page_2";
    Samson.DOM.samson_page_2.classList.add("samson_page");
    Samson.DOM.samson_pages.appendChild(Samson.DOM.samson_page_2);

    Samson.DOM.samson_app.appendChild(Samson.DOM.samson_pages);

    document.body.appendChild(Samson.DOM.samson_app); // add the base divs to the body

    // setup the app's router after loading any extra components
    this.Router = Samson.createRouter(options.Router || options.router || {});

    // add any unreserved properties passed into the custom/extend object
    var custom = options.extend || options.custom || {};
    Utils.extend(this, custom, reserved_props);

    // Load any other components
    var keys = Object.keys(self.components);
    async.each(keys, function(key, cb) {

      self[key] = Samson.createComponent(self.components[key]);
      self[key].parent = {element: Samson.DOM.samson_app, delegate: $(Samson.DOM.samson_app)};

      self[key]._render(false, null, function() {
        cb();
      });

    }, function() {

      // the Samson App is now configured
      self._isConfigured = true;

      if (callback) callback();

    });

  } else {
    throw new Error("This Samson App has already been configured!");
  }

};
