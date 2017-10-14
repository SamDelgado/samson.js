
import { SamsonApp } from '../index.js';

import isEqual from '../utils/isEqual.js';
import getTopParent from '../utils/getTopParent.js';

export default function setState(new_state, dont_reload) { // new_state must be an object

  var self = this;

  if (typeof new_state === "object") {

    var changed = false;

    // Check if each property from the new_state object is equal to the same property on the existing state
    Object.keys(new_state).forEach(function(prop) {

      if (!isEqual(self.state[prop], new_state[prop])) {
        self.state[prop] = new_state[prop];
        changed = true;
      }

    });

    if (changed) {

      this._stateChanged = true;

      // the page or component and all of its subcomponents will reload by default unless the dont_reload argument is true
      // make the component had already rendered once (_loaded === true) before trying to rerender it
      if (!dont_reload && self._loaded) {

        this._render(false);

        /*
        if (!this.parent || !this.parent._type) {
          this._render(false);
        } else {

          // I am not sure why I need to rerender from the top component
          var parent = getTopParent(this);
          parent._render(false);

        }
        */

      }

    }

  } else {

    SamsonApp.DEBUG && SamsonApp.log("A valid object was not passed into the Samson Component's setState function");

  }

}
