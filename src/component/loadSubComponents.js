
import Async from 'async-lite';
import SamsonComponent from './component.js';

// load the subcomponents of this component
export default function loadSubComponents(force_update, callback) {

  var self = this;

  // If the components aren't loaded, or force_update is true, then load the components
  if (!this.__componentsLoaded || force_update) {

    var components = Object.keys(this.__components);

    Async.each(components, function(component, cb) {

      // if the component hasn't been loaded yet, then load it
      if (!self.Components[component]) {
        self.Components[component] = new SamsonComponent(self.__components[component], false);
        self.Components[component].parent = self;
      }

      cb();

    }, function() {

      self.__componentsLoaded = true;
      if (callback) callback();

    });

  } else {

    if (callback) callback();

  }

}
