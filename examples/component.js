

module.exports = {

  /* Optional Page Settings */
  isPage: Boolean, // default = undefined - true if this component is a whole page of the app
  path: String, // default = undefined - the router path of the page
  subPageOf: String, // default = undefined - an optional parent page that is the start of a specific category - ex: User Bio Page is subPageOf of Profile Page
  previousPage: String, // default = undefined - an optional previous page to make going back easier. the default is the home page if the isPage property is true
  backSafe: Boolean, // default = undefined - set to true if it is safe to go back to this page from any other page in the app. For example, the Login page would be false after a user logs in.
  backAnimation: String, // default = undefined - an optional default back animation used by the router

  /* Main Component Settings */
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

};
