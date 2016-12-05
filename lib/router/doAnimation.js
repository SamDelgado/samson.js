var Samson = require('../index');
var Utils = require('../utils');

var APP = Samson.App;

module.exports = function doAnimation(animate, callback) {

  var self = this;

  APP.DOM[this.inactivePageElement].classList.add(animate.next, "active");
  APP.DOM[this.activePageElement].classList.add(animate.current);
  APP.DOM[this.activePageElement].classList.remove("active");

  // run any necessary tasks while the pages are animating. Ex: update header or footer
  this._duringAnimate();

  var animationEvent = Utils.whichAnimationEvent();

  // if the animation is not "none", then listen for the animation's end event
  if (animate.next !== "none") {
    Utils.once(APP.DOM[this.inactivePageElement], animationEvent, animationEnded);
  }

  // otherwise run the animationEnded immediately
  else {
    animationEnded();
  }

  // listen for the end of the animation
  function animationEnded() {

    // remove the animation class from the page we just made active
    APP.DOM[self.inactivePageElement].classList.remove(animate.next);

    // remove the animation class from the page we just made inactive
    APP.DOM[self.activePageElement].classList.remove(animate.current);

    self.pagesAnimating = false;

    // remove the old page including all of its views and events from the DOM
    // also remove the entire page instance from the router's pageCache if the cache option is false
    if (self.currentPage) {
      self.pageCache[self.currentPage]._remove(function() {

        if (!self.cache) delete self.pageCache[self.currentPage];
        callback();

      });

    } else {
      callback();
    }

  }

};
