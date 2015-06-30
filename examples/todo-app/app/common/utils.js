
module.exports = {

  /*
    The isElementVisible function helps us determine if an element is currently visible within the device's viewport
    it is passed a mandatory el argument which is the element we are checking to see is visible
    the optional options argument is an object containing "dimensions", "container", and "some" properties. The dimensions property is an object containing "top", "right", "bottom", and "left" properties that have pixel values.
    the optional container object is an HTML node representing the container you are checking to see the element is visible in, rather than the whole viewport
    if the some property exists and is set to true, then any part of the element being visible will result in true
  */
  isElementVisible : function(el, options){ // options = dimensions (object), container (element), some (boolean)
    var element = el.getBoundingClientRect();
    var parent;

    // if the optional container argument was passed, get its dimensions with getBoundingClientRect()
    if (options && options.container) {
      parent = options.container.getBoundingClientRect();
    }

    // no optional container argument was passed so set the parent dimensions to the viewport's
    else {
      parent.top = 0; parent.bottom = window.innerHeight;
      parent.left = 0; parent.right = window.innerWidth;
    }

    // if the dimensions argument was passed, then we add or subtract those pixel values from our parent dimensions
    // this allows us to account for things like a 60px header
    if (options && options.dimensions) {
      var dimensions = options.dimensions;
      parent.top = parent.top + (dimensions.top || 0);
      parent.right = parent.right - (dimensions.right || 0);
      parent.bottom = parent.bottom - (dimensions.bottom || 0);
      parent.left = parent.left + (dimensions.left || 0);
    }

    // if the some argument was true, then we will check if just some, but not all of the element is visible within the parent container
    if (options && options.some) {
      return (
        (element.top <= parent.bottom) && (element.left <= parent.right) &&
        (element.bottom >= parent.top) && (element.right >= parent.left)
      );
    } else {
      return (
        (element.top >= parent.top) && (element.left >= parent.left) &&
        (element.bottom <= parent.bottom) && (element.right <= parent.right)
      );
    }
  }

};
