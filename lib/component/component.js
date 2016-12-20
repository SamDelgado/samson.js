var Utils = require('../utils');

var reserved_props = ["path", "el", "element", "template", "subPageOf", "previousPage", "backAnimation", "style", "Components", "events", "domEvents", "appEvents", "state", "setState", "resetState", "setInitialState", "beforeRender", "afterRender", "beforeRemove", "render", "parent", "on", "emit", "off"];

// cache these functions for performance
function justCallback(cb) { cb(); }
// function justCallbackTrue(cb) { cb(true); }
function justReturnObject() { return {}; }

function SamsonComponent(options) {

  this.isPage = options.isPage;

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

  } else {

    // set the element's selector that will determine where the component is rendered
    this.el = (options.el.charAt(0) === "#") ? options.el.slice(1) : options.el;
    this._name = this.el;

  }

  // set the component events if they are specified
  this.domEvents = options.events ? options.events : (options.domEvents || {});
  this.appEvents = options.appEvents || {};

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

  this._loadedEvents = [];

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

  Utils.loadRouterEvents(this);

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  Utils.extend(this, custom, reserved_props);

};

module.exports = SamsonComponent;
