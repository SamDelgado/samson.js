
import { SamsonApp } from '../index.js';
import SamsonComponent from '../component/component.js';

export default function back(forced_page, callback) { // if forced_page is passed then the Router will be forced go back to it

  if (typeof forced_page === 'function') callback = forced_page;

  var self = this;

   // check to see if another Router event is already being handled, if one is then add this event to a queue
  if (self.isBusy) {

    self.queue.push({
      kind: "back",
      callback: callback
    });

    SamsonApp.DEBUG && SamsonApp.log('The Samson Router is busy. This event is #' + self.queue.length + ' in line');

  } else {

    var error;

    self.isBusy = true;

    // run any necessary tasks before we start the page transition
    self._doFirst("beforeBack", function(err) {

      // check to see if there is a page to go back to, if not then see if the current page has defined a "previousPage" or "childOf" property
      var force_back;

      if (typeof forced_page === 'string') {

        if (SamsonApp.Pages[forced_page]) {
          self.previousPage = forced_page;
          force_back = true;
        } else {
          error = "The requested page to go back to does not exist";
        }

      } else if (!self.previousPage) {

        if (SamsonApp.Pages[self.currentPage].previousPage !== false) {
          self.previousPage = SamsonApp.Pages[self.currentPage].previousPage;
        } else if (SamsonApp.Pages[self.currentPage].childOf !== false) {
          self.previousPage = SamsonApp.Pages[self.currentPage].childOf;
        } else {
          error = "There is no page to go back to";
        }

      }

      // if the previousPage isn't back safe and the Router isn't forced to go there then pass an error
      if (SamsonApp.Pages[self.previousPage].isBackSafe !== true && !force_back) {
        error = "The previous page isn't safe to go back to";
      }

      if (!error && !err) {

        self.nextPage = self.previousPage;

        // load the previousPage into the pageCache if it isn't already
        if (!self.pageCache[self.previousPage]) {
          self.pageCache[self.previousPage] = new SamsonComponent(SamsonApp.Pages[self.previousPage], false);
        }

        // if the page wants a custom back animation then use it, otherwise use the default back animation
        var back_animation = SamsonApp.Pages[self.currentPage].backAnimation || self.backAnimation;

        // make the current animation accessible in getRouterData()
        self.currentAnimation = back_animation;

        // animate the page transition
        self.animate(self.previousPage, back_animation, function() {

          // run any necessary tasks after the page transition
          self._doFirstNoCallback("afterAnimate");

          // update the changes to the page history
          self.updateHistory("back");

          // run any necessary tasks after going back
          self._doFirst("afterBack", function(err) {
            if (callback) callback();
          });

        });

      } else {

        self.updateHistory("failed", err || error);

      }

    });

  }

}
