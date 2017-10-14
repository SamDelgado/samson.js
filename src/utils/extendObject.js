// add any unreserved properties to the passed in object
// any properties starting with _ are reserved

// return true for any word that starts with _
function startsWith_(word) {
  return (word.charAt(0) == "_") ? true : false;
}

export default function extendObject(obj, custom_props, reserved) {

  Object.keys(custom_props).forEach(function(prop) {
    
    if (!startsWith_(prop) && reserved.indexOf(prop) === -1) {
      obj[prop] = custom_props[prop];
    }

  });

};
