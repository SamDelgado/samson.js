// listen to an event once

export default function listenOnce(element, type, callback) {

  // create event
  element.addEventListener(type, function(e) {
    // remove event
    e.target.removeEventListener(e.type, arguments.callee);
    // call handler
    return callback(e);
    
  });

}
