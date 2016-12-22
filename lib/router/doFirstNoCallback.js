
module.exports = function doFirstNoCallback(name, callback) {

  var task;
  for (task in this.name) {
    this.[name][task](this.getPageData());
  }

  if (callback) callback();

};
