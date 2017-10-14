
import Async from 'async-lite';

// render the subcomponents of this component
export default function renderSubComponents(force_update, callback) {

  var self = this;

  var components = Object.keys(this._components);

  Async.each(components, function(component, cb) {

    self.Components[component]._render(force_update, null, function() {
      cb();
    });

  }, function(){

    callback();
    
  });

}
