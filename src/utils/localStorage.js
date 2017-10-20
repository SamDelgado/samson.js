// Client localStorage DB to keep data persisted

// save an item to localStorage
function save(key, value, dont_stringify) {

  value = (value !== undefined && value !== null && value !== false) ? value : "";

  if (!dont_stringify) value = JSON.stringify(value);

  localStorage.setItem(key, value);

  return true;

}

// retrieve a single item from localStorage
function find(key, dont_parse) {

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
function removeAll() {
  localStorage.clear();
  return true;
}

// retrieve all keys in localStorage
function getKeys() {
  return Object.keys(localStorage);
}

// retrieve all items in localStorage
function getItems() {

  getKeys().reduce(function(items, key) { 

    items[key] = find(key); 
    return items;
    
  }, {});

}

export const LocalStorage = {

  save: save,
  set: save,

  find: find,
  get: find,

  remove: remove,
  delete: remove,

  removeAll: removeAll,
  deleteAll: removeAll,
  clear: removeAll,


  keys: getKeys,

  items: getItems

};
