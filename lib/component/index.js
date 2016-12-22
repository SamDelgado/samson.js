// Samson.Component constructor function
// Used to simplify component/page rendering and transitions in single page apps

/* Optional Page Settings
  isPage: Boolean, // default = undefined - true if this component is a whole page of the app
  path: String, // default = undefined - the router path of the page
  subPageOf: String, // default = false - an optional parent page that is the start of a specific category - ex: User Bio Page is subPageOf of Profile Page
  previousPage: String, // default = false - an optional previous page to make going back easier. the default is the home page if the isPage property is true
  backSafe: Boolean, // default = false - set to true if it is safe to go back to this page from any other page in the app. For example, the Login page would be false after a user logs in.
  backAnimation: String // default = false - an optional default back animation used by the router
*/

/* Main Component Settings
  el: String, // default = undefined - The element's selector that will determine where the component is rendered. If the component is a page, this will be left undefined. If the component is not a page, and el is not defined, then the component will be appended into it's parent element.
  tag: String, // default = "div" - The element's tag that will be supplied when it is created
  template: Function, // default = undefined - example = require("./template.jade")
  components: Object, // default = undefined - an object storing any subcomponents that will load with this component
  setComponents: Function, // default = undefined - a function that returns an object of subcomponents to load. this function will overwrite the components object if defined
  domEvents: Object, // default = undefined - an object storing any dom events attached to the component
  appEvents: Object, // default = undefined - an object storing any app events the component is listening to
  setInitialState: Function, // default = undefined - a function that returns an object with the component's initial state
  beforeRender: Function, // default = undefined - a function that runs before the component is rendered (update models, sort collections)
  afterRender: Function, // default = undefined - a function that runs after the component is rendered (scroll to the top of the page, marked checkboxes as checked)
  onLoad: Function, // default = undefined - a function that runs after the component is fully loaded and all router events are completed (there is no callback)
  beforeRemove: Function, // default = undefined - a function that runs right before the component is fully destroyed (cleanup models, update activity history)
  afterRemove: Function, // default = undefined - a function that runs right after the component is removed
  router: Object, // default = undefined - an object storing functions that hook into specific router events
  extend: Object // default = undefined - an object storing any custom functions that should be added as properties to the component
*/

var SamsonComponent = require('./component');

SamsonComponent.prototype._type = "Component";
SamsonComponent.prototype._fixAutoFocusElements = require('./fixAutoFocusElements'); // remove the autofocus attribute on the first element that has it and to it the class "samson_focus". remove the autofocus attribute entirely on any other elements that might have it by mistake. This is necessary to have smooth page transitions due to an animation bug in chrome caused by an element having the autofocus attribute. The Samson Router will call .focus() on whatever element has the "samson_focus" class, after the page transition is complete
SamsonComponent.prototype._render = require('./render'); // render the component to the DOM
SamsonComponent.prototype.setState = require('./setState');
SamsonComponent.prototype.resetState = require('./resetState');
SamsonComponent.prototype._doFirst = require('./doFirst'); // run the named function before calling back, and passthrough the first callback argument if one exists
SamsonComponent.prototype._loadEvents = require('./loadEvents');
SamsonComponent.prototype._destroyEvents = require('./destroyEvents');
SamsonComponent.prototype._loadComponents = require('./loadComponents'); // attach the components passed back from the setComponents function
SamsonComponent.prototype._renderComponents = require('./renderComponents'); // render the components attached to the page
SamsonComponent.prototype._destroyComponents = require('./destroyComponents'); // destroy the components attached to the page
SamsonComponent.prototype._remove = require('./remove'); // removes all event listeners, DOM nodes, and child components

module.exports = SamsonComponent;
