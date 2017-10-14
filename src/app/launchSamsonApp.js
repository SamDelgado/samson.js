/* The App.launch method will do the following:

  - Load our top-level components
  - Configure any modules with a 'configure' method
  - Run any specified launchTasks. If a loadData task exists, it will run first. All other tasks will run in parallel.
  - Run our loadState method to render the first page

*/

import Async from 'async-lite';

import { SamsonApp } from '../index.js';

import SamsonComponent from '../component/component.js';

export default function launchSamsonApp(launchTasks) {

  function runTasks(event, tasks) {
  
    return function(callback) {
  
      SamsonApp.DEBUG && SamsonApp.log('Running all ' + event + 'Launch tasks');
      
      // all of these tasks will run in parallel
      Async.parallel(tasks, function() {
    
        SamsonApp.DEBUG && SamsonApp.log('All ' + event + 'Launch tasks have completed successfully');
    
        callback();
    
      });
  
    }
  
  }

  function loadComponents(callback) {

    SamsonApp.DEBUG && SamsonApp.log('Loading all top-level components');

    var unloadedComponents = SamsonApp._components;
    var Components = SamsonApp.Components;

    // Load all of the app's top-level Components
    Async.each(Object.keys(unloadedComponents), function(component, cb) {
  
      Components[component] = new SamsonComponent(unloadedComponents[component], false);
      Components[component].parent = {element: SamsonApp.DOM.App, delegate: SamsonApp.delegate};
  
      Components[component]._render(false, null, function() {
        cb();
      });
  
    }, function() {
      
      SamsonApp.DEBUG && SamsonApp.log('All top-level components were loaded successfully');

      callback();

    });

  }

  function configureModules(callback) {

    SamsonApp.DEBUG && SamsonApp.log('Configuring all modules');

    // configure any of the app's modules that require configuration
    Async.each(Object.keys(SamsonApp.Modules), function(module, cb) {

      if (module.configure) module.configure();
      cb();

    }, function() {

      SamsonApp.DEBUG && SamsonApp.log('All modules were configured successfully');

      callback();

    });

  }

  // setup our before, during, and after launch tasks
  var beforeLaunchTasks = launchTasks.before || [];

  var duringLaunchTasks = launchTasks.during || [];
  duringLaunchTasks.push(loadComponents);

  var afterLaunchTasks = launchTasks.after || [];
  afterLaunchTasks.push(configureModules);

  return function launch() {

    // wait for the Cordova deviceready event or DOMContentLoaded event to fire before the launching the Samson App
    const readyEventName = (window.cordova) ? 'deviceready' : 'DOMContentLoaded';
    
    document.addEventListener(readyEventName, function() {
  
      SamsonApp.DEBUG && SamsonApp.log(readyEventName);
  
      Async.series([
        runTasks('before', beforeLaunchTasks),
        runTasks('during', duringLaunchTasks),
        runTasks('after', afterLaunchTasks),
      ], function(err, results) {
  
        SamsonApp.emit('app:ready');
  
        SamsonApp.loadState();
  
      });  
  
    }, false);

  }

}
