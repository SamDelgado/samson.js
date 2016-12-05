var addEvents = require('../addEvents'); // Events mixin that adds on, off, and emit methods to an object

// Instantiate Samson App object
module.exports = function instantiateApp() {

  var app = {
    _isConfigured: false,
    _isGlobal: false,
    DOM: {} // HTML elements will be cached here
  };

  // Make the Samson.App object an event bus
  addEvents(app);

  return app;

};
