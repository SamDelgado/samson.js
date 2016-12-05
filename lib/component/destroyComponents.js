var Async = require('async-lite');

// destroy the components attached to the page
module.exports = function destroyComponents(callback) {

  var self = this;

  var keys = Object.keys(this.components);

  Async.each(keys, function(key, cb) {

    self[key]._remove(function() {
      delete self[key];
      cb();
    });

  }, function() {
    self._componentsLoaded = false;
    callback();
  });

};
