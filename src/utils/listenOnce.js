// listen to an event once

export default function listenOnce(element, type, callback) {

  function wrapper(e) {

    // remove event
    e.target.removeEventListener(e.type, wrapper);

    return callback(e);

  }

  // create event
  element.addEventListener(type, wrapper);

}
