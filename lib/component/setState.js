var Utils = require('../utils');
var isEqual = require('lodash.isequal');

module.exports = function setState(new_state, dont_reload) { // new_state must be an object

  if (typeof new_state === "object") {
    var changed = false;

    var prop;
    for (prop in new_state) {

      // check if this property has changed
      if (this.state[prop] === undefined) { // if the property doesn't exist on the state object then it will updated
        this.state[prop] = new_state[prop];
        changed = true;
      } else if (!isEqual(this.state[prop], new_state[prop])) { // if the existing property on the state object is not equal to the value on the new_state object then it will be updated
        this.state[prop] = new_state[prop];
        changed = true;
      }

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
    throw new Error("Make sure to pass an object into setState");
  }

};
