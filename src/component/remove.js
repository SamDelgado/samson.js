// removes all event listeners, DOM nodes, and child components

import { SamsonApp } from '../index.js';

export default function remove(callback) {

  var self = this;

  this.__doFirst('beforeRemove', function() {

    self.__destroySubComponents(function() {

      self.__destroyEvents(function() {

        // destroy the DOM element
        if (self.element && self.element.parentNode) {
          self.element.parentNode.removeChild(self.element);
        }

        // make sure the DOM node is removed from memory quickly
        delete self.element;

        // remove any router related tasks
        Object.keys(self.__routerEvents).forEach(function(router_event) {
          delete SamsonApp.Router[router_event][self.__uuid];
        });

        // remove the event delegator if it exists
        delete self.delegate;

        // reset the page's state
        self.state = {};
        self.__initialStateSet = false;

        self.__doFirst('afterRemove', function() {
          if (callback) callback();
        });

      });

    });

  });

}
