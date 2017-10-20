
import Async from 'async-lite'; // async helper functions
import Gator from 'gator'; // event delegation

import { SamsonApp } from '../index.js';
import SamsonRouter from '../router/router.js';

import addCustomLogging from '../utils/addCustomLogging.js';
import makeObjectAnEventBus from '../utils/makeObjectAnEventBus.js';
import extendObject from '../utils/extendObject.js';
import { LocalStorage } from '../utils/localStorage.js';

import { justCallback } from '../utils/functions.js';

import cacheSamsonDOMElements from './cacheSamsonDOMElements.js';

import launchSamsonApp from './launchSamsonApp.js';

// Properties on the App object reserved by Samson. All properties starting with _ are also reserved
import { RESERVED_PROPS } from './reserved_app_properties.js';

// Creates the Samson App object
export default function createBaseSamsonAppObject(SamsonAppBundle) {
  
  SamsonApp.Name = SamsonAppBundle.Name || 'App';
  SamsonApp.DEBUG = SamsonAppBundle.DEBUG || (window && window.DEBUG);

  // Make the app object an event bus
  makeObjectAnEventBus(SamsonApp);

  // Add custom logging to the Samson App if in DEBUG mode
  SamsonApp.log = addCustomLogging(SamsonApp.Name, SamsonApp.DEBUG);

  // Add the localStorage module to the Samson App object
  SamsonApp.Storage = LocalStorage;

  // setup the app's DOM Element cache
  SamsonApp.DOM = {};
  cacheSamsonDOMElements();

  // setup the app's data cache
  SamsonApp.Data = SamsonAppBundle.Data || {};

  // setup the app's custom config
  SamsonApp.Config = SamsonAppBundle.Config || {};

  // setup the app's 3rd party modules accessible from App.Modules[module_name]
  SamsonApp.Modules = SamsonAppBundle.Modules || {};

  // setup the app's pages
  SamsonApp.Pages = SamsonAppBundle.Pages || {};

  // setup the app's base components
  SamsonApp.__components = SamsonAppBundle.Components || {};
  SamsonApp.Components = {};

  // setup the app's router after loading any extra components
  SamsonApp.Router = new SamsonRouter(SamsonAppBundle.Router || {});

  // attach any unreserved properties from the SamsonAppBundle object to the App object
  extendObject(SamsonApp, SamsonAppBundle, RESERVED_PROPS);

  // setup the Samson App delegate for DOM event listeners
  SamsonApp.delegate = Gator(SamsonApp.DOM.App);

  // attach the Setup loadState and launch methods to the app object
  const Setup = SamsonAppBundle.Setup || {};
  const launchTasks = Setup.launchTasks || {};

  SamsonApp.loadState = Setup.loadState || justCallback;

  SamsonApp.launch = launchSamsonApp(launchTasks);

}
