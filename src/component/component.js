// Samson.Component constructor function
// Used to simplify component/page rendering and transitions in single page apps

/* Main Component Settings
  el: String, // default = undefined - The element's selector that will determine where the component is rendered. If the component is a page, this will be left undefined. If the component is not a page, and el is not defined, then the component will be appended into it's parent element.
  tag: String, // default = "div" - The element's tag that will be supplied when it is created
  template: Function, // default = undefined - example = require("./template.pug")
  components: Object, // default = undefined - an object storing any subcomponents that will load with this component
  events: Object, // default = undefined - an object storing any dom or app event listeners that need to be attached to the component
  state: Object, // default = {} - an object storing the state of the component. if this is specified then setInitialState will be ignored
  setInitialState: Function, // default = undefined - a function that returns an object with the component's initial state
  beforeRender: Function, // default = undefined - a function that runs before the component is rendered (update models, sort collections)
  afterRender: Function, // default = undefined - a function that runs after the component is rendered (scroll to the top of the page, marked checkboxes as checked)
  onLoad: Function, // default = undefined - a function that runs after the component is fully loaded and all router events are completed (there is no callback)
  beforeRemove: Function, // default = undefined - a function that runs right before the component is fully destroyed (cleanup models, update activity history)
  afterRemove: Function, // default = undefined - a function that runs right after the component is removed
  router: Object, // default = undefined - an object storing functions that hook into specific router events
  extend: Object // default = undefined - an object storing any custom functions that should be added as properties to the component
*/

/* Optional Page Settings
  isPage: Boolean, // default = undefined - true if this Component is a whole page of the app
  path: String, // default = undefined - the router path of the page
  childOf: String, // default = false - an optional parent page that is the start of a specific category - ex: User Bio Page is a childOf of Profile Page
  previousPage: String, // default = false - an optional previous page to make going back easier. the default is the childOf property if specified
  isBackSafe: Boolean, // default = false - set to true if it is safe to go back to this page from any other page in the app. For example, the Login page would be false after a user logs in.
  backAnimation: String, // default = false - an optional default back animation used by the router
  onVisible: Function // default = undefined - a function that runs after the Page has fully animated onto the screen
*/

import { SamsonApp } from '../index.js';

/* Utility Functions */
import makeObjectAnEventBus from '../utils/makeObjectAnEventBus.js';
import loadRouterEvents from '../utils/loadRouterEvents.js';
import extendObject from '../utils/extendObject.js';

// cached functions for better performance
import { emptyFunction, justCallback, justReturnObject } from '../utils/functions.js';

/* Component Prototype Methods */
import fixAutoFocusElements from './fixAutoFocusElements.js';
import render from './render.js';
import setState from './setState.js';
import resetState from './resetState.js';
import clearState from './clearState.js';
import forceUpdate from './forceUpdate.js';
import doFirst from './doFirst.js';
import loadEvents from './loadEvents.js';
import destroyEvents from './destroyEvents.js';
import loadSubComponents from './loadSubComponents.js';
import renderSubComponents from './renderSubComponents.js';
import destroySubComponents from './destroySubComponents.js';
import remove from './remove.js';

// Properties on the Component object reserved by Samson. All properties starting with _ are also reserved
import { RESERVED_PROPS } from './reserved_component_properties';

// HTML events that need to be listened for during the "capture" phase instead of the "bubbling" phase
import { ON_CAPTURE_EVENTS } from './on_capture_events';

