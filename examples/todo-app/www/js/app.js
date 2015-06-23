(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){

var Log = require('./common/modules/log');
var Samson = require('./../../../lib');

// pass in the name of the app object if you want it added to the global scope
var App = Samson.createApp("App");

// add the app name to the global scope if name is passed in
global.App = App;
window.App = App;

global.Colors = require('./common/colors');

// Samson App options
var options = {

  style : require('./common/styles'),

  components : require('./components'),

  pages: require('./pages'),

  // any custom methods/properties you want attached directly to the app object. the context will be the app object
  custom: {
    models : {},
    collections : {}
  },

  router : {
    animations: require('./common/router_animations'),
    defaultNavigateAnimation: "right",
    defaultBackAnimation: "left",
    beforeNavigate: function(data, callback) {
      var error = "You suck at navigating";
      //callback(error); // pass error message through to stop the router navigation from completing
      callback();
    },
    afterNavigate: function(data, callback) {
      callback();
    },
    beforeAnimate: function(data, callback) {
      callback();
    },
    duringAnimate: function(data) { // no callback
      //Log("Router during animate");
    },
    afterAnimate: function(data, callback) {
      callback();
    },
    beforeBack: function(data, callback) {
      callback();
    },
    afterBack: function(data, callback) {
      callback();
    }
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

},{"./../../../lib":36,"./common/colors":2,"./common/modules/log":3,"./common/router_animations":4,"./common/startApp":6,"./common/styles":7,"./components":10,"./pages":22}],2:[function(require,module,exports){

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

var animationAmount = "100%";
var animationDuration = "0.4s";

module.exports = {

  names: {

    "right-fast" : { current: "move-to-left-fast", next: "move-from-right-fast" },
    "left-fast" : { current: "move-to-right-fast", next: "move-from-left-fast" }

  },

  styles: {

    ".move-to-left-fast": {
      "animation-name": "moveToLeftFast",
      "animation-duration": animationDuration
    },

    ".move-from-left-fast": {
      "animation-name": "moveFromLeftFast",
      "animation-duration": animationDuration
    },

    ".move-to-right-fast": {
      "animation-name": "moveToRightFast",
      "animation-duration": animationDuration
    },

    ".move-from-right-fast": {
      "animation-name": "moveFromRightFast",
      "animation-duration": animationDuration
    },

    "@keyframes moveToLeftFast" : {
      to : {
        "Transform": "translateX(-" + animationAmount + ")"
      }
    },

    "@keyframes moveFromLeftFast" : {
      from : {
        "Transform": "translateX(-" + animationAmount + ")"
      }
    },

    "@keyframes moveToRightFast" : {
      to : {
        "Transform": "translateX(" + animationAmount + ")"
      }
    },

    "@keyframes moveFromRightFast" : {
      from : {
        "Transform": "translateX(" + animationAmount + ")"
      }
    }

  }

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

    loadDeviceEvents: function(callback) {
      callback(null);
    },

  }, function(err) {

    if (err) {
      Log("Error loading the app");
    } else {

      Log("App is done loading");

      App.emit("app:initialized");

      App.router.navigate("home", "bottom");

    }

  });

};

},{"./modules/log":3,"async-lite":31}],7:[function(require,module,exports){

module.exports = {
  "#samson_app": {
    "background-color": Colors.lightGray
  }
};

},{}],8:[function(require,module,exports){

function setHeaderHeight() {
  var max = 200; min = 50;
  return (Math.floor(Math.random()*(max-min+1) + min)) + "px";
}

var header_height = setHeaderHeight();

module.exports = {

  el: 'samson_header',
  template: require("./template.jade"),
  style: {

    "#samson_header": {
      "position": "absolute",
      "left": "0",
      "right": "0",
      "top": "0",
      "height": header_height,
      "z-index": 3,
      "box-shadow": "0 0 8px rgba(0,0,0,0.3)",
      "opacity": 1,
      "background-color": "#000000",
      "transition": "all 0.6s ease",
      "Transform": "translate3d(0,-" + header_height + ",0)"
    },

    "#samson_header.show": {
      "opacity": 1,
      "Transform": "translate3d(0,0,0)"
    },

    "#samson_header_title": {
      "position": "absolute",
      "left": "50%",
      "top": "50%",
      "height": "60px",
      "line-height": "60px",
      "width": "50%",
      "Transform": "translate(-50%,-50%)",
      "color": "#ffffff",
      "font-size": "3rem",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

  domEvents: {

    'touch' : function(event) {
      console.log("Header Hit");
    }

  },

  appEvents: {

    'app:initialized': function() {
      App.emit('header:show');
    },

    'header:show': function() {
      this.handleHeader("add");
    },

    'header:hide': function() {
      this.handleHeader("remove");
    }

  },

  extend: {
    headerHeight: header_height,
    handleHeader: function(kind) {
      this.element.classList[kind]("show");
    }
  },

  router: {
    beforeAnimate: function(data, callback) {

      // if the page is fullscreen, then hide the header and stretch the page to the top of the screen
      if (App.router.pageCache[data.nextPage].fullscreen) {
        App.DOM[data.inactivePageElement].style.top = "";
        this.handleHeader("remove");
      } else {
        App.DOM[data.inactivePageElement].style.top = this.headerHeight;
        this.handleHeader("add");
      }

      callback();
    },
    duringAnimate: function(data) { // no callback
      this.setState({title: data.nextPage});
    }
  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      title: "Header"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // cache the header element
    App.DOM.samson_header = this.element;

    callback();

  }

};

},{"./template.jade":9}],9:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (title) {
buf.push("<div id=\"samson_header_title\">" + (jade.escape((jade_interp = title) == null ? '' : jade_interp)) + "</div>");}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
};
},{"jade/runtime":33}],10:[function(require,module,exports){

module.exports = {

  header : require('./header')

};

},{"./header":8}],11:[function(require,module,exports){

module.exports = {

  el: 'blueBox',
  template: require("./template.jade"),
  style: require('./style'),

  events : {

    'touch' : function(event) {
      App.router.navigate("login");
    }

  },

  components : {},

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      printDate : Date.now(),
      name: "sam"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

      callback();

  }

};

},{"./style":12,"./template.jade":13}],12:[function(require,module,exports){

module.exports = {

  "#blueBox": {
    position: "absolute",
    bottom: "100px",
    left: "100px",
    right: "100px",
    height: "200px",
    "background-color": Colors.blue,
    "text-align": "center",
    color: "white",
    "font-size": "4rem"
  }

};

},{}],13:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (printDate) {
buf.push("<p>Home Blue Box " + (jade.escape((jade_interp = printDate) == null ? '' : jade_interp)) + "</p>");}.call(this,"printDate" in locals_for_with?locals_for_with.printDate:typeof printDate!=="undefined"?printDate:undefined));;return buf.join("");
};
},{"jade/runtime":33}],14:[function(require,module,exports){

module.exports = {

  name: 'home',
  subPageOf: false,
  previousPage: false,
  template: require("./template.jade"),
  style: {

    "#home-page": {
      position: "absolute",
      width: "100%",
      height: "100%",
      "background-color": Colors.lightGray,
      "text-align": "center",
      color: "white",
      "font-size": "4rem"
    }

  },

  domEvents : {

    'touch' : function clickHomePage(event, target) {
      this.customHandler();
    }

  },

  appEvents : {

    'topBox:clicked': function(data, event) {
      console.log(data);
    }

  },

  extend : {

    customHandler: function() {
      console.log("Custom handler called. Home Page hit");
    }

  },

  components : {

    topBox : require('./topBox'),
    blueBox : require('./blueBox')
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

},{"./blueBox":11,"./template.jade":15,"./topBox":19}],15:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name) {
buf.push("<h1>" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</h1><div id=\"home-top-box\"></div><div id=\"blueBox\"></div>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
};
},{"jade/runtime":33}],16:[function(require,module,exports){

module.exports = {

  el: '#blackBox',
  template: require("./template.jade"),
  style: require('./style'),

  events : {

  },

  components : {},

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      name: "sam"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

      callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

      callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

      callback();

  }

};

},{"./style":17,"./template.jade":18}],17:[function(require,module,exports){

module.exports = {

  "#blackBox": {
    position: "absolute",
    bottom: "50px",
    left: "50px",
    right: "50px",
    height: "100px",
    "background-color": "black",
    "text-align": "center",
    color: "white",
    "font-size": "2rem"
  }

};

},{}],18:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name) {
buf.push("<p>" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</p>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
};
},{"jade/runtime":33}],19:[function(require,module,exports){

module.exports = {

  el: 'home-top-box',
  template: require("./template.jade"),
  style: require('./style'),

  events : {

    'touch' : function topBoxClick(event, target) {
      App.emit("topBox:clicked", "Home Top Box was clicked");
    },

    'touch #blackBox' : function blackBoxClick(event, target) {
      console.log("Home Black Box hit");
    }

  },

  custom : {

    size: "huge"

  },

  components : {
    blackBox : require("./blackBox")
  },

  // must return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      printDate : Date.now(),
      name: "sam"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

     callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    callback();

  }

};

},{"./blackBox":16,"./style":20,"./template.jade":21}],20:[function(require,module,exports){

module.exports = {

  "#home-top-box": {
    position: "absolute",
    top: "400px",
    left: "100px",
    right: "100px",
    height: "300px",
    "background-color": "white",
    "text-align": "center",
    color: "black",
    "font-size": "4rem"
  }

};

},{}],21:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (printDate) {
buf.push("<p>Home Top Box " + (jade.escape((jade_interp = printDate) == null ? '' : jade_interp)) + "</p>");}.call(this,"printDate" in locals_for_with?locals_for_with.printDate:typeof printDate!=="undefined"?printDate:undefined));;return buf.join("");
};
},{"jade/runtime":33}],22:[function(require,module,exports){

module.exports = {

  home: require('./home'),

  login: require('./login')

};

},{"./home":14,"./login":23}],23:[function(require,module,exports){

module.exports = {

  name: 'login',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),
  style: {

    "#login-page": {
      position: "absolute",
      width: "100%",
      height: "100%",
      "background-color": Colors.lightGray,
      "text-align": "center",
      color: "white",
      "font-size": "4rem"
    }

  },

  extend: {
    fullscreen: true,
  },

  events : {

  },

  appEvents : {
    'something' : function() {
      App.router.navigate("home");
    }
  },

  setComponents : function() {

    var components = {};
    components.redBox = require('./redBox');

    if (App.models.show_top_box) {
      components.topBox = require('./topBox');
    }

    return components;

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      name: "Login Page"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    callback();

  }

};

},{"./redBox":24,"./template.jade":27,"./topBox":28}],24:[function(require,module,exports){

module.exports = {

  el: 'redBox',
  template: require("./template.jade"),
  style: require('./style'),

  events : {

    'touch' : function(event) {
      App.router.navigate("home");
    }

  },

  components : {},

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      printDate : Date.now(),
      name: "sam"
    };

    return state;

  },

  // this function runs before the component is rendered
  beforeRender : function(callback) {

      callback();

  },

  // this function runs after the component is rendered
  afterRender : function(callback) {

      callback();

  },

  // this function runs right before the component is destroyed
  beforeRemove : function(callback) {

      callback();

  }

};

},{"./style":25,"./template.jade":26}],25:[function(require,module,exports){

module.exports = {

  "#redBox": {
    position: "absolute",
    bottom: "100px",
    left: "100px",
    right: "100px",
    height: "200px",
    "background-color": Colors.red,
    "text-align": "center",
    color: "white",
    "font-size": "4rem"
  }

};

},{}],26:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (printDate) {
buf.push("<p>Login Red Box " + (jade.escape((jade_interp = printDate) == null ? '' : jade_interp)) + "</p>");}.call(this,"printDate" in locals_for_with?locals_for_with.printDate:typeof printDate!=="undefined"?printDate:undefined));;return buf.join("");
};
},{"jade/runtime":33}],27:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name) {
buf.push("<h1>" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</h1><div id=\"topBox\"></div><div id=\"redBox\"></div>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
};
},{"jade/runtime":33}],28:[function(require,module,exports){

module.exports = {

  el: 'topBox',
  template: require("./template.jade"),
  style: require('./style'),

  events : {

    'touch' : function(event) {
      console.log("Login Top Box Hit");
    }

  },

  components : {},

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      name: "sam"
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

      callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

      callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

      callback();

  }

};

},{"./style":29,"./template.jade":30}],29:[function(require,module,exports){

module.exports = {

  "#topBox": {
    position: "absolute",
    top: "400px",
    left: "100px",
    right: "100px",
    height: "300px",
    "background-color": "white",
    "text-align": "center",
    color: "black",
    "font-size": "4rem"
  }

};

},{}],30:[function(require,module,exports){
module.exports=require(18)
},{"/Users/Sam/Dropbox/Programming/Projects/samson/examples/todo-app/app/pages/home/topBox/blackBox/template.jade":18,"jade/runtime":33}],31:[function(require,module,exports){
(function (global){
// Tiny Async library for use in modern environments

(function() {

  // root is global on the server, and window in the browser
  var root;
  if (typeof window == 'object' && this === window) {
    root = window;
  } else if (typeof global == 'object' && this === global) {
    root = global;
  } else {
    root = this;
  }

  function noop() {}

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

      if (!Array.isArray(arr) || !arr.length) return callback();

      var completed = 0;
      doEach(arr, function(item) {
        iterator(item, doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          } else {
            completed++;
            if (completed >= arr.length) callback(null);
          }
        }));
      });
    },

    // runs through the array one item at a time
    eachSeries : function(arr, iterator, callback) {
      callback = _doOnce(callback || noop);

      if (!Array.isArray(arr) || !arr.length) return callback();

      var completed = 0;
      var iterate = function() {
        iterator(arr[completed], doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          }
          else {
            completed++;
            if (completed < arr.length) {
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
      var counter = 0;

      if (typeof tasks === "object" && Object.keys(tasks).length) {

        kind = "object";
        keys = Object.keys(tasks);
        length = keys.length;
        results = {};

      } else if (Array.isArray(tasks) && tasks.length) {

        length = tasks.length;
        results = [];

      } else {
        return callback();
      }

      for (i=0; i<length; i++) {

        var task; var key;
        if (kind === "object") {
          key = keys[i];
          task = tasks[key];
        } else {
          task = tasks[i];
        }

        task(function(err, result) {
          if (err) return callback(err);

          if (kind === "object") {
            results[key] = result;
          } else {
            results[i] = result;
          }

          counter++;
          if (counter === length) callback(null, results);
        });

      }

    },

    // only accepts an array since the preservation of the order of properties on an object can't be guaranteed
    // returns an array of results in order
    series : function(tasks, callback) {

      if (!Array.isArray(tasks) || !tasks.length) return callback();

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

},{}],32:[function(require,module,exports){

},{}],33:[function(require,module,exports){
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

},{"fs":32}],34:[function(require,module,exports){
// Samson.Component constructor function
// Used to simplify component rendering and transitions in single page apps

var Samson = require('./index');
var Shared = require('./shared');
var jss = require('jss');

/* options can include:
// el - the id of the element that the view will render into
// template/render - the function that outputs an HTML string that gets attached to the DOM
// style - JSS style object
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

  // jss styleSheet
  if (typeof options.style === "object") {
    this.style = jss.createStyleSheet(options.style, {named: false});
  }

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
  if (!this._template) throw new Error("Your component " + this.el + " must have a render or template function that outputs an HTML string");

  // set the beforeRender function if one is specified
  this.beforeRender = options.beforeRender || Shared.justCallback;

  // set the afterRender function if one is specified
  this.afterRender = options.afterRender || Shared.justCallback;

  // set the remove/close function if one is specified, otherwise just invoke callback
  this.beforeRemove = options.beforeRemove || Shared.justCallback;

  // add any router-related tasks
  this._uuid = this.el + "-" + Date.now();
  this._router = options.router || {};
  var task;
  for (task in this._router) {
    Samson.App.router[task][this._uuid] = this._router[task].bind(this);
  }

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  var prop;
  for (prop in custom) {
    if (Shared.reserved.indexOf(prop) === -1) {
      this[prop] = custom[prop];
    }
  }

}

// Have the SamsonComponent class inherit any shared methods from PageComponentBase
SamsonComponent.prototype._type = "Component";
SamsonComponent.prototype.setState = Shared.setState;
SamsonComponent.prototype._doFirst = Shared._doFirst;
SamsonComponent.prototype._loadEvents = Shared._loadEvents;
SamsonComponent.prototype._destroyEvents = Shared._destroyEvents;
SamsonComponent.prototype._loadComponents = Shared._loadComponents;
SamsonComponent.prototype._renderComponents = Shared._renderComponents;
SamsonComponent.prototype._destroyComponents = Shared._destroyComponents;
SamsonComponent.prototype._remove = Shared._remove;

// render the component to the DOM
SamsonComponent.prototype._render = function(force_update, callback) {

  var self = this;

  this._loadComponents(force_update, function() {

    self._doFirst("beforeRender", function() {

      if (!self._initialStateSet) {
        self.state = self.setInitialState();
        self._initialStateSet = true;

        if (self.style) self.style.attach(); // load the stylesheet on first render
      }

      // create the component element
      if (!self.element || (force_update || self._stateChanged)) {
        force_update = true;
        self.element = document.getElementById(self.el);

        if (!self.element) {
          //console.log("No element with the id " + self.el + " exists in the DOM so we will create it and append it to its parent.");
          self.element = document.createElement("div");
          self.element.id = self.el;

          self.element.innerHTML = self._template(self.state);

          if (self.parent && self.parent.element) {
            self.parent.element.appendChild(self.element);
          } else {
            console.log("There is no parent to append " + self.el + " to.");
          }

        } else {
          self.element.innerHTML = self._template(self.state);
        }

      }

      self._loadEvents(function() {

        self._renderComponents(force_update, function() {

          // reset stateChanged
          self._stateChanged = false;

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};

module.exports = SamsonComponent;

},{"./index":36,"./shared":41,"jss":53}],35:[function(require,module,exports){

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

},{}],36:[function(require,module,exports){
/*!
 * Samson.js
 * Copyright(c) 2015 Sam Delgado
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var $ = require('./modules/quo.js');
var async = require('async-lite');

// JSS and plugins
var jss = require('jss');
var jssVendorPrefixer = require('jss-vendor-prefixer');
var jssExtend = require('jss-extend');
jss.use(jssVendorPrefixer);
jss.use(jssExtend);

var css_reset = require('./styles/reset');
var base_styles = require('./styles/base_styles');

// create the Samson object that will be exported
module.exports = Samson = {};

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

// Samson.DOM will cache references to any Samson created DOM elements like #samson-app and #samson-pages
Samson.DOM = {};

Samson.App; // the instantiated app will be attached to Samson.App for quick access

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

var reserved = ["DOM", "styleSheet", "baseStyle", "style", "components", "router", "router_options", "pages", "on", "emit", "off"];

function SamsonApp() {
  this._isConfigured = false;
}

SamsonApp.prototype.configure = function(options, callback) {

  var self = this;

  if (!this._isConfigured) {

    // add QuoJS to the app object for quick access
    this.$ = $;

    // load the css reset and setup the app's base styles
    base_styles = options.base_styles || base_styles;

    this.baseStyle = jss.createStyleSheet(css_reset, {named: false});
    this.baseStyle.addRules(base_styles);
    this.baseStyle.attach();

    this.styleSheet = options.style || {};
    this.style = jss.createStyleSheet(this.styleSheet, {named: false});
    this.style.attach();

    // setup the app's pages
    this.pages = options.pages || {};

    // setup the app's base components
    this.setComponents = options.setComponents || function() { return (options.components || {}); };
    this.components = this.setComponents();

    // add any unreserved properties passed into the custom/extend object
    var custom = options.extend || options.custom || {};
    var key;
    for (key in custom) {
      if (reserved.indexOf(key) === -1) {
        this[key] = custom[key];
      }
    }

    /* First setup the required DOM elements and components of a Samson App */

    // add the core divs to the body
    // #samson_app, #samson_pages, #samson_page_1, #samson_page_2, #samson_faded_overlay, #samson_transparent_overlay
    Samson.DOM.samson_app = document.createElement("div");
    Samson.DOM.samson_app.id = "samson_app";

    Samson.DOM.samson_faded_overlay = document.createElement("div");
    Samson.DOM.samson_faded_overlay.id = "samson_faded_overlay";
    Samson.DOM.samson_app.appendChild(Samson.DOM.samson_faded_overlay);

    // Respond to show/hide events for the samson_faded_overlay element
    Samson.App.on('faded-overlay:show', function() {
      Samson.DOM.samson_faded_overlay.classList.add("show");
    });

    Samson.App.on('faded-overlay:hide', function() {
      Samson.DOM.samson_faded_overlay.classList.remove("show");
    });

    Samson.DOM.samson_transparent_overlay = document.createElement("div");
    Samson.DOM.samson_transparent_overlay.id = "samson_transparent_overlay";
    Samson.DOM.samson_app.appendChild(Samson.DOM.samson_transparent_overlay);

    // Respond to show/hide events for the samson_transparent_overlay element
    Samson.App.on('transparent-overlay:show', function() {
      Samson.DOM.samson_transparent_overlay.classList.add("show");
    });

    Samson.App.on('transparent-overlay:hide', function() {
      Samson.DOM.samson_transparent_overlay.classList.remove("show");
    });

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
    this.router = Samson.createRouter(options.router || {});

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

},{"./component":34,"./events":35,"./modules/quo.js":37,"./page":38,"./router":40,"./styles/base_styles":42,"./styles/reset":43,"async-lite":45,"jss":53,"jss-extend":46,"jss-vendor-prefixer":47}],37:[function(require,module,exports){
/**
 * QuoJS - Micro #JavaScript Library for Mobile Devices.
 * @version v3.0.7
 * @link    http://quojs.tapquo.com
 * @author  Javi Jimenez Villar (@soyjavi) (https://twitter.com/soyjavi)
 * @license MIT
 */
(function(){"use strict";var t,n=[].indexOf||function(t){for(var n=0,e=this.length;e>n;n++)if(n in this&&this[n]===t)return n;return-1};t=function(){var t,n,e,r,i,u,o,a,c,l,s,f,h,d,p,v,g;return r=[],a=Object.prototype,o=/^\s*<(\w+|!)[^>]*>/,e=[1,9,11],n=/^\.([\w-]+)$/,u=/^#[\w\d-]+$/,s=/^[\w-]+$/,c=document.createElement("table"),l=document.createElement("tr"),i={tr:document.createElement("tbody"),tbody:c,thead:c,tfoot:c,td:l,th:l,"*":document.createElement("div")},t=function(n,e){var r;return n?"function"===t.toType(n)?t(document).ready(n):(r=p(n,e),v(r,n)):v()},t.query=function(t,e){var r;return n.test(e)?r=t.getElementsByClassName(e.replace(".","")):s.test(e)?r=t.getElementsByTagName(e):u.test(e)&&t===document?(r=t.getElementById(e.replace("#","")),r||(r=[])):r=t.querySelectorAll(e),r.nodeType?[r]:Array.prototype.slice.call(r)},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){var e,r;r=[];for(e in n)r.push(t[e]=n[e]);return r}),t},t.toType=function(t){var n;return n=a.toString.call(t).match(/\s([a-z|A-Z]+)/),n.length>1?n[1].toLowerCase():"object"},t.each=function(n,e){var r,i,u,o,a;if(i=void 0,o=void 0,"array"===t.toType(n))for(i=u=0,a=n.length;a>u;i=++u)r=n[i],e.call(r,i,r)===!1;else for(o in n)e.call(n[o],o,n[o])===!1;return n},t.map=function(n,e){var r,i,u,o;if(o=[],r=void 0,i=void 0,"array"===t.toType(n))for(r=0;r<n.length;)u=e(n[r],r),null!=u&&o.push(u),r++;else for(i in n)u=e(n[i],i),null!=u&&o.push(u);return h(o)},t.mix=function(){var t,n,e,r,i;for(e={},t=0,r=arguments.length;r>t;){n=arguments[t];for(i in n)g(n,i)&&void 0!==n[i]&&(e[i]=n[i]);t++}return e},v=function(t,n){return null==n&&(n=""),t=t||r,t.selector=n,t.__proto__=v.prototype,t},p=function(n,r){var i,u;return i=null,u=t.toType(n),"array"===u?i=f(n):"string"===u&&o.test(n)?(i=d(n.trim(),RegExp.$1),n=null):"string"===u?(i=t.query(document,n),r&&(i=1===i.length?t.query(i[0],r):t.map(function(){return t.query(i,r)}))):(e.indexOf(n.nodeType)>=0||n===window)&&(i=[n],n=null),i},d=function(n,e){var r;return null==e&&(e="*"),e in i||(e="*"),r=i[e],r.innerHTML=""+n,t.each(Array.prototype.slice.call(r.childNodes),function(){return r.removeChild(this)})},f=function(t){return t.filter(function(t){return null!=t?t:void 0})},h=function(t){return t.length>0?r.concat.apply(r,t):t},g=function(t,n){return a.hasOwnProperty.call(t,n)},v.prototype=t.fn={},t.fn.each=function(t){return this.forEach(function(n,e){return t.call(n,e,n)}),this},t.fn.filter=function(n){return t(r.filter.call(this,function(e){return e.parentNode&&t.query(e.parentNode,n).indexOf(e)>=0}))},t.fn.forEach=r.forEach,t.fn.indexOf=r.indexOf,t.version="3.0.7",t}(),this.Quo=this.$$=t,"undefined"!=typeof module&&null!==module&&(module.exports=t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n={TYPE:"GET",MIME:"json"},r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},e=0,t.ajaxSettings={type:n.TYPE,async:!0,success:{},error:{},context:null,dataType:n.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:!1,timeout:0},t.ajax=function(e){var r,o,c,f;if(c=t.mix(t.ajaxSettings,e),c.type===n.TYPE?c.url+=t.serialize(c.data,"?"):c.data=t.serialize(c.data),i(c.url))return u(c);f=c.xhr(),f.onreadystatechange=function(){return 4===f.readyState?(clearTimeout(r),s(f,c)):void 0},f.open(c.type,c.url,c.async),l(f,c),c.timeout>0&&(r=setTimeout(function(){return h(f,c)},c.timeout));try{f.send(c.data)}catch(d){o=d,f=o,a("Resource not found",f,c)}return f},t.get=function(n,e,r,i){return t.ajax({url:n,data:e,success:r,dataType:i})},t.post=function(t,n,e,r){return c("POST",t,n,e,r)},t.put=function(t,n,e,r){return c("PUT",t,n,e,r)},t["delete"]=function(t,n,e,r){return c("DELETE",t,n,e,r)},t.json=function(n,e,r){return t.ajax({url:n,data:e,success:r})},t.serialize=function(t,n){var e,r;null==n&&(n=""),r=n;for(e in t)t.hasOwnProperty(e)&&(r!==n&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return r===n?"":r},u=function(n){var r,i,u,o;return n.async?(i="jsonp"+ ++e,u=document.createElement("script"),o={abort:function(){return t(u).remove(),i in window?window[i]={}:void 0}},r=void 0,window[i]=function(e){return clearTimeout(r),t(u).remove(),delete window[i],f(e,o,n)},u.src=n.url.replace(RegExp("=\\?"),"="+i),t("head").append(u),n.timeout>0&&(r=setTimeout(function(){return h(o,n)},n.timeout)),o):console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")},s=function(t,n){t.status>=200&&t.status<300||0===t.status?n.async&&f(o(t,n),t,n):a("QuoJS.ajax: Unsuccesful request",t,n)},f=function(t,n,e){e.success.call(e.context,t,n)},a=function(t,n,e){e.error.call(e.context,t,n,e)},l=function(t,n){var e;n.contentType&&(n.headers["Content-Type"]=n.contentType),n.dataType&&(n.headers.Accept=r[n.dataType]);for(e in n.headers)t.setRequestHeader(e,n.headers[e])},h=function(t,n){t.onreadystatechange={},t.abort(),a("QuoJS.ajax: Timeout exceeded",t,n)},c=function(n,e,r,i,u){return t.ajax({type:n,url:e,data:r,success:i,dataType:u,contentType:"application/x-www-form-urlencoded"})},i=function(t){return RegExp("=\\?").test(t)},o=function(t,e){var r,i;if(i=t,t.responseText){if(e.dataType===n.MIME)try{i=JSON.parse(t.responseText)}catch(u){r=u,i=r,a("QuoJS.ajax: Parse Error",t,e)}"xml"===e.dataType&&(i=t.responseXML)}return i}}(t),function(t){var n,e,r;return n=["-webkit-","-moz-","-ms-","-o-",""],t.fn.addClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.add(o));return u})},t.fn.removeClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.remove(o));return u})},t.fn.toggleClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.toggle(o));return u})},t.fn.hasClass=function(t){return this.length>0&&this[0].classList.contains(t)},t.fn.listClass=function(){return this.length>0?this[0].classList:void 0},t.fn.style=t.fn.css=function(t,n){var e;return null!=n?this.each(function(){return this.style[t]=n}):(e=this[0],e.style[t]||r(e,t))},t.fn.vendor=function(t,e){var r,i,u,o;for(o=[],r=0,i=n.length;i>r;r++)u=n[r],o.push(this.style(""+u+t,e));return o},r=function(t,n){return document.defaultView.getComputedStyle(t,"")[n]},e=function(t){return Array.isArray(t)||(t=[t]),t}}(t),function(t){return t.fn.attr=function(n,e){return this.length>0&&"string"===t.toType(n)?null!=e?this.each(function(){return this.setAttribute(n,e)}):this[0].getAttribute(n):void 0},t.fn.removeAttr=function(n){return this.length>0&&"string"===t.toType(n)?this.each(function(){return this.removeAttribute(n)}):void 0},t.fn.data=function(t,n){return this.attr("data-"+t,n)},t.fn.removeData=function(t){return this.removeAttr("data-"+t)},t.fn.val=function(t){return null!=t?this.each(function(){return this.value=t.toString()}):this.length>0?this[0].value:null},t.fn.show=function(){return this.style("display","block")},t.fn.hide=function(){return this.style("display","none")},t.fn.focus=function(){return this[0].focus()},t.fn.blur=function(){return this[0].blur()},t.fn.offset=function(){var t,n;return this.length>0&&(t=this[0].getBoundingClientRect(),n={left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:t.width,height:t.height}),n}}(t),function(t){var n,e,r,i,u,o;return r=null,n=/WebKit\/([\d.]+)/,e={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/},t.isMobile=function(){return this.environment(),r.isMobile},t.environment=function(){var t,n;return r||(n=navigator.userAgent,t=u(n),r={browser:i(n),isMobile:!!t,screen:o(),os:t}),r},i=function(t){var e;return e=t.match(n),e?e[0]:t},u=function(t){var n,r,i;for(r in e)if(i=t.match(e[r])){n={name:"iphone"===r||"ipad"===r||"ipod"===r?"ios":r,version:i[2].replace("_",".")};break}return n},o=function(){return{width:window.innerWidth,height:window.innerHeight}}}(t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=1,i={},r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},e={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",orientationchange:"resize"},u=/complete|loaded|interactive/,t.fn.on=function(n,e,r){return null==e||"function"===t.toType(e)?this.bind(n,e):this.delegate(e,n,r)},t.fn.off=function(n,e,r){return null==e||"function"===t.toType(e)?this.unbind(n,e):this.undelegate(e,n,r)},t.fn.ready=function(n){return u.test(document.readyState)?n.call(this,t):t.fn.addEvent(document,"DOMContentLoaded",function(){return n.call(this,t)})},t.fn.bind=function(t,n){return this.forEach(function(e){return h(e,t,n)})},t.fn.unbind=function(t,n){return this.each(function(){return d(this,t,n)})},t.fn.delegate=function(n,e,r){return this.each(function(i,u){return h(u,e,r,n,function(e){return function(r){var i,a;return a=t(r.target).closest(n,u).get(0),a?(i=t.extend(o(r),{currentTarget:a,liveFired:u}),e.apply(a,[i].concat([].slice.call(arguments,1)))):void 0}})})},t.fn.undelegate=function(t,n,e){return this.each(function(){return d(this,n,e,t)})},t.fn.trigger=function(n,e,r){return"string"===t.toType(n)&&(n=l(n,e)),null!=r&&(n.originalEvent=r),this.each(function(){return this.dispatchEvent(n)})},t.fn.addEvent=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e},t.fn.removeEvent=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent?t.detachEvent("on"+n,e):t["on"+n]=null},l=function(t,n){var e;return e=document.createEvent("Events"),e.initEvent(t,!0,!0,null,null,null,null,null,null,null,null,null,null,null,null),n&&(e.touch=n),e},h=function(n,e,r,u,o){var l,s,h,d;return e=c(e),h=f(n),s=i[h]||(i[h]=[]),l=o&&o(r,e),d={event:e,callback:r,selector:u,proxy:a(l,r,n),delegate:l,index:s.length},s.push(d),t.fn.addEvent(n,d.event,d.proxy)},d=function(n,e,r,u){var o;return e=c(e),o=f(n),s(o,e,r,u).forEach(function(e){return delete i[o][e.index],t.fn.removeEvent(n,e.event,e.proxy)})},f=function(t){return t._id||(t._id=n++)},c=function(n){var r;return r=("function"==typeof t.isMobile?t.isMobile():void 0)?n:e[n],r||n},a=function(t,n,e){var r;return n=t||n,r=function(t){var r;return r=n.apply(e,[t].concat(t.data)),r===!1&&t.preventDefault(),r}},s=function(t,n,e,r){return(i[t]||[]).filter(function(t){return!(!t||n&&t.event!==n||e&&t.callback!==e||r&&t.selector!==r)})},o=function(n){var e;return e=t.extend({originalEvent:n},n),t.each(r,function(t,r){return e[t]=function(){return this[r]=function(){return!0},n[t].apply(n,arguments)},e[r]=function(){return!1}}),e}}(t),function(t){return t.fn.text=function(t){return null!=t?this.each(function(){return this.textContent=t}):this.length>0?this[0].textContent:""},t.fn.html=function(n){var e;return null!=n?(e=t.toType(n),this.each(function(){return"string"===e?this.innerHTML=n:"array"===e?n.forEach(function(n){return function(e){return t(n).html(e)}}(this)):this.innerHTML+=t(n).html()})):this.length>0?this[0].innerHTML:""},t.fn.remove=function(){return this.each(function(){return null!=this.parentNode?this.parentNode.removeChild(this):void 0})},t.fn.empty=function(){return this.each(function(){return this.innerHTML=null})},t.fn.append=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("beforeend",n):"array"===e?n.forEach(function(n){return function(e){return t(n).append(e)}}(this)):this.appendChild(n)})},t.fn.prepend=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("afterbegin",n):"array"===e?n.each(function(t){return function(n,e){return t.insertBefore(e,t.firstChild)}}(this)):this.insertBefore(n,this.firstChild)})},t.fn.replaceWith=function(n){var e;return e=t.toType(n),this.each(function(){return this.parentNode?"string"===e?this.insertAdjacentHTML("beforeBegin",n):"array"===e?n.each(function(t){return function(n,e){return t.parentNode.insertBefore(e,t)}}(this)):this.parentNode.insertBefore(n,this):void 0}),this.remove()}}(t),function(n){var e,r,i,u;return e="parentNode",n.fn.find=function(e){var r;return r=1===this.length?t.query(this[0],e):this.map(function(){return t.query(this,e)}),n(r)},n.fn.parent=function(t){var n;return n=t?i(this):this.instance(e),r(n,t)},n.fn.children=function(t){var n;return n=this.map(function(){return Array.prototype.slice.call(this.children)}),r(n,t)},n.fn.siblings=function(t){var n;return n=this.map(function(t,n){return Array.prototype.slice.call(n.parentNode.children).filter(function(t){return t!==n})}),r(n,t)},n.fn.get=function(t){return this[t]||null},n.fn.first=function(){return n(this[0])},n.fn.last=function(){return n(this[this.length-1])},n.fn.closest=function(t,e){var r,i;for(i=this[0],r=n(t),r.length||(i=null);i&&r.indexOf(i)<0;)i=i!==e&&i!==document&&i.parentNode;return n(i)},n.fn.next=function(){return u.call(this,"nextSibling")},n.fn.prev=function(){return u.call(this,"previousSibling")},n.fn.instance=function(t){return this.map(function(){return this[t]})},n.fn.map=function(t){return n.map(this,function(n,e){return t.call(n,e,n)})},i=function(t){var e;for(e=[];t.length>0;)t=n.map(t,function(t){return t=t.parentNode,t!==document&&e.indexOf(t)<0?(e.push(t),t):void 0});return e},r=function(t,e){return null!=e?n(t).filter(e):n(t)},u=function(t){var e;for(e=this[0][t];e&&1!==e.nodeType;)e=e[t];return n(e)}}(t),t.Gestures=function(t){var e,r,i,u,o,a,c,l,s,f,h,d,p,v;return d=!1,l={},o=null,f=null,i=["input","select","textarea"],p=function(t){return l[t.name]=t.handler,e(t.events)},v=function(n,e,r){return t(n).trigger(e,r,f)},h=function(t){var e;return e=(t.srcElement||t.target).tagName.toLowerCase(),n.call(i,e)>=0?t.stopPropagation():(d=!0,f=t||event,o=a(t),c("start",t.target,o))},s=function(t){return d?(f=t||event,o=a(t),o.length>1&&f.preventDefault(),c("move",t.target,o)):void 0},u=function(t){return d?(f=t||event,c("end",t.target,o),d=!1):void 0},r=function(t){return d=!1,c("cancel")},e=function(n){return n.forEach(function(n){return t.fn[n]=function(e){return t(document.body).delegate(this.selector,n,e)}}),this},c=function(t,n,e){var r,i,u;u=[];for(i in l)r=l[i],r[t]&&u.push(r[t].call(r,n,e));return u},a=function(t){var n,e,r,i,u;for(r=t.touches||[t],i=[],n=0,e=r.length;e>n;n++)u=r[n],i.push({x:u.pageX,y:u.pageY});return i},t(document).ready(function(){var n;return n=t(document.body),n.bind("touchstart",h),n.bind("touchmove",s),n.bind("touchend",u),n.bind("touchcancel",r)}),{add:p,trigger:v}}(t),t.Gestures.add({name:"basic",events:["touch","hold","doubleTap"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return e=15,n={TAP:200,DOUBLE_TAP:400,HOLD:400},i=null,c=!0,a=null,o=null,u=null,h=function(e,r){return 1===r.length?(o={time:new Date,x:r[0].x,y:r[0].y},a=e,i=setTimeout(function(){return t.trigger(e,"hold",r[0])},n.HOLD)):l()},f=function(t,n){var i;return null!==o&&(i=r(o,n[0]),i.x>e||i.y>e||n.length>1)?l():void 0},s=function(e,a){var c,s;if(o)return c=r(o,a[0]),0!==c.x||0!==c.y?l():(clearTimeout(i),s=new Date,s-o.time<n.TAP?s-u<n.DOUBLE_TAP?(t.trigger(e,"doubleTap",a[0]),u=null):(u=s,t.trigger(e,"touch",a[0])):void 0)},l=function(){return o=null,c=!1,clearTimeout(i)},r=function(t,n){var e;return e={x:n.x-t.x,y:n.y-t.y}},{start:h,move:f,end:s,cancel:l}}(t.Gestures)}),t.Gestures.add({name:"drag",events:["drag","dragging"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n=window.devicePixelRatio>=2?15:20,c=null,o=null,a=null,u=null,h=function(t,n){return n.length>=2?(c=t,o=n.length,a=e(n)):void 0},f=function(t,n){var e;return n.length===o?(e=r(n),u={touches:n,delta:e},i(!0)):void 0},l=s=function(t,n){return a&&u?(i(!1),o=null,a=null,u=null):void 0},r=function(t){var n;return n=e(t),{x:n.x-a.x,y:n.y-a.y}},e=function(t){var n,e,r,i,u;for(i=0,u=0,n=0,e=t.length;e>n;n++)r=t[n],i+=parseInt(r.x),u+=parseInt(r.y);return{x:i/t.length,y:u/t.length}},i=function(e){return e?t.trigger(c,"dragging",u):Math.abs(u.delta.x)>n||Math.abs(u.delta.y)>n?t.trigger(c,"drag",u):void 0},{start:h,move:f,end:s}}(t.Gestures)}),t.Gestures.add({name:"pinch",events:["pinch","pinching","pinchIn","pinchOut"],handler:function(t){var n,e,r,i,u,o,a,c,l,s;return n=window.devicePixelRatio>=2?15:20,o=null,u=null,i=null,s=function(t,n){return 2===n.length?(o=t,u=r(n[0],n[1])):void 0},l=function(t,n){var o;return u&&2===n.length?(o=r(n[0],n[1]),i={touches:n,delta:o-u},e(!0)):void 0},a=c=function(t,n){return u&&i?(e(!1),u=null,i=null):void 0},r=function(t,n){return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))},e=function(e){var r;return e?t.trigger(o,"pinching",i):Math.abs(i.delta)>n?(t.trigger(o,"pinch",i),r=i.delta>0?"pinchOut":"pinchIn",t.trigger(o,r,i)):void 0},{start:s,move:l,end:c}}(t.Gestures)}),t.Gestures.add({name:"rotation",events:["rotate","rotating","rotateLeft","rotateRight"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=5,e=20,l=null,u=0,c=null,i=null,d=function(t,n){return 2===n.length?(l=t,u=0,c=o(n[0],n[1])):void 0},h=function(t,n){var l;return c&&2===n.length?(l=o(n[0],n[1])-c,i&&Math.abs(i.delta-l)>e&&(l+=360*a(i.delta)),Math.abs(l)>360&&(u++,l-=360*a(i.delta)),i={touches:n,delta:l,rotationsCount:u},r(!0)):void 0},s=f=function(t,n){return c&&i?(r(!1),l=null,u=0,c=null,i=null,c=null):void 0},a=function(t){return 0>t?-1:1},o=function(t,n){var e;return e=Math.atan2(t.y-n.y,t.x-n.x),180*(0>e?e+2*Math.PI:e)/Math.PI},r=function(e){var r;return e?t.trigger(l,"rotating",i):Math.abs(i.delta)>n?(t.trigger(l,"rotate",i),r=i.delta>0?"rotateRight":"rotateLeft",t.trigger(l,r,i)):void 0},{start:d,move:h,end:f}}(t.Gestures)}),t.Gestures.add({name:"swipe",events:["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","swiping","swipingHorizontal","swipingVertical"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f;return n=Math.round(20/window.devicePixelRatio),a=null,u=null,o=null,i=null,f=function(t,n){return 1===n.length?(a=t,u=n[0],i=null):void 0},s=function(t,n){var r,o;return 1===n.length?(r={x:n[0].x-u.x,y:n[0].y-u.y},o=null===i,i={x:n[0].x,y:n[0].y,delta:r},e(!0,o)):i=null},c=l=function(t,n){var r;return null==i&&n.length>=1&&(r={x:n[0].x-u.x,y:n[0].y-u.y},i={x:n[0].x,y:n[0].y,delta:r}),i?(e(!1),i=null):void 0},e=function(e,u){var c,l,s,f,h;if(null==u&&(u=!1),e)return u&&(o=r(i.delta.x,i.delta.y)),null!==o&&t.trigger(a,"swiping"+o,i),t.trigger(a,"swiping",i);if(l=[],Math.abs(i.delta.y)>n?l.push(i.delta.y<0?"Up":"Down"):Math.abs(i.delta.x)>n&&l.push(i.delta.x<0?"Left":"Right"),l.length){for(t.trigger(a,"swipe",i),h=[],s=0,f=l.length;f>s;s++)c=l[s],h.push(t.trigger(a,"swipe"+c,i));return h}},r=function(t,n){var e;return e=null,Math.round(Math.abs(t/n))>=2?e="Horizontal":Math.round(Math.abs(n/t))>=2&&(e="Vertical"),e},{start:f,move:s,end:l}}(t.Gestures)})}).call(this);

},{}],38:[function(require,module,exports){
// Samson.Page constructor function
// Used to simplify page rendering and transitions in single page apps

var Samson = require('./index');
var Shared = require('./shared');
var $ = require('./modules/quo.js');
var jss = require('jss');

/* options can include:
// name - name of the page
// subPageOf - an optional parent page that is the start of a specific category - ex: User Bio Page is subPageOf of Profile Page
// previousPage - an optional previous page to make going back easier
// backSafe - false by default. set to true if it is safe to go back to this page from any other page in the app
// template/render - the function that outputs an HTML string that gets attached to the DOM
// style - JSS style object
// components - any other components that should be loaded/refreshed with the page
// events - any events to attach to the page
// beforeRender - a function that runs before the page is rendered (update models, sort collections)
// afterRender - a function that runs after the page is rendered (scroll to the top of the page, marked checkboxes as checked)
// beforeRemove - a function that runs right before the page is fully destroyed (cleanup models, update activity history)
// custom/extend - an object containing custom methods/properties that will be attached directly to the Page instance if there are no naming conflicts with reserved properties
*/

function SamsonPage(options) {

  // set the name of the page
  this.name = options.name;

  // jss styleSheet
  if (typeof options.style === "object") {
    this.style = jss.createStyleSheet(options.style, {named: false});
  }

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
  if (!this._template) throw new Error("Your page " + this.name + " must have a render or template function that outputs an HTML string");

  // set the beforeRender function if one is specified
  this.beforeRender = options.beforeRender || Shared.justCallback;

  // set the afterRender function if one is specified
  this.afterRender = options.afterRender || Shared.justCallback;

  // set the remove/close function if one is specified, otherwise just invoke callback
  this.beforeRemove = options.beforeRemove || Shared.justCallback;

  // add any router-related tasks
  this._uuid = this.name + "-" + Date.now();
  this._router = options.router || {};
  var task;
  for (task in this._router) {
    Samson.App.router[task][this._uuid] = this._router[task].bind(this);
  }

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  var prop;
  for (prop in custom) {
    if (Shared.reserved.indexOf(prop) === -1) {
      this[prop] = custom[prop];
    }
  }

}

// Have the SamsonPage class inherit any shared methods
SamsonPage.prototype._type = "Page";
SamsonPage.prototype.setState = Shared.setState;
SamsonPage.prototype._doFirst = Shared._doFirst;
SamsonPage.prototype._loadEvents = Shared._loadEvents;
SamsonPage.prototype._destroyEvents = Shared._destroyEvents;
SamsonPage.prototype._loadComponents = Shared._loadComponents;
SamsonPage.prototype._renderComponents = Shared._renderComponents;
SamsonPage.prototype._destroyComponents = Shared._destroyComponents;
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

        if (self.style) self.style.attach(); // load the stylesheet on first render
      }

      // create the page element
      if (!self.element) {
        self.element = document.createElement("div");
        self.element.id = self.name + "-page";
        self.element.innerHTML = self._template(self.state);
        page_container.appendChild(self.element);

        // setup the page as an event delegator for all its subcomponents
        self.delegate = $(self.element);
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

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};

module.exports = SamsonPage;

},{"./index":36,"./modules/quo.js":37,"./shared":41,"jss":53}],39:[function(require,module,exports){

var animationAmount = "100%";
var animationDuration = "0.6s";

module.exports = {

  names: {

    "top" : { current: "move-to-bottom", next: "move-from-top" },
    "bottom" : { current: "move-to-top", next: "move-from-bottom" },
    "left" : { current: "move-to-right", next: "move-from-left" },
    "right" : { current: "move-to-left", next: "move-from-right" },
    "scale" : { current: "scale-out", next: "scale-in" },
    "fade" : { current: "fade-out", next: "fade-in" }

  },

  styles: {

    ".move-to-top": {
      "animation-name": "moveToTop",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-from-top": {
      "animation-name": "moveFromTop",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in"
    },

    ".move-to-bottom": {
      "animation-name": "moveToBottom",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in"
    },

    ".move-from-bottom": {
      "animation-name": "moveFromBottom",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in"
    },

    ".move-to-left": {
      "animation-name": "moveToLeft",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-from-left": {
      "animation-name": "moveFromLeft",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-to-right": {
      "animation-name": "moveToRight",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".move-from-right": {
      "animation-name": "moveFromRight",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-out"
    },

    ".scale-out": {
      "animation-name": "scaleOut",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    ".scale-in": {
      "animation-name": "scaleIn",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    ".fade-out": {
      "animation-name": "fadeOut",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    ".fade-in": {
      "animation-name": "fadeIn",
      "animation-duration": animationDuration,
      "animation-timing-function": "ease-in-out"
    },

    "@keyframes moveToTop" : {
      to : {
        "Transform": "translateY(-" + animationAmount + ")"
      }
    },

    "@keyframes moveFromTop" : {
      from : {
        "Transform": "translateY(-" + animationAmount + ")"
      }
    },

    "@keyframes moveToBottom" : {
      to : {
        "Transform": "translateY(" + animationAmount + ")"
      }
    },

    "@keyframes moveFromBottom" : {
      from : {
        "Transform": "translateY(" + animationAmount + ")"
      }
    },

    "@keyframes moveToLeft" : {
      to : {
        "Transform": "translateX(-" + animationAmount + ")"
      }
    },

    "@keyframes moveFromLeft" : {
      from : {
        "Transform": "translateX(-" + animationAmount + ")"
      }
    },

    "@keyframes moveToRight" : {
      to : {
        "Transform": "translateX(" + animationAmount + ")"
      }
    },

    "@keyframes moveFromRight" : {
      from : {
        "Transform": "translateX(" + animationAmount + ")"
      }
    },

    "@keyframes scaleOut" : {
      to : {
        opacity: "0",
        "Transform": "scale(.1)"
      }
    },

    "@keyframes scaleIn" : {
      from : {
        opacity: "0",
        "Transform": "scale(.1)"
      }
    },

    "@keyframes fadeOut" : {
      to : {
        opacity: "0"
      }
    },

    "@keyframes fadeIn" : {
      from : {
        opacity: "0"
      }
    }

  }

};

},{}],40:[function(require,module,exports){
// Samson.Router constructor function
// Used to handle page history and transitions

var Samson = require('../index');
var async = require('async-lite');
var Utils = require('../utils');
var jss = require("jss");

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
  this.animations = base_router_animations.names;
  this.style = jss.createStyleSheet(base_router_animations.styles, {named: false});

  var custom_router_animations = options.animations || {};

  if (custom_router_animations.names && custom_router_animations.styles) {
    this.style.addRules(custom_router_animations.styles);

    var key;
    for (key in custom_router_animations.names) {
      this.animations[key] = custom_router_animations.names[key];
    }
  }
  this.style.attach(); // attach the animations to the running app

  this.currentPage = false; // the name of the page we are currently on

  this.previousPage = false; // the name of the previous page we were on

  this.nextPage = false; // the name of the page we are transitioning to

  this.isBusy = false; // set to true whenever the route is still handling an event

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
    inactivePageElement : this.inactivePageElement
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

  // deactivate the #block-content div so things can be touched again
  // if (App.DOM.contentOverlay) { App.DOM.contentOverlay.classList.remove("block-content"); }

  var self = this;

  var history_object = {};
  history_object.date = new Date();

  // if we are navigating forward
  if (kind === "navigate") {

    history_object.kind = kind;
    history_object.page = this.nextPage;
    this.history.push(history_object);

    // check if the currentPage is safe to go back to from anywhere
    var back_safe = this.currentPage ? Samson.App.pages[this.currentPage].backSafe : false;

    // if the currentPage is backSafe, then set it as the previousPage, otherwise set the configured previousPage
    this.previousPage = back_safe ? this.currentPage : Samson.App.pages[this.nextPage].previousPage;

    // set our currentPage as the page we are going to
    this.currentPage = this.nextPage;


  } else if (kind === "back") {

    history_object.kind = kind;
    history_object.page = this.previousPage;
    this.history.push(history_object);

    // we are going back, so set our currentPage as our previousPage
    this.currentPage = this.previousPage;

    // we are going back, so set the previousPage to the current Page's previousPage
    this.previousPage = Samson.App.pages[this.currentPage].previousPage;

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

  this._doFirst("beforeAnimate", function(err) {

    self.pagesAnimating = true; // set pagesAnimating to true

    // activate the #samson_transparent_overlay so nothing can be touched until the page finished
    Samson.DOM.samson_transparent_overlay.classList.add("show");

    if (animation === "update") {

      self.pageCache[next_page]._render(true, null, function() {
        if (callback) callback();
      });

    } else {

      // determine the type of animation that will be used
      var animation_data = self.getAnimationData(animation);

      // render the new page off screen
      self.pageCache[next_page]._render(false, Samson.DOM[self.inactivePageElement], function() {

        self.doAnimation(animation_data, function () {

          // remove the #samson-transparent-overlay so that touch events work again
          Samson.DOM.samson_transparent_overlay.classList.remove("show");

          if (callback) callback();
        });

      });

    }

  });

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

    // if a page update is requested, but it isn't the current page, then we will simply navigate to it like normal
    if (chosen_animation === "update" && next_page !== this.currentPage) {
      chosen_animation = this.navigateAnimation;
    }

    this.nextPage = next_page;

    // run any necessary tasks before we start the page transition
    this._doFirst("beforeNavigate", function(err) {

      // make sure the page exists before trying to navigate
      if (!Samson.App.pages[next_page] && !err) {
        err = "That page does not exist";
      }

      if (!err) {

        // check to see if we are staying on the same page, if we are then simply update the page
        if (next_page === self.currentPage) {
          chosen_animation = "update";
        } else {
          self.pageCache[next_page] = Samson.createPage(Samson.App.pages[next_page]);
        }

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
        self.pageCache[self.previousPage] = Samson.createPage(Samson.App.pages[self.previousPage]);

        // if the page wants a custom back animation then use it, otherwise use the default back animation
        var backAnimation = Samson.App.pages[self.currentPage].backAnimation || self.backAnimation;

        // animate the page transition
        self.animate(self.previousPage, backAnimation, function() {

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

},{"../index":36,"../utils":44,"./base_router_animations":39,"async-lite":45,"jss":53}],41:[function(require,module,exports){

var Samson = require('./index');
var async = require('async-lite');
var isEqual = require('lodash.isequal');

var shared = {};

// reserved properties for components and pages
shared.reserved = ["name", "el", "element", "template", "subPageOf", "previousPage", "backAnimation", "style", "components", "events", "domEvents", "appEvents", "_loadEvents", "_loadedEvents", "setState", "setInitialState", "beforeRender", "afterRender", "beforeRemove", "_doFirst", "render", "_render", "_template", "_destroyEvents", "_loadComponents", "_componentsLoaded", "_stateChanged", "_initialStateSet", "parent", "_type", "_renderComponents", "_destroyComponents", "_remove", "on", "emit", "off"];

// cached for performance
shared.justCallback = function(cb) { cb(); };
shared.justCallbackTrue = function(cb) { cb(true); };
shared.justReturnObject = function() { return {}; };

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


// run the named function before calling back
shared._doFirst = function(name, callback) {
  this[name](function() {
    callback();
  });
};

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
        self.domEvents[key].call(self, e, this);
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

  // remove the stylesheet
  if (this.style) this.style.detach();

  this._doFirst("beforeRemove", function() {

    self._destroyComponents(function() {

      self._destroyEvents(function() {

        // destroy the DOM element
        if (self.element) {
          if (self.element.parentNode) {
            self.element.parentNode.removeChild(self.element);
          }
          delete self.element; // make sure the DOM node is removed from memory quickly
        }

        // remove any router related tasks
        var task;
        for (task in self._router) {
          delete Samson.App.router[task][self._uuid];
        }

        // remove the event delegator if it exists
        if (self.delegate) {
          delete self.delegate;
        }

        // reset the page's state
        self.state = {};
        self._initialStateSet = false;

        if (callback) callback();

      });

    });

  });

};

module.exports = shared;

},{"./index":36,"async-lite":45,"lodash.isequal":58}],42:[function(require,module,exports){
module.exports = {
  "*, *:before, *:after": {
    "-webkit-box-sizing": "border-box",
    "box-sizing": "border-box"
  },
  "::-webkit-scrollbar": {
    "display": "none"
  },
  "html, body, #samson_app": {
    "position": "relative",
    "width": "100%",
    "height": "100%",
    "background-color": "#FFF"
  },
  "#samson_faded_overlay, #samson_transparent_overlay": {
    "background-color": "#000",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    "z-index": 10,
    opacity: 0,
    visibility: "hidden"
  },
  "#samson_faded_overlay": {
    transition: "opacity 0.2s linear, visibility 0s linear 0.2s"
  },
  "#samson_faded_overlay.show": {
    opacity: "0.6",
    visibility: "visible",
    "transition-delay": "0s"
  },
  "#samson_transparent_overlay.show": {
    visibility: "visible"
  },
  "#samson_pages": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "z-index": 1,
    "overflow": "hidden"
  },
  ".samson-page": {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "opacity": 1,
    "Transform": "translate3d(0,0,0)"
  },
  ".samson-page.active": {
    "z-index": 2
  }
};

},{}],43:[function(require,module,exports){
/*
The MIT License (MIT)

Copyright (c) 2014 Ivan Gabriele

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

module.exports = {
  "*": {
    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
  },
  ":focus": {
    "outline": "none"
  },
  "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, button, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, input, select, textarea, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video": {
    "margin": "0",
    "padding": "0",
    "border": "0",
    "font-size": "100%",
    "font": "inherit",
    "vertical-align": "baseline"
  },
  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section": {
    "display": "block"
  },
  "a": {
    "color": "inherit",
    "outline": "none",
    "text-decoration": "none"
  },
  "blockquote, q": {
    "quotes": "none"
  },
  "blockquote:before, blockquote:after, q:before, q:after": {
    "content": "none"
  },
  "body": {
    "font-smoothing": "antialiased",
    "text-size-adjust": "none",
    "touch-callout": "none",
    "transform": "translateZ(0)",
    "user-select": "none",
    "line-height": "1"
  },
  "caption, th": {
    "text-align": "left"
  },
  "fieldset, img": {
    "border": "0"
  },
  "html": {
    "color": "#000",
    "background": "#fff"
  },
  "legend": {
    "color": "#000"
  },
  "ol, ul": {
    "list-style": "none"
  },
  "sub": {
    "vertical-align": "text-bottom"
  },
  "sup": {
    "vertical-align": "text-top"
  },
  "table": {
    "border-collapse": "collapse",
    "border-spacing": "0"
  },
  "textarea": {
    "resize": "none"
  }
};

},{}],44:[function(require,module,exports){
// Utility functions

var utils = {};

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

},{}],45:[function(require,module,exports){
(function (global){
// Tiny Async library for use in modern environments

(function() {

  // root is global on the server, and window in the browser
  var root;
  if (typeof window == 'object' && this === window) {
    root = window;
  } else if (typeof global == 'object' && this === global) {
    root = global;
  } else {
    root = this;
  }

  function noop() {}

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

      if (!Array.isArray(arr) || !arr.length) return callback();

      var completed = 0;
      doEach(arr, function(item) {
        iterator(item, doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          } else {
            completed++;
            if (completed >= arr.length) callback(null);
          }
        }));
      });
    },

    // runs through the array one item at a time
    eachSeries : function(arr, iterator, callback) {
      callback = _doOnce(callback || noop);

      if (!Array.isArray(arr) || !arr.length) return callback();

      var completed = 0;
      var iterate = function() {
        iterator(arr[completed], doOnce(function(err) {
          if (err) {
            callback(err);
            callback = noop;
          }
          else {
            completed++;
            if (completed < arr.length) {
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
      var counter = 0;

      if (typeof tasks === "object" && Object.keys(tasks).length) {

        kind = "object";
        keys = Object.keys(tasks);
        length = keys.length;
        results = {};

      } else if (Array.isArray(tasks) && tasks.length) {

        length = tasks.length;
        results = [];

      } else {
        return callback();
      }

      for (i=0; i<length; i++) {

        var task; var key;
        if (kind === "object") {
          key = keys[i];
          task = tasks[key];
        } else {
          task = tasks[i];
        }

        task(function(err, result) {
          if (err) return callback(err);

          if (kind === "object") {
            results[key] = result;
          } else {
            results[i] = result;
          }

          counter++;
          if (counter === length) callback(null, results);
        });

      }

    },

    // only accepts an array since the preservation of the order of properties on an object can't be guaranteed
    // returns an array of results in order
    series : function(tasks, callback) {

      if (!Array.isArray(tasks) || !tasks.length) return callback();

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

},{}],46:[function(require,module,exports){
'use strict'

var toString = Object.prototype.toString

/**
 * Handle `extend` property.
 *
 * @param {Rule} rule
 * @api public
 */
module.exports = function (rule) {
    var style = rule.style

    if (!style || !style.extend) return

    var newStyle = {}

    ;(function extend(style) {
        if (toString.call(style.extend) == '[object Array]') {
            for (var i = 0; i < style.extend.length; i++) {
                extend(style.extend[i])
            }
        } else {
            for (var prop in style.extend) {
                if (prop == 'extend') extend(style.extend.extend)
                else newStyle[prop] = style.extend[prop]
            }
        }

        // Copy base style.
        for (var prop in style) {
            if (prop != 'extend') newStyle[prop] = style[prop]
        }
    }(style))

    rule.style = newStyle
}

},{}],47:[function(require,module,exports){
'use strict'

var vendor = require('css-vendor')

var KEYFRAMES = '@keyframes'
var KEYFRAMES_LENGHT = KEYFRAMES.length

/**
 * Add vendor prefix to a property name when needed.
 *
 * @param {Rule} rule
 * @api public
 */
module.exports = function (rule) {
    var style = rule.style

    if (rule.isAtRule && rule.selector.substr(0, KEYFRAMES_LENGHT) == KEYFRAMES) {
        rule.selector = '@' + vendor.prefix.css + 'keyframes' + rule.selector.substr(KEYFRAMES_LENGHT)
        return
    }

    for (var prop in style) {
        var value = style[prop]

        var changeProp = false
        var supportedProp = vendor.supportedProperty(prop)
        if (supportedProp && supportedProp !== prop) changeProp = true

        var changeValue = false
        var supportedValue = vendor.supportedValue(supportedProp, value)
        if (supportedValue && supportedValue !== value) changeValue = true

        if (changeProp || changeValue) {
            if (changeProp) delete style[prop]
            style[supportedProp] = supportedValue
        }
    }
}

},{"css-vendor":48}],48:[function(require,module,exports){
'use strict'

/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String}}
 * @api public
 */
exports.prefix = require('./lib/prefix')

/**
 * Test if a property is supported, returns property with vendor
 * prefix if required, otherwise `false`.
 *
 * @param {String} prop
 * @return {String|Boolean}
 * @api public
 */
exports.supportedProperty = require('./lib/supported-property')

/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */
 exports.supportedValue = require('./lib/supported-value')

},{"./lib/prefix":50,"./lib/supported-property":51,"./lib/supported-value":52}],49:[function(require,module,exports){
'use strict'

var regExp = /[-\s]+(.)?/g

/**
 * Convert dash separated strings to camel cased.
 *
 * @param {String} str
 * @return {String}
 */
module.exports = function(str) {
    return str.replace(regExp, toUpper)
}

function toUpper(match, c) {
    return c ? c.toUpperCase() : ''
}


},{}],50:[function(require,module,exports){
'use strict'

/**
 * Export javascript style and css style vendor prefixes.
 * Based on "transform" support test.
 */

var jsCssMap = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    // IE did it wrong again ...
    ms: '-ms-',
    O: '-o-'
}

var style = document.createElement('p').style
var testProp = 'Transform'

for (var js in jsCssMap) {
    if ((js + testProp) in style) {
        exports.js = js
        exports.css = jsCssMap[js]
        break
    }
}

},{}],51:[function(require,module,exports){
'use strict'

var prefix = require('./prefix')
var camelize = require('./camelize')

var el = document.createElement('p')

/**
 * We test every property on vendor prefix requirement.
 * Once tested, result is cached. It gives us up to 70% perf boost.
 * http://jsperf.com/element-style-object-access-vs-plain-object
 *
 * Prefill cache with known css properties to reduce amount of
 * properties we need to feature test at runtime.
 * http://davidwalsh.name/vendor-prefix
 */
var cache = (function() {
    var computed = window.getComputedStyle(document.documentElement, '')
    var cache = {}

    for (var key in computed) {
        cache[computed[key]] = computed[key]
    }

    return cache
}())

/**
 * Test if a property is supported, returns supported property with vendor
 * prefix if required. Returns `false` if not supported.
 *
 * @param {String} prop dash separated
 * @return {String|Boolean}
 * @api public
 */
module.exports = function (prop) {
    // We have not tested this prop yet, lets do the test.
    if (cache[prop] != null) return cache[prop]

    // Camelization is required because we can't test using
    // css syntax for e.g. in FF.
    // Test if property is supported as it is.
    if (camelize(prop) in el.style) {
        cache[prop] = prop
    // Test if property is supported with vendor prefix.
    } else if ((prefix.js + camelize('-' + prop)) in el.style) {
        cache[prop] = prefix.css + prop
    } else {
        cache[prop] = false
    }

    return cache[prop]
}

},{"./camelize":49,"./prefix":50}],52:[function(require,module,exports){
'use strict'

var prefix = require('./prefix')

var cache = {}

var el = document.createElement('p')

/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */
module.exports = function (property, value) {
    if (typeof value != 'string' || !isNaN(parseInt(value, 10))) return value

    var cacheKey = property + value

    if (cache[cacheKey] != null) return cache[cacheKey]

    // Test value as it is.
    el.style[property] = value

    // Value is supported as it is.
    if (el.style[property] == value) {
        cache[cacheKey] = value
    } else {
        // Test value with vendor prefix.
        value = prefix.css + value
        el.style[property] = value

        // Value is supported with vendor prefix.
        if (el.style[property] == value) cache[cacheKey] = value
    }

    if (!cache[cacheKey]) cache[cacheKey] = false

    return cache[cacheKey]
}

},{"./prefix":50}],53:[function(require,module,exports){
/**
 * StyleSheets written in javascript.
 *
 * @copyright Oleg Slobodskoi 2014
 * @website https://github.com/jsstyles/jss
 * @license MIT
 */

module.exports = require('./lib/index')

},{"./lib/index":56}],54:[function(require,module,exports){
'use strict'

var plugins = require('./plugins')

var uid = 0

var toString = Object.prototype.toString

/**
 * Rule is selector + style hash.
 *
 * @param {String} [selector]
 * @param {Object} [style] declarations block
 * @param {Object} [options]
 * @api public
 */
function Rule(selector, style, options) {
    if (typeof selector == 'object') {
        options = style
        style = selector
        selector = null
    }

    this.id = Rule.uid++
    this.options = options || {}
    if (this.options.named == null) this.options.named = true

    if (selector) {
        this.selector = selector
        this.isAtRule = selector[0] == '@'
    } else {
        this.isAtRule = false
        this.className = Rule.NAMESPACE_PREFIX + '-' + this.id
        this.selector = '.' + this.className
    }

    this.style = style
    // Will be set by StyleSheet#link if link option is true.
    this.CSSRule = null
    // When at-rule has sub rules.
    this.rules = null
    if (this.isAtRule && this.style) this.extractAtRules()
}

module.exports = Rule

/**
 * Class name prefix when generated.
 *
 * @type {String}
 * @api private
 */
Rule.NAMESPACE_PREFIX = 'jss'

/**
 * Indentation string for formatting toString output.
 *
 * @type {String}
 * @api private
 */
Rule.INDENTATION = '  '

/**
 * Unique id, right now just a counter, because there is no need for better uid.
 *
 * @type {Number}
 * @api private
 */
Rule.uid = 0

/**
 * Get or set a style property.
 *
 * @param {String} name
 * @param {String|Number} [value]
 * @return {Rule|String|Number}
 * @api public
 */
Rule.prototype.prop = function (name, value) {
    // Its a setter.
    if (value != null) {
        if (!this.style) this.style = {}
        this.style[name] = value
        // If linked option in StyleSheet is not passed, CSSRule is not defined.
        if (this.CSSRule) this.CSSRule.style[name] = value
        return this
    }

    // Its a getter.
    if (this.style) value = this.style[name]

    // Read the value from the DOM if its not cached.
    if (value == null && this.CSSRule) {
        value = this.CSSRule.style[name]
        // Cache the value after we have got it from the DOM once.
        this.style[name] = value
    }

    return value
}

/**
 * Add child rule. Required for plugins like "nested".
 * StyleSheet will render them as a separate rule.
 *
 * @param {String} selector
 * @param {Object} style
 * @param {Object} [options] rule options
 * @return {Rule}
 * @api private
 */
Rule.prototype.addChild = function (selector, style, options) {
    if (!this.children) this.children = {}
    this.children[selector] = {
        style: style,
        options: options
    }

    return this
}

/**
 * Add child rule. Required for plugins like "nested".
 * StyleSheet will render them as a separate rule.
 *
 * @param {String} selector
 * @param {Object} style
 * @return {Rule}
 * @api public
 */
Rule.prototype.extractAtRules = function () {
    if (!this.rules) this.rules = {}

    for (var name in this.style) {
        var style = this.style[name]
        // Not a nested rule.
        if (typeof style == 'string') break
        var selector = this.options.named ? undefined : name
        var rule = this.rules[name] = new Rule(selector, style, this.options)
        plugins.run(rule)
        delete this.style[name]
    }

    return this
}

/**
 * Apply rule to an element inline.
 *
 * @param {Element} element
 * @return {Rule}
 * @api public
 */
Rule.prototype.applyTo = function (element) {
    for (var prop in this.style) {
        var value = this.style[prop]
        if (toString.call(value) == '[object Array]') {
            for (var i = 0; i < value.length; i++) {
                element.style[prop] = value[i]
            }
        } else {
            element.style[prop] = value
        }
    }

    return this
}

/**
 * Converts the rule to css string.
 *
 * @return {String}
 * @api public
 */
Rule.prototype.toString = function (options) {
    var style = this.style

    // At rules like @charset
    if (this.isAtRule && !this.style && !this.rules) return this.selector + ';'

    if (!options) options = {}
    if (options.indentationLevel == null) options.indentationLevel = 0

    var str = indent(options.indentationLevel, this.selector + ' {')

    for (var prop in style) {
        var value = style[prop]
        // We want to generate multiple style with identical property names.
        if (toString.call(value) == '[object Array]') {
            for (var i = 0; i < value.length; i++) {
                str += '\n' + indent(options.indentationLevel + 1, prop + ': ' + value[i] + ';')
            }
        } else {
            str += '\n' + indent(options.indentationLevel + 1, prop + ': ' + value + ';')
        }
    }

    // We are have an at-rule with nested statements.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
    for (var name in this.rules) {
        var ruleStr = this.rules[name].toString({
            indentationLevel: options.indentationLevel + 1
        })
        str += '\n' + indent(options.indentationLevel, ruleStr)
    }

    str += '\n' + indent(options.indentationLevel, '}')

    return str
}

/**
 * Returns JSON representation of the rule.
 * Nested rules, at-rules and array values are not supported.
 *
 * @return {Object}
 * @api public
 */
Rule.prototype.toJSON = function () {
    var style = {}

    for (var prop in this.style) {
        var value = this.style[prop]
        var type = typeof value
        if (type == 'string' || type == 'number') {
            style[prop] = value
        }
    }

    return style
}

/**
 * Indent a string.
 *
 * @param {Number} level
 * @param {String} str
 * @return {String}
 */
function indent(level, str) {
    var indentStr = ''
    for (var i = 0; i < level; i++) indentStr += Rule.INDENTATION
    return indentStr + str
}

},{"./plugins":57}],55:[function(require,module,exports){
'use strict'

var Rule = require('./Rule')
var plugins = require('./plugins')

/**
 * StyleSheet abstraction, contains rules, injects stylesheet into dom.
 *
 * Options:
 *
 *  - `media` style element attribute
 *  - `title` style element attribute
 *  - `type` style element attribute
 *  - `named` true by default - keys are names, selectors will be generated,
 *    if false - keys are global selectors.
 *  - `link` link jss Rule instances with DOM CSSRule instances so that styles,
 *  can be modified dynamically, false by default because it has some performance cost.
 *
 * @param {Object} [rules] object with selectors and declarations
 * @param {Object} [options]
 * @api public
 */
function StyleSheet(rules, options) {
    this.options = options || {}
    if (this.options.named == null) this.options.named = true
    this.element = null
    this.attached = false
    this.media = this.options.media
    this.type = this.options.type
    this.title = this.options.title
    this.rules = {}
    // Only when options.named: true.
    this.classes = {}
    this.deployed = false
    this.linked = false

    // Don't create element if we are not in a browser environment.
    if (typeof document != 'undefined') {
        this.element = this.createElement()
    }

    for (var key in rules) {
        this.createRules(key, rules[key])
    }
}

StyleSheet.ATTRIBUTES = ['title', 'type', 'media']

module.exports = StyleSheet

/**
 * Insert stylesheet element to render tree.
 *
 * @api public
 * @return {StyleSheet}
 */
StyleSheet.prototype.attach = function () {
    if (this.attached) return this

    if (!this.deployed) {
        this.deploy()
        this.deployed = true
    }

    document.head.appendChild(this.element)

    // Before element is attached to the dom rules are not created.
    if (!this.linked && this.options.link) {
        this.link()
        this.linked = true
    }

    this.attached = true

    return this
}

/**
 * Remove stylesheet element from render tree.
 *
 * @return {StyleSheet}
 * @api public
 */
StyleSheet.prototype.detach = function () {
    if (!this.attached) return this

    this.element.parentNode.removeChild(this.element)
    this.attached = false

    return this
}

/**
 * Deploy styles to the element.
 *
 * @return {StyleSheet}
 * @api private
 */
StyleSheet.prototype.deploy = function () {
    this.element.innerHTML = '\n' + this.toString() + '\n'

    return this
}

/**
 * Find CSSRule objects in the DOM and link them in the corresponding Rule instance.
 *
 * @return {StyleSheet}
 * @api private
 */
StyleSheet.prototype.link = function () {
    var CSSRuleList = this.element.sheet.cssRules
    var rules = this.rules

    for (var i = 0; i < CSSRuleList.length; i++) {
        var CSSRule = CSSRuleList[i]
        var rule = rules[CSSRule.selectorText]
        if (rule) rule.CSSRule = CSSRule
    }

    return this
}

/**
 * Add a rule to the current stylesheet. Will insert a rule also after the stylesheet
 * has been rendered first time.
 *
 * @param {Object} [key] can be selector or name if `options.named` is true
 * @param {Object} style property/value hash
 * @return {Rule}
 * @api public
 */
StyleSheet.prototype.addRule = function (key, style) {
    var rules = this.createRules(key, style)

    // Don't insert rule directly if there is no stringified version yet.
    // It will be inserted all together when .attach is called.
    if (this.deployed) {
        var sheet = this.element.sheet
        for (var i = 0; i < rules.length; i++) {
            var nextIndex = sheet.cssRules.length
            var rule = rules[i]
            sheet.insertRule(rule.toString(), nextIndex)
            if (this.options.link) rule.CSSRule = sheet.cssRules[nextIndex]
        }
    } else {
        this.deploy()
    }

    return rules
}

/**
 * Create rules, will render also after stylesheet was rendered the first time.
 *
 * @param {Object} rules key:style hash.
 * @return {StyleSheet} this
 * @api public
 */
StyleSheet.prototype.addRules = function (rules) {
    for (var key in rules) {
        this.addRule(key, rules[key])
    }

    return this
}

/**
 * Get a rule.
 *
 * @param {String} key can be selector or name if `named` is true.
 * @return {Rule}
 * @api public
 */
StyleSheet.prototype.getRule = function (key) {
    return this.rules[key]
}

/**
 * Convert rules to a css string.
 *
 * @return {String}
 * @api public
 */
StyleSheet.prototype.toString = function () {
    var str = ''
    var rules = this.rules
    var stringified = {}
    for (var key in rules) {
        var rule = rules[key]
        // We have the same rule referenced twice if using named urles.
        // By name and by selector.
        if (stringified[rule.id]) continue
        if (str) str += '\n'
        str += rules[key].toString()
        stringified[rule.id] = true
    }

    return str
}

/**
 * Create a rule, will not render after stylesheet was rendered the first time.
 *
 * @param {Object} [selector] if you don't pass selector - it will be generated
 * @param {Object} [style] declarations block
 * @param {Object} [options] rule options
 * @return {Array} rule can contain child rules
 * @api private
 */
StyleSheet.prototype.createRules = function (key, style, options) {
    var rules = []
    var selector, name

    if (!options) options = {}
    var named = this.options.named
    // Scope options overwrite instance options.
    if (options.named != null) named = options.named

    if (named) name = key
    else selector = key

    var rule = new Rule(selector, style, {
        sheet: this,
        named: named,
        name: name
    })
    rules.push(rule)

    this.rules[rule.selector] = rule
    if (name) {
        this.rules[name] = rule
        this.classes[name] = rule.className
    }

    plugins.run(rule)

    for (key in rule.children) {
        rules.push(this.createRules(
            key,
            rule.children[key].style,
            rule.children[key].options
        ))
    }

    return rules
}

/**
 * Create style sheet element.
 *
 * @api private
 * @return {Element}
 */
StyleSheet.prototype.createElement = function () {
    var element = document.createElement('style')

    StyleSheet.ATTRIBUTES.forEach(function (name) {
        if (this[name]) element.setAttribute(name, this[name])
    }, this)

    return element
}

},{"./Rule":54,"./plugins":57}],56:[function(require,module,exports){
'use strict'

var StyleSheet = require('./StyleSheet')
var Rule = require('./Rule')

exports.StyleSheet = StyleSheet

exports.Rule = Rule

exports.plugins = require('./plugins')

/**
 * Create a stylesheet.
 *
 * @param {Object} rules is selector:style hash.
 * @param {Object} [named] rules have names if true, class names will be generated.
 * @param {Object} [attributes] stylesheet element attributes.
 * @return {StyleSheet}
 * @api public
 */
exports.createStyleSheet = function (rules, named, attributes) {
    return new StyleSheet(rules, named, attributes)
}

/**
 * Create a rule.
 *
 * @param {String} [selector]
 * @param {Object} style is property:value hash.
 * @return {Rule}
 * @api public
 */
exports.createRule = function (selector, style) {
    var rule = new Rule(selector, style)
    exports.plugins.run(rule)
    return rule
}

/**
 * Register plugin. Passed function will be invoked with a rule instance.
 *
 * @param {Function} fn
 * @api public
 */
exports.use = exports.plugins.use

},{"./Rule":54,"./StyleSheet":55,"./plugins":57}],57:[function(require,module,exports){
'use strict'

/**
 * Registered plugins.
 *
 * @type {Array}
 * @api public
 */
exports.registry = []

/**
 * Register plugin. Passed function will be invoked with a rule instance.
 *
 * @param {Function} fn
 * @api public
 */
exports.use = function (fn) {
    exports.registry.push(fn)
}

/**
 * Execute all registered plugins.
 *
 * @param {Rule} rule
 * @api private
 */
exports.run = function (rule) {
    for (var i = 0; i < exports.registry.length; i++) {
        exports.registry[i](rule)
    }
}

},{}],58:[function(require,module,exports){
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

},{"lodash._baseisequal":59,"lodash._bindcallback":65}],59:[function(require,module,exports){
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

},{"lodash.isarray":60,"lodash.istypedarray":61,"lodash.keys":62}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"lodash._getnative":63,"lodash.isarguments":64,"lodash.isarray":60}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbW1vbi9jb2xvcnMuanMiLCJhcHAvY29tbW9uL21vZHVsZXMvbG9nLmpzIiwiYXBwL2NvbW1vbi9yb3V0ZXJfYW5pbWF0aW9ucy5qcyIsImFwcC9jb21tb24vc2V0dGluZ3MuanMiLCJhcHAvY29tbW9uL3N0YXJ0QXBwLmpzIiwiYXBwL2NvbW1vbi9zdHlsZXMuanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvdGVtcGxhdGUuamFkZSIsImFwcC9jb21wb25lbnRzL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2hvbWUvYmx1ZUJveC9pbmRleC5qcyIsImFwcC9wYWdlcy9ob21lL2JsdWVCb3gvc3R5bGUuanMiLCJhcHAvcGFnZXMvaG9tZS9ibHVlQm94L3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaG9tZS9pbmRleC5qcyIsImFwcC9wYWdlcy9ob21lL3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaG9tZS90b3BCb3gvYmxhY2tCb3gvaW5kZXguanMiLCJhcHAvcGFnZXMvaG9tZS90b3BCb3gvYmxhY2tCb3gvc3R5bGUuanMiLCJhcHAvcGFnZXMvaG9tZS90b3BCb3gvYmxhY2tCb3gvdGVtcGxhdGUuamFkZSIsImFwcC9wYWdlcy9ob21lL3RvcEJveC9pbmRleC5qcyIsImFwcC9wYWdlcy9ob21lL3RvcEJveC9zdHlsZS5qcyIsImFwcC9wYWdlcy9ob21lL3RvcEJveC90ZW1wbGF0ZS5qYWRlIiwiYXBwL3BhZ2VzL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2xvZ2luL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2xvZ2luL3JlZEJveC9pbmRleC5qcyIsImFwcC9wYWdlcy9sb2dpbi9yZWRCb3gvc3R5bGUuanMiLCJhcHAvcGFnZXMvbG9naW4vcmVkQm94L3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvbG9naW4vdGVtcGxhdGUuamFkZSIsImFwcC9wYWdlcy9sb2dpbi90b3BCb3gvaW5kZXguanMiLCJhcHAvcGFnZXMvbG9naW4vdG9wQm94L3N0eWxlLmpzIiwibm9kZV9tb2R1bGVzL2FzeW5jLWxpdGUvYXN5bmMtbGl0ZS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwiLi4vLi4vbGliL2NvbXBvbmVudC5qcyIsIi4uLy4uL2xpYi9ldmVudHMuanMiLCIuLi8uLi9saWIvaW5kZXguanMiLCIuLi8uLi9saWIvbW9kdWxlcy9xdW8uanMiLCIuLi8uLi9saWIvcGFnZS5qcyIsIi4uLy4uL2xpYi9yb3V0ZXIvYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucy5qcyIsIi4uLy4uL2xpYi9yb3V0ZXIvaW5kZXguanMiLCIuLi8uLi9saWIvc2hhcmVkLmpzIiwiLi4vLi4vbGliL3N0eWxlcy9iYXNlX3N0eWxlcy5qcyIsIi4uLy4uL2xpYi9zdHlsZXMvcmVzZXQuanMiLCIuLi8uLi9saWIvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXN5bmMtbGl0ZS9hc3luYy1saXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy1leHRlbmQvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL25vZGVfbW9kdWxlcy9jc3MtdmVuZG9yL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvbGliL2NhbWVsaXplLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvbGliL3ByZWZpeC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL25vZGVfbW9kdWxlcy9jc3MtdmVuZG9yL2xpYi9zdXBwb3J0ZWQtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9ub2RlX21vZHVsZXMvY3NzLXZlbmRvci9saWIvc3VwcG9ydGVkLXZhbHVlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MvbGliL1J1bGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2xpYi9TdHlsZVNoZWV0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy9saWIvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2xpYi9wbHVnaW5zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcnJheS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmlzdHlwZWRhcnJheS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guX2dldG5hdGl2ZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FyZ3VtZW50cy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iaW5kY2FsbGJhY2svaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkxBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciBMb2cgPSByZXF1aXJlKCcuL2NvbW1vbi9tb2R1bGVzL2xvZycpO1xudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vbGliJyk7XG5cbi8vIHBhc3MgaW4gdGhlIG5hbWUgb2YgdGhlIGFwcCBvYmplY3QgaWYgeW91IHdhbnQgaXQgYWRkZWQgdG8gdGhlIGdsb2JhbCBzY29wZVxudmFyIEFwcCA9IFNhbXNvbi5jcmVhdGVBcHAoXCJBcHBcIik7XG5cbi8vIGFkZCB0aGUgYXBwIG5hbWUgdG8gdGhlIGdsb2JhbCBzY29wZSBpZiBuYW1lIGlzIHBhc3NlZCBpblxuZ2xvYmFsLkFwcCA9IEFwcDtcbndpbmRvdy5BcHAgPSBBcHA7XG5cbmdsb2JhbC5Db2xvcnMgPSByZXF1aXJlKCcuL2NvbW1vbi9jb2xvcnMnKTtcblxuLy8gU2Ftc29uIEFwcCBvcHRpb25zXG52YXIgb3B0aW9ucyA9IHtcblxuICBzdHlsZSA6IHJlcXVpcmUoJy4vY29tbW9uL3N0eWxlcycpLFxuXG4gIGNvbXBvbmVudHMgOiByZXF1aXJlKCcuL2NvbXBvbmVudHMnKSxcblxuICBwYWdlczogcmVxdWlyZSgnLi9wYWdlcycpLFxuXG4gIC8vIGFueSBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHlvdSB3YW50IGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBhcHAgb2JqZWN0LiB0aGUgY29udGV4dCB3aWxsIGJlIHRoZSBhcHAgb2JqZWN0XG4gIGN1c3RvbToge1xuICAgIG1vZGVscyA6IHt9LFxuICAgIGNvbGxlY3Rpb25zIDoge31cbiAgfSxcblxuICByb3V0ZXIgOiB7XG4gICAgYW5pbWF0aW9uczogcmVxdWlyZSgnLi9jb21tb24vcm91dGVyX2FuaW1hdGlvbnMnKSxcbiAgICBkZWZhdWx0TmF2aWdhdGVBbmltYXRpb246IFwicmlnaHRcIixcbiAgICBkZWZhdWx0QmFja0FuaW1hdGlvbjogXCJsZWZ0XCIsXG4gICAgYmVmb3JlTmF2aWdhdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgZXJyb3IgPSBcIllvdSBzdWNrIGF0IG5hdmlnYXRpbmdcIjtcbiAgICAgIC8vY2FsbGJhY2soZXJyb3IpOyAvLyBwYXNzIGVycm9yIG1lc3NhZ2UgdGhyb3VnaCB0byBzdG9wIHRoZSByb3V0ZXIgbmF2aWdhdGlvbiBmcm9tIGNvbXBsZXRpbmdcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcbiAgICBhZnRlck5hdmlnYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LFxuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG4gICAgZHVyaW5nQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSkgeyAvLyBubyBjYWxsYmFja1xuICAgICAgLy9Mb2coXCJSb3V0ZXIgZHVyaW5nIGFuaW1hdGVcIik7XG4gICAgfSxcbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG4gICAgYmVmb3JlQmFjazogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcbiAgICBhZnRlckJhY2s6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG59O1xuXG5BcHAuY29uZmlndXJlKG9wdGlvbnMsIGZ1bmN0aW9uKCkge1xuXG4gIC8vIFRoZSBTYW1zb24gQXBwIGlzIG5vdyBjb25maWd1cmVkIGFuZCByZWFkeSB0byB1c2VcbiAgTG9nKFwiU2Ftc29uIGFwcCBoYXMgYmVlbiBpbml0aWFsaXplZFwiKTtcblxuICB2YXIgc3RhcnRBcHAgPSByZXF1aXJlKCcuL2NvbW1vbi9zdGFydEFwcCcpO1xuXG4gIC8vIGlmIHdlIGRldGVjdCBjb3Jkb3ZhIHRoZW4gd2FpdCBmb3IgdGhlIGRldmljZXJlYWR5IGV2ZW50XG4gIGlmICh0eXBlb2Ygd2luZG93LmNvcmRvdmEgPT09ICdvYmplY3QnKSB7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIExvZyhcIkRldmljZSBpcyBub3cgcmVhZHlcIik7XG4gICAgICBzdGFydEFwcCgpO1xuICAgIH0sIGZhbHNlKTtcblxuICB9IGVsc2Uge1xuXG4gICAgc3RhcnRBcHAoKTtcblxuICB9XG5cbn0pO1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICB0dXJxdW9pc2U6IFwiIzFhYmM5Y1wiLFxuXG4gIGJsdWU6IFwiIzM0OThkYlwiLFxuXG4gIHB1cnBsZTogXCIjOWI1OWI2XCIsXG5cbiAgbmF2eTogXCIjMzQ0OTVlXCIsXG5cbiAgeWVsbG93OiBcIiNmMWM0MGZcIixcblxuICBvcmFuZ2U6IFwiI2U2N2UyMlwiLFxuXG4gIHJlZDogXCIjYzAzOTJiXCIsXG5cbiAgbGlnaHRHcmF5OiBcIiNiZGMzYzdcIixcblxuICBncmF5OiBcIiM3ZjhjOGRcIixcblxuICBkYXJrR3JheTogXCIjNDQ0NDQ0XCIsXG5cbiAgYmxhY2s6IFwiIzExMTExMVwiLFxuXG4gIHdoaXRlOiBcIiNmZmZmZmZcIlxuXG59O1xuIiwiLy8gYXBwIGxvZ2dpbmcgc2V0dGluZ3NcbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vLi4vc2V0dGluZ3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBMb2cobWVzc2FnZSkge1xuXG4gIGlmICghc2V0dGluZ3MucHJvZHVjdGlvbikge1xuXG4gICAgY29uc29sZS5sb2coXCJEZXZlbG9wbWVudCBNZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgIHJldHVybjtcblxuICB9IGVsc2Uge1xuXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuXG4gIH1cblxufTtcbiIsIlxudmFyIGFuaW1hdGlvbkFtb3VudCA9IFwiMTAwJVwiO1xudmFyIGFuaW1hdGlvbkR1cmF0aW9uID0gXCIwLjRzXCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIG5hbWVzOiB7XG5cbiAgICBcInJpZ2h0LWZhc3RcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLWxlZnQtZmFzdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodC1mYXN0XCIgfSxcbiAgICBcImxlZnQtZmFzdFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tcmlnaHQtZmFzdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1sZWZ0LWZhc3RcIiB9XG5cbiAgfSxcblxuICBzdHlsZXM6IHtcblxuICAgIFwiLm1vdmUtdG8tbGVmdC1mYXN0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9MZWZ0RmFzdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9LFxuXG4gICAgXCIubW92ZS1mcm9tLWxlZnQtZmFzdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21MZWZ0RmFzdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9LFxuXG4gICAgXCIubW92ZS10by1yaWdodC1mYXN0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9SaWdodEZhc3RcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1yaWdodC1mYXN0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbVJpZ2h0RmFzdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb0xlZnRGYXN0XCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKC1cIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlRnJvbUxlZnRGYXN0XCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1JpZ2h0RmFzdFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlRnJvbVJpZ2h0RmFzdFwiIDoge1xuICAgICAgZnJvbSA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwcm9kdWN0aW9uOiBmYWxzZVxuXG59O1xuIiwidmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xudmFyIExvZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9sb2cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBhc3luYy5wYXJhbGxlbCh7XG5cbiAgICBsb2FkRGV2aWNlRXZlbnRzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfSxcblxuICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIExvZyhcIkVycm9yIGxvYWRpbmcgdGhlIGFwcFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBMb2coXCJBcHAgaXMgZG9uZSBsb2FkaW5nXCIpO1xuXG4gICAgICBBcHAuZW1pdChcImFwcDppbml0aWFsaXplZFwiKTtcblxuICAgICAgQXBwLnJvdXRlci5uYXZpZ2F0ZShcImhvbWVcIiwgXCJib3R0b21cIik7XG5cbiAgICB9XG5cbiAgfSk7XG5cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIiNzYW1zb25fYXBwXCI6IHtcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjogQ29sb3JzLmxpZ2h0R3JheVxuICB9XG59O1xuIiwiXG5mdW5jdGlvbiBzZXRIZWFkZXJIZWlnaHQoKSB7XG4gIHZhciBtYXggPSAyMDA7IG1pbiA9IDUwO1xuICByZXR1cm4gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoobWF4LW1pbisxKSArIG1pbikpICsgXCJweFwiO1xufVxuXG52YXIgaGVhZGVyX2hlaWdodCA9IHNldEhlYWRlckhlaWdodCgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ3NhbXNvbl9oZWFkZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHtcblxuICAgIFwiI3NhbXNvbl9oZWFkZXJcIjoge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcImxlZnRcIjogXCIwXCIsXG4gICAgICBcInJpZ2h0XCI6IFwiMFwiLFxuICAgICAgXCJ0b3BcIjogXCIwXCIsXG4gICAgICBcImhlaWdodFwiOiBoZWFkZXJfaGVpZ2h0LFxuICAgICAgXCJ6LWluZGV4XCI6IDMsXG4gICAgICBcImJveC1zaGFkb3dcIjogXCIwIDAgOHB4IHJnYmEoMCwwLDAsMC4zKVwiLFxuICAgICAgXCJvcGFjaXR5XCI6IDEsXG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgMC42cyBlYXNlXCIsXG4gICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKDAsLVwiICsgaGVhZGVyX2hlaWdodCArIFwiLDApXCJcbiAgICB9LFxuXG4gICAgXCIjc2Ftc29uX2hlYWRlci5zaG93XCI6IHtcbiAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIlxuICAgIH0sXG5cbiAgICBcIiNzYW1zb25faGVhZGVyX3RpdGxlXCI6IHtcbiAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgXCJsZWZ0XCI6IFwiNTAlXCIsXG4gICAgICBcInRvcFwiOiBcIjUwJVwiLFxuICAgICAgXCJoZWlnaHRcIjogXCI2MHB4XCIsXG4gICAgICBcImxpbmUtaGVpZ2h0XCI6IFwiNjBweFwiLFxuICAgICAgXCJ3aWR0aFwiOiBcIjUwJVwiLFxuICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKVwiLFxuICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgIFwiZm9udC1zaXplXCI6IFwiM3JlbVwiLFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwibWlkZGxlXCJcbiAgICB9XG5cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgY29uc29sZS5sb2coXCJIZWFkZXIgSGl0XCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50czoge1xuXG4gICAgJ2FwcDppbml0aWFsaXplZCc6IGZ1bmN0aW9uKCkge1xuICAgICAgQXBwLmVtaXQoJ2hlYWRlcjpzaG93Jyk7XG4gICAgfSxcblxuICAgICdoZWFkZXI6c2hvdyc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5oYW5kbGVIZWFkZXIoXCJhZGRcIik7XG4gICAgfSxcblxuICAgICdoZWFkZXI6aGlkZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5oYW5kbGVIZWFkZXIoXCJyZW1vdmVcIik7XG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG4gICAgaGVhZGVySGVpZ2h0OiBoZWFkZXJfaGVpZ2h0LFxuICAgIGhhbmRsZUhlYWRlcjogZnVuY3Rpb24oa2luZCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdFtraW5kXShcInNob3dcIik7XG4gICAgfVxuICB9LFxuXG4gIHJvdXRlcjoge1xuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG5cbiAgICAgIC8vIGlmIHRoZSBwYWdlIGlzIGZ1bGxzY3JlZW4sIHRoZW4gaGlkZSB0aGUgaGVhZGVyIGFuZCBzdHJldGNoIHRoZSBwYWdlIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxuICAgICAgaWYgKEFwcC5yb3V0ZXIucGFnZUNhY2hlW2RhdGEubmV4dFBhZ2VdLmZ1bGxzY3JlZW4pIHtcbiAgICAgICAgQXBwLkRPTVtkYXRhLmluYWN0aXZlUGFnZUVsZW1lbnRdLnN0eWxlLnRvcCA9IFwiXCI7XG4gICAgICAgIHRoaXMuaGFuZGxlSGVhZGVyKFwicmVtb3ZlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgQXBwLkRPTVtkYXRhLmluYWN0aXZlUGFnZUVsZW1lbnRdLnN0eWxlLnRvcCA9IHRoaXMuaGVhZGVySGVpZ2h0O1xuICAgICAgICB0aGlzLmhhbmRsZUhlYWRlcihcImFkZFwiKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LFxuICAgIGR1cmluZ0FuaW1hdGU6IGZ1bmN0aW9uKGRhdGEpIHsgLy8gbm8gY2FsbGJhY2tcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3RpdGxlOiBkYXRhLm5leHRQYWdlfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdGl0bGU6IFwiSGVhZGVyXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSBoZWFkZXIgZWxlbWVudFxuICAgIEFwcC5ET00uc2Ftc29uX2hlYWRlciA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodGl0bGUpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl90aXRsZVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInRpdGxlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50aXRsZTp0eXBlb2YgdGl0bGUhPT1cInVuZGVmaW5lZFwiP3RpdGxlOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgaGVhZGVyIDogcmVxdWlyZSgnLi9oZWFkZXInKVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ2JsdWVCb3gnLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcblxuICBldmVudHMgOiB7XG5cbiAgICAndG91Y2gnIDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIEFwcC5yb3V0ZXIubmF2aWdhdGUoXCJsb2dpblwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBjb21wb25lbnRzIDoge30sXG5cbiAgLy8gbXVzdCBzeW5jaHJvbm91c2x5IHJldHVybiBhbiBvYmplY3QgdGhhdCB3aWxsIHNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29tcG9uZW50LiB0aGlzIG9iamVjdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgdGVtcGxhdGluZyBlbmdpbmVcbiAgc2V0SW5pdGlhbFN0YXRlIDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBwcmludERhdGUgOiBEYXRlLm5vdygpLFxuICAgICAgbmFtZTogXCJzYW1cIlxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYmVmb3JlIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGJlZm9yZVJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgXCIjYmx1ZUJveFwiOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBib3R0b206IFwiMTAwcHhcIixcbiAgICBsZWZ0OiBcIjEwMHB4XCIsXG4gICAgcmlnaHQ6IFwiMTAwcHhcIixcbiAgICBoZWlnaHQ6IFwiMjAwcHhcIixcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjogQ29sb3JzLmJsdWUsXG4gICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgY29sb3I6IFwid2hpdGVcIixcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjRyZW1cIlxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChwcmludERhdGUpIHtcbmJ1Zi5wdXNoKFwiPHA+SG9tZSBCbHVlIEJveCBcIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwcmludERhdGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvcD5cIik7fS5jYWxsKHRoaXMsXCJwcmludERhdGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnByaW50RGF0ZTp0eXBlb2YgcHJpbnREYXRlIT09XCJ1bmRlZmluZWRcIj9wcmludERhdGU6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBuYW1lOiAnaG9tZScsXG4gIHN1YlBhZ2VPZjogZmFsc2UsXG4gIHByZXZpb3VzUGFnZTogZmFsc2UsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZToge1xuXG4gICAgXCIjaG9tZS1wYWdlXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IENvbG9ycy5saWdodEdyYXksXG4gICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgIGNvbG9yOiBcIndoaXRlXCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjRyZW1cIlxuICAgIH1cblxuICB9LFxuXG4gIGRvbUV2ZW50cyA6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbiBjbGlja0hvbWVQYWdlKGV2ZW50LCB0YXJnZXQpIHtcbiAgICAgIHRoaXMuY3VzdG9tSGFuZGxlcigpO1xuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50cyA6IHtcblxuICAgICd0b3BCb3g6Y2xpY2tlZCc6IGZ1bmN0aW9uKGRhdGEsIGV2ZW50KSB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9XG5cbiAgfSxcblxuICBleHRlbmQgOiB7XG5cbiAgICBjdXN0b21IYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQ3VzdG9tIGhhbmRsZXIgY2FsbGVkLiBIb21lIFBhZ2UgaGl0XCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGNvbXBvbmVudHMgOiB7XG5cbiAgICB0b3BCb3ggOiByZXF1aXJlKCcuL3RvcEJveCcpLFxuICAgIGJsdWVCb3ggOiByZXF1aXJlKCcuL2JsdWVCb3gnKVxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgbmFtZTogXCJIb21lIFBhZ2VcIlxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYmVmb3JlIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGJlZm9yZVJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy90aGlzLnRvcEJveC5vZmYoJ2NsaWNrZWQnKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmFtZSkge1xuYnVmLnB1c2goXCI8aDE+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gbmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMT48ZGl2IGlkPVxcXCJob21lLXRvcC1ib3hcXFwiPjwvZGl2PjxkaXYgaWQ9XFxcImJsdWVCb3hcXFwiPjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hbWU6dHlwZW9mIG5hbWUhPT1cInVuZGVmaW5lZFwiP25hbWU6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJyNibGFja0JveCcsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuXG4gIGV2ZW50cyA6IHtcblxuICB9LFxuXG4gIGNvbXBvbmVudHMgOiB7fSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIG5hbWU6IFwic2FtXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBcIiNibGFja0JveFwiOiB7XG4gICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICBib3R0b206IFwiNTBweFwiLFxuICAgIGxlZnQ6IFwiNTBweFwiLFxuICAgIHJpZ2h0OiBcIjUwcHhcIixcbiAgICBoZWlnaHQ6IFwiMTAwcHhcIixcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCJibGFja1wiLFxuICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgIGNvbG9yOiBcIndoaXRlXCIsXG4gICAgXCJmb250LXNpemVcIjogXCIycmVtXCJcbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAobmFtZSkge1xuYnVmLnB1c2goXCI8cD5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBuYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+XCIpO30uY2FsbCh0aGlzLFwibmFtZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubmFtZTp0eXBlb2YgbmFtZSE9PVwidW5kZWZpbmVkXCI/bmFtZTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnaG9tZS10b3AtYm94JyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG4gIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG5cbiAgZXZlbnRzIDoge1xuXG4gICAgJ3RvdWNoJyA6IGZ1bmN0aW9uIHRvcEJveENsaWNrKGV2ZW50LCB0YXJnZXQpIHtcbiAgICAgIEFwcC5lbWl0KFwidG9wQm94OmNsaWNrZWRcIiwgXCJIb21lIFRvcCBCb3ggd2FzIGNsaWNrZWRcIik7XG4gICAgfSxcblxuICAgICd0b3VjaCAjYmxhY2tCb3gnIDogZnVuY3Rpb24gYmxhY2tCb3hDbGljayhldmVudCwgdGFyZ2V0KSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkhvbWUgQmxhY2sgQm94IGhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBjdXN0b20gOiB7XG5cbiAgICBzaXplOiBcImh1Z2VcIlxuXG4gIH0sXG5cbiAgY29tcG9uZW50cyA6IHtcbiAgICBibGFja0JveCA6IHJlcXVpcmUoXCIuL2JsYWNrQm94XCIpXG4gIH0sXG5cbiAgLy8gbXVzdCByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgcHJpbnREYXRlIDogRGF0ZS5ub3coKSxcbiAgICAgIG5hbWU6IFwic2FtXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgXCIjaG9tZS10b3AtYm94XCI6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIHRvcDogXCI0MDBweFwiLFxuICAgIGxlZnQ6IFwiMTAwcHhcIixcbiAgICByaWdodDogXCIxMDBweFwiLFxuICAgIGhlaWdodDogXCIzMDBweFwiLFxuICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXG4gICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgY29sb3I6IFwiYmxhY2tcIixcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjRyZW1cIlxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChwcmludERhdGUpIHtcbmJ1Zi5wdXNoKFwiPHA+SG9tZSBUb3AgQm94IFwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHByaW50RGF0ZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9wPlwiKTt9LmNhbGwodGhpcyxcInByaW50RGF0ZVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucHJpbnREYXRlOnR5cGVvZiBwcmludERhdGUhPT1cInVuZGVmaW5lZFwiP3ByaW50RGF0ZTp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGhvbWU6IHJlcXVpcmUoJy4vaG9tZScpLFxuXG4gIGxvZ2luOiByZXF1aXJlKCcuL2xvZ2luJylcblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgbmFtZTogJ2xvZ2luJyxcbiAgc3ViUGFnZU9mOiBmYWxzZSxcbiAgcHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgYmFja1NhZmU6IHRydWUsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZToge1xuXG4gICAgXCIjbG9naW4tcGFnZVwiOiB7XG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMubGlnaHRHcmF5LFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgXCJmb250LXNpemVcIjogXCI0cmVtXCJcbiAgICB9XG5cbiAgfSxcblxuICBleHRlbmQ6IHtcbiAgICBmdWxsc2NyZWVuOiB0cnVlLFxuICB9LFxuXG4gIGV2ZW50cyA6IHtcblxuICB9LFxuXG4gIGFwcEV2ZW50cyA6IHtcbiAgICAnc29tZXRoaW5nJyA6IGZ1bmN0aW9uKCkge1xuICAgICAgQXBwLnJvdXRlci5uYXZpZ2F0ZShcImhvbWVcIik7XG4gICAgfVxuICB9LFxuXG4gIHNldENvbXBvbmVudHMgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBjb21wb25lbnRzID0ge307XG4gICAgY29tcG9uZW50cy5yZWRCb3ggPSByZXF1aXJlKCcuL3JlZEJveCcpO1xuXG4gICAgaWYgKEFwcC5tb2RlbHMuc2hvd190b3BfYm94KSB7XG4gICAgICBjb21wb25lbnRzLnRvcEJveCA9IHJlcXVpcmUoJy4vdG9wQm94Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XG5cbiAgfSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIG5hbWU6IFwiTG9naW4gUGFnZVwiXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdyZWRCb3gnLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHJlcXVpcmUoJy4vc3R5bGUnKSxcblxuICBldmVudHMgOiB7XG5cbiAgICAndG91Y2gnIDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIEFwcC5yb3V0ZXIubmF2aWdhdGUoXCJob21lXCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGNvbXBvbmVudHMgOiB7fSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHByaW50RGF0ZSA6IERhdGUubm93KCksXG4gICAgICBuYW1lOiBcInNhbVwiXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgXCIjcmVkQm94XCI6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIGJvdHRvbTogXCIxMDBweFwiLFxuICAgIGxlZnQ6IFwiMTAwcHhcIixcbiAgICByaWdodDogXCIxMDBweFwiLFxuICAgIGhlaWdodDogXCIyMDBweFwiLFxuICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMucmVkLFxuICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgIGNvbG9yOiBcIndoaXRlXCIsXG4gICAgXCJmb250LXNpemVcIjogXCI0cmVtXCJcbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAocHJpbnREYXRlKSB7XG5idWYucHVzaChcIjxwPkxvZ2luIFJlZCBCb3ggXCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcHJpbnREYXRlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3A+XCIpO30uY2FsbCh0aGlzLFwicHJpbnREYXRlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5wcmludERhdGU6dHlwZW9mIHByaW50RGF0ZSE9PVwidW5kZWZpbmVkXCI/cHJpbnREYXRlOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hbWUpIHtcbmJ1Zi5wdXNoKFwiPGgxPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IG5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvaDE+PGRpdiBpZD1cXFwidG9wQm94XFxcIj48L2Rpdj48ZGl2IGlkPVxcXCJyZWRCb3hcXFwiPjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hbWU6dHlwZW9mIG5hbWUhPT1cInVuZGVmaW5lZFwiP25hbWU6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ3RvcEJveCcsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuXG4gIGV2ZW50cyA6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgY29uc29sZS5sb2coXCJMb2dpbiBUb3AgQm94IEhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBjb21wb25lbnRzIDoge30sXG5cbiAgLy8gbXVzdCBzeW5jaHJvbm91c2x5IHJldHVybiBhbiBvYmplY3QgdGhhdCB3aWxsIHNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29tcG9uZW50LiB0aGlzIG9iamVjdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgdGVtcGxhdGluZyBlbmdpbmVcbiAgc2V0SW5pdGlhbFN0YXRlIDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBuYW1lOiBcInNhbVwiXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgXCIjdG9wQm94XCI6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIHRvcDogXCI0MDBweFwiLFxuICAgIGxlZnQ6IFwiMTAwcHhcIixcbiAgICByaWdodDogXCIxMDBweFwiLFxuICAgIGhlaWdodDogXCIzMDBweFwiLFxuICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXG4gICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgY29sb3I6IFwiYmxhY2tcIixcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjRyZW1cIlxuICB9XG5cbn07XG4iLCIvLyBUaW55IEFzeW5jIGxpYnJhcnkgZm9yIHVzZSBpbiBtb2Rlcm4gZW52aXJvbm1lbnRzXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyByb290IGlzIGdsb2JhbCBvbiB0aGUgc2VydmVyLCBhbmQgd2luZG93IGluIHRoZSBicm93c2VyXG4gIHZhciByb290O1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB0aGlzID09PSB3aW5kb3cpIHtcbiAgICByb290ID0gd2luZG93O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gZ2xvYmFsKSB7XG4gICAgcm9vdCA9IGdsb2JhbDtcbiAgfSBlbHNlIHtcbiAgICByb290ID0gdGhpcztcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4gIGZ1bmN0aW9uIGRvRWFjaChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZXJhdG9yKGFycltpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBkb09uY2UoZm4pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNhbGxlZCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgYWxyZWFkeSBjYWxsZWQuXCIpO1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHJvb3QsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYW9sYW4vYXN5bmNcbiAgZnVuY3Rpb24gX2RvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSByZXR1cm47XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFzeW5jID0ge1xuXG4gICAgLy8gcnVucyB0aGUgdGFzayBvbiBldmVyeSBpdGVtIGluIHRoZSBhcnJheSBhdCBvbmNlXG4gICAgZWFjaCA6IGZ1bmN0aW9uKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IF9kb09uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG5cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpIHx8ICFhcnIubGVuZ3RoKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGNvbXBsZXRlZCA9IDA7XG4gICAgICBkb0VhY2goYXJyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGl0ZXJhdG9yKGl0ZW0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQrKztcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPj0gYXJyLmxlbmd0aCkgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gcnVucyB0aHJvdWdoIHRoZSBhcnJheSBvbmUgaXRlbSBhdCBhIHRpbWVcbiAgICBlYWNoU2VyaWVzIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcblxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycikgfHwgIWFyci5sZW5ndGgpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIHZhciBpdGVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycltjb21wbGV0ZWRdLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQrKztcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPCBhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGl0ZXJhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgICBpdGVyYXRlKCk7XG4gICAgfSxcblxuICAgIC8vIGNhbiBhY2NlcHQgYW4gb2JqZWN0IG9yIGFycmF5XG4gICAgLy8gd2lsbCByZXR1cm4gYW4gb2JqZWN0IG9yIGFycmF5IG9mIHJlc3VsdHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcbiAgICBwYXJhbGxlbCA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICB2YXIga2V5czsgdmFyIGxlbmd0aDsgdmFyIGk7IHZhciByZXN1bHRzOyB2YXIga2luZDtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgaWYgKHR5cGVvZiB0YXNrcyA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3Qua2V5cyh0YXNrcykubGVuZ3RoKSB7XG5cbiAgICAgICAga2luZCA9IFwib2JqZWN0XCI7XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyh0YXNrcyk7XG4gICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0ge307XG5cbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0YXNrcykgJiYgdGFza3MubGVuZ3RoKSB7XG5cbiAgICAgICAgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0gW107XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGk9MDsgaTxsZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciB0YXNrOyB2YXIga2V5O1xuICAgICAgICBpZiAoa2luZCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgdGFzayA9IHRhc2tzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFzayA9IHRhc2tzW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFzayhmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuXG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJlc3VsdHNba2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0c1tpXSA9IHJlc3VsdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgaWYgKGNvdW50ZXIgPT09IGxlbmd0aCkgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gb25seSBhY2NlcHRzIGFuIGFycmF5IHNpbmNlIHRoZSBwcmVzZXJ2YXRpb24gb2YgdGhlIG9yZGVyIG9mIHByb3BlcnRpZXMgb24gYW4gb2JqZWN0IGNhbid0IGJlIGd1YXJhbnRlZWRcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIHJlc3VsdHMgaW4gb3JkZXJcbiAgICBzZXJpZXMgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRhc2tzKSB8fCAhdGFza3MubGVuZ3RoKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIHJ1blRhc2soaW5kZXgpIHtcbiAgICAgICAgdGFza3NbaW5kZXhdKGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSkgcmV0dXJuIHJ1blRhc2soaW5kZXggKyAxKTtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5UYXNrKDApO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgfVxuICAvLyBBTUQgLyBSZXF1aXJlSlNcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFzeW5jO1xuICAgIH0pO1xuICB9XG4gIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgZWxzZSB7XG4gICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICB9XG5cbn0oKSk7XG4iLG51bGwsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCIvLyBTYW1zb24uQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG4vLyBVc2VkIHRvIHNpbXBsaWZ5IGNvbXBvbmVudCByZW5kZXJpbmcgYW5kIHRyYW5zaXRpb25zIGluIHNpbmdsZSBwYWdlIGFwcHNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBTaGFyZWQgPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xudmFyIGpzcyA9IHJlcXVpcmUoJ2pzcycpO1xuXG4vKiBvcHRpb25zIGNhbiBpbmNsdWRlOlxuLy8gZWwgLSB0aGUgaWQgb2YgdGhlIGVsZW1lbnQgdGhhdCB0aGUgdmlldyB3aWxsIHJlbmRlciBpbnRvXG4vLyB0ZW1wbGF0ZS9yZW5kZXIgLSB0aGUgZnVuY3Rpb24gdGhhdCBvdXRwdXRzIGFuIEhUTUwgc3RyaW5nIHRoYXQgZ2V0cyBhdHRhY2hlZCB0byB0aGUgRE9NXG4vLyBzdHlsZSAtIEpTUyBzdHlsZSBvYmplY3Rcbi8vIGNvbXBvbmVudHMgLSBhbnkgb3RoZXIgY29tcG9uZW50cyB0aGF0IHNob3VsZCBiZSBsb2FkZWQvcmVmcmVzaGVkIHdpdGggdGhpcyBjb21wb25lbnRcbi8vIGV2ZW50cy9kb21FdmVudHMgLSBhbnkgZXZlbnRMaXN0ZW5lcnMgdG8gYXR0YWNoIHRvIERPTSBub2Rlc1xuLy8gYXBwRXZlbnRzIC0gYW55IGludGVybmFsIGFwcCBldmVudExpc3RlbmVyc1xuLy8gYmVmb3JlUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWQgKHVwZGF0ZSBtb2RlbHMsIHNvcnQgY29sbGVjdGlvbnMpXG4vLyBhZnRlclJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWQgKHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLCBtYXJrZWQgY2hlY2tib3hlcyBhcyBjaGVja2VkKVxuLy8gYmVmb3JlUmVtb3ZlIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZnVsbHkgZGVzdHJveWVkIChjbGVhbnVwIG1vZGVscywgdXBkYXRlIGFjdGl2aXR5IGhpc3RvcnkpXG4vLyBjdXN0b20vZXh0ZW5kIC0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgY3VzdG9tIG1ldGhvZHMvcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIENvbXBvbmVudCBpbnN0YW5jZSBpZiB0aGVyZSBhcmUgbm8gbmFtaW5nIGNvbmZsaWN0cyB3aXRoIHJlc2VydmVkIHByb3BlcnRpZXNcbiovXG5cbmZ1bmN0aW9uIFNhbXNvbkNvbXBvbmVudChvcHRpb25zKSB7XG5cbiAgLy8gc2V0IHRoZSBlbGVtZW50J3Mgc2VsZWN0b3IgdGhhdCB3aWxsIGRldGVybWluZSB3aGVyZSB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkXG4gIHRoaXMuZWwgPSAob3B0aW9ucy5lbC5jaGFyQXQoMCkgPT09IFwiI1wiKSA/IG9wdGlvbnMuZWwuc2xpY2UoMSkgOiBvcHRpb25zLmVsO1xuXG4gIC8vIGpzcyBzdHlsZVNoZWV0XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHlsZSA9PT0gXCJvYmplY3RcIikge1xuICAgIHRoaXMuc3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldChvcHRpb25zLnN0eWxlLCB7bmFtZWQ6IGZhbHNlfSk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGNvbXBvbmVudCBldmVudHMgaWYgdGhleSBhcmUgc3BlY2lmaWVkXG4gIHRoaXMuZG9tRXZlbnRzID0gb3B0aW9ucy5ldmVudHMgPyBvcHRpb25zLmV2ZW50cyA6IChvcHRpb25zLmRvbUV2ZW50cyB8fCB7fSk7XG4gIHRoaXMuYXBwRXZlbnRzID0gb3B0aW9ucy5hcHBFdmVudHMgfHwge307XG5cbiAgLy8gc3ViY29tcG9uZW50c1xuICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG4gIHRoaXMuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcblxuICAvLyBzZXRJbml0aWFsU3RhdGUgZnVuY3Rpb25cbiAgdGhpcy5zZXRJbml0aWFsU3RhdGUgPSBvcHRpb25zLnNldEluaXRpYWxTdGF0ZSB8fCBTaGFyZWQuanVzdFJldHVybk9iamVjdDtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xuICB0aGlzLl9pbml0aWFsU3RhdGVTZXQgPSBmYWxzZTtcbiAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gc2V0IHRoZSBjb21wb25lbnQncyByZW5kZXIgZnVuY3Rpb24gdGhhdCB3aWxsIG91dHB1dCBhbiBodG1sIHN0cmluZ1xuICAvLyBpZiBubyByZW5kZXIgZnVuY3Rpb24gd2FzIHBhc3NlZCBpbiwgd2UgY2hlY2sgZm9yIGEgdGVtcGxhdGUgZnVuY3Rpb25cbiAgdGhpcy5fdGVtcGxhdGUgPSBvcHRpb25zLnJlbmRlciB8fCBvcHRpb25zLnRlbXBsYXRlO1xuICBpZiAoIXRoaXMuX3RlbXBsYXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJZb3VyIGNvbXBvbmVudCBcIiArIHRoaXMuZWwgKyBcIiBtdXN0IGhhdmUgYSByZW5kZXIgb3IgdGVtcGxhdGUgZnVuY3Rpb24gdGhhdCBvdXRwdXRzIGFuIEhUTUwgc3RyaW5nXCIpO1xuXG4gIC8vIHNldCB0aGUgYmVmb3JlUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5iZWZvcmVSZW5kZXIgPSBvcHRpb25zLmJlZm9yZVJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgYWZ0ZXJSZW5kZXIgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZFxuICB0aGlzLmFmdGVyUmVuZGVyID0gb3B0aW9ucy5hZnRlclJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgcmVtb3ZlL2Nsb3NlIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWQsIG90aGVyd2lzZSBqdXN0IGludm9rZSBjYWxsYmFja1xuICB0aGlzLmJlZm9yZVJlbW92ZSA9IG9wdGlvbnMuYmVmb3JlUmVtb3ZlIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gYWRkIGFueSByb3V0ZXItcmVsYXRlZCB0YXNrc1xuICB0aGlzLl91dWlkID0gdGhpcy5lbCArIFwiLVwiICsgRGF0ZS5ub3coKTtcbiAgdGhpcy5fcm91dGVyID0gb3B0aW9ucy5yb3V0ZXIgfHwge307XG4gIHZhciB0YXNrO1xuICBmb3IgKHRhc2sgaW4gdGhpcy5fcm91dGVyKSB7XG4gICAgU2Ftc29uLkFwcC5yb3V0ZXJbdGFza11bdGhpcy5fdXVpZF0gPSB0aGlzLl9yb3V0ZXJbdGFza10uYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20gb3IgZXh0ZW5kIG9iamVjdFxuICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gIHZhciBwcm9wO1xuICBmb3IgKHByb3AgaW4gY3VzdG9tKSB7XG4gICAgaWYgKFNoYXJlZC5yZXNlcnZlZC5pbmRleE9mKHByb3ApID09PSAtMSkge1xuICAgICAgdGhpc1twcm9wXSA9IGN1c3RvbVtwcm9wXTtcbiAgICB9XG4gIH1cblxufVxuXG4vLyBIYXZlIHRoZSBTYW1zb25Db21wb25lbnQgY2xhc3MgaW5oZXJpdCBhbnkgc2hhcmVkIG1ldGhvZHMgZnJvbSBQYWdlQ29tcG9uZW50QmFzZVxuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fdHlwZSA9IFwiQ29tcG9uZW50XCI7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gU2hhcmVkLnNldFN0YXRlO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fZG9GaXJzdCA9IFNoYXJlZC5fZG9GaXJzdDtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2xvYWRFdmVudHMgPSBTaGFyZWQuX2xvYWRFdmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9kZXN0cm95RXZlbnRzID0gU2hhcmVkLl9kZXN0cm95RXZlbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fbG9hZENvbXBvbmVudHMgPSBTaGFyZWQuX2xvYWRDb21wb25lbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyQ29tcG9uZW50cyA9IFNoYXJlZC5fcmVuZGVyQ29tcG9uZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2Rlc3Ryb3lDb21wb25lbnRzID0gU2hhcmVkLl9kZXN0cm95Q29tcG9uZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3JlbW92ZSA9IFNoYXJlZC5fcmVtb3ZlO1xuXG4vLyByZW5kZXIgdGhlIGNvbXBvbmVudCB0byB0aGUgRE9NXG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbihmb3JjZV91cGRhdGUsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuX2xvYWRDb21wb25lbnRzKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kb0ZpcnN0KFwiYmVmb3JlUmVuZGVyXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBpZiAoIXNlbGYuX2luaXRpYWxTdGF0ZVNldCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gc2VsZi5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoc2VsZi5zdHlsZSkgc2VsZi5zdHlsZS5hdHRhY2goKTsgLy8gbG9hZCB0aGUgc3R5bGVzaGVldCBvbiBmaXJzdCByZW5kZXJcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBjb21wb25lbnQgZWxlbWVudFxuICAgICAgaWYgKCFzZWxmLmVsZW1lbnQgfHwgKGZvcmNlX3VwZGF0ZSB8fCBzZWxmLl9zdGF0ZUNoYW5nZWQpKSB7XG4gICAgICAgIGZvcmNlX3VwZGF0ZSA9IHRydWU7XG4gICAgICAgIHNlbGYuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGYuZWwpO1xuXG4gICAgICAgIGlmICghc2VsZi5lbGVtZW50KSB7XG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIk5vIGVsZW1lbnQgd2l0aCB0aGUgaWQgXCIgKyBzZWxmLmVsICsgXCIgZXhpc3RzIGluIHRoZSBET00gc28gd2Ugd2lsbCBjcmVhdGUgaXQgYW5kIGFwcGVuZCBpdCB0byBpdHMgcGFyZW50LlwiKTtcbiAgICAgICAgICBzZWxmLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIHNlbGYuZWxlbWVudC5pZCA9IHNlbGYuZWw7XG5cbiAgICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG5cbiAgICAgICAgICBpZiAoc2VsZi5wYXJlbnQgJiYgc2VsZi5wYXJlbnQuZWxlbWVudCkge1xuICAgICAgICAgICAgc2VsZi5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlIGlzIG5vIHBhcmVudCB0byBhcHBlbmQgXCIgKyBzZWxmLmVsICsgXCIgdG8uXCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSBzZWxmLl90ZW1wbGF0ZShzZWxmLnN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2xvYWRFdmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2VsZi5fcmVuZGVyQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcmVzZXQgc3RhdGVDaGFuZ2VkXG4gICAgICAgICAgc2VsZi5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJSZW5kZXJcIiwgZnVuY3Rpb24oKSB7IGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTsgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uQ29tcG9uZW50O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEFkZEV2ZW50cyh0YXJnZXQpIHtcblxuICB2YXIgZXZlbnRzID0ge307IHZhciBlbXB0eSA9IFtdO1xuXG4gIC8vIHN0YXJ0IGxpc3RlbmluZ1xuICB0YXJnZXQub24gPSBmdW5jdGlvbih0eXBlLCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gICAgKGV2ZW50c1t0eXBlXSA9IGV2ZW50c1t0eXBlXSB8fCBbXSkucHVzaChbaGFuZGxlciwgY29udGV4dF0pO1xuICB9O1xuXG4gIC8vIHN0b3AgbGlzdGVuaW5nXG4gIHRhcmdldC5vZmYgPSBmdW5jdGlvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgdHlwZSB8fCAoZXZlbnRzID0ge30pXG4gICAgdmFyIGxpc3QgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksXG4gICAgaSA9IGxpc3QubGVuZ3RoID0gaGFuZGxlciA/IGxpc3QubGVuZ3RoIDogMFxuICAgIHdoaWxlKGktLSkgaGFuZGxlciA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksMSlcbiAgfTtcblxuICAvLyBzZW5kIHRoZSBldmVudCB0byBhbnlvbmUgbGlzdGVuaW5nXG4gIHRhcmdldC5lbWl0ID0gZnVuY3Rpb24odHlwZSl7XG4gICAgdmFyIGFyZ3MgPSBlbXB0eS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSwgaT0wLCBqXG4gICAgd2hpbGUoaj1saXN0W2krK10pIGpbMF0uYXBwbHkoalsxXSwgYXJncylcbiAgfTtcblxufTtcbiIsIi8qIVxuICogU2Ftc29uLmpzXG4gKiBDb3B5cmlnaHQoYykgMjAxNSBTYW0gRGVsZ2Fkb1xuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzXG4gKi9cblxudmFyICQgPSByZXF1aXJlKCcuL21vZHVsZXMvcXVvLmpzJyk7XG52YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG5cbi8vIEpTUyBhbmQgcGx1Z2luc1xudmFyIGpzcyA9IHJlcXVpcmUoJ2pzcycpO1xudmFyIGpzc1ZlbmRvclByZWZpeGVyID0gcmVxdWlyZSgnanNzLXZlbmRvci1wcmVmaXhlcicpO1xudmFyIGpzc0V4dGVuZCA9IHJlcXVpcmUoJ2pzcy1leHRlbmQnKTtcbmpzcy51c2UoanNzVmVuZG9yUHJlZml4ZXIpO1xuanNzLnVzZShqc3NFeHRlbmQpO1xuXG52YXIgY3NzX3Jlc2V0ID0gcmVxdWlyZSgnLi9zdHlsZXMvcmVzZXQnKTtcbnZhciBiYXNlX3N0eWxlcyA9IHJlcXVpcmUoJy4vc3R5bGVzL2Jhc2Vfc3R5bGVzJyk7XG5cbi8vIGNyZWF0ZSB0aGUgU2Ftc29uIG9iamVjdCB0aGF0IHdpbGwgYmUgZXhwb3J0ZWRcbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uID0ge307XG5cblNhbXNvbi5FdmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpOyAvLyBhIG1peGluIHRoYXQgd2lsbCBhdHRhY2ggb24sIG9mZiwgYW5kIGVtaXQgbWV0aG9kcyB0byBhbiBvYmplY3RcblxuU2Ftc29uLlJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG5TYW1zb24uY3JlYXRlUm91dGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgcm91dGVyID0gbmV3IFNhbXNvbi5Sb3V0ZXIob3B0aW9ucyk7XG4gIHJldHVybiByb3V0ZXI7XG59O1xuXG5TYW1zb24uUGFnZSA9IHJlcXVpcmUoJy4vcGFnZScpO1xuU2Ftc29uLmNyZWF0ZVBhZ2UgPSBmdW5jdGlvbihvcHRpb25zLCBhZGRfZXZlbnRzKSB7XG4gIHZhciBwYWdlID0gbmV3IFNhbXNvbi5QYWdlKG9wdGlvbnMpO1xuICBpZiAoYWRkX2V2ZW50cykgU2Ftc29uLkV2ZW50cyhwYWdlKTtcbiAgcmV0dXJuIHBhZ2U7XG59O1xuXG5TYW1zb24uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcblNhbXNvbi5jcmVhdGVDb21wb25lbnQgPSBmdW5jdGlvbihvcHRpb25zLCBhZGRfZXZlbnRzKSB7XG4gIHZhciBjb21wb25lbnQgPSBuZXcgU2Ftc29uLkNvbXBvbmVudChvcHRpb25zKTtcbiAgaWYgKGFkZF9ldmVudHMpIFNhbXNvbi5FdmVudHMoY29tcG9uZW50KTtcbiAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cbi8vIFNhbXNvbi5ET00gd2lsbCBjYWNoZSByZWZlcmVuY2VzIHRvIGFueSBTYW1zb24gY3JlYXRlZCBET00gZWxlbWVudHMgbGlrZSAjc2Ftc29uLWFwcCBhbmQgI3NhbXNvbi1wYWdlc1xuU2Ftc29uLkRPTSA9IHt9O1xuXG5TYW1zb24uQXBwOyAvLyB0aGUgaW5zdGFudGlhdGVkIGFwcCB3aWxsIGJlIGF0dGFjaGVkIHRvIFNhbXNvbi5BcHAgZm9yIHF1aWNrIGFjY2Vzc1xuXG4vLyBvbmx5IG9uZSBTYW1zb24gQXBwIGNhbiBleGlzdCBhdCBhIHRpbWUsIHNvIGlmIG9uZSBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQsIHNpbXBseSByZXR1cm4gaXRcblNhbXNvbi5jcmVhdGVBcHAgPSBmdW5jdGlvbigpIHtcbiAgaWYgKFNhbXNvbi5BcHApIHtcbiAgICByZXR1cm4gU2Ftc29uLkFwcDtcbiAgfSBlbHNlIHtcbiAgICBTYW1zb24uQXBwID0gbmV3IFNhbXNvbkFwcCgpO1xuICAgIFNhbXNvbi5FdmVudHMoU2Ftc29uLkFwcCk7IC8vIG1ha2UgdGhlIG1haW4gYXBwIG9iamVjdCBhbiBldmVudCBidXNcbiAgICBTYW1zb24uQXBwLkRPTSA9IFNhbXNvbi5ET007XG4gICAgcmV0dXJuIFNhbXNvbi5BcHA7XG4gIH1cbn07XG5cbi8vIHRoZSBTYW1zb25BcHAgY2xhc3NcblxudmFyIHJlc2VydmVkID0gW1wiRE9NXCIsIFwic3R5bGVTaGVldFwiLCBcImJhc2VTdHlsZVwiLCBcInN0eWxlXCIsIFwiY29tcG9uZW50c1wiLCBcInJvdXRlclwiLCBcInJvdXRlcl9vcHRpb25zXCIsIFwicGFnZXNcIiwgXCJvblwiLCBcImVtaXRcIiwgXCJvZmZcIl07XG5cbmZ1bmN0aW9uIFNhbXNvbkFwcCgpIHtcbiAgdGhpcy5faXNDb25maWd1cmVkID0gZmFsc2U7XG59XG5cblNhbXNvbkFwcC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLl9pc0NvbmZpZ3VyZWQpIHtcblxuICAgIC8vIGFkZCBRdW9KUyB0byB0aGUgYXBwIG9iamVjdCBmb3IgcXVpY2sgYWNjZXNzXG4gICAgdGhpcy4kID0gJDtcblxuICAgIC8vIGxvYWQgdGhlIGNzcyByZXNldCBhbmQgc2V0dXAgdGhlIGFwcCdzIGJhc2Ugc3R5bGVzXG4gICAgYmFzZV9zdHlsZXMgPSBvcHRpb25zLmJhc2Vfc3R5bGVzIHx8IGJhc2Vfc3R5bGVzO1xuXG4gICAgdGhpcy5iYXNlU3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldChjc3NfcmVzZXQsIHtuYW1lZDogZmFsc2V9KTtcbiAgICB0aGlzLmJhc2VTdHlsZS5hZGRSdWxlcyhiYXNlX3N0eWxlcyk7XG4gICAgdGhpcy5iYXNlU3R5bGUuYXR0YWNoKCk7XG5cbiAgICB0aGlzLnN0eWxlU2hlZXQgPSBvcHRpb25zLnN0eWxlIHx8IHt9O1xuICAgIHRoaXMuc3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldCh0aGlzLnN0eWxlU2hlZXQsIHtuYW1lZDogZmFsc2V9KTtcbiAgICB0aGlzLnN0eWxlLmF0dGFjaCgpO1xuXG4gICAgLy8gc2V0dXAgdGhlIGFwcCdzIHBhZ2VzXG4gICAgdGhpcy5wYWdlcyA9IG9wdGlvbnMucGFnZXMgfHwge307XG5cbiAgICAvLyBzZXR1cCB0aGUgYXBwJ3MgYmFzZSBjb21wb25lbnRzXG4gICAgdGhpcy5zZXRDb21wb25lbnRzID0gb3B0aW9ucy5zZXRDb21wb25lbnRzIHx8IGZ1bmN0aW9uKCkgeyByZXR1cm4gKG9wdGlvbnMuY29tcG9uZW50cyB8fCB7fSk7IH07XG4gICAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG5cbiAgICAvLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyBwYXNzZWQgaW50byB0aGUgY3VzdG9tL2V4dGVuZCBvYmplY3RcbiAgICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiBjdXN0b20pIHtcbiAgICAgIGlmIChyZXNlcnZlZC5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IGN1c3RvbVtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIEZpcnN0IHNldHVwIHRoZSByZXF1aXJlZCBET00gZWxlbWVudHMgYW5kIGNvbXBvbmVudHMgb2YgYSBTYW1zb24gQXBwICovXG5cbiAgICAvLyBhZGQgdGhlIGNvcmUgZGl2cyB0byB0aGUgYm9keVxuICAgIC8vICNzYW1zb25fYXBwLCAjc2Ftc29uX3BhZ2VzLCAjc2Ftc29uX3BhZ2VfMSwgI3NhbXNvbl9wYWdlXzIsICNzYW1zb25fZmFkZWRfb3ZlcmxheSwgI3NhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9hcHAuaWQgPSBcInNhbXNvbl9hcHBcIjtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXkuaWQgPSBcInNhbXNvbl9mYWRlZF9vdmVybGF5XCI7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXkpO1xuXG4gICAgLy8gUmVzcG9uZCB0byBzaG93L2hpZGUgZXZlbnRzIGZvciB0aGUgc2Ftc29uX2ZhZGVkX292ZXJsYXkgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAub24oJ2ZhZGVkLW92ZXJsYXk6c2hvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkRPTS5zYW1zb25fZmFkZWRfb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICB9KTtcblxuICAgIFNhbXNvbi5BcHAub24oJ2ZhZGVkLW92ZXJsYXk6aGlkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkRPTS5zYW1zb25fZmFkZWRfb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICB9KTtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXkuaWQgPSBcInNhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5XCI7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXkpO1xuXG4gICAgLy8gUmVzcG9uZCB0byBzaG93L2hpZGUgZXZlbnRzIGZvciB0aGUgc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXkgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAub24oJ3RyYW5zcGFyZW50LW92ZXJsYXk6c2hvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkRPTS5zYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICB9KTtcblxuICAgIFNhbXNvbi5BcHAub24oJ3RyYW5zcGFyZW50LW92ZXJsYXk6aGlkZScsIGZ1bmN0aW9uKCkge1xuICAgICAgU2Ftc29uLkRPTS5zYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICB9KTtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5pZCA9IFwic2Ftc29uX3BhZ2VzXCI7XG5cbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5pZCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5jbGFzc0xpc3QuYWRkKFwic2Ftc29uLXBhZ2VcIiwgXCJhY3RpdmVcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8xKTtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmlkID0gXCJzYW1zb25fcGFnZV8yXCI7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmNsYXNzTGlzdC5hZGQoXCJzYW1zb24tcGFnZVwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5hcHBlbmRDaGlsZChTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzIpO1xuXG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fYXBwKTsgLy8gYWRkIHRoZSBiYXNlIGRpdnMgdG8gdGhlIGJvZHlcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyByb3V0ZXIgYWZ0ZXIgbG9hZGluZyBhbnkgZXh0cmEgY29tcG9uZW50c1xuICAgIHRoaXMucm91dGVyID0gU2Ftc29uLmNyZWF0ZVJvdXRlcihvcHRpb25zLnJvdXRlciB8fCB7fSk7XG5cbiAgICAvLyBMb2FkIGFueSBvdGhlciBjb21wb25lbnRzXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzZWxmLmNvbXBvbmVudHMpO1xuICAgIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgICBzZWxmW2tleV0gPSBTYW1zb24uY3JlYXRlQ29tcG9uZW50KHNlbGYuY29tcG9uZW50c1trZXldKTtcbiAgICAgIHNlbGZba2V5XS5wYXJlbnQgPSB7ZWxlbWVudDogU2Ftc29uLkRPTS5zYW1zb25fYXBwLCBkZWxlZ2F0ZTogJChTYW1zb24uRE9NLnNhbXNvbl9hcHApfTtcblxuICAgICAgc2VsZltrZXldLl9yZW5kZXIoZmFsc2UsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjYigpO1xuICAgICAgfSk7XG5cbiAgICB9LCBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gdGhlIFNhbXNvbiBBcHAgaXMgbm93IGNvbmZpZ3VyZWRcbiAgICAgIHNlbGYuX2lzQ29uZmlndXJlZCA9IHRydWU7XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcblxuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBTYW1zb24gQXBwIGhhcyBhbHJlYWR5IGJlZW4gY29uZmlndXJlZCFcIik7XG4gIH1cblxufTtcbiIsIi8qKlxuICogUXVvSlMgLSBNaWNybyAjSmF2YVNjcmlwdCBMaWJyYXJ5IGZvciBNb2JpbGUgRGV2aWNlcy5cbiAqIEB2ZXJzaW9uIHYzLjAuN1xuICogQGxpbmsgICAgaHR0cDovL3F1b2pzLnRhcHF1by5jb21cbiAqIEBhdXRob3IgIEphdmkgSmltZW5leiBWaWxsYXIgKEBzb3lqYXZpKSAoaHR0cHM6Ly90d2l0dGVyLmNvbS9zb3lqYXZpKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbihmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0LG49W10uaW5kZXhPZnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBuPTAsZT10aGlzLmxlbmd0aDtlPm47bisrKWlmKG4gaW4gdGhpcyYmdGhpc1tuXT09PXQpcmV0dXJuIG47cmV0dXJuLTF9O3Q9ZnVuY3Rpb24oKXt2YXIgdCxuLGUscixpLHUsbyxhLGMsbCxzLGYsaCxkLHAsdixnO3JldHVybiByPVtdLGE9T2JqZWN0LnByb3RvdHlwZSxvPS9eXFxzKjwoXFx3K3whKVtePl0qPi8sZT1bMSw5LDExXSxuPS9eXFwuKFtcXHctXSspJC8sdT0vXiNbXFx3XFxkLV0rJC8scz0vXltcXHctXSskLyxjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKSxsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKSxpPXt0cjpkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGJvZHlcIiksdGJvZHk6Yyx0aGVhZDpjLHRmb290OmMsdGQ6bCx0aDpsLFwiKlwiOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIil9LHQ9ZnVuY3Rpb24obixlKXt2YXIgcjtyZXR1cm4gbj9cImZ1bmN0aW9uXCI9PT10LnRvVHlwZShuKT90KGRvY3VtZW50KS5yZWFkeShuKToocj1wKG4sZSksdihyLG4pKTp2KCl9LHQucXVlcnk9ZnVuY3Rpb24odCxlKXt2YXIgcjtyZXR1cm4gbi50ZXN0KGUpP3I9dC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGUucmVwbGFjZShcIi5cIixcIlwiKSk6cy50ZXN0KGUpP3I9dC5nZXRFbGVtZW50c0J5VGFnTmFtZShlKTp1LnRlc3QoZSkmJnQ9PT1kb2N1bWVudD8ocj10LmdldEVsZW1lbnRCeUlkKGUucmVwbGFjZShcIiNcIixcIlwiKSkscnx8KHI9W10pKTpyPXQucXVlcnlTZWxlY3RvckFsbChlKSxyLm5vZGVUeXBlP1tyXTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyKX0sdC5leHRlbmQ9ZnVuY3Rpb24odCl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe3ZhciBlLHI7cj1bXTtmb3IoZSBpbiBuKXIucHVzaCh0W2VdPW5bZV0pO3JldHVybiByfSksdH0sdC50b1R5cGU9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49YS50b1N0cmluZy5jYWxsKHQpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKSxuLmxlbmd0aD4xP25bMV0udG9Mb3dlckNhc2UoKTpcIm9iamVjdFwifSx0LmVhY2g9ZnVuY3Rpb24obixlKXt2YXIgcixpLHUsbyxhO2lmKGk9dm9pZCAwLG89dm9pZCAwLFwiYXJyYXlcIj09PXQudG9UeXBlKG4pKWZvcihpPXU9MCxhPW4ubGVuZ3RoO2E+dTtpPSsrdSlyPW5baV0sZS5jYWxsKHIsaSxyKT09PSExO2Vsc2UgZm9yKG8gaW4gbillLmNhbGwobltvXSxvLG5bb10pPT09ITE7cmV0dXJuIG59LHQubWFwPWZ1bmN0aW9uKG4sZSl7dmFyIHIsaSx1LG87aWYobz1bXSxyPXZvaWQgMCxpPXZvaWQgMCxcImFycmF5XCI9PT10LnRvVHlwZShuKSlmb3Iocj0wO3I8bi5sZW5ndGg7KXU9ZShuW3JdLHIpLG51bGwhPXUmJm8ucHVzaCh1KSxyKys7ZWxzZSBmb3IoaSBpbiBuKXU9ZShuW2ldLGkpLG51bGwhPXUmJm8ucHVzaCh1KTtyZXR1cm4gaChvKX0sdC5taXg9ZnVuY3Rpb24oKXt2YXIgdCxuLGUscixpO2ZvcihlPXt9LHQ9MCxyPWFyZ3VtZW50cy5sZW5ndGg7cj50Oyl7bj1hcmd1bWVudHNbdF07Zm9yKGkgaW4gbilnKG4saSkmJnZvaWQgMCE9PW5baV0mJihlW2ldPW5baV0pO3QrK31yZXR1cm4gZX0sdj1mdW5jdGlvbih0LG4pe3JldHVybiBudWxsPT1uJiYobj1cIlwiKSx0PXR8fHIsdC5zZWxlY3Rvcj1uLHQuX19wcm90b19fPXYucHJvdG90eXBlLHR9LHA9ZnVuY3Rpb24obixyKXt2YXIgaSx1O3JldHVybiBpPW51bGwsdT10LnRvVHlwZShuKSxcImFycmF5XCI9PT11P2k9ZihuKTpcInN0cmluZ1wiPT09dSYmby50ZXN0KG4pPyhpPWQobi50cmltKCksUmVnRXhwLiQxKSxuPW51bGwpOlwic3RyaW5nXCI9PT11PyhpPXQucXVlcnkoZG9jdW1lbnQsbiksciYmKGk9MT09PWkubGVuZ3RoP3QucXVlcnkoaVswXSxyKTp0Lm1hcChmdW5jdGlvbigpe3JldHVybiB0LnF1ZXJ5KGkscil9KSkpOihlLmluZGV4T2Yobi5ub2RlVHlwZSk+PTB8fG49PT13aW5kb3cpJiYoaT1bbl0sbj1udWxsKSxpfSxkPWZ1bmN0aW9uKG4sZSl7dmFyIHI7cmV0dXJuIG51bGw9PWUmJihlPVwiKlwiKSxlIGluIGl8fChlPVwiKlwiKSxyPWlbZV0sci5pbm5lckhUTUw9XCJcIituLHQuZWFjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyLmNoaWxkTm9kZXMpLGZ1bmN0aW9uKCl7cmV0dXJuIHIucmVtb3ZlQ2hpbGQodGhpcyl9KX0sZj1mdW5jdGlvbih0KXtyZXR1cm4gdC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXQ/dDp2b2lkIDB9KX0saD1mdW5jdGlvbih0KXtyZXR1cm4gdC5sZW5ndGg+MD9yLmNvbmNhdC5hcHBseShyLHQpOnR9LGc9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbil9LHYucHJvdG90eXBlPXQuZm49e30sdC5mbi5lYWNoPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24obixlKXtyZXR1cm4gdC5jYWxsKG4sZSxuKX0pLHRoaXN9LHQuZm4uZmlsdGVyPWZ1bmN0aW9uKG4pe3JldHVybiB0KHIuZmlsdGVyLmNhbGwodGhpcyxmdW5jdGlvbihlKXtyZXR1cm4gZS5wYXJlbnROb2RlJiZ0LnF1ZXJ5KGUucGFyZW50Tm9kZSxuKS5pbmRleE9mKGUpPj0wfSkpfSx0LmZuLmZvckVhY2g9ci5mb3JFYWNoLHQuZm4uaW5kZXhPZj1yLmluZGV4T2YsdC52ZXJzaW9uPVwiMy4wLjdcIix0fSgpLHRoaXMuUXVvPXRoaXMuJCQ9dCxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9dCksZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoO3JldHVybiBuPXtUWVBFOlwiR0VUXCIsTUlNRTpcImpzb25cIn0scj17c2NyaXB0OlwidGV4dC9qYXZhc2NyaXB0LCBhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIsanNvbjpcImFwcGxpY2F0aW9uL2pzb25cIix4bWw6XCJhcHBsaWNhdGlvbi94bWwsIHRleHQveG1sXCIsaHRtbDpcInRleHQvaHRtbFwiLHRleHQ6XCJ0ZXh0L3BsYWluXCJ9LGU9MCx0LmFqYXhTZXR0aW5ncz17dHlwZTpuLlRZUEUsYXN5bmM6ITAsc3VjY2Vzczp7fSxlcnJvcjp7fSxjb250ZXh0Om51bGwsZGF0YVR5cGU6bi5NSU1FLGhlYWRlcnM6e30seGhyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3R9LGNyb3NzRG9tYWluOiExLHRpbWVvdXQ6MH0sdC5hamF4PWZ1bmN0aW9uKGUpe3ZhciByLG8sYyxmO2lmKGM9dC5taXgodC5hamF4U2V0dGluZ3MsZSksYy50eXBlPT09bi5UWVBFP2MudXJsKz10LnNlcmlhbGl6ZShjLmRhdGEsXCI/XCIpOmMuZGF0YT10LnNlcmlhbGl6ZShjLmRhdGEpLGkoYy51cmwpKXJldHVybiB1KGMpO2Y9Yy54aHIoKSxmLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe3JldHVybiA0PT09Zi5yZWFkeVN0YXRlPyhjbGVhclRpbWVvdXQocikscyhmLGMpKTp2b2lkIDB9LGYub3BlbihjLnR5cGUsYy51cmwsYy5hc3luYyksbChmLGMpLGMudGltZW91dD4wJiYocj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIGgoZixjKX0sYy50aW1lb3V0KSk7dHJ5e2Yuc2VuZChjLmRhdGEpfWNhdGNoKGQpe289ZCxmPW8sYShcIlJlc291cmNlIG5vdCBmb3VuZFwiLGYsYyl9cmV0dXJuIGZ9LHQuZ2V0PWZ1bmN0aW9uKG4sZSxyLGkpe3JldHVybiB0LmFqYXgoe3VybDpuLGRhdGE6ZSxzdWNjZXNzOnIsZGF0YVR5cGU6aX0pfSx0LnBvc3Q9ZnVuY3Rpb24odCxuLGUscil7cmV0dXJuIGMoXCJQT1NUXCIsdCxuLGUscil9LHQucHV0PWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiUFVUXCIsdCxuLGUscil9LHRbXCJkZWxldGVcIl09ZnVuY3Rpb24odCxuLGUscil7cmV0dXJuIGMoXCJERUxFVEVcIix0LG4sZSxyKX0sdC5qc29uPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gdC5hamF4KHt1cmw6bixkYXRhOmUsc3VjY2VzczpyfSl9LHQuc2VyaWFsaXplPWZ1bmN0aW9uKHQsbil7dmFyIGUscjtudWxsPT1uJiYobj1cIlwiKSxyPW47Zm9yKGUgaW4gdCl0Lmhhc093blByb3BlcnR5KGUpJiYociE9PW4mJihyKz1cIiZcIikscis9ZW5jb2RlVVJJQ29tcG9uZW50KGUpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudCh0W2VdKSk7cmV0dXJuIHI9PT1uP1wiXCI6cn0sdT1mdW5jdGlvbihuKXt2YXIgcixpLHUsbztyZXR1cm4gbi5hc3luYz8oaT1cImpzb25wXCIrICsrZSx1PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksbz17YWJvcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdCh1KS5yZW1vdmUoKSxpIGluIHdpbmRvdz93aW5kb3dbaV09e306dm9pZCAwfX0scj12b2lkIDAsd2luZG93W2ldPWZ1bmN0aW9uKGUpe3JldHVybiBjbGVhclRpbWVvdXQociksdCh1KS5yZW1vdmUoKSxkZWxldGUgd2luZG93W2ldLGYoZSxvLG4pfSx1LnNyYz1uLnVybC5yZXBsYWNlKFJlZ0V4cChcIj1cXFxcP1wiKSxcIj1cIitpKSx0KFwiaGVhZFwiKS5hcHBlbmQodSksbi50aW1lb3V0PjAmJihyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gaChvLG4pfSxuLnRpbWVvdXQpKSxvKTpjb25zb2xlLmVycm9yKFwiUXVvSlMuYWpheDogVW5hYmxlIHRvIG1ha2UganNvbnAgc3luY2hyb25vdXMgY2FsbC5cIil9LHM9ZnVuY3Rpb24odCxuKXt0LnN0YXR1cz49MjAwJiZ0LnN0YXR1czwzMDB8fDA9PT10LnN0YXR1cz9uLmFzeW5jJiZmKG8odCxuKSx0LG4pOmEoXCJRdW9KUy5hamF4OiBVbnN1Y2Nlc2Z1bCByZXF1ZXN0XCIsdCxuKX0sZj1mdW5jdGlvbih0LG4sZSl7ZS5zdWNjZXNzLmNhbGwoZS5jb250ZXh0LHQsbil9LGE9ZnVuY3Rpb24odCxuLGUpe2UuZXJyb3IuY2FsbChlLmNvbnRleHQsdCxuLGUpfSxsPWZ1bmN0aW9uKHQsbil7dmFyIGU7bi5jb250ZW50VHlwZSYmKG4uaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXT1uLmNvbnRlbnRUeXBlKSxuLmRhdGFUeXBlJiYobi5oZWFkZXJzLkFjY2VwdD1yW24uZGF0YVR5cGVdKTtmb3IoZSBpbiBuLmhlYWRlcnMpdC5zZXRSZXF1ZXN0SGVhZGVyKGUsbi5oZWFkZXJzW2VdKX0saD1mdW5jdGlvbih0LG4pe3Qub25yZWFkeXN0YXRlY2hhbmdlPXt9LHQuYWJvcnQoKSxhKFwiUXVvSlMuYWpheDogVGltZW91dCBleGNlZWRlZFwiLHQsbil9LGM9ZnVuY3Rpb24obixlLHIsaSx1KXtyZXR1cm4gdC5hamF4KHt0eXBlOm4sdXJsOmUsZGF0YTpyLHN1Y2Nlc3M6aSxkYXRhVHlwZTp1LGNvbnRlbnRUeXBlOlwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJ9KX0saT1mdW5jdGlvbih0KXtyZXR1cm4gUmVnRXhwKFwiPVxcXFw/XCIpLnRlc3QodCl9LG89ZnVuY3Rpb24odCxlKXt2YXIgcixpO2lmKGk9dCx0LnJlc3BvbnNlVGV4dCl7aWYoZS5kYXRhVHlwZT09PW4uTUlNRSl0cnl7aT1KU09OLnBhcnNlKHQucmVzcG9uc2VUZXh0KX1jYXRjaCh1KXtyPXUsaT1yLGEoXCJRdW9KUy5hamF4OiBQYXJzZSBFcnJvclwiLHQsZSl9XCJ4bWxcIj09PWUuZGF0YVR5cGUmJihpPXQucmVzcG9uc2VYTUwpfXJldHVybiBpfX0odCksZnVuY3Rpb24odCl7dmFyIG4sZSxyO3JldHVybiBuPVtcIi13ZWJraXQtXCIsXCItbW96LVwiLFwiLW1zLVwiLFwiLW8tXCIsXCJcIl0sdC5mbi5hZGRDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIG4scixpLHUsbztmb3IoaT1lKHQpLHU9W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKylvPWlbbl0sdS5wdXNoKHRoaXMuY2xhc3NMaXN0LmFkZChvKSk7cmV0dXJuIHV9KX0sdC5mbi5yZW1vdmVDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIG4scixpLHUsbztmb3IoaT1lKHQpLHU9W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKylvPWlbbl0sdS5wdXNoKHRoaXMuY2xhc3NMaXN0LnJlbW92ZShvKSk7cmV0dXJuIHV9KX0sdC5mbi50b2dnbGVDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIG4scixpLHUsbztmb3IoaT1lKHQpLHU9W10sbj0wLHI9aS5sZW5ndGg7cj5uO24rKylvPWlbbl0sdS5wdXNoKHRoaXMuY2xhc3NMaXN0LnRvZ2dsZShvKSk7cmV0dXJuIHV9KX0sdC5mbi5oYXNDbGFzcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmdGhpc1swXS5jbGFzc0xpc3QuY29udGFpbnModCl9LHQuZm4ubGlzdENsYXNzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubGVuZ3RoPjA/dGhpc1swXS5jbGFzc0xpc3Q6dm9pZCAwfSx0LmZuLnN0eWxlPXQuZm4uY3NzPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIG51bGwhPW4/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3R5bGVbdF09bn0pOihlPXRoaXNbMF0sZS5zdHlsZVt0XXx8cihlLHQpKX0sdC5mbi52ZW5kb3I9ZnVuY3Rpb24odCxlKXt2YXIgcixpLHUsbztmb3Iobz1bXSxyPTAsaT1uLmxlbmd0aDtpPnI7cisrKXU9bltyXSxvLnB1c2godGhpcy5zdHlsZShcIlwiK3UrdCxlKSk7cmV0dXJuIG99LHI9ZnVuY3Rpb24odCxuKXtyZXR1cm4gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSh0LFwiXCIpW25dfSxlPWZ1bmN0aW9uKHQpe3JldHVybiBBcnJheS5pc0FycmF5KHQpfHwodD1bdF0pLHR9fSh0KSxmdW5jdGlvbih0KXtyZXR1cm4gdC5mbi5hdHRyPWZ1bmN0aW9uKG4sZSl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJlwic3RyaW5nXCI9PT10LnRvVHlwZShuKT9udWxsIT1lP3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnNldEF0dHJpYnV0ZShuLGUpfSk6dGhpc1swXS5nZXRBdHRyaWJ1dGUobik6dm9pZCAwfSx0LmZuLnJlbW92ZUF0dHI9ZnVuY3Rpb24obil7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJlwic3RyaW5nXCI9PT10LnRvVHlwZShuKT90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5yZW1vdmVBdHRyaWJ1dGUobil9KTp2b2lkIDB9LHQuZm4uZGF0YT1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLmF0dHIoXCJkYXRhLVwiK3Qsbil9LHQuZm4ucmVtb3ZlRGF0YT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5yZW1vdmVBdHRyKFwiZGF0YS1cIit0KX0sdC5mbi52YWw9ZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXQ/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudmFsdWU9dC50b1N0cmluZygpfSk6dGhpcy5sZW5ndGg+MD90aGlzWzBdLnZhbHVlOm51bGx9LHQuZm4uc2hvdz1mdW5jdGlvbigpe3JldHVybiB0aGlzLnN0eWxlKFwiZGlzcGxheVwiLFwiYmxvY2tcIil9LHQuZm4uaGlkZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnN0eWxlKFwiZGlzcGxheVwiLFwibm9uZVwiKX0sdC5mbi5mb2N1cz1mdW5jdGlvbigpe3JldHVybiB0aGlzWzBdLmZvY3VzKCl9LHQuZm4uYmx1cj1mdW5jdGlvbigpe3JldHVybiB0aGlzWzBdLmJsdXIoKX0sdC5mbi5vZmZzZXQ9ZnVuY3Rpb24oKXt2YXIgdCxuO3JldHVybiB0aGlzLmxlbmd0aD4wJiYodD10aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG49e2xlZnQ6dC5sZWZ0K3dpbmRvdy5wYWdlWE9mZnNldCx0b3A6dC50b3Ard2luZG93LnBhZ2VZT2Zmc2V0LHdpZHRoOnQud2lkdGgsaGVpZ2h0OnQuaGVpZ2h0fSksbn19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbztyZXR1cm4gcj1udWxsLG49L1dlYktpdFxcLyhbXFxkLl0rKS8sZT17QW5kcm9pZDovKEFuZHJvaWQpXFxzKyhbXFxkLl0rKS8saXBhZDovKGlQYWQpLipPU1xccyhbXFxkX10rKS8saXBob25lOi8oaVBob25lXFxzT1MpXFxzKFtcXGRfXSspLyxCbGFja2JlcnJ5Oi8oQmxhY2tCZXJyeXxCQjEwfFBsYXlib29rKS4qVmVyc2lvblxcLyhbXFxkLl0rKS8sRmlyZWZveE9TOi8oTW96aWxsYSkuKk1vYmlsZVteXFwvXSpcXC8oW1xcZFxcLl0qKS8sd2ViT1M6Lyh3ZWJPU3xocHdPUylbXFxzXFwvXShbXFxkLl0rKS99LHQuaXNNb2JpbGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbnZpcm9ubWVudCgpLHIuaXNNb2JpbGV9LHQuZW52aXJvbm1lbnQ9ZnVuY3Rpb24oKXt2YXIgdCxuO3JldHVybiByfHwobj1uYXZpZ2F0b3IudXNlckFnZW50LHQ9dShuKSxyPXticm93c2VyOmkobiksaXNNb2JpbGU6ISF0LHNjcmVlbjpvKCksb3M6dH0pLHJ9LGk9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIGU9dC5tYXRjaChuKSxlP2VbMF06dH0sdT1mdW5jdGlvbih0KXt2YXIgbixyLGk7Zm9yKHIgaW4gZSlpZihpPXQubWF0Y2goZVtyXSkpe249e25hbWU6XCJpcGhvbmVcIj09PXJ8fFwiaXBhZFwiPT09cnx8XCJpcG9kXCI9PT1yP1wiaW9zXCI6cix2ZXJzaW9uOmlbMl0ucmVwbGFjZShcIl9cIixcIi5cIil9O2JyZWFrfXJldHVybiBufSxvPWZ1bmN0aW9uKCl7cmV0dXJue3dpZHRoOndpbmRvdy5pbm5lcldpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9fX0odCksZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoLGQ7cmV0dXJuIG49MSxpPXt9LHI9e3ByZXZlbnREZWZhdWx0OlwiaXNEZWZhdWx0UHJldmVudGVkXCIsc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOlwiaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcIixzdG9wUHJvcGFnYXRpb246XCJpc1Byb3BhZ2F0aW9uU3RvcHBlZFwifSxlPXt0b3VjaHN0YXJ0OlwibW91c2Vkb3duXCIsdG91Y2htb3ZlOlwibW91c2Vtb3ZlXCIsdG91Y2hlbmQ6XCJtb3VzZXVwXCIsdG91Y2g6XCJjbGlja1wiLG9yaWVudGF0aW9uY2hhbmdlOlwicmVzaXplXCJ9LHU9L2NvbXBsZXRlfGxvYWRlZHxpbnRlcmFjdGl2ZS8sdC5mbi5vbj1mdW5jdGlvbihuLGUscil7cmV0dXJuIG51bGw9PWV8fFwiZnVuY3Rpb25cIj09PXQudG9UeXBlKGUpP3RoaXMuYmluZChuLGUpOnRoaXMuZGVsZWdhdGUoZSxuLHIpfSx0LmZuLm9mZj1mdW5jdGlvbihuLGUscil7cmV0dXJuIG51bGw9PWV8fFwiZnVuY3Rpb25cIj09PXQudG9UeXBlKGUpP3RoaXMudW5iaW5kKG4sZSk6dGhpcy51bmRlbGVnYXRlKGUsbixyKX0sdC5mbi5yZWFkeT1mdW5jdGlvbihuKXtyZXR1cm4gdS50ZXN0KGRvY3VtZW50LnJlYWR5U3RhdGUpP24uY2FsbCh0aGlzLHQpOnQuZm4uYWRkRXZlbnQoZG9jdW1lbnQsXCJET01Db250ZW50TG9hZGVkXCIsZnVuY3Rpb24oKXtyZXR1cm4gbi5jYWxsKHRoaXMsdCl9KX0sdC5mbi5iaW5kPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gaChlLHQsbil9KX0sdC5mbi51bmJpbmQ9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIGQodGhpcyx0LG4pfSl9LHQuZm4uZGVsZWdhdGU9ZnVuY3Rpb24obixlLHIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSx1KXtyZXR1cm4gaCh1LGUscixuLGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihyKXt2YXIgaSxhO3JldHVybiBhPXQoci50YXJnZXQpLmNsb3Nlc3Qobix1KS5nZXQoMCksYT8oaT10LmV4dGVuZChvKHIpLHtjdXJyZW50VGFyZ2V0OmEsbGl2ZUZpcmVkOnV9KSxlLmFwcGx5KGEsW2ldLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSkpKTp2b2lkIDB9fSl9KX0sdC5mbi51bmRlbGVnYXRlPWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIGQodGhpcyxuLGUsdCl9KX0sdC5mbi50cmlnZ2VyPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm5cInN0cmluZ1wiPT09dC50b1R5cGUobikmJihuPWwobixlKSksbnVsbCE9ciYmKG4ub3JpZ2luYWxFdmVudD1yKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kaXNwYXRjaEV2ZW50KG4pfSl9LHQuZm4uYWRkRXZlbnQ9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXI/dC5hZGRFdmVudExpc3RlbmVyKG4sZSwhMSk6dC5hdHRhY2hFdmVudD90LmF0dGFjaEV2ZW50KFwib25cIituLGUpOnRbXCJvblwiK25dPWV9LHQuZm4ucmVtb3ZlRXZlbnQ9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0LnJlbW92ZUV2ZW50TGlzdGVuZXI/dC5yZW1vdmVFdmVudExpc3RlbmVyKG4sZSwhMSk6dC5kZXRhY2hFdmVudD90LmRldGFjaEV2ZW50KFwib25cIituLGUpOnRbXCJvblwiK25dPW51bGx9LGw9ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gZT1kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50c1wiKSxlLmluaXRFdmVudCh0LCEwLCEwLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsKSxuJiYoZS50b3VjaD1uKSxlfSxoPWZ1bmN0aW9uKG4sZSxyLHUsbyl7dmFyIGwscyxoLGQ7cmV0dXJuIGU9YyhlKSxoPWYobikscz1pW2hdfHwoaVtoXT1bXSksbD1vJiZvKHIsZSksZD17ZXZlbnQ6ZSxjYWxsYmFjazpyLHNlbGVjdG9yOnUscHJveHk6YShsLHIsbiksZGVsZWdhdGU6bCxpbmRleDpzLmxlbmd0aH0scy5wdXNoKGQpLHQuZm4uYWRkRXZlbnQobixkLmV2ZW50LGQucHJveHkpfSxkPWZ1bmN0aW9uKG4sZSxyLHUpe3ZhciBvO3JldHVybiBlPWMoZSksbz1mKG4pLHMobyxlLHIsdSkuZm9yRWFjaChmdW5jdGlvbihlKXtyZXR1cm4gZGVsZXRlIGlbb11bZS5pbmRleF0sdC5mbi5yZW1vdmVFdmVudChuLGUuZXZlbnQsZS5wcm94eSl9KX0sZj1mdW5jdGlvbih0KXtyZXR1cm4gdC5faWR8fCh0Ll9pZD1uKyspfSxjPWZ1bmN0aW9uKG4pe3ZhciByO3JldHVybiByPShcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmlzTW9iaWxlP3QuaXNNb2JpbGUoKTp2b2lkIDApP246ZVtuXSxyfHxufSxhPWZ1bmN0aW9uKHQsbixlKXt2YXIgcjtyZXR1cm4gbj10fHxuLHI9ZnVuY3Rpb24odCl7dmFyIHI7cmV0dXJuIHI9bi5hcHBseShlLFt0XS5jb25jYXQodC5kYXRhKSkscj09PSExJiZ0LnByZXZlbnREZWZhdWx0KCkscn19LHM9ZnVuY3Rpb24odCxuLGUscil7cmV0dXJuKGlbdF18fFtdKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuISghdHx8biYmdC5ldmVudCE9PW58fGUmJnQuY2FsbGJhY2shPT1lfHxyJiZ0LnNlbGVjdG9yIT09cil9KX0sbz1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LmV4dGVuZCh7b3JpZ2luYWxFdmVudDpufSxuKSx0LmVhY2gocixmdW5jdGlvbih0LHIpe3JldHVybiBlW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbcl09ZnVuY3Rpb24oKXtyZXR1cm4hMH0sblt0XS5hcHBseShuLGFyZ3VtZW50cyl9LGVbcl09ZnVuY3Rpb24oKXtyZXR1cm4hMX19KSxlfX0odCksZnVuY3Rpb24odCl7cmV0dXJuIHQuZm4udGV4dD1mdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dD90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50ZXh0Q29udGVudD10fSk6dGhpcy5sZW5ndGg+MD90aGlzWzBdLnRleHRDb250ZW50OlwiXCJ9LHQuZm4uaHRtbD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gbnVsbCE9bj8oZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm5cInN0cmluZ1wiPT09ZT90aGlzLmlubmVySFRNTD1uOlwiYXJyYXlcIj09PWU/bi5mb3JFYWNoKGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdChuKS5odG1sKGUpfX0odGhpcykpOnRoaXMuaW5uZXJIVE1MKz10KG4pLmh0bWwoKX0pKTp0aGlzLmxlbmd0aD4wP3RoaXNbMF0uaW5uZXJIVE1MOlwiXCJ9LHQuZm4ucmVtb3ZlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBudWxsIT10aGlzLnBhcmVudE5vZGU/dGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpOnZvaWQgMH0pfSx0LmZuLmVtcHR5PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLmlubmVySFRNTD1udWxsfSl9LHQuZm4uYXBwZW5kPWZ1bmN0aW9uKG4pe3ZhciBlO3JldHVybiBlPXQudG9UeXBlKG4pLHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVyblwic3RyaW5nXCI9PT1lP3RoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsbik6XCJhcnJheVwiPT09ZT9uLmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB0KG4pLmFwcGVuZChlKX19KHRoaXMpKTp0aGlzLmFwcGVuZENoaWxkKG4pfSl9LHQuZm4ucHJlcGVuZD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm5cInN0cmluZ1wiPT09ZT90aGlzLmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIixuKTpcImFycmF5XCI9PT1lP24uZWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24obixlKXtyZXR1cm4gdC5pbnNlcnRCZWZvcmUoZSx0LmZpcnN0Q2hpbGQpfX0odGhpcykpOnRoaXMuaW5zZXJ0QmVmb3JlKG4sdGhpcy5maXJzdENoaWxkKX0pfSx0LmZuLnJlcGxhY2VXaXRoPWZ1bmN0aW9uKG4pe3ZhciBlO3JldHVybiBlPXQudG9UeXBlKG4pLHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudE5vZGU/XCJzdHJpbmdcIj09PWU/dGhpcy5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVCZWdpblwiLG4pOlwiYXJyYXlcIj09PWU/bi5lYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihuLGUpe3JldHVybiB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGUsdCl9fSh0aGlzKSk6dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuLHRoaXMpOnZvaWQgMH0pLHRoaXMucmVtb3ZlKCl9fSh0KSxmdW5jdGlvbihuKXt2YXIgZSxyLGksdTtyZXR1cm4gZT1cInBhcmVudE5vZGVcIixuLmZuLmZpbmQ9ZnVuY3Rpb24oZSl7dmFyIHI7cmV0dXJuIHI9MT09PXRoaXMubGVuZ3RoP3QucXVlcnkodGhpc1swXSxlKTp0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0LnF1ZXJ5KHRoaXMsZSl9KSxuKHIpfSxuLmZuLnBhcmVudD1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj10P2kodGhpcyk6dGhpcy5pbnN0YW5jZShlKSxyKG4sdCl9LG4uZm4uY2hpbGRyZW49ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49dGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5jaGlsZHJlbil9KSxyKG4sdCl9LG4uZm4uc2libGluZ3M9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49dGhpcy5tYXAoZnVuY3Rpb24odCxuKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobi5wYXJlbnROb2RlLmNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQhPT1ufSl9KSxyKG4sdCl9LG4uZm4uZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW3RdfHxudWxsfSxuLmZuLmZpcnN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4odGhpc1swXSl9LG4uZm4ubGFzdD1mdW5jdGlvbigpe3JldHVybiBuKHRoaXNbdGhpcy5sZW5ndGgtMV0pfSxuLmZuLmNsb3Nlc3Q9ZnVuY3Rpb24odCxlKXt2YXIgcixpO2ZvcihpPXRoaXNbMF0scj1uKHQpLHIubGVuZ3RofHwoaT1udWxsKTtpJiZyLmluZGV4T2YoaSk8MDspaT1pIT09ZSYmaSE9PWRvY3VtZW50JiZpLnBhcmVudE5vZGU7cmV0dXJuIG4oaSl9LG4uZm4ubmV4dD1mdW5jdGlvbigpe3JldHVybiB1LmNhbGwodGhpcyxcIm5leHRTaWJsaW5nXCIpfSxuLmZuLnByZXY9ZnVuY3Rpb24oKXtyZXR1cm4gdS5jYWxsKHRoaXMsXCJwcmV2aW91c1NpYmxpbmdcIil9LG4uZm4uaW5zdGFuY2U9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbdF19KX0sbi5mbi5tYXA9ZnVuY3Rpb24odCl7cmV0dXJuIG4ubWFwKHRoaXMsZnVuY3Rpb24obixlKXtyZXR1cm4gdC5jYWxsKG4sZSxuKX0pfSxpPWZ1bmN0aW9uKHQpe3ZhciBlO2ZvcihlPVtdO3QubGVuZ3RoPjA7KXQ9bi5tYXAodCxmdW5jdGlvbih0KXtyZXR1cm4gdD10LnBhcmVudE5vZGUsdCE9PWRvY3VtZW50JiZlLmluZGV4T2YodCk8MD8oZS5wdXNoKHQpLHQpOnZvaWQgMH0pO3JldHVybiBlfSxyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIG51bGwhPWU/bih0KS5maWx0ZXIoZSk6bih0KX0sdT1mdW5jdGlvbih0KXt2YXIgZTtmb3IoZT10aGlzWzBdW3RdO2UmJjEhPT1lLm5vZGVUeXBlOyllPWVbdF07cmV0dXJuIG4oZSl9fSh0KSx0Lkdlc3R1cmVzPWZ1bmN0aW9uKHQpe3ZhciBlLHIsaSx1LG8sYSxjLGwscyxmLGgsZCxwLHY7cmV0dXJuIGQ9ITEsbD17fSxvPW51bGwsZj1udWxsLGk9W1wiaW5wdXRcIixcInNlbGVjdFwiLFwidGV4dGFyZWFcIl0scD1mdW5jdGlvbih0KXtyZXR1cm4gbFt0Lm5hbWVdPXQuaGFuZGxlcixlKHQuZXZlbnRzKX0sdj1mdW5jdGlvbihuLGUscil7cmV0dXJuIHQobikudHJpZ2dlcihlLHIsZil9LGg9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIGU9KHQuc3JjRWxlbWVudHx8dC50YXJnZXQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSxuLmNhbGwoaSxlKT49MD90LnN0b3BQcm9wYWdhdGlvbigpOihkPSEwLGY9dHx8ZXZlbnQsbz1hKHQpLGMoXCJzdGFydFwiLHQudGFyZ2V0LG8pKX0scz1mdW5jdGlvbih0KXtyZXR1cm4gZD8oZj10fHxldmVudCxvPWEodCksby5sZW5ndGg+MSYmZi5wcmV2ZW50RGVmYXVsdCgpLGMoXCJtb3ZlXCIsdC50YXJnZXQsbykpOnZvaWQgMH0sdT1mdW5jdGlvbih0KXtyZXR1cm4gZD8oZj10fHxldmVudCxjKFwiZW5kXCIsdC50YXJnZXQsbyksZD0hMSk6dm9pZCAwfSxyPWZ1bmN0aW9uKHQpe3JldHVybiBkPSExLGMoXCJjYW5jZWxcIil9LGU9ZnVuY3Rpb24obil7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gdC5mbltuXT1mdW5jdGlvbihlKXtyZXR1cm4gdChkb2N1bWVudC5ib2R5KS5kZWxlZ2F0ZSh0aGlzLnNlbGVjdG9yLG4sZSl9fSksdGhpc30sYz1mdW5jdGlvbih0LG4sZSl7dmFyIHIsaSx1O3U9W107Zm9yKGkgaW4gbClyPWxbaV0sclt0XSYmdS5wdXNoKHJbdF0uY2FsbChyLG4sZSkpO3JldHVybiB1fSxhPWZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHU7Zm9yKHI9dC50b3VjaGVzfHxbdF0saT1bXSxuPTAsZT1yLmxlbmd0aDtlPm47bisrKXU9cltuXSxpLnB1c2goe3g6dS5wYWdlWCx5OnUucGFnZVl9KTtyZXR1cm4gaX0sdChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXt2YXIgbjtyZXR1cm4gbj10KGRvY3VtZW50LmJvZHkpLG4uYmluZChcInRvdWNoc3RhcnRcIixoKSxuLmJpbmQoXCJ0b3VjaG1vdmVcIixzKSxuLmJpbmQoXCJ0b3VjaGVuZFwiLHUpLG4uYmluZChcInRvdWNoY2FuY2VsXCIscil9KSx7YWRkOnAsdHJpZ2dlcjp2fX0odCksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJiYXNpY1wiLGV2ZW50czpbXCJ0b3VjaFwiLFwiaG9sZFwiLFwiZG91YmxlVGFwXCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoO3JldHVybiBlPTE1LG49e1RBUDoyMDAsRE9VQkxFX1RBUDo0MDAsSE9MRDo0MDB9LGk9bnVsbCxjPSEwLGE9bnVsbCxvPW51bGwsdT1udWxsLGg9ZnVuY3Rpb24oZSxyKXtyZXR1cm4gMT09PXIubGVuZ3RoPyhvPXt0aW1lOm5ldyBEYXRlLHg6clswXS54LHk6clswXS55fSxhPWUsaT1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIHQudHJpZ2dlcihlLFwiaG9sZFwiLHJbMF0pfSxuLkhPTEQpKTpsKCl9LGY9ZnVuY3Rpb24odCxuKXt2YXIgaTtyZXR1cm4gbnVsbCE9PW8mJihpPXIobyxuWzBdKSxpLng+ZXx8aS55PmV8fG4ubGVuZ3RoPjEpP2woKTp2b2lkIDB9LHM9ZnVuY3Rpb24oZSxhKXt2YXIgYyxzO2lmKG8pcmV0dXJuIGM9cihvLGFbMF0pLDAhPT1jLnh8fDAhPT1jLnk/bCgpOihjbGVhclRpbWVvdXQoaSkscz1uZXcgRGF0ZSxzLW8udGltZTxuLlRBUD9zLXU8bi5ET1VCTEVfVEFQPyh0LnRyaWdnZXIoZSxcImRvdWJsZVRhcFwiLGFbMF0pLHU9bnVsbCk6KHU9cyx0LnRyaWdnZXIoZSxcInRvdWNoXCIsYVswXSkpOnZvaWQgMCl9LGw9ZnVuY3Rpb24oKXtyZXR1cm4gbz1udWxsLGM9ITEsY2xlYXJUaW1lb3V0KGkpfSxyPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9e3g6bi54LXQueCx5Om4ueS10Lnl9fSx7c3RhcnQ6aCxtb3ZlOmYsZW5kOnMsY2FuY2VsOmx9fSh0Lkdlc3R1cmVzKX0pLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwiZHJhZ1wiLGV2ZW50czpbXCJkcmFnXCIsXCJkcmFnZ2luZ1wiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gbj13aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbz49Mj8xNToyMCxjPW51bGwsbz1udWxsLGE9bnVsbCx1PW51bGwsaD1mdW5jdGlvbih0LG4pe3JldHVybiBuLmxlbmd0aD49Mj8oYz10LG89bi5sZW5ndGgsYT1lKG4pKTp2b2lkIDB9LGY9ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gbi5sZW5ndGg9PT1vPyhlPXIobiksdT17dG91Y2hlczpuLGRlbHRhOmV9LGkoITApKTp2b2lkIDB9LGw9cz1mdW5jdGlvbih0LG4pe3JldHVybiBhJiZ1PyhpKCExKSxvPW51bGwsYT1udWxsLHU9bnVsbCk6dm9pZCAwfSxyPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPWUodCkse3g6bi54LWEueCx5Om4ueS1hLnl9fSxlPWZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHU7Zm9yKGk9MCx1PTAsbj0wLGU9dC5sZW5ndGg7ZT5uO24rKylyPXRbbl0saSs9cGFyc2VJbnQoci54KSx1Kz1wYXJzZUludChyLnkpO3JldHVybnt4OmkvdC5sZW5ndGgseTp1L3QubGVuZ3RofX0saT1mdW5jdGlvbihlKXtyZXR1cm4gZT90LnRyaWdnZXIoYyxcImRyYWdnaW5nXCIsdSk6TWF0aC5hYnModS5kZWx0YS54KT5ufHxNYXRoLmFicyh1LmRlbHRhLnkpPm4/dC50cmlnZ2VyKGMsXCJkcmFnXCIsdSk6dm9pZCAwfSx7c3RhcnQ6aCxtb3ZlOmYsZW5kOnN9fSh0Lkdlc3R1cmVzKX0pLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwicGluY2hcIixldmVudHM6W1wicGluY2hcIixcInBpbmNoaW5nXCIsXCJwaW5jaEluXCIsXCJwaW5jaE91dFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzO3JldHVybiBuPXdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvPj0yPzE1OjIwLG89bnVsbCx1PW51bGwsaT1udWxsLHM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gMj09PW4ubGVuZ3RoPyhvPXQsdT1yKG5bMF0sblsxXSkpOnZvaWQgMH0sbD1mdW5jdGlvbih0LG4pe3ZhciBvO3JldHVybiB1JiYyPT09bi5sZW5ndGg/KG89cihuWzBdLG5bMV0pLGk9e3RvdWNoZXM6bixkZWx0YTpvLXV9LGUoITApKTp2b2lkIDB9LGE9Yz1mdW5jdGlvbih0LG4pe3JldHVybiB1JiZpPyhlKCExKSx1PW51bGwsaT1udWxsKTp2b2lkIDB9LHI9ZnVuY3Rpb24odCxuKXtyZXR1cm4gTWF0aC5zcXJ0KChuLngtdC54KSoobi54LXQueCkrKG4ueS10LnkpKihuLnktdC55KSl9LGU9ZnVuY3Rpb24oZSl7dmFyIHI7cmV0dXJuIGU/dC50cmlnZ2VyKG8sXCJwaW5jaGluZ1wiLGkpOk1hdGguYWJzKGkuZGVsdGEpPm4/KHQudHJpZ2dlcihvLFwicGluY2hcIixpKSxyPWkuZGVsdGE+MD9cInBpbmNoT3V0XCI6XCJwaW5jaEluXCIsdC50cmlnZ2VyKG8scixpKSk6dm9pZCAwfSx7c3RhcnQ6cyxtb3ZlOmwsZW5kOmN9fSh0Lkdlc3R1cmVzKX0pLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwicm90YXRpb25cIixldmVudHM6W1wicm90YXRlXCIsXCJyb3RhdGluZ1wiLFwicm90YXRlTGVmdFwiLFwicm90YXRlUmlnaHRcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGgsZDtyZXR1cm4gbj01LGU9MjAsbD1udWxsLHU9MCxjPW51bGwsaT1udWxsLGQ9ZnVuY3Rpb24odCxuKXtyZXR1cm4gMj09PW4ubGVuZ3RoPyhsPXQsdT0wLGM9byhuWzBdLG5bMV0pKTp2b2lkIDB9LGg9ZnVuY3Rpb24odCxuKXt2YXIgbDtyZXR1cm4gYyYmMj09PW4ubGVuZ3RoPyhsPW8oblswXSxuWzFdKS1jLGkmJk1hdGguYWJzKGkuZGVsdGEtbCk+ZSYmKGwrPTM2MCphKGkuZGVsdGEpKSxNYXRoLmFicyhsKT4zNjAmJih1KyssbC09MzYwKmEoaS5kZWx0YSkpLGk9e3RvdWNoZXM6bixkZWx0YTpsLHJvdGF0aW9uc0NvdW50OnV9LHIoITApKTp2b2lkIDB9LHM9Zj1mdW5jdGlvbih0LG4pe3JldHVybiBjJiZpPyhyKCExKSxsPW51bGwsdT0wLGM9bnVsbCxpPW51bGwsYz1udWxsKTp2b2lkIDB9LGE9ZnVuY3Rpb24odCl7cmV0dXJuIDA+dD8tMToxfSxvPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9TWF0aC5hdGFuMih0Lnktbi55LHQueC1uLngpLDE4MCooMD5lP2UrMipNYXRoLlBJOmUpL01hdGguUEl9LHI9ZnVuY3Rpb24oZSl7dmFyIHI7cmV0dXJuIGU/dC50cmlnZ2VyKGwsXCJyb3RhdGluZ1wiLGkpOk1hdGguYWJzKGkuZGVsdGEpPm4/KHQudHJpZ2dlcihsLFwicm90YXRlXCIsaSkscj1pLmRlbHRhPjA/XCJyb3RhdGVSaWdodFwiOlwicm90YXRlTGVmdFwiLHQudHJpZ2dlcihsLHIsaSkpOnZvaWQgMH0se3N0YXJ0OmQsbW92ZTpoLGVuZDpmfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInN3aXBlXCIsZXZlbnRzOltcInN3aXBlXCIsXCJzd2lwZUxlZnRcIixcInN3aXBlUmlnaHRcIixcInN3aXBlVXBcIixcInN3aXBlRG93blwiLFwic3dpcGluZ1wiLFwic3dpcGluZ0hvcml6b250YWxcIixcInN3aXBpbmdWZXJ0aWNhbFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGY7cmV0dXJuIG49TWF0aC5yb3VuZCgyMC93aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyksYT1udWxsLHU9bnVsbCxvPW51bGwsaT1udWxsLGY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gMT09PW4ubGVuZ3RoPyhhPXQsdT1uWzBdLGk9bnVsbCk6dm9pZCAwfSxzPWZ1bmN0aW9uKHQsbil7dmFyIHIsbztyZXR1cm4gMT09PW4ubGVuZ3RoPyhyPXt4Om5bMF0ueC11LngseTpuWzBdLnktdS55fSxvPW51bGw9PT1pLGk9e3g6blswXS54LHk6blswXS55LGRlbHRhOnJ9LGUoITAsbykpOmk9bnVsbH0sYz1sPWZ1bmN0aW9uKHQsbil7dmFyIHI7cmV0dXJuIG51bGw9PWkmJm4ubGVuZ3RoPj0xJiYocj17eDpuWzBdLngtdS54LHk6blswXS55LXUueX0saT17eDpuWzBdLngseTpuWzBdLnksZGVsdGE6cn0pLGk/KGUoITEpLGk9bnVsbCk6dm9pZCAwfSxlPWZ1bmN0aW9uKGUsdSl7dmFyIGMsbCxzLGYsaDtpZihudWxsPT11JiYodT0hMSksZSlyZXR1cm4gdSYmKG89cihpLmRlbHRhLngsaS5kZWx0YS55KSksbnVsbCE9PW8mJnQudHJpZ2dlcihhLFwic3dpcGluZ1wiK28saSksdC50cmlnZ2VyKGEsXCJzd2lwaW5nXCIsaSk7aWYobD1bXSxNYXRoLmFicyhpLmRlbHRhLnkpPm4/bC5wdXNoKGkuZGVsdGEueTwwP1wiVXBcIjpcIkRvd25cIik6TWF0aC5hYnMoaS5kZWx0YS54KT5uJiZsLnB1c2goaS5kZWx0YS54PDA/XCJMZWZ0XCI6XCJSaWdodFwiKSxsLmxlbmd0aCl7Zm9yKHQudHJpZ2dlcihhLFwic3dpcGVcIixpKSxoPVtdLHM9MCxmPWwubGVuZ3RoO2Y+cztzKyspYz1sW3NdLGgucHVzaCh0LnRyaWdnZXIoYSxcInN3aXBlXCIrYyxpKSk7cmV0dXJuIGh9fSxyPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9bnVsbCxNYXRoLnJvdW5kKE1hdGguYWJzKHQvbikpPj0yP2U9XCJIb3Jpem9udGFsXCI6TWF0aC5yb3VuZChNYXRoLmFicyhuL3QpKT49MiYmKGU9XCJWZXJ0aWNhbFwiKSxlfSx7c3RhcnQ6Zixtb3ZlOnMsZW5kOmx9fSh0Lkdlc3R1cmVzKX0pfSkuY2FsbCh0aGlzKTtcbiIsIi8vIFNhbXNvbi5QYWdlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG4vLyBVc2VkIHRvIHNpbXBsaWZ5IHBhZ2UgcmVuZGVyaW5nIGFuZCB0cmFuc2l0aW9ucyBpbiBzaW5nbGUgcGFnZSBhcHBzXG5cbnZhciBTYW1zb24gPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgU2hhcmVkID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcbnZhciAkID0gcmVxdWlyZSgnLi9tb2R1bGVzL3F1by5qcycpO1xudmFyIGpzcyA9IHJlcXVpcmUoJ2pzcycpO1xuXG4vKiBvcHRpb25zIGNhbiBpbmNsdWRlOlxuLy8gbmFtZSAtIG5hbWUgb2YgdGhlIHBhZ2Vcbi8vIHN1YlBhZ2VPZiAtIGFuIG9wdGlvbmFsIHBhcmVudCBwYWdlIHRoYXQgaXMgdGhlIHN0YXJ0IG9mIGEgc3BlY2lmaWMgY2F0ZWdvcnkgLSBleDogVXNlciBCaW8gUGFnZSBpcyBzdWJQYWdlT2Ygb2YgUHJvZmlsZSBQYWdlXG4vLyBwcmV2aW91c1BhZ2UgLSBhbiBvcHRpb25hbCBwcmV2aW91cyBwYWdlIHRvIG1ha2UgZ29pbmcgYmFjayBlYXNpZXJcbi8vIGJhY2tTYWZlIC0gZmFsc2UgYnkgZGVmYXVsdC4gc2V0IHRvIHRydWUgaWYgaXQgaXMgc2FmZSB0byBnbyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIGFueSBvdGhlciBwYWdlIGluIHRoZSBhcHBcbi8vIHRlbXBsYXRlL3JlbmRlciAtIHRoZSBmdW5jdGlvbiB0aGF0IG91dHB1dHMgYW4gSFRNTCBzdHJpbmcgdGhhdCBnZXRzIGF0dGFjaGVkIHRvIHRoZSBET01cbi8vIHN0eWxlIC0gSlNTIHN0eWxlIG9iamVjdFxuLy8gY29tcG9uZW50cyAtIGFueSBvdGhlciBjb21wb25lbnRzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC9yZWZyZXNoZWQgd2l0aCB0aGUgcGFnZVxuLy8gZXZlbnRzIC0gYW55IGV2ZW50cyB0byBhdHRhY2ggdG8gdGhlIHBhZ2Vcbi8vIGJlZm9yZVJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGJlZm9yZSB0aGUgcGFnZSBpcyByZW5kZXJlZCAodXBkYXRlIG1vZGVscywgc29ydCBjb2xsZWN0aW9ucylcbi8vIGFmdGVyUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIHBhZ2UgaXMgcmVuZGVyZWQgKHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLCBtYXJrZWQgY2hlY2tib3hlcyBhcyBjaGVja2VkKVxuLy8gYmVmb3JlUmVtb3ZlIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBwYWdlIGlzIGZ1bGx5IGRlc3Ryb3llZCAoY2xlYW51cCBtb2RlbHMsIHVwZGF0ZSBhY3Rpdml0eSBoaXN0b3J5KVxuLy8gY3VzdG9tL2V4dGVuZCAtIGFuIG9iamVjdCBjb250YWluaW5nIGN1c3RvbSBtZXRob2RzL3Byb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBQYWdlIGluc3RhbmNlIGlmIHRoZXJlIGFyZSBubyBuYW1pbmcgY29uZmxpY3RzIHdpdGggcmVzZXJ2ZWQgcHJvcGVydGllc1xuKi9cblxuZnVuY3Rpb24gU2Ftc29uUGFnZShvcHRpb25zKSB7XG5cbiAgLy8gc2V0IHRoZSBuYW1lIG9mIHRoZSBwYWdlXG4gIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZTtcblxuICAvLyBqc3Mgc3R5bGVTaGVldFxuICBpZiAodHlwZW9mIG9wdGlvbnMuc3R5bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQob3B0aW9ucy5zdHlsZSwge25hbWVkOiBmYWxzZX0pO1xuICB9XG5cbiAgLy8gc3ViUGFnZU9mIGlzIGZhbHNlIGlmIGl0IGlzIGEgdG9wLWxldmVsIHBhZ2UsIG90aGVyd2lzZSBpdCBpcyB0aGUgbmFtZSBvZiB0aGUgdG9wLWxldmVsIHBhZ2UgaXQgaXMgbGlua2VkIHRvXG4gIHRoaXMuc3ViUGFnZU9mID0gb3B0aW9ucy5zdWJQYWdlT2YgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBwcmV2aW91c1BhZ2UgaWYgaXQgaXMgc3BlY2lmaWVkXG4gIHRoaXMucHJldmlvdXNQYWdlID0gb3B0aW9ucy5wcmV2aW91c1BhZ2UgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBiYWNrQW5pbWF0aW9uIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tBbmltYXRpb24gPSBvcHRpb25zLmJhY2tBbmltYXRpb24gfHwgZmFsc2U7XG5cbiAgLy8gc2V0IGJhY2tTYWZlIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tTYWZlID0gb3B0aW9ucy5iYWNrU2FmZSB8fCBmYWxzZTtcblxuICAvLyBzZXQgdGhlIHBhZ2UgZXZlbnRzIGlmIHRoZXkgYXJlIHNwZWNpZmllZFxuICB0aGlzLmRvbUV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzID8gb3B0aW9ucy5ldmVudHMgOiAob3B0aW9ucy5kb21FdmVudHMgfHwge30pO1xuICB0aGlzLmFwcEV2ZW50cyA9IG9wdGlvbnMuYXBwRXZlbnRzIHx8IHt9O1xuXG4gIC8vIHNldHVwIHRoZSBwYWdlJ3MgY29tcG9uZW50c1xuICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG4gIHRoaXMuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcblxuICAvLyBzZXRJbml0aWFsU3RhdGUgZnVuY3Rpb25cbiAgdGhpcy5zZXRJbml0aWFsU3RhdGUgPSBvcHRpb25zLnNldEluaXRpYWxTdGF0ZSB8fCBTaGFyZWQuanVzdFJldHVybk9iamVjdDtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xuICB0aGlzLl9pbml0aWFsU3RhdGVTZXQgPSBmYWxzZTtcbiAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gc2V0IHRoZSBwYWdlJ3MgcmVuZGVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvdXRwdXQgYW4gaHRtbCBzdHJpbmdcbiAgLy8gaWYgbm8gcmVuZGVyIGZ1bmN0aW9uIHdhcyBwYXNzZWQgaW4sIHdlIGNoZWNrIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uXG4gIHRoaXMuX3RlbXBsYXRlID0gb3B0aW9ucy5yZW5kZXIgfHwgb3B0aW9ucy50ZW1wbGF0ZTtcbiAgaWYgKCF0aGlzLl90ZW1wbGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwiWW91ciBwYWdlIFwiICsgdGhpcy5uYW1lICsgXCIgbXVzdCBoYXZlIGEgcmVuZGVyIG9yIHRlbXBsYXRlIGZ1bmN0aW9uIHRoYXQgb3V0cHV0cyBhbiBIVE1MIHN0cmluZ1wiKTtcblxuICAvLyBzZXQgdGhlIGJlZm9yZVJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmVmb3JlUmVuZGVyID0gb3B0aW9ucy5iZWZvcmVSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIGFmdGVyUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5hZnRlclJlbmRlciA9IG9wdGlvbnMuYWZ0ZXJSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIHJlbW92ZS9jbG9zZSBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkLCBvdGhlcndpc2UganVzdCBpbnZva2UgY2FsbGJhY2tcbiAgdGhpcy5iZWZvcmVSZW1vdmUgPSBvcHRpb25zLmJlZm9yZVJlbW92ZSB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIGFkZCBhbnkgcm91dGVyLXJlbGF0ZWQgdGFza3NcbiAgdGhpcy5fdXVpZCA9IHRoaXMubmFtZSArIFwiLVwiICsgRGF0ZS5ub3coKTtcbiAgdGhpcy5fcm91dGVyID0gb3B0aW9ucy5yb3V0ZXIgfHwge307XG4gIHZhciB0YXNrO1xuICBmb3IgKHRhc2sgaW4gdGhpcy5fcm91dGVyKSB7XG4gICAgU2Ftc29uLkFwcC5yb3V0ZXJbdGFza11bdGhpcy5fdXVpZF0gPSB0aGlzLl9yb3V0ZXJbdGFza10uYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20gb3IgZXh0ZW5kIG9iamVjdFxuICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gIHZhciBwcm9wO1xuICBmb3IgKHByb3AgaW4gY3VzdG9tKSB7XG4gICAgaWYgKFNoYXJlZC5yZXNlcnZlZC5pbmRleE9mKHByb3ApID09PSAtMSkge1xuICAgICAgdGhpc1twcm9wXSA9IGN1c3RvbVtwcm9wXTtcbiAgICB9XG4gIH1cblxufVxuXG4vLyBIYXZlIHRoZSBTYW1zb25QYWdlIGNsYXNzIGluaGVyaXQgYW55IHNoYXJlZCBtZXRob2RzXG5TYW1zb25QYWdlLnByb3RvdHlwZS5fdHlwZSA9IFwiUGFnZVwiO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuc2V0U3RhdGUgPSBTaGFyZWQuc2V0U3RhdGU7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fZG9GaXJzdCA9IFNoYXJlZC5fZG9GaXJzdDtcblNhbXNvblBhZ2UucHJvdG90eXBlLl9sb2FkRXZlbnRzID0gU2hhcmVkLl9sb2FkRXZlbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2Rlc3Ryb3lFdmVudHMgPSBTaGFyZWQuX2Rlc3Ryb3lFdmVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fbG9hZENvbXBvbmVudHMgPSBTaGFyZWQuX2xvYWRDb21wb25lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbmRlckNvbXBvbmVudHMgPSBTaGFyZWQuX3JlbmRlckNvbXBvbmVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fZGVzdHJveUNvbXBvbmVudHMgPSBTaGFyZWQuX2Rlc3Ryb3lDb21wb25lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbW92ZSA9IFNoYXJlZC5fcmVtb3ZlO1xuXG4vLyByZW5kZXIgdGhlIHBhZ2UgdG8gdGhlIERPTVxuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgcGFnZV9jb250YWluZXIsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuX2xvYWRDb21wb25lbnRzKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kb0ZpcnN0KFwiYmVmb3JlUmVuZGVyXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBjcmVhdGUgdGhlIGluaXRpYWwgc3RhdGUgb2JqZWN0IG9mIHRoZSBwYWdlIHRoYXQgaXMgcGFzc2VkIGludG8gdGhlIHJlbmRlciBjYWxsXG4gICAgICBpZiAoIXNlbGYuX2luaXRpYWxTdGF0ZVNldCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gc2VsZi5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoc2VsZi5zdHlsZSkgc2VsZi5zdHlsZS5hdHRhY2goKTsgLy8gbG9hZCB0aGUgc3R5bGVzaGVldCBvbiBmaXJzdCByZW5kZXJcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBwYWdlIGVsZW1lbnRcbiAgICAgIGlmICghc2VsZi5lbGVtZW50KSB7XG4gICAgICAgIHNlbGYuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNlbGYuZWxlbWVudC5pZCA9IHNlbGYubmFtZSArIFwiLXBhZ2VcIjtcbiAgICAgICAgc2VsZi5lbGVtZW50LmlubmVySFRNTCA9IHNlbGYuX3RlbXBsYXRlKHNlbGYuc3RhdGUpO1xuICAgICAgICBwYWdlX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBwYWdlIGFzIGFuIGV2ZW50IGRlbGVnYXRvciBmb3IgYWxsIGl0cyBzdWJjb21wb25lbnRzXG4gICAgICAgIHNlbGYuZGVsZWdhdGUgPSAkKHNlbGYuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB3aGV0aGVyIG9yIG5vdCB3ZSB3aWxsIGZvcmNlIHN1YmNvbXBvbmVudHMgdG8gdXBkYXRlXG4gICAgICBpZiAoZm9yY2VfdXBkYXRlIHx8IHNlbGYuX3N0YXRlQ2hhbmdlZCkge1xuICAgICAgICBmb3JjZV91cGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2xvYWRFdmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2VsZi5fcmVuZGVyQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcmVzZXQgc3RhdGVDaGFuZ2VkXG4gICAgICAgICAgc2VsZi5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJSZW5kZXJcIiwgZnVuY3Rpb24oKSB7IGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTsgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uUGFnZTtcbiIsIlxudmFyIGFuaW1hdGlvbkFtb3VudCA9IFwiMTAwJVwiO1xudmFyIGFuaW1hdGlvbkR1cmF0aW9uID0gXCIwLjZzXCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIG5hbWVzOiB7XG5cbiAgICBcInRvcFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tYm90dG9tXCIsIG5leHQ6IFwibW92ZS1mcm9tLXRvcFwiIH0sXG4gICAgXCJib3R0b21cIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXRvcFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1ib3R0b21cIiB9LFxuICAgIFwibGVmdFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tcmlnaHRcIiwgbmV4dDogXCJtb3ZlLWZyb20tbGVmdFwiIH0sXG4gICAgXCJyaWdodFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tbGVmdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodFwiIH0sXG4gICAgXCJzY2FsZVwiIDogeyBjdXJyZW50OiBcInNjYWxlLW91dFwiLCBuZXh0OiBcInNjYWxlLWluXCIgfSxcbiAgICBcImZhZGVcIiA6IHsgY3VycmVudDogXCJmYWRlLW91dFwiLCBuZXh0OiBcImZhZGUtaW5cIiB9XG5cbiAgfSxcblxuICBzdHlsZXM6IHtcblxuICAgIFwiLm1vdmUtdG8tdG9wXCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9Ub3BcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLWZyb20tdG9wXCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbVRvcFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluXCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS10by1ib3R0b21cIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVUb0JvdHRvbVwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluXCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS1mcm9tLWJvdHRvbVwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21Cb3R0b21cIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pblwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtdG8tbGVmdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZVRvTGVmdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1sZWZ0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbUxlZnRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLXRvLXJpZ2h0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9SaWdodFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1yaWdodFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21SaWdodFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLnNjYWxlLW91dFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwic2NhbGVPdXRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pbi1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5zY2FsZS1pblwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwic2NhbGVJblwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluLW91dFwiXG4gICAgfSxcblxuICAgIFwiLmZhZGUtb3V0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJmYWRlT3V0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9LFxuXG4gICAgXCIuZmFkZS1pblwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwiZmFkZUluXCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1RvcFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWSgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21Ub3BcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWSgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvQm90dG9tXCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVZKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tQm90dG9tXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVkoXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvTGVmdFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21MZWZ0XCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1JpZ2h0XCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tUmlnaHRcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBzY2FsZU91dFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInNjYWxlKC4xKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBzY2FsZUluXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJzY2FsZSguMSlcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgZmFkZU91dFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBmYWRlSW5cIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufTtcbiIsIi8vIFNhbXNvbi5Sb3V0ZXIgY29uc3RydWN0b3IgZnVuY3Rpb25cbi8vIFVzZWQgdG8gaGFuZGxlIHBhZ2UgaGlzdG9yeSBhbmQgdHJhbnNpdGlvbnNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4uL2luZGV4Jyk7XG52YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGpzcyA9IHJlcXVpcmUoXCJqc3NcIik7XG5cbnZhciBiYXNlX3JvdXRlcl9hbmltYXRpb25zID0gcmVxdWlyZSgnLi9iYXNlX3JvdXRlcl9hbmltYXRpb25zJyk7XG5cbmZ1bmN0aW9uIFNhbXNvblJvdXRlcihvcHRpb25zKSB7XG5cbiAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQgPSBcInNhbXNvbl9wYWdlXzJcIjtcblxuICAvLyBvdXIgcGFnZSBjYWNoZSB3aWxsIHN0b3JlIHRoZSBpbml0aWFsaXplZCBwYWdlc1xuICB0aGlzLnBhZ2VDYWNoZSA9IHt9O1xuXG4gIC8vIGNyZWF0ZSB0aGUgYXBwIHJvdXRlciBoaXN0b3J5XG4gIHRoaXMuaGlzdG9yeSA9IFtdO1xuXG4gIC8vIGEgcXVldWUgb2YgYW55IHJvdXRlciBldmVudHMgdGhhdCBoYXZlbid0IGJlZW4gaGFuZGxlZCB5ZXRcbiAgdGhpcy5xdWV1ZSA9IFtdO1xuXG4gIC8vIHNldCB0aGUgYXBwJ3MgYW5pbWF0aW9uc1xuICB0aGlzLmFuaW1hdGlvbnMgPSBiYXNlX3JvdXRlcl9hbmltYXRpb25zLm5hbWVzO1xuICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQoYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucy5zdHlsZXMsIHtuYW1lZDogZmFsc2V9KTtcblxuICB2YXIgY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zID0gb3B0aW9ucy5hbmltYXRpb25zIHx8IHt9O1xuXG4gIGlmIChjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMubmFtZXMgJiYgY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLnN0eWxlcykge1xuICAgIHRoaXMuc3R5bGUuYWRkUnVsZXMoY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLnN0eWxlcyk7XG5cbiAgICB2YXIga2V5O1xuICAgIGZvciAoa2V5IGluIGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9ucy5uYW1lcykge1xuICAgICAgdGhpcy5hbmltYXRpb25zW2tleV0gPSBjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMubmFtZXNba2V5XTtcbiAgICB9XG4gIH1cbiAgdGhpcy5zdHlsZS5hdHRhY2goKTsgLy8gYXR0YWNoIHRoZSBhbmltYXRpb25zIHRvIHRoZSBydW5uaW5nIGFwcFxuXG4gIHRoaXMuY3VycmVudFBhZ2UgPSBmYWxzZTsgLy8gdGhlIG5hbWUgb2YgdGhlIHBhZ2Ugd2UgYXJlIGN1cnJlbnRseSBvblxuXG4gIHRoaXMucHJldmlvdXNQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwcmV2aW91cyBwYWdlIHdlIHdlcmUgb25cblxuICB0aGlzLm5leHRQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwYWdlIHdlIGFyZSB0cmFuc2l0aW9uaW5nIHRvXG5cbiAgdGhpcy5pc0J1c3kgPSBmYWxzZTsgLy8gc2V0IHRvIHRydWUgd2hlbmV2ZXIgdGhlIHJvdXRlIGlzIHN0aWxsIGhhbmRsaW5nIGFuIGV2ZW50XG5cbiAgdGhpcy5wYWdlc0FuaW1hdGluZyA9IGZhbHNlOyAvLyBzZXQgdG8gdHJ1ZSBpZiBhIG5ldyBwYWdlIGlzIGJlaW5nIGxvYWRlZFxuXG4gIC8vIHNldCB0aGUgZGVmYXVsdCBuYXZpZ2F0ZSBhbmltYXRpb25cbiAgdGhpcy5uYXZpZ2F0ZUFuaW1hdGlvbiA9IG9wdGlvbnMuZGVmYXVsdE5hdmlnYXRlQW5pbWF0aW9uIHx8IFwicmlnaHRcIjtcblxuICAvL3NldCB0aGUgZGVmYXVsdCBiYWNrIGFuaW1hdGlvblxuICB0aGlzLmJhY2tBbmltYXRpb24gPSBvcHRpb25zLmRlZmF1bHRCYWNrQW5pbWF0aW9uIHx8IFwibGVmdFwiO1xuXG4gIHRoaXMuYmVmb3JlTmF2aWdhdGUgPSB7fTtcbiAgdGhpcy5hZnRlck5hdmlnYXRlID0ge307XG4gIHRoaXMuYmVmb3JlQW5pbWF0ZSA9IHt9O1xuICB0aGlzLmR1cmluZ0FuaW1hdGUgPSB7fTtcbiAgdGhpcy5hZnRlckFuaW1hdGUgPSB7fTtcbiAgdGhpcy5iZWZvcmVCYWNrID0ge307XG4gIHRoaXMuYWZ0ZXJCYWNrID0ge307XG5cbiAgaWYgKG9wdGlvbnMuYmVmb3JlTmF2aWdhdGUpIHsgdGhpcy5iZWZvcmVOYXZpZ2F0ZS5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZU5hdmlnYXRlOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyTmF2aWdhdGUpIHsgdGhpcy5hZnRlck5hdmlnYXRlLnJvdXRlciA9IG9wdGlvbnMuYWZ0ZXJOYXZpZ2F0ZTsgfVxuICBpZiAob3B0aW9ucy5iZWZvcmVBbmltYXRlKSB7IHRoaXMuYmVmb3JlQW5pbWF0ZS5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZUFuaW1hdGU7IH1cbiAgaWYgKG9wdGlvbnMuZHVyaW5nQW5pbWF0ZSkgeyB0aGlzLmR1cmluZ0FuaW1hdGUucm91dGVyID0gb3B0aW9ucy5kdXJpbmdBbmltYXRlOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyQW5pbWF0ZSkgeyB0aGlzLmFmdGVyQW5pbWF0ZS5yb3V0ZXIgPSBvcHRpb25zLmFmdGVyQW5pbWF0ZTsgfVxuICBpZiAob3B0aW9ucy5iZWZvcmVCYWNrKSB7IHRoaXMuYmVmb3JlQmFjay5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZUJhY2s7IH1cbiAgaWYgKG9wdGlvbnMuYWZ0ZXJCYWNrKSB7IHRoaXMuYWZ0ZXJCYWNrLnJvdXRlciA9IG9wdGlvbnMuYWZ0ZXJCYWNrOyB9XG5cbn07XG5cbi8vIGdldCB0aGUgcm91dGVyJ3MgY3VycmVudCBwYWdlIGRhdGFcblNhbXNvblJvdXRlci5wcm90b3R5cGUuZ2V0UGFnZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50UGFnZSA6IHRoaXMuY3VycmVudFBhZ2UsXG4gICAgcHJldmlvdXNQYWdlIDogdGhpcy5wcmV2aW91c1BhZ2UsXG4gICAgbmV4dFBhZ2UgOiB0aGlzLm5leHRQYWdlLFxuICAgIHBhZ2VzQW5pbWF0aW5nIDogdGhpcy5wYWdlc0FuaW1hdGluZyxcbiAgICBhY3RpdmVQYWdlRWxlbWVudCA6IHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQsXG4gICAgaW5hY3RpdmVQYWdlRWxlbWVudCA6IHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudFxuICB9O1xufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5fZG9GaXJzdCA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHRhc2tzID0gT2JqZWN0LmtleXModGhpc1tuYW1lXSk7XG4gIGFzeW5jLmVhY2godGFza3MsIGZ1bmN0aW9uKHRhc2ssIGNiKSB7XG4gICAgc2VsZltuYW1lXVt0YXNrXShzZWxmLmdldFBhZ2VEYXRhKCksIGZ1bmN0aW9uKGVycikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY2FsbGJhY2soZXJyKTtcbiAgfSk7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLl9kdXJpbmdBbmltYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHRoaXMuZHVyaW5nQW5pbWF0ZSkge1xuICAgIHRoaXMuZHVyaW5nQW5pbWF0ZVtrZXldKHRoaXMuZ2V0UGFnZURhdGEoKSk7XG4gIH1cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUudXBkYXRlSGlzdG9yeSA9IGZ1bmN0aW9uKGtpbmQsIG1lc3NhZ2UpIHtcblxuICAvLyBkZWFjdGl2YXRlIHRoZSAjYmxvY2stY29udGVudCBkaXYgc28gdGhpbmdzIGNhbiBiZSB0b3VjaGVkIGFnYWluXG4gIC8vIGlmIChBcHAuRE9NLmNvbnRlbnRPdmVybGF5KSB7IEFwcC5ET00uY29udGVudE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcImJsb2NrLWNvbnRlbnRcIik7IH1cblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGhpc3Rvcnlfb2JqZWN0ID0ge307XG4gIGhpc3Rvcnlfb2JqZWN0LmRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8vIGlmIHdlIGFyZSBuYXZpZ2F0aW5nIGZvcndhcmRcbiAgaWYgKGtpbmQgPT09IFwibmF2aWdhdGVcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMubmV4dFBhZ2U7XG4gICAgdGhpcy5oaXN0b3J5LnB1c2goaGlzdG9yeV9vYmplY3QpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGN1cnJlbnRQYWdlIGlzIHNhZmUgdG8gZ28gYmFjayB0byBmcm9tIGFueXdoZXJlXG4gICAgdmFyIGJhY2tfc2FmZSA9IHRoaXMuY3VycmVudFBhZ2UgPyBTYW1zb24uQXBwLnBhZ2VzW3RoaXMuY3VycmVudFBhZ2VdLmJhY2tTYWZlIDogZmFsc2U7XG5cbiAgICAvLyBpZiB0aGUgY3VycmVudFBhZ2UgaXMgYmFja1NhZmUsIHRoZW4gc2V0IGl0IGFzIHRoZSBwcmV2aW91c1BhZ2UsIG90aGVyd2lzZSBzZXQgdGhlIGNvbmZpZ3VyZWQgcHJldmlvdXNQYWdlXG4gICAgdGhpcy5wcmV2aW91c1BhZ2UgPSBiYWNrX3NhZmUgPyB0aGlzLmN1cnJlbnRQYWdlIDogU2Ftc29uLkFwcC5wYWdlc1t0aGlzLm5leHRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIHRoZSBwYWdlIHdlIGFyZSBnb2luZyB0b1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLm5leHRQYWdlO1xuXG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImJhY2tcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMucHJldmlvdXNQYWdlO1xuICAgIHRoaXMuaGlzdG9yeS5wdXNoKGhpc3Rvcnlfb2JqZWN0KTtcblxuICAgIC8vIHdlIGFyZSBnb2luZyBiYWNrLCBzbyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIG91ciBwcmV2aW91c1BhZ2VcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyB3ZSBhcmUgZ29pbmcgYmFjaywgc28gc2V0IHRoZSBwcmV2aW91c1BhZ2UgdG8gdGhlIGN1cnJlbnQgUGFnZSdzIHByZXZpb3VzUGFnZVxuICAgIHRoaXMucHJldmlvdXNQYWdlID0gU2Ftc29uLkFwcC5wYWdlc1t0aGlzLmN1cnJlbnRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImZhaWxlZFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJSb3V0ZXIgZXZlbnQgZmFpbGVkIGJlY2F1c2U6IFwiICsgbWVzc2FnZSk7XG4gIH1cblxuICAvLyBpZiBpdCB3YXNuJ3QganVzdCBhIHBhZ2UgdXBkYXRlLCB0aGVuIHN3aXRjaCB0aGUgYWN0aXZlUGFnZUVsZW1lbnQgYW5kIGluYWN0aXZlUGFnZUVsZW1lbnQgdmFsdWVzXG4gIGlmIChraW5kICE9PSBcInVwZGF0ZVwiICYmIGtpbmQgIT09IFwiZmFpbGVkXCIpIHtcbiAgICB2YXIgbmV3X2FjdGl2ZV9wYWdlID0gdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50O1xuICAgIHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudCA9IHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQ7XG4gICAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IG5ld19hY3RpdmVfcGFnZTtcbiAgfVxuXG4gIHRoaXMubmV4dFBhZ2UgPSBmYWxzZTtcblxuICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYW5vdGhlciByb3V0ZXIgZXZlbnQgaW4gdGhlIHF1ZXVlXG4gIHZhciBxdWV1ZV9ldmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgaWYgKHF1ZXVlX2V2ZW50KSB7XG5cbiAgICBpZiAocXVldWVfZXZlbnQua2luZCA9PT0gXCJuYXZpZ2F0ZVwiKSB7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgIHNlbGYubmF2aWdhdGUocXVldWVfZXZlbnQubmV4dF9wYWdlLCBxdWV1ZV9ldmVudC5hbmltYXRpb24sIHF1ZXVlX2V2ZW50LmNhbGxiYWNrKTtcbiAgICAgIH0sIDIwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2socXVldWVfZXZlbnQuY2FsbGJhY2spO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5nZXRBbmltYXRpb25EYXRhID0gZnVuY3Rpb24oYW5pbWF0aW9uKSB7XG4gIHZhciBkYXRhID0ge307XG4gIGRhdGEuY3VycmVudCA9IFwibm9uZVwiO1xuICBkYXRhLm5leHQgPSBcIm5vbmVcIjtcblxuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiB0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICBpZiAoYW5pbWF0aW9uID09PSBrZXkpIHtcbiAgICAgIGRhdGEuY3VycmVudCA9IHRoaXMuYW5pbWF0aW9uc1trZXldLmN1cnJlbnQ7XG4gICAgICBkYXRhLm5leHQgPSB0aGlzLmFuaW1hdGlvbnNba2V5XS5uZXh0O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmRvQW5pbWF0aW9uID0gZnVuY3Rpb24oYW5pbWF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgU2Ftc29uLkRPTVt0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5hZGQoYW5pbWF0ZS5uZXh0LCBcImFjdGl2ZVwiKTtcbiAgU2Ftc29uLkRPTVt0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QuYWRkKGFuaW1hdGUuY3VycmVudCk7XG4gIFNhbXNvbi5ET01bdGhpcy5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblxuICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyB3aGlsZSB0aGUgcGFnZXMgYXJlIGFuaW1hdGluZy4gRXg6IHVwZGF0ZSBoZWFkZXIgb3IgZm9vdGVyXG4gIHRoaXMuX2R1cmluZ0FuaW1hdGUoKTtcblxuICB2YXIgYW5pbWF0aW9uRXZlbnQgPSBVdGlscy53aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cbiAgVXRpbHMub25jZShTYW1zb24uRE9NW3RoaXMuaW5hY3RpdmVQYWdlRWxlbWVudF0sIGFuaW1hdGlvbkV2ZW50LCBhbmltYXRpb25FbmRlZCk7XG5cbiAgLy8gbGlzdGVuIGZvciB0aGUgZW5kIG9mIHRoZSBhbmltYXRpb25cbiAgZnVuY3Rpb24gYW5pbWF0aW9uRW5kZWQoKSB7XG5cbiAgICAvLyByZW1vdmUgdGhlIGFuaW1hdGlvbiBjbGFzcyBmcm9tIHRoZSBwYWdlIHdlIGp1c3QgbWFkZSBhY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuaW5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShhbmltYXRlLm5leHQpO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBhbmltYXRpb24gY2xhc3MgZnJvbSB0aGUgcGFnZSB3ZSBqdXN0IG1hZGUgaW5hY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5yZW1vdmUoYW5pbWF0ZS5jdXJyZW50KTtcblxuICAgIHNlbGYucGFnZXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICAgIC8vIHJlbW92ZSB0aGUgb2xkIHBhZ2UgaW5jbHVkaW5nIGFsbCBvZiBpdHMgdmlld3MgYW5kIGV2ZW50cyBmcm9tIHRoZSBET01cbiAgICAvLyBhbHNvIHJlbW92ZSB0aGUgZW50aXJlIHBhZ2UgaW5zdGFuY2UgZnJvbSB0aGUgcm91dGVyJ3MgcGFnZUNhY2hlXG4gICAgaWYgKHNlbGYuY3VycmVudFBhZ2UpIHtcbiAgICAgIHNlbGYucGFnZUNhY2hlW3NlbGYuY3VycmVudFBhZ2VdLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmLnBhZ2VDYWNoZVtzZWxmLmN1cnJlbnRQYWdlXTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24obmV4dF9wYWdlLCBhbmltYXRpb24sIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgc2VsZi5wYWdlc0FuaW1hdGluZyA9IHRydWU7IC8vIHNldCBwYWdlc0FuaW1hdGluZyB0byB0cnVlXG5cbiAgICAvLyBhY3RpdmF0ZSB0aGUgI3NhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5IHNvIG5vdGhpbmcgY2FuIGJlIHRvdWNoZWQgdW50aWwgdGhlIHBhZ2UgZmluaXNoZWRcbiAgICBTYW1zb24uRE9NLnNhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuXG4gICAgaWYgKGFuaW1hdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuXG4gICAgICBzZWxmLnBhZ2VDYWNoZVtuZXh0X3BhZ2VdLl9yZW5kZXIodHJ1ZSwgbnVsbCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGFuaW1hdGlvbiB0aGF0IHdpbGwgYmUgdXNlZFxuICAgICAgdmFyIGFuaW1hdGlvbl9kYXRhID0gc2VsZi5nZXRBbmltYXRpb25EYXRhKGFuaW1hdGlvbik7XG5cbiAgICAgIC8vIHJlbmRlciB0aGUgbmV3IHBhZ2Ugb2ZmIHNjcmVlblxuICAgICAgc2VsZi5wYWdlQ2FjaGVbbmV4dF9wYWdlXS5fcmVuZGVyKGZhbHNlLCBTYW1zb24uRE9NW3NlbGYuaW5hY3RpdmVQYWdlRWxlbWVudF0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNlbGYuZG9BbmltYXRpb24oYW5pbWF0aW9uX2RhdGEsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgI3NhbXNvbi10cmFuc3BhcmVudC1vdmVybGF5IHNvIHRoYXQgdG91Y2ggZXZlbnRzIHdvcmsgYWdhaW5cbiAgICAgICAgICBTYW1zb24uRE9NLnNhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfSk7XG5cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUubmF2aWdhdGUgPSBmdW5jdGlvbihuZXh0X3BhZ2UsIGFuaW1hdGlvbiwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gY2hlY2sgdG8gc2VlIGlmIGFub3RoZXIgUm91dGVyIGV2ZW50IGlzIGFscmVhZHkgYmVpbmcgaGFuZGxlZCwgaWYgb25lIGlzIHRoZW4gYWRkIHRoaXMgZXZlbnQgdG8gYSBxdWV1ZVxuICBpZiAodGhpcy5pc0J1c3kpIHtcblxuICAgIHRoaXMucXVldWUucHVzaCh7XG4gICAgICBraW5kOiBcIm5hdmlnYXRlXCIsXG4gICAgICBuZXh0X3BhZ2U6IG5leHRfcGFnZSxcbiAgICAgIGFuaW1hdGlvbjogYW5pbWF0aW9uLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiUm91dGVyIGlzIGJ1c3kuIFRoaXMgZXZlbnQgaXMgI1wiICsgc2VsZi5xdWV1ZS5sZW5ndGggKyBcIiBpbiBsaW5lXCIpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICB2YXIgY2hvc2VuX2FuaW1hdGlvbiA9IGFuaW1hdGlvbiB8fCB0aGlzLm5hdmlnYXRlQW5pbWF0aW9uO1xuXG4gICAgLy8gaWYgYSBwYWdlIHVwZGF0ZSBpcyByZXF1ZXN0ZWQsIGJ1dCBpdCBpc24ndCB0aGUgY3VycmVudCBwYWdlLCB0aGVuIHdlIHdpbGwgc2ltcGx5IG5hdmlnYXRlIHRvIGl0IGxpa2Ugbm9ybWFsXG4gICAgaWYgKGNob3Nlbl9hbmltYXRpb24gPT09IFwidXBkYXRlXCIgJiYgbmV4dF9wYWdlICE9PSB0aGlzLmN1cnJlbnRQYWdlKSB7XG4gICAgICBjaG9zZW5fYW5pbWF0aW9uID0gdGhpcy5uYXZpZ2F0ZUFuaW1hdGlvbjtcbiAgICB9XG5cbiAgICB0aGlzLm5leHRQYWdlID0gbmV4dF9wYWdlO1xuXG4gICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYmVmb3JlIHdlIHN0YXJ0IHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICB0aGlzLl9kb0ZpcnN0KFwiYmVmb3JlTmF2aWdhdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgcGFnZSBleGlzdHMgYmVmb3JlIHRyeWluZyB0byBuYXZpZ2F0ZVxuICAgICAgaWYgKCFTYW1zb24uQXBwLnBhZ2VzW25leHRfcGFnZV0gJiYgIWVycikge1xuICAgICAgICBlcnIgPSBcIlRoYXQgcGFnZSBkb2VzIG5vdCBleGlzdFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycikge1xuXG4gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB3ZSBhcmUgc3RheWluZyBvbiB0aGUgc2FtZSBwYWdlLCBpZiB3ZSBhcmUgdGhlbiBzaW1wbHkgdXBkYXRlIHRoZSBwYWdlXG4gICAgICAgIGlmIChuZXh0X3BhZ2UgPT09IHNlbGYuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICBjaG9zZW5fYW5pbWF0aW9uID0gXCJ1cGRhdGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLnBhZ2VDYWNoZVtuZXh0X3BhZ2VdID0gU2Ftc29uLmNyZWF0ZVBhZ2UoU2Ftc29uLkFwcC5wYWdlc1tuZXh0X3BhZ2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFuaW1hdGUgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICBzZWxmLmFuaW1hdGUobmV4dF9wYWdlLCBjaG9zZW5fYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGNoYW5nZXMgdG8gdGhlIHBhZ2UgaGlzdG9yeVxuICAgICAgICAgICAgaWYgKGNob3Nlbl9hbmltYXRpb24gPT09IFwidXBkYXRlXCIpIHtcbiAgICAgICAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwidXBkYXRlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwibmF2aWdhdGVcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIG5hdmlnYXRpbmdcbiAgICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlck5hdmlnYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJmYWlsZWRcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgIC8vIGNoZWNrIHRvIHNlZSBpZiBhbm90aGVyIFJvdXRlciBldmVudCBpcyBhbHJlYWR5IGJlaW5nIGhhbmRsZWQsIGlmIG9uZSBpcyB0aGVuIGFkZCB0aGlzIGV2ZW50IHRvIGEgcXVldWVcbiAgaWYgKHRoaXMuaXNCdXN5KSB7XG5cbiAgICB0aGlzLnF1ZXVlLnB1c2goe1xuICAgICAga2luZDogXCJiYWNrXCIsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIC8vY29uc29sZS5sb2coXCJSb3V0ZXIgaXMgYnVzeS4gVGhpcyBldmVudCBpcyAjXCIgKyBzZWxmLnF1ZXVlLmxlbmd0aCArIFwiIGluIGxpbmVcIik7XG5cbiAgfSBlbHNlIHtcblxuICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGJlZm9yZSB3ZSBzdGFydCB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgdGhpcy5fZG9GaXJzdChcImJlZm9yZUJhY2tcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGVyZSBpcyBhIHBhZ2UgdG8gZ28gYmFjayB0b1xuICAgICAgaWYgKCFzZWxmLnByZXZpb3VzUGFnZSAmJiAhZXJyKSB7XG4gICAgICAgIGVyciA9IFwiTm8gcGFnZSB0byBnbyBiYWNrIHRvXCI7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyKSB7XG5cbiAgICAgICAgLy8gbG9hZCB0aGUgcHJldmlvdXNQYWdlIGludG8gdGhlIHBhZ2VDYWNoZVxuICAgICAgICBzZWxmLnBhZ2VDYWNoZVtzZWxmLnByZXZpb3VzUGFnZV0gPSBTYW1zb24uY3JlYXRlUGFnZShTYW1zb24uQXBwLnBhZ2VzW3NlbGYucHJldmlvdXNQYWdlXSk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHBhZ2Ugd2FudHMgYSBjdXN0b20gYmFjayBhbmltYXRpb24gdGhlbiB1c2UgaXQsIG90aGVyd2lzZSB1c2UgdGhlIGRlZmF1bHQgYmFjayBhbmltYXRpb25cbiAgICAgICAgdmFyIGJhY2tBbmltYXRpb24gPSBTYW1zb24uQXBwLnBhZ2VzW3NlbGYuY3VycmVudFBhZ2VdLmJhY2tBbmltYXRpb24gfHwgc2VsZi5iYWNrQW5pbWF0aW9uO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICBzZWxmLmFuaW1hdGUoc2VsZi5wcmV2aW91c1BhZ2UsIGJhY2tBbmltYXRpb24sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlckFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hhbmdlcyB0byB0aGUgcGFnZSBoaXN0b3J5XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJiYWNrXCIpO1xuXG4gICAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciBnb2luZyBiYWNrXG4gICAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJCYWNrXCIsIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJmYWlsZWRcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb25Sb3V0ZXI7XG4iLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG52YXIgaXNFcXVhbCA9IHJlcXVpcmUoJ2xvZGFzaC5pc2VxdWFsJyk7XG5cbnZhciBzaGFyZWQgPSB7fTtcblxuLy8gcmVzZXJ2ZWQgcHJvcGVydGllcyBmb3IgY29tcG9uZW50cyBhbmQgcGFnZXNcbnNoYXJlZC5yZXNlcnZlZCA9IFtcIm5hbWVcIiwgXCJlbFwiLCBcImVsZW1lbnRcIiwgXCJ0ZW1wbGF0ZVwiLCBcInN1YlBhZ2VPZlwiLCBcInByZXZpb3VzUGFnZVwiLCBcImJhY2tBbmltYXRpb25cIiwgXCJzdHlsZVwiLCBcImNvbXBvbmVudHNcIiwgXCJldmVudHNcIiwgXCJkb21FdmVudHNcIiwgXCJhcHBFdmVudHNcIiwgXCJfbG9hZEV2ZW50c1wiLCBcIl9sb2FkZWRFdmVudHNcIiwgXCJzZXRTdGF0ZVwiLCBcInNldEluaXRpYWxTdGF0ZVwiLCBcImJlZm9yZVJlbmRlclwiLCBcImFmdGVyUmVuZGVyXCIsIFwiYmVmb3JlUmVtb3ZlXCIsIFwiX2RvRmlyc3RcIiwgXCJyZW5kZXJcIiwgXCJfcmVuZGVyXCIsIFwiX3RlbXBsYXRlXCIsIFwiX2Rlc3Ryb3lFdmVudHNcIiwgXCJfbG9hZENvbXBvbmVudHNcIiwgXCJfY29tcG9uZW50c0xvYWRlZFwiLCBcIl9zdGF0ZUNoYW5nZWRcIiwgXCJfaW5pdGlhbFN0YXRlU2V0XCIsIFwicGFyZW50XCIsIFwiX3R5cGVcIiwgXCJfcmVuZGVyQ29tcG9uZW50c1wiLCBcIl9kZXN0cm95Q29tcG9uZW50c1wiLCBcIl9yZW1vdmVcIiwgXCJvblwiLCBcImVtaXRcIiwgXCJvZmZcIl07XG5cbi8vIGNhY2hlZCBmb3IgcGVyZm9ybWFuY2VcbnNoYXJlZC5qdXN0Q2FsbGJhY2sgPSBmdW5jdGlvbihjYikgeyBjYigpOyB9O1xuc2hhcmVkLmp1c3RDYWxsYmFja1RydWUgPSBmdW5jdGlvbihjYikgeyBjYih0cnVlKTsgfTtcbnNoYXJlZC5qdXN0UmV0dXJuT2JqZWN0ID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTsgfTtcblxuLy8gZ2V0IHRoZSB0b3Btb3N0IHBhcmVudCBwYWdlIG9yIGNvbXBvbmVudCBvZiB0aGUgY3VycmVudCBjb21wb25lbnRcbi8vIHVzZWQgaW4gdGhlIHNldFN0YXRlIG1ldGhvZCBvbiBjb21wb25lbnRzIGFuZCBwYWdlc1xuZnVuY3Rpb24gZ2V0VG9wUGFyZW50KGNvbXBvbmVudCkge1xuICBpZiAoY29tcG9uZW50LnBhcmVudCkge1xuICAgIHJldHVybiBnZXRUb3BQYXJlbnQoY29tcG9uZW50LnBhcmVudCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxufVxuXG4vLyB0aGUgbWV0aG9kcyB0aGF0IFBhZ2VzIGFuZCBDb21wb25lbnRzIHNoYXJlXG5zaGFyZWQuc2V0U3RhdGUgPSBmdW5jdGlvbihuZXdfc3RhdGUpIHsgLy8gbmV3X3N0YXRlIG11c3QgYmUgYW4gb2JqZWN0XG4gIGlmICh0eXBlb2YgbmV3X3N0YXRlID09PSBcIm9iamVjdFwiKSB7XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcblxuICAgIHZhciBwcm9wO1xuICAgIGZvciAocHJvcCBpbiBuZXdfc3RhdGUpIHtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhpcyBwcm9wZXJ0eSBoYXMgY2hhbmdlZFxuICAgICAgaWYgKHRoaXMuc3RhdGVbcHJvcF0gPT09IHVuZGVmaW5lZCkgeyAvLyBpZiB0aGUgcHJvcGVydHkgZG9lc24ndCBleGlzdCBvbiB0aGUgc3RhdGUgb2JqZWN0IHRoZW4gaXQgd2lsbCB1cGRhdGVkXG4gICAgICAgIHRoaXMuc3RhdGVbcHJvcF0gPSBuZXdfc3RhdGVbcHJvcF07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICghaXNFcXVhbCh0aGlzLnN0YXRlW3Byb3BdLCBuZXdfc3RhdGVbcHJvcF0pKSB7IC8vIGlmIHRoZSBleGlzdGluZyBwcm9wZXJ0eSBvbiB0aGUgc3RhdGUgb2JqZWN0IGlzIG5vdCBlcXVhbCB0byB0aGUgdmFsdWUgb24gdGhlIG5ld19zdGF0ZSBvYmplY3QgdGhlbiBpdCB3aWxsIGJlIHVwZGF0ZWRcbiAgICAgICAgdGhpcy5zdGF0ZVtwcm9wXSA9IG5ld19zdGF0ZVtwcm9wXTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLnBhcmVudCB8fCAhdGhpcy5wYXJlbnQuX3R5cGUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBnZXRUb3BQYXJlbnQodGhpcyk7XG4gICAgICAgIHBhcmVudC5fcmVuZGVyKGZhbHNlKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ha2Ugc3VyZSB0byBwYXNzIGFuIG9iamVjdCBpbnRvIHNldFN0YXRlXCIpO1xuICB9XG59O1xuXG5cbi8vIHJ1biB0aGUgbmFtZWQgZnVuY3Rpb24gYmVmb3JlIGNhbGxpbmcgYmFja1xuc2hhcmVkLl9kb0ZpcnN0ID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgdGhpc1tuYW1lXShmdW5jdGlvbigpIHtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcbn07XG5cbnNoYXJlZC5fbG9hZEV2ZW50cyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5fbG9hZGVkRXZlbnRzLmxlbmd0aCkge1xuXG4gICAgdmFyIGRlbGVnYXRlID0gZ2V0VG9wUGFyZW50KHRoaXMpLmRlbGVnYXRlO1xuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmRvbUV2ZW50cyk7XG5cbiAgICB2YXIgc2VsZWN0b3JfZWxlbWVudCA9ICh0aGlzLl90eXBlID09PSBcIlBhZ2VcIikgPyBudWxsIDogXCIjXCIgKyAgdGhpcy5lbDtcblxuICAgIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgICB2YXIgZXZlbnQgPSB7fTtcbiAgICAgIHZhciBzcGxpdF9ldmVudCA9IGtleS5zcGxpdChcIiBcIik7IC8vIHNwbGl0IGJ5IGEgc2luZ2xlIHNwYWNlXG4gICAgICBldmVudC50eXBlID0gc3BsaXRfZXZlbnQuc2hpZnQoKTtcbiAgICAgIGV2ZW50LnNlbGVjdG9yID0gc3BsaXRfZXZlbnQubGVuZ3RoID4gMSA/IHNwbGl0X2V2ZW50LmpvaW4oXCIgXCIpIDogc3BsaXRfZXZlbnRbMF07XG4gICAgICBldmVudC5zZWxlY3RvciA9IGV2ZW50LnNlbGVjdG9yIHx8IHNlbGVjdG9yX2VsZW1lbnQ7XG5cbiAgICAgIGV2ZW50LmhhbmRsZXIgPSBmdW5jdGlvbiBmaXhlZEV2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIHNlbGYuZG9tRXZlbnRzW2tleV0uY2FsbChzZWxmLCBlLCB0aGlzKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChldmVudC5zZWxlY3Rvcikge1xuICAgICAgICBkZWxlZ2F0ZS5vbihldmVudC50eXBlLCBldmVudC5zZWxlY3RvciwgZXZlbnQuaGFuZGxlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxlZ2F0ZS5vbihldmVudC50eXBlLCBldmVudC5oYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fbG9hZGVkRXZlbnRzLnB1c2goZXZlbnQpO1xuXG4gICAgICBjYigpO1xuXG4gICAgfSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGxvYWQgYW55IGFwcCBldmVudHNcbiAgICAgIHZhciBhcHBFdmVudDtcbiAgICAgIGZvciAoYXBwRXZlbnQgaW4gc2VsZi5hcHBFdmVudHMpIHtcbiAgICAgICAgU2Ftc29uLkFwcC5vbihhcHBFdmVudCwgc2VsZi5hcHBFdmVudHNbYXBwRXZlbnRdLCBzZWxmKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICB9XG5cbn07XG5cbnNoYXJlZC5fZGVzdHJveUV2ZW50cyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgLy8gZGVzdHJveSBET00gZXZlbnQgbGlzdGVuZXJzXG4gIHZhciBkZWxlZ2F0ZSA9IGdldFRvcFBhcmVudCh0aGlzKS5kZWxlZ2F0ZTtcbiAgdmFyIGk7IHZhciBkb21FdmVudDtcbiAgZm9yIChpPTA7IGk8dGhpcy5fbG9hZGVkRXZlbnRzLmxlbmd0aDtpKyspIHtcbiAgICBkb21FdmVudCA9IHRoaXMuX2xvYWRlZEV2ZW50c1tpXTtcbiAgICBpZiAoZG9tRXZlbnQuc2VsZWN0b3IpIHtcbiAgICAgIGRlbGVnYXRlLm9mZihkb21FdmVudC50eXBlLCBkb21FdmVudC5zZWxlY3RvciwgZG9tRXZlbnQuaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGVnYXRlLm9mZihkb21FdmVudC50eXBlLCBkb21FdmVudC5oYW5kbGVyKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gbm93IGRlc3Ryb3kgYXBwIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgYXBwRXZlbnQ7XG4gIGZvciAoYXBwRXZlbnQgaW4gdGhpcy5hcHBFdmVudHMpIHtcbiAgICBTYW1zb24uQXBwLm9mZihhcHBFdmVudCwgdGhpcy5hcHBFdmVudHNbYXBwRXZlbnRdKTtcbiAgfVxuXG4gIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcblxufTtcblxuLy8gYXR0YWNoIHRoZSBjb21wb25lbnRzIHBhc3NlZCBiYWNrIGZyb20gdGhlIHNldENvbXBvbmVudHMgZnVuY3Rpb25cbnNoYXJlZC5fbG9hZENvbXBvbmVudHMgPSBmdW5jdGlvbihmb3JjZV91cGRhdGUsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIElmIHRoZSBjb21wb25lbnRzIGFyZW4ndCBsb2FkZWQsIG9yIGZvcmNlX3VwZGF0ZSBpcyB0cnVlLCB0aGVuIGxvYWQgdGhlIGNvbXBvbmVudHNcbiAgaWYgKCF0aGlzLl9jb21wb25lbnRzTG9hZGVkIHx8IGZvcmNlX3VwZGF0ZSkge1xuXG4gICAgdmFyIG5ld19jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG5cbiAgICAvLyBGaXJzdCB3ZSBnbyB0aHJvdWdoIGVhY2ggY3VycmVudGx5IGF0dGFjaGVkIGNvbXBvbmVudCwgYW5kIGNoZWNrIHRvIHNlZSBpZiBpdCBzaG91bGQgc3RpbGwgZXhpc3RcbiAgICB2YXIgb2xkX2NvbXBvbmVudHMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpO1xuICAgIGFzeW5jLmVhY2gob2xkX2NvbXBvbmVudHMsIGZ1bmN0aW9uKG9sZF9jb21wb25lbnQsIGNiKSB7XG5cbiAgICAgIHZhciBzaG91bGRfYmVfbG9hZGVkID0gZmFsc2U7XG4gICAgICB2YXIgbmV3X2NvbXBvbmVudDtcbiAgICAgIGZvciAobmV3X2NvbXBvbmVudCBpbiBuZXdfY29tcG9uZW50cykge1xuICAgICAgICBpZiAob2xkX2NvbXBvbmVudCA9PT0gbmV3X2NvbXBvbmVudCkgc2hvdWxkX2JlX2xvYWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGxvYWRlZCBidXQgaXNuJ3QsIHRoZW4gd2UgbG9hZCBpdC4gT3RoZXJ3aXNlIHdlIGp1c3Qgc2tpcCBpdFxuICAgICAgaWYgKHNob3VsZF9iZV9sb2FkZWQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGNvbXBvbmVudCBoYXNuJ3QgYmVlbiBsb2FkZWQgeWV0LCB0aGVuIGxvYWQgaXRcbiAgICAgICAgaWYgKCFzZWxmW29sZF9jb21wb25lbnRdKSB7XG4gICAgICAgICAgc2VsZltvbGRfY29tcG9uZW50XSA9IFNhbXNvbi5jcmVhdGVDb21wb25lbnQoc2VsZi5jb21wb25lbnRzW29sZF9jb21wb25lbnRdKTtcbiAgICAgICAgICBzZWxmW29sZF9jb21wb25lbnRdLnBhcmVudCA9IHNlbGY7XG4gICAgICAgIH1cbiAgICAgICAgY2IoKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBjb21wb25lbnQgc2luY2UgaXQgc2hvdWxkbid0IGJlIGxvYWRlZFxuICAgICAgICBpZiAoc2VsZltvbGRfY29tcG9uZW50XSkge1xuICAgICAgICAgIHNlbGZbb2xkX2NvbXBvbmVudF0uX3JlbW92ZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBzZWxmW29sZF9jb21wb25lbnRdO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9LCBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gTm93IHRoYXQgd2UgaGFuZGxlZCBhbGwgb2YgdGhlIGV4aXN0aW5nIGNvbXBvbmVudHMsIHdlIGxvYWQgYW55IG5ldyBjb21wb25lbnRzIHRoYXQgZG9uJ3QgZXhpc3QgeWV0XG4gICAgICBzZWxmLmNvbXBvbmVudHMgPSBuZXdfY29tcG9uZW50cztcblxuICAgICAgdmFyIGNvbXBvbmVudDtcbiAgICAgIGZvciAoY29tcG9uZW50IGluIHNlbGYuY29tcG9uZW50cykge1xuICAgICAgICBpZiAoIXNlbGZbY29tcG9uZW50XSkge1xuICAgICAgICAgIHNlbGZbY29tcG9uZW50XSA9IFNhbXNvbi5jcmVhdGVDb21wb25lbnQoc2VsZi5jb21wb25lbnRzW2NvbXBvbmVudF0pO1xuICAgICAgICAgIHNlbGZbY29tcG9uZW50XS5wYXJlbnQgPSBzZWxmO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2NvbXBvbmVudHNMb2FkZWQgPSB0cnVlO1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gIH0gZWxzZSB7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICB9XG5cbn07XG5cbi8vIHJlbmRlciB0aGUgY29tcG9uZW50cyBhdHRhY2hlZCB0byB0aGUgcGFnZVxuc2hhcmVkLl9yZW5kZXJDb21wb25lbnRzID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cyk7XG5cbiAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICBzZWxmW2tleV0uX3JlbmRlcihmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICB9LCBmdW5jdGlvbigpe1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xuXG59O1xuXG5zaGFyZWQuX2Rlc3Ryb3lDb21wb25lbnRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpO1xuXG4gIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgc2VsZltrZXldLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgc2VsZltrZXldO1xuICAgICAgY2IoKTtcbiAgICB9KTtcblxuICB9LCBmdW5jdGlvbigpIHtcbiAgICBzZWxmLl9jb21wb25lbnRzTG9hZGVkID0gZmFsc2U7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG5cbn07XG5cbi8vIHJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycywgRE9NIG5vZGVzLCBhbmQgY2hpbGQgY29tcG9uZW50c1xuc2hhcmVkLl9yZW1vdmUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyByZW1vdmUgdGhlIHN0eWxlc2hlZXRcbiAgaWYgKHRoaXMuc3R5bGUpIHRoaXMuc3R5bGUuZGV0YWNoKCk7XG5cbiAgdGhpcy5fZG9GaXJzdChcImJlZm9yZVJlbW92ZVwiLCBmdW5jdGlvbigpIHtcblxuICAgIHNlbGYuX2Rlc3Ryb3lDb21wb25lbnRzKGZ1bmN0aW9uKCkge1xuXG4gICAgICBzZWxmLl9kZXN0cm95RXZlbnRzKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vIGRlc3Ryb3kgdGhlIERPTSBlbGVtZW50XG4gICAgICAgIGlmIChzZWxmLmVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoc2VsZi5lbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNlbGYuZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSBzZWxmLmVsZW1lbnQ7IC8vIG1ha2Ugc3VyZSB0aGUgRE9NIG5vZGUgaXMgcmVtb3ZlZCBmcm9tIG1lbW9yeSBxdWlja2x5XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgYW55IHJvdXRlciByZWxhdGVkIHRhc2tzXG4gICAgICAgIHZhciB0YXNrO1xuICAgICAgICBmb3IgKHRhc2sgaW4gc2VsZi5fcm91dGVyKSB7XG4gICAgICAgICAgZGVsZXRlIFNhbXNvbi5BcHAucm91dGVyW3Rhc2tdW3NlbGYuX3V1aWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBldmVudCBkZWxlZ2F0b3IgaWYgaXQgZXhpc3RzXG4gICAgICAgIGlmIChzZWxmLmRlbGVnYXRlKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGYuZGVsZWdhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCB0aGUgcGFnZSdzIHN0YXRlXG4gICAgICAgIHNlbGYuc3RhdGUgPSB7fTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIiosICo6YmVmb3JlLCAqOmFmdGVyXCI6IHtcbiAgICBcIi13ZWJraXQtYm94LXNpemluZ1wiOiBcImJvcmRlci1ib3hcIixcbiAgICBcImJveC1zaXppbmdcIjogXCJib3JkZXItYm94XCJcbiAgfSxcbiAgXCI6Oi13ZWJraXQtc2Nyb2xsYmFyXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgfSxcbiAgXCJodG1sLCBib2R5LCAjc2Ftc29uX2FwcFwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjRkZGXCJcbiAgfSxcbiAgXCIjc2Ftc29uX2ZhZGVkX292ZXJsYXksICNzYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheVwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiIzAwMFwiLFxuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIFwiei1pbmRleFwiOiAxMCxcbiAgICBvcGFjaXR5OiAwLFxuICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCJcbiAgfSxcbiAgXCIjc2Ftc29uX2ZhZGVkX292ZXJsYXlcIjoge1xuICAgIHRyYW5zaXRpb246IFwib3BhY2l0eSAwLjJzIGxpbmVhciwgdmlzaWJpbGl0eSAwcyBsaW5lYXIgMC4yc1wiXG4gIH0sXG4gIFwiI3NhbXNvbl9mYWRlZF9vdmVybGF5LnNob3dcIjoge1xuICAgIG9wYWNpdHk6IFwiMC42XCIsXG4gICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgXCJ0cmFuc2l0aW9uLWRlbGF5XCI6IFwiMHNcIlxuICB9LFxuICBcIiNzYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheS5zaG93XCI6IHtcbiAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIlxuICB9LFxuICBcIiNzYW1zb25fcGFnZXNcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMFwiLFxuICAgIFwibGVmdFwiOiBcIjBcIixcbiAgICBcInJpZ2h0XCI6IFwiMFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMFwiLFxuICAgIFwiei1pbmRleFwiOiAxLFxuICAgIFwib3ZlcmZsb3dcIjogXCJoaWRkZW5cIlxuICB9LFxuICBcIi5zYW1zb24tcGFnZVwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwXCIsXG4gICAgXCJsZWZ0XCI6IFwiMFwiLFxuICAgIFwicmlnaHRcIjogXCIwXCIsXG4gICAgXCJib3R0b21cIjogXCIwXCIsXG4gICAgXCJvcGFjaXR5XCI6IDEsXG4gICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIlxuICB9LFxuICBcIi5zYW1zb24tcGFnZS5hY3RpdmVcIjoge1xuICAgIFwiei1pbmRleFwiOiAyXG4gIH1cbn07XG4iLCIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNCBJdmFuIEdhYnJpZWxlXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2ZcbnRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cbnRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG9cbnVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzXG5vZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG9cbnNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIipcIjoge1xuICAgIFwiLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yXCI6IFwicmdiYSgwLDAsMCwwKVwiXG4gIH0sXG4gIFwiOmZvY3VzXCI6IHtcbiAgICBcIm91dGxpbmVcIjogXCJub25lXCJcbiAgfSxcbiAgXCJodG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSwgYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBidXR0b24sIGNpdGUsIGNvZGUsIGRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCwgc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhciwgYiwgdSwgaSwgY2VudGVyLCBkbCwgZHQsIGRkLCBvbCwgdWwsIGxpLCBmaWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIHRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLCBhcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSwgdGltZSwgbWFyaywgYXVkaW8sIHZpZGVvXCI6IHtcbiAgICBcIm1hcmdpblwiOiBcIjBcIixcbiAgICBcInBhZGRpbmdcIjogXCIwXCIsXG4gICAgXCJib3JkZXJcIjogXCIwXCIsXG4gICAgXCJmb250LXNpemVcIjogXCIxMDAlXCIsXG4gICAgXCJmb250XCI6IFwiaW5oZXJpdFwiLFxuICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJiYXNlbGluZVwiXG4gIH0sXG4gIFwiYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJibG9ja1wiXG4gIH0sXG4gIFwiYVwiOiB7XG4gICAgXCJjb2xvclwiOiBcImluaGVyaXRcIixcbiAgICBcIm91dGxpbmVcIjogXCJub25lXCIsXG4gICAgXCJ0ZXh0LWRlY29yYXRpb25cIjogXCJub25lXCJcbiAgfSxcbiAgXCJibG9ja3F1b3RlLCBxXCI6IHtcbiAgICBcInF1b3Rlc1wiOiBcIm5vbmVcIlxuICB9LFxuICBcImJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLCBxOmJlZm9yZSwgcTphZnRlclwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiYm9keVwiOiB7XG4gICAgXCJmb250LXNtb290aGluZ1wiOiBcImFudGlhbGlhc2VkXCIsXG4gICAgXCJ0ZXh0LXNpemUtYWRqdXN0XCI6IFwibm9uZVwiLFxuICAgIFwidG91Y2gtY2FsbG91dFwiOiBcIm5vbmVcIixcbiAgICBcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVooMClcIixcbiAgICBcInVzZXItc2VsZWN0XCI6IFwibm9uZVwiLFxuICAgIFwibGluZS1oZWlnaHRcIjogXCIxXCJcbiAgfSxcbiAgXCJjYXB0aW9uLCB0aFwiOiB7XG4gICAgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiXG4gIH0sXG4gIFwiZmllbGRzZXQsIGltZ1wiOiB7XG4gICAgXCJib3JkZXJcIjogXCIwXCJcbiAgfSxcbiAgXCJodG1sXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzAwMFwiLFxuICAgIFwiYmFja2dyb3VuZFwiOiBcIiNmZmZcIlxuICB9LFxuICBcImxlZ2VuZFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiMwMDBcIlxuICB9LFxuICBcIm9sLCB1bFwiOiB7XG4gICAgXCJsaXN0LXN0eWxlXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwic3ViXCI6IHtcbiAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwidGV4dC1ib3R0b21cIlxuICB9LFxuICBcInN1cFwiOiB7XG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInRleHQtdG9wXCJcbiAgfSxcbiAgXCJ0YWJsZVwiOiB7XG4gICAgXCJib3JkZXItY29sbGFwc2VcIjogXCJjb2xsYXBzZVwiLFxuICAgIFwiYm9yZGVyLXNwYWNpbmdcIjogXCIwXCJcbiAgfSxcbiAgXCJ0ZXh0YXJlYVwiOiB7XG4gICAgXCJyZXNpemVcIjogXCJub25lXCJcbiAgfVxufTtcbiIsIi8vIFV0aWxpdHkgZnVuY3Rpb25zXG5cbnZhciB1dGlscyA9IHt9O1xuXG5mdW5jdGlvbiB3aGljaEV2ZW50TmFtZShldmVudF90eXBlKSB7XG4gIHZhciBrZXk7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2UnKTtcblxuICB2YXIgZXZlbnRfbmFtZXMgPSB7XG4gICAgdHJhbnNpdGlvbnMgOiB7XG4gICAgICAndHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJzonb1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ01velRyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcbiAgICAgICdXZWJraXRUcmFuc2l0aW9uJzond2Via2l0VHJhbnNpdGlvbkVuZCdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnMgOiB7XG4gICAgICAnYW5pbWF0aW9uJzonYW5pbWF0aW9uZW5kJyxcbiAgICAgICdPQW5pbWF0aW9uJzonb0FuaW1hdGlvbkVuZCcsXG4gICAgICAnTW96QW5pbWF0aW9uJzonYW5pbWF0aW9uZW5kJyxcbiAgICAgICdXZWJraXRBbmltYXRpb24nOid3ZWJraXRBbmltYXRpb25FbmQnXG4gICAgfVxuICB9O1xuXG4gIGZvciAoa2V5IGluIGV2ZW50X25hbWVzW2V2ZW50X3R5cGVdKSB7XG4gICAgaWYoZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiBldmVudF9uYW1lc1tldmVudF90eXBlXVtrZXldO1xuICAgIH1cbiAgfVxufVxuXG51dGlscy53aGljaFRyYW5zaXRpb25FdmVudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2hpY2hFdmVudE5hbWUoXCJ0cmFuc2l0aW9uc1wiKTtcbn07XG5cbnV0aWxzLndoaWNoQW5pbWF0aW9uRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHdoaWNoRXZlbnROYW1lKFwiYW5pbWF0aW9uc1wiKTtcbn07XG5cbi8vIGxpc3RlbiB0byBhbiBldmVudCBvbmNlIHdpdGhvdXQganF1ZXJ5XG51dGlscy5vbmNlID0gZnVuY3Rpb24oZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spIHtcblxuICAvLyBjcmVhdGUgZXZlbnRcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmN0aW9uKGUpIHtcbiAgICAvLyByZW1vdmUgZXZlbnRcbiAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgYXJndW1lbnRzLmNhbGxlZSk7XG4gICAgLy8gY2FsbCBoYW5kbGVyXG4gICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcbiIsIi8vIFRpbnkgQXN5bmMgbGlicmFyeSBmb3IgdXNlIGluIG1vZGVybiBlbnZpcm9ubWVudHNcblxuKGZ1bmN0aW9uKCkge1xuXG4gIC8vIHJvb3QgaXMgZ2xvYmFsIG9uIHRoZSBzZXJ2ZXIsIGFuZCB3aW5kb3cgaW4gdGhlIGJyb3dzZXJcbiAgdmFyIHJvb3Q7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHRoaXMgPT09IHdpbmRvdykge1xuICAgIHJvb3QgPSB3aW5kb3c7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiB0aGlzID09PSBnbG9iYWwpIHtcbiAgICByb290ID0gZ2xvYmFsO1xuICB9IGVsc2Uge1xuICAgIHJvb3QgPSB0aGlzO1xuICB9XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbiAgZnVuY3Rpb24gZG9FYWNoKGFyciwgaXRlcmF0b3IpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlcmF0b3IoYXJyW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIGRvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkocm9vdCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBfZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgYXN5bmMgPSB7XG5cbiAgICAvLyBydW5zIHRoZSB0YXNrIG9uIGV2ZXJ5IGl0ZW0gaW4gdGhlIGFycmF5IGF0IG9uY2VcbiAgICBlYWNoIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcblxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFycikgfHwgIWFyci5sZW5ndGgpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIGRvRWFjaChhcnIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaXRlcmF0b3IoaXRlbSwgZG9PbmNlKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG5vb3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA+PSBhcnIubGVuZ3RoKSBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBydW5zIHRocm91Z2ggdGhlIGFycmF5IG9uZSBpdGVtIGF0IGEgdGltZVxuICAgIGVhY2hTZXJpZXMgOiBmdW5jdGlvbihhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBfZG9PbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyKSB8fCAhYXJyLmxlbmd0aCkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyW2NvbXBsZXRlZF0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA8IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaXRlcmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICAgIGl0ZXJhdGUoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FuIGFjY2VwdCBhbiBvYmplY3Qgb3IgYXJyYXlcbiAgICAvLyB3aWxsIHJldHVybiBhbiBvYmplY3Qgb3IgYXJyYXkgb2YgcmVzdWx0cyBpbiB0aGUgY29ycmVjdCBvcmRlclxuICAgIHBhcmFsbGVsIDogZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG5cbiAgICAgIHZhciBrZXlzOyB2YXIgbGVuZ3RoOyB2YXIgaTsgdmFyIHJlc3VsdHM7IHZhciBraW5kO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuXG4gICAgICBpZiAodHlwZW9mIHRhc2tzID09PSBcIm9iamVjdFwiICYmIE9iamVjdC5rZXlzKHRhc2tzKS5sZW5ndGgpIHtcblxuICAgICAgICBraW5kID0gXCJvYmplY3RcIjtcbiAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHRhc2tzKTtcbiAgICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIHJlc3VsdHMgPSB7fTtcblxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRhc2tzKSAmJiB0YXNrcy5sZW5ndGgpIHtcblxuICAgICAgICBsZW5ndGggPSB0YXNrcy5sZW5ndGg7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaT0wOyBpPGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHRhc2s7IHZhciBrZXk7XG4gICAgICAgIGlmIChraW5kID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICB0YXNrID0gdGFza3Nba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrID0gdGFza3NbaV07XG4gICAgICAgIH1cblxuICAgICAgICB0YXNrKGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgcmVzdWx0c1trZXldID0gcmVzdWx0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzW2ldID0gcmVzdWx0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICBpZiAoY291bnRlciA9PT0gbGVuZ3RoKSBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyBvbmx5IGFjY2VwdHMgYW4gYXJyYXkgc2luY2UgdGhlIHByZXNlcnZhdGlvbiBvZiB0aGUgb3JkZXIgb2YgcHJvcGVydGllcyBvbiBhbiBvYmplY3QgY2FuJ3QgYmUgZ3VhcmFudGVlZFxuICAgIC8vIHJldHVybnMgYW4gYXJyYXkgb2YgcmVzdWx0cyBpbiBvcmRlclxuICAgIHNlcmllcyA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGFza3MpIHx8ICF0YXNrcy5sZW5ndGgpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgZnVuY3Rpb24gcnVuVGFzayhpbmRleCkge1xuICAgICAgICB0YXNrc1tpbmRleF0oZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHJlc3VsdDtcbiAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxKSByZXR1cm4gcnVuVGFzayhpbmRleCArIDEpO1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJ1blRhc2soMCk7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGFzeW5jO1xuICB9XG4gIC8vIEFNRCAvIFJlcXVpcmVKU1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXN5bmM7XG4gICAgfSk7XG4gIH1cbiAgLy8gaW5jbHVkZWQgZGlyZWN0bHkgdmlhIDxzY3JpcHQ+IHRhZ1xuICBlbHNlIHtcbiAgICByb290LmFzeW5jID0gYXN5bmM7XG4gIH1cblxufSgpKTtcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbi8qKlxuICogSGFuZGxlIGBleHRlbmRgIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7UnVsZX0gcnVsZVxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgIHZhciBzdHlsZSA9IHJ1bGUuc3R5bGVcblxuICAgIGlmICghc3R5bGUgfHwgIXN0eWxlLmV4dGVuZCkgcmV0dXJuXG5cbiAgICB2YXIgbmV3U3R5bGUgPSB7fVxuXG4gICAgOyhmdW5jdGlvbiBleHRlbmQoc3R5bGUpIHtcbiAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwoc3R5bGUuZXh0ZW5kKSA9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlLmV4dGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGV4dGVuZChzdHlsZS5leHRlbmRbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlLmV4dGVuZCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wID09ICdleHRlbmQnKSBleHRlbmQoc3R5bGUuZXh0ZW5kLmV4dGVuZClcbiAgICAgICAgICAgICAgICBlbHNlIG5ld1N0eWxlW3Byb3BdID0gc3R5bGUuZXh0ZW5kW3Byb3BdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb3B5IGJhc2Ugc3R5bGUuXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGUpIHtcbiAgICAgICAgICAgIGlmIChwcm9wICE9ICdleHRlbmQnKSBuZXdTdHlsZVtwcm9wXSA9IHN0eWxlW3Byb3BdXG4gICAgICAgIH1cbiAgICB9KHN0eWxlKSlcblxuICAgIHJ1bGUuc3R5bGUgPSBuZXdTdHlsZVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciB2ZW5kb3IgPSByZXF1aXJlKCdjc3MtdmVuZG9yJylcblxudmFyIEtFWUZSQU1FUyA9ICdAa2V5ZnJhbWVzJ1xudmFyIEtFWUZSQU1FU19MRU5HSFQgPSBLRVlGUkFNRVMubGVuZ3RoXG5cbi8qKlxuICogQWRkIHZlbmRvciBwcmVmaXggdG8gYSBwcm9wZXJ0eSBuYW1lIHdoZW4gbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7UnVsZX0gcnVsZVxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocnVsZSkge1xuICAgIHZhciBzdHlsZSA9IHJ1bGUuc3R5bGVcblxuICAgIGlmIChydWxlLmlzQXRSdWxlICYmIHJ1bGUuc2VsZWN0b3Iuc3Vic3RyKDAsIEtFWUZSQU1FU19MRU5HSFQpID09IEtFWUZSQU1FUykge1xuICAgICAgICBydWxlLnNlbGVjdG9yID0gJ0AnICsgdmVuZG9yLnByZWZpeC5jc3MgKyAna2V5ZnJhbWVzJyArIHJ1bGUuc2VsZWN0b3Iuc3Vic3RyKEtFWUZSQU1FU19MRU5HSFQpXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVbcHJvcF1cblxuICAgICAgICB2YXIgY2hhbmdlUHJvcCA9IGZhbHNlXG4gICAgICAgIHZhciBzdXBwb3J0ZWRQcm9wID0gdmVuZG9yLnN1cHBvcnRlZFByb3BlcnR5KHByb3ApXG4gICAgICAgIGlmIChzdXBwb3J0ZWRQcm9wICYmIHN1cHBvcnRlZFByb3AgIT09IHByb3ApIGNoYW5nZVByb3AgPSB0cnVlXG5cbiAgICAgICAgdmFyIGNoYW5nZVZhbHVlID0gZmFsc2VcbiAgICAgICAgdmFyIHN1cHBvcnRlZFZhbHVlID0gdmVuZG9yLnN1cHBvcnRlZFZhbHVlKHN1cHBvcnRlZFByb3AsIHZhbHVlKVxuICAgICAgICBpZiAoc3VwcG9ydGVkVmFsdWUgJiYgc3VwcG9ydGVkVmFsdWUgIT09IHZhbHVlKSBjaGFuZ2VWYWx1ZSA9IHRydWVcblxuICAgICAgICBpZiAoY2hhbmdlUHJvcCB8fCBjaGFuZ2VWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZVByb3ApIGRlbGV0ZSBzdHlsZVtwcm9wXVxuICAgICAgICAgICAgc3R5bGVbc3VwcG9ydGVkUHJvcF0gPSBzdXBwb3J0ZWRWYWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogVmVuZG9yIHByZWZpeCBzdHJpbmcgZm9yIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gKlxuICogQHR5cGUge3tqczogU3RyaW5nLCBjc3M6IFN0cmluZ319XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLnByZWZpeCA9IHJlcXVpcmUoJy4vbGliL3ByZWZpeCcpXG5cbi8qKlxuICogVGVzdCBpZiBhIHByb3BlcnR5IGlzIHN1cHBvcnRlZCwgcmV0dXJucyBwcm9wZXJ0eSB3aXRoIHZlbmRvclxuICogcHJlZml4IGlmIHJlcXVpcmVkLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICogQHJldHVybiB7U3RyaW5nfEJvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLnN1cHBvcnRlZFByb3BlcnR5ID0gcmVxdWlyZSgnLi9saWIvc3VwcG9ydGVkLXByb3BlcnR5JylcblxuLyoqXG4gKiBSZXR1cm5zIHByZWZpeGVkIHZhbHVlIGlmIG5lZWRlZC4gUmV0dXJucyBgZmFsc2VgIGlmIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ3xCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuIGV4cG9ydHMuc3VwcG9ydGVkVmFsdWUgPSByZXF1aXJlKCcuL2xpYi9zdXBwb3J0ZWQtdmFsdWUnKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciByZWdFeHAgPSAvWy1cXHNdKyguKT8vZ1xuXG4vKipcbiAqIENvbnZlcnQgZGFzaCBzZXBhcmF0ZWQgc3RyaW5ncyB0byBjYW1lbCBjYXNlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ0V4cCwgdG9VcHBlcilcbn1cblxuZnVuY3Rpb24gdG9VcHBlcihtYXRjaCwgYykge1xuICAgIHJldHVybiBjID8gYy50b1VwcGVyQ2FzZSgpIDogJydcbn1cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogRXhwb3J0IGphdmFzY3JpcHQgc3R5bGUgYW5kIGNzcyBzdHlsZSB2ZW5kb3IgcHJlZml4ZXMuXG4gKiBCYXNlZCBvbiBcInRyYW5zZm9ybVwiIHN1cHBvcnQgdGVzdC5cbiAqL1xuXG52YXIganNDc3NNYXAgPSB7XG4gICAgV2Via2l0OiAnLXdlYmtpdC0nLFxuICAgIE1vejogJy1tb3otJyxcbiAgICAvLyBJRSBkaWQgaXQgd3JvbmcgYWdhaW4gLi4uXG4gICAgbXM6ICctbXMtJyxcbiAgICBPOiAnLW8tJ1xufVxuXG52YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykuc3R5bGVcbnZhciB0ZXN0UHJvcCA9ICdUcmFuc2Zvcm0nXG5cbmZvciAodmFyIGpzIGluIGpzQ3NzTWFwKSB7XG4gICAgaWYgKChqcyArIHRlc3RQcm9wKSBpbiBzdHlsZSkge1xuICAgICAgICBleHBvcnRzLmpzID0ganNcbiAgICAgICAgZXhwb3J0cy5jc3MgPSBqc0Nzc01hcFtqc11cbiAgICAgICAgYnJlYWtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIHByZWZpeCA9IHJlcXVpcmUoJy4vcHJlZml4JylcbnZhciBjYW1lbGl6ZSA9IHJlcXVpcmUoJy4vY2FtZWxpemUnKVxuXG52YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcblxuLyoqXG4gKiBXZSB0ZXN0IGV2ZXJ5IHByb3BlcnR5IG9uIHZlbmRvciBwcmVmaXggcmVxdWlyZW1lbnQuXG4gKiBPbmNlIHRlc3RlZCwgcmVzdWx0IGlzIGNhY2hlZC4gSXQgZ2l2ZXMgdXMgdXAgdG8gNzAlIHBlcmYgYm9vc3QuXG4gKiBodHRwOi8vanNwZXJmLmNvbS9lbGVtZW50LXN0eWxlLW9iamVjdC1hY2Nlc3MtdnMtcGxhaW4tb2JqZWN0XG4gKlxuICogUHJlZmlsbCBjYWNoZSB3aXRoIGtub3duIGNzcyBwcm9wZXJ0aWVzIHRvIHJlZHVjZSBhbW91bnQgb2ZcbiAqIHByb3BlcnRpZXMgd2UgbmVlZCB0byBmZWF0dXJlIHRlc3QgYXQgcnVudGltZS5cbiAqIGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvdmVuZG9yLXByZWZpeFxuICovXG52YXIgY2FjaGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnJylcbiAgICB2YXIgY2FjaGUgPSB7fVxuXG4gICAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgICAgIGNhY2hlW2NvbXB1dGVkW2tleV1dID0gY29tcHV0ZWRba2V5XVxuICAgIH1cblxuICAgIHJldHVybiBjYWNoZVxufSgpKVxuXG4vKipcbiAqIFRlc3QgaWYgYSBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQsIHJldHVybnMgc3VwcG9ydGVkIHByb3BlcnR5IHdpdGggdmVuZG9yXG4gKiBwcmVmaXggaWYgcmVxdWlyZWQuIFJldHVybnMgYGZhbHNlYCBpZiBub3Qgc3VwcG9ydGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIGRhc2ggc2VwYXJhdGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd8Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAvLyBXZSBoYXZlIG5vdCB0ZXN0ZWQgdGhpcyBwcm9wIHlldCwgbGV0cyBkbyB0aGUgdGVzdC5cbiAgICBpZiAoY2FjaGVbcHJvcF0gIT0gbnVsbCkgcmV0dXJuIGNhY2hlW3Byb3BdXG5cbiAgICAvLyBDYW1lbGl6YXRpb24gaXMgcmVxdWlyZWQgYmVjYXVzZSB3ZSBjYW4ndCB0ZXN0IHVzaW5nXG4gICAgLy8gY3NzIHN5bnRheCBmb3IgZS5nLiBpbiBGRi5cbiAgICAvLyBUZXN0IGlmIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBhcyBpdCBpcy5cbiAgICBpZiAoY2FtZWxpemUocHJvcCkgaW4gZWwuc3R5bGUpIHtcbiAgICAgICAgY2FjaGVbcHJvcF0gPSBwcm9wXG4gICAgLy8gVGVzdCBpZiBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgd2l0aCB2ZW5kb3IgcHJlZml4LlxuICAgIH0gZWxzZSBpZiAoKHByZWZpeC5qcyArIGNhbWVsaXplKCctJyArIHByb3ApKSBpbiBlbC5zdHlsZSkge1xuICAgICAgICBjYWNoZVtwcm9wXSA9IHByZWZpeC5jc3MgKyBwcm9wXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2FjaGVbcHJvcF0gPSBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiBjYWNoZVtwcm9wXVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBwcmVmaXggPSByZXF1aXJlKCcuL3ByZWZpeCcpXG5cbnZhciBjYWNoZSA9IHt9XG5cbnZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuXG4vKipcbiAqIFJldHVybnMgcHJlZml4ZWQgdmFsdWUgaWYgbmVlZGVkLiBSZXR1cm5zIGBmYWxzZWAgaWYgdmFsdWUgaXMgbm90IHN1cHBvcnRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfEJvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnIHx8ICFpc05hTihwYXJzZUludCh2YWx1ZSwgMTApKSkgcmV0dXJuIHZhbHVlXG5cbiAgICB2YXIgY2FjaGVLZXkgPSBwcm9wZXJ0eSArIHZhbHVlXG5cbiAgICBpZiAoY2FjaGVbY2FjaGVLZXldICE9IG51bGwpIHJldHVybiBjYWNoZVtjYWNoZUtleV1cblxuICAgIC8vIFRlc3QgdmFsdWUgYXMgaXQgaXMuXG4gICAgZWwuc3R5bGVbcHJvcGVydHldID0gdmFsdWVcblxuICAgIC8vIFZhbHVlIGlzIHN1cHBvcnRlZCBhcyBpdCBpcy5cbiAgICBpZiAoZWwuc3R5bGVbcHJvcGVydHldID09IHZhbHVlKSB7XG4gICAgICAgIGNhY2hlW2NhY2hlS2V5XSA9IHZhbHVlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGVzdCB2YWx1ZSB3aXRoIHZlbmRvciBwcmVmaXguXG4gICAgICAgIHZhbHVlID0gcHJlZml4LmNzcyArIHZhbHVlXG4gICAgICAgIGVsLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlXG5cbiAgICAgICAgLy8gVmFsdWUgaXMgc3VwcG9ydGVkIHdpdGggdmVuZG9yIHByZWZpeC5cbiAgICAgICAgaWYgKGVsLnN0eWxlW3Byb3BlcnR5XSA9PSB2YWx1ZSkgY2FjaGVbY2FjaGVLZXldID0gdmFsdWVcbiAgICB9XG5cbiAgICBpZiAoIWNhY2hlW2NhY2hlS2V5XSkgY2FjaGVbY2FjaGVLZXldID0gZmFsc2VcblxuICAgIHJldHVybiBjYWNoZVtjYWNoZUtleV1cbn1cbiIsIi8qKlxuICogU3R5bGVTaGVldHMgd3JpdHRlbiBpbiBqYXZhc2NyaXB0LlxuICpcbiAqIEBjb3B5cmlnaHQgT2xlZyBTbG9ib2Rza29pIDIwMTRcbiAqIEB3ZWJzaXRlIGh0dHBzOi8vZ2l0aHViLmNvbS9qc3N0eWxlcy9qc3NcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaW5kZXgnKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBwbHVnaW5zID0gcmVxdWlyZSgnLi9wbHVnaW5zJylcblxudmFyIHVpZCA9IDBcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG4vKipcbiAqIFJ1bGUgaXMgc2VsZWN0b3IgKyBzdHlsZSBoYXNoLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbc2VsZWN0b3JdXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0eWxlXSBkZWNsYXJhdGlvbnMgYmxvY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIFJ1bGUoc2VsZWN0b3IsIHN0eWxlLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRpb25zID0gc3R5bGVcbiAgICAgICAgc3R5bGUgPSBzZWxlY3RvclxuICAgICAgICBzZWxlY3RvciA9IG51bGxcbiAgICB9XG5cbiAgICB0aGlzLmlkID0gUnVsZS51aWQrK1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICBpZiAodGhpcy5vcHRpb25zLm5hbWVkID09IG51bGwpIHRoaXMub3B0aW9ucy5uYW1lZCA9IHRydWVcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3JcbiAgICAgICAgdGhpcy5pc0F0UnVsZSA9IHNlbGVjdG9yWzBdID09ICdAJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNBdFJ1bGUgPSBmYWxzZVxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IFJ1bGUuTkFNRVNQQUNFX1BSRUZJWCArICctJyArIHRoaXMuaWRcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9ICcuJyArIHRoaXMuY2xhc3NOYW1lXG4gICAgfVxuXG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlXG4gICAgLy8gV2lsbCBiZSBzZXQgYnkgU3R5bGVTaGVldCNsaW5rIGlmIGxpbmsgb3B0aW9uIGlzIHRydWUuXG4gICAgdGhpcy5DU1NSdWxlID0gbnVsbFxuICAgIC8vIFdoZW4gYXQtcnVsZSBoYXMgc3ViIHJ1bGVzLlxuICAgIHRoaXMucnVsZXMgPSBudWxsXG4gICAgaWYgKHRoaXMuaXNBdFJ1bGUgJiYgdGhpcy5zdHlsZSkgdGhpcy5leHRyYWN0QXRSdWxlcygpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUnVsZVxuXG4vKipcbiAqIENsYXNzIG5hbWUgcHJlZml4IHdoZW4gZ2VuZXJhdGVkLlxuICpcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUnVsZS5OQU1FU1BBQ0VfUFJFRklYID0gJ2pzcydcblxuLyoqXG4gKiBJbmRlbnRhdGlvbiBzdHJpbmcgZm9yIGZvcm1hdHRpbmcgdG9TdHJpbmcgb3V0cHV0LlxuICpcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUnVsZS5JTkRFTlRBVElPTiA9ICcgICdcblxuLyoqXG4gKiBVbmlxdWUgaWQsIHJpZ2h0IG5vdyBqdXN0IGEgY291bnRlciwgYmVjYXVzZSB0aGVyZSBpcyBubyBuZWVkIGZvciBiZXR0ZXIgdWlkLlxuICpcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUnVsZS51aWQgPSAwXG5cbi8qKlxuICogR2V0IG9yIHNldCBhIHN0eWxlIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IFt2YWx1ZV1cbiAqIEByZXR1cm4ge1J1bGV8U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJ1bGUucHJvdG90eXBlLnByb3AgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAvLyBJdHMgYSBzZXR0ZXIuXG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlKSB0aGlzLnN0eWxlID0ge31cbiAgICAgICAgdGhpcy5zdHlsZVtuYW1lXSA9IHZhbHVlXG4gICAgICAgIC8vIElmIGxpbmtlZCBvcHRpb24gaW4gU3R5bGVTaGVldCBpcyBub3QgcGFzc2VkLCBDU1NSdWxlIGlzIG5vdCBkZWZpbmVkLlxuICAgICAgICBpZiAodGhpcy5DU1NSdWxlKSB0aGlzLkNTU1J1bGUuc3R5bGVbbmFtZV0gPSB2YWx1ZVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8vIEl0cyBhIGdldHRlci5cbiAgICBpZiAodGhpcy5zdHlsZSkgdmFsdWUgPSB0aGlzLnN0eWxlW25hbWVdXG5cbiAgICAvLyBSZWFkIHRoZSB2YWx1ZSBmcm9tIHRoZSBET00gaWYgaXRzIG5vdCBjYWNoZWQuXG4gICAgaWYgKHZhbHVlID09IG51bGwgJiYgdGhpcy5DU1NSdWxlKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5DU1NSdWxlLnN0eWxlW25hbWVdXG4gICAgICAgIC8vIENhY2hlIHRoZSB2YWx1ZSBhZnRlciB3ZSBoYXZlIGdvdCBpdCBmcm9tIHRoZSBET00gb25jZS5cbiAgICAgICAgdGhpcy5zdHlsZVtuYW1lXSA9IHZhbHVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlXG59XG5cbi8qKlxuICogQWRkIGNoaWxkIHJ1bGUuIFJlcXVpcmVkIGZvciBwbHVnaW5zIGxpa2UgXCJuZXN0ZWRcIi5cbiAqIFN0eWxlU2hlZXQgd2lsbCByZW5kZXIgdGhlbSBhcyBhIHNlcGFyYXRlIHJ1bGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gcnVsZSBvcHRpb25zXG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJ1bGUucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBzdHlsZSwgb3B0aW9ucykge1xuICAgIGlmICghdGhpcy5jaGlsZHJlbikgdGhpcy5jaGlsZHJlbiA9IHt9XG4gICAgdGhpcy5jaGlsZHJlbltzZWxlY3Rvcl0gPSB7XG4gICAgICAgIHN0eWxlOiBzdHlsZSxcbiAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQWRkIGNoaWxkIHJ1bGUuIFJlcXVpcmVkIGZvciBwbHVnaW5zIGxpa2UgXCJuZXN0ZWRcIi5cbiAqIFN0eWxlU2hlZXQgd2lsbCByZW5kZXIgdGhlbSBhcyBhIHNlcGFyYXRlIHJ1bGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVcbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SdWxlLnByb3RvdHlwZS5leHRyYWN0QXRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMucnVsZXMpIHRoaXMucnVsZXMgPSB7fVxuXG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLnN0eWxlKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVbbmFtZV1cbiAgICAgICAgLy8gTm90IGEgbmVzdGVkIHJ1bGUuXG4gICAgICAgIGlmICh0eXBlb2Ygc3R5bGUgPT0gJ3N0cmluZycpIGJyZWFrXG4gICAgICAgIHZhciBzZWxlY3RvciA9IHRoaXMub3B0aW9ucy5uYW1lZCA/IHVuZGVmaW5lZCA6IG5hbWVcbiAgICAgICAgdmFyIHJ1bGUgPSB0aGlzLnJ1bGVzW25hbWVdID0gbmV3IFJ1bGUoc2VsZWN0b3IsIHN0eWxlLCB0aGlzLm9wdGlvbnMpXG4gICAgICAgIHBsdWdpbnMucnVuKHJ1bGUpXG4gICAgICAgIGRlbGV0ZSB0aGlzLnN0eWxlW25hbWVdXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBcHBseSBydWxlIHRvIGFuIGVsZW1lbnQgaW5saW5lLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7UnVsZX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJ1bGUucHJvdG90eXBlLmFwcGx5VG8gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGZvciAodmFyIHByb3AgaW4gdGhpcy5zdHlsZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnN0eWxlW3Byb3BdXG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gdmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIHJ1bGUgdG8gY3NzIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SdWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZVxuXG4gICAgLy8gQXQgcnVsZXMgbGlrZSBAY2hhcnNldFxuICAgIGlmICh0aGlzLmlzQXRSdWxlICYmICF0aGlzLnN0eWxlICYmICF0aGlzLnJ1bGVzKSByZXR1cm4gdGhpcy5zZWxlY3RvciArICc7J1xuXG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cbiAgICBpZiAob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsID09IG51bGwpIG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCA9IDBcblxuICAgIHZhciBzdHIgPSBpbmRlbnQob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsLCB0aGlzLnNlbGVjdG9yICsgJyB7JylcblxuICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVbcHJvcF1cbiAgICAgICAgLy8gV2Ugd2FudCB0byBnZW5lcmF0ZSBtdWx0aXBsZSBzdHlsZSB3aXRoIGlkZW50aWNhbCBwcm9wZXJ0eSBuYW1lcy5cbiAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwodmFsdWUpID09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJ1xcbicgKyBpbmRlbnQob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsICsgMSwgcHJvcCArICc6ICcgKyB2YWx1ZVtpXSArICc7JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0ciArPSAnXFxuJyArIGluZGVudChvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwgKyAxLCBwcm9wICsgJzogJyArIHZhbHVlICsgJzsnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gV2UgYXJlIGhhdmUgYW4gYXQtcnVsZSB3aXRoIG5lc3RlZCBzdGF0ZW1lbnRzLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9BdC1ydWxlXG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLnJ1bGVzKSB7XG4gICAgICAgIHZhciBydWxlU3RyID0gdGhpcy5ydWxlc1tuYW1lXS50b1N0cmluZyh7XG4gICAgICAgICAgICBpbmRlbnRhdGlvbkxldmVsOiBvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwgKyAxXG4gICAgICAgIH0pXG4gICAgICAgIHN0ciArPSAnXFxuJyArIGluZGVudChvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwsIHJ1bGVTdHIpXG4gICAgfVxuXG4gICAgc3RyICs9ICdcXG4nICsgaW5kZW50KG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCwgJ30nKVxuXG4gICAgcmV0dXJuIHN0clxufVxuXG4vKipcbiAqIFJldHVybnMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgcnVsZS5cbiAqIE5lc3RlZCBydWxlcywgYXQtcnVsZXMgYW5kIGFycmF5IHZhbHVlcyBhcmUgbm90IHN1cHBvcnRlZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SdWxlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0eWxlID0ge31cblxuICAgIGZvciAodmFyIHByb3AgaW4gdGhpcy5zdHlsZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnN0eWxlW3Byb3BdXG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlXG4gICAgICAgIGlmICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHN0eWxlW3Byb3BdID0gdmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdHlsZVxufVxuXG4vKipcbiAqIEluZGVudCBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbGV2ZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaW5kZW50KGxldmVsLCBzdHIpIHtcbiAgICB2YXIgaW5kZW50U3RyID0gJydcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxldmVsOyBpKyspIGluZGVudFN0ciArPSBSdWxlLklOREVOVEFUSU9OXG4gICAgcmV0dXJuIGluZGVudFN0ciArIHN0clxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBSdWxlID0gcmVxdWlyZSgnLi9SdWxlJylcbnZhciBwbHVnaW5zID0gcmVxdWlyZSgnLi9wbHVnaW5zJylcblxuLyoqXG4gKiBTdHlsZVNoZWV0IGFic3RyYWN0aW9uLCBjb250YWlucyBydWxlcywgaW5qZWN0cyBzdHlsZXNoZWV0IGludG8gZG9tLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYG1lZGlhYCBzdHlsZSBlbGVtZW50IGF0dHJpYnV0ZVxuICogIC0gYHRpdGxlYCBzdHlsZSBlbGVtZW50IGF0dHJpYnV0ZVxuICogIC0gYHR5cGVgIHN0eWxlIGVsZW1lbnQgYXR0cmlidXRlXG4gKiAgLSBgbmFtZWRgIHRydWUgYnkgZGVmYXVsdCAtIGtleXMgYXJlIG5hbWVzLCBzZWxlY3RvcnMgd2lsbCBiZSBnZW5lcmF0ZWQsXG4gKiAgICBpZiBmYWxzZSAtIGtleXMgYXJlIGdsb2JhbCBzZWxlY3RvcnMuXG4gKiAgLSBgbGlua2AgbGluayBqc3MgUnVsZSBpbnN0YW5jZXMgd2l0aCBET00gQ1NTUnVsZSBpbnN0YW5jZXMgc28gdGhhdCBzdHlsZXMsXG4gKiAgY2FuIGJlIG1vZGlmaWVkIGR5bmFtaWNhbGx5LCBmYWxzZSBieSBkZWZhdWx0IGJlY2F1c2UgaXQgaGFzIHNvbWUgcGVyZm9ybWFuY2UgY29zdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW3J1bGVzXSBvYmplY3Qgd2l0aCBzZWxlY3RvcnMgYW5kIGRlY2xhcmF0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gU3R5bGVTaGVldChydWxlcywgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICBpZiAodGhpcy5vcHRpb25zLm5hbWVkID09IG51bGwpIHRoaXMub3B0aW9ucy5uYW1lZCA9IHRydWVcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlXG4gICAgdGhpcy5tZWRpYSA9IHRoaXMub3B0aW9ucy5tZWRpYVxuICAgIHRoaXMudHlwZSA9IHRoaXMub3B0aW9ucy50eXBlXG4gICAgdGhpcy50aXRsZSA9IHRoaXMub3B0aW9ucy50aXRsZVxuICAgIHRoaXMucnVsZXMgPSB7fVxuICAgIC8vIE9ubHkgd2hlbiBvcHRpb25zLm5hbWVkOiB0cnVlLlxuICAgIHRoaXMuY2xhc3NlcyA9IHt9XG4gICAgdGhpcy5kZXBsb3llZCA9IGZhbHNlXG4gICAgdGhpcy5saW5rZWQgPSBmYWxzZVxuXG4gICAgLy8gRG9uJ3QgY3JlYXRlIGVsZW1lbnQgaWYgd2UgYXJlIG5vdCBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoKVxuICAgIH1cblxuICAgIGZvciAodmFyIGtleSBpbiBydWxlcykge1xuICAgICAgICB0aGlzLmNyZWF0ZVJ1bGVzKGtleSwgcnVsZXNba2V5XSlcbiAgICB9XG59XG5cblN0eWxlU2hlZXQuQVRUUklCVVRFUyA9IFsndGl0bGUnLCAndHlwZScsICdtZWRpYSddXG5cbm1vZHVsZS5leHBvcnRzID0gU3R5bGVTaGVldFxuXG4vKipcbiAqIEluc2VydCBzdHlsZXNoZWV0IGVsZW1lbnQgdG8gcmVuZGVyIHRyZWUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqIEByZXR1cm4ge1N0eWxlU2hlZXR9XG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5hdHRhY2hlZCkgcmV0dXJuIHRoaXNcblxuICAgIGlmICghdGhpcy5kZXBsb3llZCkge1xuICAgICAgICB0aGlzLmRlcGxveSgpXG4gICAgICAgIHRoaXMuZGVwbG95ZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpXG5cbiAgICAvLyBCZWZvcmUgZWxlbWVudCBpcyBhdHRhY2hlZCB0byB0aGUgZG9tIHJ1bGVzIGFyZSBub3QgY3JlYXRlZC5cbiAgICBpZiAoIXRoaXMubGlua2VkICYmIHRoaXMub3B0aW9ucy5saW5rKSB7XG4gICAgICAgIHRoaXMubGluaygpXG4gICAgICAgIHRoaXMubGlua2VkID0gdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMuYXR0YWNoZWQgPSB0cnVlXG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIFJlbW92ZSBzdHlsZXNoZWV0IGVsZW1lbnQgZnJvbSByZW5kZXIgdHJlZS5cbiAqXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5hdHRhY2hlZCkgcmV0dXJuIHRoaXNcblxuICAgIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudClcbiAgICB0aGlzLmF0dGFjaGVkID0gZmFsc2VcblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogRGVwbG95IHN0eWxlcyB0byB0aGUgZWxlbWVudC5cbiAqXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJ1xcbicgKyB0aGlzLnRvU3RyaW5nKCkgKyAnXFxuJ1xuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBGaW5kIENTU1J1bGUgb2JqZWN0cyBpbiB0aGUgRE9NIGFuZCBsaW5rIHRoZW0gaW4gdGhlIGNvcnJlc3BvbmRpbmcgUnVsZSBpbnN0YW5jZS5cbiAqXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmxpbmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIENTU1J1bGVMaXN0ID0gdGhpcy5lbGVtZW50LnNoZWV0LmNzc1J1bGVzXG4gICAgdmFyIHJ1bGVzID0gdGhpcy5ydWxlc1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBDU1NSdWxlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgQ1NTUnVsZSA9IENTU1J1bGVMaXN0W2ldXG4gICAgICAgIHZhciBydWxlID0gcnVsZXNbQ1NTUnVsZS5zZWxlY3RvclRleHRdXG4gICAgICAgIGlmIChydWxlKSBydWxlLkNTU1J1bGUgPSBDU1NSdWxlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBZGQgYSBydWxlIHRvIHRoZSBjdXJyZW50IHN0eWxlc2hlZXQuIFdpbGwgaW5zZXJ0IGEgcnVsZSBhbHNvIGFmdGVyIHRoZSBzdHlsZXNoZWV0XG4gKiBoYXMgYmVlbiByZW5kZXJlZCBmaXJzdCB0aW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBba2V5XSBjYW4gYmUgc2VsZWN0b3Igb3IgbmFtZSBpZiBgb3B0aW9ucy5uYW1lZGAgaXMgdHJ1ZVxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlIHByb3BlcnR5L3ZhbHVlIGhhc2hcbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5hZGRSdWxlID0gZnVuY3Rpb24gKGtleSwgc3R5bGUpIHtcbiAgICB2YXIgcnVsZXMgPSB0aGlzLmNyZWF0ZVJ1bGVzKGtleSwgc3R5bGUpXG5cbiAgICAvLyBEb24ndCBpbnNlcnQgcnVsZSBkaXJlY3RseSBpZiB0aGVyZSBpcyBubyBzdHJpbmdpZmllZCB2ZXJzaW9uIHlldC5cbiAgICAvLyBJdCB3aWxsIGJlIGluc2VydGVkIGFsbCB0b2dldGhlciB3aGVuIC5hdHRhY2ggaXMgY2FsbGVkLlxuICAgIGlmICh0aGlzLmRlcGxveWVkKSB7XG4gICAgICAgIHZhciBzaGVldCA9IHRoaXMuZWxlbWVudC5zaGVldFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gc2hlZXQuY3NzUnVsZXMubGVuZ3RoXG4gICAgICAgICAgICB2YXIgcnVsZSA9IHJ1bGVzW2ldXG4gICAgICAgICAgICBzaGVldC5pbnNlcnRSdWxlKHJ1bGUudG9TdHJpbmcoKSwgbmV4dEluZGV4KVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saW5rKSBydWxlLkNTU1J1bGUgPSBzaGVldC5jc3NSdWxlc1tuZXh0SW5kZXhdXG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlcGxveSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGVzXG59XG5cbi8qKlxuICogQ3JlYXRlIHJ1bGVzLCB3aWxsIHJlbmRlciBhbHNvIGFmdGVyIHN0eWxlc2hlZXQgd2FzIHJlbmRlcmVkIHRoZSBmaXJzdCB0aW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBydWxlcyBrZXk6c3R5bGUgaGFzaC5cbiAqIEByZXR1cm4ge1N0eWxlU2hlZXR9IHRoaXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmFkZFJ1bGVzID0gZnVuY3Rpb24gKHJ1bGVzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHJ1bGVzKSB7XG4gICAgICAgIHRoaXMuYWRkUnVsZShrZXksIHJ1bGVzW2tleV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBHZXQgYSBydWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgY2FuIGJlIHNlbGVjdG9yIG9yIG5hbWUgaWYgYG5hbWVkYCBpcyB0cnVlLlxuICogQHJldHVybiB7UnVsZX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmdldFJ1bGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMucnVsZXNba2V5XVxufVxuXG4vKipcbiAqIENvbnZlcnQgcnVsZXMgdG8gYSBjc3Mgc3RyaW5nLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHIgPSAnJ1xuICAgIHZhciBydWxlcyA9IHRoaXMucnVsZXNcbiAgICB2YXIgc3RyaW5naWZpZWQgPSB7fVxuICAgIGZvciAodmFyIGtleSBpbiBydWxlcykge1xuICAgICAgICB2YXIgcnVsZSA9IHJ1bGVzW2tleV1cbiAgICAgICAgLy8gV2UgaGF2ZSB0aGUgc2FtZSBydWxlIHJlZmVyZW5jZWQgdHdpY2UgaWYgdXNpbmcgbmFtZWQgdXJsZXMuXG4gICAgICAgIC8vIEJ5IG5hbWUgYW5kIGJ5IHNlbGVjdG9yLlxuICAgICAgICBpZiAoc3RyaW5naWZpZWRbcnVsZS5pZF0pIGNvbnRpbnVlXG4gICAgICAgIGlmIChzdHIpIHN0ciArPSAnXFxuJ1xuICAgICAgICBzdHIgKz0gcnVsZXNba2V5XS50b1N0cmluZygpXG4gICAgICAgIHN0cmluZ2lmaWVkW3J1bGUuaWRdID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBzdHJcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBydWxlLCB3aWxsIG5vdCByZW5kZXIgYWZ0ZXIgc3R5bGVzaGVldCB3YXMgcmVuZGVyZWQgdGhlIGZpcnN0IHRpbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtzZWxlY3Rvcl0gaWYgeW91IGRvbid0IHBhc3Mgc2VsZWN0b3IgLSBpdCB3aWxsIGJlIGdlbmVyYXRlZFxuICogQHBhcmFtIHtPYmplY3R9IFtzdHlsZV0gZGVjbGFyYXRpb25zIGJsb2NrXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIHJ1bGUgb3B0aW9uc1xuICogQHJldHVybiB7QXJyYXl9IHJ1bGUgY2FuIGNvbnRhaW4gY2hpbGQgcnVsZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5jcmVhdGVSdWxlcyA9IGZ1bmN0aW9uIChrZXksIHN0eWxlLCBvcHRpb25zKSB7XG4gICAgdmFyIHJ1bGVzID0gW11cbiAgICB2YXIgc2VsZWN0b3IsIG5hbWVcblxuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG4gICAgdmFyIG5hbWVkID0gdGhpcy5vcHRpb25zLm5hbWVkXG4gICAgLy8gU2NvcGUgb3B0aW9ucyBvdmVyd3JpdGUgaW5zdGFuY2Ugb3B0aW9ucy5cbiAgICBpZiAob3B0aW9ucy5uYW1lZCAhPSBudWxsKSBuYW1lZCA9IG9wdGlvbnMubmFtZWRcblxuICAgIGlmIChuYW1lZCkgbmFtZSA9IGtleVxuICAgIGVsc2Ugc2VsZWN0b3IgPSBrZXlcblxuICAgIHZhciBydWxlID0gbmV3IFJ1bGUoc2VsZWN0b3IsIHN0eWxlLCB7XG4gICAgICAgIHNoZWV0OiB0aGlzLFxuICAgICAgICBuYW1lZDogbmFtZWQsXG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICB9KVxuICAgIHJ1bGVzLnB1c2gocnVsZSlcblxuICAgIHRoaXMucnVsZXNbcnVsZS5zZWxlY3Rvcl0gPSBydWxlXG4gICAgaWYgKG5hbWUpIHtcbiAgICAgICAgdGhpcy5ydWxlc1tuYW1lXSA9IHJ1bGVcbiAgICAgICAgdGhpcy5jbGFzc2VzW25hbWVdID0gcnVsZS5jbGFzc05hbWVcbiAgICB9XG5cbiAgICBwbHVnaW5zLnJ1bihydWxlKVxuXG4gICAgZm9yIChrZXkgaW4gcnVsZS5jaGlsZHJlbikge1xuICAgICAgICBydWxlcy5wdXNoKHRoaXMuY3JlYXRlUnVsZXMoXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBydWxlLmNoaWxkcmVuW2tleV0uc3R5bGUsXG4gICAgICAgICAgICBydWxlLmNoaWxkcmVuW2tleV0ub3B0aW9uc1xuICAgICAgICApKVxuICAgIH1cblxuICAgIHJldHVybiBydWxlc1xufVxuXG4vKipcbiAqIENyZWF0ZSBzdHlsZSBzaGVldCBlbGVtZW50LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcblxuICAgIFN0eWxlU2hlZXQuQVRUUklCVVRFUy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICh0aGlzW25hbWVdKSBlbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB0aGlzW25hbWVdKVxuICAgIH0sIHRoaXMpXG5cbiAgICByZXR1cm4gZWxlbWVudFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBTdHlsZVNoZWV0ID0gcmVxdWlyZSgnLi9TdHlsZVNoZWV0JylcbnZhciBSdWxlID0gcmVxdWlyZSgnLi9SdWxlJylcblxuZXhwb3J0cy5TdHlsZVNoZWV0ID0gU3R5bGVTaGVldFxuXG5leHBvcnRzLlJ1bGUgPSBSdWxlXG5cbmV4cG9ydHMucGx1Z2lucyA9IHJlcXVpcmUoJy4vcGx1Z2lucycpXG5cbi8qKlxuICogQ3JlYXRlIGEgc3R5bGVzaGVldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcnVsZXMgaXMgc2VsZWN0b3I6c3R5bGUgaGFzaC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbbmFtZWRdIHJ1bGVzIGhhdmUgbmFtZXMgaWYgdHJ1ZSwgY2xhc3MgbmFtZXMgd2lsbCBiZSBnZW5lcmF0ZWQuXG4gKiBAcGFyYW0ge09iamVjdH0gW2F0dHJpYnV0ZXNdIHN0eWxlc2hlZXQgZWxlbWVudCBhdHRyaWJ1dGVzLlxuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMuY3JlYXRlU3R5bGVTaGVldCA9IGZ1bmN0aW9uIChydWxlcywgbmFtZWQsIGF0dHJpYnV0ZXMpIHtcbiAgICByZXR1cm4gbmV3IFN0eWxlU2hlZXQocnVsZXMsIG5hbWVkLCBhdHRyaWJ1dGVzKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHJ1bGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtzZWxlY3Rvcl1cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZSBpcyBwcm9wZXJ0eTp2YWx1ZSBoYXNoLlxuICogQHJldHVybiB7UnVsZX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMuY3JlYXRlUnVsZSA9IGZ1bmN0aW9uIChzZWxlY3Rvciwgc3R5bGUpIHtcbiAgICB2YXIgcnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9yLCBzdHlsZSlcbiAgICBleHBvcnRzLnBsdWdpbnMucnVuKHJ1bGUpXG4gICAgcmV0dXJuIHJ1bGVcbn1cblxuLyoqXG4gKiBSZWdpc3RlciBwbHVnaW4uIFBhc3NlZCBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgd2l0aCBhIHJ1bGUgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMudXNlID0gZXhwb3J0cy5wbHVnaW5zLnVzZVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmVnaXN0ZXJlZCBwbHVnaW5zLlxuICpcbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMucmVnaXN0cnkgPSBbXVxuXG4vKipcbiAqIFJlZ2lzdGVyIHBsdWdpbi4gUGFzc2VkIGZ1bmN0aW9uIHdpbGwgYmUgaW52b2tlZCB3aXRoIGEgcnVsZSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy51c2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBleHBvcnRzLnJlZ2lzdHJ5LnB1c2goZm4pXG59XG5cbi8qKlxuICogRXhlY3V0ZSBhbGwgcmVnaXN0ZXJlZCBwbHVnaW5zLlxuICpcbiAqIEBwYXJhbSB7UnVsZX0gcnVsZVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmV4cG9ydHMucnVuID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cG9ydHMucmVnaXN0cnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZXhwb3J0cy5yZWdpc3RyeVtpXShydWxlKVxuICAgIH1cbn1cbiIsIi8qKlxuICogbG9kYXNoIDMuMC40IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vpc2VxdWFsJyksXG4gICAgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iaW5kY2FsbGJhY2snKTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlXG4gKiBlcXVpdmFsZW50LiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBjb21wYXJlIHZhbHVlcy5cbiAqIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIGNvbXBhcmlzb25zIGFyZSBoYW5kbGVkIGJ5IHRoZSBtZXRob2RcbiAqIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWVcbiAqIGFyZ3VtZW50czogKHZhbHVlLCBvdGhlciBbLCBpbmRleHxrZXldKS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2Qgc3VwcG9ydHMgY29tcGFyaW5nIGFycmF5cywgYm9vbGVhbnMsIGBEYXRlYCBvYmplY3RzLFxuICogbnVtYmVycywgYE9iamVjdGAgb2JqZWN0cywgcmVnZXhlcywgYW5kIHN0cmluZ3MuIE9iamVjdHMgYXJlIGNvbXBhcmVkIGJ5XG4gKiB0aGVpciBvd24sIG5vdCBpbmhlcml0ZWQsIGVudW1lcmFibGUgcHJvcGVydGllcy4gRnVuY3Rpb25zIGFuZCBET00gbm9kZXNcbiAqIGFyZSAqKm5vdCoqIHN1cHBvcnRlZC4gUHJvdmlkZSBhIGN1c3RvbWl6ZXIgZnVuY3Rpb24gdG8gZXh0ZW5kIHN1cHBvcnRcbiAqIGZvciBjb21wYXJpbmcgb3RoZXIgdmFsdWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXFcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHZhbHVlIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKiB2YXIgb3RoZXIgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogb2JqZWN0ID09IG90aGVyO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzRXF1YWwob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgYXJyYXkgPSBbJ2hlbGxvJywgJ2dvb2RieWUnXTtcbiAqIHZhciBvdGhlciA9IFsnaGknLCAnZ29vZGJ5ZSddO1xuICpcbiAqIF8uaXNFcXVhbChhcnJheSwgb3RoZXIsIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICBpZiAoXy5ldmVyeShbdmFsdWUsIG90aGVyXSwgUmVnRXhwLnByb3RvdHlwZS50ZXN0LCAvXmgoPzppfGVsbG8pJC8pKSB7XG4gKiAgICAgcmV0dXJuIHRydWU7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgdGhpc0FyZykge1xuICBjdXN0b21pemVyID0gdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJyA/IGJpbmRDYWxsYmFjayhjdXN0b21pemVyLCB0aGlzQXJnLCAzKSA6IHVuZGVmaW5lZDtcbiAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBvdGhlcikgOiB1bmRlZmluZWQ7XG4gIHJldHVybiAgcmVzdWx0ID09PSB1bmRlZmluZWQgPyBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIpIDogISFyZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNFcXVhbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC43IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzdHlwZWRhcnJheScpLFxuICAgIGtleXMgPSByZXF1aXJlKCdsb2Rhc2gua2V5cycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aXRob3V0IHN1cHBvcnQgZm9yIGB0aGlzYCBiaW5kaW5nXG4gKiBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3QodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG9iamVjdCk7XG4gICAgaWYgKG9ialRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvYmpUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvYmpUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvYmpJc0FyciA9IGlzVHlwZWRBcnJheShvYmplY3QpO1xuICAgIH1cbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvdGhlcik7XG4gICAgaWYgKG90aFRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvdGhUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvdGhUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvdGhJc0FyciA9IGlzVHlwZWRBcnJheShvdGhlcik7XG4gICAgfVxuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIShvYmpJc0FyciB8fCBvYmpJc09iaikpIHtcbiAgICByZXR1cm4gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcpO1xuICB9XG4gIGlmICghaXNMb29zZSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsIG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlciwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNMb29zZSAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIElnbm9yZSBub24taW5kZXggcHJvcGVydGllcy5cbiAgd2hpbGUgKCsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihpc0xvb3NlID8gb3RoVmFsdWUgOiBhcnJWYWx1ZSwgaXNMb29zZSA/IGFyclZhbHVlIDogb3RoVmFsdWUsIGluZGV4KSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoaXNMb29zZSkge1xuICAgICAgaWYgKCFhcnJheVNvbWUob3RoZXIsIGZ1bmN0aW9uKG90aFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZCBib29sZWFuc1xuICAgICAgLy8gdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXMgbm90IGVxdWFsLlxuICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIFRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbC5cbiAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpXG4gICAgICAgID8gb3RoZXIgIT0gK290aGVyXG4gICAgICAgIDogb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncyBwcmltaXRpdmVzIGFuZCBzdHJpbmdcbiAgICAgIC8vIG9iamVjdHMgYXMgZXF1YWwuIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xMC42LjQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzTG9vc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNMb29zZSA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHZhciBza2lwQ3RvciA9IGlzTG9vc2U7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKGlzTG9vc2UgPyBvdGhWYWx1ZSA6IG9ialZhbHVlLCBpc0xvb3NlPyBvYmpWYWx1ZSA6IG90aFZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuXG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEocmVzdWx0ID09PSB1bmRlZmluZWQgPyBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikgOiByZXN1bHQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjMgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCdzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGdldE5hdGl2ZShBcnJheSwgJ2lzQXJyYXknKTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCIvXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIixcbiAqIFwiKlwiLCBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOlxcL1xcL2xvZGFzaFxcLmNvbVxcL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnbG9kYXNoLl9nZXRuYXRpdmUnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXlxcZCskLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGdldE5hdGl2ZShPYmplY3QsICdrZXlzJyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9ICEhbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciBDdG9yID0gb2JqZWN0ID09IG51bGwgPyBudWxsIDogb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgICh0eXBlb2Ygb2JqZWN0ICE9ICdmdW5jdGlvbicgJiYgaXNBcnJheUxpa2Uob2JqZWN0KSkpIHtcbiAgICByZXR1cm4gc2hpbUtleXMob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/IG5hdGl2ZUtleXMob2JqZWN0KSA6IFtdO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgbGVuZ3RoID0gKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy45LjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgW3NwZWNpYWwgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpLlxuICogSW4gYWRkaXRpb24gdG8gc3BlY2lhbCBjaGFyYWN0ZXJzIHRoZSBmb3J3YXJkIHNsYXNoIGlzIGVzY2FwZWQgdG8gYWxsb3cgZm9yXG4gKiBlYXNpZXIgYGV2YWxgIHVzZSBhbmQgYEZ1bmN0aW9uYCBjb21waWxhdGlvbi5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0J3Mgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKGZuVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiByZUlzSG9zdEN0b3IudGVzdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCIvXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIixcbiAqIFwiKlwiLCBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOlxcL1xcL2xvZGFzaFxcLmNvbVxcL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYXRpdmU7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodGhpc0FyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iXX0=
