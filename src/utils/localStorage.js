// Client localStorage DB to keep data persisted

// save an item to localStorage
function set(key, value, dont_stringify) {

  value = (value !== undefined && value !== null && value !== false) ? value : "";

  if (!dont_stringify) value = JSON.stringify(value);

  localStorage.setItem(key, value);

  return true;

}

// retrieve a single item from localStorage
function get(key, dont_parse) {

  var found_item;

  var item = localStorage.getItem(key);

  if (item) {
    found_item = !dont_parse ? JSON.parse(item) : item;
  }

  return found_item;

}

// remove a single item from localStorage
function remove(key) {
  localStorage.removeItem(key);
  return true;
}

// destroy the whole localStorage
function clear() {
  localStorage.clear();
  return true;
}

// retrieve all keys in localStorage
function getKeys() {
  return Object.keys(localStorage);
}

// retrieve all items in localStorage
function getItems() {

  var items = {};
  var keys = Object.keys(localStorage);
  var i = keys.length;

  while (i--) {
    var key = keys[i];
    items[key] = get(key);
  }

  return items;

}

export const Storage = {

  save: set,
  set: set,

  find: get,
  get: get,

  remove: remove,
  delete: remove,

  removeAll: clear,
  deleteAll: clear,
  clear: clear,


  keys: getKeys,

  items: getItems

};
