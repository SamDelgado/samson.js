
import Async from 'async-lite';

// destroy the subcomponents of this component
export default function destroySubComponents(callback) {

  var self = this;

  var components = Object.keys(this._components);

  Async.each(components, function(component, cb) {

    self.Components[component]._remove(function() {
      delete self.Components[component];
      cb();
    });

  }, function() {

    self._componentsLoaded = false;
    callback();

  });

}
