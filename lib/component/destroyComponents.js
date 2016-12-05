var Async = require('async-lite');

// destroy the components attached to the page
module.exports = function destroyComponents(callback) {

  var self = this;

  var keys = Object.keys(this._components);

  Async.each(keys, function(key, cb) {

    self.Components[key]._remove(function() {
      delete self.Components[key];
      cb();
    });

  }, function() {
    self._componentsLoaded = false;
    callback();
  });

};
