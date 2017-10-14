
import Gator from 'gator'; // event delegation

import { SamsonApp } from '../index.js';

// render the component to the DOM
export default function render(force_update, container_element, callback) {

  var self = this;

  this._loadSubComponents(force_update, function() {

    // get the component's initial state object that is passed into the render call
    if (!self._initialStateSet) {
      self.state = self.setInitialState();
      self._initialStateSet = true;
    }

    self._doFirst("beforeRender", function() {

      // create the component element
      if (self.isPage) {

        if (!self.element) {
          self.element = document.createElement("div");
          self.element.id = self.path + "-page";
          self.element.innerHTML = self._template(self._templateData);
          container_element.appendChild(self.element);

          // setup the page as an event delegator for all its subcomponents
          self.delegate = Gator(self.element);
        }

        // set whether or not we will force subcomponents to update
        if (force_update || self._stateChanged) {
          force_update = true;
          self.element.innerHTML = self._template(self._templateData);
        }

      } else {

        if (!self.element || (force_update || self._stateChanged) ) {
          force_update = true;
          self.element = document.getElementById(self.el);

          if (!self.element) {

            // No element with the id " + self.el + " exists in the DOM so we will create it and append it to its parent
            self.element = document.createElement(self.tag);
            self.element.id = self.el;

            if (self._template) {
              self.element.innerHTML = self._template(self._templateData);
            }

            if (self.parent && self.parent.element) {
              self.parent.element.appendChild(self.element);
            } else {
              SamsonApp.DEBUG && SamsonApp.log('There is no parent Samson Component to append ' + self.el + ' to.');
            }

          } else if (self._template) {
            self.element.innerHTML = self._template(self._templateData);
          }

        }

      }

      self._loadEvents(function() {

        self._renderSubComponents(force_update, function() {

          // reset stateChanged
          self._stateChanged = false;

          self._fixAutoFocusElements();

          self._doFirst("afterRender", function() {

            // if this is the first time the component has been rendered, then run the onLoad function - page's have their onLoad function run
            if (!self.isPage && !self._loaded) {
              self._loaded = true;
              self.onLoad();
            }

            if (callback) callback();

          });

        });

      });

    });

  });

}
