// Samson.Component constructor function
// Used to simplify component/page rendering and transitions in single page apps

var Samson = require('./index');
var async = require('async-lite');
var isEqual = require('lodash.isequal');
var Utils = require('./utils');

/* Optional Page Settings
  isPage: Boolean, // default = undefined - true if this component is a whole page of the app
  path: String, // default = undefined - the router path of the page
  subPageOf: String, // default = undefined - an optional parent page that is the start of a specific category - ex: User Bio Page is subPageOf of Profile Page
  previousPage: String, // default = undefined - an optional previous page to make going back easier. the default is the home page if the isPage property is true
  backSafe: Boolean, // default = undefined - set to true if it is safe to go back to this page from any other page in the app. For example, the Login page would be false after a user logs in.
  backAnimation: String // default = undefined - an optional default back animation used by the router
*/

/* Main Component Settings
  el: String, // default = undefined - The element's selector that will determine where the component is rendered. If the component is a page, this will be left undefined. If the component is not a page, and el is not defined, then the component will be appended into it's parent element.
  template: Function, // default = undefined - example = require("./template.jade")
  components: Object, // default = undefined - an object storing any subcomponents that will load with this component
  setComponents: Function, // default = undefined - a function that returns an object of subcomponents to load. this function will overwrite the components object if defined
  domEvents: Object, // default = undefined - an object storing any dom events attached to the component
  appEvents: Object, // default = undefined - an object storing any app events the component is listening to
  setInitialState: Function, // default = undefined - a function that returns an object with the component's initial state
  beforeRender: Function, // default = undefined - a function that runs before the component is rendered (update models, sort collections)
  afterRender: Function, // default = undefined - a function that runs after the component is rendered (scroll to the top of the page, marked checkboxes as checked)
  beforeRemove: Function, // default = undefined - a function that runs right before the component is fully destroyed (cleanup models, update activity history)
  afterRemove: Function, // default = undefined - a function that runs right after the component is removed
  router: Object, // default = undefined - an object storing functions that hook into specific router events
  extend: Object // default = undefined - an object storing any custom functions that should be added as properties to the component
*/

// cached for performance
function justCallback(cb) { cb(); }
function justCallbackTrue(cb) { cb(true); }
function justReturnObject() { return {}; }

// get the topmost parent component of the current component
function getTopParent(component) {
  if (component.parent) {
    return getTopParent(component.parent);
  } else {
    return component;
  }
}

var reserved_props = ["path", "el", "element", "template", "subPageOf", "previousPage", "backAnimation", "style", "components", "events", "domEvents", "appEvents", "state", "setState", "resetState", "setInitialState", "beforeRender", "afterRender", "beforeRemove", "render", "parent", "on", "emit", "off"];

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
  this.components = this.setComponents();
  this._componentsLoaded = false;

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

}

SamsonComponent.prototype._type = "Component";

// remove the autofocus attribute on the first element that has it and to it the class "samson_focus". remove the autofocus attribute entirely on any other elements that might have it by mistake. This is necessary to have smooth page transitions due to an animation bug in chrome caused by an element having the autofocus attribute. The Samson Router will call .focus() on whatever element has the "samson_focus" class, after the page transition is complete
SamsonComponent.prototype._fixAutoFocusElements = function() {
  var i; var focusElements = this.element.querySelectorAll("[autofocus='autofocus']");
  for (i=0; i<focusElements.length; i++) {
    var focusElement = focusElements[i];
    if (i == 0) {
      focusElement.classList.add("samson_focus");
    }
    focusElement.removeAttribute("autofocus");
    focusElement.blur();
  }
};

