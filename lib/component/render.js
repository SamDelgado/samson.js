var Samson = require('../samson');

// render the component to the DOM
module.exports = function(force_update, container_element, callback) {

  var self = this;

  this._loadComponents(force_update, function() {

    self._doFirst("beforeRender", function(reset_initial_state) {

      // create the component's initial state object that is passed into the render call
      if (!self._initialStateSet || reset_initial_state) {
        self.state = self.setInitialState();
        self._initialStateSet = true;
      }

      // create the component element
      if (self.isPage) {

        if (!self.element) {
          self.element = document.createElement("div");
          self.element.id = self.path + "-page";
          self.element.innerHTML = self._template(self.state);
          container_element.appendChild(self.element);

          // setup the page as an event delegator for all its subcomponents
          self.delegate = Samson.App.$(self.element);
        }

        // set whether or not we will force subcomponents to update
        if (force_update || self._stateChanged) {
          force_update = true;
          self.element.innerHTML = self._template(self.state);
        }

      } else {

        if (!self.element || (force_update || self._stateChanged)) {
          force_update = true;
          self.element = document.getElementById(self.el);

          if (!self.element) {

            //No element with the id " + self.el + " exists in the DOM so we will create it and append it to its parent
            self.element = document.createElement(self.tag);
            self.element.id = self.el;

            if (self._template) {
              self.element.innerHTML = self._template(self.state);
            }

            if (self.parent && self.parent.element) {
              self.parent.element.appendChild(self.element);
            } else {
              Samson.log("There is no parent to append " + self.el + " to.");
            }

          } else {
            if (self._template) {
              self.element.innerHTML = self._template(self.state);
            }
          }

        }

      }

      self._loadEvents(function() {

        self._renderComponents(force_update, function() {

          // reset stateChanged
          self._stateChanged = false;

          self._fixAutoFocusElements();

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};
