
import Gator from 'gator'; // event delegation

import { SamsonApp } from '../index.js';

// render the component to the DOM
export default function render(force_update, container_element, callback) {

  var self = this;

  this.__loadSubComponents(force_update, function() {

    // get the component's initial state object that is passed into the render call
    if (!self.__initialStateSet) {
      self.state = self.setInitialState();
      self.__initialStateSet = true;
    }

    self.__doFirst("beforeRender", function() {

      // create the component element
      if (self.isPage) {

        if (!self.element) {
          self.element = document.createElement("div");
          self.element.id = self.path + "-page";
          self.element.innerHTML = self.__template(self.__templateData);
          container_element.appendChild(self.element);

          // setup the page as an event delegator for all its subcomponents
          self.delegate = Gator(self.element);
        }

        // set whether or not we will force subcomponents to update
        if (force_update || self.__stateChanged) {
          force_update = true;
          self.element.innerHTML = self.__template(self.__templateData);
        }

      } else {

        if (!self.element || (force_update || self.__stateChanged) ) {
          force_update = true;
          self.element = document.getElementById(self.el);

          if (!self.element) {

            // No element with the id " + self.el + " exists in the DOM so we will create it and append it to its parent
            self.element = document.createElement(self.tag);
            self.element.id = self.el;

            if (self.__template) {
              self.element.innerHTML = self.__template(self.__templateData);
            }

            if (self.parent && self.parent.element) {
              self.parent.element.appendChild(self.element);
            } else {
              SamsonApp.DEBUG && SamsonApp.log('There is no parent Samson Component to append ' + self.el + ' to.');
            }

          } else if (self.__template) {
            self.element.innerHTML = self.__template(self.__templateData);
          }

        }

      }

      self.__loadEvents(function() {

        self.__renderSubComponents(force_update, function() {

          // reset stateChanged
          self.__stateChanged = false;

          self.__fixAutoFocusElements();

          self.__doFirst("afterRender", function() {

            // if this is the first time the component has been rendered, then run the onLoad function - page's have their onLoad function run
            if (!self.isPage && !self.__loaded) {
              self.__loaded = true;
              self.onLoad();
            }

            if (callback) callback();

          });

        });

      });

    });

  });

}