// render the component to the DOM
SamsonComponent.prototype._render = function(force_update, container_element, callback) {

  var self = this;

  this._loadComponents(force_update, function() {

    self._doFirst("beforeRender", function(reset_initial_state) {

      // create the component's initial state object that is passed into the render call
      if (!self._initialStateSet || reset_initial_state) {
        self.state = self.setInitialState();
        self._initialStateSet = true;
      }

      // create the component element
      if (self.isPage) {

        if (!self.element) {
          self.element = document.createElement("div");
          self.element.id = self.path + "-page";
          self.element.innerHTML = self._template(self.state);
          container_element.appendChild(self.element);

          // setup the page as an event delegator for all its subcomponents
          self.delegate = Samson.$(self.element);
        }

        // set whether or not we will force subcomponents to update
        if (force_update || self._stateChanged) {
          force_update = true;
          self.element.innerHTML = self._template(self.state);
        }

      } else {

        if (!self.element || (force_update || self._stateChanged)) {
          force_update = true;
          self.element = document.getElementById(self.el);

          if (!self.element) {
            //console.log("No element with the id " + self.el + " exists in the DOM so we will create it and append it to its parent.");
            self.element = document.createElement("div");
            self.element.id = self.el;

            if (self._template) {
              self.element.innerHTML = self._template(self.state);
            }

            if (self.parent && self.parent.element) {
              self.parent.element.appendChild(self.element);
            } else {
              console.log("There is no parent to append " + self.el + " to.");
            }

          } else {
            if (self._template) {
              self.element.innerHTML = self._template(self.state);
            }
          }

        }

      }

      self._loadEvents(function() {

        self._renderComponents(force_update, function() {

          // reset stateChanged
          self._stateChanged = false;

          self._fixAutoFocusElements();

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};

SamsonComponent.prototype.setState = function(new_state, dont_reload) { // new_state must be an object
  if (typeof new_state === "object") {
    var changed = false;

    var prop;
    for (prop in new_state) {

      // check if this property has changed
      if (this.state[prop] === undefined) { // if the property doesn't exist on the state object then it will updated
        this.state[prop] = new_state[prop];
        changed = true;
      } else if (!isEqual(this.state[prop], new_state[prop])) { // if the existing property on the state object is not equal to the value on the new_state object then it will be updated
        this.state[prop] = new_state[prop];
        changed = true;
      }

    }

    if (changed) {
      this._stateChanged = true;

      // the page or component will reload by default unless the dont_reload is true
      if (!dont_reload) {

        if (!this.parent || !this.parent._type) {
          this._render(false);
        } else {
          var parent = getTopParent(this);
          parent._render(false);
        }

      }

    }

  } else {
    throw new Error("Make sure to pass an object into setState");
  }
};

SamsonComponent.prototype.resetState = function(dont_reload) {
  var new_state = this.setInitialState();
  this.setState(new_state, dont_reload);
};

// run the named function before calling back, and passthrough the first callback argument if one exists
SamsonComponent.prototype._doFirst = function(name, callback) {
  this[name](function(callbackArg) {
    callback(callbackArg);
  });
};

SamsonComponent.prototype._loadEvents = function(callback) {

  var self = this;

  if (!this._loadedEvents.length) {

    var delegate = getTopParent(this).delegate;

    var keys = Object.keys(this.domEvents);

    var selector_element = (this.isPage) ? null : "#" +  this.el;

    async.each(keys, function(key, cb) {

      var event = {};
      var split_event = key.split(" "); // split by a single space
      event.type = split_event.shift();
      event.selector = split_event.length > 1 ? split_event.join(" ") : split_event[0];
      event.selector = event.selector || selector_element;

      event.handler = function fixedEventHandler(e) {
        self.domEvents[key].call(self, e, this);
      };

      if (event.selector) {
        delegate.on(event.type, event.selector, event.handler);
      } else {
        delegate.on(event.type, event.handler);
      }

      self._loadedEvents.push(event);

      cb();

    }, function() {

      // load any app events
      var appEvent;
      for (appEvent in self.appEvents) {
        Samson.App.on(appEvent, self.appEvents[appEvent], self);
      }

      if (callback) callback();
    });

  } else {
    if (callback) callback();
  }

};

SamsonComponent.prototype._destroyEvents = function(callback) {

  // destroy DOM event listeners
  var delegate = getTopParent(this).delegate;
  var i; var domEvent;
  for (i=0; i<this._loadedEvents.length;i++) {
    domEvent = this._loadedEvents[i];
    if (domEvent.selector) {
      delegate.off(domEvent.type, domEvent.selector, domEvent.handler);
    } else {
      delegate.off(domEvent.type, domEvent.handler);
    }
  }
  this._loadedEvents = [];

  // now destroy app event listeners
  var appEvent;
  for (appEvent in this.appEvents) {
    Samson.App.off(appEvent, this.appEvents[appEvent]);
  }

  if (callback) callback();

};

// attach the components passed back from the setComponents function
SamsonComponent.prototype._loadComponents = function(force_update, callback) {

  var self = this;

  // If the components aren't loaded, or force_update is true, then load the components
  if (!this._componentsLoaded || force_update) {

    var new_components = this.setComponents();

    // First we go through each currently attached component, and check to see if it should still exist
    var old_components = Object.keys(this.components);
    async.each(old_components, function(old_component, cb) {

      var should_be_loaded = false;
      var new_component;
      for (new_component in new_components) {
        if (old_component === new_component) should_be_loaded = true;
      }

      // If the component should be loaded but isn't, then we load it. Otherwise we just skip it
      if (should_be_loaded) {
        // if the component hasn't been loaded yet, then load it
        if (!self[old_component]) {
          self[old_component] = Samson.createComponent(self.components[old_component]);
          self[old_component].parent = self;
        }
        cb();

      } else {
        // remove the component since it shouldn't be loaded
        if (self[old_component]) {
          self[old_component]._remove(function() {
            delete self[old_component];
            cb();
          });
        } else {
          cb();
        }
      }

    }, function() {

      // Now that we handled all of the existing components, we load any new components that don't exist yet
      self.components = new_components;

      var component;
      for (component in self.components) {
        if (!self[component]) {
          self[component] = Samson.createComponent(self.components[component]);
          self[component].parent = self;
        }
      }

      self._componentsLoaded = true;
      if (callback) callback();
    });

  } else {
    if (callback) callback();
  }

};

// render the components attached to the page
SamsonComponent.prototype._renderComponents = function(force_update, callback) {

  var self = this;

  var keys = Object.keys(this.components);

  async.each(keys, function(key, cb) {

    self[key]._render(force_update, null, function() {
      cb();
    });

  }, function(){
    callback();
  });

};

SamsonComponent.prototype._destroyComponents = function(callback) {

  var self = this;

  var keys = Object.keys(this.components);

  async.each(keys, function(key, cb) {

    self[key]._remove(function() {
      delete self[key];
      cb();
    });

  }, function() {
    self._componentsLoaded = false;
    callback();
  });

};

// removes all event listeners, DOM nodes, and child components
SamsonComponent.prototype._remove = function(callback) {

  var self = this;

  this._doFirst("beforeRemove", function() {

    self._destroyComponents(function() {

      self._destroyEvents(function() {

        // destroy the DOM element
        if (self.element && self.element.parentNode) {
          self.element.parentNode.removeChild(self.element);
        }

        // make sure the DOM node is removed from memory quickly
        delete self.element;

        // remove any router related tasks
        var task;
        for (task in self._router) {
          delete Samson.App.Router[task][self._uuid];
        }

        // remove the event delegator if it exists
        delete self.delegate;

        // reset the page's state
        self.state = {};
        self._initialStateSet = false;

        self._doFirst("afterRemove", function() {
          if (callback) callback();
        });

      });

    });

  });

};

module.exports = SamsonComponent;
