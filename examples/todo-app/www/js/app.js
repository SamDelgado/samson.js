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

  "select, input, textarea, button": {
    appearance: "none"
  },

  /*
  "input:focus, textarea:focus": {
    "outline-style": "none",
    "outline-width": "0"
  },
  */

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
      height: "100%",
      padding: "20px"
    },

    "#new-todo-textarea": {
      width: "100%",
      "font-size": "1.5rem",
      "line-height": 1.2,
      padding: "4px",
      "margin-bottom": "40px",
      "background-color": Colors.white,
      "border-radius": "5px",
      "border": "3px solid " + Colors.gray
    },

    "#new-todo-submit-button": {
      width: "100%",
      "height": "40px",
      "background-color": Colors.turquoise,
      "border-radius": "5px",
      color: Colors.white,
      "font-size": "2.5rem",
      "line-height": "40px",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    // update the value of the current todo in localStorage and resize the textarea if necessary
    'input #new-todo-textarea': function(e) {

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

},{"./../../common/modules/db":13,"./template.jade":28,"autosize":35}],28:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (todo_item) {
buf.push("<textarea id=\"new-todo-textarea\" rows=\"1\" placeholder=\"Add a new ToDo Item here...\" required=\"required\" autofocus=\"autofocus\">" + (jade.escape((jade_interp = todo_item) == null ? '' : jade_interp)) + "</textarea><div id=\"new-todo-submit-button\">Add Item</div>");}.call(this,"todo_item" in locals_for_with?locals_for_with.todo_item:typeof todo_item!=="undefined"?todo_item:undefined));;return buf.join("");
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
      "background-color": Colors.blue,
      color: Colors.white,
      "border-radius": "4px",
      padding: "4px",
      "font-size": "1.5rem",
      "line-height": 1.2,
      "border": "3px solid " + Colors.blue
    },

    ".todo-item-text:focus": {
      "background-color": Colors.white,
      color: Colors.black
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

          self._fixAutoFocusElements();

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

Samson.VERSION = '0.1.4'; // keep in sync with package.json

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

          self._fixAutoFocusElements();

          self._doFirst("afterRender", function() { if (callback) callback(); });

        });

      });

    });

  });

};

