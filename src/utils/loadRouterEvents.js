
import { SamsonApp } from '../index.js';

export default function loadRouterEvents(component) {
  
  Object.keys(component._routerEvents).forEach(function(router_event) {
    
    SamsonApp.Router[router_event][component._uuid] = component._routerEvents[router_event].bind(component);

  });

};
