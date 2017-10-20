
export default function doFirstNoCallback(name, callback) {

  var task;
  for (task in this[name]) {
    this[name][task](this.__getRouterData());
  }

  if (callback) callback();

}
