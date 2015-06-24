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

  style : require('./common/styles'),

  fonts : require('./common/fonts'),

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

},{"./../../../lib":40,"./common/colors":2,"./common/fonts":12,"./common/modules/log":14,"./common/router_animations":15,"./common/startApp":17,"./common/styles":18,"./common/todosCollection":19,"./components":23,"./pages":31}],2:[function(require,module,exports){

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

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-ExtraBold.ttf') format('truetype')",
    "font-weight": "bold",
    "font-style": "normal"
  }
};

},{}],4:[function(require,module,exports){

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-ExtraBoldItalic.ttf') format('truetype')",
    "font-weight": "bold",
    "font-style": "italic"
  }
};

},{}],5:[function(require,module,exports){

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-ExtraLight.ttf') format('truetype')",
    "font-weight": 200,
    "font-style": "normal"
  }
};

},{}],6:[function(require,module,exports){

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-ExtraLightItalic.ttf') format('truetype')",
    "font-weight": 200,
    "font-style": "italic"
  }
};

},{}],7:[function(require,module,exports){

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-Italic.ttf') format('truetype')",
    "font-weight": "normal",
    "font-style": "italic"
  }
};

},{}],8:[function(require,module,exports){

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-Regular.ttf') format('truetype')",
    "font-weight": "normal",
    "font-style": "normal"
  }
};

},{}],9:[function(require,module,exports){

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-SemiBold.ttf') format('truetype')",
    "font-weight": 500,
    "font-style": "normal"
  }
};

},{}],10:[function(require,module,exports){

module.exports = {
  "@font-face": {
    "font-family": "Exo",
    src: "url('font/exo/Exo-SemiBoldItalic.ttf') format('truetype')",
    "font-weight": 500,
    "font-style": "italic"
  }
};

},{}],11:[function(require,module,exports){
/*!
 *  Font Awesome 4.3.0 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */

module.exports = {
  "@font-face": {
    "font-family": "FontAwesome",
    src: "url('font/font_awesome/fontawesome-webfont.ttf?v=4.3.0') format('truetype')",
    "font-weight": "normal",
    "font-style": "normal"
  },
  ".fa": {
    "display": "inline-block",
    "font": "normal normal normal 14px/1 FontAwesome",
    "font-size": "inherit",
    "text-rendering": "auto",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "transform": "translate(0, 0)"
  },
  ".fa-lg": {
    "font-size": "1.33333333em",
    "line-height": "0.75em",
    "vertical-align": "-15%"
  },
  ".fa-2x": {
    "font-size": "2em"
  },
  ".fa-3x": {
    "font-size": "3em"
  },
  ".fa-4x": {
    "font-size": "4em"
  },
  ".fa-5x": {
    "font-size": "5em"
  },
  ".fa-fw": {
    "width": "1.28571429em",
    "text-align": "center"
  },
  ".fa-ul": {
    "padding-left": "0",
    "margin-left": "2.14285714em",
    "list-style-type": "none"
  },
  ".fa-ul > li": {
    "position": "relative"
  },
  ".fa-li": {
    "position": "absolute",
    "left": "-2.14285714em",
    "width": "2.14285714em",
    "top": "0.14285714em",
    "text-align": "center"
  },
  ".fa-li.fa-lg": {
    "left": "-1.85714286em"
  },
  ".fa-border": {
    "padding": ".2em .25em .15em",
    "border": "solid 0.08em #eeeeee",
    "border-radius": ".1em"
  },
  ".pull-right": {
    "float": "right"
  },
  ".pull-left": {
    "float": "left"
  },
  ".fa.pull-left": {
    "margin-right": ".3em"
  },
  ".fa.pull-right": {
    "margin-left": ".3em"
  },
  ".fa-spin": {
    "-webkit-animation": "fa-spin 2s infinite linear",
    "animation": "fa-spin 2s infinite linear"
  },
  ".fa-pulse": {
    "-webkit-animation": "fa-spin 1s infinite steps(8)",
    "animation": "fa-spin 1s infinite steps(8)"
  },
  "@keyframes fa-spin": {
    "0%": {
      "-webkit-transform": "rotate(0deg)",
      "transform": "rotate(0deg)"
    },
    "100%": {
      "-webkit-transform": "rotate(359deg)",
      "transform": "rotate(359deg)"
    }
  },
  ".fa-rotate-90": {
    "filter": "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)",
    "-webkit-transform": "rotate(90deg)",
    "-ms-transform": "rotate(90deg)",
    "transform": "rotate(90deg)"
  },
  ".fa-rotate-180": {
    "filter": "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)",
    "-webkit-transform": "rotate(180deg)",
    "-ms-transform": "rotate(180deg)",
    "transform": "rotate(180deg)"
  },
  ".fa-rotate-270": {
    "filter": "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)",
    "-webkit-transform": "rotate(270deg)",
    "-ms-transform": "rotate(270deg)",
    "transform": "rotate(270deg)"
  },
  ".fa-flip-horizontal": {
    "filter": "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)",
    "-webkit-transform": "scale(-1, 1)",
    "-ms-transform": "scale(-1, 1)",
    "transform": "scale(-1, 1)"
  },
  ".fa-flip-vertical": {
    "filter": "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)",
    "-webkit-transform": "scale(1, -1)",
    "-ms-transform": "scale(1, -1)",
    "transform": "scale(1, -1)"
  },
  ":root .fa-rotate-90, :root .fa-rotate-180, :root .fa-rotate-270, :root .fa-flip-horizontal, :root .fa-flip-vertical": {
    "filter": "none"
  },
  ".fa-stack": {
    "position": "relative",
    "display": "inline-block",
    "width": "2em",
    "height": "2em",
    "line-height": "2em",
    "vertical-align": "middle"
  },
  ".fa-stack-1x, .fa-stack-2x": {
    "position": "absolute",
    "left": "0",
    "width": "100%",
    "text-align": "center"
  },
  ".fa-stack-1x": {
    "line-height": "inherit"
  },
  ".fa-stack-2x": {
    "font-size": "2em"
  },
  ".fa-inverse": {
    "color": "#ffffff"
  },
  ".fa-glass:before": {
    "content": "\"\\f000\""
  },
  ".fa-music:before": {
    "content": "\"\\f001\""
  },
  ".fa-search:before": {
    "content": "\"\\f002\""
  },
  ".fa-envelope-o:before": {
    "content": "\"\\f003\""
  },
  ".fa-heart:before": {
    "content": "\"\\f004\""
  },
  ".fa-star:before": {
    "content": "\"\\f005\""
  },
  ".fa-star-o:before": {
    "content": "\"\\f006\""
  },
  ".fa-user:before": {
    "content": "\"\\f007\""
  },
  ".fa-film:before": {
    "content": "\"\\f008\""
  },
  ".fa-th-large:before": {
    "content": "\"\\f009\""
  },
  ".fa-th:before": {
    "content": "\"\\f00a\""
  },
  ".fa-th-list:before": {
    "content": "\"\\f00b\""
  },
  ".fa-check:before": {
    "content": "\"\\f00c\""
  },
  ".fa-remove:before, .fa-close:before, .fa-times:before": {
    "content": "\"\\f00d\""
  },
  ".fa-search-plus:before": {
    "content": "\"\\f00e\""
  },
  ".fa-search-minus:before": {
    "content": "\"\\f010\""
  },
  ".fa-power-off:before": {
    "content": "\"\\f011\""
  },
  ".fa-signal:before": {
    "content": "\"\\f012\""
  },
  ".fa-gear:before, .fa-cog:before": {
    "content": "\"\\f013\""
  },
  ".fa-trash-o:before": {
    "content": "\"\\f014\""
  },
  ".fa-home:before": {
    "content": "\"\\f015\""
  },
  ".fa-file-o:before": {
    "content": "\"\\f016\""
  },
  ".fa-clock-o:before": {
    "content": "\"\\f017\""
  },
  ".fa-road:before": {
    "content": "\"\\f018\""
  },
  ".fa-download:before": {
    "content": "\"\\f019\""
  },
  ".fa-arrow-circle-o-down:before": {
    "content": "\"\\f01a\""
  },
  ".fa-arrow-circle-o-up:before": {
    "content": "\"\\f01b\""
  },
  ".fa-inbox:before": {
    "content": "\"\\f01c\""
  },
  ".fa-play-circle-o:before": {
    "content": "\"\\f01d\""
  },
  ".fa-rotate-right:before, .fa-repeat:before": {
    "content": "\"\\f01e\""
  },
  ".fa-refresh:before": {
    "content": "\"\\f021\""
  },
  ".fa-list-alt:before": {
    "content": "\"\\f022\""
  },
  ".fa-lock:before": {
    "content": "\"\\f023\""
  },
  ".fa-flag:before": {
    "content": "\"\\f024\""
  },
  ".fa-headphones:before": {
    "content": "\"\\f025\""
  },
  ".fa-volume-off:before": {
    "content": "\"\\f026\""
  },
  ".fa-volume-down:before": {
    "content": "\"\\f027\""
  },
  ".fa-volume-up:before": {
    "content": "\"\\f028\""
  },
  ".fa-qrcode:before": {
    "content": "\"\\f029\""
  },
  ".fa-barcode:before": {
    "content": "\"\\f02a\""
  },
  ".fa-tag:before": {
    "content": "\"\\f02b\""
  },
  ".fa-tags:before": {
    "content": "\"\\f02c\""
  },
  ".fa-book:before": {
    "content": "\"\\f02d\""
  },
  ".fa-bookmark:before": {
    "content": "\"\\f02e\""
  },
  ".fa-print:before": {
    "content": "\"\\f02f\""
  },
  ".fa-camera:before": {
    "content": "\"\\f030\""
  },
  ".fa-font:before": {
    "content": "\"\\f031\""
  },
  ".fa-bold:before": {
    "content": "\"\\f032\""
  },
  ".fa-italic:before": {
    "content": "\"\\f033\""
  },
  ".fa-text-height:before": {
    "content": "\"\\f034\""
  },
  ".fa-text-width:before": {
    "content": "\"\\f035\""
  },
  ".fa-align-left:before": {
    "content": "\"\\f036\""
  },
  ".fa-align-center:before": {
    "content": "\"\\f037\""
  },
  ".fa-align-right:before": {
    "content": "\"\\f038\""
  },
  ".fa-align-justify:before": {
    "content": "\"\\f039\""
  },
  ".fa-list:before": {
    "content": "\"\\f03a\""
  },
  ".fa-dedent:before, .fa-outdent:before": {
    "content": "\"\\f03b\""
  },
  ".fa-indent:before": {
    "content": "\"\\f03c\""
  },
  ".fa-video-camera:before": {
    "content": "\"\\f03d\""
  },
  ".fa-photo:before, .fa-image:before, .fa-picture-o:before": {
    "content": "\"\\f03e\""
  },
  ".fa-pencil:before": {
    "content": "\"\\f040\""
  },
  ".fa-map-marker:before": {
    "content": "\"\\f041\""
  },
  ".fa-adjust:before": {
    "content": "\"\\f042\""
  },
  ".fa-tint:before": {
    "content": "\"\\f043\""
  },
  ".fa-edit:before, .fa-pencil-square-o:before": {
    "content": "\"\\f044\""
  },
  ".fa-share-square-o:before": {
    "content": "\"\\f045\""
  },
  ".fa-check-square-o:before": {
    "content": "\"\\f046\""
  },
  ".fa-arrows:before": {
    "content": "\"\\f047\""
  },
  ".fa-step-backward:before": {
    "content": "\"\\f048\""
  },
  ".fa-fast-backward:before": {
    "content": "\"\\f049\""
  },
  ".fa-backward:before": {
    "content": "\"\\f04a\""
  },
  ".fa-play:before": {
    "content": "\"\\f04b\""
  },
  ".fa-pause:before": {
    "content": "\"\\f04c\""
  },
  ".fa-stop:before": {
    "content": "\"\\f04d\""
  },
  ".fa-forward:before": {
    "content": "\"\\f04e\""
  },
  ".fa-fast-forward:before": {
    "content": "\"\\f050\""
  },
  ".fa-step-forward:before": {
    "content": "\"\\f051\""
  },
  ".fa-eject:before": {
    "content": "\"\\f052\""
  },
  ".fa-chevron-left:before": {
    "content": "\"\\f053\""
  },
  ".fa-chevron-right:before": {
    "content": "\"\\f054\""
  },
  ".fa-plus-circle:before": {
    "content": "\"\\f055\""
  },
  ".fa-minus-circle:before": {
    "content": "\"\\f056\""
  },
  ".fa-times-circle:before": {
    "content": "\"\\f057\""
  },
  ".fa-check-circle:before": {
    "content": "\"\\f058\""
  },
  ".fa-question-circle:before": {
    "content": "\"\\f059\""
  },
  ".fa-info-circle:before": {
    "content": "\"\\f05a\""
  },
  ".fa-crosshairs:before": {
    "content": "\"\\f05b\""
  },
  ".fa-times-circle-o:before": {
    "content": "\"\\f05c\""
  },
  ".fa-check-circle-o:before": {
    "content": "\"\\f05d\""
  },
  ".fa-ban:before": {
    "content": "\"\\f05e\""
  },
  ".fa-arrow-left:before": {
    "content": "\"\\f060\""
  },
  ".fa-arrow-right:before": {
    "content": "\"\\f061\""
  },
  ".fa-arrow-up:before": {
    "content": "\"\\f062\""
  },
  ".fa-arrow-down:before": {
    "content": "\"\\f063\""
  },
  ".fa-mail-forward:before, .fa-share:before": {
    "content": "\"\\f064\""
  },
  ".fa-expand:before": {
    "content": "\"\\f065\""
  },
  ".fa-compress:before": {
    "content": "\"\\f066\""
  },
  ".fa-plus:before": {
    "content": "\"\\f067\""
  },
  ".fa-minus:before": {
    "content": "\"\\f068\""
  },
  ".fa-asterisk:before": {
    "content": "\"\\f069\""
  },
  ".fa-exclamation-circle:before": {
    "content": "\"\\f06a\""
  },
  ".fa-gift:before": {
    "content": "\"\\f06b\""
  },
  ".fa-leaf:before": {
    "content": "\"\\f06c\""
  },
  ".fa-fire:before": {
    "content": "\"\\f06d\""
  },
  ".fa-eye:before": {
    "content": "\"\\f06e\""
  },
  ".fa-eye-slash:before": {
    "content": "\"\\f070\""
  },
  ".fa-warning:before, .fa-exclamation-triangle:before": {
    "content": "\"\\f071\""
  },
  ".fa-plane:before": {
    "content": "\"\\f072\""
  },
  ".fa-calendar:before": {
    "content": "\"\\f073\""
  },
  ".fa-random:before": {
    "content": "\"\\f074\""
  },
  ".fa-comment:before": {
    "content": "\"\\f075\""
  },
  ".fa-magnet:before": {
    "content": "\"\\f076\""
  },
  ".fa-chevron-up:before": {
    "content": "\"\\f077\""
  },
  ".fa-chevron-down:before": {
    "content": "\"\\f078\""
  },
  ".fa-retweet:before": {
    "content": "\"\\f079\""
  },
  ".fa-shopping-cart:before": {
    "content": "\"\\f07a\""
  },
  ".fa-folder:before": {
    "content": "\"\\f07b\""
  },
  ".fa-folder-open:before": {
    "content": "\"\\f07c\""
  },
  ".fa-arrows-v:before": {
    "content": "\"\\f07d\""
  },
  ".fa-arrows-h:before": {
    "content": "\"\\f07e\""
  },
  ".fa-bar-chart-o:before, .fa-bar-chart:before": {
    "content": "\"\\f080\""
  },
  ".fa-twitter-square:before": {
    "content": "\"\\f081\""
  },
  ".fa-facebook-square:before": {
    "content": "\"\\f082\""
  },
  ".fa-camera-retro:before": {
    "content": "\"\\f083\""
  },
  ".fa-key:before": {
    "content": "\"\\f084\""
  },
  ".fa-gears:before, .fa-cogs:before": {
    "content": "\"\\f085\""
  },
  ".fa-comments:before": {
    "content": "\"\\f086\""
  },
  ".fa-thumbs-o-up:before": {
    "content": "\"\\f087\""
  },
  ".fa-thumbs-o-down:before": {
    "content": "\"\\f088\""
  },
  ".fa-star-half:before": {
    "content": "\"\\f089\""
  },
  ".fa-heart-o:before": {
    "content": "\"\\f08a\""
  },
  ".fa-sign-out:before": {
    "content": "\"\\f08b\""
  },
  ".fa-linkedin-square:before": {
    "content": "\"\\f08c\""
  },
  ".fa-thumb-tack:before": {
    "content": "\"\\f08d\""
  },
  ".fa-external-link:before": {
    "content": "\"\\f08e\""
  },
  ".fa-sign-in:before": {
    "content": "\"\\f090\""
  },
  ".fa-trophy:before": {
    "content": "\"\\f091\""
  },
  ".fa-github-square:before": {
    "content": "\"\\f092\""
  },
  ".fa-upload:before": {
    "content": "\"\\f093\""
  },
  ".fa-lemon-o:before": {
    "content": "\"\\f094\""
  },
  ".fa-phone:before": {
    "content": "\"\\f095\""
  },
  ".fa-square-o:before": {
    "content": "\"\\f096\""
  },
  ".fa-bookmark-o:before": {
    "content": "\"\\f097\""
  },
  ".fa-phone-square:before": {
    "content": "\"\\f098\""
  },
  ".fa-twitter:before": {
    "content": "\"\\f099\""
  },
  ".fa-facebook-f:before, .fa-facebook:before": {
    "content": "\"\\f09a\""
  },
  ".fa-github:before": {
    "content": "\"\\f09b\""
  },
  ".fa-unlock:before": {
    "content": "\"\\f09c\""
  },
  ".fa-credit-card:before": {
    "content": "\"\\f09d\""
  },
  ".fa-rss:before": {
    "content": "\"\\f09e\""
  },
  ".fa-hdd-o:before": {
    "content": "\"\\f0a0\""
  },
  ".fa-bullhorn:before": {
    "content": "\"\\f0a1\""
  },
  ".fa-bell:before": {
    "content": "\"\\f0f3\""
  },
  ".fa-certificate:before": {
    "content": "\"\\f0a3\""
  },
  ".fa-hand-o-right:before": {
    "content": "\"\\f0a4\""
  },
  ".fa-hand-o-left:before": {
    "content": "\"\\f0a5\""
  },
  ".fa-hand-o-up:before": {
    "content": "\"\\f0a6\""
  },
  ".fa-hand-o-down:before": {
    "content": "\"\\f0a7\""
  },
  ".fa-arrow-circle-left:before": {
    "content": "\"\\f0a8\""
  },
  ".fa-arrow-circle-right:before": {
    "content": "\"\\f0a9\""
  },
  ".fa-arrow-circle-up:before": {
    "content": "\"\\f0aa\""
  },
  ".fa-arrow-circle-down:before": {
    "content": "\"\\f0ab\""
  },
  ".fa-globe:before": {
    "content": "\"\\f0ac\""
  },
  ".fa-wrench:before": {
    "content": "\"\\f0ad\""
  },
  ".fa-tasks:before": {
    "content": "\"\\f0ae\""
  },
  ".fa-filter:before": {
    "content": "\"\\f0b0\""
  },
  ".fa-briefcase:before": {
    "content": "\"\\f0b1\""
  },
  ".fa-arrows-alt:before": {
    "content": "\"\\f0b2\""
  },
  ".fa-group:before, .fa-users:before": {
    "content": "\"\\f0c0\""
  },
  ".fa-chain:before, .fa-link:before": {
    "content": "\"\\f0c1\""
  },
  ".fa-cloud:before": {
    "content": "\"\\f0c2\""
  },
  ".fa-flask:before": {
    "content": "\"\\f0c3\""
  },
  ".fa-cut:before, .fa-scissors:before": {
    "content": "\"\\f0c4\""
  },
  ".fa-copy:before, .fa-files-o:before": {
    "content": "\"\\f0c5\""
  },
  ".fa-paperclip:before": {
    "content": "\"\\f0c6\""
  },
  ".fa-save:before, .fa-floppy-o:before": {
    "content": "\"\\f0c7\""
  },
  ".fa-square:before": {
    "content": "\"\\f0c8\""
  },
  ".fa-navicon:before, .fa-reorder:before, .fa-bars:before": {
    "content": "\"\\f0c9\""
  },
  ".fa-list-ul:before": {
    "content": "\"\\f0ca\""
  },
  ".fa-list-ol:before": {
    "content": "\"\\f0cb\""
  },
  ".fa-strikethrough:before": {
    "content": "\"\\f0cc\""
  },
  ".fa-underline:before": {
    "content": "\"\\f0cd\""
  },
  ".fa-table:before": {
    "content": "\"\\f0ce\""
  },
  ".fa-magic:before": {
    "content": "\"\\f0d0\""
  },
  ".fa-truck:before": {
    "content": "\"\\f0d1\""
  },
  ".fa-pinterest:before": {
    "content": "\"\\f0d2\""
  },
  ".fa-pinterest-square:before": {
    "content": "\"\\f0d3\""
  },
  ".fa-google-plus-square:before": {
    "content": "\"\\f0d4\""
  },
  ".fa-google-plus:before": {
    "content": "\"\\f0d5\""
  },
  ".fa-money:before": {
    "content": "\"\\f0d6\""
  },
  ".fa-caret-down:before": {
    "content": "\"\\f0d7\""
  },
  ".fa-caret-up:before": {
    "content": "\"\\f0d8\""
  },
  ".fa-caret-left:before": {
    "content": "\"\\f0d9\""
  },
  ".fa-caret-right:before": {
    "content": "\"\\f0da\""
  },
  ".fa-columns:before": {
    "content": "\"\\f0db\""
  },
  ".fa-unsorted:before, .fa-sort:before": {
    "content": "\"\\f0dc\""
  },
  ".fa-sort-down:before, .fa-sort-desc:before": {
    "content": "\"\\f0dd\""
  },
  ".fa-sort-up:before, .fa-sort-asc:before": {
    "content": "\"\\f0de\""
  },
  ".fa-envelope:before": {
    "content": "\"\\f0e0\""
  },
  ".fa-linkedin:before": {
    "content": "\"\\f0e1\""
  },
  ".fa-rotate-left:before, .fa-undo:before": {
    "content": "\"\\f0e2\""
  },
  ".fa-legal:before, .fa-gavel:before": {
    "content": "\"\\f0e3\""
  },
  ".fa-dashboard:before, .fa-tachometer:before": {
    "content": "\"\\f0e4\""
  },
  ".fa-comment-o:before": {
    "content": "\"\\f0e5\""
  },
  ".fa-comments-o:before": {
    "content": "\"\\f0e6\""
  },
  ".fa-flash:before, .fa-bolt:before": {
    "content": "\"\\f0e7\""
  },
  ".fa-sitemap:before": {
    "content": "\"\\f0e8\""
  },
  ".fa-umbrella:before": {
    "content": "\"\\f0e9\""
  },
  ".fa-paste:before, .fa-clipboard:before": {
    "content": "\"\\f0ea\""
  },
  ".fa-lightbulb-o:before": {
    "content": "\"\\f0eb\""
  },
  ".fa-exchange:before": {
    "content": "\"\\f0ec\""
  },
  ".fa-cloud-download:before": {
    "content": "\"\\f0ed\""
  },
  ".fa-cloud-upload:before": {
    "content": "\"\\f0ee\""
  },
  ".fa-user-md:before": {
    "content": "\"\\f0f0\""
  },
  ".fa-stethoscope:before": {
    "content": "\"\\f0f1\""
  },
  ".fa-suitcase:before": {
    "content": "\"\\f0f2\""
  },
  ".fa-bell-o:before": {
    "content": "\"\\f0a2\""
  },
  ".fa-coffee:before": {
    "content": "\"\\f0f4\""
  },
  ".fa-cutlery:before": {
    "content": "\"\\f0f5\""
  },
  ".fa-file-text-o:before": {
    "content": "\"\\f0f6\""
  },
  ".fa-building-o:before": {
    "content": "\"\\f0f7\""
  },
  ".fa-hospital-o:before": {
    "content": "\"\\f0f8\""
  },
  ".fa-ambulance:before": {
    "content": "\"\\f0f9\""
  },
  ".fa-medkit:before": {
    "content": "\"\\f0fa\""
  },
  ".fa-fighter-jet:before": {
    "content": "\"\\f0fb\""
  },
  ".fa-beer:before": {
    "content": "\"\\f0fc\""
  },
  ".fa-h-square:before": {
    "content": "\"\\f0fd\""
  },
  ".fa-plus-square:before": {
    "content": "\"\\f0fe\""
  },
  ".fa-angle-double-left:before": {
    "content": "\"\\f100\""
  },
  ".fa-angle-double-right:before": {
    "content": "\"\\f101\""
  },
  ".fa-angle-double-up:before": {
    "content": "\"\\f102\""
  },
  ".fa-angle-double-down:before": {
    "content": "\"\\f103\""
  },
  ".fa-angle-left:before": {
    "content": "\"\\f104\""
  },
  ".fa-angle-right:before": {
    "content": "\"\\f105\""
  },
  ".fa-angle-up:before": {
    "content": "\"\\f106\""
  },
  ".fa-angle-down:before": {
    "content": "\"\\f107\""
  },
  ".fa-desktop:before": {
    "content": "\"\\f108\""
  },
  ".fa-laptop:before": {
    "content": "\"\\f109\""
  },
  ".fa-tablet:before": {
    "content": "\"\\f10a\""
  },
  ".fa-mobile-phone:before, .fa-mobile:before": {
    "content": "\"\\f10b\""
  },
  ".fa-circle-o:before": {
    "content": "\"\\f10c\""
  },
  ".fa-quote-left:before": {
    "content": "\"\\f10d\""
  },
  ".fa-quote-right:before": {
    "content": "\"\\f10e\""
  },
  ".fa-spinner:before": {
    "content": "\"\\f110\""
  },
  ".fa-circle:before": {
    "content": "\"\\f111\""
  },
  ".fa-mail-reply:before, .fa-reply:before": {
    "content": "\"\\f112\""
  },
  ".fa-github-alt:before": {
    "content": "\"\\f113\""
  },
  ".fa-folder-o:before": {
    "content": "\"\\f114\""
  },
  ".fa-folder-open-o:before": {
    "content": "\"\\f115\""
  },
  ".fa-smile-o:before": {
    "content": "\"\\f118\""
  },
  ".fa-frown-o:before": {
    "content": "\"\\f119\""
  },
  ".fa-meh-o:before": {
    "content": "\"\\f11a\""
  },
  ".fa-gamepad:before": {
    "content": "\"\\f11b\""
  },
  ".fa-keyboard-o:before": {
    "content": "\"\\f11c\""
  },
  ".fa-flag-o:before": {
    "content": "\"\\f11d\""
  },
  ".fa-flag-checkered:before": {
    "content": "\"\\f11e\""
  },
  ".fa-terminal:before": {
    "content": "\"\\f120\""
  },
  ".fa-code:before": {
    "content": "\"\\f121\""
  },
  ".fa-mail-reply-all:before, .fa-reply-all:before": {
    "content": "\"\\f122\""
  },
  ".fa-star-half-empty:before, .fa-star-half-full:before, .fa-star-half-o:before": {
    "content": "\"\\f123\""
  },
  ".fa-location-arrow:before": {
    "content": "\"\\f124\""
  },
  ".fa-crop:before": {
    "content": "\"\\f125\""
  },
  ".fa-code-fork:before": {
    "content": "\"\\f126\""
  },
  ".fa-unlink:before, .fa-chain-broken:before": {
    "content": "\"\\f127\""
  },
  ".fa-question:before": {
    "content": "\"\\f128\""
  },
  ".fa-info:before": {
    "content": "\"\\f129\""
  },
  ".fa-exclamation:before": {
    "content": "\"\\f12a\""
  },
  ".fa-superscript:before": {
    "content": "\"\\f12b\""
  },
  ".fa-subscript:before": {
    "content": "\"\\f12c\""
  },
  ".fa-eraser:before": {
    "content": "\"\\f12d\""
  },
  ".fa-puzzle-piece:before": {
    "content": "\"\\f12e\""
  },
  ".fa-microphone:before": {
    "content": "\"\\f130\""
  },
  ".fa-microphone-slash:before": {
    "content": "\"\\f131\""
  },
  ".fa-shield:before": {
    "content": "\"\\f132\""
  },
  ".fa-calendar-o:before": {
    "content": "\"\\f133\""
  },
  ".fa-fire-extinguisher:before": {
    "content": "\"\\f134\""
  },
  ".fa-rocket:before": {
    "content": "\"\\f135\""
  },
  ".fa-maxcdn:before": {
    "content": "\"\\f136\""
  },
  ".fa-chevron-circle-left:before": {
    "content": "\"\\f137\""
  },
  ".fa-chevron-circle-right:before": {
    "content": "\"\\f138\""
  },
  ".fa-chevron-circle-up:before": {
    "content": "\"\\f139\""
  },
  ".fa-chevron-circle-down:before": {
    "content": "\"\\f13a\""
  },
  ".fa-html5:before": {
    "content": "\"\\f13b\""
  },
  ".fa-css3:before": {
    "content": "\"\\f13c\""
  },
  ".fa-anchor:before": {
    "content": "\"\\f13d\""
  },
  ".fa-unlock-alt:before": {
    "content": "\"\\f13e\""
  },
  ".fa-bullseye:before": {
    "content": "\"\\f140\""
  },
  ".fa-ellipsis-h:before": {
    "content": "\"\\f141\""
  },
  ".fa-ellipsis-v:before": {
    "content": "\"\\f142\""
  },
  ".fa-rss-square:before": {
    "content": "\"\\f143\""
  },
  ".fa-play-circle:before": {
    "content": "\"\\f144\""
  },
  ".fa-ticket:before": {
    "content": "\"\\f145\""
  },
  ".fa-minus-square:before": {
    "content": "\"\\f146\""
  },
  ".fa-minus-square-o:before": {
    "content": "\"\\f147\""
  },
  ".fa-level-up:before": {
    "content": "\"\\f148\""
  },
  ".fa-level-down:before": {
    "content": "\"\\f149\""
  },
  ".fa-check-square:before": {
    "content": "\"\\f14a\""
  },
  ".fa-pencil-square:before": {
    "content": "\"\\f14b\""
  },
  ".fa-external-link-square:before": {
    "content": "\"\\f14c\""
  },
  ".fa-share-square:before": {
    "content": "\"\\f14d\""
  },
  ".fa-compass:before": {
    "content": "\"\\f14e\""
  },
  ".fa-toggle-down:before, .fa-caret-square-o-down:before": {
    "content": "\"\\f150\""
  },
  ".fa-toggle-up:before, .fa-caret-square-o-up:before": {
    "content": "\"\\f151\""
  },
  ".fa-toggle-right:before, .fa-caret-square-o-right:before": {
    "content": "\"\\f152\""
  },
  ".fa-euro:before, .fa-eur:before": {
    "content": "\"\\f153\""
  },
  ".fa-gbp:before": {
    "content": "\"\\f154\""
  },
  ".fa-dollar:before, .fa-usd:before": {
    "content": "\"\\f155\""
  },
  ".fa-rupee:before, .fa-inr:before": {
    "content": "\"\\f156\""
  },
  ".fa-cny:before, .fa-rmb:before, .fa-yen:before, .fa-jpy:before": {
    "content": "\"\\f157\""
  },
  ".fa-ruble:before, .fa-rouble:before, .fa-rub:before": {
    "content": "\"\\f158\""
  },
  ".fa-won:before, .fa-krw:before": {
    "content": "\"\\f159\""
  },
  ".fa-bitcoin:before, .fa-btc:before": {
    "content": "\"\\f15a\""
  },
  ".fa-file:before": {
    "content": "\"\\f15b\""
  },
  ".fa-file-text:before": {
    "content": "\"\\f15c\""
  },
  ".fa-sort-alpha-asc:before": {
    "content": "\"\\f15d\""
  },
  ".fa-sort-alpha-desc:before": {
    "content": "\"\\f15e\""
  },
  ".fa-sort-amount-asc:before": {
    "content": "\"\\f160\""
  },
  ".fa-sort-amount-desc:before": {
    "content": "\"\\f161\""
  },
  ".fa-sort-numeric-asc:before": {
    "content": "\"\\f162\""
  },
  ".fa-sort-numeric-desc:before": {
    "content": "\"\\f163\""
  },
  ".fa-thumbs-up:before": {
    "content": "\"\\f164\""
  },
  ".fa-thumbs-down:before": {
    "content": "\"\\f165\""
  },
  ".fa-youtube-square:before": {
    "content": "\"\\f166\""
  },
  ".fa-youtube:before": {
    "content": "\"\\f167\""
  },
  ".fa-xing:before": {
    "content": "\"\\f168\""
  },
  ".fa-xing-square:before": {
    "content": "\"\\f169\""
  },
  ".fa-youtube-play:before": {
    "content": "\"\\f16a\""
  },
  ".fa-dropbox:before": {
    "content": "\"\\f16b\""
  },
  ".fa-stack-overflow:before": {
    "content": "\"\\f16c\""
  },
  ".fa-instagram:before": {
    "content": "\"\\f16d\""
  },
  ".fa-flickr:before": {
    "content": "\"\\f16e\""
  },
  ".fa-adn:before": {
    "content": "\"\\f170\""
  },
  ".fa-bitbucket:before": {
    "content": "\"\\f171\""
  },
  ".fa-bitbucket-square:before": {
    "content": "\"\\f172\""
  },
  ".fa-tumblr:before": {
    "content": "\"\\f173\""
  },
  ".fa-tumblr-square:before": {
    "content": "\"\\f174\""
  },
  ".fa-long-arrow-down:before": {
    "content": "\"\\f175\""
  },
  ".fa-long-arrow-up:before": {
    "content": "\"\\f176\""
  },
  ".fa-long-arrow-left:before": {
    "content": "\"\\f177\""
  },
  ".fa-long-arrow-right:before": {
    "content": "\"\\f178\""
  },
  ".fa-apple:before": {
    "content": "\"\\f179\""
  },
  ".fa-windows:before": {
    "content": "\"\\f17a\""
  },
  ".fa-android:before": {
    "content": "\"\\f17b\""
  },
  ".fa-linux:before": {
    "content": "\"\\f17c\""
  },
  ".fa-dribbble:before": {
    "content": "\"\\f17d\""
  },
  ".fa-skype:before": {
    "content": "\"\\f17e\""
  },
  ".fa-foursquare:before": {
    "content": "\"\\f180\""
  },
  ".fa-trello:before": {
    "content": "\"\\f181\""
  },
  ".fa-female:before": {
    "content": "\"\\f182\""
  },
  ".fa-male:before": {
    "content": "\"\\f183\""
  },
  ".fa-gittip:before, .fa-gratipay:before": {
    "content": "\"\\f184\""
  },
  ".fa-sun-o:before": {
    "content": "\"\\f185\""
  },
  ".fa-moon-o:before": {
    "content": "\"\\f186\""
  },
  ".fa-archive:before": {
    "content": "\"\\f187\""
  },
  ".fa-bug:before": {
    "content": "\"\\f188\""
  },
  ".fa-vk:before": {
    "content": "\"\\f189\""
  },
  ".fa-weibo:before": {
    "content": "\"\\f18a\""
  },
  ".fa-renren:before": {
    "content": "\"\\f18b\""
  },
  ".fa-pagelines:before": {
    "content": "\"\\f18c\""
  },
  ".fa-stack-exchange:before": {
    "content": "\"\\f18d\""
  },
  ".fa-arrow-circle-o-right:before": {
    "content": "\"\\f18e\""
  },
  ".fa-arrow-circle-o-left:before": {
    "content": "\"\\f190\""
  },
  ".fa-toggle-left:before, .fa-caret-square-o-left:before": {
    "content": "\"\\f191\""
  },
  ".fa-dot-circle-o:before": {
    "content": "\"\\f192\""
  },
  ".fa-wheelchair:before": {
    "content": "\"\\f193\""
  },
  ".fa-vimeo-square:before": {
    "content": "\"\\f194\""
  },
  ".fa-turkish-lira:before, .fa-try:before": {
    "content": "\"\\f195\""
  },
  ".fa-plus-square-o:before": {
    "content": "\"\\f196\""
  },
  ".fa-space-shuttle:before": {
    "content": "\"\\f197\""
  },
  ".fa-slack:before": {
    "content": "\"\\f198\""
  },
  ".fa-envelope-square:before": {
    "content": "\"\\f199\""
  },
  ".fa-wordpress:before": {
    "content": "\"\\f19a\""
  },
  ".fa-openid:before": {
    "content": "\"\\f19b\""
  },
  ".fa-institution:before, .fa-bank:before, .fa-university:before": {
    "content": "\"\\f19c\""
  },
  ".fa-mortar-board:before, .fa-graduation-cap:before": {
    "content": "\"\\f19d\""
  },
  ".fa-yahoo:before": {
    "content": "\"\\f19e\""
  },
  ".fa-google:before": {
    "content": "\"\\f1a0\""
  },
  ".fa-reddit:before": {
    "content": "\"\\f1a1\""
  },
  ".fa-reddit-square:before": {
    "content": "\"\\f1a2\""
  },
  ".fa-stumbleupon-circle:before": {
    "content": "\"\\f1a3\""
  },
  ".fa-stumbleupon:before": {
    "content": "\"\\f1a4\""
  },
  ".fa-delicious:before": {
    "content": "\"\\f1a5\""
  },
  ".fa-digg:before": {
    "content": "\"\\f1a6\""
  },
  ".fa-pied-piper:before": {
    "content": "\"\\f1a7\""
  },
  ".fa-pied-piper-alt:before": {
    "content": "\"\\f1a8\""
  },
  ".fa-drupal:before": {
    "content": "\"\\f1a9\""
  },
  ".fa-joomla:before": {
    "content": "\"\\f1aa\""
  },
  ".fa-language:before": {
    "content": "\"\\f1ab\""
  },
  ".fa-fax:before": {
    "content": "\"\\f1ac\""
  },
  ".fa-building:before": {
    "content": "\"\\f1ad\""
  },
  ".fa-child:before": {
    "content": "\"\\f1ae\""
  },
  ".fa-paw:before": {
    "content": "\"\\f1b0\""
  },
  ".fa-spoon:before": {
    "content": "\"\\f1b1\""
  },
  ".fa-cube:before": {
    "content": "\"\\f1b2\""
  },
  ".fa-cubes:before": {
    "content": "\"\\f1b3\""
  },
  ".fa-behance:before": {
    "content": "\"\\f1b4\""
  },
  ".fa-behance-square:before": {
    "content": "\"\\f1b5\""
  },
  ".fa-steam:before": {
    "content": "\"\\f1b6\""
  },
  ".fa-steam-square:before": {
    "content": "\"\\f1b7\""
  },
  ".fa-recycle:before": {
    "content": "\"\\f1b8\""
  },
  ".fa-automobile:before, .fa-car:before": {
    "content": "\"\\f1b9\""
  },
  ".fa-cab:before, .fa-taxi:before": {
    "content": "\"\\f1ba\""
  },
  ".fa-tree:before": {
    "content": "\"\\f1bb\""
  },
  ".fa-spotify:before": {
    "content": "\"\\f1bc\""
  },
  ".fa-deviantart:before": {
    "content": "\"\\f1bd\""
  },
  ".fa-soundcloud:before": {
    "content": "\"\\f1be\""
  },
  ".fa-database:before": {
    "content": "\"\\f1c0\""
  },
  ".fa-file-pdf-o:before": {
    "content": "\"\\f1c1\""
  },
  ".fa-file-word-o:before": {
    "content": "\"\\f1c2\""
  },
  ".fa-file-excel-o:before": {
    "content": "\"\\f1c3\""
  },
  ".fa-file-powerpoint-o:before": {
    "content": "\"\\f1c4\""
  },
  ".fa-file-photo-o:before, .fa-file-picture-o:before, .fa-file-image-o:before": {
    "content": "\"\\f1c5\""
  },
  ".fa-file-zip-o:before, .fa-file-archive-o:before": {
    "content": "\"\\f1c6\""
  },
  ".fa-file-sound-o:before, .fa-file-audio-o:before": {
    "content": "\"\\f1c7\""
  },
  ".fa-file-movie-o:before, .fa-file-video-o:before": {
    "content": "\"\\f1c8\""
  },
  ".fa-file-code-o:before": {
    "content": "\"\\f1c9\""
  },
  ".fa-vine:before": {
    "content": "\"\\f1ca\""
  },
  ".fa-codepen:before": {
    "content": "\"\\f1cb\""
  },
  ".fa-jsfiddle:before": {
    "content": "\"\\f1cc\""
  },
  ".fa-life-bouy:before, .fa-life-buoy:before, .fa-life-saver:before, .fa-support:before, .fa-life-ring:before": {
    "content": "\"\\f1cd\""
  },
  ".fa-circle-o-notch:before": {
    "content": "\"\\f1ce\""
  },
  ".fa-ra:before, .fa-rebel:before": {
    "content": "\"\\f1d0\""
  },
  ".fa-ge:before, .fa-empire:before": {
    "content": "\"\\f1d1\""
  },
  ".fa-git-square:before": {
    "content": "\"\\f1d2\""
  },
  ".fa-git:before": {
    "content": "\"\\f1d3\""
  },
  ".fa-hacker-news:before": {
    "content": "\"\\f1d4\""
  },
  ".fa-tencent-weibo:before": {
    "content": "\"\\f1d5\""
  },
  ".fa-qq:before": {
    "content": "\"\\f1d6\""
  },
  ".fa-wechat:before, .fa-weixin:before": {
    "content": "\"\\f1d7\""
  },
  ".fa-send:before, .fa-paper-plane:before": {
    "content": "\"\\f1d8\""
  },
  ".fa-send-o:before, .fa-paper-plane-o:before": {
    "content": "\"\\f1d9\""
  },
  ".fa-history:before": {
    "content": "\"\\f1da\""
  },
  ".fa-genderless:before, .fa-circle-thin:before": {
    "content": "\"\\f1db\""
  },
  ".fa-header:before": {
    "content": "\"\\f1dc\""
  },
  ".fa-paragraph:before": {
    "content": "\"\\f1dd\""
  },
  ".fa-sliders:before": {
    "content": "\"\\f1de\""
  },
  ".fa-share-alt:before": {
    "content": "\"\\f1e0\""
  },
  ".fa-share-alt-square:before": {
    "content": "\"\\f1e1\""
  },
  ".fa-bomb:before": {
    "content": "\"\\f1e2\""
  },
  ".fa-soccer-ball-o:before, .fa-futbol-o:before": {
    "content": "\"\\f1e3\""
  },
  ".fa-tty:before": {
    "content": "\"\\f1e4\""
  },
  ".fa-binoculars:before": {
    "content": "\"\\f1e5\""
  },
  ".fa-plug:before": {
    "content": "\"\\f1e6\""
  },
  ".fa-slideshare:before": {
    "content": "\"\\f1e7\""
  },
  ".fa-twitch:before": {
    "content": "\"\\f1e8\""
  },
  ".fa-yelp:before": {
    "content": "\"\\f1e9\""
  },
  ".fa-newspaper-o:before": {
    "content": "\"\\f1ea\""
  },
  ".fa-wifi:before": {
    "content": "\"\\f1eb\""
  },
  ".fa-calculator:before": {
    "content": "\"\\f1ec\""
  },
  ".fa-paypal:before": {
    "content": "\"\\f1ed\""
  },
  ".fa-google-wallet:before": {
    "content": "\"\\f1ee\""
  },
  ".fa-cc-visa:before": {
    "content": "\"\\f1f0\""
  },
  ".fa-cc-mastercard:before": {
    "content": "\"\\f1f1\""
  },
  ".fa-cc-discover:before": {
    "content": "\"\\f1f2\""
  },
  ".fa-cc-amex:before": {
    "content": "\"\\f1f3\""
  },
  ".fa-cc-paypal:before": {
    "content": "\"\\f1f4\""
  },
  ".fa-cc-stripe:before": {
    "content": "\"\\f1f5\""
  },
  ".fa-bell-slash:before": {
    "content": "\"\\f1f6\""
  },
  ".fa-bell-slash-o:before": {
    "content": "\"\\f1f7\""
  },
  ".fa-trash:before": {
    "content": "\"\\f1f8\""
  },
  ".fa-copyright:before": {
    "content": "\"\\f1f9\""
  },
  ".fa-at:before": {
    "content": "\"\\f1fa\""
  },
  ".fa-eyedropper:before": {
    "content": "\"\\f1fb\""
  },
  ".fa-paint-brush:before": {
    "content": "\"\\f1fc\""
  },
  ".fa-birthday-cake:before": {
    "content": "\"\\f1fd\""
  },
  ".fa-area-chart:before": {
    "content": "\"\\f1fe\""
  },
  ".fa-pie-chart:before": {
    "content": "\"\\f200\""
  },
  ".fa-line-chart:before": {
    "content": "\"\\f201\""
  },
  ".fa-lastfm:before": {
    "content": "\"\\f202\""
  },
  ".fa-lastfm-square:before": {
    "content": "\"\\f203\""
  },
  ".fa-toggle-off:before": {
    "content": "\"\\f204\""
  },
  ".fa-toggle-on:before": {
    "content": "\"\\f205\""
  },
  ".fa-bicycle:before": {
    "content": "\"\\f206\""
  },
  ".fa-bus:before": {
    "content": "\"\\f207\""
  },
  ".fa-ioxhost:before": {
    "content": "\"\\f208\""
  },
  ".fa-angellist:before": {
    "content": "\"\\f209\""
  },
  ".fa-cc:before": {
    "content": "\"\\f20a\""
  },
  ".fa-shekel:before, .fa-sheqel:before, .fa-ils:before": {
    "content": "\"\\f20b\""
  },
  ".fa-meanpath:before": {
    "content": "\"\\f20c\""
  },
  ".fa-buysellads:before": {
    "content": "\"\\f20d\""
  },
  ".fa-connectdevelop:before": {
    "content": "\"\\f20e\""
  },
  ".fa-dashcube:before": {
    "content": "\"\\f210\""
  },
  ".fa-forumbee:before": {
    "content": "\"\\f211\""
  },
  ".fa-leanpub:before": {
    "content": "\"\\f212\""
  },
  ".fa-sellsy:before": {
    "content": "\"\\f213\""
  },
  ".fa-shirtsinbulk:before": {
    "content": "\"\\f214\""
  },
  ".fa-simplybuilt:before": {
    "content": "\"\\f215\""
  },
  ".fa-skyatlas:before": {
    "content": "\"\\f216\""
  },
  ".fa-cart-plus:before": {
    "content": "\"\\f217\""
  },
  ".fa-cart-arrow-down:before": {
    "content": "\"\\f218\""
  },
  ".fa-diamond:before": {
    "content": "\"\\f219\""
  },
  ".fa-ship:before": {
    "content": "\"\\f21a\""
  },
  ".fa-user-secret:before": {
    "content": "\"\\f21b\""
  },
  ".fa-motorcycle:before": {
    "content": "\"\\f21c\""
  },
  ".fa-street-view:before": {
    "content": "\"\\f21d\""
  },
  ".fa-heartbeat:before": {
    "content": "\"\\f21e\""
  },
  ".fa-venus:before": {
    "content": "\"\\f221\""
  },
  ".fa-mars:before": {
    "content": "\"\\f222\""
  },
  ".fa-mercury:before": {
    "content": "\"\\f223\""
  },
  ".fa-transgender:before": {
    "content": "\"\\f224\""
  },
  ".fa-transgender-alt:before": {
    "content": "\"\\f225\""
  },
  ".fa-venus-double:before": {
    "content": "\"\\f226\""
  },
  ".fa-mars-double:before": {
    "content": "\"\\f227\""
  },
  ".fa-venus-mars:before": {
    "content": "\"\\f228\""
  },
  ".fa-mars-stroke:before": {
    "content": "\"\\f229\""
  },
  ".fa-mars-stroke-v:before": {
    "content": "\"\\f22a\""
  },
  ".fa-mars-stroke-h:before": {
    "content": "\"\\f22b\""
  },
  ".fa-neuter:before": {
    "content": "\"\\f22c\""
  },
  ".fa-facebook-official:before": {
    "content": "\"\\f230\""
  },
  ".fa-pinterest-p:before": {
    "content": "\"\\f231\""
  },
  ".fa-whatsapp:before": {
    "content": "\"\\f232\""
  },
  ".fa-server:before": {
    "content": "\"\\f233\""
  },
  ".fa-user-plus:before": {
    "content": "\"\\f234\""
  },
  ".fa-user-times:before": {
    "content": "\"\\f235\""
  },
  ".fa-hotel:before, .fa-bed:before": {
    "content": "\"\\f236\""
  },
  ".fa-viacoin:before": {
    "content": "\"\\f237\""
  },
  ".fa-train:before": {
    "content": "\"\\f238\""
  },
  ".fa-subway:before": {
    "content": "\"\\f239\""
  },
  ".fa-medium:before": {
    "content": "\"\\f23a\""
  }
};

},{}],12:[function(require,module,exports){

module.exports = {

  /*************** Fonts *****************/
  'exo_regular': require('./exo_regular'),
  'exo_italic': require('./exo_italic'),
  'exo_extralight': require('./exo_extralight'),
  'exo_extralight_italic': require('./exo_extralight_italic'),
  'exo_semibold': require('./exo_semibold'),
  'exo_semibold_italic': require('./exo_semibold_italic'),
  'exo_extrabold': require('./exo_extrabold'),
  'exo_extrabold_italic': require('./exo_extrabold_italic'),

  'font_awesome': require('./font_awesome')

};

},{"./exo_extrabold":3,"./exo_extrabold_italic":4,"./exo_extralight":5,"./exo_extralight_italic":6,"./exo_italic":7,"./exo_regular":8,"./exo_semibold":9,"./exo_semibold_italic":10,"./font_awesome":11}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./../settings":16}],15:[function(require,module,exports){

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

},{}],16:[function(require,module,exports){

module.exports = {

  production: false

};

},{}],17:[function(require,module,exports){
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

},{"./modules/log":14,"async-lite":34}],18:[function(require,module,exports){

module.exports = {

  /* Remove the scrollbar */
  "::-webkit-scrollbar": {
    "display": "none"
  },

  /* Set the base font size to 10px and use the Exo font */
  "html": {
    "font-size": "10px",
    "font-family": "Exo",
    "font-style": "normal",
    "font-weight": "normal",
    color: Colors.black
  },

  /* Set the background color of the app to our chosen lightGray color */
  "#samson_app": {
    "background-color": Colors.lightGray
  }
};

},{}],19:[function(require,module,exports){

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

},{"./modules/db":13}],20:[function(require,module,exports){

var Samson = require('./../../../../../lib');

module.exports = {

  el: 'samson_faded_overlay',
  style: {

    "#samson_faded_overlay": {
      "background-color": "#000",
      position: "absolute",
      top: "60px",
      left: 0,
      right: 0,
      bottom: 0,
      "z-index": 10,
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.2s linear, visibility 0s linear 0.2s"
    },

    "#samson_faded_overlay.show": {
      opacity: "0.6",
      visibility: "visible",
      "transition-delay": "0s"
    }
  },

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

},{"./../../../../../lib":40}],21:[function(require,module,exports){

var Samson = require('./../../../../../lib');

var header_height = "60px";

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
      "height": "40px",
      "line-height": "40px",
      "width": "60%",
      "Transform": "translate(-50%,-50%)",
      "color": "#ffffff",
      "font-size": "3rem",
      "text-align": "center",
      "vertical-align": "middle"
    },

    "#samson_header_menu_button, #samson_header_back_button": {
      "position": "absolute",
      "left": "10px",
      "top": "10px",
      "height": "40px",
      "line-height": "40px",
      "width": "40px",
      "color": "#ffffff",
      "font-size": "4rem",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

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

},{"./../../../../../lib":40,"./template.jade":22}],22:[function(require,module,exports){
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
},{"jade/runtime":37}],23:[function(require,module,exports){

module.exports = {

  header : require('./header'),

  sideMenu : require('./sideMenu'),

  fadedOverlay : require('./fadedOverlay'),

  transparentOverlay : require('./transparentOverlay')

};

},{"./fadedOverlay":20,"./header":21,"./sideMenu":24,"./transparentOverlay":26}],24:[function(require,module,exports){

var Samson = require('./../../../../../lib');

module.exports = {

  el: 'samson_sidemenu',
  template: require("./template.jade"),
  style: {

    "#samson_sidemenu": {
      "position": "absolute",
      "z-index": 11,
      "left": "-200px",
      "top": "60px",
      "bottom": "0",
      "width" : "200px",
      "background-color": "#666",
      "transition": "all 0.2s ease-in-out",
      "Transform": "translate3d(0,0,0)"
    },

    "#samson_sidemenu.open": {
      "Transform": "translate3d(200px,0,0)"
    },

    ".samson_sidemenu_item": {
      width: "100%",
      padding: "10px 10px 10px 10px",
      color: "#fff",
      "text-align": "left",
      "font-size": "2.2rem",
      "border-bottom": "2px solid #bbb"
    },

    ".samson_sidemenu_item.selected": {
      "background-color": "#1abc9c"
    },

    ".samson_sidemenu_item:active": {
      "background-color": "#fff",
      color: "#000"
    },

    '.samson_sidemenu_item i': {
      "margin-right": "15px"
    }

  },

  domEvents: {

    // handle any .samson_sidemenu_item being touched
    'touch .samson_sidemenu_item': function(event) {

      // make sure the router isn't already busy before accepting any events from the sidemenu
      if (!Samson.App.Router.isBusy) {

        var path = event.target.getAttribute("data-page");

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
    },

    openSideMenu: function() {
      this.element.classList.add("open");
      this.isOpen = true;
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

},{"./../../../../../lib":40,"./template.jade":25}],25:[function(require,module,exports){
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
},{"jade/runtime":37}],26:[function(require,module,exports){

var Samson = require('./../../../../../lib');

module.exports = {

  el: 'samson_transparent_overlay',
  style: {

    "#samson_transparent_overlay": {
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

    "#samson_transparent_overlay.show": {
      visibility: "visible"
    }
  },

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

},{"./../../../../../lib":40}],27:[function(require,module,exports){

var db = require('./../../common/modules/db');
var autosize = require('autosize');

module.exports = {

  path: 'addTodos',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),
  style: {

    "#addTodos-page": {
      position: "absolute",
      width: "100%",
      height: "100%"
    },

    ".add-new-todo-box": {
      "margin": "40px 0 20px 0",
      "padding": "0 20px 0 20px",
      "width": "100%"
    },

    "#new-todo-textarea": {
      width: "100%",
      "font-size": "1.3rem",
      "line-height": 1.2,
      padding: "3px",
      "margin-bottom": "20px",
      "background-color": Colors.white,
      "border-radius": "5px",
      "border": "3px solid " + Colors.gray
    },

    "#new-todo-submit-button": {
      "width": "100%",
      "height": "30px",
      "background-color": Colors.turquoise,
      "border-radius": "5px",
      color: Colors.white,
      "font-size": "2rem",
      "line-height": "30px",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    'input #new-todo-textarea': function(e) {

      autosize.update(App.DOM.new_todo_textarea);

      // store the current value of the new ToDo Item
      App.Models.TodoItem = App.DOM.new_todo_textarea.value;
      db.save("TodoItem", App.DOM.new_todo_textarea.value);

    },

    'touch #new-todo-submit-button': function() {

      App.$("#new-todo-form").trigger("submit");

    },

    'submit #new-todo-form': function(e) {

      var todo = App.DOM.new_todo_textarea.value;

      App.DOM.new_todo_textarea.value = "";
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

},{"./../../common/modules/db":13,"./template.jade":28,"autosize":35}],28:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (todo_item) {
buf.push("<div class=\"add-new-todo-box\"><form id=\"new-todo-form\"><textarea id=\"new-todo-textarea\" rows=\"1\" placeholder=\"Add a new ToDo Item here...\" required=\"required\" autofocus=\"autofocus\">" + (jade.escape((jade_interp = todo_item) == null ? '' : jade_interp)) + "</textarea><div id=\"new-todo-submit-button\">Add ToDo Item</div></form></div>");}.call(this,"todo_item" in locals_for_with?locals_for_with.todo_item:typeof todo_item!=="undefined"?todo_item:undefined));;return buf.join("");
};
},{"jade/runtime":37}],29:[function(require,module,exports){

module.exports = {

  path: 'home',
  subPageOf: false,
  previousPage: false,
  template: require("./template.jade"),
  style: {

    "#home-page": {
      position: "absolute",
      width: "100%",
      height: "100%"
    },

    ".app-info": {
      "width": "80%",
      margin: "20px auto 20px auto",
      "font-size": "1.6rem",
      "line-height": 1.4
    }

  },

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

},{"./template.jade":30}],30:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"app-info\">This simple app will allow you to manage a ToDo List. Hit the menu button to navigate to the \"Add ToDos\" or \"View ToDos\" pages. Any ToDo items you add will be stored on your device, so that you can access them even when you are offline.</div>");;return buf.join("");
};
},{"jade/runtime":37}],31:[function(require,module,exports){

module.exports = {

  home: require('./home'),

  addTodos: require('./addTodos'),

  viewTodos: require('./viewTodos')

};

},{"./addTodos":27,"./home":29,"./viewTodos":32}],32:[function(require,module,exports){

var autosize = require('autosize');

module.exports = {

path: 'viewTodos',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),
  style: {

    "#viewTodos-page": {
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: "20px 20px 0 20px",
    },

    ".todo-item": {
      display: "inline-block",
      position: "relative",
      "margin-bottom": "15px",
      "width": "92%"
    },

    ".todo-item-text": {
      width: "100%",
      "background-color": Colors.white,
      "border-radius": "4px",
      padding: "3px",
      "font-size": "1.3rem",
      "line-height": 1.2,
      "border": "3px solid " + Colors.blue
    },

    ".todo-item-remove-button": {
      position: "absolute",
      top: "6px", right: "-26px",
      width: "20px",
      height: "20px",
      "line-height": "20px",
      "font-size": "1.5rem",
      "text-align": "center",
      "vertical-align": "middle",
      "background-color": Colors.red,
      "border-radius": "5px",
      color: Colors.white
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    'touch .todo-item-remove-button' : function(e, target) {

      var todo_id = target.parentNode.getAttribute("data-id");

      // remove the autosize listener on this items textarea
      autosize.destroy(target.parentNode.querySelector("textarea"));

      App.Collections.Todos.remove(todo_id);
      this.resetState();

    },

    'input .todo-item-text': function(e) {

      autosize.update(e.target);

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

    App.Data.Header.title = "View ToDos";

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    autosize(document.querySelectorAll("textarea"));

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    autosize.destroy(document.querySelectorAll("textarea"));

    callback();

  }

};

},{"./template.jade":33,"autosize":35}],33:[function(require,module,exports){
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
},{"jade/runtime":37}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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
},{}],36:[function(require,module,exports){

},{}],37:[function(require,module,exports){
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

},{"fs":36}],38:[function(require,module,exports){
// Samson.Component constructor function
// Used to simplify component rendering and transitions in single page apps

var Samson = require('./index');
var Shared = require('./shared');
var Utils = require('./utils');
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

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};

module.exports = SamsonComponent;

},{"./index":40,"./shared":45,"./utils":48,"jss":57}],39:[function(require,module,exports){

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

},{}],40:[function(require,module,exports){
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

// JSS and plugins
var jss = require('jss');
var jssVendorPrefixer = require('jss-vendor-prefixer');
var jssExtend = require('jss-extend');
jss.use(jssVendorPrefixer);
jss.use(jssExtend);

var css_reset = require('./styles/reset');
var base_styles = require('./styles/base_styles');

// reserved properties for the Samson.App object. all properties starting with _ are also reserved
var reserved = ["$", "DOM", "Data", "styleSheet", "baseStyle", "style", "components", "setComponents", "Router", "Pages", "on", "emit", "off"];

// create the Samson object that will be exported
module.exports = Samson = {};

Samson.VERSION = '0.1.2'; // keep in sync with package.json

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

    // load the css reset and setup the app's base styles
    base_styles = options.base_styles || base_styles;

    this.baseStyle = jss.createStyleSheet(css_reset, {named: false});
    this.baseStyle.addRules(base_styles);
    this.baseStyle.attach();

    this.styleSheet = options.style || {};
    this.style = jss.createStyleSheet(this.styleSheet, {named: false});
    this.style.attach();

    // add any fonts to the stylesheet
    this.fonts = {};
    var font;
    for (font in options.fonts) {
      this.fonts[font] = jss.createStyleSheet(options.fonts[font], {named: false}).attach();
    }

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

},{"./component":38,"./events":39,"./modules/quo.js":41,"./page":42,"./router":44,"./styles/base_styles":46,"./styles/reset":47,"./utils":48,"async-lite":49,"jss":57,"jss-extend":50,"jss-vendor-prefixer":51}],41:[function(require,module,exports){
/**
 * QuoJS - Micro #JavaScript Library for Mobile Devices.
 * @version v3.0.7
 * @link    http://quojs.tapquo.com
 * @author  Javi Jimenez Villar (@soyjavi) (https://twitter.com/soyjavi)
 * @license MIT
 */
(function(){"use strict";var t,n=[].indexOf||function(t){for(var n=0,e=this.length;e>n;n++)if(n in this&&this[n]===t)return n;return-1};t=function(){var t,n,e,r,i,u,o,a,c,l,s,f,h,d,p,v,g;return r=[],a=Object.prototype,o=/^\s*<(\w+|!)[^>]*>/,e=[1,9,11],n=/^\.([\w-]+)$/,u=/^#[\w\d-]+$/,s=/^[\w-]+$/,c=document.createElement("table"),l=document.createElement("tr"),i={tr:document.createElement("tbody"),tbody:c,thead:c,tfoot:c,td:l,th:l,"*":document.createElement("div")},t=function(n,e){var r;return n?"function"===t.toType(n)?t(document).ready(n):(r=p(n,e),v(r,n)):v()},t.query=function(t,e){var r;return n.test(e)?r=t.getElementsByClassName(e.replace(".","")):s.test(e)?r=t.getElementsByTagName(e):u.test(e)&&t===document?(r=t.getElementById(e.replace("#","")),r||(r=[])):r=t.querySelectorAll(e),r.nodeType?[r]:Array.prototype.slice.call(r)},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){var e,r;r=[];for(e in n)r.push(t[e]=n[e]);return r}),t},t.toType=function(t){var n;return n=a.toString.call(t).match(/\s([a-z|A-Z]+)/),n.length>1?n[1].toLowerCase():"object"},t.each=function(n,e){var r,i,u,o,a;if(i=void 0,o=void 0,"array"===t.toType(n))for(i=u=0,a=n.length;a>u;i=++u)r=n[i],e.call(r,i,r)===!1;else for(o in n)e.call(n[o],o,n[o])===!1;return n},t.map=function(n,e){var r,i,u,o;if(o=[],r=void 0,i=void 0,"array"===t.toType(n))for(r=0;r<n.length;)u=e(n[r],r),null!=u&&o.push(u),r++;else for(i in n)u=e(n[i],i),null!=u&&o.push(u);return h(o)},t.mix=function(){var t,n,e,r,i;for(e={},t=0,r=arguments.length;r>t;){n=arguments[t];for(i in n)g(n,i)&&void 0!==n[i]&&(e[i]=n[i]);t++}return e},v=function(t,n){return null==n&&(n=""),t=t||r,t.selector=n,t.__proto__=v.prototype,t},p=function(n,r){var i,u;return i=null,u=t.toType(n),"array"===u?i=f(n):"string"===u&&o.test(n)?(i=d(n.trim(),RegExp.$1),n=null):"string"===u?(i=t.query(document,n),r&&(i=1===i.length?t.query(i[0],r):t.map(function(){return t.query(i,r)}))):(e.indexOf(n.nodeType)>=0||n===window)&&(i=[n],n=null),i},d=function(n,e){var r;return null==e&&(e="*"),e in i||(e="*"),r=i[e],r.innerHTML=""+n,t.each(Array.prototype.slice.call(r.childNodes),function(){return r.removeChild(this)})},f=function(t){return t.filter(function(t){return null!=t?t:void 0})},h=function(t){return t.length>0?r.concat.apply(r,t):t},g=function(t,n){return a.hasOwnProperty.call(t,n)},v.prototype=t.fn={},t.fn.each=function(t){return this.forEach(function(n,e){return t.call(n,e,n)}),this},t.fn.filter=function(n){return t(r.filter.call(this,function(e){return e.parentNode&&t.query(e.parentNode,n).indexOf(e)>=0}))},t.fn.forEach=r.forEach,t.fn.indexOf=r.indexOf,t.version="3.0.7",t}(),this.Quo=this.$$=t,"undefined"!=typeof module&&null!==module&&(module.exports=t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n={TYPE:"GET",MIME:"json"},r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},e=0,t.ajaxSettings={type:n.TYPE,async:!0,success:{},error:{},context:null,dataType:n.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:!1,timeout:0},t.ajax=function(e){var r,o,c,f;if(c=t.mix(t.ajaxSettings,e),c.type===n.TYPE?c.url+=t.serialize(c.data,"?"):c.data=t.serialize(c.data),i(c.url))return u(c);f=c.xhr(),f.onreadystatechange=function(){return 4===f.readyState?(clearTimeout(r),s(f,c)):void 0},f.open(c.type,c.url,c.async),l(f,c),c.timeout>0&&(r=setTimeout(function(){return h(f,c)},c.timeout));try{f.send(c.data)}catch(d){o=d,f=o,a("Resource not found",f,c)}return f},t.get=function(n,e,r,i){return t.ajax({url:n,data:e,success:r,dataType:i})},t.post=function(t,n,e,r){return c("POST",t,n,e,r)},t.put=function(t,n,e,r){return c("PUT",t,n,e,r)},t["delete"]=function(t,n,e,r){return c("DELETE",t,n,e,r)},t.json=function(n,e,r){return t.ajax({url:n,data:e,success:r})},t.serialize=function(t,n){var e,r;null==n&&(n=""),r=n;for(e in t)t.hasOwnProperty(e)&&(r!==n&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return r===n?"":r},u=function(n){var r,i,u,o;return n.async?(i="jsonp"+ ++e,u=document.createElement("script"),o={abort:function(){return t(u).remove(),i in window?window[i]={}:void 0}},r=void 0,window[i]=function(e){return clearTimeout(r),t(u).remove(),delete window[i],f(e,o,n)},u.src=n.url.replace(RegExp("=\\?"),"="+i),t("head").append(u),n.timeout>0&&(r=setTimeout(function(){return h(o,n)},n.timeout)),o):console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")},s=function(t,n){t.status>=200&&t.status<300||0===t.status?n.async&&f(o(t,n),t,n):a("QuoJS.ajax: Unsuccesful request",t,n)},f=function(t,n,e){e.success.call(e.context,t,n)},a=function(t,n,e){e.error.call(e.context,t,n,e)},l=function(t,n){var e;n.contentType&&(n.headers["Content-Type"]=n.contentType),n.dataType&&(n.headers.Accept=r[n.dataType]);for(e in n.headers)t.setRequestHeader(e,n.headers[e])},h=function(t,n){t.onreadystatechange={},t.abort(),a("QuoJS.ajax: Timeout exceeded",t,n)},c=function(n,e,r,i,u){return t.ajax({type:n,url:e,data:r,success:i,dataType:u,contentType:"application/x-www-form-urlencoded"})},i=function(t){return RegExp("=\\?").test(t)},o=function(t,e){var r,i;if(i=t,t.responseText){if(e.dataType===n.MIME)try{i=JSON.parse(t.responseText)}catch(u){r=u,i=r,a("QuoJS.ajax: Parse Error",t,e)}"xml"===e.dataType&&(i=t.responseXML)}return i}}(t),function(t){var n,e,r;return n=["-webkit-","-moz-","-ms-","-o-",""],t.fn.addClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.add(o));return u})},t.fn.removeClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.remove(o));return u})},t.fn.toggleClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.toggle(o));return u})},t.fn.hasClass=function(t){return this.length>0&&this[0].classList.contains(t)},t.fn.listClass=function(){return this.length>0?this[0].classList:void 0},t.fn.style=t.fn.css=function(t,n){var e;return null!=n?this.each(function(){return this.style[t]=n}):(e=this[0],e.style[t]||r(e,t))},t.fn.vendor=function(t,e){var r,i,u,o;for(o=[],r=0,i=n.length;i>r;r++)u=n[r],o.push(this.style(""+u+t,e));return o},r=function(t,n){return document.defaultView.getComputedStyle(t,"")[n]},e=function(t){return Array.isArray(t)||(t=[t]),t}}(t),function(t){return t.fn.attr=function(n,e){return this.length>0&&"string"===t.toType(n)?null!=e?this.each(function(){return this.setAttribute(n,e)}):this[0].getAttribute(n):void 0},t.fn.removeAttr=function(n){return this.length>0&&"string"===t.toType(n)?this.each(function(){return this.removeAttribute(n)}):void 0},t.fn.data=function(t,n){return this.attr("data-"+t,n)},t.fn.removeData=function(t){return this.removeAttr("data-"+t)},t.fn.val=function(t){return null!=t?this.each(function(){return this.value=t.toString()}):this.length>0?this[0].value:null},t.fn.show=function(){return this.style("display","block")},t.fn.hide=function(){return this.style("display","none")},t.fn.focus=function(){return this[0].focus()},t.fn.blur=function(){return this[0].blur()},t.fn.offset=function(){var t,n;return this.length>0&&(t=this[0].getBoundingClientRect(),n={left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:t.width,height:t.height}),n}}(t),function(t){var n,e,r,i,u,o;return r=null,n=/WebKit\/([\d.]+)/,e={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/},t.isMobile=function(){return this.environment(),r.isMobile},t.environment=function(){var t,n;return r||(n=navigator.userAgent,t=u(n),r={browser:i(n),isMobile:!!t,screen:o(),os:t}),r},i=function(t){var e;return e=t.match(n),e?e[0]:t},u=function(t){var n,r,i;for(r in e)if(i=t.match(e[r])){n={name:"iphone"===r||"ipad"===r||"ipod"===r?"ios":r,version:i[2].replace("_",".")};break}return n},o=function(){return{width:window.innerWidth,height:window.innerHeight}}}(t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=1,i={},r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},e={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",orientationchange:"resize"},u=/complete|loaded|interactive/,t.fn.on=function(n,e,r){return null==e||"function"===t.toType(e)?this.bind(n,e):this.delegate(e,n,r)},t.fn.off=function(n,e,r){return null==e||"function"===t.toType(e)?this.unbind(n,e):this.undelegate(e,n,r)},t.fn.ready=function(n){return u.test(document.readyState)?n.call(this,t):t.fn.addEvent(document,"DOMContentLoaded",function(){return n.call(this,t)})},t.fn.bind=function(t,n){return this.forEach(function(e){return h(e,t,n)})},t.fn.unbind=function(t,n){return this.each(function(){return d(this,t,n)})},t.fn.delegate=function(n,e,r){return this.each(function(i,u){return h(u,e,r,n,function(e){return function(r){var i,a;return a=t(r.target).closest(n,u).get(0),a?(i=t.extend(o(r),{currentTarget:a,liveFired:u}),e.apply(a,[i].concat([].slice.call(arguments,1)))):void 0}})})},t.fn.undelegate=function(t,n,e){return this.each(function(){return d(this,n,e,t)})},t.fn.trigger=function(n,e,r){return"string"===t.toType(n)&&(n=l(n,e)),null!=r&&(n.originalEvent=r),this.each(function(){return this.dispatchEvent(n)})},t.fn.addEvent=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e},t.fn.removeEvent=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent?t.detachEvent("on"+n,e):t["on"+n]=null},l=function(t,n){var e;return e=document.createEvent("Events"),e.initEvent(t,!0,!0,null,null,null,null,null,null,null,null,null,null,null,null),n&&(e.touch=n),e},h=function(n,e,r,u,o){var l,s,h,d;return e=c(e),h=f(n),s=i[h]||(i[h]=[]),l=o&&o(r,e),d={event:e,callback:r,selector:u,proxy:a(l,r,n),delegate:l,index:s.length},s.push(d),t.fn.addEvent(n,d.event,d.proxy)},d=function(n,e,r,u){var o;return e=c(e),o=f(n),s(o,e,r,u).forEach(function(e){return delete i[o][e.index],t.fn.removeEvent(n,e.event,e.proxy)})},f=function(t){return t._id||(t._id=n++)},c=function(n){var r;return r=("function"==typeof t.isMobile?t.isMobile():void 0)?n:e[n],r||n},a=function(t,n,e){var r;return n=t||n,r=function(t){var r;return r=n.apply(e,[t].concat(t.data)),r===!1&&t.preventDefault(),r}},s=function(t,n,e,r){return(i[t]||[]).filter(function(t){return!(!t||n&&t.event!==n||e&&t.callback!==e||r&&t.selector!==r)})},o=function(n){var e;return e=t.extend({originalEvent:n},n),t.each(r,function(t,r){return e[t]=function(){return this[r]=function(){return!0},n[t].apply(n,arguments)},e[r]=function(){return!1}}),e}}(t),function(t){return t.fn.text=function(t){return null!=t?this.each(function(){return this.textContent=t}):this.length>0?this[0].textContent:""},t.fn.html=function(n){var e;return null!=n?(e=t.toType(n),this.each(function(){return"string"===e?this.innerHTML=n:"array"===e?n.forEach(function(n){return function(e){return t(n).html(e)}}(this)):this.innerHTML+=t(n).html()})):this.length>0?this[0].innerHTML:""},t.fn.remove=function(){return this.each(function(){return null!=this.parentNode?this.parentNode.removeChild(this):void 0})},t.fn.empty=function(){return this.each(function(){return this.innerHTML=null})},t.fn.append=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("beforeend",n):"array"===e?n.forEach(function(n){return function(e){return t(n).append(e)}}(this)):this.appendChild(n)})},t.fn.prepend=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("afterbegin",n):"array"===e?n.each(function(t){return function(n,e){return t.insertBefore(e,t.firstChild)}}(this)):this.insertBefore(n,this.firstChild)})},t.fn.replaceWith=function(n){var e;return e=t.toType(n),this.each(function(){return this.parentNode?"string"===e?this.insertAdjacentHTML("beforeBegin",n):"array"===e?n.each(function(t){return function(n,e){return t.parentNode.insertBefore(e,t)}}(this)):this.parentNode.insertBefore(n,this):void 0}),this.remove()}}(t),function(n){var e,r,i,u;return e="parentNode",n.fn.find=function(e){var r;return r=1===this.length?t.query(this[0],e):this.map(function(){return t.query(this,e)}),n(r)},n.fn.parent=function(t){var n;return n=t?i(this):this.instance(e),r(n,t)},n.fn.children=function(t){var n;return n=this.map(function(){return Array.prototype.slice.call(this.children)}),r(n,t)},n.fn.siblings=function(t){var n;return n=this.map(function(t,n){return Array.prototype.slice.call(n.parentNode.children).filter(function(t){return t!==n})}),r(n,t)},n.fn.get=function(t){return this[t]||null},n.fn.first=function(){return n(this[0])},n.fn.last=function(){return n(this[this.length-1])},n.fn.closest=function(t,e){var r,i;for(i=this[0],r=n(t),r.length||(i=null);i&&r.indexOf(i)<0;)i=i!==e&&i!==document&&i.parentNode;return n(i)},n.fn.next=function(){return u.call(this,"nextSibling")},n.fn.prev=function(){return u.call(this,"previousSibling")},n.fn.instance=function(t){return this.map(function(){return this[t]})},n.fn.map=function(t){return n.map(this,function(n,e){return t.call(n,e,n)})},i=function(t){var e;for(e=[];t.length>0;)t=n.map(t,function(t){return t=t.parentNode,t!==document&&e.indexOf(t)<0?(e.push(t),t):void 0});return e},r=function(t,e){return null!=e?n(t).filter(e):n(t)},u=function(t){var e;for(e=this[0][t];e&&1!==e.nodeType;)e=e[t];return n(e)}}(t),t.Gestures=function(t){var e,r,i,u,o,a,c,l,s,f,h,d,p,v;return d=!1,l={},o=null,f=null,i=["input","select","textarea"],p=function(t){return l[t.name]=t.handler,e(t.events)},v=function(n,e,r){return t(n).trigger(e,r,f)},h=function(t){var e;return e=(t.srcElement||t.target).tagName.toLowerCase(),n.call(i,e)>=0?t.stopPropagation():(d=!0,f=t||event,o=a(t),c("start",t.target,o))},s=function(t){return d?(f=t||event,o=a(t),o.length>1&&f.preventDefault(),c("move",t.target,o)):void 0},u=function(t){return d?(f=t||event,c("end",t.target,o),d=!1):void 0},r=function(t){return d=!1,c("cancel")},e=function(n){return n.forEach(function(n){return t.fn[n]=function(e){return t(document.body).delegate(this.selector,n,e)}}),this},c=function(t,n,e){var r,i,u;u=[];for(i in l)r=l[i],r[t]&&u.push(r[t].call(r,n,e));return u},a=function(t){var n,e,r,i,u;for(r=t.touches||[t],i=[],n=0,e=r.length;e>n;n++)u=r[n],i.push({x:u.pageX,y:u.pageY});return i},t(document).ready(function(){var n;return n=t(document.body),n.bind("touchstart",h),n.bind("touchmove",s),n.bind("touchend",u),n.bind("touchcancel",r)}),{add:p,trigger:v}}(t),t.Gestures.add({name:"basic",events:["touch","hold","doubleTap"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return e=15,n={TAP:200,DOUBLE_TAP:400,HOLD:400},i=null,c=!0,a=null,o=null,u=null,h=function(e,r){return 1===r.length?(o={time:new Date,x:r[0].x,y:r[0].y},a=e,i=setTimeout(function(){return t.trigger(e,"hold",r[0])},n.HOLD)):l()},f=function(t,n){var i;return null!==o&&(i=r(o,n[0]),i.x>e||i.y>e||n.length>1)?l():void 0},s=function(e,a){var c,s;if(o)return c=r(o,a[0]),0!==c.x||0!==c.y?l():(clearTimeout(i),s=new Date,s-o.time<n.TAP?s-u<n.DOUBLE_TAP?(t.trigger(e,"doubleTap",a[0]),u=null):(u=s,t.trigger(e,"touch",a[0])):void 0)},l=function(){return o=null,c=!1,clearTimeout(i)},r=function(t,n){var e;return e={x:n.x-t.x,y:n.y-t.y}},{start:h,move:f,end:s,cancel:l}}(t.Gestures)}),t.Gestures.add({name:"drag",events:["drag","dragging"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n=window.devicePixelRatio>=2?15:20,c=null,o=null,a=null,u=null,h=function(t,n){return n.length>=2?(c=t,o=n.length,a=e(n)):void 0},f=function(t,n){var e;return n.length===o?(e=r(n),u={touches:n,delta:e},i(!0)):void 0},l=s=function(t,n){return a&&u?(i(!1),o=null,a=null,u=null):void 0},r=function(t){var n;return n=e(t),{x:n.x-a.x,y:n.y-a.y}},e=function(t){var n,e,r,i,u;for(i=0,u=0,n=0,e=t.length;e>n;n++)r=t[n],i+=parseInt(r.x),u+=parseInt(r.y);return{x:i/t.length,y:u/t.length}},i=function(e){return e?t.trigger(c,"dragging",u):Math.abs(u.delta.x)>n||Math.abs(u.delta.y)>n?t.trigger(c,"drag",u):void 0},{start:h,move:f,end:s}}(t.Gestures)}),t.Gestures.add({name:"pinch",events:["pinch","pinching","pinchIn","pinchOut"],handler:function(t){var n,e,r,i,u,o,a,c,l,s;return n=window.devicePixelRatio>=2?15:20,o=null,u=null,i=null,s=function(t,n){return 2===n.length?(o=t,u=r(n[0],n[1])):void 0},l=function(t,n){var o;return u&&2===n.length?(o=r(n[0],n[1]),i={touches:n,delta:o-u},e(!0)):void 0},a=c=function(t,n){return u&&i?(e(!1),u=null,i=null):void 0},r=function(t,n){return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))},e=function(e){var r;return e?t.trigger(o,"pinching",i):Math.abs(i.delta)>n?(t.trigger(o,"pinch",i),r=i.delta>0?"pinchOut":"pinchIn",t.trigger(o,r,i)):void 0},{start:s,move:l,end:c}}(t.Gestures)}),t.Gestures.add({name:"rotation",events:["rotate","rotating","rotateLeft","rotateRight"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=5,e=20,l=null,u=0,c=null,i=null,d=function(t,n){return 2===n.length?(l=t,u=0,c=o(n[0],n[1])):void 0},h=function(t,n){var l;return c&&2===n.length?(l=o(n[0],n[1])-c,i&&Math.abs(i.delta-l)>e&&(l+=360*a(i.delta)),Math.abs(l)>360&&(u++,l-=360*a(i.delta)),i={touches:n,delta:l,rotationsCount:u},r(!0)):void 0},s=f=function(t,n){return c&&i?(r(!1),l=null,u=0,c=null,i=null,c=null):void 0},a=function(t){return 0>t?-1:1},o=function(t,n){var e;return e=Math.atan2(t.y-n.y,t.x-n.x),180*(0>e?e+2*Math.PI:e)/Math.PI},r=function(e){var r;return e?t.trigger(l,"rotating",i):Math.abs(i.delta)>n?(t.trigger(l,"rotate",i),r=i.delta>0?"rotateRight":"rotateLeft",t.trigger(l,r,i)):void 0},{start:d,move:h,end:f}}(t.Gestures)}),t.Gestures.add({name:"swipe",events:["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","swiping","swipingHorizontal","swipingVertical"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f;return n=Math.round(20/window.devicePixelRatio),a=null,u=null,o=null,i=null,f=function(t,n){return 1===n.length?(a=t,u=n[0],i=null):void 0},s=function(t,n){var r,o;return 1===n.length?(r={x:n[0].x-u.x,y:n[0].y-u.y},o=null===i,i={x:n[0].x,y:n[0].y,delta:r},e(!0,o)):i=null},c=l=function(t,n){var r;return null==i&&n.length>=1&&(r={x:n[0].x-u.x,y:n[0].y-u.y},i={x:n[0].x,y:n[0].y,delta:r}),i?(e(!1),i=null):void 0},e=function(e,u){var c,l,s,f,h;if(null==u&&(u=!1),e)return u&&(o=r(i.delta.x,i.delta.y)),null!==o&&t.trigger(a,"swiping"+o,i),t.trigger(a,"swiping",i);if(l=[],Math.abs(i.delta.y)>n?l.push(i.delta.y<0?"Up":"Down"):Math.abs(i.delta.x)>n&&l.push(i.delta.x<0?"Left":"Right"),l.length){for(t.trigger(a,"swipe",i),h=[],s=0,f=l.length;f>s;s++)c=l[s],h.push(t.trigger(a,"swipe"+c,i));return h}},r=function(t,n){var e;return e=null,Math.round(Math.abs(t/n))>=2?e="Horizontal":Math.round(Math.abs(n/t))>=2&&(e="Vertical"),e},{start:f,move:s,end:l}}(t.Gestures)})}).call(this);

},{}],42:[function(require,module,exports){
// Samson.Page constructor function
// Used to simplify page rendering and transitions in single page apps

var Samson = require('./index');
var Shared = require('./shared');
var Utils = require('./utils');
var $ = require('./modules/quo.js');
var jss = require('jss');

/* options can include:
// path - the router path of the page
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

  // set the path of the page
  this.path = options.path;

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
        self.element.id = self.path + "-page";
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

},{"./index":40,"./modules/quo.js":41,"./shared":45,"./utils":48,"jss":57}],43:[function(require,module,exports){

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

},{}],44:[function(require,module,exports){
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
    var oldFocusElement = document.activeElement === document.body ? false : document.activeElement;
    if (oldFocusElement) oldFocusElement.blur();

    // render the new page off screen
    this.pageCache[next_page]._render(false, Samson.DOM[this.inactivePageElement], function() {

      // remove the focus from whatever element has it, and then restore the focus when the animation ends
      var focusElement = document.activeElement === document.body ? false : document.activeElement;
      if (focusElement) focusElement.blur();

      self._doFirst("beforeAnimate", function(err) {

        // run the animation now that the new page is fully rendered offscreen
        self.doAnimation(animation_data, function () {

          if (focusElement) {
            // refocus the element
            focusElement.focus();
            // reset the value so the cursor moves to the end of the text
            var value = focusElement.value;
            focusElement.value = "";
            focusElement.value = value;
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

},{"../index":40,"../utils":48,"./base_router_animations":43,"async-lite":49,"jss":57}],45:[function(require,module,exports){

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

  // remove the stylesheet
  if (this.style) this.style.detach();

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

},{"./index":40,"async-lite":49,"lodash.isequal":62}],46:[function(require,module,exports){
module.exports = {
  "*, *:before, *:after": {
    "-webkit-box-sizing": "border-box",
    "box-sizing": "border-box"
  },
  "html, body, #samson_app": {
    "position": "relative",
    "width": "100%",
    "height": "100%",
    "background-color": "#FFF"
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

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{"css-vendor":52}],52:[function(require,module,exports){
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

},{"./lib/prefix":54,"./lib/supported-property":55,"./lib/supported-value":56}],53:[function(require,module,exports){
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


},{}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{"./camelize":53,"./prefix":54}],56:[function(require,module,exports){
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

},{"./prefix":54}],57:[function(require,module,exports){
/**
 * StyleSheets written in javascript.
 *
 * @copyright Oleg Slobodskoi 2014
 * @website https://github.com/jsstyles/jss
 * @license MIT
 */

module.exports = require('./lib/index')

},{"./lib/index":60}],58:[function(require,module,exports){
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

},{"./plugins":61}],59:[function(require,module,exports){
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

},{"./Rule":58,"./plugins":61}],60:[function(require,module,exports){
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

},{"./Rule":58,"./StyleSheet":59,"./plugins":61}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
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

},{"lodash._baseisequal":63,"lodash._bindcallback":69}],63:[function(require,module,exports){
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

},{"lodash.isarray":64,"lodash.istypedarray":65,"lodash.keys":66}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{"lodash._getnative":67,"lodash.isarguments":68,"lodash.isarray":64}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbW1vbi9jb2xvcnMuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2V4b19leHRyYWJvbGQuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2V4b19leHRyYWJvbGRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fZXh0cmFsaWdodC5qcyIsImFwcC9jb21tb24vZm9udHMvZXhvX2V4dHJhbGlnaHRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9faXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fcmVndWxhci5qcyIsImFwcC9jb21tb24vZm9udHMvZXhvX3NlbWlib2xkLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fc2VtaWJvbGRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9mb250X2F3ZXNvbWUuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2luZGV4LmpzIiwiYXBwL2NvbW1vbi9tb2R1bGVzL2RiLmpzIiwiYXBwL2NvbW1vbi9tb2R1bGVzL2xvZy5qcyIsImFwcC9jb21tb24vcm91dGVyX2FuaW1hdGlvbnMuanMiLCJhcHAvY29tbW9uL3NldHRpbmdzLmpzIiwiYXBwL2NvbW1vbi9zdGFydEFwcC5qcyIsImFwcC9jb21tb24vc3R5bGVzLmpzIiwiYXBwL2NvbW1vbi90b2Rvc0NvbGxlY3Rpb24uanMiLCJhcHAvY29tcG9uZW50cy9mYWRlZE92ZXJsYXkvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvdGVtcGxhdGUuamFkZSIsImFwcC9jb21wb25lbnRzL2luZGV4LmpzIiwiYXBwL2NvbXBvbmVudHMvc2lkZU1lbnUvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9zaWRlTWVudS90ZW1wbGF0ZS5qYWRlIiwiYXBwL2NvbXBvbmVudHMvdHJhbnNwYXJlbnRPdmVybGF5L2luZGV4LmpzIiwiYXBwL3BhZ2VzL2FkZFRvZG9zL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2FkZFRvZG9zL3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaG9tZS9pbmRleC5qcyIsImFwcC9wYWdlcy9ob21lL3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaW5kZXguanMiLCJhcHAvcGFnZXMvdmlld1RvZG9zL2luZGV4LmpzIiwiYXBwL3BhZ2VzL3ZpZXdUb2Rvcy90ZW1wbGF0ZS5qYWRlIiwibm9kZV9tb2R1bGVzL2FzeW5jLWxpdGUvYXN5bmMtbGl0ZS5qcyIsIm5vZGVfbW9kdWxlcy9hdXRvc2l6ZS9kaXN0L2F1dG9zaXplLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCIuLi8uLi9saWIvY29tcG9uZW50LmpzIiwiLi4vLi4vbGliL2V2ZW50cy5qcyIsIi4uLy4uL2xpYi9pbmRleC5qcyIsIi4uLy4uL2xpYi9tb2R1bGVzL3F1by5qcyIsIi4uLy4uL2xpYi9wYWdlLmpzIiwiLi4vLi4vbGliL3JvdXRlci9iYXNlX3JvdXRlcl9hbmltYXRpb25zLmpzIiwiLi4vLi4vbGliL3JvdXRlci9pbmRleC5qcyIsIi4uLy4uL2xpYi9zaGFyZWQuanMiLCIuLi8uLi9saWIvc3R5bGVzL2Jhc2Vfc3R5bGVzLmpzIiwiLi4vLi4vbGliL3N0eWxlcy9yZXNldC5qcyIsIi4uLy4uL2xpYi91dGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9hc3luYy1saXRlL2FzeW5jLWxpdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLWV4dGVuZC9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9ub2RlX21vZHVsZXMvY3NzLXZlbmRvci9saWIvY2FtZWxpemUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9ub2RlX21vZHVsZXMvY3NzLXZlbmRvci9saWIvcHJlZml4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvbGliL3N1cHBvcnRlZC1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL25vZGVfbW9kdWxlcy9jc3MtdmVuZG9yL2xpYi9zdXBwb3J0ZWQtdmFsdWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy9saWIvUnVsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MvbGliL1N0eWxlU2hlZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2xpYi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MvbGliL3BsdWdpbnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXN0eXBlZGFycmF5L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5fZ2V0bmF0aXZlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2JpbmRjYWxsYmFjay9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3cURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuLy4uLy4uLy4uL2xpYicpO1xudmFyIExvZyA9IHJlcXVpcmUoJy4vY29tbW9uL21vZHVsZXMvbG9nJyk7XG52YXIgVG9kb3MgPSByZXF1aXJlKCcuL2NvbW1vbi90b2Rvc0NvbGxlY3Rpb24nKTtcblxuLy8gcGFzcyBpbiB0aGUgbmFtZSBvZiB0aGUgYXBwIG9iamVjdCBpZiB5b3Ugd2FudCBpdCBhZGRlZCB0byB0aGUgZ2xvYmFsIHNjb3BlXG52YXIgQXBwID0gU2Ftc29uLmNyZWF0ZUFwcChcIkFwcFwiKTtcblxuLy8gYWRkIHRoZSBhcHAgbmFtZSB0byB0aGUgZ2xvYmFsIHNjb3BlIGlmIG5hbWUgaXMgcGFzc2VkIGluXG5nbG9iYWwuQXBwID0gQXBwO1xud2luZG93LkFwcCA9IEFwcDtcblxuZ2xvYmFsLkNvbG9ycyA9IHJlcXVpcmUoJy4vY29tbW9uL2NvbG9ycycpO1xuXG4vLyBTYW1zb24gQXBwIG9wdGlvbnNcbnZhciBvcHRpb25zID0ge1xuXG4gIHN0eWxlIDogcmVxdWlyZSgnLi9jb21tb24vc3R5bGVzJyksXG5cbiAgZm9udHMgOiByZXF1aXJlKCcuL2NvbW1vbi9mb250cycpLFxuXG4gIC8vc2V0Q29tcG9uZW50cyA6IHJlcXVpcmUoJ2NvbW1vbi9zZXRDb21wb25lbnRzJyksIC8vIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGNvbXBvbmVudCBvYmplY3QgLSB1c2UgaWYgdGhlIGFwcCBjb21wb25lbnRzIGFyZSBkeW5hbWljIGJhc2VkIG9uIHNjcmVlbnNpemUsIGRldmljZSBPUywgZXRjXG5cbiAgY29tcG9uZW50cyA6IHJlcXVpcmUoJy4vY29tcG9uZW50cycpLFxuXG4gIHBhZ2VzOiByZXF1aXJlKCcuL3BhZ2VzJyksXG5cbiAgZGF0YToge1xuICAgIHNpZGVNZW51IDoge1xuICAgICAgc2VsZWN0ZWQ6IFwiaG9tZVwiLFxuICAgICAgcGFnZXM6IFtcbiAgICAgICAge3BhdGg6XCJob21lXCIsIG5hbWU6XCJIb21lXCIsIGljb246IFwiZmEtaG9tZVwifSxcbiAgICAgICAge3BhdGg6XCJhZGRUb2Rvc1wiLCBuYW1lOlwiQWRkIFRvZG9zXCIsIGljb246IFwiZmEtcGx1c1wifSxcbiAgICAgICAge3BhdGg6XCJ2aWV3VG9kb3NcIiwgbmFtZTpcIlZpZXcgVG9kb3NcIiwgaWNvbjogXCJmYS10YXNrc1wifVxuICAgICAgXVxuICAgIH1cbiAgfSxcblxuICAvLyBhbnkgY3VzdG9tIG1ldGhvZHMvcHJvcGVydGllcyB5b3Ugd2FudCBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgYXBwIG9iamVjdC4gdGhlIGNvbnRleHQgd2lsbCBiZSB0aGUgYXBwIG9iamVjdFxuICBjdXN0b206IHtcbiAgICBNb2RlbHMgOiB7fSxcbiAgICBDb2xsZWN0aW9ucyA6IHtcbiAgICAgIFRvZG9zOiBuZXcgVG9kb3MoKVxuICAgIH1cbiAgfSxcblxuICByb3V0ZXIgOiB7XG4gICAgYW5pbWF0aW9uczogcmVxdWlyZSgnLi9jb21tb24vcm91dGVyX2FuaW1hdGlvbnMnKSxcbiAgICBkZWZhdWx0TmF2aWdhdGVBbmltYXRpb246IFwicmlnaHRcIixcbiAgICBkZWZhdWx0QmFja0FuaW1hdGlvbjogXCJsZWZ0XCJcbiAgfVxuXG59O1xuXG5BcHAuY29uZmlndXJlKG9wdGlvbnMsIGZ1bmN0aW9uKCkge1xuXG4gIC8vIFRoZSBTYW1zb24gQXBwIGlzIG5vdyBjb25maWd1cmVkIGFuZCByZWFkeSB0byB1c2VcbiAgTG9nKFwiU2Ftc29uIGFwcCBoYXMgYmVlbiBpbml0aWFsaXplZFwiKTtcblxuICB2YXIgc3RhcnRBcHAgPSByZXF1aXJlKCcuL2NvbW1vbi9zdGFydEFwcCcpO1xuXG4gIC8vIGlmIHdlIGRldGVjdCBjb3Jkb3ZhIHRoZW4gd2FpdCBmb3IgdGhlIGRldmljZXJlYWR5IGV2ZW50XG4gIGlmICh0eXBlb2Ygd2luZG93LmNvcmRvdmEgPT09ICdvYmplY3QnKSB7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIExvZyhcIkRldmljZSBpcyBub3cgcmVhZHlcIik7XG4gICAgICBzdGFydEFwcCgpO1xuICAgIH0sIGZhbHNlKTtcblxuICB9IGVsc2Uge1xuXG4gICAgc3RhcnRBcHAoKTtcblxuICB9XG5cbn0pO1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICB0dXJxdW9pc2U6IFwiIzFhYmM5Y1wiLFxuXG4gIGJsdWU6IFwiIzM0OThkYlwiLFxuXG4gIHB1cnBsZTogXCIjOWI1OWI2XCIsXG5cbiAgbmF2eTogXCIjMzQ0OTVlXCIsXG5cbiAgeWVsbG93OiBcIiNmMWM0MGZcIixcblxuICBvcmFuZ2U6IFwiI2U2N2UyMlwiLFxuXG4gIHJlZDogXCIjYzAzOTJiXCIsXG5cbiAgbGlnaHRHcmF5OiBcIiNiZGMzYzdcIixcblxuICBncmF5OiBcIiM3ZjhjOGRcIixcblxuICBkYXJrR3JheTogXCIjNDQ0NDQ0XCIsXG5cbiAgYmxhY2s6IFwiIzExMTExMVwiLFxuXG4gIHdoaXRlOiBcIiNmZmZmZmZcIlxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLUV4dHJhQm9sZC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tRXh0cmFCb2xkSXRhbGljLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJmb250LXN0eWxlXCI6IFwiaXRhbGljXCJcbiAgfVxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIHNyYzogXCJ1cmwoJ2ZvbnQvZXhvL0V4by1FeHRyYUxpZ2h0LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogMjAwLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tRXh0cmFMaWdodEl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IDIwMCxcbiAgICBcImZvbnQtc3R5bGVcIjogXCJpdGFsaWNcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLUl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IFwibm9ybWFsXCIsXG4gICAgXCJmb250LXN0eWxlXCI6IFwiaXRhbGljXCJcbiAgfVxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIHNyYzogXCJ1cmwoJ2ZvbnQvZXhvL0V4by1SZWd1bGFyLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogXCJub3JtYWxcIixcbiAgICBcImZvbnQtc3R5bGVcIjogXCJub3JtYWxcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLVNlbWlCb2xkLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogNTAwLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tU2VtaUJvbGRJdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiA1MDAsXG4gICAgXCJmb250LXN0eWxlXCI6IFwiaXRhbGljXCJcbiAgfVxufTtcbiIsIi8qIVxuICogIEZvbnQgQXdlc29tZSA0LjMuMCBieSBAZGF2ZWdhbmR5IC0gaHR0cDovL2ZvbnRhd2Vzb21lLmlvIC0gQGZvbnRhd2Vzb21lXG4gKiAgTGljZW5zZSAtIGh0dHA6Ly9mb250YXdlc29tZS5pby9saWNlbnNlIChGb250OiBTSUwgT0ZMIDEuMSwgQ1NTOiBNSVQgTGljZW5zZSlcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRm9udEF3ZXNvbWVcIixcbiAgICBzcmM6IFwidXJsKCdmb250L2ZvbnRfYXdlc29tZS9mb250YXdlc29tZS13ZWJmb250LnR0Zj92PTQuMy4wJykgZm9ybWF0KCd0cnVldHlwZScpXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiBcIm5vcm1hbFwiLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH0sXG4gIFwiLmZhXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIixcbiAgICBcImZvbnRcIjogXCJub3JtYWwgbm9ybWFsIG5vcm1hbCAxNHB4LzEgRm9udEF3ZXNvbWVcIixcbiAgICBcImZvbnQtc2l6ZVwiOiBcImluaGVyaXRcIixcbiAgICBcInRleHQtcmVuZGVyaW5nXCI6IFwiYXV0b1wiLFxuICAgIFwiLXdlYmtpdC1mb250LXNtb290aGluZ1wiOiBcImFudGlhbGlhc2VkXCIsXG4gICAgXCItbW96LW9zeC1mb250LXNtb290aGluZ1wiOiBcImdyYXlzY2FsZVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlKDAsIDApXCJcbiAgfSxcbiAgXCIuZmEtbGdcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiMS4zMzMzMzMzM2VtXCIsXG4gICAgXCJsaW5lLWhlaWdodFwiOiBcIjAuNzVlbVwiLFxuICAgIFwidmVydGljYWwtYWxpZ25cIjogXCItMTUlXCJcbiAgfSxcbiAgXCIuZmEtMnhcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiMmVtXCJcbiAgfSxcbiAgXCIuZmEtM3hcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiM2VtXCJcbiAgfSxcbiAgXCIuZmEtNHhcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiNGVtXCJcbiAgfSxcbiAgXCIuZmEtNXhcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiNWVtXCJcbiAgfSxcbiAgXCIuZmEtZndcIjoge1xuICAgIFwid2lkdGhcIjogXCIxLjI4NTcxNDI5ZW1cIixcbiAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5mYS11bFwiOiB7XG4gICAgXCJwYWRkaW5nLWxlZnRcIjogXCIwXCIsXG4gICAgXCJtYXJnaW4tbGVmdFwiOiBcIjIuMTQyODU3MTRlbVwiLFxuICAgIFwibGlzdC1zdHlsZS10eXBlXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiLmZhLXVsID4gbGlcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiXG4gIH0sXG4gIFwiLmZhLWxpXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImxlZnRcIjogXCItMi4xNDI4NTcxNGVtXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjIuMTQyODU3MTRlbVwiLFxuICAgIFwidG9wXCI6IFwiMC4xNDI4NTcxNGVtXCIsXG4gICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZmEtbGkuZmEtbGdcIjoge1xuICAgIFwibGVmdFwiOiBcIi0xLjg1NzE0Mjg2ZW1cIlxuICB9LFxuICBcIi5mYS1ib3JkZXJcIjoge1xuICAgIFwicGFkZGluZ1wiOiBcIi4yZW0gLjI1ZW0gLjE1ZW1cIixcbiAgICBcImJvcmRlclwiOiBcInNvbGlkIDAuMDhlbSAjZWVlZWVlXCIsXG4gICAgXCJib3JkZXItcmFkaXVzXCI6IFwiLjFlbVwiXG4gIH0sXG4gIFwiLnB1bGwtcmlnaHRcIjoge1xuICAgIFwiZmxvYXRcIjogXCJyaWdodFwiXG4gIH0sXG4gIFwiLnB1bGwtbGVmdFwiOiB7XG4gICAgXCJmbG9hdFwiOiBcImxlZnRcIlxuICB9LFxuICBcIi5mYS5wdWxsLWxlZnRcIjoge1xuICAgIFwibWFyZ2luLXJpZ2h0XCI6IFwiLjNlbVwiXG4gIH0sXG4gIFwiLmZhLnB1bGwtcmlnaHRcIjoge1xuICAgIFwibWFyZ2luLWxlZnRcIjogXCIuM2VtXCJcbiAgfSxcbiAgXCIuZmEtc3BpblwiOiB7XG4gICAgXCItd2Via2l0LWFuaW1hdGlvblwiOiBcImZhLXNwaW4gMnMgaW5maW5pdGUgbGluZWFyXCIsXG4gICAgXCJhbmltYXRpb25cIjogXCJmYS1zcGluIDJzIGluZmluaXRlIGxpbmVhclwiXG4gIH0sXG4gIFwiLmZhLXB1bHNlXCI6IHtcbiAgICBcIi13ZWJraXQtYW5pbWF0aW9uXCI6IFwiZmEtc3BpbiAxcyBpbmZpbml0ZSBzdGVwcyg4KVwiLFxuICAgIFwiYW5pbWF0aW9uXCI6IFwiZmEtc3BpbiAxcyBpbmZpbml0ZSBzdGVwcyg4KVwiXG4gIH0sXG4gIFwiQGtleWZyYW1lcyBmYS1zcGluXCI6IHtcbiAgICBcIjAlXCI6IHtcbiAgICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogXCJyb3RhdGUoMGRlZylcIixcbiAgICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDBkZWcpXCJcbiAgICB9LFxuICAgIFwiMTAwJVwiOiB7XG4gICAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwicm90YXRlKDM1OWRlZylcIixcbiAgICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDM1OWRlZylcIlxuICAgIH1cbiAgfSxcbiAgXCIuZmEtcm90YXRlLTkwXCI6IHtcbiAgICBcImZpbHRlclwiOiBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKHJvdGF0aW9uPTEpXCIsXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiBcInJvdGF0ZSg5MGRlZylcIixcbiAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJyb3RhdGUoOTBkZWcpXCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJyb3RhdGUoOTBkZWcpXCJcbiAgfSxcbiAgXCIuZmEtcm90YXRlLTE4MFwiOiB7XG4gICAgXCJmaWx0ZXJcIjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0yKVwiLFxuICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogXCJyb3RhdGUoMTgwZGVnKVwiLFxuICAgIFwiLW1zLXRyYW5zZm9ybVwiOiBcInJvdGF0ZSgxODBkZWcpXCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJyb3RhdGUoMTgwZGVnKVwiXG4gIH0sXG4gIFwiLmZhLXJvdGF0ZS0yNzBcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MylcIixcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwicm90YXRlKDI3MGRlZylcIixcbiAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJyb3RhdGUoMjcwZGVnKVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDI3MGRlZylcIlxuICB9LFxuICBcIi5mYS1mbGlwLWhvcml6b250YWxcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MCwgbWlycm9yPTEpXCIsXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiBcInNjYWxlKC0xLCAxKVwiLFxuICAgIFwiLW1zLXRyYW5zZm9ybVwiOiBcInNjYWxlKC0xLCAxKVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwic2NhbGUoLTEsIDEpXCJcbiAgfSxcbiAgXCIuZmEtZmxpcC12ZXJ0aWNhbFwiOiB7XG4gICAgXCJmaWx0ZXJcIjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0yLCBtaXJyb3I9MSlcIixcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwic2NhbGUoMSwgLTEpXCIsXG4gICAgXCItbXMtdHJhbnNmb3JtXCI6IFwic2NhbGUoMSwgLTEpXCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJzY2FsZSgxLCAtMSlcIlxuICB9LFxuICBcIjpyb290IC5mYS1yb3RhdGUtOTAsIDpyb290IC5mYS1yb3RhdGUtMTgwLCA6cm9vdCAuZmEtcm90YXRlLTI3MCwgOnJvb3QgLmZhLWZsaXAtaG9yaXpvbnRhbCwgOnJvb3QgLmZhLWZsaXAtdmVydGljYWxcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIixcbiAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIixcbiAgICBcIndpZHRoXCI6IFwiMmVtXCIsXG4gICAgXCJoZWlnaHRcIjogXCIyZW1cIixcbiAgICBcImxpbmUtaGVpZ2h0XCI6IFwiMmVtXCIsXG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIm1pZGRsZVwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrLTF4LCAuZmEtc3RhY2stMnhcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwibGVmdFwiOiBcIjBcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrLTF4XCI6IHtcbiAgICBcImxpbmUtaGVpZ2h0XCI6IFwiaW5oZXJpdFwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrLTJ4XCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjJlbVwiXG4gIH0sXG4gIFwiLmZhLWludmVyc2VcIjoge1xuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIuZmEtZ2xhc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbXVzaWM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2VhcmNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDAyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVudmVsb3BlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGVhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RhcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwNVxcXCJcIlxuICB9LFxuICBcIi5mYS1zdGFyLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwN1xcXCJcIlxuICB9LFxuICBcIi5mYS1maWxtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDA4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRoLWxhcmdlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDA5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRoLWxpc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmVtb3ZlOmJlZm9yZSwgLmZhLWNsb3NlOmJlZm9yZSwgLmZhLXRpbWVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlYXJjaC1wbHVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlYXJjaC1taW51czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxMFxcXCJcIlxuICB9LFxuICBcIi5mYS1wb3dlci1vZmY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2lnbmFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDEyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdlYXI6YmVmb3JlLCAuZmEtY29nOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDEzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyYXNoLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaG9tZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxNVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2xvY2stbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxN1xcXCJcIlxuICB9LFxuICBcIi5mYS1yb2FkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDE4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRvd25sb2FkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDE5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1vLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctY2lyY2xlLW8tdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW5ib3g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGxheS1jaXJjbGUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxZFxcXCJcIlxuICB9LFxuICBcIi5mYS1yb3RhdGUtcmlnaHQ6YmVmb3JlLCAuZmEtcmVwZWF0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlZnJlc2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlzdC1hbHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbG9jazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyM1xcXCJcIlxuICB9LFxuICBcIi5mYS1mbGFnOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDI0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhlYWRwaG9uZXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdm9sdW1lLW9mZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyNlxcXCJcIlxuICB9LFxuICBcIi5mYS12b2x1bWUtZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyN1xcXCJcIlxuICB9LFxuICBcIi5mYS12b2x1bWUtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXJjb2RlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDI5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJhcmNvZGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGFnOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDJiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRhZ3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYm9vazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyZFxcXCJcIlxuICB9LFxuICBcIi5mYS1ib29rbWFyazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyZVxcXCJcIlxuICB9LFxuICBcIi5mYS1wcmludDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyZlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYW1lcmE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZm9udDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzMVxcXCJcIlxuICB9LFxuICBcIi5mYS1ib2xkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWl0YWxpYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzM1xcXCJcIlxuICB9LFxuICBcIi5mYS10ZXh0LWhlaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzNFxcXCJcIlxuICB9LFxuICBcIi5mYS10ZXh0LXdpZHRoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFsaWduLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYWxpZ24tY2VudGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFsaWduLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFsaWduLWp1c3RpZnk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlzdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzYVxcXCJcIlxuICB9LFxuICBcIi5mYS1kZWRlbnQ6YmVmb3JlLCAuZmEtb3V0ZGVudDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzYlxcXCJcIlxuICB9LFxuICBcIi5mYS1pbmRlbnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwM2NcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmlkZW8tY2FtZXJhOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDNkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBob3RvOmJlZm9yZSwgLmZhLWltYWdlOmJlZm9yZSwgLmZhLXBpY3R1cmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzZVxcXCJcIlxuICB9LFxuICBcIi5mYS1wZW5jaWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFwLW1hcmtlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0MVxcXCJcIlxuICB9LFxuICBcIi5mYS1hZGp1c3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGludDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0M1xcXCJcIlxuICB9LFxuICBcIi5mYS1lZGl0OmJlZm9yZSwgLmZhLXBlbmNpbC1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0NFxcXCJcIlxuICB9LFxuICBcIi5mYS1zaGFyZS1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0NVxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGVjay1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0NlxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvd3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RlcC1iYWNrd2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0OFxcXCJcIlxuICB9LFxuICBcIi5mYS1mYXN0LWJhY2t3YXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDQ5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJhY2t3YXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDRhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsYXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGF1c2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RvcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1mb3J3YXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDRlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZhc3QtZm9yd2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1MFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdGVwLWZvcndhcmQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZWplY3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hldnJvbi1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDUzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGx1cy1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWludXMtY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDU2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRpbWVzLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1N1xcXCJcIlxuICB9LFxuICBcIi5mYS1jaGVjay1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXVlc3Rpb24tY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDU5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWluZm8tY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDVhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNyb3NzaGFpcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGltZXMtY2lyY2xlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2stY2lyY2xlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmFuOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDVlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2M1xcXCJcIlxuICB9LFxuICBcIi5mYS1tYWlsLWZvcndhcmQ6YmVmb3JlLCAuZmEtc2hhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXhwYW5kOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbXByZXNzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWludXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXN0ZXJpc2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXhjbGFtYXRpb24tY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDZhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGVhZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1maXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV5ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1leWUtc2xhc2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2FybmluZzpiZWZvcmUsIC5mYS1leGNsYW1hdGlvbi10cmlhbmdsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3MVxcXCJcIlxuICB9LFxuICBcIi5mYS1wbGFuZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3MlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYWxlbmRhcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3M1xcXCJcIlxuICB9LFxuICBcIi5mYS1yYW5kb206YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29tbWVudDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3NVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWduZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hldnJvbi11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3N1xcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmV0d2VldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3OVxcXCJcIlxuICB9LFxuICBcIi5mYS1zaG9wcGluZy1jYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDdhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvbGRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3YlxcXCJcIlxuICB9LFxuICBcIi5mYS1mb2xkZXItb3BlbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvd3MtdjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvd3MtaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1iYXItY2hhcnQtbzpiZWZvcmUsIC5mYS1iYXItY2hhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHdpdHRlci1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmFjZWJvb2stc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDgyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhbWVyYS1yZXRybzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4M1xcXCJcIlxuICB9LFxuICBcIi5mYS1rZXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2VhcnM6YmVmb3JlLCAuZmEtY29nczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4NVxcXCJcIlxuICB9LFxuICBcIi5mYS1jb21tZW50czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4NlxcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYnMtby11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4N1xcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYnMtby1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDg4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0YXItaGFsZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4OVxcXCJcIlxuICB9LFxuICBcIi5mYS1oZWFydC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDhhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNpZ24tb3V0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDhiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpbmtlZGluLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4Y1xcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYi10YWNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDhkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV4dGVybmFsLWxpbms6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2lnbi1pbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5MFxcXCJcIlxuICB9LFxuICBcIi5mYS10cm9waHk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2l0aHViLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5MlxcXCJcIlxuICB9LFxuICBcIi5mYS11cGxvYWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGVtb24tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5NFxcXCJcIlxuICB9LFxuICBcIi5mYS1waG9uZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5NVxcXCJcIlxuICB9LFxuICBcIi5mYS1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5NlxcXCJcIlxuICB9LFxuICBcIi5mYS1ib29rbWFyay1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDk3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBob25lLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5OFxcXCJcIlxuICB9LFxuICBcIi5mYS10d2l0dGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDk5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZhY2Vib29rLWY6YmVmb3JlLCAuZmEtZmFjZWJvb2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2l0aHViOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDliXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVubG9jazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1jcmVkaXQtY2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1yc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGRkLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnVsbGhvcm46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmVsbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmM1xcXCJcIlxuICB9LFxuICBcIi5mYS1jZXJ0aWZpY2F0ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhM1xcXCJcIlxuICB9LFxuICBcIi5mYS1oYW5kLW8tcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGFuZC1vLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGFuZC1vLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhhbmQtby1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhOVxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctY2lyY2xlLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2xvYmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd3JlbmNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGFkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRhc2tzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbHRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBiMFxcXCJcIlxuICB9LFxuICBcIi5mYS1icmllZmNhc2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3dzLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBiMlxcXCJcIlxuICB9LFxuICBcIi5mYS1ncm91cDpiZWZvcmUsIC5mYS11c2VyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjMFxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGFpbjpiZWZvcmUsIC5mYS1saW5rOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGMxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNsb3VkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZsYXNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGMzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWN1dDpiZWZvcmUsIC5mYS1zY2lzc29yczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjNFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb3B5OmJlZm9yZSwgLmZhLWZpbGVzLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYzVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGFwZXJjbGlwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNhdmU6YmVmb3JlLCAuZmEtZmxvcHB5LW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYzdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW5hdmljb246YmVmb3JlLCAuZmEtcmVvcmRlcjpiZWZvcmUsIC5mYS1iYXJzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpc3QtdWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwY2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlzdC1vbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjYlxcXCJcIlxuICB9LFxuICBcIi5mYS1zdHJpa2V0aHJvdWdoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGNjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVuZGVybGluZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjZFxcXCJcIlxuICB9LFxuICBcIi5mYS10YWJsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjZVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWdpYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkMFxcXCJcIlxuICB9LFxuICBcIi5mYS10cnVjazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkMVxcXCJcIlxuICB9LFxuICBcIi5mYS1waW50ZXJlc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGludGVyZXN0LXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkM1xcXCJcIlxuICB9LFxuICBcIi5mYS1nb29nbGUtcGx1cy1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ29vZ2xlLXBsdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbW9uZXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FyZXQtZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkN1xcXCJcIlxuICB9LFxuICBcIi5mYS1jYXJldC11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkOFxcXCJcIlxuICB9LFxuICBcIi5mYS1jYXJldC1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGQ5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhcmV0LXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGRhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbHVtbnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdW5zb3J0ZWQ6YmVmb3JlLCAuZmEtc29ydDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkY1xcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LWRvd246YmVmb3JlLCAuZmEtc29ydC1kZXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGRkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtdXA6YmVmb3JlLCAuZmEtc29ydC1hc2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZW52ZWxvcGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlua2VkaW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcm90YXRlLWxlZnQ6YmVmb3JlLCAuZmEtdW5kbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlMlxcXCJcIlxuICB9LFxuICBcIi5mYS1sZWdhbDpiZWZvcmUsIC5mYS1nYXZlbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlM1xcXCJcIlxuICB9LFxuICBcIi5mYS1kYXNoYm9hcmQ6YmVmb3JlLCAuZmEtdGFjaG9tZXRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlNFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb21tZW50LW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29tbWVudHMtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlNlxcXCJcIlxuICB9LFxuICBcIi5mYS1mbGFzaDpiZWZvcmUsIC5mYS1ib2x0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGU3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNpdGVtYXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdW1icmVsbGE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGFzdGU6YmVmb3JlLCAuZmEtY2xpcGJvYXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGVhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpZ2h0YnVsYi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGViXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV4Y2hhbmdlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGVjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNsb3VkLWRvd25sb2FkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGVkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNsb3VkLXVwbG9hZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlZVxcXCJcIlxuICB9LFxuICBcIi5mYS11c2VyLW1kOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGYwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0ZXRob3Njb3BlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGYxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN1aXRjYXNlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGYyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlbGwtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhMlxcXCJcIlxuICB9LFxuICBcIi5mYS1jb2ZmZWU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZjRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY3V0bGVyeTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmNVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXRleHQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmNlxcXCJcIlxuICB9LFxuICBcIi5mYS1idWlsZGluZy1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGY3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhvc3BpdGFsLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW1idWxhbmNlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGY5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1lZGtpdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmYVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWdodGVyLWpldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmYlxcXCJcIlxuICB9LFxuICBcIi5mYS1iZWVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGZjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWgtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdXMtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGZlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFuZ2xlLWRvdWJsZS1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTAwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFuZ2xlLWRvdWJsZS1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwMVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1kb3VibGUtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtZG91YmxlLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwNFxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwNVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwNlxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTA3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRlc2t0b3A6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGFwdG9wOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTA5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRhYmxldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwYVxcXCJcIlxuICB9LFxuICBcIi5mYS1tb2JpbGUtcGhvbmU6YmVmb3JlLCAuZmEtbW9iaWxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTBiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNpcmNsZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTBjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXF1b3RlLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMGRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXVvdGUtcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Bpbm5lcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExMFxcXCJcIlxuICB9LFxuICBcIi5mYS1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFpbC1yZXBseTpiZWZvcmUsIC5mYS1yZXBseTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExMlxcXCJcIlxuICB9LFxuICBcIi5mYS1naXRodWItYWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTEzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvbGRlci1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTE0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvbGRlci1vcGVuLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc21pbGUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExOFxcXCJcIlxuICB9LFxuICBcIi5mYS1mcm93bi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTE5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1laC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTFhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdhbWVwYWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEta2V5Ym9hcmQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExY1xcXCJcIlxuICB9LFxuICBcIi5mYS1mbGFnLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmxhZy1jaGVja2VyZWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGVybWluYWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29kZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyMVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWlsLXJlcGx5LWFsbDpiZWZvcmUsIC5mYS1yZXBseS1hbGw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Rhci1oYWxmLWVtcHR5OmJlZm9yZSwgLmZhLXN0YXItaGFsZi1mdWxsOmJlZm9yZSwgLmZhLXN0YXItaGFsZi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTIzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvY2F0aW9uLWFycm93OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTI0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNyb3A6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29kZS1mb3JrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTI2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVubGluazpiZWZvcmUsIC5mYS1jaGFpbi1icm9rZW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXVlc3Rpb246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW5mbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyOVxcXCJcIlxuICB9LFxuICBcIi5mYS1leGNsYW1hdGlvbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyYVxcXCJcIlxuICB9LFxuICBcIi5mYS1zdXBlcnNjcmlwdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyYlxcXCJcIlxuICB9LFxuICBcIi5mYS1zdWJzY3JpcHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXJhc2VyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTJkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXB1enpsZS1waWVjZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyZVxcXCJcIlxuICB9LFxuICBcIi5mYS1taWNyb3Bob25lOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTMwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1pY3JvcGhvbmUtc2xhc2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMzFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hpZWxkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhbGVuZGFyLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMzNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlyZS1leHRpbmd1aXNoZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcm9ja2V0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1heGNkbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzNlxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLWNpcmNsZS1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tY2lyY2xlLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tY2lyY2xlLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tY2lyY2xlLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaHRtbDU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2JcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY3NzMzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzY1xcXCJcIlxuICB9LFxuICBcIi5mYS1hbmNob3I6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2RcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdW5sb2NrLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzZVxcXCJcIlxuICB9LFxuICBcIi5mYS1idWxsc2V5ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0MFxcXCJcIlxuICB9LFxuICBcIi5mYS1lbGxpcHNpcy1oOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVsbGlwc2lzLXY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcnNzLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0M1xcXCJcIlxuICB9LFxuICBcIi5mYS1wbGF5LWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0NFxcXCJcIlxuICB9LFxuICBcIi5mYS10aWNrZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWludXMtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1pbnVzLXNxdWFyZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxldmVsLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxldmVsLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2stc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTRhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBlbmNpbC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXh0ZXJuYWwtbGluay1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hhcmUtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTRkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbXBhc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLWRvd246YmVmb3JlLCAuZmEtY2FyZXQtc3F1YXJlLW8tZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1MFxcXCJcIlxuICB9LFxuICBcIi5mYS10b2dnbGUtdXA6YmVmb3JlLCAuZmEtY2FyZXQtc3F1YXJlLW8tdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLXJpZ2h0OmJlZm9yZSwgLmZhLWNhcmV0LXNxdWFyZS1vLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTUyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV1cm86YmVmb3JlLCAuZmEtZXVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTUzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdicDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1NFxcXCJcIlxuICB9LFxuICBcIi5mYS1kb2xsYXI6YmVmb3JlLCAuZmEtdXNkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTU1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJ1cGVlOmJlZm9yZSwgLmZhLWlucjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1NlxcXCJcIlxuICB9LFxuICBcIi5mYS1jbnk6YmVmb3JlLCAuZmEtcm1iOmJlZm9yZSwgLmZhLXllbjpiZWZvcmUsIC5mYS1qcHk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNTdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcnVibGU6YmVmb3JlLCAuZmEtcm91YmxlOmJlZm9yZSwgLmZhLXJ1YjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1OFxcXCJcIlxuICB9LFxuICBcIi5mYS13b246YmVmb3JlLCAuZmEta3J3OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTU5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJpdGNvaW46YmVmb3JlLCAuZmEtYnRjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTVhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS10ZXh0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTVjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtYWxwaGEtYXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTVkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtYWxwaGEtZGVzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LWFtb3VudC1hc2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc29ydC1hbW91bnQtZGVzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2MVxcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LW51bWVyaWMtYXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTYyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtbnVtZXJpYy1kZXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTYzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRodW1icy11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2NFxcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYnMtZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2NVxcXCJcIlxuICB9LFxuICBcIi5mYS15b3V0dWJlLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2NlxcXCJcIlxuICB9LFxuICBcIi5mYS15b3V0dWJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTY3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXhpbmc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEteGluZy1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEteW91dHViZS1wbGF5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTZhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRyb3Bib3g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RhY2stb3ZlcmZsb3c6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW5zdGFncmFtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZsaWNrcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1hZG46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYml0YnVja2V0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTcxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJpdGJ1Y2tldC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHVtYmxyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTczXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR1bWJsci1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbG9uZy1hcnJvdy1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvbmctYXJyb3ctdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbG9uZy1hcnJvdy1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvbmctYXJyb3ctcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXBwbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2luZG93czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3YVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmRyb2lkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpbnV4OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRyaWJiYmxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNreXBlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvdXJzcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJlbGxvOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTgxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZlbWFsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4MlxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTgzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpdHRpcDpiZWZvcmUsIC5mYS1ncmF0aXBheTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4NFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdW4tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4NVxcXCJcIlxuICB9LFxuICBcIi5mYS1tb29uLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJjaGl2ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4N1xcXCJcIlxuICB9LFxuICBcIi5mYS1idWc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdms6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2VpYm86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOGFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmVucmVuOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMThiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhZ2VsaW5lczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1zdGFjay1leGNoYW5nZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtby1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtby1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTkwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRvZ2dsZS1sZWZ0OmJlZm9yZSwgLmZhLWNhcmV0LXNxdWFyZS1vLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZG90LWNpcmNsZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTkyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdoZWVsY2hhaXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmltZW8tc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTk0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR1cmtpc2gtbGlyYTpiZWZvcmUsIC5mYS10cnk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGx1cy1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5NlxcXCJcIlxuICB9LFxuICBcIi5mYS1zcGFjZS1zaHV0dGxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTk3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNsYWNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTk4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVudmVsb3BlLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5OVxcXCJcIlxuICB9LFxuICBcIi5mYS13b3JkcHJlc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtb3BlbmlkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTliXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWluc3RpdHV0aW9uOmJlZm9yZSwgLmZhLWJhbms6YmVmb3JlLCAuZmEtdW5pdmVyc2l0eTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1tb3J0YXItYm9hcmQ6YmVmb3JlLCAuZmEtZ3JhZHVhdGlvbi1jYXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEteWFob286YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ29vZ2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWEwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlZGRpdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhMVxcXCJcIlxuICB9LFxuICBcIi5mYS1yZWRkaXQtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWEyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0dW1ibGV1cG9uLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhM1xcXCJcIlxuICB9LFxuICBcIi5mYS1zdHVtYmxldXBvbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhNFxcXCJcIlxuICB9LFxuICBcIi5mYS1kZWxpY2lvdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGlnZzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhNlxcXCJcIlxuICB9LFxuICBcIi5mYS1waWVkLXBpcGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWE3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBpZWQtcGlwZXItYWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWE4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRydXBhbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhOVxcXCJcIlxuICB9LFxuICBcIi5mYS1qb29tbGE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGFuZ3VhZ2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmF4OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJ1aWxkaW5nOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoaWxkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhdzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiMFxcXCJcIlxuICB9LFxuICBcIi5mYS1zcG9vbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiMVxcXCJcIlxuICB9LFxuICBcIi5mYS1jdWJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWIyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWN1YmVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWIzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlaGFuY2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmVoYW5jZS1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RlYW06YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RlYW0tc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWI3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlY3ljbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXV0b21vYmlsZTpiZWZvcmUsIC5mYS1jYXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FiOmJlZm9yZSwgLmZhLXRheGk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJlZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiYlxcXCJcIlxuICB9LFxuICBcIi5mYS1zcG90aWZ5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWJjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRldmlhbnRhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYmRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc291bmRjbG91ZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiZVxcXCJcIlxuICB9LFxuICBcIi5mYS1kYXRhYmFzZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjMFxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXBkZi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWMxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtd29yZC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtZXhjZWwtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjM1xcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXBvd2VycG9pbnQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjNFxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXBob3RvLW86YmVmb3JlLCAuZmEtZmlsZS1waWN0dXJlLW86YmVmb3JlLCAuZmEtZmlsZS1pbWFnZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWM1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtemlwLW86YmVmb3JlLCAuZmEtZmlsZS1hcmNoaXZlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS1zb3VuZC1vOmJlZm9yZSwgLmZhLWZpbGUtYXVkaW8tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjN1xcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLW1vdmllLW86YmVmb3JlLCAuZmEtZmlsZS12aWRlby1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtY29kZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZpbmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29kZXBlbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjYlxcXCJcIlxuICB9LFxuICBcIi5mYS1qc2ZpZGRsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjY1xcXCJcIlxuICB9LFxuICBcIi5mYS1saWZlLWJvdXk6YmVmb3JlLCAuZmEtbGlmZS1idW95OmJlZm9yZSwgLmZhLWxpZmUtc2F2ZXI6YmVmb3JlLCAuZmEtc3VwcG9ydDpiZWZvcmUsIC5mYS1saWZlLXJpbmc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2RcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2lyY2xlLW8tbm90Y2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2VcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmE6YmVmb3JlLCAuZmEtcmViZWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2U6YmVmb3JlLCAuZmEtZW1waXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpdC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2l0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhhY2tlci1uZXdzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRlbmNlbnQtd2VpYm86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2VjaGF0OmJlZm9yZSwgLmZhLXdlaXhpbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkN1xcXCJcIlxuICB9LFxuICBcIi5mYS1zZW5kOmJlZm9yZSwgLmZhLXBhcGVyLXBsYW5lOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlbmQtbzpiZWZvcmUsIC5mYS1wYXBlci1wbGFuZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhpc3Rvcnk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZGFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2VuZGVybGVzczpiZWZvcmUsIC5mYS1jaXJjbGUtdGhpbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkYlxcXCJcIlxuICB9LFxuICBcIi5mYS1oZWFkZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGFyYWdyYXBoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWRkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNsaWRlcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hhcmUtYWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWUwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoYXJlLWFsdC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYm9tYjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlMlxcXCJcIlxuICB9LFxuICBcIi5mYS1zb2NjZXItYmFsbC1vOmJlZm9yZSwgLmZhLWZ1dGJvbC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWUzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR0eTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlNFxcXCJcIlxuICB9LFxuICBcIi5mYS1iaW5vY3VsYXJzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWU1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdWc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2xpZGVzaGFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlN1xcXCJcIlxuICB9LFxuICBcIi5mYS10d2l0Y2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZThcXFwiXCJcbiAgfSxcbiAgXCIuZmEteWVscDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlOVxcXCJcIlxuICB9LFxuICBcIi5mYS1uZXdzcGFwZXItbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlYVxcXCJcIlxuICB9LFxuICBcIi5mYS13aWZpOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWViXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhbGN1bGF0b3I6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGF5cGFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWVkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdvb2dsZS13YWxsZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2MtdmlzYTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmMFxcXCJcIlxuICB9LFxuICBcIi5mYS1jYy1tYXN0ZXJjYXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWYxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLWRpc2NvdmVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWYyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLWFtZXg6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2MtcGF5cGFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWY0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLXN0cmlwZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmNVxcXCJcIlxuICB9LFxuICBcIi5mYS1iZWxsLXNsYXNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWY2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlbGwtc2xhc2gtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmN1xcXCJcIlxuICB9LFxuICBcIi5mYS10cmFzaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmOFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb3B5cmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXllZHJvcHBlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmYlxcXCJcIlxuICB9LFxuICBcIi5mYS1wYWludC1icnVzaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmY1xcXCJcIlxuICB9LFxuICBcIi5mYS1iaXJ0aGRheS1jYWtlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFyZWEtY2hhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZmVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGllLWNoYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjAwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpbmUtY2hhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGFzdGZtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjAyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxhc3RmbS1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLW9mZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwNFxcXCJcIlxuICB9LFxuICBcIi5mYS10b2dnbGUtb246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmljeWNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwNlxcXCJcIlxuICB9LFxuICBcIi5mYS1idXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW94aG9zdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwOFxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdlbGxpc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hla2VsOmJlZm9yZSwgLmZhLXNoZXFlbDpiZWZvcmUsIC5mYS1pbHM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWVhbnBhdGg6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnV5c2VsbGFkczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwZFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb25uZWN0ZGV2ZWxvcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwZVxcXCJcIlxuICB9LFxuICBcIi5mYS1kYXNoY3ViZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxMFxcXCJcIlxuICB9LFxuICBcIi5mYS1mb3J1bWJlZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxMVxcXCJcIlxuICB9LFxuICBcIi5mYS1sZWFucHViOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjEyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlbGxzeTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxM1xcXCJcIlxuICB9LFxuICBcIi5mYS1zaGlydHNpbmJ1bGs6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2ltcGx5YnVpbHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2t5YXRsYXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FydC1wbHVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjE3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhcnQtYXJyb3ctZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxOFxcXCJcIlxuICB9LFxuICBcIi5mYS1kaWFtb25kOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjE5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoaXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlci1zZWNyZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbW90b3JjeWNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxY1xcXCJcIlxuICB9LFxuICBcIi5mYS1zdHJlZXQtdmlldzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxZFxcXCJcIlxuICB9LFxuICBcIi5mYS1oZWFydGJlYXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmVudXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyMlxcXCJcIlxuICB9LFxuICBcIi5mYS1tZXJjdXJ5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjIzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyYW5zZ2VuZGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjI0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyYW5zZ2VuZGVyLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyNVxcXCJcIlxuICB9LFxuICBcIi5mYS12ZW51cy1kb3VibGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFycy1kb3VibGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmVudXMtbWFyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyOFxcXCJcIlxuICB9LFxuICBcIi5mYS1tYXJzLXN0cm9rZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyOVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYXJzLXN0cm9rZS12OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjJhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1hcnMtc3Ryb2tlLWg6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbmV1dGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjJjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZhY2Vib29rLW9mZmljaWFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjMwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBpbnRlcmVzdC1wOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjMxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdoYXRzYXBwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlcnZlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzM1xcXCJcIlxuICB9LFxuICBcIi5mYS11c2VyLXBsdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlci10aW1lczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzNVxcXCJcIlxuICB9LFxuICBcIi5mYS1ob3RlbDpiZWZvcmUsIC5mYS1iZWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmlhY29pbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzN1xcXCJcIlxuICB9LFxuICBcIi5mYS10cmFpbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzOFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdWJ3YXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWVkaXVtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjNhXFxcIlwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qKioqKioqKioqKioqKiogRm9udHMgKioqKioqKioqKioqKioqKiovXG4gICdleG9fcmVndWxhcic6IHJlcXVpcmUoJy4vZXhvX3JlZ3VsYXInKSxcbiAgJ2V4b19pdGFsaWMnOiByZXF1aXJlKCcuL2V4b19pdGFsaWMnKSxcbiAgJ2V4b19leHRyYWxpZ2h0JzogcmVxdWlyZSgnLi9leG9fZXh0cmFsaWdodCcpLFxuICAnZXhvX2V4dHJhbGlnaHRfaXRhbGljJzogcmVxdWlyZSgnLi9leG9fZXh0cmFsaWdodF9pdGFsaWMnKSxcbiAgJ2V4b19zZW1pYm9sZCc6IHJlcXVpcmUoJy4vZXhvX3NlbWlib2xkJyksXG4gICdleG9fc2VtaWJvbGRfaXRhbGljJzogcmVxdWlyZSgnLi9leG9fc2VtaWJvbGRfaXRhbGljJyksXG4gICdleG9fZXh0cmFib2xkJzogcmVxdWlyZSgnLi9leG9fZXh0cmFib2xkJyksXG4gICdleG9fZXh0cmFib2xkX2l0YWxpYyc6IHJlcXVpcmUoJy4vZXhvX2V4dHJhYm9sZF9pdGFsaWMnKSxcblxuICAnZm9udF9hd2Vzb21lJzogcmVxdWlyZSgnLi9mb250X2F3ZXNvbWUnKVxuXG59O1xuIiwiLy8gZGIuanMgLSBDbGllbnQgbG9jYWxTdG9yYWdlIERCIHRvIGtlZXAgZGF0YSBwZXJzaXN0ZWRcblxudmFyIGxvY2FsX3N0b3JhZ2VfZXhpc3RzID0gdHlwZW9mIHdpbmRvdy5sb2NhbFN0b3JhZ2UgPT09ICdvYmplY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBzYXZlOiBmdW5jdGlvbihrZXksIHZhbHVlLCBjYikgeyAvLyBzYXZlIGFuIGl0ZW0gdG8gbG9jYWxTdG9yYWdlXG5cbiAgICBpZiAobG9jYWxfc3RvcmFnZV9leGlzdHMpIHtcbiAgICAgd2luZG93LmxvY2FsU3RvcmFnZVtrZXldID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2IodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICB9LFxuXG4gIGdldDogZnVuY3Rpb24oa2V5LCBjYikgeyAvLyByZXRyaWV2ZSBhIHNpbmdsZSBpdGVtIGZyb20gbG9jYWxTdG9yYWdlXG5cbiAgICB2YXIgZm91bmRfaXRlbSA9IGZhbHNlO1xuXG4gICAgaWYgKGxvY2FsX3N0b3JhZ2VfZXhpc3RzKSB7XG5cbiAgICAgIHZhciBpdGVtID0gd2luZG93LmxvY2FsU3RvcmFnZVtrZXldO1xuXG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBmb3VuZF9pdGVtID0gSlNPTi5wYXJzZShpdGVtKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2IoZm91bmRfaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmb3VuZF9pdGVtO1xuICAgIH1cblxuICB9LFxuXG4gIHJlbW92ZTogZnVuY3Rpb24oa2V5LCBjYikgeyAvLyByZW1vdmUgYSBzaW5nbGUgaXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuXG4gICAgaWYgKGxvY2FsX3N0b3JhZ2VfZXhpc3RzKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgfSxcblxuICByZW1vdmVBbGw6IGZ1bmN0aW9uKGNiKSB7IC8vIGRlc3Ryb3kgdGhlIHdob2xlIGxvY2FsU3RvcmFnZVxuXG4gICAgaWYgKGxvY2FsX3N0b3JhZ2VfZXhpc3RzKSB7XG4gICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gIH0sXG5cbiAgaXRlbXM6IGZ1bmN0aW9uKGNiKSB7XG5cbiAgICB2YXIga2V5cyA9IGZhbHNlO1xuXG4gICAgaWYgKGxvY2FsX3N0b3JhZ2VfZXhpc3RzKSB7XG4gICAgICBrZXlzID0gW107XG5cbiAgICAgIGZvciAodmFyIGk9MDsgaTx3aW5kb3cubG9jYWxTdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleXMucHVzaCh3aW5kb3cubG9jYWxTdG9yYWdlLmtleShpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYihrZXlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuXG4gIH1cblxufTtcbiIsIi8vIGFwcCBsb2dnaW5nIHNldHRpbmdzXG52YXIgc2V0dGluZ3MgPSByZXF1aXJlKCcuLy4uL3NldHRpbmdzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTG9nKG1lc3NhZ2UpIHtcblxuICBpZiAoIXNldHRpbmdzLnByb2R1Y3Rpb24pIHtcblxuICAgIGNvbnNvbGUubG9nKFwiRGV2ZWxvcG1lbnQgTWVzc2FnZTogXCIgKyBtZXNzYWdlKTtcbiAgICByZXR1cm47XG5cbiAgfSBlbHNlIHtcblxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgIHJldHVybjtcblxuICB9XG5cbn07XG4iLCJcbnZhciBhbmltYXRpb25BbW91bnQgPSBcIjEwMCVcIjtcbnZhciBhbmltYXRpb25EdXJhdGlvbiA9IFwiMC40c1wiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBuYW1lczoge1xuXG4gICAgXCJyaWdodC1mYXN0XCIgOiB7IGN1cnJlbnQ6IFwibW92ZS10by1sZWZ0LWZhc3RcIiwgbmV4dDogXCJtb3ZlLWZyb20tcmlnaHQtZmFzdFwiIH0sXG4gICAgXCJsZWZ0LWZhc3RcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXJpZ2h0LWZhc3RcIiwgbmV4dDogXCJtb3ZlLWZyb20tbGVmdC1mYXN0XCIgfVxuXG4gIH0sXG5cbiAgc3R5bGVzOiB7XG5cbiAgICBcIi5tb3ZlLXRvLWxlZnQtZmFzdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZVRvTGVmdEZhc3RcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1sZWZ0LWZhc3RcIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVGcm9tTGVmdEZhc3RcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfSxcblxuICAgIFwiLm1vdmUtdG8tcmlnaHQtZmFzdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZVRvUmlnaHRGYXN0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvblxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLWZyb20tcmlnaHQtZmFzdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21SaWdodEZhc3RcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlVG9MZWZ0RmFzdFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21MZWZ0RmFzdFwiIDoge1xuICAgICAgZnJvbSA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKC1cIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlVG9SaWdodEZhc3RcIiA6IHtcbiAgICAgIHRvIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21SaWdodEZhc3RcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgcHJvZHVjdGlvbjogZmFsc2VcblxufTtcbiIsInZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jLWxpdGUnKTtcbnZhciBMb2cgPSByZXF1aXJlKCcuL21vZHVsZXMvbG9nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgYXN5bmMucGFyYWxsZWwoe1xuXG4gICAgbG9hZERldmljZUV2ZW50czogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgIH0sXG5cbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICBpZiAoZXJyKSB7XG4gICAgICBMb2coXCJFcnJvciBsb2FkaW5nIHRoZSBhcHBcIik7XG4gICAgfSBlbHNlIHtcblxuICAgICAgTG9nKFwiQXBwIGlzIGRvbmUgbG9hZGluZ1wiKTtcblxuICAgICAgQXBwLmVtaXQoXCJhcHA6aW5pdGlhbGl6ZWRcIik7XG5cbiAgICAgIEFwcC5Sb3V0ZXIubmF2aWdhdGUoXCJob21lXCIsIFwiZmFkZVwiKTtcblxuICAgIH1cblxuICB9KTtcblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLyogUmVtb3ZlIHRoZSBzY3JvbGxiYXIgKi9cbiAgXCI6Oi13ZWJraXQtc2Nyb2xsYmFyXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJub25lXCJcbiAgfSxcblxuICAvKiBTZXQgdGhlIGJhc2UgZm9udCBzaXplIHRvIDEwcHggYW5kIHVzZSB0aGUgRXhvIGZvbnQgKi9cbiAgXCJodG1sXCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHhcIixcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgXCJmb250LXN0eWxlXCI6IFwibm9ybWFsXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiBcIm5vcm1hbFwiLFxuICAgIGNvbG9yOiBDb2xvcnMuYmxhY2tcbiAgfSxcblxuICAvKiBTZXQgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGFwcCB0byBvdXIgY2hvc2VuIGxpZ2h0R3JheSBjb2xvciAqL1xuICBcIiNzYW1zb25fYXBwXCI6IHtcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjogQ29sb3JzLmxpZ2h0R3JheVxuICB9XG59O1xuIiwiXG52YXIgZGIgPSByZXF1aXJlKCcuL21vZHVsZXMvZGInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb2RvcygpIHtcblxuICB2YXIgdG9kb3MgPSBkYi5nZXQoXCJUb2Rvc1wiKSB8fCBbXTtcblxuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHRvZG9fdGV4dCkge1xuXG4gICAgLy8gZ2l2ZSB0aGUgdG9kbyBhIHVuaXF1ZSBpZFxuICAgIHZhciB0b2RvID0ge1xuICAgICAgX2lkIDogXCJ0b2RvLVwiICsgRGF0ZS5ub3coKSxcbiAgICAgIHRleHQ6IHRvZG9fdGV4dFxuICAgIH07XG5cbiAgICB0b2Rvcy5wdXNoKHRvZG8pO1xuXG4gICAgLy8gcmVzYXZlIHRoZSBhcnJheSBvZiB0b2RvcyBpbiBsb2NhbFN0b3JhZ2VcbiAgICBkYi5zYXZlKFwiVG9kb3NcIiwgdG9kb3MpO1xuXG4gIH07XG5cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbih0b2RvX2lkKSB7XG5cbiAgICBmb3IgKHZhciBpPTA7IGk8dG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHJlbW92ZSB0aGUgdG9kbyBmcm9tIHRoZSB0b2RvcyBhcnJheSBpZiB0aGUgX2lkJ3MgbWF0Y2hcbiAgICAgIGlmICh0b2Rvc1tpXS5faWQgPT09IHRvZG9faWQpIHtcbiAgICAgICAgdG9kb3Muc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNhdmUgdGhlIGFycmF5IG9mIHRvZG9zIGluIGxvY2FsU3RvcmFnZVxuICAgIGRiLnNhdmUoXCJUb2Rvc1wiLCB0b2Rvcyk7XG5cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKHRvZG9faWQsIHRvZG9fdGV4dCkge1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodG9kb3NbaV0uX2lkID09PSB0b2RvX2lkKSB7XG4gICAgICAgIHRvZG9zW2ldLnRleHQgPSB0b2RvX3RleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlc2F2ZSB0aGUgYXJyYXkgb2YgdG9kb3MgaW4gbG9jYWxTdG9yYWdlXG4gICAgZGIuc2F2ZShcIlRvZG9zXCIsIHRvZG9zKTtcblxuICB9O1xuXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24odG9kb19pZCkge1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodG9kb3NbaV0uX2lkID09PSB0b2RvX2lkKSB7XG4gICAgICAgIHJldHVybiB0b2Rvc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICB0aGlzLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0b2Rvcy5zbGljZSgwKTtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0b2RvcyA9IFtdO1xuXG4gICAgZGIuc2F2ZShcIlRvZG9zXCIsIFtdKTtcblxuICB9O1xuXG59O1xuIiwiXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi8uLi8uLi8uLi8uLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdzYW1zb25fZmFkZWRfb3ZlcmxheScsXG4gIHN0eWxlOiB7XG5cbiAgICBcIiNzYW1zb25fZmFkZWRfb3ZlcmxheVwiOiB7XG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjMDAwXCIsXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgdG9wOiBcIjYwcHhcIixcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIFwiei1pbmRleFwiOiAxMCxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICAgICAgdHJhbnNpdGlvbjogXCJvcGFjaXR5IDAuMnMgbGluZWFyLCB2aXNpYmlsaXR5IDBzIGxpbmVhciAwLjJzXCJcbiAgICB9LFxuXG4gICAgXCIjc2Ftc29uX2ZhZGVkX292ZXJsYXkuc2hvd1wiOiB7XG4gICAgICBvcGFjaXR5OiBcIjAuNlwiLFxuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgICBcInRyYW5zaXRpb24tZGVsYXlcIjogXCIwc1wiXG4gICAgfVxuICB9LFxuXG4gIGRvbUV2ZW50czoge1xuXG4gICAgJ3RvdWNoJyA6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB0aGlzLmhpZGVGYWRlZE92ZXJsYXkoKTtcbiAgICAgIFNhbXNvbi5BcHAuZW1pdChcImZhZGVkLW92ZXJsYXk6aGl0XCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50czoge1xuXG4gICAgJ3NpZGUtbWVudTpoaXQnOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmhpZGVGYWRlZE92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgJ2hlYWRlcjptZW51LWJ1dHRvbjpoaXQnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudG9nZ2xlRmFkZWRPdmVybGF5KCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG5cbiAgICBpc1Zpc2libGUgOiBmYWxzZSxcblxuICAgIGhpZGVGYWRlZE92ZXJsYXkgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNob3dGYWRlZE92ZXJsYXkgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlRmFkZWRPdmVybGF5OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmhpZGVGYWRlZE92ZXJsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd0ZhZGVkT3ZlcmxheSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIHJvdXRlcjoge1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGZhZGVkIG92ZXJsYXkgaXMgcmVtb3ZlZCBiZWZvcmUgYW55IG5ldyBwYWdlIGlzIHRyYW5zaXRpb25lZCB0b1xuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG5cbiAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSAmJiBkYXRhLmN1cnJlbnRBbmltYXRpb24gIT09IFwidXBkYXRlXCIpIHtcbiAgICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSBmYWRlZCBvdmVybGF5IGVsZW1lbnRcbiAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fZmFkZWRfb3ZlcmxheSA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gZGVsZXRlIHRoZSBmYWRlZCBvdmVybGF5IGVsZW1lbnQgZnJvbSB0aGUgY2FjaGVcbiAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXk7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbnZhciBoZWFkZXJfaGVpZ2h0ID0gXCI2MHB4XCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX2hlYWRlcicsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZToge1xuXG4gICAgXCIjc2Ftc29uX2hlYWRlclwiOiB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwibGVmdFwiOiBcIjBcIixcbiAgICAgIFwicmlnaHRcIjogXCIwXCIsXG4gICAgICBcInRvcFwiOiBcIjBcIixcbiAgICAgIFwiaGVpZ2h0XCI6IGhlYWRlcl9oZWlnaHQsXG4gICAgICBcInotaW5kZXhcIjogMyxcbiAgICAgIFwiYm94LXNoYWRvd1wiOiBcIjAgMCA4cHggcmdiYSgwLDAsMCwwLjMpXCIsXG4gICAgICBcIm9wYWNpdHlcIjogMSxcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiMwMDAwMDBcIixcbiAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCAwLjZzIGVhc2VcIixcbiAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMCwtXCIgKyBoZWFkZXJfaGVpZ2h0ICsgXCIsMClcIlxuICAgIH0sXG5cbiAgICBcIiNzYW1zb25faGVhZGVyLnNob3dcIjoge1xuICAgICAgXCJvcGFjaXR5XCI6IDEsXG4gICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl9oZWFkZXJfdGl0bGVcIjoge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcImxlZnRcIjogXCI1MCVcIixcbiAgICAgIFwidG9wXCI6IFwiNTAlXCIsXG4gICAgICBcImhlaWdodFwiOiBcIjQwcHhcIixcbiAgICAgIFwibGluZS1oZWlnaHRcIjogXCI0MHB4XCIsXG4gICAgICBcIndpZHRoXCI6IFwiNjAlXCIsXG4gICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZSgtNTAlLC01MCUpXCIsXG4gICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgXCJmb250LXNpemVcIjogXCIzcmVtXCIsXG4gICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJtaWRkbGVcIlxuICAgIH0sXG5cbiAgICBcIiNzYW1zb25faGVhZGVyX21lbnVfYnV0dG9uLCAjc2Ftc29uX2hlYWRlcl9iYWNrX2J1dHRvblwiOiB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwibGVmdFwiOiBcIjEwcHhcIixcbiAgICAgIFwidG9wXCI6IFwiMTBweFwiLFxuICAgICAgXCJoZWlnaHRcIjogXCI0MHB4XCIsXG4gICAgICBcImxpbmUtaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgICAgXCJ3aWR0aFwiOiBcIjQwcHhcIixcbiAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjRyZW1cIixcbiAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIm1pZGRsZVwiXG4gICAgfVxuXG4gIH0sXG5cbiAgZG9tRXZlbnRzOiB7XG5cbiAgICAndG91Y2ggI3NhbXNvbl9oZWFkZXJfbWVudV9idXR0b24nOiBmdW5jdGlvbigpIHtcbiAgICAgIFNhbXNvbi5BcHAuZW1pdCgnaGVhZGVyOm1lbnUtYnV0dG9uOmhpdCcpO1xuICAgIH0sXG5cbiAgICAndG91Y2ggI3NhbXNvbl9oZWFkZXJfYmFja19idXR0b24nOiBmdW5jdGlvbigpIHtcbiAgICAgIFNhbXNvbi5BcHAuZW1pdCgnaGVhZGVyOmJhY2stYnV0dG9uOmhpdCcpO1xuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50czoge1xuXG4gICAgJ2FwcDppbml0aWFsaXplZCc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zaG93SGVhZGVyKCk7XG4gICAgfSxcblxuICAgICdoZWFkZXI6c2hvdyc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5zaG93SGVhZGVyKCk7XG4gICAgfSxcblxuICAgICdoZWFkZXI6aGlkZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5oaWRlSGVhZGVyKCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG5cbiAgICBoZWFkZXJIZWlnaHQ6IGhlYWRlcl9oZWlnaHQsXG5cbiAgICBpc1Zpc2libGUgOiBmYWxzZSxcblxuICAgIGhpZGVIZWFkZXIgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNob3dIZWFkZXIgOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlSGVhZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmhpZGVIZWFkZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd0hlYWRlcigpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIHJvdXRlcjoge1xuXG4gICAgYmVmb3JlQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcblxuICAgICAgLy8gaWYgdGhlIHBhZ2UgaXMgZnVsbHNjcmVlbiwgdGhlbiBoaWRlIHRoZSBoZWFkZXIgYW5kIHN0cmV0Y2ggdGhlIHBhZ2UgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXG4gICAgICBpZiAoU2Ftc29uLkFwcC5Sb3V0ZXIucGFnZUNhY2hlW2RhdGEubmV4dFBhZ2VdLmZ1bGxzY3JlZW4pIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET01bZGF0YS5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5zdHlsZS50b3AgPSBcIlwiO1xuICAgICAgICB0aGlzLmhpZGVIZWFkZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFNhbXNvbi5BcHAuRE9NW2RhdGEuaW5hY3RpdmVQYWdlRWxlbWVudF0uc3R5bGUudG9wID0gaGVhZGVyX2hlaWdodDtcbiAgICAgICAgdGhpcy5zaG93SGVhZGVyKCk7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIGR1cmluZ0FuaW1hdGU6IGZ1bmN0aW9uKGRhdGEpIHsgLy8gbm8gY2FsbGJhY2tcblxuICAgICAgLy8gaWYgdGhlIG5leHQgcGFnZSBoYXMgYSBwcmV2aW91c1BhZ2UsIHRoZW4gcmVwbGFjZSB0aGUgI3NhbXNvbl9oZWFkZXJfbWVudV9idXR0b24gd2l0aCAjc2Ftc29uX21lbnVfYmFja19idXR0b25cbiAgICAgIGlmIChTYW1zb24uQXBwLlBhZ2VzW2RhdGEubmV4dFBhZ2VdLnByZXZpb3VzUGFnZSkge1xuICAgICAgICBTYW1zb24uQXBwLkRhdGEuSGVhZGVyLmJ1dHRvbiA9IFwiYmFja1wiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcbiAgICB9XG5cbiAgfSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHRpdGxlOiBTYW1zb24uQXBwLkRhdGEuSGVhZGVyLnRpdGxlLFxuICAgICAgYnV0dG9uOiBTYW1zb24uQXBwLkRhdGEuSGVhZGVyLmJ1dHRvblxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYmVmb3JlIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGJlZm9yZVJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBpZiAoIVNhbXNvbi5BcHAuRGF0YS5IZWFkZXIpIHtcbiAgICAgIFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAoIVNhbXNvbi5BcHAuRGF0YS5IZWFkZXIudGl0bGUpIHtcbiAgICAgIFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIudGl0bGUgPSBcIkFwcFwiO1xuICAgIH1cblxuICAgIGlmICghU2Ftc29uLkFwcC5EYXRhLkhlYWRlci5idXR0b24pIHtcbiAgICAgIFNhbXNvbi5BcHAuRGF0YS5IZWFkZXIuYnV0dG9uID0gXCJtZW51XCI7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25faGVhZGVyID0gdGhpcy5lbGVtZW50O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIGhlYWRlciBlbGVtZW50IGZyb20gdGhlIGNoYWNoZVxuICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25faGVhZGVyO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChidXR0b24sIHRpdGxlKSB7XG5pZiAoIGJ1dHRvbiA9PT0gXCJtZW51XCIpXG57XG5idWYucHVzaChcIjxkaXYgaWQ9XFxcInNhbXNvbl9oZWFkZXJfbWVudV9idXR0b25cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1iYXJzXFxcIj48L2k+PC9kaXY+XCIpO1xufVxuZWxzZSBpZiAoIGJ1dHRvbiA9PT0gXCJiYWNrXCIpXG57XG5idWYucHVzaChcIjxkaXYgaWQ9XFxcInNhbXNvbl9oZWFkZXJfYmFja19idXR0b25cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1jaGV2cm9uLWxlZnRcXFwiPjwvaT48L2Rpdj5cIik7XG59XG5idWYucHVzaChcIjxkaXYgaWQ9XFxcInNhbXNvbl9oZWFkZXJfdGl0bGVcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHRpdGxlKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJidXR0b25cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmJ1dHRvbjp0eXBlb2YgYnV0dG9uIT09XCJ1bmRlZmluZWRcIj9idXR0b246dW5kZWZpbmVkLFwidGl0bGVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRpdGxlOnR5cGVvZiB0aXRsZSE9PVwidW5kZWZpbmVkXCI/dGl0bGU6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBoZWFkZXIgOiByZXF1aXJlKCcuL2hlYWRlcicpLFxuXG4gIHNpZGVNZW51IDogcmVxdWlyZSgnLi9zaWRlTWVudScpLFxuXG4gIGZhZGVkT3ZlcmxheSA6IHJlcXVpcmUoJy4vZmFkZWRPdmVybGF5JyksXG5cbiAgdHJhbnNwYXJlbnRPdmVybGF5IDogcmVxdWlyZSgnLi90cmFuc3BhcmVudE92ZXJsYXknKVxuXG59O1xuIiwiXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi8uLi8uLi8uLi8uLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdzYW1zb25fc2lkZW1lbnUnLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHtcblxuICAgIFwiI3NhbXNvbl9zaWRlbWVudVwiOiB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwiei1pbmRleFwiOiAxMSxcbiAgICAgIFwibGVmdFwiOiBcIi0yMDBweFwiLFxuICAgICAgXCJ0b3BcIjogXCI2MHB4XCIsXG4gICAgICBcImJvdHRvbVwiOiBcIjBcIixcbiAgICAgIFwid2lkdGhcIiA6IFwiMjAwcHhcIixcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiM2NjZcIixcbiAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCAwLjJzIGVhc2UtaW4tb3V0XCIsXG4gICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl9zaWRlbWVudS5vcGVuXCI6IHtcbiAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMjAwcHgsMCwwKVwiXG4gICAgfSxcblxuICAgIFwiLnNhbXNvbl9zaWRlbWVudV9pdGVtXCI6IHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIHBhZGRpbmc6IFwiMTBweCAxMHB4IDEwcHggMTBweFwiLFxuICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiLFxuICAgICAgXCJmb250LXNpemVcIjogXCIyLjJyZW1cIixcbiAgICAgIFwiYm9yZGVyLWJvdHRvbVwiOiBcIjJweCBzb2xpZCAjYmJiXCJcbiAgICB9LFxuXG4gICAgXCIuc2Ftc29uX3NpZGVtZW51X2l0ZW0uc2VsZWN0ZWRcIjoge1xuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiIzFhYmM5Y1wiXG4gICAgfSxcblxuICAgIFwiLnNhbXNvbl9zaWRlbWVudV9pdGVtOmFjdGl2ZVwiOiB7XG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjZmZmXCIsXG4gICAgICBjb2xvcjogXCIjMDAwXCJcbiAgICB9LFxuXG4gICAgJy5zYW1zb25fc2lkZW1lbnVfaXRlbSBpJzoge1xuICAgICAgXCJtYXJnaW4tcmlnaHRcIjogXCIxNXB4XCJcbiAgICB9XG5cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgIC8vIGhhbmRsZSBhbnkgLnNhbXNvbl9zaWRlbWVudV9pdGVtIGJlaW5nIHRvdWNoZWRcbiAgICAndG91Y2ggLnNhbXNvbl9zaWRlbWVudV9pdGVtJzogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSByb3V0ZXIgaXNuJ3QgYWxyZWFkeSBidXN5IGJlZm9yZSBhY2NlcHRpbmcgYW55IGV2ZW50cyBmcm9tIHRoZSBzaWRlbWVudVxuICAgICAgaWYgKCFTYW1zb24uQXBwLlJvdXRlci5pc0J1c3kpIHtcblxuICAgICAgICB2YXIgcGF0aCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhZ2VcIik7XG5cbiAgICAgICAgLy8gc2V0IHNlbGVjdGVkIGFzIHRydWUgb24gdGhlIHRhcmdldGVkIHNpZGVfbWVudV9pdGVtXG4gICAgICAgIFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICBpZiAocGFnZS5wYXRoID09PSBwYXRoKSB7XG4gICAgICAgICAgICBTYW1zb24uQXBwLkRhdGEuc2lkZU1lbnUuc2VsZWN0ZWQgPSBwYXRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9yY2UgdGhlIHNpZGVtZW51IHRvIHJlcmVuZGVyIGlmIHRoZSBzZWxlY3RlZCBzaWRlbWVudV9pdGVtIGhhcyBjaGFuZ2VkXG4gICAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuXG4gICAgICAgIC8vIG9ubHkgbmF2aWdhdGUgaWYgd2UgYXJlbid0IGFscmVhZHkgb24gdGhlIHNlbGVjdGVkIHBhZ2VcbiAgICAgICAgaWYgKHBhdGggIT09IFNhbXNvbi5BcHAuUm91dGVyLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgU2Ftc29uLkFwcC5Sb3V0ZXIubmF2aWdhdGUocGF0aCwgXCJyaWdodFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNsb3NlU2lkZU1lbnUoKTtcbiAgICAgICAgICBTYW1zb24uQXBwLmVtaXQoXCJzaWRlLW1lbnU6aGl0XCIpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50czoge1xuXG4gICAgJ2hlYWRlcjptZW51LWJ1dHRvbjpoaXQnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMudG9nZ2xlU2lkZU1lbnUoKTtcbiAgICB9LFxuXG4gICAgJ2ZhZGVkLW92ZXJsYXk6aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZGVNZW51KCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG5cbiAgICBpc09wZW46IGZhbHNlLFxuXG4gICAgY2xvc2VTaWRlTWVudTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBvcGVuU2lkZU1lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIH0sXG5cbiAgICB0b2dnbGVTaWRlTWVudTogZnVuY3Rpb24oKSB7IC8vIGlmIHRoZSBzaWRlbWVudSBpcyBjbG9zZWQgdGhlbiBvcGVuIGl0LCBpZiBvcGVuIHRoZW4gY2xvc2UgaXRcbiAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICB0aGlzLmNsb3NlU2lkZU1lbnUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3BlblNpZGVNZW51KCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgcm91dGVyOiB7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgc2lkZSBtZW51IGlzIGNsb3NlZCBiZWZvcmUgYW55IG5ldyBwYWdlIGlzIHRyYW5zaXRpb25lZCB0b1xuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG5cbiAgICAgIGlmICh0aGlzLmlzT3BlbiAgJiYgZGF0YS5jdXJyZW50QW5pbWF0aW9uICE9PSBcInVwZGF0ZVwiKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWRlTWVudSgpO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuXG4gICAgICBwYWdlczogU2Ftc29uLkFwcC5EYXRhLnNpZGVNZW51LnBhZ2VzLFxuICAgICAgc2VsZWN0ZWQ6IFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5zZWxlY3RlZFxuXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgQ29tcG9uZW50IGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSBzaWRlbWVudSBlbGVtZW50XG4gICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX3NpZGVtZW51ID0gdGhpcy5lbGVtZW50O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIENvbXBvbmVudCBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgc2lkZW1lbnUgZWxlbWVudCBmcm9tIHRoZSBjYWNoZVxuICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fc2lkZW1lbnU7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHBhZ2VzLCBzZWxlY3RlZCwgdW5kZWZpbmVkKSB7XG4vLyBpdGVyYXRlIHBhZ2VzXG47KGZ1bmN0aW9uKCl7XG4gIHZhciAkJG9iaiA9IHBhZ2VzO1xuICBpZiAoJ251bWJlcicgPT0gdHlwZW9mICQkb2JqLmxlbmd0aCkge1xuXG4gICAgZm9yICh2YXIgJGluZGV4ID0gMCwgJCRsID0gJCRvYmoubGVuZ3RoOyAkaW5kZXggPCAkJGw7ICRpbmRleCsrKSB7XG4gICAgICB2YXIgcGFnZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuYXR0cihcImRhdGEtcGFnZVwiLCBwYWdlLnBhdGgsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoW1wic2Ftc29uX3NpZGVtZW51X2l0ZW0gXCIgKyAoKHBhZ2UucGF0aCA9PT0gc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJycpKSArIFwiXCJdLCBbdHJ1ZV0pKSArIFwiPjxpXCIgKyAoamFkZS5jbHMoWydmYScscGFnZS5pY29uXSwgW251bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwYWdlLm5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBwYWdlID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wYWdlXCIsIHBhZ2UucGF0aCwgdHJ1ZSwgZmFsc2UpKSArIChqYWRlLmNscyhbXCJzYW1zb25fc2lkZW1lbnVfaXRlbSBcIiArICgocGFnZS5wYXRoID09PSBzZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJykpICsgXCJcIl0sIFt0cnVlXSkpICsgXCI+PGlcIiArIChqYWRlLmNscyhbJ2ZhJyxwYWdlLmljb25dLCBbbnVsbCx0cnVlXSkpICsgXCI+PC9pPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHBhZ2UubmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufS5jYWxsKHRoaXMsXCJwYWdlc1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgucGFnZXM6dHlwZW9mIHBhZ2VzIT09XCJ1bmRlZmluZWRcIj9wYWdlczp1bmRlZmluZWQsXCJzZWxlY3RlZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguc2VsZWN0ZWQ6dHlwZW9mIHNlbGVjdGVkIT09XCJ1bmRlZmluZWRcIj9zZWxlY3RlZDp1bmRlZmluZWQsXCJ1bmRlZmluZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnVuZGVmaW5lZDp0eXBlb2YgdW5kZWZpbmVkIT09XCJ1bmRlZmluZWRcIj91bmRlZmluZWQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi8uLi8uLi8uLi8uLi8uLi9saWInKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdzYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheScsXG4gIHN0eWxlOiB7XG5cbiAgICBcIiNzYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheVwiOiB7XG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjMDAwXCIsXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgXCJ6LWluZGV4XCI6IDEwLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCJcbiAgICB9LFxuXG4gICAgXCIjc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXkuc2hvd1wiOiB7XG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIlxuICAgIH1cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgU2Ftc29uLkFwcC5lbWl0KFwidHJhbnNwYXJlbnQtb3ZlcmxheTpoaXRcIik7XG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzOiB7fSxcblxuICBleHRlbmQ6IHtcblxuICAgIGlzVmlzaWJsZTogZmFsc2UsXG5cbiAgICBoaWRlVHJhbnNwYXJlbnRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93VHJhbnNwYXJlbnRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHRvZ2dsZVRyYW5zcGFyZW50T3ZlcmxheSA6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMuaGlkZVRyYW5zcGFyZW50T3ZlcmxheSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93VHJhbnNwYXJlbnRPdmVybGF5KCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH0sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5zaG93VHJhbnNwYXJlbnRPdmVybGF5KCk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG5cbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmhpZGVUcmFuc3BhcmVudE92ZXJsYXkoKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGNhY2hlIHRoZSB0cmFuc3BhcmVudCBvdmVybGF5IGVsZW1lbnRcbiAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheSA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gZGVsZXRlIHRoZSB0cmFuc3BhcmVudCBvdmVybGF5IGVsZW1lbnQgZnJvbSB0aGUgY2FjaGVcbiAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXk7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxudmFyIGRiID0gcmVxdWlyZSgnLi8uLi8uLi9jb21tb24vbW9kdWxlcy9kYicpO1xudmFyIGF1dG9zaXplID0gcmVxdWlyZSgnYXV0b3NpemUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgcGF0aDogJ2FkZFRvZG9zJyxcbiAgc3ViUGFnZU9mOiBmYWxzZSxcbiAgcHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgYmFja1NhZmU6IHRydWUsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZToge1xuXG4gICAgXCIjYWRkVG9kb3MtcGFnZVwiOiB7XG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMCVcIlxuICAgIH0sXG5cbiAgICBcIi5hZGQtbmV3LXRvZG8tYm94XCI6IHtcbiAgICAgIFwibWFyZ2luXCI6IFwiNDBweCAwIDIwcHggMFwiLFxuICAgICAgXCJwYWRkaW5nXCI6IFwiMCAyMHB4IDAgMjBweFwiLFxuICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIlxuICAgIH0sXG5cbiAgICBcIiNuZXctdG9kby10ZXh0YXJlYVwiOiB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjEuM3JlbVwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiAxLjIsXG4gICAgICBwYWRkaW5nOiBcIjNweFwiLFxuICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBweFwiLFxuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IENvbG9ycy53aGl0ZSxcbiAgICAgIFwiYm9yZGVyLXJhZGl1c1wiOiBcIjVweFwiLFxuICAgICAgXCJib3JkZXJcIjogXCIzcHggc29saWQgXCIgKyBDb2xvcnMuZ3JheVxuICAgIH0sXG5cbiAgICBcIiNuZXctdG9kby1zdWJtaXQtYnV0dG9uXCI6IHtcbiAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICBcImhlaWdodFwiOiBcIjMwcHhcIixcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMudHVycXVvaXNlLFxuICAgICAgXCJib3JkZXItcmFkaXVzXCI6IFwiNXB4XCIsXG4gICAgICBjb2xvcjogQ29sb3JzLndoaXRlLFxuICAgICAgXCJmb250LXNpemVcIjogXCIycmVtXCIsXG4gICAgICBcImxpbmUtaGVpZ2h0XCI6IFwiMzBweFwiLFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwibWlkZGxlXCJcbiAgICB9XG5cbiAgfSxcblxuICBleHRlbmQ6IHtcbiAgICBmdWxsc2NyZWVuOiBmYWxzZSxcbiAgfSxcblxuICBkb21FdmVudHMgOiB7XG5cbiAgICAnaW5wdXQgI25ldy10b2RvLXRleHRhcmVhJzogZnVuY3Rpb24oZSkge1xuXG4gICAgICBhdXRvc2l6ZS51cGRhdGUoQXBwLkRPTS5uZXdfdG9kb190ZXh0YXJlYSk7XG5cbiAgICAgIC8vIHN0b3JlIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBuZXcgVG9EbyBJdGVtXG4gICAgICBBcHAuTW9kZWxzLlRvZG9JdGVtID0gQXBwLkRPTS5uZXdfdG9kb190ZXh0YXJlYS52YWx1ZTtcbiAgICAgIGRiLnNhdmUoXCJUb2RvSXRlbVwiLCBBcHAuRE9NLm5ld190b2RvX3RleHRhcmVhLnZhbHVlKTtcblxuICAgIH0sXG5cbiAgICAndG91Y2ggI25ldy10b2RvLXN1Ym1pdC1idXR0b24nOiBmdW5jdGlvbigpIHtcblxuICAgICAgQXBwLiQoXCIjbmV3LXRvZG8tZm9ybVwiKS50cmlnZ2VyKFwic3VibWl0XCIpO1xuXG4gICAgfSxcblxuICAgICdzdWJtaXQgI25ldy10b2RvLWZvcm0nOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciB0b2RvID0gQXBwLkRPTS5uZXdfdG9kb190ZXh0YXJlYS52YWx1ZTtcblxuICAgICAgQXBwLkRPTS5uZXdfdG9kb190ZXh0YXJlYS52YWx1ZSA9IFwiXCI7XG4gICAgICBBcHAuTW9kZWxzLlRvZG9JdGVtID0gXCJcIjtcbiAgICAgIGRiLnJlbW92ZShcIlRvZG9JdGVtXCIpO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MuYWRkKHRvZG8pO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzIDoge30sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdG9kb19pdGVtOiBBcHAuTW9kZWxzLlRvZG9JdGVtXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIEFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiQWRkIFRvRG9zXCI7XG5cbiAgICAvLyBjaGVjayBpZiBhIFRvZG9JdGVtIGlzIGFscmVhZHkgaW4gbG9jYWxTdG9yYWdlXG4gICAgaWYgKEFwcC5Nb2RlbHMuVG9kb0l0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgQXBwLk1vZGVscy5Ub2RvSXRlbSA9IGRiLmdldChcIlRvZG9JdGVtXCIpIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRE9NLm5ld190b2RvX3RleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby10ZXh0YXJlYVwiKTtcblxuICAgIGF1dG9zaXplKEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZS5kZXN0cm95KEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgZGVsZXRlIEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWE7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHRvZG9faXRlbSkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJhZGQtbmV3LXRvZG8tYm94XFxcIj48Zm9ybSBpZD1cXFwibmV3LXRvZG8tZm9ybVxcXCI+PHRleHRhcmVhIGlkPVxcXCJuZXctdG9kby10ZXh0YXJlYVxcXCIgcm93cz1cXFwiMVxcXCIgcGxhY2Vob2xkZXI9XFxcIkFkZCBhIG5ldyBUb0RvIEl0ZW0gaGVyZS4uLlxcXCIgcmVxdWlyZWQ9XFxcInJlcXVpcmVkXFxcIiBhdXRvZm9jdXM9XFxcImF1dG9mb2N1c1xcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdG9kb19pdGVtKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3RleHRhcmVhPjxkaXYgaWQ9XFxcIm5ldy10b2RvLXN1Ym1pdC1idXR0b25cXFwiPkFkZCBUb0RvIEl0ZW08L2Rpdj48L2Zvcm0+PC9kaXY+XCIpO30uY2FsbCh0aGlzLFwidG9kb19pdGVtXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50b2RvX2l0ZW06dHlwZW9mIHRvZG9faXRlbSE9PVwidW5kZWZpbmVkXCI/dG9kb19pdGVtOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgcGF0aDogJ2hvbWUnLFxuICBzdWJQYWdlT2Y6IGZhbHNlLFxuICBwcmV2aW91c1BhZ2U6IGZhbHNlLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHtcblxuICAgIFwiI2hvbWUtcGFnZVwiOiB7XG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMCVcIlxuICAgIH0sXG5cbiAgICBcIi5hcHAtaW5mb1wiOiB7XG4gICAgICBcIndpZHRoXCI6IFwiODAlXCIsXG4gICAgICBtYXJnaW46IFwiMjBweCBhdXRvIDIwcHggYXV0b1wiLFxuICAgICAgXCJmb250LXNpemVcIjogXCIxLjZyZW1cIixcbiAgICAgIFwibGluZS1oZWlnaHRcIjogMS40XG4gICAgfVxuXG4gIH0sXG5cbiAgZG9tRXZlbnRzIDoge30sXG5cbiAgYXBwRXZlbnRzIDoge30sXG5cbiAgZXh0ZW5kIDoge1xuXG4gIH0sXG5cbiAgLy8gbXVzdCBzeW5jaHJvbm91c2x5IHJldHVybiBhbiBvYmplY3QgdGhhdCB3aWxsIHNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29tcG9uZW50LiB0aGlzIG9iamVjdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgdGVtcGxhdGluZyBlbmdpbmVcbiAgc2V0SW5pdGlhbFN0YXRlIDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBuYW1lOiBcIkhvbWUgUGFnZVwiXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIEFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiVG9EbyBBcHBcIjtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvL3RoaXMudG9wQm94Lm9mZignY2xpY2tlZCcpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJhcHAtaW5mb1xcXCI+VGhpcyBzaW1wbGUgYXBwIHdpbGwgYWxsb3cgeW91IHRvIG1hbmFnZSBhIFRvRG8gTGlzdC4gSGl0IHRoZSBtZW51IGJ1dHRvbiB0byBuYXZpZ2F0ZSB0byB0aGUgXFxcIkFkZCBUb0Rvc1xcXCIgb3IgXFxcIlZpZXcgVG9Eb3NcXFwiIHBhZ2VzLiBBbnkgVG9EbyBpdGVtcyB5b3UgYWRkIHdpbGwgYmUgc3RvcmVkIG9uIHlvdXIgZGV2aWNlLCBzbyB0aGF0IHlvdSBjYW4gYWNjZXNzIHRoZW0gZXZlbiB3aGVuIHlvdSBhcmUgb2ZmbGluZS48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBob21lOiByZXF1aXJlKCcuL2hvbWUnKSxcblxuICBhZGRUb2RvczogcmVxdWlyZSgnLi9hZGRUb2RvcycpLFxuXG4gIHZpZXdUb2RvczogcmVxdWlyZSgnLi92aWV3VG9kb3MnKVxuXG59O1xuIiwiXG52YXIgYXV0b3NpemUgPSByZXF1aXJlKCdhdXRvc2l6ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxucGF0aDogJ3ZpZXdUb2RvcycsXG4gIHN1YlBhZ2VPZjogZmFsc2UsXG4gIHByZXZpb3VzUGFnZTogZmFsc2UsXG4gIGJhY2tTYWZlOiB0cnVlLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHtcblxuICAgIFwiI3ZpZXdUb2Rvcy1wYWdlXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgcGFkZGluZzogXCIyMHB4IDIwcHggMCAyMHB4XCIsXG4gICAgfSxcblxuICAgIFwiLnRvZG8taXRlbVwiOiB7XG4gICAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxuICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiBcIjE1cHhcIixcbiAgICAgIFwid2lkdGhcIjogXCI5MiVcIlxuICAgIH0sXG5cbiAgICBcIi50b2RvLWl0ZW0tdGV4dFwiOiB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogQ29sb3JzLndoaXRlLFxuICAgICAgXCJib3JkZXItcmFkaXVzXCI6IFwiNHB4XCIsXG4gICAgICBwYWRkaW5nOiBcIjNweFwiLFxuICAgICAgXCJmb250LXNpemVcIjogXCIxLjNyZW1cIixcbiAgICAgIFwibGluZS1oZWlnaHRcIjogMS4yLFxuICAgICAgXCJib3JkZXJcIjogXCIzcHggc29saWQgXCIgKyBDb2xvcnMuYmx1ZVxuICAgIH0sXG5cbiAgICBcIi50b2RvLWl0ZW0tcmVtb3ZlLWJ1dHRvblwiOiB7XG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgdG9wOiBcIjZweFwiLCByaWdodDogXCItMjZweFwiLFxuICAgICAgd2lkdGg6IFwiMjBweFwiLFxuICAgICAgaGVpZ2h0OiBcIjIwcHhcIixcbiAgICAgIFwibGluZS1oZWlnaHRcIjogXCIyMHB4XCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjEuNXJlbVwiLFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwibWlkZGxlXCIsXG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogQ29sb3JzLnJlZCxcbiAgICAgIFwiYm9yZGVyLXJhZGl1c1wiOiBcIjVweFwiLFxuICAgICAgY29sb3I6IENvbG9ycy53aGl0ZVxuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICB9LFxuXG4gIGRvbUV2ZW50cyA6IHtcblxuICAgICd0b3VjaCAudG9kby1pdGVtLXJlbW92ZS1idXR0b24nIDogZnVuY3Rpb24oZSwgdGFyZ2V0KSB7XG5cbiAgICAgIHZhciB0b2RvX2lkID0gdGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcblxuICAgICAgLy8gcmVtb3ZlIHRoZSBhdXRvc2l6ZSBsaXN0ZW5lciBvbiB0aGlzIGl0ZW1zIHRleHRhcmVhXG4gICAgICBhdXRvc2l6ZS5kZXN0cm95KHRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKSk7XG5cbiAgICAgIEFwcC5Db2xsZWN0aW9ucy5Ub2Rvcy5yZW1vdmUodG9kb19pZCk7XG4gICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgIH0sXG5cbiAgICAnaW5wdXQgLnRvZG8taXRlbS10ZXh0JzogZnVuY3Rpb24oZSkge1xuXG4gICAgICBhdXRvc2l6ZS51cGRhdGUoZS50YXJnZXQpO1xuXG4gICAgICB2YXIgdG9kb19pZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgIHZhciB0b2RvX3RleHQgPSBlLnRhcmdldC52YWx1ZTtcblxuICAgICAgQXBwLkNvbGxlY3Rpb25zLlRvZG9zLnVwZGF0ZSh0b2RvX2lkLCB0b2RvX3RleHQpO1xuICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICB9LFxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzIDoge30sXG5cbiAgLy8gbXVzdCBzeW5jaHJvbm91c2x5IHJldHVybiBhbiBvYmplY3QgdGhhdCB3aWxsIHNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29tcG9uZW50LiB0aGlzIG9iamVjdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgdGVtcGxhdGluZyBlbmdpbmVcbiAgc2V0SW5pdGlhbFN0YXRlIDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICB0b2RvczogQXBwLkNvbGxlY3Rpb25zLlRvZG9zLmdldEFsbCgpXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIEFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiVmlldyBUb0Rvc1wiO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGV4dGFyZWFcIikpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZS5kZXN0cm95KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZXh0YXJlYVwiKSk7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHRvZG9zLCB1bmRlZmluZWQpIHtcbi8vIGl0ZXJhdGUgdG9kb3NcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gdG9kb3M7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB0b2RvID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5hdHRyKFwiZGF0YS1pZFwiLCB0b2RvLl9pZCwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJ0b2RvLWl0ZW1cXFwiPjx0ZXh0YXJlYSByb3dzPVxcXCIxXFxcIiBjbGFzcz1cXFwidG9kby1pdGVtLXRleHRcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IHRvZG8udGV4dCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC90ZXh0YXJlYT48ZGl2IGNsYXNzPVxcXCJ0b2RvLWl0ZW0tcmVtb3ZlLWJ1dHRvblxcXCI+PGkgY2xhc3M9XFxcImZhIGZhLXRpbWVzXFxcIj48L2k+PC9kaXY+PC9kaXY+XCIpO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHZhciAkJGwgPSAwO1xuICAgIGZvciAodmFyICRpbmRleCBpbiAkJG9iaikge1xuICAgICAgJCRsKys7ICAgICAgdmFyIHRvZG8gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmF0dHIoXCJkYXRhLWlkXCIsIHRvZG8uX2lkLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcInRvZG8taXRlbVxcXCI+PHRleHRhcmVhIHJvd3M9XFxcIjFcXFwiIGNsYXNzPVxcXCJ0b2RvLWl0ZW0tdGV4dFxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdG9kby50ZXh0KSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3RleHRhcmVhPjxkaXYgY2xhc3M9XFxcInRvZG8taXRlbS1yZW1vdmUtYnV0dG9uXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG59LmNhbGwodGhpcyxcInRvZG9zXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50b2Rvczp0eXBlb2YgdG9kb3MhPT1cInVuZGVmaW5lZFwiP3RvZG9zOnVuZGVmaW5lZCxcInVuZGVmaW5lZFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudW5kZWZpbmVkOnR5cGVvZiB1bmRlZmluZWQhPT1cInVuZGVmaW5lZFwiP3VuZGVmaW5lZDp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIvLyBUaW55IEFzeW5jIGxpYnJhcnkgZm9yIHVzZSBpbiBtb2Rlcm4gZW52aXJvbm1lbnRzXG5cbihmdW5jdGlvbigpIHtcblxuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyByb290IGlzIGdsb2JhbCBvbiB0aGUgc2VydmVyLCBhbmQgd2luZG93IGluIHRoZSBicm93c2VyXG4gIHZhciByb290O1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB0aGlzID09PSB3aW5kb3cpIHtcbiAgICByb290ID0gd2luZG93O1xuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gZ2xvYmFsKSB7XG4gICAgcm9vdCA9IGdsb2JhbDtcbiAgfSBlbHNlIHtcbiAgICByb290ID0gdGhpcztcbiAgfVxuXG4gIC8vIGNhY2hlZCBmb3IgcGVyZm9ybWFuY2VcbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gIHZhciBPYmplY3RLZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgLy8gaXNBcnJheSBhbmQgaXNPYmplY3QgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG4gICAgcmV0dXJuIChBcnJheS5pc0FycmF5KGFycikgJiYgYXJyLmxlbmd0aCA+IDApO1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBPYmplY3RLZXlzKG9iaikubGVuZ3RoID4gMCk7XG4gIH1cblxuICBmdW5jdGlvbiBkb0VhY2goYXJyLCBpdGVyYXRvcikge1xuICAgIHZhciBpO1xuICAgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpdGVyYXRvcihhcnJbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYW9sYW4vYXN5bmNcbiAgZnVuY3Rpb24gZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHRocm93IG5ldyBFcnJvcihcIkNhbGxiYWNrIGFscmVhZHkgY2FsbGVkLlwiKTtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseShyb290LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIF9kb09uY2UoZm4pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNhbGxlZCkgcmV0dXJuO1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBhc3luYyA9IHtcblxuICAgIC8vIHJ1bnMgdGhlIHRhc2sgb24gZXZlcnkgaXRlbSBpbiB0aGUgYXJyYXkgYXQgb25jZVxuICAgIGVhY2ggOiBmdW5jdGlvbihhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBfZG9PbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgdmFyIGFtb3VudCA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGlmICghaXNBcnJheShhcnIpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGNvbXBsZXRlZCA9IDA7XG4gICAgICBkb0VhY2goYXJyLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGl0ZXJhdG9yKGl0ZW0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQrKztcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPj0gYW1vdW50KSBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBydW5zIHRocm91Z2ggdGhlIGFycmF5IG9uZSBpdGVtIGF0IGEgdGltZVxuICAgIGVhY2hTZXJpZXMgOiBmdW5jdGlvbihhcnIsIGl0ZXJhdG9yLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBfZG9PbmNlKGNhbGxiYWNrIHx8IG5vb3ApO1xuICAgICAgdmFyIGFtb3VudCA9IGFyci5sZW5ndGg7XG5cbiAgICAgIGlmICghaXNBcnJheShhcnIpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGNvbXBsZXRlZCA9IDA7XG4gICAgICB2YXIgaXRlcmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpdGVyYXRvcihhcnJbY29tcGxldGVkXSwgZG9PbmNlKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG5vb3A7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkIDwgYW1vdW50KSB7XG4gICAgICAgICAgICAgIGl0ZXJhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgICBpdGVyYXRlKCk7XG4gICAgfSxcblxuICAgIC8vIGNhbiBhY2NlcHQgYW4gb2JqZWN0IG9yIGFycmF5XG4gICAgLy8gd2lsbCByZXR1cm4gYW4gb2JqZWN0IG9yIGFycmF5IG9mIHJlc3VsdHMgaW4gdGhlIGNvcnJlY3Qgb3JkZXJcbiAgICBwYXJhbGxlbCA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICB2YXIga2V5czsgdmFyIGxlbmd0aDsgdmFyIGk7IHZhciByZXN1bHRzOyB2YXIga2luZDtcbiAgICAgIHZhciB1cGRhdGVkX3Rhc2tzID0gW107XG4gICAgICB2YXIgaXNfb2JqZWN0O1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuXG4gICAgICBpZiAoaXNBcnJheSh0YXNrcykpIHtcblxuICAgICAgICBsZW5ndGggPSB0YXNrcy5sZW5ndGg7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcblxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh0YXNrcykpIHtcblxuICAgICAgICBpc19vYmplY3QgPSB0cnVlO1xuICAgICAgICBrZXlzID0gT2JqZWN0S2V5cyh0YXNrcyk7XG4gICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0ge307XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGk9MDsgaTxsZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGlmIChpc19vYmplY3QpIHtcbiAgICAgICAgICB1cGRhdGVkX3Rhc2tzLnB1c2goeyBrOiBrZXlzW2ldLCB0OiB0YXNrc1trZXlzW2ldXSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVkX3Rhc2tzLnB1c2goeyBrOiBpLCB0OiB0YXNrc1tpXSB9KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZWRfdGFza3MuZm9yRWFjaChmdW5jdGlvbih0YXNrX29iamVjdCkge1xuXG4gICAgICAgIHRhc2tfb2JqZWN0LnQoZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcblxuICAgICAgICAgIHJlc3VsdHNbdGFza19vYmplY3Qua10gPSByZXN1bHQ7XG5cbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgaWYgKGNvdW50ZXIgPT0gbGVuZ3RoKSBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIC8vIG9ubHkgYWNjZXB0cyBhbiBhcnJheSBzaW5jZSB0aGUgcHJlc2VydmF0aW9uIG9mIHRoZSBvcmRlciBvZiBwcm9wZXJ0aWVzIG9uIGFuIG9iamVjdCBjYW4ndCBiZSBndWFyYW50ZWVkXG4gICAgLy8gcmV0dXJucyBhbiBhcnJheSBvZiByZXN1bHRzIGluIG9yZGVyXG4gICAgc2VyaWVzIDogZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YXNrcykpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICAgICAgZnVuY3Rpb24gcnVuVGFzayhpbmRleCkge1xuICAgICAgICB0YXNrc1tpbmRleF0oZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IHJlc3VsdDtcbiAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxKSByZXR1cm4gcnVuVGFzayhpbmRleCArIDEpO1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJ1blRhc2soMCk7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGFzeW5jO1xuICB9XG4gIC8vIEFNRCAvIFJlcXVpcmVKU1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXN5bmM7XG4gICAgfSk7XG4gIH1cbiAgLy8gaW5jbHVkZWQgZGlyZWN0bHkgdmlhIDxzY3JpcHQ+IHRhZ1xuICBlbHNlIHtcbiAgICByb290LmFzeW5jID0gYXN5bmM7XG4gIH1cblxufSgpKTtcbiIsIi8qIVxuXHRBdXRvc2l6ZSAzLjAuNVxuXHRsaWNlbnNlOiBNSVRcblx0aHR0cDovL3d3dy5qYWNrbG1vb3JlLmNvbS9hdXRvc2l6ZVxuKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJ21vZHVsZSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIG1vZHVsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBtb2QpO1xuXHRcdGdsb2JhbC5hdXRvc2l6ZSA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgbW9kdWxlKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRmdW5jdGlvbiBhc3NpZ24odGEpIHtcblx0XHR2YXIgX3JlZiA9IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMV07XG5cblx0XHR2YXIgX3JlZiRzZXRPdmVyZmxvd1ggPSBfcmVmLnNldE92ZXJmbG93WDtcblx0XHR2YXIgc2V0T3ZlcmZsb3dYID0gX3JlZiRzZXRPdmVyZmxvd1ggPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHNldE92ZXJmbG93WDtcblx0XHR2YXIgX3JlZiRzZXRPdmVyZmxvd1kgPSBfcmVmLnNldE92ZXJmbG93WTtcblx0XHR2YXIgc2V0T3ZlcmZsb3dZID0gX3JlZiRzZXRPdmVyZmxvd1kgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHNldE92ZXJmbG93WTtcblxuXHRcdGlmICghdGEgfHwgIXRhLm5vZGVOYW1lIHx8IHRhLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnIHx8IHRhLmhhc0F0dHJpYnV0ZSgnZGF0YS1hdXRvc2l6ZS1vbicpKSByZXR1cm47XG5cblx0XHR2YXIgaGVpZ2h0T2Zmc2V0ID0gbnVsbDtcblx0XHR2YXIgb3ZlcmZsb3dZID0gJ2hpZGRlbic7XG5cblx0XHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdFx0dmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpO1xuXG5cdFx0XHRpZiAoc3R5bGUucmVzaXplID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdHRhLnN0eWxlLnJlc2l6ZSA9ICdub25lJztcblx0XHRcdH0gZWxzZSBpZiAoc3R5bGUucmVzaXplID09PSAnYm90aCcpIHtcblx0XHRcdFx0dGEuc3R5bGUucmVzaXplID0gJ2hvcml6b250YWwnO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3R5bGUuYm94U2l6aW5nID09PSAnY29udGVudC1ib3gnKSB7XG5cdFx0XHRcdGhlaWdodE9mZnNldCA9IC0ocGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aGVpZ2h0T2Zmc2V0ID0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKCk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gY2hhbmdlT3ZlcmZsb3codmFsdWUpIHtcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ2hyb21lL1NhZmFyaS1zcGVjaWZpYyBmaXg6XG5cdFx0XHRcdC8vIFdoZW4gdGhlIHRleHRhcmVhIHktb3ZlcmZsb3cgaXMgaGlkZGVuLCBDaHJvbWUvU2FmYXJpIGRvIG5vdCByZWZsb3cgdGhlIHRleHQgdG8gYWNjb3VudCBmb3IgdGhlIHNwYWNlXG5cdFx0XHRcdC8vIG1hZGUgYXZhaWxhYmxlIGJ5IHJlbW92aW5nIHRoZSBzY3JvbGxiYXIuIFRoZSBmb2xsb3dpbmcgZm9yY2VzIHRoZSBuZWNlc3NhcnkgdGV4dCByZWZsb3cuXG5cdFx0XHRcdHZhciB3aWR0aCA9IHRhLnN0eWxlLndpZHRoO1xuXHRcdFx0XHR0YS5zdHlsZS53aWR0aCA9ICcwcHgnO1xuXHRcdFx0XHQvLyBGb3JjZSByZWZsb3c6XG5cdFx0XHRcdC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cblx0XHRcdFx0dGEub2Zmc2V0V2lkdGg7XG5cdFx0XHRcdC8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cdFx0XHRcdHRhLnN0eWxlLndpZHRoID0gd2lkdGg7XG5cdFx0XHR9XG5cblx0XHRcdG92ZXJmbG93WSA9IHZhbHVlO1xuXG5cdFx0XHRpZiAoc2V0T3ZlcmZsb3dZKSB7XG5cdFx0XHRcdHRhLnN0eWxlLm92ZXJmbG93WSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGUoKSB7XG5cdFx0XHR2YXIgc3RhcnRIZWlnaHQgPSB0YS5zdHlsZS5oZWlnaHQ7XG5cdFx0XHR2YXIgaHRtbFRvcCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cdFx0XHR2YXIgYm9keVRvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXHRcdFx0dmFyIG9yaWdpbmFsSGVpZ2h0ID0gdGEuc3R5bGUuaGVpZ2h0O1xuXG5cdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG5cblx0XHRcdHZhciBlbmRIZWlnaHQgPSB0YS5zY3JvbGxIZWlnaHQgKyBoZWlnaHRPZmZzZXQ7XG5cblx0XHRcdGlmICh0YS5zY3JvbGxIZWlnaHQgPT09IDApIHtcblx0XHRcdFx0Ly8gSWYgdGhlIHNjcm9sbEhlaWdodCBpcyAwLCB0aGVuIHRoZSBlbGVtZW50IHByb2JhYmx5IGhhcyBkaXNwbGF5Om5vbmUgb3IgaXMgZGV0YWNoZWQgZnJvbSB0aGUgRE9NLlxuXHRcdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSBvcmlnaW5hbEhlaWdodDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0YS5zdHlsZS5oZWlnaHQgPSBlbmRIZWlnaHQgKyAncHgnO1xuXG5cdFx0XHQvLyBwcmV2ZW50cyBzY3JvbGwtcG9zaXRpb24ganVtcGluZ1xuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGh0bWxUb3A7XG5cdFx0XHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IGJvZHlUb3A7XG5cblx0XHRcdHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhLCBudWxsKTtcblxuXHRcdFx0aWYgKHN0eWxlLmhlaWdodCAhPT0gdGEuc3R5bGUuaGVpZ2h0KSB7XG5cdFx0XHRcdGlmIChvdmVyZmxvd1kgIT09ICd2aXNpYmxlJykge1xuXHRcdFx0XHRcdGNoYW5nZU92ZXJmbG93KCd2aXNpYmxlJyk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAob3ZlcmZsb3dZICE9PSAnaGlkZGVuJykge1xuXHRcdFx0XHRcdGNoYW5nZU92ZXJmbG93KCdoaWRkZW4nKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0YXJ0SGVpZ2h0ICE9PSB0YS5zdHlsZS5oZWlnaHQpIHtcblx0XHRcdFx0dmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdFx0XHRldnQuaW5pdEV2ZW50KCdhdXRvc2l6ZTpyZXNpemVkJywgdHJ1ZSwgZmFsc2UpO1xuXHRcdFx0XHR0YS5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGRlc3Ryb3kgPSAoZnVuY3Rpb24gKHN0eWxlKSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlKTtcblx0XHRcdHRhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlKTtcblx0XHRcdHRhLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1hdXRvc2l6ZS1vbicpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6ZGVzdHJveScsIGRlc3Ryb3kpO1xuXG5cdFx0XHRPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdHRhLnN0eWxlW2tleV0gPSBzdHlsZVtrZXldO1xuXHRcdFx0fSk7XG5cdFx0fSkuYmluZCh0YSwge1xuXHRcdFx0aGVpZ2h0OiB0YS5zdHlsZS5oZWlnaHQsXG5cdFx0XHRyZXNpemU6IHRhLnN0eWxlLnJlc2l6ZSxcblx0XHRcdG92ZXJmbG93WTogdGEuc3R5bGUub3ZlcmZsb3dZLFxuXHRcdFx0b3ZlcmZsb3dYOiB0YS5zdHlsZS5vdmVyZmxvd1gsXG5cdFx0XHR3b3JkV3JhcDogdGEuc3R5bGUud29yZFdyYXAgfSk7XG5cblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSk7XG5cblx0XHQvLyBJRTkgZG9lcyBub3QgZmlyZSBvbnByb3BlcnR5Y2hhbmdlIG9yIG9uaW5wdXQgZm9yIGRlbGV0aW9ucyxcblx0XHQvLyBzbyBiaW5kaW5nIHRvIG9ua2V5dXAgdG8gY2F0Y2ggbW9zdCBvZiB0aG9zZSBldmVudHMuXG5cdFx0Ly8gVGhlcmUgaXMgbm8gd2F5IHRoYXQgSSBrbm93IG9mIHRvIGRldGVjdCBzb21ldGhpbmcgbGlrZSAnY3V0JyBpbiBJRTkuXG5cdFx0aWYgKCdvbnByb3BlcnR5Y2hhbmdlJyBpbiB0YSAmJiAnb25pbnB1dCcgaW4gdGEpIHtcblx0XHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlKTtcblx0XHR9XG5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlKTtcblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHVwZGF0ZSk7XG5cdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcignYXV0b3NpemU6dXBkYXRlJywgdXBkYXRlKTtcblx0XHR0YS5zZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0b3NpemUtb24nLCB0cnVlKTtcblxuXHRcdGlmIChzZXRPdmVyZmxvd1kpIHtcblx0XHRcdHRhLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nO1xuXHRcdH1cblx0XHRpZiAoc2V0T3ZlcmZsb3dYKSB7XG5cdFx0XHR0YS5zdHlsZS5vdmVyZmxvd1ggPSAnaGlkZGVuJztcblx0XHRcdHRhLnN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnO1xuXHRcdH1cblxuXHRcdGluaXQoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3kodGEpIHtcblx0XHRpZiAoISh0YSAmJiB0YS5ub2RlTmFtZSAmJiB0YS5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJykpIHJldHVybjtcblx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0ZXZ0LmluaXRFdmVudCgnYXV0b3NpemU6ZGVzdHJveScsIHRydWUsIGZhbHNlKTtcblx0XHR0YS5kaXNwYXRjaEV2ZW50KGV2dCk7XG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGUodGEpIHtcblx0XHRpZiAoISh0YSAmJiB0YS5ub2RlTmFtZSAmJiB0YS5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJykpIHJldHVybjtcblx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0ZXZ0LmluaXRFdmVudCgnYXV0b3NpemU6dXBkYXRlJywgdHJ1ZSwgZmFsc2UpO1xuXHRcdHRhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0fVxuXG5cdHZhciBhdXRvc2l6ZSA9IG51bGw7XG5cblx0Ly8gRG8gbm90aGluZyBpbiBOb2RlLmpzIGVudmlyb25tZW50IGFuZCBJRTggKG9yIGxvd2VyKVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0YXV0b3NpemUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0YXV0b3NpemUgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcblx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLmxlbmd0aCA/IGVsIDogW2VsXSwgZnVuY3Rpb24gKHgpIHtcblx0XHRcdFx0XHRyZXR1cm4gYXNzaWduKHgsIG9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLmxlbmd0aCA/IGVsIDogW2VsXSwgZGVzdHJveSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0XHRhdXRvc2l6ZS51cGRhdGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdGlmIChlbCkge1xuXHRcdFx0XHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsLmxlbmd0aCA/IGVsIDogW2VsXSwgdXBkYXRlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBhdXRvc2l6ZTtcbn0pOyIsbnVsbCwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuamFkZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgamFkZV9lbmNvZGVfaHRtbF9ydWxlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xudmFyIGphZGVfbWF0Y2hfaHRtbCA9IC9bJjw+XCJdL2c7XG5cbmZ1bmN0aW9uIGphZGVfZW5jb2RlX2NoYXIoYykge1xuICByZXR1cm4gamFkZV9lbmNvZGVfaHRtbF9ydWxlc1tjXSB8fCBjO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGphZGVfZXNjYXBlO1xuZnVuY3Rpb24gamFkZV9lc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbCkucmVwbGFjZShqYWRlX21hdGNoX2h0bWwsIGphZGVfZW5jb2RlX2NoYXIpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pOyIsIi8vIFNhbXNvbi5Db21wb25lbnQgY29uc3RydWN0b3IgZnVuY3Rpb25cbi8vIFVzZWQgdG8gc2ltcGxpZnkgY29tcG9uZW50IHJlbmRlcmluZyBhbmQgdHJhbnNpdGlvbnMgaW4gc2luZ2xlIHBhZ2UgYXBwc1xuXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIFNoYXJlZCA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIganNzID0gcmVxdWlyZSgnanNzJyk7XG5cbi8qIG9wdGlvbnMgY2FuIGluY2x1ZGU6XG4vLyBlbCAtIHRoZSBpZCBvZiB0aGUgZWxlbWVudCB0aGF0IHRoZSB2aWV3IHdpbGwgcmVuZGVyIGludG9cbi8vIHRlbXBsYXRlL3JlbmRlciAtIHRoZSBmdW5jdGlvbiB0aGF0IG91dHB1dHMgYW4gSFRNTCBzdHJpbmcgdGhhdCBnZXRzIGF0dGFjaGVkIHRvIHRoZSBET01cbi8vIHN0eWxlIC0gSlNTIHN0eWxlIG9iamVjdFxuLy8gY29tcG9uZW50cyAtIGFueSBvdGhlciBjb21wb25lbnRzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC9yZWZyZXNoZWQgd2l0aCB0aGlzIGNvbXBvbmVudFxuLy8gZXZlbnRzL2RvbUV2ZW50cyAtIGFueSBldmVudExpc3RlbmVycyB0byBhdHRhY2ggdG8gRE9NIG5vZGVzXG4vLyBhcHBFdmVudHMgLSBhbnkgaW50ZXJuYWwgYXBwIGV2ZW50TGlzdGVuZXJzXG4vLyBiZWZvcmVSZW5kZXIgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZCAodXBkYXRlIG1vZGVscywgc29ydCBjb2xsZWN0aW9ucylcbi8vIGFmdGVyUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZCAoc2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UsIG1hcmtlZCBjaGVja2JveGVzIGFzIGNoZWNrZWQpXG4vLyBiZWZvcmVSZW1vdmUgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyByaWdodCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBmdWxseSBkZXN0cm95ZWQgKGNsZWFudXAgbW9kZWxzLCB1cGRhdGUgYWN0aXZpdHkgaGlzdG9yeSlcbi8vIGN1c3RvbS9leHRlbmQgLSBhbiBvYmplY3QgY29udGFpbmluZyBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCBkaXJlY3RseSB0byB0aGUgQ29tcG9uZW50IGluc3RhbmNlIGlmIHRoZXJlIGFyZSBubyBuYW1pbmcgY29uZmxpY3RzIHdpdGggcmVzZXJ2ZWQgcHJvcGVydGllc1xuKi9cblxuZnVuY3Rpb24gU2Ftc29uQ29tcG9uZW50KG9wdGlvbnMpIHtcblxuICAvLyBzZXQgdGhlIGVsZW1lbnQncyBzZWxlY3RvciB0aGF0IHdpbGwgZGV0ZXJtaW5lIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWRcbiAgdGhpcy5lbCA9IChvcHRpb25zLmVsLmNoYXJBdCgwKSA9PT0gXCIjXCIpID8gb3B0aW9ucy5lbC5zbGljZSgxKSA6IG9wdGlvbnMuZWw7XG5cbiAgLy8ganNzIHN0eWxlU2hlZXRcbiAgaWYgKHR5cGVvZiBvcHRpb25zLnN0eWxlID09PSBcIm9iamVjdFwiKSB7XG4gICAgdGhpcy5zdHlsZSA9IGpzcy5jcmVhdGVTdHlsZVNoZWV0KG9wdGlvbnMuc3R5bGUsIHtuYW1lZDogZmFsc2V9KTtcbiAgfVxuXG4gIC8vIHNldCB0aGUgY29tcG9uZW50IGV2ZW50cyBpZiB0aGV5IGFyZSBzcGVjaWZpZWRcbiAgdGhpcy5kb21FdmVudHMgPSBvcHRpb25zLmV2ZW50cyA/IG9wdGlvbnMuZXZlbnRzIDogKG9wdGlvbnMuZG9tRXZlbnRzIHx8IHt9KTtcbiAgdGhpcy5hcHBFdmVudHMgPSBvcHRpb25zLmFwcEV2ZW50cyB8fCB7fTtcblxuICAvLyBzdWJjb21wb25lbnRzXG4gIHRoaXMuc2V0Q29tcG9uZW50cyA9IG9wdGlvbnMuc2V0Q29tcG9uZW50cyB8fCBmdW5jdGlvbigpIHsgcmV0dXJuIChvcHRpb25zLmNvbXBvbmVudHMgfHwge30pOyB9O1xuICB0aGlzLmNvbXBvbmVudHMgPSB0aGlzLnNldENvbXBvbmVudHMoKTtcbiAgdGhpcy5fY29tcG9uZW50c0xvYWRlZCA9IGZhbHNlO1xuXG4gIC8vIHNldEluaXRpYWxTdGF0ZSBmdW5jdGlvblxuICB0aGlzLnNldEluaXRpYWxTdGF0ZSA9IG9wdGlvbnMuc2V0SW5pdGlhbFN0YXRlIHx8IFNoYXJlZC5qdXN0UmV0dXJuT2JqZWN0O1xuICB0aGlzLnN0YXRlID0ge307XG4gIHRoaXMuX2luaXRpYWxTdGF0ZVNldCA9IGZhbHNlO1xuICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSBmYWxzZTtcblxuICB0aGlzLl9sb2FkZWRFdmVudHMgPSBbXTtcblxuICAvLyBzZXQgdGhlIGNvbXBvbmVudCdzIHJlbmRlciBmdW5jdGlvbiB0aGF0IHdpbGwgb3V0cHV0IGFuIGh0bWwgc3RyaW5nXG4gIC8vIGlmIG5vIHJlbmRlciBmdW5jdGlvbiB3YXMgcGFzc2VkIGluLCB3ZSBjaGVjayBmb3IgYSB0ZW1wbGF0ZSBmdW5jdGlvblxuICB0aGlzLl90ZW1wbGF0ZSA9IG9wdGlvbnMucmVuZGVyIHx8IG9wdGlvbnMudGVtcGxhdGU7XG5cbiAgLy8gc2V0IHRoZSBiZWZvcmVSZW5kZXIgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZFxuICB0aGlzLmJlZm9yZVJlbmRlciA9IG9wdGlvbnMuYmVmb3JlUmVuZGVyIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gc2V0IHRoZSBhZnRlclJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYWZ0ZXJSZW5kZXIgPSBvcHRpb25zLmFmdGVyUmVuZGVyIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gc2V0IHRoZSByZW1vdmUvY2xvc2UgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZCwgb3RoZXJ3aXNlIGp1c3QgaW52b2tlIGNhbGxiYWNrXG4gIHRoaXMuYmVmb3JlUmVtb3ZlID0gb3B0aW9ucy5iZWZvcmVSZW1vdmUgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBhZGQgYW55IHJvdXRlci1yZWxhdGVkIHRhc2tzXG4gIHRoaXMuX3V1aWQgPSB0aGlzLmVsICsgXCItXCIgKyBEYXRlLm5vdygpOyAvLyB0aGUgdXVpZCBhbGxvd3MgdXMgdG8gZWFzaWx5IHJlZmVyZW5jZSB0aGUgYWRkZWQgcm91dGVyIHRhc2tzXG4gIHRoaXMuX3JvdXRlciA9IG9wdGlvbnMuUm91dGVyIHx8IG9wdGlvbnMucm91dGVyIHx8IHt9O1xuICBTaGFyZWQuYWRkUm91dGVyVGFza3ModGhpcyk7XG5cbiAgLy8gYWRkIGFueSB1bnJlc2VydmVkIHByb3BlcnRpZXMgcGFzc2VkIGludG8gdGhlIGN1c3RvbSBvciBleHRlbmQgb2JqZWN0XG4gIHZhciBjdXN0b20gPSBvcHRpb25zLmV4dGVuZCB8fCBvcHRpb25zLmN1c3RvbSB8fCB7fTtcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIGN1c3RvbSwgU2hhcmVkLnJlc2VydmVkKTtcblxufVxuXG4vLyBIYXZlIHRoZSBTYW1zb25Db21wb25lbnQgY2xhc3MgaW5oZXJpdCBhbnkgc2hhcmVkIG1ldGhvZHMgZnJvbSBQYWdlQ29tcG9uZW50QmFzZVxuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fdHlwZSA9IFwiQ29tcG9uZW50XCI7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gU2hhcmVkLnNldFN0YXRlO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5yZXNldFN0YXRlID0gU2hhcmVkLnJlc2V0U3RhdGU7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9kb0ZpcnN0ID0gU2hhcmVkLl9kb0ZpcnN0O1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fbG9hZEV2ZW50cyA9IFNoYXJlZC5fbG9hZEV2ZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2Rlc3Ryb3lFdmVudHMgPSBTaGFyZWQuX2Rlc3Ryb3lFdmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9sb2FkQ29tcG9uZW50cyA9IFNoYXJlZC5fbG9hZENvbXBvbmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9yZW5kZXJDb21wb25lbnRzID0gU2hhcmVkLl9yZW5kZXJDb21wb25lbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fZGVzdHJveUNvbXBvbmVudHMgPSBTaGFyZWQuX2Rlc3Ryb3lDb21wb25lbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fcmVtb3ZlID0gU2hhcmVkLl9yZW1vdmU7XG5cbi8vIHJlbmRlciB0aGUgY29tcG9uZW50IHRvIHRoZSBET01cblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5fbG9hZENvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgIHNlbGYuX2RvRmlyc3QoXCJiZWZvcmVSZW5kZXJcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGlmICghc2VsZi5faW5pdGlhbFN0YXRlU2V0KSB7XG4gICAgICAgIHNlbGYuc3RhdGUgPSBzZWxmLnNldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICBzZWxmLl9pbml0aWFsU3RhdGVTZXQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChzZWxmLnN0eWxlKSBzZWxmLnN0eWxlLmF0dGFjaCgpOyAvLyBsb2FkIHRoZSBzdHlsZXNoZWV0IG9uIGZpcnN0IHJlbmRlclxuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIGNvbXBvbmVudCBlbGVtZW50XG4gICAgICBpZiAoIXNlbGYuZWxlbWVudCB8fCAoZm9yY2VfdXBkYXRlIHx8IHNlbGYuX3N0YXRlQ2hhbmdlZCkpIHtcbiAgICAgICAgZm9yY2VfdXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZi5lbCk7XG5cbiAgICAgICAgaWYgKCFzZWxmLmVsZW1lbnQpIHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTm8gZWxlbWVudCB3aXRoIHRoZSBpZCBcIiArIHNlbGYuZWwgKyBcIiBleGlzdHMgaW4gdGhlIERPTSBzbyB3ZSB3aWxsIGNyZWF0ZSBpdCBhbmQgYXBwZW5kIGl0IHRvIGl0cyBwYXJlbnQuXCIpO1xuICAgICAgICAgIHNlbGYuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgc2VsZi5lbGVtZW50LmlkID0gc2VsZi5lbDtcblxuICAgICAgICAgIGlmIChzZWxmLl90ZW1wbGF0ZSkge1xuICAgICAgICAgICAgc2VsZi5lbGVtZW50LmlubmVySFRNTCA9IHNlbGYuX3RlbXBsYXRlKHNlbGYuc3RhdGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLnBhcmVudCAmJiBzZWxmLnBhcmVudC5lbGVtZW50KSB7XG4gICAgICAgICAgICBzZWxmLnBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKHNlbGYuZWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUgaXMgbm8gcGFyZW50IHRvIGFwcGVuZCBcIiArIHNlbGYuZWwgKyBcIiB0by5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHNlbGYuX3RlbXBsYXRlKSB7XG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgc2VsZi5fbG9hZEV2ZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgICBzZWxmLl9yZW5kZXJDb21wb25lbnRzKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAvLyByZXNldCBzdGF0ZUNoYW5nZWRcbiAgICAgICAgICBzZWxmLl9zdGF0ZUNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlclJlbmRlclwiLCBmdW5jdGlvbigpIHsgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpOyB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb25Db21wb25lbnQ7XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQWRkRXZlbnRzKHRhcmdldCkge1xuXG4gIHZhciBldmVudHMgPSB7fTsgdmFyIGVtcHR5ID0gW107XG5cbiAgLy8gc3RhcnQgbGlzdGVuaW5nXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIsIGNvbnRleHQpIHtcbiAgICAoZXZlbnRzW3R5cGVdID0gZXZlbnRzW3R5cGVdIHx8IFtdKS5wdXNoKFtoYW5kbGVyLCBjb250ZXh0XSk7XG4gIH07XG5cbiAgLy8gc3RvcCBsaXN0ZW5pbmdcbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICB0eXBlIHx8IChldmVudHMgPSB7fSlcbiAgICB2YXIgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSxcbiAgICBpID0gbGlzdC5sZW5ndGggPSBoYW5kbGVyID8gbGlzdC5sZW5ndGggOiAwXG4gICAgd2hpbGUoaS0tKSBoYW5kbGVyID09IGxpc3RbaV1bMF0gJiYgbGlzdC5zcGxpY2UoaSwxKVxuICB9O1xuXG4gIC8vIHNlbmQgdGhlIGV2ZW50IHRvIGFueW9uZSBsaXN0ZW5pbmdcbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgYXJncyA9IGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LCBpPTAsIGpcbiAgICB3aGlsZShqPWxpc3RbaSsrXSkgalswXS5hcHBseShqWzFdLCBhcmdzKVxuICB9O1xuXG59O1xuIiwiLyohXG4gKiBTYW1zb24uanNcbiAqIENvcHlyaWdodChjKSAyMDE1IFNhbSBEZWxnYWRvXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgJCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9xdW8uanMnKTtcbnZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jLWxpdGUnKTtcblxuLy8gSlNTIGFuZCBwbHVnaW5zXG52YXIganNzID0gcmVxdWlyZSgnanNzJyk7XG52YXIganNzVmVuZG9yUHJlZml4ZXIgPSByZXF1aXJlKCdqc3MtdmVuZG9yLXByZWZpeGVyJyk7XG52YXIganNzRXh0ZW5kID0gcmVxdWlyZSgnanNzLWV4dGVuZCcpO1xuanNzLnVzZShqc3NWZW5kb3JQcmVmaXhlcik7XG5qc3MudXNlKGpzc0V4dGVuZCk7XG5cbnZhciBjc3NfcmVzZXQgPSByZXF1aXJlKCcuL3N0eWxlcy9yZXNldCcpO1xudmFyIGJhc2Vfc3R5bGVzID0gcmVxdWlyZSgnLi9zdHlsZXMvYmFzZV9zdHlsZXMnKTtcblxuLy8gcmVzZXJ2ZWQgcHJvcGVydGllcyBmb3IgdGhlIFNhbXNvbi5BcHAgb2JqZWN0LiBhbGwgcHJvcGVydGllcyBzdGFydGluZyB3aXRoIF8gYXJlIGFsc28gcmVzZXJ2ZWRcbnZhciByZXNlcnZlZCA9IFtcIiRcIiwgXCJET01cIiwgXCJEYXRhXCIsIFwic3R5bGVTaGVldFwiLCBcImJhc2VTdHlsZVwiLCBcInN0eWxlXCIsIFwiY29tcG9uZW50c1wiLCBcInNldENvbXBvbmVudHNcIiwgXCJSb3V0ZXJcIiwgXCJQYWdlc1wiLCBcIm9uXCIsIFwiZW1pdFwiLCBcIm9mZlwiXTtcblxuLy8gY3JlYXRlIHRoZSBTYW1zb24gb2JqZWN0IHRoYXQgd2lsbCBiZSBleHBvcnRlZFxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb24gPSB7fTtcblxuU2Ftc29uLlZFUlNJT04gPSAnMC4xLjInOyAvLyBrZWVwIGluIHN5bmMgd2l0aCBwYWNrYWdlLmpzb25cblxuU2Ftc29uLkV2ZW50cyA9IHJlcXVpcmUoJy4vZXZlbnRzJyk7IC8vIGEgbWl4aW4gdGhhdCB3aWxsIGF0dGFjaCBvbiwgb2ZmLCBhbmQgZW1pdCBtZXRob2RzIHRvIGFuIG9iamVjdFxuXG5TYW1zb24uUm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcblNhbXNvbi5jcmVhdGVSb3V0ZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciByb3V0ZXIgPSBuZXcgU2Ftc29uLlJvdXRlcihvcHRpb25zKTtcbiAgcmV0dXJuIHJvdXRlcjtcbn07XG5cblNhbXNvbi5QYWdlID0gcmVxdWlyZSgnLi9wYWdlJyk7XG5TYW1zb24uY3JlYXRlUGFnZSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGFkZF9ldmVudHMpIHtcbiAgdmFyIHBhZ2UgPSBuZXcgU2Ftc29uLlBhZ2Uob3B0aW9ucyk7XG4gIGlmIChhZGRfZXZlbnRzKSBTYW1zb24uRXZlbnRzKHBhZ2UpO1xuICByZXR1cm4gcGFnZTtcbn07XG5cblNhbXNvbi5Db21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudCcpO1xuU2Ftc29uLmNyZWF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uKG9wdGlvbnMsIGFkZF9ldmVudHMpIHtcbiAgdmFyIGNvbXBvbmVudCA9IG5ldyBTYW1zb24uQ29tcG9uZW50KG9wdGlvbnMpO1xuICBpZiAoYWRkX2V2ZW50cykgU2Ftc29uLkV2ZW50cyhjb21wb25lbnQpO1xuICByZXR1cm4gY29tcG9uZW50O1xufTtcblxuLy8gU2Ftc29uLkRPTSB3aWxsIGNhY2hlIHJlZmVyZW5jZXMgdG8gYW55IFNhbXNvbiBjcmVhdGVkIERPTSBlbGVtZW50cyBsaWtlICNzYW1zb24tYXBwXG5TYW1zb24uRE9NID0ge307XG5cbi8vIHRoZSBpbnN0YW50aWF0ZWQgYXBwIHdpbGwgYmUgYXR0YWNoZWQgdG8gU2Ftc29uLkFwcCBmb3IgcXVpY2sgYWNjZXNzXG5TYW1zb24uQXBwO1xuXG4vLyBvbmx5IG9uZSBTYW1zb24gQXBwIGNhbiBleGlzdCBhdCBhIHRpbWUsIHNvIGlmIG9uZSBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQsIHNpbXBseSByZXR1cm4gaXRcblNhbXNvbi5jcmVhdGVBcHAgPSBmdW5jdGlvbigpIHtcbiAgaWYgKFNhbXNvbi5BcHApIHtcbiAgICByZXR1cm4gU2Ftc29uLkFwcDtcbiAgfSBlbHNlIHtcbiAgICBTYW1zb24uQXBwID0gbmV3IFNhbXNvbkFwcCgpO1xuICAgIFNhbXNvbi5FdmVudHMoU2Ftc29uLkFwcCk7IC8vIG1ha2UgdGhlIG1haW4gYXBwIG9iamVjdCBhbiBldmVudCBidXNcbiAgICBTYW1zb24uQXBwLkRPTSA9IFNhbXNvbi5ET007XG4gICAgcmV0dXJuIFNhbXNvbi5BcHA7XG4gIH1cbn07XG5cbi8vIHRoZSBTYW1zb25BcHAgY2xhc3NcbmZ1bmN0aW9uIFNhbXNvbkFwcCgpIHtcbiAgdGhpcy5faXNDb25maWd1cmVkID0gZmFsc2U7XG59XG5cblNhbXNvbkFwcC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLl9pc0NvbmZpZ3VyZWQpIHtcblxuICAgIC8vIGFkZCBRdW9KUyB0byB0aGUgYXBwIG9iamVjdCBmb3IgcXVpY2sgYWNjZXNzXG4gICAgdGhpcy4kID0gJDtcblxuICAgIC8vIGxvYWQgdGhlIGNzcyByZXNldCBhbmQgc2V0dXAgdGhlIGFwcCdzIGJhc2Ugc3R5bGVzXG4gICAgYmFzZV9zdHlsZXMgPSBvcHRpb25zLmJhc2Vfc3R5bGVzIHx8IGJhc2Vfc3R5bGVzO1xuXG4gICAgdGhpcy5iYXNlU3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldChjc3NfcmVzZXQsIHtuYW1lZDogZmFsc2V9KTtcbiAgICB0aGlzLmJhc2VTdHlsZS5hZGRSdWxlcyhiYXNlX3N0eWxlcyk7XG4gICAgdGhpcy5iYXNlU3R5bGUuYXR0YWNoKCk7XG5cbiAgICB0aGlzLnN0eWxlU2hlZXQgPSBvcHRpb25zLnN0eWxlIHx8IHt9O1xuICAgIHRoaXMuc3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldCh0aGlzLnN0eWxlU2hlZXQsIHtuYW1lZDogZmFsc2V9KTtcbiAgICB0aGlzLnN0eWxlLmF0dGFjaCgpO1xuXG4gICAgLy8gYWRkIGFueSBmb250cyB0byB0aGUgc3R5bGVzaGVldFxuICAgIHRoaXMuZm9udHMgPSB7fTtcbiAgICB2YXIgZm9udDtcbiAgICBmb3IgKGZvbnQgaW4gb3B0aW9ucy5mb250cykge1xuICAgICAgdGhpcy5mb250c1tmb250XSA9IGpzcy5jcmVhdGVTdHlsZVNoZWV0KG9wdGlvbnMuZm9udHNbZm9udF0sIHtuYW1lZDogZmFsc2V9KS5hdHRhY2goKTtcbiAgICB9XG5cbiAgICAvLyBzZXR1cCB0aGUgYXBwJ3MgRGF0YSBvYmplY3RcbiAgICB0aGlzLkRhdGEgPSBvcHRpb25zLkRhdGEgfHwgb3B0aW9ucy5kYXRhIHx8IHt9O1xuXG4gICAgLy8gc2V0dXAgdGhlIGFwcCdzIHBhZ2VzXG4gICAgdGhpcy5QYWdlcyA9IG9wdGlvbnMuUGFnZXMgfHwgb3B0aW9ucy5wYWdlcyB8fCB7fTtcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyBiYXNlIGNvbXBvbmVudHNcbiAgICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgICB0aGlzLmNvbXBvbmVudHMgPSB0aGlzLnNldENvbXBvbmVudHMoKTtcblxuICAgIC8qIEZpcnN0IHNldHVwIHRoZSByZXF1aXJlZCBET00gZWxlbWVudHMgYW5kIGNvbXBvbmVudHMgb2YgYSBTYW1zb24gQXBwICovXG5cbiAgICAvLyBhZGQgdGhlIGNvcmUgZGl2cyB0byB0aGUgYm9keVxuICAgIC8vICNzYW1zb25fYXBwLCAjc2Ftc29uX3BhZ2VzLCAjc2Ftc29uX3BhZ2VfMSwgI3NhbXNvbl9wYWdlXzIsICNzYW1zb25fZmFkZWRfb3ZlcmxheSwgI3NhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9hcHAuaWQgPSBcInNhbXNvbl9hcHBcIjtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5pZCA9IFwic2Ftc29uX3BhZ2VzXCI7XG5cbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5pZCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5jbGFzc0xpc3QuYWRkKFwic2Ftc29uLXBhZ2VcIiwgXCJhY3RpdmVcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8xKTtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmlkID0gXCJzYW1zb25fcGFnZV8yXCI7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmNsYXNzTGlzdC5hZGQoXCJzYW1zb24tcGFnZVwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5hcHBlbmRDaGlsZChTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzIpO1xuXG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fYXBwKTsgLy8gYWRkIHRoZSBiYXNlIGRpdnMgdG8gdGhlIGJvZHlcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyByb3V0ZXIgYWZ0ZXIgbG9hZGluZyBhbnkgZXh0cmEgY29tcG9uZW50c1xuICAgIHRoaXMuUm91dGVyID0gU2Ftc29uLmNyZWF0ZVJvdXRlcihvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fSk7XG5cbiAgICAvLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyBwYXNzZWQgaW50byB0aGUgY3VzdG9tL2V4dGVuZCBvYmplY3RcbiAgICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gICAgVXRpbHMuZXh0ZW5kKHRoaXMsIGN1c3RvbSwgcmVzZXJ2ZWQpO1xuXG4gICAgLy8gTG9hZCBhbnkgb3RoZXIgY29tcG9uZW50c1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc2VsZi5jb21wb25lbnRzKTtcbiAgICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgICAgc2VsZltrZXldID0gU2Ftc29uLmNyZWF0ZUNvbXBvbmVudChzZWxmLmNvbXBvbmVudHNba2V5XSk7XG4gICAgICBzZWxmW2tleV0ucGFyZW50ID0ge2VsZW1lbnQ6IFNhbXNvbi5ET00uc2Ftc29uX2FwcCwgZGVsZWdhdGU6ICQoU2Ftc29uLkRPTS5zYW1zb25fYXBwKX07XG5cbiAgICAgIHNlbGZba2V5XS5fcmVuZGVyKGZhbHNlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2IoKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIHRoZSBTYW1zb24gQXBwIGlzIG5vdyBjb25maWd1cmVkXG4gICAgICBzZWxmLl9pc0NvbmZpZ3VyZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgU2Ftc29uIEFwcCBoYXMgYWxyZWFkeSBiZWVuIGNvbmZpZ3VyZWQhXCIpO1xuICB9XG5cbn07XG4iLCIvKipcbiAqIFF1b0pTIC0gTWljcm8gI0phdmFTY3JpcHQgTGlicmFyeSBmb3IgTW9iaWxlIERldmljZXMuXG4gKiBAdmVyc2lvbiB2My4wLjdcbiAqIEBsaW5rICAgIGh0dHA6Ly9xdW9qcy50YXBxdW8uY29tXG4gKiBAYXV0aG9yICBKYXZpIEppbWVuZXogVmlsbGFyIChAc295amF2aSkgKGh0dHBzOi8vdHdpdHRlci5jb20vc295amF2aSlcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdCxuPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKHQpe2Zvcih2YXIgbj0wLGU9dGhpcy5sZW5ndGg7ZT5uO24rKylpZihuIGluIHRoaXMmJnRoaXNbbl09PT10KXJldHVybiBuO3JldHVybi0xfTt0PWZ1bmN0aW9uKCl7dmFyIHQsbixlLHIsaSx1LG8sYSxjLGwscyxmLGgsZCxwLHYsZztyZXR1cm4gcj1bXSxhPU9iamVjdC5wcm90b3R5cGUsbz0vXlxccyo8KFxcdyt8ISlbXj5dKj4vLGU9WzEsOSwxMV0sbj0vXlxcLihbXFx3LV0rKSQvLHU9L14jW1xcd1xcZC1dKyQvLHM9L15bXFx3LV0rJC8sYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiksbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIiksaT17dHI6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpLHRib2R5OmMsdGhlYWQ6Yyx0Zm9vdDpjLHRkOmwsdGg6bCxcIipcIjpkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpfSx0PWZ1bmN0aW9uKG4sZSl7dmFyIHI7cmV0dXJuIG4/XCJmdW5jdGlvblwiPT09dC50b1R5cGUobik/dChkb2N1bWVudCkucmVhZHkobik6KHI9cChuLGUpLHYocixuKSk6digpfSx0LnF1ZXJ5PWZ1bmN0aW9uKHQsZSl7dmFyIHI7cmV0dXJuIG4udGVzdChlKT9yPXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShlLnJlcGxhY2UoXCIuXCIsXCJcIikpOnMudGVzdChlKT9yPXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dS50ZXN0KGUpJiZ0PT09ZG9jdW1lbnQ/KHI9dC5nZXRFbGVtZW50QnlJZChlLnJlcGxhY2UoXCIjXCIsXCJcIikpLHJ8fChyPVtdKSk6cj10LnF1ZXJ5U2VsZWN0b3JBbGwoZSksci5ub2RlVHlwZT9bcl06QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocil9LHQuZXh0ZW5kPWZ1bmN0aW9uKHQpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgZSxyO3I9W107Zm9yKGUgaW4gbilyLnB1c2godFtlXT1uW2VdKTtyZXR1cm4gcn0pLHR9LHQudG9UeXBlPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPWEudG9TdHJpbmcuY2FsbCh0KS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLyksbi5sZW5ndGg+MT9uWzFdLnRvTG93ZXJDYXNlKCk6XCJvYmplY3RcIn0sdC5lYWNoPWZ1bmN0aW9uKG4sZSl7dmFyIHIsaSx1LG8sYTtpZihpPXZvaWQgMCxvPXZvaWQgMCxcImFycmF5XCI9PT10LnRvVHlwZShuKSlmb3IoaT11PTAsYT1uLmxlbmd0aDthPnU7aT0rK3Upcj1uW2ldLGUuY2FsbChyLGkscik9PT0hMTtlbHNlIGZvcihvIGluIG4pZS5jYWxsKG5bb10sbyxuW29dKT09PSExO3JldHVybiBufSx0Lm1hcD1mdW5jdGlvbihuLGUpe3ZhciByLGksdSxvO2lmKG89W10scj12b2lkIDAsaT12b2lkIDAsXCJhcnJheVwiPT09dC50b1R5cGUobikpZm9yKHI9MDtyPG4ubGVuZ3RoOyl1PWUobltyXSxyKSxudWxsIT11JiZvLnB1c2godSkscisrO2Vsc2UgZm9yKGkgaW4gbil1PWUobltpXSxpKSxudWxsIT11JiZvLnB1c2godSk7cmV0dXJuIGgobyl9LHQubWl4PWZ1bmN0aW9uKCl7dmFyIHQsbixlLHIsaTtmb3IoZT17fSx0PTAscj1hcmd1bWVudHMubGVuZ3RoO3I+dDspe249YXJndW1lbnRzW3RdO2ZvcihpIGluIG4pZyhuLGkpJiZ2b2lkIDAhPT1uW2ldJiYoZVtpXT1uW2ldKTt0Kyt9cmV0dXJuIGV9LHY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gbnVsbD09biYmKG49XCJcIiksdD10fHxyLHQuc2VsZWN0b3I9bix0Ll9fcHJvdG9fXz12LnByb3RvdHlwZSx0fSxwPWZ1bmN0aW9uKG4scil7dmFyIGksdTtyZXR1cm4gaT1udWxsLHU9dC50b1R5cGUobiksXCJhcnJheVwiPT09dT9pPWYobik6XCJzdHJpbmdcIj09PXUmJm8udGVzdChuKT8oaT1kKG4udHJpbSgpLFJlZ0V4cC4kMSksbj1udWxsKTpcInN0cmluZ1wiPT09dT8oaT10LnF1ZXJ5KGRvY3VtZW50LG4pLHImJihpPTE9PT1pLmxlbmd0aD90LnF1ZXJ5KGlbMF0scik6dC5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdC5xdWVyeShpLHIpfSkpKTooZS5pbmRleE9mKG4ubm9kZVR5cGUpPj0wfHxuPT09d2luZG93KSYmKGk9W25dLG49bnVsbCksaX0sZD1mdW5jdGlvbihuLGUpe3ZhciByO3JldHVybiBudWxsPT1lJiYoZT1cIipcIiksZSBpbiBpfHwoZT1cIipcIikscj1pW2VdLHIuaW5uZXJIVE1MPVwiXCIrbix0LmVhY2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoci5jaGlsZE5vZGVzKSxmdW5jdGlvbigpe3JldHVybiByLnJlbW92ZUNoaWxkKHRoaXMpfSl9LGY9ZnVuY3Rpb24odCl7cmV0dXJuIHQuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P3Q6dm9pZCAwfSl9LGg9ZnVuY3Rpb24odCl7cmV0dXJuIHQubGVuZ3RoPjA/ci5jb25jYXQuYXBwbHkocix0KTp0fSxnPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGEuaGFzT3duUHJvcGVydHkuY2FsbCh0LG4pfSx2LnByb3RvdHlwZT10LmZuPXt9LHQuZm4uZWFjaD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuY2FsbChuLGUsbil9KSx0aGlzfSx0LmZuLmZpbHRlcj1mdW5jdGlvbihuKXtyZXR1cm4gdChyLmZpbHRlci5jYWxsKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIGUucGFyZW50Tm9kZSYmdC5xdWVyeShlLnBhcmVudE5vZGUsbikuaW5kZXhPZihlKT49MH0pKX0sdC5mbi5mb3JFYWNoPXIuZm9yRWFjaCx0LmZuLmluZGV4T2Y9ci5pbmRleE9mLHQudmVyc2lvbj1cIjMuMC43XCIsdH0oKSx0aGlzLlF1bz10aGlzLiQkPXQsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZSYmKG1vZHVsZS5leHBvcnRzPXQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gbj17VFlQRTpcIkdFVFwiLE1JTUU6XCJqc29uXCJ9LHI9e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdFwiLGpzb246XCJhcHBsaWNhdGlvbi9qc29uXCIseG1sOlwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLGh0bWw6XCJ0ZXh0L2h0bWxcIix0ZXh0OlwidGV4dC9wbGFpblwifSxlPTAsdC5hamF4U2V0dGluZ3M9e3R5cGU6bi5UWVBFLGFzeW5jOiEwLHN1Y2Nlc3M6e30sZXJyb3I6e30sY29udGV4dDpudWxsLGRhdGFUeXBlOm4uTUlNRSxoZWFkZXJzOnt9LHhocjpmdW5jdGlvbigpe3JldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0fSxjcm9zc0RvbWFpbjohMSx0aW1lb3V0OjB9LHQuYWpheD1mdW5jdGlvbihlKXt2YXIgcixvLGMsZjtpZihjPXQubWl4KHQuYWpheFNldHRpbmdzLGUpLGMudHlwZT09PW4uVFlQRT9jLnVybCs9dC5zZXJpYWxpemUoYy5kYXRhLFwiP1wiKTpjLmRhdGE9dC5zZXJpYWxpemUoYy5kYXRhKSxpKGMudXJsKSlyZXR1cm4gdShjKTtmPWMueGhyKCksZi5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtyZXR1cm4gND09PWYucmVhZHlTdGF0ZT8oY2xlYXJUaW1lb3V0KHIpLHMoZixjKSk6dm9pZCAwfSxmLm9wZW4oYy50eXBlLGMudXJsLGMuYXN5bmMpLGwoZixjKSxjLnRpbWVvdXQ+MCYmKHI9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBoKGYsYyl9LGMudGltZW91dCkpO3RyeXtmLnNlbmQoYy5kYXRhKX1jYXRjaChkKXtvPWQsZj1vLGEoXCJSZXNvdXJjZSBub3QgZm91bmRcIixmLGMpfXJldHVybiBmfSx0LmdldD1mdW5jdGlvbihuLGUscixpKXtyZXR1cm4gdC5hamF4KHt1cmw6bixkYXRhOmUsc3VjY2VzczpyLGRhdGFUeXBlOml9KX0sdC5wb3N0PWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiUE9TVFwiLHQsbixlLHIpfSx0LnB1dD1mdW5jdGlvbih0LG4sZSxyKXtyZXR1cm4gYyhcIlBVVFwiLHQsbixlLHIpfSx0W1wiZGVsZXRlXCJdPWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiREVMRVRFXCIsdCxuLGUscil9LHQuanNvbj1mdW5jdGlvbihuLGUscil7cmV0dXJuIHQuYWpheCh7dXJsOm4sZGF0YTplLHN1Y2Nlc3M6cn0pfSx0LnNlcmlhbGl6ZT1mdW5jdGlvbih0LG4pe3ZhciBlLHI7bnVsbD09biYmKG49XCJcIikscj1uO2ZvcihlIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShlKSYmKHIhPT1uJiYocis9XCImXCIpLHIrPWVuY29kZVVSSUNvbXBvbmVudChlKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQodFtlXSkpO3JldHVybiByPT09bj9cIlwiOnJ9LHU9ZnVuY3Rpb24obil7dmFyIHIsaSx1LG87cmV0dXJuIG4uYXN5bmM/KGk9XCJqc29ucFwiKyArK2UsdT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLG89e2Fib3J0OmZ1bmN0aW9uKCl7cmV0dXJuIHQodSkucmVtb3ZlKCksaSBpbiB3aW5kb3c/d2luZG93W2ldPXt9OnZvaWQgMH19LHI9dm9pZCAwLHdpbmRvd1tpXT1mdW5jdGlvbihlKXtyZXR1cm4gY2xlYXJUaW1lb3V0KHIpLHQodSkucmVtb3ZlKCksZGVsZXRlIHdpbmRvd1tpXSxmKGUsbyxuKX0sdS5zcmM9bi51cmwucmVwbGFjZShSZWdFeHAoXCI9XFxcXD9cIiksXCI9XCIraSksdChcImhlYWRcIikuYXBwZW5kKHUpLG4udGltZW91dD4wJiYocj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIGgobyxuKX0sbi50aW1lb3V0KSksbyk6Y29uc29sZS5lcnJvcihcIlF1b0pTLmFqYXg6IFVuYWJsZSB0byBtYWtlIGpzb25wIHN5bmNocm9ub3VzIGNhbGwuXCIpfSxzPWZ1bmN0aW9uKHQsbil7dC5zdGF0dXM+PTIwMCYmdC5zdGF0dXM8MzAwfHwwPT09dC5zdGF0dXM/bi5hc3luYyYmZihvKHQsbiksdCxuKTphKFwiUXVvSlMuYWpheDogVW5zdWNjZXNmdWwgcmVxdWVzdFwiLHQsbil9LGY9ZnVuY3Rpb24odCxuLGUpe2Uuc3VjY2Vzcy5jYWxsKGUuY29udGV4dCx0LG4pfSxhPWZ1bmN0aW9uKHQsbixlKXtlLmVycm9yLmNhbGwoZS5jb250ZXh0LHQsbixlKX0sbD1mdW5jdGlvbih0LG4pe3ZhciBlO24uY29udGVudFR5cGUmJihuLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl09bi5jb250ZW50VHlwZSksbi5kYXRhVHlwZSYmKG4uaGVhZGVycy5BY2NlcHQ9cltuLmRhdGFUeXBlXSk7Zm9yKGUgaW4gbi5oZWFkZXJzKXQuc2V0UmVxdWVzdEhlYWRlcihlLG4uaGVhZGVyc1tlXSl9LGg9ZnVuY3Rpb24odCxuKXt0Lm9ucmVhZHlzdGF0ZWNoYW5nZT17fSx0LmFib3J0KCksYShcIlF1b0pTLmFqYXg6IFRpbWVvdXQgZXhjZWVkZWRcIix0LG4pfSxjPWZ1bmN0aW9uKG4sZSxyLGksdSl7cmV0dXJuIHQuYWpheCh7dHlwZTpuLHVybDplLGRhdGE6cixzdWNjZXNzOmksZGF0YVR5cGU6dSxjb250ZW50VHlwZTpcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwifSl9LGk9ZnVuY3Rpb24odCl7cmV0dXJuIFJlZ0V4cChcIj1cXFxcP1wiKS50ZXN0KHQpfSxvPWZ1bmN0aW9uKHQsZSl7dmFyIHIsaTtpZihpPXQsdC5yZXNwb25zZVRleHQpe2lmKGUuZGF0YVR5cGU9PT1uLk1JTUUpdHJ5e2k9SlNPTi5wYXJzZSh0LnJlc3BvbnNlVGV4dCl9Y2F0Y2godSl7cj11LGk9cixhKFwiUXVvSlMuYWpheDogUGFyc2UgRXJyb3JcIix0LGUpfVwieG1sXCI9PT1lLmRhdGFUeXBlJiYoaT10LnJlc3BvbnNlWE1MKX1yZXR1cm4gaX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscjtyZXR1cm4gbj1bXCItd2Via2l0LVwiLFwiLW1vei1cIixcIi1tcy1cIixcIi1vLVwiLFwiXCJdLHQuZm4uYWRkQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC5hZGQobykpO3JldHVybiB1fSl9LHQuZm4ucmVtb3ZlQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC5yZW1vdmUobykpO3JldHVybiB1fSl9LHQuZm4udG9nZ2xlQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC50b2dnbGUobykpO3JldHVybiB1fSl9LHQuZm4uaGFzQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJnRoaXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHQpfSx0LmZuLmxpc3RDbGFzcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmxlbmd0aD4wP3RoaXNbMF0uY2xhc3NMaXN0OnZvaWQgMH0sdC5mbi5zdHlsZT10LmZuLmNzcz1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBudWxsIT1uP3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnN0eWxlW3RdPW59KTooZT10aGlzWzBdLGUuc3R5bGVbdF18fHIoZSx0KSl9LHQuZm4udmVuZG9yPWZ1bmN0aW9uKHQsZSl7dmFyIHIsaSx1LG87Zm9yKG89W10scj0wLGk9bi5sZW5ndGg7aT5yO3IrKyl1PW5bcl0sby5wdXNoKHRoaXMuc3R5bGUoXCJcIit1K3QsZSkpO3JldHVybiBvfSxyPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUodCxcIlwiKVtuXX0sZT1mdW5jdGlvbih0KXtyZXR1cm4gQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKSx0fX0odCksZnVuY3Rpb24odCl7cmV0dXJuIHQuZm4uYXR0cj1mdW5jdGlvbihuLGUpe3JldHVybiB0aGlzLmxlbmd0aD4wJiZcInN0cmluZ1wiPT09dC50b1R5cGUobik/bnVsbCE9ZT90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZXRBdHRyaWJ1dGUobixlKX0pOnRoaXNbMF0uZ2V0QXR0cmlidXRlKG4pOnZvaWQgMH0sdC5mbi5yZW1vdmVBdHRyPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmxlbmd0aD4wJiZcInN0cmluZ1wiPT09dC50b1R5cGUobik/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVtb3ZlQXR0cmlidXRlKG4pfSk6dm9pZCAwfSx0LmZuLmRhdGE9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdGhpcy5hdHRyKFwiZGF0YS1cIit0LG4pfSx0LmZuLnJlbW92ZURhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMucmVtb3ZlQXR0cihcImRhdGEtXCIrdCl9LHQuZm4udmFsPWZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlPXQudG9TdHJpbmcoKX0pOnRoaXMubGVuZ3RoPjA/dGhpc1swXS52YWx1ZTpudWxsfSx0LmZuLnNob3c9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpfSx0LmZuLmhpZGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIil9LHQuZm4uZm9jdXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1swXS5mb2N1cygpfSx0LmZuLmJsdXI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1swXS5ibHVyKCl9LHQuZm4ub2Zmc2V0PWZ1bmN0aW9uKCl7dmFyIHQsbjtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmKHQ9dGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxuPXtsZWZ0OnQubGVmdCt3aW5kb3cucGFnZVhPZmZzZXQsdG9wOnQudG9wK3dpbmRvdy5wYWdlWU9mZnNldCx3aWR0aDp0LndpZHRoLGhlaWdodDp0LmhlaWdodH0pLG59fSh0KSxmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG87cmV0dXJuIHI9bnVsbCxuPS9XZWJLaXRcXC8oW1xcZC5dKykvLGU9e0FuZHJvaWQ6LyhBbmRyb2lkKVxccysoW1xcZC5dKykvLGlwYWQ6LyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvLGlwaG9uZTovKGlQaG9uZVxcc09TKVxccyhbXFxkX10rKS8sQmxhY2tiZXJyeTovKEJsYWNrQmVycnl8QkIxMHxQbGF5Ym9vaykuKlZlcnNpb25cXC8oW1xcZC5dKykvLEZpcmVmb3hPUzovKE1vemlsbGEpLipNb2JpbGVbXlxcL10qXFwvKFtcXGRcXC5dKikvLHdlYk9TOi8od2ViT1N8aHB3T1MpW1xcc1xcL10oW1xcZC5dKykvfSx0LmlzTW9iaWxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW52aXJvbm1lbnQoKSxyLmlzTW9iaWxlfSx0LmVudmlyb25tZW50PWZ1bmN0aW9uKCl7dmFyIHQsbjtyZXR1cm4gcnx8KG49bmF2aWdhdG9yLnVzZXJBZ2VudCx0PXUobikscj17YnJvd3NlcjppKG4pLGlzTW9iaWxlOiEhdCxzY3JlZW46bygpLG9zOnR9KSxyfSxpPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPXQubWF0Y2gobiksZT9lWzBdOnR9LHU9ZnVuY3Rpb24odCl7dmFyIG4scixpO2ZvcihyIGluIGUpaWYoaT10Lm1hdGNoKGVbcl0pKXtuPXtuYW1lOlwiaXBob25lXCI9PT1yfHxcImlwYWRcIj09PXJ8fFwiaXBvZFwiPT09cj9cImlvc1wiOnIsdmVyc2lvbjppWzJdLnJlcGxhY2UoXCJfXCIsXCIuXCIpfTticmVha31yZXR1cm4gbn0sbz1mdW5jdGlvbigpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaCxkO3JldHVybiBuPTEsaT17fSxyPXtwcmV2ZW50RGVmYXVsdDpcImlzRGVmYXVsdFByZXZlbnRlZFwiLHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpcImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsc3RvcFByb3BhZ2F0aW9uOlwiaXNQcm9wYWdhdGlvblN0b3BwZWRcIn0sZT17dG91Y2hzdGFydDpcIm1vdXNlZG93blwiLHRvdWNobW92ZTpcIm1vdXNlbW92ZVwiLHRvdWNoZW5kOlwibW91c2V1cFwiLHRvdWNoOlwiY2xpY2tcIixvcmllbnRhdGlvbmNoYW5nZTpcInJlc2l6ZVwifSx1PS9jb21wbGV0ZXxsb2FkZWR8aW50ZXJhY3RpdmUvLHQuZm4ub249ZnVuY3Rpb24obixlLHIpe3JldHVybiBudWxsPT1lfHxcImZ1bmN0aW9uXCI9PT10LnRvVHlwZShlKT90aGlzLmJpbmQobixlKTp0aGlzLmRlbGVnYXRlKGUsbixyKX0sdC5mbi5vZmY9ZnVuY3Rpb24obixlLHIpe3JldHVybiBudWxsPT1lfHxcImZ1bmN0aW9uXCI9PT10LnRvVHlwZShlKT90aGlzLnVuYmluZChuLGUpOnRoaXMudW5kZWxlZ2F0ZShlLG4scil9LHQuZm4ucmVhZHk9ZnVuY3Rpb24obil7cmV0dXJuIHUudGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKT9uLmNhbGwodGhpcyx0KTp0LmZuLmFkZEV2ZW50KGRvY3VtZW50LFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7cmV0dXJuIG4uY2FsbCh0aGlzLHQpfSl9LHQuZm4uYmluZD1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSx0LG4pfSl9LHQuZm4udW5iaW5kPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBkKHRoaXMsdCxuKX0pfSx0LmZuLmRlbGVnYXRlPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGksdSl7cmV0dXJuIGgodSxlLHIsbixmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24ocil7dmFyIGksYTtyZXR1cm4gYT10KHIudGFyZ2V0KS5jbG9zZXN0KG4sdSkuZ2V0KDApLGE/KGk9dC5leHRlbmQobyhyKSx7Y3VycmVudFRhcmdldDphLGxpdmVGaXJlZDp1fSksZS5hcHBseShhLFtpXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpKSk6dm9pZCAwfX0pfSl9LHQuZm4udW5kZWxlZ2F0ZT1mdW5jdGlvbih0LG4sZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBkKHRoaXMsbixlLHQpfSl9LHQuZm4udHJpZ2dlcj1mdW5jdGlvbihuLGUscil7cmV0dXJuXCJzdHJpbmdcIj09PXQudG9UeXBlKG4pJiYobj1sKG4sZSkpLG51bGwhPXImJihuLm9yaWdpbmFsRXZlbnQ9ciksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudChuKX0pfSx0LmZuLmFkZEV2ZW50PWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyP3QuYWRkRXZlbnRMaXN0ZW5lcihuLGUsITEpOnQuYXR0YWNoRXZlbnQ/dC5hdHRhY2hFdmVudChcIm9uXCIrbixlKTp0W1wib25cIituXT1lfSx0LmZuLnJlbW92ZUV2ZW50PWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdC5yZW1vdmVFdmVudExpc3RlbmVyP3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihuLGUsITEpOnQuZGV0YWNoRXZlbnQ/dC5kZXRhY2hFdmVudChcIm9uXCIrbixlKTp0W1wib25cIituXT1udWxsfSxsPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudHNcIiksZS5pbml0RXZlbnQodCwhMCwhMCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCksbiYmKGUudG91Y2g9biksZX0saD1mdW5jdGlvbihuLGUscix1LG8pe3ZhciBsLHMsaCxkO3JldHVybiBlPWMoZSksaD1mKG4pLHM9aVtoXXx8KGlbaF09W10pLGw9byYmbyhyLGUpLGQ9e2V2ZW50OmUsY2FsbGJhY2s6cixzZWxlY3Rvcjp1LHByb3h5OmEobCxyLG4pLGRlbGVnYXRlOmwsaW5kZXg6cy5sZW5ndGh9LHMucHVzaChkKSx0LmZuLmFkZEV2ZW50KG4sZC5ldmVudCxkLnByb3h5KX0sZD1mdW5jdGlvbihuLGUscix1KXt2YXIgbztyZXR1cm4gZT1jKGUpLG89ZihuKSxzKG8sZSxyLHUpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGRlbGV0ZSBpW29dW2UuaW5kZXhdLHQuZm4ucmVtb3ZlRXZlbnQobixlLmV2ZW50LGUucHJveHkpfSl9LGY9ZnVuY3Rpb24odCl7cmV0dXJuIHQuX2lkfHwodC5faWQ9bisrKX0sYz1mdW5jdGlvbihuKXt2YXIgcjtyZXR1cm4gcj0oXCJmdW5jdGlvblwiPT10eXBlb2YgdC5pc01vYmlsZT90LmlzTW9iaWxlKCk6dm9pZCAwKT9uOmVbbl0scnx8bn0sYT1mdW5jdGlvbih0LG4sZSl7dmFyIHI7cmV0dXJuIG49dHx8bixyPWZ1bmN0aW9uKHQpe3ZhciByO3JldHVybiByPW4uYXBwbHkoZSxbdF0uY29uY2F0KHQuZGF0YSkpLHI9PT0hMSYmdC5wcmV2ZW50RGVmYXVsdCgpLHJ9fSxzPWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybihpW3RdfHxbXSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiEoIXR8fG4mJnQuZXZlbnQhPT1ufHxlJiZ0LmNhbGxiYWNrIT09ZXx8ciYmdC5zZWxlY3RvciE9PXIpfSl9LG89ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC5leHRlbmQoe29yaWdpbmFsRXZlbnQ6bn0sbiksdC5lYWNoKHIsZnVuY3Rpb24odCxyKXtyZXR1cm4gZVt0XT1mdW5jdGlvbigpe3JldHVybiB0aGlzW3JdPWZ1bmN0aW9uKCl7cmV0dXJuITB9LG5bdF0uYXBwbHkobixhcmd1bWVudHMpfSxlW3JdPWZ1bmN0aW9uKCl7cmV0dXJuITF9fSksZX19KHQpLGZ1bmN0aW9uKHQpe3JldHVybiB0LmZuLnRleHQ9ZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXQ/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGV4dENvbnRlbnQ9dH0pOnRoaXMubGVuZ3RoPjA/dGhpc1swXS50ZXh0Q29udGVudDpcIlwifSx0LmZuLmh0bWw9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIG51bGwhPW4/KGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuXCJzdHJpbmdcIj09PWU/dGhpcy5pbm5lckhUTUw9bjpcImFycmF5XCI9PT1lP24uZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHQobikuaHRtbChlKX19KHRoaXMpKTp0aGlzLmlubmVySFRNTCs9dChuKS5odG1sKCl9KSk6dGhpcy5sZW5ndGg+MD90aGlzWzBdLmlubmVySFRNTDpcIlwifSx0LmZuLnJlbW92ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9dGhpcy5wYXJlbnROb2RlP3RoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTp2b2lkIDB9KX0sdC5mbi5lbXB0eT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbm5lckhUTUw9bnVsbH0pfSx0LmZuLmFwcGVuZD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm5cInN0cmluZ1wiPT09ZT90aGlzLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLG4pOlwiYXJyYXlcIj09PWU/bi5mb3JFYWNoKGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdChuKS5hcHBlbmQoZSl9fSh0aGlzKSk6dGhpcy5hcHBlbmRDaGlsZChuKX0pfSx0LmZuLnByZXBlbmQ9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuXCJzdHJpbmdcIj09PWU/dGhpcy5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsbik6XCJhcnJheVwiPT09ZT9uLmVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuaW5zZXJ0QmVmb3JlKGUsdC5maXJzdENoaWxkKX19KHRoaXMpKTp0aGlzLmluc2VydEJlZm9yZShuLHRoaXMuZmlyc3RDaGlsZCl9KX0sdC5mbi5yZXBsYWNlV2l0aD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnROb2RlP1wic3RyaW5nXCI9PT1lP3RoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlQmVnaW5cIixuKTpcImFycmF5XCI9PT1lP24uZWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24obixlKXtyZXR1cm4gdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHQpfX0odGhpcykpOnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobix0aGlzKTp2b2lkIDB9KSx0aGlzLnJlbW92ZSgpfX0odCksZnVuY3Rpb24obil7dmFyIGUscixpLHU7cmV0dXJuIGU9XCJwYXJlbnROb2RlXCIsbi5mbi5maW5kPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiByPTE9PT10aGlzLmxlbmd0aD90LnF1ZXJ5KHRoaXNbMF0sZSk6dGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdC5xdWVyeSh0aGlzLGUpfSksbihyKX0sbi5mbi5wYXJlbnQ9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49dD9pKHRoaXMpOnRoaXMuaW5zdGFuY2UoZSkscihuLHQpfSxuLmZuLmNoaWxkcmVuPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPXRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuY2hpbGRyZW4pfSkscihuLHQpfSxuLmZuLnNpYmxpbmdzPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPXRoaXMubWFwKGZ1bmN0aW9uKHQsbil7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG4ucGFyZW50Tm9kZS5jaGlsZHJlbikuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0IT09bn0pfSkscihuLHQpfSxuLmZuLmdldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpc1t0XXx8bnVsbH0sbi5mbi5maXJzdD1mdW5jdGlvbigpe3JldHVybiBuKHRoaXNbMF0pfSxuLmZuLmxhc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbih0aGlzW3RoaXMubGVuZ3RoLTFdKX0sbi5mbi5jbG9zZXN0PWZ1bmN0aW9uKHQsZSl7dmFyIHIsaTtmb3IoaT10aGlzWzBdLHI9bih0KSxyLmxlbmd0aHx8KGk9bnVsbCk7aSYmci5pbmRleE9mKGkpPDA7KWk9aSE9PWUmJmkhPT1kb2N1bWVudCYmaS5wYXJlbnROb2RlO3JldHVybiBuKGkpfSxuLmZuLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdS5jYWxsKHRoaXMsXCJuZXh0U2libGluZ1wiKX0sbi5mbi5wcmV2PWZ1bmN0aW9uKCl7cmV0dXJuIHUuY2FsbCh0aGlzLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuLmZuLmluc3RhbmNlPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzW3RdfSl9LG4uZm4ubWFwPWZ1bmN0aW9uKHQpe3JldHVybiBuLm1hcCh0aGlzLGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuY2FsbChuLGUsbil9KX0saT1mdW5jdGlvbih0KXt2YXIgZTtmb3IoZT1bXTt0Lmxlbmd0aD4wOyl0PW4ubWFwKHQsZnVuY3Rpb24odCl7cmV0dXJuIHQ9dC5wYXJlbnROb2RlLHQhPT1kb2N1bWVudCYmZS5pbmRleE9mKHQpPDA/KGUucHVzaCh0KSx0KTp2b2lkIDB9KTtyZXR1cm4gZX0scj1mdW5jdGlvbih0LGUpe3JldHVybiBudWxsIT1lP24odCkuZmlsdGVyKGUpOm4odCl9LHU9ZnVuY3Rpb24odCl7dmFyIGU7Zm9yKGU9dGhpc1swXVt0XTtlJiYxIT09ZS5ub2RlVHlwZTspZT1lW3RdO3JldHVybiBuKGUpfX0odCksdC5HZXN0dXJlcz1mdW5jdGlvbih0KXt2YXIgZSxyLGksdSxvLGEsYyxsLHMsZixoLGQscCx2O3JldHVybiBkPSExLGw9e30sbz1udWxsLGY9bnVsbCxpPVtcImlucHV0XCIsXCJzZWxlY3RcIixcInRleHRhcmVhXCJdLHA9ZnVuY3Rpb24odCl7cmV0dXJuIGxbdC5uYW1lXT10LmhhbmRsZXIsZSh0LmV2ZW50cyl9LHY9ZnVuY3Rpb24obixlLHIpe3JldHVybiB0KG4pLnRyaWdnZXIoZSxyLGYpfSxoPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPSh0LnNyY0VsZW1lbnR8fHQudGFyZ2V0KS50YWdOYW1lLnRvTG93ZXJDYXNlKCksbi5jYWxsKGksZSk+PTA/dC5zdG9wUHJvcGFnYXRpb24oKTooZD0hMCxmPXR8fGV2ZW50LG89YSh0KSxjKFwic3RhcnRcIix0LnRhcmdldCxvKSl9LHM9ZnVuY3Rpb24odCl7cmV0dXJuIGQ/KGY9dHx8ZXZlbnQsbz1hKHQpLG8ubGVuZ3RoPjEmJmYucHJldmVudERlZmF1bHQoKSxjKFwibW92ZVwiLHQudGFyZ2V0LG8pKTp2b2lkIDB9LHU9ZnVuY3Rpb24odCl7cmV0dXJuIGQ/KGY9dHx8ZXZlbnQsYyhcImVuZFwiLHQudGFyZ2V0LG8pLGQ9ITEpOnZvaWQgMH0scj1mdW5jdGlvbih0KXtyZXR1cm4gZD0hMSxjKFwiY2FuY2VsXCIpfSxlPWZ1bmN0aW9uKG4pe3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIHQuZm5bbl09ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZG9jdW1lbnQuYm9keSkuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixuLGUpfX0pLHRoaXN9LGM9ZnVuY3Rpb24odCxuLGUpe3ZhciByLGksdTt1PVtdO2ZvcihpIGluIGwpcj1sW2ldLHJbdF0mJnUucHVzaChyW3RdLmNhbGwocixuLGUpKTtyZXR1cm4gdX0sYT1mdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1O2ZvcihyPXQudG91Y2hlc3x8W3RdLGk9W10sbj0wLGU9ci5sZW5ndGg7ZT5uO24rKyl1PXJbbl0saS5wdXNoKHt4OnUucGFnZVgseTp1LnBhZ2VZfSk7cmV0dXJuIGl9LHQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7dmFyIG47cmV0dXJuIG49dChkb2N1bWVudC5ib2R5KSxuLmJpbmQoXCJ0b3VjaHN0YXJ0XCIsaCksbi5iaW5kKFwidG91Y2htb3ZlXCIscyksbi5iaW5kKFwidG91Y2hlbmRcIix1KSxuLmJpbmQoXCJ0b3VjaGNhbmNlbFwiLHIpfSkse2FkZDpwLHRyaWdnZXI6dn19KHQpLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwiYmFzaWNcIixldmVudHM6W1widG91Y2hcIixcImhvbGRcIixcImRvdWJsZVRhcFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gZT0xNSxuPXtUQVA6MjAwLERPVUJMRV9UQVA6NDAwLEhPTEQ6NDAwfSxpPW51bGwsYz0hMCxhPW51bGwsbz1udWxsLHU9bnVsbCxoPWZ1bmN0aW9uKGUscil7cmV0dXJuIDE9PT1yLmxlbmd0aD8obz17dGltZTpuZXcgRGF0ZSx4OnJbMF0ueCx5OnJbMF0ueX0sYT1lLGk9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiB0LnRyaWdnZXIoZSxcImhvbGRcIixyWzBdKX0sbi5IT0xEKSk6bCgpfSxmPWZ1bmN0aW9uKHQsbil7dmFyIGk7cmV0dXJuIG51bGwhPT1vJiYoaT1yKG8sblswXSksaS54PmV8fGkueT5lfHxuLmxlbmd0aD4xKT9sKCk6dm9pZCAwfSxzPWZ1bmN0aW9uKGUsYSl7dmFyIGMscztpZihvKXJldHVybiBjPXIobyxhWzBdKSwwIT09Yy54fHwwIT09Yy55P2woKTooY2xlYXJUaW1lb3V0KGkpLHM9bmV3IERhdGUscy1vLnRpbWU8bi5UQVA/cy11PG4uRE9VQkxFX1RBUD8odC50cmlnZ2VyKGUsXCJkb3VibGVUYXBcIixhWzBdKSx1PW51bGwpOih1PXMsdC50cmlnZ2VyKGUsXCJ0b3VjaFwiLGFbMF0pKTp2b2lkIDApfSxsPWZ1bmN0aW9uKCl7cmV0dXJuIG89bnVsbCxjPSExLGNsZWFyVGltZW91dChpKX0scj1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPXt4Om4ueC10LngseTpuLnktdC55fX0se3N0YXJ0OmgsbW92ZTpmLGVuZDpzLGNhbmNlbDpsfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcImRyYWdcIixldmVudHM6W1wiZHJhZ1wiLFwiZHJhZ2dpbmdcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGg7cmV0dXJuIG49d2luZG93LmRldmljZVBpeGVsUmF0aW8+PTI/MTU6MjAsYz1udWxsLG89bnVsbCxhPW51bGwsdT1udWxsLGg9ZnVuY3Rpb24odCxuKXtyZXR1cm4gbi5sZW5ndGg+PTI/KGM9dCxvPW4ubGVuZ3RoLGE9ZShuKSk6dm9pZCAwfSxmPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIG4ubGVuZ3RoPT09bz8oZT1yKG4pLHU9e3RvdWNoZXM6bixkZWx0YTplfSxpKCEwKSk6dm9pZCAwfSxsPXM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYSYmdT8oaSghMSksbz1udWxsLGE9bnVsbCx1PW51bGwpOnZvaWQgMH0scj1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj1lKHQpLHt4Om4ueC1hLngseTpuLnktYS55fX0sZT1mdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1O2ZvcihpPTAsdT0wLG49MCxlPXQubGVuZ3RoO2U+bjtuKyspcj10W25dLGkrPXBhcnNlSW50KHIueCksdSs9cGFyc2VJbnQoci55KTtyZXR1cm57eDppL3QubGVuZ3RoLHk6dS90Lmxlbmd0aH19LGk9ZnVuY3Rpb24oZSl7cmV0dXJuIGU/dC50cmlnZ2VyKGMsXCJkcmFnZ2luZ1wiLHUpOk1hdGguYWJzKHUuZGVsdGEueCk+bnx8TWF0aC5hYnModS5kZWx0YS55KT5uP3QudHJpZ2dlcihjLFwiZHJhZ1wiLHUpOnZvaWQgMH0se3N0YXJ0OmgsbW92ZTpmLGVuZDpzfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInBpbmNoXCIsZXZlbnRzOltcInBpbmNoXCIsXCJwaW5jaGluZ1wiLFwicGluY2hJblwiLFwicGluY2hPdXRcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscztyZXR1cm4gbj13aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbz49Mj8xNToyMCxvPW51bGwsdT1udWxsLGk9bnVsbCxzPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDI9PT1uLmxlbmd0aD8obz10LHU9cihuWzBdLG5bMV0pKTp2b2lkIDB9LGw9ZnVuY3Rpb24odCxuKXt2YXIgbztyZXR1cm4gdSYmMj09PW4ubGVuZ3RoPyhvPXIoblswXSxuWzFdKSxpPXt0b3VjaGVzOm4sZGVsdGE6by11fSxlKCEwKSk6dm9pZCAwfSxhPWM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdSYmaT8oZSghMSksdT1udWxsLGk9bnVsbCk6dm9pZCAwfSxyPWZ1bmN0aW9uKHQsbil7cmV0dXJuIE1hdGguc3FydCgobi54LXQueCkqKG4ueC10LngpKyhuLnktdC55KSoobi55LXQueSkpfSxlPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiBlP3QudHJpZ2dlcihvLFwicGluY2hpbmdcIixpKTpNYXRoLmFicyhpLmRlbHRhKT5uPyh0LnRyaWdnZXIobyxcInBpbmNoXCIsaSkscj1pLmRlbHRhPjA/XCJwaW5jaE91dFwiOlwicGluY2hJblwiLHQudHJpZ2dlcihvLHIsaSkpOnZvaWQgMH0se3N0YXJ0OnMsbW92ZTpsLGVuZDpjfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInJvdGF0aW9uXCIsZXZlbnRzOltcInJvdGF0ZVwiLFwicm90YXRpbmdcIixcInJvdGF0ZUxlZnRcIixcInJvdGF0ZVJpZ2h0XCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoLGQ7cmV0dXJuIG49NSxlPTIwLGw9bnVsbCx1PTAsYz1udWxsLGk9bnVsbCxkPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDI9PT1uLmxlbmd0aD8obD10LHU9MCxjPW8oblswXSxuWzFdKSk6dm9pZCAwfSxoPWZ1bmN0aW9uKHQsbil7dmFyIGw7cmV0dXJuIGMmJjI9PT1uLmxlbmd0aD8obD1vKG5bMF0sblsxXSktYyxpJiZNYXRoLmFicyhpLmRlbHRhLWwpPmUmJihsKz0zNjAqYShpLmRlbHRhKSksTWF0aC5hYnMobCk+MzYwJiYodSsrLGwtPTM2MCphKGkuZGVsdGEpKSxpPXt0b3VjaGVzOm4sZGVsdGE6bCxyb3RhdGlvbnNDb3VudDp1fSxyKCEwKSk6dm9pZCAwfSxzPWY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYyYmaT8ocighMSksbD1udWxsLHU9MCxjPW51bGwsaT1udWxsLGM9bnVsbCk6dm9pZCAwfSxhPWZ1bmN0aW9uKHQpe3JldHVybiAwPnQ/LTE6MX0sbz1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPU1hdGguYXRhbjIodC55LW4ueSx0Lngtbi54KSwxODAqKDA+ZT9lKzIqTWF0aC5QSTplKS9NYXRoLlBJfSxyPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiBlP3QudHJpZ2dlcihsLFwicm90YXRpbmdcIixpKTpNYXRoLmFicyhpLmRlbHRhKT5uPyh0LnRyaWdnZXIobCxcInJvdGF0ZVwiLGkpLHI9aS5kZWx0YT4wP1wicm90YXRlUmlnaHRcIjpcInJvdGF0ZUxlZnRcIix0LnRyaWdnZXIobCxyLGkpKTp2b2lkIDB9LHtzdGFydDpkLG1vdmU6aCxlbmQ6Zn19KHQuR2VzdHVyZXMpfSksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJzd2lwZVwiLGV2ZW50czpbXCJzd2lwZVwiLFwic3dpcGVMZWZ0XCIsXCJzd2lwZVJpZ2h0XCIsXCJzd2lwZVVwXCIsXCJzd2lwZURvd25cIixcInN3aXBpbmdcIixcInN3aXBpbmdIb3Jpem9udGFsXCIsXCJzd2lwaW5nVmVydGljYWxcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmO3JldHVybiBuPU1hdGgucm91bmQoMjAvd2luZG93LmRldmljZVBpeGVsUmF0aW8pLGE9bnVsbCx1PW51bGwsbz1udWxsLGk9bnVsbCxmPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDE9PT1uLmxlbmd0aD8oYT10LHU9blswXSxpPW51bGwpOnZvaWQgMH0scz1mdW5jdGlvbih0LG4pe3ZhciByLG87cmV0dXJuIDE9PT1uLmxlbmd0aD8ocj17eDpuWzBdLngtdS54LHk6blswXS55LXUueX0sbz1udWxsPT09aSxpPXt4Om5bMF0ueCx5Om5bMF0ueSxkZWx0YTpyfSxlKCEwLG8pKTppPW51bGx9LGM9bD1mdW5jdGlvbih0LG4pe3ZhciByO3JldHVybiBudWxsPT1pJiZuLmxlbmd0aD49MSYmKHI9e3g6blswXS54LXUueCx5Om5bMF0ueS11Lnl9LGk9e3g6blswXS54LHk6blswXS55LGRlbHRhOnJ9KSxpPyhlKCExKSxpPW51bGwpOnZvaWQgMH0sZT1mdW5jdGlvbihlLHUpe3ZhciBjLGwscyxmLGg7aWYobnVsbD09dSYmKHU9ITEpLGUpcmV0dXJuIHUmJihvPXIoaS5kZWx0YS54LGkuZGVsdGEueSkpLG51bGwhPT1vJiZ0LnRyaWdnZXIoYSxcInN3aXBpbmdcIitvLGkpLHQudHJpZ2dlcihhLFwic3dpcGluZ1wiLGkpO2lmKGw9W10sTWF0aC5hYnMoaS5kZWx0YS55KT5uP2wucHVzaChpLmRlbHRhLnk8MD9cIlVwXCI6XCJEb3duXCIpOk1hdGguYWJzKGkuZGVsdGEueCk+biYmbC5wdXNoKGkuZGVsdGEueDwwP1wiTGVmdFwiOlwiUmlnaHRcIiksbC5sZW5ndGgpe2Zvcih0LnRyaWdnZXIoYSxcInN3aXBlXCIsaSksaD1bXSxzPTAsZj1sLmxlbmd0aDtmPnM7cysrKWM9bFtzXSxoLnB1c2godC50cmlnZ2VyKGEsXCJzd2lwZVwiK2MsaSkpO3JldHVybiBofX0scj1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPW51bGwsTWF0aC5yb3VuZChNYXRoLmFicyh0L24pKT49Mj9lPVwiSG9yaXpvbnRhbFwiOk1hdGgucm91bmQoTWF0aC5hYnMobi90KSk+PTImJihlPVwiVmVydGljYWxcIiksZX0se3N0YXJ0OmYsbW92ZTpzLGVuZDpsfX0odC5HZXN0dXJlcyl9KX0pLmNhbGwodGhpcyk7XG4iLCIvLyBTYW1zb24uUGFnZSBjb25zdHJ1Y3RvciBmdW5jdGlvblxuLy8gVXNlZCB0byBzaW1wbGlmeSBwYWdlIHJlbmRlcmluZyBhbmQgdHJhbnNpdGlvbnMgaW4gc2luZ2xlIHBhZ2UgYXBwc1xuXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIFNoYXJlZCA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgJCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9xdW8uanMnKTtcbnZhciBqc3MgPSByZXF1aXJlKCdqc3MnKTtcblxuLyogb3B0aW9ucyBjYW4gaW5jbHVkZTpcbi8vIHBhdGggLSB0aGUgcm91dGVyIHBhdGggb2YgdGhlIHBhZ2Vcbi8vIHN1YlBhZ2VPZiAtIGFuIG9wdGlvbmFsIHBhcmVudCBwYWdlIHRoYXQgaXMgdGhlIHN0YXJ0IG9mIGEgc3BlY2lmaWMgY2F0ZWdvcnkgLSBleDogVXNlciBCaW8gUGFnZSBpcyBzdWJQYWdlT2Ygb2YgUHJvZmlsZSBQYWdlXG4vLyBwcmV2aW91c1BhZ2UgLSBhbiBvcHRpb25hbCBwcmV2aW91cyBwYWdlIHRvIG1ha2UgZ29pbmcgYmFjayBlYXNpZXJcbi8vIGJhY2tTYWZlIC0gZmFsc2UgYnkgZGVmYXVsdC4gc2V0IHRvIHRydWUgaWYgaXQgaXMgc2FmZSB0byBnbyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIGFueSBvdGhlciBwYWdlIGluIHRoZSBhcHBcbi8vIHRlbXBsYXRlL3JlbmRlciAtIHRoZSBmdW5jdGlvbiB0aGF0IG91dHB1dHMgYW4gSFRNTCBzdHJpbmcgdGhhdCBnZXRzIGF0dGFjaGVkIHRvIHRoZSBET01cbi8vIHN0eWxlIC0gSlNTIHN0eWxlIG9iamVjdFxuLy8gY29tcG9uZW50cyAtIGFueSBvdGhlciBjb21wb25lbnRzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC9yZWZyZXNoZWQgd2l0aCB0aGUgcGFnZVxuLy8gZXZlbnRzIC0gYW55IGV2ZW50cyB0byBhdHRhY2ggdG8gdGhlIHBhZ2Vcbi8vIGJlZm9yZVJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGJlZm9yZSB0aGUgcGFnZSBpcyByZW5kZXJlZCAodXBkYXRlIG1vZGVscywgc29ydCBjb2xsZWN0aW9ucylcbi8vIGFmdGVyUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIHBhZ2UgaXMgcmVuZGVyZWQgKHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLCBtYXJrZWQgY2hlY2tib3hlcyBhcyBjaGVja2VkKVxuLy8gYmVmb3JlUmVtb3ZlIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBwYWdlIGlzIGZ1bGx5IGRlc3Ryb3llZCAoY2xlYW51cCBtb2RlbHMsIHVwZGF0ZSBhY3Rpdml0eSBoaXN0b3J5KVxuLy8gY3VzdG9tL2V4dGVuZCAtIGFuIG9iamVjdCBjb250YWluaW5nIGN1c3RvbSBtZXRob2RzL3Byb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBQYWdlIGluc3RhbmNlIGlmIHRoZXJlIGFyZSBubyBuYW1pbmcgY29uZmxpY3RzIHdpdGggcmVzZXJ2ZWQgcHJvcGVydGllc1xuKi9cblxuZnVuY3Rpb24gU2Ftc29uUGFnZShvcHRpb25zKSB7XG5cbiAgLy8gc2V0IHRoZSBwYXRoIG9mIHRoZSBwYWdlXG4gIHRoaXMucGF0aCA9IG9wdGlvbnMucGF0aDtcblxuICAvLyBqc3Mgc3R5bGVTaGVldFxuICBpZiAodHlwZW9mIG9wdGlvbnMuc3R5bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQob3B0aW9ucy5zdHlsZSwge25hbWVkOiBmYWxzZX0pO1xuICB9XG5cbiAgLy8gc3ViUGFnZU9mIGlzIGZhbHNlIGlmIGl0IGlzIGEgdG9wLWxldmVsIHBhZ2UsIG90aGVyd2lzZSBpdCBpcyB0aGUgbmFtZSBvZiB0aGUgdG9wLWxldmVsIHBhZ2UgaXQgaXMgbGlua2VkIHRvXG4gIHRoaXMuc3ViUGFnZU9mID0gb3B0aW9ucy5zdWJQYWdlT2YgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBwcmV2aW91c1BhZ2UgaWYgaXQgaXMgc3BlY2lmaWVkXG4gIHRoaXMucHJldmlvdXNQYWdlID0gb3B0aW9ucy5wcmV2aW91c1BhZ2UgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBiYWNrQW5pbWF0aW9uIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tBbmltYXRpb24gPSBvcHRpb25zLmJhY2tBbmltYXRpb24gfHwgZmFsc2U7XG5cbiAgLy8gc2V0IGJhY2tTYWZlIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tTYWZlID0gb3B0aW9ucy5iYWNrU2FmZSB8fCBmYWxzZTtcblxuICAvLyBzZXQgdGhlIHBhZ2UgZXZlbnRzIGlmIHRoZXkgYXJlIHNwZWNpZmllZFxuICB0aGlzLmRvbUV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzID8gb3B0aW9ucy5ldmVudHMgOiAob3B0aW9ucy5kb21FdmVudHMgfHwge30pO1xuICB0aGlzLmFwcEV2ZW50cyA9IG9wdGlvbnMuYXBwRXZlbnRzIHx8IHt9O1xuXG4gIC8vIHNldHVwIHRoZSBwYWdlJ3MgY29tcG9uZW50c1xuICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG4gIHRoaXMuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcblxuICAvLyBzZXRJbml0aWFsU3RhdGUgZnVuY3Rpb25cbiAgdGhpcy5zZXRJbml0aWFsU3RhdGUgPSBvcHRpb25zLnNldEluaXRpYWxTdGF0ZSB8fCBTaGFyZWQuanVzdFJldHVybk9iamVjdDtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xuICB0aGlzLl9pbml0aWFsU3RhdGVTZXQgPSBmYWxzZTtcbiAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gc2V0IHRoZSBwYWdlJ3MgcmVuZGVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvdXRwdXQgYW4gaHRtbCBzdHJpbmdcbiAgLy8gaWYgbm8gcmVuZGVyIGZ1bmN0aW9uIHdhcyBwYXNzZWQgaW4sIHdlIGNoZWNrIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uXG4gIHRoaXMuX3RlbXBsYXRlID0gb3B0aW9ucy5yZW5kZXIgfHwgb3B0aW9ucy50ZW1wbGF0ZTtcbiAgaWYgKCF0aGlzLl90ZW1wbGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwiWW91ciBwYWdlIFwiICsgdGhpcy5wYXRoICsgXCIgbXVzdCBoYXZlIGEgcmVuZGVyIG9yIHRlbXBsYXRlIGZ1bmN0aW9uIHRoYXQgb3V0cHV0cyBhbiBIVE1MIHN0cmluZ1wiKTtcblxuICAvLyBzZXQgdGhlIGJlZm9yZVJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmVmb3JlUmVuZGVyID0gb3B0aW9ucy5iZWZvcmVSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIGFmdGVyUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5hZnRlclJlbmRlciA9IG9wdGlvbnMuYWZ0ZXJSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIHJlbW92ZS9jbG9zZSBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkLCBvdGhlcndpc2UganVzdCBpbnZva2UgY2FsbGJhY2tcbiAgdGhpcy5iZWZvcmVSZW1vdmUgPSBvcHRpb25zLmJlZm9yZVJlbW92ZSB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIGFkZCBhbnkgcm91dGVyLXJlbGF0ZWQgdGFza3NcbiAgdGhpcy5fdXVpZCA9IHRoaXMucGF0aCArIFwiLVwiICsgRGF0ZS5ub3coKTsgLy8gdGhlIHV1aWQgYWxsb3dzIHVzIHRvIGVhc2lseSByZWZlcmVuY2UgdGhlIGFkZGVkIHJvdXRlciB0YXNrc1xuICB0aGlzLl9yb3V0ZXIgPSBvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fTtcbiAgU2hhcmVkLmFkZFJvdXRlclRhc2tzKHRoaXMpO1xuXG4gIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20gb3IgZXh0ZW5kIG9iamVjdFxuICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBjdXN0b20sIFNoYXJlZC5yZXNlcnZlZCk7XG5cbn1cblxuLy8gSGF2ZSB0aGUgU2Ftc29uUGFnZSBjbGFzcyBpbmhlcml0IGFueSBzaGFyZWQgbWV0aG9kc1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3R5cGUgPSBcIlBhZ2VcIjtcblNhbXNvblBhZ2UucHJvdG90eXBlLnNldFN0YXRlID0gU2hhcmVkLnNldFN0YXRlO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUucmVzZXRTdGF0ZSA9IFNoYXJlZC5yZXNldFN0YXRlO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2RvRmlyc3QgPSBTaGFyZWQuX2RvRmlyc3Q7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fbG9hZEV2ZW50cyA9IFNoYXJlZC5fbG9hZEV2ZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9kZXN0cm95RXZlbnRzID0gU2hhcmVkLl9kZXN0cm95RXZlbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2xvYWRDb21wb25lbnRzID0gU2hhcmVkLl9sb2FkQ29tcG9uZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9yZW5kZXJDb21wb25lbnRzID0gU2hhcmVkLl9yZW5kZXJDb21wb25lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2Rlc3Ryb3lDb21wb25lbnRzID0gU2hhcmVkLl9kZXN0cm95Q29tcG9uZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9yZW1vdmUgPSBTaGFyZWQuX3JlbW92ZTtcblxuLy8gcmVuZGVyIHRoZSBwYWdlIHRvIHRoZSBET01cblNhbXNvblBhZ2UucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbihmb3JjZV91cGRhdGUsIHBhZ2VfY29udGFpbmVyLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLl9sb2FkQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZVJlbmRlclwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBpbml0aWFsIHN0YXRlIG9iamVjdCBvZiB0aGUgcGFnZSB0aGF0IGlzIHBhc3NlZCBpbnRvIHRoZSByZW5kZXIgY2FsbFxuICAgICAgaWYgKCFzZWxmLl9pbml0aWFsU3RhdGVTZXQpIHtcbiAgICAgICAgc2VsZi5zdGF0ZSA9IHNlbGYuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgIHNlbGYuX2luaXRpYWxTdGF0ZVNldCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHNlbGYuc3R5bGUpIHNlbGYuc3R5bGUuYXR0YWNoKCk7IC8vIGxvYWQgdGhlIHN0eWxlc2hlZXQgb24gZmlyc3QgcmVuZGVyXG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgcGFnZSBlbGVtZW50XG4gICAgICBpZiAoIXNlbGYuZWxlbWVudCkge1xuICAgICAgICBzZWxmLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzZWxmLmVsZW1lbnQuaWQgPSBzZWxmLnBhdGggKyBcIi1wYWdlXCI7XG4gICAgICAgIHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSBzZWxmLl90ZW1wbGF0ZShzZWxmLnN0YXRlKTtcbiAgICAgICAgcGFnZV9jb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgcGFnZSBhcyBhbiBldmVudCBkZWxlZ2F0b3IgZm9yIGFsbCBpdHMgc3ViY29tcG9uZW50c1xuICAgICAgICBzZWxmLmRlbGVnYXRlID0gJChzZWxmLmVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgd2hldGhlciBvciBub3Qgd2Ugd2lsbCBmb3JjZSBzdWJjb21wb25lbnRzIHRvIHVwZGF0ZVxuICAgICAgaWYgKGZvcmNlX3VwZGF0ZSB8fCBzZWxmLl9zdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgZm9yY2VfdXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5lbGVtZW50LmlubmVySFRNTCA9IHNlbGYuX3RlbXBsYXRlKHNlbGYuc3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9sb2FkRXZlbnRzKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNlbGYuX3JlbmRlckNvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJlc2V0IHN0YXRlQ2hhbmdlZFxuICAgICAgICAgIHNlbGYuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyUmVuZGVyXCIsIGZ1bmN0aW9uKCkgeyBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7IH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbXNvblBhZ2U7XG4iLCJcbnZhciBhbmltYXRpb25BbW91bnQgPSBcIjEwMCVcIjtcbnZhciBhbmltYXRpb25EdXJhdGlvbiA9IFwiMC42c1wiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBuYW1lczoge1xuXG4gICAgXCJ0b3BcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLWJvdHRvbVwiLCBuZXh0OiBcIm1vdmUtZnJvbS10b3BcIiB9LFxuICAgIFwiYm90dG9tXCIgOiB7IGN1cnJlbnQ6IFwibW92ZS10by10b3BcIiwgbmV4dDogXCJtb3ZlLWZyb20tYm90dG9tXCIgfSxcbiAgICBcImxlZnRcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXJpZ2h0XCIsIG5leHQ6IFwibW92ZS1mcm9tLWxlZnRcIiB9LFxuICAgIFwicmlnaHRcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLWxlZnRcIiwgbmV4dDogXCJtb3ZlLWZyb20tcmlnaHRcIiB9LFxuICAgIFwic2NhbGVcIiA6IHsgY3VycmVudDogXCJzY2FsZS1vdXRcIiwgbmV4dDogXCJzY2FsZS1pblwiIH0sXG4gICAgXCJmYWRlXCIgOiB7IGN1cnJlbnQ6IFwiZmFkZS1vdXRcIiwgbmV4dDogXCJmYWRlLWluXCIgfVxuXG4gIH0sXG5cbiAgc3R5bGVzOiB7XG5cbiAgICBcIi5tb3ZlLXRvLXRvcFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZVRvVG9wXCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2Utb3V0XCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS1mcm9tLXRvcFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21Ub3BcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pblwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtdG8tYm90dG9tXCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9Cb3R0b21cIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pblwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1ib3R0b21cIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVGcm9tQm90dG9tXCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW5cIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLXRvLWxlZnRcIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVUb0xlZnRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLWZyb20tbGVmdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21MZWZ0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2Utb3V0XCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS10by1yaWdodFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZVRvUmlnaHRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLWZyb20tcmlnaHRcIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVGcm9tUmlnaHRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5zY2FsZS1vdXRcIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcInNjYWxlT3V0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9LFxuXG4gICAgXCIuc2NhbGUtaW5cIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcInNjYWxlSW5cIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pbi1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5mYWRlLW91dFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwiZmFkZU91dFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluLW91dFwiXG4gICAgfSxcblxuICAgIFwiLmZhZGUtaW5cIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcImZhZGVJblwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluLW91dFwiXG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlVG9Ub3BcIiA6IHtcbiAgICAgIHRvIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVkoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tVG9wXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVkoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb0JvdHRvbVwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWShcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlRnJvbUJvdHRvbVwiIDoge1xuICAgICAgZnJvbSA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVZKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb0xlZnRcIiA6IHtcbiAgICAgIHRvIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tTGVmdFwiIDoge1xuICAgICAgZnJvbSA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKC1cIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlVG9SaWdodFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlRnJvbVJpZ2h0XCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgc2NhbGVPdXRcIiA6IHtcbiAgICAgIHRvIDoge1xuICAgICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJzY2FsZSguMSlcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgc2NhbGVJblwiIDoge1xuICAgICAgZnJvbSA6IHtcbiAgICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwic2NhbGUoLjEpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIGZhZGVPdXRcIiA6IHtcbiAgICAgIHRvIDoge1xuICAgICAgICBvcGFjaXR5OiBcIjBcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgZmFkZUluXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBvcGFjaXR5OiBcIjBcIlxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbn07XG4iLCIvLyBTYW1zb24uUm91dGVyIGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG4vLyBVc2VkIHRvIGhhbmRsZSBwYWdlIGhpc3RvcnkgYW5kIHRyYW5zaXRpb25zXG5cbnZhciBTYW1zb24gPSByZXF1aXJlKCcuLi9pbmRleCcpO1xudmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBqc3MgPSByZXF1aXJlKFwianNzXCIpO1xuXG52YXIgYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucyA9IHJlcXVpcmUoJy4vYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucycpO1xuXG5mdW5jdGlvbiBTYW1zb25Sb3V0ZXIob3B0aW9ucykge1xuXG4gIHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQgPSBcInNhbXNvbl9wYWdlXzFcIjtcbiAgdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50ID0gXCJzYW1zb25fcGFnZV8yXCI7XG5cbiAgLy8gb3VyIHBhZ2UgY2FjaGUgd2lsbCBzdG9yZSB0aGUgaW5pdGlhbGl6ZWQgcGFnZXNcbiAgdGhpcy5wYWdlQ2FjaGUgPSB7fTtcblxuICAvLyBjcmVhdGUgdGhlIGFwcCByb3V0ZXIgaGlzdG9yeVxuICB0aGlzLmhpc3RvcnkgPSBbXTtcblxuICAvLyBhIHF1ZXVlIG9mIGFueSByb3V0ZXIgZXZlbnRzIHRoYXQgaGF2ZW4ndCBiZWVuIGhhbmRsZWQgeWV0XG4gIHRoaXMucXVldWUgPSBbXTtcblxuICAvLyBzZXQgdGhlIGFwcCdzIGFuaW1hdGlvbnNcbiAgdGhpcy5hbmltYXRpb25zID0gYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucy5uYW1lcztcbiAgdGhpcy5zdHlsZSA9IGpzcy5jcmVhdGVTdHlsZVNoZWV0KGJhc2Vfcm91dGVyX2FuaW1hdGlvbnMuc3R5bGVzLCB7bmFtZWQ6IGZhbHNlfSk7XG5cbiAgdmFyIGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9ucyA9IG9wdGlvbnMuYW5pbWF0aW9ucyB8fCB7fTtcblxuICBpZiAoY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLm5hbWVzICYmIGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9ucy5zdHlsZXMpIHtcbiAgICB0aGlzLnN0eWxlLmFkZFJ1bGVzKGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9ucy5zdHlsZXMpO1xuXG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiBjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMubmFtZXMpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uc1trZXldID0gY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLm5hbWVzW2tleV07XG4gICAgfVxuICB9XG4gIHRoaXMuc3R5bGUuYXR0YWNoKCk7IC8vIGF0dGFjaCB0aGUgYW5pbWF0aW9ucyB0byB0aGUgcnVubmluZyBhcHBcblxuICB0aGlzLmN1cnJlbnRQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwYWdlIHdlIGFyZSBjdXJyZW50bHkgb25cblxuICB0aGlzLnByZXZpb3VzUGFnZSA9IGZhbHNlOyAvLyB0aGUgbmFtZSBvZiB0aGUgcHJldmlvdXMgcGFnZSB3ZSB3ZXJlIG9uXG5cbiAgdGhpcy5uZXh0UGFnZSA9IGZhbHNlOyAvLyB0aGUgbmFtZSBvZiB0aGUgcGFnZSB3ZSBhcmUgdHJhbnNpdGlvbmluZyB0b1xuXG4gIHRoaXMuY3VycmVudEFuaW1hdGlvbiA9IGZhbHNlOyAvLyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IHJ1bm5pbmcgYW5pbWF0aW9uXG5cbiAgdGhpcy5pc0J1c3kgPSBmYWxzZTsgLy8gc2V0IHRvIHRydWUgd2hlbmV2ZXIgdGhlIHJvdXRlciBpcyBzdGlsbCBoYW5kbGluZyBhbiBldmVudFxuXG4gIHRoaXMucGFnZXNBbmltYXRpbmcgPSBmYWxzZTsgLy8gc2V0IHRvIHRydWUgaWYgYSBuZXcgcGFnZSBpcyBiZWluZyBsb2FkZWRcblxuICAvLyBzZXQgdGhlIGRlZmF1bHQgbmF2aWdhdGUgYW5pbWF0aW9uXG4gIHRoaXMubmF2aWdhdGVBbmltYXRpb24gPSBvcHRpb25zLmRlZmF1bHROYXZpZ2F0ZUFuaW1hdGlvbiB8fCBcInJpZ2h0XCI7XG5cbiAgLy9zZXQgdGhlIGRlZmF1bHQgYmFjayBhbmltYXRpb25cbiAgdGhpcy5iYWNrQW5pbWF0aW9uID0gb3B0aW9ucy5kZWZhdWx0QmFja0FuaW1hdGlvbiB8fCBcImxlZnRcIjtcblxuICB0aGlzLmJlZm9yZU5hdmlnYXRlID0ge307XG4gIHRoaXMuYWZ0ZXJOYXZpZ2F0ZSA9IHt9O1xuICB0aGlzLmJlZm9yZUFuaW1hdGUgPSB7fTtcbiAgdGhpcy5kdXJpbmdBbmltYXRlID0ge307XG4gIHRoaXMuYWZ0ZXJBbmltYXRlID0ge307XG4gIHRoaXMuYmVmb3JlQmFjayA9IHt9O1xuICB0aGlzLmFmdGVyQmFjayA9IHt9O1xuXG4gIGlmIChvcHRpb25zLmJlZm9yZU5hdmlnYXRlKSB7IHRoaXMuYmVmb3JlTmF2aWdhdGUucm91dGVyID0gb3B0aW9ucy5iZWZvcmVOYXZpZ2F0ZTsgfVxuICBpZiAob3B0aW9ucy5hZnRlck5hdmlnYXRlKSB7IHRoaXMuYWZ0ZXJOYXZpZ2F0ZS5yb3V0ZXIgPSBvcHRpb25zLmFmdGVyTmF2aWdhdGU7IH1cbiAgaWYgKG9wdGlvbnMuYmVmb3JlQW5pbWF0ZSkgeyB0aGlzLmJlZm9yZUFuaW1hdGUucm91dGVyID0gb3B0aW9ucy5iZWZvcmVBbmltYXRlOyB9XG4gIGlmIChvcHRpb25zLmR1cmluZ0FuaW1hdGUpIHsgdGhpcy5kdXJpbmdBbmltYXRlLnJvdXRlciA9IG9wdGlvbnMuZHVyaW5nQW5pbWF0ZTsgfVxuICBpZiAob3B0aW9ucy5hZnRlckFuaW1hdGUpIHsgdGhpcy5hZnRlckFuaW1hdGUucm91dGVyID0gb3B0aW9ucy5hZnRlckFuaW1hdGU7IH1cbiAgaWYgKG9wdGlvbnMuYmVmb3JlQmFjaykgeyB0aGlzLmJlZm9yZUJhY2sucm91dGVyID0gb3B0aW9ucy5iZWZvcmVCYWNrOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyQmFjaykgeyB0aGlzLmFmdGVyQmFjay5yb3V0ZXIgPSBvcHRpb25zLmFmdGVyQmFjazsgfVxuXG59O1xuXG4vLyBnZXQgdGhlIHJvdXRlcidzIGN1cnJlbnQgcGFnZSBkYXRhXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmdldFBhZ2VEYXRhID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgY3VycmVudFBhZ2UgOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgIHByZXZpb3VzUGFnZSA6IHRoaXMucHJldmlvdXNQYWdlLFxuICAgIG5leHRQYWdlIDogdGhpcy5uZXh0UGFnZSxcbiAgICBwYWdlc0FuaW1hdGluZyA6IHRoaXMucGFnZXNBbmltYXRpbmcsXG4gICAgYWN0aXZlUGFnZUVsZW1lbnQgOiB0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50LFxuICAgIGluYWN0aXZlUGFnZUVsZW1lbnQgOiB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQsXG4gICAgY3VycmVudEFuaW1hdGlvbiA6IHRoaXMuY3VycmVudEFuaW1hdGlvblxuICB9O1xufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5fZG9GaXJzdCA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHRhc2tzID0gT2JqZWN0LmtleXModGhpc1tuYW1lXSk7XG4gIGFzeW5jLmVhY2godGFza3MsIGZ1bmN0aW9uKHRhc2ssIGNiKSB7XG4gICAgc2VsZltuYW1lXVt0YXNrXShzZWxmLmdldFBhZ2VEYXRhKCksIGZ1bmN0aW9uKGVycikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY2FsbGJhY2soZXJyKTtcbiAgfSk7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLl9kdXJpbmdBbmltYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHRoaXMuZHVyaW5nQW5pbWF0ZSkge1xuICAgIHRoaXMuZHVyaW5nQW5pbWF0ZVtrZXldKHRoaXMuZ2V0UGFnZURhdGEoKSk7XG4gIH1cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUudXBkYXRlSGlzdG9yeSA9IGZ1bmN0aW9uKGtpbmQsIG1lc3NhZ2UpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGhpc3Rvcnlfb2JqZWN0ID0ge307XG4gIGhpc3Rvcnlfb2JqZWN0LmRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8vIGlmIHdlIGFyZSBuYXZpZ2F0aW5nIGZvcndhcmRcbiAgaWYgKGtpbmQgPT09IFwibmF2aWdhdGVcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMubmV4dFBhZ2U7XG4gICAgdGhpcy5oaXN0b3J5LnB1c2goaGlzdG9yeV9vYmplY3QpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGN1cnJlbnRQYWdlIGlzIHNhZmUgdG8gZ28gYmFjayB0byBmcm9tIGFueXdoZXJlXG4gICAgdmFyIGJhY2tfc2FmZSA9IHRoaXMuY3VycmVudFBhZ2UgPyBTYW1zb24uQXBwLlBhZ2VzW3RoaXMuY3VycmVudFBhZ2VdLmJhY2tTYWZlIDogZmFsc2U7XG5cbiAgICAvLyBpZiB0aGUgY3VycmVudFBhZ2UgaXMgYmFja1NhZmUsIHRoZW4gc2V0IGl0IGFzIHRoZSBwcmV2aW91c1BhZ2UsIG90aGVyd2lzZSBzZXQgdGhlIGNvbmZpZ3VyZWQgcHJldmlvdXNQYWdlXG4gICAgdGhpcy5wcmV2aW91c1BhZ2UgPSBiYWNrX3NhZmUgPyB0aGlzLmN1cnJlbnRQYWdlIDogU2Ftc29uLkFwcC5QYWdlc1t0aGlzLm5leHRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIHRoZSBwYWdlIHdlIGFyZSBnb2luZyB0b1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLm5leHRQYWdlO1xuXG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImJhY2tcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMucHJldmlvdXNQYWdlO1xuICAgIHRoaXMuaGlzdG9yeS5wdXNoKGhpc3Rvcnlfb2JqZWN0KTtcblxuICAgIC8vIHdlIGFyZSBnb2luZyBiYWNrLCBzbyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIG91ciBwcmV2aW91c1BhZ2VcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyB3ZSBhcmUgZ29pbmcgYmFjaywgc28gc2V0IHRoZSBwcmV2aW91c1BhZ2UgdG8gdGhlIGN1cnJlbnQgUGFnZSdzIHByZXZpb3VzUGFnZVxuICAgIHRoaXMucHJldmlvdXNQYWdlID0gU2Ftc29uLkFwcC5QYWdlc1t0aGlzLmN1cnJlbnRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImZhaWxlZFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJSb3V0ZXIgZXZlbnQgZmFpbGVkIGJlY2F1c2U6IFwiICsgbWVzc2FnZSk7XG4gIH1cblxuICAvLyBpZiBpdCB3YXNuJ3QganVzdCBhIHBhZ2UgdXBkYXRlLCB0aGVuIHN3aXRjaCB0aGUgYWN0aXZlUGFnZUVsZW1lbnQgYW5kIGluYWN0aXZlUGFnZUVsZW1lbnQgdmFsdWVzXG4gIGlmIChraW5kICE9PSBcInVwZGF0ZVwiICYmIGtpbmQgIT09IFwiZmFpbGVkXCIpIHtcbiAgICB2YXIgbmV3X2FjdGl2ZV9wYWdlID0gdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50O1xuICAgIHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudCA9IHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQ7XG4gICAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IG5ld19hY3RpdmVfcGFnZTtcbiAgfVxuXG4gIHRoaXMubmV4dFBhZ2UgPSBmYWxzZTtcblxuICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYW5vdGhlciByb3V0ZXIgZXZlbnQgaW4gdGhlIHF1ZXVlXG4gIHZhciBxdWV1ZV9ldmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgaWYgKHF1ZXVlX2V2ZW50KSB7XG5cbiAgICBpZiAocXVldWVfZXZlbnQua2luZCA9PT0gXCJuYXZpZ2F0ZVwiKSB7XG5cbiAgICAgIC8vIGFkZGVkIGEgMjBtcyBkZWxheSBkdWUgdG8gc29tZSB3ZWlyZCBiZWhhdmlvciB3aXRoIGNzcyBhbmltYXRpb25zIG5vdCB3b3JraW5nIHdpdGhvdXQgaXRcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgIHNlbGYubmF2aWdhdGUocXVldWVfZXZlbnQubmV4dF9wYWdlLCBxdWV1ZV9ldmVudC5hbmltYXRpb24sIHF1ZXVlX2V2ZW50LmNhbGxiYWNrKTtcbiAgICAgIH0sIDIwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2socXVldWVfZXZlbnQuY2FsbGJhY2spO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5nZXRBbmltYXRpb25EYXRhID0gZnVuY3Rpb24oYW5pbWF0aW9uKSB7XG4gIHZhciBkYXRhID0ge307XG4gIGRhdGEuY3VycmVudCA9IFwibm9uZVwiO1xuICBkYXRhLm5leHQgPSBcIm5vbmVcIjtcblxuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiB0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICBpZiAoYW5pbWF0aW9uID09PSBrZXkpIHtcbiAgICAgIGRhdGEuY3VycmVudCA9IHRoaXMuYW5pbWF0aW9uc1trZXldLmN1cnJlbnQ7XG4gICAgICBkYXRhLm5leHQgPSB0aGlzLmFuaW1hdGlvbnNba2V5XS5uZXh0O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmRvQW5pbWF0aW9uID0gZnVuY3Rpb24oYW5pbWF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgU2Ftc29uLkRPTVt0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5hZGQoYW5pbWF0ZS5uZXh0LCBcImFjdGl2ZVwiKTtcbiAgU2Ftc29uLkRPTVt0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QuYWRkKGFuaW1hdGUuY3VycmVudCk7XG4gIFNhbXNvbi5ET01bdGhpcy5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblxuICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyB3aGlsZSB0aGUgcGFnZXMgYXJlIGFuaW1hdGluZy4gRXg6IHVwZGF0ZSBoZWFkZXIgb3IgZm9vdGVyXG4gIHRoaXMuX2R1cmluZ0FuaW1hdGUoKTtcblxuICB2YXIgYW5pbWF0aW9uRXZlbnQgPSBVdGlscy53aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cbiAgVXRpbHMub25jZShTYW1zb24uRE9NW3RoaXMuaW5hY3RpdmVQYWdlRWxlbWVudF0sIGFuaW1hdGlvbkV2ZW50LCBhbmltYXRpb25FbmRlZCk7XG5cbiAgLy8gbGlzdGVuIGZvciB0aGUgZW5kIG9mIHRoZSBhbmltYXRpb25cbiAgZnVuY3Rpb24gYW5pbWF0aW9uRW5kZWQoKSB7XG5cbiAgICAvLyByZW1vdmUgdGhlIGFuaW1hdGlvbiBjbGFzcyBmcm9tIHRoZSBwYWdlIHdlIGp1c3QgbWFkZSBhY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuaW5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShhbmltYXRlLm5leHQpO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBhbmltYXRpb24gY2xhc3MgZnJvbSB0aGUgcGFnZSB3ZSBqdXN0IG1hZGUgaW5hY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5yZW1vdmUoYW5pbWF0ZS5jdXJyZW50KTtcblxuICAgIHNlbGYucGFnZXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICAgIC8vIHJlbW92ZSB0aGUgb2xkIHBhZ2UgaW5jbHVkaW5nIGFsbCBvZiBpdHMgdmlld3MgYW5kIGV2ZW50cyBmcm9tIHRoZSBET01cbiAgICAvLyBhbHNvIHJlbW92ZSB0aGUgZW50aXJlIHBhZ2UgaW5zdGFuY2UgZnJvbSB0aGUgcm91dGVyJ3MgcGFnZUNhY2hlXG4gICAgaWYgKHNlbGYuY3VycmVudFBhZ2UpIHtcbiAgICAgIHNlbGYucGFnZUNhY2hlW3NlbGYuY3VycmVudFBhZ2VdLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmLnBhZ2VDYWNoZVtzZWxmLmN1cnJlbnRQYWdlXTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24obmV4dF9wYWdlLCBhbmltYXRpb24sIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMucGFnZXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gIGlmIChhbmltYXRpb24gPT09IFwidXBkYXRlXCIpIHtcblxuICAgIHRoaXMucGFnZUNhY2hlW25leHRfcGFnZV0uX3JlbmRlcih0cnVlLCBudWxsLCBmdW5jdGlvbigpIHtcblxuICAgICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZUFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIC8vIGRldGVybWluZSB0aGUgdHlwZSBvZiBhbmltYXRpb24gdGhhdCB3aWxsIGJlIHVzZWRcbiAgICB2YXIgYW5pbWF0aW9uX2RhdGEgPSB0aGlzLmdldEFuaW1hdGlvbkRhdGEoYW5pbWF0aW9uKTtcblxuICAgIC8vIHJlbW92ZSB0aGUgZm9jdXMgZnJvbSB3aGF0ZXZlciBlbGVtZW50IGhhcyBpdCBzbyB0aGUgY3Vyc29yIGRvZXNuJ3QgbWFrZSB0aGUgcGFnZSB0cmFuc2l0aW9uIGxvb2sgc3Vja3lcbiAgICB2YXIgb2xkRm9jdXNFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSA/IGZhbHNlIDogZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAob2xkRm9jdXNFbGVtZW50KSBvbGRGb2N1c0VsZW1lbnQuYmx1cigpO1xuXG4gICAgLy8gcmVuZGVyIHRoZSBuZXcgcGFnZSBvZmYgc2NyZWVuXG4gICAgdGhpcy5wYWdlQ2FjaGVbbmV4dF9wYWdlXS5fcmVuZGVyKGZhbHNlLCBTYW1zb24uRE9NW3RoaXMuaW5hY3RpdmVQYWdlRWxlbWVudF0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyByZW1vdmUgdGhlIGZvY3VzIGZyb20gd2hhdGV2ZXIgZWxlbWVudCBoYXMgaXQsIGFuZCB0aGVuIHJlc3RvcmUgdGhlIGZvY3VzIHdoZW4gdGhlIGFuaW1hdGlvbiBlbmRzXG4gICAgICB2YXIgZm9jdXNFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSA/IGZhbHNlIDogZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGlmIChmb2N1c0VsZW1lbnQpIGZvY3VzRWxlbWVudC5ibHVyKCk7XG5cbiAgICAgIHNlbGYuX2RvRmlyc3QoXCJiZWZvcmVBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgIC8vIHJ1biB0aGUgYW5pbWF0aW9uIG5vdyB0aGF0IHRoZSBuZXcgcGFnZSBpcyBmdWxseSByZW5kZXJlZCBvZmZzY3JlZW5cbiAgICAgICAgc2VsZi5kb0FuaW1hdGlvbihhbmltYXRpb25fZGF0YSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgaWYgKGZvY3VzRWxlbWVudCkge1xuICAgICAgICAgICAgLy8gcmVmb2N1cyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgZm9jdXNFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAvLyByZXNldCB0aGUgdmFsdWUgc28gdGhlIGN1cnNvciBtb3ZlcyB0byB0aGUgZW5kIG9mIHRoZSB0ZXh0XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmb2N1c0VsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICBmb2N1c0VsZW1lbnQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgZm9jdXNFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5uYXZpZ2F0ZSA9IGZ1bmN0aW9uKG5leHRfcGFnZSwgYW5pbWF0aW9uLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBjaGVjayB0byBzZWUgaWYgYW5vdGhlciBSb3V0ZXIgZXZlbnQgaXMgYWxyZWFkeSBiZWluZyBoYW5kbGVkLCBpZiBvbmUgaXMgdGhlbiBhZGQgdGhpcyBldmVudCB0byBhIHF1ZXVlXG4gIGlmICh0aGlzLmlzQnVzeSkge1xuXG4gICAgdGhpcy5xdWV1ZS5wdXNoKHtcbiAgICAgIGtpbmQ6IFwibmF2aWdhdGVcIixcbiAgICAgIG5leHRfcGFnZTogbmV4dF9wYWdlLFxuICAgICAgYW5pbWF0aW9uOiBhbmltYXRpb24sXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIC8vY29uc29sZS5sb2coXCJSb3V0ZXIgaXMgYnVzeS4gVGhpcyBldmVudCBpcyAjXCIgKyBzZWxmLnF1ZXVlLmxlbmd0aCArIFwiIGluIGxpbmVcIik7XG5cbiAgfSBlbHNlIHtcblxuICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcblxuICAgIHZhciBjaG9zZW5fYW5pbWF0aW9uID0gYW5pbWF0aW9uIHx8IHRoaXMubmF2aWdhdGVBbmltYXRpb247XG5cbiAgICAvLyBpZiBhIHBhZ2UgdXBkYXRlIGlzIHJlcXVlc3RlZCBmb3IgYSBwYWdlIHdlIGFyZW4ndCBjdXJyZW50bHkgb24sIHRoZW4gd2Ugd2lsbCBzaW1wbHkgbmF2aWdhdGUgdG8gaXQgbGlrZSBub3JtYWxcbiAgICBpZiAoY2hvc2VuX2FuaW1hdGlvbiA9PT0gXCJ1cGRhdGVcIiAmJiBuZXh0X3BhZ2UgIT09IHRoaXMuY3VycmVudFBhZ2UpIHtcbiAgICAgIGNob3Nlbl9hbmltYXRpb24gPSB0aGlzLm5hdmlnYXRlQW5pbWF0aW9uO1xuICAgIH1cblxuICAgIHRoaXMubmV4dFBhZ2UgPSBuZXh0X3BhZ2U7XG5cbiAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBiZWZvcmUgd2Ugc3RhcnQgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVOYXZpZ2F0ZVwiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSBwYWdlIGV4aXN0cyBiZWZvcmUgdHJ5aW5nIHRvIG5hdmlnYXRlXG4gICAgICBpZiAoIVNhbXNvbi5BcHAuUGFnZXNbbmV4dF9wYWdlXSAmJiAhZXJyKSB7XG4gICAgICAgIGVyciA9IFwiVGhhdCBwYWdlIGRvZXMgbm90IGV4aXN0XCI7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXJyKSB7XG5cbiAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHdlIGFyZSBzdGF5aW5nIG9uIHRoZSBzYW1lIHBhZ2UsIGlmIHdlIGFyZSB0aGVuIHNpbXBseSB1cGRhdGUgdGhlIHBhZ2VcbiAgICAgICAgaWYgKG5leHRfcGFnZSA9PT0gc2VsZi5jdXJyZW50UGFnZSkge1xuICAgICAgICAgIGNob3Nlbl9hbmltYXRpb24gPSBcInVwZGF0ZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYucGFnZUNhY2hlW25leHRfcGFnZV0gPSBTYW1zb24uY3JlYXRlUGFnZShTYW1zb24uQXBwLlBhZ2VzW25leHRfcGFnZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgY3VycmVudCBhbmltYXRpb24gYWNjZXNzaWJsZSBpbiBnZXRQYWdlRGF0YSgpXG4gICAgICAgIHNlbGYuY3VycmVudEFuaW1hdGlvbiA9IGNob3Nlbl9hbmltYXRpb247XG5cbiAgICAgICAgLy8gYW5pbWF0ZSB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgIHNlbGYuYW5pbWF0ZShuZXh0X3BhZ2UsIGNob3Nlbl9hbmltYXRpb24sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlckFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY2hhbmdlcyB0byB0aGUgcGFnZSBoaXN0b3J5XG4gICAgICAgICAgICBpZiAoY2hvc2VuX2FuaW1hdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJ1cGRhdGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZWxmLnVwZGF0ZUhpc3RvcnkoXCJuYXZpZ2F0ZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgbmF2aWdhdGluZ1xuICAgICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyTmF2aWdhdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcImZhaWxlZFwiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmJhY2sgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICAgLy8gY2hlY2sgdG8gc2VlIGlmIGFub3RoZXIgUm91dGVyIGV2ZW50IGlzIGFscmVhZHkgYmVpbmcgaGFuZGxlZCwgaWYgb25lIGlzIHRoZW4gYWRkIHRoaXMgZXZlbnQgdG8gYSBxdWV1ZVxuICBpZiAodGhpcy5pc0J1c3kpIHtcblxuICAgIHRoaXMucXVldWUucHVzaCh7XG4gICAgICBraW5kOiBcImJhY2tcIixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIlJvdXRlciBpcyBidXN5LiBUaGlzIGV2ZW50IGlzICNcIiArIHNlbGYucXVldWUubGVuZ3RoICsgXCIgaW4gbGluZVwiKTtcblxuICB9IGVsc2Uge1xuXG4gICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYmVmb3JlIHdlIHN0YXJ0IHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICB0aGlzLl9kb0ZpcnN0KFwiYmVmb3JlQmFja1wiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGEgcGFnZSB0byBnbyBiYWNrIHRvXG4gICAgICBpZiAoIXNlbGYucHJldmlvdXNQYWdlICYmICFlcnIpIHtcbiAgICAgICAgZXJyID0gXCJObyBwYWdlIHRvIGdvIGJhY2sgdG9cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnIpIHtcblxuICAgICAgICAvLyBsb2FkIHRoZSBwcmV2aW91c1BhZ2UgaW50byB0aGUgcGFnZUNhY2hlXG4gICAgICAgIHNlbGYucGFnZUNhY2hlW3NlbGYucHJldmlvdXNQYWdlXSA9IFNhbXNvbi5jcmVhdGVQYWdlKFNhbXNvbi5BcHAuUGFnZXNbc2VsZi5wcmV2aW91c1BhZ2VdKTtcblxuICAgICAgICAvLyBpZiB0aGUgcGFnZSB3YW50cyBhIGN1c3RvbSBiYWNrIGFuaW1hdGlvbiB0aGVuIHVzZSBpdCwgb3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCBiYWNrIGFuaW1hdGlvblxuICAgICAgICB2YXIgYmFja19hbmltYXRpb24gPSBTYW1zb24uQXBwLlBhZ2VzW3NlbGYuY3VycmVudFBhZ2VdLmJhY2tBbmltYXRpb24gfHwgc2VsZi5iYWNrQW5pbWF0aW9uO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGN1cnJlbnQgYW5pbWF0aW9uIGFjY2Vzc2libGUgaW4gZ2V0UGFnZURhdGEoKVxuICAgICAgICBzZWxmLmN1cnJlbnRBbmltYXRpb24gPSBiYWNrX2FuaW1hdGlvbjtcblxuICAgICAgICAvLyBhbmltYXRlIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgc2VsZi5hbmltYXRlKHNlbGYucHJldmlvdXNQYWdlLCBiYWNrX2FuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyQW5pbWF0ZVwiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjaGFuZ2VzIHRvIHRoZSBwYWdlIGhpc3RvcnlcbiAgICAgICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcImJhY2tcIik7XG5cbiAgICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIGdvaW5nIGJhY2tcbiAgICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlckJhY2tcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcImZhaWxlZFwiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbXNvblJvdXRlcjtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jLWxpdGUnKTtcbnZhciBpc0VxdWFsID0gcmVxdWlyZSgnbG9kYXNoLmlzZXF1YWwnKTtcblxudmFyIHNoYXJlZCA9IHt9O1xuXG4vLyByZXNlcnZlZCBwcm9wZXJ0aWVzIGZvciBjb21wb25lbnRzIGFuZCBwYWdlc1xuc2hhcmVkLnJlc2VydmVkID0gW1wicGF0aFwiLCBcImVsXCIsIFwiZWxlbWVudFwiLCBcInRlbXBsYXRlXCIsIFwic3ViUGFnZU9mXCIsIFwicHJldmlvdXNQYWdlXCIsIFwiYmFja0FuaW1hdGlvblwiLCBcInN0eWxlXCIsIFwiY29tcG9uZW50c1wiLCBcImV2ZW50c1wiLCBcImRvbUV2ZW50c1wiLCBcImFwcEV2ZW50c1wiLCBcInN0YXRlXCIsIFwic2V0U3RhdGVcIiwgXCJyZXNldFN0YXRlXCIsIFwic2V0SW5pdGlhbFN0YXRlXCIsIFwiYmVmb3JlUmVuZGVyXCIsIFwiYWZ0ZXJSZW5kZXJcIiwgXCJiZWZvcmVSZW1vdmVcIiwgXCJyZW5kZXJcIiwgXCJwYXJlbnRcIiwgXCJvblwiLCBcImVtaXRcIiwgXCJvZmZcIl07XG5cbi8vIGNhY2hlZCBmb3IgcGVyZm9ybWFuY2VcbnNoYXJlZC5qdXN0Q2FsbGJhY2sgPSBmdW5jdGlvbihjYikgeyBjYigpOyB9O1xuc2hhcmVkLmp1c3RDYWxsYmFja1RydWUgPSBmdW5jdGlvbihjYikgeyBjYih0cnVlKTsgfTtcbnNoYXJlZC5qdXN0UmV0dXJuT2JqZWN0ID0gZnVuY3Rpb24oKSB7IHJldHVybiB7fTsgfTtcblxuLy8gZ2V0IHRoZSB0b3Btb3N0IHBhcmVudCBwYWdlIG9yIGNvbXBvbmVudCBvZiB0aGUgY3VycmVudCBjb21wb25lbnRcbi8vIHVzZWQgaW4gdGhlIHNldFN0YXRlIG1ldGhvZCBvbiBjb21wb25lbnRzIGFuZCBwYWdlc1xuZnVuY3Rpb24gZ2V0VG9wUGFyZW50KGNvbXBvbmVudCkge1xuICBpZiAoY29tcG9uZW50LnBhcmVudCkge1xuICAgIHJldHVybiBnZXRUb3BQYXJlbnQoY29tcG9uZW50LnBhcmVudCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxufVxuXG4vLyB0aGUgbWV0aG9kcyB0aGF0IFBhZ2VzIGFuZCBDb21wb25lbnRzIHNoYXJlXG5zaGFyZWQuc2V0U3RhdGUgPSBmdW5jdGlvbihuZXdfc3RhdGUpIHsgLy8gbmV3X3N0YXRlIG11c3QgYmUgYW4gb2JqZWN0XG4gIGlmICh0eXBlb2YgbmV3X3N0YXRlID09PSBcIm9iamVjdFwiKSB7XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcblxuICAgIHZhciBwcm9wO1xuICAgIGZvciAocHJvcCBpbiBuZXdfc3RhdGUpIHtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhpcyBwcm9wZXJ0eSBoYXMgY2hhbmdlZFxuICAgICAgaWYgKHRoaXMuc3RhdGVbcHJvcF0gPT09IHVuZGVmaW5lZCkgeyAvLyBpZiB0aGUgcHJvcGVydHkgZG9lc24ndCBleGlzdCBvbiB0aGUgc3RhdGUgb2JqZWN0IHRoZW4gaXQgd2lsbCB1cGRhdGVkXG4gICAgICAgIHRoaXMuc3RhdGVbcHJvcF0gPSBuZXdfc3RhdGVbcHJvcF07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICghaXNFcXVhbCh0aGlzLnN0YXRlW3Byb3BdLCBuZXdfc3RhdGVbcHJvcF0pKSB7IC8vIGlmIHRoZSBleGlzdGluZyBwcm9wZXJ0eSBvbiB0aGUgc3RhdGUgb2JqZWN0IGlzIG5vdCBlcXVhbCB0byB0aGUgdmFsdWUgb24gdGhlIG5ld19zdGF0ZSBvYmplY3QgdGhlbiBpdCB3aWxsIGJlIHVwZGF0ZWRcbiAgICAgICAgdGhpcy5zdGF0ZVtwcm9wXSA9IG5ld19zdGF0ZVtwcm9wXTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLnBhcmVudCB8fCAhdGhpcy5wYXJlbnQuX3R5cGUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBnZXRUb3BQYXJlbnQodGhpcyk7XG4gICAgICAgIHBhcmVudC5fcmVuZGVyKGZhbHNlKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ha2Ugc3VyZSB0byBwYXNzIGFuIG9iamVjdCBpbnRvIHNldFN0YXRlXCIpO1xuICB9XG59O1xuXG5zaGFyZWQucmVzZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmV3X3N0YXRlID0gdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgdGhpcy5zZXRTdGF0ZShuZXdfc3RhdGUpO1xufTtcblxuLy8gcnVuIHRoZSBuYW1lZCBmdW5jdGlvbiBiZWZvcmUgY2FsbGluZyBiYWNrXG5zaGFyZWQuX2RvRmlyc3QgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaykge1xuICB0aGlzW25hbWVdKGZ1bmN0aW9uKCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xufTtcblxuLy8gYWRkIGFueSB0YXNrcyB0aGF0IHRoaXMgcGFnZSBvciBjb21wb25lbnQgd2FudHMgcnVuIGF0IGRpZmZlcmVudCBldmVudHMgZHVyaW5nIHJvdXRlciBuYXZpZ2F0aW9uXG5zaGFyZWQuYWRkUm91dGVyVGFza3MgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHRhc2s7XG4gIGZvciAodGFzayBpbiBvYmouX3JvdXRlcikge1xuICAgIFNhbXNvbi5BcHAuUm91dGVyW3Rhc2tdW29iai5fdXVpZF0gPSBvYmouX3JvdXRlclt0YXNrXS5iaW5kKG9iaik7XG4gIH1cbn1cblxuc2hhcmVkLl9sb2FkRXZlbnRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLl9sb2FkZWRFdmVudHMubGVuZ3RoKSB7XG5cbiAgICB2YXIgZGVsZWdhdGUgPSBnZXRUb3BQYXJlbnQodGhpcykuZGVsZWdhdGU7XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZG9tRXZlbnRzKTtcblxuICAgIHZhciBzZWxlY3Rvcl9lbGVtZW50ID0gKHRoaXMuX3R5cGUgPT09IFwiUGFnZVwiKSA/IG51bGwgOiBcIiNcIiArICB0aGlzLmVsO1xuXG4gICAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICAgIHZhciBldmVudCA9IHt9O1xuICAgICAgdmFyIHNwbGl0X2V2ZW50ID0ga2V5LnNwbGl0KFwiIFwiKTsgLy8gc3BsaXQgYnkgYSBzaW5nbGUgc3BhY2VcbiAgICAgIGV2ZW50LnR5cGUgPSBzcGxpdF9ldmVudC5zaGlmdCgpO1xuICAgICAgZXZlbnQuc2VsZWN0b3IgPSBzcGxpdF9ldmVudC5sZW5ndGggPiAxID8gc3BsaXRfZXZlbnQuam9pbihcIiBcIikgOiBzcGxpdF9ldmVudFswXTtcbiAgICAgIGV2ZW50LnNlbGVjdG9yID0gZXZlbnQuc2VsZWN0b3IgfHwgc2VsZWN0b3JfZWxlbWVudDtcblxuICAgICAgZXZlbnQuaGFuZGxlciA9IGZ1bmN0aW9uIGZpeGVkRXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgc2VsZi5kb21FdmVudHNba2V5XS5jYWxsKHNlbGYsIGUsIGUuY3VycmVudFRhcmdldCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoZXZlbnQuc2VsZWN0b3IpIHtcbiAgICAgICAgZGVsZWdhdGUub24oZXZlbnQudHlwZSwgZXZlbnQuc2VsZWN0b3IsIGV2ZW50LmhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZWdhdGUub24oZXZlbnQudHlwZSwgZXZlbnQuaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2xvYWRlZEV2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgICAgY2IoKTtcblxuICAgIH0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBsb2FkIGFueSBhcHAgZXZlbnRzXG4gICAgICB2YXIgYXBwRXZlbnQ7XG4gICAgICBmb3IgKGFwcEV2ZW50IGluIHNlbGYuYXBwRXZlbnRzKSB7XG4gICAgICAgIFNhbXNvbi5BcHAub24oYXBwRXZlbnQsIHNlbGYuYXBwRXZlbnRzW2FwcEV2ZW50XSwgc2VsZik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgfVxuXG59O1xuXG5zaGFyZWQuX2Rlc3Ryb3lFdmVudHMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIC8vIGRlc3Ryb3kgRE9NIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgZGVsZWdhdGUgPSBnZXRUb3BQYXJlbnQodGhpcykuZGVsZWdhdGU7XG4gIHZhciBpOyB2YXIgZG9tRXZlbnQ7XG4gIGZvciAoaT0wOyBpPHRoaXMuX2xvYWRlZEV2ZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgZG9tRXZlbnQgPSB0aGlzLl9sb2FkZWRFdmVudHNbaV07XG4gICAgaWYgKGRvbUV2ZW50LnNlbGVjdG9yKSB7XG4gICAgICBkZWxlZ2F0ZS5vZmYoZG9tRXZlbnQudHlwZSwgZG9tRXZlbnQuc2VsZWN0b3IsIGRvbUV2ZW50LmhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxlZ2F0ZS5vZmYoZG9tRXZlbnQudHlwZSwgZG9tRXZlbnQuaGFuZGxlcik7XG4gICAgfVxuICB9XG4gIHRoaXMuX2xvYWRlZEV2ZW50cyA9IFtdO1xuXG4gIC8vIG5vdyBkZXN0cm95IGFwcCBldmVudCBsaXN0ZW5lcnNcbiAgdmFyIGFwcEV2ZW50O1xuICBmb3IgKGFwcEV2ZW50IGluIHRoaXMuYXBwRXZlbnRzKSB7XG4gICAgU2Ftc29uLkFwcC5vZmYoYXBwRXZlbnQsIHRoaXMuYXBwRXZlbnRzW2FwcEV2ZW50XSk7XG4gIH1cblxuICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cbn07XG5cbi8vIGF0dGFjaCB0aGUgY29tcG9uZW50cyBwYXNzZWQgYmFjayBmcm9tIHRoZSBzZXRDb21wb25lbnRzIGZ1bmN0aW9uXG5zaGFyZWQuX2xvYWRDb21wb25lbnRzID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBJZiB0aGUgY29tcG9uZW50cyBhcmVuJ3QgbG9hZGVkLCBvciBmb3JjZV91cGRhdGUgaXMgdHJ1ZSwgdGhlbiBsb2FkIHRoZSBjb21wb25lbnRzXG4gIGlmICghdGhpcy5fY29tcG9uZW50c0xvYWRlZCB8fCBmb3JjZV91cGRhdGUpIHtcblxuICAgIHZhciBuZXdfY29tcG9uZW50cyA9IHRoaXMuc2V0Q29tcG9uZW50cygpO1xuXG4gICAgLy8gRmlyc3Qgd2UgZ28gdGhyb3VnaCBlYWNoIGN1cnJlbnRseSBhdHRhY2hlZCBjb21wb25lbnQsIGFuZCBjaGVjayB0byBzZWUgaWYgaXQgc2hvdWxkIHN0aWxsIGV4aXN0XG4gICAgdmFyIG9sZF9jb21wb25lbnRzID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRzKTtcbiAgICBhc3luYy5lYWNoKG9sZF9jb21wb25lbnRzLCBmdW5jdGlvbihvbGRfY29tcG9uZW50LCBjYikge1xuXG4gICAgICB2YXIgc2hvdWxkX2JlX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgdmFyIG5ld19jb21wb25lbnQ7XG4gICAgICBmb3IgKG5ld19jb21wb25lbnQgaW4gbmV3X2NvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKG9sZF9jb21wb25lbnQgPT09IG5ld19jb21wb25lbnQpIHNob3VsZF9iZV9sb2FkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBsb2FkZWQgYnV0IGlzbid0LCB0aGVuIHdlIGxvYWQgaXQuIE90aGVyd2lzZSB3ZSBqdXN0IHNraXAgaXRcbiAgICAgIGlmIChzaG91bGRfYmVfbG9hZGVkKSB7XG4gICAgICAgIC8vIGlmIHRoZSBjb21wb25lbnQgaGFzbid0IGJlZW4gbG9hZGVkIHlldCwgdGhlbiBsb2FkIGl0XG4gICAgICAgIGlmICghc2VsZltvbGRfY29tcG9uZW50XSkge1xuICAgICAgICAgIHNlbGZbb2xkX2NvbXBvbmVudF0gPSBTYW1zb24uY3JlYXRlQ29tcG9uZW50KHNlbGYuY29tcG9uZW50c1tvbGRfY29tcG9uZW50XSk7XG4gICAgICAgICAgc2VsZltvbGRfY29tcG9uZW50XS5wYXJlbnQgPSBzZWxmO1xuICAgICAgICB9XG4gICAgICAgIGNiKCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgY29tcG9uZW50IHNpbmNlIGl0IHNob3VsZG4ndCBiZSBsb2FkZWRcbiAgICAgICAgaWYgKHNlbGZbb2xkX2NvbXBvbmVudF0pIHtcbiAgICAgICAgICBzZWxmW29sZF9jb21wb25lbnRdLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWxldGUgc2VsZltvbGRfY29tcG9uZW50XTtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIE5vdyB0aGF0IHdlIGhhbmRsZWQgYWxsIG9mIHRoZSBleGlzdGluZyBjb21wb25lbnRzLCB3ZSBsb2FkIGFueSBuZXcgY29tcG9uZW50cyB0aGF0IGRvbid0IGV4aXN0IHlldFxuICAgICAgc2VsZi5jb21wb25lbnRzID0gbmV3X2NvbXBvbmVudHM7XG5cbiAgICAgIHZhciBjb21wb25lbnQ7XG4gICAgICBmb3IgKGNvbXBvbmVudCBpbiBzZWxmLmNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKCFzZWxmW2NvbXBvbmVudF0pIHtcbiAgICAgICAgICBzZWxmW2NvbXBvbmVudF0gPSBTYW1zb24uY3JlYXRlQ29tcG9uZW50KHNlbGYuY29tcG9uZW50c1tjb21wb25lbnRdKTtcbiAgICAgICAgICBzZWxmW2NvbXBvbmVudF0ucGFyZW50ID0gc2VsZjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZWxmLl9jb21wb25lbnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgfVxuXG59O1xuXG4vLyByZW5kZXIgdGhlIGNvbXBvbmVudHMgYXR0YWNoZWQgdG8gdGhlIHBhZ2VcbnNoYXJlZC5fcmVuZGVyQ29tcG9uZW50cyA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpO1xuXG4gIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgc2VsZltrZXldLl9yZW5kZXIoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgfSwgZnVuY3Rpb24oKXtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcblxufTtcblxuc2hhcmVkLl9kZXN0cm95Q29tcG9uZW50cyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRzKTtcblxuICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgIHNlbGZba2V5XS5fcmVtb3ZlKGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHNlbGZba2V5XTtcbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5fY29tcG9uZW50c0xvYWRlZCA9IGZhbHNlO1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xuXG59O1xuXG4vLyByZW1vdmVzIGFsbCBldmVudCBsaXN0ZW5lcnMsIERPTSBub2RlcywgYW5kIGNoaWxkIGNvbXBvbmVudHNcbnNoYXJlZC5fcmVtb3ZlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gcmVtb3ZlIHRoZSBzdHlsZXNoZWV0XG4gIGlmICh0aGlzLnN0eWxlKSB0aGlzLnN0eWxlLmRldGFjaCgpO1xuXG4gIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVSZW1vdmVcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kZXN0cm95Q29tcG9uZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgc2VsZi5fZGVzdHJveUV2ZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgICAvLyBkZXN0cm95IHRoZSBET00gZWxlbWVudFxuICAgICAgICBpZiAoc2VsZi5lbGVtZW50ICYmIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgRE9NIG5vZGUgaXMgcmVtb3ZlZCBmcm9tIG1lbW9yeSBxdWlja2x5XG4gICAgICAgIGRlbGV0ZSBzZWxmLmVsZW1lbnQ7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFueSByb3V0ZXIgcmVsYXRlZCB0YXNrc1xuICAgICAgICB2YXIgdGFzaztcbiAgICAgICAgZm9yICh0YXNrIGluIHNlbGYuX3JvdXRlcikge1xuICAgICAgICAgIGRlbGV0ZSBTYW1zb24uQXBwLlJvdXRlclt0YXNrXVtzZWxmLl91dWlkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZXZlbnQgZGVsZWdhdG9yIGlmIGl0IGV4aXN0c1xuICAgICAgICBkZWxldGUgc2VsZi5kZWxlZ2F0ZTtcblxuICAgICAgICAvLyByZXNldCB0aGUgcGFnZSdzIHN0YXRlXG4gICAgICAgIHNlbGYuc3RhdGUgPSB7fTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIiosICo6YmVmb3JlLCAqOmFmdGVyXCI6IHtcbiAgICBcIi13ZWJraXQtYm94LXNpemluZ1wiOiBcImJvcmRlci1ib3hcIixcbiAgICBcImJveC1zaXppbmdcIjogXCJib3JkZXItYm94XCJcbiAgfSxcbiAgXCJodG1sLCBib2R5LCAjc2Ftc29uX2FwcFwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjRkZGXCJcbiAgfSxcbiAgXCIjc2Ftc29uX3BhZ2VzXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBcIixcbiAgICBcImxlZnRcIjogXCIwXCIsXG4gICAgXCJyaWdodFwiOiBcIjBcIixcbiAgICBcImJvdHRvbVwiOiBcIjBcIixcbiAgICBcInotaW5kZXhcIjogMSxcbiAgICBcIm92ZXJmbG93XCI6IFwiaGlkZGVuXCJcbiAgfSxcbiAgXCIuc2Ftc29uLXBhZ2VcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMFwiLFxuICAgIFwibGVmdFwiOiBcIjBcIixcbiAgICBcInJpZ2h0XCI6IFwiMFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMFwiLFxuICAgIFwib3BhY2l0eVwiOiAxLFxuICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMCwwLDApXCJcbiAgfSxcbiAgXCIuc2Ftc29uLXBhZ2UuYWN0aXZlXCI6IHtcbiAgICBcInotaW5kZXhcIjogMlxuICB9XG59O1xuIiwiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTQgSXZhbiBHYWJyaWVsZVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG50aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG50aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG51c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllc1xub2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvXG5zbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIqXCI6IHtcbiAgICBcIi13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvclwiOiBcInJnYmEoMCwwLDAsMClcIlxuICB9LFxuICBcIjpmb2N1c1wiOiB7XG4gICAgXCJvdXRsaW5lXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsIGEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgYnV0dG9uLCBjaXRlLCBjb2RlLCBkZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsIHNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsIGIsIHUsIGksIGNlbnRlciwgZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSwgZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCB0YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCwgYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIGZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksIHRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlb1wiOiB7XG4gICAgXCJtYXJnaW5cIjogXCIwXCIsXG4gICAgXCJwYWRkaW5nXCI6IFwiMFwiLFxuICAgIFwiYm9yZGVyXCI6IFwiMFwiLFxuICAgIFwiZm9udC1zaXplXCI6IFwiMTAwJVwiLFxuICAgIFwiZm9udFwiOiBcImluaGVyaXRcIixcbiAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwiYmFzZWxpbmVcIlxuICB9LFxuICBcImFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvblwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxuICB9LFxuICBcImFcIjoge1xuICAgIFwiY29sb3JcIjogXCJpbmhlcml0XCIsXG4gICAgXCJvdXRsaW5lXCI6IFwibm9uZVwiLFxuICAgIFwidGV4dC1kZWNvcmF0aW9uXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiYmxvY2txdW90ZSwgcVwiOiB7XG4gICAgXCJxdW90ZXNcIjogXCJub25lXCJcbiAgfSxcbiAgXCJibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlciwgcTpiZWZvcmUsIHE6YWZ0ZXJcIjoge1xuICAgIFwiY29udGVudFwiOiBcIm5vbmVcIlxuICB9LFxuICBcImJvZHlcIjoge1xuICAgIFwiZm9udC1zbW9vdGhpbmdcIjogXCJhbnRpYWxpYXNlZFwiLFxuICAgIFwidGV4dC1zaXplLWFkanVzdFwiOiBcIm5vbmVcIixcbiAgICBcInRvdWNoLWNhbGxvdXRcIjogXCJub25lXCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVaKDApXCIsXG4gICAgXCJ1c2VyLXNlbGVjdFwiOiBcIm5vbmVcIixcbiAgICBcImxpbmUtaGVpZ2h0XCI6IFwiMVwiXG4gIH0sXG4gIFwiY2FwdGlvbiwgdGhcIjoge1xuICAgIFwidGV4dC1hbGlnblwiOiBcImxlZnRcIlxuICB9LFxuICBcImZpZWxkc2V0LCBpbWdcIjoge1xuICAgIFwiYm9yZGVyXCI6IFwiMFwiXG4gIH0sXG4gIFwiaHRtbFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiMwMDBcIixcbiAgICBcImJhY2tncm91bmRcIjogXCIjZmZmXCJcbiAgfSxcbiAgXCJsZWdlbmRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjMDAwXCJcbiAgfSxcbiAgXCJvbCwgdWxcIjoge1xuICAgIFwibGlzdC1zdHlsZVwiOiBcIm5vbmVcIlxuICB9LFxuICBcInN1YlwiOiB7XG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInRleHQtYm90dG9tXCJcbiAgfSxcbiAgXCJzdXBcIjoge1xuICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0ZXh0LXRvcFwiXG4gIH0sXG4gIFwidGFibGVcIjoge1xuICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IFwiY29sbGFwc2VcIixcbiAgICBcImJvcmRlci1zcGFjaW5nXCI6IFwiMFwiXG4gIH0sXG4gIFwidGV4dGFyZWFcIjoge1xuICAgIFwicmVzaXplXCI6IFwibm9uZVwiXG4gIH1cbn07XG4iLCIvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgdXRpbHMgPSB7fTtcblxuLy8gYWRkIGFueSB1bnJlc2VydmVkIHByb3BlcnRpZXMgdG8gdGhlIHBhc3NlZCBpbiBvYmplY3Rcbi8vIGFueSBwcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggXyBhcmUgcmVzZXJ2ZWRcbmZ1bmN0aW9uIHN0YXJ0c1dpdGhfKHdvcmQpIHtcbiAgcmV0dXJuICh3b3JkLmNoYXJBdCgwKSA9PSBcIl9cIikgPyB0cnVlIDogZmFsc2U7XG59XG5cbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaiwgY3VzdG9tX3Byb3BzLCByZXNlcnZlZCkge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBjdXN0b21fcHJvcHMpIHtcbiAgICBpZiAoIXN0YXJ0c1dpdGhfKGtleSkgJiYgcmVzZXJ2ZWQuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgb2JqW2tleV0gPSBjdXN0b21fcHJvcHNba2V5XTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHdoaWNoRXZlbnROYW1lKGV2ZW50X3R5cGUpIHtcbiAgdmFyIGtleTtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZScpO1xuXG4gIHZhciBldmVudF9uYW1lcyA9IHtcbiAgICB0cmFuc2l0aW9ucyA6IHtcbiAgICAgICd0cmFuc2l0aW9uJzondHJhbnNpdGlvbmVuZCcsXG4gICAgICAnT1RyYW5zaXRpb24nOidvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAnTW96VHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nOid3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICdhbmltYXRpb24nOidhbmltYXRpb25lbmQnLFxuICAgICAgJ09BbmltYXRpb24nOidvQW5pbWF0aW9uRW5kJyxcbiAgICAgICdNb3pBbmltYXRpb24nOidhbmltYXRpb25lbmQnLFxuICAgICAgJ1dlYmtpdEFuaW1hdGlvbic6J3dlYmtpdEFuaW1hdGlvbkVuZCdcbiAgICB9XG4gIH07XG5cbiAgZm9yIChrZXkgaW4gZXZlbnRfbmFtZXNbZXZlbnRfdHlwZV0pIHtcbiAgICBpZihlbC5zdHlsZVtrZXldICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIGV2ZW50X25hbWVzW2V2ZW50X3R5cGVdW2tleV07XG4gICAgfVxuICB9XG59XG5cbnV0aWxzLndoaWNoVHJhbnNpdGlvbkV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aGljaEV2ZW50TmFtZShcInRyYW5zaXRpb25zXCIpO1xufTtcblxudXRpbHMud2hpY2hBbmltYXRpb25FdmVudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2hpY2hFdmVudE5hbWUoXCJhbmltYXRpb25zXCIpO1xufTtcblxuLy8gbGlzdGVuIHRvIGFuIGV2ZW50IG9uY2Ugd2l0aG91dCBqcXVlcnlcbnV0aWxzLm9uY2UgPSBmdW5jdGlvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuXG4gIC8vIGNyZWF0ZSBldmVudFxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZnVuY3Rpb24oZSkge1xuICAgIC8vIHJlbW92ZSBldmVudFxuICAgIGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCBhcmd1bWVudHMuY2FsbGVlKTtcbiAgICAvLyBjYWxsIGhhbmRsZXJcbiAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuIiwiLy8gVGlueSBBc3luYyBsaWJyYXJ5IGZvciB1c2UgaW4gbW9kZXJuIGVudmlyb25tZW50c1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gcm9vdCBpcyBnbG9iYWwgb24gdGhlIHNlcnZlciwgYW5kIHdpbmRvdyBpbiB0aGUgYnJvd3NlclxuICB2YXIgcm9vdDtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gd2luZG93KSB7XG4gICAgcm9vdCA9IHdpbmRvdztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIHRoaXMgPT09IGdsb2JhbCkge1xuICAgIHJvb3QgPSBnbG9iYWw7XG4gIH0gZWxzZSB7XG4gICAgcm9vdCA9IHRoaXM7XG4gIH1cblxuICAvLyBjYWNoZWQgZm9yIHBlcmZvcm1hbmNlXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICB2YXIgT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuXG4gIC8vIGlzQXJyYXkgYW5kIGlzT2JqZWN0IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKTtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0S2V5cyhvYmopLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9FYWNoKGFyciwgaXRlcmF0b3IpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlcmF0b3IoYXJyW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIGRvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkocm9vdCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBfZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgYXN5bmMgPSB7XG5cbiAgICAvLyBydW5zIHRoZSB0YXNrIG9uIGV2ZXJ5IGl0ZW0gaW4gdGhlIGFycmF5IGF0IG9uY2VcbiAgICBlYWNoIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgZG9FYWNoKGFyciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpdGVyYXRvcihpdGVtLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkID49IGFtb3VudCkgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gcnVucyB0aHJvdWdoIHRoZSBhcnJheSBvbmUgaXRlbSBhdCBhIHRpbWVcbiAgICBlYWNoU2VyaWVzIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyW2NvbXBsZXRlZF0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA8IGFtb3VudCkge1xuICAgICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgICAgaXRlcmF0ZSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYW4gYWNjZXB0IGFuIG9iamVjdCBvciBhcnJheVxuICAgIC8vIHdpbGwgcmV0dXJuIGFuIG9iamVjdCBvciBhcnJheSBvZiByZXN1bHRzIGluIHRoZSBjb3JyZWN0IG9yZGVyXG4gICAgcGFyYWxsZWwgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgdmFyIGtleXM7IHZhciBsZW5ndGg7IHZhciBpOyB2YXIgcmVzdWx0czsgdmFyIGtpbmQ7XG4gICAgICB2YXIgdXBkYXRlZF90YXNrcyA9IFtdO1xuICAgICAgdmFyIGlzX29iamVjdDtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgaWYgKGlzQXJyYXkodGFza3MpKSB7XG5cbiAgICAgICAgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0gW107XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGFza3MpKSB7XG5cbiAgICAgICAgaXNfb2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAga2V5cyA9IE9iamVjdEtleXModGFza3MpO1xuICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IHt9O1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpPTA7IGk8bGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoaXNfb2JqZWN0KSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazoga2V5c1tpXSwgdDogdGFza3Nba2V5c1tpXV0gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazogaSwgdDogdGFza3NbaV0gfSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkX3Rhc2tzLmZvckVhY2goZnVuY3Rpb24odGFza19vYmplY3QpIHtcblxuICAgICAgICB0YXNrX29iamVjdC50KGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgICByZXN1bHRzW3Rhc2tfb2JqZWN0LmtdID0gcmVzdWx0O1xuXG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIGlmIChjb3VudGVyID09IGxlbmd0aCkgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvLyBvbmx5IGFjY2VwdHMgYW4gYXJyYXkgc2luY2UgdGhlIHByZXNlcnZhdGlvbiBvZiB0aGUgb3JkZXIgb2YgcHJvcGVydGllcyBvbiBhbiBvYmplY3QgY2FuJ3QgYmUgZ3VhcmFudGVlZFxuICAgIC8vIHJldHVybnMgYW4gYXJyYXkgb2YgcmVzdWx0cyBpbiBvcmRlclxuICAgIHNlcmllcyA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFza3MpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIHJ1blRhc2soaW5kZXgpIHtcbiAgICAgICAgdGFza3NbaW5kZXhdKGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSkgcmV0dXJuIHJ1blRhc2soaW5kZXggKyAxKTtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5UYXNrKDApO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgfVxuICAvLyBBTUQgLyBSZXF1aXJlSlNcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFzeW5jO1xuICAgIH0pO1xuICB9XG4gIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgZWxzZSB7XG4gICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICB9XG5cbn0oKSk7XG4iLCIndXNlIHN0cmljdCdcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG4vKipcbiAqIEhhbmRsZSBgZXh0ZW5kYCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge1J1bGV9IHJ1bGVcbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICB2YXIgc3R5bGUgPSBydWxlLnN0eWxlXG5cbiAgICBpZiAoIXN0eWxlIHx8ICFzdHlsZS5leHRlbmQpIHJldHVyblxuXG4gICAgdmFyIG5ld1N0eWxlID0ge31cblxuICAgIDsoZnVuY3Rpb24gZXh0ZW5kKHN0eWxlKSB7XG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKHN0eWxlLmV4dGVuZCkgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZS5leHRlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBleHRlbmQoc3R5bGUuZXh0ZW5kW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZS5leHRlbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PSAnZXh0ZW5kJykgZXh0ZW5kKHN0eWxlLmV4dGVuZC5leHRlbmQpXG4gICAgICAgICAgICAgICAgZWxzZSBuZXdTdHlsZVtwcm9wXSA9IHN0eWxlLmV4dGVuZFtwcm9wXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29weSBiYXNlIHN0eWxlLlxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgICAgICBpZiAocHJvcCAhPSAnZXh0ZW5kJykgbmV3U3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXVxuICAgICAgICB9XG4gICAgfShzdHlsZSkpXG5cbiAgICBydWxlLnN0eWxlID0gbmV3U3R5bGVcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgdmVuZG9yID0gcmVxdWlyZSgnY3NzLXZlbmRvcicpXG5cbnZhciBLRVlGUkFNRVMgPSAnQGtleWZyYW1lcydcbnZhciBLRVlGUkFNRVNfTEVOR0hUID0gS0VZRlJBTUVTLmxlbmd0aFxuXG4vKipcbiAqIEFkZCB2ZW5kb3IgcHJlZml4IHRvIGEgcHJvcGVydHkgbmFtZSB3aGVuIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge1J1bGV9IHJ1bGVcbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICB2YXIgc3R5bGUgPSBydWxlLnN0eWxlXG5cbiAgICBpZiAocnVsZS5pc0F0UnVsZSAmJiBydWxlLnNlbGVjdG9yLnN1YnN0cigwLCBLRVlGUkFNRVNfTEVOR0hUKSA9PSBLRVlGUkFNRVMpIHtcbiAgICAgICAgcnVsZS5zZWxlY3RvciA9ICdAJyArIHZlbmRvci5wcmVmaXguY3NzICsgJ2tleWZyYW1lcycgKyBydWxlLnNlbGVjdG9yLnN1YnN0cihLRVlGUkFNRVNfTEVOR0hUKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlW3Byb3BdXG5cbiAgICAgICAgdmFyIGNoYW5nZVByb3AgPSBmYWxzZVxuICAgICAgICB2YXIgc3VwcG9ydGVkUHJvcCA9IHZlbmRvci5zdXBwb3J0ZWRQcm9wZXJ0eShwcm9wKVxuICAgICAgICBpZiAoc3VwcG9ydGVkUHJvcCAmJiBzdXBwb3J0ZWRQcm9wICE9PSBwcm9wKSBjaGFuZ2VQcm9wID0gdHJ1ZVxuXG4gICAgICAgIHZhciBjaGFuZ2VWYWx1ZSA9IGZhbHNlXG4gICAgICAgIHZhciBzdXBwb3J0ZWRWYWx1ZSA9IHZlbmRvci5zdXBwb3J0ZWRWYWx1ZShzdXBwb3J0ZWRQcm9wLCB2YWx1ZSlcbiAgICAgICAgaWYgKHN1cHBvcnRlZFZhbHVlICYmIHN1cHBvcnRlZFZhbHVlICE9PSB2YWx1ZSkgY2hhbmdlVmFsdWUgPSB0cnVlXG5cbiAgICAgICAgaWYgKGNoYW5nZVByb3AgfHwgY2hhbmdlVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VQcm9wKSBkZWxldGUgc3R5bGVbcHJvcF1cbiAgICAgICAgICAgIHN0eWxlW3N1cHBvcnRlZFByb3BdID0gc3VwcG9ydGVkVmFsdWVcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFZlbmRvciBwcmVmaXggc3RyaW5nIGZvciB0aGUgY3VycmVudCBicm93c2VyLlxuICpcbiAqIEB0eXBlIHt7anM6IFN0cmluZywgY3NzOiBTdHJpbmd9fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5wcmVmaXggPSByZXF1aXJlKCcuL2xpYi9wcmVmaXgnKVxuXG4vKipcbiAqIFRlc3QgaWYgYSBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQsIHJldHVybnMgcHJvcGVydHkgd2l0aCB2ZW5kb3JcbiAqIHByZWZpeCBpZiByZXF1aXJlZCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BcbiAqIEByZXR1cm4ge1N0cmluZ3xCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5zdXBwb3J0ZWRQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vbGliL3N1cHBvcnRlZC1wcm9wZXJ0eScpXG5cbi8qKlxuICogUmV0dXJucyBwcmVmaXhlZCB2YWx1ZSBpZiBuZWVkZWQuIFJldHVybnMgYGZhbHNlYCBpZiB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd8Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cbiBleHBvcnRzLnN1cHBvcnRlZFZhbHVlID0gcmVxdWlyZSgnLi9saWIvc3VwcG9ydGVkLXZhbHVlJylcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgcmVnRXhwID0gL1stXFxzXSsoLik/L2dcblxuLyoqXG4gKiBDb252ZXJ0IGRhc2ggc2VwYXJhdGVkIHN0cmluZ3MgdG8gY2FtZWwgY2FzZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShyZWdFeHAsIHRvVXBwZXIpXG59XG5cbmZ1bmN0aW9uIHRvVXBwZXIobWF0Y2gsIGMpIHtcbiAgICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnXG59XG5cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEV4cG9ydCBqYXZhc2NyaXB0IHN0eWxlIGFuZCBjc3Mgc3R5bGUgdmVuZG9yIHByZWZpeGVzLlxuICogQmFzZWQgb24gXCJ0cmFuc2Zvcm1cIiBzdXBwb3J0IHRlc3QuXG4gKi9cblxudmFyIGpzQ3NzTWFwID0ge1xuICAgIFdlYmtpdDogJy13ZWJraXQtJyxcbiAgICBNb3o6ICctbW96LScsXG4gICAgLy8gSUUgZGlkIGl0IHdyb25nIGFnYWluIC4uLlxuICAgIG1zOiAnLW1zLScsXG4gICAgTzogJy1vLSdcbn1cblxudmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLnN0eWxlXG52YXIgdGVzdFByb3AgPSAnVHJhbnNmb3JtJ1xuXG5mb3IgKHZhciBqcyBpbiBqc0Nzc01hcCkge1xuICAgIGlmICgoanMgKyB0ZXN0UHJvcCkgaW4gc3R5bGUpIHtcbiAgICAgICAgZXhwb3J0cy5qcyA9IGpzXG4gICAgICAgIGV4cG9ydHMuY3NzID0ganNDc3NNYXBbanNdXG4gICAgICAgIGJyZWFrXG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBwcmVmaXggPSByZXF1aXJlKCcuL3ByZWZpeCcpXG52YXIgY2FtZWxpemUgPSByZXF1aXJlKCcuL2NhbWVsaXplJylcblxudmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG5cbi8qKlxuICogV2UgdGVzdCBldmVyeSBwcm9wZXJ0eSBvbiB2ZW5kb3IgcHJlZml4IHJlcXVpcmVtZW50LlxuICogT25jZSB0ZXN0ZWQsIHJlc3VsdCBpcyBjYWNoZWQuIEl0IGdpdmVzIHVzIHVwIHRvIDcwJSBwZXJmIGJvb3N0LlxuICogaHR0cDovL2pzcGVyZi5jb20vZWxlbWVudC1zdHlsZS1vYmplY3QtYWNjZXNzLXZzLXBsYWluLW9iamVjdFxuICpcbiAqIFByZWZpbGwgY2FjaGUgd2l0aCBrbm93biBjc3MgcHJvcGVydGllcyB0byByZWR1Y2UgYW1vdW50IG9mXG4gKiBwcm9wZXJ0aWVzIHdlIG5lZWQgdG8gZmVhdHVyZSB0ZXN0IGF0IHJ1bnRpbWUuXG4gKiBodHRwOi8vZGF2aWR3YWxzaC5uYW1lL3ZlbmRvci1wcmVmaXhcbiAqL1xudmFyIGNhY2hlID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJycpXG4gICAgdmFyIGNhY2hlID0ge31cblxuICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgICBjYWNoZVtjb21wdXRlZFtrZXldXSA9IGNvbXB1dGVkW2tleV1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVcbn0oKSlcblxuLyoqXG4gKiBUZXN0IGlmIGEgcHJvcGVydHkgaXMgc3VwcG9ydGVkLCByZXR1cm5zIHN1cHBvcnRlZCBwcm9wZXJ0eSB3aXRoIHZlbmRvclxuICogcHJlZml4IGlmIHJlcXVpcmVkLiBSZXR1cm5zIGBmYWxzZWAgaWYgbm90IHN1cHBvcnRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBkYXNoIHNlcGFyYXRlZFxuICogQHJldHVybiB7U3RyaW5nfEJvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgLy8gV2UgaGF2ZSBub3QgdGVzdGVkIHRoaXMgcHJvcCB5ZXQsIGxldHMgZG8gdGhlIHRlc3QuXG4gICAgaWYgKGNhY2hlW3Byb3BdICE9IG51bGwpIHJldHVybiBjYWNoZVtwcm9wXVxuXG4gICAgLy8gQ2FtZWxpemF0aW9uIGlzIHJlcXVpcmVkIGJlY2F1c2Ugd2UgY2FuJ3QgdGVzdCB1c2luZ1xuICAgIC8vIGNzcyBzeW50YXggZm9yIGUuZy4gaW4gRkYuXG4gICAgLy8gVGVzdCBpZiBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgYXMgaXQgaXMuXG4gICAgaWYgKGNhbWVsaXplKHByb3ApIGluIGVsLnN0eWxlKSB7XG4gICAgICAgIGNhY2hlW3Byb3BdID0gcHJvcFxuICAgIC8vIFRlc3QgaWYgcHJvcGVydHkgaXMgc3VwcG9ydGVkIHdpdGggdmVuZG9yIHByZWZpeC5cbiAgICB9IGVsc2UgaWYgKChwcmVmaXguanMgKyBjYW1lbGl6ZSgnLScgKyBwcm9wKSkgaW4gZWwuc3R5bGUpIHtcbiAgICAgICAgY2FjaGVbcHJvcF0gPSBwcmVmaXguY3NzICsgcHJvcFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhY2hlW3Byb3BdID0gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVbcHJvcF1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgcHJlZml4ID0gcmVxdWlyZSgnLi9wcmVmaXgnKVxuXG52YXIgY2FjaGUgPSB7fVxuXG52YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcblxuLyoqXG4gKiBSZXR1cm5zIHByZWZpeGVkIHZhbHVlIGlmIG5lZWRlZC4gUmV0dXJucyBgZmFsc2VgIGlmIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ3xCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocHJvcGVydHksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJyB8fCAhaXNOYU4ocGFyc2VJbnQodmFsdWUsIDEwKSkpIHJldHVybiB2YWx1ZVxuXG4gICAgdmFyIGNhY2hlS2V5ID0gcHJvcGVydHkgKyB2YWx1ZVxuXG4gICAgaWYgKGNhY2hlW2NhY2hlS2V5XSAhPSBudWxsKSByZXR1cm4gY2FjaGVbY2FjaGVLZXldXG5cbiAgICAvLyBUZXN0IHZhbHVlIGFzIGl0IGlzLlxuICAgIGVsLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlXG5cbiAgICAvLyBWYWx1ZSBpcyBzdXBwb3J0ZWQgYXMgaXQgaXMuXG4gICAgaWYgKGVsLnN0eWxlW3Byb3BlcnR5XSA9PSB2YWx1ZSkge1xuICAgICAgICBjYWNoZVtjYWNoZUtleV0gPSB2YWx1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRlc3QgdmFsdWUgd2l0aCB2ZW5kb3IgcHJlZml4LlxuICAgICAgICB2YWx1ZSA9IHByZWZpeC5jc3MgKyB2YWx1ZVxuICAgICAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZVxuXG4gICAgICAgIC8vIFZhbHVlIGlzIHN1cHBvcnRlZCB3aXRoIHZlbmRvciBwcmVmaXguXG4gICAgICAgIGlmIChlbC5zdHlsZVtwcm9wZXJ0eV0gPT0gdmFsdWUpIGNhY2hlW2NhY2hlS2V5XSA9IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKCFjYWNoZVtjYWNoZUtleV0pIGNhY2hlW2NhY2hlS2V5XSA9IGZhbHNlXG5cbiAgICByZXR1cm4gY2FjaGVbY2FjaGVLZXldXG59XG4iLCIvKipcbiAqIFN0eWxlU2hlZXRzIHdyaXR0ZW4gaW4gamF2YXNjcmlwdC5cbiAqXG4gKiBAY29weXJpZ2h0IE9sZWcgU2xvYm9kc2tvaSAyMDE0XG4gKiBAd2Vic2l0ZSBodHRwczovL2dpdGh1Yi5jb20vanNzdHlsZXMvanNzXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4JylcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgcGx1Z2lucyA9IHJlcXVpcmUoJy4vcGx1Z2lucycpXG5cbnZhciB1aWQgPSAwXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuLyoqXG4gKiBSdWxlIGlzIHNlbGVjdG9yICsgc3R5bGUgaGFzaC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW3NlbGVjdG9yXVxuICogQHBhcmFtIHtPYmplY3R9IFtzdHlsZV0gZGVjbGFyYXRpb25zIGJsb2NrXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBSdWxlKHNlbGVjdG9yLCBzdHlsZSwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IHN0eWxlXG4gICAgICAgIHN0eWxlID0gc2VsZWN0b3JcbiAgICAgICAgc2VsZWN0b3IgPSBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5pZCA9IFJ1bGUudWlkKytcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lZCA9PSBudWxsKSB0aGlzLm9wdGlvbnMubmFtZWQgPSB0cnVlXG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yXG4gICAgICAgIHRoaXMuaXNBdFJ1bGUgPSBzZWxlY3RvclswXSA9PSAnQCdcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzQXRSdWxlID0gZmFsc2VcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBSdWxlLk5BTUVTUEFDRV9QUkVGSVggKyAnLScgKyB0aGlzLmlkXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSAnLicgKyB0aGlzLmNsYXNzTmFtZVxuICAgIH1cblxuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICAgIC8vIFdpbGwgYmUgc2V0IGJ5IFN0eWxlU2hlZXQjbGluayBpZiBsaW5rIG9wdGlvbiBpcyB0cnVlLlxuICAgIHRoaXMuQ1NTUnVsZSA9IG51bGxcbiAgICAvLyBXaGVuIGF0LXJ1bGUgaGFzIHN1YiBydWxlcy5cbiAgICB0aGlzLnJ1bGVzID0gbnVsbFxuICAgIGlmICh0aGlzLmlzQXRSdWxlICYmIHRoaXMuc3R5bGUpIHRoaXMuZXh0cmFjdEF0UnVsZXMoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1bGVcblxuLyoqXG4gKiBDbGFzcyBuYW1lIHByZWZpeCB3aGVuIGdlbmVyYXRlZC5cbiAqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJ1bGUuTkFNRVNQQUNFX1BSRUZJWCA9ICdqc3MnXG5cbi8qKlxuICogSW5kZW50YXRpb24gc3RyaW5nIGZvciBmb3JtYXR0aW5nIHRvU3RyaW5nIG91dHB1dC5cbiAqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJ1bGUuSU5ERU5UQVRJT04gPSAnICAnXG5cbi8qKlxuICogVW5pcXVlIGlkLCByaWdodCBub3cganVzdCBhIGNvdW50ZXIsIGJlY2F1c2UgdGhlcmUgaXMgbm8gbmVlZCBmb3IgYmV0dGVyIHVpZC5cbiAqXG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJ1bGUudWlkID0gMFxuXG4vKipcbiAqIEdldCBvciBzZXQgYSBzdHlsZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBbdmFsdWVdXG4gKiBAcmV0dXJuIHtSdWxlfFN0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SdWxlLnByb3RvdHlwZS5wcm9wID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgLy8gSXRzIGEgc2V0dGVyLlxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZSkgdGhpcy5zdHlsZSA9IHt9XG4gICAgICAgIHRoaXMuc3R5bGVbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAvLyBJZiBsaW5rZWQgb3B0aW9uIGluIFN0eWxlU2hlZXQgaXMgbm90IHBhc3NlZCwgQ1NTUnVsZSBpcyBub3QgZGVmaW5lZC5cbiAgICAgICAgaWYgKHRoaXMuQ1NTUnVsZSkgdGhpcy5DU1NSdWxlLnN0eWxlW25hbWVdID0gdmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvLyBJdHMgYSBnZXR0ZXIuXG4gICAgaWYgKHRoaXMuc3R5bGUpIHZhbHVlID0gdGhpcy5zdHlsZVtuYW1lXVxuXG4gICAgLy8gUmVhZCB0aGUgdmFsdWUgZnJvbSB0aGUgRE9NIGlmIGl0cyBub3QgY2FjaGVkLlxuICAgIGlmICh2YWx1ZSA9PSBudWxsICYmIHRoaXMuQ1NTUnVsZSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuQ1NTUnVsZS5zdHlsZVtuYW1lXVxuICAgICAgICAvLyBDYWNoZSB0aGUgdmFsdWUgYWZ0ZXIgd2UgaGF2ZSBnb3QgaXQgZnJvbSB0aGUgRE9NIG9uY2UuXG4gICAgICAgIHRoaXMuc3R5bGVbbmFtZV0gPSB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxufVxuXG4vKipcbiAqIEFkZCBjaGlsZCBydWxlLiBSZXF1aXJlZCBmb3IgcGx1Z2lucyBsaWtlIFwibmVzdGVkXCIuXG4gKiBTdHlsZVNoZWV0IHdpbGwgcmVuZGVyIHRoZW0gYXMgYSBzZXBhcmF0ZSBydWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIHJ1bGUgb3B0aW9uc1xuICogQHJldHVybiB7UnVsZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SdWxlLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIChzZWxlY3Rvciwgc3R5bGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4pIHRoaXMuY2hpbGRyZW4gPSB7fVxuICAgIHRoaXMuY2hpbGRyZW5bc2VsZWN0b3JdID0ge1xuICAgICAgICBzdHlsZTogc3R5bGUsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEFkZCBjaGlsZCBydWxlLiBSZXF1aXJlZCBmb3IgcGx1Z2lucyBsaWtlIFwibmVzdGVkXCIuXG4gKiBTdHlsZVNoZWV0IHdpbGwgcmVuZGVyIHRoZW0gYXMgYSBzZXBhcmF0ZSBydWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUuZXh0cmFjdEF0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnJ1bGVzKSB0aGlzLnJ1bGVzID0ge31cblxuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5zdHlsZSkge1xuICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlW25hbWVdXG4gICAgICAgIC8vIE5vdCBhIG5lc3RlZCBydWxlLlxuICAgICAgICBpZiAodHlwZW9mIHN0eWxlID09ICdzdHJpbmcnKSBicmVha1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLm9wdGlvbnMubmFtZWQgPyB1bmRlZmluZWQgOiBuYW1lXG4gICAgICAgIHZhciBydWxlID0gdGhpcy5ydWxlc1tuYW1lXSA9IG5ldyBSdWxlKHNlbGVjdG9yLCBzdHlsZSwgdGhpcy5vcHRpb25zKVxuICAgICAgICBwbHVnaW5zLnJ1bihydWxlKVxuICAgICAgICBkZWxldGUgdGhpcy5zdHlsZVtuYW1lXVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQXBwbHkgcnVsZSB0byBhbiBlbGVtZW50IGlubGluZS5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SdWxlLnByb3RvdHlwZS5hcHBseVRvID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuc3R5bGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zdHlsZVtwcm9wXVxuICAgICAgICBpZiAodG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZVtpXVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBydWxlIHRvIGNzcyBzdHJpbmcuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVcblxuICAgIC8vIEF0IHJ1bGVzIGxpa2UgQGNoYXJzZXRcbiAgICBpZiAodGhpcy5pc0F0UnVsZSAmJiAhdGhpcy5zdHlsZSAmJiAhdGhpcy5ydWxlcykgcmV0dXJuIHRoaXMuc2VsZWN0b3IgKyAnOydcblxuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG4gICAgaWYgKG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCA9PSBudWxsKSBvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwgPSAwXG5cbiAgICB2YXIgc3RyID0gaW5kZW50KG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCwgdGhpcy5zZWxlY3RvciArICcgeycpXG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlW3Byb3BdXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gZ2VuZXJhdGUgbXVsdGlwbGUgc3R5bGUgd2l0aCBpZGVudGljYWwgcHJvcGVydHkgbmFtZXMuXG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9ICdcXG4nICsgaW5kZW50KG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCArIDEsIHByb3AgKyAnOiAnICsgdmFsdWVbaV0gKyAnOycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHIgKz0gJ1xcbicgKyBpbmRlbnQob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsICsgMSwgcHJvcCArICc6ICcgKyB2YWx1ZSArICc7JylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdlIGFyZSBoYXZlIGFuIGF0LXJ1bGUgd2l0aCBuZXN0ZWQgc3RhdGVtZW50cy5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvQXQtcnVsZVxuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5ydWxlcykge1xuICAgICAgICB2YXIgcnVsZVN0ciA9IHRoaXMucnVsZXNbbmFtZV0udG9TdHJpbmcoe1xuICAgICAgICAgICAgaW5kZW50YXRpb25MZXZlbDogb3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsICsgMVxuICAgICAgICB9KVxuICAgICAgICBzdHIgKz0gJ1xcbicgKyBpbmRlbnQob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsLCBydWxlU3RyKVxuICAgIH1cblxuICAgIHN0ciArPSAnXFxuJyArIGluZGVudChvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwsICd9JylcblxuICAgIHJldHVybiBzdHJcbn1cblxuLyoqXG4gKiBSZXR1cm5zIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIHJ1bGUuXG4gKiBOZXN0ZWQgcnVsZXMsIGF0LXJ1bGVzIGFuZCBhcnJheSB2YWx1ZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHlsZSA9IHt9XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuc3R5bGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zdHlsZVtwcm9wXVxuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuICAgICAgICBpZiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBzdHlsZVtwcm9wXSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVcbn1cblxuLyoqXG4gKiBJbmRlbnQgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGluZGVudChsZXZlbCwgc3RyKSB7XG4gICAgdmFyIGluZGVudFN0ciA9ICcnXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZXZlbDsgaSsrKSBpbmRlbnRTdHIgKz0gUnVsZS5JTkRFTlRBVElPTlxuICAgIHJldHVybiBpbmRlbnRTdHIgKyBzdHJcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgUnVsZSA9IHJlcXVpcmUoJy4vUnVsZScpXG52YXIgcGx1Z2lucyA9IHJlcXVpcmUoJy4vcGx1Z2lucycpXG5cbi8qKlxuICogU3R5bGVTaGVldCBhYnN0cmFjdGlvbiwgY29udGFpbnMgcnVsZXMsIGluamVjdHMgc3R5bGVzaGVldCBpbnRvIGRvbS5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBtZWRpYWAgc3R5bGUgZWxlbWVudCBhdHRyaWJ1dGVcbiAqICAtIGB0aXRsZWAgc3R5bGUgZWxlbWVudCBhdHRyaWJ1dGVcbiAqICAtIGB0eXBlYCBzdHlsZSBlbGVtZW50IGF0dHJpYnV0ZVxuICogIC0gYG5hbWVkYCB0cnVlIGJ5IGRlZmF1bHQgLSBrZXlzIGFyZSBuYW1lcywgc2VsZWN0b3JzIHdpbGwgYmUgZ2VuZXJhdGVkLFxuICogICAgaWYgZmFsc2UgLSBrZXlzIGFyZSBnbG9iYWwgc2VsZWN0b3JzLlxuICogIC0gYGxpbmtgIGxpbmsganNzIFJ1bGUgaW5zdGFuY2VzIHdpdGggRE9NIENTU1J1bGUgaW5zdGFuY2VzIHNvIHRoYXQgc3R5bGVzLFxuICogIGNhbiBiZSBtb2RpZmllZCBkeW5hbWljYWxseSwgZmFsc2UgYnkgZGVmYXVsdCBiZWNhdXNlIGl0IGhhcyBzb21lIHBlcmZvcm1hbmNlIGNvc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtydWxlc10gb2JqZWN0IHdpdGggc2VsZWN0b3JzIGFuZCBkZWNsYXJhdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIFN0eWxlU2hlZXQocnVsZXMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lZCA9PSBudWxsKSB0aGlzLm9wdGlvbnMubmFtZWQgPSB0cnVlXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuYXR0YWNoZWQgPSBmYWxzZVxuICAgIHRoaXMubWVkaWEgPSB0aGlzLm9wdGlvbnMubWVkaWFcbiAgICB0aGlzLnR5cGUgPSB0aGlzLm9wdGlvbnMudHlwZVxuICAgIHRoaXMudGl0bGUgPSB0aGlzLm9wdGlvbnMudGl0bGVcbiAgICB0aGlzLnJ1bGVzID0ge31cbiAgICAvLyBPbmx5IHdoZW4gb3B0aW9ucy5uYW1lZDogdHJ1ZS5cbiAgICB0aGlzLmNsYXNzZXMgPSB7fVxuICAgIHRoaXMuZGVwbG95ZWQgPSBmYWxzZVxuICAgIHRoaXMubGlua2VkID0gZmFsc2VcblxuICAgIC8vIERvbid0IGNyZWF0ZSBlbGVtZW50IGlmIHdlIGFyZSBub3QgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KClcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcnVsZXMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVSdWxlcyhrZXksIHJ1bGVzW2tleV0pXG4gICAgfVxufVxuXG5TdHlsZVNoZWV0LkFUVFJJQlVURVMgPSBbJ3RpdGxlJywgJ3R5cGUnLCAnbWVkaWEnXVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlU2hlZXRcblxuLyoqXG4gKiBJbnNlcnQgc3R5bGVzaGVldCBlbGVtZW50IHRvIHJlbmRlciB0cmVlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHJldHVybiB0aGlzXG5cbiAgICBpZiAoIXRoaXMuZGVwbG95ZWQpIHtcbiAgICAgICAgdGhpcy5kZXBsb3koKVxuICAgICAgICB0aGlzLmRlcGxveWVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KVxuXG4gICAgLy8gQmVmb3JlIGVsZW1lbnQgaXMgYXR0YWNoZWQgdG8gdGhlIGRvbSBydWxlcyBhcmUgbm90IGNyZWF0ZWQuXG4gICAgaWYgKCF0aGlzLmxpbmtlZCAmJiB0aGlzLm9wdGlvbnMubGluaykge1xuICAgICAgICB0aGlzLmxpbmsoKVxuICAgICAgICB0aGlzLmxpbmtlZCA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFjaGVkID0gdHJ1ZVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBSZW1vdmUgc3R5bGVzaGVldCBlbGVtZW50IGZyb20gcmVuZGVyIHRyZWUuXG4gKlxuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuYXR0YWNoZWQpIHJldHVybiB0aGlzXG5cbiAgICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpXG4gICAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlXG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIERlcGxveSBzdHlsZXMgdG8gdGhlIGVsZW1lbnQuXG4gKlxuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICdcXG4nICsgdGhpcy50b1N0cmluZygpICsgJ1xcbidcblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogRmluZCBDU1NSdWxlIG9iamVjdHMgaW4gdGhlIERPTSBhbmQgbGluayB0aGVtIGluIHRoZSBjb3JyZXNwb25kaW5nIFJ1bGUgaW5zdGFuY2UuXG4gKlxuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBDU1NSdWxlTGlzdCA9IHRoaXMuZWxlbWVudC5zaGVldC5jc3NSdWxlc1xuICAgIHZhciBydWxlcyA9IHRoaXMucnVsZXNcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ1NTUnVsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIENTU1J1bGUgPSBDU1NSdWxlTGlzdFtpXVxuICAgICAgICB2YXIgcnVsZSA9IHJ1bGVzW0NTU1J1bGUuc2VsZWN0b3JUZXh0XVxuICAgICAgICBpZiAocnVsZSkgcnVsZS5DU1NSdWxlID0gQ1NTUnVsZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQWRkIGEgcnVsZSB0byB0aGUgY3VycmVudCBzdHlsZXNoZWV0LiBXaWxsIGluc2VydCBhIHJ1bGUgYWxzbyBhZnRlciB0aGUgc3R5bGVzaGVldFxuICogaGFzIGJlZW4gcmVuZGVyZWQgZmlyc3QgdGltZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW2tleV0gY2FuIGJlIHNlbGVjdG9yIG9yIG5hbWUgaWYgYG9wdGlvbnMubmFtZWRgIGlzIHRydWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZSBwcm9wZXJ0eS92YWx1ZSBoYXNoXG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChrZXksIHN0eWxlKSB7XG4gICAgdmFyIHJ1bGVzID0gdGhpcy5jcmVhdGVSdWxlcyhrZXksIHN0eWxlKVxuXG4gICAgLy8gRG9uJ3QgaW5zZXJ0IHJ1bGUgZGlyZWN0bHkgaWYgdGhlcmUgaXMgbm8gc3RyaW5naWZpZWQgdmVyc2lvbiB5ZXQuXG4gICAgLy8gSXQgd2lsbCBiZSBpbnNlcnRlZCBhbGwgdG9nZXRoZXIgd2hlbiAuYXR0YWNoIGlzIGNhbGxlZC5cbiAgICBpZiAodGhpcy5kZXBsb3llZCkge1xuICAgICAgICB2YXIgc2hlZXQgPSB0aGlzLmVsZW1lbnQuc2hlZXRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5leHRJbmRleCA9IHNoZWV0LmNzc1J1bGVzLmxlbmd0aFxuICAgICAgICAgICAgdmFyIHJ1bGUgPSBydWxlc1tpXVxuICAgICAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShydWxlLnRvU3RyaW5nKCksIG5leHRJbmRleClcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGluaykgcnVsZS5DU1NSdWxlID0gc2hlZXQuY3NzUnVsZXNbbmV4dEluZGV4XVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXBsb3koKVxuICAgIH1cblxuICAgIHJldHVybiBydWxlc1xufVxuXG4vKipcbiAqIENyZWF0ZSBydWxlcywgd2lsbCByZW5kZXIgYWxzbyBhZnRlciBzdHlsZXNoZWV0IHdhcyByZW5kZXJlZCB0aGUgZmlyc3QgdGltZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcnVsZXMga2V5OnN0eWxlIGhhc2guXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fSB0aGlzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5hZGRSdWxlcyA9IGZ1bmN0aW9uIChydWxlcykge1xuICAgIGZvciAodmFyIGtleSBpbiBydWxlcykge1xuICAgICAgICB0aGlzLmFkZFJ1bGUoa2V5LCBydWxlc1trZXldKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogR2V0IGEgcnVsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IGNhbiBiZSBzZWxlY3RvciBvciBuYW1lIGlmIGBuYW1lZGAgaXMgdHJ1ZS5cbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5nZXRSdWxlID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLnJ1bGVzW2tleV1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IHJ1bGVzIHRvIGEgY3NzIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gJydcbiAgICB2YXIgcnVsZXMgPSB0aGlzLnJ1bGVzXG4gICAgdmFyIHN0cmluZ2lmaWVkID0ge31cbiAgICBmb3IgKHZhciBrZXkgaW4gcnVsZXMpIHtcbiAgICAgICAgdmFyIHJ1bGUgPSBydWxlc1trZXldXG4gICAgICAgIC8vIFdlIGhhdmUgdGhlIHNhbWUgcnVsZSByZWZlcmVuY2VkIHR3aWNlIGlmIHVzaW5nIG5hbWVkIHVybGVzLlxuICAgICAgICAvLyBCeSBuYW1lIGFuZCBieSBzZWxlY3Rvci5cbiAgICAgICAgaWYgKHN0cmluZ2lmaWVkW3J1bGUuaWRdKSBjb250aW51ZVxuICAgICAgICBpZiAoc3RyKSBzdHIgKz0gJ1xcbidcbiAgICAgICAgc3RyICs9IHJ1bGVzW2tleV0udG9TdHJpbmcoKVxuICAgICAgICBzdHJpbmdpZmllZFtydWxlLmlkXSA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcnVsZSwgd2lsbCBub3QgcmVuZGVyIGFmdGVyIHN0eWxlc2hlZXQgd2FzIHJlbmRlcmVkIHRoZSBmaXJzdCB0aW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc2VsZWN0b3JdIGlmIHlvdSBkb24ndCBwYXNzIHNlbGVjdG9yIC0gaXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3R5bGVdIGRlY2xhcmF0aW9ucyBibG9ja1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBydWxlIG9wdGlvbnNcbiAqIEByZXR1cm4ge0FycmF5fSBydWxlIGNhbiBjb250YWluIGNoaWxkIHJ1bGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuY3JlYXRlUnVsZXMgPSBmdW5jdGlvbiAoa2V5LCBzdHlsZSwgb3B0aW9ucykge1xuICAgIHZhciBydWxlcyA9IFtdXG4gICAgdmFyIHNlbGVjdG9yLCBuYW1lXG5cbiAgICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuICAgIHZhciBuYW1lZCA9IHRoaXMub3B0aW9ucy5uYW1lZFxuICAgIC8vIFNjb3BlIG9wdGlvbnMgb3ZlcndyaXRlIGluc3RhbmNlIG9wdGlvbnMuXG4gICAgaWYgKG9wdGlvbnMubmFtZWQgIT0gbnVsbCkgbmFtZWQgPSBvcHRpb25zLm5hbWVkXG5cbiAgICBpZiAobmFtZWQpIG5hbWUgPSBrZXlcbiAgICBlbHNlIHNlbGVjdG9yID0ga2V5XG5cbiAgICB2YXIgcnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9yLCBzdHlsZSwge1xuICAgICAgICBzaGVldDogdGhpcyxcbiAgICAgICAgbmFtZWQ6IG5hbWVkLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgfSlcbiAgICBydWxlcy5wdXNoKHJ1bGUpXG5cbiAgICB0aGlzLnJ1bGVzW3J1bGUuc2VsZWN0b3JdID0gcnVsZVxuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHRoaXMucnVsZXNbbmFtZV0gPSBydWxlXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tuYW1lXSA9IHJ1bGUuY2xhc3NOYW1lXG4gICAgfVxuXG4gICAgcGx1Z2lucy5ydW4ocnVsZSlcblxuICAgIGZvciAoa2V5IGluIHJ1bGUuY2hpbGRyZW4pIHtcbiAgICAgICAgcnVsZXMucHVzaCh0aGlzLmNyZWF0ZVJ1bGVzKFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcnVsZS5jaGlsZHJlbltrZXldLnN0eWxlLFxuICAgICAgICAgICAgcnVsZS5jaGlsZHJlbltrZXldLm9wdGlvbnNcbiAgICAgICAgKSlcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXNcbn1cblxuLyoqXG4gKiBDcmVhdGUgc3R5bGUgc2hlZXQgZWxlbWVudC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG5cbiAgICBTdHlsZVNoZWV0LkFUVFJJQlVURVMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAodGhpc1tuYW1lXSkgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdGhpc1tuYW1lXSlcbiAgICB9LCB0aGlzKVxuXG4gICAgcmV0dXJuIGVsZW1lbnRcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgU3R5bGVTaGVldCA9IHJlcXVpcmUoJy4vU3R5bGVTaGVldCcpXG52YXIgUnVsZSA9IHJlcXVpcmUoJy4vUnVsZScpXG5cbmV4cG9ydHMuU3R5bGVTaGVldCA9IFN0eWxlU2hlZXRcblxuZXhwb3J0cy5SdWxlID0gUnVsZVxuXG5leHBvcnRzLnBsdWdpbnMgPSByZXF1aXJlKCcuL3BsdWdpbnMnKVxuXG4vKipcbiAqIENyZWF0ZSBhIHN0eWxlc2hlZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJ1bGVzIGlzIHNlbGVjdG9yOnN0eWxlIGhhc2guXG4gKiBAcGFyYW0ge09iamVjdH0gW25hbWVkXSBydWxlcyBoYXZlIG5hbWVzIGlmIHRydWUsIGNsYXNzIG5hbWVzIHdpbGwgYmUgZ2VuZXJhdGVkLlxuICogQHBhcmFtIHtPYmplY3R9IFthdHRyaWJ1dGVzXSBzdHlsZXNoZWV0IGVsZW1lbnQgYXR0cmlidXRlcy5cbiAqIEByZXR1cm4ge1N0eWxlU2hlZXR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmNyZWF0ZVN0eWxlU2hlZXQgPSBmdW5jdGlvbiAocnVsZXMsIG5hbWVkLCBhdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIG5ldyBTdHlsZVNoZWV0KHJ1bGVzLCBuYW1lZCwgYXR0cmlidXRlcylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBydWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbc2VsZWN0b3JdXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGUgaXMgcHJvcGVydHk6dmFsdWUgaGFzaC5cbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmNyZWF0ZVJ1bGUgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHN0eWxlKSB7XG4gICAgdmFyIHJ1bGUgPSBuZXcgUnVsZShzZWxlY3Rvciwgc3R5bGUpXG4gICAgZXhwb3J0cy5wbHVnaW5zLnJ1bihydWxlKVxuICAgIHJldHVybiBydWxlXG59XG5cbi8qKlxuICogUmVnaXN0ZXIgcGx1Z2luLiBQYXNzZWQgZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIHdpdGggYSBydWxlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLnVzZSA9IGV4cG9ydHMucGx1Z2lucy51c2VcbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFJlZ2lzdGVyZWQgcGx1Z2lucy5cbiAqXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLnJlZ2lzdHJ5ID0gW11cblxuLyoqXG4gKiBSZWdpc3RlciBwbHVnaW4uIFBhc3NlZCBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgd2l0aCBhIHJ1bGUgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMudXNlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgZXhwb3J0cy5yZWdpc3RyeS5wdXNoKGZuKVxufVxuXG4vKipcbiAqIEV4ZWN1dGUgYWxsIHJlZ2lzdGVyZWQgcGx1Z2lucy5cbiAqXG4gKiBAcGFyYW0ge1J1bGV9IHJ1bGVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnRzLnJ1biA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnJlZ2lzdHJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGV4cG9ydHMucmVnaXN0cnlbaV0ocnVsZSlcbiAgICB9XG59XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlaXNlcXVhbCcpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmluZGNhbGxiYWNrJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICogZXF1aXZhbGVudC4gSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gY29tcGFyZSB2YWx1ZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBjb21wYXJpc29ucyBhcmUgaGFuZGxlZCBieSB0aGUgbWV0aG9kXG4gKiBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwgb3RoZXIgWywgaW5kZXh8a2V5XSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIGNvbXBhcmluZyBhcnJheXMsIGJvb2xlYW5zLCBgRGF0ZWAgb2JqZWN0cyxcbiAqIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsIGFuZCBzdHJpbmdzLiBPYmplY3RzIGFyZSBjb21wYXJlZCBieVxuICogdGhlaXIgb3duLCBub3QgaW5oZXJpdGVkLCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIEZ1bmN0aW9ucyBhbmQgRE9NIG5vZGVzXG4gKiBhcmUgKipub3QqKiBzdXBwb3J0ZWQuIFByb3ZpZGUgYSBjdXN0b21pemVyIGZ1bmN0aW9uIHRvIGV4dGVuZCBzdXBwb3J0XG4gKiBmb3IgY29tcGFyaW5nIG90aGVyIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGVxXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSB2YWx1ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIG90aGVyID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIG9iamVjdCA9PSBvdGhlcjtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0VxdWFsKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGFycmF5ID0gWydoZWxsbycsICdnb29kYnllJ107XG4gKiB2YXIgb3RoZXIgPSBbJ2hpJywgJ2dvb2RieWUnXTtcbiAqXG4gKiBfLmlzRXF1YWwoYXJyYXksIG90aGVyLCBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAqICAgaWYgKF8uZXZlcnkoW3ZhbHVlLCBvdGhlcl0sIFJlZ0V4cC5wcm90b3R5cGUudGVzdCwgL15oKD86aXxlbGxvKSQvKSkge1xuICogICAgIHJldHVybiB0cnVlO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIHRoaXNBcmcpIHtcbiAgY3VzdG9taXplciA9IHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicgPyBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgMykgOiB1bmRlZmluZWQ7XG4gIHZhciByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgb3RoZXIpIDogdW5kZWZpbmVkO1xuICByZXR1cm4gIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyKSA6ICEhcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc3R5cGVkYXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2l0aG91dCBzdXBwb3J0IGZvciBgdGhpc2AgYmluZGluZ1xuICogYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0KHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICBpZiAoIWlzTG9vc2UpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LCBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBkZXRlY3RpbmcgY2lyY3VsYXIgcmVmZXJlbmNlcyBzZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyNKTy5cbiAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gb2JqZWN0KSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF0gPT0gb3RoZXI7XG4gICAgfVxuICB9XG4gIC8vIEFkZCBgb2JqZWN0YCBhbmQgYG90aGVyYCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIHN0YWNrQS5wdXNoKG9iamVjdCk7XG4gIHN0YWNrQi5wdXNoKG90aGVyKTtcblxuICB2YXIgcmVzdWx0ID0gKG9iaklzQXJyID8gZXF1YWxBcnJheXMgOiBlcXVhbE9iamVjdHMpKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuXG4gIHN0YWNrQS5wb3AoKTtcbiAgc3RhY2tCLnBvcCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIGFycmF5cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzTG9vc2UgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIoaXNMb29zZSA/IG90aFZhbHVlIDogYXJyVmFsdWUsIGlzTG9vc2UgPyBhcnJWYWx1ZSA6IG90aFZhbHVlLCBpbmRleCkgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKGlzTG9vc2UpIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgIC8vIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbC5cbiAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICByZXR1cm4gKG9iamVjdCAhPSArb2JqZWN0KVxuICAgICAgICA/IG90aGVyICE9ICtvdGhlclxuICAgICAgICA6IG9iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MgcHJpbWl0aXZlcyBhbmQgc3RyaW5nXG4gICAgICAvLyBvYmplY3RzIGFzIGVxdWFsLiBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTUuMTAuNi40IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc0xvb3NlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzTG9vc2UgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB2YXIgc2tpcEN0b3IgPSBpc0xvb3NlO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihpc0xvb3NlID8gb3RoVmFsdWUgOiBvYmpWYWx1ZSwgaXNMb29zZT8gb2JqVmFsdWUgOiBvdGhWYWx1ZSwga2V5KSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIDogcmVzdWx0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKCFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4zIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQncyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAoZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KSlcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5fZ2V0bmF0aXZlJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCdsb2Rhc2guaXNhcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL15cXGQrJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBnZXROYXRpdmUoT2JqZWN0LCAna2V5cycpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgQ3RvciA9IG9iamVjdCA9PSBudWxsID8gbnVsbCA6IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsIi8qKlxuICogbG9kYXNoIDMuOS4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCdzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjMgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHRoaXNBcmcgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuIl19
