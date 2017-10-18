// listen to an event once

export default function listenOnce(element, type, callback) {

  // create event
  element.addEventListener(type, function handler(e) {
    // remove event
    element.removeEventListener(type, handler);
    // call handler
    return callback();
    
  });

}