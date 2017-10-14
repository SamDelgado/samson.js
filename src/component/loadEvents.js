
import Async from 'async-lite';

import { SamsonApp } from '../index.js';

import getTopParent from '../utils/getTopParent.js';

export default function loadEvents(callback) {

  var self = this;

  Async.parallel({

    loadDOMEvents: function(loadDOMEvents_cb) {

      if (!self._loadedDOMEvents.length) {

        var parent = getTopParent(self);
        var parent_element = parent.element;
        var parent_delegate = parent.delegate;

        Async.each(self.DOMEvents, function(event, cb) {

          if (event.selector) {
            parent_delegate.on(event.type, event.selector, event.handler, event.onCapture);
          } else {
            parent_element.addEventListener(event.type, event.handler, event.onCapture);
          }

          self._loadedDOMEvents.push(event);

          cb();

        }, function() {
          loadDOMEvents_cb();
        });

      } else {
        loadDOMEvents_cb();
      }

    },

    loadAppEvents: function(loadAppEvents_cb) {

      if (!self._loadedAppEvents.length) {

        Async.each(self.AppEvents, function(event, cb) {

          SamsonApp.on(event.type, event.handler, self);

          self._loadedAppEvents.push(event);

          cb();

        }, function() {
          loadAppEvents_cb();
        });

      } else {
        loadAppEvents_cb();
      }

    }

  }, function() {

    if (callback) callback();

  });

}
