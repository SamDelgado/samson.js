var Async = require('async-lite');

// render the components attached to the page
module.exports = function renderComponents(force_update, callback) {

  var self = this;

  var keys = Object.keys(this.components);

  Async.each(keys, function(key, cb) {

    self[key]._render(force_update, null, function() {
      cb();
    });

  }, function(){
    callback();
  });

};
