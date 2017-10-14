
import { SamsonApp } from '../index.js';

export default function animate(next_page, animation, callback) {

  var self = this;

  this.isAnimating = true;

  if (animation === "update") {

    this.pageCache[next_page]._render(true, null, function() {

      // now that the page is rendered run its onLoad function
      self.pageCache[next_page]._loaded = true;
      self.pageCache[next_page].onLoad();

      self._doFirst("beforeAnimate", function(err) {

        // there is no animation so run the new page's onVisible function
        self.pageCache[next_page].onVisible();

        if (callback) callback();

      });

    });

  } else {

    // determine the type of animation that will be used
    var animation_data = this.getAnimationData(animation);

    // remove the focus from whatever element has it so the cursor doesn't make the page transition look sucky
    document.activeElement.blur();

    // render the new page off screen
    this.pageCache[next_page]._render(false, SamsonApp.DOM[this.inactivePageElement], function() {

      // now that the page is rendered run its onLoad function
      self.pageCache[next_page]._loaded = true;
      self.pageCache[next_page].onLoad();

      self._doFirst("beforeAnimate", function(err) {

        // run the animation now that the new page is fully rendered offscreen
        self.doAnimation(animation_data, function () {

          // now that the animation is complete, run the new page's onVisible function
          self.pageCache[next_page].onVisible();

          // restore focus to whatever element was set to autofocus (linked with _fixAutoFocusElements method)
          var focusElement = SamsonApp.DOM[self.inactivePageElement].querySelector(".SF"); // SF short for samson_focus
          if (focusElement) {

            // refocus the element
            setTimeout(function() {
              focusElement.focus();

              // move the cursor to the end of the textarea
              var val = focusElement.value; //store the value of the element
              focusElement.value = ''; //clear the value of the element
              focusElement.value = val; //set that value back.

            }, 0);

            // remove the samson_focus class from the element
            focusElement.classList.remove("SF"); // SF short for samson_focus
          }

          if (callback) callback();

        });

      });

    });

  }

}
