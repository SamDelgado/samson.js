var Samson = require('../index');
var Async = require('async-lite');
var Utils = require('../utils');
var createRouter = require('../createRouter');
var createComponent = require('../createComponent');

// Reserved properties for the Samson.App object. All properties starting with _ are also reserved
var reserved_props = ["$", "DOM", "Config", "Data", "styleSheet", "baseStyle", "style", "Components", "setComponents", "Router", "Pages", "do", "on", "emit", "off"];

var APP = Samson.App;

// Configures and returns the Samson.App object
module.exports = function createApp(options, callback) {

    if (APP._isConfigured === true) {

      throw new Error("You have already created a Samson App. Everything is going to break now.");

    } else {

      /**** Configure the Samson App ****/

      // setup the app's data
      APP.Data = options.Data || options.data || {};

      // setup the app's custom config
      APP.Config = options.Config || options.config || {};

      // setup the app's pages
      APP.Pages = options.Pages || options.pages || {};

      // setup the app's base components
      APP.setComponents = options.setComponents || function() { return (options.Components || options.components || {}); };
      APP._Components = this.setComponents();

      /* First setup the required DOM elements and components of a Samson App */

      // add the core divs to the body
      // #samson_app, #samson_pages, #samson_page_1, #samson_page_2, #samson_faded_overlay, #samson_transparent_overlay
      APP.DOM.samson_app = document.createElement("div");
      APP.DOM.samson_app.id = "samson_app";

      APP.DOM.samson_pages = document.createElement("div");
      APP.DOM.samson_pages.id = "samson_pages";

      APP.DOM.samson_page_1 = document.createElement("div");
      APP.DOM.samson_page_1.id = "samson_page_1";
      APP.DOM.samson_page_1.classList.add("samson_page", "active");
      APP.DOM.samson_pages.appendChild(APP.DOM.samson_page_1);

      APP.DOM.samson_page_2 = document.createElement("div");
      APP.DOM.samson_page_2.id = "samson_page_2";
      APP.DOM.samson_page_2.classList.add("samson_page");
      APP.DOM.samson_pages.appendChild(APP.DOM.samson_page_2);

      APP.DOM.samson_app.appendChild(APP.DOM.samson_pages);

      document.body.appendChild(APP.DOM.samson_app); // add the base divs to the body

      // setup the app's router after loading any extra components
      APP.Router = createRouter(options.Router || options.router || {});

      // add any unreserved properties passed into the custom/extend object
      var custom = options.Extend || options.extend || options.Custom || options.custom || {};
      Utils.extend(APP, custom, reserved_props);

      // Load any other components
      var keys = Object.keys(APP._Components);
      Async.each(keys, function(key, cb) {

        APP.Components[key] = createComponent(APP._Components[key], false);
        APP.Components[key].parent = {element: APP.DOM.samson_app, delegate: $(APP.DOM.samson_app)};

        APP.Components[key]._render(false, null, function() {
          cb();
        });

      }, function() {

        // the Samson App is now configured
        APP._isConfigured = true;

        // if App is global then don't return the App object in the callback
        if (APP._isGlobal === true) {
          callback();
        } else {
          callback(APP);
        }

      });

    }

};
