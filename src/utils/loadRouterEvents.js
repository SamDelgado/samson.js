
import { SamsonApp } from '../index.js';

export default function loadRouterEvents(component) {
  
  var router_event;
  for (router_event in component._routerEvents) {
    SamsonApp.Router[router_event][component._uuid] = component._routerEvents[router_event].bind(component);
  }

};
