var Samson = require('../samson');
var Async = require('async-lite');
var Utils = require('../utils');
var createRouter = require('../createRouter');
var createComponent = require('../createComponent');

// Reserved properties for the Samson.App object. All properties starting with _ are also reserved
var reserved_props = ["$", "DOM", "Config", "Data", "styleSheet", "baseStyle", "style", "Components", "setComponents", "Router", "Pages", "do", "on", "emit", "off"];

// Configures and returns the Samson.App object
module.exports = function createApp(options, callback) {

    if (Samson.App._isConfigured === true) {

      throw new Error("You have already created a Samson App. Everything is going to break now.");

    } else {

      /**** Configure the Samson App ****/

      // setup the app's data
      Samson.App.Data = options.Data || options.data || {};

      // setup the app's custom config
      Samson.App.Config = options.Config || options.config || {};

      // setup the app's pages
      Samson.App.Pages = options.Pages || options.pages || {};

      // setup the app's base components
      Samson.App.setComponents = options.setComponents || function() { return (options.Components || options.components || {}); };
      Samson.App._components = Samson.App.setComponents();
      Samson.App.Components = {};

      /* First setup the required DOM elements and components of a Samson App */

      // add the core divs to the body
      // #samson_app, #samson_pages, #samson_page_1, #samson_page_2, #samson_faded_overlay, #samson_transparent_overlay
      Samson.App.DOM.samson_app = document.createElement("div");
      Samson.App.DOM.samson_app.id = "samson_app";

      Samson.App.DOM.samson_pages = document.createElement("div");
      Samson.App.DOM.samson_pages.id = "samson_pages";

      Samson.App.DOM.samson_page_1 = document.createElement("div");
      Samson.App.DOM.samson_page_1.id = "samson_page_1";
      Samson.App.DOM.samson_page_1.classList.add("samson_page", "active");
      Samson.App.DOM.samson_pages.appendChild(Samson.App.DOM.samson_page_1);

      Samson.App.DOM.samson_page_2 = document.createElement("div");
      Samson.App.DOM.samson_page_2.id = "samson_page_2";
      Samson.App.DOM.samson_page_2.classList.add("samson_page");
      Samson.App.DOM.samson_pages.appendChild(Samson.App.DOM.samson_page_2);

      Samson.App.DOM.samson_app.appendChild(Samson.App.DOM.samson_pages);

      document.body.appendChild(Samson.App.DOM.samson_app); // add the base divs to the body

      // setup the app's router after loading any extra components
      Samson.App.Router = createRouter(options.Router || options.router || {});

      // add any unreserved properties passed into the custom/extend object
      var custom = options.Extend || options.extend || options.Custom || options.custom || {};
      Utils.extend(Samson.App, custom, reserved_props);

      // Load any other components
      var keys = Object.keys(Samson.App._components);
      Async.each(keys, function(key, cb) {

        Samson.App.Components[key] = createComponent(Samson.App._components[key], false);
        Samson.App.Components[key].parent = {element: Samson.App.DOM.samson_app, delegate: Samson.App.$(Samson.App.DOM.samson_app)};

        Samson.App.Components[key]._render(false, null, function() {
          cb();
        });

      }, function() {

        // the Samson App is now configured
        Samson.App._isConfigured = true;

        // if App is global then don't return the App object in the callback
        if (Samson.App._isGlobal === true) {
          callback();
        } else {
          callback(Samson.App);
        }

      });

    }

};
