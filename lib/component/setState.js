
var Samson = require('../samson');
var Utils = require('../utils');

module.exports = function setState(new_state, dont_reload) { // new_state must be an object

  var self = this;

  if (typeof new_state === "object") {

    var changed = false;

    if (!Utils.isEqual(this.state, new_state)) {

      this.state = {};

      var new_state_properties = Object.keys(new_state);
      new_state_properties.forEach(function(prop) {
        self.state[prop] = new_state[prop];
      });

      changed = true;

    }

    if (changed) {
      this._stateChanged = true;

      // the page or component will reload by default unless the dont_reload is true
      if (!dont_reload) {

        if (!this.parent || !this.parent._type) {
          this._render(false);
        } else {
          var parent = Utils.getTopParent(this);
          parent._render(false);
        }

      }

    }

  } else {
    Samson.log("A valid object was not passed into the Component's setState function");
  }

};
