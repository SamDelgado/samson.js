var Async = require('async-lite');
var Samson = require('../samson');

// attach the components passed back from the setComponents function
module.exports = function loadComponents(force_update, callback) {

  var self = this;

  // If the components aren't loaded, or force_update is true, then load the components
  if (!this._componentsLoaded || force_update) {

    var new_components = this.setComponents();

    // First we go through each currently attached component, and check to see if it should still exist
    var old_components = Object.keys(this._components);
    Async.each(old_components, function(old_component, cb) {

      var should_be_loaded = false;
      var new_component;
      for (new_component in new_components) {
        if (old_component === new_component) should_be_loaded = true;
      }

      // If the component should be loaded but isn't, then we load it. Otherwise we just skip it
      if (should_be_loaded) {
        // if the component hasn't been loaded yet, then load it
        if (!self.Components[old_component]) {
          self.Components[old_component] = Samson.createComponent(self._components[old_component], false);
          self.Components[old_component].parent = self;
        }
        cb();

      } else {
        // remove the component since it shouldn't be loaded
        if (self.Components[old_component]) {
          self.Components[old_component]._remove(function() {
            delete self.Components[old_component];
            cb();
          });
        } else {
          cb();
        }
      }

    }, function() {

      // Now that we handled all of the existing components, we load any new components that don't exist yet
      self._components = new_components;

      var component;
      for (component in self._components) {
        if (!self.Components[component]) {
          self.Components[component] = Samson.createComponent(self._components[component], false);
          self.Components[component].parent = self;
        }
      }

      self._componentsLoaded = true;
      if (callback) callback();
    });

  } else {
    if (callback) callback();
  }

};
