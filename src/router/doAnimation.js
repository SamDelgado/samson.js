
import { SamsonApp } from '../index.js';

import listenOnce from '../utils/listenOnce.js';
import whichEventName from '../utils/whichEventName.js';

export default function doAnimation(animate, callback) {

  var self = this;

  SamsonApp.DOM[this.inactivePage].classList.add(animate.next, 'active');
  SamsonApp.DOM[this.activePage].classList.add(animate.current);
  SamsonApp.DOM[this.activePage].classList.remove('active');

  // run any necessary tasks while the pages are animating. No callback is necessary - Ex: update header or footer
  this.__doFirstNoCallback('duringAnimate');

  var animationEventName = whichEventName('animations');

  // if the animation is not "none", then listen for the animation's end event
  if (animate.next !== 'none') {
    listenOnce(SamsonApp.DOM[this.inactivePage], animationEventName, animationEnded);
  }

  // otherwise run the animationEnded immediately
  else {
    animationEnded();
  }

  // listen for the end of the animation
  function animationEnded() {

    // remove the animation class from the page we just made active
    SamsonApp.DOM[self.inactivePage].classList.remove(animate.next);

    // remove the animation class from the page we just made inactive
    SamsonApp.DOM[self.activePage].classList.remove(animate.current);

    self.isAnimating = false;

    // remove the old page including all of its views and events from the DOM
    // also remove the entire page instance from the router's pageCache if the cache option is false
    if (self.currentPage) {

      self.Cache[self.currentPage].__remove(function() {

        if (!self.__cache) delete self.Cache[self.currentPage];
        callback();

      });

    } else {

      callback();
      
    }

  }

}
