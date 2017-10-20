// add any unreserved properties to the passed in object
// any properties starting with __ are reserved

// return true for any word that starts with __ (2 underscores)
function startsWith__(word) {
  return (word.charAt(0) == '__') ? true : false;
}

export default function extendObject(obj, custom_props, reserved) {

  Object.keys(custom_props).forEach(function(prop) {
    
    if (!obj[prop] && !startsWith__(prop) && reserved.indexOf(prop) === -1) {
      obj[prop] = custom_props[prop];
    }

  });

};
