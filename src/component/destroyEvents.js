
import Async from 'async-lite';

import { SamsonApp } from '../index.js';

import getTopParent from '../utils/getTopParent.js';

export default function destroyEvents(callback) {

  var self = this;

  Async.parallel({

    destroyDOMEvents: function(destroyDOMEvents_cb) {

      if (self.__loadedDOMEvents.length) {

        var parent = getTopParent(self);
        var parent_element = parent.element;
        var parent_delegate = parent.delegate;

        Async.each(self.__DOMEvents, function(event, cb) {

          if (event.selector) {
            parent_delegate.off(event.type, event.selector, event.handler, event.onCapture);
          } else {
            parent_element.removeEventListener(event.type, event.handler, event.onCapture);
          }

          cb();

        }, function() {
          self.__loadedDOMEvents = [];
          destroyDOMEvents_cb();
        });

      } else {
        destroyDOMEvents_cb();
      }

    },

    destroyAppEvents: function(destroyAppEvents_cb) {

      if (self.__loadedAppEvents.length) {

        Async.each(self.__AppEvents, function(event, cb) {

          SamsonApp.off(event.type, event.handler);

          cb();

        }, function() {
          self.__loadedAppEvents = [];
          destroyAppEvents_cb();
        });

      } else {
        destroyAppEvents_cb();
      }

    }

  }, function() {

    if (callback) callback();

  });

}
