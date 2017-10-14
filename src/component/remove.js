// removes all event listeners, DOM nodes, and child components

import { SamsonApp } from '../index.js';

export default function remove(callback) {

  var self = this;

  this._doFirst("beforeRemove", function() {

    self._destroySubComponents(function() {

      self._destroyEvents(function() {

        // destroy the DOM element
        if (self.element && self.element.parentNode) {
          self.element.parentNode.removeChild(self.element);
        }

        // make sure the DOM node is removed from memory quickly
        delete self.element;

        // remove any router related tasks
        var router_event;
        for (router_event in self._routerEvents) {
          delete SamsonApp.Router[router_event][self._uuid];
        }

        // remove the event delegator if it exists
        delete self.delegate;

        // reset the page's state
        self.state = {};
        self._initialStateSet = false;

        self._doFirst("afterRemove", function() {
          if (callback) callback();
        });

      });

    });

  });

}
