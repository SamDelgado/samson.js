// Client localStorage DB to keep data persisted

export const LocalStorage = {

  save: function(key, value, dont_stringify) { // save an item to localStorage

    value = (value !== undefined && value !== null && value !== false) ? value : "";

    if (!dont_stringify) value = JSON.stringify(value);

    localStorage.setItem(key, value);

    return true;

  },

  get: function(key, dont_parse) { // retrieve a single item from localStorage

    var found_item;

    var item = localStorage.getItem(key);

    if (item) {
      found_item = !dont_parse ? JSON.parse(item) : item;
    }

    return found_item;

  },

  remove: function(key) { // remove a single item from localStorage

    localStorage.removeItem(key);

    return true;

  },

  removeAll: function() { // destroy the whole localStorage

    localStorage.clear();

    return true;

  },

  items: function() { // retrieve all items in localStorage

    Object.keys(localStorage).reduce(function(items, key) { 

      items[key] = localStorage.getItem(key); 
      return items;
      
    }, {});

  }

};
