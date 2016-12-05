
module.exports = function duringAnimate() {

  var key;
  for (key in this.duringAnimate) {
    this.duringAnimate[key](this.getPageData());
  }

};
