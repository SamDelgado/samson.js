
import { SamsonApp } from '../index.js';

import listenOnce from '../utils/listenOnce.js';
import whichEventName from '../utils/whichEventName.js';

export default function doAnimation(animate, callback) {

  var self = this;

  SamsonApp.DOM[this.inactivePageElement].classList.add(animate.next, 'active');
  SamsonApp.DOM[this.activePageElement].classList.add(animate.current);
  SamsonApp.DOM[this.activePageElement].classList.remove('active');

  // run any necessary tasks while the pages are animating. No callback is necessary - Ex: update header or footer
  this._doFirstNoCallback('duringAnimate');

  var animationEventName = whichEventName('animations');

  // if the animation is not "none", then listen for the animation's end event
  if (animate.next !== 'none') {
    listenOnce(SamsonApp.DOM[this.inactivePageElement], animationEventName, animationEnded);
  }

  // otherwise run the animationEnded immediately
  else {
    animationEnded();
  }

  // listen for the end of the animation
  function animationEnded() {

    // remove the animation class from the page we just made active
    SamsonApp.DOM[self.inactivePageElement].classList.remove(animate.next);

    // remove the animation class from the page we just made inactive
    SamsonApp.DOM[self.activePageElement].classList.remove(animate.current);

    self.isAnimating = false;

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

}
