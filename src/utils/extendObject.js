// add any unreserved properties to the passed in object
// any properties starting with _ are reserved

// return true for any word that starts with _
function startsWith_(word) {
  return (word.charAt(0) == "_") ? true : false;
}

export default function extendObject(obj, custom_props, reserved) {
  var key;
  for (key in custom_props) {
    if (!startsWith_(key) && reserved.indexOf(key) === -1) {
      obj[key] = custom_props[key];
    }
  }
};
