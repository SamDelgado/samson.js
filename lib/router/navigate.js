var Samson = require('../samson');

module.exports = function navigate(next_page, animation, callback) {

  var self = this;

  // check to see if another Router event is already being handled, if one is then add this event to a queue
  if (this.isBusy) {

    this.queue.push({
      kind: "navigate",
      next_page: next_page,
      animation: animation,
      callback: callback
    });

    //console.log("Router is busy. This event is #" + self.queue.length + " in line");

  } else {

    this.isBusy = true;

    var chosen_animation = animation || this.navigateAnimation;

    // if a page update is requested for a page we aren't currently on, then we will simply navigate to it like normal
    if (chosen_animation === "update" && next_page !== this.currentPage) {
      chosen_animation = this.navigateAnimation;
    }

    this.nextPage = next_page;

    // run any necessary tasks before we start the page transition
    this._doFirst("beforeNavigate", function(err) {

      // make sure the page exists before trying to navigate
      if (!Samson.App.Pages[next_page] && !err) {
        err = "That page does not exist";
      }

      if (!err) {

        // check to see if we are staying on the same page, if we are then simply update the page
        if (next_page === self.currentPage) {
          chosen_animation = "update";
        } else {
          // if the next page isn't already cached then cache it
          if (!self.pageCache[next_page]) {
            self.pageCache[next_page] = Samson.createComponent(Samson.App.Pages[next_page], false);
          }
        }

        // make the current animation accessible in getPageData()
        self.currentAnimation = chosen_animation;

        // animate the page transition
        self.animate(next_page, chosen_animation, function() {

          // run any necessary tasks after the page transition - no callback is required on these
          self._doFirstNoCallback("afterAnimate");

          // update the changes to the page history
          if (chosen_animation === "update") {
            self.updateHistory("update");
          } else {
            self.updateHistory("navigate");
          }

          // run any necessary tasks after navigating
          self._doFirst("afterNavigate", function(err) {
            if (callback) callback();
          });

        });

      } else {
        self.updateHistory("failed", err);
      }

    });

  }

};
