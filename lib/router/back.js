var Samson = require('../index');

module.exports = function back(callback) {

  var self = this;

   // check to see if another Router event is already being handled, if one is then add this event to a queue
  if (self.isBusy) {

    self.queue.push({
      kind: "back",
      callback: callback
    });

    Samson.log("Router is busy. This event is #" + self.queue.length + " in line");

  } else {

    var error;

    self.isBusy = true;

    // run any necessary tasks before we start the page transition
    self._doFirst("beforeBack", function(err) {

      // check to see if there is a page to go back to, if not then see if the current page has defined a "previousPage" or "subPageOf" property
      if (!self.previousPage) {

        if (App.Pages[self.currentPage].previousPage !== false) {
          self.previousPage = App.Pages[self.currentPage].previousPage;
        } else if (App.Pages[self.currentPage].subPageOf !== false) {
          self.previousPage = App.Pages[self.currentPage].subPageOf;
        } else {
          error = "There is no page to go back to";
        }

      }

      if (!error && !err) {

        self.nextPage = self.previousPage;

        // load the previousPage into the pageCache if it isn't already
        if (!self.pageCache[self.previousPage]) {
          self.pageCache[self.previousPage] = Samson.createComponent(App.Pages[self.previousPage], false);
        }

        // if the page wants a custom back animation then use it, otherwise use the default back animation
        var back_animation = App.Pages[self.currentPage].backAnimation || self.backAnimation;

        // make the current animation accessible in getPageData()
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

};
