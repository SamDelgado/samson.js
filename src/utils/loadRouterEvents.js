
import { SamsonApp } from '../index.js';

export default function loadRouterEvents(component) {
  
  Object.keys(component.__routerEvents).forEach(function(router_event) {
    
    SamsonApp.Router[router_event][component.__uuid] = component.__routerEvents[router_event].bind(component);

  });

};
