
// run the named function before calling back, and passthrough the first callback argument if one exists
export default function doFirst(name, callback) {

  this[name](function(callbackArg) {
    callback(callbackArg);
  });

}
