(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var Samson = require('./../../../lib');
var Log = require('./common/modules/log');
var Todos = require('./common/todosCollection');

// pass in the name of the app object if you want it added to the global scope
var App = Samson.createApp("App");

// add the app name to the global scope if name is passed in
global.App = App;
window.App = App;

global.Colors = require('./common/colors');

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

},{"./../../../lib":30,"./common/colors":2,"./common/modules/log":4,"./common/router_animations":5,"./common/startApp":7,"./common/todosCollection":8,"./components":13,"./pages":21}],2:[function(require,module,exports){

module.exports = {

  turquoise: "#1abc9c",

  blue: "#3498db",

  purple: "#9b59b6",

  navy: "#34495e",

  yellow: "#f1c40f",

  orange: "#e67e22",

  red: "#c0392b",

  lightGray: "#bdc3c7",

  gray: "#7f8c8d",

  darkGray: "#444444",

  black: "#111111",

  white: "#ffffff"

};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./../settings":6}],5:[function(require,module,exports){

module.exports = {

  "right-fast" : { current: "move-to-left-fast", next: "move-from-right-fast" },
  "left-fast" : { current: "move-to-right-fast", next: "move-from-left-fast" }

};

},{}],6:[function(require,module,exports){

module.exports = {

  production: false

};

},{}],7:[function(require,module,exports){
var async = require('async-lite');
var Log = require('./modules/log');

module.exports = function() {

  async.parallel({

    loadDeviceEvents: function(callback) {
      callback(null);
    },

  }, function(err) {

    if (err) {
      Log("Error loading the app");
    } else {

      Log("App is done loading");

      App.emit("app:initialized");

      App.Router.navigate("home", "fade");

    }

  });

};

},{"./modules/log":4,"async-lite":24}],8:[function(require,module,exports){

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

},{"./modules/db":3}],9:[function(require,module,exports){

var Samson = require('./../../../../../lib');

var success_color = "green";
var error_color = "red";
var info_color = "blue";

module.exports = {

  el: 'samson_alerts_container',

  domEvents: {


  },

  appEvents: {},

  extend: {

    createAlert: function(message, color) {

      if (typeof message === 'number') {
        message = message + "";
      } else if (typeof message !== 'string') {
        throw new Error("Alert messages must be a string or number");
      }

      var alert = document.createElement("div")
      alert.id = "alert-" + Date.now();
      alert.classList.add("samson_alert");
      alert.style.backgroundColor = color;
      alert.textContent = message;

      // append the alert to the samson_alerts_container
      var firstChild = Samson.App.DOM.samson_alerts.firstChild;
      if (firstChild) {
        Samson.App.DOM.samson_alerts.insertBefore(alert, firstChild);
      } else {
        Samson.App.DOM.samson_alerts.appendChild(alert);
      }

      // initiate the alert fade in
      window.getComputedStyle(alert).cssText; // we use getComputedStyle to make sure the element is already added to the DOM before applying the transition
      alert.classList.add("show");

      // show the notification for 3 seconds before removing
      setTimeout(function() {

        //alert.classList.remove("show");
        alert.style.opacity = 0;

        setTimeout(function() {
          alert.parentNode.removeChild(alert);
        }, 800);

      }, 3000);

    },

    success: function(options) {
      this.createAlert(options, success_color);
    },

    error: function(options) {
      this.createAlert(options, error_color);
    },

    info: function(options) {
      this.createAlert(options, info_color);
    },

    custom: function(options, color) {
      this.createAlert(options, color);
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

},{"./../../common/modules/db":3,"./template.jade":18,"autosize":25}],18:[function(require,module,exports){
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

    },

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

},{"./template.jade":23,"autosize":25}],23:[function(require,module,exports){
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

Samson.VERSION = '0.1.6'; // keep in sync with package.json

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbW1vbi9jb2xvcnMuanMiLCJhcHAvY29tbW9uL21vZHVsZXMvZGIuanMiLCJhcHAvY29tbW9uL21vZHVsZXMvbG9nLmpzIiwiYXBwL2NvbW1vbi9yb3V0ZXJfYW5pbWF0aW9ucy5qcyIsImFwcC9jb21tb24vc2V0dGluZ3MuanMiLCJhcHAvY29tbW9uL3N0YXJ0QXBwLmpzIiwiYXBwL2NvbW1vbi90b2Rvc0NvbGxlY3Rpb24uanMiLCJhcHAvY29tcG9uZW50cy9hbGVydHMvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9mYWRlZE92ZXJsYXkvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvdGVtcGxhdGUuamFkZSIsImFwcC9jb21wb25lbnRzL2luZGV4LmpzIiwiYXBwL2NvbXBvbmVudHMvc2lkZU1lbnUvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9zaWRlTWVudS90ZW1wbGF0ZS5qYWRlIiwiYXBwL2NvbXBvbmVudHMvdHJhbnNwYXJlbnRPdmVybGF5L2luZGV4LmpzIiwiYXBwL3BhZ2VzL2FkZFRvZG9zL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2FkZFRvZG9zL3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaG9tZS9pbmRleC5qcyIsImFwcC9wYWdlcy9ob21lL3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaW5kZXguanMiLCJhcHAvcGFnZXMvdmlld1RvZG9zL2luZGV4LmpzIiwiYXBwL3BhZ2VzL3ZpZXdUb2Rvcy90ZW1wbGF0ZS5qYWRlIiwibm9kZV9tb2R1bGVzL2FzeW5jLWxpdGUvYXN5bmMtbGl0ZS5qcyIsIm5vZGVfbW9kdWxlcy9hdXRvc2l6ZS9kaXN0L2F1dG9zaXplLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCIuLi8uLi9saWIvY29tcG9uZW50LmpzIiwiLi4vLi4vbGliL2V2ZW50cy5qcyIsIi4uLy4uL2xpYi9pbmRleC5qcyIsIi4uLy4uL2xpYi9tb2R1bGVzL3F1by5qcyIsIi4uLy4uL2xpYi9wYWdlLmpzIiwiLi4vLi4vbGliL3JvdXRlci9iYXNlX3JvdXRlcl9hbmltYXRpb25zLmpzIiwiLi4vLi4vbGliL3JvdXRlci9pbmRleC5qcyIsIi4uLy4uL2xpYi9zaGFyZWQuanMiLCIuLi8uLi9saWIvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXN5bmMtbGl0ZS9hc3luYy1saXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcnJheS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmlzdHlwZWRhcnJheS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guX2dldG5hdGl2ZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FyZ3VtZW50cy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iaW5kY2FsbGJhY2svaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vbGliJyk7XG52YXIgTG9nID0gcmVxdWlyZSgnLi9jb21tb24vbW9kdWxlcy9sb2cnKTtcbnZhciBUb2RvcyA9IHJlcXVpcmUoJy4vY29tbW9uL3RvZG9zQ29sbGVjdGlvbicpO1xuXG4vLyBwYXNzIGluIHRoZSBuYW1lIG9mIHRoZSBhcHAgb2JqZWN0IGlmIHlvdSB3YW50IGl0IGFkZGVkIHRvIHRoZSBnbG9iYWwgc2NvcGVcbnZhciBBcHAgPSBTYW1zb24uY3JlYXRlQXBwKFwiQXBwXCIpO1xuXG4vLyBhZGQgdGhlIGFwcCBuYW1lIHRvIHRoZSBnbG9iYWwgc2NvcGUgaWYgbmFtZSBpcyBwYXNzZWQgaW5cbmdsb2JhbC5BcHAgPSBBcHA7XG53aW5kb3cuQXBwID0gQXBwO1xuXG5nbG9iYWwuQ29sb3JzID0gcmVxdWlyZSgnLi9jb21tb24vY29sb3JzJyk7XG5cbi8vIFNhbXNvbiBBcHAgb3B0aW9uc1xudmFyIG9wdGlvbnMgPSB7XG5cbiAgLy9zZXRDb21wb25lbnRzIDogcmVxdWlyZSgnY29tbW9uL3NldENvbXBvbmVudHMnKSwgLy8gb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgY29tcG9uZW50IG9iamVjdCAtIHVzZSBpZiB0aGUgYXBwIGNvbXBvbmVudHMgYXJlIGR5bmFtaWMgYmFzZWQgb24gc2NyZWVuc2l6ZSwgZGV2aWNlIE9TLCBldGNcblxuICBjb21wb25lbnRzIDogcmVxdWlyZSgnLi9jb21wb25lbnRzJyksXG5cbiAgcGFnZXM6IHJlcXVpcmUoJy4vcGFnZXMnKSxcblxuICBkYXRhOiB7XG4gICAgc2lkZU1lbnUgOiB7XG4gICAgICBzZWxlY3RlZDogXCJob21lXCIsXG4gICAgICBwYWdlczogW1xuICAgICAgICB7cGF0aDpcImhvbWVcIiwgbmFtZTpcIkhvbWVcIiwgaWNvbjogXCJmYS1ob21lXCJ9LFxuICAgICAgICB7cGF0aDpcImFkZFRvZG9zXCIsIG5hbWU6XCJBZGQgVG9kb3NcIiwgaWNvbjogXCJmYS1wbHVzXCJ9LFxuICAgICAgICB7cGF0aDpcInZpZXdUb2Rvc1wiLCBuYW1lOlwiVmlldyBUb2Rvc1wiLCBpY29uOiBcImZhLXRhc2tzXCJ9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIC8vIGFueSBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHlvdSB3YW50IGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBhcHAgb2JqZWN0LiB0aGUgY29udGV4dCB3aWxsIGJlIHRoZSBhcHAgb2JqZWN0XG4gIGN1c3RvbToge1xuICAgIE1vZGVscyA6IHt9LFxuICAgIENvbGxlY3Rpb25zIDoge1xuICAgICAgVG9kb3M6IG5ldyBUb2RvcygpXG4gICAgfVxuICB9LFxuXG4gIHJvdXRlciA6IHtcbiAgICBhbmltYXRpb25zOiByZXF1aXJlKCcuL2NvbW1vbi9yb3V0ZXJfYW5pbWF0aW9ucycpLFxuICAgIGRlZmF1bHROYXZpZ2F0ZUFuaW1hdGlvbjogXCJyaWdodFwiLFxuICAgIGRlZmF1bHRCYWNrQW5pbWF0aW9uOiBcImxlZnRcIlxuICB9XG5cbn07XG5cbkFwcC5jb25maWd1cmUob3B0aW9ucywgZnVuY3Rpb24oKSB7XG5cbiAgLy8gVGhlIFNhbXNvbiBBcHAgaXMgbm93IGNvbmZpZ3VyZWQgYW5kIHJlYWR5IHRvIHVzZVxuICBMb2coXCJTYW1zb24gYXBwIGhhcyBiZWVuIGluaXRpYWxpemVkXCIpO1xuXG4gIHZhciBzdGFydEFwcCA9IHJlcXVpcmUoJy4vY29tbW9uL3N0YXJ0QXBwJyk7XG5cbiAgLy8gaWYgd2UgZGV0ZWN0IGNvcmRvdmEgdGhlbiB3YWl0IGZvciB0aGUgZGV2aWNlcmVhZHkgZXZlbnRcbiAgaWYgKHR5cGVvZiB3aW5kb3cuY29yZG92YSA9PT0gJ29iamVjdCcpIHtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgTG9nKFwiRGV2aWNlIGlzIG5vdyByZWFkeVwiKTtcblxuICAgICAgc3RhcnRBcHAoKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHN0YXJ0QXBwKCk7XG5cbiAgfVxuXG59KTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgdHVycXVvaXNlOiBcIiMxYWJjOWNcIixcblxuICBibHVlOiBcIiMzNDk4ZGJcIixcblxuICBwdXJwbGU6IFwiIzliNTliNlwiLFxuXG4gIG5hdnk6IFwiIzM0NDk1ZVwiLFxuXG4gIHllbGxvdzogXCIjZjFjNDBmXCIsXG5cbiAgb3JhbmdlOiBcIiNlNjdlMjJcIixcblxuICByZWQ6IFwiI2MwMzkyYlwiLFxuXG4gIGxpZ2h0R3JheTogXCIjYmRjM2M3XCIsXG5cbiAgZ3JheTogXCIjN2Y4YzhkXCIsXG5cbiAgZGFya0dyYXk6IFwiIzQ0NDQ0NFwiLFxuXG4gIGJsYWNrOiBcIiMxMTExMTFcIixcblxuICB3aGl0ZTogXCIjZmZmZmZmXCJcblxufTtcbiIsIi8vIGRiLmpzIC0gQ2xpZW50IGxvY2FsU3RvcmFnZSBEQiB0byBrZWVwIGRhdGEgcGVyc2lzdGVkXG5cbnZhciBsb2NhbF9zdG9yYWdlX2V4aXN0cyA9IHR5cGVvZiB3aW5kb3cubG9jYWxTdG9yYWdlID09PSAnb2JqZWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgc2F2ZTogZnVuY3Rpb24oa2V5LCB2YWx1ZSwgY2IpIHsgLy8gc2F2ZSBhbiBpdGVtIHRvIGxvY2FsU3RvcmFnZVxuXG4gICAgaWYgKGxvY2FsX3N0b3JhZ2VfZXhpc3RzKSB7XG4gICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Vba2V5XSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uKGtleSwgY2IpIHsgLy8gcmV0cmlldmUgYSBzaW5nbGUgaXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuXG4gICAgdmFyIGZvdW5kX2l0ZW0gPSBmYWxzZTtcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuXG4gICAgICB2YXIgaXRlbSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Vba2V5XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgZm91bmRfaXRlbSA9IEpTT04ucGFyc2UoaXRlbSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKGZvdW5kX2l0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm91bmRfaXRlbTtcbiAgICB9XG5cbiAgfSxcblxuICByZW1vdmU6IGZ1bmN0aW9uKGtleSwgY2IpIHsgLy8gcmVtb3ZlIGEgc2luZ2xlIGl0ZW0gZnJvbSBsb2NhbFN0b3JhZ2VcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gIH0sXG5cbiAgcmVtb3ZlQWxsOiBmdW5jdGlvbihjYikgeyAvLyBkZXN0cm95IHRoZSB3aG9sZSBsb2NhbFN0b3JhZ2VcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2IodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICB9LFxuXG4gIGl0ZW1zOiBmdW5jdGlvbihjYikge1xuXG4gICAgdmFyIGtleXMgPSBmYWxzZTtcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAga2V5cyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpPTA7IGk8d2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXlzLnB1c2god2luZG93LmxvY2FsU3RvcmFnZS5rZXkoaSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2Ioa2V5cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICB9XG5cbn07XG4iLCIvLyBhcHAgbG9nZ2luZyBzZXR0aW5nc1xudmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi8uLi9zZXR0aW5ncycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIExvZyhtZXNzYWdlKSB7XG5cbiAgaWYgKCFzZXR0aW5ncy5wcm9kdWN0aW9uKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkRldmVsb3BtZW50IE1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICByZXR1cm47XG5cbiAgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBcInJpZ2h0LWZhc3RcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLWxlZnQtZmFzdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodC1mYXN0XCIgfSxcbiAgXCJsZWZ0LWZhc3RcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXJpZ2h0LWZhc3RcIiwgbmV4dDogXCJtb3ZlLWZyb20tbGVmdC1mYXN0XCIgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwcm9kdWN0aW9uOiBmYWxzZVxuXG59O1xuIiwidmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xudmFyIExvZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9sb2cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBhc3luYy5wYXJhbGxlbCh7XG5cbiAgICBsb2FkRGV2aWNlRXZlbnRzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfSxcblxuICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIExvZyhcIkVycm9yIGxvYWRpbmcgdGhlIGFwcFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBMb2coXCJBcHAgaXMgZG9uZSBsb2FkaW5nXCIpO1xuXG4gICAgICBBcHAuZW1pdChcImFwcDppbml0aWFsaXplZFwiKTtcblxuICAgICAgQXBwLlJvdXRlci5uYXZpZ2F0ZShcImhvbWVcIiwgXCJmYWRlXCIpO1xuXG4gICAgfVxuXG4gIH0pO1xuXG59O1xuIiwiXG52YXIgZGIgPSByZXF1aXJlKCcuL21vZHVsZXMvZGInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb2RvcygpIHtcblxuICB2YXIgdG9kb3MgPSBkYi5nZXQoXCJUb2Rvc1wiKSB8fCBbXTtcblxuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHRvZG9fdGV4dCkge1xuXG4gICAgLy8gZ2l2ZSB0aGUgdG9kbyBhIHVuaXF1ZSBpZFxuICAgIHZhciB0b2RvID0ge1xuICAgICAgX2lkIDogXCJ0b2RvLVwiICsgRGF0ZS5ub3coKSxcbiAgICAgIHRleHQ6IHRvZG9fdGV4dFxuICAgIH07XG5cbiAgICB0b2Rvcy5wdXNoKHRvZG8pO1xuXG4gICAgLy8gcmVzYXZlIHRoZSBhcnJheSBvZiB0b2RvcyBpbiBsb2NhbFN0b3JhZ2VcbiAgICBkYi5zYXZlKFwiVG9kb3NcIiwgdG9kb3MpO1xuXG4gIH07XG5cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbih0b2RvX2lkKSB7XG5cbiAgICBmb3IgKHZhciBpPTA7IGk8dG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSB0aGUgdG9kbyBmcm9tIHRoZSB0b2RvcyBhcnJheSBpZiB0aGUgX2lkJ3MgbWF0Y2hcbiAgICAgIGlmICh0b2Rvc1tpXS5faWQgPT09IHRvZG9faWQpIHtcbiAgICAgICAgdG9kb3Muc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNhdmUgdGhlIGFycmF5IG9mIHRvZG9zIGluIGxvY2FsU3RvcmFnZVxuICAgIGRiLnNhdmUoXCJUb2Rvc1wiLCB0b2Rvcyk7XG5cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKHRvZG9faWQsIHRvZG9fdGV4dCkge1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodG9kb3NbaV0uX2lkID09PSB0b2RvX2lkKSB7XG4gICAgICAgIHRvZG9zW2ldLnRleHQgPSB0b2RvX3RleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc2F2ZSB0aGUgYXJyYXkgb2YgdG9kb3MgaW4gbG9jYWxTdG9yYWdlXG4gICAgZGIuc2F2ZShcIlRvZG9zXCIsIHRvZG9zKTtcblxuICB9O1xuXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24odG9kb19pZCkge1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodG9kb3NbaV0uX2lkID09PSB0b2RvX2lkKSB7XG4gICAgICAgIHJldHVybiB0b2Rvc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICB0aGlzLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0b2Rvcy5zbGljZSgwKTtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b2RvcyA9IFtdO1xuXG4gICAgZGIuc2F2ZShcIlRvZG9zXCIsIFtdKTtcblxuICB9O1xuXG59O1xuIiwiXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi8uLi8uLi8uLi8uLi8uLi9saWInKTtcblxudmFyIHN1Y2Nlc3NfY29sb3IgPSBcImdyZWVuXCI7XG52YXIgZXJyb3JfY29sb3IgPSBcInJlZFwiO1xudmFyIGluZm9fY29sb3IgPSBcImJsdWVcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdzYW1zb25fYWxlcnRzX2NvbnRhaW5lcicsXG5cbiAgZG9tRXZlbnRzOiB7XG5cblxuICB9LFxuXG4gIGFwcEV2ZW50czoge30sXG5cbiAgZXh0ZW5kOiB7XG5cbiAgICBjcmVhdGVBbGVydDogZnVuY3Rpb24obWVzc2FnZSwgY29sb3IpIHtcblxuICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnbnVtYmVyJykge1xuICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSArIFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbGVydCBtZXNzYWdlcyBtdXN0IGJlIGEgc3RyaW5nIG9yIG51bWJlclwiKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFsZXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgYWxlcnQuaWQgPSBcImFsZXJ0LVwiICsgRGF0ZS5ub3coKTtcbiAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoXCJzYW1zb25fYWxlcnRcIik7XG4gICAgICBhbGVydC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICAgIGFsZXJ0LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgICAgLy8gYXBwZW5kIHRoZSBhbGVydCB0byB0aGUgc2Ftc29uX2FsZXJ0c19jb250YWluZXJcbiAgICAgIHZhciBmaXJzdENoaWxkID0gU2Ftc29uLkFwcC5ET00uc2Ftc29uX2FsZXJ0cy5maXJzdENoaWxkO1xuICAgICAgaWYgKGZpcnN0Q2hpbGQpIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2FsZXJ0cy5pbnNlcnRCZWZvcmUoYWxlcnQsIGZpcnN0Q2hpbGQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2FsZXJ0cy5hcHBlbmRDaGlsZChhbGVydCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGluaXRpYXRlIHRoZSBhbGVydCBmYWRlIGluXG4gICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhbGVydCkuY3NzVGV4dDsgLy8gd2UgdXNlIGdldENvbXB1dGVkU3R5bGUgdG8gbWFrZSBzdXJlIHRoZSBlbGVtZW50IGlzIGFscmVhZHkgYWRkZWQgdG8gdGhlIERPTSBiZWZvcmUgYXBwbHlpbmcgdGhlIHRyYW5zaXRpb25cbiAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuXG4gICAgICAvLyBzaG93IHRoZSBub3RpZmljYXRpb24gZm9yIDMgc2Vjb25kcyBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy9hbGVydC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgYWxlcnQuc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBhbGVydC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFsZXJ0KTtcbiAgICAgICAgfSwgODAwKTtcblxuICAgICAgfSwgMzAwMCk7XG5cbiAgICB9LFxuXG4gICAgc3VjY2VzczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdGhpcy5jcmVhdGVBbGVydChvcHRpb25zLCBzdWNjZXNzX2NvbG9yKTtcbiAgICB9LFxuXG4gICAgZXJyb3I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuY3JlYXRlQWxlcnQob3B0aW9ucywgZXJyb3JfY29sb3IpO1xuICAgIH0sXG5cbiAgICBpbmZvOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB0aGlzLmNyZWF0ZUFsZXJ0KG9wdGlvbnMsIGluZm9fY29sb3IpO1xuICAgIH0sXG5cbiAgICBjdXN0b206IGZ1bmN0aW9uKG9wdGlvbnMsIGNvbG9yKSB7XG4gICAgICB0aGlzLmNyZWF0ZUFsZXJ0KG9wdGlvbnMsIGNvbG9yKTtcbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSB0cmFuc3BhcmVudCBvdmVybGF5IGVsZW1lbnRcbiAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fYWxlcnRzID0gdGhpcy5lbGVtZW50O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHRyYW5zcGFyZW50IG92ZXJsYXkgZWxlbWVudCBmcm9tIHRoZSBjYWNoZVxuICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fYWxlcnRzO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuLy4uLy4uLy4uLy4uLy4uL2xpYicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ3NhbXNvbl9mYWRlZF9vdmVybGF5JyxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICBTYW1zb24uQXBwLmVtaXQoXCJmYWRlZC1vdmVybGF5OmhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdzaWRlLW1lbnU6aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgICdoZWFkZXI6bWVudS1idXR0b246aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRvZ2dsZUZhZGVkT3ZlcmxheSgpO1xuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNWaXNpYmxlIDogZmFsc2UsXG5cbiAgICBoaWRlRmFkZWRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93RmFkZWRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHRvZ2dsZUZhZGVkT3ZlcmxheTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dGYWRlZE92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBmYWRlZCBvdmVybGF5IGlzIHJlbW92ZWQgYmVmb3JlIGFueSBuZXcgcGFnZSBpcyB0cmFuc2l0aW9uZWQgdG9cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgZGF0YS5jdXJyZW50QW5pbWF0aW9uICE9PSBcInVwZGF0ZVwiKSB7XG4gICAgICAgIHRoaXMuaGlkZUZhZGVkT3ZlcmxheSgpO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgZmFkZWQgb3ZlcmxheSBlbGVtZW50XG4gICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXkgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgZmFkZWQgb3ZlcmxheSBlbGVtZW50IGZyb20gdGhlIGNhY2hlXG4gICAgZGVsZXRlIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mYWRlZF9vdmVybGF5O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuLy4uLy4uLy4uLy4uLy4uL2xpYicpO1xuXG52YXIgaGVhZGVyX2hlaWdodCA9IFwiNjBweFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ3NhbXNvbl9oZWFkZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCAjc2Ftc29uX2hlYWRlcl9tZW51X2J1dHRvbic6IGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkFwcC5lbWl0KCdoZWFkZXI6bWVudS1idXR0b246aGl0Jyk7XG4gICAgfSxcblxuICAgICd0b3VjaCAjc2Ftc29uX2hlYWRlcl9iYWNrX2J1dHRvbic6IGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkFwcC5lbWl0KCdoZWFkZXI6YmFjay1idXR0b246aGl0Jyk7XG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzOiB7XG5cbiAgICAnYXBwOmluaXRpYWxpemVkJzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICB9LFxuXG4gICAgJ2hlYWRlcjpzaG93JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICB9LFxuXG4gICAgJ2hlYWRlcjpoaWRlJzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmhpZGVIZWFkZXIoKTtcbiAgICB9XG5cbiAgfSxcblxuICBleHRlbmQ6IHtcblxuICAgIGhlYWRlckhlaWdodDogaGVhZGVyX2hlaWdodCxcblxuICAgIGlzVmlzaWJsZSA6IGZhbHNlLFxuXG4gICAgaGlkZUhlYWRlciA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd0hlYWRlciA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB0b2dnbGVIZWFkZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMuaGlkZUhlYWRlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93SGVhZGVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICAvLyBpZiB0aGUgcGFnZSBpcyBmdWxsc2NyZWVuLCB0aGVuIGhpZGUgdGhlIGhlYWRlciBhbmQgc3RyZXRjaCB0aGUgcGFnZSB0byB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cbiAgICAgIGlmIChTYW1zb24uQXBwLlJvdXRlci5wYWdlQ2FjaGVbZGF0YS5uZXh0UGFnZV0uZnVsbHNjcmVlbikge1xuICAgICAgICBTYW1zb24uQXBwLkRPTVtkYXRhLmluYWN0aXZlUGFnZUVsZW1lbnRdLnN0eWxlLnRvcCA9IFwiXCI7XG4gICAgICAgIHRoaXMuaGlkZUhlYWRlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET01bZGF0YS5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5zdHlsZS50b3AgPSBoZWFkZXJfaGVpZ2h0O1xuICAgICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgZHVyaW5nQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSkgeyAvLyBubyBjYWxsYmFja1xuXG4gICAgICAvLyBpZiB0aGUgbmV4dCBwYWdlIGhhcyBhIHByZXZpb3VzUGFnZSwgdGhlbiByZXBsYWNlIHRoZSAjc2Ftc29uX2hlYWRlcl9tZW51X2J1dHRvbiB3aXRoICNzYW1zb25fbWVudV9iYWNrX2J1dHRvblxuICAgICAgaWYgKFNhbXNvbi5BcHAuUGFnZXNbZGF0YS5uZXh0UGFnZV0ucHJldmlvdXNQYWdlKSB7XG4gICAgICAgIFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIuYnV0dG9uID0gXCJiYWNrXCI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdGl0bGU6IFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIudGl0bGUsXG4gICAgICBidXR0b246IFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIuYnV0dG9uXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGlmICghU2Ftc29uLkFwcC5EYXRhLkhlYWRlcikge1xuICAgICAgU2Ftc29uLkFwcC5EYXRhLkhlYWRlciA9IHt9O1xuICAgIH1cblxuICAgIGlmICghU2Ftc29uLkFwcC5EYXRhLkhlYWRlci50aXRsZSkge1xuICAgICAgU2Ftc29uLkFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiQXBwXCI7XG4gICAgfVxuXG4gICAgaWYgKCFTYW1zb24uQXBwLkRhdGEuSGVhZGVyLmJ1dHRvbikge1xuICAgICAgU2Ftc29uLkFwcC5EYXRhLkhlYWRlci5idXR0b24gPSBcIm1lbnVcIjtcbiAgICB9XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSBoZWFkZXIgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9oZWFkZXIgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgaGVhZGVyIGVsZW1lbnQgZnJvbSB0aGUgY2hhY2hlXG4gICAgZGVsZXRlIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9oZWFkZXI7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGJ1dHRvbiwgdGl0bGUpIHtcbmlmICggYnV0dG9uID09PSBcIm1lbnVcIilcbntcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl9tZW51X2J1dHRvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWJhcnNcXFwiPjwvaT48L2Rpdj5cIik7XG59XG5lbHNlIGlmICggYnV0dG9uID09PSBcImJhY2tcIilcbntcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl9iYWNrX2J1dHRvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLWNoZXZyb24tbGVmdFxcXCI+PC9pPjwvZGl2PlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl90aXRsZVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcImJ1dHRvblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYnV0dG9uOnR5cGVvZiBidXR0b24hPT1cInVuZGVmaW5lZFwiP2J1dHRvbjp1bmRlZmluZWQsXCJ0aXRsZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudGl0bGU6dHlwZW9mIHRpdGxlIT09XCJ1bmRlZmluZWRcIj90aXRsZTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGhlYWRlciA6IHJlcXVpcmUoJy4vaGVhZGVyJyksXG5cbiAgc2lkZU1lbnUgOiByZXF1aXJlKCcuL3NpZGVNZW51JyksXG5cbiAgZmFkZWRPdmVybGF5IDogcmVxdWlyZSgnLi9mYWRlZE92ZXJsYXknKSxcblxuICB0cmFuc3BhcmVudE92ZXJsYXkgOiByZXF1aXJlKCcuL3RyYW5zcGFyZW50T3ZlcmxheScpLFxuXG4gIGFsZXJ0IDogIHJlcXVpcmUoJy4vYWxlcnRzJylcblxufTtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX3NpZGVtZW51JyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG5cbiAgZG9tRXZlbnRzOiB7XG5cbiAgICAvLyBoYW5kbGUgYW55IC5zYW1zb25fc2lkZW1lbnVfaXRlbSBiZWluZyB0b3VjaGVkXG4gICAgJ3RvdWNoIC5zYW1zb25fc2lkZW1lbnVfaXRlbSc6IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQpIHtcblxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSByb3V0ZXIgaXNuJ3QgYWxyZWFkeSBidXN5IGJlZm9yZSBhY2NlcHRpbmcgYW55IGV2ZW50cyBmcm9tIHRoZSBzaWRlbWVudVxuICAgICAgaWYgKCFTYW1zb24uQXBwLlJvdXRlci5pc0J1c3kpIHtcblxuICAgICAgICB2YXIgcGF0aCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhZ2VcIik7XG5cbiAgICAgICAgLy8gc2V0IHNlbGVjdGVkIGFzIHRydWUgb24gdGhlIHRhcmdldGVkIHNpZGVfbWVudV9pdGVtXG4gICAgICAgIFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICBpZiAocGFnZS5wYXRoID09PSBwYXRoKSB7XG4gICAgICAgICAgICBTYW1zb24uQXBwLkRhdGEuc2lkZU1lbnUuc2VsZWN0ZWQgPSBwYXRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9yY2UgdGhlIHNpZGVtZW51IHRvIHJlcmVuZGVyIGlmIHRoZSBzZWxlY3RlZCBzaWRlbWVudV9pdGVtIGhhcyBjaGFuZ2VkXG4gICAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuXG4gICAgICAgIC8vIG9ubHkgbmF2aWdhdGUgaWYgd2UgYXJlbid0IGFscmVhZHkgb24gdGhlIHNlbGVjdGVkIHBhZ2VcbiAgICAgICAgaWYgKHBhdGggIT09IFNhbXNvbi5BcHAuUm91dGVyLmN1cnJlbnRQYWdlKSB7XG5cbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGZvY3VzX2VsZW1lbnQgc28gdGhhdCBpdCBkb2Vzbid0IHRyeSB0byByZWZvY3VzIGR1cmluZyB0aGUgcGFnZSBhbmltYXRpb25cbiAgICAgICAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQ7XG5cbiAgICAgICAgICAvLyBuYXZpZ2F0ZSB0byB0aGUgbmV3IHBhZ2VcbiAgICAgICAgICBTYW1zb24uQXBwLlJvdXRlci5uYXZpZ2F0ZShwYXRoLCBcInJpZ2h0XCIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZVNpZGVNZW51KCk7XG4gICAgICAgICAgU2Ftc29uLkFwcC5lbWl0KFwic2lkZS1tZW51OmhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdoZWFkZXI6bWVudS1idXR0b246aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRvZ2dsZVNpZGVNZW51KCk7XG4gICAgfSxcblxuICAgICdmYWRlZC1vdmVybGF5OmhpdCc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWRlTWVudSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNPcGVuOiBmYWxzZSxcblxuICAgIGNsb3NlU2lkZU1lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgLy8gcmVzdG9yZSBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IGhhZCBmb2N1cyBiZWZvcmUgdGhlIHNpZGVNZW51IHdhcyBvcGVuXG4gICAgICBpZiAoU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQpIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAvLyBtb3ZlIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgdGV4dFxuICAgICAgICB2YXIgdmFsdWVfbGVuZ3RoID0gU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb247XG4gICAgICAgIHZhbHVlX2xlbmd0aCA9ICh2YWx1ZV9sZW5ndGggPT09IGZhbHNlKSA/IFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mb2N1c19lbGVtZW50LnZhbHVlLmxlbmd0aCA6IHZhbHVlX2xlbmd0aDtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UodmFsdWVfbGVuZ3RoLCB2YWx1ZV9sZW5ndGgpO1xuXG4gICAgICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudDtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBvcGVuU2lkZU1lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICAvLyBoaWRlIHRoZSBrZXlib2FyZCBhbmQgcmVtb3ZlIGZvY3VzIGZyb20gYW4gaW5wdXQvdGV4dGFyZWEgZWxlbWVudCBpZiBuZWNlc3NhcnlcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mb2N1c19lbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb24gPSBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudC5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudC5ibHVyKCk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgdG9nZ2xlU2lkZU1lbnU6IGZ1bmN0aW9uKCkgeyAvLyBpZiB0aGUgc2lkZW1lbnUgaXMgY2xvc2VkIHRoZW4gb3BlbiBpdCwgaWYgb3BlbiB0aGVuIGNsb3NlIGl0XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZGVNZW51KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW5TaWRlTWVudSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIHJvdXRlcjoge1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIHNpZGUgbWVudSBpcyBjbG9zZWQgYmVmb3JlIGFueSBuZXcgcGFnZSBpcyB0cmFuc2l0aW9uZWQgdG9cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAodGhpcy5pc09wZW4gICYmIGRhdGEuY3VycmVudEFuaW1hdGlvbiAhPT0gXCJ1cGRhdGVcIikge1xuICAgICAgICB0aGlzLmNsb3NlU2lkZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcblxuICAgICAgcGFnZXM6IFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5wYWdlcyxcbiAgICAgIHNlbGVjdGVkOiBTYW1zb24uQXBwLkRhdGEuc2lkZU1lbnUuc2VsZWN0ZWRcblxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIENvbXBvbmVudCBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgc2lkZW1lbnUgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9zaWRlbWVudSA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBDb21wb25lbnQgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHNpZGVtZW51IGVsZW1lbnQgZnJvbSB0aGUgY2FjaGVcbiAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX3NpZGVtZW51O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChwYWdlcywgc2VsZWN0ZWQsIHVuZGVmaW5lZCkge1xuLy8gaXRlcmF0ZSBwYWdlc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwYWdlcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBhZ2UgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBhZ2VcIiwgcGFnZS5wYXRoLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFtcInNhbXNvbl9zaWRlbWVudV9pdGVtIFwiICsgKChwYWdlLnBhdGggPT09IHNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnKSkgKyBcIlwiXSwgW3RydWVdKSkgKyBcIj48aVwiICsgKGphZGUuY2xzKFsnZmEnLHBhZ2UuaWNvbl0sIFtudWxsLHRydWVdKSkgKyBcIj48L2k+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGFnZS5uYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGFnZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuYXR0cihcImRhdGEtcGFnZVwiLCBwYWdlLnBhdGgsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoW1wic2Ftc29uX3NpZGVtZW51X2l0ZW0gXCIgKyAoKHBhZ2UucGF0aCA9PT0gc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJycpKSArIFwiXCJdLCBbdHJ1ZV0pKSArIFwiPjxpXCIgKyAoamFkZS5jbHMoWydmYScscGFnZS5pY29uXSwgW251bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwYWdlLm5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwicGFnZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnBhZ2VzOnR5cGVvZiBwYWdlcyE9PVwidW5kZWZpbmVkXCI/cGFnZXM6dW5kZWZpbmVkLFwic2VsZWN0ZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNlbGVjdGVkOnR5cGVvZiBzZWxlY3RlZCE9PVwidW5kZWZpbmVkXCI/c2VsZWN0ZWQ6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXknLFxuXG4gIGRvbUV2ZW50czoge1xuXG4gICAgJ3RvdWNoJyA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBTYW1zb24uQXBwLmVtaXQoXCJ0cmFuc3BhcmVudC1vdmVybGF5OmhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHt9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNWaXNpYmxlOiBmYWxzZSxcblxuICAgIGhpZGVUcmFuc3BhcmVudE92ZXJsYXkgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNob3dUcmFuc3BhcmVudE92ZXJsYXkgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlVHJhbnNwYXJlbnRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlVHJhbnNwYXJlbnRPdmVybGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dUcmFuc3BhcmVudE92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnNob3dUcmFuc3BhcmVudE92ZXJsYXkoKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIGFmdGVyQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuaGlkZVRyYW5zcGFyZW50T3ZlcmxheSgpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gY2FjaGUgdGhlIHRyYW5zcGFyZW50IG92ZXJsYXkgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5ID0gdGhpcy5lbGVtZW50O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHRyYW5zcGFyZW50IG92ZXJsYXkgZWxlbWVudCBmcm9tIHRoZSBjYWNoZVxuICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwiXG52YXIgZGIgPSByZXF1aXJlKCcuLy4uLy4uL2NvbW1vbi9tb2R1bGVzL2RiJyk7XG52YXIgYXV0b3NpemUgPSByZXF1aXJlKCdhdXRvc2l6ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwYXRoOiAnYWRkVG9kb3MnLFxuICBzdWJQYWdlT2Y6IGZhbHNlLFxuICBwcmV2aW91c1BhZ2U6IGZhbHNlLFxuICBiYWNrU2FmZTogdHJ1ZSxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG4gIGV4dGVuZDoge1xuICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICB9LFxuXG4gIGRvbUV2ZW50cyA6IHtcblxuICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGN1cnJlbnQgdG9kbyBpbiBsb2NhbFN0b3JhZ2UgYW5kIHJlc2l6ZSB0aGUgdGV4dGFyZWEgaWYgbmVjZXNzYXJ5XG4gICAgJ2lucHV0ICNuZXctdG9kby10ZXh0YXJlYSc6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBzdG9yZSB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgbmV3IFRvRG8gSXRlbVxuICAgICAgQXBwLk1vZGVscy5Ub2RvSXRlbSA9IEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWU7XG4gICAgICBkYi5zYXZlKFwiVG9kb0l0ZW1cIiwgQXBwLkRPTS5uZXdfdG9kb190ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICB9LFxuXG4gICAgLy8gdmFsaWRhdGUgdGhlIHRvZG8gYW5kIGFkZCBpdCB0byB0aGUgVG9kb3MgY29sbGVjdGlvblxuICAgICd0b3VjaCAjbmV3LXRvZG8tc3VibWl0LWJ1dHRvbic6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgdG9kbyA9IEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWU7XG5cbiAgICAgIEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWUgPSBcIlwiO1xuICAgICAgYXV0b3NpemUudXBkYXRlKEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgICBBcHAuTW9kZWxzLlRvZG9JdGVtID0gXCJcIjtcbiAgICAgIGRiLnJlbW92ZShcIlRvZG9JdGVtXCIpO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MuYWRkKHRvZG8pO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzIDoge30sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdG9kb19pdGVtOiBBcHAuTW9kZWxzLlRvZG9JdGVtXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIEFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiQWRkIFRvRG9zXCI7XG5cbiAgICAvLyBjaGVjayBpZiBhIFRvZG9JdGVtIGlzIGFscmVhZHkgaW4gbG9jYWxTdG9yYWdlXG4gICAgaWYgKEFwcC5Nb2RlbHMuVG9kb0l0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgQXBwLk1vZGVscy5Ub2RvSXRlbSA9IGRiLmdldChcIlRvZG9JdGVtXCIpIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRE9NLm5ld190b2RvX3RleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby10ZXh0YXJlYVwiKTtcblxuICAgIGF1dG9zaXplKEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZS5kZXN0cm95KEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgZGVsZXRlIEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWE7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHRvZG9faXRlbSkge1xuYnVmLnB1c2goXCI8dGV4dGFyZWEgaWQ9XFxcIm5ldy10b2RvLXRleHRhcmVhXFxcIiByb3dzPVxcXCIxXFxcIiBwbGFjZWhvbGRlcj1cXFwiQWRkIGEgbmV3IFRvRG8gSXRlbSBoZXJlLi4uXFxcIiByZXF1aXJlZD1cXFwicmVxdWlyZWRcXFwiIGF1dG9mb2N1cz1cXFwiYXV0b2ZvY3VzXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0b2RvX2l0ZW0pID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvdGV4dGFyZWE+PGRpdiBpZD1cXFwibmV3LXRvZG8tc3VibWl0LWJ1dHRvblxcXCI+QWRkIEl0ZW08L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJ0b2RvX2l0ZW1cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvZG9faXRlbTp0eXBlb2YgdG9kb19pdGVtIT09XCJ1bmRlZmluZWRcIj90b2RvX2l0ZW06dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwYXRoOiAnaG9tZScsXG4gIHN1YlBhZ2VPZjogZmFsc2UsXG4gIHByZXZpb3VzUGFnZTogZmFsc2UsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuXG4gIGRvbUV2ZW50cyA6IHt9LFxuXG4gIGFwcEV2ZW50cyA6IHt9LFxuXG4gIGV4dGVuZCA6IHtcblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgbmFtZTogXCJIb21lIFBhZ2VcIlxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYmVmb3JlIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGJlZm9yZVJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRGF0YS5IZWFkZXIudGl0bGUgPSBcIlRvRG8gQXBwXCI7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy90aGlzLnRvcEJveC5vZmYoJ2NsaWNrZWQnKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiYXBwLWluZm9cXFwiPlRoaXMgc2ltcGxlIGFwcCB3aWxsIGFsbG93IHlvdSB0byBtYW5hZ2UgYSBUb0RvIExpc3QuIEhpdCB0aGUgbWVudSBidXR0b24gdG8gbmF2aWdhdGUgdG8gdGhlIFxcXCJBZGQgVG9Eb3NcXFwiIG9yIFxcXCJWaWV3IFRvRG9zXFxcIiBwYWdlcy4gQW55IFRvRG8gaXRlbXMgeW91IGFkZCB3aWxsIGJlIHN0b3JlZCBvbiB5b3VyIGRldmljZSwgc28gdGhhdCB5b3UgY2FuIGFjY2VzcyB0aGVtIGV2ZW4gd2hlbiB5b3UgYXJlIG9mZmxpbmUuPC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgaG9tZTogcmVxdWlyZSgnLi9ob21lJyksXG5cbiAgYWRkVG9kb3M6IHJlcXVpcmUoJy4vYWRkVG9kb3MnKSxcblxuICB2aWV3VG9kb3M6IHJlcXVpcmUoJy4vdmlld1RvZG9zJylcblxufTtcbiIsIlxudmFyIGF1dG9zaXplID0gcmVxdWlyZSgnYXV0b3NpemUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbnBhdGg6ICd2aWV3VG9kb3MnLFxuICBzdWJQYWdlT2Y6IGZhbHNlLFxuICBwcmV2aW91c1BhZ2U6IGZhbHNlLFxuICBiYWNrU2FmZTogdHJ1ZSxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG5cbiAgZXh0ZW5kOiB7XG4gICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gIH0sXG5cbiAgZG9tRXZlbnRzIDoge1xuXG4gICAgLy8gcmVtb3ZlIGEgdG9kbyBpdGVtIGlmIHRoZSByZW1vdmUgYnV0dG9uIGlzIHRvdWNoZWRcbiAgICAndG91Y2ggLnRvZG8taXRlbS1yZW1vdmUtYnV0dG9uJyA6IGZ1bmN0aW9uKGUsIHRhcmdldCkge1xuXG4gICAgICB2YXIgdG9kb19pZCA9IHRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG5cbiAgICAgIC8vIHJlbW92ZSB0aGUgYXV0b3NpemUgbGlzdGVuZXIgb24gdGhpcyBpdGVtcyB0ZXh0YXJlYVxuICAgICAgYXV0b3NpemUuZGVzdHJveSh0YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIikpO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MucmVtb3ZlKHRvZG9faWQpO1xuICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICB9LFxuXG4gICAgLy8gcmVtb3ZlIGZvY3VzIGZyb20gYW55IHRleHRhcmVhIGlmIHRoZSB1c2VyIHRvdWNoZXMgb2ZmIG9mIGl0XG4gICAgJ3RvdWNoICN2aWV3VG9kb3MtcGFnZSc6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidG91Y2hlZCB0aGUgcGFnZVwiKTtcblxuICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBcInZpZXdUb2Rvcy1wYWdlXCIpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gc3RvcmUgdGhlIG5ldyBhcnJheSBvZiB0b2RvcyBpZiBhbnkgdG9kbyBpdGVtJ3MgdmFsdWUgaXMgdXBkYXRlZFxuICAgICdpbnB1dCAudG9kby1pdGVtLXRleHQnOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciB0b2RvX2lkID0gZS50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgdmFyIHRvZG9fdGV4dCA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MudXBkYXRlKHRvZG9faWQsIHRvZG9fdGV4dCk7XG4gICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgIH0sXG5cbiAgfSxcblxuICBhcHBFdmVudHMgOiB7fSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHRvZG9zOiBBcHAuQ29sbGVjdGlvbnMuVG9kb3MuZ2V0QWxsKClcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgQXBwLkRhdGEuSGVhZGVyLnRpdGxlID0gXCJZb3VyIFRvRG8gTGlzdFwiO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgYXV0b3NpemUuZGVzdHJveSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodG9kb3MsIHVuZGVmaW5lZCkge1xuLy8gaXRlcmF0ZSB0b2Rvc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSB0b2RvcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHRvZG8gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmF0dHIoXCJkYXRhLWlkXCIsIHRvZG8uX2lkLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcInRvZG8taXRlbVxcXCI+PHRleHRhcmVhIHJvd3M9XFxcIjFcXFwiIGNsYXNzPVxcXCJ0b2RvLWl0ZW0tdGV4dFxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdG9kby50ZXh0KSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3RleHRhcmVhPjxkaXYgY2xhc3M9XFxcInRvZG8taXRlbS1yZW1vdmUtYnV0dG9uXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgdG9kbyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuYXR0cihcImRhdGEtaWRcIiwgdG9kby5faWQsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwidG9kby1pdGVtXFxcIj48dGV4dGFyZWEgcm93cz1cXFwiMVxcXCIgY2xhc3M9XFxcInRvZG8taXRlbS10ZXh0XFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0b2RvLnRleHQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvdGV4dGFyZWE+PGRpdiBjbGFzcz1cXFwidG9kby1pdGVtLXJlbW92ZS1idXR0b25cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10aW1lc1xcXCI+PC9pPjwvZGl2PjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwidG9kb3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvZG9zOnR5cGVvZiB0b2RvcyE9PVwidW5kZWZpbmVkXCI/dG9kb3M6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIi8vIFRpbnkgQXN5bmMgbGlicmFyeSBmb3IgdXNlIGluIG1vZGVybiBlbnZpcm9ubWVudHNcblxuKGZ1bmN0aW9uKCkge1xuXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIHJvb3QgaXMgZ2xvYmFsIG9uIHRoZSBzZXJ2ZXIsIGFuZCB3aW5kb3cgaW4gdGhlIGJyb3dzZXJcbiAgdmFyIHJvb3Q7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHRoaXMgPT09IHdpbmRvdykge1xuICAgIHJvb3QgPSB3aW5kb3c7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiB0aGlzID09PSBnbG9iYWwpIHtcbiAgICByb290ID0gZ2xvYmFsO1xuICB9IGVsc2Uge1xuICAgIHJvb3QgPSB0aGlzO1xuICB9XG5cbiAgLy8gY2FjaGVkIGZvciBwZXJmb3JtYW5jZVxuICBmdW5jdGlvbiBub29wKCkge31cbiAgdmFyIE9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcblxuICAvLyBpc0FycmF5IGFuZCBpc09iamVjdCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcbiAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkoYXJyKSAmJiBhcnIubGVuZ3RoID4gMCk7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIE9iamVjdEtleXMob2JqKS5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvRWFjaChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZXJhdG9yKGFycltpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBkb09uY2UoZm4pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNhbGxlZCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgYWxyZWFkeSBjYWxsZWQuXCIpO1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHJvb3QsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYW9sYW4vYXN5bmNcbiAgZnVuY3Rpb24gX2RvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSByZXR1cm47XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFzeW5jID0ge1xuXG4gICAgLy8gcnVucyB0aGUgdGFzayBvbiBldmVyeSBpdGVtIGluIHRoZSBhcnJheSBhdCBvbmNlXG4gICAgZWFjaCA6IGZ1bmN0aW9uKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IF9kb09uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICB2YXIgYW1vdW50ID0gYXJyLmxlbmd0aDtcblxuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIGRvRWFjaChhcnIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaXRlcmF0b3IoaXRlbSwgZG9PbmNlKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG5vb3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA+PSBhbW91bnQpIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIHJ1bnMgdGhyb3VnaCB0aGUgYXJyYXkgb25lIGl0ZW0gYXQgYSB0aW1lXG4gICAgZWFjaFNlcmllcyA6IGZ1bmN0aW9uKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IF9kb09uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICB2YXIgYW1vdW50ID0gYXJyLmxlbmd0aDtcblxuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIHZhciBpdGVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycltjb21wbGV0ZWRdLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQrKztcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPCBhbW91bnQpIHtcbiAgICAgICAgICAgICAgaXRlcmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICAgIGl0ZXJhdGUoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FuIGFjY2VwdCBhbiBvYmplY3Qgb3IgYXJyYXlcbiAgICAvLyB3aWxsIHJldHVybiBhbiBvYmplY3Qgb3IgYXJyYXkgb2YgcmVzdWx0cyBpbiB0aGUgY29ycmVjdCBvcmRlclxuICAgIHBhcmFsbGVsIDogZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG5cbiAgICAgIHZhciBrZXlzOyB2YXIgbGVuZ3RoOyB2YXIgaTsgdmFyIHJlc3VsdHM7IHZhciBraW5kO1xuICAgICAgdmFyIHVwZGF0ZWRfdGFza3MgPSBbXTtcbiAgICAgIHZhciBpc19vYmplY3Q7XG4gICAgICB2YXIgY291bnRlciA9IDA7XG5cbiAgICAgIGlmIChpc0FycmF5KHRhc2tzKSkge1xuXG4gICAgICAgIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRhc2tzKSkge1xuXG4gICAgICAgIGlzX29iamVjdCA9IHRydWU7XG4gICAgICAgIGtleXMgPSBPYmplY3RLZXlzKHRhc2tzKTtcbiAgICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIHJlc3VsdHMgPSB7fTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaT0wOyBpPGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaWYgKGlzX29iamVjdCkge1xuICAgICAgICAgIHVwZGF0ZWRfdGFza3MucHVzaCh7IGs6IGtleXNbaV0sIHQ6IHRhc2tzW2tleXNbaV1dIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZWRfdGFza3MucHVzaCh7IGs6IGksIHQ6IHRhc2tzW2ldIH0pO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdXBkYXRlZF90YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRhc2tfb2JqZWN0KSB7XG5cbiAgICAgICAgdGFza19vYmplY3QudChmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuXG4gICAgICAgICAgcmVzdWx0c1t0YXNrX29iamVjdC5rXSA9IHJlc3VsdDtcblxuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICBpZiAoY291bnRlciA9PSBsZW5ndGgpIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLy8gb25seSBhY2NlcHRzIGFuIGFycmF5IHNpbmNlIHRoZSBwcmVzZXJ2YXRpb24gb2YgdGhlIG9yZGVyIG9mIHByb3BlcnRpZXMgb24gYW4gb2JqZWN0IGNhbid0IGJlIGd1YXJhbnRlZWRcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIHJlc3VsdHMgaW4gb3JkZXJcbiAgICBzZXJpZXMgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhc2tzKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBsZW5ndGggPSB0YXNrcy5sZW5ndGg7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICBmdW5jdGlvbiBydW5UYXNrKGluZGV4KSB7XG4gICAgICAgIHRhc2tzW2luZGV4XShmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gcmVzdWx0O1xuICAgICAgICAgIGlmIChpbmRleCA8IGxlbmd0aCAtIDEpIHJldHVybiBydW5UYXNrKGluZGV4ICsgMSk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcnVuVGFzaygwKTtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gYXN5bmM7XG4gIH1cbiAgLy8gQU1EIC8gUmVxdWlyZUpTXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhc3luYztcbiAgICB9KTtcbiAgfVxuICAvLyBpbmNsdWRlZCBkaXJlY3RseSB2aWEgPHNjcmlwdD4gdGFnXG4gIGVsc2Uge1xuICAgIHJvb3QuYXN5bmMgPSBhc3luYztcbiAgfVxuXG59KCkpO1xuIiwiLyohXG5cdEF1dG9zaXplIDMuMC41XG5cdGxpY2Vuc2U6IE1JVFxuXHRodHRwOi8vd3d3LmphY2tsbW9vcmUuY29tL2F1dG9zaXplXG4qL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCk7XG5cdFx0Z2xvYmFsLmF1dG9zaXplID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBtb2R1bGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIGFzc2lnbih0YSkge1xuXHRcdHZhciBfcmVmID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHRcdHZhciBfcmVmJHNldE92ZXJmbG93WCA9IF9yZWYuc2V0T3ZlcmZsb3dYO1xuXHRcdHZhciBzZXRPdmVyZmxvd1ggPSBfcmVmJHNldE92ZXJmbG93WCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYkc2V0T3ZlcmZsb3dYO1xuXHRcdHZhciBfcmVmJHNldE92ZXJmbG93WSA9IF9yZWYuc2V0T3ZlcmZsb3dZO1xuXHRcdHZhciBzZXRPdmVyZmxvd1kgPSBfcmVmJHNldE92ZXJmbG93WSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYkc2V0T3ZlcmZsb3dZO1xuXG5cdFx0aWYgKCF0YSB8fCAhdGEubm9kZU5hbWUgfHwgdGEubm9kZU5hbWUgIT09ICdURVhUQVJFQScgfHwgdGEuaGFzQXR0cmlidXRlKCdkYXRhLWF1dG9zaXplLW9uJykpIHJldHVybjtcblxuXHRcdHZhciBoZWlnaHRPZmZzZXQgPSBudWxsO1xuXHRcdHZhciBvdmVyZmxvd1kgPSAnaGlkZGVuJztcblxuXHRcdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0XHR2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCk7XG5cblx0XHRcdGlmIChzdHlsZS5yZXNpemUgPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0dGEuc3R5bGUucmVzaXplID0gJ25vbmUnO1xuXHRcdFx0fSBlbHNlIGlmIChzdHlsZS5yZXNpemUgPT09ICdib3RoJykge1xuXHRcdFx0XHR0YS5zdHlsZS5yZXNpemUgPSAnaG9yaXpvbnRhbCc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdHlsZS5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcpIHtcblx0XHRcdFx0aGVpZ2h0T2Zmc2V0ID0gLShwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGFuZ2VPdmVyZmxvdyh2YWx1ZSkge1xuXHRcdFx0e1xuXHRcdFx0XHQvLyBDaHJvbWUvU2FmYXJpLXNwZWNpZmljIGZpeDpcblx0XHRcdFx0Ly8gV2hlbiB0aGUgdGV4dGFyZWEgeS1vdmVyZmxvdyBpcyBoaWRkZW4sIENocm9tZS9TYWZhcmkgZG8gbm90IHJlZmxvdyB0aGUgdGV4dCB0byBhY2NvdW50IGZvciB0aGUgc3BhY2Vcblx0XHRcdFx0Ly8gbWFkZSBhdmFpbGFibGUgYnkgcmVtb3ZpbmcgdGhlIHNjcm9sbGJhci4gVGhlIGZvbGxvd2luZyBmb3JjZXMgdGhlIG5lY2Vzc2FyeSB0ZXh0IHJlZmxvdy5cblx0XHRcdFx0dmFyIHdpZHRoID0gdGEuc3R5bGUud2lkdGg7XG5cdFx0XHRcdHRhLnN0eWxlLndpZHRoID0gJzBweCc7XG5cdFx0XHRcdC8vIEZvcmNlIHJlZmxvdzpcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXHRcdFx0XHR0YS5vZmZzZXRXaWR0aDtcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblx0XHRcdFx0dGEuc3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdH1cblxuXHRcdFx0b3ZlcmZsb3dZID0gdmFsdWU7XG5cblx0XHRcdGlmIChzZXRPdmVyZmxvd1kpIHtcblx0XHRcdFx0dGEuc3R5bGUub3ZlcmZsb3dZID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblx0XHRcdHZhciBzdGFydEhlaWdodCA9IHRhLnN0eWxlLmhlaWdodDtcblx0XHRcdHZhciBodG1sVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHRcdHZhciBib2R5VG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cdFx0XHR2YXIgb3JpZ2luYWxIZWlnaHQgPSB0YS5zdHlsZS5oZWlnaHQ7XG5cblx0XHRcdHRhLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcblxuXHRcdFx0dmFyIGVuZEhlaWdodCA9IHRhLnNjcm9sbEhlaWdodCArIGhlaWdodE9mZnNldDtcblxuXHRcdFx0aWYgKHRhLnNjcm9sbEhlaWdodCA9PT0gMCkge1xuXHRcdFx0XHQvLyBJZiB0aGUgc2Nyb2xsSGVpZ2h0IGlzIDAsIHRoZW4gdGhlIGVsZW1lbnQgcHJvYmFibHkgaGFzIGRpc3BsYXk6bm9uZSBvciBpcyBkZXRhY2hlZCBmcm9tIHRoZSBET00uXG5cdFx0XHRcdHRhLnN0eWxlLmhlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRhLnN0eWxlLmhlaWdodCA9IGVuZEhlaWdodCArICdweCc7XG5cblx0XHRcdC8vIHByZXZlbnRzIHNjcm9sbC1wb3NpdGlvbiBqdW1waW5nXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gaHRtbFRvcDtcblx0XHRcdGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gYm9keVRvcDtcblxuXHRcdFx0dmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpO1xuXG5cdFx0XHRpZiAoc3R5bGUuaGVpZ2h0ICE9PSB0YS5zdHlsZS5oZWlnaHQpIHtcblx0XHRcdFx0aWYgKG92ZXJmbG93WSAhPT0gJ3Zpc2libGUnKSB7XG5cdFx0XHRcdFx0Y2hhbmdlT3ZlcmZsb3coJ3Zpc2libGUnKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvdmVyZmxvd1kgIT09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0Y2hhbmdlT3ZlcmZsb3coJ2hpZGRlbicpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3RhcnRIZWlnaHQgIT09IHRhLnN0eWxlLmhlaWdodCkge1xuXHRcdFx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0XHRcdGV2dC5pbml0RXZlbnQoJ2F1dG9zaXplOnJlc2l6ZWQnLCB0cnVlLCBmYWxzZSk7XG5cdFx0XHRcdHRhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgZGVzdHJveSA9IChmdW5jdGlvbiAoc3R5bGUpIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGUpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGUpO1xuXHRcdFx0dGEucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWF1dG9zaXplLW9uJyk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSk7XG5cblx0XHRcdE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0dGEuc3R5bGVba2V5XSA9IHN0eWxlW2tleV07XG5cdFx0XHR9KTtcblx0XHR9KS5iaW5kKHRhLCB7XG5cdFx0XHRoZWlnaHQ6IHRhLnN0eWxlLmhlaWdodCxcblx0XHRcdHJlc2l6ZTogdGEuc3R5bGUucmVzaXplLFxuXHRcdFx0b3ZlcmZsb3dZOiB0YS5zdHlsZS5vdmVyZmxvd1ksXG5cdFx0XHRvdmVyZmxvd1g6IHRhLnN0eWxlLm92ZXJmbG93WCxcblx0XHRcdHdvcmRXcmFwOiB0YS5zdHlsZS53b3JkV3JhcCB9KTtcblxuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOmRlc3Ryb3knLCBkZXN0cm95KTtcblxuXHRcdC8vIElFOSBkb2VzIG5vdCBmaXJlIG9ucHJvcGVydHljaGFuZ2Ugb3Igb25pbnB1dCBmb3IgZGVsZXRpb25zLFxuXHRcdC8vIHNvIGJpbmRpbmcgdG8gb25rZXl1cCB0byBjYXRjaCBtb3N0IG9mIHRob3NlIGV2ZW50cy5cblx0XHQvLyBUaGVyZSBpcyBubyB3YXkgdGhhdCBJIGtub3cgb2YgdG8gZGV0ZWN0IHNvbWV0aGluZyBsaWtlICdjdXQnIGluIElFOS5cblx0XHRpZiAoJ29ucHJvcGVydHljaGFuZ2UnIGluIHRhICYmICdvbmlucHV0JyBpbiB0YSkge1xuXHRcdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGUpO1xuXHRcdH1cblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpO1xuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlKTtcblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTp1cGRhdGUnLCB1cGRhdGUpO1xuXHRcdHRhLnNldEF0dHJpYnV0ZSgnZGF0YS1hdXRvc2l6ZS1vbicsIHRydWUpO1xuXG5cdFx0aWYgKHNldE92ZXJmbG93WSkge1xuXHRcdFx0dGEuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG5cdFx0fVxuXHRcdGlmIChzZXRPdmVyZmxvd1gpIHtcblx0XHRcdHRhLnN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuXHRcdFx0dGEuc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG5cdFx0fVxuXG5cdFx0aW5pdCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVzdHJveSh0YSkge1xuXHRcdGlmICghKHRhICYmIHRhLm5vZGVOYW1lICYmIHRhLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSkgcmV0dXJuO1xuXHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRldnQuaW5pdEV2ZW50KCdhdXRvc2l6ZTpkZXN0cm95JywgdHJ1ZSwgZmFsc2UpO1xuXHRcdHRhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHVwZGF0ZSh0YSkge1xuXHRcdGlmICghKHRhICYmIHRhLm5vZGVOYW1lICYmIHRhLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSkgcmV0dXJuO1xuXHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRldnQuaW5pdEV2ZW50KCdhdXRvc2l6ZTp1cGRhdGUnLCB0cnVlLCBmYWxzZSk7XG5cdFx0dGEuZGlzcGF0Y2hFdmVudChldnQpO1xuXHR9XG5cblx0dmFyIGF1dG9zaXplID0gbnVsbDtcblxuXHQvLyBEbyBub3RoaW5nIGluIE5vZGUuanMgZW52aXJvbm1lbnQgYW5kIElFOCAob3IgbG93ZXIpXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93LmdldENvbXB1dGVkU3R5bGUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBmdW5jdGlvbiAoeCkge1xuXHRcdFx0XHRcdHJldHVybiBhc3NpZ24oeCwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBkZXN0cm95KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCB1cGRhdGUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF1dG9zaXplO1xufSk7IixudWxsLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7IiwiLy8gU2Ftc29uLkNvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvblxuLy8gVXNlZCB0byBzaW1wbGlmeSBjb21wb25lbnQgcmVuZGVyaW5nIGFuZCB0cmFuc2l0aW9ucyBpbiBzaW5nbGUgcGFnZSBhcHBzXG5cbnZhciBTYW1zb24gPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgU2hhcmVkID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyogb3B0aW9ucyBjYW4gaW5jbHVkZTpcbi8vIGVsIC0gdGhlIGlkIG9mIHRoZSBlbGVtZW50IHRoYXQgdGhlIHZpZXcgd2lsbCByZW5kZXIgaW50b1xuLy8gdGVtcGxhdGUvcmVuZGVyIC0gdGhlIGZ1bmN0aW9uIHRoYXQgb3V0cHV0cyBhbiBIVE1MIHN0cmluZyB0aGF0IGdldHMgYXR0YWNoZWQgdG8gdGhlIERPTVxuLy8gY29tcG9uZW50cyAtIGFueSBvdGhlciBjb21wb25lbnRzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC9yZWZyZXNoZWQgd2l0aCB0aGlzIGNvbXBvbmVudFxuLy8gZXZlbnRzL2RvbUV2ZW50cyAtIGFueSBldmVudExpc3RlbmVycyB0byBhdHRhY2ggdG8gRE9NIG5vZGVzXG4vLyBhcHBFdmVudHMgLSBhbnkgaW50ZXJuYWwgYXBwIGV2ZW50TGlzdGVuZXJzXG4vLyBiZWZvcmVSZW5kZXIgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZCAodXBkYXRlIG1vZGVscywgc29ydCBjb2xsZWN0aW9ucylcbi8vIGFmdGVyUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZCAoc2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UsIG1hcmtlZCBjaGVja2JveGVzIGFzIGNoZWNrZWQpXG4vLyBiZWZvcmVSZW1vdmUgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyByaWdodCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBmdWxseSBkZXN0cm95ZWQgKGNsZWFudXAgbW9kZWxzLCB1cGRhdGUgYWN0aXZpdHkgaGlzdG9yeSlcbi8vIGN1c3RvbS9leHRlbmQgLSBhbiBvYmplY3QgY29udGFpbmluZyBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgQ29tcG9uZW50IGluc3RhbmNlIGlmIHRoZXJlIGFyZSBubyBuYW1pbmcgY29uZmxpY3RzIHdpdGggcmVzZXJ2ZWQgcHJvcGVydGllc1xuKi9cblxuZnVuY3Rpb24gU2Ftc29uQ29tcG9uZW50KG9wdGlvbnMpIHtcblxuICAvLyBzZXQgdGhlIGVsZW1lbnQncyBzZWxlY3RvciB0aGF0IHdpbGwgZGV0ZXJtaW5lIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWRcbiAgdGhpcy5lbCA9IChvcHRpb25zLmVsLmNoYXJBdCgwKSA9PT0gXCIjXCIpID8gb3B0aW9ucy5lbC5zbGljZSgxKSA6IG9wdGlvbnMuZWw7XG5cbiAgLy8gc2V0IHRoZSBjb21wb25lbnQgZXZlbnRzIGlmIHRoZXkgYXJlIHNwZWNpZmllZFxuICB0aGlzLmRvbUV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzID8gb3B0aW9ucy5ldmVudHMgOiAob3B0aW9ucy5kb21FdmVudHMgfHwge30pO1xuICB0aGlzLmFwcEV2ZW50cyA9IG9wdGlvbnMuYXBwRXZlbnRzIHx8IHt9O1xuXG4gIC8vIHN1YmNvbXBvbmVudHNcbiAgdGhpcy5zZXRDb21wb25lbnRzID0gb3B0aW9ucy5zZXRDb21wb25lbnRzIHx8IGZ1bmN0aW9uKCkgeyByZXR1cm4gKG9wdGlvbnMuY29tcG9uZW50cyB8fCB7fSk7IH07XG4gIHRoaXMuY29tcG9uZW50cyA9IHRoaXMuc2V0Q29tcG9uZW50cygpO1xuICB0aGlzLl9jb21wb25lbnRzTG9hZGVkID0gZmFsc2U7XG5cbiAgLy8gc2V0SW5pdGlhbFN0YXRlIGZ1bmN0aW9uXG4gIHRoaXMuc2V0SW5pdGlhbFN0YXRlID0gb3B0aW9ucy5zZXRJbml0aWFsU3RhdGUgfHwgU2hhcmVkLmp1c3RSZXR1cm5PYmplY3Q7XG4gIHRoaXMuc3RhdGUgPSB7fTtcbiAgdGhpcy5faW5pdGlhbFN0YXRlU2V0ID0gZmFsc2U7XG4gIHRoaXMuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gIHRoaXMuX2xvYWRlZEV2ZW50cyA9IFtdO1xuXG4gIC8vIHNldCB0aGUgY29tcG9uZW50J3MgcmVuZGVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvdXRwdXQgYW4gaHRtbCBzdHJpbmdcbiAgLy8gaWYgbm8gcmVuZGVyIGZ1bmN0aW9uIHdhcyBwYXNzZWQgaW4sIHdlIGNoZWNrIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uXG4gIHRoaXMuX3RlbXBsYXRlID0gb3B0aW9ucy5yZW5kZXIgfHwgb3B0aW9ucy50ZW1wbGF0ZTtcblxuICAvLyBzZXQgdGhlIGJlZm9yZVJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmVmb3JlUmVuZGVyID0gb3B0aW9ucy5iZWZvcmVSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIGFmdGVyUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5hZnRlclJlbmRlciA9IG9wdGlvbnMuYWZ0ZXJSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIHJlbW92ZS9jbG9zZSBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkLCBvdGhlcndpc2UganVzdCBpbnZva2UgY2FsbGJhY2tcbiAgdGhpcy5iZWZvcmVSZW1vdmUgPSBvcHRpb25zLmJlZm9yZVJlbW92ZSB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIGFkZCBhbnkgcm91dGVyLXJlbGF0ZWQgdGFza3NcbiAgdGhpcy5fdXVpZCA9IHRoaXMuZWwgKyBcIi1cIiArIERhdGUubm93KCk7IC8vIHRoZSB1dWlkIGFsbG93cyB1cyB0byBlYXNpbHkgcmVmZXJlbmNlIHRoZSBhZGRlZCByb3V0ZXIgdGFza3NcbiAgdGhpcy5fcm91dGVyID0gb3B0aW9ucy5Sb3V0ZXIgfHwgb3B0aW9ucy5yb3V0ZXIgfHwge307XG4gIFNoYXJlZC5hZGRSb3V0ZXJUYXNrcyh0aGlzKTtcblxuICAvLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyBwYXNzZWQgaW50byB0aGUgY3VzdG9tIG9yIGV4dGVuZCBvYmplY3RcbiAgdmFyIGN1c3RvbSA9IG9wdGlvbnMuZXh0ZW5kIHx8IG9wdGlvbnMuY3VzdG9tIHx8IHt9O1xuICBVdGlscy5leHRlbmQodGhpcywgY3VzdG9tLCBTaGFyZWQucmVzZXJ2ZWQpO1xuXG59XG5cbi8vIEhhdmUgdGhlIFNhbXNvbkNvbXBvbmVudCBjbGFzcyBpbmhlcml0IGFueSBzaGFyZWQgbWV0aG9kcyBmcm9tIFBhZ2VDb21wb25lbnRCYXNlXG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl90eXBlID0gXCJDb21wb25lbnRcIjtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBTaGFyZWQuc2V0U3RhdGU7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLnJlc2V0U3RhdGUgPSBTaGFyZWQucmVzZXRTdGF0ZTtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2RvRmlyc3QgPSBTaGFyZWQuX2RvRmlyc3Q7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9sb2FkRXZlbnRzID0gU2hhcmVkLl9sb2FkRXZlbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fZGVzdHJveUV2ZW50cyA9IFNoYXJlZC5fZGVzdHJveUV2ZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2xvYWRDb21wb25lbnRzID0gU2hhcmVkLl9sb2FkQ29tcG9uZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3JlbmRlckNvbXBvbmVudHMgPSBTaGFyZWQuX3JlbmRlckNvbXBvbmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9kZXN0cm95Q29tcG9uZW50cyA9IFNoYXJlZC5fZGVzdHJveUNvbXBvbmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9maXhBdXRvRm9jdXNFbGVtZW50cyA9IFNoYXJlZC5fZml4QXV0b0ZvY3VzRWxlbWVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9yZW1vdmUgPSBTaGFyZWQuX3JlbW92ZTtcblxuLy8gcmVuZGVyIHRoZSBjb21wb25lbnQgdG8gdGhlIERPTVxuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLl9sb2FkQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZVJlbmRlclwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCFzZWxmLl9pbml0aWFsU3RhdGVTZXQpIHtcbiAgICAgICAgc2VsZi5zdGF0ZSA9IHNlbGYuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgIHNlbGYuX2luaXRpYWxTdGF0ZVNldCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgY29tcG9uZW50IGVsZW1lbnRcbiAgICAgIGlmICghc2VsZi5lbGVtZW50IHx8IChmb3JjZV91cGRhdGUgfHwgc2VsZi5fc3RhdGVDaGFuZ2VkKSkge1xuICAgICAgICBmb3JjZV91cGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxmLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxmLmVsKTtcblxuICAgICAgICBpZiAoIXNlbGYuZWxlbWVudCkge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJObyBlbGVtZW50IHdpdGggdGhlIGlkIFwiICsgc2VsZi5lbCArIFwiIGV4aXN0cyBpbiB0aGUgRE9NIHNvIHdlIHdpbGwgY3JlYXRlIGl0IGFuZCBhcHBlbmQgaXQgdG8gaXRzIHBhcmVudC5cIik7XG4gICAgICAgICAgc2VsZi5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBzZWxmLmVsZW1lbnQuaWQgPSBzZWxmLmVsO1xuXG4gICAgICAgICAgaWYgKHNlbGYuX3RlbXBsYXRlKSB7XG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucGFyZW50ICYmIHNlbGYucGFyZW50LmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlbGYucGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSBpcyBubyBwYXJlbnQgdG8gYXBwZW5kIFwiICsgc2VsZi5lbCArIFwiIHRvLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5fdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSBzZWxmLl90ZW1wbGF0ZShzZWxmLnN0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICBzZWxmLl9sb2FkRXZlbnRzKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNlbGYuX3JlbmRlckNvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJlc2V0IHN0YXRlQ2hhbmdlZFxuICAgICAgICAgIHNlbGYuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgc2VsZi5fZml4QXV0b0ZvY3VzRWxlbWVudHMoKTtcblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlclJlbmRlclwiLCBmdW5jdGlvbigpIHsgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpOyB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb25Db21wb25lbnQ7XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQWRkRXZlbnRzKHRhcmdldCkge1xuXG4gIHZhciBldmVudHMgPSB7fTsgdmFyIGVtcHR5ID0gW107XG5cbiAgLy8gc3RhcnQgbGlzdGVuaW5nXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIsIGNvbnRleHQpIHtcbiAgICAoZXZlbnRzW3R5cGVdID0gZXZlbnRzW3R5cGVdIHx8IFtdKS5wdXNoKFtoYW5kbGVyLCBjb250ZXh0XSk7XG4gIH07XG5cbiAgLy8gc3RvcCBsaXN0ZW5pbmdcbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICB0eXBlIHx8IChldmVudHMgPSB7fSlcbiAgICB2YXIgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSxcbiAgICBpID0gbGlzdC5sZW5ndGggPSBoYW5kbGVyID8gbGlzdC5sZW5ndGggOiAwXG4gICAgd2hpbGUoaS0tKSBoYW5kbGVyID09IGxpc3RbaV1bMF0gJiYgbGlzdC5zcGxpY2UoaSwxKVxuICB9O1xuXG4gIC8vIHNlbmQgdGhlIGV2ZW50IHRvIGFueW9uZSBsaXN0ZW5pbmdcbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgYXJncyA9IGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LCBpPTAsIGpcbiAgICB3aGlsZShqPWxpc3RbaSsrXSkgalswXS5hcHBseShqWzFdLCBhcmdzKVxuICB9O1xuXG59O1xuIiwiLyohXG4gKiBTYW1zb24uanNcbiAqIENvcHlyaWdodChjKSAyMDE1IFNhbSBEZWxnYWRvXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgJCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9xdW8uanMnKTtcbnZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jLWxpdGUnKTtcblxuLy8gcmVzZXJ2ZWQgcHJvcGVydGllcyBmb3IgdGhlIFNhbXNvbi5BcHAgb2JqZWN0LiBhbGwgcHJvcGVydGllcyBzdGFydGluZyB3aXRoIF8gYXJlIGFsc28gcmVzZXJ2ZWRcbnZhciByZXNlcnZlZCA9IFtcIiRcIiwgXCJET01cIiwgXCJEYXRhXCIsIFwic3R5bGVTaGVldFwiLCBcImJhc2VTdHlsZVwiLCBcInN0eWxlXCIsIFwiY29tcG9uZW50c1wiLCBcInNldENvbXBvbmVudHNcIiwgXCJSb3V0ZXJcIiwgXCJQYWdlc1wiLCBcIm9uXCIsIFwiZW1pdFwiLCBcIm9mZlwiXTtcblxuLy8gY3JlYXRlIHRoZSBTYW1zb24gb2JqZWN0IHRoYXQgd2lsbCBiZSBleHBvcnRlZFxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb24gPSB7fTtcblxuU2Ftc29uLlZFUlNJT04gPSAnMC4xLjYnOyAvLyBrZWVwIGluIHN5bmMgd2l0aCBwYWNrYWdlLmpzb25cblxuU2Ftc29uLiQgPSAkOyAvLyBhdHRhY2ggUXVvSlMgdG8gU2Ftc29uXG5cblNhbXNvbi5FdmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpOyAvLyBhIG1peGluIHRoYXQgd2lsbCBhdHRhY2ggb24sIG9mZiwgYW5kIGVtaXQgbWV0aG9kcyB0byBhbiBvYmplY3RcblxuU2Ftc29uLlJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG5TYW1zb24uY3JlYXRlUm91dGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgcm91dGVyID0gbmV3IFNhbXNvbi5Sb3V0ZXIob3B0aW9ucyk7XG4gIHJldHVybiByb3V0ZXI7XG59O1xuXG5TYW1zb24uUGFnZSA9IHJlcXVpcmUoJy4vcGFnZScpO1xuU2Ftc29uLmNyZWF0ZVBhZ2UgPSBmdW5jdGlvbihvcHRpb25zLCBhZGRfZXZlbnRzKSB7XG4gIHZhciBwYWdlID0gbmV3IFNhbXNvbi5QYWdlKG9wdGlvbnMpO1xuICBpZiAoYWRkX2V2ZW50cykgU2Ftc29uLkV2ZW50cyhwYWdlKTtcbiAgcmV0dXJuIHBhZ2U7XG59O1xuXG5TYW1zb24uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcblNhbXNvbi5jcmVhdGVDb21wb25lbnQgPSBmdW5jdGlvbihvcHRpb25zLCBhZGRfZXZlbnRzKSB7XG4gIHZhciBjb21wb25lbnQgPSBuZXcgU2Ftc29uLkNvbXBvbmVudChvcHRpb25zKTtcbiAgaWYgKGFkZF9ldmVudHMpIFNhbXNvbi5FdmVudHMoY29tcG9uZW50KTtcbiAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cbi8vIFNhbXNvbi5ET00gd2lsbCBjYWNoZSByZWZlcmVuY2VzIHRvIGFueSBTYW1zb24gY3JlYXRlZCBET00gZWxlbWVudHMgbGlrZSAjc2Ftc29uLWFwcFxuU2Ftc29uLkRPTSA9IHt9O1xuXG4vLyB0aGUgaW5zdGFudGlhdGVkIGFwcCB3aWxsIGJlIGF0dGFjaGVkIHRvIFNhbXNvbi5BcHAgZm9yIHF1aWNrIGFjY2Vzc1xuU2Ftc29uLkFwcDtcblxuLy8gb25seSBvbmUgU2Ftc29uIEFwcCBjYW4gZXhpc3QgYXQgYSB0aW1lLCBzbyBpZiBvbmUgaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkLCBzaW1wbHkgcmV0dXJuIGl0XG5TYW1zb24uY3JlYXRlQXBwID0gZnVuY3Rpb24oKSB7XG4gIGlmIChTYW1zb24uQXBwKSB7XG4gICAgcmV0dXJuIFNhbXNvbi5BcHA7XG4gIH0gZWxzZSB7XG4gICAgU2Ftc29uLkFwcCA9IG5ldyBTYW1zb25BcHAoKTtcbiAgICBTYW1zb24uRXZlbnRzKFNhbXNvbi5BcHApOyAvLyBtYWtlIHRoZSBtYWluIGFwcCBvYmplY3QgYW4gZXZlbnQgYnVzXG4gICAgU2Ftc29uLkFwcC5ET00gPSBTYW1zb24uRE9NO1xuICAgIHJldHVybiBTYW1zb24uQXBwO1xuICB9XG59O1xuXG4vLyB0aGUgU2Ftc29uQXBwIGNsYXNzXG5mdW5jdGlvbiBTYW1zb25BcHAoKSB7XG4gIHRoaXMuX2lzQ29uZmlndXJlZCA9IGZhbHNlO1xufVxuXG5TYW1zb25BcHAucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5faXNDb25maWd1cmVkKSB7XG5cbiAgICAvLyBhZGQgUXVvSlMgdG8gdGhlIGFwcCBvYmplY3QgZm9yIHF1aWNrIGFjY2Vzc1xuICAgIHRoaXMuJCA9ICQ7XG5cbiAgICAvLyBzZXR1cCB0aGUgYXBwJ3MgRGF0YSBvYmplY3RcbiAgICB0aGlzLkRhdGEgPSBvcHRpb25zLkRhdGEgfHwgb3B0aW9ucy5kYXRhIHx8IHt9O1xuXG4gICAgLy8gc2V0dXAgdGhlIGFwcCdzIHBhZ2VzXG4gICAgdGhpcy5QYWdlcyA9IG9wdGlvbnMuUGFnZXMgfHwgb3B0aW9ucy5wYWdlcyB8fCB7fTtcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyBiYXNlIGNvbXBvbmVudHNcbiAgICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgICB0aGlzLmNvbXBvbmVudHMgPSB0aGlzLnNldENvbXBvbmVudHMoKTtcblxuICAgIC8qIEZpcnN0IHNldHVwIHRoZSByZXF1aXJlZCBET00gZWxlbWVudHMgYW5kIGNvbXBvbmVudHMgb2YgYSBTYW1zb24gQXBwICovXG5cbiAgICAvLyBhZGQgdGhlIGNvcmUgZGl2cyB0byB0aGUgYm9keVxuICAgIC8vICNzYW1zb25fYXBwLCAjc2Ftc29uX3BhZ2VzLCAjc2Ftc29uX3BhZ2VfMSwgI3NhbXNvbl9wYWdlXzIsICNzYW1zb25fZmFkZWRfb3ZlcmxheSwgI3NhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9hcHAuaWQgPSBcInNhbXNvbl9hcHBcIjtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5pZCA9IFwic2Ftc29uX3BhZ2VzXCI7XG5cbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5pZCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5jbGFzc0xpc3QuYWRkKFwic2Ftc29uLXBhZ2VcIiwgXCJhY3RpdmVcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8xKTtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmlkID0gXCJzYW1zb25fcGFnZV8yXCI7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmNsYXNzTGlzdC5hZGQoXCJzYW1zb24tcGFnZVwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5hcHBlbmRDaGlsZChTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzIpO1xuXG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fYXBwKTsgLy8gYWRkIHRoZSBiYXNlIGRpdnMgdG8gdGhlIGJvZHlcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyByb3V0ZXIgYWZ0ZXIgbG9hZGluZyBhbnkgZXh0cmEgY29tcG9uZW50c1xuICAgIHRoaXMuUm91dGVyID0gU2Ftc29uLmNyZWF0ZVJvdXRlcihvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fSk7XG5cbiAgICAvLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyBwYXNzZWQgaW50byB0aGUgY3VzdG9tL2V4dGVuZCBvYmplY3RcbiAgICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gICAgVXRpbHMuZXh0ZW5kKHRoaXMsIGN1c3RvbSwgcmVzZXJ2ZWQpO1xuXG4gICAgLy8gTG9hZCBhbnkgb3RoZXIgY29tcG9uZW50c1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc2VsZi5jb21wb25lbnRzKTtcbiAgICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgICAgc2VsZltrZXldID0gU2Ftc29uLmNyZWF0ZUNvbXBvbmVudChzZWxmLmNvbXBvbmVudHNba2V5XSk7XG4gICAgICBzZWxmW2tleV0ucGFyZW50ID0ge2VsZW1lbnQ6IFNhbXNvbi5ET00uc2Ftc29uX2FwcCwgZGVsZWdhdGU6ICQoU2Ftc29uLkRPTS5zYW1zb25fYXBwKX07XG5cbiAgICAgIHNlbGZba2V5XS5fcmVuZGVyKGZhbHNlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2IoKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIHRoZSBTYW1zb24gQXBwIGlzIG5vdyBjb25maWd1cmVkXG4gICAgICBzZWxmLl9pc0NvbmZpZ3VyZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgU2Ftc29uIEFwcCBoYXMgYWxyZWFkeSBiZWVuIGNvbmZpZ3VyZWQhXCIpO1xuICB9XG5cbn07XG4iLCIvKipcbiAqIFF1b0pTIC0gTWljcm8gI0phdmFTY3JpcHQgTGlicmFyeSBmb3IgTW9iaWxlIERldmljZXMuXG4gKiBAdmVyc2lvbiB2My4wLjdcbiAqIEBsaW5rICAgIGh0dHA6Ly9xdW9qcy50YXBxdW8uY29tXG4gKiBAYXV0aG9yICBKYXZpIEppbWVuZXogVmlsbGFyIChAc295amF2aSkgKGh0dHBzOi8vdHdpdHRlci5jb20vc295amF2aSlcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdCxuPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKHQpe2Zvcih2YXIgbj0wLGU9dGhpcy5sZW5ndGg7ZT5uO24rKylpZihuIGluIHRoaXMmJnRoaXNbbl09PT10KXJldHVybiBuO3JldHVybi0xfTt0PWZ1bmN0aW9uKCl7dmFyIHQsbixlLHIsaSx1LG8sYSxjLGwscyxmLGgsZCxwLHYsZztyZXR1cm4gcj1bXSxhPU9iamVjdC5wcm90b3R5cGUsbz0vXlxccyo8KFxcdyt8ISlbXj5dKj4vLGU9WzEsOSwxMV0sbj0vXlxcLihbXFx3LV0rKSQvLHU9L14jW1xcd1xcZC1dKyQvLHM9L15bXFx3LV0rJC8sYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiksbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIiksaT17dHI6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpLHRib2R5OmMsdGhlYWQ6Yyx0Zm9vdDpjLHRkOmwsdGg6bCxcIipcIjpkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpfSx0PWZ1bmN0aW9uKG4sZSl7dmFyIHI7cmV0dXJuIG4/XCJmdW5jdGlvblwiPT09dC50b1R5cGUobik/dChkb2N1bWVudCkucmVhZHkobik6KHI9cChuLGUpLHYocixuKSk6digpfSx0LnF1ZXJ5PWZ1bmN0aW9uKHQsZSl7dmFyIHI7cmV0dXJuIG4udGVzdChlKT9yPXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShlLnJlcGxhY2UoXCIuXCIsXCJcIikpOnMudGVzdChlKT9yPXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dS50ZXN0KGUpJiZ0PT09ZG9jdW1lbnQ/KHI9dC5nZXRFbGVtZW50QnlJZChlLnJlcGxhY2UoXCIjXCIsXCJcIikpLHJ8fChyPVtdKSk6cj10LnF1ZXJ5U2VsZWN0b3JBbGwoZSksci5ub2RlVHlwZT9bcl06QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocil9LHQuZXh0ZW5kPWZ1bmN0aW9uKHQpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgZSxyO3I9W107Zm9yKGUgaW4gbilyLnB1c2godFtlXT1uW2VdKTtyZXR1cm4gcn0pLHR9LHQudG9UeXBlPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPWEudG9TdHJpbmcuY2FsbCh0KS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLyksbi5sZW5ndGg+MT9uWzFdLnRvTG93ZXJDYXNlKCk6XCJvYmplY3RcIn0sdC5lYWNoPWZ1bmN0aW9uKG4sZSl7dmFyIHIsaSx1LG8sYTtpZihpPXZvaWQgMCxvPXZvaWQgMCxcImFycmF5XCI9PT10LnRvVHlwZShuKSlmb3IoaT11PTAsYT1uLmxlbmd0aDthPnU7aT0rK3Upcj1uW2ldLGUuY2FsbChyLGkscik9PT0hMTtlbHNlIGZvcihvIGluIG4pZS5jYWxsKG5bb10sbyxuW29dKT09PSExO3JldHVybiBufSx0Lm1hcD1mdW5jdGlvbihuLGUpe3ZhciByLGksdSxvO2lmKG89W10scj12b2lkIDAsaT12b2lkIDAsXCJhcnJheVwiPT09dC50b1R5cGUobikpZm9yKHI9MDtyPG4ubGVuZ3RoOyl1PWUobltyXSxyKSxudWxsIT11JiZvLnB1c2godSkscisrO2Vsc2UgZm9yKGkgaW4gbil1PWUobltpXSxpKSxudWxsIT11JiZvLnB1c2godSk7cmV0dXJuIGgobyl9LHQubWl4PWZ1bmN0aW9uKCl7dmFyIHQsbixlLHIsaTtmb3IoZT17fSx0PTAscj1hcmd1bWVudHMubGVuZ3RoO3I+dDspe249YXJndW1lbnRzW3RdO2ZvcihpIGluIG4pZyhuLGkpJiZ2b2lkIDAhPT1uW2ldJiYoZVtpXT1uW2ldKTt0Kyt9cmV0dXJuIGV9LHY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gbnVsbD09biYmKG49XCJcIiksdD10fHxyLHQuc2VsZWN0b3I9bix0Ll9fcHJvdG9fXz12LnByb3RvdHlwZSx0fSxwPWZ1bmN0aW9uKG4scil7dmFyIGksdTtyZXR1cm4gaT1udWxsLHU9dC50b1R5cGUobiksXCJhcnJheVwiPT09dT9pPWYobik6XCJzdHJpbmdcIj09PXUmJm8udGVzdChuKT8oaT1kKG4udHJpbSgpLFJlZ0V4cC4kMSksbj1udWxsKTpcInN0cmluZ1wiPT09dT8oaT10LnF1ZXJ5KGRvY3VtZW50LG4pLHImJihpPTE9PT1pLmxlbmd0aD90LnF1ZXJ5KGlbMF0scik6dC5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdC5xdWVyeShpLHIpfSkpKTooZS5pbmRleE9mKG4ubm9kZVR5cGUpPj0wfHxuPT09d2luZG93KSYmKGk9W25dLG49bnVsbCksaX0sZD1mdW5jdGlvbihuLGUpe3ZhciByO3JldHVybiBudWxsPT1lJiYoZT1cIipcIiksZSBpbiBpfHwoZT1cIipcIikscj1pW2VdLHIuaW5uZXJIVE1MPVwiXCIrbix0LmVhY2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoci5jaGlsZE5vZGVzKSxmdW5jdGlvbigpe3JldHVybiByLnJlbW92ZUNoaWxkKHRoaXMpfSl9LGY9ZnVuY3Rpb24odCl7cmV0dXJuIHQuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P3Q6dm9pZCAwfSl9LGg9ZnVuY3Rpb24odCl7cmV0dXJuIHQubGVuZ3RoPjA/ci5jb25jYXQuYXBwbHkocix0KTp0fSxnPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGEuaGFzT3duUHJvcGVydHkuY2FsbCh0LG4pfSx2LnByb3RvdHlwZT10LmZuPXt9LHQuZm4uZWFjaD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuY2FsbChuLGUsbil9KSx0aGlzfSx0LmZuLmZpbHRlcj1mdW5jdGlvbihuKXtyZXR1cm4gdChyLmZpbHRlci5jYWxsKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIGUucGFyZW50Tm9kZSYmdC5xdWVyeShlLnBhcmVudE5vZGUsbikuaW5kZXhPZihlKT49MH0pKX0sdC5mbi5mb3JFYWNoPXIuZm9yRWFjaCx0LmZuLmluZGV4T2Y9ci5pbmRleE9mLHQudmVyc2lvbj1cIjMuMC43XCIsdH0oKSx0aGlzLlF1bz10aGlzLiQkPXQsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZSYmKG1vZHVsZS5leHBvcnRzPXQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gbj17VFlQRTpcIkdFVFwiLE1JTUU6XCJqc29uXCJ9LHI9e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdFwiLGpzb246XCJhcHBsaWNhdGlvbi9qc29uXCIseG1sOlwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLGh0bWw6XCJ0ZXh0L2h0bWxcIix0ZXh0OlwidGV4dC9wbGFpblwifSxlPTAsdC5hamF4U2V0dGluZ3M9e3R5cGU6bi5UWVBFLGFzeW5jOiEwLHN1Y2Nlc3M6e30sZXJyb3I6e30sY29udGV4dDpudWxsLGRhdGFUeXBlOm4uTUlNRSxoZWFkZXJzOnt9LHhocjpmdW5jdGlvbigpe3JldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0fSxjcm9zc0RvbWFpbjohMSx0aW1lb3V0OjB9LHQuYWpheD1mdW5jdGlvbihlKXt2YXIgcixvLGMsZjtpZihjPXQubWl4KHQuYWpheFNldHRpbmdzLGUpLGMudHlwZT09PW4uVFlQRT9jLnVybCs9dC5zZXJpYWxpemUoYy5kYXRhLFwiP1wiKTpjLmRhdGE9dC5zZXJpYWxpemUoYy5kYXRhKSxpKGMudXJsKSlyZXR1cm4gdShjKTtmPWMueGhyKCksZi5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtyZXR1cm4gND09PWYucmVhZHlTdGF0ZT8oY2xlYXJUaW1lb3V0KHIpLHMoZixjKSk6dm9pZCAwfSxmLm9wZW4oYy50eXBlLGMudXJsLGMuYXN5bmMpLGwoZixjKSxjLnRpbWVvdXQ+MCYmKHI9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBoKGYsYyl9LGMudGltZW91dCkpO3RyeXtmLnNlbmQoYy5kYXRhKX1jYXRjaChkKXtvPWQsZj1vLGEoXCJSZXNvdXJjZSBub3QgZm91bmRcIixmLGMpfXJldHVybiBmfSx0LmdldD1mdW5jdGlvbihuLGUscixpKXtyZXR1cm4gdC5hamF4KHt1cmw6bixkYXRhOmUsc3VjY2VzczpyLGRhdGFUeXBlOml9KX0sdC5wb3N0PWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiUE9TVFwiLHQsbixlLHIpfSx0LnB1dD1mdW5jdGlvbih0LG4sZSxyKXtyZXR1cm4gYyhcIlBVVFwiLHQsbixlLHIpfSx0W1wiZGVsZXRlXCJdPWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiREVMRVRFXCIsdCxuLGUscil9LHQuanNvbj1mdW5jdGlvbihuLGUscil7cmV0dXJuIHQuYWpheCh7dXJsOm4sZGF0YTplLHN1Y2Nlc3M6cn0pfSx0LnNlcmlhbGl6ZT1mdW5jdGlvbih0LG4pe3ZhciBlLHI7bnVsbD09biYmKG49XCJcIikscj1uO2ZvcihlIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShlKSYmKHIhPT1uJiYocis9XCImXCIpLHIrPWVuY29kZVVSSUNvbXBvbmVudChlKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQodFtlXSkpO3JldHVybiByPT09bj9cIlwiOnJ9LHU9ZnVuY3Rpb24obil7dmFyIHIsaSx1LG87cmV0dXJuIG4uYXN5bmM/KGk9XCJqc29ucFwiKyArK2UsdT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLG89e2Fib3J0OmZ1bmN0aW9uKCl7cmV0dXJuIHQodSkucmVtb3ZlKCksaSBpbiB3aW5kb3c/d2luZG93W2ldPXt9OnZvaWQgMH19LHI9dm9pZCAwLHdpbmRvd1tpXT1mdW5jdGlvbihlKXtyZXR1cm4gY2xlYXJUaW1lb3V0KHIpLHQodSkucmVtb3ZlKCksZGVsZXRlIHdpbmRvd1tpXSxmKGUsbyxuKX0sdS5zcmM9bi51cmwucmVwbGFjZShSZWdFeHAoXCI9XFxcXD9cIiksXCI9XCIraSksdChcImhlYWRcIikuYXBwZW5kKHUpLG4udGltZW91dD4wJiYocj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIGgobyxuKX0sbi50aW1lb3V0KSksbyk6Y29uc29sZS5lcnJvcihcIlF1b0pTLmFqYXg6IFVuYWJsZSB0byBtYWtlIGpzb25wIHN5bmNocm9ub3VzIGNhbGwuXCIpfSxzPWZ1bmN0aW9uKHQsbil7dC5zdGF0dXM+PTIwMCYmdC5zdGF0dXM8MzAwfHwwPT09dC5zdGF0dXM/bi5hc3luYyYmZihvKHQsbiksdCxuKTphKFwiUXVvSlMuYWpheDogVW5zdWNjZXNmdWwgcmVxdWVzdFwiLHQsbil9LGY9ZnVuY3Rpb24odCxuLGUpe2Uuc3VjY2Vzcy5jYWxsKGUuY29udGV4dCx0LG4pfSxhPWZ1bmN0aW9uKHQsbixlKXtlLmVycm9yLmNhbGwoZS5jb250ZXh0LHQsbixlKX0sbD1mdW5jdGlvbih0LG4pe3ZhciBlO24uY29udGVudFR5cGUmJihuLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl09bi5jb250ZW50VHlwZSksbi5kYXRhVHlwZSYmKG4uaGVhZGVycy5BY2NlcHQ9cltuLmRhdGFUeXBlXSk7Zm9yKGUgaW4gbi5oZWFkZXJzKXQuc2V0UmVxdWVzdEhlYWRlcihlLG4uaGVhZGVyc1tlXSl9LGg9ZnVuY3Rpb24odCxuKXt0Lm9ucmVhZHlzdGF0ZWNoYW5nZT17fSx0LmFib3J0KCksYShcIlF1b0pTLmFqYXg6IFRpbWVvdXQgZXhjZWVkZWRcIix0LG4pfSxjPWZ1bmN0aW9uKG4sZSxyLGksdSl7cmV0dXJuIHQuYWpheCh7dHlwZTpuLHVybDplLGRhdGE6cixzdWNjZXNzOmksZGF0YVR5cGU6dSxjb250ZW50VHlwZTpcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwifSl9LGk9ZnVuY3Rpb24odCl7cmV0dXJuIFJlZ0V4cChcIj1cXFxcP1wiKS50ZXN0KHQpfSxvPWZ1bmN0aW9uKHQsZSl7dmFyIHIsaTtpZihpPXQsdC5yZXNwb25zZVRleHQpe2lmKGUuZGF0YVR5cGU9PT1uLk1JTUUpdHJ5e2k9SlNPTi5wYXJzZSh0LnJlc3BvbnNlVGV4dCl9Y2F0Y2godSl7cj11LGk9cixhKFwiUXVvSlMuYWpheDogUGFyc2UgRXJyb3JcIix0LGUpfVwieG1sXCI9PT1lLmRhdGFUeXBlJiYoaT10LnJlc3BvbnNlWE1MKX1yZXR1cm4gaX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscjtyZXR1cm4gbj1bXCItd2Via2l0LVwiLFwiLW1vei1cIixcIi1tcy1cIixcIi1vLVwiLFwiXCJdLHQuZm4uYWRkQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC5hZGQobykpO3JldHVybiB1fSl9LHQuZm4ucmVtb3ZlQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC5yZW1vdmUobykpO3JldHVybiB1fSl9LHQuZm4udG9nZ2xlQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC50b2dnbGUobykpO3JldHVybiB1fSl9LHQuZm4uaGFzQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJnRoaXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHQpfSx0LmZuLmxpc3RDbGFzcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmxlbmd0aD4wP3RoaXNbMF0uY2xhc3NMaXN0OnZvaWQgMH0sdC5mbi5zdHlsZT10LmZuLmNzcz1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBudWxsIT1uP3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnN0eWxlW3RdPW59KTooZT10aGlzWzBdLGUuc3R5bGVbdF18fHIoZSx0KSl9LHQuZm4udmVuZG9yPWZ1bmN0aW9uKHQsZSl7dmFyIHIsaSx1LG87Zm9yKG89W10scj0wLGk9bi5sZW5ndGg7aT5yO3IrKyl1PW5bcl0sby5wdXNoKHRoaXMuc3R5bGUoXCJcIit1K3QsZSkpO3JldHVybiBvfSxyPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUodCxcIlwiKVtuXX0sZT1mdW5jdGlvbih0KXtyZXR1cm4gQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKSx0fX0odCksZnVuY3Rpb24odCl7cmV0dXJuIHQuZm4uYXR0cj1mdW5jdGlvbihuLGUpe3JldHVybiB0aGlzLmxlbmd0aD4wJiZcInN0cmluZ1wiPT09dC50b1R5cGUobik/bnVsbCE9ZT90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZXRBdHRyaWJ1dGUobixlKX0pOnRoaXNbMF0uZ2V0QXR0cmlidXRlKG4pOnZvaWQgMH0sdC5mbi5yZW1vdmVBdHRyPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmxlbmd0aD4wJiZcInN0cmluZ1wiPT09dC50b1R5cGUobik/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVtb3ZlQXR0cmlidXRlKG4pfSk6dm9pZCAwfSx0LmZuLmRhdGE9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdGhpcy5hdHRyKFwiZGF0YS1cIit0LG4pfSx0LmZuLnJlbW92ZURhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMucmVtb3ZlQXR0cihcImRhdGEtXCIrdCl9LHQuZm4udmFsPWZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlPXQudG9TdHJpbmcoKX0pOnRoaXMubGVuZ3RoPjA/dGhpc1swXS52YWx1ZTpudWxsfSx0LmZuLnNob3c9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpfSx0LmZuLmhpZGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIil9LHQuZm4uZm9jdXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1swXS5mb2N1cygpfSx0LmZuLmJsdXI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1swXS5ibHVyKCl9LHQuZm4ub2Zmc2V0PWZ1bmN0aW9uKCl7dmFyIHQsbjtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmKHQ9dGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxuPXtsZWZ0OnQubGVmdCt3aW5kb3cucGFnZVhPZmZzZXQsdG9wOnQudG9wK3dpbmRvdy5wYWdlWU9mZnNldCx3aWR0aDp0LndpZHRoLGhlaWdodDp0LmhlaWdodH0pLG59fSh0KSxmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG87cmV0dXJuIHI9bnVsbCxuPS9XZWJLaXRcXC8oW1xcZC5dKykvLGU9e0FuZHJvaWQ6LyhBbmRyb2lkKVxccysoW1xcZC5dKykvLGlwYWQ6LyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvLGlwaG9uZTovKGlQaG9uZVxcc09TKVxccyhbXFxkX10rKS8sQmxhY2tiZXJyeTovKEJsYWNrQmVycnl8QkIxMHxQbGF5Ym9vaykuKlZlcnNpb25cXC8oW1xcZC5dKykvLEZpcmVmb3hPUzovKE1vemlsbGEpLipNb2JpbGVbXlxcL10qXFwvKFtcXGRcXC5dKikvLHdlYk9TOi8od2ViT1N8aHB3T1MpW1xcc1xcL10oW1xcZC5dKykvfSx0LmlzTW9iaWxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW52aXJvbm1lbnQoKSxyLmlzTW9iaWxlfSx0LmVudmlyb25tZW50PWZ1bmN0aW9uKCl7dmFyIHQsbjtyZXR1cm4gcnx8KG49bmF2aWdhdG9yLnVzZXJBZ2VudCx0PXUobikscj17YnJvd3NlcjppKG4pLGlzTW9iaWxlOiEhdCxzY3JlZW46bygpLG9zOnR9KSxyfSxpPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPXQubWF0Y2gobiksZT9lWzBdOnR9LHU9ZnVuY3Rpb24odCl7dmFyIG4scixpO2ZvcihyIGluIGUpaWYoaT10Lm1hdGNoKGVbcl0pKXtuPXtuYW1lOlwiaXBob25lXCI9PT1yfHxcImlwYWRcIj09PXJ8fFwiaXBvZFwiPT09cj9cImlvc1wiOnIsdmVyc2lvbjppWzJdLnJlcGxhY2UoXCJfXCIsXCIuXCIpfTticmVha31yZXR1cm4gbn0sbz1mdW5jdGlvbigpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaCxkO3JldHVybiBuPTEsaT17fSxyPXtwcmV2ZW50RGVmYXVsdDpcImlzRGVmYXVsdFByZXZlbnRlZFwiLHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpcImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsc3RvcFByb3BhZ2F0aW9uOlwiaXNQcm9wYWdhdGlvblN0b3BwZWRcIn0sZT17dG91Y2hzdGFydDpcIm1vdXNlZG93blwiLHRvdWNobW92ZTpcIm1vdXNlbW92ZVwiLHRvdWNoZW5kOlwibW91c2V1cFwiLHRvdWNoOlwiY2xpY2tcIixvcmllbnRhdGlvbmNoYW5nZTpcInJlc2l6ZVwifSx1PS9jb21wbGV0ZXxsb2FkZWR8aW50ZXJhY3RpdmUvLHQuZm4ub249ZnVuY3Rpb24obixlLHIpe3JldHVybiBudWxsPT1lfHxcImZ1bmN0aW9uXCI9PT10LnRvVHlwZShlKT90aGlzLmJpbmQobixlKTp0aGlzLmRlbGVnYXRlKGUsbixyKX0sdC5mbi5vZmY9ZnVuY3Rpb24obixlLHIpe3JldHVybiBudWxsPT1lfHxcImZ1bmN0aW9uXCI9PT10LnRvVHlwZShlKT90aGlzLnVuYmluZChuLGUpOnRoaXMudW5kZWxlZ2F0ZShlLG4scil9LHQuZm4ucmVhZHk9ZnVuY3Rpb24obil7cmV0dXJuIHUudGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKT9uLmNhbGwodGhpcyx0KTp0LmZuLmFkZEV2ZW50KGRvY3VtZW50LFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7cmV0dXJuIG4uY2FsbCh0aGlzLHQpfSl9LHQuZm4uYmluZD1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSx0LG4pfSl9LHQuZm4udW5iaW5kPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBkKHRoaXMsdCxuKX0pfSx0LmZuLmRlbGVnYXRlPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGksdSl7cmV0dXJuIGgodSxlLHIsbixmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24ocil7dmFyIGksYTtyZXR1cm4gYT10KHIudGFyZ2V0KS5jbG9zZXN0KG4sdSkuZ2V0KDApLGE/KGk9dC5leHRlbmQobyhyKSx7Y3VycmVudFRhcmdldDphLGxpdmVGaXJlZDp1fSksZS5hcHBseShhLFtpXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpKSk6dm9pZCAwfX0pfSl9LHQuZm4udW5kZWxlZ2F0ZT1mdW5jdGlvbih0LG4sZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBkKHRoaXMsbixlLHQpfSl9LHQuZm4udHJpZ2dlcj1mdW5jdGlvbihuLGUscil7cmV0dXJuXCJzdHJpbmdcIj09PXQudG9UeXBlKG4pJiYobj1sKG4sZSkpLG51bGwhPXImJihuLm9yaWdpbmFsRXZlbnQ9ciksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudChuKX0pfSx0LmZuLmFkZEV2ZW50PWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyP3QuYWRkRXZlbnRMaXN0ZW5lcihuLGUsITEpOnQuYXR0YWNoRXZlbnQ/dC5hdHRhY2hFdmVudChcIm9uXCIrbixlKTp0W1wib25cIituXT1lfSx0LmZuLnJlbW92ZUV2ZW50PWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdC5yZW1vdmVFdmVudExpc3RlbmVyP3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihuLGUsITEpOnQuZGV0YWNoRXZlbnQ/dC5kZXRhY2hFdmVudChcIm9uXCIrbixlKTp0W1wib25cIituXT1udWxsfSxsPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudHNcIiksZS5pbml0RXZlbnQodCwhMCwhMCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCksbiYmKGUudG91Y2g9biksZX0saD1mdW5jdGlvbihuLGUscix1LG8pe3ZhciBsLHMsaCxkO3JldHVybiBlPWMoZSksaD1mKG4pLHM9aVtoXXx8KGlbaF09W10pLGw9byYmbyhyLGUpLGQ9e2V2ZW50OmUsY2FsbGJhY2s6cixzZWxlY3Rvcjp1LHByb3h5OmEobCxyLG4pLGRlbGVnYXRlOmwsaW5kZXg6cy5sZW5ndGh9LHMucHVzaChkKSx0LmZuLmFkZEV2ZW50KG4sZC5ldmVudCxkLnByb3h5KX0sZD1mdW5jdGlvbihuLGUscix1KXt2YXIgbztyZXR1cm4gZT1jKGUpLG89ZihuKSxzKG8sZSxyLHUpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGRlbGV0ZSBpW29dW2UuaW5kZXhdLHQuZm4ucmVtb3ZlRXZlbnQobixlLmV2ZW50LGUucHJveHkpfSl9LGY9ZnVuY3Rpb24odCl7cmV0dXJuIHQuX2lkfHwodC5faWQ9bisrKX0sYz1mdW5jdGlvbihuKXt2YXIgcjtyZXR1cm4gcj0oXCJmdW5jdGlvblwiPT10eXBlb2YgdC5pc01vYmlsZT90LmlzTW9iaWxlKCk6dm9pZCAwKT9uOmVbbl0scnx8bn0sYT1mdW5jdGlvbih0LG4sZSl7dmFyIHI7cmV0dXJuIG49dHx8bixyPWZ1bmN0aW9uKHQpe3ZhciByO3JldHVybiByPW4uYXBwbHkoZSxbdF0uY29uY2F0KHQuZGF0YSkpLHI9PT0hMSYmdC5wcmV2ZW50RGVmYXVsdCgpLHJ9fSxzPWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybihpW3RdfHxbXSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiEoIXR8fG4mJnQuZXZlbnQhPT1ufHxlJiZ0LmNhbGxiYWNrIT09ZXx8ciYmdC5zZWxlY3RvciE9PXIpfSl9LG89ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC5leHRlbmQoe29yaWdpbmFsRXZlbnQ6bn0sbiksdC5lYWNoKHIsZnVuY3Rpb24odCxyKXtyZXR1cm4gZVt0XT1mdW5jdGlvbigpe3JldHVybiB0aGlzW3JdPWZ1bmN0aW9uKCl7cmV0dXJuITB9LG5bdF0uYXBwbHkobixhcmd1bWVudHMpfSxlW3JdPWZ1bmN0aW9uKCl7cmV0dXJuITF9fSksZX19KHQpLGZ1bmN0aW9uKHQpe3JldHVybiB0LmZuLnRleHQ9ZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXQ/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGV4dENvbnRlbnQ9dH0pOnRoaXMubGVuZ3RoPjA/dGhpc1swXS50ZXh0Q29udGVudDpcIlwifSx0LmZuLmh0bWw9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIG51bGwhPW4/KGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuXCJzdHJpbmdcIj09PWU/dGhpcy5pbm5lckhUTUw9bjpcImFycmF5XCI9PT1lP24uZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHQobikuaHRtbChlKX19KHRoaXMpKTp0aGlzLmlubmVySFRNTCs9dChuKS5odG1sKCl9KSk6dGhpcy5sZW5ndGg+MD90aGlzWzBdLmlubmVySFRNTDpcIlwifSx0LmZuLnJlbW92ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9dGhpcy5wYXJlbnROb2RlP3RoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTp2b2lkIDB9KX0sdC5mbi5lbXB0eT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbm5lckhUTUw9bnVsbH0pfSx0LmZuLmFwcGVuZD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm5cInN0cmluZ1wiPT09ZT90aGlzLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLG4pOlwiYXJyYXlcIj09PWU/bi5mb3JFYWNoKGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdChuKS5hcHBlbmQoZSl9fSh0aGlzKSk6dGhpcy5hcHBlbmRDaGlsZChuKX0pfSx0LmZuLnByZXBlbmQ9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuXCJzdHJpbmdcIj09PWU/dGhpcy5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsbik6XCJhcnJheVwiPT09ZT9uLmVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuaW5zZXJ0QmVmb3JlKGUsdC5maXJzdENoaWxkKX19KHRoaXMpKTp0aGlzLmluc2VydEJlZm9yZShuLHRoaXMuZmlyc3RDaGlsZCl9KX0sdC5mbi5yZXBsYWNlV2l0aD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnROb2RlP1wic3RyaW5nXCI9PT1lP3RoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlQmVnaW5cIixuKTpcImFycmF5XCI9PT1lP24uZWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24obixlKXtyZXR1cm4gdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHQpfX0odGhpcykpOnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobix0aGlzKTp2b2lkIDB9KSx0aGlzLnJlbW92ZSgpfX0odCksZnVuY3Rpb24obil7dmFyIGUscixpLHU7cmV0dXJuIGU9XCJwYXJlbnROb2RlXCIsbi5mbi5maW5kPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiByPTE9PT10aGlzLmxlbmd0aD90LnF1ZXJ5KHRoaXNbMF0sZSk6dGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdC5xdWVyeSh0aGlzLGUpfSksbihyKX0sbi5mbi5wYXJlbnQ9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49dD9pKHRoaXMpOnRoaXMuaW5zdGFuY2UoZSkscihuLHQpfSxuLmZuLmNoaWxkcmVuPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPXRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuY2hpbGRyZW4pfSkscihuLHQpfSxuLmZuLnNpYmxpbmdzPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPXRoaXMubWFwKGZ1bmN0aW9uKHQsbil7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG4ucGFyZW50Tm9kZS5jaGlsZHJlbikuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0IT09bn0pfSkscihuLHQpfSxuLmZuLmdldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpc1t0XXx8bnVsbH0sbi5mbi5maXJzdD1mdW5jdGlvbigpe3JldHVybiBuKHRoaXNbMF0pfSxuLmZuLmxhc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbih0aGlzW3RoaXMubGVuZ3RoLTFdKX0sbi5mbi5jbG9zZXN0PWZ1bmN0aW9uKHQsZSl7dmFyIHIsaTtmb3IoaT10aGlzWzBdLHI9bih0KSxyLmxlbmd0aHx8KGk9bnVsbCk7aSYmci5pbmRleE9mKGkpPDA7KWk9aSE9PWUmJmkhPT1kb2N1bWVudCYmaS5wYXJlbnROb2RlO3JldHVybiBuKGkpfSxuLmZuLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdS5jYWxsKHRoaXMsXCJuZXh0U2libGluZ1wiKX0sbi5mbi5wcmV2PWZ1bmN0aW9uKCl7cmV0dXJuIHUuY2FsbCh0aGlzLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuLmZuLmluc3RhbmNlPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzW3RdfSl9LG4uZm4ubWFwPWZ1bmN0aW9uKHQpe3JldHVybiBuLm1hcCh0aGlzLGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuY2FsbChuLGUsbil9KX0saT1mdW5jdGlvbih0KXt2YXIgZTtmb3IoZT1bXTt0Lmxlbmd0aD4wOyl0PW4ubWFwKHQsZnVuY3Rpb24odCl7cmV0dXJuIHQ9dC5wYXJlbnROb2RlLHQhPT1kb2N1bWVudCYmZS5pbmRleE9mKHQpPDA/KGUucHVzaCh0KSx0KTp2b2lkIDB9KTtyZXR1cm4gZX0scj1mdW5jdGlvbih0LGUpe3JldHVybiBudWxsIT1lP24odCkuZmlsdGVyKGUpOm4odCl9LHU9ZnVuY3Rpb24odCl7dmFyIGU7Zm9yKGU9dGhpc1swXVt0XTtlJiYxIT09ZS5ub2RlVHlwZTspZT1lW3RdO3JldHVybiBuKGUpfX0odCksdC5HZXN0dXJlcz1mdW5jdGlvbih0KXt2YXIgZSxyLGksdSxvLGEsYyxsLHMsZixoLGQscCx2O3JldHVybiBkPSExLGw9e30sbz1udWxsLGY9bnVsbCxpPVtcImlucHV0XCIsXCJzZWxlY3RcIixcInRleHRhcmVhXCJdLHA9ZnVuY3Rpb24odCl7cmV0dXJuIGxbdC5uYW1lXT10LmhhbmRsZXIsZSh0LmV2ZW50cyl9LHY9ZnVuY3Rpb24obixlLHIpe3JldHVybiB0KG4pLnRyaWdnZXIoZSxyLGYpfSxoPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPSh0LnNyY0VsZW1lbnR8fHQudGFyZ2V0KS50YWdOYW1lLnRvTG93ZXJDYXNlKCksbi5jYWxsKGksZSk+PTA/dC5zdG9wUHJvcGFnYXRpb24oKTooZD0hMCxmPXR8fGV2ZW50LG89YSh0KSxjKFwic3RhcnRcIix0LnRhcmdldCxvKSl9LHM9ZnVuY3Rpb24odCl7cmV0dXJuIGQ/KGY9dHx8ZXZlbnQsbz1hKHQpLG8ubGVuZ3RoPjEmJmYucHJldmVudERlZmF1bHQoKSxjKFwibW92ZVwiLHQudGFyZ2V0LG8pKTp2b2lkIDB9LHU9ZnVuY3Rpb24odCl7cmV0dXJuIGQ/KGY9dHx8ZXZlbnQsYyhcImVuZFwiLHQudGFyZ2V0LG8pLGQ9ITEpOnZvaWQgMH0scj1mdW5jdGlvbih0KXtyZXR1cm4gZD0hMSxjKFwiY2FuY2VsXCIpfSxlPWZ1bmN0aW9uKG4pe3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIHQuZm5bbl09ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZG9jdW1lbnQuYm9keSkuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixuLGUpfX0pLHRoaXN9LGM9ZnVuY3Rpb24odCxuLGUpe3ZhciByLGksdTt1PVtdO2ZvcihpIGluIGwpcj1sW2ldLHJbdF0mJnUucHVzaChyW3RdLmNhbGwocixuLGUpKTtyZXR1cm4gdX0sYT1mdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1O2ZvcihyPXQudG91Y2hlc3x8W3RdLGk9W10sbj0wLGU9ci5sZW5ndGg7ZT5uO24rKyl1PXJbbl0saS5wdXNoKHt4OnUucGFnZVgseTp1LnBhZ2VZfSk7cmV0dXJuIGl9LHQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7dmFyIG47cmV0dXJuIG49dChkb2N1bWVudC5ib2R5KSxuLmJpbmQoXCJ0b3VjaHN0YXJ0XCIsaCksbi5iaW5kKFwidG91Y2htb3ZlXCIscyksbi5iaW5kKFwidG91Y2hlbmRcIix1KSxuLmJpbmQoXCJ0b3VjaGNhbmNlbFwiLHIpfSkse2FkZDpwLHRyaWdnZXI6dn19KHQpLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwiYmFzaWNcIixldmVudHM6W1widG91Y2hcIixcImhvbGRcIixcImRvdWJsZVRhcFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gZT0xNSxuPXtUQVA6MjAwLERPVUJMRV9UQVA6NDAwLEhPTEQ6NDAwfSxpPW51bGwsYz0hMCxhPW51bGwsbz1udWxsLHU9bnVsbCxoPWZ1bmN0aW9uKGUscil7cmV0dXJuIDE9PT1yLmxlbmd0aD8obz17dGltZTpuZXcgRGF0ZSx4OnJbMF0ueCx5OnJbMF0ueX0sYT1lLGk9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiB0LnRyaWdnZXIoZSxcImhvbGRcIixyWzBdKX0sbi5IT0xEKSk6bCgpfSxmPWZ1bmN0aW9uKHQsbil7dmFyIGk7cmV0dXJuIG51bGwhPT1vJiYoaT1yKG8sblswXSksaS54PmV8fGkueT5lfHxuLmxlbmd0aD4xKT9sKCk6dm9pZCAwfSxzPWZ1bmN0aW9uKGUsYSl7dmFyIGMscztpZihvKXJldHVybiBjPXIobyxhWzBdKSwwIT09Yy54fHwwIT09Yy55P2woKTooY2xlYXJUaW1lb3V0KGkpLHM9bmV3IERhdGUscy1vLnRpbWU8bi5UQVA/cy11PG4uRE9VQkxFX1RBUD8odC50cmlnZ2VyKGUsXCJkb3VibGVUYXBcIixhWzBdKSx1PW51bGwpOih1PXMsdC50cmlnZ2VyKGUsXCJ0b3VjaFwiLGFbMF0pKTp2b2lkIDApfSxsPWZ1bmN0aW9uKCl7cmV0dXJuIG89bnVsbCxjPSExLGNsZWFyVGltZW91dChpKX0scj1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPXt4Om4ueC10LngseTpuLnktdC55fX0se3N0YXJ0OmgsbW92ZTpmLGVuZDpzLGNhbmNlbDpsfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcImRyYWdcIixldmVudHM6W1wiZHJhZ1wiLFwiZHJhZ2dpbmdcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGg7cmV0dXJuIG49d2luZG93LmRldmljZVBpeGVsUmF0aW8+PTI/MTU6MjAsYz1udWxsLG89bnVsbCxhPW51bGwsdT1udWxsLGg9ZnVuY3Rpb24odCxuKXtyZXR1cm4gbi5sZW5ndGg+PTI/KGM9dCxvPW4ubGVuZ3RoLGE9ZShuKSk6dm9pZCAwfSxmPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIG4ubGVuZ3RoPT09bz8oZT1yKG4pLHU9e3RvdWNoZXM6bixkZWx0YTplfSxpKCEwKSk6dm9pZCAwfSxsPXM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYSYmdT8oaSghMSksbz1udWxsLGE9bnVsbCx1PW51bGwpOnZvaWQgMH0scj1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj1lKHQpLHt4Om4ueC1hLngseTpuLnktYS55fX0sZT1mdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1O2ZvcihpPTAsdT0wLG49MCxlPXQubGVuZ3RoO2U+bjtuKyspcj10W25dLGkrPXBhcnNlSW50KHIueCksdSs9cGFyc2VJbnQoci55KTtyZXR1cm57eDppL3QubGVuZ3RoLHk6dS90Lmxlbmd0aH19LGk9ZnVuY3Rpb24oZSl7cmV0dXJuIGU/dC50cmlnZ2VyKGMsXCJkcmFnZ2luZ1wiLHUpOk1hdGguYWJzKHUuZGVsdGEueCk+bnx8TWF0aC5hYnModS5kZWx0YS55KT5uP3QudHJpZ2dlcihjLFwiZHJhZ1wiLHUpOnZvaWQgMH0se3N0YXJ0OmgsbW92ZTpmLGVuZDpzfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInBpbmNoXCIsZXZlbnRzOltcInBpbmNoXCIsXCJwaW5jaGluZ1wiLFwicGluY2hJblwiLFwicGluY2hPdXRcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscztyZXR1cm4gbj13aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbz49Mj8xNToyMCxvPW51bGwsdT1udWxsLGk9bnVsbCxzPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDI9PT1uLmxlbmd0aD8obz10LHU9cihuWzBdLG5bMV0pKTp2b2lkIDB9LGw9ZnVuY3Rpb24odCxuKXt2YXIgbztyZXR1cm4gdSYmMj09PW4ubGVuZ3RoPyhvPXIoblswXSxuWzFdKSxpPXt0b3VjaGVzOm4sZGVsdGE6by11fSxlKCEwKSk6dm9pZCAwfSxhPWM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdSYmaT8oZSghMSksdT1udWxsLGk9bnVsbCk6dm9pZCAwfSxyPWZ1bmN0aW9uKHQsbil7cmV0dXJuIE1hdGguc3FydCgobi54LXQueCkqKG4ueC10LngpKyhuLnktdC55KSoobi55LXQueSkpfSxlPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiBlP3QudHJpZ2dlcihvLFwicGluY2hpbmdcIixpKTpNYXRoLmFicyhpLmRlbHRhKT5uPyh0LnRyaWdnZXIobyxcInBpbmNoXCIsaSkscj1pLmRlbHRhPjA/XCJwaW5jaE91dFwiOlwicGluY2hJblwiLHQudHJpZ2dlcihvLHIsaSkpOnZvaWQgMH0se3N0YXJ0OnMsbW92ZTpsLGVuZDpjfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInJvdGF0aW9uXCIsZXZlbnRzOltcInJvdGF0ZVwiLFwicm90YXRpbmdcIixcInJvdGF0ZUxlZnRcIixcInJvdGF0ZVJpZ2h0XCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoLGQ7cmV0dXJuIG49NSxlPTIwLGw9bnVsbCx1PTAsYz1udWxsLGk9bnVsbCxkPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDI9PT1uLmxlbmd0aD8obD10LHU9MCxjPW8oblswXSxuWzFdKSk6dm9pZCAwfSxoPWZ1bmN0aW9uKHQsbil7dmFyIGw7cmV0dXJuIGMmJjI9PT1uLmxlbmd0aD8obD1vKG5bMF0sblsxXSktYyxpJiZNYXRoLmFicyhpLmRlbHRhLWwpPmUmJihsKz0zNjAqYShpLmRlbHRhKSksTWF0aC5hYnMobCk+MzYwJiYodSsrLGwtPTM2MCphKGkuZGVsdGEpKSxpPXt0b3VjaGVzOm4sZGVsdGE6bCxyb3RhdGlvbnNDb3VudDp1fSxyKCEwKSk6dm9pZCAwfSxzPWY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYyYmaT8ocighMSksbD1udWxsLHU9MCxjPW51bGwsaT1udWxsLGM9bnVsbCk6dm9pZCAwfSxhPWZ1bmN0aW9uKHQpe3JldHVybiAwPnQ/LTE6MX0sbz1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPU1hdGguYXRhbjIodC55LW4ueSx0Lngtbi54KSwxODAqKDA+ZT9lKzIqTWF0aC5QSTplKS9NYXRoLlBJfSxyPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiBlP3QudHJpZ2dlcihsLFwicm90YXRpbmdcIixpKTpNYXRoLmFicyhpLmRlbHRhKT5uPyh0LnRyaWdnZXIobCxcInJvdGF0ZVwiLGkpLHI9aS5kZWx0YT4wP1wicm90YXRlUmlnaHRcIjpcInJvdGF0ZUxlZnRcIix0LnRyaWdnZXIobCxyLGkpKTp2b2lkIDB9LHtzdGFydDpkLG1vdmU6aCxlbmQ6Zn19KHQuR2VzdHVyZXMpfSksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJzd2lwZVwiLGV2ZW50czpbXCJzd2lwZVwiLFwic3dpcGVMZWZ0XCIsXCJzd2lwZVJpZ2h0XCIsXCJzd2lwZVVwXCIsXCJzd2lwZURvd25cIixcInN3aXBpbmdcIixcInN3aXBpbmdIb3Jpem9udGFsXCIsXCJzd2lwaW5nVmVydGljYWxcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmO3JldHVybiBuPU1hdGgucm91bmQoMjAvd2luZG93LmRldmljZVBpeGVsUmF0aW8pLGE9bnVsbCx1PW51bGwsbz1udWxsLGk9bnVsbCxmPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDE9PT1uLmxlbmd0aD8oYT10LHU9blswXSxpPW51bGwpOnZvaWQgMH0scz1mdW5jdGlvbih0LG4pe3ZhciByLG87cmV0dXJuIDE9PT1uLmxlbmd0aD8ocj17eDpuWzBdLngtdS54LHk6blswXS55LXUueX0sbz1udWxsPT09aSxpPXt4Om5bMF0ueCx5Om5bMF0ueSxkZWx0YTpyfSxlKCEwLG8pKTppPW51bGx9LGM9bD1mdW5jdGlvbih0LG4pe3ZhciByO3JldHVybiBudWxsPT1pJiZuLmxlbmd0aD49MSYmKHI9e3g6blswXS54LXUueCx5Om5bMF0ueS11Lnl9LGk9e3g6blswXS54LHk6blswXS55LGRlbHRhOnJ9KSxpPyhlKCExKSxpPW51bGwpOnZvaWQgMH0sZT1mdW5jdGlvbihlLHUpe3ZhciBjLGwscyxmLGg7aWYobnVsbD09dSYmKHU9ITEpLGUpcmV0dXJuIHUmJihvPXIoaS5kZWx0YS54LGkuZGVsdGEueSkpLG51bGwhPT1vJiZ0LnRyaWdnZXIoYSxcInN3aXBpbmdcIitvLGkpLHQudHJpZ2dlcihhLFwic3dpcGluZ1wiLGkpO2lmKGw9W10sTWF0aC5hYnMoaS5kZWx0YS55KT5uP2wucHVzaChpLmRlbHRhLnk8MD9cIlVwXCI6XCJEb3duXCIpOk1hdGguYWJzKGkuZGVsdGEueCk+biYmbC5wdXNoKGkuZGVsdGEueDwwP1wiTGVmdFwiOlwiUmlnaHRcIiksbC5sZW5ndGgpe2Zvcih0LnRyaWdnZXIoYSxcInN3aXBlXCIsaSksaD1bXSxzPTAsZj1sLmxlbmd0aDtmPnM7cysrKWM9bFtzXSxoLnB1c2godC50cmlnZ2VyKGEsXCJzd2lwZVwiK2MsaSkpO3JldHVybiBofX0scj1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPW51bGwsTWF0aC5yb3VuZChNYXRoLmFicyh0L24pKT49Mj9lPVwiSG9yaXpvbnRhbFwiOk1hdGgucm91bmQoTWF0aC5hYnMobi90KSk+PTImJihlPVwiVmVydGljYWxcIiksZX0se3N0YXJ0OmYsbW92ZTpzLGVuZDpsfX0odC5HZXN0dXJlcyl9KX0pLmNhbGwodGhpcyk7XG4iLCIvLyBTYW1zb24uUGFnZSBjb25zdHJ1Y3RvciBmdW5jdGlvblxuLy8gVXNlZCB0byBzaW1wbGlmeSBwYWdlIHJlbmRlcmluZyBhbmQgdHJhbnNpdGlvbnMgaW4gc2luZ2xlIHBhZ2UgYXBwc1xuXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIFNoYXJlZCA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qIG9wdGlvbnMgY2FuIGluY2x1ZGU6XG4vLyBwYXRoIC0gdGhlIHJvdXRlciBwYXRoIG9mIHRoZSBwYWdlXG4vLyBzdWJQYWdlT2YgLSBhbiBvcHRpb25hbCBwYXJlbnQgcGFnZSB0aGF0IGlzIHRoZSBzdGFydCBvZiBhIHNwZWNpZmljIGNhdGVnb3J5IC0gZXg6IFVzZXIgQmlvIFBhZ2UgaXMgc3ViUGFnZU9mIG9mIFByb2ZpbGUgUGFnZVxuLy8gcHJldmlvdXNQYWdlIC0gYW4gb3B0aW9uYWwgcHJldmlvdXMgcGFnZSB0byBtYWtlIGdvaW5nIGJhY2sgZWFzaWVyXG4vLyBiYWNrU2FmZSAtIGZhbHNlIGJ5IGRlZmF1bHQuIHNldCB0byB0cnVlIGlmIGl0IGlzIHNhZmUgdG8gZ28gYmFjayB0byB0aGlzIHBhZ2UgZnJvbSBhbnkgb3RoZXIgcGFnZSBpbiB0aGUgYXBwXG4vLyB0ZW1wbGF0ZS9yZW5kZXIgLSB0aGUgZnVuY3Rpb24gdGhhdCBvdXRwdXRzIGFuIEhUTUwgc3RyaW5nIHRoYXQgZ2V0cyBhdHRhY2hlZCB0byB0aGUgRE9NXG4vLyBjb21wb25lbnRzIC0gYW55IG90aGVyIGNvbXBvbmVudHMgdGhhdCBzaG91bGQgYmUgbG9hZGVkL3JlZnJlc2hlZCB3aXRoIHRoZSBwYWdlXG4vLyBldmVudHMgLSBhbnkgZXZlbnRzIHRvIGF0dGFjaCB0byB0aGUgcGFnZVxuLy8gYmVmb3JlUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYmVmb3JlIHRoZSBwYWdlIGlzIHJlbmRlcmVkICh1cGRhdGUgbW9kZWxzLCBzb3J0IGNvbGxlY3Rpb25zKVxuLy8gYWZ0ZXJSZW5kZXIgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyBhZnRlciB0aGUgcGFnZSBpcyByZW5kZXJlZCAoc2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UsIG1hcmtlZCBjaGVja2JveGVzIGFzIGNoZWNrZWQpXG4vLyBiZWZvcmVSZW1vdmUgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyByaWdodCBiZWZvcmUgdGhlIHBhZ2UgaXMgZnVsbHkgZGVzdHJveWVkIChjbGVhbnVwIG1vZGVscywgdXBkYXRlIGFjdGl2aXR5IGhpc3RvcnkpXG4vLyBjdXN0b20vZXh0ZW5kIC0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgY3VzdG9tIG1ldGhvZHMvcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIFBhZ2UgaW5zdGFuY2UgaWYgdGhlcmUgYXJlIG5vIG5hbWluZyBjb25mbGljdHMgd2l0aCByZXNlcnZlZCBwcm9wZXJ0aWVzXG4qL1xuXG5mdW5jdGlvbiBTYW1zb25QYWdlKG9wdGlvbnMpIHtcblxuICAvLyBzZXQgdGhlIHBhdGggb2YgdGhlIHBhZ2VcbiAgdGhpcy5wYXRoID0gb3B0aW9ucy5wYXRoO1xuXG4gIC8vIHN1YlBhZ2VPZiBpcyBmYWxzZSBpZiBpdCBpcyBhIHRvcC1sZXZlbCBwYWdlLCBvdGhlcndpc2UgaXQgaXMgdGhlIG5hbWUgb2YgdGhlIHRvcC1sZXZlbCBwYWdlIGl0IGlzIGxpbmtlZCB0b1xuICB0aGlzLnN1YlBhZ2VPZiA9IG9wdGlvbnMuc3ViUGFnZU9mIHx8IGZhbHNlO1xuXG4gIC8vIHNldCB0aGUgcHJldmlvdXNQYWdlIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLnByZXZpb3VzUGFnZSA9IG9wdGlvbnMucHJldmlvdXNQYWdlIHx8IGZhbHNlO1xuXG4gIC8vIHNldCB0aGUgYmFja0FuaW1hdGlvbiBpZiBpdCBpcyBzcGVjaWZpZWRcbiAgdGhpcy5iYWNrQW5pbWF0aW9uID0gb3B0aW9ucy5iYWNrQW5pbWF0aW9uIHx8IGZhbHNlO1xuXG4gIC8vIHNldCBiYWNrU2FmZSBpZiBpdCBpcyBzcGVjaWZpZWRcbiAgdGhpcy5iYWNrU2FmZSA9IG9wdGlvbnMuYmFja1NhZmUgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBwYWdlIGV2ZW50cyBpZiB0aGV5IGFyZSBzcGVjaWZpZWRcbiAgdGhpcy5kb21FdmVudHMgPSBvcHRpb25zLmV2ZW50cyA/IG9wdGlvbnMuZXZlbnRzIDogKG9wdGlvbnMuZG9tRXZlbnRzIHx8IHt9KTtcbiAgdGhpcy5hcHBFdmVudHMgPSBvcHRpb25zLmFwcEV2ZW50cyB8fCB7fTtcblxuICAvLyBzZXR1cCB0aGUgcGFnZSdzIGNvbXBvbmVudHNcbiAgdGhpcy5zZXRDb21wb25lbnRzID0gb3B0aW9ucy5zZXRDb21wb25lbnRzIHx8IGZ1bmN0aW9uKCkgeyByZXR1cm4gKG9wdGlvbnMuY29tcG9uZW50cyB8fCB7fSk7IH07XG4gIHRoaXMuY29tcG9uZW50cyA9IHRoaXMuc2V0Q29tcG9uZW50cygpO1xuICB0aGlzLl9jb21wb25lbnRzTG9hZGVkID0gZmFsc2U7XG5cbiAgLy8gc2V0SW5pdGlhbFN0YXRlIGZ1bmN0aW9uXG4gIHRoaXMuc2V0SW5pdGlhbFN0YXRlID0gb3B0aW9ucy5zZXRJbml0aWFsU3RhdGUgfHwgU2hhcmVkLmp1c3RSZXR1cm5PYmplY3Q7XG4gIHRoaXMuc3RhdGUgPSB7fTtcbiAgdGhpcy5faW5pdGlhbFN0YXRlU2V0ID0gZmFsc2U7XG4gIHRoaXMuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gIHRoaXMuX2xvYWRlZEV2ZW50cyA9IFtdO1xuXG4gIC8vIHNldCB0aGUgcGFnZSdzIHJlbmRlciBmdW5jdGlvbiB0aGF0IHdpbGwgb3V0cHV0IGFuIGh0bWwgc3RyaW5nXG4gIC8vIGlmIG5vIHJlbmRlciBmdW5jdGlvbiB3YXMgcGFzc2VkIGluLCB3ZSBjaGVjayBmb3IgYSB0ZW1wbGF0ZSBmdW5jdGlvblxuICB0aGlzLl90ZW1wbGF0ZSA9IG9wdGlvbnMucmVuZGVyIHx8IG9wdGlvbnMudGVtcGxhdGU7XG4gIGlmICghdGhpcy5fdGVtcGxhdGUpIHRocm93IG5ldyBFcnJvcihcIllvdXIgcGFnZSBcIiArIHRoaXMucGF0aCArIFwiIG11c3QgaGF2ZSBhIHJlbmRlciBvciB0ZW1wbGF0ZSBmdW5jdGlvbiB0aGF0IG91dHB1dHMgYW4gSFRNTCBzdHJpbmdcIik7XG5cbiAgLy8gc2V0IHRoZSBiZWZvcmVSZW5kZXIgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZFxuICB0aGlzLmJlZm9yZVJlbmRlciA9IG9wdGlvbnMuYmVmb3JlUmVuZGVyIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gc2V0IHRoZSBhZnRlclJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYWZ0ZXJSZW5kZXIgPSBvcHRpb25zLmFmdGVyUmVuZGVyIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gc2V0IHRoZSByZW1vdmUvY2xvc2UgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZCwgb3RoZXJ3aXNlIGp1c3QgaW52b2tlIGNhbGxiYWNrXG4gIHRoaXMuYmVmb3JlUmVtb3ZlID0gb3B0aW9ucy5iZWZvcmVSZW1vdmUgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBhZGQgYW55IHJvdXRlci1yZWxhdGVkIHRhc2tzXG4gIHRoaXMuX3V1aWQgPSB0aGlzLnBhdGggKyBcIi1cIiArIERhdGUubm93KCk7IC8vIHRoZSB1dWlkIGFsbG93cyB1cyB0byBlYXNpbHkgcmVmZXJlbmNlIHRoZSBhZGRlZCByb3V0ZXIgdGFza3NcbiAgdGhpcy5fcm91dGVyID0gb3B0aW9ucy5Sb3V0ZXIgfHwgb3B0aW9ucy5yb3V0ZXIgfHwge307XG4gIFNoYXJlZC5hZGRSb3V0ZXJUYXNrcyh0aGlzKTtcblxuICAvLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyBwYXNzZWQgaW50byB0aGUgY3VzdG9tIG9yIGV4dGVuZCBvYmplY3RcbiAgdmFyIGN1c3RvbSA9IG9wdGlvbnMuZXh0ZW5kIHx8IG9wdGlvbnMuY3VzdG9tIHx8IHt9O1xuICBVdGlscy5leHRlbmQodGhpcywgY3VzdG9tLCBTaGFyZWQucmVzZXJ2ZWQpO1xuXG59XG5cbi8vIEhhdmUgdGhlIFNhbXNvblBhZ2UgY2xhc3MgaW5oZXJpdCBhbnkgc2hhcmVkIG1ldGhvZHNcblNhbXNvblBhZ2UucHJvdG90eXBlLl90eXBlID0gXCJQYWdlXCI7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5zZXRTdGF0ZSA9IFNoYXJlZC5zZXRTdGF0ZTtcblNhbXNvblBhZ2UucHJvdG90eXBlLnJlc2V0U3RhdGUgPSBTaGFyZWQucmVzZXRTdGF0ZTtcblNhbXNvblBhZ2UucHJvdG90eXBlLl9kb0ZpcnN0ID0gU2hhcmVkLl9kb0ZpcnN0O1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2xvYWRFdmVudHMgPSBTaGFyZWQuX2xvYWRFdmVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fZGVzdHJveUV2ZW50cyA9IFNoYXJlZC5fZGVzdHJveUV2ZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9sb2FkQ29tcG9uZW50cyA9IFNoYXJlZC5fbG9hZENvbXBvbmVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fcmVuZGVyQ29tcG9uZW50cyA9IFNoYXJlZC5fcmVuZGVyQ29tcG9uZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9kZXN0cm95Q29tcG9uZW50cyA9IFNoYXJlZC5fZGVzdHJveUNvbXBvbmVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fZml4QXV0b0ZvY3VzRWxlbWVudHMgPSBTaGFyZWQuX2ZpeEF1dG9Gb2N1c0VsZW1lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbW92ZSA9IFNoYXJlZC5fcmVtb3ZlO1xuXG4vLyByZW5kZXIgdGhlIHBhZ2UgdG8gdGhlIERPTVxuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgcGFnZV9jb250YWluZXIsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuX2xvYWRDb21wb25lbnRzKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kb0ZpcnN0KFwiYmVmb3JlUmVuZGVyXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBjcmVhdGUgdGhlIGluaXRpYWwgc3RhdGUgb2JqZWN0IG9mIHRoZSBwYWdlIHRoYXQgaXMgcGFzc2VkIGludG8gdGhlIHJlbmRlciBjYWxsXG4gICAgICBpZiAoIXNlbGYuX2luaXRpYWxTdGF0ZVNldCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gc2VsZi5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBwYWdlIGVsZW1lbnRcbiAgICAgIGlmICghc2VsZi5lbGVtZW50KSB7XG4gICAgICAgIHNlbGYuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNlbGYuZWxlbWVudC5pZCA9IHNlbGYucGF0aCArIFwiLXBhZ2VcIjtcbiAgICAgICAgc2VsZi5lbGVtZW50LmlubmVySFRNTCA9IHNlbGYuX3RlbXBsYXRlKHNlbGYuc3RhdGUpO1xuICAgICAgICBwYWdlX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBwYWdlIGFzIGFuIGV2ZW50IGRlbGVnYXRvciBmb3IgYWxsIGl0cyBzdWJjb21wb25lbnRzXG4gICAgICAgIHNlbGYuZGVsZWdhdGUgPSBTYW1zb24uJChzZWxmLmVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgd2hldGhlciBvciBub3Qgd2Ugd2lsbCBmb3JjZSBzdWJjb21wb25lbnRzIHRvIHVwZGF0ZVxuICAgICAgaWYgKGZvcmNlX3VwZGF0ZSB8fCBzZWxmLl9zdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgZm9yY2VfdXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5lbGVtZW50LmlubmVySFRNTCA9IHNlbGYuX3RlbXBsYXRlKHNlbGYuc3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9sb2FkRXZlbnRzKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNlbGYuX3JlbmRlckNvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJlc2V0IHN0YXRlQ2hhbmdlZFxuICAgICAgICAgIHNlbGYuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgc2VsZi5fZml4QXV0b0ZvY3VzRWxlbWVudHMoKTtcblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlclJlbmRlclwiLCBmdW5jdGlvbigpIHsgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpOyB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb25QYWdlO1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBcInRvcFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tYm90dG9tXCIsIG5leHQ6IFwibW92ZS1mcm9tLXRvcFwiIH0sXG4gIFwiYm90dG9tXCIgOiB7IGN1cnJlbnQ6IFwibW92ZS10by10b3BcIiwgbmV4dDogXCJtb3ZlLWZyb20tYm90dG9tXCIgfSxcbiAgXCJsZWZ0XCIgOiB7IGN1cnJlbnQ6IFwibW92ZS10by1yaWdodFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1sZWZ0XCIgfSxcbiAgXCJyaWdodFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tbGVmdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodFwiIH0sXG4gIFwic2NhbGVcIiA6IHsgY3VycmVudDogXCJzY2FsZS1vdXRcIiwgbmV4dDogXCJzY2FsZS1pblwiIH0sXG4gIFwiZmFkZVwiIDogeyBjdXJyZW50OiBcImZhZGUtb3V0XCIsIG5leHQ6IFwiZmFkZS1pblwiIH1cblxufTtcbiIsIi8vIFNhbXNvbi5Sb3V0ZXIgY29uc3RydWN0b3IgZnVuY3Rpb25cbi8vIFVzZWQgdG8gaGFuZGxlIHBhZ2UgaGlzdG9yeSBhbmQgdHJhbnNpdGlvbnNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4uL2luZGV4Jyk7XG52YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG52YXIgYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucyA9IHJlcXVpcmUoJy4vYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucycpO1xuXG5mdW5jdGlvbiBTYW1zb25Sb3V0ZXIob3B0aW9ucykge1xuXG4gIHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQgPSBcInNhbXNvbl9wYWdlXzFcIjtcbiAgdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50ID0gXCJzYW1zb25fcGFnZV8yXCI7XG5cbiAgLy8gb3VyIHBhZ2UgY2FjaGUgd2lsbCBzdG9yZSB0aGUgaW5pdGlhbGl6ZWQgcGFnZXNcbiAgdGhpcy5wYWdlQ2FjaGUgPSB7fTtcblxuICAvLyBjcmVhdGUgdGhlIGFwcCByb3V0ZXIgaGlzdG9yeVxuICB0aGlzLmhpc3RvcnkgPSBbXTtcblxuICAvLyBhIHF1ZXVlIG9mIGFueSByb3V0ZXIgZXZlbnRzIHRoYXQgaGF2ZW4ndCBiZWVuIGhhbmRsZWQgeWV0XG4gIHRoaXMucXVldWUgPSBbXTtcblxuICAvLyBzZXQgdGhlIGFwcCdzIGFuaW1hdGlvbnNcbiAgdGhpcy5hbmltYXRpb25zID0gYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucztcblxuICB2YXIgY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zID0gb3B0aW9ucy5hbmltYXRpb25zIHx8IHt9O1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMpIHtcbiAgICB0aGlzLmFuaW1hdGlvbnNba2V5XSA9IGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9uc1trZXldO1xuICB9XG5cbiAgdGhpcy5jdXJyZW50UGFnZSA9IGZhbHNlOyAvLyB0aGUgbmFtZSBvZiB0aGUgcGFnZSB3ZSBhcmUgY3VycmVudGx5IG9uXG5cbiAgdGhpcy5wcmV2aW91c1BhZ2UgPSBmYWxzZTsgLy8gdGhlIG5hbWUgb2YgdGhlIHByZXZpb3VzIHBhZ2Ugd2Ugd2VyZSBvblxuXG4gIHRoaXMubmV4dFBhZ2UgPSBmYWxzZTsgLy8gdGhlIG5hbWUgb2YgdGhlIHBhZ2Ugd2UgYXJlIHRyYW5zaXRpb25pbmcgdG9cblxuICB0aGlzLmN1cnJlbnRBbmltYXRpb24gPSBmYWxzZTsgLy8gdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBydW5uaW5nIGFuaW1hdGlvblxuXG4gIHRoaXMuaXNCdXN5ID0gZmFsc2U7IC8vIHNldCB0byB0cnVlIHdoZW5ldmVyIHRoZSByb3V0ZXIgaXMgc3RpbGwgaGFuZGxpbmcgYW4gZXZlbnRcblxuICB0aGlzLnBhZ2VzQW5pbWF0aW5nID0gZmFsc2U7IC8vIHNldCB0byB0cnVlIGlmIGEgbmV3IHBhZ2UgaXMgYmVpbmcgbG9hZGVkXG5cbiAgLy8gc2V0IHRoZSBkZWZhdWx0IG5hdmlnYXRlIGFuaW1hdGlvblxuICB0aGlzLm5hdmlnYXRlQW5pbWF0aW9uID0gb3B0aW9ucy5kZWZhdWx0TmF2aWdhdGVBbmltYXRpb24gfHwgXCJyaWdodFwiO1xuXG4gIC8vc2V0IHRoZSBkZWZhdWx0IGJhY2sgYW5pbWF0aW9uXG4gIHRoaXMuYmFja0FuaW1hdGlvbiA9IG9wdGlvbnMuZGVmYXVsdEJhY2tBbmltYXRpb24gfHwgXCJsZWZ0XCI7XG5cbiAgdGhpcy5iZWZvcmVOYXZpZ2F0ZSA9IHt9O1xuICB0aGlzLmFmdGVyTmF2aWdhdGUgPSB7fTtcbiAgdGhpcy5iZWZvcmVBbmltYXRlID0ge307XG4gIHRoaXMuZHVyaW5nQW5pbWF0ZSA9IHt9O1xuICB0aGlzLmFmdGVyQW5pbWF0ZSA9IHt9O1xuICB0aGlzLmJlZm9yZUJhY2sgPSB7fTtcbiAgdGhpcy5hZnRlckJhY2sgPSB7fTtcblxuICBpZiAob3B0aW9ucy5iZWZvcmVOYXZpZ2F0ZSkgeyB0aGlzLmJlZm9yZU5hdmlnYXRlLnJvdXRlciA9IG9wdGlvbnMuYmVmb3JlTmF2aWdhdGU7IH1cbiAgaWYgKG9wdGlvbnMuYWZ0ZXJOYXZpZ2F0ZSkgeyB0aGlzLmFmdGVyTmF2aWdhdGUucm91dGVyID0gb3B0aW9ucy5hZnRlck5hdmlnYXRlOyB9XG4gIGlmIChvcHRpb25zLmJlZm9yZUFuaW1hdGUpIHsgdGhpcy5iZWZvcmVBbmltYXRlLnJvdXRlciA9IG9wdGlvbnMuYmVmb3JlQW5pbWF0ZTsgfVxuICBpZiAob3B0aW9ucy5kdXJpbmdBbmltYXRlKSB7IHRoaXMuZHVyaW5nQW5pbWF0ZS5yb3V0ZXIgPSBvcHRpb25zLmR1cmluZ0FuaW1hdGU7IH1cbiAgaWYgKG9wdGlvbnMuYWZ0ZXJBbmltYXRlKSB7IHRoaXMuYWZ0ZXJBbmltYXRlLnJvdXRlciA9IG9wdGlvbnMuYWZ0ZXJBbmltYXRlOyB9XG4gIGlmIChvcHRpb25zLmJlZm9yZUJhY2spIHsgdGhpcy5iZWZvcmVCYWNrLnJvdXRlciA9IG9wdGlvbnMuYmVmb3JlQmFjazsgfVxuICBpZiAob3B0aW9ucy5hZnRlckJhY2spIHsgdGhpcy5hZnRlckJhY2sucm91dGVyID0gb3B0aW9ucy5hZnRlckJhY2s7IH1cblxufTtcblxuLy8gZ2V0IHRoZSByb3V0ZXIncyBjdXJyZW50IHBhZ2UgZGF0YVxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5nZXRQYWdlRGF0YSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnRQYWdlIDogdGhpcy5jdXJyZW50UGFnZSxcbiAgICBwcmV2aW91c1BhZ2UgOiB0aGlzLnByZXZpb3VzUGFnZSxcbiAgICBuZXh0UGFnZSA6IHRoaXMubmV4dFBhZ2UsXG4gICAgcGFnZXNBbmltYXRpbmcgOiB0aGlzLnBhZ2VzQW5pbWF0aW5nLFxuICAgIGFjdGl2ZVBhZ2VFbGVtZW50IDogdGhpcy5hY3RpdmVQYWdlRWxlbWVudCxcbiAgICBpbmFjdGl2ZVBhZ2VFbGVtZW50IDogdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50LFxuICAgIGN1cnJlbnRBbmltYXRpb24gOiB0aGlzLmN1cnJlbnRBbmltYXRpb25cbiAgfTtcbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUuX2RvRmlyc3QgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB0YXNrcyA9IE9iamVjdC5rZXlzKHRoaXNbbmFtZV0pO1xuICBhc3luYy5lYWNoKHRhc2tzLCBmdW5jdGlvbih0YXNrLCBjYikge1xuICAgIHNlbGZbbmFtZV1bdGFza10oc2VsZi5nZXRQYWdlRGF0YSgpLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNiKGVycik7XG4gICAgfSk7XG4gIH0sIGZ1bmN0aW9uKGVycikge1xuICAgIGNhbGxiYWNrKGVycik7XG4gIH0pO1xufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5fZHVyaW5nQW5pbWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiB0aGlzLmR1cmluZ0FuaW1hdGUpIHtcbiAgICB0aGlzLmR1cmluZ0FuaW1hdGVba2V5XSh0aGlzLmdldFBhZ2VEYXRhKCkpO1xuICB9XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLnVwZGF0ZUhpc3RvcnkgPSBmdW5jdGlvbihraW5kLCBtZXNzYWdlKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBoaXN0b3J5X29iamVjdCA9IHt9O1xuICBoaXN0b3J5X29iamVjdC5kYXRlID0gbmV3IERhdGUoKTtcblxuICAvLyBpZiB3ZSBhcmUgbmF2aWdhdGluZyBmb3J3YXJkXG4gIGlmIChraW5kID09PSBcIm5hdmlnYXRlXCIpIHtcblxuICAgIGhpc3Rvcnlfb2JqZWN0LmtpbmQgPSBraW5kO1xuICAgIGhpc3Rvcnlfb2JqZWN0LnBhZ2UgPSB0aGlzLm5leHRQYWdlO1xuICAgIHRoaXMuaGlzdG9yeS5wdXNoKGhpc3Rvcnlfb2JqZWN0KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSBjdXJyZW50UGFnZSBpcyBzYWZlIHRvIGdvIGJhY2sgdG8gZnJvbSBhbnl3aGVyZVxuICAgIHZhciBiYWNrX3NhZmUgPSB0aGlzLmN1cnJlbnRQYWdlID8gU2Ftc29uLkFwcC5QYWdlc1t0aGlzLmN1cnJlbnRQYWdlXS5iYWNrU2FmZSA6IGZhbHNlO1xuXG4gICAgLy8gaWYgdGhlIGN1cnJlbnRQYWdlIGlzIGJhY2tTYWZlLCB0aGVuIHNldCBpdCBhcyB0aGUgcHJldmlvdXNQYWdlLCBvdGhlcndpc2Ugc2V0IHRoZSBjb25maWd1cmVkIHByZXZpb3VzUGFnZVxuICAgIHRoaXMucHJldmlvdXNQYWdlID0gYmFja19zYWZlID8gdGhpcy5jdXJyZW50UGFnZSA6IFNhbXNvbi5BcHAuUGFnZXNbdGhpcy5uZXh0UGFnZV0ucHJldmlvdXNQYWdlO1xuXG4gICAgLy8gc2V0IG91ciBjdXJyZW50UGFnZSBhcyB0aGUgcGFnZSB3ZSBhcmUgZ29pbmcgdG9cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5uZXh0UGFnZTtcblxuXG4gIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJiYWNrXCIpIHtcblxuICAgIGhpc3Rvcnlfb2JqZWN0LmtpbmQgPSBraW5kO1xuICAgIGhpc3Rvcnlfb2JqZWN0LnBhZ2UgPSB0aGlzLnByZXZpb3VzUGFnZTtcbiAgICB0aGlzLmhpc3RvcnkucHVzaChoaXN0b3J5X29iamVjdCk7XG5cbiAgICAvLyB3ZSBhcmUgZ29pbmcgYmFjaywgc28gc2V0IG91ciBjdXJyZW50UGFnZSBhcyBvdXIgcHJldmlvdXNQYWdlXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMucHJldmlvdXNQYWdlO1xuXG4gICAgLy8gd2UgYXJlIGdvaW5nIGJhY2ssIHNvIHNldCB0aGUgcHJldmlvdXNQYWdlIHRvIHRoZSBjdXJyZW50IFBhZ2UncyBwcmV2aW91c1BhZ2VcbiAgICB0aGlzLnByZXZpb3VzUGFnZSA9IFNhbXNvbi5BcHAuUGFnZXNbdGhpcy5jdXJyZW50UGFnZV0ucHJldmlvdXNQYWdlO1xuXG4gIH0gZWxzZSBpZiAoa2luZCA9PT0gXCJmYWlsZWRcIikge1xuICAgIGNvbnNvbGUubG9nKFwiUm91dGVyIGV2ZW50IGZhaWxlZCBiZWNhdXNlOiBcIiArIG1lc3NhZ2UpO1xuICB9XG5cbiAgLy8gaWYgaXQgd2Fzbid0IGp1c3QgYSBwYWdlIHVwZGF0ZSwgdGhlbiBzd2l0Y2ggdGhlIGFjdGl2ZVBhZ2VFbGVtZW50IGFuZCBpbmFjdGl2ZVBhZ2VFbGVtZW50IHZhbHVlc1xuICBpZiAoa2luZCAhPT0gXCJ1cGRhdGVcIiAmJiBraW5kICE9PSBcImZhaWxlZFwiKSB7XG4gICAgdmFyIG5ld19hY3RpdmVfcGFnZSA9IHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudDtcbiAgICB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQgPSB0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50O1xuICAgIHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQgPSBuZXdfYWN0aXZlX3BhZ2U7XG4gIH1cblxuICB0aGlzLm5leHRQYWdlID0gZmFsc2U7XG5cbiAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGFub3RoZXIgcm91dGVyIGV2ZW50IGluIHRoZSBxdWV1ZVxuICB2YXIgcXVldWVfZXZlbnQgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gIGlmIChxdWV1ZV9ldmVudCkge1xuXG4gICAgaWYgKHF1ZXVlX2V2ZW50LmtpbmQgPT09IFwibmF2aWdhdGVcIikge1xuXG4gICAgICAvLyBhZGRlZCBhIDIwbXMgZGVsYXkgZHVlIHRvIHNvbWUgd2VpcmQgYmVoYXZpb3Igd2l0aCBjc3MgYW5pbWF0aW9ucyBub3Qgd29ya2luZyB3aXRob3V0IGl0XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICBzZWxmLm5hdmlnYXRlKHF1ZXVlX2V2ZW50Lm5leHRfcGFnZSwgcXVldWVfZXZlbnQuYW5pbWF0aW9uLCBxdWV1ZV9ldmVudC5jYWxsYmFjayk7XG4gICAgICB9LCAyMCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYWNrKHF1ZXVlX2V2ZW50LmNhbGxiYWNrKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICB9XG5cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUuZ2V0QW5pbWF0aW9uRGF0YSA9IGZ1bmN0aW9uKGFuaW1hdGlvbikge1xuICB2YXIgZGF0YSA9IHt9O1xuICBkYXRhLmN1cnJlbnQgPSBcIm5vbmVcIjtcbiAgZGF0YS5uZXh0ID0gXCJub25lXCI7XG5cbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gdGhpcy5hbmltYXRpb25zKSB7XG4gICAgaWYgKGFuaW1hdGlvbiA9PT0ga2V5KSB7XG4gICAgICBkYXRhLmN1cnJlbnQgPSB0aGlzLmFuaW1hdGlvbnNba2V5XS5jdXJyZW50O1xuICAgICAgZGF0YS5uZXh0ID0gdGhpcy5hbmltYXRpb25zW2tleV0ubmV4dDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5kb0FuaW1hdGlvbiA9IGZ1bmN0aW9uKGFuaW1hdGUsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIFNhbXNvbi5ET01bdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QuYWRkKGFuaW1hdGUubmV4dCwgXCJhY3RpdmVcIik7XG4gIFNhbXNvbi5ET01bdGhpcy5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LmFkZChhbmltYXRlLmN1cnJlbnQpO1xuICBTYW1zb24uRE9NW3RoaXMuYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cbiAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3Mgd2hpbGUgdGhlIHBhZ2VzIGFyZSBhbmltYXRpbmcuIEV4OiB1cGRhdGUgaGVhZGVyIG9yIGZvb3RlclxuICB0aGlzLl9kdXJpbmdBbmltYXRlKCk7XG5cbiAgdmFyIGFuaW1hdGlvbkV2ZW50ID0gVXRpbHMud2hpY2hBbmltYXRpb25FdmVudCgpO1xuXG4gIFV0aWxzLm9uY2UoU2Ftc29uLkRPTVt0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnRdLCBhbmltYXRpb25FdmVudCwgYW5pbWF0aW9uRW5kZWQpO1xuXG4gIC8vIGxpc3RlbiBmb3IgdGhlIGVuZCBvZiB0aGUgYW5pbWF0aW9uXG4gIGZ1bmN0aW9uIGFuaW1hdGlvbkVuZGVkKCkge1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBhbmltYXRpb24gY2xhc3MgZnJvbSB0aGUgcGFnZSB3ZSBqdXN0IG1hZGUgYWN0aXZlXG4gICAgU2Ftc29uLkRPTVtzZWxmLmluYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5yZW1vdmUoYW5pbWF0ZS5uZXh0KTtcblxuICAgIC8vIHJlbW92ZSB0aGUgYW5pbWF0aW9uIGNsYXNzIGZyb20gdGhlIHBhZ2Ugd2UganVzdCBtYWRlIGluYWN0aXZlXG4gICAgU2Ftc29uLkRPTVtzZWxmLmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QucmVtb3ZlKGFuaW1hdGUuY3VycmVudCk7XG5cbiAgICBzZWxmLnBhZ2VzQW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgICAvLyByZW1vdmUgdGhlIG9sZCBwYWdlIGluY2x1ZGluZyBhbGwgb2YgaXRzIHZpZXdzIGFuZCBldmVudHMgZnJvbSB0aGUgRE9NXG4gICAgLy8gYWxzbyByZW1vdmUgdGhlIGVudGlyZSBwYWdlIGluc3RhbmNlIGZyb20gdGhlIHJvdXRlcidzIHBhZ2VDYWNoZVxuICAgIGlmIChzZWxmLmN1cnJlbnRQYWdlKSB7XG4gICAgICBzZWxmLnBhZ2VDYWNoZVtzZWxmLmN1cnJlbnRQYWdlXS5fcmVtb3ZlKGZ1bmN0aW9uKCkge1xuICAgICAgICBkZWxldGUgc2VsZi5wYWdlQ2FjaGVbc2VsZi5jdXJyZW50UGFnZV07XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9XG5cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uKG5leHRfcGFnZSwgYW5pbWF0aW9uLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLnBhZ2VzQW5pbWF0aW5nID0gdHJ1ZTtcblxuICBpZiAoYW5pbWF0aW9uID09PSBcInVwZGF0ZVwiKSB7XG5cbiAgICB0aGlzLnBhZ2VDYWNoZVtuZXh0X3BhZ2VdLl9yZW5kZXIodHJ1ZSwgbnVsbCwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIHNlbGYuX2RvRmlyc3QoXCJiZWZvcmVBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIHR5cGUgb2YgYW5pbWF0aW9uIHRoYXQgd2lsbCBiZSB1c2VkXG4gICAgdmFyIGFuaW1hdGlvbl9kYXRhID0gdGhpcy5nZXRBbmltYXRpb25EYXRhKGFuaW1hdGlvbik7XG5cbiAgICAvLyByZW1vdmUgdGhlIGZvY3VzIGZyb20gd2hhdGV2ZXIgZWxlbWVudCBoYXMgaXQgc28gdGhlIGN1cnNvciBkb2Vzbid0IG1ha2UgdGhlIHBhZ2UgdHJhbnNpdGlvbiBsb29rIHN1Y2t5XG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG5cbiAgICAvLyByZW5kZXIgdGhlIG5ldyBwYWdlIG9mZiBzY3JlZW5cbiAgICB0aGlzLnBhZ2VDYWNoZVtuZXh0X3BhZ2VdLl9yZW5kZXIoZmFsc2UsIFNhbXNvbi5ET01bdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50XSwgZnVuY3Rpb24oKSB7XG5cblxuICAgICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZUFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgLy8gcnVuIHRoZSBhbmltYXRpb24gbm93IHRoYXQgdGhlIG5ldyBwYWdlIGlzIGZ1bGx5IHJlbmRlcmVkIG9mZnNjcmVlblxuICAgICAgICBzZWxmLmRvQW5pbWF0aW9uKGFuaW1hdGlvbl9kYXRhLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAvLyByZXN0b3JlIGZvY3VzIHRvIHdoYXRldmVyIGVsZW1lbnQgd2FzIHNldCB0byBhdXRvZm9jdXMgKGxpbmtlZCB3aXRoIF9maXhBdXRvRm9jdXNFbGVtZW50cyBtZXRob2QgaW4gc2hhcmVkLmpzKVxuICAgICAgICAgIHZhciBmb2N1c0VsZW1lbnQgPSBTYW1zb24uRE9NW3NlbGYuaW5hY3RpdmVQYWdlRWxlbWVudF0ucXVlcnlTZWxlY3RvcihcIi5zYW1zb25fZm9jdXNcIik7XG4gICAgICAgICAgaWYgKGZvY3VzRWxlbWVudCkge1xuXG4gICAgICAgICAgICAvLyByZWZvY3VzIHRoZSBlbGVtZW50XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBmb2N1c0VsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgLy9mb2N1c0VsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgY3Vyc29yIHRvIHRoZSBlbmQgb2YgdGhlIHRleHRhcmVhXG4gICAgICAgICAgICB2YXIgdmFsdWVfbGVuZ3RoID0gZm9jdXNFbGVtZW50LnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIGZvY3VzRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSh2YWx1ZV9sZW5ndGgsIHZhbHVlX2xlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgc2Ftc29uX2ZvY3VzIGNsYXNzIGZyb20gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgIGZvY3VzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2Ftc29uX2ZvY3VzXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUubmF2aWdhdGUgPSBmdW5jdGlvbihuZXh0X3BhZ2UsIGFuaW1hdGlvbiwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gY2hlY2sgdG8gc2VlIGlmIGFub3RoZXIgUm91dGVyIGV2ZW50IGlzIGFscmVhZHkgYmVpbmcgaGFuZGxlZCwgaWYgb25lIGlzIHRoZW4gYWRkIHRoaXMgZXZlbnQgdG8gYSBxdWV1ZVxuICBpZiAodGhpcy5pc0J1c3kpIHtcblxuICAgIHRoaXMucXVldWUucHVzaCh7XG4gICAgICBraW5kOiBcIm5hdmlnYXRlXCIsXG4gICAgICBuZXh0X3BhZ2U6IG5leHRfcGFnZSxcbiAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiUm91dGVyIGlzIGJ1c3kuIFRoaXMgZXZlbnQgaXMgI1wiICsgc2VsZi5xdWV1ZS5sZW5ndGggKyBcIiBpbiBsaW5lXCIpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICB2YXIgY2hvc2VuX2FuaW1hdGlvbiA9IGFuaW1hdGlvbiB8fCB0aGlzLm5hdmlnYXRlQW5pbWF0aW9uO1xuXG4gICAgLy8gaWYgYSBwYWdlIHVwZGF0ZSBpcyByZXF1ZXN0ZWQgZm9yIGEgcGFnZSB3ZSBhcmVuJ3QgY3VycmVudGx5IG9uLCB0aGVuIHdlIHdpbGwgc2ltcGx5IG5hdmlnYXRlIHRvIGl0IGxpa2Ugbm9ybWFsXG4gICAgaWYgKGNob3Nlbl9hbmltYXRpb24gPT09IFwidXBkYXRlXCIgJiYgbmV4dF9wYWdlICE9PSB0aGlzLmN1cnJlbnRQYWdlKSB7XG4gICAgICBjaG9zZW5fYW5pbWF0aW9uID0gdGhpcy5uYXZpZ2F0ZUFuaW1hdGlvbjtcbiAgICB9XG5cbiAgICB0aGlzLm5leHRQYWdlID0gbmV4dF9wYWdlO1xuXG4gICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYmVmb3JlIHdlIHN0YXJ0IHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICB0aGlzLl9kb0ZpcnN0KFwiYmVmb3JlTmF2aWdhdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgcGFnZSBleGlzdHMgYmVmb3JlIHRyeWluZyB0byBuYXZpZ2F0ZVxuICAgICAgaWYgKCFTYW1zb24uQXBwLlBhZ2VzW25leHRfcGFnZV0gJiYgIWVycikge1xuICAgICAgICBlcnIgPSBcIlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycikge1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3ZSBhcmUgc3RheWluZyBvbiB0aGUgc2FtZSBwYWdlLCBpZiB3ZSBhcmUgdGhlbiBzaW1wbHkgdXBkYXRlIHRoZSBwYWdlXG4gICAgICAgIGlmIChuZXh0X3BhZ2UgPT09IHNlbGYuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICBjaG9zZW5fYW5pbWF0aW9uID0gXCJ1cGRhdGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLnBhZ2VDYWNoZVtuZXh0X3BhZ2VdID0gU2Ftc29uLmNyZWF0ZVBhZ2UoU2Ftc29uLkFwcC5QYWdlc1tuZXh0X3BhZ2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2UgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGFjY2Vzc2libGUgaW4gZ2V0UGFnZURhdGEoKVxuICAgICAgICBzZWxmLmN1cnJlbnRBbmltYXRpb24gPSBjaG9zZW5fYW5pbWF0aW9uO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICBzZWxmLmFuaW1hdGUobmV4dF9wYWdlLCBjaG9zZW5fYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGNoYW5nZXMgdG8gdGhlIHBhZ2UgaGlzdG9yeVxuICAgICAgICAgICAgaWYgKGNob3Nlbl9hbmltYXRpb24gPT09IFwidXBkYXRlXCIpIHtcbiAgICAgICAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwidXBkYXRlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwibmF2aWdhdGVcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIG5hdmlnYXRpbmdcbiAgICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlck5hdmlnYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJmYWlsZWRcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgIC8vIGNoZWNrIHRvIHNlZSBpZiBhbm90aGVyIFJvdXRlciBldmVudCBpcyBhbHJlYWR5IGJlaW5nIGhhbmRsZWQsIGlmIG9uZSBpcyB0aGVuIGFkZCB0aGlzIGV2ZW50IHRvIGEgcXVldWVcbiAgaWYgKHRoaXMuaXNCdXN5KSB7XG5cbiAgICB0aGlzLnF1ZXVlLnB1c2goe1xuICAgICAga2luZDogXCJiYWNrXCIsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIC8vY29uc29sZS5sb2coXCJSb3V0ZXIgaXMgYnVzeS4gVGhpcyBldmVudCBpcyAjXCIgKyBzZWxmLnF1ZXVlLmxlbmd0aCArIFwiIGluIGxpbmVcIik7XG5cbiAgfSBlbHNlIHtcblxuICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGJlZm9yZSB3ZSBzdGFydCB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgdGhpcy5fZG9GaXJzdChcImJlZm9yZUJhY2tcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGVyZSBpcyBhIHBhZ2UgdG8gZ28gYmFjayB0b1xuICAgICAgaWYgKCFzZWxmLnByZXZpb3VzUGFnZSAmJiAhZXJyKSB7XG4gICAgICAgIGVyciA9IFwiTm8gcGFnZSB0byBnbyBiYWNrIHRvXCI7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyKSB7XG5cbiAgICAgICAgLy8gbG9hZCB0aGUgcHJldmlvdXNQYWdlIGludG8gdGhlIHBhZ2VDYWNoZVxuICAgICAgICBzZWxmLnBhZ2VDYWNoZVtzZWxmLnByZXZpb3VzUGFnZV0gPSBTYW1zb24uY3JlYXRlUGFnZShTYW1zb24uQXBwLlBhZ2VzW3NlbGYucHJldmlvdXNQYWdlXSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHBhZ2Ugd2FudHMgYSBjdXN0b20gYmFjayBhbmltYXRpb24gdGhlbiB1c2UgaXQsIG90aGVyd2lzZSB1c2UgdGhlIGRlZmF1bHQgYmFjayBhbmltYXRpb25cbiAgICAgICAgdmFyIGJhY2tfYW5pbWF0aW9uID0gU2Ftc29uLkFwcC5QYWdlc1tzZWxmLmN1cnJlbnRQYWdlXS5iYWNrQW5pbWF0aW9uIHx8IHNlbGYuYmFja0FuaW1hdGlvbjtcblxuICAgICAgICAvLyBtYWtlIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBhY2Nlc3NpYmxlIGluIGdldFBhZ2VEYXRhKClcbiAgICAgICAgc2VsZi5jdXJyZW50QW5pbWF0aW9uID0gYmFja19hbmltYXRpb247XG5cbiAgICAgICAgLy8gYW5pbWF0ZSB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgIHNlbGYuYW5pbWF0ZShzZWxmLnByZXZpb3VzUGFnZSwgYmFja19hbmltYXRpb24sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlckFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hhbmdlcyB0byB0aGUgcGFnZSBoaXN0b3J5XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJiYWNrXCIpO1xuXG4gICAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciBnb2luZyBiYWNrXG4gICAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJCYWNrXCIsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJmYWlsZWRcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb25Sb3V0ZXI7XG4iLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG52YXIgaXNFcXVhbCA9IHJlcXVpcmUoJ2xvZGFzaC5pc2VxdWFsJyk7XG5cbnZhciBzaGFyZWQgPSB7fTtcblxuLy8gcmVzZXJ2ZWQgcHJvcGVydGllcyBmb3IgY29tcG9uZW50cyBhbmQgcGFnZXNcbnNoYXJlZC5yZXNlcnZlZCA9IFtcInBhdGhcIiwgXCJlbFwiLCBcImVsZW1lbnRcIiwgXCJ0ZW1wbGF0ZVwiLCBcInN1YlBhZ2VPZlwiLCBcInByZXZpb3VzUGFnZVwiLCBcImJhY2tBbmltYXRpb25cIiwgXCJzdHlsZVwiLCBcImNvbXBvbmVudHNcIiwgXCJldmVudHNcIiwgXCJkb21FdmVudHNcIiwgXCJhcHBFdmVudHNcIiwgXCJzdGF0ZVwiLCBcInNldFN0YXRlXCIsIFwicmVzZXRTdGF0ZVwiLCBcInNldEluaXRpYWxTdGF0ZVwiLCBcImJlZm9yZVJlbmRlclwiLCBcImFmdGVyUmVuZGVyXCIsIFwiYmVmb3JlUmVtb3ZlXCIsIFwicmVuZGVyXCIsIFwicGFyZW50XCIsIFwib25cIiwgXCJlbWl0XCIsIFwib2ZmXCJdO1xuXG4vLyBjYWNoZWQgZm9yIHBlcmZvcm1hbmNlXG5zaGFyZWQuanVzdENhbGxiYWNrID0gZnVuY3Rpb24oY2IpIHsgY2IoKTsgfTtcbnNoYXJlZC5qdXN0Q2FsbGJhY2tUcnVlID0gZnVuY3Rpb24oY2IpIHsgY2IodHJ1ZSk7IH07XG5zaGFyZWQuanVzdFJldHVybk9iamVjdCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4ge307IH07XG5cbi8vIHJlbW92ZSB0aGUgYXV0b2ZvY3VzIGF0dHJpYnV0ZSBvbiB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IGhhcyBpdCBhbmQgdG8gaXQgdGhlIGNsYXNzIFwic2Ftc29uX2ZvY3VzXCIuIHJlbW92ZSB0aGUgYXV0b2ZvY3VzIGF0dHJpYnV0ZSBlbnRpcmVseSBvbiBhbnkgb3RoZXIgZWxlbWVudHMgdGhhdCBtaWdodCBoYXZlIGl0IGJ5IG1pc3Rha2UuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGhhdmUgc21vb3RoIHBhZ2UgdHJhbnNpdGlvbnMgZHVlIHRvIGFuIGFuaW1hdGlvbiBidWcgaW4gY2hyb21lIGNhdXNlZCBieSBhbiBlbGVtZW50IGhhdmluZyB0aGUgYXV0b2ZvY3VzIGF0dHJpYnV0ZS4gVGhlIFNhbXNvbiBSb3V0ZXIgd2lsbCBjYWxsIC5mb2N1cygpIG9uIHdoYXRldmVyIGVsZW1lbnQgaGFzIHRoZSBcInNhbXNvbl9mb2N1c1wiIGNsYXNzLCBhZnRlciB0aGUgcGFnZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlXG5zaGFyZWQuX2ZpeEF1dG9Gb2N1c0VsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpOyB2YXIgZm9jdXNFbGVtZW50cyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2F1dG9mb2N1cz0nYXV0b2ZvY3VzJ11cIik7XG4gIGZvciAoaT0wOyBpPGZvY3VzRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZm9jdXNFbGVtZW50ID0gZm9jdXNFbGVtZW50c1tpXTtcbiAgICBpZiAoaSA9PSAwKSB7XG4gICAgICBmb2N1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNhbXNvbl9mb2N1c1wiKTtcbiAgICB9XG4gICAgZm9jdXNFbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcImF1dG9mb2N1c1wiKTtcbiAgICBmb2N1c0VsZW1lbnQuYmx1cigpO1xuICB9XG59O1xuXG4vLyBnZXQgdGhlIHRvcG1vc3QgcGFyZW50IHBhZ2Ugb3IgY29tcG9uZW50IG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudFxuLy8gdXNlZCBpbiB0aGUgc2V0U3RhdGUgbWV0aG9kIG9uIGNvbXBvbmVudHMgYW5kIHBhZ2VzXG5mdW5jdGlvbiBnZXRUb3BQYXJlbnQoY29tcG9uZW50KSB7XG4gIGlmIChjb21wb25lbnQucGFyZW50KSB7XG4gICAgcmV0dXJuIGdldFRvcFBhcmVudChjb21wb25lbnQucGFyZW50KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9XG59XG5cbi8vIHRoZSBtZXRob2RzIHRoYXQgUGFnZXMgYW5kIENvbXBvbmVudHMgc2hhcmVcbnNoYXJlZC5zZXRTdGF0ZSA9IGZ1bmN0aW9uKG5ld19zdGF0ZSkgeyAvLyBuZXdfc3RhdGUgbXVzdCBiZSBhbiBvYmplY3RcbiAgaWYgKHR5cGVvZiBuZXdfc3RhdGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgdmFyIHByb3A7XG4gICAgZm9yIChwcm9wIGluIG5ld19zdGF0ZSkge1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGlzIHByb3BlcnR5IGhhcyBjaGFuZ2VkXG4gICAgICBpZiAodGhpcy5zdGF0ZVtwcm9wXSA9PT0gdW5kZWZpbmVkKSB7IC8vIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0IGV4aXN0IG9uIHRoZSBzdGF0ZSBvYmplY3QgdGhlbiBpdCB3aWxsIHVwZGF0ZWRcbiAgICAgICAgdGhpcy5zdGF0ZVtwcm9wXSA9IG5ld19zdGF0ZVtwcm9wXTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKCFpc0VxdWFsKHRoaXMuc3RhdGVbcHJvcF0sIG5ld19zdGF0ZVtwcm9wXSkpIHsgLy8gaWYgdGhlIGV4aXN0aW5nIHByb3BlcnR5IG9uIHRoZSBzdGF0ZSBvYmplY3QgaXMgbm90IGVxdWFsIHRvIHRoZSB2YWx1ZSBvbiB0aGUgbmV3X3N0YXRlIG9iamVjdCB0aGVuIGl0IHdpbGwgYmUgdXBkYXRlZFxuICAgICAgICB0aGlzLnN0YXRlW3Byb3BdID0gbmV3X3N0YXRlW3Byb3BdO1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoIXRoaXMucGFyZW50IHx8ICF0aGlzLnBhcmVudC5fdHlwZSkge1xuICAgICAgICB0aGlzLl9yZW5kZXIoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGdldFRvcFBhcmVudCh0aGlzKTtcbiAgICAgICAgcGFyZW50Ll9yZW5kZXIoZmFsc2UpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWFrZSBzdXJlIHRvIHBhc3MgYW4gb2JqZWN0IGludG8gc2V0U3RhdGVcIik7XG4gIH1cbn07XG5cbnNoYXJlZC5yZXNldFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuZXdfc3RhdGUgPSB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB0aGlzLnNldFN0YXRlKG5ld19zdGF0ZSk7XG59O1xuXG4vLyBydW4gdGhlIG5hbWVkIGZ1bmN0aW9uIGJlZm9yZSBjYWxsaW5nIGJhY2tcbnNoYXJlZC5fZG9GaXJzdCA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gIHRoaXNbbmFtZV0oZnVuY3Rpb24oKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG59O1xuXG4vLyBhZGQgYW55IHRhc2tzIHRoYXQgdGhpcyBwYWdlIG9yIGNvbXBvbmVudCB3YW50cyBydW4gYXQgZGlmZmVyZW50IGV2ZW50cyBkdXJpbmcgcm91dGVyIG5hdmlnYXRpb25cbnNoYXJlZC5hZGRSb3V0ZXJUYXNrcyA9IGZ1bmN0aW9uKG9iaikge1xuICB2YXIgdGFzaztcbiAgZm9yICh0YXNrIGluIG9iai5fcm91dGVyKSB7XG4gICAgU2Ftc29uLkFwcC5Sb3V0ZXJbdGFza11bb2JqLl91dWlkXSA9IG9iai5fcm91dGVyW3Rhc2tdLmJpbmQob2JqKTtcbiAgfVxufVxuXG5zaGFyZWQuX2xvYWRFdmVudHMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAoIXRoaXMuX2xvYWRlZEV2ZW50cy5sZW5ndGgpIHtcblxuICAgIHZhciBkZWxlZ2F0ZSA9IGdldFRvcFBhcmVudCh0aGlzKS5kZWxlZ2F0ZTtcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5kb21FdmVudHMpO1xuXG4gICAgdmFyIHNlbGVjdG9yX2VsZW1lbnQgPSAodGhpcy5fdHlwZSA9PT0gXCJQYWdlXCIpID8gbnVsbCA6IFwiI1wiICsgIHRoaXMuZWw7XG5cbiAgICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgICAgdmFyIGV2ZW50ID0ge307XG4gICAgICB2YXIgc3BsaXRfZXZlbnQgPSBrZXkuc3BsaXQoXCIgXCIpOyAvLyBzcGxpdCBieSBhIHNpbmdsZSBzcGFjZVxuICAgICAgZXZlbnQudHlwZSA9IHNwbGl0X2V2ZW50LnNoaWZ0KCk7XG4gICAgICBldmVudC5zZWxlY3RvciA9IHNwbGl0X2V2ZW50Lmxlbmd0aCA+IDEgPyBzcGxpdF9ldmVudC5qb2luKFwiIFwiKSA6IHNwbGl0X2V2ZW50WzBdO1xuICAgICAgZXZlbnQuc2VsZWN0b3IgPSBldmVudC5zZWxlY3RvciB8fCBzZWxlY3Rvcl9lbGVtZW50O1xuXG4gICAgICBldmVudC5oYW5kbGVyID0gZnVuY3Rpb24gZml4ZWRFdmVudEhhbmRsZXIoZSkge1xuICAgICAgICBzZWxmLmRvbUV2ZW50c1trZXldLmNhbGwoc2VsZiwgZSwgZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChldmVudC5zZWxlY3Rvcikge1xuICAgICAgICBkZWxlZ2F0ZS5vbihldmVudC50eXBlLCBldmVudC5zZWxlY3RvciwgZXZlbnQuaGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxlZ2F0ZS5vbihldmVudC50eXBlLCBldmVudC5oYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fbG9hZGVkRXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICBjYigpO1xuXG4gICAgfSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGxvYWQgYW55IGFwcCBldmVudHNcbiAgICAgIHZhciBhcHBFdmVudDtcbiAgICAgIGZvciAoYXBwRXZlbnQgaW4gc2VsZi5hcHBFdmVudHMpIHtcbiAgICAgICAgU2Ftc29uLkFwcC5vbihhcHBFdmVudCwgc2VsZi5hcHBFdmVudHNbYXBwRXZlbnRdLCBzZWxmKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICB9XG5cbn07XG5cbnNoYXJlZC5fZGVzdHJveUV2ZW50cyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgLy8gZGVzdHJveSBET00gZXZlbnQgbGlzdGVuZXJzXG4gIHZhciBkZWxlZ2F0ZSA9IGdldFRvcFBhcmVudCh0aGlzKS5kZWxlZ2F0ZTtcbiAgdmFyIGk7IHZhciBkb21FdmVudDtcbiAgZm9yIChpPTA7IGk8dGhpcy5fbG9hZGVkRXZlbnRzLmxlbmd0aDtpKyspIHtcbiAgICBkb21FdmVudCA9IHRoaXMuX2xvYWRlZEV2ZW50c1tpXTtcbiAgICBpZiAoZG9tRXZlbnQuc2VsZWN0b3IpIHtcbiAgICAgIGRlbGVnYXRlLm9mZihkb21FdmVudC50eXBlLCBkb21FdmVudC5zZWxlY3RvciwgZG9tRXZlbnQuaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGVnYXRlLm9mZihkb21FdmVudC50eXBlLCBkb21FdmVudC5oYW5kbGVyKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gbm93IGRlc3Ryb3kgYXBwIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgYXBwRXZlbnQ7XG4gIGZvciAoYXBwRXZlbnQgaW4gdGhpcy5hcHBFdmVudHMpIHtcbiAgICBTYW1zb24uQXBwLm9mZihhcHBFdmVudCwgdGhpcy5hcHBFdmVudHNbYXBwRXZlbnRdKTtcbiAgfVxuXG4gIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcblxufTtcblxuLy8gYXR0YWNoIHRoZSBjb21wb25lbnRzIHBhc3NlZCBiYWNrIGZyb20gdGhlIHNldENvbXBvbmVudHMgZnVuY3Rpb25cbnNoYXJlZC5fbG9hZENvbXBvbmVudHMgPSBmdW5jdGlvbihmb3JjZV91cGRhdGUsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIElmIHRoZSBjb21wb25lbnRzIGFyZW4ndCBsb2FkZWQsIG9yIGZvcmNlX3VwZGF0ZSBpcyB0cnVlLCB0aGVuIGxvYWQgdGhlIGNvbXBvbmVudHNcbiAgaWYgKCF0aGlzLl9jb21wb25lbnRzTG9hZGVkIHx8IGZvcmNlX3VwZGF0ZSkge1xuXG4gICAgdmFyIG5ld19jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG5cbiAgICAvLyBGaXJzdCB3ZSBnbyB0aHJvdWdoIGVhY2ggY3VycmVudGx5IGF0dGFjaGVkIGNvbXBvbmVudCwgYW5kIGNoZWNrIHRvIHNlZSBpZiBpdCBzaG91bGQgc3RpbGwgZXhpc3RcbiAgICB2YXIgb2xkX2NvbXBvbmVudHMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpO1xuICAgIGFzeW5jLmVhY2gob2xkX2NvbXBvbmVudHMsIGZ1bmN0aW9uKG9sZF9jb21wb25lbnQsIGNiKSB7XG5cbiAgICAgIHZhciBzaG91bGRfYmVfbG9hZGVkID0gZmFsc2U7XG4gICAgICB2YXIgbmV3X2NvbXBvbmVudDtcbiAgICAgIGZvciAobmV3X2NvbXBvbmVudCBpbiBuZXdfY29tcG9uZW50cykge1xuICAgICAgICBpZiAob2xkX2NvbXBvbmVudCA9PT0gbmV3X2NvbXBvbmVudCkgc2hvdWxkX2JlX2xvYWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGxvYWRlZCBidXQgaXNuJ3QsIHRoZW4gd2UgbG9hZCBpdC4gT3RoZXJ3aXNlIHdlIGp1c3Qgc2tpcCBpdFxuICAgICAgaWYgKHNob3VsZF9iZV9sb2FkZWQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGNvbXBvbmVudCBoYXNuJ3QgYmVlbiBsb2FkZWQgeWV0LCB0aGVuIGxvYWQgaXRcbiAgICAgICAgaWYgKCFzZWxmW29sZF9jb21wb25lbnRdKSB7XG4gICAgICAgICAgc2VsZltvbGRfY29tcG9uZW50XSA9IFNhbXNvbi5jcmVhdGVDb21wb25lbnQoc2VsZi5jb21wb25lbnRzW29sZF9jb21wb25lbnRdKTtcbiAgICAgICAgICBzZWxmW29sZF9jb21wb25lbnRdLnBhcmVudCA9IHNlbGY7XG4gICAgICAgIH1cbiAgICAgICAgY2IoKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBjb21wb25lbnQgc2luY2UgaXQgc2hvdWxkbid0IGJlIGxvYWRlZFxuICAgICAgICBpZiAoc2VsZltvbGRfY29tcG9uZW50XSkge1xuICAgICAgICAgIHNlbGZbb2xkX2NvbXBvbmVudF0uX3JlbW92ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzZWxmW29sZF9jb21wb25lbnRdO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9LCBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gTm93IHRoYXQgd2UgaGFuZGxlZCBhbGwgb2YgdGhlIGV4aXN0aW5nIGNvbXBvbmVudHMsIHdlIGxvYWQgYW55IG5ldyBjb21wb25lbnRzIHRoYXQgZG9uJ3QgZXhpc3QgeWV0XG4gICAgICBzZWxmLmNvbXBvbmVudHMgPSBuZXdfY29tcG9uZW50cztcblxuICAgICAgdmFyIGNvbXBvbmVudDtcbiAgICAgIGZvciAoY29tcG9uZW50IGluIHNlbGYuY29tcG9uZW50cykge1xuICAgICAgICBpZiAoIXNlbGZbY29tcG9uZW50XSkge1xuICAgICAgICAgIHNlbGZbY29tcG9uZW50XSA9IFNhbXNvbi5jcmVhdGVDb21wb25lbnQoc2VsZi5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xuICAgICAgICAgIHNlbGZbY29tcG9uZW50XS5wYXJlbnQgPSBzZWxmO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2NvbXBvbmVudHNMb2FkZWQgPSB0cnVlO1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICB9XG5cbn07XG5cbi8vIHJlbmRlciB0aGUgY29tcG9uZW50cyBhdHRhY2hlZCB0byB0aGUgcGFnZVxuc2hhcmVkLl9yZW5kZXJDb21wb25lbnRzID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cyk7XG5cbiAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICBzZWxmW2tleV0uX3JlbmRlcihmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICB9LCBmdW5jdGlvbigpe1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xuXG59O1xuXG5zaGFyZWQuX2Rlc3Ryb3lDb21wb25lbnRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpO1xuXG4gIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgc2VsZltrZXldLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgc2VsZltrZXldO1xuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9jb21wb25lbnRzTG9hZGVkID0gZmFsc2U7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG5cbn07XG5cbi8vIHJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycywgRE9NIG5vZGVzLCBhbmQgY2hpbGQgY29tcG9uZW50c1xuc2hhcmVkLl9yZW1vdmUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLl9kb0ZpcnN0KFwiYmVmb3JlUmVtb3ZlXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgc2VsZi5fZGVzdHJveUNvbXBvbmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgIHNlbGYuX2Rlc3Ryb3lFdmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gZGVzdHJveSB0aGUgRE9NIGVsZW1lbnRcbiAgICAgICAgaWYgKHNlbGYuZWxlbWVudCAmJiBzZWxmLmVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNlbGYuZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIERPTSBub2RlIGlzIHJlbW92ZWQgZnJvbSBtZW1vcnkgcXVpY2tseVxuICAgICAgICBkZWxldGUgc2VsZi5lbGVtZW50O1xuXG4gICAgICAgIC8vIHJlbW92ZSBhbnkgcm91dGVyIHJlbGF0ZWQgdGFza3NcbiAgICAgICAgdmFyIHRhc2s7XG4gICAgICAgIGZvciAodGFzayBpbiBzZWxmLl9yb3V0ZXIpIHtcbiAgICAgICAgICBkZWxldGUgU2Ftc29uLkFwcC5Sb3V0ZXJbdGFza11bc2VsZi5fdXVpZF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIGV2ZW50IGRlbGVnYXRvciBpZiBpdCBleGlzdHNcbiAgICAgICAgZGVsZXRlIHNlbGYuZGVsZWdhdGU7XG5cbiAgICAgICAgLy8gcmVzZXQgdGhlIHBhZ2UncyBzdGF0ZVxuICAgICAgICBzZWxmLnN0YXRlID0ge307XG4gICAgICAgIHNlbGYuX2luaXRpYWxTdGF0ZVNldCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaGFyZWQ7XG4iLCIvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgdXRpbHMgPSB7fTtcblxuLy8gYWRkIGFueSB1bnJlc2VydmVkIHByb3BlcnRpZXMgdG8gdGhlIHBhc3NlZCBpbiBvYmplY3Rcbi8vIGFueSBwcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggXyBhcmUgcmVzZXJ2ZWRcbmZ1bmN0aW9uIHN0YXJ0c1dpdGhfKHdvcmQpIHtcbiAgcmV0dXJuICh3b3JkLmNoYXJBdCgwKSA9PSBcIl9cIikgPyB0cnVlIDogZmFsc2U7XG59XG5cbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaiwgY3VzdG9tX3Byb3BzLCByZXNlcnZlZCkge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBjdXN0b21fcHJvcHMpIHtcbiAgICBpZiAoIXN0YXJ0c1dpdGhfKGtleSkgJiYgcmVzZXJ2ZWQuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgb2JqW2tleV0gPSBjdXN0b21fcHJvcHNba2V5XTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHdoaWNoRXZlbnROYW1lKGV2ZW50X3R5cGUpIHtcbiAgdmFyIGtleTtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZScpO1xuXG4gIHZhciBldmVudF9uYW1lcyA9IHtcbiAgICB0cmFuc2l0aW9ucyA6IHtcbiAgICAgICd0cmFuc2l0aW9uJzondHJhbnNpdGlvbmVuZCcsXG4gICAgICAnT1RyYW5zaXRpb24nOidvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAnTW96VHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nOid3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICdhbmltYXRpb24nOidhbmltYXRpb25lbmQnLFxuICAgICAgJ09BbmltYXRpb24nOidvQW5pbWF0aW9uRW5kJyxcbiAgICAgICdNb3pBbmltYXRpb24nOidhbmltYXRpb25lbmQnLFxuICAgICAgJ1dlYmtpdEFuaW1hdGlvbic6J3dlYmtpdEFuaW1hdGlvbkVuZCdcbiAgICB9XG4gIH07XG5cbiAgZm9yIChrZXkgaW4gZXZlbnRfbmFtZXNbZXZlbnRfdHlwZV0pIHtcbiAgICBpZihlbC5zdHlsZVtrZXldICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIGV2ZW50X25hbWVzW2V2ZW50X3R5cGVdW2tleV07XG4gICAgfVxuICB9XG59XG5cbnV0aWxzLndoaWNoVHJhbnNpdGlvbkV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aGljaEV2ZW50TmFtZShcInRyYW5zaXRpb25zXCIpO1xufTtcblxudXRpbHMud2hpY2hBbmltYXRpb25FdmVudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2hpY2hFdmVudE5hbWUoXCJhbmltYXRpb25zXCIpO1xufTtcblxuLy8gbGlzdGVuIHRvIGFuIGV2ZW50IG9uY2Ugd2l0aG91dCBqcXVlcnlcbnV0aWxzLm9uY2UgPSBmdW5jdGlvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuXG4gIC8vIGNyZWF0ZSBldmVudFxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZnVuY3Rpb24oZSkge1xuICAgIC8vIHJlbW92ZSBldmVudFxuICAgIGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCBhcmd1bWVudHMuY2FsbGVlKTtcbiAgICAvLyBjYWxsIGhhbmRsZXJcbiAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuIiwiLy8gVGlueSBBc3luYyBsaWJyYXJ5IGZvciB1c2UgaW4gbW9kZXJuIGVudmlyb25tZW50c1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gcm9vdCBpcyBnbG9iYWwgb24gdGhlIHNlcnZlciwgYW5kIHdpbmRvdyBpbiB0aGUgYnJvd3NlclxuICB2YXIgcm9vdDtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gd2luZG93KSB7XG4gICAgcm9vdCA9IHdpbmRvdztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIHRoaXMgPT09IGdsb2JhbCkge1xuICAgIHJvb3QgPSBnbG9iYWw7XG4gIH0gZWxzZSB7XG4gICAgcm9vdCA9IHRoaXM7XG4gIH1cblxuICAvLyBjYWNoZWQgZm9yIHBlcmZvcm1hbmNlXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICB2YXIgT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuXG4gIC8vIGlzQXJyYXkgYW5kIGlzT2JqZWN0IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKTtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0S2V5cyhvYmopLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9FYWNoKGFyciwgaXRlcmF0b3IpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlcmF0b3IoYXJyW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIGRvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkocm9vdCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBfZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgYXN5bmMgPSB7XG5cbiAgICAvLyBydW5zIHRoZSB0YXNrIG9uIGV2ZXJ5IGl0ZW0gaW4gdGhlIGFycmF5IGF0IG9uY2VcbiAgICBlYWNoIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgZG9FYWNoKGFyciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpdGVyYXRvcihpdGVtLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkID49IGFtb3VudCkgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gcnVucyB0aHJvdWdoIHRoZSBhcnJheSBvbmUgaXRlbSBhdCBhIHRpbWVcbiAgICBlYWNoU2VyaWVzIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyW2NvbXBsZXRlZF0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA8IGFtb3VudCkge1xuICAgICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgICAgaXRlcmF0ZSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYW4gYWNjZXB0IGFuIG9iamVjdCBvciBhcnJheVxuICAgIC8vIHdpbGwgcmV0dXJuIGFuIG9iamVjdCBvciBhcnJheSBvZiByZXN1bHRzIGluIHRoZSBjb3JyZWN0IG9yZGVyXG4gICAgcGFyYWxsZWwgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgdmFyIGtleXM7IHZhciBsZW5ndGg7IHZhciBpOyB2YXIgcmVzdWx0czsgdmFyIGtpbmQ7XG4gICAgICB2YXIgdXBkYXRlZF90YXNrcyA9IFtdO1xuICAgICAgdmFyIGlzX29iamVjdDtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgaWYgKGlzQXJyYXkodGFza3MpKSB7XG5cbiAgICAgICAgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0gW107XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGFza3MpKSB7XG5cbiAgICAgICAgaXNfb2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAga2V5cyA9IE9iamVjdEtleXModGFza3MpO1xuICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IHt9O1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpPTA7IGk8bGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoaXNfb2JqZWN0KSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazoga2V5c1tpXSwgdDogdGFza3Nba2V5c1tpXV0gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazogaSwgdDogdGFza3NbaV0gfSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkX3Rhc2tzLmZvckVhY2goZnVuY3Rpb24odGFza19vYmplY3QpIHtcblxuICAgICAgICB0YXNrX29iamVjdC50KGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgICByZXN1bHRzW3Rhc2tfb2JqZWN0LmtdID0gcmVzdWx0O1xuXG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIGlmIChjb3VudGVyID09IGxlbmd0aCkgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvLyBvbmx5IGFjY2VwdHMgYW4gYXJyYXkgc2luY2UgdGhlIHByZXNlcnZhdGlvbiBvZiB0aGUgb3JkZXIgb2YgcHJvcGVydGllcyBvbiBhbiBvYmplY3QgY2FuJ3QgYmUgZ3VhcmFudGVlZFxuICAgIC8vIHJldHVybnMgYW4gYXJyYXkgb2YgcmVzdWx0cyBpbiBvcmRlclxuICAgIHNlcmllcyA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFza3MpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIHJ1blRhc2soaW5kZXgpIHtcbiAgICAgICAgdGFza3NbaW5kZXhdKGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSkgcmV0dXJuIHJ1blRhc2soaW5kZXggKyAxKTtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5UYXNrKDApO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgfVxuICAvLyBBTUQgLyBSZXF1aXJlSlNcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFzeW5jO1xuICAgIH0pO1xuICB9XG4gIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgZWxzZSB7XG4gICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICB9XG5cbn0oKSk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlaXNlcXVhbCcpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmluZGNhbGxiYWNrJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICogZXF1aXZhbGVudC4gSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gY29tcGFyZSB2YWx1ZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBjb21wYXJpc29ucyBhcmUgaGFuZGxlZCBieSB0aGUgbWV0aG9kXG4gKiBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwgb3RoZXIgWywgaW5kZXh8a2V5XSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIGNvbXBhcmluZyBhcnJheXMsIGJvb2xlYW5zLCBgRGF0ZWAgb2JqZWN0cyxcbiAqIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsIGFuZCBzdHJpbmdzLiBPYmplY3RzIGFyZSBjb21wYXJlZCBieVxuICogdGhlaXIgb3duLCBub3QgaW5oZXJpdGVkLCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIEZ1bmN0aW9ucyBhbmQgRE9NIG5vZGVzXG4gKiBhcmUgKipub3QqKiBzdXBwb3J0ZWQuIFByb3ZpZGUgYSBjdXN0b21pemVyIGZ1bmN0aW9uIHRvIGV4dGVuZCBzdXBwb3J0XG4gKiBmb3IgY29tcGFyaW5nIG90aGVyIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGVxXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSB2YWx1ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIG90aGVyID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIG9iamVjdCA9PSBvdGhlcjtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0VxdWFsKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGFycmF5ID0gWydoZWxsbycsICdnb29kYnllJ107XG4gKiB2YXIgb3RoZXIgPSBbJ2hpJywgJ2dvb2RieWUnXTtcbiAqXG4gKiBfLmlzRXF1YWwoYXJyYXksIG90aGVyLCBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAqICAgaWYgKF8uZXZlcnkoW3ZhbHVlLCBvdGhlcl0sIFJlZ0V4cC5wcm90b3R5cGUudGVzdCwgL15oKD86aXxlbGxvKSQvKSkge1xuICogICAgIHJldHVybiB0cnVlO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIHRoaXNBcmcpIHtcbiAgY3VzdG9taXplciA9IHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicgPyBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgMykgOiB1bmRlZmluZWQ7XG4gIHZhciByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgb3RoZXIpIDogdW5kZWZpbmVkO1xuICByZXR1cm4gIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyKSA6ICEhcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc3R5cGVkYXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2l0aG91dCBzdXBwb3J0IGZvciBgdGhpc2AgYmluZGluZ1xuICogYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0KHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICBpZiAoIWlzTG9vc2UpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LCBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBkZXRlY3RpbmcgY2lyY3VsYXIgcmVmZXJlbmNlcyBzZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyNKTy5cbiAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gb2JqZWN0KSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF0gPT0gb3RoZXI7XG4gICAgfVxuICB9XG4gIC8vIEFkZCBgb2JqZWN0YCBhbmQgYG90aGVyYCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIHN0YWNrQS5wdXNoKG9iamVjdCk7XG4gIHN0YWNrQi5wdXNoKG90aGVyKTtcblxuICB2YXIgcmVzdWx0ID0gKG9iaklzQXJyID8gZXF1YWxBcnJheXMgOiBlcXVhbE9iamVjdHMpKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuXG4gIHN0YWNrQS5wb3AoKTtcbiAgc3RhY2tCLnBvcCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIGFycmF5cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzTG9vc2UgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIoaXNMb29zZSA/IG90aFZhbHVlIDogYXJyVmFsdWUsIGlzTG9vc2UgPyBhcnJWYWx1ZSA6IG90aFZhbHVlLCBpbmRleCkgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKGlzTG9vc2UpIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgIC8vIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbC5cbiAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICByZXR1cm4gKG9iamVjdCAhPSArb2JqZWN0KVxuICAgICAgICA/IG90aGVyICE9ICtvdGhlclxuICAgICAgICA6IG9iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MgcHJpbWl0aXZlcyBhbmQgc3RyaW5nXG4gICAgICAvLyBvYmplY3RzIGFzIGVxdWFsLiBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTUuMTAuNi40IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc0xvb3NlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzTG9vc2UgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB2YXIgc2tpcEN0b3IgPSBpc0xvb3NlO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihpc0xvb3NlID8gb3RoVmFsdWUgOiBvYmpWYWx1ZSwgaXNMb29zZT8gb2JqVmFsdWUgOiBvdGhWYWx1ZSwga2V5KSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIDogcmVzdWx0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKCFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4zIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQncyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAoZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KSlcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5fZ2V0bmF0aXZlJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCdsb2Rhc2guaXNhcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL15cXGQrJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBnZXROYXRpdmUoT2JqZWN0LCAna2V5cycpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgQ3RvciA9IG9iamVjdCA9PSBudWxsID8gbnVsbCA6IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsIi8qKlxuICogbG9kYXNoIDMuOS4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCdzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjMgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHRoaXNBcmcgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuIl19
