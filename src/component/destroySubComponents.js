
import Async from 'async-lite';

// destroy the subcomponents of this component
export default function destroySubComponents(callback) {

  var self = this;

  var components = Object.keys(this.__components);

  Async.each(components, function(component, cb) {

    self.Components[component].__remove(function() {
      delete self.Components[component];
      cb();
    });

  }, function() {

    self.__componentsLoaded = false;
    callback();

  });

}
