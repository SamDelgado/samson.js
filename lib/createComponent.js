var Component = require('./component'); // Samson Component constructor function
var addEvents = require('./addEvents'); // Events mixin that adds on, off, and emit methods to an object

module.exports = function createComponent(options, add_events) {

  var component = new Component(options);
  if (add_events === true) addEvents(component);

  return component;

};
