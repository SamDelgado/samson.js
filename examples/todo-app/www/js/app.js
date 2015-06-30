(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var Samson = require('./../../../lib');
var Log = require('./common/modules/log');
var Todos = require('./common/todosCollection');

// pass in the name of the app object if you want it added to the global scope
var App = Samson.createApp("App");

// add the app name to the global scope if name is passed in
global.App = App;

// Samson App options
var options = {

  //setComponents : require('common/setComponents'), // optional function that returns a component object - use if the app components are dynamic based on screensize, device OS, etc

  components : require('./components'),

  pages: require('./pages'),

  data: {
    sideMenu : {
      selected: "home",
      pages: [
        {path:"home", name:"Home", icon: "fa-home"},
        {path:"addTodos", name:"Add Todos", icon: "fa-plus"},
        {path:"viewTodos", name:"View Todos", icon: "fa-tasks"}
      ]
    }
  },

  // any custom methods/properties you want attached directly to the app object. the context will be the app object
  custom: {
    Models : {},
    Collections : {
      Todos: new Todos()
    }
  },

  router : {
    animations: require('./common/router_animations'),
    defaultNavigateAnimation: "right",
    defaultBackAnimation: "left"
  }

};

App.configure(options, function() {

  // The Samson App is now configured and ready to use
  Log("Samson app has been initialized");

  var startApp = require('./common/startApp');

  // if we detect cordova then wait for the deviceready event
  if (typeof window.cordova === 'object') {

    document.addEventListener('deviceready', function () {
      Log("Device is now ready");

      startApp();
    }, false);

  } else {

    startApp();

  }

});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../../lib":30,"./common/modules/log":3,"./common/router_animations":4,"./common/startApp":6,"./common/todosCollection":7,"./components":13,"./pages":21}],2:[function(require,module,exports){
// db.js - Client localStorage DB to keep data persisted

var local_storage_exists = typeof window.localStorage === 'object';

module.exports = {

  save: function(key, value, cb) { // save an item to localStorage

    if (local_storage_exists) {
     window.localStorage[key] = JSON.stringify(value);
    }

    if (cb) {
      cb(true);
    } else {
      return true;
    }

  },

  get: function(key, cb) { // retrieve a single item from localStorage

    var found_item = false;

    if (local_storage_exists) {

      var item = window.localStorage[key];

      if (item) {
        found_item = JSON.parse(item);
      }

    }

    if (cb) {
      cb(found_item);
    } else {
      return found_item;
    }

  },

  remove: function(key, cb) { // remove a single item from localStorage

    if (local_storage_exists) {
      window.localStorage.removeItem(key);
    }

    if (cb) {
      cb(true);
    } else {
      return true;
    }

  },

  removeAll: function(cb) { // destroy the whole localStorage

    if (local_storage_exists) {
      window.localStorage.clear();
    }

    if (cb) {
      cb(true);
    } else {
      return true;
    }

  },

  items: function(cb) {

    var keys = false;

    if (local_storage_exists) {
      keys = [];

      for (var i=0; i<window.localStorage.length; i++) {
        keys.push(window.localStorage.key(i));
      }
    }

    if (cb) {
      cb(keys);
    } else {
      return keys;
    }

  }

};

},{}],3:[function(require,module,exports){
// app logging settings
var settings = require('./../settings');

module.exports = function Log(message) {

  if (!settings.production) {

    console.log("Development Message: " + message);
    return;

  } else {

    console.log(message);
    return;

  }

};

},{"./../settings":5}],4:[function(require,module,exports){

module.exports = {

  "right-fast" : { current: "move-to-left-fast", next: "move-from-right-fast" },
  "left-fast" : { current: "move-to-right-fast", next: "move-from-left-fast" }

};

},{}],5:[function(require,module,exports){

module.exports = {

  production: false

};

},{}],6:[function(require,module,exports){
var async = require('async-lite');
var Log = require('./modules/log');

module.exports = function() {

  async.parallel({

    // do things here before we navigate to the first page
    loadDeviceEvents: function(callback) {
      callback(null);
    },

  }, function(err) {

    if (err) {
      Log("Error loading the app");
    } else {

      Log("App is done loading");

      App.emit("app:initialized");

      // Navigate to the Home page
      App.Router.navigate("home", "fade");

    }

  });

};

},{"./modules/log":3,"async-lite":24}],7:[function(require,module,exports){

var db = require('./modules/db');

module.exports = function Todos() {

  var todos = db.get("Todos") || [];

  this.add = function(todo_text) {

    // give the todo a unique id
    var todo = {
      _id : "todo-" + Date.now(),
      text: todo_text
    };

    todos.push(todo);

    // resave the array of todos in localStorage
    db.save("Todos", todos);

  };

  this.remove = function(todo_id) {

    for (var i=0; i<todos.length; i++) {
      // remove the todo from the todos array if the _id's match
      if (todos[i]._id === todo_id) {
        todos.splice(i, 1);
        break;
      }
    }

    // resave the array of todos in localStorage
    db.save("Todos", todos);

  };

  this.update = function(todo_id, todo_text) {

    for (var i=0; i<todos.length; i++) {
      if (todos[i]._id === todo_id) {
        todos[i].text = todo_text;
        break;
      }
    }

    // resave the array of todos in localStorage
    db.save("Todos", todos);

  };

  this.get = function(todo_id) {

    for (var i=0; i<todos.length; i++) {
      if (todos[i]._id === todo_id) {
        return todos[i];
      }
    }

  };

  this.getAll = function() {
    return todos.slice(0);
  };

  this.reset = function() {

    todos = [];

    db.save("Todos", []);

  };

};

},{"./modules/db":2}],8:[function(require,module,exports){

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

},{}],9:[function(require,module,exports){

var Samson = require('./../../../../../lib');

var success_color = "green";
var error_color = "red";
var info_color = "blue";

module.exports = {

  el: 'samson_alerts_container',

  domEvents: {},

  appEvents: {

    'alert:success': function(message) {
      this.createAlert(message, "success");
    },

    'alert:error': function(message) {
      this.createAlert(message, "error");
    },

    'alert:info': function(message) {
      this.createAlert(message, "info");
    },

    'alert': function(message, bg_color, text_color) {
      this.createAlert(message, "info", bg_color, text_color);
    }

  },

  extend: {

    createAlert: function(message, alert_type, bg_color, text_color) {

      if (typeof message === 'number') {
        message = message + "";
      } else if (typeof message !== 'string') {
        throw new Error("Alert messages must be a string or number");
      }

      var alert = document.createElement("div")
      alert.id = "alert-" + Date.now();
      alert.classList.add("samson_alert");

      // add the success or error alert class if that is the chosen alert_type
      if (!bg_color && !text_color && alert_type !== "info") alert.classList.add(alert_type + "_alert");

      // add the background color if provided
      if (bg_color) alert.style.backgroundColor = bg_color;

      // add the text color if provided
      if (text_color) alert.style.color = text_color;
      alert.textContent = message;

      // append the alert to the samson_alerts_container
      var firstChild = Samson.App.DOM.samson_alerts.firstChild;
      if (firstChild) {
        Samson.App.DOM.samson_alerts.insertBefore(alert, firstChild);
      } else {
        Samson.App.DOM.samson_alerts.appendChild(alert);
      }

      // initiate the alert fade in

      // use getComputedStyle to make sure the element is already added to the DOM before applying the transition class
      window.getComputedStyle(alert).cssText;
      alert.classList.add("show");

      // show the notification for 3 seconds before removing
      setTimeout(function() {

        alert.style.opacity = 0;

        setTimeout(function() {
          alert.parentNode.removeChild(alert);
        }, 800);

      }, 3000);

    },

    success: function(message) {
      this.createAlert(message, "success");
    },

    error: function(message) {
      this.createAlert(message, "error");
    },

    info: function(message) {
      this.createAlert(message, "info");
    },

    custom: function(message, bg_color, text_color) {
      this.createAlert(message, "info", bg_color, text_color);
    }

  },

  router: {


  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the transparent overlay element
    Samson.App.DOM.samson_alerts = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the transparent overlay element from the cache
    delete Samson.App.DOM.samson_alerts;

    callback();

  }

};

},{"./../../../../../lib":30}],10:[function(require,module,exports){

var Samson = require('./../../../../../lib');

module.exports = {

  el: 'samson_faded_overlay',

  domEvents: {

    'touch' : function(event) {
      this.hideFadedOverlay();
      Samson.App.emit("faded-overlay:hit");
    }

  },

  appEvents: {

    'side-menu:hit': function() {
      if (this.isVisible) {
        this.hideFadedOverlay();
      }
    },

    'header:menu-button:hit': function() {
      this.toggleFadedOverlay();
    }

  },

  extend: {

    isVisible : false,

    hideFadedOverlay : function() {
      this.element.classList.remove("show");
      this.isVisible = false;
    },

    showFadedOverlay : function() {
      this.element.classList.add("show");
      this.isVisible = true;
    },

    toggleFadedOverlay: function() {
      if (this.isVisible) {
        this.hideFadedOverlay();
      } else {
        this.showFadedOverlay();
      }
    }

  },

  router: {

    // make sure that the faded overlay is removed before any new page is transitioned to
    beforeAnimate: function(data, callback) {

      if (this.isVisible && data.currentAnimation !== "update") {
        this.hideFadedOverlay();
      }

      callback();
    }

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the faded overlay element
    Samson.App.DOM.samson_faded_overlay = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the faded overlay element from the cache
    delete Samson.App.DOM.samson_faded_overlay;

    callback();

  }

};

},{"./../../../../../lib":30}],11:[function(require,module,exports){

var Samson = require('./../../../../../lib');

var header_height = "60px";

module.exports = {

  el: 'samson_header',
  template: require("./template.jade"),

  domEvents: {

    'touch #samson_header_menu_button': function() {
      Samson.App.emit('header:menu-button:hit');
    },

    'touch #samson_header_back_button': function() {
      Samson.App.emit('header:back-button:hit');
    }

  },

  appEvents: {

    'app:initialized': function() {
      this.showHeader();
    },

    'header:show': function() {
      this.showHeader();
    },

    'header:hide': function() {
      this.hideHeader();
    }

  },

  extend: {

    headerHeight: header_height,

    isVisible : false,

    hideHeader : function() {
      this.element.classList.remove("show");
      this.isVisible = false;
    },

    showHeader : function() {
      this.element.classList.add("show");
      this.isVisible = true;
    },

    toggleHeader: function() {
      if (this.isVisible) {
        this.hideHeader();
      } else {
        this.showHeader();
      }
    }

  },

  router: {

    beforeAnimate: function(data, callback) {

      // if the page is fullscreen, then hide the header and stretch the page to the top of the screen
      if (Samson.App.Router.pageCache[data.nextPage].fullscreen) {
        Samson.App.DOM[data.inactivePageElement].style.top = "";
        this.hideHeader();
      } else {
        Samson.App.DOM[data.inactivePageElement].style.top = header_height;
        this.showHeader();
      }

      callback();
    },

    duringAnimate: function(data) { // no callback

      // if the next page has a previousPage, then replace the #samson_header_menu_button with #samson_menu_back_button
      if (Samson.App.Pages[data.nextPage].previousPage) {
        Samson.App.Data.Header.button = "back";
      }

      this.resetState();
    }

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      title: Samson.App.Data.Header.title,
      button: Samson.App.Data.Header.button
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    if (!Samson.App.Data.Header) {
      Samson.App.Data.Header = {};
    }

    if (!Samson.App.Data.Header.title) {
      Samson.App.Data.Header.title = "App";
    }

    if (!Samson.App.Data.Header.button) {
      Samson.App.Data.Header.button = "menu";
    }

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the header element
    Samson.App.DOM.samson_header = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the header element from the chache
    delete Samson.App.DOM.samson_header;

    callback();

  }

};

},{"./../../../../../lib":30,"./template.jade":12}],12:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (button, title) {
if ( button === "menu")
{
buf.push("<div id=\"samson_header_menu_button\"><i class=\"fa fa-bars\"></i></div>");
}
else if ( button === "back")
{
buf.push("<div id=\"samson_header_back_button\"><i class=\"fa fa-chevron-left\"></i></div>");
}
buf.push("<div id=\"samson_header_title\">" + (jade.escape((jade_interp = title) == null ? '' : jade_interp)) + "</div>");}.call(this,"button" in locals_for_with?locals_for_with.button:typeof button!=="undefined"?button:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
};
},{"jade/runtime":27}],13:[function(require,module,exports){

module.exports = {

  header : require('./header'),

  sideMenu : require('./sideMenu'),

  fadedOverlay : require('./fadedOverlay'),

  transparentOverlay : require('./transparentOverlay'),

  alert :  require('./alerts')

};

},{"./alerts":9,"./fadedOverlay":10,"./header":11,"./sideMenu":14,"./transparentOverlay":16}],14:[function(require,module,exports){

var Samson = require('./../../../../../lib');

module.exports = {

  el: 'samson_sidemenu',
  template: require("./template.jade"),

  domEvents: {

    // handle any .samson_sidemenu_item being touched
    'touch .samson_sidemenu_item': function(event, target) {

      // make sure the router isn't already busy before accepting any events from the sidemenu
      if (!Samson.App.Router.isBusy) {

        var path = target.getAttribute("data-page");

        // set selected as true on the targeted side_menu_item
        Samson.App.Data.sideMenu.pages.forEach(function(page) {
          if (page.path === path) {
            Samson.App.Data.sideMenu.selected = path;
          }
        });

        // force the sidemenu to rerender if the selected sidemenu_item has changed
        this.resetState();

        // only navigate if we aren't already on the selected page
        if (path !== Samson.App.Router.currentPage) {

          // remove the focus_element so that it doesn't try to refocus during the page animation
          delete Samson.App.DOM.samson_focus_element;

          // navigate to the new page
          Samson.App.Router.navigate(path, "right");

        } else {
          this.closeSideMenu();
          Samson.App.emit("side-menu:hit");
        }

      }

    }

  },

  appEvents: {

    'header:menu-button:hit': function() {
      this.toggleSideMenu();
    },

    'faded-overlay:hit': function() {
      if (this.isOpen) {
        this.closeSideMenu();
      }
    }

  },

  extend: {

    isOpen: false,

    closeSideMenu: function() {
      this.element.classList.remove("open");
      this.isOpen = false;

      // restore focus to the element that had focus before the sideMenu was open
      if (Samson.App.DOM.samson_focus_element) {
        Samson.App.DOM.samson_focus_element.focus();

        // move the cursor to the end of the text
        var value_length = Samson.App.DOM.samson_focus_element.oldCursorPosition === undefined ? false : Samson.App.DOM.samson_focus_element.oldCursorPosition;
        value_length = (value_length === false) ? Samson.App.DOM.samson_focus_element.value.length : value_length;
        Samson.App.DOM.samson_focus_element.setSelectionRange(value_length, value_length);

        delete Samson.App.DOM.samson_focus_element;
      }

    },

    openSideMenu: function() {
      this.element.classList.add("open");
      this.isOpen = true;

      // hide the keyboard and remove focus from an input/textarea element if necessary
      if (document.activeElement !== document.body) {
        Samson.App.DOM.samson_focus_element = document.activeElement;
        Samson.App.DOM.samson_focus_element.oldCursorPosition = Samson.App.DOM.samson_focus_element.selectionStart;

        Samson.App.DOM.samson_focus_element.blur();
      }

    },

    toggleSideMenu: function() { // if the sidemenu is closed then open it, if open then close it
      if (this.isOpen) {
        this.closeSideMenu();
      } else {
        this.openSideMenu();
      }
    }

  },

  router: {

    // make sure that the side menu is closed before any new page is transitioned to
    beforeAnimate: function(data, callback) {

      if (this.isOpen  && data.currentAnimation !== "update") {
        this.closeSideMenu();
      }

      callback();
    }

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {

      pages: Samson.App.Data.sideMenu.pages,
      selected: Samson.App.Data.sideMenu.selected

    };

    return state;

  },

  // this function runs after the Component is rendered
  afterRender : function(callback) {

    // cache the sidemenu element
    Samson.App.DOM.samson_sidemenu = this.element;

    callback();

  },

  // this function runs right before the Component is destroyed
  beforeRemove : function(callback) {

    // delete the sidemenu element from the cache
    delete Samson.App.DOM.samson_sidemenu;

    callback();

  }

};

},{"./../../../../../lib":30,"./template.jade":15}],15:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (pages, selected, undefined) {
// iterate pages
;(function(){
  var $$obj = pages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var page = $$obj[$index];

buf.push("<div" + (jade.attr("data-page", page.path, true, false)) + (jade.cls(["samson_sidemenu_item " + ((page.path === selected ? 'selected' : '')) + ""], [true])) + "><i" + (jade.cls(['fa',page.icon], [null,true])) + "></i>" + (jade.escape((jade_interp = page.name) == null ? '' : jade_interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var page = $$obj[$index];

buf.push("<div" + (jade.attr("data-page", page.path, true, false)) + (jade.cls(["samson_sidemenu_item " + ((page.path === selected ? 'selected' : '')) + ""], [true])) + "><i" + (jade.cls(['fa',page.icon], [null,true])) + "></i>" + (jade.escape((jade_interp = page.name) == null ? '' : jade_interp)) + "</div>");
    }

  }
}).call(this);
}.call(this,"pages" in locals_for_with?locals_for_with.pages:typeof pages!=="undefined"?pages:undefined,"selected" in locals_for_with?locals_for_with.selected:typeof selected!=="undefined"?selected:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":27}],16:[function(require,module,exports){

var Samson = require('./../../../../../lib');

module.exports = {

  el: 'samson_transparent_overlay',

  domEvents: {

    'touch' : function(event) {
      Samson.App.emit("transparent-overlay:hit");
    }

  },

  appEvents: {},

  extend: {

    isVisible: false,

    hideTransparentOverlay : function() {
      this.element.classList.remove("show");
      this.isVisible = false;
    },

    showTransparentOverlay : function() {
      this.element.classList.add("show");
      this.isVisible = true;
    },

    toggleTransparentOverlay : function() {
      if (this.isVisible) {
        this.hideTransparentOverlay();
      } else {
        this.showTransparentOverlay();
      }
    }

  },

  router: {

    beforeAnimate: function(data, callback) {
      this.showTransparentOverlay();
      callback();
    },

    afterAnimate: function(data, callback) {
      this.hideTransparentOverlay();
      callback();
    }

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the transparent overlay element
    Samson.App.DOM.samson_transparent_overlay = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the transparent overlay element from the cache
    delete Samson.App.DOM.samson_transparent_overlay;

    callback();

  }

};

},{"./../../../../../lib":30}],17:[function(require,module,exports){

var db = require('./../../common/modules/db');
var autosize = require('autosize');

module.exports = {

  path: 'addTodos',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),
  extend: {
    fullscreen: false,
  },

  domEvents : {

    // update the value of the current todo in localStorage and resize the textarea if necessary
    'input #new-todo-textarea': function() {

      // store the current value of the new ToDo Item
      App.Models.TodoItem = App.DOM.new_todo_textarea.value;
      db.save("TodoItem", App.DOM.new_todo_textarea.value);

    },

    // validate the todo and add it to the Todos collection
    'touch #new-todo-submit-button': function() {

      App.emit("alert:success", "New ToDo Item submitted successfully!");

      var todo = App.DOM.new_todo_textarea.value;

      App.DOM.new_todo_textarea.value = "";
      autosize.update(App.DOM.new_todo_textarea);

      App.Models.TodoItem = "";
      db.remove("TodoItem");

      App.Collections.Todos.add(todo);

    }

  },

  appEvents : {},

  router: {

    afterAnimate: function(data, callback) {
      callback();
    }

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      todo_item: App.Models.TodoItem
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    App.Data.Header.title = "Add ToDos";

    // check if a TodoItem is already in localStorage
    if (App.Models.TodoItem === undefined) {
      App.Models.TodoItem = db.get("TodoItem") || "";
    }

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    App.DOM.new_todo_textarea = document.getElementById("new-todo-textarea");

    autosize(App.DOM.new_todo_textarea);

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    autosize.destroy(App.DOM.new_todo_textarea);

    delete App.DOM.new_todo_textarea;

    callback();

  }

};

},{"./../../common/modules/db":2,"./template.jade":18,"autosize":25}],18:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (todo_item) {
buf.push("<textarea id=\"new-todo-textarea\" rows=\"1\" placeholder=\"Add a new ToDo Item here...\" required=\"required\" autofocus=\"autofocus\">" + (jade.escape((jade_interp = todo_item) == null ? '' : jade_interp)) + "</textarea><div id=\"new-todo-submit-button\">Add Item</div>");}.call(this,"todo_item" in locals_for_with?locals_for_with.todo_item:typeof todo_item!=="undefined"?todo_item:undefined));;return buf.join("");
};
},{"jade/runtime":27}],19:[function(require,module,exports){

module.exports = {

  path: 'home',
  subPageOf: false,
  previousPage: false,
  template: require("./template.jade"),

  domEvents : {},

  appEvents : {},

  extend : {

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      name: "Home Page"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    App.Data.Header.title = "ToDo App";

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    //this.topBox.off('clicked');

    callback();

  }

};

},{"./template.jade":20}],20:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"app-info\">This simple app will allow you to manage a ToDo List. Hit the menu button to navigate to the \"Add ToDos\" or \"View ToDos\" pages. Any ToDo items you add will be stored on your device, so that you can access them even when you are offline.</div>");;return buf.join("");
};
},{"jade/runtime":27}],21:[function(require,module,exports){

module.exports = {

  home: require('./home'),

  addTodos: require('./addTodos'),

  viewTodos: require('./viewTodos')

};

},{"./addTodos":17,"./home":19,"./viewTodos":22}],22:[function(require,module,exports){

var Utils = require('./../../common/utils');
var autosize = require('autosize');

module.exports = {

path: 'viewTodos',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),

  extend: {
    fullscreen: false,
  },

  domEvents : {

    // remove a todo item if the remove button is touched
    'touch .todo-item-remove-button' : function(e, target) {

      var todo_id = target.parentNode.getAttribute("data-id");

      App.emit("alert:error", todo_id + " destroyed");

      // remove the autosize listener on this items textarea
      autosize.destroy(target.parentNode.querySelector("textarea"));

      App.Collections.Todos.remove(todo_id);
      this.resetState();

    },

    // remove focus from any textarea if the user touches off of it
    'touch #viewTodos-page': function(e) {
      console.log("touched the page");

      if (e.target.id === "viewTodos-page") {
        document.activeElement.blur();
      }

    },

    // store the new array of todos if any todo item's value is updated
    'input .todo-item-text': function(e) {

      var todo_id = e.target.parentNode.getAttribute("data-id");
      var todo_text = e.target.value;

      App.Collections.Todos.update(todo_id, todo_text);
      this.resetState();

    }

  },

  appEvents : {},

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      todos: App.Collections.Todos.getAll()
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    App.Data.Header.title = "Your ToDo List";

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    autosize(this.element.querySelectorAll("textarea"));

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    autosize.destroy(this.element.querySelectorAll("textarea"));

    callback();

  }

};

},{"./../../common/utils":8,"./template.jade":23,"autosize":25}],23:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (todos, undefined) {
// iterate todos
;(function(){
  var $$obj = todos;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var todo = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", todo._id, true, false)) + " class=\"todo-item\"><textarea rows=\"1\" class=\"todo-item-text\">" + (jade.escape((jade_interp = todo.text) == null ? '' : jade_interp)) + "</textarea><div class=\"todo-item-remove-button\"><i class=\"fa fa-times\"></i></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var todo = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", todo._id, true, false)) + " class=\"todo-item\"><textarea rows=\"1\" class=\"todo-item-text\">" + (jade.escape((jade_interp = todo.text) == null ? '' : jade_interp)) + "</textarea><div class=\"todo-item-remove-button\"><i class=\"fa fa-times\"></i></div></div>");
    }

  }
}).call(this);
}.call(this,"todos" in locals_for_with?locals_for_with.todos:typeof todos!=="undefined"?todos:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":27}],24:[function(require,module,exports){
(function (global){
// Tiny Async library for use in modern environments

(function() {

  "use strict";

  // root is global on the server, and window in the browser
  var root;
  if (typeof window == 'object' && this === window) {
    root = window;
  } else if (typeof global == 'object' && this === global) {
    root = global;
  } else {
    root = this;
  }

  // cached for performance
  function noop() {}
  var ObjectKeys = Object.keys;

  // isArray and isObject functions
  function isArray(arr) {
    return (Array.isArray(arr) && arr.length > 0);
  }
  function isObject(obj) {
    return (typeof obj === "object" && ObjectKeys(obj).length > 0);
  }

  function doEach(arr, iterator) {
    var i;
    var length = arr.length;

    for (i = 0; i < length; i++) {
      iterator(arr[i]);
    }
  }

  // https://github.com/caolan/async
  function doOnce(fn) {
    var called = false;
    return function() {
      if (called) throw new Error("Callback already called.");
      called = true;
      fn.apply(root, arguments);
    };
  }

  // https://github.com/caolan/async
  function _doOnce(fn) {
    var called = false;
    return function() {
      if (called) return;
      called = true;
      fn.apply(this, arguments);
    };
  }

  var async = {

    // runs the task on every item in the array at once
    each : function(arr, iterator, callback) {
      callback = _doOnce(callback || noop);
      var amount = arr.length;

      if (!isArray(arr)) return callback();

      var completed = 0;
      doEach(arr, function(item) {
        iterator(item, doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          } else {
            completed++;
            if (completed >= amount) callback(null);
          }
        }));
      });
    },

    // runs through the array one item at a time
    eachSeries : function(arr, iterator, callback) {
      callback = _doOnce(callback || noop);
      var amount = arr.length;

      if (!isArray(arr)) return callback();

      var completed = 0;
      var iterate = function() {
        iterator(arr[completed], doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          }
          else {
            completed++;
            if (completed < amount) {
              iterate();
            }
            else {
              callback(null);
            }
          }
        }));
      };
      iterate();
    },

    // can accept an object or array
    // will return an object or array of results in the correct order
    parallel : function(tasks, callback) {

      var keys; var length; var i; var results; var kind;
      var updated_tasks = [];
      var is_object;
      var counter = 0;

      if (isArray(tasks)) {

        length = tasks.length;
        results = [];

      } else if (isObject(tasks)) {

        is_object = true;
        keys = ObjectKeys(tasks);
        length = keys.length;
        results = {};

      } else {
        return callback();
      }

      for (i=0; i<length; i++) {

        if (is_object) {
          updated_tasks.push({ k: keys[i], t: tasks[keys[i]] });
        } else {
          updated_tasks.push({ k: i, t: tasks[i] });
        }

      }

      updated_tasks.forEach(function(task_object) {

        task_object.t(function(err, result) {
          if (err) return callback(err);

          results[task_object.k] = result;

          counter++;
          if (counter == length) callback(null, results);
        });

      });

    },

    // only accepts an array since the preservation of the order of properties on an object can't be guaranteed
    // returns an array of results in order
    series : function(tasks, callback) {

      if (!isArray(tasks)) return callback();

      var length = tasks.length;
      var results = [];

      function runTask(index) {
        tasks[index](function(err, result) {
          if (err) return callback(err);
          results[index] = result;
          if (index < length - 1) return runTask(index + 1);
          return callback(null, results);
        });
      }

      runTask(0);
    }

  };

  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = async;
  }
  // AMD / RequireJS
  else if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return async;
    });
  }
  // included directly via <script> tag
  else {
    root.async = async;
  }

}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],25:[function(require,module,exports){
/*!
	Autosize 3.0.5
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod);
		global.autosize = mod.exports;
	}
})(this, function (exports, module) {
	'use strict';

	function assign(ta) {
		var _ref = arguments[1] === undefined ? {} : arguments[1];

		var _ref$setOverflowX = _ref.setOverflowX;
		var setOverflowX = _ref$setOverflowX === undefined ? true : _ref$setOverflowX;
		var _ref$setOverflowY = _ref.setOverflowY;
		var setOverflowY = _ref$setOverflowY === undefined ? true : _ref$setOverflowY;

		if (!ta || !ta.nodeName || ta.nodeName !== 'TEXTAREA' || ta.hasAttribute('data-autosize-on')) return;

		var heightOffset = null;
		var overflowY = 'hidden';

		function init() {
			var style = window.getComputedStyle(ta, null);

			if (style.resize === 'vertical') {
				ta.style.resize = 'none';
			} else if (style.resize === 'both') {
				ta.style.resize = 'horizontal';
			}

			if (style.boxSizing === 'content-box') {
				heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
			} else {
				heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
			}

			update();
		}

		function changeOverflow(value) {
			{
				// Chrome/Safari-specific fix:
				// When the textarea y-overflow is hidden, Chrome/Safari do not reflow the text to account for the space
				// made available by removing the scrollbar. The following forces the necessary text reflow.
				var width = ta.style.width;
				ta.style.width = '0px';
				// Force reflow:
				/* jshint ignore:start */
				ta.offsetWidth;
				/* jshint ignore:end */
				ta.style.width = width;
			}

			overflowY = value;

			if (setOverflowY) {
				ta.style.overflowY = value;
			}

			update();
		}

		function update() {
			var startHeight = ta.style.height;
			var htmlTop = document.documentElement.scrollTop;
			var bodyTop = document.body.scrollTop;
			var originalHeight = ta.style.height;

			ta.style.height = 'auto';

			var endHeight = ta.scrollHeight + heightOffset;

			if (ta.scrollHeight === 0) {
				// If the scrollHeight is 0, then the element probably has display:none or is detached from the DOM.
				ta.style.height = originalHeight;
				return;
			}

			ta.style.height = endHeight + 'px';

			// prevents scroll-position jumping
			document.documentElement.scrollTop = htmlTop;
			document.body.scrollTop = bodyTop;

			var style = window.getComputedStyle(ta, null);

			if (style.height !== ta.style.height) {
				if (overflowY !== 'visible') {
					changeOverflow('visible');
					return;
				}
			} else {
				if (overflowY !== 'hidden') {
					changeOverflow('hidden');
					return;
				}
			}

			if (startHeight !== ta.style.height) {
				var evt = document.createEvent('Event');
				evt.initEvent('autosize:resized', true, false);
				ta.dispatchEvent(evt);
			}
		}

		var destroy = (function (style) {
			window.removeEventListener('resize', update);
			ta.removeEventListener('input', update);
			ta.removeEventListener('keyup', update);
			ta.removeAttribute('data-autosize-on');
			ta.removeEventListener('autosize:destroy', destroy);

			Object.keys(style).forEach(function (key) {
				ta.style[key] = style[key];
			});
		}).bind(ta, {
			height: ta.style.height,
			resize: ta.style.resize,
			overflowY: ta.style.overflowY,
			overflowX: ta.style.overflowX,
			wordWrap: ta.style.wordWrap });

		ta.addEventListener('autosize:destroy', destroy);

		// IE9 does not fire onpropertychange or oninput for deletions,
		// so binding to onkeyup to catch most of those events.
		// There is no way that I know of to detect something like 'cut' in IE9.
		if ('onpropertychange' in ta && 'oninput' in ta) {
			ta.addEventListener('keyup', update);
		}

		window.addEventListener('resize', update);
		ta.addEventListener('input', update);
		ta.addEventListener('autosize:update', update);
		ta.setAttribute('data-autosize-on', true);

		if (setOverflowY) {
			ta.style.overflowY = 'hidden';
		}
		if (setOverflowX) {
			ta.style.overflowX = 'hidden';
			ta.style.wordWrap = 'break-word';
		}

		init();
	}

	function destroy(ta) {
		if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;
		var evt = document.createEvent('Event');
		evt.initEvent('autosize:destroy', true, false);
		ta.dispatchEvent(evt);
	}

	function update(ta) {
		if (!(ta && ta.nodeName && ta.nodeName === 'TEXTAREA')) return;
		var evt = document.createEvent('Event');
		evt.initEvent('autosize:update', true, false);
		ta.dispatchEvent(evt);
	}

	var autosize = null;

	// Do nothing in Node.js environment and IE8 (or lower)
	if (typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
		autosize = function (el) {
			return el;
		};
		autosize.destroy = function (el) {
			return el;
		};
		autosize.update = function (el) {
			return el;
		};
	} else {
		autosize = function (el, options) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], function (x) {
					return assign(x, options);
				});
			}
			return el;
		};
		autosize.destroy = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], destroy);
			}
			return el;
		};
		autosize.update = function (el) {
			if (el) {
				Array.prototype.forEach.call(el.length ? el : [el], update);
			}
			return el;
		};
	}

	module.exports = autosize;
});
},{}],26:[function(require,module,exports){

},{}],27:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var jade_encode_html_rules = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
var jade_match_html = /[&<>"]/g;

function jade_encode_char(c) {
  return jade_encode_html_rules[c] || c;
}

exports.escape = jade_escape;
function jade_escape(html){
  var result = String(html).replace(jade_match_html, jade_encode_char);
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

exports.DebugItem = function DebugItem(lineno, filename) {
  this.lineno = lineno;
  this.filename = filename;
}

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"fs":26}],28:[function(require,module,exports){
// Samson.Component constructor function
// Used to simplify component rendering and transitions in single page apps

var Samson = require('./index');
var Shared = require('./shared');
var Utils = require('./utils');

/* options can include:
// el - the id of the element that the view will render into
// template/render - the function that outputs an HTML string that gets attached to the DOM
// components - any other components that should be loaded/refreshed with this component
// events/domEvents - any eventListeners to attach to DOM nodes
// appEvents - any internal app eventListeners
// beforeRender - a function that runs before the component is rendered (update models, sort collections)
// afterRender - a function that runs after the component is rendered (scroll to the top of the page, marked checkboxes as checked)
// beforeRemove - a function that runs right before the component is fully destroyed (cleanup models, update activity history)
// custom/extend - an object containing custom methods/properties that will be attached directly to the Component instance if there are no naming conflicts with reserved properties
*/

function SamsonComponent(options) {

  // set the element's selector that will determine where the component is rendered
  this.el = (options.el.charAt(0) === "#") ? options.el.slice(1) : options.el;

  // set the component events if they are specified
  this.domEvents = options.events ? options.events : (options.domEvents || {});
  this.appEvents = options.appEvents || {};

  // subcomponents
  this.setComponents = options.setComponents || function() { return (options.components || {}); };
  this.components = this.setComponents();
  this._componentsLoaded = false;

  // setInitialState function
  this.setInitialState = options.setInitialState || Shared.justReturnObject;
  this.state = {};
  this._initialStateSet = false;
  this._stateChanged = false;

  this._loadedEvents = [];

  // set the component's render function that will output an html string
  // if no render function was passed in, we check for a template function
  this._template = options.render || options.template;

  // set the beforeRender function if one is specified
  this.beforeRender = options.beforeRender || Shared.justCallback;

  // set the afterRender function if one is specified
  this.afterRender = options.afterRender || Shared.justCallback;

  // set the remove/close function if one is specified, otherwise just invoke callback
  this.beforeRemove = options.beforeRemove || Shared.justCallback;

  // add any router-related tasks
  this._uuid = this.el + "-" + Date.now(); // the uuid allows us to easily reference the added router tasks
  this._router = options.Router || options.router || {};
  Shared.addRouterTasks(this);

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  Utils.extend(this, custom, Shared.reserved);

}

// Have the SamsonComponent class inherit any shared methods from PageComponentBase
SamsonComponent.prototype._type = "Component";
SamsonComponent.prototype.setState = Shared.setState;
SamsonComponent.prototype.resetState = Shared.resetState;
SamsonComponent.prototype._doFirst = Shared._doFirst;
SamsonComponent.prototype._loadEvents = Shared._loadEvents;
SamsonComponent.prototype._destroyEvents = Shared._destroyEvents;
SamsonComponent.prototype._loadComponents = Shared._loadComponents;
SamsonComponent.prototype._renderComponents = Shared._renderComponents;
SamsonComponent.prototype._destroyComponents = Shared._destroyComponents;
SamsonComponent.prototype._fixAutoFocusElements = Shared._fixAutoFocusElements;
SamsonComponent.prototype._remove = Shared._remove;

// render the component to the DOM
SamsonComponent.prototype._render = function(force_update, callback) {

  var self = this;

  this._loadComponents(force_update, function() {

    self._doFirst("beforeRender", function() {

      if (!self._initialStateSet) {
        self.state = self.setInitialState();
        self._initialStateSet = true;
      }

      // create the component element
      if (!self.element || (force_update || self._stateChanged)) {
        force_update = true;
        self.element = document.getElementById(self.el);

        if (!self.element) {
          //console.log("No element with the id " + self.el + " exists in the DOM so we will create it and append it to its parent.");
          self.element = document.createElement("div");
          self.element.id = self.el;

          if (self._template) {
            self.element.innerHTML = self._template(self.state);
          }

          if (self.parent && self.parent.element) {
            self.parent.element.appendChild(self.element);
          } else {
            console.log("There is no parent to append " + self.el + " to.");
          }

        } else {
          if (self._template) {
            self.element.innerHTML = self._template(self.state);
          }
        }

      }

      self._loadEvents(function() {

        self._renderComponents(force_update, function() {

          // reset stateChanged
          self._stateChanged = false;

          self._fixAutoFocusElements();

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};

module.exports = SamsonComponent;

},{"./index":30,"./shared":35,"./utils":36}],29:[function(require,module,exports){

module.exports = function AddEvents(target) {

  var events = {}; var empty = [];

  // start listening
  target.on = function(type, handler, context) {
    (events[type] = events[type] || []).push([handler, context]);
  };

  // stop listening
  target.off = function(type, handler) {
    type || (events = {})
    var list = events[type] || empty,
    i = list.length = handler ? list.length : 0
    while(i--) handler == list[i][0] && list.splice(i,1)
  };

  // send the event to anyone listening
  target.emit = function(type){
    var args = empty.slice.call(arguments, 1),
    list = events[type] || empty, i=0, j
    while(j=list[i++]) j[0].apply(j[1], args)
  };

};

},{}],30:[function(require,module,exports){
/*!
 * Samson.js
 * Copyright(c) 2015 Sam Delgado
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var Utils = require('./utils');
var $ = require('./modules/quo.js');
var async = require('async-lite');

// reserved properties for the Samson.App object. all properties starting with _ are also reserved
var reserved = ["$", "DOM", "Data", "styleSheet", "baseStyle", "style", "components", "setComponents", "Router", "Pages", "on", "emit", "off"];

// create the Samson object that will be exported
module.exports = Samson = {};

Samson.VERSION = '0.1.7'; // keep in sync with package.json

Samson.$ = $; // attach QuoJS to Samson

Samson.Events = require('./events'); // a mixin that will attach on, off, and emit methods to an object

Samson.Router = require('./router');
Samson.createRouter = function(options) {
  var router = new Samson.Router(options);
  return router;
};

Samson.Page = require('./page');
Samson.createPage = function(options, add_events) {
  var page = new Samson.Page(options);
  if (add_events) Samson.Events(page);
  return page;
};

Samson.Component = require('./component');
Samson.createComponent = function(options, add_events) {
  var component = new Samson.Component(options);
  if (add_events) Samson.Events(component);
  return component;
};

// Samson.DOM will cache references to any Samson created DOM elements like #samson-app
Samson.DOM = {};

// the instantiated app will be attached to Samson.App for quick access
Samson.App;

// only one Samson App can exist at a time, so if one has already been created, simply return it
Samson.createApp = function() {
  if (Samson.App) {
    return Samson.App;
  } else {
    Samson.App = new SamsonApp();
    Samson.Events(Samson.App); // make the main app object an event bus
    Samson.App.DOM = Samson.DOM;
    return Samson.App;
  }
};

// the SamsonApp class
function SamsonApp() {
  this._isConfigured = false;
}

SamsonApp.prototype.configure = function(options, callback) {

  var self = this;

  if (!this._isConfigured) {

    // add QuoJS to the app object for quick access
    this.$ = $;

    // setup the app's Data object
    this.Data = options.Data || options.data || {};

    // setup the app's pages
    this.Pages = options.Pages || options.pages || {};

    // setup the app's base components
    this.setComponents = options.setComponents || function() { return (options.components || {}); };
    this.components = this.setComponents();

    /* First setup the required DOM elements and components of a Samson App */

    // add the core divs to the body
    // #samson_app, #samson_pages, #samson_page_1, #samson_page_2, #samson_faded_overlay, #samson_transparent_overlay
    Samson.DOM.samson_app = document.createElement("div");
    Samson.DOM.samson_app.id = "samson_app";

    Samson.DOM.samson_pages = document.createElement("div");
    Samson.DOM.samson_pages.id = "samson_pages";

    Samson.DOM.samson_page_1 = document.createElement("div");
    Samson.DOM.samson_page_1.id = "samson_page_1";
    Samson.DOM.samson_page_1.classList.add("samson-page", "active");
    Samson.DOM.samson_pages.appendChild(Samson.DOM.samson_page_1);

    Samson.DOM.samson_page_2 = document.createElement("div");
    Samson.DOM.samson_page_2.id = "samson_page_2";
    Samson.DOM.samson_page_2.classList.add("samson-page");
    Samson.DOM.samson_pages.appendChild(Samson.DOM.samson_page_2);

    Samson.DOM.samson_app.appendChild(Samson.DOM.samson_pages);

    document.body.appendChild(Samson.DOM.samson_app); // add the base divs to the body

    // setup the app's router after loading any extra components
    this.Router = Samson.createRouter(options.Router || options.router || {});

    // add any unreserved properties passed into the custom/extend object
    var custom = options.extend || options.custom || {};
    Utils.extend(this, custom, reserved);

    // Load any other components
    var keys = Object.keys(self.components);
    async.each(keys, function(key, cb) {

      self[key] = Samson.createComponent(self.components[key]);
      self[key].parent = {element: Samson.DOM.samson_app, delegate: $(Samson.DOM.samson_app)};

      self[key]._render(false, function() {
        cb();
      });

    }, function() {

      // the Samson App is now configured
      self._isConfigured = true;

      if (callback) callback();

    });

  } else {
    throw new Error("This Samson App has already been configured!");
  }

};

},{"./component":28,"./events":29,"./modules/quo.js":31,"./page":32,"./router":34,"./utils":36,"async-lite":37}],31:[function(require,module,exports){
/**
 * QuoJS - Micro #JavaScript Library for Mobile Devices.
 * @version v3.0.7
 * @link    http://quojs.tapquo.com
 * @author  Javi Jimenez Villar (@soyjavi) (https://twitter.com/soyjavi)
 * @license MIT
 */
(function(){"use strict";var t,n=[].indexOf||function(t){for(var n=0,e=this.length;e>n;n++)if(n in this&&this[n]===t)return n;return-1};t=function(){var t,n,e,r,i,u,o,a,c,l,s,f,h,d,p,v,g;return r=[],a=Object.prototype,o=/^\s*<(\w+|!)[^>]*>/,e=[1,9,11],n=/^\.([\w-]+)$/,u=/^#[\w\d-]+$/,s=/^[\w-]+$/,c=document.createElement("table"),l=document.createElement("tr"),i={tr:document.createElement("tbody"),tbody:c,thead:c,tfoot:c,td:l,th:l,"*":document.createElement("div")},t=function(n,e){var r;return n?"function"===t.toType(n)?t(document).ready(n):(r=p(n,e),v(r,n)):v()},t.query=function(t,e){var r;return n.test(e)?r=t.getElementsByClassName(e.replace(".","")):s.test(e)?r=t.getElementsByTagName(e):u.test(e)&&t===document?(r=t.getElementById(e.replace("#","")),r||(r=[])):r=t.querySelectorAll(e),r.nodeType?[r]:Array.prototype.slice.call(r)},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){var e,r;r=[];for(e in n)r.push(t[e]=n[e]);return r}),t},t.toType=function(t){var n;return n=a.toString.call(t).match(/\s([a-z|A-Z]+)/),n.length>1?n[1].toLowerCase():"object"},t.each=function(n,e){var r,i,u,o,a;if(i=void 0,o=void 0,"array"===t.toType(n))for(i=u=0,a=n.length;a>u;i=++u)r=n[i],e.call(r,i,r)===!1;else for(o in n)e.call(n[o],o,n[o])===!1;return n},t.map=function(n,e){var r,i,u,o;if(o=[],r=void 0,i=void 0,"array"===t.toType(n))for(r=0;r<n.length;)u=e(n[r],r),null!=u&&o.push(u),r++;else for(i in n)u=e(n[i],i),null!=u&&o.push(u);return h(o)},t.mix=function(){var t,n,e,r,i;for(e={},t=0,r=arguments.length;r>t;){n=arguments[t];for(i in n)g(n,i)&&void 0!==n[i]&&(e[i]=n[i]);t++}return e},v=function(t,n){return null==n&&(n=""),t=t||r,t.selector=n,t.__proto__=v.prototype,t},p=function(n,r){var i,u;return i=null,u=t.toType(n),"array"===u?i=f(n):"string"===u&&o.test(n)?(i=d(n.trim(),RegExp.$1),n=null):"string"===u?(i=t.query(document,n),r&&(i=1===i.length?t.query(i[0],r):t.map(function(){return t.query(i,r)}))):(e.indexOf(n.nodeType)>=0||n===window)&&(i=[n],n=null),i},d=function(n,e){var r;return null==e&&(e="*"),e in i||(e="*"),r=i[e],r.innerHTML=""+n,t.each(Array.prototype.slice.call(r.childNodes),function(){return r.removeChild(this)})},f=function(t){return t.filter(function(t){return null!=t?t:void 0})},h=function(t){return t.length>0?r.concat.apply(r,t):t},g=function(t,n){return a.hasOwnProperty.call(t,n)},v.prototype=t.fn={},t.fn.each=function(t){return this.forEach(function(n,e){return t.call(n,e,n)}),this},t.fn.filter=function(n){return t(r.filter.call(this,function(e){return e.parentNode&&t.query(e.parentNode,n).indexOf(e)>=0}))},t.fn.forEach=r.forEach,t.fn.indexOf=r.indexOf,t.version="3.0.7",t}(),this.Quo=this.$$=t,"undefined"!=typeof module&&null!==module&&(module.exports=t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n={TYPE:"GET",MIME:"json"},r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},e=0,t.ajaxSettings={type:n.TYPE,async:!0,success:{},error:{},context:null,dataType:n.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:!1,timeout:0},t.ajax=function(e){var r,o,c,f;if(c=t.mix(t.ajaxSettings,e),c.type===n.TYPE?c.url+=t.serialize(c.data,"?"):c.data=t.serialize(c.data),i(c.url))return u(c);f=c.xhr(),f.onreadystatechange=function(){return 4===f.readyState?(clearTimeout(r),s(f,c)):void 0},f.open(c.type,c.url,c.async),l(f,c),c.timeout>0&&(r=setTimeout(function(){return h(f,c)},c.timeout));try{f.send(c.data)}catch(d){o=d,f=o,a("Resource not found",f,c)}return f},t.get=function(n,e,r,i){return t.ajax({url:n,data:e,success:r,dataType:i})},t.post=function(t,n,e,r){return c("POST",t,n,e,r)},t.put=function(t,n,e,r){return c("PUT",t,n,e,r)},t["delete"]=function(t,n,e,r){return c("DELETE",t,n,e,r)},t.json=function(n,e,r){return t.ajax({url:n,data:e,success:r})},t.serialize=function(t,n){var e,r;null==n&&(n=""),r=n;for(e in t)t.hasOwnProperty(e)&&(r!==n&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return r===n?"":r},u=function(n){var r,i,u,o;return n.async?(i="jsonp"+ ++e,u=document.createElement("script"),o={abort:function(){return t(u).remove(),i in window?window[i]={}:void 0}},r=void 0,window[i]=function(e){return clearTimeout(r),t(u).remove(),delete window[i],f(e,o,n)},u.src=n.url.replace(RegExp("=\\?"),"="+i),t("head").append(u),n.timeout>0&&(r=setTimeout(function(){return h(o,n)},n.timeout)),o):console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")},s=function(t,n){t.status>=200&&t.status<300||0===t.status?n.async&&f(o(t,n),t,n):a("QuoJS.ajax: Unsuccesful request",t,n)},f=function(t,n,e){e.success.call(e.context,t,n)},a=function(t,n,e){e.error.call(e.context,t,n,e)},l=function(t,n){var e;n.contentType&&(n.headers["Content-Type"]=n.contentType),n.dataType&&(n.headers.Accept=r[n.dataType]);for(e in n.headers)t.setRequestHeader(e,n.headers[e])},h=function(t,n){t.onreadystatechange={},t.abort(),a("QuoJS.ajax: Timeout exceeded",t,n)},c=function(n,e,r,i,u){return t.ajax({type:n,url:e,data:r,success:i,dataType:u,contentType:"application/x-www-form-urlencoded"})},i=function(t){return RegExp("=\\?").test(t)},o=function(t,e){var r,i;if(i=t,t.responseText){if(e.dataType===n.MIME)try{i=JSON.parse(t.responseText)}catch(u){r=u,i=r,a("QuoJS.ajax: Parse Error",t,e)}"xml"===e.dataType&&(i=t.responseXML)}return i}}(t),function(t){var n,e,r;return n=["-webkit-","-moz-","-ms-","-o-",""],t.fn.addClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.add(o));return u})},t.fn.removeClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.remove(o));return u})},t.fn.toggleClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.toggle(o));return u})},t.fn.hasClass=function(t){return this.length>0&&this[0].classList.contains(t)},t.fn.listClass=function(){return this.length>0?this[0].classList:void 0},t.fn.style=t.fn.css=function(t,n){var e;return null!=n?this.each(function(){return this.style[t]=n}):(e=this[0],e.style[t]||r(e,t))},t.fn.vendor=function(t,e){var r,i,u,o;for(o=[],r=0,i=n.length;i>r;r++)u=n[r],o.push(this.style(""+u+t,e));return o},r=function(t,n){return document.defaultView.getComputedStyle(t,"")[n]},e=function(t){return Array.isArray(t)||(t=[t]),t}}(t),function(t){return t.fn.attr=function(n,e){return this.length>0&&"string"===t.toType(n)?null!=e?this.each(function(){return this.setAttribute(n,e)}):this[0].getAttribute(n):void 0},t.fn.removeAttr=function(n){return this.length>0&&"string"===t.toType(n)?this.each(function(){return this.removeAttribute(n)}):void 0},t.fn.data=function(t,n){return this.attr("data-"+t,n)},t.fn.removeData=function(t){return this.removeAttr("data-"+t)},t.fn.val=function(t){return null!=t?this.each(function(){return this.value=t.toString()}):this.length>0?this[0].value:null},t.fn.show=function(){return this.style("display","block")},t.fn.hide=function(){return this.style("display","none")},t.fn.focus=function(){return this[0].focus()},t.fn.blur=function(){return this[0].blur()},t.fn.offset=function(){var t,n;return this.length>0&&(t=this[0].getBoundingClientRect(),n={left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:t.width,height:t.height}),n}}(t),function(t){var n,e,r,i,u,o;return r=null,n=/WebKit\/([\d.]+)/,e={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/},t.isMobile=function(){return this.environment(),r.isMobile},t.environment=function(){var t,n;return r||(n=navigator.userAgent,t=u(n),r={browser:i(n),isMobile:!!t,screen:o(),os:t}),r},i=function(t){var e;return e=t.match(n),e?e[0]:t},u=function(t){var n,r,i;for(r in e)if(i=t.match(e[r])){n={name:"iphone"===r||"ipad"===r||"ipod"===r?"ios":r,version:i[2].replace("_",".")};break}return n},o=function(){return{width:window.innerWidth,height:window.innerHeight}}}(t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=1,i={},r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},e={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",orientationchange:"resize"},u=/complete|loaded|interactive/,t.fn.on=function(n,e,r){return null==e||"function"===t.toType(e)?this.bind(n,e):this.delegate(e,n,r)},t.fn.off=function(n,e,r){return null==e||"function"===t.toType(e)?this.unbind(n,e):this.undelegate(e,n,r)},t.fn.ready=function(n){return u.test(document.readyState)?n.call(this,t):t.fn.addEvent(document,"DOMContentLoaded",function(){return n.call(this,t)})},t.fn.bind=function(t,n){return this.forEach(function(e){return h(e,t,n)})},t.fn.unbind=function(t,n){return this.each(function(){return d(this,t,n)})},t.fn.delegate=function(n,e,r){return this.each(function(i,u){return h(u,e,r,n,function(e){return function(r){var i,a;return a=t(r.target).closest(n,u).get(0),a?(i=t.extend(o(r),{currentTarget:a,liveFired:u}),e.apply(a,[i].concat([].slice.call(arguments,1)))):void 0}})})},t.fn.undelegate=function(t,n,e){return this.each(function(){return d(this,n,e,t)})},t.fn.trigger=function(n,e,r){return"string"===t.toType(n)&&(n=l(n,e)),null!=r&&(n.originalEvent=r),this.each(function(){return this.dispatchEvent(n)})},t.fn.addEvent=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e},t.fn.removeEvent=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent?t.detachEvent("on"+n,e):t["on"+n]=null},l=function(t,n){var e;return e=document.createEvent("Events"),e.initEvent(t,!0,!0,null,null,null,null,null,null,null,null,null,null,null,null),n&&(e.touch=n),e},h=function(n,e,r,u,o){var l,s,h,d;return e=c(e),h=f(n),s=i[h]||(i[h]=[]),l=o&&o(r,e),d={event:e,callback:r,selector:u,proxy:a(l,r,n),delegate:l,index:s.length},s.push(d),t.fn.addEvent(n,d.event,d.proxy)},d=function(n,e,r,u){var o;return e=c(e),o=f(n),s(o,e,r,u).forEach(function(e){return delete i[o][e.index],t.fn.removeEvent(n,e.event,e.proxy)})},f=function(t){return t._id||(t._id=n++)},c=function(n){var r;return r=("function"==typeof t.isMobile?t.isMobile():void 0)?n:e[n],r||n},a=function(t,n,e){var r;return n=t||n,r=function(t){var r;return r=n.apply(e,[t].concat(t.data)),r===!1&&t.preventDefault(),r}},s=function(t,n,e,r){return(i[t]||[]).filter(function(t){return!(!t||n&&t.event!==n||e&&t.callback!==e||r&&t.selector!==r)})},o=function(n){var e;return e=t.extend({originalEvent:n},n),t.each(r,function(t,r){return e[t]=function(){return this[r]=function(){return!0},n[t].apply(n,arguments)},e[r]=function(){return!1}}),e}}(t),function(t){return t.fn.text=function(t){return null!=t?this.each(function(){return this.textContent=t}):this.length>0?this[0].textContent:""},t.fn.html=function(n){var e;return null!=n?(e=t.toType(n),this.each(function(){return"string"===e?this.innerHTML=n:"array"===e?n.forEach(function(n){return function(e){return t(n).html(e)}}(this)):this.innerHTML+=t(n).html()})):this.length>0?this[0].innerHTML:""},t.fn.remove=function(){return this.each(function(){return null!=this.parentNode?this.parentNode.removeChild(this):void 0})},t.fn.empty=function(){return this.each(function(){return this.innerHTML=null})},t.fn.append=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("beforeend",n):"array"===e?n.forEach(function(n){return function(e){return t(n).append(e)}}(this)):this.appendChild(n)})},t.fn.prepend=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("afterbegin",n):"array"===e?n.each(function(t){return function(n,e){return t.insertBefore(e,t.firstChild)}}(this)):this.insertBefore(n,this.firstChild)})},t.fn.replaceWith=function(n){var e;return e=t.toType(n),this.each(function(){return this.parentNode?"string"===e?this.insertAdjacentHTML("beforeBegin",n):"array"===e?n.each(function(t){return function(n,e){return t.parentNode.insertBefore(e,t)}}(this)):this.parentNode.insertBefore(n,this):void 0}),this.remove()}}(t),function(n){var e,r,i,u;return e="parentNode",n.fn.find=function(e){var r;return r=1===this.length?t.query(this[0],e):this.map(function(){return t.query(this,e)}),n(r)},n.fn.parent=function(t){var n;return n=t?i(this):this.instance(e),r(n,t)},n.fn.children=function(t){var n;return n=this.map(function(){return Array.prototype.slice.call(this.children)}),r(n,t)},n.fn.siblings=function(t){var n;return n=this.map(function(t,n){return Array.prototype.slice.call(n.parentNode.children).filter(function(t){return t!==n})}),r(n,t)},n.fn.get=function(t){return this[t]||null},n.fn.first=function(){return n(this[0])},n.fn.last=function(){return n(this[this.length-1])},n.fn.closest=function(t,e){var r,i;for(i=this[0],r=n(t),r.length||(i=null);i&&r.indexOf(i)<0;)i=i!==e&&i!==document&&i.parentNode;return n(i)},n.fn.next=function(){return u.call(this,"nextSibling")},n.fn.prev=function(){return u.call(this,"previousSibling")},n.fn.instance=function(t){return this.map(function(){return this[t]})},n.fn.map=function(t){return n.map(this,function(n,e){return t.call(n,e,n)})},i=function(t){var e;for(e=[];t.length>0;)t=n.map(t,function(t){return t=t.parentNode,t!==document&&e.indexOf(t)<0?(e.push(t),t):void 0});return e},r=function(t,e){return null!=e?n(t).filter(e):n(t)},u=function(t){var e;for(e=this[0][t];e&&1!==e.nodeType;)e=e[t];return n(e)}}(t),t.Gestures=function(t){var e,r,i,u,o,a,c,l,s,f,h,d,p,v;return d=!1,l={},o=null,f=null,i=["input","select","textarea"],p=function(t){return l[t.name]=t.handler,e(t.events)},v=function(n,e,r){return t(n).trigger(e,r,f)},h=function(t){var e;return e=(t.srcElement||t.target).tagName.toLowerCase(),n.call(i,e)>=0?t.stopPropagation():(d=!0,f=t||event,o=a(t),c("start",t.target,o))},s=function(t){return d?(f=t||event,o=a(t),o.length>1&&f.preventDefault(),c("move",t.target,o)):void 0},u=function(t){return d?(f=t||event,c("end",t.target,o),d=!1):void 0},r=function(t){return d=!1,c("cancel")},e=function(n){return n.forEach(function(n){return t.fn[n]=function(e){return t(document.body).delegate(this.selector,n,e)}}),this},c=function(t,n,e){var r,i,u;u=[];for(i in l)r=l[i],r[t]&&u.push(r[t].call(r,n,e));return u},a=function(t){var n,e,r,i,u;for(r=t.touches||[t],i=[],n=0,e=r.length;e>n;n++)u=r[n],i.push({x:u.pageX,y:u.pageY});return i},t(document).ready(function(){var n;return n=t(document.body),n.bind("touchstart",h),n.bind("touchmove",s),n.bind("touchend",u),n.bind("touchcancel",r)}),{add:p,trigger:v}}(t),t.Gestures.add({name:"basic",events:["touch","hold","doubleTap"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return e=15,n={TAP:200,DOUBLE_TAP:400,HOLD:400},i=null,c=!0,a=null,o=null,u=null,h=function(e,r){return 1===r.length?(o={time:new Date,x:r[0].x,y:r[0].y},a=e,i=setTimeout(function(){return t.trigger(e,"hold",r[0])},n.HOLD)):l()},f=function(t,n){var i;return null!==o&&(i=r(o,n[0]),i.x>e||i.y>e||n.length>1)?l():void 0},s=function(e,a){var c,s;if(o)return c=r(o,a[0]),0!==c.x||0!==c.y?l():(clearTimeout(i),s=new Date,s-o.time<n.TAP?s-u<n.DOUBLE_TAP?(t.trigger(e,"doubleTap",a[0]),u=null):(u=s,t.trigger(e,"touch",a[0])):void 0)},l=function(){return o=null,c=!1,clearTimeout(i)},r=function(t,n){var e;return e={x:n.x-t.x,y:n.y-t.y}},{start:h,move:f,end:s,cancel:l}}(t.Gestures)}),t.Gestures.add({name:"drag",events:["drag","dragging"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n=window.devicePixelRatio>=2?15:20,c=null,o=null,a=null,u=null,h=function(t,n){return n.length>=2?(c=t,o=n.length,a=e(n)):void 0},f=function(t,n){var e;return n.length===o?(e=r(n),u={touches:n,delta:e},i(!0)):void 0},l=s=function(t,n){return a&&u?(i(!1),o=null,a=null,u=null):void 0},r=function(t){var n;return n=e(t),{x:n.x-a.x,y:n.y-a.y}},e=function(t){var n,e,r,i,u;for(i=0,u=0,n=0,e=t.length;e>n;n++)r=t[n],i+=parseInt(r.x),u+=parseInt(r.y);return{x:i/t.length,y:u/t.length}},i=function(e){return e?t.trigger(c,"dragging",u):Math.abs(u.delta.x)>n||Math.abs(u.delta.y)>n?t.trigger(c,"drag",u):void 0},{start:h,move:f,end:s}}(t.Gestures)}),t.Gestures.add({name:"pinch",events:["pinch","pinching","pinchIn","pinchOut"],handler:function(t){var n,e,r,i,u,o,a,c,l,s;return n=window.devicePixelRatio>=2?15:20,o=null,u=null,i=null,s=function(t,n){return 2===n.length?(o=t,u=r(n[0],n[1])):void 0},l=function(t,n){var o;return u&&2===n.length?(o=r(n[0],n[1]),i={touches:n,delta:o-u},e(!0)):void 0},a=c=function(t,n){return u&&i?(e(!1),u=null,i=null):void 0},r=function(t,n){return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))},e=function(e){var r;return e?t.trigger(o,"pinching",i):Math.abs(i.delta)>n?(t.trigger(o,"pinch",i),r=i.delta>0?"pinchOut":"pinchIn",t.trigger(o,r,i)):void 0},{start:s,move:l,end:c}}(t.Gestures)}),t.Gestures.add({name:"rotation",events:["rotate","rotating","rotateLeft","rotateRight"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=5,e=20,l=null,u=0,c=null,i=null,d=function(t,n){return 2===n.length?(l=t,u=0,c=o(n[0],n[1])):void 0},h=function(t,n){var l;return c&&2===n.length?(l=o(n[0],n[1])-c,i&&Math.abs(i.delta-l)>e&&(l+=360*a(i.delta)),Math.abs(l)>360&&(u++,l-=360*a(i.delta)),i={touches:n,delta:l,rotationsCount:u},r(!0)):void 0},s=f=function(t,n){return c&&i?(r(!1),l=null,u=0,c=null,i=null,c=null):void 0},a=function(t){return 0>t?-1:1},o=function(t,n){var e;return e=Math.atan2(t.y-n.y,t.x-n.x),180*(0>e?e+2*Math.PI:e)/Math.PI},r=function(e){var r;return e?t.trigger(l,"rotating",i):Math.abs(i.delta)>n?(t.trigger(l,"rotate",i),r=i.delta>0?"rotateRight":"rotateLeft",t.trigger(l,r,i)):void 0},{start:d,move:h,end:f}}(t.Gestures)}),t.Gestures.add({name:"swipe",events:["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","swiping","swipingHorizontal","swipingVertical"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f;return n=Math.round(20/window.devicePixelRatio),a=null,u=null,o=null,i=null,f=function(t,n){return 1===n.length?(a=t,u=n[0],i=null):void 0},s=function(t,n){var r,o;return 1===n.length?(r={x:n[0].x-u.x,y:n[0].y-u.y},o=null===i,i={x:n[0].x,y:n[0].y,delta:r},e(!0,o)):i=null},c=l=function(t,n){var r;return null==i&&n.length>=1&&(r={x:n[0].x-u.x,y:n[0].y-u.y},i={x:n[0].x,y:n[0].y,delta:r}),i?(e(!1),i=null):void 0},e=function(e,u){var c,l,s,f,h;if(null==u&&(u=!1),e)return u&&(o=r(i.delta.x,i.delta.y)),null!==o&&t.trigger(a,"swiping"+o,i),t.trigger(a,"swiping",i);if(l=[],Math.abs(i.delta.y)>n?l.push(i.delta.y<0?"Up":"Down"):Math.abs(i.delta.x)>n&&l.push(i.delta.x<0?"Left":"Right"),l.length){for(t.trigger(a,"swipe",i),h=[],s=0,f=l.length;f>s;s++)c=l[s],h.push(t.trigger(a,"swipe"+c,i));return h}},r=function(t,n){var e;return e=null,Math.round(Math.abs(t/n))>=2?e="Horizontal":Math.round(Math.abs(n/t))>=2&&(e="Vertical"),e},{start:f,move:s,end:l}}(t.Gestures)})}).call(this);

},{}],32:[function(require,module,exports){
// Samson.Page constructor function
// Used to simplify page rendering and transitions in single page apps

var Samson = require('./index');
var Shared = require('./shared');
var Utils = require('./utils');

/* options can include:
// path - the router path of the page
// subPageOf - an optional parent page that is the start of a specific category - ex: User Bio Page is subPageOf of Profile Page
// previousPage - an optional previous page to make going back easier
// backSafe - false by default. set to true if it is safe to go back to this page from any other page in the app
// template/render - the function that outputs an HTML string that gets attached to the DOM
// components - any other components that should be loaded/refreshed with the page
// events - any events to attach to the page
// beforeRender - a function that runs before the page is rendered (update models, sort collections)
// afterRender - a function that runs after the page is rendered (scroll to the top of the page, marked checkboxes as checked)
// beforeRemove - a function that runs right before the page is fully destroyed (cleanup models, update activity history)
// custom/extend - an object containing custom methods/properties that will be attached directly to the Page instance if there are no naming conflicts with reserved properties
*/

function SamsonPage(options) {

  // set the path of the page
  this.path = options.path;

  // subPageOf is false if it is a top-level page, otherwise it is the name of the top-level page it is linked to
  this.subPageOf = options.subPageOf || false;

  // set the previousPage if it is specified
  this.previousPage = options.previousPage || false;

  // set the backAnimation if it is specified
  this.backAnimation = options.backAnimation || false;

  // set backSafe if it is specified
  this.backSafe = options.backSafe || false;

  // set the page events if they are specified
  this.domEvents = options.events ? options.events : (options.domEvents || {});
  this.appEvents = options.appEvents || {};

  // setup the page's components
  this.setComponents = options.setComponents || function() { return (options.components || {}); };
  this.components = this.setComponents();
  this._componentsLoaded = false;

  // setInitialState function
  this.setInitialState = options.setInitialState || Shared.justReturnObject;
  this.state = {};
  this._initialStateSet = false;
  this._stateChanged = false;

  this._loadedEvents = [];

  // set the page's render function that will output an html string
  // if no render function was passed in, we check for a template function
  this._template = options.render || options.template;
  if (!this._template) throw new Error("Your page " + this.path + " must have a render or template function that outputs an HTML string");

  // set the beforeRender function if one is specified
  this.beforeRender = options.beforeRender || Shared.justCallback;

  // set the afterRender function if one is specified
  this.afterRender = options.afterRender || Shared.justCallback;

  // set the remove/close function if one is specified, otherwise just invoke callback
  this.beforeRemove = options.beforeRemove || Shared.justCallback;

  // add any router-related tasks
  this._uuid = this.path + "-" + Date.now(); // the uuid allows us to easily reference the added router tasks
  this._router = options.Router || options.router || {};
  Shared.addRouterTasks(this);

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  Utils.extend(this, custom, Shared.reserved);

}

// Have the SamsonPage class inherit any shared methods
SamsonPage.prototype._type = "Page";
SamsonPage.prototype.setState = Shared.setState;
SamsonPage.prototype.resetState = Shared.resetState;
SamsonPage.prototype._doFirst = Shared._doFirst;
SamsonPage.prototype._loadEvents = Shared._loadEvents;
SamsonPage.prototype._destroyEvents = Shared._destroyEvents;
SamsonPage.prototype._loadComponents = Shared._loadComponents;
SamsonPage.prototype._renderComponents = Shared._renderComponents;
SamsonPage.prototype._destroyComponents = Shared._destroyComponents;
SamsonPage.prototype._fixAutoFocusElements = Shared._fixAutoFocusElements;
SamsonPage.prototype._remove = Shared._remove;

// render the page to the DOM
SamsonPage.prototype._render = function(force_update, page_container, callback) {

  var self = this;

  this._loadComponents(force_update, function() {

    self._doFirst("beforeRender", function() {

      // create the initial state object of the page that is passed into the render call
      if (!self._initialStateSet) {
        self.state = self.setInitialState();
        self._initialStateSet = true;
      }

      // create the page element
      if (!self.element) {
        self.element = document.createElement("div");
        self.element.id = self.path + "-page";
        self.element.innerHTML = self._template(self.state);
        page_container.appendChild(self.element);

        // setup the page as an event delegator for all its subcomponents
        self.delegate = Samson.$(self.element);
      }

      // set whether or not we will force subcomponents to update
      if (force_update || self._stateChanged) {
        force_update = true;
        self.element.innerHTML = self._template(self.state);
      }

      self._loadEvents(function() {

        self._renderComponents(force_update, function() {

          // reset stateChanged
          self._stateChanged = false;

          self._fixAutoFocusElements();

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};

module.exports = SamsonPage;

},{"./index":30,"./shared":35,"./utils":36}],33:[function(require,module,exports){

module.exports = {

  "top" : { current: "move-to-bottom", next: "move-from-top" },
  "bottom" : { current: "move-to-top", next: "move-from-bottom" },
  "left" : { current: "move-to-right", next: "move-from-left" },
  "right" : { current: "move-to-left", next: "move-from-right" },
  "scale" : { current: "scale-out", next: "scale-in" },
  "fade" : { current: "fade-out", next: "fade-in" }

};

},{}],34:[function(require,module,exports){
// Samson.Router constructor function
// Used to handle page history and transitions

var Samson = require('../index');
var async = require('async-lite');
var Utils = require('../utils');

var base_router_animations = require('./base_router_animations');

function SamsonRouter(options) {

  this.activePageElement = "samson_page_1";
  this.inactivePageElement = "samson_page_2";

  // our page cache will store the initialized pages
  this.pageCache = {};

  // create the app router history
  this.history = [];

  // a queue of any router events that haven't been handled yet
  this.queue = [];

  // set the app's animations
  this.animations = base_router_animations;

  var custom_router_animations = options.animations || {};
  var key;
  for (key in custom_router_animations) {
    this.animations[key] = custom_router_animations[key];
  }

  this.currentPage = false; // the name of the page we are currently on

  this.previousPage = false; // the name of the previous page we were on

  this.nextPage = false; // the name of the page we are transitioning to

  this.currentAnimation = false; // the name of the currently running animation

  this.isBusy = false; // set to true whenever the router is still handling an event

  this.pagesAnimating = false; // set to true if a new page is being loaded

  // set the default navigate animation
  this.navigateAnimation = options.defaultNavigateAnimation || "right";

  //set the default back animation
  this.backAnimation = options.defaultBackAnimation || "left";

  this.beforeNavigate = {};
  this.afterNavigate = {};
  this.beforeAnimate = {};
  this.duringAnimate = {};
  this.afterAnimate = {};
  this.beforeBack = {};
  this.afterBack = {};

  if (options.beforeNavigate) { this.beforeNavigate.router = options.beforeNavigate; }
  if (options.afterNavigate) { this.afterNavigate.router = options.afterNavigate; }
  if (options.beforeAnimate) { this.beforeAnimate.router = options.beforeAnimate; }
  if (options.duringAnimate) { this.duringAnimate.router = options.duringAnimate; }
  if (options.afterAnimate) { this.afterAnimate.router = options.afterAnimate; }
  if (options.beforeBack) { this.beforeBack.router = options.beforeBack; }
  if (options.afterBack) { this.afterBack.router = options.afterBack; }

};

// get the router's current page data
SamsonRouter.prototype.getPageData = function() {
  return {
    currentPage : this.currentPage,
    previousPage : this.previousPage,
    nextPage : this.nextPage,
    pagesAnimating : this.pagesAnimating,
    activePageElement : this.activePageElement,
    inactivePageElement : this.inactivePageElement,
    currentAnimation : this.currentAnimation
  };
};

SamsonRouter.prototype._doFirst = function(name, callback) {
  var self = this;
  var tasks = Object.keys(this[name]);
  async.each(tasks, function(task, cb) {
    self[name][task](self.getPageData(), function(err) {
      cb(err);
    });
  }, function(err) {
    callback(err);
  });
};

SamsonRouter.prototype._duringAnimate = function() {
  var key;
  for (key in this.duringAnimate) {
    this.duringAnimate[key](this.getPageData());
  }
};

SamsonRouter.prototype.updateHistory = function(kind, message) {

  var self = this;

  var history_object = {};
  history_object.date = new Date();

  // if we are navigating forward
  if (kind === "navigate") {

    history_object.kind = kind;
    history_object.page = this.nextPage;
    this.history.push(history_object);

    // check if the currentPage is safe to go back to from anywhere
    var back_safe = this.currentPage ? Samson.App.Pages[this.currentPage].backSafe : false;

    // if the currentPage is backSafe, then set it as the previousPage, otherwise set the configured previousPage
    this.previousPage = back_safe ? this.currentPage : Samson.App.Pages[this.nextPage].previousPage;

    // set our currentPage as the page we are going to
    this.currentPage = this.nextPage;


  } else if (kind === "back") {

    history_object.kind = kind;
    history_object.page = this.previousPage;
    this.history.push(history_object);

    // we are going back, so set our currentPage as our previousPage
    this.currentPage = this.previousPage;

    // we are going back, so set the previousPage to the current Page's previousPage
    this.previousPage = Samson.App.Pages[this.currentPage].previousPage;

  } else if (kind === "failed") {
    console.log("Router event failed because: " + message);
  }

  // if it wasn't just a page update, then switch the activePageElement and inactivePageElement values
  if (kind !== "update" && kind !== "failed") {
    var new_active_page = this.inactivePageElement;
    this.inactivePageElement = this.activePageElement;
    this.activePageElement = new_active_page;
  }

  this.nextPage = false;

  // check to see if there is another router event in the queue
  var queue_event = this.queue.shift();
  if (queue_event) {

    if (queue_event.kind === "navigate") {

      // added a 20ms delay due to some weird behavior with css animations not working without it
      setTimeout(function() {
        self.isBusy = false;
        self.navigate(queue_event.next_page, queue_event.animation, queue_event.callback);
      }, 20);

    } else {
      this.back(queue_event.callback);
    }

  } else {
    this.isBusy = false;
  }

};

SamsonRouter.prototype.getAnimationData = function(animation) {
  var data = {};
  data.current = "none";
  data.next = "none";

  var key;
  for (key in this.animations) {
    if (animation === key) {
      data.current = this.animations[key].current;
      data.next = this.animations[key].next;
      break;
    }
  }

  return data;
};

SamsonRouter.prototype.doAnimation = function(animate, callback) {

  var self = this;

  Samson.DOM[this.inactivePageElement].classList.add(animate.next, "active");
  Samson.DOM[this.activePageElement].classList.add(animate.current);
  Samson.DOM[this.activePageElement].classList.remove("active");

  // run any necessary tasks while the pages are animating. Ex: update header or footer
  this._duringAnimate();

  var animationEvent = Utils.whichAnimationEvent();

  Utils.once(Samson.DOM[this.inactivePageElement], animationEvent, animationEnded);

  // listen for the end of the animation
  function animationEnded() {

    // remove the animation class from the page we just made active
    Samson.DOM[self.inactivePageElement].classList.remove(animate.next);

    // remove the animation class from the page we just made inactive
    Samson.DOM[self.activePageElement].classList.remove(animate.current);

    self.pagesAnimating = false;

    // remove the old page including all of its views and events from the DOM
    // also remove the entire page instance from the router's pageCache
    if (self.currentPage) {
      self.pageCache[self.currentPage]._remove(function() {
        delete self.pageCache[self.currentPage];
        callback();
      });

    } else {
      callback();
    }

  }

};

SamsonRouter.prototype.animate = function(next_page, animation, callback) {

  var self = this;

  this.pagesAnimating = true;

  if (animation === "update") {

    this.pageCache[next_page]._render(true, null, function() {

      self._doFirst("beforeAnimate", function(err) {
        if (callback) callback();
      });

    });

  } else {

    // determine the type of animation that will be used
    var animation_data = this.getAnimationData(animation);

    // remove the focus from whatever element has it so the cursor doesn't make the page transition look sucky
    document.activeElement.blur();

    // render the new page off screen
    this.pageCache[next_page]._render(false, Samson.DOM[this.inactivePageElement], function() {


      self._doFirst("beforeAnimate", function(err) {

        // run the animation now that the new page is fully rendered offscreen
        self.doAnimation(animation_data, function () {

          // restore focus to whatever element was set to autofocus (linked with _fixAutoFocusElements method in shared.js)
          var focusElement = Samson.DOM[self.inactivePageElement].querySelector(".samson_focus");
          if (focusElement) {

            // refocus the element
            setTimeout(function() {
              focusElement.focus();
            }, 0);
            //focusElement.focus();

            // move the cursor to the end of the textarea
            var value_length = focusElement.value.length;
            focusElement.setSelectionRange(value_length, value_length);

            // remove the samson_focus class from the element
            focusElement.classList.remove("samson_focus");
          }

          if (callback) callback();

        });

      });

    });

  }

};

SamsonRouter.prototype.navigate = function(next_page, animation, callback) {

  var self = this;

  // check to see if another Router event is already being handled, if one is then add this event to a queue
  if (this.isBusy) {

    this.queue.push({
      kind: "navigate",
      next_page: next_page,
      animation: animation,
      callback: callback
    });

    //console.log("Router is busy. This event is #" + self.queue.length + " in line");

  } else {

    this.isBusy = true;

    var chosen_animation = animation || this.navigateAnimation;

    // if a page update is requested for a page we aren't currently on, then we will simply navigate to it like normal
    if (chosen_animation === "update" && next_page !== this.currentPage) {
      chosen_animation = this.navigateAnimation;
    }

    this.nextPage = next_page;

    // run any necessary tasks before we start the page transition
    this._doFirst("beforeNavigate", function(err) {

      // make sure the page exists before trying to navigate
      if (!Samson.App.Pages[next_page] && !err) {
        err = "That page does not exist";
      }

      if (!err) {

        // check to see if we are staying on the same page, if we are then simply update the page
        if (next_page === self.currentPage) {
          chosen_animation = "update";
        } else {
          self.pageCache[next_page] = Samson.createPage(Samson.App.Pages[next_page]);
        }

        // make the current animation accessible in getPageData()
        self.currentAnimation = chosen_animation;

        // animate the page transition
        self.animate(next_page, chosen_animation, function() {

          // run any necessary tasks after the page transition
          self._doFirst("afterAnimate", function(err) {

            // update the changes to the page history
            if (chosen_animation === "update") {
              self.updateHistory("update");
            } else {
              self.updateHistory("navigate");
            }

            // run any necessary tasks after navigating
            self._doFirst("afterNavigate", function(err) {
              if (callback) callback();
            });

          });

        });

      } else {
        self.updateHistory("failed", err);
      }

    });

  }

};

SamsonRouter.prototype.back = function(callback) {

  var self = this;

   // check to see if another Router event is already being handled, if one is then add this event to a queue
  if (this.isBusy) {

    this.queue.push({
      kind: "back",
      callback: callback
    });

    //console.log("Router is busy. This event is #" + self.queue.length + " in line");

  } else {

    this.isBusy = true;

    // run any necessary tasks before we start the page transition
    this._doFirst("beforeBack", function(err) {

      // check to see if there is a page to go back to
      if (!self.previousPage && !err) {
        err = "No page to go back to";
      }

      if (!err) {

        // load the previousPage into the pageCache
        self.pageCache[self.previousPage] = Samson.createPage(Samson.App.Pages[self.previousPage]);

        // if the page wants a custom back animation then use it, otherwise use the default back animation
        var back_animation = Samson.App.Pages[self.currentPage].backAnimation || self.backAnimation;

        // make the current animation accessible in getPageData()
        self.currentAnimation = back_animation;

        // animate the page transition
        self.animate(self.previousPage, back_animation, function() {

          // run any necessary tasks after the page transition
          self._doFirst("afterAnimate", function(err) {

            // update the changes to the page history
            self.updateHistory("back");

            // run any necessary tasks after going back
            self._doFirst("afterBack", function(err) {
              if (callback) callback();
            });

          });

        });

      } else {
        self.updateHistory("failed", err);
      }

    });

  }

};

module.exports = SamsonRouter;

},{"../index":30,"../utils":36,"./base_router_animations":33,"async-lite":37}],35:[function(require,module,exports){

var Samson = require('./index');
var async = require('async-lite');
var isEqual = require('lodash.isequal');

var shared = {};

// reserved properties for components and pages
shared.reserved = ["path", "el", "element", "template", "subPageOf", "previousPage", "backAnimation", "style", "components", "events", "domEvents", "appEvents", "state", "setState", "resetState", "setInitialState", "beforeRender", "afterRender", "beforeRemove", "render", "parent", "on", "emit", "off"];

// cached for performance
shared.justCallback = function(cb) { cb(); };
shared.justCallbackTrue = function(cb) { cb(true); };
shared.justReturnObject = function() { return {}; };

// remove the autofocus attribute on the first element that has it and to it the class "samson_focus". remove the autofocus attribute entirely on any other elements that might have it by mistake. This is necessary to have smooth page transitions due to an animation bug in chrome caused by an element having the autofocus attribute. The Samson Router will call .focus() on whatever element has the "samson_focus" class, after the page transition is complete
shared._fixAutoFocusElements = function() {
  var i; var focusElements = this.element.querySelectorAll("[autofocus='autofocus']");
  for (i=0; i<focusElements.length; i++) {
    var focusElement = focusElements[i];
    if (i == 0) {
      focusElement.classList.add("samson_focus");
    }
    focusElement.removeAttribute("autofocus");
    focusElement.blur();
  }
};

// get the topmost parent page or component of the current component
// used in the setState method on components and pages
function getTopParent(component) {
  if (component.parent) {
    return getTopParent(component.parent);
  } else {
    return component;
  }
}

// the methods that Pages and Components share
shared.setState = function(new_state) { // new_state must be an object
  if (typeof new_state === "object") {
    var changed = false;

    var prop;
    for (prop in new_state) {

      // check if this property has changed
      if (this.state[prop] === undefined) { // if the property doesn't exist on the state object then it will updated
        this.state[prop] = new_state[prop];
        changed = true;
      } else if (!isEqual(this.state[prop], new_state[prop])) { // if the existing property on the state object is not equal to the value on the new_state object then it will be updated
        this.state[prop] = new_state[prop];
        changed = true;
      }

    }

    if (changed) {
      this._stateChanged = true;

      if (!this.parent || !this.parent._type) {
        this._render(false);
      } else {
        var parent = getTopParent(this);
        parent._render(false);
      }

    }

  } else {
    throw new Error("Make sure to pass an object into setState");
  }
};

shared.resetState = function() {
  var new_state = this.setInitialState();
  this.setState(new_state);
};

// run the named function before calling back
shared._doFirst = function(name, callback) {
  this[name](function() {
    callback();
  });
};

// add any tasks that this page or component wants run at different events during router navigation
shared.addRouterTasks = function(obj) {
  var task;
  for (task in obj._router) {
    Samson.App.Router[task][obj._uuid] = obj._router[task].bind(obj);
  }
}

shared._loadEvents = function(callback) {

  var self = this;

  if (!this._loadedEvents.length) {

    var delegate = getTopParent(this).delegate;

    var keys = Object.keys(this.domEvents);

    var selector_element = (this._type === "Page") ? null : "#" +  this.el;

    async.each(keys, function(key, cb) {

      var event = {};
      var split_event = key.split(" "); // split by a single space
      event.type = split_event.shift();
      event.selector = split_event.length > 1 ? split_event.join(" ") : split_event[0];
      event.selector = event.selector || selector_element;

      event.handler = function fixedEventHandler(e) {
        self.domEvents[key].call(self, e, e.currentTarget);
      };

      if (event.selector) {
        delegate.on(event.type, event.selector, event.handler);
      } else {
        delegate.on(event.type, event.handler);
      }

      self._loadedEvents.push(event);

      cb();

    }, function() {

      // load any app events
      var appEvent;
      for (appEvent in self.appEvents) {
        Samson.App.on(appEvent, self.appEvents[appEvent], self);
      }

      if (callback) callback();
    });

  } else {
    if (callback) callback();
  }

};

shared._destroyEvents = function(callback) {

  // destroy DOM event listeners
  var delegate = getTopParent(this).delegate;
  var i; var domEvent;
  for (i=0; i<this._loadedEvents.length;i++) {
    domEvent = this._loadedEvents[i];
    if (domEvent.selector) {
      delegate.off(domEvent.type, domEvent.selector, domEvent.handler);
    } else {
      delegate.off(domEvent.type, domEvent.handler);
    }
  }
  this._loadedEvents = [];

  // now destroy app event listeners
  var appEvent;
  for (appEvent in this.appEvents) {
    Samson.App.off(appEvent, this.appEvents[appEvent]);
  }

  if (callback) callback();

};

// attach the components passed back from the setComponents function
shared._loadComponents = function(force_update, callback) {

  var self = this;

  // If the components aren't loaded, or force_update is true, then load the components
  if (!this._componentsLoaded || force_update) {

    var new_components = this.setComponents();

    // First we go through each currently attached component, and check to see if it should still exist
    var old_components = Object.keys(this.components);
    async.each(old_components, function(old_component, cb) {

      var should_be_loaded = false;
      var new_component;
      for (new_component in new_components) {
        if (old_component === new_component) should_be_loaded = true;
      }

      // If the component should be loaded but isn't, then we load it. Otherwise we just skip it
      if (should_be_loaded) {
        // if the component hasn't been loaded yet, then load it
        if (!self[old_component]) {
          self[old_component] = Samson.createComponent(self.components[old_component]);
          self[old_component].parent = self;
        }
        cb();

      } else {
        // remove the component since it shouldn't be loaded
        if (self[old_component]) {
          self[old_component]._remove(function() {
            delete self[old_component];
            cb();
          });
        } else {
          cb();
        }
      }

    }, function() {

      // Now that we handled all of the existing components, we load any new components that don't exist yet
      self.components = new_components;

      var component;
      for (component in self.components) {
        if (!self[component]) {
          self[component] = Samson.createComponent(self.components[component]);
          self[component].parent = self;
        }
      }

      self._componentsLoaded = true;
      if (callback) callback();
    });

  } else {
    if (callback) callback();
  }

};

// render the components attached to the page
shared._renderComponents = function(force_update, callback) {

  var self = this;

  var keys = Object.keys(this.components);

  async.each(keys, function(key, cb) {

    self[key]._render(force_update, function() {
      cb();
    });

  }, function(){
    callback();
  });

};

shared._destroyComponents = function(callback) {

  var self = this;

  var keys = Object.keys(this.components);

  async.each(keys, function(key, cb) {

    self[key]._remove(function() {
      delete self[key];
      cb();
    });

  }, function() {
    self._componentsLoaded = false;
    callback();
  });

};

// removes all event listeners, DOM nodes, and child components
shared._remove = function(callback) {

  var self = this;

  this._doFirst("beforeRemove", function() {

    self._destroyComponents(function() {

      self._destroyEvents(function() {

        // destroy the DOM element
        if (self.element && self.element.parentNode) {
          self.element.parentNode.removeChild(self.element);
        }

        // make sure the DOM node is removed from memory quickly
        delete self.element;

        // remove any router related tasks
        var task;
        for (task in self._router) {
          delete Samson.App.Router[task][self._uuid];
        }

        // remove the event delegator if it exists
        delete self.delegate;

        // reset the page's state
        self.state = {};
        self._initialStateSet = false;

        if (callback) callback();

      });

    });

  });

};

module.exports = shared;

},{"./index":30,"async-lite":37,"lodash.isequal":38}],36:[function(require,module,exports){
// Utility functions

var utils = {};

// add any unreserved properties to the passed in object
// any properties starting with _ are reserved
function startsWith_(word) {
  return (word.charAt(0) == "_") ? true : false;
}

utils.extend = function(obj, custom_props, reserved) {
  var key;
  for (key in custom_props) {
    if (!startsWith_(key) && reserved.indexOf(key) === -1) {
      obj[key] = custom_props[key];
    }
  }
};

function whichEventName(event_type) {
  var key;
  var el = document.createElement('fake');

  var event_names = {
    transitions : {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    },
    animations : {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    }
  };

  for (key in event_names[event_type]) {
    if(el.style[key] !== undefined){
      return event_names[event_type][key];
    }
  }
}

utils.whichTransitionEvent = function() {
  return whichEventName("transitions");
};

utils.whichAnimationEvent = function() {
  return whichEventName("animations");
};

// listen to an event once without jquery
utils.once = function(element, type, callback) {

  // create event
  element.addEventListener(type, function(e) {
    // remove event
    e.target.removeEventListener(e.type, arguments.callee);
    // call handler
    return callback(e);
  });

};

module.exports = utils;

},{}],37:[function(require,module,exports){
(function (global){
// Tiny Async library for use in modern environments

(function() {

  "use strict";

  // root is global on the server, and window in the browser
  var root;
  if (typeof window == 'object' && this === window) {
    root = window;
  } else if (typeof global == 'object' && this === global) {
    root = global;
  } else {
    root = this;
  }

  // cached for performance
  function noop() {}
  var ObjectKeys = Object.keys;

  // isArray and isObject functions
  function isArray(arr) {
    return (Array.isArray(arr) && arr.length > 0);
  }
  function isObject(obj) {
    return (typeof obj === "object" && ObjectKeys(obj).length > 0);
  }

  function doEach(arr, iterator) {
    var i;
    var length = arr.length;

    for (i = 0; i < length; i++) {
      iterator(arr[i]);
    }
  }

  // https://github.com/caolan/async
  function doOnce(fn) {
    var called = false;
    return function() {
      if (called) throw new Error("Callback already called.");
      called = true;
      fn.apply(root, arguments);
    };
  }

  // https://github.com/caolan/async
  function _doOnce(fn) {
    var called = false;
    return function() {
      if (called) return;
      called = true;
      fn.apply(this, arguments);
    };
  }

  var async = {

    // runs the task on every item in the array at once
    each : function(arr, iterator, callback) {
      callback = _doOnce(callback || noop);
      var amount = arr.length;

      if (!isArray(arr)) return callback();

      var completed = 0;
      doEach(arr, function(item) {
        iterator(item, doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          } else {
            completed++;
            if (completed >= amount) callback(null);
          }
        }));
      });
    },

    // runs through the array one item at a time
    eachSeries : function(arr, iterator, callback) {
      callback = _doOnce(callback || noop);
      var amount = arr.length;

      if (!isArray(arr)) return callback();

      var completed = 0;
      var iterate = function() {
        iterator(arr[completed], doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          }
          else {
            completed++;
            if (completed < amount) {
              iterate();
            }
            else {
              callback(null);
            }
          }
        }));
      };
      iterate();
    },

    // can accept an object or array
    // will return an object or array of results in the correct order
    parallel : function(tasks, callback) {

      var keys; var length; var i; var results; var kind;
      var updated_tasks = [];
      var is_object;
      var counter = 0;

      if (isArray(tasks)) {

        length = tasks.length;
        results = [];

      } else if (isObject(tasks)) {

        is_object = true;
        keys = ObjectKeys(tasks);
        length = keys.length;
        results = {};

      } else {
        return callback();
      }

      for (i=0; i<length; i++) {

        if (is_object) {
          updated_tasks.push({ k: keys[i], t: tasks[keys[i]] });
        } else {
          updated_tasks.push({ k: i, t: tasks[i] });
        }

      }

      updated_tasks.forEach(function(task_object) {

        task_object.t(function(err, result) {
          if (err) return callback(err);

          results[task_object.k] = result;

          counter++;
          if (counter == length) callback(null, results);
        });

      });

    },

    // only accepts an array since the preservation of the order of properties on an object can't be guaranteed
    // returns an array of results in order
    series : function(tasks, callback) {

      if (!isArray(tasks)) return callback();

      var length = tasks.length;
      var results = [];

      function runTask(index) {
        tasks[index](function(err, result) {
          if (err) return callback(err);
          results[index] = result;
          if (index < length - 1) return runTask(index + 1);
          return callback(null, results);
        });
      }

      runTask(0);
    }

  };

  // Node.js
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = async;
  }
  // AMD / RequireJS
  else if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return async;
    });
  }
  // included directly via <script> tag
  else {
    root.async = async;
  }

}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],38:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = require('lodash._baseisequal'),
    bindCallback = require('lodash._bindcallback');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent. If `customizer` is provided it is invoked to compare values.
 * If `customizer` returns `undefined` comparisons are handled by the method
 * instead. The `customizer` is bound to `thisArg` and invoked with three
 * arguments: (value, other [, index|key]).
 *
 * **Note:** This method supports comparing arrays, booleans, `Date` objects,
 * numbers, `Object` objects, regexes, and strings. Objects are compared by
 * their own, not inherited, enumerable properties. Functions and DOM nodes
 * are **not** supported. Provide a customizer function to extend support
 * for comparing other values.
 *
 * @static
 * @memberOf _
 * @alias eq
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize value comparisons.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * object == other;
 * // => false
 *
 * _.isEqual(object, other);
 * // => true
 *
 * // using a customizer callback
 * var array = ['hello', 'goodbye'];
 * var other = ['hi', 'goodbye'];
 *
 * _.isEqual(array, other, function(value, other) {
 *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
 *     return true;
 *   }
 * });
 * // => true
 */
function isEqual(value, other, customizer, thisArg) {
  customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
  var result = customizer ? customizer(value, other) : undefined;
  return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
}

module.exports = isEqual;

},{"lodash._baseisequal":39,"lodash._bindcallback":45}],39:[function(require,module,exports){
/**
 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArray = require('lodash.isarray'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = baseIsEqual;

},{"lodash.isarray":40,"lodash.istypedarray":41,"lodash.keys":42}],40:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  escapeRegExp(fnToString.call(hasOwnProperty))
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isArray;

},{}],41:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{}],42:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? null : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":43,"lodash.isarguments":44,"lodash.isarray":40}],43:[function(require,module,exports){
/**
 * lodash 3.9.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  escapeRegExp(fnToString.call(hasOwnProperty))
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = getNative;

},{}],44:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
}

module.exports = isArguments;

},{}],45:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbW1vbi9tb2R1bGVzL2RiLmpzIiwiYXBwL2NvbW1vbi9tb2R1bGVzL2xvZy5qcyIsImFwcC9jb21tb24vcm91dGVyX2FuaW1hdGlvbnMuanMiLCJhcHAvY29tbW9uL3NldHRpbmdzLmpzIiwiYXBwL2NvbW1vbi9zdGFydEFwcC5qcyIsImFwcC9jb21tb24vdG9kb3NDb2xsZWN0aW9uLmpzIiwiYXBwL2NvbW1vbi91dGlscy5qcyIsImFwcC9jb21wb25lbnRzL2FsZXJ0cy9pbmRleC5qcyIsImFwcC9jb21wb25lbnRzL2ZhZGVkT3ZlcmxheS9pbmRleC5qcyIsImFwcC9jb21wb25lbnRzL2hlYWRlci9pbmRleC5qcyIsImFwcC9jb21wb25lbnRzL2hlYWRlci90ZW1wbGF0ZS5qYWRlIiwiYXBwL2NvbXBvbmVudHMvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9zaWRlTWVudS9pbmRleC5qcyIsImFwcC9jb21wb25lbnRzL3NpZGVNZW51L3RlbXBsYXRlLmphZGUiLCJhcHAvY29tcG9uZW50cy90cmFuc3BhcmVudE92ZXJsYXkvaW5kZXguanMiLCJhcHAvcGFnZXMvYWRkVG9kb3MvaW5kZXguanMiLCJhcHAvcGFnZXMvYWRkVG9kb3MvdGVtcGxhdGUuamFkZSIsImFwcC9wYWdlcy9ob21lL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2hvbWUvdGVtcGxhdGUuamFkZSIsImFwcC9wYWdlcy9pbmRleC5qcyIsImFwcC9wYWdlcy92aWV3VG9kb3MvaW5kZXguanMiLCJhcHAvcGFnZXMvdmlld1RvZG9zL3RlbXBsYXRlLmphZGUiLCJub2RlX21vZHVsZXMvYXN5bmMtbGl0ZS9hc3luYy1saXRlLmpzIiwibm9kZV9tb2R1bGVzL2F1dG9zaXplL2Rpc3QvYXV0b3NpemUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2phZGUvcnVudGltZS5qcyIsIi4uLy4uL2xpYi9jb21wb25lbnQuanMiLCIuLi8uLi9saWIvZXZlbnRzLmpzIiwiLi4vLi4vbGliL2luZGV4LmpzIiwiLi4vLi4vbGliL21vZHVsZXMvcXVvLmpzIiwiLi4vLi4vbGliL3BhZ2UuanMiLCIuLi8uLi9saWIvcm91dGVyL2Jhc2Vfcm91dGVyX2FuaW1hdGlvbnMuanMiLCIuLi8uLi9saWIvcm91dGVyL2luZGV4LmpzIiwiLi4vLi4vbGliL3NoYXJlZC5qcyIsIi4uLy4uL2xpYi91dGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9hc3luYy1saXRlL2FzeW5jLWxpdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXN0eXBlZGFycmF5L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5fZ2V0bmF0aXZlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2JpbmRjYWxsYmFjay9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vbGliJyk7XG52YXIgTG9nID0gcmVxdWlyZSgnLi9jb21tb24vbW9kdWxlcy9sb2cnKTtcbnZhciBUb2RvcyA9IHJlcXVpcmUoJy4vY29tbW9uL3RvZG9zQ29sbGVjdGlvbicpO1xuXG4vLyBwYXNzIGluIHRoZSBuYW1lIG9mIHRoZSBhcHAgb2JqZWN0IGlmIHlvdSB3YW50IGl0IGFkZGVkIHRvIHRoZSBnbG9iYWwgc2NvcGVcbnZhciBBcHAgPSBTYW1zb24uY3JlYXRlQXBwKFwiQXBwXCIpO1xuXG4vLyBhZGQgdGhlIGFwcCBuYW1lIHRvIHRoZSBnbG9iYWwgc2NvcGUgaWYgbmFtZSBpcyBwYXNzZWQgaW5cbmdsb2JhbC5BcHAgPSBBcHA7XG5cbi8vIFNhbXNvbiBBcHAgb3B0aW9uc1xudmFyIG9wdGlvbnMgPSB7XG5cbiAgLy9zZXRDb21wb25lbnRzIDogcmVxdWlyZSgnY29tbW9uL3NldENvbXBvbmVudHMnKSwgLy8gb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgY29tcG9uZW50IG9iamVjdCAtIHVzZSBpZiB0aGUgYXBwIGNvbXBvbmVudHMgYXJlIGR5bmFtaWMgYmFzZWQgb24gc2NyZWVuc2l6ZSwgZGV2aWNlIE9TLCBldGNcblxuICBjb21wb25lbnRzIDogcmVxdWlyZSgnLi9jb21wb25lbnRzJyksXG5cbiAgcGFnZXM6IHJlcXVpcmUoJy4vcGFnZXMnKSxcblxuICBkYXRhOiB7XG4gICAgc2lkZU1lbnUgOiB7XG4gICAgICBzZWxlY3RlZDogXCJob21lXCIsXG4gICAgICBwYWdlczogW1xuICAgICAgICB7cGF0aDpcImhvbWVcIiwgbmFtZTpcIkhvbWVcIiwgaWNvbjogXCJmYS1ob21lXCJ9LFxuICAgICAgICB7cGF0aDpcImFkZFRvZG9zXCIsIG5hbWU6XCJBZGQgVG9kb3NcIiwgaWNvbjogXCJmYS1wbHVzXCJ9LFxuICAgICAgICB7cGF0aDpcInZpZXdUb2Rvc1wiLCBuYW1lOlwiVmlldyBUb2Rvc1wiLCBpY29uOiBcImZhLXRhc2tzXCJ9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIC8vIGFueSBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHlvdSB3YW50IGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBhcHAgb2JqZWN0LiB0aGUgY29udGV4dCB3aWxsIGJlIHRoZSBhcHAgb2JqZWN0XG4gIGN1c3RvbToge1xuICAgIE1vZGVscyA6IHt9LFxuICAgIENvbGxlY3Rpb25zIDoge1xuICAgICAgVG9kb3M6IG5ldyBUb2RvcygpXG4gICAgfVxuICB9LFxuXG4gIHJvdXRlciA6IHtcbiAgICBhbmltYXRpb25zOiByZXF1aXJlKCcuL2NvbW1vbi9yb3V0ZXJfYW5pbWF0aW9ucycpLFxuICAgIGRlZmF1bHROYXZpZ2F0ZUFuaW1hdGlvbjogXCJyaWdodFwiLFxuICAgIGRlZmF1bHRCYWNrQW5pbWF0aW9uOiBcImxlZnRcIlxuICB9XG5cbn07XG5cbkFwcC5jb25maWd1cmUob3B0aW9ucywgZnVuY3Rpb24oKSB7XG5cbiAgLy8gVGhlIFNhbXNvbiBBcHAgaXMgbm93IGNvbmZpZ3VyZWQgYW5kIHJlYWR5IHRvIHVzZVxuICBMb2coXCJTYW1zb24gYXBwIGhhcyBiZWVuIGluaXRpYWxpemVkXCIpO1xuXG4gIHZhciBzdGFydEFwcCA9IHJlcXVpcmUoJy4vY29tbW9uL3N0YXJ0QXBwJyk7XG5cbiAgLy8gaWYgd2UgZGV0ZWN0IGNvcmRvdmEgdGhlbiB3YWl0IGZvciB0aGUgZGV2aWNlcmVhZHkgZXZlbnRcbiAgaWYgKHR5cGVvZiB3aW5kb3cuY29yZG92YSA9PT0gJ29iamVjdCcpIHtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgTG9nKFwiRGV2aWNlIGlzIG5vdyByZWFkeVwiKTtcblxuICAgICAgc3RhcnRBcHAoKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHN0YXJ0QXBwKCk7XG5cbiAgfVxuXG59KTtcbiIsIi8vIGRiLmpzIC0gQ2xpZW50IGxvY2FsU3RvcmFnZSBEQiB0byBrZWVwIGRhdGEgcGVyc2lzdGVkXG5cbnZhciBsb2NhbF9zdG9yYWdlX2V4aXN0cyA9IHR5cGVvZiB3aW5kb3cubG9jYWxTdG9yYWdlID09PSAnb2JqZWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgc2F2ZTogZnVuY3Rpb24oa2V5LCB2YWx1ZSwgY2IpIHsgLy8gc2F2ZSBhbiBpdGVtIHRvIGxvY2FsU3RvcmFnZVxuXG4gICAgaWYgKGxvY2FsX3N0b3JhZ2VfZXhpc3RzKSB7XG4gICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Vba2V5XSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uKGtleSwgY2IpIHsgLy8gcmV0cmlldmUgYSBzaW5nbGUgaXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuXG4gICAgdmFyIGZvdW5kX2l0ZW0gPSBmYWxzZTtcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuXG4gICAgICB2YXIgaXRlbSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Vba2V5XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgZm91bmRfaXRlbSA9IEpTT04ucGFyc2UoaXRlbSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKGZvdW5kX2l0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm91bmRfaXRlbTtcbiAgICB9XG5cbiAgfSxcblxuICByZW1vdmU6IGZ1bmN0aW9uKGtleSwgY2IpIHsgLy8gcmVtb3ZlIGEgc2luZ2xlIGl0ZW0gZnJvbSBsb2NhbFN0b3JhZ2VcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gIH0sXG5cbiAgcmVtb3ZlQWxsOiBmdW5jdGlvbihjYikgeyAvLyBkZXN0cm95IHRoZSB3aG9sZSBsb2NhbFN0b3JhZ2VcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2IodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICB9LFxuXG4gIGl0ZW1zOiBmdW5jdGlvbihjYikge1xuXG4gICAgdmFyIGtleXMgPSBmYWxzZTtcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAga2V5cyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpPTA7IGk8d2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXlzLnB1c2god2luZG93LmxvY2FsU3RvcmFnZS5rZXkoaSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2Ioa2V5cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICB9XG5cbn07XG4iLCIvLyBhcHAgbG9nZ2luZyBzZXR0aW5nc1xudmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi8uLi9zZXR0aW5ncycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIExvZyhtZXNzYWdlKSB7XG5cbiAgaWYgKCFzZXR0aW5ncy5wcm9kdWN0aW9uKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkRldmVsb3BtZW50IE1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICByZXR1cm47XG5cbiAgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBcInJpZ2h0LWZhc3RcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLWxlZnQtZmFzdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodC1mYXN0XCIgfSxcbiAgXCJsZWZ0LWZhc3RcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXJpZ2h0LWZhc3RcIiwgbmV4dDogXCJtb3ZlLWZyb20tbGVmdC1mYXN0XCIgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwcm9kdWN0aW9uOiBmYWxzZVxuXG59O1xuIiwidmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xudmFyIExvZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9sb2cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBhc3luYy5wYXJhbGxlbCh7XG5cbiAgICAvLyBkbyB0aGluZ3MgaGVyZSBiZWZvcmUgd2UgbmF2aWdhdGUgdG8gdGhlIGZpcnN0IHBhZ2VcbiAgICBsb2FkRGV2aWNlRXZlbnRzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfSxcblxuICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIExvZyhcIkVycm9yIGxvYWRpbmcgdGhlIGFwcFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBMb2coXCJBcHAgaXMgZG9uZSBsb2FkaW5nXCIpO1xuXG4gICAgICBBcHAuZW1pdChcImFwcDppbml0aWFsaXplZFwiKTtcblxuICAgICAgLy8gTmF2aWdhdGUgdG8gdGhlIEhvbWUgcGFnZVxuICAgICAgQXBwLlJvdXRlci5uYXZpZ2F0ZShcImhvbWVcIiwgXCJmYWRlXCIpO1xuXG4gICAgfVxuXG4gIH0pO1xuXG59O1xuIiwiXG52YXIgZGIgPSByZXF1aXJlKCcuL21vZHVsZXMvZGInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb2RvcygpIHtcblxuICB2YXIgdG9kb3MgPSBkYi5nZXQoXCJUb2Rvc1wiKSB8fCBbXTtcblxuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHRvZG9fdGV4dCkge1xuXG4gICAgLy8gZ2l2ZSB0aGUgdG9kbyBhIHVuaXF1ZSBpZFxuICAgIHZhciB0b2RvID0ge1xuICAgICAgX2lkIDogXCJ0b2RvLVwiICsgRGF0ZS5ub3coKSxcbiAgICAgIHRleHQ6IHRvZG9fdGV4dFxuICAgIH07XG5cbiAgICB0b2Rvcy5wdXNoKHRvZG8pO1xuXG4gICAgLy8gcmVzYXZlIHRoZSBhcnJheSBvZiB0b2RvcyBpbiBsb2NhbFN0b3JhZ2VcbiAgICBkYi5zYXZlKFwiVG9kb3NcIiwgdG9kb3MpO1xuXG4gIH07XG5cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbih0b2RvX2lkKSB7XG5cbiAgICBmb3IgKHZhciBpPTA7IGk8dG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSB0aGUgdG9kbyBmcm9tIHRoZSB0b2RvcyBhcnJheSBpZiB0aGUgX2lkJ3MgbWF0Y2hcbiAgICAgIGlmICh0b2Rvc1tpXS5faWQgPT09IHRvZG9faWQpIHtcbiAgICAgICAgdG9kb3Muc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNhdmUgdGhlIGFycmF5IG9mIHRvZG9zIGluIGxvY2FsU3RvcmFnZVxuICAgIGRiLnNhdmUoXCJUb2Rvc1wiLCB0b2Rvcyk7XG5cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKHRvZG9faWQsIHRvZG9fdGV4dCkge1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodG9kb3NbaV0uX2lkID09PSB0b2RvX2lkKSB7XG4gICAgICAgIHRvZG9zW2ldLnRleHQgPSB0b2RvX3RleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc2F2ZSB0aGUgYXJyYXkgb2YgdG9kb3MgaW4gbG9jYWxTdG9yYWdlXG4gICAgZGIuc2F2ZShcIlRvZG9zXCIsIHRvZG9zKTtcblxuICB9O1xuXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24odG9kb19pZCkge1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodG9kb3NbaV0uX2lkID09PSB0b2RvX2lkKSB7XG4gICAgICAgIHJldHVybiB0b2Rvc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICB0aGlzLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0b2Rvcy5zbGljZSgwKTtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b2RvcyA9IFtdO1xuXG4gICAgZGIuc2F2ZShcIlRvZG9zXCIsIFtdKTtcblxuICB9O1xuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKlxuICAgIFRoZSBpc0VsZW1lbnRWaXNpYmxlIGZ1bmN0aW9uIGhlbHBzIHVzIGRldGVybWluZSBpZiBhbiBlbGVtZW50IGlzIGN1cnJlbnRseSB2aXNpYmxlIHdpdGhpbiB0aGUgZGV2aWNlJ3Mgdmlld3BvcnRcbiAgICBpdCBpcyBwYXNzZWQgYSBtYW5kYXRvcnkgZWwgYXJndW1lbnQgd2hpY2ggaXMgdGhlIGVsZW1lbnQgd2UgYXJlIGNoZWNraW5nIHRvIHNlZSBpcyB2aXNpYmxlXG4gICAgdGhlIG9wdGlvbmFsIG9wdGlvbnMgYXJndW1lbnQgaXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgXCJkaW1lbnNpb25zXCIsIFwiY29udGFpbmVyXCIsIGFuZCBcInNvbWVcIiBwcm9wZXJ0aWVzLiBUaGUgZGltZW5zaW9ucyBwcm9wZXJ0eSBpcyBhbiBvYmplY3QgY29udGFpbmluZyBcInRvcFwiLCBcInJpZ2h0XCIsIFwiYm90dG9tXCIsIGFuZCBcImxlZnRcIiBwcm9wZXJ0aWVzIHRoYXQgaGF2ZSBwaXhlbCB2YWx1ZXMuXG4gICAgdGhlIG9wdGlvbmFsIGNvbnRhaW5lciBvYmplY3QgaXMgYW4gSFRNTCBub2RlIHJlcHJlc2VudGluZyB0aGUgY29udGFpbmVyIHlvdSBhcmUgY2hlY2tpbmcgdG8gc2VlIHRoZSBlbGVtZW50IGlzIHZpc2libGUgaW4sIHJhdGhlciB0aGFuIHRoZSB3aG9sZSB2aWV3cG9ydFxuICAgIGlmIHRoZSBzb21lIHByb3BlcnR5IGV4aXN0cyBhbmQgaXMgc2V0IHRvIHRydWUsIHRoZW4gYW55IHBhcnQgb2YgdGhlIGVsZW1lbnQgYmVpbmcgdmlzaWJsZSB3aWxsIHJlc3VsdCBpbiB0cnVlXG4gICovXG4gIGlzRWxlbWVudFZpc2libGUgOiBmdW5jdGlvbihlbCwgb3B0aW9ucyl7IC8vIG9wdGlvbnMgPSBkaW1lbnNpb25zIChvYmplY3QpLCBjb250YWluZXIgKGVsZW1lbnQpLCBzb21lIChib29sZWFuKVxuICAgIHZhciBlbGVtZW50ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHBhcmVudDtcblxuICAgIC8vIGlmIHRoZSBvcHRpb25hbCBjb250YWluZXIgYXJndW1lbnQgd2FzIHBhc3NlZCwgZ2V0IGl0cyBkaW1lbnNpb25zIHdpdGggZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNvbnRhaW5lcikge1xuICAgICAgcGFyZW50ID0gb3B0aW9ucy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gbm8gb3B0aW9uYWwgY29udGFpbmVyIGFyZ3VtZW50IHdhcyBwYXNzZWQgc28gc2V0IHRoZSBwYXJlbnQgZGltZW5zaW9ucyB0byB0aGUgdmlld3BvcnQnc1xuICAgIGVsc2Uge1xuICAgICAgcGFyZW50LnRvcCA9IDA7IHBhcmVudC5ib3R0b20gPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICBwYXJlbnQubGVmdCA9IDA7IHBhcmVudC5yaWdodCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBkaW1lbnNpb25zIGFyZ3VtZW50IHdhcyBwYXNzZWQsIHRoZW4gd2UgYWRkIG9yIHN1YnRyYWN0IHRob3NlIHBpeGVsIHZhbHVlcyBmcm9tIG91ciBwYXJlbnQgZGltZW5zaW9uc1xuICAgIC8vIHRoaXMgYWxsb3dzIHVzIHRvIGFjY291bnQgZm9yIHRoaW5ncyBsaWtlIGEgNjBweCBoZWFkZXJcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRpbWVuc2lvbnMpIHtcbiAgICAgIHZhciBkaW1lbnNpb25zID0gb3B0aW9ucy5kaW1lbnNpb25zO1xuICAgICAgcGFyZW50LnRvcCA9IHBhcmVudC50b3AgKyAoZGltZW5zaW9ucy50b3AgfHwgMCk7XG4gICAgICBwYXJlbnQucmlnaHQgPSBwYXJlbnQucmlnaHQgLSAoZGltZW5zaW9ucy5yaWdodCB8fCAwKTtcbiAgICAgIHBhcmVudC5ib3R0b20gPSBwYXJlbnQuYm90dG9tIC0gKGRpbWVuc2lvbnMuYm90dG9tIHx8IDApO1xuICAgICAgcGFyZW50LmxlZnQgPSBwYXJlbnQubGVmdCArIChkaW1lbnNpb25zLmxlZnQgfHwgMCk7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIHNvbWUgYXJndW1lbnQgd2FzIHRydWUsIHRoZW4gd2Ugd2lsbCBjaGVjayBpZiBqdXN0IHNvbWUsIGJ1dCBub3QgYWxsIG9mIHRoZSBlbGVtZW50IGlzIHZpc2libGUgd2l0aGluIHRoZSBwYXJlbnQgY29udGFpbmVyXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zb21lKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAoZWxlbWVudC50b3AgPD0gcGFyZW50LmJvdHRvbSkgJiYgKGVsZW1lbnQubGVmdCA8PSBwYXJlbnQucmlnaHQpICYmXG4gICAgICAgIChlbGVtZW50LmJvdHRvbSA+PSBwYXJlbnQudG9wKSAmJiAoZWxlbWVudC5yaWdodCA+PSBwYXJlbnQubGVmdClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIChlbGVtZW50LnRvcCA+PSBwYXJlbnQudG9wKSAmJiAoZWxlbWVudC5sZWZ0ID49IHBhcmVudC5sZWZ0KSAmJlxuICAgICAgICAoZWxlbWVudC5ib3R0b20gPD0gcGFyZW50LmJvdHRvbSkgJiYgKGVsZW1lbnQucmlnaHQgPD0gcGFyZW50LnJpZ2h0KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxufTtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbnZhciBzdWNjZXNzX2NvbG9yID0gXCJncmVlblwiO1xudmFyIGVycm9yX2NvbG9yID0gXCJyZWRcIjtcbnZhciBpbmZvX2NvbG9yID0gXCJibHVlXCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX2FsZXJ0c19jb250YWluZXInLFxuXG4gIGRvbUV2ZW50czoge30sXG5cbiAgYXBwRXZlbnRzOiB7XG5cbiAgICAnYWxlcnQ6c3VjY2Vzcyc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuY3JlYXRlQWxlcnQobWVzc2FnZSwgXCJzdWNjZXNzXCIpO1xuICAgIH0sXG5cbiAgICAnYWxlcnQ6ZXJyb3InOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICB0aGlzLmNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIFwiZXJyb3JcIik7XG4gICAgfSxcblxuICAgICdhbGVydDppbmZvJzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgdGhpcy5jcmVhdGVBbGVydChtZXNzYWdlLCBcImluZm9cIik7XG4gICAgfSxcblxuICAgICdhbGVydCc6IGZ1bmN0aW9uKG1lc3NhZ2UsIGJnX2NvbG9yLCB0ZXh0X2NvbG9yKSB7XG4gICAgICB0aGlzLmNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIFwiaW5mb1wiLCBiZ19jb2xvciwgdGV4dF9jb2xvcik7XG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG5cbiAgICBjcmVhdGVBbGVydDogZnVuY3Rpb24obWVzc2FnZSwgYWxlcnRfdHlwZSwgYmdfY29sb3IsIHRleHRfY29sb3IpIHtcblxuICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnbnVtYmVyJykge1xuICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSArIFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbGVydCBtZXNzYWdlcyBtdXN0IGJlIGEgc3RyaW5nIG9yIG51bWJlclwiKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFsZXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgYWxlcnQuaWQgPSBcImFsZXJ0LVwiICsgRGF0ZS5ub3coKTtcbiAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoXCJzYW1zb25fYWxlcnRcIik7XG5cbiAgICAgIC8vIGFkZCB0aGUgc3VjY2VzcyBvciBlcnJvciBhbGVydCBjbGFzcyBpZiB0aGF0IGlzIHRoZSBjaG9zZW4gYWxlcnRfdHlwZVxuICAgICAgaWYgKCFiZ19jb2xvciAmJiAhdGV4dF9jb2xvciAmJiBhbGVydF90eXBlICE9PSBcImluZm9cIikgYWxlcnQuY2xhc3NMaXN0LmFkZChhbGVydF90eXBlICsgXCJfYWxlcnRcIik7XG5cbiAgICAgIC8vIGFkZCB0aGUgYmFja2dyb3VuZCBjb2xvciBpZiBwcm92aWRlZFxuICAgICAgaWYgKGJnX2NvbG9yKSBhbGVydC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ19jb2xvcjtcblxuICAgICAgLy8gYWRkIHRoZSB0ZXh0IGNvbG9yIGlmIHByb3ZpZGVkXG4gICAgICBpZiAodGV4dF9jb2xvcikgYWxlcnQuc3R5bGUuY29sb3IgPSB0ZXh0X2NvbG9yO1xuICAgICAgYWxlcnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgICAvLyBhcHBlbmQgdGhlIGFsZXJ0IHRvIHRoZSBzYW1zb25fYWxlcnRzX2NvbnRhaW5lclxuICAgICAgdmFyIGZpcnN0Q2hpbGQgPSBTYW1zb24uQXBwLkRPTS5zYW1zb25fYWxlcnRzLmZpcnN0Q2hpbGQ7XG4gICAgICBpZiAoZmlyc3RDaGlsZCkge1xuICAgICAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fYWxlcnRzLmluc2VydEJlZm9yZShhbGVydCwgZmlyc3RDaGlsZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fYWxlcnRzLmFwcGVuZENoaWxkKGFsZXJ0KTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5pdGlhdGUgdGhlIGFsZXJ0IGZhZGUgaW5cblxuICAgICAgLy8gdXNlIGdldENvbXB1dGVkU3R5bGUgdG8gbWFrZSBzdXJlIHRoZSBlbGVtZW50IGlzIGFscmVhZHkgYWRkZWQgdG8gdGhlIERPTSBiZWZvcmUgYXBwbHlpbmcgdGhlIHRyYW5zaXRpb24gY2xhc3NcbiAgICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGFsZXJ0KS5jc3NUZXh0O1xuICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG5cbiAgICAgIC8vIHNob3cgdGhlIG5vdGlmaWNhdGlvbiBmb3IgMyBzZWNvbmRzIGJlZm9yZSByZW1vdmluZ1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICBhbGVydC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGFsZXJ0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYWxlcnQpO1xuICAgICAgICB9LCA4MDApO1xuXG4gICAgICB9LCAzMDAwKTtcblxuICAgIH0sXG5cbiAgICBzdWNjZXNzOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICB0aGlzLmNyZWF0ZUFsZXJ0KG1lc3NhZ2UsIFwic3VjY2Vzc1wiKTtcbiAgICB9LFxuXG4gICAgZXJyb3I6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuY3JlYXRlQWxlcnQobWVzc2FnZSwgXCJlcnJvclwiKTtcbiAgICB9LFxuXG4gICAgaW5mbzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgdGhpcy5jcmVhdGVBbGVydChtZXNzYWdlLCBcImluZm9cIik7XG4gICAgfSxcblxuICAgIGN1c3RvbTogZnVuY3Rpb24obWVzc2FnZSwgYmdfY29sb3IsIHRleHRfY29sb3IpIHtcbiAgICAgIHRoaXMuY3JlYXRlQWxlcnQobWVzc2FnZSwgXCJpbmZvXCIsIGJnX2NvbG9yLCB0ZXh0X2NvbG9yKTtcbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSB0cmFuc3BhcmVudCBvdmVybGF5IGVsZW1lbnRcbiAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fYWxlcnRzID0gdGhpcy5lbGVtZW50O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHRyYW5zcGFyZW50IG92ZXJsYXkgZWxlbWVudCBmcm9tIHRoZSBjYWNoZVxuICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fYWxlcnRzO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuLy4uLy4uLy4uLy4uLy4uL2xpYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ3NhbXNvbl9mYWRlZF9vdmVybGF5JyxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICBTYW1zb24uQXBwLmVtaXQoXCJmYWRlZC1vdmVybGF5OmhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdzaWRlLW1lbnU6aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgICdoZWFkZXI6bWVudS1idXR0b246aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRvZ2dsZUZhZGVkT3ZlcmxheSgpO1xuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNWaXNpYmxlIDogZmFsc2UsXG5cbiAgICBoaWRlRmFkZWRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93RmFkZWRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHRvZ2dsZUZhZGVkT3ZlcmxheTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dGYWRlZE92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBmYWRlZCBvdmVybGF5IGlzIHJlbW92ZWQgYmVmb3JlIGFueSBuZXcgcGFnZSBpcyB0cmFuc2l0aW9uZWQgdG9cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgZGF0YS5jdXJyZW50QW5pbWF0aW9uICE9PSBcInVwZGF0ZVwiKSB7XG4gICAgICAgIHRoaXMuaGlkZUZhZGVkT3ZlcmxheSgpO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgZmFkZWQgb3ZlcmxheSBlbGVtZW50XG4gICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXkgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgZmFkZWQgb3ZlcmxheSBlbGVtZW50IGZyb20gdGhlIGNhY2hlXG4gICAgZGVsZXRlIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mYWRlZF9vdmVybGF5O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuLy4uLy4uLy4uLy4uLy4uL2xpYicpO1xuXG52YXIgaGVhZGVyX2hlaWdodCA9IFwiNjBweFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ3NhbXNvbl9oZWFkZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCAjc2Ftc29uX2hlYWRlcl9tZW51X2J1dHRvbic6IGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkFwcC5lbWl0KCdoZWFkZXI6bWVudS1idXR0b246aGl0Jyk7XG4gICAgfSxcblxuICAgICd0b3VjaCAjc2Ftc29uX2hlYWRlcl9iYWNrX2J1dHRvbic6IGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkFwcC5lbWl0KCdoZWFkZXI6YmFjay1idXR0b246aGl0Jyk7XG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzOiB7XG5cbiAgICAnYXBwOmluaXRpYWxpemVkJzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICB9LFxuXG4gICAgJ2hlYWRlcjpzaG93JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICB9LFxuXG4gICAgJ2hlYWRlcjpoaWRlJzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmhpZGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgfSxcblxuICBleHRlbmQ6IHtcblxuICAgIGhlYWRlckhlaWdodDogaGVhZGVyX2hlaWdodCxcblxuICAgIGlzVmlzaWJsZSA6IGZhbHNlLFxuXG4gICAgaGlkZUhlYWRlciA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd0hlYWRlciA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB0b2dnbGVIZWFkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMuaGlkZUhlYWRlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93SGVhZGVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICAvLyBpZiB0aGUgcGFnZSBpcyBmdWxsc2NyZWVuLCB0aGVuIGhpZGUgdGhlIGhlYWRlciBhbmQgc3RyZXRjaCB0aGUgcGFnZSB0byB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cbiAgICAgIGlmIChTYW1zb24uQXBwLlJvdXRlci5wYWdlQ2FjaGVbZGF0YS5uZXh0UGFnZV0uZnVsbHNjcmVlbikge1xuICAgICAgICBTYW1zb24uQXBwLkRPTVtkYXRhLmluYWN0aXZlUGFnZUVsZW1lbnRdLnN0eWxlLnRvcCA9IFwiXCI7XG4gICAgICAgIHRoaXMuaGlkZUhlYWRlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET01bZGF0YS5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5zdHlsZS50b3AgPSBoZWFkZXJfaGVpZ2h0O1xuICAgICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgZHVyaW5nQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSkgeyAvLyBubyBjYWxsYmFja1xuXG4gICAgICAvLyBpZiB0aGUgbmV4dCBwYWdlIGhhcyBhIHByZXZpb3VzUGFnZSwgdGhlbiByZXBsYWNlIHRoZSAjc2Ftc29uX2hlYWRlcl9tZW51X2J1dHRvbiB3aXRoICNzYW1zb25fbWVudV9iYWNrX2J1dHRvblxuICAgICAgaWYgKFNhbXNvbi5BcHAuUGFnZXNbZGF0YS5uZXh0UGFnZV0ucHJldmlvdXNQYWdlKSB7XG4gICAgICAgIFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIuYnV0dG9uID0gXCJiYWNrXCI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdGl0bGU6IFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIudGl0bGUsXG4gICAgICBidXR0b246IFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIuYnV0dG9uXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGlmICghU2Ftc29uLkFwcC5EYXRhLkhlYWRlcikge1xuICAgICAgU2Ftc29uLkFwcC5EYXRhLkhlYWRlciA9IHt9O1xuICAgIH1cblxuICAgIGlmICghU2Ftc29uLkFwcC5EYXRhLkhlYWRlci50aXRsZSkge1xuICAgICAgU2Ftc29uLkFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiQXBwXCI7XG4gICAgfVxuXG4gICAgaWYgKCFTYW1zb24uQXBwLkRhdGEuSGVhZGVyLmJ1dHRvbikge1xuICAgICAgU2Ftc29uLkFwcC5EYXRhLkhlYWRlci5idXR0b24gPSBcIm1lbnVcIjtcbiAgICB9XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSBoZWFkZXIgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9oZWFkZXIgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgaGVhZGVyIGVsZW1lbnQgZnJvbSB0aGUgY2hhY2hlXG4gICAgZGVsZXRlIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9oZWFkZXI7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGJ1dHRvbiwgdGl0bGUpIHtcbmlmICggYnV0dG9uID09PSBcIm1lbnVcIilcbntcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl9tZW51X2J1dHRvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWJhcnNcXFwiPjwvaT48L2Rpdj5cIik7XG59XG5lbHNlIGlmICggYnV0dG9uID09PSBcImJhY2tcIilcbntcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl9iYWNrX2J1dHRvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWNoZXZyb24tbGVmdFxcXCI+PC9pPjwvZGl2PlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl90aXRsZVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImJ1dHRvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYnV0dG9uOnR5cGVvZiBidXR0b24hPT1cInVuZGVmaW5lZFwiP2J1dHRvbjp1bmRlZmluZWQsXCJ0aXRsZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudGl0bGU6dHlwZW9mIHRpdGxlIT09XCJ1bmRlZmluZWRcIj90aXRsZTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGhlYWRlciA6IHJlcXVpcmUoJy4vaGVhZGVyJyksXG5cbiAgc2lkZU1lbnUgOiByZXF1aXJlKCcuL3NpZGVNZW51JyksXG5cbiAgZmFkZWRPdmVybGF5IDogcmVxdWlyZSgnLi9mYWRlZE92ZXJsYXknKSxcblxuICB0cmFuc3BhcmVudE92ZXJsYXkgOiByZXF1aXJlKCcuL3RyYW5zcGFyZW50T3ZlcmxheScpLFxuXG4gIGFsZXJ0IDogIHJlcXVpcmUoJy4vYWxlcnRzJylcblxufTtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX3NpZGVtZW51JyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG5cbiAgZG9tRXZlbnRzOiB7XG5cbiAgICAvLyBoYW5kbGUgYW55IC5zYW1zb25fc2lkZW1lbnVfaXRlbSBiZWluZyB0b3VjaGVkXG4gICAgJ3RvdWNoIC5zYW1zb25fc2lkZW1lbnVfaXRlbSc6IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQpIHtcblxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSByb3V0ZXIgaXNuJ3QgYWxyZWFkeSBidXN5IGJlZm9yZSBhY2NlcHRpbmcgYW55IGV2ZW50cyBmcm9tIHRoZSBzaWRlbWVudVxuICAgICAgaWYgKCFTYW1zb24uQXBwLlJvdXRlci5pc0J1c3kpIHtcblxuICAgICAgICB2YXIgcGF0aCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhZ2VcIik7XG5cbiAgICAgICAgLy8gc2V0IHNlbGVjdGVkIGFzIHRydWUgb24gdGhlIHRhcmdldGVkIHNpZGVfbWVudV9pdGVtXG4gICAgICAgIFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICBpZiAocGFnZS5wYXRoID09PSBwYXRoKSB7XG4gICAgICAgICAgICBTYW1zb24uQXBwLkRhdGEuc2lkZU1lbnUuc2VsZWN0ZWQgPSBwYXRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9yY2UgdGhlIHNpZGVtZW51IHRvIHJlcmVuZGVyIGlmIHRoZSBzZWxlY3RlZCBzaWRlbWVudV9pdGVtIGhhcyBjaGFuZ2VkXG4gICAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuXG4gICAgICAgIC8vIG9ubHkgbmF2aWdhdGUgaWYgd2UgYXJlbid0IGFscmVhZHkgb24gdGhlIHNlbGVjdGVkIHBhZ2VcbiAgICAgICAgaWYgKHBhdGggIT09IFNhbXNvbi5BcHAuUm91dGVyLmN1cnJlbnRQYWdlKSB7XG5cbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGZvY3VzX2VsZW1lbnQgc28gdGhhdCBpdCBkb2Vzbid0IHRyeSB0byByZWZvY3VzIGR1cmluZyB0aGUgcGFnZSBhbmltYXRpb25cbiAgICAgICAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQ7XG5cbiAgICAgICAgICAvLyBuYXZpZ2F0ZSB0byB0aGUgbmV3IHBhZ2VcbiAgICAgICAgICBTYW1zb24uQXBwLlJvdXRlci5uYXZpZ2F0ZShwYXRoLCBcInJpZ2h0XCIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZVNpZGVNZW51KCk7XG4gICAgICAgICAgU2Ftc29uLkFwcC5lbWl0KFwic2lkZS1tZW51OmhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdoZWFkZXI6bWVudS1idXR0b246aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRvZ2dsZVNpZGVNZW51KCk7XG4gICAgfSxcblxuICAgICdmYWRlZC1vdmVybGF5OmhpdCc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWRlTWVudSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNPcGVuOiBmYWxzZSxcblxuICAgIGNsb3NlU2lkZU1lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgLy8gcmVzdG9yZSBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IGhhZCBmb2N1cyBiZWZvcmUgdGhlIHNpZGVNZW51IHdhcyBvcGVuXG4gICAgICBpZiAoU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQpIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAvLyBtb3ZlIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgdGV4dFxuICAgICAgICB2YXIgdmFsdWVfbGVuZ3RoID0gU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb247XG4gICAgICAgIHZhbHVlX2xlbmd0aCA9ICh2YWx1ZV9sZW5ndGggPT09IGZhbHNlKSA/IFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mb2N1c19lbGVtZW50LnZhbHVlLmxlbmd0aCA6IHZhbHVlX2xlbmd0aDtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UodmFsdWVfbGVuZ3RoLCB2YWx1ZV9sZW5ndGgpO1xuXG4gICAgICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudDtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBvcGVuU2lkZU1lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICAvLyBoaWRlIHRoZSBrZXlib2FyZCBhbmQgcmVtb3ZlIGZvY3VzIGZyb20gYW4gaW5wdXQvdGV4dGFyZWEgZWxlbWVudCBpZiBuZWNlc3NhcnlcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mb2N1c19lbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb24gPSBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudC5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudC5ibHVyKCk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgdG9nZ2xlU2lkZU1lbnU6IGZ1bmN0aW9uKCkgeyAvLyBpZiB0aGUgc2lkZW1lbnUgaXMgY2xvc2VkIHRoZW4gb3BlbiBpdCwgaWYgb3BlbiB0aGVuIGNsb3NlIGl0XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZGVNZW51KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW5TaWRlTWVudSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIHJvdXRlcjoge1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIHNpZGUgbWVudSBpcyBjbG9zZWQgYmVmb3JlIGFueSBuZXcgcGFnZSBpcyB0cmFuc2l0aW9uZWQgdG9cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAodGhpcy5pc09wZW4gICYmIGRhdGEuY3VycmVudEFuaW1hdGlvbiAhPT0gXCJ1cGRhdGVcIikge1xuICAgICAgICB0aGlzLmNsb3NlU2lkZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcblxuICAgICAgcGFnZXM6IFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5wYWdlcyxcbiAgICAgIHNlbGVjdGVkOiBTYW1zb24uQXBwLkRhdGEuc2lkZU1lbnUuc2VsZWN0ZWRcblxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIENvbXBvbmVudCBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgc2lkZW1lbnUgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9zaWRlbWVudSA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBDb21wb25lbnQgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHNpZGVtZW51IGVsZW1lbnQgZnJvbSB0aGUgY2FjaGVcbiAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX3NpZGVtZW51O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChwYWdlcywgc2VsZWN0ZWQsIHVuZGVmaW5lZCkge1xuLy8gaXRlcmF0ZSBwYWdlc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwYWdlcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBhZ2UgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBhZ2VcIiwgcGFnZS5wYXRoLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFtcInNhbXNvbl9zaWRlbWVudV9pdGVtIFwiICsgKChwYWdlLnBhdGggPT09IHNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnKSkgKyBcIlwiXSwgW3RydWVdKSkgKyBcIj48aVwiICsgKGphZGUuY2xzKFsnZmEnLHBhZ2UuaWNvbl0sIFtudWxsLHRydWVdKSkgKyBcIj48L2k+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGFnZS5uYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGFnZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuYXR0cihcImRhdGEtcGFnZVwiLCBwYWdlLnBhdGgsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoW1wic2Ftc29uX3NpZGVtZW51X2l0ZW0gXCIgKyAoKHBhZ2UucGF0aCA9PT0gc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJycpKSArIFwiXCJdLCBbdHJ1ZV0pKSArIFwiPjxpXCIgKyAoamFkZS5jbHMoWydmYScscGFnZS5pY29uXSwgW251bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwYWdlLm5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwicGFnZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnBhZ2VzOnR5cGVvZiBwYWdlcyE9PVwidW5kZWZpbmVkXCI/cGFnZXM6dW5kZWZpbmVkLFwic2VsZWN0ZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNlbGVjdGVkOnR5cGVvZiBzZWxlY3RlZCE9PVwidW5kZWZpbmVkXCI/c2VsZWN0ZWQ6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXknLFxuXG4gIGRvbUV2ZW50czoge1xuXG4gICAgJ3RvdWNoJyA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBTYW1zb24uQXBwLmVtaXQoXCJ0cmFuc3BhcmVudC1vdmVybGF5OmhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHt9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNWaXNpYmxlOiBmYWxzZSxcblxuICAgIGhpZGVUcmFuc3BhcmVudE92ZXJsYXkgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNob3dUcmFuc3BhcmVudE92ZXJsYXkgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlVHJhbnNwYXJlbnRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlVHJhbnNwYXJlbnRPdmVybGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dUcmFuc3BhcmVudE92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnNob3dUcmFuc3BhcmVudE92ZXJsYXkoKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIGFmdGVyQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuaGlkZVRyYW5zcGFyZW50T3ZlcmxheSgpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gY2FjaGUgdGhlIHRyYW5zcGFyZW50IG92ZXJsYXkgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5ID0gdGhpcy5lbGVtZW50O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHRyYW5zcGFyZW50IG92ZXJsYXkgZWxlbWVudCBmcm9tIHRoZSBjYWNoZVxuICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwiXG52YXIgZGIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbW1vbi9tb2R1bGVzL2RiJyk7XG52YXIgYXV0b3NpemUgPSByZXF1aXJlKCdhdXRvc2l6ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwYXRoOiAnYWRkVG9kb3MnLFxuICBzdWJQYWdlT2Y6IGZhbHNlLFxuICBwcmV2aW91c1BhZ2U6IGZhbHNlLFxuICBiYWNrU2FmZTogdHJ1ZSxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG4gIGV4dGVuZDoge1xuICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICB9LFxuXG4gIGRvbUV2ZW50cyA6IHtcblxuICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnQgdG9kbyBpbiBsb2NhbFN0b3JhZ2UgYW5kIHJlc2l6ZSB0aGUgdGV4dGFyZWEgaWYgbmVjZXNzYXJ5XG4gICAgJ2lucHV0ICNuZXctdG9kby10ZXh0YXJlYSc6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBzdG9yZSB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgbmV3IFRvRG8gSXRlbVxuICAgICAgQXBwLk1vZGVscy5Ub2RvSXRlbSA9IEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWU7XG4gICAgICBkYi5zYXZlKFwiVG9kb0l0ZW1cIiwgQXBwLkRPTS5uZXdfdG9kb190ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICB9LFxuXG4gICAgLy8gdmFsaWRhdGUgdGhlIHRvZG8gYW5kIGFkZCBpdCB0byB0aGUgVG9kb3MgY29sbGVjdGlvblxuICAgICd0b3VjaCAjbmV3LXRvZG8tc3VibWl0LWJ1dHRvbic6IGZ1bmN0aW9uKCkge1xuXG4gICAgICBBcHAuZW1pdChcImFsZXJ0OnN1Y2Nlc3NcIiwgXCJOZXcgVG9EbyBJdGVtIHN1Ym1pdHRlZCBzdWNjZXNzZnVsbHkhXCIpO1xuXG4gICAgICB2YXIgdG9kbyA9IEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWU7XG5cbiAgICAgIEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWUgPSBcIlwiO1xuICAgICAgYXV0b3NpemUudXBkYXRlKEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgICBBcHAuTW9kZWxzLlRvZG9JdGVtID0gXCJcIjtcbiAgICAgIGRiLnJlbW92ZShcIlRvZG9JdGVtXCIpO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MuYWRkKHRvZG8pO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzIDoge30sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdG9kb19pdGVtOiBBcHAuTW9kZWxzLlRvZG9JdGVtXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIEFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiQWRkIFRvRG9zXCI7XG5cbiAgICAvLyBjaGVjayBpZiBhIFRvZG9JdGVtIGlzIGFscmVhZHkgaW4gbG9jYWxTdG9yYWdlXG4gICAgaWYgKEFwcC5Nb2RlbHMuVG9kb0l0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgQXBwLk1vZGVscy5Ub2RvSXRlbSA9IGRiLmdldChcIlRvZG9JdGVtXCIpIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRE9NLm5ld190b2RvX3RleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby10ZXh0YXJlYVwiKTtcblxuICAgIGF1dG9zaXplKEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZS5kZXN0cm95KEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgZGVsZXRlIEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWE7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHRvZG9faXRlbSkge1xuYnVmLnB1c2goXCI8dGV4dGFyZWEgaWQ9XFxcIm5ldy10b2RvLXRleHRhcmVhXFxcIiByb3dzPVxcXCIxXFxcIiBwbGFjZWhvbGRlcj1cXFwiQWRkIGEgbmV3IFRvRG8gSXRlbSBoZXJlLi4uXFxcIiByZXF1aXJlZD1cXFwicmVxdWlyZWRcXFwiIGF1dG9mb2N1cz1cXFwiYXV0b2ZvY3VzXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0b2RvX2l0ZW0pID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvdGV4dGFyZWE+PGRpdiBpZD1cXFwibmV3LXRvZG8tc3VibWl0LWJ1dHRvblxcXCI+QWRkIEl0ZW08L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJ0b2RvX2l0ZW1cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvZG9faXRlbTp0eXBlb2YgdG9kb19pdGVtIT09XCJ1bmRlZmluZWRcIj90b2RvX2l0ZW06dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwYXRoOiAnaG9tZScsXG4gIHN1YlBhZ2VPZjogZmFsc2UsXG4gIHByZXZpb3VzUGFnZTogZmFsc2UsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuXG4gIGRvbUV2ZW50cyA6IHt9LFxuXG4gIGFwcEV2ZW50cyA6IHt9LFxuXG4gIGV4dGVuZCA6IHtcblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgbmFtZTogXCJIb21lIFBhZ2VcIlxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYmVmb3JlIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGJlZm9yZVJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRGF0YS5IZWFkZXIudGl0bGUgPSBcIlRvRG8gQXBwXCI7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy90aGlzLnRvcEJveC5vZmYoJ2NsaWNrZWQnKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiYXBwLWluZm9cXFwiPlRoaXMgc2ltcGxlIGFwcCB3aWxsIGFsbG93IHlvdSB0byBtYW5hZ2UgYSBUb0RvIExpc3QuIEhpdCB0aGUgbWVudSBidXR0b24gdG8gbmF2aWdhdGUgdG8gdGhlIFxcXCJBZGQgVG9Eb3NcXFwiIG9yIFxcXCJWaWV3IFRvRG9zXFxcIiBwYWdlcy4gQW55IFRvRG8gaXRlbXMgeW91IGFkZCB3aWxsIGJlIHN0b3JlZCBvbiB5b3VyIGRldmljZSwgc28gdGhhdCB5b3UgY2FuIGFjY2VzcyB0aGVtIGV2ZW4gd2hlbiB5b3UgYXJlIG9mZmxpbmUuPC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgaG9tZTogcmVxdWlyZSgnLi9ob21lJyksXG5cbiAgYWRkVG9kb3M6IHJlcXVpcmUoJy4vYWRkVG9kb3MnKSxcblxuICB2aWV3VG9kb3M6IHJlcXVpcmUoJy4vdmlld1RvZG9zJylcblxufTtcbiIsIlxudmFyIFV0aWxzID0gcmVxdWlyZSgnLi8uLi8uLi9jb21tb24vdXRpbHMnKTtcbnZhciBhdXRvc2l6ZSA9IHJlcXVpcmUoJ2F1dG9zaXplJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG5wYXRoOiAndmlld1RvZG9zJyxcbiAgc3ViUGFnZU9mOiBmYWxzZSxcbiAgcHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgYmFja1NhZmU6IHRydWUsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuXG4gIGV4dGVuZDoge1xuICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICB9LFxuXG4gIGRvbUV2ZW50cyA6IHtcblxuICAgIC8vIHJlbW92ZSBhIHRvZG8gaXRlbSBpZiB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyB0b3VjaGVkXG4gICAgJ3RvdWNoIC50b2RvLWl0ZW0tcmVtb3ZlLWJ1dHRvbicgOiBmdW5jdGlvbihlLCB0YXJnZXQpIHtcblxuICAgICAgdmFyIHRvZG9faWQgPSB0YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuXG4gICAgICBBcHAuZW1pdChcImFsZXJ0OmVycm9yXCIsIHRvZG9faWQgKyBcIiBkZXN0cm95ZWRcIik7XG5cbiAgICAgIC8vIHJlbW92ZSB0aGUgYXV0b3NpemUgbGlzdGVuZXIgb24gdGhpcyBpdGVtcyB0ZXh0YXJlYVxuICAgICAgYXV0b3NpemUuZGVzdHJveSh0YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIikpO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MucmVtb3ZlKHRvZG9faWQpO1xuICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICB9LFxuXG4gICAgLy8gcmVtb3ZlIGZvY3VzIGZyb20gYW55IHRleHRhcmVhIGlmIHRoZSB1c2VyIHRvdWNoZXMgb2ZmIG9mIGl0XG4gICAgJ3RvdWNoICN2aWV3VG9kb3MtcGFnZSc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidG91Y2hlZCB0aGUgcGFnZVwiKTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBcInZpZXdUb2Rvcy1wYWdlXCIpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gc3RvcmUgdGhlIG5ldyBhcnJheSBvZiB0b2RvcyBpZiBhbnkgdG9kbyBpdGVtJ3MgdmFsdWUgaXMgdXBkYXRlZFxuICAgICdpbnB1dCAudG9kby1pdGVtLXRleHQnOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciB0b2RvX2lkID0gZS50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgdmFyIHRvZG9fdGV4dCA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MudXBkYXRlKHRvZG9faWQsIHRvZG9fdGV4dCk7XG4gICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50cyA6IHt9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdG9kb3M6IEFwcC5Db2xsZWN0aW9ucy5Ub2Rvcy5nZXRBbGwoKVxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYmVmb3JlIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGJlZm9yZVJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRGF0YS5IZWFkZXIudGl0bGUgPSBcIllvdXIgVG9EbyBMaXN0XCI7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGF1dG9zaXplKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGV4dGFyZWFcIikpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZS5kZXN0cm95KHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGV4dGFyZWFcIikpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uICh0b2RvcywgdW5kZWZpbmVkKSB7XG4vLyBpdGVyYXRlIHRvZG9zXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHRvZG9zO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgdG9kbyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuYXR0cihcImRhdGEtaWRcIiwgdG9kby5faWQsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwidG9kby1pdGVtXFxcIj48dGV4dGFyZWEgcm93cz1cXFwiMVxcXCIgY2xhc3M9XFxcInRvZG8taXRlbS10ZXh0XFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0b2RvLnRleHQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvdGV4dGFyZWE+PGRpdiBjbGFzcz1cXFwidG9kby1pdGVtLXJlbW92ZS1idXR0b25cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10aW1lc1xcXCI+PC9pPjwvZGl2PjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB0b2RvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5hdHRyKFwiZGF0YS1pZFwiLCB0b2RvLl9pZCwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJ0b2RvLWl0ZW1cXFwiPjx0ZXh0YXJlYSByb3dzPVxcXCIxXFxcIiBjbGFzcz1cXFwidG9kby1pdGVtLXRleHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHRvZG8udGV4dCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC90ZXh0YXJlYT48ZGl2IGNsYXNzPVxcXCJ0b2RvLWl0ZW0tcmVtb3ZlLWJ1dHRvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRpbWVzXFxcIj48L2k+PC9kaXY+PC9kaXY+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJ0b2Rvc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudG9kb3M6dHlwZW9mIHRvZG9zIT09XCJ1bmRlZmluZWRcIj90b2Rvczp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiLy8gVGlueSBBc3luYyBsaWJyYXJ5IGZvciB1c2UgaW4gbW9kZXJuIGVudmlyb25tZW50c1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gcm9vdCBpcyBnbG9iYWwgb24gdGhlIHNlcnZlciwgYW5kIHdpbmRvdyBpbiB0aGUgYnJvd3NlclxuICB2YXIgcm9vdDtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gd2luZG93KSB7XG4gICAgcm9vdCA9IHdpbmRvdztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIHRoaXMgPT09IGdsb2JhbCkge1xuICAgIHJvb3QgPSBnbG9iYWw7XG4gIH0gZWxzZSB7XG4gICAgcm9vdCA9IHRoaXM7XG4gIH1cblxuICAvLyBjYWNoZWQgZm9yIHBlcmZvcm1hbmNlXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICB2YXIgT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuXG4gIC8vIGlzQXJyYXkgYW5kIGlzT2JqZWN0IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKTtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0S2V5cyhvYmopLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9FYWNoKGFyciwgaXRlcmF0b3IpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlcmF0b3IoYXJyW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIGRvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkocm9vdCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBfZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgYXN5bmMgPSB7XG5cbiAgICAvLyBydW5zIHRoZSB0YXNrIG9uIGV2ZXJ5IGl0ZW0gaW4gdGhlIGFycmF5IGF0IG9uY2VcbiAgICBlYWNoIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgZG9FYWNoKGFyciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpdGVyYXRvcihpdGVtLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkID49IGFtb3VudCkgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gcnVucyB0aHJvdWdoIHRoZSBhcnJheSBvbmUgaXRlbSBhdCBhIHRpbWVcbiAgICBlYWNoU2VyaWVzIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyW2NvbXBsZXRlZF0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA8IGFtb3VudCkge1xuICAgICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgICAgaXRlcmF0ZSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYW4gYWNjZXB0IGFuIG9iamVjdCBvciBhcnJheVxuICAgIC8vIHdpbGwgcmV0dXJuIGFuIG9iamVjdCBvciBhcnJheSBvZiByZXN1bHRzIGluIHRoZSBjb3JyZWN0IG9yZGVyXG4gICAgcGFyYWxsZWwgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgdmFyIGtleXM7IHZhciBsZW5ndGg7IHZhciBpOyB2YXIgcmVzdWx0czsgdmFyIGtpbmQ7XG4gICAgICB2YXIgdXBkYXRlZF90YXNrcyA9IFtdO1xuICAgICAgdmFyIGlzX29iamVjdDtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgaWYgKGlzQXJyYXkodGFza3MpKSB7XG5cbiAgICAgICAgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0gW107XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGFza3MpKSB7XG5cbiAgICAgICAgaXNfb2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAga2V5cyA9IE9iamVjdEtleXModGFza3MpO1xuICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IHt9O1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpPTA7IGk8bGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoaXNfb2JqZWN0KSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazoga2V5c1tpXSwgdDogdGFza3Nba2V5c1tpXV0gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazogaSwgdDogdGFza3NbaV0gfSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkX3Rhc2tzLmZvckVhY2goZnVuY3Rpb24odGFza19vYmplY3QpIHtcblxuICAgICAgICB0YXNrX29iamVjdC50KGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgICByZXN1bHRzW3Rhc2tfb2JqZWN0LmtdID0gcmVzdWx0O1xuXG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIGlmIChjb3VudGVyID09IGxlbmd0aCkgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvLyBvbmx5IGFjY2VwdHMgYW4gYXJyYXkgc2luY2UgdGhlIHByZXNlcnZhdGlvbiBvZiB0aGUgb3JkZXIgb2YgcHJvcGVydGllcyBvbiBhbiBvYmplY3QgY2FuJ3QgYmUgZ3VhcmFudGVlZFxuICAgIC8vIHJldHVybnMgYW4gYXJyYXkgb2YgcmVzdWx0cyBpbiBvcmRlclxuICAgIHNlcmllcyA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFza3MpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIHJ1blRhc2soaW5kZXgpIHtcbiAgICAgICAgdGFza3NbaW5kZXhdKGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSkgcmV0dXJuIHJ1blRhc2soaW5kZXggKyAxKTtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5UYXNrKDApO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgfVxuICAvLyBBTUQgLyBSZXF1aXJlSlNcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFzeW5jO1xuICAgIH0pO1xuICB9XG4gIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgZWxzZSB7XG4gICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICB9XG5cbn0oKSk7XG4iLCIvKiFcblx0QXV0b3NpemUgMy4wLjVcblx0bGljZW5zZTogTUlUXG5cdGh0dHA6Ly93d3cuamFja2xtb29yZS5jb20vYXV0b3NpemVcbiovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICdtb2R1bGUnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCBtb2R1bGUpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cywgbW9kKTtcblx0XHRnbG9iYWwuYXV0b3NpemUgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIG1vZHVsZSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0ZnVuY3Rpb24gYXNzaWduKHRhKSB7XG5cdFx0dmFyIF9yZWYgPSBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG5cdFx0dmFyIF9yZWYkc2V0T3ZlcmZsb3dYID0gX3JlZi5zZXRPdmVyZmxvd1g7XG5cdFx0dmFyIHNldE92ZXJmbG93WCA9IF9yZWYkc2V0T3ZlcmZsb3dYID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRzZXRPdmVyZmxvd1g7XG5cdFx0dmFyIF9yZWYkc2V0T3ZlcmZsb3dZID0gX3JlZi5zZXRPdmVyZmxvd1k7XG5cdFx0dmFyIHNldE92ZXJmbG93WSA9IF9yZWYkc2V0T3ZlcmZsb3dZID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRzZXRPdmVyZmxvd1k7XG5cblx0XHRpZiAoIXRhIHx8ICF0YS5ub2RlTmFtZSB8fCB0YS5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJyB8fCB0YS5oYXNBdHRyaWJ1dGUoJ2RhdGEtYXV0b3NpemUtb24nKSkgcmV0dXJuO1xuXG5cdFx0dmFyIGhlaWdodE9mZnNldCA9IG51bGw7XG5cdFx0dmFyIG92ZXJmbG93WSA9ICdoaWRkZW4nO1xuXG5cdFx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRcdHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKTtcblxuXHRcdFx0aWYgKHN0eWxlLnJlc2l6ZSA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHR0YS5zdHlsZS5yZXNpemUgPSAnbm9uZSc7XG5cdFx0XHR9IGVsc2UgaWYgKHN0eWxlLnJlc2l6ZSA9PT0gJ2JvdGgnKSB7XG5cdFx0XHRcdHRhLnN0eWxlLnJlc2l6ZSA9ICdob3Jpem9udGFsJztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0eWxlLmJveFNpemluZyA9PT0gJ2NvbnRlbnQtYm94Jykge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSAtKHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdCb3R0b20pKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoYW5nZU92ZXJmbG93KHZhbHVlKSB7XG5cdFx0XHR7XG5cdFx0XHRcdC8vIENocm9tZS9TYWZhcmktc3BlY2lmaWMgZml4OlxuXHRcdFx0XHQvLyBXaGVuIHRoZSB0ZXh0YXJlYSB5LW92ZXJmbG93IGlzIGhpZGRlbiwgQ2hyb21lL1NhZmFyaSBkbyBub3QgcmVmbG93IHRoZSB0ZXh0IHRvIGFjY291bnQgZm9yIHRoZSBzcGFjZVxuXHRcdFx0XHQvLyBtYWRlIGF2YWlsYWJsZSBieSByZW1vdmluZyB0aGUgc2Nyb2xsYmFyLiBUaGUgZm9sbG93aW5nIGZvcmNlcyB0aGUgbmVjZXNzYXJ5IHRleHQgcmVmbG93LlxuXHRcdFx0XHR2YXIgd2lkdGggPSB0YS5zdHlsZS53aWR0aDtcblx0XHRcdFx0dGEuc3R5bGUud2lkdGggPSAnMHB4Jztcblx0XHRcdFx0Ly8gRm9yY2UgcmVmbG93OlxuXHRcdFx0XHQvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5cdFx0XHRcdHRhLm9mZnNldFdpZHRoO1xuXHRcdFx0XHQvKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuXHRcdFx0XHR0YS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0fVxuXG5cdFx0XHRvdmVyZmxvd1kgPSB2YWx1ZTtcblxuXHRcdFx0aWYgKHNldE92ZXJmbG93WSkge1xuXHRcdFx0XHR0YS5zdHlsZS5vdmVyZmxvd1kgPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdFx0dmFyIHN0YXJ0SGVpZ2h0ID0gdGEuc3R5bGUuaGVpZ2h0O1xuXHRcdFx0dmFyIGh0bWxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXHRcdFx0dmFyIGJvZHlUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblx0XHRcdHZhciBvcmlnaW5hbEhlaWdodCA9IHRhLnN0eWxlLmhlaWdodDtcblxuXHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuXG5cdFx0XHR2YXIgZW5kSGVpZ2h0ID0gdGEuc2Nyb2xsSGVpZ2h0ICsgaGVpZ2h0T2Zmc2V0O1xuXG5cdFx0XHRpZiAodGEuc2Nyb2xsSGVpZ2h0ID09PSAwKSB7XG5cdFx0XHRcdC8vIElmIHRoZSBzY3JvbGxIZWlnaHQgaXMgMCwgdGhlbiB0aGUgZWxlbWVudCBwcm9iYWJseSBoYXMgZGlzcGxheTpub25lIG9yIGlzIGRldGFjaGVkIGZyb20gdGhlIERPTS5cblx0XHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gb3JpZ2luYWxIZWlnaHQ7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dGEuc3R5bGUuaGVpZ2h0ID0gZW5kSGVpZ2h0ICsgJ3B4JztcblxuXHRcdFx0Ly8gcHJldmVudHMgc2Nyb2xsLXBvc2l0aW9uIGp1bXBpbmdcblx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBodG1sVG9wO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBib2R5VG9wO1xuXG5cdFx0XHR2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCk7XG5cblx0XHRcdGlmIChzdHlsZS5oZWlnaHQgIT09IHRhLnN0eWxlLmhlaWdodCkge1xuXHRcdFx0XHRpZiAob3ZlcmZsb3dZICE9PSAndmlzaWJsZScpIHtcblx0XHRcdFx0XHRjaGFuZ2VPdmVyZmxvdygndmlzaWJsZScpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKG92ZXJmbG93WSAhPT0gJ2hpZGRlbicpIHtcblx0XHRcdFx0XHRjaGFuZ2VPdmVyZmxvdygnaGlkZGVuJyk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdGFydEhlaWdodCAhPT0gdGEuc3R5bGUuaGVpZ2h0KSB7XG5cdFx0XHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRcdFx0ZXZ0LmluaXRFdmVudCgnYXV0b3NpemU6cmVzaXplZCcsIHRydWUsIGZhbHNlKTtcblx0XHRcdFx0dGEuZGlzcGF0Y2hFdmVudChldnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBkZXN0cm95ID0gKGZ1bmN0aW9uIChzdHlsZSkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZSk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZSk7XG5cdFx0XHR0YS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtYXV0b3NpemUtb24nKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOmRlc3Ryb3knLCBkZXN0cm95KTtcblxuXHRcdFx0T2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHR0YS5zdHlsZVtrZXldID0gc3R5bGVba2V5XTtcblx0XHRcdH0pO1xuXHRcdH0pLmJpbmQodGEsIHtcblx0XHRcdGhlaWdodDogdGEuc3R5bGUuaGVpZ2h0LFxuXHRcdFx0cmVzaXplOiB0YS5zdHlsZS5yZXNpemUsXG5cdFx0XHRvdmVyZmxvd1k6IHRhLnN0eWxlLm92ZXJmbG93WSxcblx0XHRcdG92ZXJmbG93WDogdGEuc3R5bGUub3ZlcmZsb3dYLFxuXHRcdFx0d29yZFdyYXA6IHRhLnN0eWxlLndvcmRXcmFwIH0pO1xuXG5cdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6ZGVzdHJveScsIGRlc3Ryb3kpO1xuXG5cdFx0Ly8gSUU5IGRvZXMgbm90IGZpcmUgb25wcm9wZXJ0eWNoYW5nZSBvciBvbmlucHV0IGZvciBkZWxldGlvbnMsXG5cdFx0Ly8gc28gYmluZGluZyB0byBvbmtleXVwIHRvIGNhdGNoIG1vc3Qgb2YgdGhvc2UgZXZlbnRzLlxuXHRcdC8vIFRoZXJlIGlzIG5vIHdheSB0aGF0IEkga25vdyBvZiB0byBkZXRlY3Qgc29tZXRoaW5nIGxpa2UgJ2N1dCcgaW4gSUU5LlxuXHRcdGlmICgnb25wcm9wZXJ0eWNoYW5nZScgaW4gdGEgJiYgJ29uaW5wdXQnIGluIHRhKSB7XG5cdFx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZSk7XG5cdFx0fVxuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZSk7XG5cdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGUpO1xuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOnVwZGF0ZScsIHVwZGF0ZSk7XG5cdFx0dGEuc2V0QXR0cmlidXRlKCdkYXRhLWF1dG9zaXplLW9uJywgdHJ1ZSk7XG5cblx0XHRpZiAoc2V0T3ZlcmZsb3dZKSB7XG5cdFx0XHR0YS5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcblx0XHR9XG5cdFx0aWYgKHNldE92ZXJmbG93WCkge1xuXHRcdFx0dGEuc3R5bGUub3ZlcmZsb3dYID0gJ2hpZGRlbic7XG5cdFx0XHR0YS5zdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJztcblx0XHR9XG5cblx0XHRpbml0KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBkZXN0cm95KHRhKSB7XG5cdFx0aWYgKCEodGEgJiYgdGEubm9kZU5hbWUgJiYgdGEubm9kZU5hbWUgPT09ICdURVhUQVJFQScpKSByZXR1cm47XG5cdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdGV2dC5pbml0RXZlbnQoJ2F1dG9zaXplOmRlc3Ryb3knLCB0cnVlLCBmYWxzZSk7XG5cdFx0dGEuZGlzcGF0Y2hFdmVudChldnQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlKHRhKSB7XG5cdFx0aWYgKCEodGEgJiYgdGEubm9kZU5hbWUgJiYgdGEubm9kZU5hbWUgPT09ICdURVhUQVJFQScpKSByZXR1cm47XG5cdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdGV2dC5pbml0RXZlbnQoJ2F1dG9zaXplOnVwZGF0ZScsIHRydWUsIGZhbHNlKTtcblx0XHR0YS5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cdH1cblxuXHR2YXIgYXV0b3NpemUgPSBudWxsO1xuXG5cdC8vIERvIG5vdGhpbmcgaW4gTm9kZS5qcyBlbnZpcm9ubWVudCBhbmQgSUU4IChvciBsb3dlcilcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdGF1dG9zaXplID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS5kZXN0cm95ID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS51cGRhdGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGF1dG9zaXplID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIGZ1bmN0aW9uICh4KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFzc2lnbih4LCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS5kZXN0cm95ID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIGRlc3Ryb3kpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRpZiAoZWwpIHtcblx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbC5sZW5ndGggPyBlbCA6IFtlbF0sIHVwZGF0ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gYXV0b3NpemU7XG59KTsiLG51bGwsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCIvLyBTYW1zb24uQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG4vLyBVc2VkIHRvIHNpbXBsaWZ5IGNvbXBvbmVudCByZW5kZXJpbmcgYW5kIHRyYW5zaXRpb25zIGluIHNpbmdsZSBwYWdlIGFwcHNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBTaGFyZWQgPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKiBvcHRpb25zIGNhbiBpbmNsdWRlOlxuLy8gZWwgLSB0aGUgaWQgb2YgdGhlIGVsZW1lbnQgdGhhdCB0aGUgdmlldyB3aWxsIHJlbmRlciBpbnRvXG4vLyB0ZW1wbGF0ZS9yZW5kZXIgLSB0aGUgZnVuY3Rpb24gdGhhdCBvdXRwdXRzIGFuIEhUTUwgc3RyaW5nIHRoYXQgZ2V0cyBhdHRhY2hlZCB0byB0aGUgRE9NXG4vLyBjb21wb25lbnRzIC0gYW55IG90aGVyIGNvbXBvbmVudHMgdGhhdCBzaG91bGQgYmUgbG9hZGVkL3JlZnJlc2hlZCB3aXRoIHRoaXMgY29tcG9uZW50XG4vLyBldmVudHMvZG9tRXZlbnRzIC0gYW55IGV2ZW50TGlzdGVuZXJzIHRvIGF0dGFjaCB0byBET00gbm9kZXNcbi8vIGFwcEV2ZW50cyAtIGFueSBpbnRlcm5hbCBhcHAgZXZlbnRMaXN0ZW5lcnNcbi8vIGJlZm9yZVJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkICh1cGRhdGUgbW9kZWxzLCBzb3J0IGNvbGxlY3Rpb25zKVxuLy8gYWZ0ZXJSZW5kZXIgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyBhZnRlciB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkIChzY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSwgbWFya2VkIGNoZWNrYm94ZXMgYXMgY2hlY2tlZClcbi8vIGJlZm9yZVJlbW92ZSAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGZ1bGx5IGRlc3Ryb3llZCAoY2xlYW51cCBtb2RlbHMsIHVwZGF0ZSBhY3Rpdml0eSBoaXN0b3J5KVxuLy8gY3VzdG9tL2V4dGVuZCAtIGFuIG9iamVjdCBjb250YWluaW5nIGN1c3RvbSBtZXRob2RzL3Byb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBDb21wb25lbnQgaW5zdGFuY2UgaWYgdGhlcmUgYXJlIG5vIG5hbWluZyBjb25mbGljdHMgd2l0aCByZXNlcnZlZCBwcm9wZXJ0aWVzXG4qL1xuXG5mdW5jdGlvbiBTYW1zb25Db21wb25lbnQob3B0aW9ucykge1xuXG4gIC8vIHNldCB0aGUgZWxlbWVudCdzIHNlbGVjdG9yIHRoYXQgd2lsbCBkZXRlcm1pbmUgd2hlcmUgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZFxuICB0aGlzLmVsID0gKG9wdGlvbnMuZWwuY2hhckF0KDApID09PSBcIiNcIikgPyBvcHRpb25zLmVsLnNsaWNlKDEpIDogb3B0aW9ucy5lbDtcblxuICAvLyBzZXQgdGhlIGNvbXBvbmVudCBldmVudHMgaWYgdGhleSBhcmUgc3BlY2lmaWVkXG4gIHRoaXMuZG9tRXZlbnRzID0gb3B0aW9ucy5ldmVudHMgPyBvcHRpb25zLmV2ZW50cyA6IChvcHRpb25zLmRvbUV2ZW50cyB8fCB7fSk7XG4gIHRoaXMuYXBwRXZlbnRzID0gb3B0aW9ucy5hcHBFdmVudHMgfHwge307XG5cbiAgLy8gc3ViY29tcG9uZW50c1xuICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG4gIHRoaXMuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcblxuICAvLyBzZXRJbml0aWFsU3RhdGUgZnVuY3Rpb25cbiAgdGhpcy5zZXRJbml0aWFsU3RhdGUgPSBvcHRpb25zLnNldEluaXRpYWxTdGF0ZSB8fCBTaGFyZWQuanVzdFJldHVybk9iamVjdDtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xuICB0aGlzLl9pbml0aWFsU3RhdGVTZXQgPSBmYWxzZTtcbiAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gc2V0IHRoZSBjb21wb25lbnQncyByZW5kZXIgZnVuY3Rpb24gdGhhdCB3aWxsIG91dHB1dCBhbiBodG1sIHN0cmluZ1xuICAvLyBpZiBubyByZW5kZXIgZnVuY3Rpb24gd2FzIHBhc3NlZCBpbiwgd2UgY2hlY2sgZm9yIGEgdGVtcGxhdGUgZnVuY3Rpb25cbiAgdGhpcy5fdGVtcGxhdGUgPSBvcHRpb25zLnJlbmRlciB8fCBvcHRpb25zLnRlbXBsYXRlO1xuXG4gIC8vIHNldCB0aGUgYmVmb3JlUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5iZWZvcmVSZW5kZXIgPSBvcHRpb25zLmJlZm9yZVJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgYWZ0ZXJSZW5kZXIgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZFxuICB0aGlzLmFmdGVyUmVuZGVyID0gb3B0aW9ucy5hZnRlclJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgcmVtb3ZlL2Nsb3NlIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWQsIG90aGVyd2lzZSBqdXN0IGludm9rZSBjYWxsYmFja1xuICB0aGlzLmJlZm9yZVJlbW92ZSA9IG9wdGlvbnMuYmVmb3JlUmVtb3ZlIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gYWRkIGFueSByb3V0ZXItcmVsYXRlZCB0YXNrc1xuICB0aGlzLl91dWlkID0gdGhpcy5lbCArIFwiLVwiICsgRGF0ZS5ub3coKTsgLy8gdGhlIHV1aWQgYWxsb3dzIHVzIHRvIGVhc2lseSByZWZlcmVuY2UgdGhlIGFkZGVkIHJvdXRlciB0YXNrc1xuICB0aGlzLl9yb3V0ZXIgPSBvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fTtcbiAgU2hhcmVkLmFkZFJvdXRlclRhc2tzKHRoaXMpO1xuXG4gIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20gb3IgZXh0ZW5kIG9iamVjdFxuICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBjdXN0b20sIFNoYXJlZC5yZXNlcnZlZCk7XG5cbn1cblxuLy8gSGF2ZSB0aGUgU2Ftc29uQ29tcG9uZW50IGNsYXNzIGluaGVyaXQgYW55IHNoYXJlZCBtZXRob2RzIGZyb20gUGFnZUNvbXBvbmVudEJhc2VcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3R5cGUgPSBcIkNvbXBvbmVudFwiO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IFNoYXJlZC5zZXRTdGF0ZTtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUucmVzZXRTdGF0ZSA9IFNoYXJlZC5yZXNldFN0YXRlO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fZG9GaXJzdCA9IFNoYXJlZC5fZG9GaXJzdDtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2xvYWRFdmVudHMgPSBTaGFyZWQuX2xvYWRFdmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9kZXN0cm95RXZlbnRzID0gU2hhcmVkLl9kZXN0cm95RXZlbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fbG9hZENvbXBvbmVudHMgPSBTaGFyZWQuX2xvYWRDb21wb25lbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyQ29tcG9uZW50cyA9IFNoYXJlZC5fcmVuZGVyQ29tcG9uZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2Rlc3Ryb3lDb21wb25lbnRzID0gU2hhcmVkLl9kZXN0cm95Q29tcG9uZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2ZpeEF1dG9Gb2N1c0VsZW1lbnRzID0gU2hhcmVkLl9maXhBdXRvRm9jdXNFbGVtZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3JlbW92ZSA9IFNoYXJlZC5fcmVtb3ZlO1xuXG4vLyByZW5kZXIgdGhlIGNvbXBvbmVudCB0byB0aGUgRE9NXG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbihmb3JjZV91cGRhdGUsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuX2xvYWRDb21wb25lbnRzKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kb0ZpcnN0KFwiYmVmb3JlUmVuZGVyXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIXNlbGYuX2luaXRpYWxTdGF0ZVNldCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gc2VsZi5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBjb21wb25lbnQgZWxlbWVudFxuICAgICAgaWYgKCFzZWxmLmVsZW1lbnQgfHwgKGZvcmNlX3VwZGF0ZSB8fCBzZWxmLl9zdGF0ZUNoYW5nZWQpKSB7XG4gICAgICAgIGZvcmNlX3VwZGF0ZSA9IHRydWU7XG4gICAgICAgIHNlbGYuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuZWwpO1xuXG4gICAgICAgIGlmICghc2VsZi5lbGVtZW50KSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk5vIGVsZW1lbnQgd2l0aCB0aGUgaWQgXCIgKyBzZWxmLmVsICsgXCIgZXhpc3RzIGluIHRoZSBET00gc28gd2Ugd2lsbCBjcmVhdGUgaXQgYW5kIGFwcGVuZCBpdCB0byBpdHMgcGFyZW50LlwiKTtcbiAgICAgICAgICBzZWxmLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIHNlbGYuZWxlbWVudC5pZCA9IHNlbGYuZWw7XG5cbiAgICAgICAgICBpZiAoc2VsZi5fdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSBzZWxmLl90ZW1wbGF0ZShzZWxmLnN0YXRlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5wYXJlbnQgJiYgc2VsZi5wYXJlbnQuZWxlbWVudCkge1xuICAgICAgICAgICAgc2VsZi5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIGlzIG5vIHBhcmVudCB0byBhcHBlbmQgXCIgKyBzZWxmLmVsICsgXCIgdG8uXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzZWxmLl90ZW1wbGF0ZSkge1xuICAgICAgICAgICAgc2VsZi5lbGVtZW50LmlubmVySFRNTCA9IHNlbGYuX3RlbXBsYXRlKHNlbGYuc3RhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2xvYWRFdmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2VsZi5fcmVuZGVyQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcmVzZXQgc3RhdGVDaGFuZ2VkXG4gICAgICAgICAgc2VsZi5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICBzZWxmLl9maXhBdXRvRm9jdXNFbGVtZW50cygpO1xuXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyUmVuZGVyXCIsIGZ1bmN0aW9uKCkgeyBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7IH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbXNvbkNvbXBvbmVudDtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBZGRFdmVudHModGFyZ2V0KSB7XG5cbiAgdmFyIGV2ZW50cyA9IHt9OyB2YXIgZW1wdHkgPSBbXTtcblxuICAvLyBzdGFydCBsaXN0ZW5pbmdcbiAgdGFyZ2V0Lm9uID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlciwgY29udGV4dCkge1xuICAgIChldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW10pLnB1c2goW2hhbmRsZXIsIGNvbnRleHRdKTtcbiAgfTtcblxuICAvLyBzdG9wIGxpc3RlbmluZ1xuICB0YXJnZXQub2ZmID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlcikge1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgIGkgPSBsaXN0Lmxlbmd0aCA9IGhhbmRsZXIgPyBsaXN0Lmxlbmd0aCA6IDBcbiAgICB3aGlsZShpLS0pIGhhbmRsZXIgPT0gbGlzdFtpXVswXSAmJiBsaXN0LnNwbGljZShpLDEpXG4gIH07XG5cbiAgLy8gc2VuZCB0aGUgZXZlbnQgdG8gYW55b25lIGxpc3RlbmluZ1xuICB0YXJnZXQuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICAgIHZhciBhcmdzID0gZW1wdHkuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgIGxpc3QgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksIGk9MCwgalxuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGFyZ3MpXG4gIH07XG5cbn07XG4iLCIvKiFcbiAqIFNhbXNvbi5qc1xuICogQ29weXJpZ2h0KGMpIDIwMTUgU2FtIERlbGdhZG9cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciAkID0gcmVxdWlyZSgnLi9tb2R1bGVzL3F1by5qcycpO1xudmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xuXG4vLyByZXNlcnZlZCBwcm9wZXJ0aWVzIGZvciB0aGUgU2Ftc29uLkFwcCBvYmplY3QuIGFsbCBwcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggXyBhcmUgYWxzbyByZXNlcnZlZFxudmFyIHJlc2VydmVkID0gW1wiJFwiLCBcIkRPTVwiLCBcIkRhdGFcIiwgXCJzdHlsZVNoZWV0XCIsIFwiYmFzZVN0eWxlXCIsIFwic3R5bGVcIiwgXCJjb21wb25lbnRzXCIsIFwic2V0Q29tcG9uZW50c1wiLCBcIlJvdXRlclwiLCBcIlBhZ2VzXCIsIFwib25cIiwgXCJlbWl0XCIsIFwib2ZmXCJdO1xuXG4vLyBjcmVhdGUgdGhlIFNhbXNvbiBvYmplY3QgdGhhdCB3aWxsIGJlIGV4cG9ydGVkXG5tb2R1bGUuZXhwb3J0cyA9IFNhbXNvbiA9IHt9O1xuXG5TYW1zb24uVkVSU0lPTiA9ICcwLjEuNyc7IC8vIGtlZXAgaW4gc3luYyB3aXRoIHBhY2thZ2UuanNvblxuXG5TYW1zb24uJCA9ICQ7IC8vIGF0dGFjaCBRdW9KUyB0byBTYW1zb25cblxuU2Ftc29uLkV2ZW50cyA9IHJlcXVpcmUoJy4vZXZlbnRzJyk7IC8vIGEgbWl4aW4gdGhhdCB3aWxsIGF0dGFjaCBvbiwgb2ZmLCBhbmQgZW1pdCBtZXRob2RzIHRvIGFuIG9iamVjdFxuXG5TYW1zb24uUm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcblNhbXNvbi5jcmVhdGVSb3V0ZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciByb3V0ZXIgPSBuZXcgU2Ftc29uLlJvdXRlcihvcHRpb25zKTtcbiAgcmV0dXJuIHJvdXRlcjtcbn07XG5cblNhbXNvbi5QYWdlID0gcmVxdWlyZSgnLi9wYWdlJyk7XG5TYW1zb24uY3JlYXRlUGFnZSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGFkZF9ldmVudHMpIHtcbiAgdmFyIHBhZ2UgPSBuZXcgU2Ftc29uLlBhZ2Uob3B0aW9ucyk7XG4gIGlmIChhZGRfZXZlbnRzKSBTYW1zb24uRXZlbnRzKHBhZ2UpO1xuICByZXR1cm4gcGFnZTtcbn07XG5cblNhbXNvbi5Db21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudCcpO1xuU2Ftc29uLmNyZWF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uKG9wdGlvbnMsIGFkZF9ldmVudHMpIHtcbiAgdmFyIGNvbXBvbmVudCA9IG5ldyBTYW1zb24uQ29tcG9uZW50KG9wdGlvbnMpO1xuICBpZiAoYWRkX2V2ZW50cykgU2Ftc29uLkV2ZW50cyhjb21wb25lbnQpO1xuICByZXR1cm4gY29tcG9uZW50O1xufTtcblxuLy8gU2Ftc29uLkRPTSB3aWxsIGNhY2hlIHJlZmVyZW5jZXMgdG8gYW55IFNhbXNvbiBjcmVhdGVkIERPTSBlbGVtZW50cyBsaWtlICNzYW1zb24tYXBwXG5TYW1zb24uRE9NID0ge307XG5cbi8vIHRoZSBpbnN0YW50aWF0ZWQgYXBwIHdpbGwgYmUgYXR0YWNoZWQgdG8gU2Ftc29uLkFwcCBmb3IgcXVpY2sgYWNjZXNzXG5TYW1zb24uQXBwO1xuXG4vLyBvbmx5IG9uZSBTYW1zb24gQXBwIGNhbiBleGlzdCBhdCBhIHRpbWUsIHNvIGlmIG9uZSBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQsIHNpbXBseSByZXR1cm4gaXRcblNhbXNvbi5jcmVhdGVBcHAgPSBmdW5jdGlvbigpIHtcbiAgaWYgKFNhbXNvbi5BcHApIHtcbiAgICByZXR1cm4gU2Ftc29uLkFwcDtcbiAgfSBlbHNlIHtcbiAgICBTYW1zb24uQXBwID0gbmV3IFNhbXNvbkFwcCgpO1xuICAgIFNhbXNvbi5FdmVudHMoU2Ftc29uLkFwcCk7IC8vIG1ha2UgdGhlIG1haW4gYXBwIG9iamVjdCBhbiBldmVudCBidXNcbiAgICBTYW1zb24uQXBwLkRPTSA9IFNhbXNvbi5ET007XG4gICAgcmV0dXJuIFNhbXNvbi5BcHA7XG4gIH1cbn07XG5cbi8vIHRoZSBTYW1zb25BcHAgY2xhc3NcbmZ1bmN0aW9uIFNhbXNvbkFwcCgpIHtcbiAgdGhpcy5faXNDb25maWd1cmVkID0gZmFsc2U7XG59XG5cblNhbXNvbkFwcC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLl9pc0NvbmZpZ3VyZWQpIHtcblxuICAgIC8vIGFkZCBRdW9KUyB0byB0aGUgYXBwIG9iamVjdCBmb3IgcXVpY2sgYWNjZXNzXG4gICAgdGhpcy4kID0gJDtcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyBEYXRhIG9iamVjdFxuICAgIHRoaXMuRGF0YSA9IG9wdGlvbnMuRGF0YSB8fCBvcHRpb25zLmRhdGEgfHwge307XG5cbiAgICAvLyBzZXR1cCB0aGUgYXBwJ3MgcGFnZXNcbiAgICB0aGlzLlBhZ2VzID0gb3B0aW9ucy5QYWdlcyB8fCBvcHRpb25zLnBhZ2VzIHx8IHt9O1xuXG4gICAgLy8gc2V0dXAgdGhlIGFwcCdzIGJhc2UgY29tcG9uZW50c1xuICAgIHRoaXMuc2V0Q29tcG9uZW50cyA9IG9wdGlvbnMuc2V0Q29tcG9uZW50cyB8fCBmdW5jdGlvbigpIHsgcmV0dXJuIChvcHRpb25zLmNvbXBvbmVudHMgfHwge30pOyB9O1xuICAgIHRoaXMuY29tcG9uZW50cyA9IHRoaXMuc2V0Q29tcG9uZW50cygpO1xuXG4gICAgLyogRmlyc3Qgc2V0dXAgdGhlIHJlcXVpcmVkIERPTSBlbGVtZW50cyBhbmQgY29tcG9uZW50cyBvZiBhIFNhbXNvbiBBcHAgKi9cblxuICAgIC8vIGFkZCB0aGUgY29yZSBkaXZzIHRvIHRoZSBib2R5XG4gICAgLy8gI3NhbXNvbl9hcHAsICNzYW1zb25fcGFnZXMsICNzYW1zb25fcGFnZV8xLCAjc2Ftc29uX3BhZ2VfMiwgI3NhbXNvbl9mYWRlZF9vdmVybGF5LCAjc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXlcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9hcHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX2FwcC5pZCA9IFwic2Ftc29uX2FwcFwiO1xuXG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzLmlkID0gXCJzYW1zb25fcGFnZXNcIjtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8xLmlkID0gXCJzYW1zb25fcGFnZV8xXCI7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8xLmNsYXNzTGlzdC5hZGQoXCJzYW1zb24tcGFnZVwiLCBcImFjdGl2ZVwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5hcHBlbmRDaGlsZChTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzEpO1xuXG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzIuaWQgPSBcInNhbXNvbl9wYWdlXzJcIjtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzIuY2xhc3NMaXN0LmFkZChcInNhbXNvbi1wYWdlXCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMik7XG5cbiAgICBTYW1zb24uRE9NLnNhbXNvbl9hcHAuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChTYW1zb24uRE9NLnNhbXNvbl9hcHApOyAvLyBhZGQgdGhlIGJhc2UgZGl2cyB0byB0aGUgYm9keVxuXG4gICAgLy8gc2V0dXAgdGhlIGFwcCdzIHJvdXRlciBhZnRlciBsb2FkaW5nIGFueSBleHRyYSBjb21wb25lbnRzXG4gICAgdGhpcy5Sb3V0ZXIgPSBTYW1zb24uY3JlYXRlUm91dGVyKG9wdGlvbnMuUm91dGVyIHx8IG9wdGlvbnMucm91dGVyIHx8IHt9KTtcblxuICAgIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20vZXh0ZW5kIG9iamVjdFxuICAgIHZhciBjdXN0b20gPSBvcHRpb25zLmV4dGVuZCB8fCBvcHRpb25zLmN1c3RvbSB8fCB7fTtcbiAgICBVdGlscy5leHRlbmQodGhpcywgY3VzdG9tLCByZXNlcnZlZCk7XG5cbiAgICAvLyBMb2FkIGFueSBvdGhlciBjb21wb25lbnRzXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzZWxmLmNvbXBvbmVudHMpO1xuICAgIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgICBzZWxmW2tleV0gPSBTYW1zb24uY3JlYXRlQ29tcG9uZW50KHNlbGYuY29tcG9uZW50c1trZXldKTtcbiAgICAgIHNlbGZba2V5XS5wYXJlbnQgPSB7ZWxlbWVudDogU2Ftc29uLkRPTS5zYW1zb25fYXBwLCBkZWxlZ2F0ZTogJChTYW1zb24uRE9NLnNhbXNvbl9hcHApfTtcblxuICAgICAgc2VsZltrZXldLl9yZW5kZXIoZmFsc2UsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjYigpO1xuICAgICAgfSk7XG5cbiAgICB9LCBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gdGhlIFNhbXNvbiBBcHAgaXMgbm93IGNvbmZpZ3VyZWRcbiAgICAgIHNlbGYuX2lzQ29uZmlndXJlZCA9IHRydWU7XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcblxuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBTYW1zb24gQXBwIGhhcyBhbHJlYWR5IGJlZW4gY29uZmlndXJlZCFcIik7XG4gIH1cblxufTtcbiIsIi8qKlxuICogUXVvSlMgLSBNaWNybyAjSmF2YVNjcmlwdCBMaWJyYXJ5IGZvciBNb2JpbGUgRGV2aWNlcy5cbiAqIEB2ZXJzaW9uIHYzLjAuN1xuICogQGxpbmsgICAgaHR0cDovL3F1b2pzLnRhcHF1by5jb21cbiAqIEBhdXRob3IgIEphdmkgSmltZW5leiBWaWxsYXIgKEBzb3lqYXZpKSAoaHR0cHM6Ly90d2l0dGVyLmNvbS9zb3lqYXZpKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbihmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0LG49W10uaW5kZXhPZnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBuPTAsZT10aGlzLmxlbmd0aDtlPm47bisrKWlmKG4gaW4gdGhpcyYmdGhpc1tuXT09PXQpcmV0dXJuIG47cmV0dXJuLTF9O3Q9ZnVuY3Rpb24oKXt2YXIgdCxuLGUscixpLHUsbyxhLGMsbCxzLGYsaCxkLHAsdixnO3JldHVybiByPVtdLGE9T2JqZWN0LnByb3RvdHlwZSxvPS9eXFxzKjwoXFx3K3whKVtePl0qPi8sZT1bMSw5LDExXSxuPS9eXFwuKFtcXHctXSspJC8sdT0vXiNbXFx3XFxkLV0rJC8scz0vXltcXHctXSskLyxjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKSxsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKSxpPXt0cjpkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksdGJvZHk6Yyx0aGVhZDpjLHRmb290OmMsdGQ6bCx0aDpsLFwiKlwiOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIil9LHQ9ZnVuY3Rpb24obixlKXt2YXIgcjtyZXR1cm4gbj9cImZ1bmN0aW9uXCI9PT10LnRvVHlwZShuKT90KGRvY3VtZW50KS5yZWFkeShuKToocj1wKG4sZSksdihyLG4pKTp2KCl9LHQucXVlcnk9ZnVuY3Rpb24odCxlKXt2YXIgcjtyZXR1cm4gbi50ZXN0KGUpP3I9dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGUucmVwbGFjZShcIi5cIixcIlwiKSk6cy50ZXN0KGUpP3I9dC5nZXRFbGVtZW50c0J5VGFnTmFtZShlKTp1LnRlc3QoZSkmJnQ9PT1kb2N1bWVudD8ocj10LmdldEVsZW1lbnRCeUlkKGUucmVwbGFjZShcIiNcIixcIlwiKSkscnx8KHI9W10pKTpyPXQucXVlcnlTZWxlY3RvckFsbChlKSxyLm5vZGVUeXBlP1tyXTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyKX0sdC5leHRlbmQ9ZnVuY3Rpb24odCl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe3ZhciBlLHI7cj1bXTtmb3IoZSBpbiBuKXIucHVzaCh0W2VdPW5bZV0pO3JldHVybiByfSksdH0sdC50b1R5cGU9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49YS50b1N0cmluZy5jYWxsKHQpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKSxuLmxlbmd0aD4xP25bMV0udG9Mb3dlckNhc2UoKTpcIm9iamVjdFwifSx0LmVhY2g9ZnVuY3Rpb24obixlKXt2YXIgcixpLHUsbyxhO2lmKGk9dm9pZCAwLG89dm9pZCAwLFwiYXJyYXlcIj09PXQudG9UeXBlKG4pKWZvcihpPXU9MCxhPW4ubGVuZ3RoO2E+dTtpPSsrdSlyPW5baV0sZS5jYWxsKHIsaSxyKT09PSExO2Vsc2UgZm9yKG8gaW4gbillLmNhbGwobltvXSxvLG5bb10pPT09ITE7cmV0dXJuIG59LHQubWFwPWZ1bmN0aW9uKG4sZSl7dmFyIHIsaSx1LG87aWYobz1bXSxyPXZvaWQgMCxpPXZvaWQgMCxcImFycmF5XCI9PT10LnRvVHlwZShuKSlmb3Iocj0wO3I8bi5sZW5ndGg7KXU9ZShuW3JdLHIpLG51bGwhPXUmJm8ucHVzaCh1KSxyKys7ZWxzZSBmb3IoaSBpbiBuKXU9ZShuW2ldLGkpLG51bGwhPXUmJm8ucHVzaCh1KTtyZXR1cm4gaChvKX0sdC5taXg9ZnVuY3Rpb24oKXt2YXIgdCxuLGUscixpO2ZvcihlPXt9LHQ9MCxyPWFyZ3VtZW50cy5sZW5ndGg7cj50Oyl7bj1hcmd1bWVudHNbdF07Zm9yKGkgaW4gbilnKG4saSkmJnZvaWQgMCE9PW5baV0mJihlW2ldPW5baV0pO3QrK31yZXR1cm4gZX0sdj1mdW5jdGlvbih0LG4pe3JldHVybiBudWxsPT1uJiYobj1cIlwiKSx0PXR8fHIsdC5zZWxlY3Rvcj1uLHQuX19wcm90b19fPXYucHJvdG90eXBlLHR9LHA9ZnVuY3Rpb24obixyKXt2YXIgaSx1O3JldHVybiBpPW51bGwsdT10LnRvVHlwZShuKSxcImFycmF5XCI9PT11P2k9ZihuKTpcInN0cmluZ1wiPT09dSYmby50ZXN0KG4pPyhpPWQobi50cmltKCksUmVnRXhwLiQxKSxuPW51bGwpOlwic3RyaW5nXCI9PT11PyhpPXQucXVlcnkoZG9jdW1lbnQsbiksciYmKGk9MT09PWkubGVuZ3RoP3QucXVlcnkoaVswXSxyKTp0Lm1hcChmdW5jdGlvbigpe3JldHVybiB0LnF1ZXJ5KGkscil9KSkpOihlLmluZGV4T2Yobi5ub2RlVHlwZSk+PTB8fG49PT13aW5kb3cpJiYoaT1bbl0sbj1udWxsKSxpfSxkPWZ1bmN0aW9uKG4sZSl7dmFyIHI7cmV0dXJuIG51bGw9PWUmJihlPVwiKlwiKSxlIGluIGl8fChlPVwiKlwiKSxyPWlbZV0sci5pbm5lckhUTUw9XCJcIituLHQuZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyLmNoaWxkTm9kZXMpLGZ1bmN0aW9uKCl7cmV0dXJuIHIucmVtb3ZlQ2hpbGQodGhpcyl9KX0sZj1mdW5jdGlvbih0KXtyZXR1cm4gdC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXQ/dDp2b2lkIDB9KX0saD1mdW5jdGlvbih0KXtyZXR1cm4gdC5sZW5ndGg+MD9yLmNvbmNhdC5hcHBseShyLHQpOnR9LGc9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbil9LHYucHJvdG90eXBlPXQuZm49e30sdC5mbi5lYWNoPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24obixlKXtyZXR1cm4gdC5jYWxsKG4sZSxuKX0pLHRoaXN9LHQuZm4uZmlsdGVyPWZ1bmN0aW9uKG4pe3JldHVybiB0KHIuZmlsdGVyLmNhbGwodGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gZS5wYXJlbnROb2RlJiZ0LnF1ZXJ5KGUucGFyZW50Tm9kZSxuKS5pbmRleE9mKGUpPj0wfSkpfSx0LmZuLmZvckVhY2g9ci5mb3JFYWNoLHQuZm4uaW5kZXhPZj1yLmluZGV4T2YsdC52ZXJzaW9uPVwiMy4wLjdcIix0fSgpLHRoaXMuUXVvPXRoaXMuJCQ9dCxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9dCksZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoO3JldHVybiBuPXtUWVBFOlwiR0VUXCIsTUlNRTpcImpzb25cIn0scj17c2NyaXB0OlwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIsanNvbjpcImFwcGxpY2F0aW9uL2pzb25cIix4bWw6XCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsaHRtbDpcInRleHQvaHRtbFwiLHRleHQ6XCJ0ZXh0L3BsYWluXCJ9LGU9MCx0LmFqYXhTZXR0aW5ncz17dHlwZTpuLlRZUEUsYXN5bmM6ITAsc3VjY2Vzczp7fSxlcnJvcjp7fSxjb250ZXh0Om51bGwsZGF0YVR5cGU6bi5NSU1FLGhlYWRlcnM6e30seGhyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3R9LGNyb3NzRG9tYWluOiExLHRpbWVvdXQ6MH0sdC5hamF4PWZ1bmN0aW9uKGUpe3ZhciByLG8sYyxmO2lmKGM9dC5taXgodC5hamF4U2V0dGluZ3MsZSksYy50eXBlPT09bi5UWVBFP2MudXJsKz10LnNlcmlhbGl6ZShjLmRhdGEsXCI/XCIpOmMuZGF0YT10LnNlcmlhbGl6ZShjLmRhdGEpLGkoYy51cmwpKXJldHVybiB1KGMpO2Y9Yy54aHIoKSxmLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe3JldHVybiA0PT09Zi5yZWFkeVN0YXRlPyhjbGVhclRpbWVvdXQocikscyhmLGMpKTp2b2lkIDB9LGYub3BlbihjLnR5cGUsYy51cmwsYy5hc3luYyksbChmLGMpLGMudGltZW91dD4wJiYocj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIGgoZixjKX0sYy50aW1lb3V0KSk7dHJ5e2Yuc2VuZChjLmRhdGEpfWNhdGNoKGQpe289ZCxmPW8sYShcIlJlc291cmNlIG5vdCBmb3VuZFwiLGYsYyl9cmV0dXJuIGZ9LHQuZ2V0PWZ1bmN0aW9uKG4sZSxyLGkpe3JldHVybiB0LmFqYXgoe3VybDpuLGRhdGE6ZSxzdWNjZXNzOnIsZGF0YVR5cGU6aX0pfSx0LnBvc3Q9ZnVuY3Rpb24odCxuLGUscil7cmV0dXJuIGMoXCJQT1NUXCIsdCxuLGUscil9LHQucHV0PWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiUFVUXCIsdCxuLGUscil9LHRbXCJkZWxldGVcIl09ZnVuY3Rpb24odCxuLGUscil7cmV0dXJuIGMoXCJERUxFVEVcIix0LG4sZSxyKX0sdC5qc29uPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gdC5hamF4KHt1cmw6bixkYXRhOmUsc3VjY2VzczpyfSl9LHQuc2VyaWFsaXplPWZ1bmN0aW9uKHQsbil7dmFyIGUscjtudWxsPT1uJiYobj1cIlwiKSxyPW47Zm9yKGUgaW4gdCl0Lmhhc093blByb3BlcnR5KGUpJiYociE9PW4mJihyKz1cIiZcIikscis9ZW5jb2RlVVJJQ29tcG9uZW50KGUpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudCh0W2VdKSk7cmV0dXJuIHI9PT1uP1wiXCI6cn0sdT1mdW5jdGlvbihuKXt2YXIgcixpLHUsbztyZXR1cm4gbi5hc3luYz8oaT1cImpzb25wXCIrICsrZSx1PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksbz17YWJvcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdCh1KS5yZW1vdmUoKSxpIGluIHdpbmRvdz93aW5kb3dbaV09e306dm9pZCAwfX0scj12b2lkIDAsd2luZG93W2ldPWZ1bmN0aW9uKGUpe3JldHVybiBjbGVhclRpbWVvdXQociksdCh1KS5yZW1vdmUoKSxkZWxldGUgd2luZG93W2ldLGYoZSxvLG4pfSx1LnNyYz1uLnVybC5yZXBsYWNlKFJlZ0V4cChcIj1cXFxcP1wiKSxcIj1cIitpKSx0KFwiaGVhZFwiKS5hcHBlbmQodSksbi50aW1lb3V0PjAmJihyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gaChvLG4pfSxuLnRpbWVvdXQpKSxvKTpjb25zb2xlLmVycm9yKFwiUXVvSlMuYWpheDogVW5hYmxlIHRvIG1ha2UganNvbnAgc3luY2hyb25vdXMgY2FsbC5cIil9LHM9ZnVuY3Rpb24odCxuKXt0LnN0YXR1cz49MjAwJiZ0LnN0YXR1czwzMDB8fDA9PT10LnN0YXR1cz9uLmFzeW5jJiZmKG8odCxuKSx0LG4pOmEoXCJRdW9KUy5hamF4OiBVbnN1Y2Nlc2Z1bCByZXF1ZXN0XCIsdCxuKX0sZj1mdW5jdGlvbih0LG4sZSl7ZS5zdWNjZXNzLmNhbGwoZS5jb250ZXh0LHQsbil9LGE9ZnVuY3Rpb24odCxuLGUpe2UuZXJyb3IuY2FsbChlLmNvbnRleHQsdCxuLGUpfSxsPWZ1bmN0aW9uKHQsbil7dmFyIGU7bi5jb250ZW50VHlwZSYmKG4uaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXT1uLmNvbnRlbnRUeXBlKSxuLmRhdGFUeXBlJiYobi5oZWFkZXJzLkFjY2VwdD1yW24uZGF0YVR5cGVdKTtmb3IoZSBpbiBuLmhlYWRlcnMpdC5zZXRSZXF1ZXN0SGVhZGVyKGUsbi5oZWFkZXJzW2VdKX0saD1mdW5jdGlvbih0LG4pe3Qub25yZWFkeXN0YXRlY2hhbmdlPXt9LHQuYWJvcnQoKSxhKFwiUXVvSlMuYWpheDogVGltZW91dCBleGNlZWRlZFwiLHQsbil9LGM9ZnVuY3Rpb24obixlLHIsaSx1KXtyZXR1cm4gdC5hamF4KHt0eXBlOm4sdXJsOmUsZGF0YTpyLHN1Y2Nlc3M6aSxkYXRhVHlwZTp1LGNvbnRlbnRUeXBlOlwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJ9KX0saT1mdW5jdGlvbih0KXtyZXR1cm4gUmVnRXhwKFwiPVxcXFw/XCIpLnRlc3QodCl9LG89ZnVuY3Rpb24odCxlKXt2YXIgcixpO2lmKGk9dCx0LnJlc3BvbnNlVGV4dCl7aWYoZS5kYXRhVHlwZT09PW4uTUlNRSl0cnl7aT1KU09OLnBhcnNlKHQucmVzcG9uc2VUZXh0KX1jYXRjaCh1KXtyPXUsaT1yLGEoXCJRdW9KUy5hamF4OiBQYXJzZSBFcnJvclwiLHQsZSl9XCJ4bWxcIj09PWUuZGF0YVR5cGUmJihpPXQucmVzcG9uc2VYTUwpfXJldHVybiBpfX0odCksZnVuY3Rpb24odCl7dmFyIG4sZSxyO3JldHVybiBuPVtcIi13ZWJraXQtXCIsXCItbW96LVwiLFwiLW1zLVwiLFwiLW8tXCIsXCJcIl0sdC5mbi5hZGRDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIG4scixpLHUsbztmb3IoaT1lKHQpLHU9W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKylvPWlbbl0sdS5wdXNoKHRoaXMuY2xhc3NMaXN0LmFkZChvKSk7cmV0dXJuIHV9KX0sdC5mbi5yZW1vdmVDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIG4scixpLHUsbztmb3IoaT1lKHQpLHU9W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKylvPWlbbl0sdS5wdXNoKHRoaXMuY2xhc3NMaXN0LnJlbW92ZShvKSk7cmV0dXJuIHV9KX0sdC5mbi50b2dnbGVDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIG4scixpLHUsbztmb3IoaT1lKHQpLHU9W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKylvPWlbbl0sdS5wdXNoKHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShvKSk7cmV0dXJuIHV9KX0sdC5mbi5oYXNDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmdGhpc1swXS5jbGFzc0xpc3QuY29udGFpbnModCl9LHQuZm4ubGlzdENsYXNzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGVuZ3RoPjA/dGhpc1swXS5jbGFzc0xpc3Q6dm9pZCAwfSx0LmZuLnN0eWxlPXQuZm4uY3NzPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIG51bGwhPW4/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3R5bGVbdF09bn0pOihlPXRoaXNbMF0sZS5zdHlsZVt0XXx8cihlLHQpKX0sdC5mbi52ZW5kb3I9ZnVuY3Rpb24odCxlKXt2YXIgcixpLHUsbztmb3Iobz1bXSxyPTAsaT1uLmxlbmd0aDtpPnI7cisrKXU9bltyXSxvLnB1c2godGhpcy5zdHlsZShcIlwiK3UrdCxlKSk7cmV0dXJuIG99LHI9ZnVuY3Rpb24odCxuKXtyZXR1cm4gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0LFwiXCIpW25dfSxlPWZ1bmN0aW9uKHQpe3JldHVybiBBcnJheS5pc0FycmF5KHQpfHwodD1bdF0pLHR9fSh0KSxmdW5jdGlvbih0KXtyZXR1cm4gdC5mbi5hdHRyPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJlwic3RyaW5nXCI9PT10LnRvVHlwZShuKT9udWxsIT1lP3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnNldEF0dHJpYnV0ZShuLGUpfSk6dGhpc1swXS5nZXRBdHRyaWJ1dGUobik6dm9pZCAwfSx0LmZuLnJlbW92ZUF0dHI9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJlwic3RyaW5nXCI9PT10LnRvVHlwZShuKT90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZW1vdmVBdHRyaWJ1dGUobil9KTp2b2lkIDB9LHQuZm4uZGF0YT1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLmF0dHIoXCJkYXRhLVwiK3Qsbil9LHQuZm4ucmVtb3ZlRGF0YT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5yZW1vdmVBdHRyKFwiZGF0YS1cIit0KX0sdC5mbi52YWw9ZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXQ/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWU9dC50b1N0cmluZygpfSk6dGhpcy5sZW5ndGg+MD90aGlzWzBdLnZhbHVlOm51bGx9LHQuZm4uc2hvdz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIil9LHQuZm4uaGlkZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKX0sdC5mbi5mb2N1cz1mdW5jdGlvbigpe3JldHVybiB0aGlzWzBdLmZvY3VzKCl9LHQuZm4uYmx1cj1mdW5jdGlvbigpe3JldHVybiB0aGlzWzBdLmJsdXIoKX0sdC5mbi5vZmZzZXQ9ZnVuY3Rpb24oKXt2YXIgdCxuO3JldHVybiB0aGlzLmxlbmd0aD4wJiYodD10aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG49e2xlZnQ6dC5sZWZ0K3dpbmRvdy5wYWdlWE9mZnNldCx0b3A6dC50b3Ard2luZG93LnBhZ2VZT2Zmc2V0LHdpZHRoOnQud2lkdGgsaGVpZ2h0OnQuaGVpZ2h0fSksbn19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbztyZXR1cm4gcj1udWxsLG49L1dlYktpdFxcLyhbXFxkLl0rKS8sZT17QW5kcm9pZDovKEFuZHJvaWQpXFxzKyhbXFxkLl0rKS8saXBhZDovKGlQYWQpLipPU1xccyhbXFxkX10rKS8saXBob25lOi8oaVBob25lXFxzT1MpXFxzKFtcXGRfXSspLyxCbGFja2JlcnJ5Oi8oQmxhY2tCZXJyeXxCQjEwfFBsYXlib29rKS4qVmVyc2lvblxcLyhbXFxkLl0rKS8sRmlyZWZveE9TOi8oTW96aWxsYSkuKk1vYmlsZVteXFwvXSpcXC8oW1xcZFxcLl0qKS8sd2ViT1M6Lyh3ZWJPU3xocHdPUylbXFxzXFwvXShbXFxkLl0rKS99LHQuaXNNb2JpbGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbnZpcm9ubWVudCgpLHIuaXNNb2JpbGV9LHQuZW52aXJvbm1lbnQ9ZnVuY3Rpb24oKXt2YXIgdCxuO3JldHVybiByfHwobj1uYXZpZ2F0b3IudXNlckFnZW50LHQ9dShuKSxyPXticm93c2VyOmkobiksaXNNb2JpbGU6ISF0LHNjcmVlbjpvKCksb3M6dH0pLHJ9LGk9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIGU9dC5tYXRjaChuKSxlP2VbMF06dH0sdT1mdW5jdGlvbih0KXt2YXIgbixyLGk7Zm9yKHIgaW4gZSlpZihpPXQubWF0Y2goZVtyXSkpe249e25hbWU6XCJpcGhvbmVcIj09PXJ8fFwiaXBhZFwiPT09cnx8XCJpcG9kXCI9PT1yP1wiaW9zXCI6cix2ZXJzaW9uOmlbMl0ucmVwbGFjZShcIl9cIixcIi5cIil9O2JyZWFrfXJldHVybiBufSxvPWZ1bmN0aW9uKCl7cmV0dXJue3dpZHRoOndpbmRvdy5pbm5lcldpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9fX0odCksZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoLGQ7cmV0dXJuIG49MSxpPXt9LHI9e3ByZXZlbnREZWZhdWx0OlwiaXNEZWZhdWx0UHJldmVudGVkXCIsc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOlwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcIixzdG9wUHJvcGFnYXRpb246XCJpc1Byb3BhZ2F0aW9uU3RvcHBlZFwifSxlPXt0b3VjaHN0YXJ0OlwibW91c2Vkb3duXCIsdG91Y2htb3ZlOlwibW91c2Vtb3ZlXCIsdG91Y2hlbmQ6XCJtb3VzZXVwXCIsdG91Y2g6XCJjbGlja1wiLG9yaWVudGF0aW9uY2hhbmdlOlwicmVzaXplXCJ9LHU9L2NvbXBsZXRlfGxvYWRlZHxpbnRlcmFjdGl2ZS8sdC5mbi5vbj1mdW5jdGlvbihuLGUscil7cmV0dXJuIG51bGw9PWV8fFwiZnVuY3Rpb25cIj09PXQudG9UeXBlKGUpP3RoaXMuYmluZChuLGUpOnRoaXMuZGVsZWdhdGUoZSxuLHIpfSx0LmZuLm9mZj1mdW5jdGlvbihuLGUscil7cmV0dXJuIG51bGw9PWV8fFwiZnVuY3Rpb25cIj09PXQudG9UeXBlKGUpP3RoaXMudW5iaW5kKG4sZSk6dGhpcy51bmRlbGVnYXRlKGUsbixyKX0sdC5mbi5yZWFkeT1mdW5jdGlvbihuKXtyZXR1cm4gdS50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpP24uY2FsbCh0aGlzLHQpOnQuZm4uYWRkRXZlbnQoZG9jdW1lbnQsXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oKXtyZXR1cm4gbi5jYWxsKHRoaXMsdCl9KX0sdC5mbi5iaW5kPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gaChlLHQsbil9KX0sdC5mbi51bmJpbmQ9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIGQodGhpcyx0LG4pfSl9LHQuZm4uZGVsZWdhdGU9ZnVuY3Rpb24obixlLHIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSx1KXtyZXR1cm4gaCh1LGUscixuLGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihyKXt2YXIgaSxhO3JldHVybiBhPXQoci50YXJnZXQpLmNsb3Nlc3Qobix1KS5nZXQoMCksYT8oaT10LmV4dGVuZChvKHIpLHtjdXJyZW50VGFyZ2V0OmEsbGl2ZUZpcmVkOnV9KSxlLmFwcGx5KGEsW2ldLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSkpKTp2b2lkIDB9fSl9KX0sdC5mbi51bmRlbGVnYXRlPWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIGQodGhpcyxuLGUsdCl9KX0sdC5mbi50cmlnZ2VyPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm5cInN0cmluZ1wiPT09dC50b1R5cGUobikmJihuPWwobixlKSksbnVsbCE9ciYmKG4ub3JpZ2luYWxFdmVudD1yKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kaXNwYXRjaEV2ZW50KG4pfSl9LHQuZm4uYWRkRXZlbnQ9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXI/dC5hZGRFdmVudExpc3RlbmVyKG4sZSwhMSk6dC5hdHRhY2hFdmVudD90LmF0dGFjaEV2ZW50KFwib25cIituLGUpOnRbXCJvblwiK25dPWV9LHQuZm4ucmVtb3ZlRXZlbnQ9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0LnJlbW92ZUV2ZW50TGlzdGVuZXI/dC5yZW1vdmVFdmVudExpc3RlbmVyKG4sZSwhMSk6dC5kZXRhY2hFdmVudD90LmRldGFjaEV2ZW50KFwib25cIituLGUpOnRbXCJvblwiK25dPW51bGx9LGw9ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gZT1kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50c1wiKSxlLmluaXRFdmVudCh0LCEwLCEwLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsKSxuJiYoZS50b3VjaD1uKSxlfSxoPWZ1bmN0aW9uKG4sZSxyLHUsbyl7dmFyIGwscyxoLGQ7cmV0dXJuIGU9YyhlKSxoPWYobikscz1pW2hdfHwoaVtoXT1bXSksbD1vJiZvKHIsZSksZD17ZXZlbnQ6ZSxjYWxsYmFjazpyLHNlbGVjdG9yOnUscHJveHk6YShsLHIsbiksZGVsZWdhdGU6bCxpbmRleDpzLmxlbmd0aH0scy5wdXNoKGQpLHQuZm4uYWRkRXZlbnQobixkLmV2ZW50LGQucHJveHkpfSxkPWZ1bmN0aW9uKG4sZSxyLHUpe3ZhciBvO3JldHVybiBlPWMoZSksbz1mKG4pLHMobyxlLHIsdSkuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gZGVsZXRlIGlbb11bZS5pbmRleF0sdC5mbi5yZW1vdmVFdmVudChuLGUuZXZlbnQsZS5wcm94eSl9KX0sZj1mdW5jdGlvbih0KXtyZXR1cm4gdC5faWR8fCh0Ll9pZD1uKyspfSxjPWZ1bmN0aW9uKG4pe3ZhciByO3JldHVybiByPShcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmlzTW9iaWxlP3QuaXNNb2JpbGUoKTp2b2lkIDApP246ZVtuXSxyfHxufSxhPWZ1bmN0aW9uKHQsbixlKXt2YXIgcjtyZXR1cm4gbj10fHxuLHI9ZnVuY3Rpb24odCl7dmFyIHI7cmV0dXJuIHI9bi5hcHBseShlLFt0XS5jb25jYXQodC5kYXRhKSkscj09PSExJiZ0LnByZXZlbnREZWZhdWx0KCkscn19LHM9ZnVuY3Rpb24odCxuLGUscil7cmV0dXJuKGlbdF18fFtdKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuISghdHx8biYmdC5ldmVudCE9PW58fGUmJnQuY2FsbGJhY2shPT1lfHxyJiZ0LnNlbGVjdG9yIT09cil9KX0sbz1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LmV4dGVuZCh7b3JpZ2luYWxFdmVudDpufSxuKSx0LmVhY2gocixmdW5jdGlvbih0LHIpe3JldHVybiBlW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbcl09ZnVuY3Rpb24oKXtyZXR1cm4hMH0sblt0XS5hcHBseShuLGFyZ3VtZW50cyl9LGVbcl09ZnVuY3Rpb24oKXtyZXR1cm4hMX19KSxlfX0odCksZnVuY3Rpb24odCl7cmV0dXJuIHQuZm4udGV4dD1mdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dD90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50ZXh0Q29udGVudD10fSk6dGhpcy5sZW5ndGg+MD90aGlzWzBdLnRleHRDb250ZW50OlwiXCJ9LHQuZm4uaHRtbD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gbnVsbCE9bj8oZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm5cInN0cmluZ1wiPT09ZT90aGlzLmlubmVySFRNTD1uOlwiYXJyYXlcIj09PWU/bi5mb3JFYWNoKGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdChuKS5odG1sKGUpfX0odGhpcykpOnRoaXMuaW5uZXJIVE1MKz10KG4pLmh0bWwoKX0pKTp0aGlzLmxlbmd0aD4wP3RoaXNbMF0uaW5uZXJIVE1MOlwiXCJ9LHQuZm4ucmVtb3ZlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBudWxsIT10aGlzLnBhcmVudE5vZGU/dGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpOnZvaWQgMH0pfSx0LmZuLmVtcHR5PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLmlubmVySFRNTD1udWxsfSl9LHQuZm4uYXBwZW5kPWZ1bmN0aW9uKG4pe3ZhciBlO3JldHVybiBlPXQudG9UeXBlKG4pLHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVyblwic3RyaW5nXCI9PT1lP3RoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsbik6XCJhcnJheVwiPT09ZT9uLmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB0KG4pLmFwcGVuZChlKX19KHRoaXMpKTp0aGlzLmFwcGVuZENoaWxkKG4pfSl9LHQuZm4ucHJlcGVuZD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm5cInN0cmluZ1wiPT09ZT90aGlzLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIixuKTpcImFycmF5XCI9PT1lP24uZWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24obixlKXtyZXR1cm4gdC5pbnNlcnRCZWZvcmUoZSx0LmZpcnN0Q2hpbGQpfX0odGhpcykpOnRoaXMuaW5zZXJ0QmVmb3JlKG4sdGhpcy5maXJzdENoaWxkKX0pfSx0LmZuLnJlcGxhY2VXaXRoPWZ1bmN0aW9uKG4pe3ZhciBlO3JldHVybiBlPXQudG9UeXBlKG4pLHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudE5vZGU/XCJzdHJpbmdcIj09PWU/dGhpcy5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVCZWdpblwiLG4pOlwiYXJyYXlcIj09PWU/bi5lYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihuLGUpe3JldHVybiB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGUsdCl9fSh0aGlzKSk6dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuLHRoaXMpOnZvaWQgMH0pLHRoaXMucmVtb3ZlKCl9fSh0KSxmdW5jdGlvbihuKXt2YXIgZSxyLGksdTtyZXR1cm4gZT1cInBhcmVudE5vZGVcIixuLmZuLmZpbmQ9ZnVuY3Rpb24oZSl7dmFyIHI7cmV0dXJuIHI9MT09PXRoaXMubGVuZ3RoP3QucXVlcnkodGhpc1swXSxlKTp0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0LnF1ZXJ5KHRoaXMsZSl9KSxuKHIpfSxuLmZuLnBhcmVudD1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj10P2kodGhpcyk6dGhpcy5pbnN0YW5jZShlKSxyKG4sdCl9LG4uZm4uY2hpbGRyZW49ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49dGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5jaGlsZHJlbil9KSxyKG4sdCl9LG4uZm4uc2libGluZ3M9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49dGhpcy5tYXAoZnVuY3Rpb24odCxuKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobi5wYXJlbnROb2RlLmNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQhPT1ufSl9KSxyKG4sdCl9LG4uZm4uZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW3RdfHxudWxsfSxuLmZuLmZpcnN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4odGhpc1swXSl9LG4uZm4ubGFzdD1mdW5jdGlvbigpe3JldHVybiBuKHRoaXNbdGhpcy5sZW5ndGgtMV0pfSxuLmZuLmNsb3Nlc3Q9ZnVuY3Rpb24odCxlKXt2YXIgcixpO2ZvcihpPXRoaXNbMF0scj1uKHQpLHIubGVuZ3RofHwoaT1udWxsKTtpJiZyLmluZGV4T2YoaSk8MDspaT1pIT09ZSYmaSE9PWRvY3VtZW50JiZpLnBhcmVudE5vZGU7cmV0dXJuIG4oaSl9LG4uZm4ubmV4dD1mdW5jdGlvbigpe3JldHVybiB1LmNhbGwodGhpcyxcIm5leHRTaWJsaW5nXCIpfSxuLmZuLnByZXY9ZnVuY3Rpb24oKXtyZXR1cm4gdS5jYWxsKHRoaXMsXCJwcmV2aW91c1NpYmxpbmdcIil9LG4uZm4uaW5zdGFuY2U9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbdF19KX0sbi5mbi5tYXA9ZnVuY3Rpb24odCl7cmV0dXJuIG4ubWFwKHRoaXMsZnVuY3Rpb24obixlKXtyZXR1cm4gdC5jYWxsKG4sZSxuKX0pfSxpPWZ1bmN0aW9uKHQpe3ZhciBlO2ZvcihlPVtdO3QubGVuZ3RoPjA7KXQ9bi5tYXAodCxmdW5jdGlvbih0KXtyZXR1cm4gdD10LnBhcmVudE5vZGUsdCE9PWRvY3VtZW50JiZlLmluZGV4T2YodCk8MD8oZS5wdXNoKHQpLHQpOnZvaWQgMH0pO3JldHVybiBlfSxyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIG51bGwhPWU/bih0KS5maWx0ZXIoZSk6bih0KX0sdT1mdW5jdGlvbih0KXt2YXIgZTtmb3IoZT10aGlzWzBdW3RdO2UmJjEhPT1lLm5vZGVUeXBlOyllPWVbdF07cmV0dXJuIG4oZSl9fSh0KSx0Lkdlc3R1cmVzPWZ1bmN0aW9uKHQpe3ZhciBlLHIsaSx1LG8sYSxjLGwscyxmLGgsZCxwLHY7cmV0dXJuIGQ9ITEsbD17fSxvPW51bGwsZj1udWxsLGk9W1wiaW5wdXRcIixcInNlbGVjdFwiLFwidGV4dGFyZWFcIl0scD1mdW5jdGlvbih0KXtyZXR1cm4gbFt0Lm5hbWVdPXQuaGFuZGxlcixlKHQuZXZlbnRzKX0sdj1mdW5jdGlvbihuLGUscil7cmV0dXJuIHQobikudHJpZ2dlcihlLHIsZil9LGg9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIGU9KHQuc3JjRWxlbWVudHx8dC50YXJnZXQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSxuLmNhbGwoaSxlKT49MD90LnN0b3BQcm9wYWdhdGlvbigpOihkPSEwLGY9dHx8ZXZlbnQsbz1hKHQpLGMoXCJzdGFydFwiLHQudGFyZ2V0LG8pKX0scz1mdW5jdGlvbih0KXtyZXR1cm4gZD8oZj10fHxldmVudCxvPWEodCksby5sZW5ndGg+MSYmZi5wcmV2ZW50RGVmYXVsdCgpLGMoXCJtb3ZlXCIsdC50YXJnZXQsbykpOnZvaWQgMH0sdT1mdW5jdGlvbih0KXtyZXR1cm4gZD8oZj10fHxldmVudCxjKFwiZW5kXCIsdC50YXJnZXQsbyksZD0hMSk6dm9pZCAwfSxyPWZ1bmN0aW9uKHQpe3JldHVybiBkPSExLGMoXCJjYW5jZWxcIil9LGU9ZnVuY3Rpb24obil7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gdC5mbltuXT1mdW5jdGlvbihlKXtyZXR1cm4gdChkb2N1bWVudC5ib2R5KS5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLG4sZSl9fSksdGhpc30sYz1mdW5jdGlvbih0LG4sZSl7dmFyIHIsaSx1O3U9W107Zm9yKGkgaW4gbClyPWxbaV0sclt0XSYmdS5wdXNoKHJbdF0uY2FsbChyLG4sZSkpO3JldHVybiB1fSxhPWZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHU7Zm9yKHI9dC50b3VjaGVzfHxbdF0saT1bXSxuPTAsZT1yLmxlbmd0aDtlPm47bisrKXU9cltuXSxpLnB1c2goe3g6dS5wYWdlWCx5OnUucGFnZVl9KTtyZXR1cm4gaX0sdChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXt2YXIgbjtyZXR1cm4gbj10KGRvY3VtZW50LmJvZHkpLG4uYmluZChcInRvdWNoc3RhcnRcIixoKSxuLmJpbmQoXCJ0b3VjaG1vdmVcIixzKSxuLmJpbmQoXCJ0b3VjaGVuZFwiLHUpLG4uYmluZChcInRvdWNoY2FuY2VsXCIscil9KSx7YWRkOnAsdHJpZ2dlcjp2fX0odCksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJiYXNpY1wiLGV2ZW50czpbXCJ0b3VjaFwiLFwiaG9sZFwiLFwiZG91YmxlVGFwXCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoO3JldHVybiBlPTE1LG49e1RBUDoyMDAsRE9VQkxFX1RBUDo0MDAsSE9MRDo0MDB9LGk9bnVsbCxjPSEwLGE9bnVsbCxvPW51bGwsdT1udWxsLGg9ZnVuY3Rpb24oZSxyKXtyZXR1cm4gMT09PXIubGVuZ3RoPyhvPXt0aW1lOm5ldyBEYXRlLHg6clswXS54LHk6clswXS55fSxhPWUsaT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHQudHJpZ2dlcihlLFwiaG9sZFwiLHJbMF0pfSxuLkhPTEQpKTpsKCl9LGY9ZnVuY3Rpb24odCxuKXt2YXIgaTtyZXR1cm4gbnVsbCE9PW8mJihpPXIobyxuWzBdKSxpLng+ZXx8aS55PmV8fG4ubGVuZ3RoPjEpP2woKTp2b2lkIDB9LHM9ZnVuY3Rpb24oZSxhKXt2YXIgYyxzO2lmKG8pcmV0dXJuIGM9cihvLGFbMF0pLDAhPT1jLnh8fDAhPT1jLnk/bCgpOihjbGVhclRpbWVvdXQoaSkscz1uZXcgRGF0ZSxzLW8udGltZTxuLlRBUD9zLXU8bi5ET1VCTEVfVEFQPyh0LnRyaWdnZXIoZSxcImRvdWJsZVRhcFwiLGFbMF0pLHU9bnVsbCk6KHU9cyx0LnRyaWdnZXIoZSxcInRvdWNoXCIsYVswXSkpOnZvaWQgMCl9LGw9ZnVuY3Rpb24oKXtyZXR1cm4gbz1udWxsLGM9ITEsY2xlYXJUaW1lb3V0KGkpfSxyPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9e3g6bi54LXQueCx5Om4ueS10Lnl9fSx7c3RhcnQ6aCxtb3ZlOmYsZW5kOnMsY2FuY2VsOmx9fSh0Lkdlc3R1cmVzKX0pLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwiZHJhZ1wiLGV2ZW50czpbXCJkcmFnXCIsXCJkcmFnZ2luZ1wiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gbj13aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbz49Mj8xNToyMCxjPW51bGwsbz1udWxsLGE9bnVsbCx1PW51bGwsaD1mdW5jdGlvbih0LG4pe3JldHVybiBuLmxlbmd0aD49Mj8oYz10LG89bi5sZW5ndGgsYT1lKG4pKTp2b2lkIDB9LGY9ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gbi5sZW5ndGg9PT1vPyhlPXIobiksdT17dG91Y2hlczpuLGRlbHRhOmV9LGkoITApKTp2b2lkIDB9LGw9cz1mdW5jdGlvbih0LG4pe3JldHVybiBhJiZ1PyhpKCExKSxvPW51bGwsYT1udWxsLHU9bnVsbCk6dm9pZCAwfSxyPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPWUodCkse3g6bi54LWEueCx5Om4ueS1hLnl9fSxlPWZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHU7Zm9yKGk9MCx1PTAsbj0wLGU9dC5sZW5ndGg7ZT5uO24rKylyPXRbbl0saSs9cGFyc2VJbnQoci54KSx1Kz1wYXJzZUludChyLnkpO3JldHVybnt4OmkvdC5sZW5ndGgseTp1L3QubGVuZ3RofX0saT1mdW5jdGlvbihlKXtyZXR1cm4gZT90LnRyaWdnZXIoYyxcImRyYWdnaW5nXCIsdSk6TWF0aC5hYnModS5kZWx0YS54KT5ufHxNYXRoLmFicyh1LmRlbHRhLnkpPm4/dC50cmlnZ2VyKGMsXCJkcmFnXCIsdSk6dm9pZCAwfSx7c3RhcnQ6aCxtb3ZlOmYsZW5kOnN9fSh0Lkdlc3R1cmVzKX0pLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwicGluY2hcIixldmVudHM6W1wicGluY2hcIixcInBpbmNoaW5nXCIsXCJwaW5jaEluXCIsXCJwaW5jaE91dFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzO3JldHVybiBuPXdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvPj0yPzE1OjIwLG89bnVsbCx1PW51bGwsaT1udWxsLHM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gMj09PW4ubGVuZ3RoPyhvPXQsdT1yKG5bMF0sblsxXSkpOnZvaWQgMH0sbD1mdW5jdGlvbih0LG4pe3ZhciBvO3JldHVybiB1JiYyPT09bi5sZW5ndGg/KG89cihuWzBdLG5bMV0pLGk9e3RvdWNoZXM6bixkZWx0YTpvLXV9LGUoITApKTp2b2lkIDB9LGE9Yz1mdW5jdGlvbih0LG4pe3JldHVybiB1JiZpPyhlKCExKSx1PW51bGwsaT1udWxsKTp2b2lkIDB9LHI9ZnVuY3Rpb24odCxuKXtyZXR1cm4gTWF0aC5zcXJ0KChuLngtdC54KSoobi54LXQueCkrKG4ueS10LnkpKihuLnktdC55KSl9LGU9ZnVuY3Rpb24oZSl7dmFyIHI7cmV0dXJuIGU/dC50cmlnZ2VyKG8sXCJwaW5jaGluZ1wiLGkpOk1hdGguYWJzKGkuZGVsdGEpPm4/KHQudHJpZ2dlcihvLFwicGluY2hcIixpKSxyPWkuZGVsdGE+MD9cInBpbmNoT3V0XCI6XCJwaW5jaEluXCIsdC50cmlnZ2VyKG8scixpKSk6dm9pZCAwfSx7c3RhcnQ6cyxtb3ZlOmwsZW5kOmN9fSh0Lkdlc3R1cmVzKX0pLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwicm90YXRpb25cIixldmVudHM6W1wicm90YXRlXCIsXCJyb3RhdGluZ1wiLFwicm90YXRlTGVmdFwiLFwicm90YXRlUmlnaHRcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGgsZDtyZXR1cm4gbj01LGU9MjAsbD1udWxsLHU9MCxjPW51bGwsaT1udWxsLGQ9ZnVuY3Rpb24odCxuKXtyZXR1cm4gMj09PW4ubGVuZ3RoPyhsPXQsdT0wLGM9byhuWzBdLG5bMV0pKTp2b2lkIDB9LGg9ZnVuY3Rpb24odCxuKXt2YXIgbDtyZXR1cm4gYyYmMj09PW4ubGVuZ3RoPyhsPW8oblswXSxuWzFdKS1jLGkmJk1hdGguYWJzKGkuZGVsdGEtbCk+ZSYmKGwrPTM2MCphKGkuZGVsdGEpKSxNYXRoLmFicyhsKT4zNjAmJih1KyssbC09MzYwKmEoaS5kZWx0YSkpLGk9e3RvdWNoZXM6bixkZWx0YTpsLHJvdGF0aW9uc0NvdW50OnV9LHIoITApKTp2b2lkIDB9LHM9Zj1mdW5jdGlvbih0LG4pe3JldHVybiBjJiZpPyhyKCExKSxsPW51bGwsdT0wLGM9bnVsbCxpPW51bGwsYz1udWxsKTp2b2lkIDB9LGE9ZnVuY3Rpb24odCl7cmV0dXJuIDA+dD8tMToxfSxvPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9TWF0aC5hdGFuMih0Lnktbi55LHQueC1uLngpLDE4MCooMD5lP2UrMipNYXRoLlBJOmUpL01hdGguUEl9LHI9ZnVuY3Rpb24oZSl7dmFyIHI7cmV0dXJuIGU/dC50cmlnZ2VyKGwsXCJyb3RhdGluZ1wiLGkpOk1hdGguYWJzKGkuZGVsdGEpPm4/KHQudHJpZ2dlcihsLFwicm90YXRlXCIsaSkscj1pLmRlbHRhPjA/XCJyb3RhdGVSaWdodFwiOlwicm90YXRlTGVmdFwiLHQudHJpZ2dlcihsLHIsaSkpOnZvaWQgMH0se3N0YXJ0OmQsbW92ZTpoLGVuZDpmfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInN3aXBlXCIsZXZlbnRzOltcInN3aXBlXCIsXCJzd2lwZUxlZnRcIixcInN3aXBlUmlnaHRcIixcInN3aXBlVXBcIixcInN3aXBlRG93blwiLFwic3dpcGluZ1wiLFwic3dpcGluZ0hvcml6b250YWxcIixcInN3aXBpbmdWZXJ0aWNhbFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGY7cmV0dXJuIG49TWF0aC5yb3VuZCgyMC93aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyksYT1udWxsLHU9bnVsbCxvPW51bGwsaT1udWxsLGY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gMT09PW4ubGVuZ3RoPyhhPXQsdT1uWzBdLGk9bnVsbCk6dm9pZCAwfSxzPWZ1bmN0aW9uKHQsbil7dmFyIHIsbztyZXR1cm4gMT09PW4ubGVuZ3RoPyhyPXt4Om5bMF0ueC11LngseTpuWzBdLnktdS55fSxvPW51bGw9PT1pLGk9e3g6blswXS54LHk6blswXS55LGRlbHRhOnJ9LGUoITAsbykpOmk9bnVsbH0sYz1sPWZ1bmN0aW9uKHQsbil7dmFyIHI7cmV0dXJuIG51bGw9PWkmJm4ubGVuZ3RoPj0xJiYocj17eDpuWzBdLngtdS54LHk6blswXS55LXUueX0saT17eDpuWzBdLngseTpuWzBdLnksZGVsdGE6cn0pLGk/KGUoITEpLGk9bnVsbCk6dm9pZCAwfSxlPWZ1bmN0aW9uKGUsdSl7dmFyIGMsbCxzLGYsaDtpZihudWxsPT11JiYodT0hMSksZSlyZXR1cm4gdSYmKG89cihpLmRlbHRhLngsaS5kZWx0YS55KSksbnVsbCE9PW8mJnQudHJpZ2dlcihhLFwic3dpcGluZ1wiK28saSksdC50cmlnZ2VyKGEsXCJzd2lwaW5nXCIsaSk7aWYobD1bXSxNYXRoLmFicyhpLmRlbHRhLnkpPm4/bC5wdXNoKGkuZGVsdGEueTwwP1wiVXBcIjpcIkRvd25cIik6TWF0aC5hYnMoaS5kZWx0YS54KT5uJiZsLnB1c2goaS5kZWx0YS54PDA/XCJMZWZ0XCI6XCJSaWdodFwiKSxsLmxlbmd0aCl7Zm9yKHQudHJpZ2dlcihhLFwic3dpcGVcIixpKSxoPVtdLHM9MCxmPWwubGVuZ3RoO2Y+cztzKyspYz1sW3NdLGgucHVzaCh0LnRyaWdnZXIoYSxcInN3aXBlXCIrYyxpKSk7cmV0dXJuIGh9fSxyPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9bnVsbCxNYXRoLnJvdW5kKE1hdGguYWJzKHQvbikpPj0yP2U9XCJIb3Jpem9udGFsXCI6TWF0aC5yb3VuZChNYXRoLmFicyhuL3QpKT49MiYmKGU9XCJWZXJ0aWNhbFwiKSxlfSx7c3RhcnQ6Zixtb3ZlOnMsZW5kOmx9fSh0Lkdlc3R1cmVzKX0pfSkuY2FsbCh0aGlzKTtcbiIsIi8vIFNhbXNvbi5QYWdlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG4vLyBVc2VkIHRvIHNpbXBsaWZ5IHBhZ2UgcmVuZGVyaW5nIGFuZCB0cmFuc2l0aW9ucyBpbiBzaW5nbGUgcGFnZSBhcHBzXG5cbnZhciBTYW1zb24gPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgU2hhcmVkID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyogb3B0aW9ucyBjYW4gaW5jbHVkZTpcbi8vIHBhdGggLSB0aGUgcm91dGVyIHBhdGggb2YgdGhlIHBhZ2Vcbi8vIHN1YlBhZ2VPZiAtIGFuIG9wdGlvbmFsIHBhcmVudCBwYWdlIHRoYXQgaXMgdGhlIHN0YXJ0IG9mIGEgc3BlY2lmaWMgY2F0ZWdvcnkgLSBleDogVXNlciBCaW8gUGFnZSBpcyBzdWJQYWdlT2Ygb2YgUHJvZmlsZSBQYWdlXG4vLyBwcmV2aW91c1BhZ2UgLSBhbiBvcHRpb25hbCBwcmV2aW91cyBwYWdlIHRvIG1ha2UgZ29pbmcgYmFjayBlYXNpZXJcbi8vIGJhY2tTYWZlIC0gZmFsc2UgYnkgZGVmYXVsdC4gc2V0IHRvIHRydWUgaWYgaXQgaXMgc2FmZSB0byBnbyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIGFueSBvdGhlciBwYWdlIGluIHRoZSBhcHBcbi8vIHRlbXBsYXRlL3JlbmRlciAtIHRoZSBmdW5jdGlvbiB0aGF0IG91dHB1dHMgYW4gSFRNTCBzdHJpbmcgdGhhdCBnZXRzIGF0dGFjaGVkIHRvIHRoZSBET01cbi8vIGNvbXBvbmVudHMgLSBhbnkgb3RoZXIgY29tcG9uZW50cyB0aGF0IHNob3VsZCBiZSBsb2FkZWQvcmVmcmVzaGVkIHdpdGggdGhlIHBhZ2Vcbi8vIGV2ZW50cyAtIGFueSBldmVudHMgdG8gYXR0YWNoIHRvIHRoZSBwYWdlXG4vLyBiZWZvcmVSZW5kZXIgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyBiZWZvcmUgdGhlIHBhZ2UgaXMgcmVuZGVyZWQgKHVwZGF0ZSBtb2RlbHMsIHNvcnQgY29sbGVjdGlvbnMpXG4vLyBhZnRlclJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGFmdGVyIHRoZSBwYWdlIGlzIHJlbmRlcmVkIChzY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSwgbWFya2VkIGNoZWNrYm94ZXMgYXMgY2hlY2tlZClcbi8vIGJlZm9yZVJlbW92ZSAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgcGFnZSBpcyBmdWxseSBkZXN0cm95ZWQgKGNsZWFudXAgbW9kZWxzLCB1cGRhdGUgYWN0aXZpdHkgaGlzdG9yeSlcbi8vIGN1c3RvbS9leHRlbmQgLSBhbiBvYmplY3QgY29udGFpbmluZyBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgUGFnZSBpbnN0YW5jZSBpZiB0aGVyZSBhcmUgbm8gbmFtaW5nIGNvbmZsaWN0cyB3aXRoIHJlc2VydmVkIHByb3BlcnRpZXNcbiovXG5cbmZ1bmN0aW9uIFNhbXNvblBhZ2Uob3B0aW9ucykge1xuXG4gIC8vIHNldCB0aGUgcGF0aCBvZiB0aGUgcGFnZVxuICB0aGlzLnBhdGggPSBvcHRpb25zLnBhdGg7XG5cbiAgLy8gc3ViUGFnZU9mIGlzIGZhbHNlIGlmIGl0IGlzIGEgdG9wLWxldmVsIHBhZ2UsIG90aGVyd2lzZSBpdCBpcyB0aGUgbmFtZSBvZiB0aGUgdG9wLWxldmVsIHBhZ2UgaXQgaXMgbGlua2VkIHRvXG4gIHRoaXMuc3ViUGFnZU9mID0gb3B0aW9ucy5zdWJQYWdlT2YgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBwcmV2aW91c1BhZ2UgaWYgaXQgaXMgc3BlY2lmaWVkXG4gIHRoaXMucHJldmlvdXNQYWdlID0gb3B0aW9ucy5wcmV2aW91c1BhZ2UgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBiYWNrQW5pbWF0aW9uIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tBbmltYXRpb24gPSBvcHRpb25zLmJhY2tBbmltYXRpb24gfHwgZmFsc2U7XG5cbiAgLy8gc2V0IGJhY2tTYWZlIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tTYWZlID0gb3B0aW9ucy5iYWNrU2FmZSB8fCBmYWxzZTtcblxuICAvLyBzZXQgdGhlIHBhZ2UgZXZlbnRzIGlmIHRoZXkgYXJlIHNwZWNpZmllZFxuICB0aGlzLmRvbUV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzID8gb3B0aW9ucy5ldmVudHMgOiAob3B0aW9ucy5kb21FdmVudHMgfHwge30pO1xuICB0aGlzLmFwcEV2ZW50cyA9IG9wdGlvbnMuYXBwRXZlbnRzIHx8IHt9O1xuXG4gIC8vIHNldHVwIHRoZSBwYWdlJ3MgY29tcG9uZW50c1xuICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG4gIHRoaXMuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcblxuICAvLyBzZXRJbml0aWFsU3RhdGUgZnVuY3Rpb25cbiAgdGhpcy5zZXRJbml0aWFsU3RhdGUgPSBvcHRpb25zLnNldEluaXRpYWxTdGF0ZSB8fCBTaGFyZWQuanVzdFJldHVybk9iamVjdDtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xuICB0aGlzLl9pbml0aWFsU3RhdGVTZXQgPSBmYWxzZTtcbiAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gc2V0IHRoZSBwYWdlJ3MgcmVuZGVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvdXRwdXQgYW4gaHRtbCBzdHJpbmdcbiAgLy8gaWYgbm8gcmVuZGVyIGZ1bmN0aW9uIHdhcyBwYXNzZWQgaW4sIHdlIGNoZWNrIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uXG4gIHRoaXMuX3RlbXBsYXRlID0gb3B0aW9ucy5yZW5kZXIgfHwgb3B0aW9ucy50ZW1wbGF0ZTtcbiAgaWYgKCF0aGlzLl90ZW1wbGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwiWW91ciBwYWdlIFwiICsgdGhpcy5wYXRoICsgXCIgbXVzdCBoYXZlIGEgcmVuZGVyIG9yIHRlbXBsYXRlIGZ1bmN0aW9uIHRoYXQgb3V0cHV0cyBhbiBIVE1MIHN0cmluZ1wiKTtcblxuICAvLyBzZXQgdGhlIGJlZm9yZVJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmVmb3JlUmVuZGVyID0gb3B0aW9ucy5iZWZvcmVSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIGFmdGVyUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5hZnRlclJlbmRlciA9IG9wdGlvbnMuYWZ0ZXJSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIHJlbW92ZS9jbG9zZSBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkLCBvdGhlcndpc2UganVzdCBpbnZva2UgY2FsbGJhY2tcbiAgdGhpcy5iZWZvcmVSZW1vdmUgPSBvcHRpb25zLmJlZm9yZVJlbW92ZSB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIGFkZCBhbnkgcm91dGVyLXJlbGF0ZWQgdGFza3NcbiAgdGhpcy5fdXVpZCA9IHRoaXMucGF0aCArIFwiLVwiICsgRGF0ZS5ub3coKTsgLy8gdGhlIHV1aWQgYWxsb3dzIHVzIHRvIGVhc2lseSByZWZlcmVuY2UgdGhlIGFkZGVkIHJvdXRlciB0YXNrc1xuICB0aGlzLl9yb3V0ZXIgPSBvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fTtcbiAgU2hhcmVkLmFkZFJvdXRlclRhc2tzKHRoaXMpO1xuXG4gIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20gb3IgZXh0ZW5kIG9iamVjdFxuICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBjdXN0b20sIFNoYXJlZC5yZXNlcnZlZCk7XG5cbn1cblxuLy8gSGF2ZSB0aGUgU2Ftc29uUGFnZSBjbGFzcyBpbmhlcml0IGFueSBzaGFyZWQgbWV0aG9kc1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3R5cGUgPSBcIlBhZ2VcIjtcblNhbXNvblBhZ2UucHJvdG90eXBlLnNldFN0YXRlID0gU2hhcmVkLnNldFN0YXRlO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUucmVzZXRTdGF0ZSA9IFNoYXJlZC5yZXNldFN0YXRlO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2RvRmlyc3QgPSBTaGFyZWQuX2RvRmlyc3Q7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fbG9hZEV2ZW50cyA9IFNoYXJlZC5fbG9hZEV2ZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9kZXN0cm95RXZlbnRzID0gU2hhcmVkLl9kZXN0cm95RXZlbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2xvYWRDb21wb25lbnRzID0gU2hhcmVkLl9sb2FkQ29tcG9uZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9yZW5kZXJDb21wb25lbnRzID0gU2hhcmVkLl9yZW5kZXJDb21wb25lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2Rlc3Ryb3lDb21wb25lbnRzID0gU2hhcmVkLl9kZXN0cm95Q29tcG9uZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9maXhBdXRvRm9jdXNFbGVtZW50cyA9IFNoYXJlZC5fZml4QXV0b0ZvY3VzRWxlbWVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fcmVtb3ZlID0gU2hhcmVkLl9yZW1vdmU7XG5cbi8vIHJlbmRlciB0aGUgcGFnZSB0byB0aGUgRE9NXG5TYW1zb25QYWdlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBwYWdlX2NvbnRhaW5lciwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5fbG9hZENvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgIHNlbGYuX2RvRmlyc3QoXCJiZWZvcmVSZW5kZXJcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgaW5pdGlhbCBzdGF0ZSBvYmplY3Qgb2YgdGhlIHBhZ2UgdGhhdCBpcyBwYXNzZWQgaW50byB0aGUgcmVuZGVyIGNhbGxcbiAgICAgIGlmICghc2VsZi5faW5pdGlhbFN0YXRlU2V0KSB7XG4gICAgICAgIHNlbGYuc3RhdGUgPSBzZWxmLnNldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICBzZWxmLl9pbml0aWFsU3RhdGVTZXQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIHBhZ2UgZWxlbWVudFxuICAgICAgaWYgKCFzZWxmLmVsZW1lbnQpIHtcbiAgICAgICAgc2VsZi5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2VsZi5lbGVtZW50LmlkID0gc2VsZi5wYXRoICsgXCItcGFnZVwiO1xuICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICAgIHBhZ2VfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWxlbWVudCk7XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIHBhZ2UgYXMgYW4gZXZlbnQgZGVsZWdhdG9yIGZvciBhbGwgaXRzIHN1YmNvbXBvbmVudHNcbiAgICAgICAgc2VsZi5kZWxlZ2F0ZSA9IFNhbXNvbi4kKHNlbGYuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB3aGV0aGVyIG9yIG5vdCB3ZSB3aWxsIGZvcmNlIHN1YmNvbXBvbmVudHMgdG8gdXBkYXRlXG4gICAgICBpZiAoZm9yY2VfdXBkYXRlIHx8IHNlbGYuX3N0YXRlQ2hhbmdlZCkge1xuICAgICAgICBmb3JjZV91cGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2xvYWRFdmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2VsZi5fcmVuZGVyQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcmVzZXQgc3RhdGVDaGFuZ2VkXG4gICAgICAgICAgc2VsZi5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICBzZWxmLl9maXhBdXRvRm9jdXNFbGVtZW50cygpO1xuXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyUmVuZGVyXCIsIGZ1bmN0aW9uKCkgeyBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7IH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbXNvblBhZ2U7XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIFwidG9wXCIgOiB7IGN1cnJlbnQ6IFwibW92ZS10by1ib3R0b21cIiwgbmV4dDogXCJtb3ZlLWZyb20tdG9wXCIgfSxcbiAgXCJib3R0b21cIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXRvcFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1ib3R0b21cIiB9LFxuICBcImxlZnRcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXJpZ2h0XCIsIG5leHQ6IFwibW92ZS1mcm9tLWxlZnRcIiB9LFxuICBcInJpZ2h0XCIgOiB7IGN1cnJlbnQ6IFwibW92ZS10by1sZWZ0XCIsIG5leHQ6IFwibW92ZS1mcm9tLXJpZ2h0XCIgfSxcbiAgXCJzY2FsZVwiIDogeyBjdXJyZW50OiBcInNjYWxlLW91dFwiLCBuZXh0OiBcInNjYWxlLWluXCIgfSxcbiAgXCJmYWRlXCIgOiB7IGN1cnJlbnQ6IFwiZmFkZS1vdXRcIiwgbmV4dDogXCJmYWRlLWluXCIgfVxuXG59O1xuIiwiLy8gU2Ftc29uLlJvdXRlciBjb25zdHJ1Y3RvciBmdW5jdGlvblxuLy8gVXNlZCB0byBoYW5kbGUgcGFnZSBoaXN0b3J5IGFuZCB0cmFuc2l0aW9uc1xuXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi4vaW5kZXgnKTtcbnZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jLWxpdGUnKTtcbnZhciBVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbnZhciBiYXNlX3JvdXRlcl9hbmltYXRpb25zID0gcmVxdWlyZSgnLi9iYXNlX3JvdXRlcl9hbmltYXRpb25zJyk7XG5cbmZ1bmN0aW9uIFNhbXNvblJvdXRlcihvcHRpb25zKSB7XG5cbiAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQgPSBcInNhbXNvbl9wYWdlXzJcIjtcblxuICAvLyBvdXIgcGFnZSBjYWNoZSB3aWxsIHN0b3JlIHRoZSBpbml0aWFsaXplZCBwYWdlc1xuICB0aGlzLnBhZ2VDYWNoZSA9IHt9O1xuXG4gIC8vIGNyZWF0ZSB0aGUgYXBwIHJvdXRlciBoaXN0b3J5XG4gIHRoaXMuaGlzdG9yeSA9IFtdO1xuXG4gIC8vIGEgcXVldWUgb2YgYW55IHJvdXRlciBldmVudHMgdGhhdCBoYXZlbid0IGJlZW4gaGFuZGxlZCB5ZXRcbiAgdGhpcy5xdWV1ZSA9IFtdO1xuXG4gIC8vIHNldCB0aGUgYXBwJ3MgYW5pbWF0aW9uc1xuICB0aGlzLmFuaW1hdGlvbnMgPSBiYXNlX3JvdXRlcl9hbmltYXRpb25zO1xuXG4gIHZhciBjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMgPSBvcHRpb25zLmFuaW1hdGlvbnMgfHwge307XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9ucykge1xuICAgIHRoaXMuYW5pbWF0aW9uc1trZXldID0gY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zW2tleV07XG4gIH1cblxuICB0aGlzLmN1cnJlbnRQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwYWdlIHdlIGFyZSBjdXJyZW50bHkgb25cblxuICB0aGlzLnByZXZpb3VzUGFnZSA9IGZhbHNlOyAvLyB0aGUgbmFtZSBvZiB0aGUgcHJldmlvdXMgcGFnZSB3ZSB3ZXJlIG9uXG5cbiAgdGhpcy5uZXh0UGFnZSA9IGZhbHNlOyAvLyB0aGUgbmFtZSBvZiB0aGUgcGFnZSB3ZSBhcmUgdHJhbnNpdGlvbmluZyB0b1xuXG4gIHRoaXMuY3VycmVudEFuaW1hdGlvbiA9IGZhbHNlOyAvLyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IHJ1bm5pbmcgYW5pbWF0aW9uXG5cbiAgdGhpcy5pc0J1c3kgPSBmYWxzZTsgLy8gc2V0IHRvIHRydWUgd2hlbmV2ZXIgdGhlIHJvdXRlciBpcyBzdGlsbCBoYW5kbGluZyBhbiBldmVudFxuXG4gIHRoaXMucGFnZXNBbmltYXRpbmcgPSBmYWxzZTsgLy8gc2V0IHRvIHRydWUgaWYgYSBuZXcgcGFnZSBpcyBiZWluZyBsb2FkZWRcblxuICAvLyBzZXQgdGhlIGRlZmF1bHQgbmF2aWdhdGUgYW5pbWF0aW9uXG4gIHRoaXMubmF2aWdhdGVBbmltYXRpb24gPSBvcHRpb25zLmRlZmF1bHROYXZpZ2F0ZUFuaW1hdGlvbiB8fCBcInJpZ2h0XCI7XG5cbiAgLy9zZXQgdGhlIGRlZmF1bHQgYmFjayBhbmltYXRpb25cbiAgdGhpcy5iYWNrQW5pbWF0aW9uID0gb3B0aW9ucy5kZWZhdWx0QmFja0FuaW1hdGlvbiB8fCBcImxlZnRcIjtcblxuICB0aGlzLmJlZm9yZU5hdmlnYXRlID0ge307XG4gIHRoaXMuYWZ0ZXJOYXZpZ2F0ZSA9IHt9O1xuICB0aGlzLmJlZm9yZUFuaW1hdGUgPSB7fTtcbiAgdGhpcy5kdXJpbmdBbmltYXRlID0ge307XG4gIHRoaXMuYWZ0ZXJBbmltYXRlID0ge307XG4gIHRoaXMuYmVmb3JlQmFjayA9IHt9O1xuICB0aGlzLmFmdGVyQmFjayA9IHt9O1xuXG4gIGlmIChvcHRpb25zLmJlZm9yZU5hdmlnYXRlKSB7IHRoaXMuYmVmb3JlTmF2aWdhdGUucm91dGVyID0gb3B0aW9ucy5iZWZvcmVOYXZpZ2F0ZTsgfVxuICBpZiAob3B0aW9ucy5hZnRlck5hdmlnYXRlKSB7IHRoaXMuYWZ0ZXJOYXZpZ2F0ZS5yb3V0ZXIgPSBvcHRpb25zLmFmdGVyTmF2aWdhdGU7IH1cbiAgaWYgKG9wdGlvbnMuYmVmb3JlQW5pbWF0ZSkgeyB0aGlzLmJlZm9yZUFuaW1hdGUucm91dGVyID0gb3B0aW9ucy5iZWZvcmVBbmltYXRlOyB9XG4gIGlmIChvcHRpb25zLmR1cmluZ0FuaW1hdGUpIHsgdGhpcy5kdXJpbmdBbmltYXRlLnJvdXRlciA9IG9wdGlvbnMuZHVyaW5nQW5pbWF0ZTsgfVxuICBpZiAob3B0aW9ucy5hZnRlckFuaW1hdGUpIHsgdGhpcy5hZnRlckFuaW1hdGUucm91dGVyID0gb3B0aW9ucy5hZnRlckFuaW1hdGU7IH1cbiAgaWYgKG9wdGlvbnMuYmVmb3JlQmFjaykgeyB0aGlzLmJlZm9yZUJhY2sucm91dGVyID0gb3B0aW9ucy5iZWZvcmVCYWNrOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyQmFjaykgeyB0aGlzLmFmdGVyQmFjay5yb3V0ZXIgPSBvcHRpb25zLmFmdGVyQmFjazsgfVxuXG59O1xuXG4vLyBnZXQgdGhlIHJvdXRlcidzIGN1cnJlbnQgcGFnZSBkYXRhXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmdldFBhZ2VEYXRhID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgY3VycmVudFBhZ2UgOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgIHByZXZpb3VzUGFnZSA6IHRoaXMucHJldmlvdXNQYWdlLFxuICAgIG5leHRQYWdlIDogdGhpcy5uZXh0UGFnZSxcbiAgICBwYWdlc0FuaW1hdGluZyA6IHRoaXMucGFnZXNBbmltYXRpbmcsXG4gICAgYWN0aXZlUGFnZUVsZW1lbnQgOiB0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50LFxuICAgIGluYWN0aXZlUGFnZUVsZW1lbnQgOiB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQsXG4gICAgY3VycmVudEFuaW1hdGlvbiA6IHRoaXMuY3VycmVudEFuaW1hdGlvblxuICB9O1xufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5fZG9GaXJzdCA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHRhc2tzID0gT2JqZWN0LmtleXModGhpc1tuYW1lXSk7XG4gIGFzeW5jLmVhY2godGFza3MsIGZ1bmN0aW9uKHRhc2ssIGNiKSB7XG4gICAgc2VsZltuYW1lXVt0YXNrXShzZWxmLmdldFBhZ2VEYXRhKCksIGZ1bmN0aW9uKGVycikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY2FsbGJhY2soZXJyKTtcbiAgfSk7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLl9kdXJpbmdBbmltYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHRoaXMuZHVyaW5nQW5pbWF0ZSkge1xuICAgIHRoaXMuZHVyaW5nQW5pbWF0ZVtrZXldKHRoaXMuZ2V0UGFnZURhdGEoKSk7XG4gIH1cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUudXBkYXRlSGlzdG9yeSA9IGZ1bmN0aW9uKGtpbmQsIG1lc3NhZ2UpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGhpc3Rvcnlfb2JqZWN0ID0ge307XG4gIGhpc3Rvcnlfb2JqZWN0LmRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8vIGlmIHdlIGFyZSBuYXZpZ2F0aW5nIGZvcndhcmRcbiAgaWYgKGtpbmQgPT09IFwibmF2aWdhdGVcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMubmV4dFBhZ2U7XG4gICAgdGhpcy5oaXN0b3J5LnB1c2goaGlzdG9yeV9vYmplY3QpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGN1cnJlbnRQYWdlIGlzIHNhZmUgdG8gZ28gYmFjayB0byBmcm9tIGFueXdoZXJlXG4gICAgdmFyIGJhY2tfc2FmZSA9IHRoaXMuY3VycmVudFBhZ2UgPyBTYW1zb24uQXBwLlBhZ2VzW3RoaXMuY3VycmVudFBhZ2VdLmJhY2tTYWZlIDogZmFsc2U7XG5cbiAgICAvLyBpZiB0aGUgY3VycmVudFBhZ2UgaXMgYmFja1NhZmUsIHRoZW4gc2V0IGl0IGFzIHRoZSBwcmV2aW91c1BhZ2UsIG90aGVyd2lzZSBzZXQgdGhlIGNvbmZpZ3VyZWQgcHJldmlvdXNQYWdlXG4gICAgdGhpcy5wcmV2aW91c1BhZ2UgPSBiYWNrX3NhZmUgPyB0aGlzLmN1cnJlbnRQYWdlIDogU2Ftc29uLkFwcC5QYWdlc1t0aGlzLm5leHRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIHRoZSBwYWdlIHdlIGFyZSBnb2luZyB0b1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLm5leHRQYWdlO1xuXG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImJhY2tcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMucHJldmlvdXNQYWdlO1xuICAgIHRoaXMuaGlzdG9yeS5wdXNoKGhpc3Rvcnlfb2JqZWN0KTtcblxuICAgIC8vIHdlIGFyZSBnb2luZyBiYWNrLCBzbyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIG91ciBwcmV2aW91c1BhZ2VcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyB3ZSBhcmUgZ29pbmcgYmFjaywgc28gc2V0IHRoZSBwcmV2aW91c1BhZ2UgdG8gdGhlIGN1cnJlbnQgUGFnZSdzIHByZXZpb3VzUGFnZVxuICAgIHRoaXMucHJldmlvdXNQYWdlID0gU2Ftc29uLkFwcC5QYWdlc1t0aGlzLmN1cnJlbnRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImZhaWxlZFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJSb3V0ZXIgZXZlbnQgZmFpbGVkIGJlY2F1c2U6IFwiICsgbWVzc2FnZSk7XG4gIH1cblxuICAvLyBpZiBpdCB3YXNuJ3QganVzdCBhIHBhZ2UgdXBkYXRlLCB0aGVuIHN3aXRjaCB0aGUgYWN0aXZlUGFnZUVsZW1lbnQgYW5kIGluYWN0aXZlUGFnZUVsZW1lbnQgdmFsdWVzXG4gIGlmIChraW5kICE9PSBcInVwZGF0ZVwiICYmIGtpbmQgIT09IFwiZmFpbGVkXCIpIHtcbiAgICB2YXIgbmV3X2FjdGl2ZV9wYWdlID0gdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50O1xuICAgIHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudCA9IHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQ7XG4gICAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IG5ld19hY3RpdmVfcGFnZTtcbiAgfVxuXG4gIHRoaXMubmV4dFBhZ2UgPSBmYWxzZTtcblxuICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYW5vdGhlciByb3V0ZXIgZXZlbnQgaW4gdGhlIHF1ZXVlXG4gIHZhciBxdWV1ZV9ldmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgaWYgKHF1ZXVlX2V2ZW50KSB7XG5cbiAgICBpZiAocXVldWVfZXZlbnQua2luZCA9PT0gXCJuYXZpZ2F0ZVwiKSB7XG5cbiAgICAgIC8vIGFkZGVkIGEgMjBtcyBkZWxheSBkdWUgdG8gc29tZSB3ZWlyZCBiZWhhdmlvciB3aXRoIGNzcyBhbmltYXRpb25zIG5vdCB3b3JraW5nIHdpdGhvdXQgaXRcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgIHNlbGYubmF2aWdhdGUocXVldWVfZXZlbnQubmV4dF9wYWdlLCBxdWV1ZV9ldmVudC5hbmltYXRpb24sIHF1ZXVlX2V2ZW50LmNhbGxiYWNrKTtcbiAgICAgIH0sIDIwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2socXVldWVfZXZlbnQuY2FsbGJhY2spO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5nZXRBbmltYXRpb25EYXRhID0gZnVuY3Rpb24oYW5pbWF0aW9uKSB7XG4gIHZhciBkYXRhID0ge307XG4gIGRhdGEuY3VycmVudCA9IFwibm9uZVwiO1xuICBkYXRhLm5leHQgPSBcIm5vbmVcIjtcblxuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiB0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICBpZiAoYW5pbWF0aW9uID09PSBrZXkpIHtcbiAgICAgIGRhdGEuY3VycmVudCA9IHRoaXMuYW5pbWF0aW9uc1trZXldLmN1cnJlbnQ7XG4gICAgICBkYXRhLm5leHQgPSB0aGlzLmFuaW1hdGlvbnNba2V5XS5uZXh0O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmRvQW5pbWF0aW9uID0gZnVuY3Rpb24oYW5pbWF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgU2Ftc29uLkRPTVt0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5hZGQoYW5pbWF0ZS5uZXh0LCBcImFjdGl2ZVwiKTtcbiAgU2Ftc29uLkRPTVt0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QuYWRkKGFuaW1hdGUuY3VycmVudCk7XG4gIFNhbXNvbi5ET01bdGhpcy5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblxuICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyB3aGlsZSB0aGUgcGFnZXMgYXJlIGFuaW1hdGluZy4gRXg6IHVwZGF0ZSBoZWFkZXIgb3IgZm9vdGVyXG4gIHRoaXMuX2R1cmluZ0FuaW1hdGUoKTtcblxuICB2YXIgYW5pbWF0aW9uRXZlbnQgPSBVdGlscy53aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cbiAgVXRpbHMub25jZShTYW1zb24uRE9NW3RoaXMuaW5hY3RpdmVQYWdlRWxlbWVudF0sIGFuaW1hdGlvbkV2ZW50LCBhbmltYXRpb25FbmRlZCk7XG5cbiAgLy8gbGlzdGVuIGZvciB0aGUgZW5kIG9mIHRoZSBhbmltYXRpb25cbiAgZnVuY3Rpb24gYW5pbWF0aW9uRW5kZWQoKSB7XG5cbiAgICAvLyByZW1vdmUgdGhlIGFuaW1hdGlvbiBjbGFzcyBmcm9tIHRoZSBwYWdlIHdlIGp1c3QgbWFkZSBhY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuaW5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShhbmltYXRlLm5leHQpO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBhbmltYXRpb24gY2xhc3MgZnJvbSB0aGUgcGFnZSB3ZSBqdXN0IG1hZGUgaW5hY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5yZW1vdmUoYW5pbWF0ZS5jdXJyZW50KTtcblxuICAgIHNlbGYucGFnZXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICAgIC8vIHJlbW92ZSB0aGUgb2xkIHBhZ2UgaW5jbHVkaW5nIGFsbCBvZiBpdHMgdmlld3MgYW5kIGV2ZW50cyBmcm9tIHRoZSBET01cbiAgICAvLyBhbHNvIHJlbW92ZSB0aGUgZW50aXJlIHBhZ2UgaW5zdGFuY2UgZnJvbSB0aGUgcm91dGVyJ3MgcGFnZUNhY2hlXG4gICAgaWYgKHNlbGYuY3VycmVudFBhZ2UpIHtcbiAgICAgIHNlbGYucGFnZUNhY2hlW3NlbGYuY3VycmVudFBhZ2VdLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmLnBhZ2VDYWNoZVtzZWxmLmN1cnJlbnRQYWdlXTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24obmV4dF9wYWdlLCBhbmltYXRpb24sIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMucGFnZXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gIGlmIChhbmltYXRpb24gPT09IFwidXBkYXRlXCIpIHtcblxuICAgIHRoaXMucGFnZUNhY2hlW25leHRfcGFnZV0uX3JlbmRlcih0cnVlLCBudWxsLCBmdW5jdGlvbigpIHtcblxuICAgICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZUFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIC8vIGRldGVybWluZSB0aGUgdHlwZSBvZiBhbmltYXRpb24gdGhhdCB3aWxsIGJlIHVzZWRcbiAgICB2YXIgYW5pbWF0aW9uX2RhdGEgPSB0aGlzLmdldEFuaW1hdGlvbkRhdGEoYW5pbWF0aW9uKTtcblxuICAgIC8vIHJlbW92ZSB0aGUgZm9jdXMgZnJvbSB3aGF0ZXZlciBlbGVtZW50IGhhcyBpdCBzbyB0aGUgY3Vyc29yIGRvZXNuJ3QgbWFrZSB0aGUgcGFnZSB0cmFuc2l0aW9uIGxvb2sgc3Vja3lcbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcblxuICAgIC8vIHJlbmRlciB0aGUgbmV3IHBhZ2Ugb2ZmIHNjcmVlblxuICAgIHRoaXMucGFnZUNhY2hlW25leHRfcGFnZV0uX3JlbmRlcihmYWxzZSwgU2Ftc29uLkRPTVt0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnRdLCBmdW5jdGlvbigpIHtcblxuXG4gICAgICBzZWxmLl9kb0ZpcnN0KFwiYmVmb3JlQW5pbWF0ZVwiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAvLyBydW4gdGhlIGFuaW1hdGlvbiBub3cgdGhhdCB0aGUgbmV3IHBhZ2UgaXMgZnVsbHkgcmVuZGVyZWQgb2Zmc2NyZWVuXG4gICAgICAgIHNlbGYuZG9BbmltYXRpb24oYW5pbWF0aW9uX2RhdGEsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIC8vIHJlc3RvcmUgZm9jdXMgdG8gd2hhdGV2ZXIgZWxlbWVudCB3YXMgc2V0IHRvIGF1dG9mb2N1cyAobGlua2VkIHdpdGggX2ZpeEF1dG9Gb2N1c0VsZW1lbnRzIG1ldGhvZCBpbiBzaGFyZWQuanMpXG4gICAgICAgICAgdmFyIGZvY3VzRWxlbWVudCA9IFNhbXNvbi5ET01bc2VsZi5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5xdWVyeVNlbGVjdG9yKFwiLnNhbXNvbl9mb2N1c1wiKTtcbiAgICAgICAgICBpZiAoZm9jdXNFbGVtZW50KSB7XG5cbiAgICAgICAgICAgIC8vIHJlZm9jdXMgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGZvY3VzRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAvL2ZvY3VzRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgdGV4dGFyZWFcbiAgICAgICAgICAgIHZhciB2YWx1ZV9sZW5ndGggPSBmb2N1c0VsZW1lbnQudmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgZm9jdXNFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKHZhbHVlX2xlbmd0aCwgdmFsdWVfbGVuZ3RoKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBzYW1zb25fZm9jdXMgY2xhc3MgZnJvbSB0aGUgZWxlbWVudFxuICAgICAgICAgICAgZm9jdXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzYW1zb25fZm9jdXNcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5uYXZpZ2F0ZSA9IGZ1bmN0aW9uKG5leHRfcGFnZSwgYW5pbWF0aW9uLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBjaGVjayB0byBzZWUgaWYgYW5vdGhlciBSb3V0ZXIgZXZlbnQgaXMgYWxyZWFkeSBiZWluZyBoYW5kbGVkLCBpZiBvbmUgaXMgdGhlbiBhZGQgdGhpcyBldmVudCB0byBhIHF1ZXVlXG4gIGlmICh0aGlzLmlzQnVzeSkge1xuXG4gICAgdGhpcy5xdWV1ZS5wdXNoKHtcbiAgICAgIGtpbmQ6IFwibmF2aWdhdGVcIixcbiAgICAgIG5leHRfcGFnZTogbmV4dF9wYWdlLFxuICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIC8vY29uc29sZS5sb2coXCJSb3V0ZXIgaXMgYnVzeS4gVGhpcyBldmVudCBpcyAjXCIgKyBzZWxmLnF1ZXVlLmxlbmd0aCArIFwiIGluIGxpbmVcIik7XG5cbiAgfSBlbHNlIHtcblxuICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgIHZhciBjaG9zZW5fYW5pbWF0aW9uID0gYW5pbWF0aW9uIHx8IHRoaXMubmF2aWdhdGVBbmltYXRpb247XG5cbiAgICAvLyBpZiBhIHBhZ2UgdXBkYXRlIGlzIHJlcXVlc3RlZCBmb3IgYSBwYWdlIHdlIGFyZW4ndCBjdXJyZW50bHkgb24sIHRoZW4gd2Ugd2lsbCBzaW1wbHkgbmF2aWdhdGUgdG8gaXQgbGlrZSBub3JtYWxcbiAgICBpZiAoY2hvc2VuX2FuaW1hdGlvbiA9PT0gXCJ1cGRhdGVcIiAmJiBuZXh0X3BhZ2UgIT09IHRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNob3Nlbl9hbmltYXRpb24gPSB0aGlzLm5hdmlnYXRlQW5pbWF0aW9uO1xuICAgIH1cblxuICAgIHRoaXMubmV4dFBhZ2UgPSBuZXh0X3BhZ2U7XG5cbiAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBiZWZvcmUgd2Ugc3RhcnQgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVOYXZpZ2F0ZVwiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSBwYWdlIGV4aXN0cyBiZWZvcmUgdHJ5aW5nIHRvIG5hdmlnYXRlXG4gICAgICBpZiAoIVNhbXNvbi5BcHAuUGFnZXNbbmV4dF9wYWdlXSAmJiAhZXJyKSB7XG4gICAgICAgIGVyciA9IFwiVGhhdCBwYWdlIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlIGFyZSBzdGF5aW5nIG9uIHRoZSBzYW1lIHBhZ2UsIGlmIHdlIGFyZSB0aGVuIHNpbXBseSB1cGRhdGUgdGhlIHBhZ2VcbiAgICAgICAgaWYgKG5leHRfcGFnZSA9PT0gc2VsZi5jdXJyZW50UGFnZSkge1xuICAgICAgICAgIGNob3Nlbl9hbmltYXRpb24gPSBcInVwZGF0ZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYucGFnZUNhY2hlW25leHRfcGFnZV0gPSBTYW1zb24uY3JlYXRlUGFnZShTYW1zb24uQXBwLlBhZ2VzW25leHRfcGFnZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgY3VycmVudCBhbmltYXRpb24gYWNjZXNzaWJsZSBpbiBnZXRQYWdlRGF0YSgpXG4gICAgICAgIHNlbGYuY3VycmVudEFuaW1hdGlvbiA9IGNob3Nlbl9hbmltYXRpb247XG5cbiAgICAgICAgLy8gYW5pbWF0ZSB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgIHNlbGYuYW5pbWF0ZShuZXh0X3BhZ2UsIGNob3Nlbl9hbmltYXRpb24sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlckFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hhbmdlcyB0byB0aGUgcGFnZSBoaXN0b3J5XG4gICAgICAgICAgICBpZiAoY2hvc2VuX2FuaW1hdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJ1cGRhdGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJuYXZpZ2F0ZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgbmF2aWdhdGluZ1xuICAgICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyTmF2aWdhdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcImZhaWxlZFwiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmJhY2sgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICAgLy8gY2hlY2sgdG8gc2VlIGlmIGFub3RoZXIgUm91dGVyIGV2ZW50IGlzIGFscmVhZHkgYmVpbmcgaGFuZGxlZCwgaWYgb25lIGlzIHRoZW4gYWRkIHRoaXMgZXZlbnQgdG8gYSBxdWV1ZVxuICBpZiAodGhpcy5pc0J1c3kpIHtcblxuICAgIHRoaXMucXVldWUucHVzaCh7XG4gICAgICBraW5kOiBcImJhY2tcIixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIlJvdXRlciBpcyBidXN5LiBUaGlzIGV2ZW50IGlzICNcIiArIHNlbGYucXVldWUubGVuZ3RoICsgXCIgaW4gbGluZVwiKTtcblxuICB9IGVsc2Uge1xuXG4gICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYmVmb3JlIHdlIHN0YXJ0IHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICB0aGlzLl9kb0ZpcnN0KFwiYmVmb3JlQmFja1wiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGEgcGFnZSB0byBnbyBiYWNrIHRvXG4gICAgICBpZiAoIXNlbGYucHJldmlvdXNQYWdlICYmICFlcnIpIHtcbiAgICAgICAgZXJyID0gXCJObyBwYWdlIHRvIGdvIGJhY2sgdG9cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnIpIHtcblxuICAgICAgICAvLyBsb2FkIHRoZSBwcmV2aW91c1BhZ2UgaW50byB0aGUgcGFnZUNhY2hlXG4gICAgICAgIHNlbGYucGFnZUNhY2hlW3NlbGYucHJldmlvdXNQYWdlXSA9IFNhbXNvbi5jcmVhdGVQYWdlKFNhbXNvbi5BcHAuUGFnZXNbc2VsZi5wcmV2aW91c1BhZ2VdKTtcblxuICAgICAgICAvLyBpZiB0aGUgcGFnZSB3YW50cyBhIGN1c3RvbSBiYWNrIGFuaW1hdGlvbiB0aGVuIHVzZSBpdCwgb3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCBiYWNrIGFuaW1hdGlvblxuICAgICAgICB2YXIgYmFja19hbmltYXRpb24gPSBTYW1zb24uQXBwLlBhZ2VzW3NlbGYuY3VycmVudFBhZ2VdLmJhY2tBbmltYXRpb24gfHwgc2VsZi5iYWNrQW5pbWF0aW9uO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGFjY2Vzc2libGUgaW4gZ2V0UGFnZURhdGEoKVxuICAgICAgICBzZWxmLmN1cnJlbnRBbmltYXRpb24gPSBiYWNrX2FuaW1hdGlvbjtcblxuICAgICAgICAvLyBhbmltYXRlIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgc2VsZi5hbmltYXRlKHNlbGYucHJldmlvdXNQYWdlLCBiYWNrX2FuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyQW5pbWF0ZVwiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjaGFuZ2VzIHRvIHRoZSBwYWdlIGhpc3RvcnlcbiAgICAgICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcImJhY2tcIik7XG5cbiAgICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIGdvaW5nIGJhY2tcbiAgICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlckJhY2tcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcImZhaWxlZFwiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbXNvblJvdXRlcjtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jLWxpdGUnKTtcbnZhciBpc0VxdWFsID0gcmVxdWlyZSgnbG9kYXNoLmlzZXF1YWwnKTtcblxudmFyIHNoYXJlZCA9IHt9O1xuXG4vLyByZXNlcnZlZCBwcm9wZXJ0aWVzIGZvciBjb21wb25lbnRzIGFuZCBwYWdlc1xuc2hhcmVkLnJlc2VydmVkID0gW1wicGF0aFwiLCBcImVsXCIsIFwiZWxlbWVudFwiLCBcInRlbXBsYXRlXCIsIFwic3ViUGFnZU9mXCIsIFwicHJldmlvdXNQYWdlXCIsIFwiYmFja0FuaW1hdGlvblwiLCBcInN0eWxlXCIsIFwiY29tcG9uZW50c1wiLCBcImV2ZW50c1wiLCBcImRvbUV2ZW50c1wiLCBcImFwcEV2ZW50c1wiLCBcInN0YXRlXCIsIFwic2V0U3RhdGVcIiwgXCJyZXNldFN0YXRlXCIsIFwic2V0SW5pdGlhbFN0YXRlXCIsIFwiYmVmb3JlUmVuZGVyXCIsIFwiYWZ0ZXJSZW5kZXJcIiwgXCJiZWZvcmVSZW1vdmVcIiwgXCJyZW5kZXJcIiwgXCJwYXJlbnRcIiwgXCJvblwiLCBcImVtaXRcIiwgXCJvZmZcIl07XG5cbi8vIGNhY2hlZCBmb3IgcGVyZm9ybWFuY2VcbnNoYXJlZC5qdXN0Q2FsbGJhY2sgPSBmdW5jdGlvbihjYikgeyBjYigpOyB9O1xuc2hhcmVkLmp1c3RDYWxsYmFja1RydWUgPSBmdW5jdGlvbihjYikgeyBjYih0cnVlKTsgfTtcbnNoYXJlZC5qdXN0UmV0dXJuT2JqZWN0ID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTsgfTtcblxuLy8gcmVtb3ZlIHRoZSBhdXRvZm9jdXMgYXR0cmlidXRlIG9uIHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgaGFzIGl0IGFuZCB0byBpdCB0aGUgY2xhc3MgXCJzYW1zb25fZm9jdXNcIi4gcmVtb3ZlIHRoZSBhdXRvZm9jdXMgYXR0cmlidXRlIGVudGlyZWx5IG9uIGFueSBvdGhlciBlbGVtZW50cyB0aGF0IG1pZ2h0IGhhdmUgaXQgYnkgbWlzdGFrZS4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gaGF2ZSBzbW9vdGggcGFnZSB0cmFuc2l0aW9ucyBkdWUgdG8gYW4gYW5pbWF0aW9uIGJ1ZyBpbiBjaHJvbWUgY2F1c2VkIGJ5IGFuIGVsZW1lbnQgaGF2aW5nIHRoZSBhdXRvZm9jdXMgYXR0cmlidXRlLiBUaGUgU2Ftc29uIFJvdXRlciB3aWxsIGNhbGwgLmZvY3VzKCkgb24gd2hhdGV2ZXIgZWxlbWVudCBoYXMgdGhlIFwic2Ftc29uX2ZvY3VzXCIgY2xhc3MsIGFmdGVyIHRoZSBwYWdlIHRyYW5zaXRpb24gaXMgY29tcGxldGVcbnNoYXJlZC5fZml4QXV0b0ZvY3VzRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGk7IHZhciBmb2N1c0VsZW1lbnRzID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbYXV0b2ZvY3VzPSdhdXRvZm9jdXMnXVwiKTtcbiAgZm9yIChpPTA7IGk8Zm9jdXNFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBmb2N1c0VsZW1lbnQgPSBmb2N1c0VsZW1lbnRzW2ldO1xuICAgIGlmIChpID09IDApIHtcbiAgICAgIGZvY3VzRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Ftc29uX2ZvY3VzXCIpO1xuICAgIH1cbiAgICBmb2N1c0VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwiYXV0b2ZvY3VzXCIpO1xuICAgIGZvY3VzRWxlbWVudC5ibHVyKCk7XG4gIH1cbn07XG5cbi8vIGdldCB0aGUgdG9wbW9zdCBwYXJlbnQgcGFnZSBvciBjb21wb25lbnQgb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4vLyB1c2VkIGluIHRoZSBzZXRTdGF0ZSBtZXRob2Qgb24gY29tcG9uZW50cyBhbmQgcGFnZXNcbmZ1bmN0aW9uIGdldFRvcFBhcmVudChjb21wb25lbnQpIHtcbiAgaWYgKGNvbXBvbmVudC5wYXJlbnQpIHtcbiAgICByZXR1cm4gZ2V0VG9wUGFyZW50KGNvbXBvbmVudC5wYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cbn1cblxuLy8gdGhlIG1ldGhvZHMgdGhhdCBQYWdlcyBhbmQgQ29tcG9uZW50cyBzaGFyZVxuc2hhcmVkLnNldFN0YXRlID0gZnVuY3Rpb24obmV3X3N0YXRlKSB7IC8vIG5ld19zdGF0ZSBtdXN0IGJlIGFuIG9iamVjdFxuICBpZiAodHlwZW9mIG5ld19zdGF0ZSA9PT0gXCJvYmplY3RcIikge1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICB2YXIgcHJvcDtcbiAgICBmb3IgKHByb3AgaW4gbmV3X3N0YXRlKSB7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgaGFzIGNoYW5nZWRcbiAgICAgIGlmICh0aGlzLnN0YXRlW3Byb3BdID09PSB1bmRlZmluZWQpIHsgLy8gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHN0YXRlIG9iamVjdCB0aGVuIGl0IHdpbGwgdXBkYXRlZFxuICAgICAgICB0aGlzLnN0YXRlW3Byb3BdID0gbmV3X3N0YXRlW3Byb3BdO1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzRXF1YWwodGhpcy5zdGF0ZVtwcm9wXSwgbmV3X3N0YXRlW3Byb3BdKSkgeyAvLyBpZiB0aGUgZXhpc3RpbmcgcHJvcGVydHkgb24gdGhlIHN0YXRlIG9iamVjdCBpcyBub3QgZXF1YWwgdG8gdGhlIHZhbHVlIG9uIHRoZSBuZXdfc3RhdGUgb2JqZWN0IHRoZW4gaXQgd2lsbCBiZSB1cGRhdGVkXG4gICAgICAgIHRoaXMuc3RhdGVbcHJvcF0gPSBuZXdfc3RhdGVbcHJvcF07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZCA9IHRydWU7XG5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQgfHwgIXRoaXMucGFyZW50Ll90eXBlKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcihmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGFyZW50ID0gZ2V0VG9wUGFyZW50KHRoaXMpO1xuICAgICAgICBwYXJlbnQuX3JlbmRlcihmYWxzZSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYWtlIHN1cmUgdG8gcGFzcyBhbiBvYmplY3QgaW50byBzZXRTdGF0ZVwiKTtcbiAgfVxufTtcblxuc2hhcmVkLnJlc2V0U3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5ld19zdGF0ZSA9IHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIHRoaXMuc2V0U3RhdGUobmV3X3N0YXRlKTtcbn07XG5cbi8vIHJ1biB0aGUgbmFtZWQgZnVuY3Rpb24gYmVmb3JlIGNhbGxpbmcgYmFja1xuc2hhcmVkLl9kb0ZpcnN0ID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgdGhpc1tuYW1lXShmdW5jdGlvbigpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn07XG5cbi8vIGFkZCBhbnkgdGFza3MgdGhhdCB0aGlzIHBhZ2Ugb3IgY29tcG9uZW50IHdhbnRzIHJ1biBhdCBkaWZmZXJlbnQgZXZlbnRzIGR1cmluZyByb3V0ZXIgbmF2aWdhdGlvblxuc2hhcmVkLmFkZFJvdXRlclRhc2tzID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciB0YXNrO1xuICBmb3IgKHRhc2sgaW4gb2JqLl9yb3V0ZXIpIHtcbiAgICBTYW1zb24uQXBwLlJvdXRlclt0YXNrXVtvYmouX3V1aWRdID0gb2JqLl9yb3V0ZXJbdGFza10uYmluZChvYmopO1xuICB9XG59XG5cbnNoYXJlZC5fbG9hZEV2ZW50cyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5fbG9hZGVkRXZlbnRzLmxlbmd0aCkge1xuXG4gICAgdmFyIGRlbGVnYXRlID0gZ2V0VG9wUGFyZW50KHRoaXMpLmRlbGVnYXRlO1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmRvbUV2ZW50cyk7XG5cbiAgICB2YXIgc2VsZWN0b3JfZWxlbWVudCA9ICh0aGlzLl90eXBlID09PSBcIlBhZ2VcIikgPyBudWxsIDogXCIjXCIgKyAgdGhpcy5lbDtcblxuICAgIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgICB2YXIgZXZlbnQgPSB7fTtcbiAgICAgIHZhciBzcGxpdF9ldmVudCA9IGtleS5zcGxpdChcIiBcIik7IC8vIHNwbGl0IGJ5IGEgc2luZ2xlIHNwYWNlXG4gICAgICBldmVudC50eXBlID0gc3BsaXRfZXZlbnQuc2hpZnQoKTtcbiAgICAgIGV2ZW50LnNlbGVjdG9yID0gc3BsaXRfZXZlbnQubGVuZ3RoID4gMSA/IHNwbGl0X2V2ZW50LmpvaW4oXCIgXCIpIDogc3BsaXRfZXZlbnRbMF07XG4gICAgICBldmVudC5zZWxlY3RvciA9IGV2ZW50LnNlbGVjdG9yIHx8IHNlbGVjdG9yX2VsZW1lbnQ7XG5cbiAgICAgIGV2ZW50LmhhbmRsZXIgPSBmdW5jdGlvbiBmaXhlZEV2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIHNlbGYuZG9tRXZlbnRzW2tleV0uY2FsbChzZWxmLCBlLCBlLmN1cnJlbnRUYXJnZXQpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGV2ZW50LnNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlLm9uKGV2ZW50LnR5cGUsIGV2ZW50LnNlbGVjdG9yLCBldmVudC5oYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGVnYXRlLm9uKGV2ZW50LnR5cGUsIGV2ZW50LmhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9sb2FkZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgIGNiKCk7XG5cbiAgICB9LCBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gbG9hZCBhbnkgYXBwIGV2ZW50c1xuICAgICAgdmFyIGFwcEV2ZW50O1xuICAgICAgZm9yIChhcHBFdmVudCBpbiBzZWxmLmFwcEV2ZW50cykge1xuICAgICAgICBTYW1zb24uQXBwLm9uKGFwcEV2ZW50LCBzZWxmLmFwcEV2ZW50c1thcHBFdmVudF0sIHNlbGYpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gIH1cblxufTtcblxuc2hhcmVkLl9kZXN0cm95RXZlbnRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAvLyBkZXN0cm95IERPTSBldmVudCBsaXN0ZW5lcnNcbiAgdmFyIGRlbGVnYXRlID0gZ2V0VG9wUGFyZW50KHRoaXMpLmRlbGVnYXRlO1xuICB2YXIgaTsgdmFyIGRvbUV2ZW50O1xuICBmb3IgKGk9MDsgaTx0aGlzLl9sb2FkZWRFdmVudHMubGVuZ3RoO2krKykge1xuICAgIGRvbUV2ZW50ID0gdGhpcy5fbG9hZGVkRXZlbnRzW2ldO1xuICAgIGlmIChkb21FdmVudC5zZWxlY3Rvcikge1xuICAgICAgZGVsZWdhdGUub2ZmKGRvbUV2ZW50LnR5cGUsIGRvbUV2ZW50LnNlbGVjdG9yLCBkb21FdmVudC5oYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZWdhdGUub2ZmKGRvbUV2ZW50LnR5cGUsIGRvbUV2ZW50LmhhbmRsZXIpO1xuICAgIH1cbiAgfVxuICB0aGlzLl9sb2FkZWRFdmVudHMgPSBbXTtcblxuICAvLyBub3cgZGVzdHJveSBhcHAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciBhcHBFdmVudDtcbiAgZm9yIChhcHBFdmVudCBpbiB0aGlzLmFwcEV2ZW50cykge1xuICAgIFNhbXNvbi5BcHAub2ZmKGFwcEV2ZW50LCB0aGlzLmFwcEV2ZW50c1thcHBFdmVudF0pO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG59O1xuXG4vLyBhdHRhY2ggdGhlIGNvbXBvbmVudHMgcGFzc2VkIGJhY2sgZnJvbSB0aGUgc2V0Q29tcG9uZW50cyBmdW5jdGlvblxuc2hhcmVkLl9sb2FkQ29tcG9uZW50cyA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gSWYgdGhlIGNvbXBvbmVudHMgYXJlbid0IGxvYWRlZCwgb3IgZm9yY2VfdXBkYXRlIGlzIHRydWUsIHRoZW4gbG9hZCB0aGUgY29tcG9uZW50c1xuICBpZiAoIXRoaXMuX2NvbXBvbmVudHNMb2FkZWQgfHwgZm9yY2VfdXBkYXRlKSB7XG5cbiAgICB2YXIgbmV3X2NvbXBvbmVudHMgPSB0aGlzLnNldENvbXBvbmVudHMoKTtcblxuICAgIC8vIEZpcnN0IHdlIGdvIHRocm91Z2ggZWFjaCBjdXJyZW50bHkgYXR0YWNoZWQgY29tcG9uZW50LCBhbmQgY2hlY2sgdG8gc2VlIGlmIGl0IHNob3VsZCBzdGlsbCBleGlzdFxuICAgIHZhciBvbGRfY29tcG9uZW50cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cyk7XG4gICAgYXN5bmMuZWFjaChvbGRfY29tcG9uZW50cywgZnVuY3Rpb24ob2xkX2NvbXBvbmVudCwgY2IpIHtcblxuICAgICAgdmFyIHNob3VsZF9iZV9sb2FkZWQgPSBmYWxzZTtcbiAgICAgIHZhciBuZXdfY29tcG9uZW50O1xuICAgICAgZm9yIChuZXdfY29tcG9uZW50IGluIG5ld19jb21wb25lbnRzKSB7XG4gICAgICAgIGlmIChvbGRfY29tcG9uZW50ID09PSBuZXdfY29tcG9uZW50KSBzaG91bGRfYmVfbG9hZGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgbG9hZGVkIGJ1dCBpc24ndCwgdGhlbiB3ZSBsb2FkIGl0LiBPdGhlcndpc2Ugd2UganVzdCBza2lwIGl0XG4gICAgICBpZiAoc2hvdWxkX2JlX2xvYWRlZCkge1xuICAgICAgICAvLyBpZiB0aGUgY29tcG9uZW50IGhhc24ndCBiZWVuIGxvYWRlZCB5ZXQsIHRoZW4gbG9hZCBpdFxuICAgICAgICBpZiAoIXNlbGZbb2xkX2NvbXBvbmVudF0pIHtcbiAgICAgICAgICBzZWxmW29sZF9jb21wb25lbnRdID0gU2Ftc29uLmNyZWF0ZUNvbXBvbmVudChzZWxmLmNvbXBvbmVudHNbb2xkX2NvbXBvbmVudF0pO1xuICAgICAgICAgIHNlbGZbb2xkX2NvbXBvbmVudF0ucGFyZW50ID0gc2VsZjtcbiAgICAgICAgfVxuICAgICAgICBjYigpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZW1vdmUgdGhlIGNvbXBvbmVudCBzaW5jZSBpdCBzaG91bGRuJ3QgYmUgbG9hZGVkXG4gICAgICAgIGlmIChzZWxmW29sZF9jb21wb25lbnRdKSB7XG4gICAgICAgICAgc2VsZltvbGRfY29tcG9uZW50XS5fcmVtb3ZlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVsZXRlIHNlbGZbb2xkX2NvbXBvbmVudF07XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBOb3cgdGhhdCB3ZSBoYW5kbGVkIGFsbCBvZiB0aGUgZXhpc3RpbmcgY29tcG9uZW50cywgd2UgbG9hZCBhbnkgbmV3IGNvbXBvbmVudHMgdGhhdCBkb24ndCBleGlzdCB5ZXRcbiAgICAgIHNlbGYuY29tcG9uZW50cyA9IG5ld19jb21wb25lbnRzO1xuXG4gICAgICB2YXIgY29tcG9uZW50O1xuICAgICAgZm9yIChjb21wb25lbnQgaW4gc2VsZi5jb21wb25lbnRzKSB7XG4gICAgICAgIGlmICghc2VsZltjb21wb25lbnRdKSB7XG4gICAgICAgICAgc2VsZltjb21wb25lbnRdID0gU2Ftc29uLmNyZWF0ZUNvbXBvbmVudChzZWxmLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XG4gICAgICAgICAgc2VsZltjb21wb25lbnRdLnBhcmVudCA9IHNlbGY7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi5fY29tcG9uZW50c0xvYWRlZCA9IHRydWU7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gIH1cblxufTtcblxuLy8gcmVuZGVyIHRoZSBjb21wb25lbnRzIGF0dGFjaGVkIHRvIHRoZSBwYWdlXG5zaGFyZWQuX3JlbmRlckNvbXBvbmVudHMgPSBmdW5jdGlvbihmb3JjZV91cGRhdGUsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRzKTtcblxuICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgIHNlbGZba2V5XS5fcmVuZGVyKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gIH0sIGZ1bmN0aW9uKCl7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG5cbn07XG5cbnNoYXJlZC5fZGVzdHJveUNvbXBvbmVudHMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cyk7XG5cbiAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICBzZWxmW2tleV0uX3JlbW92ZShmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcblxufTtcblxuLy8gcmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzLCBET00gbm9kZXMsIGFuZCBjaGlsZCBjb21wb25lbnRzXG5zaGFyZWQuX3JlbW92ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVSZW1vdmVcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kZXN0cm95Q29tcG9uZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgc2VsZi5fZGVzdHJveUV2ZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgICAvLyBkZXN0cm95IHRoZSBET00gZWxlbWVudFxuICAgICAgICBpZiAoc2VsZi5lbGVtZW50ICYmIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgRE9NIG5vZGUgaXMgcmVtb3ZlZCBmcm9tIG1lbW9yeSBxdWlja2x5XG4gICAgICAgIGRlbGV0ZSBzZWxmLmVsZW1lbnQ7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFueSByb3V0ZXIgcmVsYXRlZCB0YXNrc1xuICAgICAgICB2YXIgdGFzaztcbiAgICAgICAgZm9yICh0YXNrIGluIHNlbGYuX3JvdXRlcikge1xuICAgICAgICAgIGRlbGV0ZSBTYW1zb24uQXBwLlJvdXRlclt0YXNrXVtzZWxmLl91dWlkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZXZlbnQgZGVsZWdhdG9yIGlmIGl0IGV4aXN0c1xuICAgICAgICBkZWxldGUgc2VsZi5kZWxlZ2F0ZTtcblxuICAgICAgICAvLyByZXNldCB0aGUgcGFnZSdzIHN0YXRlXG4gICAgICAgIHNlbGYuc3RhdGUgPSB7fTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZDtcbiIsIi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciB1dGlscyA9IHt9O1xuXG4vLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyB0byB0aGUgcGFzc2VkIGluIG9iamVjdFxuLy8gYW55IHByb3BlcnRpZXMgc3RhcnRpbmcgd2l0aCBfIGFyZSByZXNlcnZlZFxuZnVuY3Rpb24gc3RhcnRzV2l0aF8od29yZCkge1xuICByZXR1cm4gKHdvcmQuY2hhckF0KDApID09IFwiX1wiKSA/IHRydWUgOiBmYWxzZTtcbn1cblxudXRpbHMuZXh0ZW5kID0gZnVuY3Rpb24ob2JqLCBjdXN0b21fcHJvcHMsIHJlc2VydmVkKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIGN1c3RvbV9wcm9wcykge1xuICAgIGlmICghc3RhcnRzV2l0aF8oa2V5KSAmJiByZXNlcnZlZC5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICBvYmpba2V5XSA9IGN1c3RvbV9wcm9wc1trZXldO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gd2hpY2hFdmVudE5hbWUoZXZlbnRfdHlwZSkge1xuICB2YXIga2V5O1xuICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlJyk7XG5cbiAgdmFyIGV2ZW50X25hbWVzID0ge1xuICAgIHRyYW5zaXRpb25zIDoge1xuICAgICAgJ3RyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcbiAgICAgICdPVHJhbnNpdGlvbic6J29UcmFuc2l0aW9uRW5kJyxcbiAgICAgICdNb3pUcmFuc2l0aW9uJzondHJhbnNpdGlvbmVuZCcsXG4gICAgICAnV2Via2l0VHJhbnNpdGlvbic6J3dlYmtpdFRyYW5zaXRpb25FbmQnXG4gICAgfSxcbiAgICBhbmltYXRpb25zIDoge1xuICAgICAgJ2FuaW1hdGlvbic6J2FuaW1hdGlvbmVuZCcsXG4gICAgICAnT0FuaW1hdGlvbic6J29BbmltYXRpb25FbmQnLFxuICAgICAgJ01vekFuaW1hdGlvbic6J2FuaW1hdGlvbmVuZCcsXG4gICAgICAnV2Via2l0QW5pbWF0aW9uJzond2Via2l0QW5pbWF0aW9uRW5kJ1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGtleSBpbiBldmVudF9uYW1lc1tldmVudF90eXBlXSkge1xuICAgIGlmKGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gZXZlbnRfbmFtZXNbZXZlbnRfdHlwZV1ba2V5XTtcbiAgICB9XG4gIH1cbn1cblxudXRpbHMud2hpY2hUcmFuc2l0aW9uRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHdoaWNoRXZlbnROYW1lKFwidHJhbnNpdGlvbnNcIik7XG59O1xuXG51dGlscy53aGljaEFuaW1hdGlvbkV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aGljaEV2ZW50TmFtZShcImFuaW1hdGlvbnNcIik7XG59O1xuXG4vLyBsaXN0ZW4gdG8gYW4gZXZlbnQgb25jZSB3aXRob3V0IGpxdWVyeVxudXRpbHMub25jZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrKSB7XG5cbiAgLy8gY3JlYXRlIGV2ZW50XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jdGlvbihlKSB7XG4gICAgLy8gcmVtb3ZlIGV2ZW50XG4gICAgZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLnR5cGUsIGFyZ3VtZW50cy5jYWxsZWUpO1xuICAgIC8vIGNhbGwgaGFuZGxlclxuICAgIHJldHVybiBjYWxsYmFjayhlKTtcbiAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHM7XG4iLCIvLyBUaW55IEFzeW5jIGxpYnJhcnkgZm9yIHVzZSBpbiBtb2Rlcm4gZW52aXJvbm1lbnRzXG5cbihmdW5jdGlvbigpIHtcblxuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyByb290IGlzIGdsb2JhbCBvbiB0aGUgc2VydmVyLCBhbmQgd2luZG93IGluIHRoZSBicm93c2VyXG4gIHZhciByb290O1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB0aGlzID09PSB3aW5kb3cpIHtcbiAgICByb290ID0gd2luZG93O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gZ2xvYmFsKSB7XG4gICAgcm9vdCA9IGdsb2JhbDtcbiAgfSBlbHNlIHtcbiAgICByb290ID0gdGhpcztcbiAgfVxuXG4gIC8vIGNhY2hlZCBmb3IgcGVyZm9ybWFuY2VcbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gIHZhciBPYmplY3RLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgLy8gaXNBcnJheSBhbmQgaXNPYmplY3QgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KGFycikgJiYgYXJyLmxlbmd0aCA+IDApO1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3RLZXlzKG9iaikubGVuZ3RoID4gMCk7XG4gIH1cblxuICBmdW5jdGlvbiBkb0VhY2goYXJyLCBpdGVyYXRvcikge1xuICAgIHZhciBpO1xuICAgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpdGVyYXRvcihhcnJbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYW9sYW4vYXN5bmNcbiAgZnVuY3Rpb24gZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIGFscmVhZHkgY2FsbGVkLlwiKTtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseShyb290LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIF9kb09uY2UoZm4pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNhbGxlZCkgcmV0dXJuO1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBhc3luYyA9IHtcblxuICAgIC8vIHJ1bnMgdGhlIHRhc2sgb24gZXZlcnkgaXRlbSBpbiB0aGUgYXJyYXkgYXQgb25jZVxuICAgIGVhY2ggOiBmdW5jdGlvbihhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBfZG9PbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgdmFyIGFtb3VudCA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGlmICghaXNBcnJheShhcnIpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGNvbXBsZXRlZCA9IDA7XG4gICAgICBkb0VhY2goYXJyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGl0ZXJhdG9yKGl0ZW0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQrKztcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPj0gYW1vdW50KSBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBydW5zIHRocm91Z2ggdGhlIGFycmF5IG9uZSBpdGVtIGF0IGEgdGltZVxuICAgIGVhY2hTZXJpZXMgOiBmdW5jdGlvbihhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBfZG9PbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgdmFyIGFtb3VudCA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGlmICghaXNBcnJheShhcnIpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGNvbXBsZXRlZCA9IDA7XG4gICAgICB2YXIgaXRlcmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpdGVyYXRvcihhcnJbY29tcGxldGVkXSwgZG9PbmNlKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG5vb3A7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkIDwgYW1vdW50KSB7XG4gICAgICAgICAgICAgIGl0ZXJhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgICBpdGVyYXRlKCk7XG4gICAgfSxcblxuICAgIC8vIGNhbiBhY2NlcHQgYW4gb2JqZWN0IG9yIGFycmF5XG4gICAgLy8gd2lsbCByZXR1cm4gYW4gb2JqZWN0IG9yIGFycmF5IG9mIHJlc3VsdHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcbiAgICBwYXJhbGxlbCA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICB2YXIga2V5czsgdmFyIGxlbmd0aDsgdmFyIGk7IHZhciByZXN1bHRzOyB2YXIga2luZDtcbiAgICAgIHZhciB1cGRhdGVkX3Rhc2tzID0gW107XG4gICAgICB2YXIgaXNfb2JqZWN0O1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuXG4gICAgICBpZiAoaXNBcnJheSh0YXNrcykpIHtcblxuICAgICAgICBsZW5ndGggPSB0YXNrcy5sZW5ndGg7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcblxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh0YXNrcykpIHtcblxuICAgICAgICBpc19vYmplY3QgPSB0cnVlO1xuICAgICAgICBrZXlzID0gT2JqZWN0S2V5cyh0YXNrcyk7XG4gICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0ge307XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGk9MDsgaTxsZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGlmIChpc19vYmplY3QpIHtcbiAgICAgICAgICB1cGRhdGVkX3Rhc2tzLnB1c2goeyBrOiBrZXlzW2ldLCB0OiB0YXNrc1trZXlzW2ldXSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVkX3Rhc2tzLnB1c2goeyBrOiBpLCB0OiB0YXNrc1tpXSB9KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZWRfdGFza3MuZm9yRWFjaChmdW5jdGlvbih0YXNrX29iamVjdCkge1xuXG4gICAgICAgIHRhc2tfb2JqZWN0LnQoZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcblxuICAgICAgICAgIHJlc3VsdHNbdGFza19vYmplY3Qua10gPSByZXN1bHQ7XG5cbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgaWYgKGNvdW50ZXIgPT0gbGVuZ3RoKSBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIC8vIG9ubHkgYWNjZXB0cyBhbiBhcnJheSBzaW5jZSB0aGUgcHJlc2VydmF0aW9uIG9mIHRoZSBvcmRlciBvZiBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBjYW4ndCBiZSBndWFyYW50ZWVkXG4gICAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiByZXN1bHRzIGluIG9yZGVyXG4gICAgc2VyaWVzIDogZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YXNrcykpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgZnVuY3Rpb24gcnVuVGFzayhpbmRleCkge1xuICAgICAgICB0YXNrc1tpbmRleF0oZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHJlc3VsdDtcbiAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxKSByZXR1cm4gcnVuVGFzayhpbmRleCArIDEpO1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJ1blRhc2soMCk7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGFzeW5jO1xuICB9XG4gIC8vIEFNRCAvIFJlcXVpcmVKU1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXN5bmM7XG4gICAgfSk7XG4gIH1cbiAgLy8gaW5jbHVkZWQgZGlyZWN0bHkgdmlhIDxzY3JpcHQ+IHRhZ1xuICBlbHNlIHtcbiAgICByb290LmFzeW5jID0gYXN5bmM7XG4gIH1cblxufSgpKTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC40IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vpc2VxdWFsJyksXG4gICAgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iaW5kY2FsbGJhY2snKTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlXG4gKiBlcXVpdmFsZW50LiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBjb21wYXJlIHZhbHVlcy5cbiAqIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIGNvbXBhcmlzb25zIGFyZSBoYW5kbGVkIGJ5IHRoZSBtZXRob2RcbiAqIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWVcbiAqIGFyZ3VtZW50czogKHZhbHVlLCBvdGhlciBbLCBpbmRleHxrZXldKS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2Qgc3VwcG9ydHMgY29tcGFyaW5nIGFycmF5cywgYm9vbGVhbnMsIGBEYXRlYCBvYmplY3RzLFxuICogbnVtYmVycywgYE9iamVjdGAgb2JqZWN0cywgcmVnZXhlcywgYW5kIHN0cmluZ3MuIE9iamVjdHMgYXJlIGNvbXBhcmVkIGJ5XG4gKiB0aGVpciBvd24sIG5vdCBpbmhlcml0ZWQsIGVudW1lcmFibGUgcHJvcGVydGllcy4gRnVuY3Rpb25zIGFuZCBET00gbm9kZXNcbiAqIGFyZSAqKm5vdCoqIHN1cHBvcnRlZC4gUHJvdmlkZSBhIGN1c3RvbWl6ZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHN1cHBvcnRcbiAqIGZvciBjb21wYXJpbmcgb3RoZXIgdmFsdWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXFcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHZhbHVlIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgb3RoZXIgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogb2JqZWN0ID09IG90aGVyO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzRXF1YWwob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgYXJyYXkgPSBbJ2hlbGxvJywgJ2dvb2RieWUnXTtcbiAqIHZhciBvdGhlciA9IFsnaGknLCAnZ29vZGJ5ZSddO1xuICpcbiAqIF8uaXNFcXVhbChhcnJheSwgb3RoZXIsIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICBpZiAoXy5ldmVyeShbdmFsdWUsIG90aGVyXSwgUmVnRXhwLnByb3RvdHlwZS50ZXN0LCAvXmgoPzppfGVsbG8pJC8pKSB7XG4gKiAgICAgcmV0dXJuIHRydWU7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgdGhpc0FyZykge1xuICBjdXN0b21pemVyID0gdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJyA/IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCAzKSA6IHVuZGVmaW5lZDtcbiAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBvdGhlcikgOiB1bmRlZmluZWQ7XG4gIHJldHVybiAgcmVzdWx0ID09PSB1bmRlZmluZWQgPyBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIpIDogISFyZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC43IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzdHlwZWRhcnJheScpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aXRob3V0IHN1cHBvcnQgZm9yIGB0aGlzYCBiaW5kaW5nXG4gKiBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3QodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG9iamVjdCk7XG4gICAgaWYgKG9ialRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvYmpUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvYmpUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvYmpJc0FyciA9IGlzVHlwZWRBcnJheShvYmplY3QpO1xuICAgIH1cbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvdGhlcik7XG4gICAgaWYgKG90aFRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvdGhUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvdGhUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvdGhJc0FyciA9IGlzVHlwZWRBcnJheShvdGhlcik7XG4gICAgfVxuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIShvYmpJc0FyciB8fCBvYmpJc09iaikpIHtcbiAgICByZXR1cm4gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcpO1xuICB9XG4gIGlmICghaXNMb29zZSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsIG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlciwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNMb29zZSAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihpc0xvb3NlID8gb3RoVmFsdWUgOiBhcnJWYWx1ZSwgaXNMb29zZSA/IGFyclZhbHVlIDogb3RoVmFsdWUsIGluZGV4KSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoaXNMb29zZSkge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZCBib29sZWFuc1xuICAgICAgLy8gdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXMgbm90IGVxdWFsLlxuICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIFRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbC5cbiAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpXG4gICAgICAgID8gb3RoZXIgIT0gK290aGVyXG4gICAgICAgIDogb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncyBwcmltaXRpdmVzIGFuZCBzdHJpbmdcbiAgICAgIC8vIG9iamVjdHMgYXMgZXF1YWwuIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xMC42LjQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzTG9vc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNMb29zZSA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHZhciBza2lwQ3RvciA9IGlzTG9vc2U7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKGlzTG9vc2UgPyBvdGhWYWx1ZSA6IG9ialZhbHVlLCBpc0xvb3NlPyBvYmpWYWx1ZSA6IG90aFZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWQgPyBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikgOiByZXN1bHQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjMgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCdzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGdldE5hdGl2ZShBcnJheSwgJ2lzQXJyYXknKTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCIvXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIixcbiAqIFwiKlwiLCBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOlxcL1xcL2xvZGFzaFxcLmNvbVxcL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLl9nZXRuYXRpdmUnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXlxcZCskLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGdldE5hdGl2ZShPYmplY3QsICdrZXlzJyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyBudWxsIDogb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgICh0eXBlb2Ygb2JqZWN0ICE9ICdmdW5jdGlvbicgJiYgaXNBcnJheUxpa2Uob2JqZWN0KSkpIHtcbiAgICByZXR1cm4gc2hpbUtleXMob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/IG5hdGl2ZUtleXMob2JqZWN0KSA6IFtdO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgbGVuZ3RoID0gKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy45LjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgW3NwZWNpYWwgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpLlxuICogSW4gYWRkaXRpb24gdG8gc3BlY2lhbCBjaGFyYWN0ZXJzIHRoZSBmb3J3YXJkIHNsYXNoIGlzIGVzY2FwZWQgdG8gYWxsb3cgZm9yXG4gKiBlYXNpZXIgYGV2YWxgIHVzZSBhbmQgYEZ1bmN0aW9uYCBjb21waWxhdGlvbi5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0J3Mgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKGZuVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCIvXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIixcbiAqIFwiKlwiLCBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOlxcL1xcL2xvZGFzaFxcLmNvbVxcL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodGhpc0FyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iXX0=
