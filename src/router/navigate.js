
import { SamsonApp } from '../index.js';
import SamsonComponent from '../component/component.js';

export default function navigate(next_page, animation, callback) {

  var self = this;

  // check to see if another Router event is already being handled, if one is then add this event to a queue
  if (this.isBusy) {

    this.Queue.push({
      kind: "navigate",
      next_page: next_page,
      animation: animation,
      callback: callback
    });

    SamsonApp.DEBUG && SamsonApp.log('The Samson Router is busy. This event is #' + self.Queue.length + ' in line');

  } else {

    this.isBusy = true;

    var chosen_animation = animation || this.navigateAnimation;

    // if a page update is requested for a page we aren't currently on, then we will simply navigate to it like normal
    if (chosen_animation === "update" && next_page !== this.currentPage) {
      chosen_animation = this.navigateAnimation;
    }

    this.nextPage = next_page;

    // run any necessary tasks before we start the page transition
    this.__doFirst("beforeNavigate", function(err) {

      // make sure the page exists before trying to navigate
      if (!SamsonApp.Pages[next_page] && !err) {
        err = "That page does not exist";
      }

      if (!err) {

        // check to see if we are staying on the same page, if we are then simply update the page
        if (next_page === self.currentPage) {
          chosen_animation = "update";
        } else {
          // if the next page isn't already cached then cache it
          if (!self.Cache[next_page]) {
            self.Cache[next_page] = new SamsonComponent(SamsonApp.Pages[next_page], false);
          }
        }

        // make the current animation accessible in getRouterData()
        self.currentAnimation = chosen_animation;

        // animate the page transition
        self.__animate(next_page, chosen_animation, function() {

          // run any necessary tasks after the page transition - no callback is required on these
          self.__doFirstNoCallback("afterAnimate");

          // update the changes to the page history
          if (chosen_animation === "update") {
            self.__updateHistory("update");
          } else {
            self.__updateHistory("navigate");
          }

          // run any necessary tasks after navigating
          self.__doFirst("afterNavigate", function(err) {
            if (callback) callback();
          });

        });

      } else {
        self.__updateHistory("failed", err);
      }

    });

  }

}
