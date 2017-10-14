
import Async from 'async-lite';

export default function doFirst(name, callback) {

  var self = this;
  var tasks = Object.keys(this[name]);

  Async.each(tasks, function(task, cb) {
    self[name][task](self.getRouterData(), function(err) {
      cb(err);
    });
  }, function(err) {
    callback(err);
  });

}
