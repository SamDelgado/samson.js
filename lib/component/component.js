var Utils = require('../utils');

var reserved_props = ["path", "el", "element", "tag", "template", "subPageOf", "previousPage", "backAnimation", "style", "Components", "events", "DOMEvents", "AppEvents", "state", "setState", "resetState", "setInitialState", "beforeRender", "afterRender", "onLoad", "beforeRemove", "render", "parent", "on", "emit", "off"];
var on_capture_events = ['blur', 'error', 'focus', 'load', 'resize', 'scroll'];

// cache these functions for performance
function justCallback(cb) { cb(); }
// function justCallbackTrue(cb) { cb(true); }
function justReturnObject() { return {}; }

function SamsonComponent(options) {

  var self = this;

  this.isPage = options.isPage || false;

  if (this.isPage) {

    // set the path of the page
    this.path = options.path;

    // subPageOf is false if it is a top-level page, otherwise it is the name of the top-level page it is linked to
    this.subPageOf = options.subPageOf || false;

    // set the previousPage if it is specified
    this.previousPage = options.previousPage || false;

    // set the backAnimation if it is specified
    this.backAnimation = options.backAnimation || false;

    // set backSafe if it is specified
    this.backSafe = options.backSafe || false;

    // set the element's selector that will determine where the component is rendered
    this._name = this.path;

    // set the onLoad function if one is specified - it is an alias for the router event "afterAnimate" and only applies to pages
    this.onLoad = options.onLoad; // there is no callback needed

  } else {

    // set the element's selector that will determine where the component is rendered
    this.el = (options.el.charAt(0) === "#") ? options.el.slice(1) : options.el;
    this._name = this.el;

    // set the element's tag
    this.tag = options.tag || "div";

  }

  // set the component event listeners if they are specified
  this.events = option.events || {};
  this.AppEvents = [];
  this.DOMEvents = [];
  this._loadedAppEvents = [];
  this._loadedDOMEvents = [];

  var event_keys = Object.keys(this.events);

  if (event_keys.length) {

    event_keys.forEach(function(event_key) {

      var event = {};

      // check to see if the event is an AppEvent or DOMEvent
      if (event_key.charAt(0) === '@') { // app event because it start with the '@' symbol

        event.type = event_key.slice(1);
        event.handler = self.events[event_key];

        self.AppEvents.push(event);

      } else {

        // it is a DOMEvent so let's extract the event type and selector
        var split_event = event_key.split(" ");
        event.type = split_event.shift();
        event.selector = split_event.length > 1 ? split_event.join(" ") : split_event[0];
        if (!event.selector) event.selector = (self.isPage === true) ? false : "#" +  self.el;

        event.handler = function eventHandler(e) { // we inject the current component as 'this' in the event's handler
          self.events[event_key].call(self, e, this);
        };

        event.onCapture = on_capture_events.indexOf(event.type) !== -1; // determine if the event should listen to the capturing or bubbling phase

        self.DOMEvents.push(event);

      }

    });

  }

  // subcomponents
  this.setComponents = options.setComponents || function() { return (options.components || {}); };
  this._components = this.setComponents();
  this._componentsLoaded = false;
  this.Components = {};

  // setInitialState function
  this.setInitialState = options.setInitialState || justReturnObject;
  this.state = {};
  this._initialStateSet = false;
  this._stateChanged = false;

  // set the component's render function that will output an html string
  // if no render function was passed in, we check for a template function
  this._template = options.render || options.template;

  // set the beforeRender function if one is specified
  this.beforeRender = options.beforeRender || justCallback;

  // set the afterRender function if one is specified
  this.afterRender = options.afterRender || justCallback;

  // set the beforeRemove function if one is specified, otherwise just invoke callback
  this.beforeRemove = options.beforeRemove || justCallback;

  // set the afterRemove function if one is specified, otherwise just invoke callback
  this.afterRemove = options.afterRemove || justCallback;

  // add any router related tasks
  this._uuid = this._name + "-" + Date.now(); // the uuid allows us to easily reference the added router tasks
  this._router = options.Router || options.router || {};

  // if the page specified an onLoad event, then override the 'afterAnimate' event
  if (this.onLoad) this._router.afterAnimate = this.onLoad;

  Utils.loadRouterEvents(this);

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  Utils.extend(this, custom, reserved_props);

};

module.exports = SamsonComponent;
