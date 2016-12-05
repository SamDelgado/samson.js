var Samson = require('../index');
var Utils = require('../utils');

var APP = Samson.App;

module.exports = function destroyEvents(callback) {

  // destroy DOM event listeners
  var delegate = Utils.getTopParent(this).delegate;

  var i; var domEvent;
  for (i=0; i<this._loadedEvents.length;i++) {
    domEvent = this._loadedEvents[i];
    if (domEvent.selector) {
      delegate.off(domEvent.type, domEvent.selector, domEvent.handler);
    } else {
      delegate.off(domEvent.type, domEvent.handler);
    }
  }
  this._loadedEvents = [];

  // now destroy app event listeners
  var appEvent;
  for (appEvent in this.appEvents) {
    APP.off(appEvent, this.appEvents[appEvent]);
  }

  if (callback) callback();

};
