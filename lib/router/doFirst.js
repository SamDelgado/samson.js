var Async = require('async-lite');

module.exports = function doFirst(name, callback) {

  var self = this;
  var tasks = Object.keys(this[name]);

  Async.each(tasks, function(task, cb) {
    self[name][task](self.getPageData(), function(err) {
      cb(err);
    });
  }, function(err) {
    callback(err);
  });

};