export default function SamsonComponent(options, add_events) {

  var self = this;

  // make this Component an event bus if add_events === true
  if (add_events === true) makeObjectAnEventBus(this);

  this.isPage = options.isPage || false;

  if (this.isPage) {

    // set the path of the page
    this.path = options.path;

    // childOf is false if it is a top-level page, otherwise it is the name of the top-level page it is linked to
    this.childOf = options.childOf || false;

    // set the previousPage if it is specified
    this.previousPage = options.previousPage || false;

    // set the backAnimation if it is specified
    this.backAnimation = options.backAnimation || false;

    // set isBackSafe if it is specified
    this.isBackSafe = options.isBackSafe || true; // Page's are back safe by default

    // set the element's selector that will determine where the component is rendered
    this._name = this.path;

    // set the onVisible function if one is specified - it is fired after the page has animated onto the screen
    this.onVisible = options.onVisible || emptyFunction; // there is no callback needed

  } else {

    // set the element's selector that will determine where the component is rendered
    this.el = (options.el.charAt(0) === "#") ? options.el.slice(1) : options.el;
    this._name = this.el;

    // set the element's tag
    this.tag = options.tag || "div";

  }

  // set the component event listeners if they are specified
  this.events = options.events || {};
  this.AppEvents = [];
  this.DOMEvents = [];
  this._loadedAppEvents = [];
  this._loadedDOMEvents = [];

  Object.keys(this.events).forEach(function(event_key) {

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

      event.onCapture = ON_CAPTURE_EVENTS.indexOf(event.type) !== -1; // determine if the event should listen to the capturing or bubbling phase

      self.DOMEvents.push(event);

    }

  });

  // subcomponents
  this._components = options.components || {};
  this._componentsLoaded = false;
  this.Components = {};

  // state and setInitialState function
  var state = options.state;
  if (typeof state === 'object') {
    this.setInitialState = function() { return state };
  } else {
    this.setInitialState = options.setInitialState || justReturnObject;
  }
  this.state = {};
  this._initialStateSet = false;
  this._stateChanged = false;
  this._loaded = false; // becomes true once the component has been rendered for the first time

  // set the component's render function that will output an html string
  // if no render function was passed in, we check for a template function
  this._template = options.render || options.template;

  // Create the templateData object that will contain the entire App object and this Component's instance as 'this'
  // This templateData will be passed into the template/render function
  this._templateData = { App: SamsonApp, this: self };

  // set the beforeRender function if one is specified
  this.beforeRender = options.beforeRender || justCallback;

  // set the afterRender function if one is specified
  this.afterRender = options.afterRender || justCallback;

  // set the onLoad function if one is specified - it is fired after the component or page is rendered for the first time
  this.onLoad = options.onLoad || emptyFunction; // there is no callback needed

  // set the beforeRemove function if one is specified, otherwise just invoke callback
  this.beforeRemove = options.beforeRemove || justCallback;

  // set the afterRemove function if one is specified, otherwise just invoke callback
  this.afterRemove = options.afterRemove || justCallback;

  // add any router related tasks
  this._uuid = this._name + "-" + Date.now(); // the uuid allows us to easily reference the added router tasks
  this._routerEvents = options.Router || options.router || {};

  loadRouterEvents(this);

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  extendObject(this, custom, RESERVED_PROPS);

}

SamsonComponent.prototype._type = "Component";
SamsonComponent.prototype._fixAutoFocusElements = fixAutoFocusElements; // remove the autofocus attribute on the first element that has it and to it the class "SF". remove the autofocus attribute entirely on any other elements that might have it by mistake. This is necessary to have smooth page transitions due to an animation bug in chrome caused by an element having the autofocus attribute. The Samson Router will call .focus() on whatever element has the "SF" class, after the page transition is complete
SamsonComponent.prototype._render = render; // render the component to the DOM
SamsonComponent.prototype.setState = setState;
SamsonComponent.prototype.resetState = resetState;
SamsonComponent.prototype.clearState = clearState;
SamsonComponent.prototype.forceUpdate = forceUpdate;
SamsonComponent.prototype._doFirst = doFirst; // run the named function before calling back, and passthrough the first callback argument if one exists
SamsonComponent.prototype._loadEvents = loadEvents;
SamsonComponent.prototype._destroyEvents = destroyEvents;
SamsonComponent.prototype._loadSubComponents = loadSubComponents; // load the subcomponents of this component/page
SamsonComponent.prototype._renderSubComponents = renderSubComponents; // render the subcomponents of this component/page
SamsonComponent.prototype._destroySubComponents = destroySubComponents; // destroy the subcomponents of this component/page
SamsonComponent.prototype._remove = remove; // removes all event listeners, DOM nodes, and subcomponents