module.exports = SamsonPage;

},{"./index":40,"./modules/quo.js":41,"./shared":45,"./utils":48,"jss":57}],43:[function(require,module,exports){

var animationAmount = "100%";
var animationDuration = "0.4s";

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
    "Transform": "translateZ(0)",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbW1vbi9jb2xvcnMuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2V4b19leHRyYWJvbGQuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2V4b19leHRyYWJvbGRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fZXh0cmFsaWdodC5qcyIsImFwcC9jb21tb24vZm9udHMvZXhvX2V4dHJhbGlnaHRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9faXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fcmVndWxhci5qcyIsImFwcC9jb21tb24vZm9udHMvZXhvX3NlbWlib2xkLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fc2VtaWJvbGRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9mb250X2F3ZXNvbWUuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2luZGV4LmpzIiwiYXBwL2NvbW1vbi9tb2R1bGVzL2RiLmpzIiwiYXBwL2NvbW1vbi9tb2R1bGVzL2xvZy5qcyIsImFwcC9jb21tb24vcm91dGVyX2FuaW1hdGlvbnMuanMiLCJhcHAvY29tbW9uL3NldHRpbmdzLmpzIiwiYXBwL2NvbW1vbi9zdGFydEFwcC5qcyIsImFwcC9jb21tb24vc3R5bGVzLmpzIiwiYXBwL2NvbW1vbi90b2Rvc0NvbGxlY3Rpb24uanMiLCJhcHAvY29tcG9uZW50cy9mYWRlZE92ZXJsYXkvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9oZWFkZXIvdGVtcGxhdGUuamFkZSIsImFwcC9jb21wb25lbnRzL2luZGV4LmpzIiwiYXBwL2NvbXBvbmVudHMvc2lkZU1lbnUvaW5kZXguanMiLCJhcHAvY29tcG9uZW50cy9zaWRlTWVudS90ZW1wbGF0ZS5qYWRlIiwiYXBwL2NvbXBvbmVudHMvdHJhbnNwYXJlbnRPdmVybGF5L2luZGV4LmpzIiwiYXBwL3BhZ2VzL2FkZFRvZG9zL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2FkZFRvZG9zL3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaG9tZS9pbmRleC5qcyIsImFwcC9wYWdlcy9ob21lL3RlbXBsYXRlLmphZGUiLCJhcHAvcGFnZXMvaW5kZXguanMiLCJhcHAvcGFnZXMvdmlld1RvZG9zL2luZGV4LmpzIiwiYXBwL3BhZ2VzL3ZpZXdUb2Rvcy90ZW1wbGF0ZS5qYWRlIiwibm9kZV9tb2R1bGVzL2FzeW5jLWxpdGUvYXN5bmMtbGl0ZS5qcyIsIm5vZGVfbW9kdWxlcy9hdXRvc2l6ZS9kaXN0L2F1dG9zaXplLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcmVzb2x2ZS9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiLCIuLi8uLi9saWIvY29tcG9uZW50LmpzIiwiLi4vLi4vbGliL2V2ZW50cy5qcyIsIi4uLy4uL2xpYi9pbmRleC5qcyIsIi4uLy4uL2xpYi9tb2R1bGVzL3F1by5qcyIsIi4uLy4uL2xpYi9wYWdlLmpzIiwiLi4vLi4vbGliL3JvdXRlci9iYXNlX3JvdXRlcl9hbmltYXRpb25zLmpzIiwiLi4vLi4vbGliL3JvdXRlci9pbmRleC5qcyIsIi4uLy4uL2xpYi9zaGFyZWQuanMiLCIuLi8uLi9saWIvc3R5bGVzL2Jhc2Vfc3R5bGVzLmpzIiwiLi4vLi4vbGliL3N0eWxlcy9yZXNldC5qcyIsIi4uLy4uL2xpYi91dGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9hc3luYy1saXRlL2FzeW5jLWxpdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLWV4dGVuZC9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9ub2RlX21vZHVsZXMvY3NzLXZlbmRvci9saWIvY2FtZWxpemUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9ub2RlX21vZHVsZXMvY3NzLXZlbmRvci9saWIvcHJlZml4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvbGliL3N1cHBvcnRlZC1wcm9wZXJ0eS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL25vZGVfbW9kdWxlcy9jc3MtdmVuZG9yL2xpYi9zdXBwb3J0ZWQtdmFsdWUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy9saWIvUnVsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MvbGliL1N0eWxlU2hlZXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2xpYi9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MvbGliL3BsdWdpbnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FycmF5L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXN0eXBlZGFycmF5L2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5fZ2V0bmF0aXZlL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJndW1lbnRzL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2JpbmRjYWxsYmFjay9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9UQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vbGliJyk7XG52YXIgTG9nID0gcmVxdWlyZSgnLi9jb21tb24vbW9kdWxlcy9sb2cnKTtcbnZhciBUb2RvcyA9IHJlcXVpcmUoJy4vY29tbW9uL3RvZG9zQ29sbGVjdGlvbicpO1xuXG4vLyBwYXNzIGluIHRoZSBuYW1lIG9mIHRoZSBhcHAgb2JqZWN0IGlmIHlvdSB3YW50IGl0IGFkZGVkIHRvIHRoZSBnbG9iYWwgc2NvcGVcbnZhciBBcHAgPSBTYW1zb24uY3JlYXRlQXBwKFwiQXBwXCIpO1xuXG4vLyBhZGQgdGhlIGFwcCBuYW1lIHRvIHRoZSBnbG9iYWwgc2NvcGUgaWYgbmFtZSBpcyBwYXNzZWQgaW5cbmdsb2JhbC5BcHAgPSBBcHA7XG53aW5kb3cuQXBwID0gQXBwO1xuXG5nbG9iYWwuQ29sb3JzID0gcmVxdWlyZSgnLi9jb21tb24vY29sb3JzJyk7XG5cbi8vIFNhbXNvbiBBcHAgb3B0aW9uc1xudmFyIG9wdGlvbnMgPSB7XG5cbiAgc3R5bGUgOiByZXF1aXJlKCcuL2NvbW1vbi9zdHlsZXMnKSxcblxuICBmb250cyA6IHJlcXVpcmUoJy4vY29tbW9uL2ZvbnRzJyksXG5cbiAgLy9zZXRDb21wb25lbnRzIDogcmVxdWlyZSgnY29tbW9uL3NldENvbXBvbmVudHMnKSwgLy8gb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgY29tcG9uZW50IG9iamVjdCAtIHVzZSBpZiB0aGUgYXBwIGNvbXBvbmVudHMgYXJlIGR5bmFtaWMgYmFzZWQgb24gc2NyZWVuc2l6ZSwgZGV2aWNlIE9TLCBldGNcblxuICBjb21wb25lbnRzIDogcmVxdWlyZSgnLi9jb21wb25lbnRzJyksXG5cbiAgcGFnZXM6IHJlcXVpcmUoJy4vcGFnZXMnKSxcblxuICBkYXRhOiB7XG4gICAgc2lkZU1lbnUgOiB7XG4gICAgICBzZWxlY3RlZDogXCJob21lXCIsXG4gICAgICBwYWdlczogW1xuICAgICAgICB7cGF0aDpcImhvbWVcIiwgbmFtZTpcIkhvbWVcIiwgaWNvbjogXCJmYS1ob21lXCJ9LFxuICAgICAgICB7cGF0aDpcImFkZFRvZG9zXCIsIG5hbWU6XCJBZGQgVG9kb3NcIiwgaWNvbjogXCJmYS1wbHVzXCJ9LFxuICAgICAgICB7cGF0aDpcInZpZXdUb2Rvc1wiLCBuYW1lOlwiVmlldyBUb2Rvc1wiLCBpY29uOiBcImZhLXRhc2tzXCJ9XG4gICAgICBdXG4gICAgfVxuICB9LFxuXG4gIC8vIGFueSBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHlvdSB3YW50IGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBhcHAgb2JqZWN0LiB0aGUgY29udGV4dCB3aWxsIGJlIHRoZSBhcHAgb2JqZWN0XG4gIGN1c3RvbToge1xuICAgIE1vZGVscyA6IHt9LFxuICAgIENvbGxlY3Rpb25zIDoge1xuICAgICAgVG9kb3M6IG5ldyBUb2RvcygpXG4gICAgfVxuICB9LFxuXG4gIHJvdXRlciA6IHtcbiAgICBhbmltYXRpb25zOiByZXF1aXJlKCcuL2NvbW1vbi9yb3V0ZXJfYW5pbWF0aW9ucycpLFxuICAgIGRlZmF1bHROYXZpZ2F0ZUFuaW1hdGlvbjogXCJyaWdodFwiLFxuICAgIGRlZmF1bHRCYWNrQW5pbWF0aW9uOiBcImxlZnRcIlxuICB9XG5cbn07XG5cbkFwcC5jb25maWd1cmUob3B0aW9ucywgZnVuY3Rpb24oKSB7XG5cbiAgLy8gVGhlIFNhbXNvbiBBcHAgaXMgbm93IGNvbmZpZ3VyZWQgYW5kIHJlYWR5IHRvIHVzZVxuICBMb2coXCJTYW1zb24gYXBwIGhhcyBiZWVuIGluaXRpYWxpemVkXCIpO1xuXG4gIHZhciBzdGFydEFwcCA9IHJlcXVpcmUoJy4vY29tbW9uL3N0YXJ0QXBwJyk7XG5cbiAgLy8gaWYgd2UgZGV0ZWN0IGNvcmRvdmEgdGhlbiB3YWl0IGZvciB0aGUgZGV2aWNlcmVhZHkgZXZlbnRcbiAgaWYgKHR5cGVvZiB3aW5kb3cuY29yZG92YSA9PT0gJ29iamVjdCcpIHtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgTG9nKFwiRGV2aWNlIGlzIG5vdyByZWFkeVwiKTtcblxuICAgICAgc3RhcnRBcHAoKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIHN0YXJ0QXBwKCk7XG5cbiAgfVxuXG59KTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgdHVycXVvaXNlOiBcIiMxYWJjOWNcIixcblxuICBibHVlOiBcIiMzNDk4ZGJcIixcblxuICBwdXJwbGU6IFwiIzliNTliNlwiLFxuXG4gIG5hdnk6IFwiIzM0NDk1ZVwiLFxuXG4gIHllbGxvdzogXCIjZjFjNDBmXCIsXG5cbiAgb3JhbmdlOiBcIiNlNjdlMjJcIixcblxuICByZWQ6IFwiI2MwMzkyYlwiLFxuXG4gIGxpZ2h0R3JheTogXCIjYmRjM2M3XCIsXG5cbiAgZ3JheTogXCIjN2Y4YzhkXCIsXG5cbiAgZGFya0dyYXk6IFwiIzQ0NDQ0NFwiLFxuXG4gIGJsYWNrOiBcIiMxMTExMTFcIixcblxuICB3aGl0ZTogXCIjZmZmZmZmXCJcblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIHNyYzogXCJ1cmwoJ2ZvbnQvZXhvL0V4by1FeHRyYUJvbGQudHRmJykgZm9ybWF0KCd0cnVldHlwZScpXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICBcImZvbnQtc3R5bGVcIjogXCJub3JtYWxcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLUV4dHJhQm9sZEl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIml0YWxpY1wiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tRXh0cmFMaWdodC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IDIwMCxcbiAgICBcImZvbnQtc3R5bGVcIjogXCJub3JtYWxcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLUV4dHJhTGlnaHRJdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiAyMDAsXG4gICAgXCJmb250LXN0eWxlXCI6IFwiaXRhbGljXCJcbiAgfVxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIHNyYzogXCJ1cmwoJ2ZvbnQvZXhvL0V4by1JdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiBcIm5vcm1hbFwiLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIml0YWxpY1wiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tUmVndWxhci50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IFwibm9ybWFsXCIsXG4gICAgXCJmb250LXN0eWxlXCI6IFwibm9ybWFsXCJcbiAgfVxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIHNyYzogXCJ1cmwoJ2ZvbnQvZXhvL0V4by1TZW1pQm9sZC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IDUwMCxcbiAgICBcImZvbnQtc3R5bGVcIjogXCJub3JtYWxcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLVNlbWlCb2xkSXRhbGljLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogNTAwLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIml0YWxpY1wiXG4gIH1cbn07XG4iLCIvKiFcbiAqICBGb250IEF3ZXNvbWUgNC4zLjAgYnkgQGRhdmVnYW5keSAtIGh0dHA6Ly9mb250YXdlc29tZS5pbyAtIEBmb250YXdlc29tZVxuICogIExpY2Vuc2UgLSBodHRwOi8vZm9udGF3ZXNvbWUuaW8vbGljZW5zZSAoRm9udDogU0lMIE9GTCAxLjEsIENTUzogTUlUIExpY2Vuc2UpXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkZvbnRBd2Vzb21lXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9mb250X2F3ZXNvbWUvZm9udGF3ZXNvbWUtd2ViZm9udC50dGY/dj00LjMuMCcpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogXCJub3JtYWxcIixcbiAgICBcImZvbnQtc3R5bGVcIjogXCJub3JtYWxcIlxuICB9LFxuICBcIi5mYVwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgXCJmb250XCI6IFwibm9ybWFsIG5vcm1hbCBub3JtYWwgMTRweC8xIEZvbnRBd2Vzb21lXCIsXG4gICAgXCJmb250LXNpemVcIjogXCJpbmhlcml0XCIsXG4gICAgXCJ0ZXh0LXJlbmRlcmluZ1wiOiBcImF1dG9cIixcbiAgICBcIi13ZWJraXQtZm9udC1zbW9vdGhpbmdcIjogXCJhbnRpYWxpYXNlZFwiLFxuICAgIFwiLW1vei1vc3gtZm9udC1zbW9vdGhpbmdcIjogXCJncmF5c2NhbGVcIixcbiAgICBcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZSgwLCAwKVwiXG4gIH0sXG4gIFwiLmZhLWxnXCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjEuMzMzMzMzMzNlbVwiLFxuICAgIFwibGluZS1oZWlnaHRcIjogXCIwLjc1ZW1cIixcbiAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwiLTE1JVwiXG4gIH0sXG4gIFwiLmZhLTJ4XCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjJlbVwiXG4gIH0sXG4gIFwiLmZhLTN4XCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjNlbVwiXG4gIH0sXG4gIFwiLmZhLTR4XCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjRlbVwiXG4gIH0sXG4gIFwiLmZhLTV4XCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjVlbVwiXG4gIH0sXG4gIFwiLmZhLWZ3XCI6IHtcbiAgICBcIndpZHRoXCI6IFwiMS4yODU3MTQyOWVtXCIsXG4gICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZmEtdWxcIjoge1xuICAgIFwicGFkZGluZy1sZWZ0XCI6IFwiMFwiLFxuICAgIFwibWFyZ2luLWxlZnRcIjogXCIyLjE0Mjg1NzE0ZW1cIixcbiAgICBcImxpc3Qtc3R5bGUtdHlwZVwiOiBcIm5vbmVcIlxuICB9LFxuICBcIi5mYS11bCA+IGxpXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIlxuICB9LFxuICBcIi5mYS1saVwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJsZWZ0XCI6IFwiLTIuMTQyODU3MTRlbVwiLFxuICAgIFwid2lkdGhcIjogXCIyLjE0Mjg1NzE0ZW1cIixcbiAgICBcInRvcFwiOiBcIjAuMTQyODU3MTRlbVwiLFxuICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmZhLWxpLmZhLWxnXCI6IHtcbiAgICBcImxlZnRcIjogXCItMS44NTcxNDI4NmVtXCJcbiAgfSxcbiAgXCIuZmEtYm9yZGVyXCI6IHtcbiAgICBcInBhZGRpbmdcIjogXCIuMmVtIC4yNWVtIC4xNWVtXCIsXG4gICAgXCJib3JkZXJcIjogXCJzb2xpZCAwLjA4ZW0gI2VlZWVlZVwiLFxuICAgIFwiYm9yZGVyLXJhZGl1c1wiOiBcIi4xZW1cIlxuICB9LFxuICBcIi5wdWxsLXJpZ2h0XCI6IHtcbiAgICBcImZsb2F0XCI6IFwicmlnaHRcIlxuICB9LFxuICBcIi5wdWxsLWxlZnRcIjoge1xuICAgIFwiZmxvYXRcIjogXCJsZWZ0XCJcbiAgfSxcbiAgXCIuZmEucHVsbC1sZWZ0XCI6IHtcbiAgICBcIm1hcmdpbi1yaWdodFwiOiBcIi4zZW1cIlxuICB9LFxuICBcIi5mYS5wdWxsLXJpZ2h0XCI6IHtcbiAgICBcIm1hcmdpbi1sZWZ0XCI6IFwiLjNlbVwiXG4gIH0sXG4gIFwiLmZhLXNwaW5cIjoge1xuICAgIFwiLXdlYmtpdC1hbmltYXRpb25cIjogXCJmYS1zcGluIDJzIGluZmluaXRlIGxpbmVhclwiLFxuICAgIFwiYW5pbWF0aW9uXCI6IFwiZmEtc3BpbiAycyBpbmZpbml0ZSBsaW5lYXJcIlxuICB9LFxuICBcIi5mYS1wdWxzZVwiOiB7XG4gICAgXCItd2Via2l0LWFuaW1hdGlvblwiOiBcImZhLXNwaW4gMXMgaW5maW5pdGUgc3RlcHMoOClcIixcbiAgICBcImFuaW1hdGlvblwiOiBcImZhLXNwaW4gMXMgaW5maW5pdGUgc3RlcHMoOClcIlxuICB9LFxuICBcIkBrZXlmcmFtZXMgZmEtc3BpblwiOiB7XG4gICAgXCIwJVwiOiB7XG4gICAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwicm90YXRlKDBkZWcpXCIsXG4gICAgICBcInRyYW5zZm9ybVwiOiBcInJvdGF0ZSgwZGVnKVwiXG4gICAgfSxcbiAgICBcIjEwMCVcIjoge1xuICAgICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiBcInJvdGF0ZSgzNTlkZWcpXCIsXG4gICAgICBcInRyYW5zZm9ybVwiOiBcInJvdGF0ZSgzNTlkZWcpXCJcbiAgICB9XG4gIH0sXG4gIFwiLmZhLXJvdGF0ZS05MFwiOiB7XG4gICAgXCJmaWx0ZXJcIjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0xKVwiLFxuICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogXCJyb3RhdGUoOTBkZWcpXCIsXG4gICAgXCItbXMtdHJhbnNmb3JtXCI6IFwicm90YXRlKDkwZGVnKVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDkwZGVnKVwiXG4gIH0sXG4gIFwiLmZhLXJvdGF0ZS0xODBcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MilcIixcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwicm90YXRlKDE4MGRlZylcIixcbiAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJyb3RhdGUoMTgwZGVnKVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDE4MGRlZylcIlxuICB9LFxuICBcIi5mYS1yb3RhdGUtMjcwXCI6IHtcbiAgICBcImZpbHRlclwiOiBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKHJvdGF0aW9uPTMpXCIsXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiBcInJvdGF0ZSgyNzBkZWcpXCIsXG4gICAgXCItbXMtdHJhbnNmb3JtXCI6IFwicm90YXRlKDI3MGRlZylcIixcbiAgICBcInRyYW5zZm9ybVwiOiBcInJvdGF0ZSgyNzBkZWcpXCJcbiAgfSxcbiAgXCIuZmEtZmxpcC1ob3Jpem9udGFsXCI6IHtcbiAgICBcImZpbHRlclwiOiBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKHJvdGF0aW9uPTAsIG1pcnJvcj0xKVwiLFxuICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogXCJzY2FsZSgtMSwgMSlcIixcbiAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJzY2FsZSgtMSwgMSlcIixcbiAgICBcInRyYW5zZm9ybVwiOiBcInNjYWxlKC0xLCAxKVwiXG4gIH0sXG4gIFwiLmZhLWZsaXAtdmVydGljYWxcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MiwgbWlycm9yPTEpXCIsXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiBcInNjYWxlKDEsIC0xKVwiLFxuICAgIFwiLW1zLXRyYW5zZm9ybVwiOiBcInNjYWxlKDEsIC0xKVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwic2NhbGUoMSwgLTEpXCJcbiAgfSxcbiAgXCI6cm9vdCAuZmEtcm90YXRlLTkwLCA6cm9vdCAuZmEtcm90YXRlLTE4MCwgOnJvb3QgLmZhLXJvdGF0ZS0yNzAsIDpyb290IC5mYS1mbGlwLWhvcml6b250YWwsIDpyb290IC5mYS1mbGlwLXZlcnRpY2FsXCI6IHtcbiAgICBcImZpbHRlclwiOiBcIm5vbmVcIlxuICB9LFxuICBcIi5mYS1zdGFja1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsXG4gICAgXCJkaXNwbGF5XCI6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjJlbVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMmVtXCIsXG4gICAgXCJsaW5lLWhlaWdodFwiOiBcIjJlbVwiLFxuICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJtaWRkbGVcIlxuICB9LFxuICBcIi5mYS1zdGFjay0xeCwgLmZhLXN0YWNrLTJ4XCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImxlZnRcIjogXCIwXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5mYS1zdGFjay0xeFwiOiB7XG4gICAgXCJsaW5lLWhlaWdodFwiOiBcImluaGVyaXRcIlxuICB9LFxuICBcIi5mYS1zdGFjay0yeFwiOiB7XG4gICAgXCJmb250LXNpemVcIjogXCIyZW1cIlxuICB9LFxuICBcIi5mYS1pbnZlcnNlXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXG4gIH0sXG4gIFwiLmZhLWdsYXNzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDAwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW11c2ljOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDAxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlYXJjaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwMlxcXCJcIlxuICB9LFxuICBcIi5mYS1lbnZlbG9wZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDAzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhlYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDA0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0YXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Rhci1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDA2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVzZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsbTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwOFxcXCJcIlxuICB9LFxuICBcIi5mYS10aC1sYXJnZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwOVxcXCJcIlxuICB9LFxuICBcIi5mYS10aDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwYVxcXCJcIlxuICB9LFxuICBcIi5mYS10aC1saXN0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZWNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlbW92ZTpiZWZvcmUsIC5mYS1jbG9zZTpiZWZvcmUsIC5mYS10aW1lczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwZFxcXCJcIlxuICB9LFxuICBcIi5mYS1zZWFyY2gtcGx1czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwZVxcXCJcIlxuICB9LFxuICBcIi5mYS1zZWFyY2gtbWludXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcG93ZXItb2ZmOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDExXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNpZ25hbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxMlxcXCJcIlxuICB9LFxuICBcIi5mYS1nZWFyOmJlZm9yZSwgLmZhLWNvZzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxM1xcXCJcIlxuICB9LFxuICBcIi5mYS10cmFzaC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDE0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhvbWU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDE2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNsb2NrLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcm9hZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxOFxcXCJcIlxuICB9LFxuICBcIi5mYS1kb3dubG9hZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxOVxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtby1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDFhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1vLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDFiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWluYm94OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDFjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsYXktY2lyY2xlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcm90YXRlLXJpZ2h0OmJlZm9yZSwgLmZhLXJlcGVhdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxZVxcXCJcIlxuICB9LFxuICBcIi5mYS1yZWZyZXNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDIxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpc3QtYWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDIyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvY2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmxhZzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyNFxcXCJcIlxuICB9LFxuICBcIi5mYS1oZWFkcGhvbmVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDI1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZvbHVtZS1vZmY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdm9sdW1lLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdm9sdW1lLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDI4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXFyY29kZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyOVxcXCJcIlxuICB9LFxuICBcIi5mYS1iYXJjb2RlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDJhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRhZzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyYlxcXCJcIlxuICB9LFxuICBcIi5mYS10YWdzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDJjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJvb2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMmRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYm9va21hcms6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMmVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcHJpbnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMmZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FtZXJhOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDMwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvbnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYm9sZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzMlxcXCJcIlxuICB9LFxuICBcIi5mYS1pdGFsaWM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGV4dC1oZWlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGV4dC13aWR0aDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzNVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbGlnbi1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFsaWduLWNlbnRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzN1xcXCJcIlxuICB9LFxuICBcIi5mYS1hbGlnbi1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzOFxcXCJcIlxuICB9LFxuICBcIi5mYS1hbGlnbi1qdXN0aWZ5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwM2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGVkZW50OmJlZm9yZSwgLmZhLW91dGRlbnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwM2JcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW5kZW50OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDNjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZpZGVvLWNhbWVyYTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzZFxcXCJcIlxuICB9LFxuICBcIi5mYS1waG90bzpiZWZvcmUsIC5mYS1pbWFnZTpiZWZvcmUsIC5mYS1waWN0dXJlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwM2VcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGVuY2lsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDQwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1hcC1tYXJrZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYWRqdXN0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDQyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRpbnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZWRpdDpiZWZvcmUsIC5mYS1wZW5jaWwtc3F1YXJlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hhcmUtc3F1YXJlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2stc3F1YXJlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3dzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDQ3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0ZXAtYmFja3dhcmQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmFzdC1iYWNrd2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0OVxcXCJcIlxuICB9LFxuICBcIi5mYS1iYWNrd2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0YVxcXCJcIlxuICB9LFxuICBcIi5mYS1wbGF5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDRiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhdXNlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDRjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0b3A6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNGRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZm9yd2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1mYXN0LWZvcndhcmQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RlcC1mb3J3YXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDUxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVqZWN0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDUyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1M1xcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDU0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdXMtY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDU1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1pbnVzLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1NlxcXCJcIlxuICB9LFxuICBcIi5mYS10aW1lcy1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2stY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDU4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXF1ZXN0aW9uLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1OVxcXCJcIlxuICB9LFxuICBcIi5mYS1pbmZvLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1YVxcXCJcIlxuICB9LFxuICBcIi5mYS1jcm9zc2hhaXJzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDViXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRpbWVzLWNpcmNsZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDVjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZWNrLWNpcmNsZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDVkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJhbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDYwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDYxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDYyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFpbC1mb3J3YXJkOmJlZm9yZSwgLmZhLXNoYXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV4cGFuZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2NVxcXCJcIlxuICB9LFxuICBcIi5mYS1jb21wcmVzczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2NlxcXCJcIlxuICB9LFxuICBcIi5mYS1wbHVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1pbnVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFzdGVyaXNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV4Y2xhbWF0aW9uLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2YVxcXCJcIlxuICB9LFxuICBcIi5mYS1naWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDZiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxlYWY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1leWU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNmVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXllLXNsYXNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDcwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdhcm5pbmc6YmVmb3JlLCAuZmEtZXhjbGFtYXRpb24tdHJpYW5nbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGxhbmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FsZW5kYXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmFuZG9tOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDc0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbW1lbnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFnbmV0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDc2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hldnJvbi1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDc4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJldHdlZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hvcHBpbmctY2FydDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3YVxcXCJcIlxuICB9LFxuICBcIi5mYS1mb2xkZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwN2JcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZm9sZGVyLW9wZW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwN2NcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3dzLXY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwN2RcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3dzLWg6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwN2VcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmFyLWNoYXJ0LW86YmVmb3JlLCAuZmEtYmFyLWNoYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDgwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR3aXR0ZXItc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDgxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZhY2Vib29rLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4MlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYW1lcmEtcmV0cm86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODNcXFwiXCJcbiAgfSxcbiAgXCIuZmEta2V5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDg0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdlYXJzOmJlZm9yZSwgLmZhLWNvZ3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29tbWVudHM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGh1bWJzLW8tdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGh1bWJzLW8tZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4OFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdGFyLWhhbGY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGVhcnQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4YVxcXCJcIlxuICB9LFxuICBcIi5mYS1zaWduLW91dDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4YlxcXCJcIlxuICB9LFxuICBcIi5mYS1saW5rZWRpbi1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGh1bWItdGFjazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1leHRlcm5hbC1saW5rOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDhlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNpZ24taW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJvcGh5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDkxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpdGh1Yi1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXBsb2FkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDkzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxlbW9uLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGhvbmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3F1YXJlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYm9va21hcmstbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5N1xcXCJcIlxuICB9LFxuICBcIi5mYS1waG9uZS1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHdpdHRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5OVxcXCJcIlxuICB9LFxuICBcIi5mYS1mYWNlYm9vay1mOmJlZm9yZSwgLmZhLWZhY2Vib29rOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDlhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpdGh1YjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5YlxcXCJcIlxuICB9LFxuICBcIi5mYS11bmxvY2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY3JlZGl0LWNhcmQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcnNzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDllXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhkZC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGEwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJ1bGxob3JuOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGExXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlbGw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZjNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2VydGlmaWNhdGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGFuZC1vLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhhbmQtby1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhhbmQtby11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhNlxcXCJcIlxuICB9LFxuICBcIi5mYS1oYW5kLW8tZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhN1xcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhOFxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctY2lyY2xlLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGFhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGFiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdsb2JlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGFjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdyZW5jaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhZFxcXCJcIlxuICB9LFxuICBcIi5mYS10YXNrczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhZVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWx0ZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnJpZWZjYXNlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGIxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93cy1hbHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ3JvdXA6YmVmb3JlLCAuZmEtdXNlcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hhaW46YmVmb3JlLCAuZmEtbGluazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjMVxcXCJcIlxuICB9LFxuICBcIi5mYS1jbG91ZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjMlxcXCJcIlxuICB9LFxuICBcIi5mYS1mbGFzazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjM1xcXCJcIlxuICB9LFxuICBcIi5mYS1jdXQ6YmVmb3JlLCAuZmEtc2Npc3NvcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29weTpiZWZvcmUsIC5mYS1maWxlcy1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhcGVyY2xpcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjNlxcXCJcIlxuICB9LFxuICBcIi5mYS1zYXZlOmJlZm9yZSwgLmZhLWZsb3BweS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjOFxcXCJcIlxuICB9LFxuICBcIi5mYS1uYXZpY29uOmJlZm9yZSwgLmZhLXJlb3JkZXI6YmVmb3JlLCAuZmEtYmFyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjOVxcXCJcIlxuICB9LFxuICBcIi5mYS1saXN0LXVsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGNhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpc3Qtb2w6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwY2JcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RyaWtldGhyb3VnaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjY1xcXCJcIlxuICB9LFxuICBcIi5mYS11bmRlcmxpbmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwY2RcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGFibGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwY2VcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFnaWM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJ1Y2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGludGVyZXN0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGQyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBpbnRlcmVzdC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ29vZ2xlLXBsdXMtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGQ0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdvb2dsZS1wbHVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGQ1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1vbmV5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGQ2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhcmV0LWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FyZXQtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FyZXQtbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkOVxcXCJcIlxuICB9LFxuICBcIi5mYS1jYXJldC1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkYVxcXCJcIlxuICB9LFxuICBcIi5mYS1jb2x1bW5zOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGRiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVuc29ydGVkOmJlZm9yZSwgLmZhLXNvcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc29ydC1kb3duOmJlZm9yZSwgLmZhLXNvcnQtZGVzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkZFxcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LXVwOmJlZm9yZSwgLmZhLXNvcnQtYXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGRlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVudmVsb3BlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGUwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpbmtlZGluOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGUxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJvdGF0ZS1sZWZ0OmJlZm9yZSwgLmZhLXVuZG86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGVnYWw6YmVmb3JlLCAuZmEtZ2F2ZWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGFzaGJvYXJkOmJlZm9yZSwgLmZhLXRhY2hvbWV0ZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29tbWVudC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGU1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbW1lbnRzLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmxhc2g6YmVmb3JlLCAuZmEtYm9sdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlN1xcXCJcIlxuICB9LFxuICBcIi5mYS1zaXRlbWFwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGU4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVtYnJlbGxhOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGU5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhc3RlOmJlZm9yZSwgLmZhLWNsaXBib2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlYVxcXCJcIlxuICB9LFxuICBcIi5mYS1saWdodGJ1bGItbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlYlxcXCJcIlxuICB9LFxuICBcIi5mYS1leGNoYW5nZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlY1xcXCJcIlxuICB9LFxuICBcIi5mYS1jbG91ZC1kb3dubG9hZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlZFxcXCJcIlxuICB9LFxuICBcIi5mYS1jbG91ZC11cGxvYWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlci1tZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmMFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdGV0aG9zY29wZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmMVxcXCJcIlxuICB9LFxuICBcIi5mYS1zdWl0Y2FzZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmMlxcXCJcIlxuICB9LFxuICBcIi5mYS1iZWxsLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29mZmVlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGY0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWN1dGxlcnk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS10ZXh0LW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZjZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnVpbGRpbmctbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmN1xcXCJcIlxuICB9LFxuICBcIi5mYS1ob3NwaXRhbC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGY4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFtYnVsYW5jZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmOVxcXCJcIlxuICB9LFxuICBcIi5mYS1tZWRraXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlnaHRlci1qZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmVlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmY1xcXCJcIlxuICB9LFxuICBcIi5mYS1oLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmZFxcXCJcIlxuICB9LFxuICBcIi5mYS1wbHVzLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmZVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1kb3VibGUtbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwMFxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1kb3VibGUtcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtZG91YmxlLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTAyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFuZ2xlLWRvdWJsZS1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTAzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFuZ2xlLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwN1xcXCJcIlxuICB9LFxuICBcIi5mYS1kZXNrdG9wOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTA4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxhcHRvcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwOVxcXCJcIlxuICB9LFxuICBcIi5mYS10YWJsZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMGFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbW9iaWxlLXBob25lOmJlZm9yZSwgLmZhLW1vYmlsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwYlxcXCJcIlxuICB9LFxuICBcIi5mYS1jaXJjbGUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwY1xcXCJcIlxuICB9LFxuICBcIi5mYS1xdW90ZS1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTBkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXF1b3RlLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTBlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNwaW5uZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTExXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1haWwtcmVwbHk6YmVmb3JlLCAuZmEtcmVwbHk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMTJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2l0aHViLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExM1xcXCJcIlxuICB9LFxuICBcIi5mYS1mb2xkZXItbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExNFxcXCJcIlxuICB9LFxuICBcIi5mYS1mb2xkZXItb3Blbi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTE1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNtaWxlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZnJvd24tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExOVxcXCJcIlxuICB9LFxuICBcIi5mYS1tZWgtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExYVxcXCJcIlxuICB9LFxuICBcIi5mYS1nYW1lcGFkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTFiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWtleWJvYXJkLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmxhZy1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTFkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZsYWctY2hlY2tlcmVkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRlcm1pbmFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTIwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvZGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFpbC1yZXBseS1hbGw6YmVmb3JlLCAuZmEtcmVwbHktYWxsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTIyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0YXItaGFsZi1lbXB0eTpiZWZvcmUsIC5mYS1zdGFyLWhhbGYtZnVsbDpiZWZvcmUsIC5mYS1zdGFyLWhhbGYtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyM1xcXCJcIlxuICB9LFxuICBcIi5mYS1sb2NhdGlvbi1hcnJvdzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyNFxcXCJcIlxuICB9LFxuICBcIi5mYS1jcm9wOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTI1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvZGUtZm9yazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyNlxcXCJcIlxuICB9LFxuICBcIi5mYS11bmxpbms6YmVmb3JlLCAuZmEtY2hhaW4tYnJva2VuOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTI3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXF1ZXN0aW9uOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTI4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWluZm86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXhjbGFtYXRpb246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3VwZXJzY3JpcHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Vic2NyaXB0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTJjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVyYXNlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyZFxcXCJcIlxuICB9LFxuICBcIi5mYS1wdXp6bGUtcGllY2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMmVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWljcm9waG9uZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzMFxcXCJcIlxuICB9LFxuICBcIi5mYS1taWNyb3Bob25lLXNsYXNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTMxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoaWVsZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzMlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYWxlbmRhci1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTMzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpcmUtZXh0aW5ndWlzaGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJvY2tldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzNVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYXhjZG46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hldnJvbi1jaXJjbGUtbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzN1xcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLWNpcmNsZS1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzOFxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLWNpcmNsZS11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzOVxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLWNpcmNsZS1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTNhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWh0bWw1OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTNiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNzczM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2NcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5jaG9yOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTNkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVubG9jay1hbHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2VcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnVsbHNleWU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZWxsaXBzaXMtaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0MVxcXCJcIlxuICB9LFxuICBcIi5mYS1lbGxpcHNpcy12OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJzcy1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGxheS1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGlja2V0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1pbnVzLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0NlxcXCJcIlxuICB9LFxuICBcIi5mYS1taW51cy1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0N1xcXCJcIlxuICB9LFxuICBcIi5mYS1sZXZlbC11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0OFxcXCJcIlxuICB9LFxuICBcIi5mYS1sZXZlbC1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZWNrLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0YVxcXCJcIlxuICB9LFxuICBcIi5mYS1wZW5jaWwtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTRiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV4dGVybmFsLWxpbmstc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTRjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoYXJlLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb21wYXNzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTRlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRvZ2dsZS1kb3duOmJlZm9yZSwgLmZhLWNhcmV0LXNxdWFyZS1vLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLXVwOmJlZm9yZSwgLmZhLWNhcmV0LXNxdWFyZS1vLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTUxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRvZ2dsZS1yaWdodDpiZWZvcmUsIC5mYS1jYXJldC1zcXVhcmUtby1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1MlxcXCJcIlxuICB9LFxuICBcIi5mYS1ldXJvOmJlZm9yZSwgLmZhLWV1cjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1M1xcXCJcIlxuICB9LFxuICBcIi5mYS1nYnA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZG9sbGFyOmJlZm9yZSwgLmZhLXVzZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1NVxcXCJcIlxuICB9LFxuICBcIi5mYS1ydXBlZTpiZWZvcmUsIC5mYS1pbnI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY255OmJlZm9yZSwgLmZhLXJtYjpiZWZvcmUsIC5mYS15ZW46YmVmb3JlLCAuZmEtanB5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTU3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJ1YmxlOmJlZm9yZSwgLmZhLXJvdWJsZTpiZWZvcmUsIC5mYS1ydWI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd29uOmJlZm9yZSwgLmZhLWtydzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1OVxcXCJcIlxuICB9LFxuICBcIi5mYS1iaXRjb2luOmJlZm9yZSwgLmZhLWJ0YzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1YVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTViXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtdGV4dDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LWFscGhhLWFzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LWFscGhhLWRlc2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc29ydC1hbW91bnQtYXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTYwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtYW1vdW50LWRlc2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc29ydC1udW1lcmljLWFzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2MlxcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LW51bWVyaWMtZGVzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2M1xcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYnMtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGh1bWJzLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEteW91dHViZS1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjZcXFwiXCJcbiAgfSxcbiAgXCIuZmEteW91dHViZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2N1xcXCJcIlxuICB9LFxuICBcIi5mYS14aW5nOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTY4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXhpbmctc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTY5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXlvdXR1YmUtcGxheTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2YVxcXCJcIlxuICB9LFxuICBcIi5mYS1kcm9wYm94OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTZiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrLW92ZXJmbG93OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTZjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWluc3RhZ3JhbTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1mbGlja3I6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNmVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYWRuOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTcwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJpdGJ1Y2tldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3MVxcXCJcIlxuICB9LFxuICBcIi5mYS1iaXRidWNrZXQtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTcyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR1bWJscjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3M1xcXCJcIlxuICB9LFxuICBcIi5mYS10dW1ibHItc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvbmctYXJyb3ctZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3NVxcXCJcIlxuICB9LFxuICBcIi5mYS1sb25nLWFycm93LXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvbmctYXJyb3ctbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3N1xcXCJcIlxuICB9LFxuICBcIi5mYS1sb25nLWFycm93LXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFwcGxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdpbmRvd3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxN2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5kcm9pZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3YlxcXCJcIlxuICB9LFxuICBcIi5mYS1saW51eDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1kcmliYmJsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1za3lwZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1mb3Vyc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTgwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyZWxsbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4MVxcXCJcIlxuICB9LFxuICBcIi5mYS1mZW1hbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4M1xcXCJcIlxuICB9LFxuICBcIi5mYS1naXR0aXA6YmVmb3JlLCAuZmEtZ3JhdGlwYXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3VuLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbW9vbi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTg2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFyY2hpdmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnVnOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTg4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTg5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdlaWJvOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMThhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlbnJlbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4YlxcXCJcIlxuICB9LFxuICBcIi5mYS1wYWdlbGluZXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RhY2stZXhjaGFuZ2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOGRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctY2lyY2xlLW8tcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctY2lyY2xlLW8tbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5MFxcXCJcIlxuICB9LFxuICBcIi5mYS10b2dnbGUtbGVmdDpiZWZvcmUsIC5mYS1jYXJldC1zcXVhcmUtby1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTkxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRvdC1jaXJjbGUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5MlxcXCJcIlxuICB9LFxuICBcIi5mYS13aGVlbGNoYWlyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTkzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZpbWVvLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5NFxcXCJcIlxuICB9LFxuICBcIi5mYS10dXJraXNoLWxpcmE6YmVmb3JlLCAuZmEtdHJ5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTk1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdXMtc3F1YXJlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3BhY2Utc2h1dHRsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5N1xcXCJcIlxuICB9LFxuICBcIi5mYS1zbGFjazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5OFxcXCJcIlxuICB9LFxuICBcIi5mYS1lbnZlbG9wZS1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd29yZHByZXNzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTlhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW9wZW5pZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5YlxcXCJcIlxuICB9LFxuICBcIi5mYS1pbnN0aXR1dGlvbjpiZWZvcmUsIC5mYS1iYW5rOmJlZm9yZSwgLmZhLXVuaXZlcnNpdHk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbW9ydGFyLWJvYXJkOmJlZm9yZSwgLmZhLWdyYWR1YXRpb24tY2FwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTlkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXlhaG9vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTllXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdvb2dsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhMFxcXCJcIlxuICB9LFxuICBcIi5mYS1yZWRkaXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmVkZGl0LXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhMlxcXCJcIlxuICB9LFxuICBcIi5mYS1zdHVtYmxldXBvbi1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3R1bWJsZXVwb246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGVsaWNpb3VzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWE1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRpZ2c6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGllZC1waXBlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhN1xcXCJcIlxuICB9LFxuICBcIi5mYS1waWVkLXBpcGVyLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhOFxcXCJcIlxuICB9LFxuICBcIi5mYS1kcnVwYWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYTlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtam9vbWxhOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxhbmd1YWdlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZheDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhY1xcXCJcIlxuICB9LFxuICBcIi5mYS1idWlsZGluZzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhZFxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGlsZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhZVxcXCJcIlxuICB9LFxuICBcIi5mYS1wYXc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Bvb246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY3ViZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiMlxcXCJcIlxuICB9LFxuICBcIi5mYS1jdWJlczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiM1xcXCJcIlxuICB9LFxuICBcIi5mYS1iZWhhbmNlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWI0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlaGFuY2Utc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWI1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0ZWFtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWI2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0ZWFtLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiN1xcXCJcIlxuICB9LFxuICBcIi5mYS1yZWN5Y2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWI4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWF1dG9tb2JpbGU6YmVmb3JlLCAuZmEtY2FyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWI5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhYjpiZWZvcmUsIC5mYS10YXhpOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWJhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyZWU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3BvdGlmeTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiY1xcXCJcIlxuICB9LFxuICBcIi5mYS1kZXZpYW50YXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWJkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvdW5kY2xvdWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYmVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGF0YWJhc2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS1wZGYtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjMVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXdvcmQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjMlxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLWV4Y2VsLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYzNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS1wb3dlcnBvaW50LW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS1waG90by1vOmJlZm9yZSwgLmZhLWZpbGUtcGljdHVyZS1vOmJlZm9yZSwgLmZhLWZpbGUtaW1hZ2UtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjNVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXppcC1vOmJlZm9yZSwgLmZhLWZpbGUtYXJjaGl2ZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWM2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtc291bmQtbzpiZWZvcmUsIC5mYS1maWxlLWF1ZGlvLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYzdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS1tb3ZpZS1vOmJlZm9yZSwgLmZhLWZpbGUtdmlkZW8tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjOFxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLWNvZGUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjOVxcXCJcIlxuICB9LFxuICBcIi5mYS12aW5lOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWNhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvZGVwZW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2JcXFwiXCJcbiAgfSxcbiAgXCIuZmEtanNmaWRkbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2NcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlmZS1ib3V5OmJlZm9yZSwgLmZhLWxpZmUtYnVveTpiZWZvcmUsIC5mYS1saWZlLXNhdmVyOmJlZm9yZSwgLmZhLXN1cHBvcnQ6YmVmb3JlLCAuZmEtbGlmZS1yaW5nOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWNkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNpcmNsZS1vLW5vdGNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWNlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJhOmJlZm9yZSwgLmZhLXJlYmVsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdlOmJlZm9yZSwgLmZhLWVtcGlyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkMVxcXCJcIlxuICB9LFxuICBcIi5mYS1naXQtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkM1xcXCJcIlxuICB9LFxuICBcIi5mYS1oYWNrZXItbmV3czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkNFxcXCJcIlxuICB9LFxuICBcIi5mYS10ZW5jZW50LXdlaWJvOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXFxOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdlY2hhdDpiZWZvcmUsIC5mYS13ZWl4aW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2VuZDpiZWZvcmUsIC5mYS1wYXBlci1wbGFuZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkOFxcXCJcIlxuICB9LFxuICBcIi5mYS1zZW5kLW86YmVmb3JlLCAuZmEtcGFwZXItcGxhbmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkOVxcXCJcIlxuICB9LFxuICBcIi5mYS1oaXN0b3J5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWRhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdlbmRlcmxlc3M6YmVmb3JlLCAuZmEtY2lyY2xlLXRoaW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGVhZGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWRjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhcmFncmFwaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkZFxcXCJcIlxuICB9LFxuICBcIi5mYS1zbGlkZXJzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWRlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoYXJlLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlMFxcXCJcIlxuICB9LFxuICBcIi5mYS1zaGFyZS1hbHQtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWUxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJvbWI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc29jY2VyLWJhbGwtbzpiZWZvcmUsIC5mYS1mdXRib2wtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlM1xcXCJcIlxuICB9LFxuICBcIi5mYS10dHk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmlub2N1bGFyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlNVxcXCJcIlxuICB9LFxuICBcIi5mYS1wbHVnOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWU2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNsaWRlc2hhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHdpdGNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWU4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXllbHA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbmV3c3BhcGVyLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2lmaTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlYlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYWxjdWxhdG9yOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWVjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBheXBhbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlZFxcXCJcIlxuICB9LFxuICBcIi5mYS1nb29nbGUtd2FsbGV0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWVlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLXZpc2E6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2MtbWFzdGVyY2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmMVxcXCJcIlxuICB9LFxuICBcIi5mYS1jYy1kaXNjb3ZlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmMlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYy1hbWV4OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWYzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLXBheXBhbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmNFxcXCJcIlxuICB9LFxuICBcIi5mYS1jYy1zdHJpcGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmVsbC1zbGFzaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmNlxcXCJcIlxuICB9LFxuICBcIi5mYS1iZWxsLXNsYXNoLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJhc2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29weXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWY5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWF0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWZhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV5ZWRyb3BwZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGFpbnQtYnJ1c2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmlydGhkYXktY2FrZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmZFxcXCJcIlxuICB9LFxuICBcIi5mYS1hcmVhLWNoYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWZlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBpZS1jaGFydDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwMFxcXCJcIlxuICB9LFxuICBcIi5mYS1saW5lLWNoYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjAxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxhc3RmbTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwMlxcXCJcIlxuICB9LFxuICBcIi5mYS1sYXN0Zm0tc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjAzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRvZ2dsZS1vZmY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLW9uOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjA1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJpY3ljbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjA3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWlveGhvc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nZWxsaXN0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjA5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjBhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoZWtlbDpiZWZvcmUsIC5mYS1zaGVxZWw6YmVmb3JlLCAuZmEtaWxzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjBiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1lYW5wYXRoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjBjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJ1eXNlbGxhZHM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29ubmVjdGRldmVsb3A6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGFzaGN1YmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZm9ydW1iZWU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGVhbnB1YjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxMlxcXCJcIlxuICB9LFxuICBcIi5mYS1zZWxsc3k6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hpcnRzaW5idWxrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjE0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNpbXBseWJ1aWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjE1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNreWF0bGFzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjE2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhcnQtcGx1czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxN1xcXCJcIlxuICB9LFxuICBcIi5mYS1jYXJ0LWFycm93LWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGlhbW9uZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxOVxcXCJcIlxuICB9LFxuICBcIi5mYS1zaGlwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjFhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVzZXItc2VjcmV0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjFiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1vdG9yY3ljbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RyZWV0LXZpZXc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGVhcnRiZWF0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZlbnVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjIxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1hcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWVyY3VyeTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyM1xcXCJcIlxuICB9LFxuICBcIi5mYS10cmFuc2dlbmRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyNFxcXCJcIlxuICB9LFxuICBcIi5mYS10cmFuc2dlbmRlci1hbHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmVudXMtZG91YmxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjI2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1hcnMtZG91YmxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjI3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZlbnVzLW1hcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFycy1zdHJva2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFycy1zdHJva2UtdjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyYVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYXJzLXN0cm9rZS1oOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjJiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW5ldXRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyY1xcXCJcIlxuICB9LFxuICBcIi5mYS1mYWNlYm9vay1vZmZpY2lhbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzMFxcXCJcIlxuICB9LFxuICBcIi5mYS1waW50ZXJlc3QtcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzMVxcXCJcIlxuICB9LFxuICBcIi5mYS13aGF0c2FwcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzMlxcXCJcIlxuICB9LFxuICBcIi5mYS1zZXJ2ZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlci1wbHVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjM0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVzZXItdGltZXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaG90ZWw6YmVmb3JlLCAuZmEtYmVkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjM2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZpYWNvaW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJhaW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Vid2F5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1lZGl1bTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzYVxcXCJcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKioqKioqKioqKioqKioqIEZvbnRzICoqKioqKioqKioqKioqKioqL1xuICAnZXhvX3JlZ3VsYXInOiByZXF1aXJlKCcuL2V4b19yZWd1bGFyJyksXG4gICdleG9faXRhbGljJzogcmVxdWlyZSgnLi9leG9faXRhbGljJyksXG4gICdleG9fZXh0cmFsaWdodCc6IHJlcXVpcmUoJy4vZXhvX2V4dHJhbGlnaHQnKSxcbiAgJ2V4b19leHRyYWxpZ2h0X2l0YWxpYyc6IHJlcXVpcmUoJy4vZXhvX2V4dHJhbGlnaHRfaXRhbGljJyksXG4gICdleG9fc2VtaWJvbGQnOiByZXF1aXJlKCcuL2V4b19zZW1pYm9sZCcpLFxuICAnZXhvX3NlbWlib2xkX2l0YWxpYyc6IHJlcXVpcmUoJy4vZXhvX3NlbWlib2xkX2l0YWxpYycpLFxuICAnZXhvX2V4dHJhYm9sZCc6IHJlcXVpcmUoJy4vZXhvX2V4dHJhYm9sZCcpLFxuICAnZXhvX2V4dHJhYm9sZF9pdGFsaWMnOiByZXF1aXJlKCcuL2V4b19leHRyYWJvbGRfaXRhbGljJyksXG5cbiAgJ2ZvbnRfYXdlc29tZSc6IHJlcXVpcmUoJy4vZm9udF9hd2Vzb21lJylcblxufTtcbiIsIi8vIGRiLmpzIC0gQ2xpZW50IGxvY2FsU3RvcmFnZSBEQiB0byBrZWVwIGRhdGEgcGVyc2lzdGVkXG5cbnZhciBsb2NhbF9zdG9yYWdlX2V4aXN0cyA9IHR5cGVvZiB3aW5kb3cubG9jYWxTdG9yYWdlID09PSAnb2JqZWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgc2F2ZTogZnVuY3Rpb24oa2V5LCB2YWx1ZSwgY2IpIHsgLy8gc2F2ZSBhbiBpdGVtIHRvIGxvY2FsU3RvcmFnZVxuXG4gICAgaWYgKGxvY2FsX3N0b3JhZ2VfZXhpc3RzKSB7XG4gICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Vba2V5XSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uKGtleSwgY2IpIHsgLy8gcmV0cmlldmUgYSBzaW5nbGUgaXRlbSBmcm9tIGxvY2FsU3RvcmFnZVxuXG4gICAgdmFyIGZvdW5kX2l0ZW0gPSBmYWxzZTtcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuXG4gICAgICB2YXIgaXRlbSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Vba2V5XTtcblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgZm91bmRfaXRlbSA9IEpTT04ucGFyc2UoaXRlbSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoY2IpIHtcbiAgICAgIGNiKGZvdW5kX2l0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZm91bmRfaXRlbTtcbiAgICB9XG5cbiAgfSxcblxuICByZW1vdmU6IGZ1bmN0aW9uKGtleSwgY2IpIHsgLy8gcmVtb3ZlIGEgc2luZ2xlIGl0ZW0gZnJvbSBsb2NhbFN0b3JhZ2VcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgaWYgKGNiKSB7XG4gICAgICBjYih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gIH0sXG5cbiAgcmVtb3ZlQWxsOiBmdW5jdGlvbihjYikgeyAvLyBkZXN0cm95IHRoZSB3aG9sZSBsb2NhbFN0b3JhZ2VcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2IodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICB9LFxuXG4gIGl0ZW1zOiBmdW5jdGlvbihjYikge1xuXG4gICAgdmFyIGtleXMgPSBmYWxzZTtcblxuICAgIGlmIChsb2NhbF9zdG9yYWdlX2V4aXN0cykge1xuICAgICAga2V5cyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpPTA7IGk8d2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBrZXlzLnB1c2god2luZG93LmxvY2FsU3RvcmFnZS5rZXkoaSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjYikge1xuICAgICAgY2Ioa2V5cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH1cblxuICB9XG5cbn07XG4iLCIvLyBhcHAgbG9nZ2luZyBzZXR0aW5nc1xudmFyIHNldHRpbmdzID0gcmVxdWlyZSgnLi8uLi9zZXR0aW5ncycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIExvZyhtZXNzYWdlKSB7XG5cbiAgaWYgKCFzZXR0aW5ncy5wcm9kdWN0aW9uKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkRldmVsb3BtZW50IE1lc3NhZ2U6IFwiICsgbWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuXG4gIH0gZWxzZSB7XG5cbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICByZXR1cm47XG5cbiAgfVxuXG59O1xuIiwiXG52YXIgYW5pbWF0aW9uQW1vdW50ID0gXCIxMDAlXCI7XG52YXIgYW5pbWF0aW9uRHVyYXRpb24gPSBcIjAuNHNcIjtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgbmFtZXM6IHtcblxuICAgIFwicmlnaHQtZmFzdFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tbGVmdC1mYXN0XCIsIG5leHQ6IFwibW92ZS1mcm9tLXJpZ2h0LWZhc3RcIiB9LFxuICAgIFwibGVmdC1mYXN0XCIgOiB7IGN1cnJlbnQ6IFwibW92ZS10by1yaWdodC1mYXN0XCIsIG5leHQ6IFwibW92ZS1mcm9tLWxlZnQtZmFzdFwiIH1cblxuICB9LFxuXG4gIHN0eWxlczoge1xuXG4gICAgXCIubW92ZS10by1sZWZ0LWZhc3RcIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVUb0xlZnRGYXN0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvblxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLWZyb20tbGVmdC1mYXN0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbUxlZnRGYXN0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvblxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLXRvLXJpZ2h0LWZhc3RcIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVUb1JpZ2h0RmFzdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9LFxuXG4gICAgXCIubW92ZS1mcm9tLXJpZ2h0LWZhc3RcIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVGcm9tUmlnaHRGYXN0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvblxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvTGVmdEZhc3RcIiA6IHtcbiAgICAgIHRvIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tTGVmdEZhc3RcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvUmlnaHRGYXN0XCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tUmlnaHRGYXN0XCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIHByb2R1Y3Rpb246IGZhbHNlXG5cbn07XG4iLCJ2YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG52YXIgTG9nID0gcmVxdWlyZSgnLi9tb2R1bGVzL2xvZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gIGFzeW5jLnBhcmFsbGVsKHtcblxuICAgIGxvYWREZXZpY2VFdmVudHM6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayhudWxsKTtcbiAgICB9LFxuXG4gIH0sIGZ1bmN0aW9uKGVycikge1xuXG4gICAgaWYgKGVycikge1xuICAgICAgTG9nKFwiRXJyb3IgbG9hZGluZyB0aGUgYXBwXCIpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIExvZyhcIkFwcCBpcyBkb25lIGxvYWRpbmdcIik7XG5cbiAgICAgIEFwcC5lbWl0KFwiYXBwOmluaXRpYWxpemVkXCIpO1xuXG4gICAgICBBcHAuUm91dGVyLm5hdmlnYXRlKFwiaG9tZVwiLCBcImZhZGVcIik7XG5cbiAgICB9XG5cbiAgfSk7XG5cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qIFJlbW92ZSB0aGUgc2Nyb2xsYmFyICovXG4gIFwiOjotd2Via2l0LXNjcm9sbGJhclwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwibm9uZVwiXG4gIH0sXG5cbiAgXCJzZWxlY3QsIGlucHV0LCB0ZXh0YXJlYSwgYnV0dG9uXCI6IHtcbiAgICBhcHBlYXJhbmNlOiBcIm5vbmVcIlxuICB9LFxuXG4gIC8qXG4gIFwiaW5wdXQ6Zm9jdXMsIHRleHRhcmVhOmZvY3VzXCI6IHtcbiAgICBcIm91dGxpbmUtc3R5bGVcIjogXCJub25lXCIsXG4gICAgXCJvdXRsaW5lLXdpZHRoXCI6IFwiMFwiXG4gIH0sXG4gICovXG5cbiAgLyogU2V0IHRoZSBiYXNlIGZvbnQgc2l6ZSB0byAxMHB4IGFuZCB1c2UgdGhlIEV4byBmb250ICovXG4gIFwiaHRtbFwiOiB7XG4gICAgXCJmb250LXNpemVcIjogXCIxMHB4XCIsXG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogXCJub3JtYWxcIixcbiAgICBjb2xvcjogQ29sb3JzLmJsYWNrXG4gIH0sXG5cbiAgLyogU2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBhcHAgdG8gb3VyIGNob3NlbiBsaWdodEdyYXkgY29sb3IgKi9cbiAgXCIjc2Ftc29uX2FwcFwiOiB7XG4gICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IENvbG9ycy5saWdodEdyYXlcbiAgfVxufTtcbiIsIlxudmFyIGRiID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RiJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVG9kb3MoKSB7XG5cbiAgdmFyIHRvZG9zID0gZGIuZ2V0KFwiVG9kb3NcIikgfHwgW107XG5cbiAgdGhpcy5hZGQgPSBmdW5jdGlvbih0b2RvX3RleHQpIHtcblxuICAgIC8vIGdpdmUgdGhlIHRvZG8gYSB1bmlxdWUgaWRcbiAgICB2YXIgdG9kbyA9IHtcbiAgICAgIF9pZCA6IFwidG9kby1cIiArIERhdGUubm93KCksXG4gICAgICB0ZXh0OiB0b2RvX3RleHRcbiAgICB9O1xuXG4gICAgdG9kb3MucHVzaCh0b2RvKTtcblxuICAgIC8vIHJlc2F2ZSB0aGUgYXJyYXkgb2YgdG9kb3MgaW4gbG9jYWxTdG9yYWdlXG4gICAgZGIuc2F2ZShcIlRvZG9zXCIsIHRvZG9zKTtcblxuICB9O1xuXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24odG9kb19pZCkge1xuXG4gICAgZm9yICh2YXIgaT0wOyBpPHRvZG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyByZW1vdmUgdGhlIHRvZG8gZnJvbSB0aGUgdG9kb3MgYXJyYXkgaWYgdGhlIF9pZCdzIG1hdGNoXG4gICAgICBpZiAodG9kb3NbaV0uX2lkID09PSB0b2RvX2lkKSB7XG4gICAgICAgIHRvZG9zLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzYXZlIHRoZSBhcnJheSBvZiB0b2RvcyBpbiBsb2NhbFN0b3JhZ2VcbiAgICBkYi5zYXZlKFwiVG9kb3NcIiwgdG9kb3MpO1xuXG4gIH07XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbih0b2RvX2lkLCB0b2RvX3RleHQpIHtcblxuICAgIGZvciAodmFyIGk9MDsgaTx0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRvZG9zW2ldLl9pZCA9PT0gdG9kb19pZCkge1xuICAgICAgICB0b2Rvc1tpXS50ZXh0ID0gdG9kb190ZXh0O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXNhdmUgdGhlIGFycmF5IG9mIHRvZG9zIGluIGxvY2FsU3RvcmFnZVxuICAgIGRiLnNhdmUoXCJUb2Rvc1wiLCB0b2Rvcyk7XG5cbiAgfTtcblxuICB0aGlzLmdldCA9IGZ1bmN0aW9uKHRvZG9faWQpIHtcblxuICAgIGZvciAodmFyIGk9MDsgaTx0b2Rvcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRvZG9zW2ldLl9pZCA9PT0gdG9kb19pZCkge1xuICAgICAgICByZXR1cm4gdG9kb3NbaV07XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgdGhpcy5nZXRBbGwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdG9kb3Muc2xpY2UoMCk7XG4gIH07XG5cbiAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdG9kb3MgPSBbXTtcblxuICAgIGRiLnNhdmUoXCJUb2Rvc1wiLCBbXSk7XG5cbiAgfTtcblxufTtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX2ZhZGVkX292ZXJsYXknLFxuICBzdHlsZToge1xuXG4gICAgXCIjc2Ftc29uX2ZhZGVkX292ZXJsYXlcIjoge1xuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiIzAwMFwiLFxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHRvcDogXCI2MHB4XCIsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICBcInotaW5kZXhcIjogMTAsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcbiAgICAgIHRyYW5zaXRpb246IFwib3BhY2l0eSAwLjJzIGxpbmVhciwgdmlzaWJpbGl0eSAwcyBsaW5lYXIgMC4yc1wiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl9mYWRlZF9vdmVybGF5LnNob3dcIjoge1xuICAgICAgb3BhY2l0eTogXCIwLjZcIixcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgXCJ0cmFuc2l0aW9uLWRlbGF5XCI6IFwiMHNcIlxuICAgIH1cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICBTYW1zb24uQXBwLmVtaXQoXCJmYWRlZC1vdmVybGF5OmhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdzaWRlLW1lbnU6aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgICdoZWFkZXI6bWVudS1idXR0b246aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRvZ2dsZUZhZGVkT3ZlcmxheSgpO1xuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNWaXNpYmxlIDogZmFsc2UsXG5cbiAgICBoaWRlRmFkZWRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93RmFkZWRPdmVybGF5IDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHRvZ2dsZUZhZGVkT3ZlcmxheTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlRmFkZWRPdmVybGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dGYWRlZE92ZXJsYXkoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBmYWRlZCBvdmVybGF5IGlzIHJlbW92ZWQgYmVmb3JlIGFueSBuZXcgcGFnZSBpcyB0cmFuc2l0aW9uZWQgdG9cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUgJiYgZGF0YS5jdXJyZW50QW5pbWF0aW9uICE9PSBcInVwZGF0ZVwiKSB7XG4gICAgICAgIHRoaXMuaGlkZUZhZGVkT3ZlcmxheSgpO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgZmFkZWQgb3ZlcmxheSBlbGVtZW50XG4gICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXkgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgZmFkZWQgb3ZlcmxheSBlbGVtZW50IGZyb20gdGhlIGNhY2hlXG4gICAgZGVsZXRlIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mYWRlZF9vdmVybGF5O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJcbnZhciBTYW1zb24gPSByZXF1aXJlKCcuLy4uLy4uLy4uLy4uLy4uL2xpYicpO1xuXG52YXIgaGVhZGVyX2hlaWdodCA9IFwiNjBweFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBlbDogJ3NhbXNvbl9oZWFkZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHtcblxuICAgIFwiI3NhbXNvbl9oZWFkZXJcIjoge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcImxlZnRcIjogXCIwXCIsXG4gICAgICBcInJpZ2h0XCI6IFwiMFwiLFxuICAgICAgXCJ0b3BcIjogXCIwXCIsXG4gICAgICBcImhlaWdodFwiOiBoZWFkZXJfaGVpZ2h0LFxuICAgICAgXCJ6LWluZGV4XCI6IDMsXG4gICAgICBcImJveC1zaGFkb3dcIjogXCIwIDAgOHB4IHJnYmEoMCwwLDAsMC4zKVwiLFxuICAgICAgXCJvcGFjaXR5XCI6IDEsXG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjMDAwMDAwXCIsXG4gICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgMC42cyBlYXNlXCIsXG4gICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKDAsLVwiICsgaGVhZGVyX2hlaWdodCArIFwiLDApXCJcbiAgICB9LFxuXG4gICAgXCIjc2Ftc29uX2hlYWRlci5zaG93XCI6IHtcbiAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIlxuICAgIH0sXG5cbiAgICBcIiNzYW1zb25faGVhZGVyX3RpdGxlXCI6IHtcbiAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgXCJsZWZ0XCI6IFwiNTAlXCIsXG4gICAgICBcInRvcFwiOiBcIjUwJVwiLFxuICAgICAgXCJoZWlnaHRcIjogXCI0MHB4XCIsXG4gICAgICBcImxpbmUtaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgICAgXCJ3aWR0aFwiOiBcIjYwJVwiLFxuICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUoLTUwJSwtNTAlKVwiLFxuICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgIFwiZm9udC1zaXplXCI6IFwiM3JlbVwiLFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwibWlkZGxlXCJcbiAgICB9LFxuXG4gICAgXCIjc2Ftc29uX2hlYWRlcl9tZW51X2J1dHRvbiwgI3NhbXNvbl9oZWFkZXJfYmFja19idXR0b25cIjoge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcImxlZnRcIjogXCIxMHB4XCIsXG4gICAgICBcInRvcFwiOiBcIjEwcHhcIixcbiAgICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiBcIjQwcHhcIixcbiAgICAgIFwid2lkdGhcIjogXCI0MHB4XCIsXG4gICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgXCJmb250LXNpemVcIjogXCI0cmVtXCIsXG4gICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJtaWRkbGVcIlxuICAgIH1cblxuICB9LFxuXG4gIGRvbUV2ZW50czoge1xuXG4gICAgJ3RvdWNoICNzYW1zb25faGVhZGVyX21lbnVfYnV0dG9uJzogZnVuY3Rpb24oKSB7XG4gICAgICBTYW1zb24uQXBwLmVtaXQoJ2hlYWRlcjptZW51LWJ1dHRvbjpoaXQnKTtcbiAgICB9LFxuXG4gICAgJ3RvdWNoICNzYW1zb25faGVhZGVyX2JhY2tfYnV0dG9uJzogZnVuY3Rpb24oKSB7XG4gICAgICBTYW1zb24uQXBwLmVtaXQoJ2hlYWRlcjpiYWNrLWJ1dHRvbjpoaXQnKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdhcHA6aW5pdGlhbGl6ZWQnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2hvd0hlYWRlcigpO1xuICAgIH0sXG5cbiAgICAnaGVhZGVyOnNob3cnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc2hvd0hlYWRlcigpO1xuICAgIH0sXG5cbiAgICAnaGVhZGVyOmhpZGUnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaGlkZUhlYWRlcigpO1xuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaGVhZGVySGVpZ2h0OiBoZWFkZXJfaGVpZ2h0LFxuXG4gICAgaXNWaXNpYmxlIDogZmFsc2UsXG5cbiAgICBoaWRlSGVhZGVyIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93SGVhZGVyIDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfSxcblxuICAgIHRvZ2dsZUhlYWRlcjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgdGhpcy5oaWRlSGVhZGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNob3dIZWFkZXIoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfSxcblxuICByb3V0ZXI6IHtcblxuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG5cbiAgICAgIC8vIGlmIHRoZSBwYWdlIGlzIGZ1bGxzY3JlZW4sIHRoZW4gaGlkZSB0aGUgaGVhZGVyIGFuZCBzdHJldGNoIHRoZSBwYWdlIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxuICAgICAgaWYgKFNhbXNvbi5BcHAuUm91dGVyLnBhZ2VDYWNoZVtkYXRhLm5leHRQYWdlXS5mdWxsc2NyZWVuKSB7XG4gICAgICAgIFNhbXNvbi5BcHAuRE9NW2RhdGEuaW5hY3RpdmVQYWdlRWxlbWVudF0uc3R5bGUudG9wID0gXCJcIjtcbiAgICAgICAgdGhpcy5oaWRlSGVhZGVyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBTYW1zb24uQXBwLkRPTVtkYXRhLmluYWN0aXZlUGFnZUVsZW1lbnRdLnN0eWxlLnRvcCA9IGhlYWRlcl9oZWlnaHQ7XG4gICAgICAgIHRoaXMuc2hvd0hlYWRlcigpO1xuICAgICAgfVxuXG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG5cbiAgICBkdXJpbmdBbmltYXRlOiBmdW5jdGlvbihkYXRhKSB7IC8vIG5vIGNhbGxiYWNrXG5cbiAgICAgIC8vIGlmIHRoZSBuZXh0IHBhZ2UgaGFzIGEgcHJldmlvdXNQYWdlLCB0aGVuIHJlcGxhY2UgdGhlICNzYW1zb25faGVhZGVyX21lbnVfYnV0dG9uIHdpdGggI3NhbXNvbl9tZW51X2JhY2tfYnV0dG9uXG4gICAgICBpZiAoU2Ftc29uLkFwcC5QYWdlc1tkYXRhLm5leHRQYWdlXS5wcmV2aW91c1BhZ2UpIHtcbiAgICAgICAgU2Ftc29uLkFwcC5EYXRhLkhlYWRlci5idXR0b24gPSBcImJhY2tcIjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG4gICAgfVxuXG4gIH0sXG5cbiAgLy8gbXVzdCBzeW5jaHJvbm91c2x5IHJldHVybiBhbiBvYmplY3QgdGhhdCB3aWxsIHNldCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgY29tcG9uZW50LiB0aGlzIG9iamVjdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgdGVtcGxhdGluZyBlbmdpbmVcbiAgc2V0SW5pdGlhbFN0YXRlIDogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICB0aXRsZTogU2Ftc29uLkFwcC5EYXRhLkhlYWRlci50aXRsZSxcbiAgICAgIGJ1dHRvbjogU2Ftc29uLkFwcC5EYXRhLkhlYWRlci5idXR0b25cbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgaWYgKCFTYW1zb24uQXBwLkRhdGEuSGVhZGVyKSB7XG4gICAgICBTYW1zb24uQXBwLkRhdGEuSGVhZGVyID0ge307XG4gICAgfVxuXG4gICAgaWYgKCFTYW1zb24uQXBwLkRhdGEuSGVhZGVyLnRpdGxlKSB7XG4gICAgICBTYW1zb24uQXBwLkRhdGEuSGVhZGVyLnRpdGxlID0gXCJBcHBcIjtcbiAgICB9XG5cbiAgICBpZiAoIVNhbXNvbi5BcHAuRGF0YS5IZWFkZXIuYnV0dG9uKSB7XG4gICAgICBTYW1zb24uQXBwLkRhdGEuSGVhZGVyLmJ1dHRvbiA9IFwibWVudVwiO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gY2FjaGUgdGhlIGhlYWRlciBlbGVtZW50XG4gICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2hlYWRlciA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gZGVsZXRlIHRoZSBoZWFkZXIgZWxlbWVudCBmcm9tIHRoZSBjaGFjaGVcbiAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2hlYWRlcjtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoYnV0dG9uLCB0aXRsZSkge1xuaWYgKCBidXR0b24gPT09IFwibWVudVwiKVxue1xuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJzYW1zb25faGVhZGVyX21lbnVfYnV0dG9uXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtYmFyc1xcXCI+PC9pPjwvZGl2PlwiKTtcbn1cbmVsc2UgaWYgKCBidXR0b24gPT09IFwiYmFja1wiKVxue1xuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJzYW1zb25faGVhZGVyX2JhY2tfYnV0dG9uXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtY2hldnJvbi1sZWZ0XFxcIj48L2k+PC9kaXY+XCIpO1xufVxuYnVmLnB1c2goXCI8ZGl2IGlkPVxcXCJzYW1zb25faGVhZGVyX3RpdGxlXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0aXRsZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9kaXY+XCIpO30uY2FsbCh0aGlzLFwiYnV0dG9uXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5idXR0b246dHlwZW9mIGJ1dHRvbiE9PVwidW5kZWZpbmVkXCI/YnV0dG9uOnVuZGVmaW5lZCxcInRpdGxlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50aXRsZTp0eXBlb2YgdGl0bGUhPT1cInVuZGVmaW5lZFwiP3RpdGxlOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgaGVhZGVyIDogcmVxdWlyZSgnLi9oZWFkZXInKSxcblxuICBzaWRlTWVudSA6IHJlcXVpcmUoJy4vc2lkZU1lbnUnKSxcblxuICBmYWRlZE92ZXJsYXkgOiByZXF1aXJlKCcuL2ZhZGVkT3ZlcmxheScpLFxuXG4gIHRyYW5zcGFyZW50T3ZlcmxheSA6IHJlcXVpcmUoJy4vdHJhbnNwYXJlbnRPdmVybGF5JylcblxufTtcbiIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX3NpZGVtZW51JyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG4gIHN0eWxlOiB7XG5cbiAgICBcIiNzYW1zb25fc2lkZW1lbnVcIjoge1xuICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICBcInotaW5kZXhcIjogMTEsXG4gICAgICBcImxlZnRcIjogXCItMjAwcHhcIixcbiAgICAgIFwidG9wXCI6IFwiNjBweFwiLFxuICAgICAgXCJib3R0b21cIjogXCIwXCIsXG4gICAgICBcIndpZHRoXCIgOiBcIjIwMHB4XCIsXG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjNjY2XCIsXG4gICAgICBcInRyYW5zaXRpb25cIjogXCJhbGwgMC4ycyBlYXNlLWluLW91dFwiLFxuICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIlxuICAgIH0sXG5cbiAgICBcIiNzYW1zb25fc2lkZW1lbnUub3BlblwiOiB7XG4gICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKDIwMHB4LDAsMClcIlxuICAgIH0sXG5cbiAgICBcIi5zYW1zb25fc2lkZW1lbnVfaXRlbVwiOiB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBwYWRkaW5nOiBcIjEwcHggMTBweCAxMHB4IDEwcHhcIixcbiAgICAgIGNvbG9yOiBcIiNmZmZcIixcbiAgICAgIFwidGV4dC1hbGlnblwiOiBcImxlZnRcIixcbiAgICAgIFwiZm9udC1zaXplXCI6IFwiMi4ycmVtXCIsXG4gICAgICBcImJvcmRlci1ib3R0b21cIjogXCIycHggc29saWQgI2JiYlwiXG4gICAgfSxcblxuICAgIFwiLnNhbXNvbl9zaWRlbWVudV9pdGVtLnNlbGVjdGVkXCI6IHtcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBcIiMxYWJjOWNcIlxuICAgIH0sXG5cbiAgICBcIi5zYW1zb25fc2lkZW1lbnVfaXRlbTphY3RpdmVcIjoge1xuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI2ZmZlwiLFxuICAgICAgY29sb3I6IFwiIzAwMFwiXG4gICAgfSxcblxuICAgICcuc2Ftc29uX3NpZGVtZW51X2l0ZW0gaSc6IHtcbiAgICAgIFwibWFyZ2luLXJpZ2h0XCI6IFwiMTVweFwiXG4gICAgfVxuXG4gIH0sXG5cbiAgZG9tRXZlbnRzOiB7XG5cbiAgICAvLyBoYW5kbGUgYW55IC5zYW1zb25fc2lkZW1lbnVfaXRlbSBiZWluZyB0b3VjaGVkXG4gICAgJ3RvdWNoIC5zYW1zb25fc2lkZW1lbnVfaXRlbSc6IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQpIHtcblxuICAgICAgLy8gbWFrZSBzdXJlIHRoZSByb3V0ZXIgaXNuJ3QgYWxyZWFkeSBidXN5IGJlZm9yZSBhY2NlcHRpbmcgYW55IGV2ZW50cyBmcm9tIHRoZSBzaWRlbWVudVxuICAgICAgaWYgKCFTYW1zb24uQXBwLlJvdXRlci5pc0J1c3kpIHtcblxuICAgICAgICB2YXIgcGF0aCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhZ2VcIik7XG5cbiAgICAgICAgLy8gc2V0IHNlbGVjdGVkIGFzIHRydWUgb24gdGhlIHRhcmdldGVkIHNpZGVfbWVudV9pdGVtXG4gICAgICAgIFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5wYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICBpZiAocGFnZS5wYXRoID09PSBwYXRoKSB7XG4gICAgICAgICAgICBTYW1zb24uQXBwLkRhdGEuc2lkZU1lbnUuc2VsZWN0ZWQgPSBwYXRoO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZm9yY2UgdGhlIHNpZGVtZW51IHRvIHJlcmVuZGVyIGlmIHRoZSBzZWxlY3RlZCBzaWRlbWVudV9pdGVtIGhhcyBjaGFuZ2VkXG4gICAgICAgIHRoaXMucmVzZXRTdGF0ZSgpO1xuXG4gICAgICAgIC8vIG9ubHkgbmF2aWdhdGUgaWYgd2UgYXJlbid0IGFscmVhZHkgb24gdGhlIHNlbGVjdGVkIHBhZ2VcbiAgICAgICAgaWYgKHBhdGggIT09IFNhbXNvbi5BcHAuUm91dGVyLmN1cnJlbnRQYWdlKSB7XG5cbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGZvY3VzX2VsZW1lbnQgc28gdGhhdCBpdCBkb2Vzbid0IHRyeSB0byByZWZvY3VzIGR1cmluZyB0aGUgcGFnZSBhbmltYXRpb25cbiAgICAgICAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQ7XG5cbiAgICAgICAgICAvLyBuYXZpZ2F0ZSB0byB0aGUgbmV3IHBhZ2VcbiAgICAgICAgICBTYW1zb24uQXBwLlJvdXRlci5uYXZpZ2F0ZShwYXRoLCBcInJpZ2h0XCIpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZVNpZGVNZW51KCk7XG4gICAgICAgICAgU2Ftc29uLkFwcC5lbWl0KFwic2lkZS1tZW51OmhpdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdoZWFkZXI6bWVudS1idXR0b246aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRvZ2dsZVNpZGVNZW51KCk7XG4gICAgfSxcblxuICAgICdmYWRlZC1vdmVybGF5OmhpdCc6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTaWRlTWVudSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuXG4gICAgaXNPcGVuOiBmYWxzZSxcblxuICAgIGNsb3NlU2lkZU1lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgLy8gcmVzdG9yZSBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IGhhZCBmb2N1cyBiZWZvcmUgdGhlIHNpZGVNZW51IHdhcyBvcGVuXG4gICAgICBpZiAoU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQpIHtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQuZm9jdXMoKTtcblxuICAgICAgICAvLyBtb3ZlIHRoZSBjdXJzb3IgdG8gdGhlIGVuZCBvZiB0aGUgdGV4dFxuICAgICAgICB2YXIgdmFsdWVfbGVuZ3RoID0gU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb247XG4gICAgICAgIHZhbHVlX2xlbmd0aCA9ICh2YWx1ZV9sZW5ndGggPT09IGZhbHNlKSA/IFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mb2N1c19lbGVtZW50LnZhbHVlLmxlbmd0aCA6IHZhbHVlX2xlbmd0aDtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UodmFsdWVfbGVuZ3RoLCB2YWx1ZV9sZW5ndGgpO1xuXG4gICAgICAgIGRlbGV0ZSBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudDtcbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBvcGVuU2lkZU1lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICAvLyBoaWRlIHRoZSBrZXlib2FyZCBhbmQgcmVtb3ZlIGZvY3VzIGZyb20gYW4gaW5wdXQvdGV4dGFyZWEgZWxlbWVudCBpZiBuZWNlc3NhcnlcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9mb2N1c19lbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX2ZvY3VzX2VsZW1lbnQub2xkQ3Vyc29yUG9zaXRpb24gPSBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudC5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgICBTYW1zb24uQXBwLkRPTS5zYW1zb25fZm9jdXNfZWxlbWVudC5ibHVyKCk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgdG9nZ2xlU2lkZU1lbnU6IGZ1bmN0aW9uKCkgeyAvLyBpZiB0aGUgc2lkZW1lbnUgaXMgY2xvc2VkIHRoZW4gb3BlbiBpdCwgaWYgb3BlbiB0aGVuIGNsb3NlIGl0XG4gICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5jbG9zZVNpZGVNZW51KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW5TaWRlTWVudSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIHJvdXRlcjoge1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIHNpZGUgbWVudSBpcyBjbG9zZWQgYmVmb3JlIGFueSBuZXcgcGFnZSBpcyB0cmFuc2l0aW9uZWQgdG9cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAodGhpcy5pc09wZW4gICYmIGRhdGEuY3VycmVudEFuaW1hdGlvbiAhPT0gXCJ1cGRhdGVcIikge1xuICAgICAgICB0aGlzLmNsb3NlU2lkZU1lbnUoKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcblxuICAgICAgcGFnZXM6IFNhbXNvbi5BcHAuRGF0YS5zaWRlTWVudS5wYWdlcyxcbiAgICAgIHNlbGVjdGVkOiBTYW1zb24uQXBwLkRhdGEuc2lkZU1lbnUuc2VsZWN0ZWRcblxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIENvbXBvbmVudCBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgc2lkZW1lbnUgZWxlbWVudFxuICAgIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl9zaWRlbWVudSA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBDb21wb25lbnQgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHNpZGVtZW51IGVsZW1lbnQgZnJvbSB0aGUgY2FjaGVcbiAgICBkZWxldGUgU2Ftc29uLkFwcC5ET00uc2Ftc29uX3NpZGVtZW51O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChwYWdlcywgc2VsZWN0ZWQsIHVuZGVmaW5lZCkge1xuLy8gaXRlcmF0ZSBwYWdlc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBwYWdlcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHBhZ2UgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmF0dHIoXCJkYXRhLXBhZ2VcIiwgcGFnZS5wYXRoLCB0cnVlLCBmYWxzZSkpICsgKGphZGUuY2xzKFtcInNhbXNvbl9zaWRlbWVudV9pdGVtIFwiICsgKChwYWdlLnBhdGggPT09IHNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnKSkgKyBcIlwiXSwgW3RydWVdKSkgKyBcIj48aVwiICsgKGphZGUuY2xzKFsnZmEnLHBhZ2UuaWNvbl0sIFtudWxsLHRydWVdKSkgKyBcIj48L2k+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gcGFnZS5uYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgcGFnZSA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuYXR0cihcImRhdGEtcGFnZVwiLCBwYWdlLnBhdGgsIHRydWUsIGZhbHNlKSkgKyAoamFkZS5jbHMoW1wic2Ftc29uX3NpZGVtZW51X2l0ZW0gXCIgKyAoKHBhZ2UucGF0aCA9PT0gc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJycpKSArIFwiXCJdLCBbdHJ1ZV0pKSArIFwiPjxpXCIgKyAoamFkZS5jbHMoWydmYScscGFnZS5pY29uXSwgW251bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBwYWdlLm5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwicGFnZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnBhZ2VzOnR5cGVvZiBwYWdlcyE9PVwidW5kZWZpbmVkXCI/cGFnZXM6dW5kZWZpbmVkLFwic2VsZWN0ZWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnNlbGVjdGVkOnR5cGVvZiBzZWxlY3RlZCE9PVwidW5kZWZpbmVkXCI/c2VsZWN0ZWQ6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vLi4vLi4vLi4vLi4vLi4vbGliJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXknLFxuICBzdHlsZToge1xuXG4gICAgXCIjc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXlcIjoge1xuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiIzAwMFwiLFxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIFwiei1pbmRleFwiOiAxMCxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5LnNob3dcIjoge1xuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCJcbiAgICB9XG4gIH0sXG5cbiAgZG9tRXZlbnRzOiB7XG5cbiAgICAndG91Y2gnIDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIFNhbXNvbi5BcHAuZW1pdChcInRyYW5zcGFyZW50LW92ZXJsYXk6aGl0XCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50czoge30sXG5cbiAgZXh0ZW5kOiB7XG5cbiAgICBpc1Zpc2libGU6IGZhbHNlLFxuXG4gICAgaGlkZVRyYW5zcGFyZW50T3ZlcmxheSA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2hvd1RyYW5zcGFyZW50T3ZlcmxheSA6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB0b2dnbGVUcmFuc3BhcmVudE92ZXJsYXkgOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmhpZGVUcmFuc3BhcmVudE92ZXJsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd1RyYW5zcGFyZW50T3ZlcmxheSgpO1xuICAgICAgfVxuICAgIH1cblxuICB9LFxuXG4gIHJvdXRlcjoge1xuXG4gICAgYmVmb3JlQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuc2hvd1RyYW5zcGFyZW50T3ZlcmxheSgpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgYWZ0ZXJBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5oaWRlVHJhbnNwYXJlbnRPdmVybGF5KCk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgdHJhbnNwYXJlbnQgb3ZlcmxheSBlbGVtZW50XG4gICAgU2Ftc29uLkFwcC5ET00uc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXkgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgdHJhbnNwYXJlbnQgb3ZlcmxheSBlbGVtZW50IGZyb20gdGhlIGNhY2hlXG4gICAgZGVsZXRlIFNhbXNvbi5BcHAuRE9NLnNhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJcbnZhciBkYiA9IHJlcXVpcmUoJy4vLi4vLi4vY29tbW9uL21vZHVsZXMvZGInKTtcbnZhciBhdXRvc2l6ZSA9IHJlcXVpcmUoJ2F1dG9zaXplJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIHBhdGg6ICdhZGRUb2RvcycsXG4gIHN1YlBhZ2VPZjogZmFsc2UsXG4gIHByZXZpb3VzUGFnZTogZmFsc2UsXG4gIGJhY2tTYWZlOiB0cnVlLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHtcblxuICAgIFwiI2FkZFRvZG9zLXBhZ2VcIjoge1xuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICBwYWRkaW5nOiBcIjIwcHhcIlxuICAgIH0sXG5cbiAgICBcIiNuZXctdG9kby10ZXh0YXJlYVwiOiB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjEuNXJlbVwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiAxLjIsXG4gICAgICBwYWRkaW5nOiBcIjRweFwiLFxuICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiNDBweFwiLFxuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IENvbG9ycy53aGl0ZSxcbiAgICAgIFwiYm9yZGVyLXJhZGl1c1wiOiBcIjVweFwiLFxuICAgICAgXCJib3JkZXJcIjogXCIzcHggc29saWQgXCIgKyBDb2xvcnMuZ3JheVxuICAgIH0sXG5cbiAgICBcIiNuZXctdG9kby1zdWJtaXQtYnV0dG9uXCI6IHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IENvbG9ycy50dXJxdW9pc2UsXG4gICAgICBcImJvcmRlci1yYWRpdXNcIjogXCI1cHhcIixcbiAgICAgIGNvbG9yOiBDb2xvcnMud2hpdGUsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjIuNXJlbVwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiBcIjQwcHhcIixcbiAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIm1pZGRsZVwiXG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG4gICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gIH0sXG5cbiAgZG9tRXZlbnRzIDoge1xuXG4gICAgLy8gdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgY3VycmVudCB0b2RvIGluIGxvY2FsU3RvcmFnZSBhbmQgcmVzaXplIHRoZSB0ZXh0YXJlYSBpZiBuZWNlc3NhcnlcbiAgICAnaW5wdXQgI25ldy10b2RvLXRleHRhcmVhJzogZnVuY3Rpb24oZSkge1xuXG4gICAgICAvLyBzdG9yZSB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgbmV3IFRvRG8gSXRlbVxuICAgICAgQXBwLk1vZGVscy5Ub2RvSXRlbSA9IEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWU7XG4gICAgICBkYi5zYXZlKFwiVG9kb0l0ZW1cIiwgQXBwLkRPTS5uZXdfdG9kb190ZXh0YXJlYS52YWx1ZSk7XG5cbiAgICB9LFxuXG4gICAgLy8gdmFsaWRhdGUgdGhlIHRvZG8gYW5kIGFkZCBpdCB0byB0aGUgVG9kb3MgY29sbGVjdGlvblxuICAgICd0b3VjaCAjbmV3LXRvZG8tc3VibWl0LWJ1dHRvbic6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgdG9kbyA9IEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWU7XG5cbiAgICAgIEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEudmFsdWUgPSBcIlwiO1xuICAgICAgYXV0b3NpemUudXBkYXRlKEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgICBBcHAuTW9kZWxzLlRvZG9JdGVtID0gXCJcIjtcbiAgICAgIGRiLnJlbW92ZShcIlRvZG9JdGVtXCIpO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MuYWRkKHRvZG8pO1xuXG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzIDoge30sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgdG9kb19pdGVtOiBBcHAuTW9kZWxzLlRvZG9JdGVtXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIEFwcC5EYXRhLkhlYWRlci50aXRsZSA9IFwiQWRkIFRvRG9zXCI7XG5cbiAgICAvLyBjaGVjayBpZiBhIFRvZG9JdGVtIGlzIGFscmVhZHkgaW4gbG9jYWxTdG9yYWdlXG4gICAgaWYgKEFwcC5Nb2RlbHMuVG9kb0l0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgQXBwLk1vZGVscy5Ub2RvSXRlbSA9IGRiLmdldChcIlRvZG9JdGVtXCIpIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRE9NLm5ld190b2RvX3RleHRhcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctdG9kby10ZXh0YXJlYVwiKTtcblxuICAgIGF1dG9zaXplKEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZS5kZXN0cm95KEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWEpO1xuXG4gICAgZGVsZXRlIEFwcC5ET00ubmV3X3RvZG9fdGV4dGFyZWE7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHRvZG9faXRlbSkge1xuYnVmLnB1c2goXCI8dGV4dGFyZWEgaWQ9XFxcIm5ldy10b2RvLXRleHRhcmVhXFxcIiByb3dzPVxcXCIxXFxcIiBwbGFjZWhvbGRlcj1cXFwiQWRkIGEgbmV3IFRvRG8gSXRlbSBoZXJlLi4uXFxcIiByZXF1aXJlZD1cXFwicmVxdWlyZWRcXFwiIGF1dG9mb2N1cz1cXFwiYXV0b2ZvY3VzXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0b2RvX2l0ZW0pID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvdGV4dGFyZWE+PGRpdiBpZD1cXFwibmV3LXRvZG8tc3VibWl0LWJ1dHRvblxcXCI+QWRkIEl0ZW08L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJ0b2RvX2l0ZW1cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvZG9faXRlbTp0eXBlb2YgdG9kb19pdGVtIT09XCJ1bmRlZmluZWRcIj90b2RvX2l0ZW06dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwYXRoOiAnaG9tZScsXG4gIHN1YlBhZ2VPZjogZmFsc2UsXG4gIHByZXZpb3VzUGFnZTogZmFsc2UsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZToge1xuXG4gICAgXCIjaG9tZS1wYWdlXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgfSxcblxuICAgIFwiLmFwcC1pbmZvXCI6IHtcbiAgICAgIFwid2lkdGhcIjogXCI4MCVcIixcbiAgICAgIG1hcmdpbjogXCIyMHB4IGF1dG8gMjBweCBhdXRvXCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjEuNnJlbVwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiAxLjRcbiAgICB9XG5cbiAgfSxcblxuICBkb21FdmVudHMgOiB7fSxcblxuICBhcHBFdmVudHMgOiB7fSxcblxuICBleHRlbmQgOiB7XG5cbiAgfSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIG5hbWU6IFwiSG9tZSBQYWdlXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgQXBwLkRhdGEuSGVhZGVyLnRpdGxlID0gXCJUb0RvIEFwcFwiO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vdGhpcy50b3BCb3gub2ZmKCdjbGlja2VkJyk7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImFwcC1pbmZvXFxcIj5UaGlzIHNpbXBsZSBhcHAgd2lsbCBhbGxvdyB5b3UgdG8gbWFuYWdlIGEgVG9EbyBMaXN0LiBIaXQgdGhlIG1lbnUgYnV0dG9uIHRvIG5hdmlnYXRlIHRvIHRoZSBcXFwiQWRkIFRvRG9zXFxcIiBvciBcXFwiVmlldyBUb0Rvc1xcXCIgcGFnZXMuIEFueSBUb0RvIGl0ZW1zIHlvdSBhZGQgd2lsbCBiZSBzdG9yZWQgb24geW91ciBkZXZpY2UsIHNvIHRoYXQgeW91IGNhbiBhY2Nlc3MgdGhlbSBldmVuIHdoZW4geW91IGFyZSBvZmZsaW5lLjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGhvbWU6IHJlcXVpcmUoJy4vaG9tZScpLFxuXG4gIGFkZFRvZG9zOiByZXF1aXJlKCcuL2FkZFRvZG9zJyksXG5cbiAgdmlld1RvZG9zOiByZXF1aXJlKCcuL3ZpZXdUb2RvcycpXG5cbn07XG4iLCJcbnZhciBhdXRvc2l6ZSA9IHJlcXVpcmUoJ2F1dG9zaXplJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG5wYXRoOiAndmlld1RvZG9zJyxcbiAgc3ViUGFnZU9mOiBmYWxzZSxcbiAgcHJldmlvdXNQYWdlOiBmYWxzZSxcbiAgYmFja1NhZmU6IHRydWUsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZToge1xuXG4gICAgXCIjdmlld1RvZG9zLXBhZ2VcIjoge1xuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICBwYWRkaW5nOiBcIjIwcHggMjBweCAwIDIwcHhcIixcbiAgICB9LFxuXG4gICAgXCIudG9kby1pdGVtXCI6IHtcbiAgICAgIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXG4gICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiMTVweFwiLFxuICAgICAgXCJ3aWR0aFwiOiBcIjkyJVwiXG4gICAgfSxcblxuICAgIFwiLnRvZG8taXRlbS10ZXh0XCI6IHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMuYmx1ZSxcbiAgICAgIGNvbG9yOiBDb2xvcnMud2hpdGUsXG4gICAgICBcImJvcmRlci1yYWRpdXNcIjogXCI0cHhcIixcbiAgICAgIHBhZGRpbmc6IFwiNHB4XCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjEuNXJlbVwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiAxLjIsXG4gICAgICBcImJvcmRlclwiOiBcIjNweCBzb2xpZCBcIiArIENvbG9ycy5ibHVlXG4gICAgfSxcblxuICAgIFwiLnRvZG8taXRlbS10ZXh0OmZvY3VzXCI6IHtcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMud2hpdGUsXG4gICAgICBjb2xvcjogQ29sb3JzLmJsYWNrXG4gICAgfSxcblxuICAgIFwiLnRvZG8taXRlbS1yZW1vdmUtYnV0dG9uXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICB0b3A6IFwiNnB4XCIsIHJpZ2h0OiBcIi0yNnB4XCIsXG4gICAgICB3aWR0aDogXCIyMHB4XCIsXG4gICAgICBoZWlnaHQ6IFwiMjBweFwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiBcIjIwcHhcIixcbiAgICAgIFwiZm9udC1zaXplXCI6IFwiMS41cmVtXCIsXG4gICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJtaWRkbGVcIixcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMucmVkLFxuICAgICAgXCJib3JkZXItcmFkaXVzXCI6IFwiNXB4XCIsXG4gICAgICBjb2xvcjogQ29sb3JzLndoaXRlXG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG4gICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gIH0sXG5cbiAgZG9tRXZlbnRzIDoge1xuXG4gICAgLy8gcmVtb3ZlIGEgdG9kbyBpdGVtIGlmIHRoZSByZW1vdmUgYnV0dG9uIGlzIHRvdWNoZWRcbiAgICAndG91Y2ggLnRvZG8taXRlbS1yZW1vdmUtYnV0dG9uJyA6IGZ1bmN0aW9uKGUsIHRhcmdldCkge1xuXG4gICAgICB2YXIgdG9kb19pZCA9IHRhcmdldC5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG5cbiAgICAgIC8vIHJlbW92ZSB0aGUgYXV0b3NpemUgbGlzdGVuZXIgb24gdGhpcyBpdGVtcyB0ZXh0YXJlYVxuICAgICAgYXV0b3NpemUuZGVzdHJveSh0YXJnZXQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwidGV4dGFyZWFcIikpO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MucmVtb3ZlKHRvZG9faWQpO1xuICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICB9LFxuXG4gICAgLy8gcmVtb3ZlIGZvY3VzIGZyb20gYW55IHRleHRhcmVhIGlmIHRoZSB1c2VyIHRvdWNoZXMgb2ZmIG9mIGl0XG4gICAgJ3RvdWNoICN2aWV3VG9kb3MtcGFnZSc6IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBcInZpZXdUb2Rvcy1wYWdlXCIpIHtcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gc3RvcmUgdGhlIG5ldyBhcnJheSBvZiB0b2RvcyBpZiBhbnkgdG9kbyBpdGVtJ3MgdmFsdWUgaXMgdXBkYXRlZFxuICAgICdpbnB1dCAudG9kby1pdGVtLXRleHQnOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgIHZhciB0b2RvX2lkID0gZS50YXJnZXQucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgdmFyIHRvZG9fdGV4dCA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgICBBcHAuQ29sbGVjdGlvbnMuVG9kb3MudXBkYXRlKHRvZG9faWQsIHRvZG9fdGV4dCk7XG4gICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgIH0sXG5cbiAgfSxcblxuICBhcHBFdmVudHMgOiB7fSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHRvZG9zOiBBcHAuQ29sbGVjdGlvbnMuVG9kb3MuZ2V0QWxsKClcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgQXBwLkRhdGEuSGVhZGVyLnRpdGxlID0gXCJZb3VyIFRvRG8gTGlzdFwiO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBhdXRvc2l6ZSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgYXV0b3NpemUuZGVzdHJveSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpKTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodG9kb3MsIHVuZGVmaW5lZCkge1xuLy8gaXRlcmF0ZSB0b2Rvc1xuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSB0b2RvcztcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHRvZG8gPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxkaXZcIiArIChqYWRlLmF0dHIoXCJkYXRhLWlkXCIsIHRvZG8uX2lkLCB0cnVlLCBmYWxzZSkpICsgXCIgY2xhc3M9XFxcInRvZG8taXRlbVxcXCI+PHRleHRhcmVhIHJvd3M9XFxcIjFcXFwiIGNsYXNzPVxcXCJ0b2RvLWl0ZW0tdGV4dFxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdG9kby50ZXh0KSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L3RleHRhcmVhPjxkaXYgY2xhc3M9XFxcInRvZG8taXRlbS1yZW1vdmUtYnV0dG9uXFxcIj48aSBjbGFzcz1cXFwiZmEgZmEtdGltZXNcXFwiPjwvaT48L2Rpdj48L2Rpdj5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgdG9kbyA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGRpdlwiICsgKGphZGUuYXR0cihcImRhdGEtaWRcIiwgdG9kby5faWQsIHRydWUsIGZhbHNlKSkgKyBcIiBjbGFzcz1cXFwidG9kby1pdGVtXFxcIj48dGV4dGFyZWEgcm93cz1cXFwiMVxcXCIgY2xhc3M9XFxcInRvZG8taXRlbS10ZXh0XFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSB0b2RvLnRleHQpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvdGV4dGFyZWE+PGRpdiBjbGFzcz1cXFwidG9kby1pdGVtLXJlbW92ZS1idXR0b25cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS10aW1lc1xcXCI+PC9pPjwvZGl2PjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwidG9kb3NcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvZG9zOnR5cGVvZiB0b2RvcyE9PVwidW5kZWZpbmVkXCI/dG9kb3M6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIi8vIFRpbnkgQXN5bmMgbGlicmFyeSBmb3IgdXNlIGluIG1vZGVybiBlbnZpcm9ubWVudHNcblxuKGZ1bmN0aW9uKCkge1xuXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIHJvb3QgaXMgZ2xvYmFsIG9uIHRoZSBzZXJ2ZXIsIGFuZCB3aW5kb3cgaW4gdGhlIGJyb3dzZXJcbiAgdmFyIHJvb3Q7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHRoaXMgPT09IHdpbmRvdykge1xuICAgIHJvb3QgPSB3aW5kb3c7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiB0aGlzID09PSBnbG9iYWwpIHtcbiAgICByb290ID0gZ2xvYmFsO1xuICB9IGVsc2Uge1xuICAgIHJvb3QgPSB0aGlzO1xuICB9XG5cbiAgLy8gY2FjaGVkIGZvciBwZXJmb3JtYW5jZVxuICBmdW5jdGlvbiBub29wKCkge31cbiAgdmFyIE9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcblxuICAvLyBpc0FycmF5IGFuZCBpc09iamVjdCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcbiAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkoYXJyKSAmJiBhcnIubGVuZ3RoID4gMCk7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIE9iamVjdEtleXMob2JqKS5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvRWFjaChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZXJhdG9yKGFycltpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBkb09uY2UoZm4pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNhbGxlZCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgYWxyZWFkeSBjYWxsZWQuXCIpO1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHJvb3QsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYW9sYW4vYXN5bmNcbiAgZnVuY3Rpb24gX2RvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSByZXR1cm47XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFzeW5jID0ge1xuXG4gICAgLy8gcnVucyB0aGUgdGFzayBvbiBldmVyeSBpdGVtIGluIHRoZSBhcnJheSBhdCBvbmNlXG4gICAgZWFjaCA6IGZ1bmN0aW9uKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IF9kb09uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICB2YXIgYW1vdW50ID0gYXJyLmxlbmd0aDtcblxuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIGRvRWFjaChhcnIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaXRlcmF0b3IoaXRlbSwgZG9PbmNlKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG5vb3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA+PSBhbW91bnQpIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIHJ1bnMgdGhyb3VnaCB0aGUgYXJyYXkgb25lIGl0ZW0gYXQgYSB0aW1lXG4gICAgZWFjaFNlcmllcyA6IGZ1bmN0aW9uKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IF9kb09uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICB2YXIgYW1vdW50ID0gYXJyLmxlbmd0aDtcblxuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIHZhciBpdGVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycltjb21wbGV0ZWRdLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQrKztcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPCBhbW91bnQpIHtcbiAgICAgICAgICAgICAgaXRlcmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICAgIGl0ZXJhdGUoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FuIGFjY2VwdCBhbiBvYmplY3Qgb3IgYXJyYXlcbiAgICAvLyB3aWxsIHJldHVybiBhbiBvYmplY3Qgb3IgYXJyYXkgb2YgcmVzdWx0cyBpbiB0aGUgY29ycmVjdCBvcmRlclxuICAgIHBhcmFsbGVsIDogZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG5cbiAgICAgIHZhciBrZXlzOyB2YXIgbGVuZ3RoOyB2YXIgaTsgdmFyIHJlc3VsdHM7IHZhciBraW5kO1xuICAgICAgdmFyIHVwZGF0ZWRfdGFza3MgPSBbXTtcbiAgICAgIHZhciBpc19vYmplY3Q7XG4gICAgICB2YXIgY291bnRlciA9IDA7XG5cbiAgICAgIGlmIChpc0FycmF5KHRhc2tzKSkge1xuXG4gICAgICAgIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRhc2tzKSkge1xuXG4gICAgICAgIGlzX29iamVjdCA9IHRydWU7XG4gICAgICAgIGtleXMgPSBPYmplY3RLZXlzKHRhc2tzKTtcbiAgICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIHJlc3VsdHMgPSB7fTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaT0wOyBpPGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaWYgKGlzX29iamVjdCkge1xuICAgICAgICAgIHVwZGF0ZWRfdGFza3MucHVzaCh7IGs6IGtleXNbaV0sIHQ6IHRhc2tzW2tleXNbaV1dIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZWRfdGFza3MucHVzaCh7IGs6IGksIHQ6IHRhc2tzW2ldIH0pO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdXBkYXRlZF90YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRhc2tfb2JqZWN0KSB7XG5cbiAgICAgICAgdGFza19vYmplY3QudChmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuXG4gICAgICAgICAgcmVzdWx0c1t0YXNrX29iamVjdC5rXSA9IHJlc3VsdDtcblxuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICBpZiAoY291bnRlciA9PSBsZW5ndGgpIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLy8gb25seSBhY2NlcHRzIGFuIGFycmF5IHNpbmNlIHRoZSBwcmVzZXJ2YXRpb24gb2YgdGhlIG9yZGVyIG9mIHByb3BlcnRpZXMgb24gYW4gb2JqZWN0IGNhbid0IGJlIGd1YXJhbnRlZWRcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIHJlc3VsdHMgaW4gb3JkZXJcbiAgICBzZXJpZXMgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhc2tzKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBsZW5ndGggPSB0YXNrcy5sZW5ndGg7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICBmdW5jdGlvbiBydW5UYXNrKGluZGV4KSB7XG4gICAgICAgIHRhc2tzW2luZGV4XShmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gcmVzdWx0O1xuICAgICAgICAgIGlmIChpbmRleCA8IGxlbmd0aCAtIDEpIHJldHVybiBydW5UYXNrKGluZGV4ICsgMSk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcnVuVGFzaygwKTtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gYXN5bmM7XG4gIH1cbiAgLy8gQU1EIC8gUmVxdWlyZUpTXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhc3luYztcbiAgICB9KTtcbiAgfVxuICAvLyBpbmNsdWRlZCBkaXJlY3RseSB2aWEgPHNjcmlwdD4gdGFnXG4gIGVsc2Uge1xuICAgIHJvb3QuYXN5bmMgPSBhc3luYztcbiAgfVxuXG59KCkpO1xuIiwiLyohXG5cdEF1dG9zaXplIDMuMC41XG5cdGxpY2Vuc2U6IE1JVFxuXHRodHRwOi8vd3d3LmphY2tsbW9vcmUuY29tL2F1dG9zaXplXG4qL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnbW9kdWxlJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgbW9kdWxlKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIG1vZCk7XG5cdFx0Z2xvYmFsLmF1dG9zaXplID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBtb2R1bGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGZ1bmN0aW9uIGFzc2lnbih0YSkge1xuXHRcdHZhciBfcmVmID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuXHRcdHZhciBfcmVmJHNldE92ZXJmbG93WCA9IF9yZWYuc2V0T3ZlcmZsb3dYO1xuXHRcdHZhciBzZXRPdmVyZmxvd1ggPSBfcmVmJHNldE92ZXJmbG93WCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYkc2V0T3ZlcmZsb3dYO1xuXHRcdHZhciBfcmVmJHNldE92ZXJmbG93WSA9IF9yZWYuc2V0T3ZlcmZsb3dZO1xuXHRcdHZhciBzZXRPdmVyZmxvd1kgPSBfcmVmJHNldE92ZXJmbG93WSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYkc2V0T3ZlcmZsb3dZO1xuXG5cdFx0aWYgKCF0YSB8fCAhdGEubm9kZU5hbWUgfHwgdGEubm9kZU5hbWUgIT09ICdURVhUQVJFQScgfHwgdGEuaGFzQXR0cmlidXRlKCdkYXRhLWF1dG9zaXplLW9uJykpIHJldHVybjtcblxuXHRcdHZhciBoZWlnaHRPZmZzZXQgPSBudWxsO1xuXHRcdHZhciBvdmVyZmxvd1kgPSAnaGlkZGVuJztcblxuXHRcdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0XHR2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YSwgbnVsbCk7XG5cblx0XHRcdGlmIChzdHlsZS5yZXNpemUgPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0dGEuc3R5bGUucmVzaXplID0gJ25vbmUnO1xuXHRcdFx0fSBlbHNlIGlmIChzdHlsZS5yZXNpemUgPT09ICdib3RoJykge1xuXHRcdFx0XHR0YS5zdHlsZS5yZXNpemUgPSAnaG9yaXpvbnRhbCc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdHlsZS5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcpIHtcblx0XHRcdFx0aGVpZ2h0T2Zmc2V0ID0gLShwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoZWlnaHRPZmZzZXQgPSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUoKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjaGFuZ2VPdmVyZmxvdyh2YWx1ZSkge1xuXHRcdFx0e1xuXHRcdFx0XHQvLyBDaHJvbWUvU2FmYXJpLXNwZWNpZmljIGZpeDpcblx0XHRcdFx0Ly8gV2hlbiB0aGUgdGV4dGFyZWEgeS1vdmVyZmxvdyBpcyBoaWRkZW4sIENocm9tZS9TYWZhcmkgZG8gbm90IHJlZmxvdyB0aGUgdGV4dCB0byBhY2NvdW50IGZvciB0aGUgc3BhY2Vcblx0XHRcdFx0Ly8gbWFkZSBhdmFpbGFibGUgYnkgcmVtb3ZpbmcgdGhlIHNjcm9sbGJhci4gVGhlIGZvbGxvd2luZyBmb3JjZXMgdGhlIG5lY2Vzc2FyeSB0ZXh0IHJlZmxvdy5cblx0XHRcdFx0dmFyIHdpZHRoID0gdGEuc3R5bGUud2lkdGg7XG5cdFx0XHRcdHRhLnN0eWxlLndpZHRoID0gJzBweCc7XG5cdFx0XHRcdC8vIEZvcmNlIHJlZmxvdzpcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXHRcdFx0XHR0YS5vZmZzZXRXaWR0aDtcblx0XHRcdFx0LyoganNoaW50IGlnbm9yZTplbmQgKi9cblx0XHRcdFx0dGEuc3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdH1cblxuXHRcdFx0b3ZlcmZsb3dZID0gdmFsdWU7XG5cblx0XHRcdGlmIChzZXRPdmVyZmxvd1kpIHtcblx0XHRcdFx0dGEuc3R5bGUub3ZlcmZsb3dZID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZSgpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblx0XHRcdHZhciBzdGFydEhlaWdodCA9IHRhLnN0eWxlLmhlaWdodDtcblx0XHRcdHZhciBodG1sVG9wID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblx0XHRcdHZhciBib2R5VG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cdFx0XHR2YXIgb3JpZ2luYWxIZWlnaHQgPSB0YS5zdHlsZS5oZWlnaHQ7XG5cblx0XHRcdHRhLnN0eWxlLmhlaWdodCA9ICdhdXRvJztcblxuXHRcdFx0dmFyIGVuZEhlaWdodCA9IHRhLnNjcm9sbEhlaWdodCArIGhlaWdodE9mZnNldDtcblxuXHRcdFx0aWYgKHRhLnNjcm9sbEhlaWdodCA9PT0gMCkge1xuXHRcdFx0XHQvLyBJZiB0aGUgc2Nyb2xsSGVpZ2h0IGlzIDAsIHRoZW4gdGhlIGVsZW1lbnQgcHJvYmFibHkgaGFzIGRpc3BsYXk6bm9uZSBvciBpcyBkZXRhY2hlZCBmcm9tIHRoZSBET00uXG5cdFx0XHRcdHRhLnN0eWxlLmhlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRhLnN0eWxlLmhlaWdodCA9IGVuZEhlaWdodCArICdweCc7XG5cblx0XHRcdC8vIHByZXZlbnRzIHNjcm9sbC1wb3NpdGlvbiBqdW1waW5nXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gaHRtbFRvcDtcblx0XHRcdGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gYm9keVRvcDtcblxuXHRcdFx0dmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGEsIG51bGwpO1xuXG5cdFx0XHRpZiAoc3R5bGUuaGVpZ2h0ICE9PSB0YS5zdHlsZS5oZWlnaHQpIHtcblx0XHRcdFx0aWYgKG92ZXJmbG93WSAhPT0gJ3Zpc2libGUnKSB7XG5cdFx0XHRcdFx0Y2hhbmdlT3ZlcmZsb3coJ3Zpc2libGUnKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChvdmVyZmxvd1kgIT09ICdoaWRkZW4nKSB7XG5cdFx0XHRcdFx0Y2hhbmdlT3ZlcmZsb3coJ2hpZGRlbicpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3RhcnRIZWlnaHQgIT09IHRhLnN0eWxlLmhlaWdodCkge1xuXHRcdFx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG5cdFx0XHRcdGV2dC5pbml0RXZlbnQoJ2F1dG9zaXplOnJlc2l6ZWQnLCB0cnVlLCBmYWxzZSk7XG5cdFx0XHRcdHRhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR2YXIgZGVzdHJveSA9IChmdW5jdGlvbiAoc3R5bGUpIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB1cGRhdGUpO1xuXHRcdFx0dGEucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGUpO1xuXHRcdFx0dGEucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWF1dG9zaXplLW9uJyk7XG5cdFx0XHR0YS5yZW1vdmVFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTpkZXN0cm95JywgZGVzdHJveSk7XG5cblx0XHRcdE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0dGEuc3R5bGVba2V5XSA9IHN0eWxlW2tleV07XG5cdFx0XHR9KTtcblx0XHR9KS5iaW5kKHRhLCB7XG5cdFx0XHRoZWlnaHQ6IHRhLnN0eWxlLmhlaWdodCxcblx0XHRcdHJlc2l6ZTogdGEuc3R5bGUucmVzaXplLFxuXHRcdFx0b3ZlcmZsb3dZOiB0YS5zdHlsZS5vdmVyZmxvd1ksXG5cdFx0XHRvdmVyZmxvd1g6IHRhLnN0eWxlLm92ZXJmbG93WCxcblx0XHRcdHdvcmRXcmFwOiB0YS5zdHlsZS53b3JkV3JhcCB9KTtcblxuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2F1dG9zaXplOmRlc3Ryb3knLCBkZXN0cm95KTtcblxuXHRcdC8vIElFOSBkb2VzIG5vdCBmaXJlIG9ucHJvcGVydHljaGFuZ2Ugb3Igb25pbnB1dCBmb3IgZGVsZXRpb25zLFxuXHRcdC8vIHNvIGJpbmRpbmcgdG8gb25rZXl1cCB0byBjYXRjaCBtb3N0IG9mIHRob3NlIGV2ZW50cy5cblx0XHQvLyBUaGVyZSBpcyBubyB3YXkgdGhhdCBJIGtub3cgb2YgdG8gZGV0ZWN0IHNvbWV0aGluZyBsaWtlICdjdXQnIGluIElFOS5cblx0XHRpZiAoJ29ucHJvcGVydHljaGFuZ2UnIGluIHRhICYmICdvbmlucHV0JyBpbiB0YSkge1xuXHRcdFx0dGEuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGUpO1xuXHRcdH1cblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGUpO1xuXHRcdHRhLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdXBkYXRlKTtcblx0XHR0YS5hZGRFdmVudExpc3RlbmVyKCdhdXRvc2l6ZTp1cGRhdGUnLCB1cGRhdGUpO1xuXHRcdHRhLnNldEF0dHJpYnV0ZSgnZGF0YS1hdXRvc2l6ZS1vbicsIHRydWUpO1xuXG5cdFx0aWYgKHNldE92ZXJmbG93WSkge1xuXHRcdFx0dGEuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG5cdFx0fVxuXHRcdGlmIChzZXRPdmVyZmxvd1gpIHtcblx0XHRcdHRhLnN0eWxlLm92ZXJmbG93WCA9ICdoaWRkZW4nO1xuXHRcdFx0dGEuc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7XG5cdFx0fVxuXG5cdFx0aW5pdCgpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZGVzdHJveSh0YSkge1xuXHRcdGlmICghKHRhICYmIHRhLm5vZGVOYW1lICYmIHRhLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSkgcmV0dXJuO1xuXHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRldnQuaW5pdEV2ZW50KCdhdXRvc2l6ZTpkZXN0cm95JywgdHJ1ZSwgZmFsc2UpO1xuXHRcdHRhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHVwZGF0ZSh0YSkge1xuXHRcdGlmICghKHRhICYmIHRhLm5vZGVOYW1lICYmIHRhLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSkgcmV0dXJuO1xuXHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRldnQuaW5pdEV2ZW50KCdhdXRvc2l6ZTp1cGRhdGUnLCB0cnVlLCBmYWxzZSk7XG5cdFx0dGEuZGlzcGF0Y2hFdmVudChldnQpO1xuXHR9XG5cblx0dmFyIGF1dG9zaXplID0gbnVsbDtcblxuXHQvLyBEbyBub3RoaW5nIGluIE5vZGUuanMgZW52aXJvbm1lbnQgYW5kIElFOCAob3IgbG93ZXIpXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93LmdldENvbXB1dGVkU3R5bGUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUudXBkYXRlID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRyZXR1cm4gZWw7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRhdXRvc2l6ZSA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBmdW5jdGlvbiAoeCkge1xuXHRcdFx0XHRcdHJldHVybiBhc3NpZ24oeCwgb3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdFx0YXV0b3NpemUuZGVzdHJveSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCBkZXN0cm95KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlbDtcblx0XHR9O1xuXHRcdGF1dG9zaXplLnVwZGF0ZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0aWYgKGVsKSB7XG5cdFx0XHRcdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwubGVuZ3RoID8gZWwgOiBbZWxdLCB1cGRhdGUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGVsO1xuXHRcdH07XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGF1dG9zaXplO1xufSk7IixudWxsLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7IiwiLy8gU2Ftc29uLkNvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvblxuLy8gVXNlZCB0byBzaW1wbGlmeSBjb21wb25lbnQgcmVuZGVyaW5nIGFuZCB0cmFuc2l0aW9ucyBpbiBzaW5nbGUgcGFnZSBhcHBzXG5cbnZhciBTYW1zb24gPSByZXF1aXJlKCcuL2luZGV4Jyk7XG52YXIgU2hhcmVkID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBqc3MgPSByZXF1aXJlKCdqc3MnKTtcblxuLyogb3B0aW9ucyBjYW4gaW5jbHVkZTpcbi8vIGVsIC0gdGhlIGlkIG9mIHRoZSBlbGVtZW50IHRoYXQgdGhlIHZpZXcgd2lsbCByZW5kZXIgaW50b1xuLy8gdGVtcGxhdGUvcmVuZGVyIC0gdGhlIGZ1bmN0aW9uIHRoYXQgb3V0cHV0cyBhbiBIVE1MIHN0cmluZyB0aGF0IGdldHMgYXR0YWNoZWQgdG8gdGhlIERPTVxuLy8gc3R5bGUgLSBKU1Mgc3R5bGUgb2JqZWN0XG4vLyBjb21wb25lbnRzIC0gYW55IG90aGVyIGNvbXBvbmVudHMgdGhhdCBzaG91bGQgYmUgbG9hZGVkL3JlZnJlc2hlZCB3aXRoIHRoaXMgY29tcG9uZW50XG4vLyBldmVudHMvZG9tRXZlbnRzIC0gYW55IGV2ZW50TGlzdGVuZXJzIHRvIGF0dGFjaCB0byBET00gbm9kZXNcbi8vIGFwcEV2ZW50cyAtIGFueSBpbnRlcm5hbCBhcHAgZXZlbnRMaXN0ZW5lcnNcbi8vIGJlZm9yZVJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkICh1cGRhdGUgbW9kZWxzLCBzb3J0IGNvbGxlY3Rpb25zKVxuLy8gYWZ0ZXJSZW5kZXIgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyBhZnRlciB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkIChzY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSwgbWFya2VkIGNoZWNrYm94ZXMgYXMgY2hlY2tlZClcbi8vIGJlZm9yZVJlbW92ZSAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGZ1bGx5IGRlc3Ryb3llZCAoY2xlYW51cCBtb2RlbHMsIHVwZGF0ZSBhY3Rpdml0eSBoaXN0b3J5KVxuLy8gY3VzdG9tL2V4dGVuZCAtIGFuIG9iamVjdCBjb250YWluaW5nIGN1c3RvbSBtZXRob2RzL3Byb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBDb21wb25lbnQgaW5zdGFuY2UgaWYgdGhlcmUgYXJlIG5vIG5hbWluZyBjb25mbGljdHMgd2l0aCByZXNlcnZlZCBwcm9wZXJ0aWVzXG4qL1xuXG5mdW5jdGlvbiBTYW1zb25Db21wb25lbnQob3B0aW9ucykge1xuXG4gIC8vIHNldCB0aGUgZWxlbWVudCdzIHNlbGVjdG9yIHRoYXQgd2lsbCBkZXRlcm1pbmUgd2hlcmUgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZFxuICB0aGlzLmVsID0gKG9wdGlvbnMuZWwuY2hhckF0KDApID09PSBcIiNcIikgPyBvcHRpb25zLmVsLnNsaWNlKDEpIDogb3B0aW9ucy5lbDtcblxuICAvLyBqc3Mgc3R5bGVTaGVldFxuICBpZiAodHlwZW9mIG9wdGlvbnMuc3R5bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQob3B0aW9ucy5zdHlsZSwge25hbWVkOiBmYWxzZX0pO1xuICB9XG5cbiAgLy8gc2V0IHRoZSBjb21wb25lbnQgZXZlbnRzIGlmIHRoZXkgYXJlIHNwZWNpZmllZFxuICB0aGlzLmRvbUV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzID8gb3B0aW9ucy5ldmVudHMgOiAob3B0aW9ucy5kb21FdmVudHMgfHwge30pO1xuICB0aGlzLmFwcEV2ZW50cyA9IG9wdGlvbnMuYXBwRXZlbnRzIHx8IHt9O1xuXG4gIC8vIHN1YmNvbXBvbmVudHNcbiAgdGhpcy5zZXRDb21wb25lbnRzID0gb3B0aW9ucy5zZXRDb21wb25lbnRzIHx8IGZ1bmN0aW9uKCkgeyByZXR1cm4gKG9wdGlvbnMuY29tcG9uZW50cyB8fCB7fSk7IH07XG4gIHRoaXMuY29tcG9uZW50cyA9IHRoaXMuc2V0Q29tcG9uZW50cygpO1xuICB0aGlzLl9jb21wb25lbnRzTG9hZGVkID0gZmFsc2U7XG5cbiAgLy8gc2V0SW5pdGlhbFN0YXRlIGZ1bmN0aW9uXG4gIHRoaXMuc2V0SW5pdGlhbFN0YXRlID0gb3B0aW9ucy5zZXRJbml0aWFsU3RhdGUgfHwgU2hhcmVkLmp1c3RSZXR1cm5PYmplY3Q7XG4gIHRoaXMuc3RhdGUgPSB7fTtcbiAgdGhpcy5faW5pdGlhbFN0YXRlU2V0ID0gZmFsc2U7XG4gIHRoaXMuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gIHRoaXMuX2xvYWRlZEV2ZW50cyA9IFtdO1xuXG4gIC8vIHNldCB0aGUgY29tcG9uZW50J3MgcmVuZGVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvdXRwdXQgYW4gaHRtbCBzdHJpbmdcbiAgLy8gaWYgbm8gcmVuZGVyIGZ1bmN0aW9uIHdhcyBwYXNzZWQgaW4sIHdlIGNoZWNrIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uXG4gIHRoaXMuX3RlbXBsYXRlID0gb3B0aW9ucy5yZW5kZXIgfHwgb3B0aW9ucy50ZW1wbGF0ZTtcblxuICAvLyBzZXQgdGhlIGJlZm9yZVJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmVmb3JlUmVuZGVyID0gb3B0aW9ucy5iZWZvcmVSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIGFmdGVyUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5hZnRlclJlbmRlciA9IG9wdGlvbnMuYWZ0ZXJSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIHJlbW92ZS9jbG9zZSBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkLCBvdGhlcndpc2UganVzdCBpbnZva2UgY2FsbGJhY2tcbiAgdGhpcy5iZWZvcmVSZW1vdmUgPSBvcHRpb25zLmJlZm9yZVJlbW92ZSB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIGFkZCBhbnkgcm91dGVyLXJlbGF0ZWQgdGFza3NcbiAgdGhpcy5fdXVpZCA9IHRoaXMuZWwgKyBcIi1cIiArIERhdGUubm93KCk7IC8vIHRoZSB1dWlkIGFsbG93cyB1cyB0byBlYXNpbHkgcmVmZXJlbmNlIHRoZSBhZGRlZCByb3V0ZXIgdGFza3NcbiAgdGhpcy5fcm91dGVyID0gb3B0aW9ucy5Sb3V0ZXIgfHwgb3B0aW9ucy5yb3V0ZXIgfHwge307XG4gIFNoYXJlZC5hZGRSb3V0ZXJUYXNrcyh0aGlzKTtcblxuICAvLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyBwYXNzZWQgaW50byB0aGUgY3VzdG9tIG9yIGV4dGVuZCBvYmplY3RcbiAgdmFyIGN1c3RvbSA9IG9wdGlvbnMuZXh0ZW5kIHx8IG9wdGlvbnMuY3VzdG9tIHx8IHt9O1xuICBVdGlscy5leHRlbmQodGhpcywgY3VzdG9tLCBTaGFyZWQucmVzZXJ2ZWQpO1xuXG59XG5cbi8vIEhhdmUgdGhlIFNhbXNvbkNvbXBvbmVudCBjbGFzcyBpbmhlcml0IGFueSBzaGFyZWQgbWV0aG9kcyBmcm9tIFBhZ2VDb21wb25lbnRCYXNlXG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl90eXBlID0gXCJDb21wb25lbnRcIjtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBTaGFyZWQuc2V0U3RhdGU7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLnJlc2V0U3RhdGUgPSBTaGFyZWQucmVzZXRTdGF0ZTtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2RvRmlyc3QgPSBTaGFyZWQuX2RvRmlyc3Q7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9sb2FkRXZlbnRzID0gU2hhcmVkLl9sb2FkRXZlbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fZGVzdHJveUV2ZW50cyA9IFNoYXJlZC5fZGVzdHJveUV2ZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2xvYWRDb21wb25lbnRzID0gU2hhcmVkLl9sb2FkQ29tcG9uZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3JlbmRlckNvbXBvbmVudHMgPSBTaGFyZWQuX3JlbmRlckNvbXBvbmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9kZXN0cm95Q29tcG9uZW50cyA9IFNoYXJlZC5fZGVzdHJveUNvbXBvbmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9maXhBdXRvRm9jdXNFbGVtZW50cyA9IFNoYXJlZC5fZml4QXV0b0ZvY3VzRWxlbWVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9yZW1vdmUgPSBTaGFyZWQuX3JlbW92ZTtcblxuLy8gcmVuZGVyIHRoZSBjb21wb25lbnQgdG8gdGhlIERPTVxuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLl9sb2FkQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZVJlbmRlclwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCFzZWxmLl9pbml0aWFsU3RhdGVTZXQpIHtcbiAgICAgICAgc2VsZi5zdGF0ZSA9IHNlbGYuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgIHNlbGYuX2luaXRpYWxTdGF0ZVNldCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHNlbGYuc3R5bGUpIHNlbGYuc3R5bGUuYXR0YWNoKCk7IC8vIGxvYWQgdGhlIHN0eWxlc2hlZXQgb24gZmlyc3QgcmVuZGVyXG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgY29tcG9uZW50IGVsZW1lbnRcbiAgICAgIGlmICghc2VsZi5lbGVtZW50IHx8IChmb3JjZV91cGRhdGUgfHwgc2VsZi5fc3RhdGVDaGFuZ2VkKSkge1xuICAgICAgICBmb3JjZV91cGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxmLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxmLmVsKTtcblxuICAgICAgICBpZiAoIXNlbGYuZWxlbWVudCkge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJObyBlbGVtZW50IHdpdGggdGhlIGlkIFwiICsgc2VsZi5lbCArIFwiIGV4aXN0cyBpbiB0aGUgRE9NIHNvIHdlIHdpbGwgY3JlYXRlIGl0IGFuZCBhcHBlbmQgaXQgdG8gaXRzIHBhcmVudC5cIik7XG4gICAgICAgICAgc2VsZi5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBzZWxmLmVsZW1lbnQuaWQgPSBzZWxmLmVsO1xuXG4gICAgICAgICAgaWYgKHNlbGYuX3RlbXBsYXRlKSB7XG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucGFyZW50ICYmIHNlbGYucGFyZW50LmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlbGYucGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSBpcyBubyBwYXJlbnQgdG8gYXBwZW5kIFwiICsgc2VsZi5lbCArIFwiIHRvLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5fdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSBzZWxmLl90ZW1wbGF0ZShzZWxmLnN0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICBzZWxmLl9sb2FkRXZlbnRzKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNlbGYuX3JlbmRlckNvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJlc2V0IHN0YXRlQ2hhbmdlZFxuICAgICAgICAgIHNlbGYuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgc2VsZi5fZml4QXV0b0ZvY3VzRWxlbWVudHMoKTtcblxuICAgICAgICAgIHNlbGYuX2RvRmlyc3QoXCJhZnRlclJlbmRlclwiLCBmdW5jdGlvbigpIHsgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpOyB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb25Db21wb25lbnQ7XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQWRkRXZlbnRzKHRhcmdldCkge1xuXG4gIHZhciBldmVudHMgPSB7fTsgdmFyIGVtcHR5ID0gW107XG5cbiAgLy8gc3RhcnQgbGlzdGVuaW5nXG4gIHRhcmdldC5vbiA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIsIGNvbnRleHQpIHtcbiAgICAoZXZlbnRzW3R5cGVdID0gZXZlbnRzW3R5cGVdIHx8IFtdKS5wdXNoKFtoYW5kbGVyLCBjb250ZXh0XSk7XG4gIH07XG5cbiAgLy8gc3RvcCBsaXN0ZW5pbmdcbiAgdGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICB0eXBlIHx8IChldmVudHMgPSB7fSlcbiAgICB2YXIgbGlzdCA9IGV2ZW50c1t0eXBlXSB8fCBlbXB0eSxcbiAgICBpID0gbGlzdC5sZW5ndGggPSBoYW5kbGVyID8gbGlzdC5sZW5ndGggOiAwXG4gICAgd2hpbGUoaS0tKSBoYW5kbGVyID09IGxpc3RbaV1bMF0gJiYgbGlzdC5zcGxpY2UoaSwxKVxuICB9O1xuXG4gIC8vIHNlbmQgdGhlIGV2ZW50IHRvIGFueW9uZSBsaXN0ZW5pbmdcbiAgdGFyZ2V0LmVtaXQgPSBmdW5jdGlvbih0eXBlKXtcbiAgICB2YXIgYXJncyA9IGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LCBpPTAsIGpcbiAgICB3aGlsZShqPWxpc3RbaSsrXSkgalswXS5hcHBseShqWzFdLCBhcmdzKVxuICB9O1xuXG59O1xuIiwiLyohXG4gKiBTYW1zb24uanNcbiAqIENvcHlyaWdodChjKSAyMDE1IFNhbSBEZWxnYWRvXG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgJCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9xdW8uanMnKTtcbnZhciBhc3luYyA9IHJlcXVpcmUoJ2FzeW5jLWxpdGUnKTtcblxuLy8gSlNTIGFuZCBwbHVnaW5zXG52YXIganNzID0gcmVxdWlyZSgnanNzJyk7XG52YXIganNzVmVuZG9yUHJlZml4ZXIgPSByZXF1aXJlKCdqc3MtdmVuZG9yLXByZWZpeGVyJyk7XG52YXIganNzRXh0ZW5kID0gcmVxdWlyZSgnanNzLWV4dGVuZCcpO1xuanNzLnVzZShqc3NWZW5kb3JQcmVmaXhlcik7XG5qc3MudXNlKGpzc0V4dGVuZCk7XG5cbnZhciBjc3NfcmVzZXQgPSByZXF1aXJlKCcuL3N0eWxlcy9yZXNldCcpO1xudmFyIGJhc2Vfc3R5bGVzID0gcmVxdWlyZSgnLi9zdHlsZXMvYmFzZV9zdHlsZXMnKTtcblxuLy8gcmVzZXJ2ZWQgcHJvcGVydGllcyBmb3IgdGhlIFNhbXNvbi5BcHAgb2JqZWN0LiBhbGwgcHJvcGVydGllcyBzdGFydGluZyB3aXRoIF8gYXJlIGFsc28gcmVzZXJ2ZWRcbnZhciByZXNlcnZlZCA9IFtcIiRcIiwgXCJET01cIiwgXCJEYXRhXCIsIFwic3R5bGVTaGVldFwiLCBcImJhc2VTdHlsZVwiLCBcInN0eWxlXCIsIFwiY29tcG9uZW50c1wiLCBcInNldENvbXBvbmVudHNcIiwgXCJSb3V0ZXJcIiwgXCJQYWdlc1wiLCBcIm9uXCIsIFwiZW1pdFwiLCBcIm9mZlwiXTtcblxuLy8gY3JlYXRlIHRoZSBTYW1zb24gb2JqZWN0IHRoYXQgd2lsbCBiZSBleHBvcnRlZFxubW9kdWxlLmV4cG9ydHMgPSBTYW1zb24gPSB7fTtcblxuU2Ftc29uLlZFUlNJT04gPSAnMC4xLjQnOyAvLyBrZWVwIGluIHN5bmMgd2l0aCBwYWNrYWdlLmpzb25cblxuU2Ftc29uLkV2ZW50cyA9IHJlcXVpcmUoJy4vZXZlbnRzJyk7IC8vIGEgbWl4aW4gdGhhdCB3aWxsIGF0dGFjaCBvbiwgb2ZmLCBhbmQgZW1pdCBtZXRob2RzIHRvIGFuIG9iamVjdFxuXG5TYW1zb24uUm91dGVyID0gcmVxdWlyZSgnLi9yb3V0ZXInKTtcblNhbXNvbi5jcmVhdGVSb3V0ZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciByb3V0ZXIgPSBuZXcgU2Ftc29uLlJvdXRlcihvcHRpb25zKTtcbiAgcmV0dXJuIHJvdXRlcjtcbn07XG5cblNhbXNvbi5QYWdlID0gcmVxdWlyZSgnLi9wYWdlJyk7XG5TYW1zb24uY3JlYXRlUGFnZSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGFkZF9ldmVudHMpIHtcbiAgdmFyIHBhZ2UgPSBuZXcgU2Ftc29uLlBhZ2Uob3B0aW9ucyk7XG4gIGlmIChhZGRfZXZlbnRzKSBTYW1zb24uRXZlbnRzKHBhZ2UpO1xuICByZXR1cm4gcGFnZTtcbn07XG5cblNhbXNvbi5Db21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudCcpO1xuU2Ftc29uLmNyZWF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uKG9wdGlvbnMsIGFkZF9ldmVudHMpIHtcbiAgdmFyIGNvbXBvbmVudCA9IG5ldyBTYW1zb24uQ29tcG9uZW50KG9wdGlvbnMpO1xuICBpZiAoYWRkX2V2ZW50cykgU2Ftc29uLkV2ZW50cyhjb21wb25lbnQpO1xuICByZXR1cm4gY29tcG9uZW50O1xufTtcblxuLy8gU2Ftc29uLkRPTSB3aWxsIGNhY2hlIHJlZmVyZW5jZXMgdG8gYW55IFNhbXNvbiBjcmVhdGVkIERPTSBlbGVtZW50cyBsaWtlICNzYW1zb24tYXBwXG5TYW1zb24uRE9NID0ge307XG5cbi8vIHRoZSBpbnN0YW50aWF0ZWQgYXBwIHdpbGwgYmUgYXR0YWNoZWQgdG8gU2Ftc29uLkFwcCBmb3IgcXVpY2sgYWNjZXNzXG5TYW1zb24uQXBwO1xuXG4vLyBvbmx5IG9uZSBTYW1zb24gQXBwIGNhbiBleGlzdCBhdCBhIHRpbWUsIHNvIGlmIG9uZSBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQsIHNpbXBseSByZXR1cm4gaXRcblNhbXNvbi5jcmVhdGVBcHAgPSBmdW5jdGlvbigpIHtcbiAgaWYgKFNhbXNvbi5BcHApIHtcbiAgICByZXR1cm4gU2Ftc29uLkFwcDtcbiAgfSBlbHNlIHtcbiAgICBTYW1zb24uQXBwID0gbmV3IFNhbXNvbkFwcCgpO1xuICAgIFNhbXNvbi5FdmVudHMoU2Ftc29uLkFwcCk7IC8vIG1ha2UgdGhlIG1haW4gYXBwIG9iamVjdCBhbiBldmVudCBidXNcbiAgICBTYW1zb24uQXBwLkRPTSA9IFNhbXNvbi5ET007XG4gICAgcmV0dXJuIFNhbXNvbi5BcHA7XG4gIH1cbn07XG5cbi8vIHRoZSBTYW1zb25BcHAgY2xhc3NcbmZ1bmN0aW9uIFNhbXNvbkFwcCgpIHtcbiAgdGhpcy5faXNDb25maWd1cmVkID0gZmFsc2U7XG59XG5cblNhbXNvbkFwcC5wcm90b3R5cGUuY29uZmlndXJlID0gZnVuY3Rpb24ob3B0aW9ucywgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLl9pc0NvbmZpZ3VyZWQpIHtcblxuICAgIC8vIGFkZCBRdW9KUyB0byB0aGUgYXBwIG9iamVjdCBmb3IgcXVpY2sgYWNjZXNzXG4gICAgdGhpcy4kID0gJDtcblxuICAgIC8vIGxvYWQgdGhlIGNzcyByZXNldCBhbmQgc2V0dXAgdGhlIGFwcCdzIGJhc2Ugc3R5bGVzXG4gICAgYmFzZV9zdHlsZXMgPSBvcHRpb25zLmJhc2Vfc3R5bGVzIHx8IGJhc2Vfc3R5bGVzO1xuXG4gICAgdGhpcy5iYXNlU3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldChjc3NfcmVzZXQsIHtuYW1lZDogZmFsc2V9KTtcbiAgICB0aGlzLmJhc2VTdHlsZS5hZGRSdWxlcyhiYXNlX3N0eWxlcyk7XG4gICAgdGhpcy5iYXNlU3R5bGUuYXR0YWNoKCk7XG5cbiAgICB0aGlzLnN0eWxlU2hlZXQgPSBvcHRpb25zLnN0eWxlIHx8IHt9O1xuICAgIHRoaXMuc3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldCh0aGlzLnN0eWxlU2hlZXQsIHtuYW1lZDogZmFsc2V9KTtcbiAgICB0aGlzLnN0eWxlLmF0dGFjaCgpO1xuXG4gICAgLy8gYWRkIGFueSBmb250cyB0byB0aGUgc3R5bGVzaGVldFxuICAgIHRoaXMuZm9udHMgPSB7fTtcbiAgICB2YXIgZm9udDtcbiAgICBmb3IgKGZvbnQgaW4gb3B0aW9ucy5mb250cykge1xuICAgICAgdGhpcy5mb250c1tmb250XSA9IGpzcy5jcmVhdGVTdHlsZVNoZWV0KG9wdGlvbnMuZm9udHNbZm9udF0sIHtuYW1lZDogZmFsc2V9KS5hdHRhY2goKTtcbiAgICB9XG5cbiAgICAvLyBzZXR1cCB0aGUgYXBwJ3MgRGF0YSBvYmplY3RcbiAgICB0aGlzLkRhdGEgPSBvcHRpb25zLkRhdGEgfHwgb3B0aW9ucy5kYXRhIHx8IHt9O1xuXG4gICAgLy8gc2V0dXAgdGhlIGFwcCdzIHBhZ2VzXG4gICAgdGhpcy5QYWdlcyA9IG9wdGlvbnMuUGFnZXMgfHwgb3B0aW9ucy5wYWdlcyB8fCB7fTtcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyBiYXNlIGNvbXBvbmVudHNcbiAgICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgICB0aGlzLmNvbXBvbmVudHMgPSB0aGlzLnNldENvbXBvbmVudHMoKTtcblxuICAgIC8qIEZpcnN0IHNldHVwIHRoZSByZXF1aXJlZCBET00gZWxlbWVudHMgYW5kIGNvbXBvbmVudHMgb2YgYSBTYW1zb24gQXBwICovXG5cbiAgICAvLyBhZGQgdGhlIGNvcmUgZGl2cyB0byB0aGUgYm9keVxuICAgIC8vICNzYW1zb25fYXBwLCAjc2Ftc29uX3BhZ2VzLCAjc2Ftc29uX3BhZ2VfMSwgI3NhbXNvbl9wYWdlXzIsICNzYW1zb25fZmFkZWRfb3ZlcmxheSwgI3NhbXNvbl90cmFuc3BhcmVudF9vdmVybGF5XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9hcHAuaWQgPSBcInNhbXNvbl9hcHBcIjtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5pZCA9IFwic2Ftc29uX3BhZ2VzXCI7XG5cbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5pZCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMS5jbGFzc0xpc3QuYWRkKFwic2Ftc29uLXBhZ2VcIiwgXCJhY3RpdmVcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8xKTtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmlkID0gXCJzYW1zb25fcGFnZV8yXCI7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yLmNsYXNzTGlzdC5hZGQoXCJzYW1zb24tcGFnZVwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcy5hcHBlbmRDaGlsZChTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzIpO1xuXG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fYXBwKTsgLy8gYWRkIHRoZSBiYXNlIGRpdnMgdG8gdGhlIGJvZHlcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyByb3V0ZXIgYWZ0ZXIgbG9hZGluZyBhbnkgZXh0cmEgY29tcG9uZW50c1xuICAgIHRoaXMuUm91dGVyID0gU2Ftc29uLmNyZWF0ZVJvdXRlcihvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fSk7XG5cbiAgICAvLyBhZGQgYW55IHVucmVzZXJ2ZWQgcHJvcGVydGllcyBwYXNzZWQgaW50byB0aGUgY3VzdG9tL2V4dGVuZCBvYmplY3RcbiAgICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gICAgVXRpbHMuZXh0ZW5kKHRoaXMsIGN1c3RvbSwgcmVzZXJ2ZWQpO1xuXG4gICAgLy8gTG9hZCBhbnkgb3RoZXIgY29tcG9uZW50c1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc2VsZi5jb21wb25lbnRzKTtcbiAgICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgICAgc2VsZltrZXldID0gU2Ftc29uLmNyZWF0ZUNvbXBvbmVudChzZWxmLmNvbXBvbmVudHNba2V5XSk7XG4gICAgICBzZWxmW2tleV0ucGFyZW50ID0ge2VsZW1lbnQ6IFNhbXNvbi5ET00uc2Ftc29uX2FwcCwgZGVsZWdhdGU6ICQoU2Ftc29uLkRPTS5zYW1zb25fYXBwKX07XG5cbiAgICAgIHNlbGZba2V5XS5fcmVuZGVyKGZhbHNlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2IoKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIHRoZSBTYW1zb24gQXBwIGlzIG5vdyBjb25maWd1cmVkXG4gICAgICBzZWxmLl9pc0NvbmZpZ3VyZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgU2Ftc29uIEFwcCBoYXMgYWxyZWFkeSBiZWVuIGNvbmZpZ3VyZWQhXCIpO1xuICB9XG5cbn07XG4iLCIvKipcbiAqIFF1b0pTIC0gTWljcm8gI0phdmFTY3JpcHQgTGlicmFyeSBmb3IgTW9iaWxlIERldmljZXMuXG4gKiBAdmVyc2lvbiB2My4wLjdcbiAqIEBsaW5rICAgIGh0dHA6Ly9xdW9qcy50YXBxdW8uY29tXG4gKiBAYXV0aG9yICBKYXZpIEppbWVuZXogVmlsbGFyIChAc295amF2aSkgKGh0dHBzOi8vdHdpdHRlci5jb20vc295amF2aSlcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdCxuPVtdLmluZGV4T2Z8fGZ1bmN0aW9uKHQpe2Zvcih2YXIgbj0wLGU9dGhpcy5sZW5ndGg7ZT5uO24rKylpZihuIGluIHRoaXMmJnRoaXNbbl09PT10KXJldHVybiBuO3JldHVybi0xfTt0PWZ1bmN0aW9uKCl7dmFyIHQsbixlLHIsaSx1LG8sYSxjLGwscyxmLGgsZCxwLHYsZztyZXR1cm4gcj1bXSxhPU9iamVjdC5wcm90b3R5cGUsbz0vXlxccyo8KFxcdyt8ISlbXj5dKj4vLGU9WzEsOSwxMV0sbj0vXlxcLihbXFx3LV0rKSQvLHU9L14jW1xcd1xcZC1dKyQvLHM9L15bXFx3LV0rJC8sYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIiksbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIiksaT17dHI6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpLHRib2R5OmMsdGhlYWQ6Yyx0Zm9vdDpjLHRkOmwsdGg6bCxcIipcIjpkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpfSx0PWZ1bmN0aW9uKG4sZSl7dmFyIHI7cmV0dXJuIG4/XCJmdW5jdGlvblwiPT09dC50b1R5cGUobik/dChkb2N1bWVudCkucmVhZHkobik6KHI9cChuLGUpLHYocixuKSk6digpfSx0LnF1ZXJ5PWZ1bmN0aW9uKHQsZSl7dmFyIHI7cmV0dXJuIG4udGVzdChlKT9yPXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShlLnJlcGxhY2UoXCIuXCIsXCJcIikpOnMudGVzdChlKT9yPXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSk6dS50ZXN0KGUpJiZ0PT09ZG9jdW1lbnQ/KHI9dC5nZXRFbGVtZW50QnlJZChlLnJlcGxhY2UoXCIjXCIsXCJcIikpLHJ8fChyPVtdKSk6cj10LnF1ZXJ5U2VsZWN0b3JBbGwoZSksci5ub2RlVHlwZT9bcl06QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocil9LHQuZXh0ZW5kPWZ1bmN0aW9uKHQpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkuZm9yRWFjaChmdW5jdGlvbihuKXt2YXIgZSxyO3I9W107Zm9yKGUgaW4gbilyLnB1c2godFtlXT1uW2VdKTtyZXR1cm4gcn0pLHR9LHQudG9UeXBlPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPWEudG9TdHJpbmcuY2FsbCh0KS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLyksbi5sZW5ndGg+MT9uWzFdLnRvTG93ZXJDYXNlKCk6XCJvYmplY3RcIn0sdC5lYWNoPWZ1bmN0aW9uKG4sZSl7dmFyIHIsaSx1LG8sYTtpZihpPXZvaWQgMCxvPXZvaWQgMCxcImFycmF5XCI9PT10LnRvVHlwZShuKSlmb3IoaT11PTAsYT1uLmxlbmd0aDthPnU7aT0rK3Upcj1uW2ldLGUuY2FsbChyLGkscik9PT0hMTtlbHNlIGZvcihvIGluIG4pZS5jYWxsKG5bb10sbyxuW29dKT09PSExO3JldHVybiBufSx0Lm1hcD1mdW5jdGlvbihuLGUpe3ZhciByLGksdSxvO2lmKG89W10scj12b2lkIDAsaT12b2lkIDAsXCJhcnJheVwiPT09dC50b1R5cGUobikpZm9yKHI9MDtyPG4ubGVuZ3RoOyl1PWUobltyXSxyKSxudWxsIT11JiZvLnB1c2godSkscisrO2Vsc2UgZm9yKGkgaW4gbil1PWUobltpXSxpKSxudWxsIT11JiZvLnB1c2godSk7cmV0dXJuIGgobyl9LHQubWl4PWZ1bmN0aW9uKCl7dmFyIHQsbixlLHIsaTtmb3IoZT17fSx0PTAscj1hcmd1bWVudHMubGVuZ3RoO3I+dDspe249YXJndW1lbnRzW3RdO2ZvcihpIGluIG4pZyhuLGkpJiZ2b2lkIDAhPT1uW2ldJiYoZVtpXT1uW2ldKTt0Kyt9cmV0dXJuIGV9LHY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gbnVsbD09biYmKG49XCJcIiksdD10fHxyLHQuc2VsZWN0b3I9bix0Ll9fcHJvdG9fXz12LnByb3RvdHlwZSx0fSxwPWZ1bmN0aW9uKG4scil7dmFyIGksdTtyZXR1cm4gaT1udWxsLHU9dC50b1R5cGUobiksXCJhcnJheVwiPT09dT9pPWYobik6XCJzdHJpbmdcIj09PXUmJm8udGVzdChuKT8oaT1kKG4udHJpbSgpLFJlZ0V4cC4kMSksbj1udWxsKTpcInN0cmluZ1wiPT09dT8oaT10LnF1ZXJ5KGRvY3VtZW50LG4pLHImJihpPTE9PT1pLmxlbmd0aD90LnF1ZXJ5KGlbMF0scik6dC5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdC5xdWVyeShpLHIpfSkpKTooZS5pbmRleE9mKG4ubm9kZVR5cGUpPj0wfHxuPT09d2luZG93KSYmKGk9W25dLG49bnVsbCksaX0sZD1mdW5jdGlvbihuLGUpe3ZhciByO3JldHVybiBudWxsPT1lJiYoZT1cIipcIiksZSBpbiBpfHwoZT1cIipcIikscj1pW2VdLHIuaW5uZXJIVE1MPVwiXCIrbix0LmVhY2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoci5jaGlsZE5vZGVzKSxmdW5jdGlvbigpe3JldHVybiByLnJlbW92ZUNoaWxkKHRoaXMpfSl9LGY9ZnVuY3Rpb24odCl7cmV0dXJuIHQuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P3Q6dm9pZCAwfSl9LGg9ZnVuY3Rpb24odCl7cmV0dXJuIHQubGVuZ3RoPjA/ci5jb25jYXQuYXBwbHkocix0KTp0fSxnPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGEuaGFzT3duUHJvcGVydHkuY2FsbCh0LG4pfSx2LnByb3RvdHlwZT10LmZuPXt9LHQuZm4uZWFjaD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuY2FsbChuLGUsbil9KSx0aGlzfSx0LmZuLmZpbHRlcj1mdW5jdGlvbihuKXtyZXR1cm4gdChyLmZpbHRlci5jYWxsKHRoaXMsZnVuY3Rpb24oZSl7cmV0dXJuIGUucGFyZW50Tm9kZSYmdC5xdWVyeShlLnBhcmVudE5vZGUsbikuaW5kZXhPZihlKT49MH0pKX0sdC5mbi5mb3JFYWNoPXIuZm9yRWFjaCx0LmZuLmluZGV4T2Y9ci5pbmRleE9mLHQudmVyc2lvbj1cIjMuMC43XCIsdH0oKSx0aGlzLlF1bz10aGlzLiQkPXQsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZSYmKG1vZHVsZS5leHBvcnRzPXQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gbj17VFlQRTpcIkdFVFwiLE1JTUU6XCJqc29uXCJ9LHI9e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdFwiLGpzb246XCJhcHBsaWNhdGlvbi9qc29uXCIseG1sOlwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLGh0bWw6XCJ0ZXh0L2h0bWxcIix0ZXh0OlwidGV4dC9wbGFpblwifSxlPTAsdC5hamF4U2V0dGluZ3M9e3R5cGU6bi5UWVBFLGFzeW5jOiEwLHN1Y2Nlc3M6e30sZXJyb3I6e30sY29udGV4dDpudWxsLGRhdGFUeXBlOm4uTUlNRSxoZWFkZXJzOnt9LHhocjpmdW5jdGlvbigpe3JldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0fSxjcm9zc0RvbWFpbjohMSx0aW1lb3V0OjB9LHQuYWpheD1mdW5jdGlvbihlKXt2YXIgcixvLGMsZjtpZihjPXQubWl4KHQuYWpheFNldHRpbmdzLGUpLGMudHlwZT09PW4uVFlQRT9jLnVybCs9dC5zZXJpYWxpemUoYy5kYXRhLFwiP1wiKTpjLmRhdGE9dC5zZXJpYWxpemUoYy5kYXRhKSxpKGMudXJsKSlyZXR1cm4gdShjKTtmPWMueGhyKCksZi5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtyZXR1cm4gND09PWYucmVhZHlTdGF0ZT8oY2xlYXJUaW1lb3V0KHIpLHMoZixjKSk6dm9pZCAwfSxmLm9wZW4oYy50eXBlLGMudXJsLGMuYXN5bmMpLGwoZixjKSxjLnRpbWVvdXQ+MCYmKHI9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBoKGYsYyl9LGMudGltZW91dCkpO3RyeXtmLnNlbmQoYy5kYXRhKX1jYXRjaChkKXtvPWQsZj1vLGEoXCJSZXNvdXJjZSBub3QgZm91bmRcIixmLGMpfXJldHVybiBmfSx0LmdldD1mdW5jdGlvbihuLGUscixpKXtyZXR1cm4gdC5hamF4KHt1cmw6bixkYXRhOmUsc3VjY2VzczpyLGRhdGFUeXBlOml9KX0sdC5wb3N0PWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiUE9TVFwiLHQsbixlLHIpfSx0LnB1dD1mdW5jdGlvbih0LG4sZSxyKXtyZXR1cm4gYyhcIlBVVFwiLHQsbixlLHIpfSx0W1wiZGVsZXRlXCJdPWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBjKFwiREVMRVRFXCIsdCxuLGUscil9LHQuanNvbj1mdW5jdGlvbihuLGUscil7cmV0dXJuIHQuYWpheCh7dXJsOm4sZGF0YTplLHN1Y2Nlc3M6cn0pfSx0LnNlcmlhbGl6ZT1mdW5jdGlvbih0LG4pe3ZhciBlLHI7bnVsbD09biYmKG49XCJcIikscj1uO2ZvcihlIGluIHQpdC5oYXNPd25Qcm9wZXJ0eShlKSYmKHIhPT1uJiYocis9XCImXCIpLHIrPWVuY29kZVVSSUNvbXBvbmVudChlKStcIj1cIitlbmNvZGVVUklDb21wb25lbnQodFtlXSkpO3JldHVybiByPT09bj9cIlwiOnJ9LHU9ZnVuY3Rpb24obil7dmFyIHIsaSx1LG87cmV0dXJuIG4uYXN5bmM/KGk9XCJqc29ucFwiKyArK2UsdT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLG89e2Fib3J0OmZ1bmN0aW9uKCl7cmV0dXJuIHQodSkucmVtb3ZlKCksaSBpbiB3aW5kb3c/d2luZG93W2ldPXt9OnZvaWQgMH19LHI9dm9pZCAwLHdpbmRvd1tpXT1mdW5jdGlvbihlKXtyZXR1cm4gY2xlYXJUaW1lb3V0KHIpLHQodSkucmVtb3ZlKCksZGVsZXRlIHdpbmRvd1tpXSxmKGUsbyxuKX0sdS5zcmM9bi51cmwucmVwbGFjZShSZWdFeHAoXCI9XFxcXD9cIiksXCI9XCIraSksdChcImhlYWRcIikuYXBwZW5kKHUpLG4udGltZW91dD4wJiYocj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIGgobyxuKX0sbi50aW1lb3V0KSksbyk6Y29uc29sZS5lcnJvcihcIlF1b0pTLmFqYXg6IFVuYWJsZSB0byBtYWtlIGpzb25wIHN5bmNocm9ub3VzIGNhbGwuXCIpfSxzPWZ1bmN0aW9uKHQsbil7dC5zdGF0dXM+PTIwMCYmdC5zdGF0dXM8MzAwfHwwPT09dC5zdGF0dXM/bi5hc3luYyYmZihvKHQsbiksdCxuKTphKFwiUXVvSlMuYWpheDogVW5zdWNjZXNmdWwgcmVxdWVzdFwiLHQsbil9LGY9ZnVuY3Rpb24odCxuLGUpe2Uuc3VjY2Vzcy5jYWxsKGUuY29udGV4dCx0LG4pfSxhPWZ1bmN0aW9uKHQsbixlKXtlLmVycm9yLmNhbGwoZS5jb250ZXh0LHQsbixlKX0sbD1mdW5jdGlvbih0LG4pe3ZhciBlO24uY29udGVudFR5cGUmJihuLmhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl09bi5jb250ZW50VHlwZSksbi5kYXRhVHlwZSYmKG4uaGVhZGVycy5BY2NlcHQ9cltuLmRhdGFUeXBlXSk7Zm9yKGUgaW4gbi5oZWFkZXJzKXQuc2V0UmVxdWVzdEhlYWRlcihlLG4uaGVhZGVyc1tlXSl9LGg9ZnVuY3Rpb24odCxuKXt0Lm9ucmVhZHlzdGF0ZWNoYW5nZT17fSx0LmFib3J0KCksYShcIlF1b0pTLmFqYXg6IFRpbWVvdXQgZXhjZWVkZWRcIix0LG4pfSxjPWZ1bmN0aW9uKG4sZSxyLGksdSl7cmV0dXJuIHQuYWpheCh7dHlwZTpuLHVybDplLGRhdGE6cixzdWNjZXNzOmksZGF0YVR5cGU6dSxjb250ZW50VHlwZTpcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwifSl9LGk9ZnVuY3Rpb24odCl7cmV0dXJuIFJlZ0V4cChcIj1cXFxcP1wiKS50ZXN0KHQpfSxvPWZ1bmN0aW9uKHQsZSl7dmFyIHIsaTtpZihpPXQsdC5yZXNwb25zZVRleHQpe2lmKGUuZGF0YVR5cGU9PT1uLk1JTUUpdHJ5e2k9SlNPTi5wYXJzZSh0LnJlc3BvbnNlVGV4dCl9Y2F0Y2godSl7cj11LGk9cixhKFwiUXVvSlMuYWpheDogUGFyc2UgRXJyb3JcIix0LGUpfVwieG1sXCI9PT1lLmRhdGFUeXBlJiYoaT10LnJlc3BvbnNlWE1MKX1yZXR1cm4gaX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscjtyZXR1cm4gbj1bXCItd2Via2l0LVwiLFwiLW1vei1cIixcIi1tcy1cIixcIi1vLVwiLFwiXCJdLHQuZm4uYWRkQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC5hZGQobykpO3JldHVybiB1fSl9LHQuZm4ucmVtb3ZlQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC5yZW1vdmUobykpO3JldHVybiB1fSl9LHQuZm4udG9nZ2xlQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBuLHIsaSx1LG87Zm9yKGk9ZSh0KSx1PVtdLG49MCxyPWkubGVuZ3RoO3I+bjtuKyspbz1pW25dLHUucHVzaCh0aGlzLmNsYXNzTGlzdC50b2dnbGUobykpO3JldHVybiB1fSl9LHQuZm4uaGFzQ2xhc3M9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJnRoaXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHQpfSx0LmZuLmxpc3RDbGFzcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmxlbmd0aD4wP3RoaXNbMF0uY2xhc3NMaXN0OnZvaWQgMH0sdC5mbi5zdHlsZT10LmZuLmNzcz1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBudWxsIT1uP3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnN0eWxlW3RdPW59KTooZT10aGlzWzBdLGUuc3R5bGVbdF18fHIoZSx0KSl9LHQuZm4udmVuZG9yPWZ1bmN0aW9uKHQsZSl7dmFyIHIsaSx1LG87Zm9yKG89W10scj0wLGk9bi5sZW5ndGg7aT5yO3IrKyl1PW5bcl0sby5wdXNoKHRoaXMuc3R5bGUoXCJcIit1K3QsZSkpO3JldHVybiBvfSxyPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUodCxcIlwiKVtuXX0sZT1mdW5jdGlvbih0KXtyZXR1cm4gQXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKSx0fX0odCksZnVuY3Rpb24odCl7cmV0dXJuIHQuZm4uYXR0cj1mdW5jdGlvbihuLGUpe3JldHVybiB0aGlzLmxlbmd0aD4wJiZcInN0cmluZ1wiPT09dC50b1R5cGUobik/bnVsbCE9ZT90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zZXRBdHRyaWJ1dGUobixlKX0pOnRoaXNbMF0uZ2V0QXR0cmlidXRlKG4pOnZvaWQgMH0sdC5mbi5yZW1vdmVBdHRyPWZ1bmN0aW9uKG4pe3JldHVybiB0aGlzLmxlbmd0aD4wJiZcInN0cmluZ1wiPT09dC50b1R5cGUobik/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucmVtb3ZlQXR0cmlidXRlKG4pfSk6dm9pZCAwfSx0LmZuLmRhdGE9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdGhpcy5hdHRyKFwiZGF0YS1cIit0LG4pfSx0LmZuLnJlbW92ZURhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMucmVtb3ZlQXR0cihcImRhdGEtXCIrdCl9LHQuZm4udmFsPWZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnZhbHVlPXQudG9TdHJpbmcoKX0pOnRoaXMubGVuZ3RoPjA/dGhpc1swXS52YWx1ZTpudWxsfSx0LmZuLnNob3c9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHlsZShcImRpc3BsYXlcIixcImJsb2NrXCIpfSx0LmZuLmhpZGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHlsZShcImRpc3BsYXlcIixcIm5vbmVcIil9LHQuZm4uZm9jdXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1swXS5mb2N1cygpfSx0LmZuLmJsdXI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1swXS5ibHVyKCl9LHQuZm4ub2Zmc2V0PWZ1bmN0aW9uKCl7dmFyIHQsbjtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmKHQ9dGhpc1swXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxuPXtsZWZ0OnQubGVmdCt3aW5kb3cucGFnZVhPZmZzZXQsdG9wOnQudG9wK3dpbmRvdy5wYWdlWU9mZnNldCx3aWR0aDp0LndpZHRoLGhlaWdodDp0LmhlaWdodH0pLG59fSh0KSxmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG87cmV0dXJuIHI9bnVsbCxuPS9XZWJLaXRcXC8oW1xcZC5dKykvLGU9e0FuZHJvaWQ6LyhBbmRyb2lkKVxccysoW1xcZC5dKykvLGlwYWQ6LyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvLGlwaG9uZTovKGlQaG9uZVxcc09TKVxccyhbXFxkX10rKS8sQmxhY2tiZXJyeTovKEJsYWNrQmVycnl8QkIxMHxQbGF5Ym9vaykuKlZlcnNpb25cXC8oW1xcZC5dKykvLEZpcmVmb3hPUzovKE1vemlsbGEpLipNb2JpbGVbXlxcL10qXFwvKFtcXGRcXC5dKikvLHdlYk9TOi8od2ViT1N8aHB3T1MpW1xcc1xcL10oW1xcZC5dKykvfSx0LmlzTW9iaWxlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW52aXJvbm1lbnQoKSxyLmlzTW9iaWxlfSx0LmVudmlyb25tZW50PWZ1bmN0aW9uKCl7dmFyIHQsbjtyZXR1cm4gcnx8KG49bmF2aWdhdG9yLnVzZXJBZ2VudCx0PXUobikscj17YnJvd3NlcjppKG4pLGlzTW9iaWxlOiEhdCxzY3JlZW46bygpLG9zOnR9KSxyfSxpPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPXQubWF0Y2gobiksZT9lWzBdOnR9LHU9ZnVuY3Rpb24odCl7dmFyIG4scixpO2ZvcihyIGluIGUpaWYoaT10Lm1hdGNoKGVbcl0pKXtuPXtuYW1lOlwiaXBob25lXCI9PT1yfHxcImlwYWRcIj09PXJ8fFwiaXBvZFwiPT09cj9cImlvc1wiOnIsdmVyc2lvbjppWzJdLnJlcGxhY2UoXCJfXCIsXCIuXCIpfTticmVha31yZXR1cm4gbn0sbz1mdW5jdGlvbigpe3JldHVybnt3aWR0aDp3aW5kb3cuaW5uZXJXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fX19KHQpLGZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaCxkO3JldHVybiBuPTEsaT17fSxyPXtwcmV2ZW50RGVmYXVsdDpcImlzRGVmYXVsdFByZXZlbnRlZFwiLHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjpcImlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsc3RvcFByb3BhZ2F0aW9uOlwiaXNQcm9wYWdhdGlvblN0b3BwZWRcIn0sZT17dG91Y2hzdGFydDpcIm1vdXNlZG93blwiLHRvdWNobW92ZTpcIm1vdXNlbW92ZVwiLHRvdWNoZW5kOlwibW91c2V1cFwiLHRvdWNoOlwiY2xpY2tcIixvcmllbnRhdGlvbmNoYW5nZTpcInJlc2l6ZVwifSx1PS9jb21wbGV0ZXxsb2FkZWR8aW50ZXJhY3RpdmUvLHQuZm4ub249ZnVuY3Rpb24obixlLHIpe3JldHVybiBudWxsPT1lfHxcImZ1bmN0aW9uXCI9PT10LnRvVHlwZShlKT90aGlzLmJpbmQobixlKTp0aGlzLmRlbGVnYXRlKGUsbixyKX0sdC5mbi5vZmY9ZnVuY3Rpb24obixlLHIpe3JldHVybiBudWxsPT1lfHxcImZ1bmN0aW9uXCI9PT10LnRvVHlwZShlKT90aGlzLnVuYmluZChuLGUpOnRoaXMudW5kZWxlZ2F0ZShlLG4scil9LHQuZm4ucmVhZHk9ZnVuY3Rpb24obil7cmV0dXJuIHUudGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKT9uLmNhbGwodGhpcyx0KTp0LmZuLmFkZEV2ZW50KGRvY3VtZW50LFwiRE9NQ29udGVudExvYWRlZFwiLGZ1bmN0aW9uKCl7cmV0dXJuIG4uY2FsbCh0aGlzLHQpfSl9LHQuZm4uYmluZD1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSx0LG4pfSl9LHQuZm4udW5iaW5kPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBkKHRoaXMsdCxuKX0pfSx0LmZuLmRlbGVnYXRlPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGksdSl7cmV0dXJuIGgodSxlLHIsbixmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24ocil7dmFyIGksYTtyZXR1cm4gYT10KHIudGFyZ2V0KS5jbG9zZXN0KG4sdSkuZ2V0KDApLGE/KGk9dC5leHRlbmQobyhyKSx7Y3VycmVudFRhcmdldDphLGxpdmVGaXJlZDp1fSksZS5hcHBseShhLFtpXS5jb25jYXQoW10uc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpKSk6dm9pZCAwfX0pfSl9LHQuZm4udW5kZWxlZ2F0ZT1mdW5jdGlvbih0LG4sZSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiBkKHRoaXMsbixlLHQpfSl9LHQuZm4udHJpZ2dlcj1mdW5jdGlvbihuLGUscil7cmV0dXJuXCJzdHJpbmdcIj09PXQudG9UeXBlKG4pJiYobj1sKG4sZSkpLG51bGwhPXImJihuLm9yaWdpbmFsRXZlbnQ9ciksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGlzcGF0Y2hFdmVudChuKX0pfSx0LmZuLmFkZEV2ZW50PWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyP3QuYWRkRXZlbnRMaXN0ZW5lcihuLGUsITEpOnQuYXR0YWNoRXZlbnQ/dC5hdHRhY2hFdmVudChcIm9uXCIrbixlKTp0W1wib25cIituXT1lfSx0LmZuLnJlbW92ZUV2ZW50PWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdC5yZW1vdmVFdmVudExpc3RlbmVyP3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihuLGUsITEpOnQuZGV0YWNoRXZlbnQ/dC5kZXRhY2hFdmVudChcIm9uXCIrbixlKTp0W1wib25cIituXT1udWxsfSxsPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIGU9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudHNcIiksZS5pbml0RXZlbnQodCwhMCwhMCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCksbiYmKGUudG91Y2g9biksZX0saD1mdW5jdGlvbihuLGUscix1LG8pe3ZhciBsLHMsaCxkO3JldHVybiBlPWMoZSksaD1mKG4pLHM9aVtoXXx8KGlbaF09W10pLGw9byYmbyhyLGUpLGQ9e2V2ZW50OmUsY2FsbGJhY2s6cixzZWxlY3Rvcjp1LHByb3h5OmEobCxyLG4pLGRlbGVnYXRlOmwsaW5kZXg6cy5sZW5ndGh9LHMucHVzaChkKSx0LmZuLmFkZEV2ZW50KG4sZC5ldmVudCxkLnByb3h5KX0sZD1mdW5jdGlvbihuLGUscix1KXt2YXIgbztyZXR1cm4gZT1jKGUpLG89ZihuKSxzKG8sZSxyLHUpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGRlbGV0ZSBpW29dW2UuaW5kZXhdLHQuZm4ucmVtb3ZlRXZlbnQobixlLmV2ZW50LGUucHJveHkpfSl9LGY9ZnVuY3Rpb24odCl7cmV0dXJuIHQuX2lkfHwodC5faWQ9bisrKX0sYz1mdW5jdGlvbihuKXt2YXIgcjtyZXR1cm4gcj0oXCJmdW5jdGlvblwiPT10eXBlb2YgdC5pc01vYmlsZT90LmlzTW9iaWxlKCk6dm9pZCAwKT9uOmVbbl0scnx8bn0sYT1mdW5jdGlvbih0LG4sZSl7dmFyIHI7cmV0dXJuIG49dHx8bixyPWZ1bmN0aW9uKHQpe3ZhciByO3JldHVybiByPW4uYXBwbHkoZSxbdF0uY29uY2F0KHQuZGF0YSkpLHI9PT0hMSYmdC5wcmV2ZW50RGVmYXVsdCgpLHJ9fSxzPWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybihpW3RdfHxbXSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiEoIXR8fG4mJnQuZXZlbnQhPT1ufHxlJiZ0LmNhbGxiYWNrIT09ZXx8ciYmdC5zZWxlY3RvciE9PXIpfSl9LG89ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC5leHRlbmQoe29yaWdpbmFsRXZlbnQ6bn0sbiksdC5lYWNoKHIsZnVuY3Rpb24odCxyKXtyZXR1cm4gZVt0XT1mdW5jdGlvbigpe3JldHVybiB0aGlzW3JdPWZ1bmN0aW9uKCl7cmV0dXJuITB9LG5bdF0uYXBwbHkobixhcmd1bWVudHMpfSxlW3JdPWZ1bmN0aW9uKCl7cmV0dXJuITF9fSksZX19KHQpLGZ1bmN0aW9uKHQpe3JldHVybiB0LmZuLnRleHQ9ZnVuY3Rpb24odCl7cmV0dXJuIG51bGwhPXQ/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGV4dENvbnRlbnQ9dH0pOnRoaXMubGVuZ3RoPjA/dGhpc1swXS50ZXh0Q29udGVudDpcIlwifSx0LmZuLmh0bWw9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIG51bGwhPW4/KGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuXCJzdHJpbmdcIj09PWU/dGhpcy5pbm5lckhUTUw9bjpcImFycmF5XCI9PT1lP24uZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHQobikuaHRtbChlKX19KHRoaXMpKTp0aGlzLmlubmVySFRNTCs9dChuKS5odG1sKCl9KSk6dGhpcy5sZW5ndGg+MD90aGlzWzBdLmlubmVySFRNTDpcIlwifSx0LmZuLnJlbW92ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gbnVsbCE9dGhpcy5wYXJlbnROb2RlP3RoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTp2b2lkIDB9KX0sdC5mbi5lbXB0eT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pbm5lckhUTUw9bnVsbH0pfSx0LmZuLmFwcGVuZD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm5cInN0cmluZ1wiPT09ZT90aGlzLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLG4pOlwiYXJyYXlcIj09PWU/bi5mb3JFYWNoKGZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdChuKS5hcHBlbmQoZSl9fSh0aGlzKSk6dGhpcy5hcHBlbmRDaGlsZChuKX0pfSx0LmZuLnByZXBlbmQ9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuXCJzdHJpbmdcIj09PWU/dGhpcy5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsbik6XCJhcnJheVwiPT09ZT9uLmVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuaW5zZXJ0QmVmb3JlKGUsdC5maXJzdENoaWxkKX19KHRoaXMpKTp0aGlzLmluc2VydEJlZm9yZShuLHRoaXMuZmlyc3RDaGlsZCl9KX0sdC5mbi5yZXBsYWNlV2l0aD1mdW5jdGlvbihuKXt2YXIgZTtyZXR1cm4gZT10LnRvVHlwZShuKSx0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYXJlbnROb2RlP1wic3RyaW5nXCI9PT1lP3RoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlQmVnaW5cIixuKTpcImFycmF5XCI9PT1lP24uZWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24obixlKXtyZXR1cm4gdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLHQpfX0odGhpcykpOnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobix0aGlzKTp2b2lkIDB9KSx0aGlzLnJlbW92ZSgpfX0odCksZnVuY3Rpb24obil7dmFyIGUscixpLHU7cmV0dXJuIGU9XCJwYXJlbnROb2RlXCIsbi5mbi5maW5kPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiByPTE9PT10aGlzLmxlbmd0aD90LnF1ZXJ5KHRoaXNbMF0sZSk6dGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdC5xdWVyeSh0aGlzLGUpfSksbihyKX0sbi5mbi5wYXJlbnQ9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49dD9pKHRoaXMpOnRoaXMuaW5zdGFuY2UoZSkscihuLHQpfSxuLmZuLmNoaWxkcmVuPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPXRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuY2hpbGRyZW4pfSkscihuLHQpfSxuLmZuLnNpYmxpbmdzPWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPXRoaXMubWFwKGZ1bmN0aW9uKHQsbil7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG4ucGFyZW50Tm9kZS5jaGlsZHJlbikuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0IT09bn0pfSkscihuLHQpfSxuLmZuLmdldD1mdW5jdGlvbih0KXtyZXR1cm4gdGhpc1t0XXx8bnVsbH0sbi5mbi5maXJzdD1mdW5jdGlvbigpe3JldHVybiBuKHRoaXNbMF0pfSxuLmZuLmxhc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbih0aGlzW3RoaXMubGVuZ3RoLTFdKX0sbi5mbi5jbG9zZXN0PWZ1bmN0aW9uKHQsZSl7dmFyIHIsaTtmb3IoaT10aGlzWzBdLHI9bih0KSxyLmxlbmd0aHx8KGk9bnVsbCk7aSYmci5pbmRleE9mKGkpPDA7KWk9aSE9PWUmJmkhPT1kb2N1bWVudCYmaS5wYXJlbnROb2RlO3JldHVybiBuKGkpfSxuLmZuLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdS5jYWxsKHRoaXMsXCJuZXh0U2libGluZ1wiKX0sbi5mbi5wcmV2PWZ1bmN0aW9uKCl7cmV0dXJuIHUuY2FsbCh0aGlzLFwicHJldmlvdXNTaWJsaW5nXCIpfSxuLmZuLmluc3RhbmNlPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiB0aGlzW3RdfSl9LG4uZm4ubWFwPWZ1bmN0aW9uKHQpe3JldHVybiBuLm1hcCh0aGlzLGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQuY2FsbChuLGUsbil9KX0saT1mdW5jdGlvbih0KXt2YXIgZTtmb3IoZT1bXTt0Lmxlbmd0aD4wOyl0PW4ubWFwKHQsZnVuY3Rpb24odCl7cmV0dXJuIHQ9dC5wYXJlbnROb2RlLHQhPT1kb2N1bWVudCYmZS5pbmRleE9mKHQpPDA/KGUucHVzaCh0KSx0KTp2b2lkIDB9KTtyZXR1cm4gZX0scj1mdW5jdGlvbih0LGUpe3JldHVybiBudWxsIT1lP24odCkuZmlsdGVyKGUpOm4odCl9LHU9ZnVuY3Rpb24odCl7dmFyIGU7Zm9yKGU9dGhpc1swXVt0XTtlJiYxIT09ZS5ub2RlVHlwZTspZT1lW3RdO3JldHVybiBuKGUpfX0odCksdC5HZXN0dXJlcz1mdW5jdGlvbih0KXt2YXIgZSxyLGksdSxvLGEsYyxsLHMsZixoLGQscCx2O3JldHVybiBkPSExLGw9e30sbz1udWxsLGY9bnVsbCxpPVtcImlucHV0XCIsXCJzZWxlY3RcIixcInRleHRhcmVhXCJdLHA9ZnVuY3Rpb24odCl7cmV0dXJuIGxbdC5uYW1lXT10LmhhbmRsZXIsZSh0LmV2ZW50cyl9LHY9ZnVuY3Rpb24obixlLHIpe3JldHVybiB0KG4pLnRyaWdnZXIoZSxyLGYpfSxoPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBlPSh0LnNyY0VsZW1lbnR8fHQudGFyZ2V0KS50YWdOYW1lLnRvTG93ZXJDYXNlKCksbi5jYWxsKGksZSk+PTA/dC5zdG9wUHJvcGFnYXRpb24oKTooZD0hMCxmPXR8fGV2ZW50LG89YSh0KSxjKFwic3RhcnRcIix0LnRhcmdldCxvKSl9LHM9ZnVuY3Rpb24odCl7cmV0dXJuIGQ/KGY9dHx8ZXZlbnQsbz1hKHQpLG8ubGVuZ3RoPjEmJmYucHJldmVudERlZmF1bHQoKSxjKFwibW92ZVwiLHQudGFyZ2V0LG8pKTp2b2lkIDB9LHU9ZnVuY3Rpb24odCl7cmV0dXJuIGQ/KGY9dHx8ZXZlbnQsYyhcImVuZFwiLHQudGFyZ2V0LG8pLGQ9ITEpOnZvaWQgMH0scj1mdW5jdGlvbih0KXtyZXR1cm4gZD0hMSxjKFwiY2FuY2VsXCIpfSxlPWZ1bmN0aW9uKG4pe3JldHVybiBuLmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIHQuZm5bbl09ZnVuY3Rpb24oZSl7cmV0dXJuIHQoZG9jdW1lbnQuYm9keSkuZGVsZWdhdGUodGhpcy5zZWxlY3RvcixuLGUpfX0pLHRoaXN9LGM9ZnVuY3Rpb24odCxuLGUpe3ZhciByLGksdTt1PVtdO2ZvcihpIGluIGwpcj1sW2ldLHJbdF0mJnUucHVzaChyW3RdLmNhbGwocixuLGUpKTtyZXR1cm4gdX0sYT1mdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1O2ZvcihyPXQudG91Y2hlc3x8W3RdLGk9W10sbj0wLGU9ci5sZW5ndGg7ZT5uO24rKyl1PXJbbl0saS5wdXNoKHt4OnUucGFnZVgseTp1LnBhZ2VZfSk7cmV0dXJuIGl9LHQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7dmFyIG47cmV0dXJuIG49dChkb2N1bWVudC5ib2R5KSxuLmJpbmQoXCJ0b3VjaHN0YXJ0XCIsaCksbi5iaW5kKFwidG91Y2htb3ZlXCIscyksbi5iaW5kKFwidG91Y2hlbmRcIix1KSxuLmJpbmQoXCJ0b3VjaGNhbmNlbFwiLHIpfSkse2FkZDpwLHRyaWdnZXI6dn19KHQpLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwiYmFzaWNcIixldmVudHM6W1widG91Y2hcIixcImhvbGRcIixcImRvdWJsZVRhcFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaDtyZXR1cm4gZT0xNSxuPXtUQVA6MjAwLERPVUJMRV9UQVA6NDAwLEhPTEQ6NDAwfSxpPW51bGwsYz0hMCxhPW51bGwsbz1udWxsLHU9bnVsbCxoPWZ1bmN0aW9uKGUscil7cmV0dXJuIDE9PT1yLmxlbmd0aD8obz17dGltZTpuZXcgRGF0ZSx4OnJbMF0ueCx5OnJbMF0ueX0sYT1lLGk9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiB0LnRyaWdnZXIoZSxcImhvbGRcIixyWzBdKX0sbi5IT0xEKSk6bCgpfSxmPWZ1bmN0aW9uKHQsbil7dmFyIGk7cmV0dXJuIG51bGwhPT1vJiYoaT1yKG8sblswXSksaS54PmV8fGkueT5lfHxuLmxlbmd0aD4xKT9sKCk6dm9pZCAwfSxzPWZ1bmN0aW9uKGUsYSl7dmFyIGMscztpZihvKXJldHVybiBjPXIobyxhWzBdKSwwIT09Yy54fHwwIT09Yy55P2woKTooY2xlYXJUaW1lb3V0KGkpLHM9bmV3IERhdGUscy1vLnRpbWU8bi5UQVA/cy11PG4uRE9VQkxFX1RBUD8odC50cmlnZ2VyKGUsXCJkb3VibGVUYXBcIixhWzBdKSx1PW51bGwpOih1PXMsdC50cmlnZ2VyKGUsXCJ0b3VjaFwiLGFbMF0pKTp2b2lkIDApfSxsPWZ1bmN0aW9uKCl7cmV0dXJuIG89bnVsbCxjPSExLGNsZWFyVGltZW91dChpKX0scj1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPXt4Om4ueC10LngseTpuLnktdC55fX0se3N0YXJ0OmgsbW92ZTpmLGVuZDpzLGNhbmNlbDpsfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcImRyYWdcIixldmVudHM6W1wiZHJhZ1wiLFwiZHJhZ2dpbmdcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGg7cmV0dXJuIG49d2luZG93LmRldmljZVBpeGVsUmF0aW8+PTI/MTU6MjAsYz1udWxsLG89bnVsbCxhPW51bGwsdT1udWxsLGg9ZnVuY3Rpb24odCxuKXtyZXR1cm4gbi5sZW5ndGg+PTI/KGM9dCxvPW4ubGVuZ3RoLGE9ZShuKSk6dm9pZCAwfSxmPWZ1bmN0aW9uKHQsbil7dmFyIGU7cmV0dXJuIG4ubGVuZ3RoPT09bz8oZT1yKG4pLHU9e3RvdWNoZXM6bixkZWx0YTplfSxpKCEwKSk6dm9pZCAwfSxsPXM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYSYmdT8oaSghMSksbz1udWxsLGE9bnVsbCx1PW51bGwpOnZvaWQgMH0scj1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj1lKHQpLHt4Om4ueC1hLngseTpuLnktYS55fX0sZT1mdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1O2ZvcihpPTAsdT0wLG49MCxlPXQubGVuZ3RoO2U+bjtuKyspcj10W25dLGkrPXBhcnNlSW50KHIueCksdSs9cGFyc2VJbnQoci55KTtyZXR1cm57eDppL3QubGVuZ3RoLHk6dS90Lmxlbmd0aH19LGk9ZnVuY3Rpb24oZSl7cmV0dXJuIGU/dC50cmlnZ2VyKGMsXCJkcmFnZ2luZ1wiLHUpOk1hdGguYWJzKHUuZGVsdGEueCk+bnx8TWF0aC5hYnModS5kZWx0YS55KT5uP3QudHJpZ2dlcihjLFwiZHJhZ1wiLHUpOnZvaWQgMH0se3N0YXJ0OmgsbW92ZTpmLGVuZDpzfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInBpbmNoXCIsZXZlbnRzOltcInBpbmNoXCIsXCJwaW5jaGluZ1wiLFwicGluY2hJblwiLFwicGluY2hPdXRcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscztyZXR1cm4gbj13aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbz49Mj8xNToyMCxvPW51bGwsdT1udWxsLGk9bnVsbCxzPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDI9PT1uLmxlbmd0aD8obz10LHU9cihuWzBdLG5bMV0pKTp2b2lkIDB9LGw9ZnVuY3Rpb24odCxuKXt2YXIgbztyZXR1cm4gdSYmMj09PW4ubGVuZ3RoPyhvPXIoblswXSxuWzFdKSxpPXt0b3VjaGVzOm4sZGVsdGE6by11fSxlKCEwKSk6dm9pZCAwfSxhPWM9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdSYmaT8oZSghMSksdT1udWxsLGk9bnVsbCk6dm9pZCAwfSxyPWZ1bmN0aW9uKHQsbil7cmV0dXJuIE1hdGguc3FydCgobi54LXQueCkqKG4ueC10LngpKyhuLnktdC55KSoobi55LXQueSkpfSxlPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiBlP3QudHJpZ2dlcihvLFwicGluY2hpbmdcIixpKTpNYXRoLmFicyhpLmRlbHRhKT5uPyh0LnRyaWdnZXIobyxcInBpbmNoXCIsaSkscj1pLmRlbHRhPjA/XCJwaW5jaE91dFwiOlwicGluY2hJblwiLHQudHJpZ2dlcihvLHIsaSkpOnZvaWQgMH0se3N0YXJ0OnMsbW92ZTpsLGVuZDpjfX0odC5HZXN0dXJlcyl9KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcInJvdGF0aW9uXCIsZXZlbnRzOltcInJvdGF0ZVwiLFwicm90YXRpbmdcIixcInJvdGF0ZUxlZnRcIixcInJvdGF0ZVJpZ2h0XCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoLGQ7cmV0dXJuIG49NSxlPTIwLGw9bnVsbCx1PTAsYz1udWxsLGk9bnVsbCxkPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDI9PT1uLmxlbmd0aD8obD10LHU9MCxjPW8oblswXSxuWzFdKSk6dm9pZCAwfSxoPWZ1bmN0aW9uKHQsbil7dmFyIGw7cmV0dXJuIGMmJjI9PT1uLmxlbmd0aD8obD1vKG5bMF0sblsxXSktYyxpJiZNYXRoLmFicyhpLmRlbHRhLWwpPmUmJihsKz0zNjAqYShpLmRlbHRhKSksTWF0aC5hYnMobCk+MzYwJiYodSsrLGwtPTM2MCphKGkuZGVsdGEpKSxpPXt0b3VjaGVzOm4sZGVsdGE6bCxyb3RhdGlvbnNDb3VudDp1fSxyKCEwKSk6dm9pZCAwfSxzPWY9ZnVuY3Rpb24odCxuKXtyZXR1cm4gYyYmaT8ocighMSksbD1udWxsLHU9MCxjPW51bGwsaT1udWxsLGM9bnVsbCk6dm9pZCAwfSxhPWZ1bmN0aW9uKHQpe3JldHVybiAwPnQ/LTE6MX0sbz1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPU1hdGguYXRhbjIodC55LW4ueSx0Lngtbi54KSwxODAqKDA+ZT9lKzIqTWF0aC5QSTplKS9NYXRoLlBJfSxyPWZ1bmN0aW9uKGUpe3ZhciByO3JldHVybiBlP3QudHJpZ2dlcihsLFwicm90YXRpbmdcIixpKTpNYXRoLmFicyhpLmRlbHRhKT5uPyh0LnRyaWdnZXIobCxcInJvdGF0ZVwiLGkpLHI9aS5kZWx0YT4wP1wicm90YXRlUmlnaHRcIjpcInJvdGF0ZUxlZnRcIix0LnRyaWdnZXIobCxyLGkpKTp2b2lkIDB9LHtzdGFydDpkLG1vdmU6aCxlbmQ6Zn19KHQuR2VzdHVyZXMpfSksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJzd2lwZVwiLGV2ZW50czpbXCJzd2lwZVwiLFwic3dpcGVMZWZ0XCIsXCJzd2lwZVJpZ2h0XCIsXCJzd2lwZVVwXCIsXCJzd2lwZURvd25cIixcInN3aXBpbmdcIixcInN3aXBpbmdIb3Jpem9udGFsXCIsXCJzd2lwaW5nVmVydGljYWxcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmO3JldHVybiBuPU1hdGgucm91bmQoMjAvd2luZG93LmRldmljZVBpeGVsUmF0aW8pLGE9bnVsbCx1PW51bGwsbz1udWxsLGk9bnVsbCxmPWZ1bmN0aW9uKHQsbil7cmV0dXJuIDE9PT1uLmxlbmd0aD8oYT10LHU9blswXSxpPW51bGwpOnZvaWQgMH0scz1mdW5jdGlvbih0LG4pe3ZhciByLG87cmV0dXJuIDE9PT1uLmxlbmd0aD8ocj17eDpuWzBdLngtdS54LHk6blswXS55LXUueX0sbz1udWxsPT09aSxpPXt4Om5bMF0ueCx5Om5bMF0ueSxkZWx0YTpyfSxlKCEwLG8pKTppPW51bGx9LGM9bD1mdW5jdGlvbih0LG4pe3ZhciByO3JldHVybiBudWxsPT1pJiZuLmxlbmd0aD49MSYmKHI9e3g6blswXS54LXUueCx5Om5bMF0ueS11Lnl9LGk9e3g6blswXS54LHk6blswXS55LGRlbHRhOnJ9KSxpPyhlKCExKSxpPW51bGwpOnZvaWQgMH0sZT1mdW5jdGlvbihlLHUpe3ZhciBjLGwscyxmLGg7aWYobnVsbD09dSYmKHU9ITEpLGUpcmV0dXJuIHUmJihvPXIoaS5kZWx0YS54LGkuZGVsdGEueSkpLG51bGwhPT1vJiZ0LnRyaWdnZXIoYSxcInN3aXBpbmdcIitvLGkpLHQudHJpZ2dlcihhLFwic3dpcGluZ1wiLGkpO2lmKGw9W10sTWF0aC5hYnMoaS5kZWx0YS55KT5uP2wucHVzaChpLmRlbHRhLnk8MD9cIlVwXCI6XCJEb3duXCIpOk1hdGguYWJzKGkuZGVsdGEueCk+biYmbC5wdXNoKGkuZGVsdGEueDwwP1wiTGVmdFwiOlwiUmlnaHRcIiksbC5sZW5ndGgpe2Zvcih0LnRyaWdnZXIoYSxcInN3aXBlXCIsaSksaD1bXSxzPTAsZj1sLmxlbmd0aDtmPnM7cysrKWM9bFtzXSxoLnB1c2godC50cmlnZ2VyKGEsXCJzd2lwZVwiK2MsaSkpO3JldHVybiBofX0scj1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPW51bGwsTWF0aC5yb3VuZChNYXRoLmFicyh0L24pKT49Mj9lPVwiSG9yaXpvbnRhbFwiOk1hdGgucm91bmQoTWF0aC5hYnMobi90KSk+PTImJihlPVwiVmVydGljYWxcIiksZX0se3N0YXJ0OmYsbW92ZTpzLGVuZDpsfX0odC5HZXN0dXJlcyl9KX0pLmNhbGwodGhpcyk7XG4iLCIvLyBTYW1zb24uUGFnZSBjb25zdHJ1Y3RvciBmdW5jdGlvblxuLy8gVXNlZCB0byBzaW1wbGlmeSBwYWdlIHJlbmRlcmluZyBhbmQgdHJhbnNpdGlvbnMgaW4gc2luZ2xlIHBhZ2UgYXBwc1xuXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIFNoYXJlZCA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgJCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9xdW8uanMnKTtcbnZhciBqc3MgPSByZXF1aXJlKCdqc3MnKTtcblxuLyogb3B0aW9ucyBjYW4gaW5jbHVkZTpcbi8vIHBhdGggLSB0aGUgcm91dGVyIHBhdGggb2YgdGhlIHBhZ2Vcbi8vIHN1YlBhZ2VPZiAtIGFuIG9wdGlvbmFsIHBhcmVudCBwYWdlIHRoYXQgaXMgdGhlIHN0YXJ0IG9mIGEgc3BlY2lmaWMgY2F0ZWdvcnkgLSBleDogVXNlciBCaW8gUGFnZSBpcyBzdWJQYWdlT2Ygb2YgUHJvZmlsZSBQYWdlXG4vLyBwcmV2aW91c1BhZ2UgLSBhbiBvcHRpb25hbCBwcmV2aW91cyBwYWdlIHRvIG1ha2UgZ29pbmcgYmFjayBlYXNpZXJcbi8vIGJhY2tTYWZlIC0gZmFsc2UgYnkgZGVmYXVsdC4gc2V0IHRvIHRydWUgaWYgaXQgaXMgc2FmZSB0byBnbyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIGFueSBvdGhlciBwYWdlIGluIHRoZSBhcHBcbi8vIHRlbXBsYXRlL3JlbmRlciAtIHRoZSBmdW5jdGlvbiB0aGF0IG91dHB1dHMgYW4gSFRNTCBzdHJpbmcgdGhhdCBnZXRzIGF0dGFjaGVkIHRvIHRoZSBET01cbi8vIHN0eWxlIC0gSlNTIHN0eWxlIG9iamVjdFxuLy8gY29tcG9uZW50cyAtIGFueSBvdGhlciBjb21wb25lbnRzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZC9yZWZyZXNoZWQgd2l0aCB0aGUgcGFnZVxuLy8gZXZlbnRzIC0gYW55IGV2ZW50cyB0byBhdHRhY2ggdG8gdGhlIHBhZ2Vcbi8vIGJlZm9yZVJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGJlZm9yZSB0aGUgcGFnZSBpcyByZW5kZXJlZCAodXBkYXRlIG1vZGVscywgc29ydCBjb2xsZWN0aW9ucylcbi8vIGFmdGVyUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYWZ0ZXIgdGhlIHBhZ2UgaXMgcmVuZGVyZWQgKHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLCBtYXJrZWQgY2hlY2tib3hlcyBhcyBjaGVja2VkKVxuLy8gYmVmb3JlUmVtb3ZlIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBwYWdlIGlzIGZ1bGx5IGRlc3Ryb3llZCAoY2xlYW51cCBtb2RlbHMsIHVwZGF0ZSBhY3Rpdml0eSBoaXN0b3J5KVxuLy8gY3VzdG9tL2V4dGVuZCAtIGFuIG9iamVjdCBjb250YWluaW5nIGN1c3RvbSBtZXRob2RzL3Byb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBQYWdlIGluc3RhbmNlIGlmIHRoZXJlIGFyZSBubyBuYW1pbmcgY29uZmxpY3RzIHdpdGggcmVzZXJ2ZWQgcHJvcGVydGllc1xuKi9cblxuZnVuY3Rpb24gU2Ftc29uUGFnZShvcHRpb25zKSB7XG5cbiAgLy8gc2V0IHRoZSBwYXRoIG9mIHRoZSBwYWdlXG4gIHRoaXMucGF0aCA9IG9wdGlvbnMucGF0aDtcblxuICAvLyBqc3Mgc3R5bGVTaGVldFxuICBpZiAodHlwZW9mIG9wdGlvbnMuc3R5bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQob3B0aW9ucy5zdHlsZSwge25hbWVkOiBmYWxzZX0pO1xuICB9XG5cbiAgLy8gc3ViUGFnZU9mIGlzIGZhbHNlIGlmIGl0IGlzIGEgdG9wLWxldmVsIHBhZ2UsIG90aGVyd2lzZSBpdCBpcyB0aGUgbmFtZSBvZiB0aGUgdG9wLWxldmVsIHBhZ2UgaXQgaXMgbGlua2VkIHRvXG4gIHRoaXMuc3ViUGFnZU9mID0gb3B0aW9ucy5zdWJQYWdlT2YgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBwcmV2aW91c1BhZ2UgaWYgaXQgaXMgc3BlY2lmaWVkXG4gIHRoaXMucHJldmlvdXNQYWdlID0gb3B0aW9ucy5wcmV2aW91c1BhZ2UgfHwgZmFsc2U7XG5cbiAgLy8gc2V0IHRoZSBiYWNrQW5pbWF0aW9uIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tBbmltYXRpb24gPSBvcHRpb25zLmJhY2tBbmltYXRpb24gfHwgZmFsc2U7XG5cbiAgLy8gc2V0IGJhY2tTYWZlIGlmIGl0IGlzIHNwZWNpZmllZFxuICB0aGlzLmJhY2tTYWZlID0gb3B0aW9ucy5iYWNrU2FmZSB8fCBmYWxzZTtcblxuICAvLyBzZXQgdGhlIHBhZ2UgZXZlbnRzIGlmIHRoZXkgYXJlIHNwZWNpZmllZFxuICB0aGlzLmRvbUV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzID8gb3B0aW9ucy5ldmVudHMgOiAob3B0aW9ucy5kb21FdmVudHMgfHwge30pO1xuICB0aGlzLmFwcEV2ZW50cyA9IG9wdGlvbnMuYXBwRXZlbnRzIHx8IHt9O1xuXG4gIC8vIHNldHVwIHRoZSBwYWdlJ3MgY29tcG9uZW50c1xuICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG4gIHRoaXMuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcblxuICAvLyBzZXRJbml0aWFsU3RhdGUgZnVuY3Rpb25cbiAgdGhpcy5zZXRJbml0aWFsU3RhdGUgPSBvcHRpb25zLnNldEluaXRpYWxTdGF0ZSB8fCBTaGFyZWQuanVzdFJldHVybk9iamVjdDtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xuICB0aGlzLl9pbml0aWFsU3RhdGVTZXQgPSBmYWxzZTtcbiAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gc2V0IHRoZSBwYWdlJ3MgcmVuZGVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvdXRwdXQgYW4gaHRtbCBzdHJpbmdcbiAgLy8gaWYgbm8gcmVuZGVyIGZ1bmN0aW9uIHdhcyBwYXNzZWQgaW4sIHdlIGNoZWNrIGZvciBhIHRlbXBsYXRlIGZ1bmN0aW9uXG4gIHRoaXMuX3RlbXBsYXRlID0gb3B0aW9ucy5yZW5kZXIgfHwgb3B0aW9ucy50ZW1wbGF0ZTtcbiAgaWYgKCF0aGlzLl90ZW1wbGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwiWW91ciBwYWdlIFwiICsgdGhpcy5wYXRoICsgXCIgbXVzdCBoYXZlIGEgcmVuZGVyIG9yIHRlbXBsYXRlIGZ1bmN0aW9uIHRoYXQgb3V0cHV0cyBhbiBIVE1MIHN0cmluZ1wiKTtcblxuICAvLyBzZXQgdGhlIGJlZm9yZVJlbmRlciBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmVmb3JlUmVuZGVyID0gb3B0aW9ucy5iZWZvcmVSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIGFmdGVyUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5hZnRlclJlbmRlciA9IG9wdGlvbnMuYWZ0ZXJSZW5kZXIgfHwgU2hhcmVkLmp1c3RDYWxsYmFjaztcblxuICAvLyBzZXQgdGhlIHJlbW92ZS9jbG9zZSBmdW5jdGlvbiBpZiBvbmUgaXMgc3BlY2lmaWVkLCBvdGhlcndpc2UganVzdCBpbnZva2UgY2FsbGJhY2tcbiAgdGhpcy5iZWZvcmVSZW1vdmUgPSBvcHRpb25zLmJlZm9yZVJlbW92ZSB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIGFkZCBhbnkgcm91dGVyLXJlbGF0ZWQgdGFza3NcbiAgdGhpcy5fdXVpZCA9IHRoaXMucGF0aCArIFwiLVwiICsgRGF0ZS5ub3coKTsgLy8gdGhlIHV1aWQgYWxsb3dzIHVzIHRvIGVhc2lseSByZWZlcmVuY2UgdGhlIGFkZGVkIHJvdXRlciB0YXNrc1xuICB0aGlzLl9yb3V0ZXIgPSBvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fTtcbiAgU2hhcmVkLmFkZFJvdXRlclRhc2tzKHRoaXMpO1xuXG4gIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20gb3IgZXh0ZW5kIG9iamVjdFxuICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBjdXN0b20sIFNoYXJlZC5yZXNlcnZlZCk7XG5cbn1cblxuLy8gSGF2ZSB0aGUgU2Ftc29uUGFnZSBjbGFzcyBpbmhlcml0IGFueSBzaGFyZWQgbWV0aG9kc1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3R5cGUgPSBcIlBhZ2VcIjtcblNhbXNvblBhZ2UucHJvdG90eXBlLnNldFN0YXRlID0gU2hhcmVkLnNldFN0YXRlO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUucmVzZXRTdGF0ZSA9IFNoYXJlZC5yZXNldFN0YXRlO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2RvRmlyc3QgPSBTaGFyZWQuX2RvRmlyc3Q7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fbG9hZEV2ZW50cyA9IFNoYXJlZC5fbG9hZEV2ZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9kZXN0cm95RXZlbnRzID0gU2hhcmVkLl9kZXN0cm95RXZlbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2xvYWRDb21wb25lbnRzID0gU2hhcmVkLl9sb2FkQ29tcG9uZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9yZW5kZXJDb21wb25lbnRzID0gU2hhcmVkLl9yZW5kZXJDb21wb25lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2Rlc3Ryb3lDb21wb25lbnRzID0gU2hhcmVkLl9kZXN0cm95Q29tcG9uZW50cztcblNhbXNvblBhZ2UucHJvdG90eXBlLl9maXhBdXRvRm9jdXNFbGVtZW50cyA9IFNoYXJlZC5fZml4QXV0b0ZvY3VzRWxlbWVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fcmVtb3ZlID0gU2hhcmVkLl9yZW1vdmU7XG5cbi8vIHJlbmRlciB0aGUgcGFnZSB0byB0aGUgRE9NXG5TYW1zb25QYWdlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBwYWdlX2NvbnRhaW5lciwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5fbG9hZENvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgIHNlbGYuX2RvRmlyc3QoXCJiZWZvcmVSZW5kZXJcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgaW5pdGlhbCBzdGF0ZSBvYmplY3Qgb2YgdGhlIHBhZ2UgdGhhdCBpcyBwYXNzZWQgaW50byB0aGUgcmVuZGVyIGNhbGxcbiAgICAgIGlmICghc2VsZi5faW5pdGlhbFN0YXRlU2V0KSB7XG4gICAgICAgIHNlbGYuc3RhdGUgPSBzZWxmLnNldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICBzZWxmLl9pbml0aWFsU3RhdGVTZXQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChzZWxmLnN0eWxlKSBzZWxmLnN0eWxlLmF0dGFjaCgpOyAvLyBsb2FkIHRoZSBzdHlsZXNoZWV0IG9uIGZpcnN0IHJlbmRlclxuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdGhlIHBhZ2UgZWxlbWVudFxuICAgICAgaWYgKCFzZWxmLmVsZW1lbnQpIHtcbiAgICAgICAgc2VsZi5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2VsZi5lbGVtZW50LmlkID0gc2VsZi5wYXRoICsgXCItcGFnZVwiO1xuICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICAgIHBhZ2VfY29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZWxlbWVudCk7XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIHBhZ2UgYXMgYW4gZXZlbnQgZGVsZWdhdG9yIGZvciBhbGwgaXRzIHN1YmNvbXBvbmVudHNcbiAgICAgICAgc2VsZi5kZWxlZ2F0ZSA9ICQoc2VsZi5lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHdoZXRoZXIgb3Igbm90IHdlIHdpbGwgZm9yY2Ugc3ViY29tcG9uZW50cyB0byB1cGRhdGVcbiAgICAgIGlmIChmb3JjZV91cGRhdGUgfHwgc2VsZi5fc3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgIGZvcmNlX3VwZGF0ZSA9IHRydWU7XG4gICAgICAgIHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSBzZWxmLl90ZW1wbGF0ZShzZWxmLnN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fbG9hZEV2ZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgICBzZWxmLl9yZW5kZXJDb21wb25lbnRzKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAvLyByZXNldCBzdGF0ZUNoYW5nZWRcbiAgICAgICAgICBzZWxmLl9zdGF0ZUNoYW5nZWQgPSBmYWxzZTtcblxuICAgICAgICAgIHNlbGYuX2ZpeEF1dG9Gb2N1c0VsZW1lbnRzKCk7XG5cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJSZW5kZXJcIiwgZnVuY3Rpb24oKSB7IGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTsgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uUGFnZTtcbiIsIlxudmFyIGFuaW1hdGlvbkFtb3VudCA9IFwiMTAwJVwiO1xudmFyIGFuaW1hdGlvbkR1cmF0aW9uID0gXCIwLjRzXCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIG5hbWVzOiB7XG5cbiAgICBcInRvcFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tYm90dG9tXCIsIG5leHQ6IFwibW92ZS1mcm9tLXRvcFwiIH0sXG4gICAgXCJib3R0b21cIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXRvcFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1ib3R0b21cIiB9LFxuICAgIFwibGVmdFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tcmlnaHRcIiwgbmV4dDogXCJtb3ZlLWZyb20tbGVmdFwiIH0sXG4gICAgXCJyaWdodFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tbGVmdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodFwiIH0sXG4gICAgXCJzY2FsZVwiIDogeyBjdXJyZW50OiBcInNjYWxlLW91dFwiLCBuZXh0OiBcInNjYWxlLWluXCIgfSxcbiAgICBcImZhZGVcIiA6IHsgY3VycmVudDogXCJmYWRlLW91dFwiLCBuZXh0OiBcImZhZGUtaW5cIiB9XG5cbiAgfSxcblxuICBzdHlsZXM6IHtcblxuICAgIFwiLm1vdmUtdG8tdG9wXCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9Ub3BcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLWZyb20tdG9wXCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbVRvcFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluXCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS10by1ib3R0b21cIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVUb0JvdHRvbVwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluXCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS1mcm9tLWJvdHRvbVwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21Cb3R0b21cIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pblwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtdG8tbGVmdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZVRvTGVmdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1sZWZ0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbUxlZnRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLXRvLXJpZ2h0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9SaWdodFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1yaWdodFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21SaWdodFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLnNjYWxlLW91dFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwic2NhbGVPdXRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pbi1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5zY2FsZS1pblwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwic2NhbGVJblwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluLW91dFwiXG4gICAgfSxcblxuICAgIFwiLmZhZGUtb3V0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJmYWRlT3V0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9LFxuXG4gICAgXCIuZmFkZS1pblwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwiZmFkZUluXCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1RvcFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWSgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21Ub3BcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWSgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvQm90dG9tXCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVZKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tQm90dG9tXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVkoXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvTGVmdFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21MZWZ0XCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1JpZ2h0XCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tUmlnaHRcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBzY2FsZU91dFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInNjYWxlKC4xKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBzY2FsZUluXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJzY2FsZSguMSlcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgZmFkZU91dFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBmYWRlSW5cIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufTtcbiIsIi8vIFNhbXNvbi5Sb3V0ZXIgY29uc3RydWN0b3IgZnVuY3Rpb25cbi8vIFVzZWQgdG8gaGFuZGxlIHBhZ2UgaGlzdG9yeSBhbmQgdHJhbnNpdGlvbnNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4uL2luZGV4Jyk7XG52YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGpzcyA9IHJlcXVpcmUoXCJqc3NcIik7XG5cbnZhciBiYXNlX3JvdXRlcl9hbmltYXRpb25zID0gcmVxdWlyZSgnLi9iYXNlX3JvdXRlcl9hbmltYXRpb25zJyk7XG5cbmZ1bmN0aW9uIFNhbXNvblJvdXRlcihvcHRpb25zKSB7XG5cbiAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQgPSBcInNhbXNvbl9wYWdlXzJcIjtcblxuICAvLyBvdXIgcGFnZSBjYWNoZSB3aWxsIHN0b3JlIHRoZSBpbml0aWFsaXplZCBwYWdlc1xuICB0aGlzLnBhZ2VDYWNoZSA9IHt9O1xuXG4gIC8vIGNyZWF0ZSB0aGUgYXBwIHJvdXRlciBoaXN0b3J5XG4gIHRoaXMuaGlzdG9yeSA9IFtdO1xuXG4gIC8vIGEgcXVldWUgb2YgYW55IHJvdXRlciBldmVudHMgdGhhdCBoYXZlbid0IGJlZW4gaGFuZGxlZCB5ZXRcbiAgdGhpcy5xdWV1ZSA9IFtdO1xuXG4gIC8vIHNldCB0aGUgYXBwJ3MgYW5pbWF0aW9uc1xuICB0aGlzLmFuaW1hdGlvbnMgPSBiYXNlX3JvdXRlcl9hbmltYXRpb25zLm5hbWVzO1xuICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQoYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucy5zdHlsZXMsIHtuYW1lZDogZmFsc2V9KTtcblxuICB2YXIgY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zID0gb3B0aW9ucy5hbmltYXRpb25zIHx8IHt9O1xuXG4gIGlmIChjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMubmFtZXMgJiYgY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLnN0eWxlcykge1xuICAgIHRoaXMuc3R5bGUuYWRkUnVsZXMoY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLnN0eWxlcyk7XG5cbiAgICB2YXIga2V5O1xuICAgIGZvciAoa2V5IGluIGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9ucy5uYW1lcykge1xuICAgICAgdGhpcy5hbmltYXRpb25zW2tleV0gPSBjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMubmFtZXNba2V5XTtcbiAgICB9XG4gIH1cbiAgdGhpcy5zdHlsZS5hdHRhY2goKTsgLy8gYXR0YWNoIHRoZSBhbmltYXRpb25zIHRvIHRoZSBydW5uaW5nIGFwcFxuXG4gIHRoaXMuY3VycmVudFBhZ2UgPSBmYWxzZTsgLy8gdGhlIG5hbWUgb2YgdGhlIHBhZ2Ugd2UgYXJlIGN1cnJlbnRseSBvblxuXG4gIHRoaXMucHJldmlvdXNQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwcmV2aW91cyBwYWdlIHdlIHdlcmUgb25cblxuICB0aGlzLm5leHRQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwYWdlIHdlIGFyZSB0cmFuc2l0aW9uaW5nIHRvXG5cbiAgdGhpcy5jdXJyZW50QW5pbWF0aW9uID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50bHkgcnVubmluZyBhbmltYXRpb25cblxuICB0aGlzLmlzQnVzeSA9IGZhbHNlOyAvLyBzZXQgdG8gdHJ1ZSB3aGVuZXZlciB0aGUgcm91dGVyIGlzIHN0aWxsIGhhbmRsaW5nIGFuIGV2ZW50XG5cbiAgdGhpcy5wYWdlc0FuaW1hdGluZyA9IGZhbHNlOyAvLyBzZXQgdG8gdHJ1ZSBpZiBhIG5ldyBwYWdlIGlzIGJlaW5nIGxvYWRlZFxuXG4gIC8vIHNldCB0aGUgZGVmYXVsdCBuYXZpZ2F0ZSBhbmltYXRpb25cbiAgdGhpcy5uYXZpZ2F0ZUFuaW1hdGlvbiA9IG9wdGlvbnMuZGVmYXVsdE5hdmlnYXRlQW5pbWF0aW9uIHx8IFwicmlnaHRcIjtcblxuICAvL3NldCB0aGUgZGVmYXVsdCBiYWNrIGFuaW1hdGlvblxuICB0aGlzLmJhY2tBbmltYXRpb24gPSBvcHRpb25zLmRlZmF1bHRCYWNrQW5pbWF0aW9uIHx8IFwibGVmdFwiO1xuXG4gIHRoaXMuYmVmb3JlTmF2aWdhdGUgPSB7fTtcbiAgdGhpcy5hZnRlck5hdmlnYXRlID0ge307XG4gIHRoaXMuYmVmb3JlQW5pbWF0ZSA9IHt9O1xuICB0aGlzLmR1cmluZ0FuaW1hdGUgPSB7fTtcbiAgdGhpcy5hZnRlckFuaW1hdGUgPSB7fTtcbiAgdGhpcy5iZWZvcmVCYWNrID0ge307XG4gIHRoaXMuYWZ0ZXJCYWNrID0ge307XG5cbiAgaWYgKG9wdGlvbnMuYmVmb3JlTmF2aWdhdGUpIHsgdGhpcy5iZWZvcmVOYXZpZ2F0ZS5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZU5hdmlnYXRlOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyTmF2aWdhdGUpIHsgdGhpcy5hZnRlck5hdmlnYXRlLnJvdXRlciA9IG9wdGlvbnMuYWZ0ZXJOYXZpZ2F0ZTsgfVxuICBpZiAob3B0aW9ucy5iZWZvcmVBbmltYXRlKSB7IHRoaXMuYmVmb3JlQW5pbWF0ZS5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZUFuaW1hdGU7IH1cbiAgaWYgKG9wdGlvbnMuZHVyaW5nQW5pbWF0ZSkgeyB0aGlzLmR1cmluZ0FuaW1hdGUucm91dGVyID0gb3B0aW9ucy5kdXJpbmdBbmltYXRlOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyQW5pbWF0ZSkgeyB0aGlzLmFmdGVyQW5pbWF0ZS5yb3V0ZXIgPSBvcHRpb25zLmFmdGVyQW5pbWF0ZTsgfVxuICBpZiAob3B0aW9ucy5iZWZvcmVCYWNrKSB7IHRoaXMuYmVmb3JlQmFjay5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZUJhY2s7IH1cbiAgaWYgKG9wdGlvbnMuYWZ0ZXJCYWNrKSB7IHRoaXMuYWZ0ZXJCYWNrLnJvdXRlciA9IG9wdGlvbnMuYWZ0ZXJCYWNrOyB9XG5cbn07XG5cbi8vIGdldCB0aGUgcm91dGVyJ3MgY3VycmVudCBwYWdlIGRhdGFcblNhbXNvblJvdXRlci5wcm90b3R5cGUuZ2V0UGFnZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50UGFnZSA6IHRoaXMuY3VycmVudFBhZ2UsXG4gICAgcHJldmlvdXNQYWdlIDogdGhpcy5wcmV2aW91c1BhZ2UsXG4gICAgbmV4dFBhZ2UgOiB0aGlzLm5leHRQYWdlLFxuICAgIHBhZ2VzQW5pbWF0aW5nIDogdGhpcy5wYWdlc0FuaW1hdGluZyxcbiAgICBhY3RpdmVQYWdlRWxlbWVudCA6IHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQsXG4gICAgaW5hY3RpdmVQYWdlRWxlbWVudCA6IHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudCxcbiAgICBjdXJyZW50QW5pbWF0aW9uIDogdGhpcy5jdXJyZW50QW5pbWF0aW9uXG4gIH07XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLl9kb0ZpcnN0ID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgdGFza3MgPSBPYmplY3Qua2V5cyh0aGlzW25hbWVdKTtcbiAgYXN5bmMuZWFjaCh0YXNrcywgZnVuY3Rpb24odGFzaywgY2IpIHtcbiAgICBzZWxmW25hbWVdW3Rhc2tdKHNlbGYuZ2V0UGFnZURhdGEoKSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjYihlcnIpO1xuICAgIH0pO1xuICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICBjYWxsYmFjayhlcnIpO1xuICB9KTtcbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUuX2R1cmluZ0FuaW1hdGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gdGhpcy5kdXJpbmdBbmltYXRlKSB7XG4gICAgdGhpcy5kdXJpbmdBbmltYXRlW2tleV0odGhpcy5nZXRQYWdlRGF0YSgpKTtcbiAgfVxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS51cGRhdGVIaXN0b3J5ID0gZnVuY3Rpb24oa2luZCwgbWVzc2FnZSkge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIgaGlzdG9yeV9vYmplY3QgPSB7fTtcbiAgaGlzdG9yeV9vYmplY3QuZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgLy8gaWYgd2UgYXJlIG5hdmlnYXRpbmcgZm9yd2FyZFxuICBpZiAoa2luZCA9PT0gXCJuYXZpZ2F0ZVwiKSB7XG5cbiAgICBoaXN0b3J5X29iamVjdC5raW5kID0ga2luZDtcbiAgICBoaXN0b3J5X29iamVjdC5wYWdlID0gdGhpcy5uZXh0UGFnZTtcbiAgICB0aGlzLmhpc3RvcnkucHVzaChoaXN0b3J5X29iamVjdCk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgY3VycmVudFBhZ2UgaXMgc2FmZSB0byBnbyBiYWNrIHRvIGZyb20gYW55d2hlcmVcbiAgICB2YXIgYmFja19zYWZlID0gdGhpcy5jdXJyZW50UGFnZSA/IFNhbXNvbi5BcHAuUGFnZXNbdGhpcy5jdXJyZW50UGFnZV0uYmFja1NhZmUgOiBmYWxzZTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50UGFnZSBpcyBiYWNrU2FmZSwgdGhlbiBzZXQgaXQgYXMgdGhlIHByZXZpb3VzUGFnZSwgb3RoZXJ3aXNlIHNldCB0aGUgY29uZmlndXJlZCBwcmV2aW91c1BhZ2VcbiAgICB0aGlzLnByZXZpb3VzUGFnZSA9IGJhY2tfc2FmZSA/IHRoaXMuY3VycmVudFBhZ2UgOiBTYW1zb24uQXBwLlBhZ2VzW3RoaXMubmV4dFBhZ2VdLnByZXZpb3VzUGFnZTtcblxuICAgIC8vIHNldCBvdXIgY3VycmVudFBhZ2UgYXMgdGhlIHBhZ2Ugd2UgYXJlIGdvaW5nIHRvXG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMubmV4dFBhZ2U7XG5cblxuICB9IGVsc2UgaWYgKGtpbmQgPT09IFwiYmFja1wiKSB7XG5cbiAgICBoaXN0b3J5X29iamVjdC5raW5kID0ga2luZDtcbiAgICBoaXN0b3J5X29iamVjdC5wYWdlID0gdGhpcy5wcmV2aW91c1BhZ2U7XG4gICAgdGhpcy5oaXN0b3J5LnB1c2goaGlzdG9yeV9vYmplY3QpO1xuXG4gICAgLy8gd2UgYXJlIGdvaW5nIGJhY2ssIHNvIHNldCBvdXIgY3VycmVudFBhZ2UgYXMgb3VyIHByZXZpb3VzUGFnZVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnByZXZpb3VzUGFnZTtcblxuICAgIC8vIHdlIGFyZSBnb2luZyBiYWNrLCBzbyBzZXQgdGhlIHByZXZpb3VzUGFnZSB0byB0aGUgY3VycmVudCBQYWdlJ3MgcHJldmlvdXNQYWdlXG4gICAgdGhpcy5wcmV2aW91c1BhZ2UgPSBTYW1zb24uQXBwLlBhZ2VzW3RoaXMuY3VycmVudFBhZ2VdLnByZXZpb3VzUGFnZTtcblxuICB9IGVsc2UgaWYgKGtpbmQgPT09IFwiZmFpbGVkXCIpIHtcbiAgICBjb25zb2xlLmxvZyhcIlJvdXRlciBldmVudCBmYWlsZWQgYmVjYXVzZTogXCIgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIC8vIGlmIGl0IHdhc24ndCBqdXN0IGEgcGFnZSB1cGRhdGUsIHRoZW4gc3dpdGNoIHRoZSBhY3RpdmVQYWdlRWxlbWVudCBhbmQgaW5hY3RpdmVQYWdlRWxlbWVudCB2YWx1ZXNcbiAgaWYgKGtpbmQgIT09IFwidXBkYXRlXCIgJiYga2luZCAhPT0gXCJmYWlsZWRcIikge1xuICAgIHZhciBuZXdfYWN0aXZlX3BhZ2UgPSB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQ7XG4gICAgdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50ID0gdGhpcy5hY3RpdmVQYWdlRWxlbWVudDtcbiAgICB0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50ID0gbmV3X2FjdGl2ZV9wYWdlO1xuICB9XG5cbiAgdGhpcy5uZXh0UGFnZSA9IGZhbHNlO1xuXG4gIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGVyZSBpcyBhbm90aGVyIHJvdXRlciBldmVudCBpbiB0aGUgcXVldWVcbiAgdmFyIHF1ZXVlX2V2ZW50ID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICBpZiAocXVldWVfZXZlbnQpIHtcblxuICAgIGlmIChxdWV1ZV9ldmVudC5raW5kID09PSBcIm5hdmlnYXRlXCIpIHtcblxuICAgICAgLy8gYWRkZWQgYSAyMG1zIGRlbGF5IGR1ZSB0byBzb21lIHdlaXJkIGJlaGF2aW9yIHdpdGggY3NzIGFuaW1hdGlvbnMgbm90IHdvcmtpbmcgd2l0aG91dCBpdFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5pc0J1c3kgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5uYXZpZ2F0ZShxdWV1ZV9ldmVudC5uZXh0X3BhZ2UsIHF1ZXVlX2V2ZW50LmFuaW1hdGlvbiwgcXVldWVfZXZlbnQuY2FsbGJhY2spO1xuICAgICAgfSwgMjApO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmFjayhxdWV1ZV9ldmVudC5jYWxsYmFjayk7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc0J1c3kgPSBmYWxzZTtcbiAgfVxuXG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmdldEFuaW1hdGlvbkRhdGEgPSBmdW5jdGlvbihhbmltYXRpb24pIHtcbiAgdmFyIGRhdGEgPSB7fTtcbiAgZGF0YS5jdXJyZW50ID0gXCJub25lXCI7XG4gIGRhdGEubmV4dCA9IFwibm9uZVwiO1xuXG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHRoaXMuYW5pbWF0aW9ucykge1xuICAgIGlmIChhbmltYXRpb24gPT09IGtleSkge1xuICAgICAgZGF0YS5jdXJyZW50ID0gdGhpcy5hbmltYXRpb25zW2tleV0uY3VycmVudDtcbiAgICAgIGRhdGEubmV4dCA9IHRoaXMuYW5pbWF0aW9uc1trZXldLm5leHQ7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUuZG9BbmltYXRpb24gPSBmdW5jdGlvbihhbmltYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICBTYW1zb24uRE9NW3RoaXMuaW5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LmFkZChhbmltYXRlLm5leHQsIFwiYWN0aXZlXCIpO1xuICBTYW1zb24uRE9NW3RoaXMuYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5hZGQoYW5pbWF0ZS5jdXJyZW50KTtcbiAgU2Ftc29uLkRPTVt0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXG4gIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIHdoaWxlIHRoZSBwYWdlcyBhcmUgYW5pbWF0aW5nLiBFeDogdXBkYXRlIGhlYWRlciBvciBmb290ZXJcbiAgdGhpcy5fZHVyaW5nQW5pbWF0ZSgpO1xuXG4gIHZhciBhbmltYXRpb25FdmVudCA9IFV0aWxzLndoaWNoQW5pbWF0aW9uRXZlbnQoKTtcblxuICBVdGlscy5vbmNlKFNhbXNvbi5ET01bdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50XSwgYW5pbWF0aW9uRXZlbnQsIGFuaW1hdGlvbkVuZGVkKTtcblxuICAvLyBsaXN0ZW4gZm9yIHRoZSBlbmQgb2YgdGhlIGFuaW1hdGlvblxuICBmdW5jdGlvbiBhbmltYXRpb25FbmRlZCgpIHtcblxuICAgIC8vIHJlbW92ZSB0aGUgYW5pbWF0aW9uIGNsYXNzIGZyb20gdGhlIHBhZ2Ugd2UganVzdCBtYWRlIGFjdGl2ZVxuICAgIFNhbXNvbi5ET01bc2VsZi5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QucmVtb3ZlKGFuaW1hdGUubmV4dCk7XG5cbiAgICAvLyByZW1vdmUgdGhlIGFuaW1hdGlvbiBjbGFzcyBmcm9tIHRoZSBwYWdlIHdlIGp1c3QgbWFkZSBpbmFjdGl2ZVxuICAgIFNhbXNvbi5ET01bc2VsZi5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShhbmltYXRlLmN1cnJlbnQpO1xuXG4gICAgc2VsZi5wYWdlc0FuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBvbGQgcGFnZSBpbmNsdWRpbmcgYWxsIG9mIGl0cyB2aWV3cyBhbmQgZXZlbnRzIGZyb20gdGhlIERPTVxuICAgIC8vIGFsc28gcmVtb3ZlIHRoZSBlbnRpcmUgcGFnZSBpbnN0YW5jZSBmcm9tIHRoZSByb3V0ZXIncyBwYWdlQ2FjaGVcbiAgICBpZiAoc2VsZi5jdXJyZW50UGFnZSkge1xuICAgICAgc2VsZi5wYWdlQ2FjaGVbc2VsZi5jdXJyZW50UGFnZV0uX3JlbW92ZShmdW5jdGlvbigpIHtcbiAgICAgICAgZGVsZXRlIHNlbGYucGFnZUNhY2hlW3NlbGYuY3VycmVudFBhZ2VdO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfVxuXG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmFuaW1hdGUgPSBmdW5jdGlvbihuZXh0X3BhZ2UsIGFuaW1hdGlvbiwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5wYWdlc0FuaW1hdGluZyA9IHRydWU7XG5cbiAgaWYgKGFuaW1hdGlvbiA9PT0gXCJ1cGRhdGVcIikge1xuXG4gICAgdGhpcy5wYWdlQ2FjaGVbbmV4dF9wYWdlXS5fcmVuZGVyKHRydWUsIG51bGwsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBzZWxmLl9kb0ZpcnN0KFwiYmVmb3JlQW5pbWF0ZVwiLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9IGVsc2Uge1xuXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGFuaW1hdGlvbiB0aGF0IHdpbGwgYmUgdXNlZFxuICAgIHZhciBhbmltYXRpb25fZGF0YSA9IHRoaXMuZ2V0QW5pbWF0aW9uRGF0YShhbmltYXRpb24pO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBmb2N1cyBmcm9tIHdoYXRldmVyIGVsZW1lbnQgaGFzIGl0IHNvIHRoZSBjdXJzb3IgZG9lc24ndCBtYWtlIHRoZSBwYWdlIHRyYW5zaXRpb24gbG9vayBzdWNreVxuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXG4gICAgLy8gcmVuZGVyIHRoZSBuZXcgcGFnZSBvZmYgc2NyZWVuXG4gICAgdGhpcy5wYWdlQ2FjaGVbbmV4dF9wYWdlXS5fcmVuZGVyKGZhbHNlLCBTYW1zb24uRE9NW3RoaXMuaW5hY3RpdmVQYWdlRWxlbWVudF0sIGZ1bmN0aW9uKCkge1xuXG5cbiAgICAgIHNlbGYuX2RvRmlyc3QoXCJiZWZvcmVBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgIC8vIHJ1biB0aGUgYW5pbWF0aW9uIG5vdyB0aGF0IHRoZSBuZXcgcGFnZSBpcyBmdWxseSByZW5kZXJlZCBvZmZzY3JlZW5cbiAgICAgICAgc2VsZi5kb0FuaW1hdGlvbihhbmltYXRpb25fZGF0YSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgLy8gcmVzdG9yZSBmb2N1cyB0byB3aGF0ZXZlciBlbGVtZW50IHdhcyBzZXQgdG8gYXV0b2ZvY3VzIChsaW5rZWQgd2l0aCBfZml4QXV0b0ZvY3VzRWxlbWVudHMgbWV0aG9kIGluIHNoYXJlZC5qcylcbiAgICAgICAgICB2YXIgZm9jdXNFbGVtZW50ID0gU2Ftc29uLkRPTVtzZWxmLmluYWN0aXZlUGFnZUVsZW1lbnRdLnF1ZXJ5U2VsZWN0b3IoXCIuc2Ftc29uX2ZvY3VzXCIpO1xuICAgICAgICAgIGlmIChmb2N1c0VsZW1lbnQpIHtcblxuICAgICAgICAgICAgLy8gcmVmb2N1cyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgZm9jdXNFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIC8vZm9jdXNFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIGN1cnNvciB0byB0aGUgZW5kIG9mIHRoZSB0ZXh0YXJlYVxuICAgICAgICAgICAgdmFyIHZhbHVlX2xlbmd0aCA9IGZvY3VzRWxlbWVudC52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICBmb2N1c0VsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UodmFsdWVfbGVuZ3RoLCB2YWx1ZV9sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHNhbXNvbl9mb2N1cyBjbGFzcyBmcm9tIHRoZSBlbGVtZW50XG4gICAgICAgICAgICBmb2N1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNhbXNvbl9mb2N1c1wiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLm5hdmlnYXRlID0gZnVuY3Rpb24obmV4dF9wYWdlLCBhbmltYXRpb24sIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIGNoZWNrIHRvIHNlZSBpZiBhbm90aGVyIFJvdXRlciBldmVudCBpcyBhbHJlYWR5IGJlaW5nIGhhbmRsZWQsIGlmIG9uZSBpcyB0aGVuIGFkZCB0aGlzIGV2ZW50IHRvIGEgcXVldWVcbiAgaWYgKHRoaXMuaXNCdXN5KSB7XG5cbiAgICB0aGlzLnF1ZXVlLnB1c2goe1xuICAgICAga2luZDogXCJuYXZpZ2F0ZVwiLFxuICAgICAgbmV4dF9wYWdlOiBuZXh0X3BhZ2UsXG4gICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIlJvdXRlciBpcyBidXN5LiBUaGlzIGV2ZW50IGlzICNcIiArIHNlbGYucXVldWUubGVuZ3RoICsgXCIgaW4gbGluZVwiKTtcblxuICB9IGVsc2Uge1xuXG4gICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgdmFyIGNob3Nlbl9hbmltYXRpb24gPSBhbmltYXRpb24gfHwgdGhpcy5uYXZpZ2F0ZUFuaW1hdGlvbjtcblxuICAgIC8vIGlmIGEgcGFnZSB1cGRhdGUgaXMgcmVxdWVzdGVkIGZvciBhIHBhZ2Ugd2UgYXJlbid0IGN1cnJlbnRseSBvbiwgdGhlbiB3ZSB3aWxsIHNpbXBseSBuYXZpZ2F0ZSB0byBpdCBsaWtlIG5vcm1hbFxuICAgIGlmIChjaG9zZW5fYW5pbWF0aW9uID09PSBcInVwZGF0ZVwiICYmIG5leHRfcGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgY2hvc2VuX2FuaW1hdGlvbiA9IHRoaXMubmF2aWdhdGVBbmltYXRpb247XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0UGFnZSA9IG5leHRfcGFnZTtcblxuICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGJlZm9yZSB3ZSBzdGFydCB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgdGhpcy5fZG9GaXJzdChcImJlZm9yZU5hdmlnYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHBhZ2UgZXhpc3RzIGJlZm9yZSB0cnlpbmcgdG8gbmF2aWdhdGVcbiAgICAgIGlmICghU2Ftc29uLkFwcC5QYWdlc1tuZXh0X3BhZ2VdICYmICFlcnIpIHtcbiAgICAgICAgZXJyID0gXCJUaGF0IHBhZ2UgZG9lcyBub3QgZXhpc3RcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnIpIHtcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgd2UgYXJlIHN0YXlpbmcgb24gdGhlIHNhbWUgcGFnZSwgaWYgd2UgYXJlIHRoZW4gc2ltcGx5IHVwZGF0ZSB0aGUgcGFnZVxuICAgICAgICBpZiAobmV4dF9wYWdlID09PSBzZWxmLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgY2hvc2VuX2FuaW1hdGlvbiA9IFwidXBkYXRlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5wYWdlQ2FjaGVbbmV4dF9wYWdlXSA9IFNhbXNvbi5jcmVhdGVQYWdlKFNhbXNvbi5BcHAuUGFnZXNbbmV4dF9wYWdlXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHRoZSBjdXJyZW50IGFuaW1hdGlvbiBhY2Nlc3NpYmxlIGluIGdldFBhZ2VEYXRhKClcbiAgICAgICAgc2VsZi5jdXJyZW50QW5pbWF0aW9uID0gY2hvc2VuX2FuaW1hdGlvbjtcblxuICAgICAgICAvLyBhbmltYXRlIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgc2VsZi5hbmltYXRlKG5leHRfcGFnZSwgY2hvc2VuX2FuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyQW5pbWF0ZVwiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjaGFuZ2VzIHRvIHRoZSBwYWdlIGhpc3RvcnlcbiAgICAgICAgICAgIGlmIChjaG9zZW5fYW5pbWF0aW9uID09PSBcInVwZGF0ZVwiKSB7XG4gICAgICAgICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcInVwZGF0ZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcIm5hdmlnYXRlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciBuYXZpZ2F0aW5nXG4gICAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJOYXZpZ2F0ZVwiLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwiZmFpbGVkXCIsIGVycik7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAvLyBjaGVjayB0byBzZWUgaWYgYW5vdGhlciBSb3V0ZXIgZXZlbnQgaXMgYWxyZWFkeSBiZWluZyBoYW5kbGVkLCBpZiBvbmUgaXMgdGhlbiBhZGQgdGhpcyBldmVudCB0byBhIHF1ZXVlXG4gIGlmICh0aGlzLmlzQnVzeSkge1xuXG4gICAgdGhpcy5xdWV1ZS5wdXNoKHtcbiAgICAgIGtpbmQ6IFwiYmFja1wiLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiUm91dGVyIGlzIGJ1c3kuIFRoaXMgZXZlbnQgaXMgI1wiICsgc2VsZi5xdWV1ZS5sZW5ndGggKyBcIiBpbiBsaW5lXCIpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBiZWZvcmUgd2Ugc3RhcnQgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVCYWNrXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYSBwYWdlIHRvIGdvIGJhY2sgdG9cbiAgICAgIGlmICghc2VsZi5wcmV2aW91c1BhZ2UgJiYgIWVycikge1xuICAgICAgICBlcnIgPSBcIk5vIHBhZ2UgdG8gZ28gYmFjayB0b1wiO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycikge1xuXG4gICAgICAgIC8vIGxvYWQgdGhlIHByZXZpb3VzUGFnZSBpbnRvIHRoZSBwYWdlQ2FjaGVcbiAgICAgICAgc2VsZi5wYWdlQ2FjaGVbc2VsZi5wcmV2aW91c1BhZ2VdID0gU2Ftc29uLmNyZWF0ZVBhZ2UoU2Ftc29uLkFwcC5QYWdlc1tzZWxmLnByZXZpb3VzUGFnZV0pO1xuXG4gICAgICAgIC8vIGlmIHRoZSBwYWdlIHdhbnRzIGEgY3VzdG9tIGJhY2sgYW5pbWF0aW9uIHRoZW4gdXNlIGl0LCBvdGhlcndpc2UgdXNlIHRoZSBkZWZhdWx0IGJhY2sgYW5pbWF0aW9uXG4gICAgICAgIHZhciBiYWNrX2FuaW1hdGlvbiA9IFNhbXNvbi5BcHAuUGFnZXNbc2VsZi5jdXJyZW50UGFnZV0uYmFja0FuaW1hdGlvbiB8fCBzZWxmLmJhY2tBbmltYXRpb247XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgY3VycmVudCBhbmltYXRpb24gYWNjZXNzaWJsZSBpbiBnZXRQYWdlRGF0YSgpXG4gICAgICAgIHNlbGYuY3VycmVudEFuaW1hdGlvbiA9IGJhY2tfYW5pbWF0aW9uO1xuXG4gICAgICAgIC8vIGFuaW1hdGUgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgICAgICBzZWxmLmFuaW1hdGUoc2VsZi5wcmV2aW91c1BhZ2UsIGJhY2tfYW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGNoYW5nZXMgdG8gdGhlIHBhZ2UgaGlzdG9yeVxuICAgICAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwiYmFja1wiKTtcblxuICAgICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgZ29pbmcgYmFja1xuICAgICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyQmFja1wiLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwiZmFpbGVkXCIsIGVycik7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uUm91dGVyO1xuIiwiXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xudmFyIGlzRXF1YWwgPSByZXF1aXJlKCdsb2Rhc2guaXNlcXVhbCcpO1xuXG52YXIgc2hhcmVkID0ge307XG5cbi8vIHJlc2VydmVkIHByb3BlcnRpZXMgZm9yIGNvbXBvbmVudHMgYW5kIHBhZ2VzXG5zaGFyZWQucmVzZXJ2ZWQgPSBbXCJwYXRoXCIsIFwiZWxcIiwgXCJlbGVtZW50XCIsIFwidGVtcGxhdGVcIiwgXCJzdWJQYWdlT2ZcIiwgXCJwcmV2aW91c1BhZ2VcIiwgXCJiYWNrQW5pbWF0aW9uXCIsIFwic3R5bGVcIiwgXCJjb21wb25lbnRzXCIsIFwiZXZlbnRzXCIsIFwiZG9tRXZlbnRzXCIsIFwiYXBwRXZlbnRzXCIsIFwic3RhdGVcIiwgXCJzZXRTdGF0ZVwiLCBcInJlc2V0U3RhdGVcIiwgXCJzZXRJbml0aWFsU3RhdGVcIiwgXCJiZWZvcmVSZW5kZXJcIiwgXCJhZnRlclJlbmRlclwiLCBcImJlZm9yZVJlbW92ZVwiLCBcInJlbmRlclwiLCBcInBhcmVudFwiLCBcIm9uXCIsIFwiZW1pdFwiLCBcIm9mZlwiXTtcblxuLy8gY2FjaGVkIGZvciBwZXJmb3JtYW5jZVxuc2hhcmVkLmp1c3RDYWxsYmFjayA9IGZ1bmN0aW9uKGNiKSB7IGNiKCk7IH07XG5zaGFyZWQuanVzdENhbGxiYWNrVHJ1ZSA9IGZ1bmN0aW9uKGNiKSB7IGNiKHRydWUpOyB9O1xuc2hhcmVkLmp1c3RSZXR1cm5PYmplY3QgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHt9OyB9O1xuXG4vLyByZW1vdmUgdGhlIGF1dG9mb2N1cyBhdHRyaWJ1dGUgb24gdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBoYXMgaXQgYW5kIHRvIGl0IHRoZSBjbGFzcyBcInNhbXNvbl9mb2N1c1wiLiByZW1vdmUgdGhlIGF1dG9mb2N1cyBhdHRyaWJ1dGUgZW50aXJlbHkgb24gYW55IG90aGVyIGVsZW1lbnRzIHRoYXQgbWlnaHQgaGF2ZSBpdCBieSBtaXN0YWtlLiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBoYXZlIHNtb290aCBwYWdlIHRyYW5zaXRpb25zIGR1ZSB0byBhbiBhbmltYXRpb24gYnVnIGluIGNocm9tZSBjYXVzZWQgYnkgYW4gZWxlbWVudCBoYXZpbmcgdGhlIGF1dG9mb2N1cyBhdHRyaWJ1dGUuIFRoZSBTYW1zb24gUm91dGVyIHdpbGwgY2FsbCAuZm9jdXMoKSBvbiB3aGF0ZXZlciBlbGVtZW50IGhhcyB0aGUgXCJzYW1zb25fZm9jdXNcIiBjbGFzcywgYWZ0ZXIgdGhlIHBhZ2UgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZVxuc2hhcmVkLl9maXhBdXRvRm9jdXNFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaTsgdmFyIGZvY3VzRWxlbWVudHMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIlthdXRvZm9jdXM9J2F1dG9mb2N1cyddXCIpO1xuICBmb3IgKGk9MDsgaTxmb2N1c0VsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGZvY3VzRWxlbWVudCA9IGZvY3VzRWxlbWVudHNbaV07XG4gICAgaWYgKGkgPT0gMCkge1xuICAgICAgZm9jdXNFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzYW1zb25fZm9jdXNcIik7XG4gICAgfVxuICAgIGZvY3VzRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhdXRvZm9jdXNcIik7XG4gICAgZm9jdXNFbGVtZW50LmJsdXIoKTtcbiAgfVxufTtcblxuLy8gZ2V0IHRoZSB0b3Btb3N0IHBhcmVudCBwYWdlIG9yIGNvbXBvbmVudCBvZiB0aGUgY3VycmVudCBjb21wb25lbnRcbi8vIHVzZWQgaW4gdGhlIHNldFN0YXRlIG1ldGhvZCBvbiBjb21wb25lbnRzIGFuZCBwYWdlc1xuZnVuY3Rpb24gZ2V0VG9wUGFyZW50KGNvbXBvbmVudCkge1xuICBpZiAoY29tcG9uZW50LnBhcmVudCkge1xuICAgIHJldHVybiBnZXRUb3BQYXJlbnQoY29tcG9uZW50LnBhcmVudCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfVxufVxuXG4vLyB0aGUgbWV0aG9kcyB0aGF0IFBhZ2VzIGFuZCBDb21wb25lbnRzIHNoYXJlXG5zaGFyZWQuc2V0U3RhdGUgPSBmdW5jdGlvbihuZXdfc3RhdGUpIHsgLy8gbmV3X3N0YXRlIG11c3QgYmUgYW4gb2JqZWN0XG4gIGlmICh0eXBlb2YgbmV3X3N0YXRlID09PSBcIm9iamVjdFwiKSB7XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcblxuICAgIHZhciBwcm9wO1xuICAgIGZvciAocHJvcCBpbiBuZXdfc3RhdGUpIHtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhpcyBwcm9wZXJ0eSBoYXMgY2hhbmdlZFxuICAgICAgaWYgKHRoaXMuc3RhdGVbcHJvcF0gPT09IHVuZGVmaW5lZCkgeyAvLyBpZiB0aGUgcHJvcGVydHkgZG9lc24ndCBleGlzdCBvbiB0aGUgc3RhdGUgb2JqZWN0IHRoZW4gaXQgd2lsbCB1cGRhdGVkXG4gICAgICAgIHRoaXMuc3RhdGVbcHJvcF0gPSBuZXdfc3RhdGVbcHJvcF07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICghaXNFcXVhbCh0aGlzLnN0YXRlW3Byb3BdLCBuZXdfc3RhdGVbcHJvcF0pKSB7IC8vIGlmIHRoZSBleGlzdGluZyBwcm9wZXJ0eSBvbiB0aGUgc3RhdGUgb2JqZWN0IGlzIG5vdCBlcXVhbCB0byB0aGUgdmFsdWUgb24gdGhlIG5ld19zdGF0ZSBvYmplY3QgdGhlbiBpdCB3aWxsIGJlIHVwZGF0ZWRcbiAgICAgICAgdGhpcy5zdGF0ZVtwcm9wXSA9IG5ld19zdGF0ZVtwcm9wXTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgaWYgKCF0aGlzLnBhcmVudCB8fCAhdGhpcy5wYXJlbnQuX3R5cGUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBnZXRUb3BQYXJlbnQodGhpcyk7XG4gICAgICAgIHBhcmVudC5fcmVuZGVyKGZhbHNlKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1ha2Ugc3VyZSB0byBwYXNzIGFuIG9iamVjdCBpbnRvIHNldFN0YXRlXCIpO1xuICB9XG59O1xuXG5zaGFyZWQucmVzZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmV3X3N0YXRlID0gdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgdGhpcy5zZXRTdGF0ZShuZXdfc3RhdGUpO1xufTtcblxuLy8gcnVuIHRoZSBuYW1lZCBmdW5jdGlvbiBiZWZvcmUgY2FsbGluZyBiYWNrXG5zaGFyZWQuX2RvRmlyc3QgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaykge1xuICB0aGlzW25hbWVdKGZ1bmN0aW9uKCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xufTtcblxuLy8gYWRkIGFueSB0YXNrcyB0aGF0IHRoaXMgcGFnZSBvciBjb21wb25lbnQgd2FudHMgcnVuIGF0IGRpZmZlcmVudCBldmVudHMgZHVyaW5nIHJvdXRlciBuYXZpZ2F0aW9uXG5zaGFyZWQuYWRkUm91dGVyVGFza3MgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHRhc2s7XG4gIGZvciAodGFzayBpbiBvYmouX3JvdXRlcikge1xuICAgIFNhbXNvbi5BcHAuUm91dGVyW3Rhc2tdW29iai5fdXVpZF0gPSBvYmouX3JvdXRlclt0YXNrXS5iaW5kKG9iaik7XG4gIH1cbn1cblxuc2hhcmVkLl9sb2FkRXZlbnRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLl9sb2FkZWRFdmVudHMubGVuZ3RoKSB7XG5cbiAgICB2YXIgZGVsZWdhdGUgPSBnZXRUb3BQYXJlbnQodGhpcykuZGVsZWdhdGU7XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZG9tRXZlbnRzKTtcblxuICAgIHZhciBzZWxlY3Rvcl9lbGVtZW50ID0gKHRoaXMuX3R5cGUgPT09IFwiUGFnZVwiKSA/IG51bGwgOiBcIiNcIiArICB0aGlzLmVsO1xuXG4gICAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICAgIHZhciBldmVudCA9IHt9O1xuICAgICAgdmFyIHNwbGl0X2V2ZW50ID0ga2V5LnNwbGl0KFwiIFwiKTsgLy8gc3BsaXQgYnkgYSBzaW5nbGUgc3BhY2VcbiAgICAgIGV2ZW50LnR5cGUgPSBzcGxpdF9ldmVudC5zaGlmdCgpO1xuICAgICAgZXZlbnQuc2VsZWN0b3IgPSBzcGxpdF9ldmVudC5sZW5ndGggPiAxID8gc3BsaXRfZXZlbnQuam9pbihcIiBcIikgOiBzcGxpdF9ldmVudFswXTtcbiAgICAgIGV2ZW50LnNlbGVjdG9yID0gZXZlbnQuc2VsZWN0b3IgfHwgc2VsZWN0b3JfZWxlbWVudDtcblxuICAgICAgZXZlbnQuaGFuZGxlciA9IGZ1bmN0aW9uIGZpeGVkRXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgc2VsZi5kb21FdmVudHNba2V5XS5jYWxsKHNlbGYsIGUsIGUuY3VycmVudFRhcmdldCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoZXZlbnQuc2VsZWN0b3IpIHtcbiAgICAgICAgZGVsZWdhdGUub24oZXZlbnQudHlwZSwgZXZlbnQuc2VsZWN0b3IsIGV2ZW50LmhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZWdhdGUub24oZXZlbnQudHlwZSwgZXZlbnQuaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2xvYWRlZEV2ZW50cy5wdXNoKGV2ZW50KTtcblxuICAgICAgY2IoKTtcblxuICAgIH0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBsb2FkIGFueSBhcHAgZXZlbnRzXG4gICAgICB2YXIgYXBwRXZlbnQ7XG4gICAgICBmb3IgKGFwcEV2ZW50IGluIHNlbGYuYXBwRXZlbnRzKSB7XG4gICAgICAgIFNhbXNvbi5BcHAub24oYXBwRXZlbnQsIHNlbGYuYXBwRXZlbnRzW2FwcEV2ZW50XSwgc2VsZik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgfVxuXG59O1xuXG5zaGFyZWQuX2Rlc3Ryb3lFdmVudHMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIC8vIGRlc3Ryb3kgRE9NIGV2ZW50IGxpc3RlbmVyc1xuICB2YXIgZGVsZWdhdGUgPSBnZXRUb3BQYXJlbnQodGhpcykuZGVsZWdhdGU7XG4gIHZhciBpOyB2YXIgZG9tRXZlbnQ7XG4gIGZvciAoaT0wOyBpPHRoaXMuX2xvYWRlZEV2ZW50cy5sZW5ndGg7aSsrKSB7XG4gICAgZG9tRXZlbnQgPSB0aGlzLl9sb2FkZWRFdmVudHNbaV07XG4gICAgaWYgKGRvbUV2ZW50LnNlbGVjdG9yKSB7XG4gICAgICBkZWxlZ2F0ZS5vZmYoZG9tRXZlbnQudHlwZSwgZG9tRXZlbnQuc2VsZWN0b3IsIGRvbUV2ZW50LmhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxlZ2F0ZS5vZmYoZG9tRXZlbnQudHlwZSwgZG9tRXZlbnQuaGFuZGxlcik7XG4gICAgfVxuICB9XG4gIHRoaXMuX2xvYWRlZEV2ZW50cyA9IFtdO1xuXG4gIC8vIG5vdyBkZXN0cm95IGFwcCBldmVudCBsaXN0ZW5lcnNcbiAgdmFyIGFwcEV2ZW50O1xuICBmb3IgKGFwcEV2ZW50IGluIHRoaXMuYXBwRXZlbnRzKSB7XG4gICAgU2Ftc29uLkFwcC5vZmYoYXBwRXZlbnQsIHRoaXMuYXBwRXZlbnRzW2FwcEV2ZW50XSk7XG4gIH1cblxuICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cbn07XG5cbi8vIGF0dGFjaCB0aGUgY29tcG9uZW50cyBwYXNzZWQgYmFjayBmcm9tIHRoZSBzZXRDb21wb25lbnRzIGZ1bmN0aW9uXG5zaGFyZWQuX2xvYWRDb21wb25lbnRzID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBJZiB0aGUgY29tcG9uZW50cyBhcmVuJ3QgbG9hZGVkLCBvciBmb3JjZV91cGRhdGUgaXMgdHJ1ZSwgdGhlbiBsb2FkIHRoZSBjb21wb25lbnRzXG4gIGlmICghdGhpcy5fY29tcG9uZW50c0xvYWRlZCB8fCBmb3JjZV91cGRhdGUpIHtcblxuICAgIHZhciBuZXdfY29tcG9uZW50cyA9IHRoaXMuc2V0Q29tcG9uZW50cygpO1xuXG4gICAgLy8gRmlyc3Qgd2UgZ28gdGhyb3VnaCBlYWNoIGN1cnJlbnRseSBhdHRhY2hlZCBjb21wb25lbnQsIGFuZCBjaGVjayB0byBzZWUgaWYgaXQgc2hvdWxkIHN0aWxsIGV4aXN0XG4gICAgdmFyIG9sZF9jb21wb25lbnRzID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRzKTtcbiAgICBhc3luYy5lYWNoKG9sZF9jb21wb25lbnRzLCBmdW5jdGlvbihvbGRfY29tcG9uZW50LCBjYikge1xuXG4gICAgICB2YXIgc2hvdWxkX2JlX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgdmFyIG5ld19jb21wb25lbnQ7XG4gICAgICBmb3IgKG5ld19jb21wb25lbnQgaW4gbmV3X2NvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKG9sZF9jb21wb25lbnQgPT09IG5ld19jb21wb25lbnQpIHNob3VsZF9iZV9sb2FkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBsb2FkZWQgYnV0IGlzbid0LCB0aGVuIHdlIGxvYWQgaXQuIE90aGVyd2lzZSB3ZSBqdXN0IHNraXAgaXRcbiAgICAgIGlmIChzaG91bGRfYmVfbG9hZGVkKSB7XG4gICAgICAgIC8vIGlmIHRoZSBjb21wb25lbnQgaGFzbid0IGJlZW4gbG9hZGVkIHlldCwgdGhlbiBsb2FkIGl0XG4gICAgICAgIGlmICghc2VsZltvbGRfY29tcG9uZW50XSkge1xuICAgICAgICAgIHNlbGZbb2xkX2NvbXBvbmVudF0gPSBTYW1zb24uY3JlYXRlQ29tcG9uZW50KHNlbGYuY29tcG9uZW50c1tvbGRfY29tcG9uZW50XSk7XG4gICAgICAgICAgc2VsZltvbGRfY29tcG9uZW50XS5wYXJlbnQgPSBzZWxmO1xuICAgICAgICB9XG4gICAgICAgIGNiKCk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgY29tcG9uZW50IHNpbmNlIGl0IHNob3VsZG4ndCBiZSBsb2FkZWRcbiAgICAgICAgaWYgKHNlbGZbb2xkX2NvbXBvbmVudF0pIHtcbiAgICAgICAgICBzZWxmW29sZF9jb21wb25lbnRdLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZWxldGUgc2VsZltvbGRfY29tcG9uZW50XTtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIC8vIE5vdyB0aGF0IHdlIGhhbmRsZWQgYWxsIG9mIHRoZSBleGlzdGluZyBjb21wb25lbnRzLCB3ZSBsb2FkIGFueSBuZXcgY29tcG9uZW50cyB0aGF0IGRvbid0IGV4aXN0IHlldFxuICAgICAgc2VsZi5jb21wb25lbnRzID0gbmV3X2NvbXBvbmVudHM7XG5cbiAgICAgIHZhciBjb21wb25lbnQ7XG4gICAgICBmb3IgKGNvbXBvbmVudCBpbiBzZWxmLmNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKCFzZWxmW2NvbXBvbmVudF0pIHtcbiAgICAgICAgICBzZWxmW2NvbXBvbmVudF0gPSBTYW1zb24uY3JlYXRlQ29tcG9uZW50KHNlbGYuY29tcG9uZW50c1tjb21wb25lbnRdKTtcbiAgICAgICAgICBzZWxmW2NvbXBvbmVudF0ucGFyZW50ID0gc2VsZjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZWxmLl9jb21wb25lbnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICB9KTtcblxuICB9IGVsc2Uge1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgfVxuXG59O1xuXG4vLyByZW5kZXIgdGhlIGNvbXBvbmVudHMgYXR0YWNoZWQgdG8gdGhlIHBhZ2VcbnNoYXJlZC5fcmVuZGVyQ29tcG9uZW50cyA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudHMpO1xuXG4gIGFzeW5jLmVhY2goa2V5cywgZnVuY3Rpb24oa2V5LCBjYikge1xuXG4gICAgc2VsZltrZXldLl9yZW5kZXIoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgfSwgZnVuY3Rpb24oKXtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcblxufTtcblxuc2hhcmVkLl9kZXN0cm95Q29tcG9uZW50cyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRzKTtcblxuICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgIHNlbGZba2V5XS5fcmVtb3ZlKGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHNlbGZba2V5XTtcbiAgICAgIGNiKCk7XG4gICAgfSk7XG5cbiAgfSwgZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5fY29tcG9uZW50c0xvYWRlZCA9IGZhbHNlO1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xuXG59O1xuXG4vLyByZW1vdmVzIGFsbCBldmVudCBsaXN0ZW5lcnMsIERPTSBub2RlcywgYW5kIGNoaWxkIGNvbXBvbmVudHNcbnNoYXJlZC5fcmVtb3ZlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gcmVtb3ZlIHRoZSBzdHlsZXNoZWV0XG4gIGlmICh0aGlzLnN0eWxlKSB0aGlzLnN0eWxlLmRldGFjaCgpO1xuXG4gIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVSZW1vdmVcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kZXN0cm95Q29tcG9uZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgc2VsZi5fZGVzdHJveUV2ZW50cyhmdW5jdGlvbigpIHtcblxuICAgICAgICAvLyBkZXN0cm95IHRoZSBET00gZWxlbWVudFxuICAgICAgICBpZiAoc2VsZi5lbGVtZW50ICYmIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgRE9NIG5vZGUgaXMgcmVtb3ZlZCBmcm9tIG1lbW9yeSBxdWlja2x5XG4gICAgICAgIGRlbGV0ZSBzZWxmLmVsZW1lbnQ7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFueSByb3V0ZXIgcmVsYXRlZCB0YXNrc1xuICAgICAgICB2YXIgdGFzaztcbiAgICAgICAgZm9yICh0YXNrIGluIHNlbGYuX3JvdXRlcikge1xuICAgICAgICAgIGRlbGV0ZSBTYW1zb24uQXBwLlJvdXRlclt0YXNrXVtzZWxmLl91dWlkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZXZlbnQgZGVsZWdhdG9yIGlmIGl0IGV4aXN0c1xuICAgICAgICBkZWxldGUgc2VsZi5kZWxlZ2F0ZTtcblxuICAgICAgICAvLyByZXNldCB0aGUgcGFnZSdzIHN0YXRlXG4gICAgICAgIHNlbGYuc3RhdGUgPSB7fTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIiosICo6YmVmb3JlLCAqOmFmdGVyXCI6IHtcbiAgICBcIi13ZWJraXQtYm94LXNpemluZ1wiOiBcImJvcmRlci1ib3hcIixcbiAgICBcImJveC1zaXppbmdcIjogXCJib3JkZXItYm94XCJcbiAgfSxcbiAgXCJodG1sLCBib2R5LCAjc2Ftc29uX2FwcFwiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcInJlbGF0aXZlXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICBcImhlaWdodFwiOiBcIjEwMCVcIixcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjRkZGXCJcbiAgfSxcbiAgXCIjc2Ftc29uX3BhZ2VzXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBcIixcbiAgICBcImxlZnRcIjogXCIwXCIsXG4gICAgXCJyaWdodFwiOiBcIjBcIixcbiAgICBcImJvdHRvbVwiOiBcIjBcIixcbiAgICBcInotaW5kZXhcIjogMSxcbiAgICBcIm92ZXJmbG93XCI6IFwiaGlkZGVuXCJcbiAgfSxcbiAgXCIuc2Ftc29uLXBhZ2VcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IFwiMFwiLFxuICAgIFwibGVmdFwiOiBcIjBcIixcbiAgICBcInJpZ2h0XCI6IFwiMFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMFwiLFxuICAgIFwib3BhY2l0eVwiOiAxLFxuICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMCwwLDApXCJcbiAgfSxcbiAgXCIuc2Ftc29uLXBhZ2UuYWN0aXZlXCI6IHtcbiAgICBcInotaW5kZXhcIjogMlxuICB9XG59O1xuIiwiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTQgSXZhbiBHYWJyaWVsZVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXG50aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluXG50aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvXG51c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllc1xub2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvXG5zbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuU09GVFdBUkUuXG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIqXCI6IHtcbiAgICBcIi13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvclwiOiBcInJnYmEoMCwwLDAsMClcIlxuICB9LFxuICBcIjpmb2N1c1wiOiB7XG4gICAgXCJvdXRsaW5lXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsIGEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgYnV0dG9uLCBjaXRlLCBjb2RlLCBkZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsIHNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsIGIsIHUsIGksIGNlbnRlciwgZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSwgZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCB0YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCwgYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIGZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksIHRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlb1wiOiB7XG4gICAgXCJtYXJnaW5cIjogXCIwXCIsXG4gICAgXCJwYWRkaW5nXCI6IFwiMFwiLFxuICAgIFwiYm9yZGVyXCI6IFwiMFwiLFxuICAgIFwiZm9udC1zaXplXCI6IFwiMTAwJVwiLFxuICAgIFwiZm9udFwiOiBcImluaGVyaXRcIixcbiAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwiYmFzZWxpbmVcIlxuICB9LFxuICBcImFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvblwiOiB7XG4gICAgXCJkaXNwbGF5XCI6IFwiYmxvY2tcIlxuICB9LFxuICBcImFcIjoge1xuICAgIFwiY29sb3JcIjogXCJpbmhlcml0XCIsXG4gICAgXCJvdXRsaW5lXCI6IFwibm9uZVwiLFxuICAgIFwidGV4dC1kZWNvcmF0aW9uXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiYmxvY2txdW90ZSwgcVwiOiB7XG4gICAgXCJxdW90ZXNcIjogXCJub25lXCJcbiAgfSxcbiAgXCJibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlciwgcTpiZWZvcmUsIHE6YWZ0ZXJcIjoge1xuICAgIFwiY29udGVudFwiOiBcIm5vbmVcIlxuICB9LFxuICBcImJvZHlcIjoge1xuICAgIFwiZm9udC1zbW9vdGhpbmdcIjogXCJhbnRpYWxpYXNlZFwiLFxuICAgIFwidGV4dC1zaXplLWFkanVzdFwiOiBcIm5vbmVcIixcbiAgICBcInRvdWNoLWNhbGxvdXRcIjogXCJub25lXCIsXG4gICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVaKDApXCIsXG4gICAgXCJ1c2VyLXNlbGVjdFwiOiBcIm5vbmVcIixcbiAgICBcImxpbmUtaGVpZ2h0XCI6IFwiMVwiXG4gIH0sXG4gIFwiY2FwdGlvbiwgdGhcIjoge1xuICAgIFwidGV4dC1hbGlnblwiOiBcImxlZnRcIlxuICB9LFxuICBcImZpZWxkc2V0LCBpbWdcIjoge1xuICAgIFwiYm9yZGVyXCI6IFwiMFwiXG4gIH0sXG4gIFwiaHRtbFwiOiB7XG4gICAgXCJjb2xvclwiOiBcIiMwMDBcIixcbiAgICBcImJhY2tncm91bmRcIjogXCIjZmZmXCJcbiAgfSxcbiAgXCJsZWdlbmRcIjoge1xuICAgIFwiY29sb3JcIjogXCIjMDAwXCJcbiAgfSxcbiAgXCJvbCwgdWxcIjoge1xuICAgIFwibGlzdC1zdHlsZVwiOiBcIm5vbmVcIlxuICB9LFxuICBcInN1YlwiOiB7XG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInRleHQtYm90dG9tXCJcbiAgfSxcbiAgXCJzdXBcIjoge1xuICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0ZXh0LXRvcFwiXG4gIH0sXG4gIFwidGFibGVcIjoge1xuICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IFwiY29sbGFwc2VcIixcbiAgICBcImJvcmRlci1zcGFjaW5nXCI6IFwiMFwiXG4gIH0sXG4gIFwidGV4dGFyZWFcIjoge1xuICAgIFwicmVzaXplXCI6IFwibm9uZVwiXG4gIH1cbn07XG4iLCIvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgdXRpbHMgPSB7fTtcblxuLy8gYWRkIGFueSB1bnJlc2VydmVkIHByb3BlcnRpZXMgdG8gdGhlIHBhc3NlZCBpbiBvYmplY3Rcbi8vIGFueSBwcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggXyBhcmUgcmVzZXJ2ZWRcbmZ1bmN0aW9uIHN0YXJ0c1dpdGhfKHdvcmQpIHtcbiAgcmV0dXJuICh3b3JkLmNoYXJBdCgwKSA9PSBcIl9cIikgPyB0cnVlIDogZmFsc2U7XG59XG5cbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaiwgY3VzdG9tX3Byb3BzLCByZXNlcnZlZCkge1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBjdXN0b21fcHJvcHMpIHtcbiAgICBpZiAoIXN0YXJ0c1dpdGhfKGtleSkgJiYgcmVzZXJ2ZWQuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgb2JqW2tleV0gPSBjdXN0b21fcHJvcHNba2V5XTtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHdoaWNoRXZlbnROYW1lKGV2ZW50X3R5cGUpIHtcbiAgdmFyIGtleTtcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZScpO1xuXG4gIHZhciBldmVudF9uYW1lcyA9IHtcbiAgICB0cmFuc2l0aW9ucyA6IHtcbiAgICAgICd0cmFuc2l0aW9uJzondHJhbnNpdGlvbmVuZCcsXG4gICAgICAnT1RyYW5zaXRpb24nOidvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAnTW96VHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nOid3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuICAgIH0sXG4gICAgYW5pbWF0aW9ucyA6IHtcbiAgICAgICdhbmltYXRpb24nOidhbmltYXRpb25lbmQnLFxuICAgICAgJ09BbmltYXRpb24nOidvQW5pbWF0aW9uRW5kJyxcbiAgICAgICdNb3pBbmltYXRpb24nOidhbmltYXRpb25lbmQnLFxuICAgICAgJ1dlYmtpdEFuaW1hdGlvbic6J3dlYmtpdEFuaW1hdGlvbkVuZCdcbiAgICB9XG4gIH07XG5cbiAgZm9yIChrZXkgaW4gZXZlbnRfbmFtZXNbZXZlbnRfdHlwZV0pIHtcbiAgICBpZihlbC5zdHlsZVtrZXldICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIGV2ZW50X25hbWVzW2V2ZW50X3R5cGVdW2tleV07XG4gICAgfVxuICB9XG59XG5cbnV0aWxzLndoaWNoVHJhbnNpdGlvbkV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB3aGljaEV2ZW50TmFtZShcInRyYW5zaXRpb25zXCIpO1xufTtcblxudXRpbHMud2hpY2hBbmltYXRpb25FdmVudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2hpY2hFdmVudE5hbWUoXCJhbmltYXRpb25zXCIpO1xufTtcblxuLy8gbGlzdGVuIHRvIGFuIGV2ZW50IG9uY2Ugd2l0aG91dCBqcXVlcnlcbnV0aWxzLm9uY2UgPSBmdW5jdGlvbihlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuXG4gIC8vIGNyZWF0ZSBldmVudFxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZnVuY3Rpb24oZSkge1xuICAgIC8vIHJlbW92ZSBldmVudFxuICAgIGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZS50eXBlLCBhcmd1bWVudHMuY2FsbGVlKTtcbiAgICAvLyBjYWxsIGhhbmRsZXJcbiAgICByZXR1cm4gY2FsbGJhY2soZSk7XG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuIiwiLy8gVGlueSBBc3luYyBsaWJyYXJ5IGZvciB1c2UgaW4gbW9kZXJuIGVudmlyb25tZW50c1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gcm9vdCBpcyBnbG9iYWwgb24gdGhlIHNlcnZlciwgYW5kIHdpbmRvdyBpbiB0aGUgYnJvd3NlclxuICB2YXIgcm9vdDtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gd2luZG93KSB7XG4gICAgcm9vdCA9IHdpbmRvdztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIHRoaXMgPT09IGdsb2JhbCkge1xuICAgIHJvb3QgPSBnbG9iYWw7XG4gIH0gZWxzZSB7XG4gICAgcm9vdCA9IHRoaXM7XG4gIH1cblxuICAvLyBjYWNoZWQgZm9yIHBlcmZvcm1hbmNlXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICB2YXIgT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuXG4gIC8vIGlzQXJyYXkgYW5kIGlzT2JqZWN0IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKTtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0S2V5cyhvYmopLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9FYWNoKGFyciwgaXRlcmF0b3IpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlcmF0b3IoYXJyW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIGRvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkocm9vdCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBfZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgYXN5bmMgPSB7XG5cbiAgICAvLyBydW5zIHRoZSB0YXNrIG9uIGV2ZXJ5IGl0ZW0gaW4gdGhlIGFycmF5IGF0IG9uY2VcbiAgICBlYWNoIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgZG9FYWNoKGFyciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpdGVyYXRvcihpdGVtLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkID49IGFtb3VudCkgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gcnVucyB0aHJvdWdoIHRoZSBhcnJheSBvbmUgaXRlbSBhdCBhIHRpbWVcbiAgICBlYWNoU2VyaWVzIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyW2NvbXBsZXRlZF0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA8IGFtb3VudCkge1xuICAgICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgICAgaXRlcmF0ZSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYW4gYWNjZXB0IGFuIG9iamVjdCBvciBhcnJheVxuICAgIC8vIHdpbGwgcmV0dXJuIGFuIG9iamVjdCBvciBhcnJheSBvZiByZXN1bHRzIGluIHRoZSBjb3JyZWN0IG9yZGVyXG4gICAgcGFyYWxsZWwgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgdmFyIGtleXM7IHZhciBsZW5ndGg7IHZhciBpOyB2YXIgcmVzdWx0czsgdmFyIGtpbmQ7XG4gICAgICB2YXIgdXBkYXRlZF90YXNrcyA9IFtdO1xuICAgICAgdmFyIGlzX29iamVjdDtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgaWYgKGlzQXJyYXkodGFza3MpKSB7XG5cbiAgICAgICAgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0gW107XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGFza3MpKSB7XG5cbiAgICAgICAgaXNfb2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAga2V5cyA9IE9iamVjdEtleXModGFza3MpO1xuICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IHt9O1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpPTA7IGk8bGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoaXNfb2JqZWN0KSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazoga2V5c1tpXSwgdDogdGFza3Nba2V5c1tpXV0gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazogaSwgdDogdGFza3NbaV0gfSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkX3Rhc2tzLmZvckVhY2goZnVuY3Rpb24odGFza19vYmplY3QpIHtcblxuICAgICAgICB0YXNrX29iamVjdC50KGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgICByZXN1bHRzW3Rhc2tfb2JqZWN0LmtdID0gcmVzdWx0O1xuXG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIGlmIChjb3VudGVyID09IGxlbmd0aCkgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvLyBvbmx5IGFjY2VwdHMgYW4gYXJyYXkgc2luY2UgdGhlIHByZXNlcnZhdGlvbiBvZiB0aGUgb3JkZXIgb2YgcHJvcGVydGllcyBvbiBhbiBvYmplY3QgY2FuJ3QgYmUgZ3VhcmFudGVlZFxuICAgIC8vIHJldHVybnMgYW4gYXJyYXkgb2YgcmVzdWx0cyBpbiBvcmRlclxuICAgIHNlcmllcyA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFza3MpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIHJ1blRhc2soaW5kZXgpIHtcbiAgICAgICAgdGFza3NbaW5kZXhdKGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSkgcmV0dXJuIHJ1blRhc2soaW5kZXggKyAxKTtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5UYXNrKDApO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgfVxuICAvLyBBTUQgLyBSZXF1aXJlSlNcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFzeW5jO1xuICAgIH0pO1xuICB9XG4gIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgZWxzZSB7XG4gICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICB9XG5cbn0oKSk7XG4iLCIndXNlIHN0cmljdCdcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG4vKipcbiAqIEhhbmRsZSBgZXh0ZW5kYCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge1J1bGV9IHJ1bGVcbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICB2YXIgc3R5bGUgPSBydWxlLnN0eWxlXG5cbiAgICBpZiAoIXN0eWxlIHx8ICFzdHlsZS5leHRlbmQpIHJldHVyblxuXG4gICAgdmFyIG5ld1N0eWxlID0ge31cblxuICAgIDsoZnVuY3Rpb24gZXh0ZW5kKHN0eWxlKSB7XG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKHN0eWxlLmV4dGVuZCkgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZS5leHRlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBleHRlbmQoc3R5bGUuZXh0ZW5kW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZS5leHRlbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcCA9PSAnZXh0ZW5kJykgZXh0ZW5kKHN0eWxlLmV4dGVuZC5leHRlbmQpXG4gICAgICAgICAgICAgICAgZWxzZSBuZXdTdHlsZVtwcm9wXSA9IHN0eWxlLmV4dGVuZFtwcm9wXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29weSBiYXNlIHN0eWxlLlxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgICAgICBpZiAocHJvcCAhPSAnZXh0ZW5kJykgbmV3U3R5bGVbcHJvcF0gPSBzdHlsZVtwcm9wXVxuICAgICAgICB9XG4gICAgfShzdHlsZSkpXG5cbiAgICBydWxlLnN0eWxlID0gbmV3U3R5bGVcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgdmVuZG9yID0gcmVxdWlyZSgnY3NzLXZlbmRvcicpXG5cbnZhciBLRVlGUkFNRVMgPSAnQGtleWZyYW1lcydcbnZhciBLRVlGUkFNRVNfTEVOR0hUID0gS0VZRlJBTUVTLmxlbmd0aFxuXG4vKipcbiAqIEFkZCB2ZW5kb3IgcHJlZml4IHRvIGEgcHJvcGVydHkgbmFtZSB3aGVuIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge1J1bGV9IHJ1bGVcbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICB2YXIgc3R5bGUgPSBydWxlLnN0eWxlXG5cbiAgICBpZiAocnVsZS5pc0F0UnVsZSAmJiBydWxlLnNlbGVjdG9yLnN1YnN0cigwLCBLRVlGUkFNRVNfTEVOR0hUKSA9PSBLRVlGUkFNRVMpIHtcbiAgICAgICAgcnVsZS5zZWxlY3RvciA9ICdAJyArIHZlbmRvci5wcmVmaXguY3NzICsgJ2tleWZyYW1lcycgKyBydWxlLnNlbGVjdG9yLnN1YnN0cihLRVlGUkFNRVNfTEVOR0hUKVxuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlW3Byb3BdXG5cbiAgICAgICAgdmFyIGNoYW5nZVByb3AgPSBmYWxzZVxuICAgICAgICB2YXIgc3VwcG9ydGVkUHJvcCA9IHZlbmRvci5zdXBwb3J0ZWRQcm9wZXJ0eShwcm9wKVxuICAgICAgICBpZiAoc3VwcG9ydGVkUHJvcCAmJiBzdXBwb3J0ZWRQcm9wICE9PSBwcm9wKSBjaGFuZ2VQcm9wID0gdHJ1ZVxuXG4gICAgICAgIHZhciBjaGFuZ2VWYWx1ZSA9IGZhbHNlXG4gICAgICAgIHZhciBzdXBwb3J0ZWRWYWx1ZSA9IHZlbmRvci5zdXBwb3J0ZWRWYWx1ZShzdXBwb3J0ZWRQcm9wLCB2YWx1ZSlcbiAgICAgICAgaWYgKHN1cHBvcnRlZFZhbHVlICYmIHN1cHBvcnRlZFZhbHVlICE9PSB2YWx1ZSkgY2hhbmdlVmFsdWUgPSB0cnVlXG5cbiAgICAgICAgaWYgKGNoYW5nZVByb3AgfHwgY2hhbmdlVmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VQcm9wKSBkZWxldGUgc3R5bGVbcHJvcF1cbiAgICAgICAgICAgIHN0eWxlW3N1cHBvcnRlZFByb3BdID0gc3VwcG9ydGVkVmFsdWVcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFZlbmRvciBwcmVmaXggc3RyaW5nIGZvciB0aGUgY3VycmVudCBicm93c2VyLlxuICpcbiAqIEB0eXBlIHt7anM6IFN0cmluZywgY3NzOiBTdHJpbmd9fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5wcmVmaXggPSByZXF1aXJlKCcuL2xpYi9wcmVmaXgnKVxuXG4vKipcbiAqIFRlc3QgaWYgYSBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQsIHJldHVybnMgcHJvcGVydHkgd2l0aCB2ZW5kb3JcbiAqIHByZWZpeCBpZiByZXF1aXJlZCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BcbiAqIEByZXR1cm4ge1N0cmluZ3xCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5zdXBwb3J0ZWRQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vbGliL3N1cHBvcnRlZC1wcm9wZXJ0eScpXG5cbi8qKlxuICogUmV0dXJucyBwcmVmaXhlZCB2YWx1ZSBpZiBuZWVkZWQuIFJldHVybnMgYGZhbHNlYCBpZiB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd8Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cbiBleHBvcnRzLnN1cHBvcnRlZFZhbHVlID0gcmVxdWlyZSgnLi9saWIvc3VwcG9ydGVkLXZhbHVlJylcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgcmVnRXhwID0gL1stXFxzXSsoLik/L2dcblxuLyoqXG4gKiBDb252ZXJ0IGRhc2ggc2VwYXJhdGVkIHN0cmluZ3MgdG8gY2FtZWwgY2FzZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShyZWdFeHAsIHRvVXBwZXIpXG59XG5cbmZ1bmN0aW9uIHRvVXBwZXIobWF0Y2gsIGMpIHtcbiAgICByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnXG59XG5cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEV4cG9ydCBqYXZhc2NyaXB0IHN0eWxlIGFuZCBjc3Mgc3R5bGUgdmVuZG9yIHByZWZpeGVzLlxuICogQmFzZWQgb24gXCJ0cmFuc2Zvcm1cIiBzdXBwb3J0IHRlc3QuXG4gKi9cblxudmFyIGpzQ3NzTWFwID0ge1xuICAgIFdlYmtpdDogJy13ZWJraXQtJyxcbiAgICBNb3o6ICctbW96LScsXG4gICAgLy8gSUUgZGlkIGl0IHdyb25nIGFnYWluIC4uLlxuICAgIG1zOiAnLW1zLScsXG4gICAgTzogJy1vLSdcbn1cblxudmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpLnN0eWxlXG52YXIgdGVzdFByb3AgPSAnVHJhbnNmb3JtJ1xuXG5mb3IgKHZhciBqcyBpbiBqc0Nzc01hcCkge1xuICAgIGlmICgoanMgKyB0ZXN0UHJvcCkgaW4gc3R5bGUpIHtcbiAgICAgICAgZXhwb3J0cy5qcyA9IGpzXG4gICAgICAgIGV4cG9ydHMuY3NzID0ganNDc3NNYXBbanNdXG4gICAgICAgIGJyZWFrXG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBwcmVmaXggPSByZXF1aXJlKCcuL3ByZWZpeCcpXG52YXIgY2FtZWxpemUgPSByZXF1aXJlKCcuL2NhbWVsaXplJylcblxudmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG5cbi8qKlxuICogV2UgdGVzdCBldmVyeSBwcm9wZXJ0eSBvbiB2ZW5kb3IgcHJlZml4IHJlcXVpcmVtZW50LlxuICogT25jZSB0ZXN0ZWQsIHJlc3VsdCBpcyBjYWNoZWQuIEl0IGdpdmVzIHVzIHVwIHRvIDcwJSBwZXJmIGJvb3N0LlxuICogaHR0cDovL2pzcGVyZi5jb20vZWxlbWVudC1zdHlsZS1vYmplY3QtYWNjZXNzLXZzLXBsYWluLW9iamVjdFxuICpcbiAqIFByZWZpbGwgY2FjaGUgd2l0aCBrbm93biBjc3MgcHJvcGVydGllcyB0byByZWR1Y2UgYW1vdW50IG9mXG4gKiBwcm9wZXJ0aWVzIHdlIG5lZWQgdG8gZmVhdHVyZSB0ZXN0IGF0IHJ1bnRpbWUuXG4gKiBodHRwOi8vZGF2aWR3YWxzaC5uYW1lL3ZlbmRvci1wcmVmaXhcbiAqL1xudmFyIGNhY2hlID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJycpXG4gICAgdmFyIGNhY2hlID0ge31cblxuICAgIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgICAgICBjYWNoZVtjb21wdXRlZFtrZXldXSA9IGNvbXB1dGVkW2tleV1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVcbn0oKSlcblxuLyoqXG4gKiBUZXN0IGlmIGEgcHJvcGVydHkgaXMgc3VwcG9ydGVkLCByZXR1cm5zIHN1cHBvcnRlZCBwcm9wZXJ0eSB3aXRoIHZlbmRvclxuICogcHJlZml4IGlmIHJlcXVpcmVkLiBSZXR1cm5zIGBmYWxzZWAgaWYgbm90IHN1cHBvcnRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBkYXNoIHNlcGFyYXRlZFxuICogQHJldHVybiB7U3RyaW5nfEJvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgLy8gV2UgaGF2ZSBub3QgdGVzdGVkIHRoaXMgcHJvcCB5ZXQsIGxldHMgZG8gdGhlIHRlc3QuXG4gICAgaWYgKGNhY2hlW3Byb3BdICE9IG51bGwpIHJldHVybiBjYWNoZVtwcm9wXVxuXG4gICAgLy8gQ2FtZWxpemF0aW9uIGlzIHJlcXVpcmVkIGJlY2F1c2Ugd2UgY2FuJ3QgdGVzdCB1c2luZ1xuICAgIC8vIGNzcyBzeW50YXggZm9yIGUuZy4gaW4gRkYuXG4gICAgLy8gVGVzdCBpZiBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgYXMgaXQgaXMuXG4gICAgaWYgKGNhbWVsaXplKHByb3ApIGluIGVsLnN0eWxlKSB7XG4gICAgICAgIGNhY2hlW3Byb3BdID0gcHJvcFxuICAgIC8vIFRlc3QgaWYgcHJvcGVydHkgaXMgc3VwcG9ydGVkIHdpdGggdmVuZG9yIHByZWZpeC5cbiAgICB9IGVsc2UgaWYgKChwcmVmaXguanMgKyBjYW1lbGl6ZSgnLScgKyBwcm9wKSkgaW4gZWwuc3R5bGUpIHtcbiAgICAgICAgY2FjaGVbcHJvcF0gPSBwcmVmaXguY3NzICsgcHJvcFxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhY2hlW3Byb3BdID0gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVbcHJvcF1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgcHJlZml4ID0gcmVxdWlyZSgnLi9wcmVmaXgnKVxuXG52YXIgY2FjaGUgPSB7fVxuXG52YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcblxuLyoqXG4gKiBSZXR1cm5zIHByZWZpeGVkIHZhbHVlIGlmIG5lZWRlZC4gUmV0dXJucyBgZmFsc2VgIGlmIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ3xCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocHJvcGVydHksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJyB8fCAhaXNOYU4ocGFyc2VJbnQodmFsdWUsIDEwKSkpIHJldHVybiB2YWx1ZVxuXG4gICAgdmFyIGNhY2hlS2V5ID0gcHJvcGVydHkgKyB2YWx1ZVxuXG4gICAgaWYgKGNhY2hlW2NhY2hlS2V5XSAhPSBudWxsKSByZXR1cm4gY2FjaGVbY2FjaGVLZXldXG5cbiAgICAvLyBUZXN0IHZhbHVlIGFzIGl0IGlzLlxuICAgIGVsLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlXG5cbiAgICAvLyBWYWx1ZSBpcyBzdXBwb3J0ZWQgYXMgaXQgaXMuXG4gICAgaWYgKGVsLnN0eWxlW3Byb3BlcnR5XSA9PSB2YWx1ZSkge1xuICAgICAgICBjYWNoZVtjYWNoZUtleV0gPSB2YWx1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRlc3QgdmFsdWUgd2l0aCB2ZW5kb3IgcHJlZml4LlxuICAgICAgICB2YWx1ZSA9IHByZWZpeC5jc3MgKyB2YWx1ZVxuICAgICAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZVxuXG4gICAgICAgIC8vIFZhbHVlIGlzIHN1cHBvcnRlZCB3aXRoIHZlbmRvciBwcmVmaXguXG4gICAgICAgIGlmIChlbC5zdHlsZVtwcm9wZXJ0eV0gPT0gdmFsdWUpIGNhY2hlW2NhY2hlS2V5XSA9IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKCFjYWNoZVtjYWNoZUtleV0pIGNhY2hlW2NhY2hlS2V5XSA9IGZhbHNlXG5cbiAgICByZXR1cm4gY2FjaGVbY2FjaGVLZXldXG59XG4iLCIvKipcbiAqIFN0eWxlU2hlZXRzIHdyaXR0ZW4gaW4gamF2YXNjcmlwdC5cbiAqXG4gKiBAY29weXJpZ2h0IE9sZWcgU2xvYm9kc2tvaSAyMDE0XG4gKiBAd2Vic2l0ZSBodHRwczovL2dpdGh1Yi5jb20vanNzdHlsZXMvanNzXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4JylcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgcGx1Z2lucyA9IHJlcXVpcmUoJy4vcGx1Z2lucycpXG5cbnZhciB1aWQgPSAwXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuLyoqXG4gKiBSdWxlIGlzIHNlbGVjdG9yICsgc3R5bGUgaGFzaC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW3NlbGVjdG9yXVxuICogQHBhcmFtIHtPYmplY3R9IFtzdHlsZV0gZGVjbGFyYXRpb25zIGJsb2NrXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBSdWxlKHNlbGVjdG9yLCBzdHlsZSwgb3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgb3B0aW9ucyA9IHN0eWxlXG4gICAgICAgIHN0eWxlID0gc2VsZWN0b3JcbiAgICAgICAgc2VsZWN0b3IgPSBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5pZCA9IFJ1bGUudWlkKytcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lZCA9PSBudWxsKSB0aGlzLm9wdGlvbnMubmFtZWQgPSB0cnVlXG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yXG4gICAgICAgIHRoaXMuaXNBdFJ1bGUgPSBzZWxlY3RvclswXSA9PSAnQCdcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzQXRSdWxlID0gZmFsc2VcbiAgICAgICAgdGhpcy5jbGFzc05hbWUgPSBSdWxlLk5BTUVTUEFDRV9QUkVGSVggKyAnLScgKyB0aGlzLmlkXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSAnLicgKyB0aGlzLmNsYXNzTmFtZVxuICAgIH1cblxuICAgIHRoaXMuc3R5bGUgPSBzdHlsZVxuICAgIC8vIFdpbGwgYmUgc2V0IGJ5IFN0eWxlU2hlZXQjbGluayBpZiBsaW5rIG9wdGlvbiBpcyB0cnVlLlxuICAgIHRoaXMuQ1NTUnVsZSA9IG51bGxcbiAgICAvLyBXaGVuIGF0LXJ1bGUgaGFzIHN1YiBydWxlcy5cbiAgICB0aGlzLnJ1bGVzID0gbnVsbFxuICAgIGlmICh0aGlzLmlzQXRSdWxlICYmIHRoaXMuc3R5bGUpIHRoaXMuZXh0cmFjdEF0UnVsZXMoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1bGVcblxuLyoqXG4gKiBDbGFzcyBuYW1lIHByZWZpeCB3aGVuIGdlbmVyYXRlZC5cbiAqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJ1bGUuTkFNRVNQQUNFX1BSRUZJWCA9ICdqc3MnXG5cbi8qKlxuICogSW5kZW50YXRpb24gc3RyaW5nIGZvciBmb3JtYXR0aW5nIHRvU3RyaW5nIG91dHB1dC5cbiAqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJ1bGUuSU5ERU5UQVRJT04gPSAnICAnXG5cbi8qKlxuICogVW5pcXVlIGlkLCByaWdodCBub3cganVzdCBhIGNvdW50ZXIsIGJlY2F1c2UgdGhlcmUgaXMgbm8gbmVlZCBmb3IgYmV0dGVyIHVpZC5cbiAqXG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJ1bGUudWlkID0gMFxuXG4vKipcbiAqIEdldCBvciBzZXQgYSBzdHlsZSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBbdmFsdWVdXG4gKiBAcmV0dXJuIHtSdWxlfFN0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SdWxlLnByb3RvdHlwZS5wcm9wID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gICAgLy8gSXRzIGEgc2V0dGVyLlxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZSkgdGhpcy5zdHlsZSA9IHt9XG4gICAgICAgIHRoaXMuc3R5bGVbbmFtZV0gPSB2YWx1ZVxuICAgICAgICAvLyBJZiBsaW5rZWQgb3B0aW9uIGluIFN0eWxlU2hlZXQgaXMgbm90IHBhc3NlZCwgQ1NTUnVsZSBpcyBub3QgZGVmaW5lZC5cbiAgICAgICAgaWYgKHRoaXMuQ1NTUnVsZSkgdGhpcy5DU1NSdWxlLnN0eWxlW25hbWVdID0gdmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvLyBJdHMgYSBnZXR0ZXIuXG4gICAgaWYgKHRoaXMuc3R5bGUpIHZhbHVlID0gdGhpcy5zdHlsZVtuYW1lXVxuXG4gICAgLy8gUmVhZCB0aGUgdmFsdWUgZnJvbSB0aGUgRE9NIGlmIGl0cyBub3QgY2FjaGVkLlxuICAgIGlmICh2YWx1ZSA9PSBudWxsICYmIHRoaXMuQ1NTUnVsZSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuQ1NTUnVsZS5zdHlsZVtuYW1lXVxuICAgICAgICAvLyBDYWNoZSB0aGUgdmFsdWUgYWZ0ZXIgd2UgaGF2ZSBnb3QgaXQgZnJvbSB0aGUgRE9NIG9uY2UuXG4gICAgICAgIHRoaXMuc3R5bGVbbmFtZV0gPSB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxufVxuXG4vKipcbiAqIEFkZCBjaGlsZCBydWxlLiBSZXF1aXJlZCBmb3IgcGx1Z2lucyBsaWtlIFwibmVzdGVkXCIuXG4gKiBTdHlsZVNoZWV0IHdpbGwgcmVuZGVyIHRoZW0gYXMgYSBzZXBhcmF0ZSBydWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIHJ1bGUgb3B0aW9uc1xuICogQHJldHVybiB7UnVsZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SdWxlLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIChzZWxlY3Rvciwgc3R5bGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4pIHRoaXMuY2hpbGRyZW4gPSB7fVxuICAgIHRoaXMuY2hpbGRyZW5bc2VsZWN0b3JdID0ge1xuICAgICAgICBzdHlsZTogc3R5bGUsXG4gICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEFkZCBjaGlsZCBydWxlLiBSZXF1aXJlZCBmb3IgcGx1Z2lucyBsaWtlIFwibmVzdGVkXCIuXG4gKiBTdHlsZVNoZWV0IHdpbGwgcmVuZGVyIHRoZW0gYXMgYSBzZXBhcmF0ZSBydWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUuZXh0cmFjdEF0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnJ1bGVzKSB0aGlzLnJ1bGVzID0ge31cblxuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5zdHlsZSkge1xuICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlW25hbWVdXG4gICAgICAgIC8vIE5vdCBhIG5lc3RlZCBydWxlLlxuICAgICAgICBpZiAodHlwZW9mIHN0eWxlID09ICdzdHJpbmcnKSBicmVha1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLm9wdGlvbnMubmFtZWQgPyB1bmRlZmluZWQgOiBuYW1lXG4gICAgICAgIHZhciBydWxlID0gdGhpcy5ydWxlc1tuYW1lXSA9IG5ldyBSdWxlKHNlbGVjdG9yLCBzdHlsZSwgdGhpcy5vcHRpb25zKVxuICAgICAgICBwbHVnaW5zLnJ1bihydWxlKVxuICAgICAgICBkZWxldGUgdGhpcy5zdHlsZVtuYW1lXVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQXBwbHkgcnVsZSB0byBhbiBlbGVtZW50IGlubGluZS5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5SdWxlLnByb3RvdHlwZS5hcHBseVRvID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuc3R5bGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zdHlsZVtwcm9wXVxuICAgICAgICBpZiAodG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZVtpXVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtwcm9wXSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBydWxlIHRvIGNzcyBzdHJpbmcuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGVcblxuICAgIC8vIEF0IHJ1bGVzIGxpa2UgQGNoYXJzZXRcbiAgICBpZiAodGhpcy5pc0F0UnVsZSAmJiAhdGhpcy5zdHlsZSAmJiAhdGhpcy5ydWxlcykgcmV0dXJuIHRoaXMuc2VsZWN0b3IgKyAnOydcblxuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG4gICAgaWYgKG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCA9PSBudWxsKSBvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwgPSAwXG5cbiAgICB2YXIgc3RyID0gaW5kZW50KG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCwgdGhpcy5zZWxlY3RvciArICcgeycpXG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHN0eWxlW3Byb3BdXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gZ2VuZXJhdGUgbXVsdGlwbGUgc3R5bGUgd2l0aCBpZGVudGljYWwgcHJvcGVydHkgbmFtZXMuXG4gICAgICAgIGlmICh0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3RyICs9ICdcXG4nICsgaW5kZW50KG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCArIDEsIHByb3AgKyAnOiAnICsgdmFsdWVbaV0gKyAnOycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHIgKz0gJ1xcbicgKyBpbmRlbnQob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsICsgMSwgcHJvcCArICc6ICcgKyB2YWx1ZSArICc7JylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdlIGFyZSBoYXZlIGFuIGF0LXJ1bGUgd2l0aCBuZXN0ZWQgc3RhdGVtZW50cy5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvQXQtcnVsZVxuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5ydWxlcykge1xuICAgICAgICB2YXIgcnVsZVN0ciA9IHRoaXMucnVsZXNbbmFtZV0udG9TdHJpbmcoe1xuICAgICAgICAgICAgaW5kZW50YXRpb25MZXZlbDogb3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsICsgMVxuICAgICAgICB9KVxuICAgICAgICBzdHIgKz0gJ1xcbicgKyBpbmRlbnQob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsLCBydWxlU3RyKVxuICAgIH1cblxuICAgIHN0ciArPSAnXFxuJyArIGluZGVudChvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwsICd9JylcblxuICAgIHJldHVybiBzdHJcbn1cblxuLyoqXG4gKiBSZXR1cm5zIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIHJ1bGUuXG4gKiBOZXN0ZWQgcnVsZXMsIGF0LXJ1bGVzIGFuZCBhcnJheSB2YWx1ZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdHlsZSA9IHt9XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHRoaXMuc3R5bGUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zdHlsZVtwcm9wXVxuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuICAgICAgICBpZiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBzdHlsZVtwcm9wXSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVcbn1cblxuLyoqXG4gKiBJbmRlbnQgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGluZGVudChsZXZlbCwgc3RyKSB7XG4gICAgdmFyIGluZGVudFN0ciA9ICcnXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZXZlbDsgaSsrKSBpbmRlbnRTdHIgKz0gUnVsZS5JTkRFTlRBVElPTlxuICAgIHJldHVybiBpbmRlbnRTdHIgKyBzdHJcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgUnVsZSA9IHJlcXVpcmUoJy4vUnVsZScpXG52YXIgcGx1Z2lucyA9IHJlcXVpcmUoJy4vcGx1Z2lucycpXG5cbi8qKlxuICogU3R5bGVTaGVldCBhYnN0cmFjdGlvbiwgY29udGFpbnMgcnVsZXMsIGluamVjdHMgc3R5bGVzaGVldCBpbnRvIGRvbS5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBtZWRpYWAgc3R5bGUgZWxlbWVudCBhdHRyaWJ1dGVcbiAqICAtIGB0aXRsZWAgc3R5bGUgZWxlbWVudCBhdHRyaWJ1dGVcbiAqICAtIGB0eXBlYCBzdHlsZSBlbGVtZW50IGF0dHJpYnV0ZVxuICogIC0gYG5hbWVkYCB0cnVlIGJ5IGRlZmF1bHQgLSBrZXlzIGFyZSBuYW1lcywgc2VsZWN0b3JzIHdpbGwgYmUgZ2VuZXJhdGVkLFxuICogICAgaWYgZmFsc2UgLSBrZXlzIGFyZSBnbG9iYWwgc2VsZWN0b3JzLlxuICogIC0gYGxpbmtgIGxpbmsganNzIFJ1bGUgaW5zdGFuY2VzIHdpdGggRE9NIENTU1J1bGUgaW5zdGFuY2VzIHNvIHRoYXQgc3R5bGVzLFxuICogIGNhbiBiZSBtb2RpZmllZCBkeW5hbWljYWxseSwgZmFsc2UgYnkgZGVmYXVsdCBiZWNhdXNlIGl0IGhhcyBzb21lIHBlcmZvcm1hbmNlIGNvc3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtydWxlc10gb2JqZWN0IHdpdGggc2VsZWN0b3JzIGFuZCBkZWNsYXJhdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIFN0eWxlU2hlZXQocnVsZXMsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5uYW1lZCA9PSBudWxsKSB0aGlzLm9wdGlvbnMubmFtZWQgPSB0cnVlXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuYXR0YWNoZWQgPSBmYWxzZVxuICAgIHRoaXMubWVkaWEgPSB0aGlzLm9wdGlvbnMubWVkaWFcbiAgICB0aGlzLnR5cGUgPSB0aGlzLm9wdGlvbnMudHlwZVxuICAgIHRoaXMudGl0bGUgPSB0aGlzLm9wdGlvbnMudGl0bGVcbiAgICB0aGlzLnJ1bGVzID0ge31cbiAgICAvLyBPbmx5IHdoZW4gb3B0aW9ucy5uYW1lZDogdHJ1ZS5cbiAgICB0aGlzLmNsYXNzZXMgPSB7fVxuICAgIHRoaXMuZGVwbG95ZWQgPSBmYWxzZVxuICAgIHRoaXMubGlua2VkID0gZmFsc2VcblxuICAgIC8vIERvbid0IGNyZWF0ZSBlbGVtZW50IGlmIHdlIGFyZSBub3QgaW4gYSBicm93c2VyIGVudmlyb25tZW50LlxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5jcmVhdGVFbGVtZW50KClcbiAgICB9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcnVsZXMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVSdWxlcyhrZXksIHJ1bGVzW2tleV0pXG4gICAgfVxufVxuXG5TdHlsZVNoZWV0LkFUVFJJQlVURVMgPSBbJ3RpdGxlJywgJ3R5cGUnLCAnbWVkaWEnXVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0eWxlU2hlZXRcblxuLyoqXG4gKiBJbnNlcnQgc3R5bGVzaGVldCBlbGVtZW50IHRvIHJlbmRlciB0cmVlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHJldHVybiB0aGlzXG5cbiAgICBpZiAoIXRoaXMuZGVwbG95ZWQpIHtcbiAgICAgICAgdGhpcy5kZXBsb3koKVxuICAgICAgICB0aGlzLmRlcGxveWVkID0gdHJ1ZVxuICAgIH1cblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KVxuXG4gICAgLy8gQmVmb3JlIGVsZW1lbnQgaXMgYXR0YWNoZWQgdG8gdGhlIGRvbSBydWxlcyBhcmUgbm90IGNyZWF0ZWQuXG4gICAgaWYgKCF0aGlzLmxpbmtlZCAmJiB0aGlzLm9wdGlvbnMubGluaykge1xuICAgICAgICB0aGlzLmxpbmsoKVxuICAgICAgICB0aGlzLmxpbmtlZCA9IHRydWVcbiAgICB9XG5cbiAgICB0aGlzLmF0dGFjaGVkID0gdHJ1ZVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBSZW1vdmUgc3R5bGVzaGVldCBlbGVtZW50IGZyb20gcmVuZGVyIHRyZWUuXG4gKlxuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuYXR0YWNoZWQpIHJldHVybiB0aGlzXG5cbiAgICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQpXG4gICAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlXG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIERlcGxveSBzdHlsZXMgdG8gdGhlIGVsZW1lbnQuXG4gKlxuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICdcXG4nICsgdGhpcy50b1N0cmluZygpICsgJ1xcbidcblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogRmluZCBDU1NSdWxlIG9iamVjdHMgaW4gdGhlIERPTSBhbmQgbGluayB0aGVtIGluIHRoZSBjb3JyZXNwb25kaW5nIFJ1bGUgaW5zdGFuY2UuXG4gKlxuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBDU1NSdWxlTGlzdCA9IHRoaXMuZWxlbWVudC5zaGVldC5jc3NSdWxlc1xuICAgIHZhciBydWxlcyA9IHRoaXMucnVsZXNcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ1NTUnVsZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIENTU1J1bGUgPSBDU1NSdWxlTGlzdFtpXVxuICAgICAgICB2YXIgcnVsZSA9IHJ1bGVzW0NTU1J1bGUuc2VsZWN0b3JUZXh0XVxuICAgICAgICBpZiAocnVsZSkgcnVsZS5DU1NSdWxlID0gQ1NTUnVsZVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQWRkIGEgcnVsZSB0byB0aGUgY3VycmVudCBzdHlsZXNoZWV0LiBXaWxsIGluc2VydCBhIHJ1bGUgYWxzbyBhZnRlciB0aGUgc3R5bGVzaGVldFxuICogaGFzIGJlZW4gcmVuZGVyZWQgZmlyc3QgdGltZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW2tleV0gY2FuIGJlIHNlbGVjdG9yIG9yIG5hbWUgaWYgYG9wdGlvbnMubmFtZWRgIGlzIHRydWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZSBwcm9wZXJ0eS92YWx1ZSBoYXNoXG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuYWRkUnVsZSA9IGZ1bmN0aW9uIChrZXksIHN0eWxlKSB7XG4gICAgdmFyIHJ1bGVzID0gdGhpcy5jcmVhdGVSdWxlcyhrZXksIHN0eWxlKVxuXG4gICAgLy8gRG9uJ3QgaW5zZXJ0IHJ1bGUgZGlyZWN0bHkgaWYgdGhlcmUgaXMgbm8gc3RyaW5naWZpZWQgdmVyc2lvbiB5ZXQuXG4gICAgLy8gSXQgd2lsbCBiZSBpbnNlcnRlZCBhbGwgdG9nZXRoZXIgd2hlbiAuYXR0YWNoIGlzIGNhbGxlZC5cbiAgICBpZiAodGhpcy5kZXBsb3llZCkge1xuICAgICAgICB2YXIgc2hlZXQgPSB0aGlzLmVsZW1lbnQuc2hlZXRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5leHRJbmRleCA9IHNoZWV0LmNzc1J1bGVzLmxlbmd0aFxuICAgICAgICAgICAgdmFyIHJ1bGUgPSBydWxlc1tpXVxuICAgICAgICAgICAgc2hlZXQuaW5zZXJ0UnVsZShydWxlLnRvU3RyaW5nKCksIG5leHRJbmRleClcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGluaykgcnVsZS5DU1NSdWxlID0gc2hlZXQuY3NzUnVsZXNbbmV4dEluZGV4XVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXBsb3koKVxuICAgIH1cblxuICAgIHJldHVybiBydWxlc1xufVxuXG4vKipcbiAqIENyZWF0ZSBydWxlcywgd2lsbCByZW5kZXIgYWxzbyBhZnRlciBzdHlsZXNoZWV0IHdhcyByZW5kZXJlZCB0aGUgZmlyc3QgdGltZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcnVsZXMga2V5OnN0eWxlIGhhc2guXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fSB0aGlzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5hZGRSdWxlcyA9IGZ1bmN0aW9uIChydWxlcykge1xuICAgIGZvciAodmFyIGtleSBpbiBydWxlcykge1xuICAgICAgICB0aGlzLmFkZFJ1bGUoa2V5LCBydWxlc1trZXldKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogR2V0IGEgcnVsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IGNhbiBiZSBzZWxlY3RvciBvciBuYW1lIGlmIGBuYW1lZGAgaXMgdHJ1ZS5cbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5nZXRSdWxlID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLnJ1bGVzW2tleV1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IHJ1bGVzIHRvIGEgY3NzIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gJydcbiAgICB2YXIgcnVsZXMgPSB0aGlzLnJ1bGVzXG4gICAgdmFyIHN0cmluZ2lmaWVkID0ge31cbiAgICBmb3IgKHZhciBrZXkgaW4gcnVsZXMpIHtcbiAgICAgICAgdmFyIHJ1bGUgPSBydWxlc1trZXldXG4gICAgICAgIC8vIFdlIGhhdmUgdGhlIHNhbWUgcnVsZSByZWZlcmVuY2VkIHR3aWNlIGlmIHVzaW5nIG5hbWVkIHVybGVzLlxuICAgICAgICAvLyBCeSBuYW1lIGFuZCBieSBzZWxlY3Rvci5cbiAgICAgICAgaWYgKHN0cmluZ2lmaWVkW3J1bGUuaWRdKSBjb250aW51ZVxuICAgICAgICBpZiAoc3RyKSBzdHIgKz0gJ1xcbidcbiAgICAgICAgc3RyICs9IHJ1bGVzW2tleV0udG9TdHJpbmcoKVxuICAgICAgICBzdHJpbmdpZmllZFtydWxlLmlkXSA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcnVsZSwgd2lsbCBub3QgcmVuZGVyIGFmdGVyIHN0eWxlc2hlZXQgd2FzIHJlbmRlcmVkIHRoZSBmaXJzdCB0aW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc2VsZWN0b3JdIGlmIHlvdSBkb24ndCBwYXNzIHNlbGVjdG9yIC0gaXQgd2lsbCBiZSBnZW5lcmF0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3R5bGVdIGRlY2xhcmF0aW9ucyBibG9ja1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBydWxlIG9wdGlvbnNcbiAqIEByZXR1cm4ge0FycmF5fSBydWxlIGNhbiBjb250YWluIGNoaWxkIHJ1bGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuY3JlYXRlUnVsZXMgPSBmdW5jdGlvbiAoa2V5LCBzdHlsZSwgb3B0aW9ucykge1xuICAgIHZhciBydWxlcyA9IFtdXG4gICAgdmFyIHNlbGVjdG9yLCBuYW1lXG5cbiAgICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuICAgIHZhciBuYW1lZCA9IHRoaXMub3B0aW9ucy5uYW1lZFxuICAgIC8vIFNjb3BlIG9wdGlvbnMgb3ZlcndyaXRlIGluc3RhbmNlIG9wdGlvbnMuXG4gICAgaWYgKG9wdGlvbnMubmFtZWQgIT0gbnVsbCkgbmFtZWQgPSBvcHRpb25zLm5hbWVkXG5cbiAgICBpZiAobmFtZWQpIG5hbWUgPSBrZXlcbiAgICBlbHNlIHNlbGVjdG9yID0ga2V5XG5cbiAgICB2YXIgcnVsZSA9IG5ldyBSdWxlKHNlbGVjdG9yLCBzdHlsZSwge1xuICAgICAgICBzaGVldDogdGhpcyxcbiAgICAgICAgbmFtZWQ6IG5hbWVkLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgfSlcbiAgICBydWxlcy5wdXNoKHJ1bGUpXG5cbiAgICB0aGlzLnJ1bGVzW3J1bGUuc2VsZWN0b3JdID0gcnVsZVxuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIHRoaXMucnVsZXNbbmFtZV0gPSBydWxlXG4gICAgICAgIHRoaXMuY2xhc3Nlc1tuYW1lXSA9IHJ1bGUuY2xhc3NOYW1lXG4gICAgfVxuXG4gICAgcGx1Z2lucy5ydW4ocnVsZSlcblxuICAgIGZvciAoa2V5IGluIHJ1bGUuY2hpbGRyZW4pIHtcbiAgICAgICAgcnVsZXMucHVzaCh0aGlzLmNyZWF0ZVJ1bGVzKFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgcnVsZS5jaGlsZHJlbltrZXldLnN0eWxlLFxuICAgICAgICAgICAgcnVsZS5jaGlsZHJlbltrZXldLm9wdGlvbnNcbiAgICAgICAgKSlcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXNcbn1cblxuLyoqXG4gKiBDcmVhdGUgc3R5bGUgc2hlZXQgZWxlbWVudC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG5cbiAgICBTdHlsZVNoZWV0LkFUVFJJQlVURVMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAodGhpc1tuYW1lXSkgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdGhpc1tuYW1lXSlcbiAgICB9LCB0aGlzKVxuXG4gICAgcmV0dXJuIGVsZW1lbnRcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgU3R5bGVTaGVldCA9IHJlcXVpcmUoJy4vU3R5bGVTaGVldCcpXG52YXIgUnVsZSA9IHJlcXVpcmUoJy4vUnVsZScpXG5cbmV4cG9ydHMuU3R5bGVTaGVldCA9IFN0eWxlU2hlZXRcblxuZXhwb3J0cy5SdWxlID0gUnVsZVxuXG5leHBvcnRzLnBsdWdpbnMgPSByZXF1aXJlKCcuL3BsdWdpbnMnKVxuXG4vKipcbiAqIENyZWF0ZSBhIHN0eWxlc2hlZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJ1bGVzIGlzIHNlbGVjdG9yOnN0eWxlIGhhc2guXG4gKiBAcGFyYW0ge09iamVjdH0gW25hbWVkXSBydWxlcyBoYXZlIG5hbWVzIGlmIHRydWUsIGNsYXNzIG5hbWVzIHdpbGwgYmUgZ2VuZXJhdGVkLlxuICogQHBhcmFtIHtPYmplY3R9IFthdHRyaWJ1dGVzXSBzdHlsZXNoZWV0IGVsZW1lbnQgYXR0cmlidXRlcy5cbiAqIEByZXR1cm4ge1N0eWxlU2hlZXR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmNyZWF0ZVN0eWxlU2hlZXQgPSBmdW5jdGlvbiAocnVsZXMsIG5hbWVkLCBhdHRyaWJ1dGVzKSB7XG4gICAgcmV0dXJuIG5ldyBTdHlsZVNoZWV0KHJ1bGVzLCBuYW1lZCwgYXR0cmlidXRlcylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBydWxlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBbc2VsZWN0b3JdXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGUgaXMgcHJvcGVydHk6dmFsdWUgaGFzaC5cbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmNyZWF0ZVJ1bGUgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHN0eWxlKSB7XG4gICAgdmFyIHJ1bGUgPSBuZXcgUnVsZShzZWxlY3Rvciwgc3R5bGUpXG4gICAgZXhwb3J0cy5wbHVnaW5zLnJ1bihydWxlKVxuICAgIHJldHVybiBydWxlXG59XG5cbi8qKlxuICogUmVnaXN0ZXIgcGx1Z2luLiBQYXNzZWQgZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIHdpdGggYSBydWxlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLnVzZSA9IGV4cG9ydHMucGx1Z2lucy51c2VcbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIFJlZ2lzdGVyZWQgcGx1Z2lucy5cbiAqXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLnJlZ2lzdHJ5ID0gW11cblxuLyoqXG4gKiBSZWdpc3RlciBwbHVnaW4uIFBhc3NlZCBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgd2l0aCBhIHJ1bGUgaW5zdGFuY2UuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMudXNlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgZXhwb3J0cy5yZWdpc3RyeS5wdXNoKGZuKVxufVxuXG4vKipcbiAqIEV4ZWN1dGUgYWxsIHJlZ2lzdGVyZWQgcGx1Z2lucy5cbiAqXG4gKiBAcGFyYW0ge1J1bGV9IHJ1bGVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnRzLnJ1biA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBvcnRzLnJlZ2lzdHJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGV4cG9ydHMucmVnaXN0cnlbaV0ocnVsZSlcbiAgICB9XG59XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlaXNlcXVhbCcpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJ2xvZGFzaC5fYmluZGNhbGxiYWNrJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICogZXF1aXZhbGVudC4gSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gY29tcGFyZSB2YWx1ZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCBjb21wYXJpc29ucyBhcmUgaGFuZGxlZCBieSB0aGUgbWV0aG9kXG4gKiBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwgb3RoZXIgWywgaW5kZXh8a2V5XSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIGNvbXBhcmluZyBhcnJheXMsIGJvb2xlYW5zLCBgRGF0ZWAgb2JqZWN0cyxcbiAqIG51bWJlcnMsIGBPYmplY3RgIG9iamVjdHMsIHJlZ2V4ZXMsIGFuZCBzdHJpbmdzLiBPYmplY3RzIGFyZSBjb21wYXJlZCBieVxuICogdGhlaXIgb3duLCBub3QgaW5oZXJpdGVkLCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuIEZ1bmN0aW9ucyBhbmQgRE9NIG5vZGVzXG4gKiBhcmUgKipub3QqKiBzdXBwb3J0ZWQuIFByb3ZpZGUgYSBjdXN0b21pemVyIGZ1bmN0aW9uIHRvIGV4dGVuZCBzdXBwb3J0XG4gKiBmb3IgY29tcGFyaW5nIG90aGVyIHZhbHVlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGFsaWFzIGVxXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSB2YWx1ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICogdmFyIG90aGVyID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIG9iamVjdCA9PSBvdGhlcjtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0VxdWFsKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGFycmF5ID0gWydoZWxsbycsICdnb29kYnllJ107XG4gKiB2YXIgb3RoZXIgPSBbJ2hpJywgJ2dvb2RieWUnXTtcbiAqXG4gKiBfLmlzRXF1YWwoYXJyYXksIG90aGVyLCBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAqICAgaWYgKF8uZXZlcnkoW3ZhbHVlLCBvdGhlcl0sIFJlZ0V4cC5wcm90b3R5cGUudGVzdCwgL15oKD86aXxlbGxvKSQvKSkge1xuICogICAgIHJldHVybiB0cnVlO1xuICogICB9XG4gKiB9KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIHRoaXNBcmcpIHtcbiAgY3VzdG9taXplciA9IHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicgPyBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgMykgOiB1bmRlZmluZWQ7XG4gIHZhciByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgb3RoZXIpIDogdW5kZWZpbmVkO1xuICByZXR1cm4gIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyKSA6ICEhcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRXF1YWw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuNyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXNhcnJheScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc3R5cGVkYXJyYXknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnbG9kYXNoLmtleXMnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnNvbWVgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2l0aG91dCBzdXBwb3J0IGZvciBgdGhpc2AgYmluZGluZ1xuICogYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNMb29zZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0KHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICBpZiAoIWlzTG9vc2UpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LCBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICAvLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBkZXRlY3RpbmcgY2lyY3VsYXIgcmVmZXJlbmNlcyBzZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyNKTy5cbiAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gb2JqZWN0KSB7XG4gICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF0gPT0gb3RoZXI7XG4gICAgfVxuICB9XG4gIC8vIEFkZCBgb2JqZWN0YCBhbmQgYG90aGVyYCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIHN0YWNrQS5wdXNoKG9iamVjdCk7XG4gIHN0YWNrQi5wdXNoKG90aGVyKTtcblxuICB2YXIgcmVzdWx0ID0gKG9iaklzQXJyID8gZXF1YWxBcnJheXMgOiBlcXVhbE9iamVjdHMpKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuXG4gIHN0YWNrQS5wb3AoKTtcbiAgc3RhY2tCLnBvcCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIGFycmF5cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzTG9vc2UgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIoaXNMb29zZSA/IG90aFZhbHVlIDogYXJyVmFsdWUsIGlzTG9vc2UgPyBhcnJWYWx1ZSA6IG90aFZhbHVlLCBpbmRleCkgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKGlzTG9vc2UpIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIShhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWUgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgIC8vIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbC5cbiAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICByZXR1cm4gKG9iamVjdCAhPSArb2JqZWN0KVxuICAgICAgICA/IG90aGVyICE9ICtvdGhlclxuICAgICAgICA6IG9iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MgcHJpbWl0aXZlcyBhbmQgc3RyaW5nXG4gICAgICAvLyBvYmplY3RzIGFzIGVxdWFsLiBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTUuMTAuNi40IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBvYmplY3RzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc0xvb3NlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzTG9vc2UgPyBrZXkgaW4gb3RoZXIgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB2YXIgc2tpcEN0b3IgPSBpc0xvb3NlO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihpc0xvb3NlID8gb3RoVmFsdWUgOiBvYmpWYWx1ZSwgaXNMb29zZT8gb2JqVmFsdWUgOiBvdGhWYWx1ZSwga2V5KSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIDogcmVzdWx0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKCFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4zIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQncyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAoZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KSlcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBnZXROYXRpdmUoQXJyYXksICdpc0FycmF5Jyk7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZztcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5fZ2V0bmF0aXZlJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCdsb2Rhc2guaXNhcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL15cXGQrJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBnZXROYXRpdmUoT2JqZWN0LCAna2V5cycpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgQ3RvciA9IG9iamVjdCA9PSBudWxsID8gbnVsbCA6IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsIi8qKlxuICogbG9kYXNoIDMuOS4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCdzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjMgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHRoaXNBcmcgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuIl19
