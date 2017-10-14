
import Async from 'async-lite';
import SamsonComponent from './component.js';

// load the subcomponents of this component
export default function loadSubComponents(force_update, callback) {

  var self = this;

  // If the components aren't loaded, or force_update is true, then load the components
  if (!this._componentsLoaded || force_update) {

    var components = Object.keys(this._components);

    Async.each(components, function(component, cb) {

      // if the component hasn't been loaded yet, then load it
      if (!self.Components[component]) {
        self.Components[component] = new SamsonComponent(self._components[component], false);
        self.Components[component].parent = self;
      }

      cb();

    }, function() {

      self._componentsLoaded = true;
      if (callback) callback();

    });

  } else {

    if (callback) callback();

  }

}
