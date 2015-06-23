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

  fonts : require('./common/fonts'),

  //setComponents : require('common/setComponents'), // optional function that returns a component object - use if the app components are dynamic based on screensize, device OS, etc

  components : require('./components'),

  pages: require('./pages'),

  data: {
    HeaderTitle: "Home"
  },

  // any custom methods/properties you want attached directly to the app object. the context will be the app object
  custom: {
    Models : {},
    Collections : {}
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

},{"./../../../lib":35,"./common/colors":2,"./common/fonts":12,"./common/modules/log":13,"./common/router_animations":14,"./common/startApp":16,"./common/styles":17,"./components":21,"./pages":27}],2:[function(require,module,exports){

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

},{"./../settings":15}],14:[function(require,module,exports){

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

},{}],15:[function(require,module,exports){

module.exports = {

  production: false

};

},{}],16:[function(require,module,exports){
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

},{"./modules/log":13,"async-lite":30}],17:[function(require,module,exports){

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

},{}],18:[function(require,module,exports){

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
      this.element.classList.remove("show");
      App.emit("faded-overlay:hit");
    }

  },

  appEvents: {

    'faded-overlay:show': function() {
      this.element.classList.add("show");
    },

    'faded-overlay:hide': function() {
      this.element.classList.remove("show");
    },

    'header-button:hit': function() {
      this.element.classList.add("show");
    }

  },

  extend: {},

  router: {
    beforeAnimate: function(data, callback) {

      callback();
    },

    duringAnimate: function(data) { // no callback

    }
  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the faded overlay element
    App.DOM.samson_faded_overlay = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the faded overlay element from the cache
    delete App.DOM.samson_faded_overlay;

    callback();

  }

};

},{}],19:[function(require,module,exports){

function setHeaderHeight() {
  var max = 200; min = 50;
  return (Math.floor(Math.random()*(max-min+1) + min)) + "px";
}

var header_height = "60px";// setHeaderHeight();

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

    "#samson_header_button": {
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

    'touch' : function(event) {
      console.log("Header Hit");
    },

    'touch #samson_header_button': function() {
      App.emit('header-button:hit');
    }

  },

  appEvents: {

    'app:initialized': function() {
      this.handleHeader("add");
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
      if (App.Router.pageCache[data.nextPage].fullscreen) {
        App.DOM[data.inactivePageElement].style.top = "";
        this.handleHeader("remove");
      } else {
        App.DOM[data.inactivePageElement].style.top = this.headerHeight;
        this.handleHeader("add");
      }

      callback();
    },

    duringAnimate: function(data) { // no callback
      this.setState({title: App.Data.HeaderTitle});
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

    if (!App.Data.HeaderTitle) {
      App.Data.HeaderTitle = "Home";
    }

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the header element
    App.DOM.samson_header = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the header element from the chache
    delete App.DOM.samson_header;

    callback();

  }

};

},{"./template.jade":20}],20:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (title) {
buf.push("<div id=\"samson_header_button\"><i class=\"fa fa-bars\"></i></div><div id=\"samson_header_title\">" + (jade.escape((jade_interp = title) == null ? '' : jade_interp)) + "</div>");}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
};
},{"jade/runtime":32}],21:[function(require,module,exports){

module.exports = {

  header : require('./header'),

  sideMenu : require('./sideMenu'),

  fadedOverlay : require('./fadedOverlay'),

  transparentOverlay : require('./transparentOverlay')

};

},{"./fadedOverlay":18,"./header":19,"./sideMenu":22,"./transparentOverlay":24}],22:[function(require,module,exports){

module.exports = {

  el: 'samson_sidemenu',
  template: require("./template.jade"),
  style: {

    "#samson_sidemenu": {
      "position": "absolute",
      "z-index": 11,
      "left": "-240px",
      "top": "60px",
      "bottom": "0",
      "width" : "240px",
      "background-color": Colors.gray,
      "transition": "all 0.2s ease-in-out",
      "Transform": "translate3d(0,0,0)"
    },

    "#samson_sidemenu.open": {
      "Transform": "translate3d(240px,0,0)"
    },

    ".sidemenu_item": {
      width: "100%",
      padding: "5px 0 5px 0",
      color: Colors.white,
      "text-align": "center",
      "font-size": "2rem"
    },

    ".sidemenu_item:active": {
      "background-color": Colors.turquoise
    }

  },

  domEvents: {

    'touch' : function(event) {
      console.log("SideMenu Hit");
    },

    'touch .sidemenu_item': function(event) {

      this.element.classList.remove("open");
      App.emit("faded-overlay:hide");

      var page = event.target.getAttribute("data-page");

      // only navigate if they aren't on the page
      if (page !== App.Router.currentPage) {
        App.Router.navigate(page, "right");
      }

    }

  },

  appEvents: {

    'header-button:hit': function() {
      this.handleSideMenu();
    },

    'faded-overlay:hit': function() {
      this.element.classList.remove("open");
    }

  },

  extend: {
    handleSideMenu: function() {

      // if the sidemenu is closed then open it, if open then close it
      if (this.element.classList.contains("open")) {
        this.element.classList.remove("open");
      } else {
        this.element.classList.add("open");
      }
    }
  },

  router: {
    beforeAnimate: function(data, callback) {

      callback();
    },

    duringAnimate: function(data) { // no callback

    }
  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {

      pages: [
        {page:"home", display:"Home"},
        {page:"login", display:"Login"}
      ]

    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the sidemenu element
    App.DOM.samson_sidemenu = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the sidemenu element from the cache
    delete App.DOM.samson_sidemenu;

    callback();

  }

};

},{"./template.jade":23}],23:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (pages, undefined) {
// iterate pages
;(function(){
  var $$obj = pages;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-page", item.page, true, false)) + " class=\"sidemenu_item\">" + (jade.escape((jade_interp = item.display) == null ? '' : jade_interp)) + "</div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div" + (jade.attr("data-page", item.page, true, false)) + " class=\"sidemenu_item\">" + (jade.escape((jade_interp = item.display) == null ? '' : jade_interp)) + "</div>");
    }

  }
}).call(this);
}.call(this,"pages" in locals_for_with?locals_for_with.pages:typeof pages!=="undefined"?pages:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
};
},{"jade/runtime":32}],24:[function(require,module,exports){

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
      console.log("Tranparent Overlay Hit");
      App.emit("transparent-overlay:hit");
    }

  },

  appEvents: {

    'transparent-overlay:show': function() {
      this.element.classList.add("show");
    },

    'transparent-overlay:hide': function() {
      this.element.classList.remove("show");
    }

  },

  extend: {},

  router: {

    beforeAnimate: function(data, callback) {

      this.element.classList.add("show");
      callback();
    },

    afterAnimate: function(data, callback) {
      this.element.classList.remove("show");
      callback();
    }

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the transparent overlay element
    App.DOM.samson_transparent_overlay = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the transparent overlay element from the cache
    delete App.DOM.samson_transparent_overlay;

    callback();

  }

};

},{}],25:[function(require,module,exports){

module.exports = {

  name: 'home',
  subPageOf: false,
  previousPage: false,
  template: require("./template.jade"),
  style: {

    "#home-page": {
      position: "absolute",
      width: "100%",
      height: "100%"
    },

    ".home-page-title": {
      "width": "100%",
      "font-size": "3rem",
      "text-align": "center",
      "color": Colors.turquoise
    }

  },

  domEvents : {

    'touch' : function(event, target) {
      console.log("Home Page hit");
    }

  },

  appEvents : {

  },

  extend : {

  },

  components : {

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

    App.Data.HeaderTitle = "Home";

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

},{"./template.jade":26}],26:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name) {
buf.push("<div class=\"home-page-title\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</div>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
};
},{"jade/runtime":32}],27:[function(require,module,exports){

module.exports = {

  home: require('./home'),

  login: require('./login')

};

},{"./home":25,"./login":28}],28:[function(require,module,exports){

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
      height: "100%"
    },

    ".login-page-title": {
      "width": "100%",
      "font-size": "3rem",
      "text-align": "center",
      "color": Colors.blue
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    'touch' : function(event, target) {
      console.log("Login Page hit");
    }

  },

  appEvents : {
  },

  setComponents : function() {

    var components = {};

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

    App.Data.HeaderTitle = "Login";

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

},{"./template.jade":29}],29:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name) {
buf.push("<div class=\"login-page-title\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</div>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
};
},{"jade/runtime":32}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){

},{}],32:[function(require,module,exports){
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

},{"fs":31}],33:[function(require,module,exports){
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

},{"./index":35,"./shared":40,"./utils":43,"jss":52}],34:[function(require,module,exports){

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

},{}],35:[function(require,module,exports){
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
var reserved = ["$", "DOM", "styleSheet", "baseStyle", "style", "components", "setComponents", "Router", "Pages", "on", "emit", "off"];

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

},{"./component":33,"./events":34,"./modules/quo.js":36,"./page":37,"./router":39,"./styles/base_styles":41,"./styles/reset":42,"./utils":43,"async-lite":44,"jss":52,"jss-extend":45,"jss-vendor-prefixer":46}],36:[function(require,module,exports){
/**
 * QuoJS - Micro #JavaScript Library for Mobile Devices.
 * @version v3.0.7
 * @link    http://quojs.tapquo.com
 * @author  Javi Jimenez Villar (@soyjavi) (https://twitter.com/soyjavi)
 * @license MIT
 */
(function(){"use strict";var t,n=[].indexOf||function(t){for(var n=0,e=this.length;e>n;n++)if(n in this&&this[n]===t)return n;return-1};t=function(){var t,n,e,r,i,u,o,a,c,l,s,f,h,d,p,v,g;return r=[],a=Object.prototype,o=/^\s*<(\w+|!)[^>]*>/,e=[1,9,11],n=/^\.([\w-]+)$/,u=/^#[\w\d-]+$/,s=/^[\w-]+$/,c=document.createElement("table"),l=document.createElement("tr"),i={tr:document.createElement("tbody"),tbody:c,thead:c,tfoot:c,td:l,th:l,"*":document.createElement("div")},t=function(n,e){var r;return n?"function"===t.toType(n)?t(document).ready(n):(r=p(n,e),v(r,n)):v()},t.query=function(t,e){var r;return n.test(e)?r=t.getElementsByClassName(e.replace(".","")):s.test(e)?r=t.getElementsByTagName(e):u.test(e)&&t===document?(r=t.getElementById(e.replace("#","")),r||(r=[])):r=t.querySelectorAll(e),r.nodeType?[r]:Array.prototype.slice.call(r)},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){var e,r;r=[];for(e in n)r.push(t[e]=n[e]);return r}),t},t.toType=function(t){var n;return n=a.toString.call(t).match(/\s([a-z|A-Z]+)/),n.length>1?n[1].toLowerCase():"object"},t.each=function(n,e){var r,i,u,o,a;if(i=void 0,o=void 0,"array"===t.toType(n))for(i=u=0,a=n.length;a>u;i=++u)r=n[i],e.call(r,i,r)===!1;else for(o in n)e.call(n[o],o,n[o])===!1;return n},t.map=function(n,e){var r,i,u,o;if(o=[],r=void 0,i=void 0,"array"===t.toType(n))for(r=0;r<n.length;)u=e(n[r],r),null!=u&&o.push(u),r++;else for(i in n)u=e(n[i],i),null!=u&&o.push(u);return h(o)},t.mix=function(){var t,n,e,r,i;for(e={},t=0,r=arguments.length;r>t;){n=arguments[t];for(i in n)g(n,i)&&void 0!==n[i]&&(e[i]=n[i]);t++}return e},v=function(t,n){return null==n&&(n=""),t=t||r,t.selector=n,t.__proto__=v.prototype,t},p=function(n,r){var i,u;return i=null,u=t.toType(n),"array"===u?i=f(n):"string"===u&&o.test(n)?(i=d(n.trim(),RegExp.$1),n=null):"string"===u?(i=t.query(document,n),r&&(i=1===i.length?t.query(i[0],r):t.map(function(){return t.query(i,r)}))):(e.indexOf(n.nodeType)>=0||n===window)&&(i=[n],n=null),i},d=function(n,e){var r;return null==e&&(e="*"),e in i||(e="*"),r=i[e],r.innerHTML=""+n,t.each(Array.prototype.slice.call(r.childNodes),function(){return r.removeChild(this)})},f=function(t){return t.filter(function(t){return null!=t?t:void 0})},h=function(t){return t.length>0?r.concat.apply(r,t):t},g=function(t,n){return a.hasOwnProperty.call(t,n)},v.prototype=t.fn={},t.fn.each=function(t){return this.forEach(function(n,e){return t.call(n,e,n)}),this},t.fn.filter=function(n){return t(r.filter.call(this,function(e){return e.parentNode&&t.query(e.parentNode,n).indexOf(e)>=0}))},t.fn.forEach=r.forEach,t.fn.indexOf=r.indexOf,t.version="3.0.7",t}(),this.Quo=this.$$=t,"undefined"!=typeof module&&null!==module&&(module.exports=t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n={TYPE:"GET",MIME:"json"},r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},e=0,t.ajaxSettings={type:n.TYPE,async:!0,success:{},error:{},context:null,dataType:n.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:!1,timeout:0},t.ajax=function(e){var r,o,c,f;if(c=t.mix(t.ajaxSettings,e),c.type===n.TYPE?c.url+=t.serialize(c.data,"?"):c.data=t.serialize(c.data),i(c.url))return u(c);f=c.xhr(),f.onreadystatechange=function(){return 4===f.readyState?(clearTimeout(r),s(f,c)):void 0},f.open(c.type,c.url,c.async),l(f,c),c.timeout>0&&(r=setTimeout(function(){return h(f,c)},c.timeout));try{f.send(c.data)}catch(d){o=d,f=o,a("Resource not found",f,c)}return f},t.get=function(n,e,r,i){return t.ajax({url:n,data:e,success:r,dataType:i})},t.post=function(t,n,e,r){return c("POST",t,n,e,r)},t.put=function(t,n,e,r){return c("PUT",t,n,e,r)},t["delete"]=function(t,n,e,r){return c("DELETE",t,n,e,r)},t.json=function(n,e,r){return t.ajax({url:n,data:e,success:r})},t.serialize=function(t,n){var e,r;null==n&&(n=""),r=n;for(e in t)t.hasOwnProperty(e)&&(r!==n&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return r===n?"":r},u=function(n){var r,i,u,o;return n.async?(i="jsonp"+ ++e,u=document.createElement("script"),o={abort:function(){return t(u).remove(),i in window?window[i]={}:void 0}},r=void 0,window[i]=function(e){return clearTimeout(r),t(u).remove(),delete window[i],f(e,o,n)},u.src=n.url.replace(RegExp("=\\?"),"="+i),t("head").append(u),n.timeout>0&&(r=setTimeout(function(){return h(o,n)},n.timeout)),o):console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")},s=function(t,n){t.status>=200&&t.status<300||0===t.status?n.async&&f(o(t,n),t,n):a("QuoJS.ajax: Unsuccesful request",t,n)},f=function(t,n,e){e.success.call(e.context,t,n)},a=function(t,n,e){e.error.call(e.context,t,n,e)},l=function(t,n){var e;n.contentType&&(n.headers["Content-Type"]=n.contentType),n.dataType&&(n.headers.Accept=r[n.dataType]);for(e in n.headers)t.setRequestHeader(e,n.headers[e])},h=function(t,n){t.onreadystatechange={},t.abort(),a("QuoJS.ajax: Timeout exceeded",t,n)},c=function(n,e,r,i,u){return t.ajax({type:n,url:e,data:r,success:i,dataType:u,contentType:"application/x-www-form-urlencoded"})},i=function(t){return RegExp("=\\?").test(t)},o=function(t,e){var r,i;if(i=t,t.responseText){if(e.dataType===n.MIME)try{i=JSON.parse(t.responseText)}catch(u){r=u,i=r,a("QuoJS.ajax: Parse Error",t,e)}"xml"===e.dataType&&(i=t.responseXML)}return i}}(t),function(t){var n,e,r;return n=["-webkit-","-moz-","-ms-","-o-",""],t.fn.addClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.add(o));return u})},t.fn.removeClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.remove(o));return u})},t.fn.toggleClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.toggle(o));return u})},t.fn.hasClass=function(t){return this.length>0&&this[0].classList.contains(t)},t.fn.listClass=function(){return this.length>0?this[0].classList:void 0},t.fn.style=t.fn.css=function(t,n){var e;return null!=n?this.each(function(){return this.style[t]=n}):(e=this[0],e.style[t]||r(e,t))},t.fn.vendor=function(t,e){var r,i,u,o;for(o=[],r=0,i=n.length;i>r;r++)u=n[r],o.push(this.style(""+u+t,e));return o},r=function(t,n){return document.defaultView.getComputedStyle(t,"")[n]},e=function(t){return Array.isArray(t)||(t=[t]),t}}(t),function(t){return t.fn.attr=function(n,e){return this.length>0&&"string"===t.toType(n)?null!=e?this.each(function(){return this.setAttribute(n,e)}):this[0].getAttribute(n):void 0},t.fn.removeAttr=function(n){return this.length>0&&"string"===t.toType(n)?this.each(function(){return this.removeAttribute(n)}):void 0},t.fn.data=function(t,n){return this.attr("data-"+t,n)},t.fn.removeData=function(t){return this.removeAttr("data-"+t)},t.fn.val=function(t){return null!=t?this.each(function(){return this.value=t.toString()}):this.length>0?this[0].value:null},t.fn.show=function(){return this.style("display","block")},t.fn.hide=function(){return this.style("display","none")},t.fn.focus=function(){return this[0].focus()},t.fn.blur=function(){return this[0].blur()},t.fn.offset=function(){var t,n;return this.length>0&&(t=this[0].getBoundingClientRect(),n={left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:t.width,height:t.height}),n}}(t),function(t){var n,e,r,i,u,o;return r=null,n=/WebKit\/([\d.]+)/,e={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/},t.isMobile=function(){return this.environment(),r.isMobile},t.environment=function(){var t,n;return r||(n=navigator.userAgent,t=u(n),r={browser:i(n),isMobile:!!t,screen:o(),os:t}),r},i=function(t){var e;return e=t.match(n),e?e[0]:t},u=function(t){var n,r,i;for(r in e)if(i=t.match(e[r])){n={name:"iphone"===r||"ipad"===r||"ipod"===r?"ios":r,version:i[2].replace("_",".")};break}return n},o=function(){return{width:window.innerWidth,height:window.innerHeight}}}(t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=1,i={},r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},e={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",orientationchange:"resize"},u=/complete|loaded|interactive/,t.fn.on=function(n,e,r){return null==e||"function"===t.toType(e)?this.bind(n,e):this.delegate(e,n,r)},t.fn.off=function(n,e,r){return null==e||"function"===t.toType(e)?this.unbind(n,e):this.undelegate(e,n,r)},t.fn.ready=function(n){return u.test(document.readyState)?n.call(this,t):t.fn.addEvent(document,"DOMContentLoaded",function(){return n.call(this,t)})},t.fn.bind=function(t,n){return this.forEach(function(e){return h(e,t,n)})},t.fn.unbind=function(t,n){return this.each(function(){return d(this,t,n)})},t.fn.delegate=function(n,e,r){return this.each(function(i,u){return h(u,e,r,n,function(e){return function(r){var i,a;return a=t(r.target).closest(n,u).get(0),a?(i=t.extend(o(r),{currentTarget:a,liveFired:u}),e.apply(a,[i].concat([].slice.call(arguments,1)))):void 0}})})},t.fn.undelegate=function(t,n,e){return this.each(function(){return d(this,n,e,t)})},t.fn.trigger=function(n,e,r){return"string"===t.toType(n)&&(n=l(n,e)),null!=r&&(n.originalEvent=r),this.each(function(){return this.dispatchEvent(n)})},t.fn.addEvent=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e},t.fn.removeEvent=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent?t.detachEvent("on"+n,e):t["on"+n]=null},l=function(t,n){var e;return e=document.createEvent("Events"),e.initEvent(t,!0,!0,null,null,null,null,null,null,null,null,null,null,null,null),n&&(e.touch=n),e},h=function(n,e,r,u,o){var l,s,h,d;return e=c(e),h=f(n),s=i[h]||(i[h]=[]),l=o&&o(r,e),d={event:e,callback:r,selector:u,proxy:a(l,r,n),delegate:l,index:s.length},s.push(d),t.fn.addEvent(n,d.event,d.proxy)},d=function(n,e,r,u){var o;return e=c(e),o=f(n),s(o,e,r,u).forEach(function(e){return delete i[o][e.index],t.fn.removeEvent(n,e.event,e.proxy)})},f=function(t){return t._id||(t._id=n++)},c=function(n){var r;return r=("function"==typeof t.isMobile?t.isMobile():void 0)?n:e[n],r||n},a=function(t,n,e){var r;return n=t||n,r=function(t){var r;return r=n.apply(e,[t].concat(t.data)),r===!1&&t.preventDefault(),r}},s=function(t,n,e,r){return(i[t]||[]).filter(function(t){return!(!t||n&&t.event!==n||e&&t.callback!==e||r&&t.selector!==r)})},o=function(n){var e;return e=t.extend({originalEvent:n},n),t.each(r,function(t,r){return e[t]=function(){return this[r]=function(){return!0},n[t].apply(n,arguments)},e[r]=function(){return!1}}),e}}(t),function(t){return t.fn.text=function(t){return null!=t?this.each(function(){return this.textContent=t}):this.length>0?this[0].textContent:""},t.fn.html=function(n){var e;return null!=n?(e=t.toType(n),this.each(function(){return"string"===e?this.innerHTML=n:"array"===e?n.forEach(function(n){return function(e){return t(n).html(e)}}(this)):this.innerHTML+=t(n).html()})):this.length>0?this[0].innerHTML:""},t.fn.remove=function(){return this.each(function(){return null!=this.parentNode?this.parentNode.removeChild(this):void 0})},t.fn.empty=function(){return this.each(function(){return this.innerHTML=null})},t.fn.append=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("beforeend",n):"array"===e?n.forEach(function(n){return function(e){return t(n).append(e)}}(this)):this.appendChild(n)})},t.fn.prepend=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("afterbegin",n):"array"===e?n.each(function(t){return function(n,e){return t.insertBefore(e,t.firstChild)}}(this)):this.insertBefore(n,this.firstChild)})},t.fn.replaceWith=function(n){var e;return e=t.toType(n),this.each(function(){return this.parentNode?"string"===e?this.insertAdjacentHTML("beforeBegin",n):"array"===e?n.each(function(t){return function(n,e){return t.parentNode.insertBefore(e,t)}}(this)):this.parentNode.insertBefore(n,this):void 0}),this.remove()}}(t),function(n){var e,r,i,u;return e="parentNode",n.fn.find=function(e){var r;return r=1===this.length?t.query(this[0],e):this.map(function(){return t.query(this,e)}),n(r)},n.fn.parent=function(t){var n;return n=t?i(this):this.instance(e),r(n,t)},n.fn.children=function(t){var n;return n=this.map(function(){return Array.prototype.slice.call(this.children)}),r(n,t)},n.fn.siblings=function(t){var n;return n=this.map(function(t,n){return Array.prototype.slice.call(n.parentNode.children).filter(function(t){return t!==n})}),r(n,t)},n.fn.get=function(t){return this[t]||null},n.fn.first=function(){return n(this[0])},n.fn.last=function(){return n(this[this.length-1])},n.fn.closest=function(t,e){var r,i;for(i=this[0],r=n(t),r.length||(i=null);i&&r.indexOf(i)<0;)i=i!==e&&i!==document&&i.parentNode;return n(i)},n.fn.next=function(){return u.call(this,"nextSibling")},n.fn.prev=function(){return u.call(this,"previousSibling")},n.fn.instance=function(t){return this.map(function(){return this[t]})},n.fn.map=function(t){return n.map(this,function(n,e){return t.call(n,e,n)})},i=function(t){var e;for(e=[];t.length>0;)t=n.map(t,function(t){return t=t.parentNode,t!==document&&e.indexOf(t)<0?(e.push(t),t):void 0});return e},r=function(t,e){return null!=e?n(t).filter(e):n(t)},u=function(t){var e;for(e=this[0][t];e&&1!==e.nodeType;)e=e[t];return n(e)}}(t),t.Gestures=function(t){var e,r,i,u,o,a,c,l,s,f,h,d,p,v;return d=!1,l={},o=null,f=null,i=["input","select","textarea"],p=function(t){return l[t.name]=t.handler,e(t.events)},v=function(n,e,r){return t(n).trigger(e,r,f)},h=function(t){var e;return e=(t.srcElement||t.target).tagName.toLowerCase(),n.call(i,e)>=0?t.stopPropagation():(d=!0,f=t||event,o=a(t),c("start",t.target,o))},s=function(t){return d?(f=t||event,o=a(t),o.length>1&&f.preventDefault(),c("move",t.target,o)):void 0},u=function(t){return d?(f=t||event,c("end",t.target,o),d=!1):void 0},r=function(t){return d=!1,c("cancel")},e=function(n){return n.forEach(function(n){return t.fn[n]=function(e){return t(document.body).delegate(this.selector,n,e)}}),this},c=function(t,n,e){var r,i,u;u=[];for(i in l)r=l[i],r[t]&&u.push(r[t].call(r,n,e));return u},a=function(t){var n,e,r,i,u;for(r=t.touches||[t],i=[],n=0,e=r.length;e>n;n++)u=r[n],i.push({x:u.pageX,y:u.pageY});return i},t(document).ready(function(){var n;return n=t(document.body),n.bind("touchstart",h),n.bind("touchmove",s),n.bind("touchend",u),n.bind("touchcancel",r)}),{add:p,trigger:v}}(t),t.Gestures.add({name:"basic",events:["touch","hold","doubleTap"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return e=15,n={TAP:200,DOUBLE_TAP:400,HOLD:400},i=null,c=!0,a=null,o=null,u=null,h=function(e,r){return 1===r.length?(o={time:new Date,x:r[0].x,y:r[0].y},a=e,i=setTimeout(function(){return t.trigger(e,"hold",r[0])},n.HOLD)):l()},f=function(t,n){var i;return null!==o&&(i=r(o,n[0]),i.x>e||i.y>e||n.length>1)?l():void 0},s=function(e,a){var c,s;if(o)return c=r(o,a[0]),0!==c.x||0!==c.y?l():(clearTimeout(i),s=new Date,s-o.time<n.TAP?s-u<n.DOUBLE_TAP?(t.trigger(e,"doubleTap",a[0]),u=null):(u=s,t.trigger(e,"touch",a[0])):void 0)},l=function(){return o=null,c=!1,clearTimeout(i)},r=function(t,n){var e;return e={x:n.x-t.x,y:n.y-t.y}},{start:h,move:f,end:s,cancel:l}}(t.Gestures)}),t.Gestures.add({name:"drag",events:["drag","dragging"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n=window.devicePixelRatio>=2?15:20,c=null,o=null,a=null,u=null,h=function(t,n){return n.length>=2?(c=t,o=n.length,a=e(n)):void 0},f=function(t,n){var e;return n.length===o?(e=r(n),u={touches:n,delta:e},i(!0)):void 0},l=s=function(t,n){return a&&u?(i(!1),o=null,a=null,u=null):void 0},r=function(t){var n;return n=e(t),{x:n.x-a.x,y:n.y-a.y}},e=function(t){var n,e,r,i,u;for(i=0,u=0,n=0,e=t.length;e>n;n++)r=t[n],i+=parseInt(r.x),u+=parseInt(r.y);return{x:i/t.length,y:u/t.length}},i=function(e){return e?t.trigger(c,"dragging",u):Math.abs(u.delta.x)>n||Math.abs(u.delta.y)>n?t.trigger(c,"drag",u):void 0},{start:h,move:f,end:s}}(t.Gestures)}),t.Gestures.add({name:"pinch",events:["pinch","pinching","pinchIn","pinchOut"],handler:function(t){var n,e,r,i,u,o,a,c,l,s;return n=window.devicePixelRatio>=2?15:20,o=null,u=null,i=null,s=function(t,n){return 2===n.length?(o=t,u=r(n[0],n[1])):void 0},l=function(t,n){var o;return u&&2===n.length?(o=r(n[0],n[1]),i={touches:n,delta:o-u},e(!0)):void 0},a=c=function(t,n){return u&&i?(e(!1),u=null,i=null):void 0},r=function(t,n){return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))},e=function(e){var r;return e?t.trigger(o,"pinching",i):Math.abs(i.delta)>n?(t.trigger(o,"pinch",i),r=i.delta>0?"pinchOut":"pinchIn",t.trigger(o,r,i)):void 0},{start:s,move:l,end:c}}(t.Gestures)}),t.Gestures.add({name:"rotation",events:["rotate","rotating","rotateLeft","rotateRight"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=5,e=20,l=null,u=0,c=null,i=null,d=function(t,n){return 2===n.length?(l=t,u=0,c=o(n[0],n[1])):void 0},h=function(t,n){var l;return c&&2===n.length?(l=o(n[0],n[1])-c,i&&Math.abs(i.delta-l)>e&&(l+=360*a(i.delta)),Math.abs(l)>360&&(u++,l-=360*a(i.delta)),i={touches:n,delta:l,rotationsCount:u},r(!0)):void 0},s=f=function(t,n){return c&&i?(r(!1),l=null,u=0,c=null,i=null,c=null):void 0},a=function(t){return 0>t?-1:1},o=function(t,n){var e;return e=Math.atan2(t.y-n.y,t.x-n.x),180*(0>e?e+2*Math.PI:e)/Math.PI},r=function(e){var r;return e?t.trigger(l,"rotating",i):Math.abs(i.delta)>n?(t.trigger(l,"rotate",i),r=i.delta>0?"rotateRight":"rotateLeft",t.trigger(l,r,i)):void 0},{start:d,move:h,end:f}}(t.Gestures)}),t.Gestures.add({name:"swipe",events:["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","swiping","swipingHorizontal","swipingVertical"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f;return n=Math.round(20/window.devicePixelRatio),a=null,u=null,o=null,i=null,f=function(t,n){return 1===n.length?(a=t,u=n[0],i=null):void 0},s=function(t,n){var r,o;return 1===n.length?(r={x:n[0].x-u.x,y:n[0].y-u.y},o=null===i,i={x:n[0].x,y:n[0].y,delta:r},e(!0,o)):i=null},c=l=function(t,n){var r;return null==i&&n.length>=1&&(r={x:n[0].x-u.x,y:n[0].y-u.y},i={x:n[0].x,y:n[0].y,delta:r}),i?(e(!1),i=null):void 0},e=function(e,u){var c,l,s,f,h;if(null==u&&(u=!1),e)return u&&(o=r(i.delta.x,i.delta.y)),null!==o&&t.trigger(a,"swiping"+o,i),t.trigger(a,"swiping",i);if(l=[],Math.abs(i.delta.y)>n?l.push(i.delta.y<0?"Up":"Down"):Math.abs(i.delta.x)>n&&l.push(i.delta.x<0?"Left":"Right"),l.length){for(t.trigger(a,"swipe",i),h=[],s=0,f=l.length;f>s;s++)c=l[s],h.push(t.trigger(a,"swipe"+c,i));return h}},r=function(t,n){var e;return e=null,Math.round(Math.abs(t/n))>=2?e="Horizontal":Math.round(Math.abs(n/t))>=2&&(e="Vertical"),e},{start:f,move:s,end:l}}(t.Gestures)})}).call(this);

},{}],37:[function(require,module,exports){
// Samson.Page constructor function
// Used to simplify page rendering and transitions in single page apps

var Samson = require('./index');
var Shared = require('./shared');
var Utils = require('./utils');
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
  this._uuid = this.name + "-" + Date.now(); // the uuid allows us to easily reference the added router tasks
  this._router = options.Router || options.router || {};
  Shared.addRouterTasks(this);

  // add any unreserved properties passed into the custom or extend object
  var custom = options.extend || options.custom || {};
  Utils.extend(this, custom, Shared.reserved);

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

},{"./index":35,"./modules/quo.js":36,"./shared":40,"./utils":43,"jss":52}],38:[function(require,module,exports){

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

},{}],39:[function(require,module,exports){
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

    // render the new page off screen
    this.pageCache[next_page]._render(false, Samson.DOM[this.inactivePageElement], function() {

      self._doFirst("beforeAnimate", function(err) {

        // run the animation now that the new page is fully rendered offscreen
        self.doAnimation(animation_data, function () {

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

    // if a page update is requested, but it isn't the current page, then we will simply navigate to it like normal
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
        var backAnimation = Samson.App.Pages[self.currentPage].backAnimation || self.backAnimation;

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

},{"../index":35,"../utils":43,"./base_router_animations":38,"async-lite":44,"jss":52}],40:[function(require,module,exports){

var Samson = require('./index');
var async = require('async-lite');
var isEqual = require('lodash.isequal');

var shared = {};

// reserved properties for components and pages
shared.reserved = ["name", "el", "element", "template", "subPageOf", "previousPage", "backAnimation", "style", "components", "events", "domEvents", "appEvents", "state", "setState", "setInitialState", "beforeRender", "afterRender", "beforeRemove", "render", "parent", "on", "emit", "off"];

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

},{"./index":35,"async-lite":44,"lodash.isequal":57}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"css-vendor":47}],47:[function(require,module,exports){
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

},{"./lib/prefix":49,"./lib/supported-property":50,"./lib/supported-value":51}],48:[function(require,module,exports){
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


},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"./camelize":48,"./prefix":49}],51:[function(require,module,exports){
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

},{"./prefix":49}],52:[function(require,module,exports){
/**
 * StyleSheets written in javascript.
 *
 * @copyright Oleg Slobodskoi 2014
 * @website https://github.com/jsstyles/jss
 * @license MIT
 */

module.exports = require('./lib/index')

},{"./lib/index":55}],53:[function(require,module,exports){
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

},{"./plugins":56}],54:[function(require,module,exports){
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

},{"./Rule":53,"./plugins":56}],55:[function(require,module,exports){
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

},{"./Rule":53,"./StyleSheet":54,"./plugins":56}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"lodash._baseisequal":58,"lodash._bindcallback":64}],58:[function(require,module,exports){
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

},{"lodash.isarray":59,"lodash.istypedarray":60,"lodash.keys":61}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{"lodash._getnative":62,"lodash.isarguments":63,"lodash.isarray":59}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmpzIiwiYXBwL2NvbW1vbi9jb2xvcnMuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2V4b19leHRyYWJvbGQuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2V4b19leHRyYWJvbGRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fZXh0cmFsaWdodC5qcyIsImFwcC9jb21tb24vZm9udHMvZXhvX2V4dHJhbGlnaHRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9faXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fcmVndWxhci5qcyIsImFwcC9jb21tb24vZm9udHMvZXhvX3NlbWlib2xkLmpzIiwiYXBwL2NvbW1vbi9mb250cy9leG9fc2VtaWJvbGRfaXRhbGljLmpzIiwiYXBwL2NvbW1vbi9mb250cy9mb250X2F3ZXNvbWUuanMiLCJhcHAvY29tbW9uL2ZvbnRzL2luZGV4LmpzIiwiYXBwL2NvbW1vbi9tb2R1bGVzL2xvZy5qcyIsImFwcC9jb21tb24vcm91dGVyX2FuaW1hdGlvbnMuanMiLCJhcHAvY29tbW9uL3NldHRpbmdzLmpzIiwiYXBwL2NvbW1vbi9zdGFydEFwcC5qcyIsImFwcC9jb21tb24vc3R5bGVzLmpzIiwiYXBwL2NvbXBvbmVudHMvZmFkZWRPdmVybGF5L2luZGV4LmpzIiwiYXBwL2NvbXBvbmVudHMvaGVhZGVyL2luZGV4LmpzIiwiYXBwL2NvbXBvbmVudHMvaGVhZGVyL3RlbXBsYXRlLmphZGUiLCJhcHAvY29tcG9uZW50cy9pbmRleC5qcyIsImFwcC9jb21wb25lbnRzL3NpZGVNZW51L2luZGV4LmpzIiwiYXBwL2NvbXBvbmVudHMvc2lkZU1lbnUvdGVtcGxhdGUuamFkZSIsImFwcC9jb21wb25lbnRzL3RyYW5zcGFyZW50T3ZlcmxheS9pbmRleC5qcyIsImFwcC9wYWdlcy9ob21lL2luZGV4LmpzIiwiYXBwL3BhZ2VzL2hvbWUvdGVtcGxhdGUuamFkZSIsImFwcC9wYWdlcy9pbmRleC5qcyIsImFwcC9wYWdlcy9sb2dpbi9pbmRleC5qcyIsImFwcC9wYWdlcy9sb2dpbi90ZW1wbGF0ZS5qYWRlIiwibm9kZV9tb2R1bGVzL2FzeW5jLWxpdGUvYXN5bmMtbGl0ZS5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwiLi4vLi4vbGliL2NvbXBvbmVudC5qcyIsIi4uLy4uL2xpYi9ldmVudHMuanMiLCIuLi8uLi9saWIvaW5kZXguanMiLCIuLi8uLi9saWIvbW9kdWxlcy9xdW8uanMiLCIuLi8uLi9saWIvcGFnZS5qcyIsIi4uLy4uL2xpYi9yb3V0ZXIvYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucy5qcyIsIi4uLy4uL2xpYi9yb3V0ZXIvaW5kZXguanMiLCIuLi8uLi9saWIvc2hhcmVkLmpzIiwiLi4vLi4vbGliL3N0eWxlcy9iYXNlX3N0eWxlcy5qcyIsIi4uLy4uL2xpYi9zdHlsZXMvcmVzZXQuanMiLCIuLi8uLi9saWIvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvYXN5bmMtbGl0ZS9hc3luYy1saXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy1leHRlbmQvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL25vZGVfbW9kdWxlcy9jc3MtdmVuZG9yL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvbGliL2NhbWVsaXplLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy12ZW5kb3ItcHJlZml4ZXIvbm9kZV9tb2R1bGVzL2Nzcy12ZW5kb3IvbGliL3ByZWZpeC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MtdmVuZG9yLXByZWZpeGVyL25vZGVfbW9kdWxlcy9jc3MtdmVuZG9yL2xpYi9zdXBwb3J0ZWQtcHJvcGVydHkuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzLXZlbmRvci1wcmVmaXhlci9ub2RlX21vZHVsZXMvY3NzLXZlbmRvci9saWIvc3VwcG9ydGVkLXZhbHVlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9qc3MvbGliL1J1bGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2xpYi9TdHlsZVNoZWV0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2pzcy9saWIvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvanNzL2xpYi9wbHVnaW5zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL2luZGV4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2Vpc2VxdWFsL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcnJheS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmlzdHlwZWRhcnJheS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvaW5kZXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvbG9kYXNoLmlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWlzZXF1YWwvbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guX2dldG5hdGl2ZS9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLmtleXMvbm9kZV9tb2R1bGVzL2xvZGFzaC5pc2FyZ3VtZW50cy9pbmRleC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNlcXVhbC9ub2RlX21vZHVsZXMvbG9kYXNoLl9iaW5kY2FsbGJhY2svaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3cURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDck1BOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2phQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIExvZyA9IHJlcXVpcmUoJy4vY29tbW9uL21vZHVsZXMvbG9nJyk7XG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi8uLi8uLi8uLi9saWInKTtcblxuLy8gcGFzcyBpbiB0aGUgbmFtZSBvZiB0aGUgYXBwIG9iamVjdCBpZiB5b3Ugd2FudCBpdCBhZGRlZCB0byB0aGUgZ2xvYmFsIHNjb3BlXG52YXIgQXBwID0gU2Ftc29uLmNyZWF0ZUFwcChcIkFwcFwiKTtcblxuLy8gYWRkIHRoZSBhcHAgbmFtZSB0byB0aGUgZ2xvYmFsIHNjb3BlIGlmIG5hbWUgaXMgcGFzc2VkIGluXG5nbG9iYWwuQXBwID0gQXBwO1xud2luZG93LkFwcCA9IEFwcDtcblxuZ2xvYmFsLkNvbG9ycyA9IHJlcXVpcmUoJy4vY29tbW9uL2NvbG9ycycpO1xuXG4vLyBTYW1zb24gQXBwIG9wdGlvbnNcbnZhciBvcHRpb25zID0ge1xuXG4gIHN0eWxlIDogcmVxdWlyZSgnLi9jb21tb24vc3R5bGVzJyksXG5cbiAgZm9udHMgOiByZXF1aXJlKCcuL2NvbW1vbi9mb250cycpLFxuXG4gIC8vc2V0Q29tcG9uZW50cyA6IHJlcXVpcmUoJ2NvbW1vbi9zZXRDb21wb25lbnRzJyksIC8vIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGNvbXBvbmVudCBvYmplY3QgLSB1c2UgaWYgdGhlIGFwcCBjb21wb25lbnRzIGFyZSBkeW5hbWljIGJhc2VkIG9uIHNjcmVlbnNpemUsIGRldmljZSBPUywgZXRjXG5cbiAgY29tcG9uZW50cyA6IHJlcXVpcmUoJy4vY29tcG9uZW50cycpLFxuXG4gIHBhZ2VzOiByZXF1aXJlKCcuL3BhZ2VzJyksXG5cbiAgZGF0YToge1xuICAgIEhlYWRlclRpdGxlOiBcIkhvbWVcIlxuICB9LFxuXG4gIC8vIGFueSBjdXN0b20gbWV0aG9kcy9wcm9wZXJ0aWVzIHlvdSB3YW50IGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBhcHAgb2JqZWN0LiB0aGUgY29udGV4dCB3aWxsIGJlIHRoZSBhcHAgb2JqZWN0XG4gIGN1c3RvbToge1xuICAgIE1vZGVscyA6IHt9LFxuICAgIENvbGxlY3Rpb25zIDoge31cbiAgfSxcblxuICByb3V0ZXIgOiB7XG4gICAgYW5pbWF0aW9uczogcmVxdWlyZSgnLi9jb21tb24vcm91dGVyX2FuaW1hdGlvbnMnKSxcbiAgICBkZWZhdWx0TmF2aWdhdGVBbmltYXRpb246IFwicmlnaHRcIixcbiAgICBkZWZhdWx0QmFja0FuaW1hdGlvbjogXCJsZWZ0XCIsXG4gICAgYmVmb3JlTmF2aWdhdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgZXJyb3IgPSBcIllvdSBzdWNrIGF0IG5hdmlnYXRpbmdcIjtcbiAgICAgIC8vY2FsbGJhY2soZXJyb3IpOyAvLyBwYXNzIGVycm9yIG1lc3NhZ2UgdGhyb3VnaCB0byBzdG9wIHRoZSByb3V0ZXIgbmF2aWdhdGlvbiBmcm9tIGNvbXBsZXRpbmdcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcbiAgICBhZnRlck5hdmlnYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LFxuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG4gICAgZHVyaW5nQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSkgeyAvLyBubyBjYWxsYmFja1xuICAgICAgLy9Mb2coXCJSb3V0ZXIgZHVyaW5nIGFuaW1hdGVcIik7XG4gICAgfSxcbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG4gICAgYmVmb3JlQmFjazogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcbiAgICBhZnRlckJhY2s6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxuXG59O1xuXG5BcHAuY29uZmlndXJlKG9wdGlvbnMsIGZ1bmN0aW9uKCkge1xuXG4gIC8vIFRoZSBTYW1zb24gQXBwIGlzIG5vdyBjb25maWd1cmVkIGFuZCByZWFkeSB0byB1c2VcbiAgTG9nKFwiU2Ftc29uIGFwcCBoYXMgYmVlbiBpbml0aWFsaXplZFwiKTtcblxuICB2YXIgc3RhcnRBcHAgPSByZXF1aXJlKCcuL2NvbW1vbi9zdGFydEFwcCcpO1xuXG4gIC8vIGlmIHdlIGRldGVjdCBjb3Jkb3ZhIHRoZW4gd2FpdCBmb3IgdGhlIGRldmljZXJlYWR5IGV2ZW50XG4gIGlmICh0eXBlb2Ygd2luZG93LmNvcmRvdmEgPT09ICdvYmplY3QnKSB7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIExvZyhcIkRldmljZSBpcyBub3cgcmVhZHlcIik7XG4gICAgICBzdGFydEFwcCgpO1xuICAgIH0sIGZhbHNlKTtcblxuICB9IGVsc2Uge1xuXG4gICAgc3RhcnRBcHAoKTtcblxuICB9XG5cbn0pO1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICB0dXJxdW9pc2U6IFwiIzFhYmM5Y1wiLFxuXG4gIGJsdWU6IFwiIzM0OThkYlwiLFxuXG4gIHB1cnBsZTogXCIjOWI1OWI2XCIsXG5cbiAgbmF2eTogXCIjMzQ0OTVlXCIsXG5cbiAgeWVsbG93OiBcIiNmMWM0MGZcIixcblxuICBvcmFuZ2U6IFwiI2U2N2UyMlwiLFxuXG4gIHJlZDogXCIjYzAzOTJiXCIsXG5cbiAgbGlnaHRHcmF5OiBcIiNiZGMzYzdcIixcblxuICBncmF5OiBcIiM3ZjhjOGRcIixcblxuICBkYXJrR3JheTogXCIjNDQ0NDQ0XCIsXG5cbiAgYmxhY2s6IFwiIzExMTExMVwiLFxuXG4gIHdoaXRlOiBcIiNmZmZmZmZcIlxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLUV4dHJhQm9sZC50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tRXh0cmFCb2xkSXRhbGljLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgXCJmb250LXN0eWxlXCI6IFwiaXRhbGljXCJcbiAgfVxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIHNyYzogXCJ1cmwoJ2ZvbnQvZXhvL0V4by1FeHRyYUxpZ2h0LnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogMjAwLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tRXh0cmFMaWdodEl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IDIwMCxcbiAgICBcImZvbnQtc3R5bGVcIjogXCJpdGFsaWNcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLUl0YWxpYy50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJylcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IFwibm9ybWFsXCIsXG4gICAgXCJmb250LXN0eWxlXCI6IFwiaXRhbGljXCJcbiAgfVxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQGZvbnQtZmFjZVwiOiB7XG4gICAgXCJmb250LWZhbWlseVwiOiBcIkV4b1wiLFxuICAgIHNyYzogXCJ1cmwoJ2ZvbnQvZXhvL0V4by1SZWd1bGFyLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogXCJub3JtYWxcIixcbiAgICBcImZvbnQtc3R5bGVcIjogXCJub3JtYWxcIlxuICB9XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRXhvXCIsXG4gICAgc3JjOiBcInVybCgnZm9udC9leG8vRXhvLVNlbWlCb2xkLnR0ZicpIGZvcm1hdCgndHJ1ZXR5cGUnKVwiLFxuICAgIFwiZm9udC13ZWlnaHRcIjogNTAwLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkBmb250LWZhY2VcIjoge1xuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBzcmM6IFwidXJsKCdmb250L2V4by9FeG8tU2VtaUJvbGRJdGFsaWMudHRmJykgZm9ybWF0KCd0cnVldHlwZScpXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiA1MDAsXG4gICAgXCJmb250LXN0eWxlXCI6IFwiaXRhbGljXCJcbiAgfVxufTtcbiIsIi8qIVxuICogIEZvbnQgQXdlc29tZSA0LjMuMCBieSBAZGF2ZWdhbmR5IC0gaHR0cDovL2ZvbnRhd2Vzb21lLmlvIC0gQGZvbnRhd2Vzb21lXG4gKiAgTGljZW5zZSAtIGh0dHA6Ly9mb250YXdlc29tZS5pby9saWNlbnNlIChGb250OiBTSUwgT0ZMIDEuMSwgQ1NTOiBNSVQgTGljZW5zZSlcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJAZm9udC1mYWNlXCI6IHtcbiAgICBcImZvbnQtZmFtaWx5XCI6IFwiRm9udEF3ZXNvbWVcIixcbiAgICBzcmM6IFwidXJsKCdmb250L2ZvbnRfYXdlc29tZS9mb250YXdlc29tZS13ZWJmb250LnR0Zj92PTQuMy4wJykgZm9ybWF0KCd0cnVldHlwZScpXCIsXG4gICAgXCJmb250LXdlaWdodFwiOiBcIm5vcm1hbFwiLFxuICAgIFwiZm9udC1zdHlsZVwiOiBcIm5vcm1hbFwiXG4gIH0sXG4gIFwiLmZhXCI6IHtcbiAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIixcbiAgICBcImZvbnRcIjogXCJub3JtYWwgbm9ybWFsIG5vcm1hbCAxNHB4LzEgRm9udEF3ZXNvbWVcIixcbiAgICBcImZvbnQtc2l6ZVwiOiBcImluaGVyaXRcIixcbiAgICBcInRleHQtcmVuZGVyaW5nXCI6IFwiYXV0b1wiLFxuICAgIFwiLXdlYmtpdC1mb250LXNtb290aGluZ1wiOiBcImFudGlhbGlhc2VkXCIsXG4gICAgXCItbW96LW9zeC1mb250LXNtb290aGluZ1wiOiBcImdyYXlzY2FsZVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlKDAsIDApXCJcbiAgfSxcbiAgXCIuZmEtbGdcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiMS4zMzMzMzMzM2VtXCIsXG4gICAgXCJsaW5lLWhlaWdodFwiOiBcIjAuNzVlbVwiLFxuICAgIFwidmVydGljYWwtYWxpZ25cIjogXCItMTUlXCJcbiAgfSxcbiAgXCIuZmEtMnhcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiMmVtXCJcbiAgfSxcbiAgXCIuZmEtM3hcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiM2VtXCJcbiAgfSxcbiAgXCIuZmEtNHhcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiNGVtXCJcbiAgfSxcbiAgXCIuZmEtNXhcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiNWVtXCJcbiAgfSxcbiAgXCIuZmEtZndcIjoge1xuICAgIFwid2lkdGhcIjogXCIxLjI4NTcxNDI5ZW1cIixcbiAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIlxuICB9LFxuICBcIi5mYS11bFwiOiB7XG4gICAgXCJwYWRkaW5nLWxlZnRcIjogXCIwXCIsXG4gICAgXCJtYXJnaW4tbGVmdFwiOiBcIjIuMTQyODU3MTRlbVwiLFxuICAgIFwibGlzdC1zdHlsZS10eXBlXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiLmZhLXVsID4gbGlcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiXG4gIH0sXG4gIFwiLmZhLWxpXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImxlZnRcIjogXCItMi4xNDI4NTcxNGVtXCIsXG4gICAgXCJ3aWR0aFwiOiBcIjIuMTQyODU3MTRlbVwiLFxuICAgIFwidG9wXCI6IFwiMC4xNDI4NTcxNGVtXCIsXG4gICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCIuZmEtbGkuZmEtbGdcIjoge1xuICAgIFwibGVmdFwiOiBcIi0xLjg1NzE0Mjg2ZW1cIlxuICB9LFxuICBcIi5mYS1ib3JkZXJcIjoge1xuICAgIFwicGFkZGluZ1wiOiBcIi4yZW0gLjI1ZW0gLjE1ZW1cIixcbiAgICBcImJvcmRlclwiOiBcInNvbGlkIDAuMDhlbSAjZWVlZWVlXCIsXG4gICAgXCJib3JkZXItcmFkaXVzXCI6IFwiLjFlbVwiXG4gIH0sXG4gIFwiLnB1bGwtcmlnaHRcIjoge1xuICAgIFwiZmxvYXRcIjogXCJyaWdodFwiXG4gIH0sXG4gIFwiLnB1bGwtbGVmdFwiOiB7XG4gICAgXCJmbG9hdFwiOiBcImxlZnRcIlxuICB9LFxuICBcIi5mYS5wdWxsLWxlZnRcIjoge1xuICAgIFwibWFyZ2luLXJpZ2h0XCI6IFwiLjNlbVwiXG4gIH0sXG4gIFwiLmZhLnB1bGwtcmlnaHRcIjoge1xuICAgIFwibWFyZ2luLWxlZnRcIjogXCIuM2VtXCJcbiAgfSxcbiAgXCIuZmEtc3BpblwiOiB7XG4gICAgXCItd2Via2l0LWFuaW1hdGlvblwiOiBcImZhLXNwaW4gMnMgaW5maW5pdGUgbGluZWFyXCIsXG4gICAgXCJhbmltYXRpb25cIjogXCJmYS1zcGluIDJzIGluZmluaXRlIGxpbmVhclwiXG4gIH0sXG4gIFwiLmZhLXB1bHNlXCI6IHtcbiAgICBcIi13ZWJraXQtYW5pbWF0aW9uXCI6IFwiZmEtc3BpbiAxcyBpbmZpbml0ZSBzdGVwcyg4KVwiLFxuICAgIFwiYW5pbWF0aW9uXCI6IFwiZmEtc3BpbiAxcyBpbmZpbml0ZSBzdGVwcyg4KVwiXG4gIH0sXG4gIFwiQGtleWZyYW1lcyBmYS1zcGluXCI6IHtcbiAgICBcIjAlXCI6IHtcbiAgICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogXCJyb3RhdGUoMGRlZylcIixcbiAgICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDBkZWcpXCJcbiAgICB9LFxuICAgIFwiMTAwJVwiOiB7XG4gICAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwicm90YXRlKDM1OWRlZylcIixcbiAgICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDM1OWRlZylcIlxuICAgIH1cbiAgfSxcbiAgXCIuZmEtcm90YXRlLTkwXCI6IHtcbiAgICBcImZpbHRlclwiOiBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CYXNpY0ltYWdlKHJvdGF0aW9uPTEpXCIsXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiBcInJvdGF0ZSg5MGRlZylcIixcbiAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJyb3RhdGUoOTBkZWcpXCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJyb3RhdGUoOTBkZWcpXCJcbiAgfSxcbiAgXCIuZmEtcm90YXRlLTE4MFwiOiB7XG4gICAgXCJmaWx0ZXJcIjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0yKVwiLFxuICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjogXCJyb3RhdGUoMTgwZGVnKVwiLFxuICAgIFwiLW1zLXRyYW5zZm9ybVwiOiBcInJvdGF0ZSgxODBkZWcpXCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJyb3RhdGUoMTgwZGVnKVwiXG4gIH0sXG4gIFwiLmZhLXJvdGF0ZS0yNzBcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MylcIixcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwicm90YXRlKDI3MGRlZylcIixcbiAgICBcIi1tcy10cmFuc2Zvcm1cIjogXCJyb3RhdGUoMjcwZGVnKVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwicm90YXRlKDI3MGRlZylcIlxuICB9LFxuICBcIi5mYS1mbGlwLWhvcml6b250YWxcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwicHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJhc2ljSW1hZ2Uocm90YXRpb249MCwgbWlycm9yPTEpXCIsXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiBcInNjYWxlKC0xLCAxKVwiLFxuICAgIFwiLW1zLXRyYW5zZm9ybVwiOiBcInNjYWxlKC0xLCAxKVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwic2NhbGUoLTEsIDEpXCJcbiAgfSxcbiAgXCIuZmEtZmxpcC12ZXJ0aWNhbFwiOiB7XG4gICAgXCJmaWx0ZXJcIjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQmFzaWNJbWFnZShyb3RhdGlvbj0yLCBtaXJyb3I9MSlcIixcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IFwic2NhbGUoMSwgLTEpXCIsXG4gICAgXCItbXMtdHJhbnNmb3JtXCI6IFwic2NhbGUoMSwgLTEpXCIsXG4gICAgXCJ0cmFuc2Zvcm1cIjogXCJzY2FsZSgxLCAtMSlcIlxuICB9LFxuICBcIjpyb290IC5mYS1yb3RhdGUtOTAsIDpyb290IC5mYS1yb3RhdGUtMTgwLCA6cm9vdCAuZmEtcm90YXRlLTI3MCwgOnJvb3QgLmZhLWZsaXAtaG9yaXpvbnRhbCwgOnJvb3QgLmZhLWZsaXAtdmVydGljYWxcIjoge1xuICAgIFwiZmlsdGVyXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwicmVsYXRpdmVcIixcbiAgICBcImRpc3BsYXlcIjogXCJpbmxpbmUtYmxvY2tcIixcbiAgICBcIndpZHRoXCI6IFwiMmVtXCIsXG4gICAgXCJoZWlnaHRcIjogXCIyZW1cIixcbiAgICBcImxpbmUtaGVpZ2h0XCI6IFwiMmVtXCIsXG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIm1pZGRsZVwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrLTF4LCAuZmEtc3RhY2stMnhcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwibGVmdFwiOiBcIjBcIixcbiAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrLTF4XCI6IHtcbiAgICBcImxpbmUtaGVpZ2h0XCI6IFwiaW5oZXJpdFwiXG4gIH0sXG4gIFwiLmZhLXN0YWNrLTJ4XCI6IHtcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjJlbVwiXG4gIH0sXG4gIFwiLmZhLWludmVyc2VcIjoge1xuICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcbiAgfSxcbiAgXCIuZmEtZ2xhc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbXVzaWM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2VhcmNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDAyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVudmVsb3BlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGVhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RhcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwNVxcXCJcIlxuICB9LFxuICBcIi5mYS1zdGFyLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAwN1xcXCJcIlxuICB9LFxuICBcIi5mYS1maWxtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDA4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRoLWxhcmdlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDA5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRoLWxpc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmVtb3ZlOmJlZm9yZSwgLmZhLWNsb3NlOmJlZm9yZSwgLmZhLXRpbWVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlYXJjaC1wbHVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDBlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlYXJjaC1taW51czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxMFxcXCJcIlxuICB9LFxuICBcIi5mYS1wb3dlci1vZmY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2lnbmFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDEyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdlYXI6YmVmb3JlLCAuZmEtY29nOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDEzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyYXNoLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaG9tZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxNVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2xvY2stbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxN1xcXCJcIlxuICB9LFxuICBcIi5mYS1yb2FkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDE4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRvd25sb2FkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDE5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1vLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctY2lyY2xlLW8tdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW5ib3g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGxheS1jaXJjbGUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAxZFxcXCJcIlxuICB9LFxuICBcIi5mYS1yb3RhdGUtcmlnaHQ6YmVmb3JlLCAuZmEtcmVwZWF0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlZnJlc2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlzdC1hbHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbG9jazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyM1xcXCJcIlxuICB9LFxuICBcIi5mYS1mbGFnOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDI0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhlYWRwaG9uZXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdm9sdW1lLW9mZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyNlxcXCJcIlxuICB9LFxuICBcIi5mYS12b2x1bWUtZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyN1xcXCJcIlxuICB9LFxuICBcIi5mYS12b2x1bWUtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXJjb2RlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDI5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJhcmNvZGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGFnOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDJiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRhZ3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYm9vazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyZFxcXCJcIlxuICB9LFxuICBcIi5mYS1ib29rbWFyazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyZVxcXCJcIlxuICB9LFxuICBcIi5mYS1wcmludDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAyZlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYW1lcmE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZm9udDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzMVxcXCJcIlxuICB9LFxuICBcIi5mYS1ib2xkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWl0YWxpYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzM1xcXCJcIlxuICB9LFxuICBcIi5mYS10ZXh0LWhlaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzNFxcXCJcIlxuICB9LFxuICBcIi5mYS10ZXh0LXdpZHRoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFsaWduLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYWxpZ24tY2VudGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFsaWduLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFsaWduLWp1c3RpZnk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwMzlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlzdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzYVxcXCJcIlxuICB9LFxuICBcIi5mYS1kZWRlbnQ6YmVmb3JlLCAuZmEtb3V0ZGVudDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzYlxcXCJcIlxuICB9LFxuICBcIi5mYS1pbmRlbnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwM2NcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmlkZW8tY2FtZXJhOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDNkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBob3RvOmJlZm9yZSwgLmZhLWltYWdlOmJlZm9yZSwgLmZhLXBpY3R1cmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjAzZVxcXCJcIlxuICB9LFxuICBcIi5mYS1wZW5jaWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFwLW1hcmtlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0MVxcXCJcIlxuICB9LFxuICBcIi5mYS1hZGp1c3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGludDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0M1xcXCJcIlxuICB9LFxuICBcIi5mYS1lZGl0OmJlZm9yZSwgLmZhLXBlbmNpbC1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0NFxcXCJcIlxuICB9LFxuICBcIi5mYS1zaGFyZS1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0NVxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGVjay1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0NlxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvd3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNDdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RlcC1iYWNrd2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0OFxcXCJcIlxuICB9LFxuICBcIi5mYS1mYXN0LWJhY2t3YXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDQ5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJhY2t3YXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDRhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsYXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGF1c2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RvcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA0ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1mb3J3YXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDRlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZhc3QtZm9yd2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1MFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdGVwLWZvcndhcmQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZWplY3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hldnJvbi1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDUzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGx1cy1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWludXMtY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDU2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRpbWVzLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA1N1xcXCJcIlxuICB9LFxuICBcIi5mYS1jaGVjay1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXVlc3Rpb24tY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDU5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWluZm8tY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDVhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNyb3NzaGFpcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGltZXMtY2lyY2xlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2stY2lyY2xlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmFuOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDVlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2M1xcXCJcIlxuICB9LFxuICBcIi5mYS1tYWlsLWZvcndhcmQ6YmVmb3JlLCAuZmEtc2hhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXhwYW5kOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbXByZXNzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDY2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWludXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXN0ZXJpc2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXhjbGFtYXRpb24tY2lyY2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDZhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGVhZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1maXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV5ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA2ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1leWUtc2xhc2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2FybmluZzpiZWZvcmUsIC5mYS1leGNsYW1hdGlvbi10cmlhbmdsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3MVxcXCJcIlxuICB9LFxuICBcIi5mYS1wbGFuZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3MlxcXCJcIlxuICB9LFxuICBcIi5mYS1jYWxlbmRhcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3M1xcXCJcIlxuICB9LFxuICBcIi5mYS1yYW5kb206YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29tbWVudDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3NVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWduZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hldnJvbi11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3N1xcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwNzhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmV0d2VldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3OVxcXCJcIlxuICB9LFxuICBcIi5mYS1zaG9wcGluZy1jYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDdhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvbGRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3YlxcXCJcIlxuICB9LFxuICBcIi5mYS1mb2xkZXItb3BlbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvd3MtdjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvd3MtaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA3ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1iYXItY2hhcnQtbzpiZWZvcmUsIC5mYS1iYXItY2hhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHdpdHRlci1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmFjZWJvb2stc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDgyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhbWVyYS1yZXRybzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4M1xcXCJcIlxuICB9LFxuICBcIi5mYS1rZXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwODRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2VhcnM6YmVmb3JlLCAuZmEtY29nczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4NVxcXCJcIlxuICB9LFxuICBcIi5mYS1jb21tZW50czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4NlxcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYnMtby11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4N1xcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYnMtby1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDg4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0YXItaGFsZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4OVxcXCJcIlxuICB9LFxuICBcIi5mYS1oZWFydC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDhhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNpZ24tb3V0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDhiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpbmtlZGluLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA4Y1xcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYi10YWNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDhkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV4dGVybmFsLWxpbms6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2lnbi1pbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5MFxcXCJcIlxuICB9LFxuICBcIi5mYS10cm9waHk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2l0aHViLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5MlxcXCJcIlxuICB9LFxuICBcIi5mYS11cGxvYWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGVtb24tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5NFxcXCJcIlxuICB9LFxuICBcIi5mYS1waG9uZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5NVxcXCJcIlxuICB9LFxuICBcIi5mYS1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5NlxcXCJcIlxuICB9LFxuICBcIi5mYS1ib29rbWFyay1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDk3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBob25lLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5OFxcXCJcIlxuICB9LFxuICBcIi5mYS10d2l0dGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDk5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZhY2Vib29rLWY6YmVmb3JlLCAuZmEtZmFjZWJvb2s6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2l0aHViOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMDliXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVubG9jazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1jcmVkaXQtY2FyZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjA5ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1yc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwOWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGRkLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnVsbGhvcm46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmVsbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmM1xcXCJcIlxuICB9LFxuICBcIi5mYS1jZXJ0aWZpY2F0ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhM1xcXCJcIlxuICB9LFxuICBcIi5mYS1oYW5kLW8tcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGFuZC1vLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaGFuZC1vLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhhbmQtby1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGE4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFycm93LWNpcmNsZS1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhOVxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3ctY2lyY2xlLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2xvYmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd3JlbmNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGFkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRhc2tzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbHRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBiMFxcXCJcIlxuICB9LFxuICBcIi5mYS1icmllZmNhc2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJyb3dzLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBiMlxcXCJcIlxuICB9LFxuICBcIi5mYS1ncm91cDpiZWZvcmUsIC5mYS11c2VyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjMFxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGFpbjpiZWZvcmUsIC5mYS1saW5rOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGMxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNsb3VkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZsYXNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGMzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWN1dDpiZWZvcmUsIC5mYS1zY2lzc29yczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjNFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb3B5OmJlZm9yZSwgLmZhLWZpbGVzLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYzVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGFwZXJjbGlwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNhdmU6YmVmb3JlLCAuZmEtZmxvcHB5LW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwYzdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW5hdmljb246YmVmb3JlLCAuZmEtcmVvcmRlcjpiZWZvcmUsIC5mYS1iYXJzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpc3QtdWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwY2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlzdC1vbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjYlxcXCJcIlxuICB9LFxuICBcIi5mYS1zdHJpa2V0aHJvdWdoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGNjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVuZGVybGluZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjZFxcXCJcIlxuICB9LFxuICBcIi5mYS10YWJsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBjZVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWdpYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkMFxcXCJcIlxuICB9LFxuICBcIi5mYS10cnVjazpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkMVxcXCJcIlxuICB9LFxuICBcIi5mYS1waW50ZXJlc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGludGVyZXN0LXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkM1xcXCJcIlxuICB9LFxuICBcIi5mYS1nb29nbGUtcGx1cy1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ29vZ2xlLXBsdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbW9uZXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FyZXQtZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkN1xcXCJcIlxuICB9LFxuICBcIi5mYS1jYXJldC11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkOFxcXCJcIlxuICB9LFxuICBcIi5mYS1jYXJldC1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGQ5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhcmV0LXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGRhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbHVtbnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdW5zb3J0ZWQ6YmVmb3JlLCAuZmEtc29ydDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBkY1xcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LWRvd246YmVmb3JlLCAuZmEtc29ydC1kZXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGRkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtdXA6YmVmb3JlLCAuZmEtc29ydC1hc2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZW52ZWxvcGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGlua2VkaW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcm90YXRlLWxlZnQ6YmVmb3JlLCAuZmEtdW5kbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlMlxcXCJcIlxuICB9LFxuICBcIi5mYS1sZWdhbDpiZWZvcmUsIC5mYS1nYXZlbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlM1xcXCJcIlxuICB9LFxuICBcIi5mYS1kYXNoYm9hcmQ6YmVmb3JlLCAuZmEtdGFjaG9tZXRlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlNFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb21tZW50LW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29tbWVudHMtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlNlxcXCJcIlxuICB9LFxuICBcIi5mYS1mbGFzaDpiZWZvcmUsIC5mYS1ib2x0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGU3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNpdGVtYXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZThcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdW1icmVsbGE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZTlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGFzdGU6YmVmb3JlLCAuZmEtY2xpcGJvYXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGVhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpZ2h0YnVsYi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGViXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV4Y2hhbmdlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGVjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNsb3VkLWRvd25sb2FkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGVkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNsb3VkLXVwbG9hZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBlZVxcXCJcIlxuICB9LFxuICBcIi5mYS11c2VyLW1kOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGYwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0ZXRob3Njb3BlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGYxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN1aXRjYXNlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGYyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlbGwtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBhMlxcXCJcIlxuICB9LFxuICBcIi5mYS1jb2ZmZWU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZjRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY3V0bGVyeTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmNVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXRleHQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmNlxcXCJcIlxuICB9LFxuICBcIi5mYS1idWlsZGluZy1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGY3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhvc3BpdGFsLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYwZjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW1idWxhbmNlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGY5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1lZGtpdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmYVxcXCJcIlxuICB9LFxuICBcIi5mYS1maWdodGVyLWpldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjBmYlxcXCJcIlxuICB9LFxuICBcIi5mYS1iZWVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGZjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWgtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdXMtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMGZlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFuZ2xlLWRvdWJsZS1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTAwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFuZ2xlLWRvdWJsZS1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwMVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1kb3VibGUtdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtZG91YmxlLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYW5nbGUtbGVmdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwNFxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwNVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwNlxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdsZS1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTA3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRlc2t0b3A6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMDhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGFwdG9wOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTA5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRhYmxldDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEwYVxcXCJcIlxuICB9LFxuICBcIi5mYS1tb2JpbGUtcGhvbmU6YmVmb3JlLCAuZmEtbW9iaWxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTBiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNpcmNsZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTBjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXF1b3RlLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMGRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXVvdGUtcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Bpbm5lcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExMFxcXCJcIlxuICB9LFxuICBcIi5mYS1jaXJjbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFpbC1yZXBseTpiZWZvcmUsIC5mYS1yZXBseTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExMlxcXCJcIlxuICB9LFxuICBcIi5mYS1naXRodWItYWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTEzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvbGRlci1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTE0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvbGRlci1vcGVuLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc21pbGUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExOFxcXCJcIlxuICB9LFxuICBcIi5mYS1mcm93bi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTE5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1laC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTFhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdhbWVwYWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEta2V5Ym9hcmQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjExY1xcXCJcIlxuICB9LFxuICBcIi5mYS1mbGFnLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmxhZy1jaGVja2VyZWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdGVybWluYWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29kZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyMVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWlsLXJlcGx5LWFsbDpiZWZvcmUsIC5mYS1yZXBseS1hbGw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3Rhci1oYWxmLWVtcHR5OmJlZm9yZSwgLmZhLXN0YXItaGFsZi1mdWxsOmJlZm9yZSwgLmZhLXN0YXItaGFsZi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTIzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvY2F0aW9uLWFycm93OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTI0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNyb3A6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29kZS1mb3JrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTI2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXVubGluazpiZWZvcmUsIC5mYS1jaGFpbi1icm9rZW46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXVlc3Rpb246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW5mbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyOVxcXCJcIlxuICB9LFxuICBcIi5mYS1leGNsYW1hdGlvbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyYVxcXCJcIlxuICB9LFxuICBcIi5mYS1zdXBlcnNjcmlwdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyYlxcXCJcIlxuICB9LFxuICBcIi5mYS1zdWJzY3JpcHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXJhc2VyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTJkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXB1enpsZS1waWVjZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEyZVxcXCJcIlxuICB9LFxuICBcIi5mYS1taWNyb3Bob25lOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTMwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1pY3JvcGhvbmUtc2xhc2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMzFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hpZWxkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhbGVuZGFyLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMzNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlyZS1leHRpbmd1aXNoZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxMzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcm9ja2V0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1heGNkbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzNlxcXCJcIlxuICB9LFxuICBcIi5mYS1jaGV2cm9uLWNpcmNsZS1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tY2lyY2xlLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tY2lyY2xlLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoZXZyb24tY2lyY2xlLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaHRtbDU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2JcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY3NzMzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzY1xcXCJcIlxuICB9LFxuICBcIi5mYS1hbmNob3I6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxM2RcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdW5sb2NrLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjEzZVxcXCJcIlxuICB9LFxuICBcIi5mYS1idWxsc2V5ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0MFxcXCJcIlxuICB9LFxuICBcIi5mYS1lbGxpcHNpcy1oOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVsbGlwc2lzLXY6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcnNzLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0M1xcXCJcIlxuICB9LFxuICBcIi5mYS1wbGF5LWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE0NFxcXCJcIlxuICB9LFxuICBcIi5mYS10aWNrZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWludXMtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1pbnVzLXNxdWFyZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxldmVsLXVwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTQ4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxldmVsLWRvd246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNDlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2hlY2stc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTRhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBlbmNpbC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXh0ZXJuYWwtbGluay1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hhcmUtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTRkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNvbXBhc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLWRvd246YmVmb3JlLCAuZmEtY2FyZXQtc3F1YXJlLW8tZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1MFxcXCJcIlxuICB9LFxuICBcIi5mYS10b2dnbGUtdXA6YmVmb3JlLCAuZmEtY2FyZXQtc3F1YXJlLW8tdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLXJpZ2h0OmJlZm9yZSwgLmZhLWNhcmV0LXNxdWFyZS1vLXJpZ2h0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTUyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWV1cm86YmVmb3JlLCAuZmEtZXVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTUzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdicDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1NFxcXCJcIlxuICB9LFxuICBcIi5mYS1kb2xsYXI6YmVmb3JlLCAuZmEtdXNkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTU1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJ1cGVlOmJlZm9yZSwgLmZhLWlucjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1NlxcXCJcIlxuICB9LFxuICBcIi5mYS1jbnk6YmVmb3JlLCAuZmEtcm1iOmJlZm9yZSwgLmZhLXllbjpiZWZvcmUsIC5mYS1qcHk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNTdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcnVibGU6YmVmb3JlLCAuZmEtcm91YmxlOmJlZm9yZSwgLmZhLXJ1YjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1OFxcXCJcIlxuICB9LFxuICBcIi5mYS13b246YmVmb3JlLCAuZmEta3J3OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTU5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJpdGNvaW46YmVmb3JlLCAuZmEtYnRjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTVhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS10ZXh0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTVjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtYWxwaGEtYXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTVkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtYWxwaGEtZGVzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE1ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LWFtb3VudC1hc2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc29ydC1hbW91bnQtZGVzYzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2MVxcXCJcIlxuICB9LFxuICBcIi5mYS1zb3J0LW51bWVyaWMtYXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTYyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNvcnQtbnVtZXJpYy1kZXNjOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTYzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRodW1icy11cDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2NFxcXCJcIlxuICB9LFxuICBcIi5mYS10aHVtYnMtZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2NVxcXCJcIlxuICB9LFxuICBcIi5mYS15b3V0dWJlLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2NlxcXCJcIlxuICB9LFxuICBcIi5mYS15b3V0dWJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTY3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXhpbmc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEteGluZy1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEteW91dHViZS1wbGF5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTZhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRyb3Bib3g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RhY2stb3ZlcmZsb3c6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNmNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW5zdGFncmFtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZsaWNrcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE2ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1hZG46YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYml0YnVja2V0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTcxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJpdGJ1Y2tldC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHVtYmxyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTczXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR1bWJsci1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbG9uZy1hcnJvdy1kb3duOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvbmctYXJyb3ctdXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbG9uZy1hcnJvdy1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTc3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxvbmctYXJyb3ctcmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXBwbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxNzlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2luZG93czpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE3YVxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmRyb2lkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpbnV4OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRyaWJiYmxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNreXBlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTdlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZvdXJzcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJlbGxvOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTgxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZlbWFsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4MlxcXCJcIlxuICB9LFxuICBcIi5mYS1tYWxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTgzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpdHRpcDpiZWZvcmUsIC5mYS1ncmF0aXBheTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4NFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdW4tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4NVxcXCJcIlxuICB9LFxuICBcIi5mYS1tb29uLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXJjaGl2ZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4N1xcXCJcIlxuICB9LFxuICBcIi5mYS1idWc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdms6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxODlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2VpYm86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOGFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmVucmVuOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMThiXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhZ2VsaW5lczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1zdGFjay1leGNoYW5nZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4ZFxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtby1yaWdodDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE4ZVxcXCJcIlxuICB9LFxuICBcIi5mYS1hcnJvdy1jaXJjbGUtby1sZWZ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTkwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRvZ2dsZS1sZWZ0OmJlZm9yZSwgLmZhLWNhcmV0LXNxdWFyZS1vLWxlZnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZG90LWNpcmNsZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTkyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdoZWVsY2hhaXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmltZW8tc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTk0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR1cmtpc2gtbGlyYTpiZWZvcmUsIC5mYS10cnk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGx1cy1zcXVhcmUtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5NlxcXCJcIlxuICB9LFxuICBcIi5mYS1zcGFjZS1zaHV0dGxlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTk3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNsYWNrOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTk4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWVudmVsb3BlLXNxdWFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5OVxcXCJcIlxuICB9LFxuICBcIi5mYS13b3JkcHJlc3M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtb3BlbmlkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMTliXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWluc3RpdHV0aW9uOmJlZm9yZSwgLmZhLWJhbms6YmVmb3JlLCAuZmEtdW5pdmVyc2l0eTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjE5Y1xcXCJcIlxuICB9LFxuICBcIi5mYS1tb3J0YXItYm9hcmQ6YmVmb3JlLCAuZmEtZ3JhZHVhdGlvbi1jYXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOWRcXFwiXCJcbiAgfSxcbiAgXCIuZmEteWFob286YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxOWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ29vZ2xlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWEwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlZGRpdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhMVxcXCJcIlxuICB9LFxuICBcIi5mYS1yZWRkaXQtc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWEyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXN0dW1ibGV1cG9uLWNpcmNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhM1xcXCJcIlxuICB9LFxuICBcIi5mYS1zdHVtYmxldXBvbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhNFxcXCJcIlxuICB9LFxuICBcIi5mYS1kZWxpY2lvdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZGlnZzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhNlxcXCJcIlxuICB9LFxuICBcIi5mYS1waWVkLXBpcGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWE3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBpZWQtcGlwZXItYWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWE4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRydXBhbDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFhOVxcXCJcIlxuICB9LFxuICBcIi5mYS1qb29tbGE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGFuZ3VhZ2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmF4OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJ1aWxkaW5nOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNoaWxkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWFlXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBhdzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiMFxcXCJcIlxuICB9LFxuICBcIi5mYS1zcG9vbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiMVxcXCJcIlxuICB9LFxuICBcIi5mYS1jdWJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWIyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWN1YmVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWIzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlaGFuY2U6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmVoYW5jZS1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RlYW06YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc3RlYW0tc3F1YXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWI3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXJlY3ljbGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjhcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXV0b21vYmlsZTpiZWZvcmUsIC5mYS1jYXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FiOmJlZm9yZSwgLmZhLXRheGk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdHJlZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiYlxcXCJcIlxuICB9LFxuICBcIi5mYS1zcG90aWZ5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWJjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWRldmlhbnRhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYmRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc291bmRjbG91ZDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFiZVxcXCJcIlxuICB9LFxuICBcIi5mYS1kYXRhYmFzZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjMFxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXBkZi1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWMxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtd29yZC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtZXhjZWwtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjM1xcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXBvd2VycG9pbnQtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjNFxcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLXBob3RvLW86YmVmb3JlLCAuZmEtZmlsZS1waWN0dXJlLW86YmVmb3JlLCAuZmEtZmlsZS1pbWFnZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWM1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtemlwLW86YmVmb3JlLCAuZmEtZmlsZS1hcmNoaXZlLW86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxYzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZmlsZS1zb3VuZC1vOmJlZm9yZSwgLmZhLWZpbGUtYXVkaW8tbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjN1xcXCJcIlxuICB9LFxuICBcIi5mYS1maWxlLW1vdmllLW86YmVmb3JlLCAuZmEtZmlsZS12aWRlby1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWM4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZpbGUtY29kZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWM5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXZpbmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2FcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY29kZXBlbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjYlxcXCJcIlxuICB9LFxuICBcIi5mYS1qc2ZpZGRsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFjY1xcXCJcIlxuICB9LFxuICBcIi5mYS1saWZlLWJvdXk6YmVmb3JlLCAuZmEtbGlmZS1idW95OmJlZm9yZSwgLmZhLWxpZmUtc2F2ZXI6YmVmb3JlLCAuZmEtc3VwcG9ydDpiZWZvcmUsIC5mYS1saWZlLXJpbmc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2RcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2lyY2xlLW8tbm90Y2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxY2VcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcmE6YmVmb3JlLCAuZmEtcmViZWw6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDBcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2U6YmVmb3JlLCAuZmEtZW1waXJlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdpdC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2l0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhhY2tlci1uZXdzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRlbmNlbnQtd2VpYm86YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcXE6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZDZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtd2VjaGF0OmJlZm9yZSwgLmZhLXdlaXhpbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkN1xcXCJcIlxuICB9LFxuICBcIi5mYS1zZW5kOmJlZm9yZSwgLmZhLXBhcGVyLXBsYW5lOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ4XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlbmQtbzpiZWZvcmUsIC5mYS1wYXBlci1wbGFuZS1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWQ5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWhpc3Rvcnk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZGFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZ2VuZGVybGVzczpiZWZvcmUsIC5mYS1jaXJjbGUtdGhpbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFkYlxcXCJcIlxuICB9LFxuICBcIi5mYS1oZWFkZXI6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGFyYWdyYXBoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWRkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNsaWRlcnM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZGVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hhcmUtYWx0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWUwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoYXJlLWFsdC1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYm9tYjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlMlxcXCJcIlxuICB9LFxuICBcIi5mYS1zb2NjZXItYmFsbC1vOmJlZm9yZSwgLmZhLWZ1dGJvbC1vOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWUzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXR0eTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlNFxcXCJcIlxuICB9LFxuICBcIi5mYS1iaW5vY3VsYXJzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWU1XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBsdWc6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2xpZGVzaGFyZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlN1xcXCJcIlxuICB9LFxuICBcIi5mYS10d2l0Y2g6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZThcXFwiXCJcbiAgfSxcbiAgXCIuZmEteWVscDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlOVxcXCJcIlxuICB9LFxuICBcIi5mYS1uZXdzcGFwZXItbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFlYVxcXCJcIlxuICB9LFxuICBcIi5mYS13aWZpOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWViXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhbGN1bGF0b3I6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZWNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGF5cGFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWVkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWdvb2dsZS13YWxsZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2MtdmlzYTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmMFxcXCJcIlxuICB9LFxuICBcIi5mYS1jYy1tYXN0ZXJjYXJkOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWYxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLWRpc2NvdmVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWYyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLWFtZXg6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2MtcGF5cGFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWY0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNjLXN0cmlwZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmNVxcXCJcIlxuICB9LFxuICBcIi5mYS1iZWxsLXNsYXNoOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWY2XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWJlbGwtc2xhc2gtbzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmN1xcXCJcIlxuICB9LFxuICBcIi5mYS10cmFzaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmOFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb3B5cmlnaHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZjlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZmFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtZXllZHJvcHBlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmYlxcXCJcIlxuICB9LFxuICBcIi5mYS1wYWludC1icnVzaDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjFmY1xcXCJcIlxuICB9LFxuICBcIi5mYS1iaXJ0aGRheS1jYWtlOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMWZkXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWFyZWEtY2hhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYxZmVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtcGllLWNoYXJ0OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjAwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxpbmUtY2hhcnQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbGFzdGZtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjAyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWxhc3RmbS1zcXVhcmU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdG9nZ2xlLW9mZjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwNFxcXCJcIlxuICB9LFxuICBcIi5mYS10b2dnbGUtb246YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYmljeWNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwNlxcXCJcIlxuICB9LFxuICBcIi5mYS1idXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtaW94aG9zdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwOFxcXCJcIlxuICB9LFxuICBcIi5mYS1hbmdlbGxpc3Q6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMDlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2M6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2hla2VsOmJlZm9yZSwgLmZhLXNoZXFlbDpiZWZvcmUsIC5mYS1pbHM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWVhbnBhdGg6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMGNcXFwiXCJcbiAgfSxcbiAgXCIuZmEtYnV5c2VsbGFkczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwZFxcXCJcIlxuICB9LFxuICBcIi5mYS1jb25uZWN0ZGV2ZWxvcDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIwZVxcXCJcIlxuICB9LFxuICBcIi5mYS1kYXNoY3ViZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxMFxcXCJcIlxuICB9LFxuICBcIi5mYS1mb3J1bWJlZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxMVxcXCJcIlxuICB9LFxuICBcIi5mYS1sZWFucHViOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjEyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlbGxzeTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxM1xcXCJcIlxuICB9LFxuICBcIi5mYS1zaGlydHNpbmJ1bGs6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2ltcGx5YnVpbHQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtc2t5YXRsYXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMTZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtY2FydC1wbHVzOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjE3XFxcIlwiXG4gIH0sXG4gIFwiLmZhLWNhcnQtYXJyb3ctZG93bjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxOFxcXCJcIlxuICB9LFxuICBcIi5mYS1kaWFtb25kOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjE5XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNoaXA6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlci1zZWNyZXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbW90b3JjeWNsZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxY1xcXCJcIlxuICB9LFxuICBcIi5mYS1zdHJlZXQtdmlldzpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIxZFxcXCJcIlxuICB9LFxuICBcIi5mYS1oZWFydGJlYXQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMWVcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmVudXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjFcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyMlxcXCJcIlxuICB9LFxuICBcIi5mYS1tZXJjdXJ5OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjIzXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyYW5zZ2VuZGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjI0XFxcIlwiXG4gIH0sXG4gIFwiLmZhLXRyYW5zZ2VuZGVyLWFsdDpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyNVxcXCJcIlxuICB9LFxuICBcIi5mYS12ZW51cy1kb3VibGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWFycy1kb3VibGU6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMjdcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmVudXMtbWFyczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyOFxcXCJcIlxuICB9LFxuICBcIi5mYS1tYXJzLXN0cm9rZTpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIyOVxcXCJcIlxuICB9LFxuICBcIi5mYS1tYXJzLXN0cm9rZS12OmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjJhXFxcIlwiXG4gIH0sXG4gIFwiLmZhLW1hcnMtc3Ryb2tlLWg6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMmJcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbmV1dGVyOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjJjXFxcIlwiXG4gIH0sXG4gIFwiLmZhLWZhY2Vib29rLW9mZmljaWFsOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjMwXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXBpbnRlcmVzdC1wOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjMxXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXdoYXRzYXBwOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjMyXFxcIlwiXG4gIH0sXG4gIFwiLmZhLXNlcnZlcjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzM1xcXCJcIlxuICB9LFxuICBcIi5mYS11c2VyLXBsdXM6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzRcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdXNlci10aW1lczpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzNVxcXCJcIlxuICB9LFxuICBcIi5mYS1ob3RlbDpiZWZvcmUsIC5mYS1iZWQ6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzZcXFwiXCJcbiAgfSxcbiAgXCIuZmEtdmlhY29pbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzN1xcXCJcIlxuICB9LFxuICBcIi5mYS10cmFpbjpiZWZvcmVcIjoge1xuICAgIFwiY29udGVudFwiOiBcIlxcXCJcXFxcZjIzOFxcXCJcIlxuICB9LFxuICBcIi5mYS1zdWJ3YXk6YmVmb3JlXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJcXFwiXFxcXGYyMzlcXFwiXCJcbiAgfSxcbiAgXCIuZmEtbWVkaXVtOmJlZm9yZVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFwiXFxcIlxcXFxmMjNhXFxcIlwiXG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qKioqKioqKioqKioqKiogRm9udHMgKioqKioqKioqKioqKioqKiovXG4gICdleG9fcmVndWxhcic6IHJlcXVpcmUoJy4vZXhvX3JlZ3VsYXInKSxcbiAgJ2V4b19pdGFsaWMnOiByZXF1aXJlKCcuL2V4b19pdGFsaWMnKSxcbiAgJ2V4b19leHRyYWxpZ2h0JzogcmVxdWlyZSgnLi9leG9fZXh0cmFsaWdodCcpLFxuICAnZXhvX2V4dHJhbGlnaHRfaXRhbGljJzogcmVxdWlyZSgnLi9leG9fZXh0cmFsaWdodF9pdGFsaWMnKSxcbiAgJ2V4b19zZW1pYm9sZCc6IHJlcXVpcmUoJy4vZXhvX3NlbWlib2xkJyksXG4gICdleG9fc2VtaWJvbGRfaXRhbGljJzogcmVxdWlyZSgnLi9leG9fc2VtaWJvbGRfaXRhbGljJyksXG4gICdleG9fZXh0cmFib2xkJzogcmVxdWlyZSgnLi9leG9fZXh0cmFib2xkJyksXG4gICdleG9fZXh0cmFib2xkX2l0YWxpYyc6IHJlcXVpcmUoJy4vZXhvX2V4dHJhYm9sZF9pdGFsaWMnKSxcblxuICAnZm9udF9hd2Vzb21lJzogcmVxdWlyZSgnLi9mb250X2F3ZXNvbWUnKVxuXG59O1xuIiwiLy8gYXBwIGxvZ2dpbmcgc2V0dGluZ3NcbnZhciBzZXR0aW5ncyA9IHJlcXVpcmUoJy4vLi4vc2V0dGluZ3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBMb2cobWVzc2FnZSkge1xuXG4gIGlmICghc2V0dGluZ3MucHJvZHVjdGlvbikge1xuXG4gICAgY29uc29sZS5sb2coXCJEZXZlbG9wbWVudCBNZXNzYWdlOiBcIiArIG1lc3NhZ2UpO1xuICAgIHJldHVybjtcblxuICB9IGVsc2Uge1xuXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuXG4gIH1cblxufTtcbiIsIlxudmFyIGFuaW1hdGlvbkFtb3VudCA9IFwiMTAwJVwiO1xudmFyIGFuaW1hdGlvbkR1cmF0aW9uID0gXCIwLjRzXCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIG5hbWVzOiB7XG5cbiAgICBcInJpZ2h0LWZhc3RcIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLWxlZnQtZmFzdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodC1mYXN0XCIgfSxcbiAgICBcImxlZnQtZmFzdFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tcmlnaHQtZmFzdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1sZWZ0LWZhc3RcIiB9XG5cbiAgfSxcblxuICBzdHlsZXM6IHtcblxuICAgIFwiLm1vdmUtdG8tbGVmdC1mYXN0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9MZWZ0RmFzdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9LFxuXG4gICAgXCIubW92ZS1mcm9tLWxlZnQtZmFzdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21MZWZ0RmFzdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9LFxuXG4gICAgXCIubW92ZS10by1yaWdodC1mYXN0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9SaWdodEZhc3RcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1yaWdodC1mYXN0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbVJpZ2h0RmFzdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb0xlZnRGYXN0XCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKC1cIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlRnJvbUxlZnRGYXN0XCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1JpZ2h0RmFzdFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBtb3ZlRnJvbVJpZ2h0RmFzdFwiIDoge1xuICAgICAgZnJvbSA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBwcm9kdWN0aW9uOiBmYWxzZVxuXG59O1xuIiwidmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xudmFyIExvZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9sb2cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuICBhc3luYy5wYXJhbGxlbCh7XG5cbiAgICBsb2FkRGV2aWNlRXZlbnRzOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgfSxcblxuICB9LCBmdW5jdGlvbihlcnIpIHtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIExvZyhcIkVycm9yIGxvYWRpbmcgdGhlIGFwcFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBMb2coXCJBcHAgaXMgZG9uZSBsb2FkaW5nXCIpO1xuXG4gICAgICBBcHAuZW1pdChcImFwcDppbml0aWFsaXplZFwiKTtcblxuICAgICAgQXBwLlJvdXRlci5uYXZpZ2F0ZShcImhvbWVcIiwgXCJmYWRlXCIpO1xuXG4gICAgfVxuXG4gIH0pO1xuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAvKiBSZW1vdmUgdGhlIHNjcm9sbGJhciAqL1xuICBcIjo6LXdlYmtpdC1zY3JvbGxiYXJcIjoge1xuICAgIFwiZGlzcGxheVwiOiBcIm5vbmVcIlxuICB9LFxuXG4gIC8qIFNldCB0aGUgYmFzZSBmb250IHNpemUgdG8gMTBweCBhbmQgdXNlIHRoZSBFeG8gZm9udCAqL1xuICBcImh0bWxcIjoge1xuICAgIFwiZm9udC1zaXplXCI6IFwiMTBweFwiLFxuICAgIFwiZm9udC1mYW1pbHlcIjogXCJFeG9cIixcbiAgICBcImZvbnQtc3R5bGVcIjogXCJub3JtYWxcIixcbiAgICBcImZvbnQtd2VpZ2h0XCI6IFwibm9ybWFsXCIsXG4gICAgY29sb3I6IENvbG9ycy5ibGFja1xuICB9LFxuXG4gIC8qIFNldCB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgYXBwIHRvIG91ciBjaG9zZW4gbGlnaHRHcmF5IGNvbG9yICovXG4gIFwiI3NhbXNvbl9hcHBcIjoge1xuICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMubGlnaHRHcmF5XG4gIH1cbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGVsOiAnc2Ftc29uX2ZhZGVkX292ZXJsYXknLFxuICBzdHlsZToge1xuXG4gICAgXCIjc2Ftc29uX2ZhZGVkX292ZXJsYXlcIjoge1xuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiIzAwMFwiLFxuICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgIHRvcDogXCI2MHB4XCIsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICBcInotaW5kZXhcIjogMTAsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcbiAgICAgIHRyYW5zaXRpb246IFwib3BhY2l0eSAwLjJzIGxpbmVhciwgdmlzaWJpbGl0eSAwcyBsaW5lYXIgMC4yc1wiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl9mYWRlZF9vdmVybGF5LnNob3dcIjoge1xuICAgICAgb3BhY2l0eTogXCIwLjZcIixcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgXCJ0cmFuc2l0aW9uLWRlbGF5XCI6IFwiMHNcIlxuICAgIH1cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgQXBwLmVtaXQoXCJmYWRlZC1vdmVybGF5OmhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdmYWRlZC1vdmVybGF5OnNob3cnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICB9LFxuXG4gICAgJ2ZhZGVkLW92ZXJsYXk6aGlkZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIH0sXG5cbiAgICAnaGVhZGVyLWJ1dHRvbjpoaXQnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICB9XG5cbiAgfSxcblxuICBleHRlbmQ6IHt9LFxuXG4gIHJvdXRlcjoge1xuICAgIGJlZm9yZUFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG5cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIGR1cmluZ0FuaW1hdGU6IGZ1bmN0aW9uKGRhdGEpIHsgLy8gbm8gY2FsbGJhY2tcblxuICAgIH1cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYWZ0ZXIgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYWZ0ZXJSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gY2FjaGUgdGhlIGZhZGVkIG92ZXJsYXkgZWxlbWVudFxuICAgIEFwcC5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXkgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgZmFkZWQgb3ZlcmxheSBlbGVtZW50IGZyb20gdGhlIGNhY2hlXG4gICAgZGVsZXRlIEFwcC5ET00uc2Ftc29uX2ZhZGVkX292ZXJsYXk7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsIlxuZnVuY3Rpb24gc2V0SGVhZGVySGVpZ2h0KCkge1xuICB2YXIgbWF4ID0gMjAwOyBtaW4gPSA1MDtcbiAgcmV0dXJuIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKG1heC1taW4rMSkgKyBtaW4pKSArIFwicHhcIjtcbn1cblxudmFyIGhlYWRlcl9oZWlnaHQgPSBcIjYwcHhcIjsvLyBzZXRIZWFkZXJIZWlnaHQoKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdzYW1zb25faGVhZGVyJyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG4gIHN0eWxlOiB7XG5cbiAgICBcIiNzYW1zb25faGVhZGVyXCI6IHtcbiAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgXCJsZWZ0XCI6IFwiMFwiLFxuICAgICAgXCJyaWdodFwiOiBcIjBcIixcbiAgICAgIFwidG9wXCI6IFwiMFwiLFxuICAgICAgXCJoZWlnaHRcIjogaGVhZGVyX2hlaWdodCxcbiAgICAgIFwiei1pbmRleFwiOiAzLFxuICAgICAgXCJib3gtc2hhZG93XCI6IFwiMCAwIDhweCByZ2JhKDAsMCwwLDAuMylcIixcbiAgICAgIFwib3BhY2l0eVwiOiAxLFxuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiIzAwMDAwMFwiLFxuICAgICAgXCJ0cmFuc2l0aW9uXCI6IFwiYWxsIDAuNnMgZWFzZVwiLFxuICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGUzZCgwLC1cIiArIGhlYWRlcl9oZWlnaHQgKyBcIiwwKVwiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl9oZWFkZXIuc2hvd1wiOiB7XG4gICAgICBcIm9wYWNpdHlcIjogMSxcbiAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMCwwLDApXCJcbiAgICB9LFxuXG4gICAgXCIjc2Ftc29uX2hlYWRlcl90aXRsZVwiOiB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwibGVmdFwiOiBcIjUwJVwiLFxuICAgICAgXCJ0b3BcIjogXCI1MCVcIixcbiAgICAgIFwiaGVpZ2h0XCI6IFwiNDBweFwiLFxuICAgICAgXCJsaW5lLWhlaWdodFwiOiBcIjQwcHhcIixcbiAgICAgIFwid2lkdGhcIjogXCI2MCVcIixcbiAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlKC01MCUsLTUwJSlcIixcbiAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCIsXG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIjNyZW1cIixcbiAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcIm1pZGRsZVwiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl9oZWFkZXJfYnV0dG9uXCI6IHtcbiAgICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgICAgXCJsZWZ0XCI6IFwiMTBweFwiLFxuICAgICAgXCJ0b3BcIjogXCIxMHB4XCIsXG4gICAgICBcImhlaWdodFwiOiBcIjQwcHhcIixcbiAgICAgIFwibGluZS1oZWlnaHRcIjogXCI0MHB4XCIsXG4gICAgICBcIndpZHRoXCI6IFwiNDBweFwiLFxuICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgIFwiZm9udC1zaXplXCI6IFwiNHJlbVwiLFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwibWlkZGxlXCJcbiAgICB9XG5cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgY29uc29sZS5sb2coXCJIZWFkZXIgSGl0XCIpO1xuICAgIH0sXG5cbiAgICAndG91Y2ggI3NhbXNvbl9oZWFkZXJfYnV0dG9uJzogZnVuY3Rpb24oKSB7XG4gICAgICBBcHAuZW1pdCgnaGVhZGVyLWJ1dHRvbjpoaXQnKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICdhcHA6aW5pdGlhbGl6ZWQnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaGFuZGxlSGVhZGVyKFwiYWRkXCIpO1xuICAgIH0sXG5cbiAgICAnaGVhZGVyOnNob3cnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaGFuZGxlSGVhZGVyKFwiYWRkXCIpO1xuICAgIH0sXG5cbiAgICAnaGVhZGVyOmhpZGUnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaGFuZGxlSGVhZGVyKFwicmVtb3ZlXCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuICAgIGhlYWRlckhlaWdodDogaGVhZGVyX2hlaWdodCxcbiAgICBoYW5kbGVIZWFkZXI6IGZ1bmN0aW9uKGtpbmQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3Rba2luZF0oXCJzaG93XCIpO1xuICAgIH1cbiAgfSxcblxuICByb3V0ZXI6IHtcbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICAvLyBpZiB0aGUgcGFnZSBpcyBmdWxsc2NyZWVuLCB0aGVuIGhpZGUgdGhlIGhlYWRlciBhbmQgc3RyZXRjaCB0aGUgcGFnZSB0byB0aGUgdG9wIG9mIHRoZSBzY3JlZW5cbiAgICAgIGlmIChBcHAuUm91dGVyLnBhZ2VDYWNoZVtkYXRhLm5leHRQYWdlXS5mdWxsc2NyZWVuKSB7XG4gICAgICAgIEFwcC5ET01bZGF0YS5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5zdHlsZS50b3AgPSBcIlwiO1xuICAgICAgICB0aGlzLmhhbmRsZUhlYWRlcihcInJlbW92ZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEFwcC5ET01bZGF0YS5pbmFjdGl2ZVBhZ2VFbGVtZW50XS5zdHlsZS50b3AgPSB0aGlzLmhlYWRlckhlaWdodDtcbiAgICAgICAgdGhpcy5oYW5kbGVIZWFkZXIoXCJhZGRcIik7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSxcblxuICAgIGR1cmluZ0FuaW1hdGU6IGZ1bmN0aW9uKGRhdGEpIHsgLy8gbm8gY2FsbGJhY2tcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3RpdGxlOiBBcHAuRGF0YS5IZWFkZXJUaXRsZX0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBtdXN0IHN5bmNocm9ub3VzbHkgcmV0dXJuIGFuIG9iamVjdCB0aGF0IHdpbGwgc2V0IHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnQuIHRoaXMgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSB0ZW1wbGF0aW5nIGVuZ2luZVxuICBzZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHRpdGxlOiBcIkhlYWRlclwiXG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBiZWZvcmUgdGhlIFBhZ2UgaXMgcmVuZGVyZWRcbiAgYmVmb3JlUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGlmICghQXBwLkRhdGEuSGVhZGVyVGl0bGUpIHtcbiAgICAgIEFwcC5EYXRhLkhlYWRlclRpdGxlID0gXCJIb21lXCI7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgaGVhZGVyIGVsZW1lbnRcbiAgICBBcHAuRE9NLnNhbXNvbl9oZWFkZXIgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vIGRlbGV0ZSB0aGUgaGVhZGVyIGVsZW1lbnQgZnJvbSB0aGUgY2hhY2hlXG4gICAgZGVsZXRlIEFwcC5ET00uc2Ftc29uX2hlYWRlcjtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAodGl0bGUpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl9idXR0b25cXFwiPjxpIGNsYXNzPVxcXCJmYSBmYS1iYXJzXFxcIj48L2k+PC9kaXY+PGRpdiBpZD1cXFwic2Ftc29uX2hlYWRlcl90aXRsZVxcXCI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gdGl0bGUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcInRpdGxlXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC50aXRsZTp0eXBlb2YgdGl0bGUhPT1cInVuZGVmaW5lZFwiP3RpdGxlOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgaGVhZGVyIDogcmVxdWlyZSgnLi9oZWFkZXInKSxcblxuICBzaWRlTWVudSA6IHJlcXVpcmUoJy4vc2lkZU1lbnUnKSxcblxuICBmYWRlZE92ZXJsYXkgOiByZXF1aXJlKCcuL2ZhZGVkT3ZlcmxheScpLFxuXG4gIHRyYW5zcGFyZW50T3ZlcmxheSA6IHJlcXVpcmUoJy4vdHJhbnNwYXJlbnRPdmVybGF5JylcblxufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdzYW1zb25fc2lkZW1lbnUnLFxuICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vdGVtcGxhdGUuamFkZVwiKSxcbiAgc3R5bGU6IHtcblxuICAgIFwiI3NhbXNvbl9zaWRlbWVudVwiOiB7XG4gICAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICAgIFwiei1pbmRleFwiOiAxMSxcbiAgICAgIFwibGVmdFwiOiBcIi0yNDBweFwiLFxuICAgICAgXCJ0b3BcIjogXCI2MHB4XCIsXG4gICAgICBcImJvdHRvbVwiOiBcIjBcIixcbiAgICAgIFwid2lkdGhcIiA6IFwiMjQwcHhcIixcbiAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBDb2xvcnMuZ3JheSxcbiAgICAgIFwidHJhbnNpdGlvblwiOiBcImFsbCAwLjJzIGVhc2UtaW4tb3V0XCIsXG4gICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiXG4gICAgfSxcblxuICAgIFwiI3NhbXNvbl9zaWRlbWVudS5vcGVuXCI6IHtcbiAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlM2QoMjQwcHgsMCwwKVwiXG4gICAgfSxcblxuICAgIFwiLnNpZGVtZW51X2l0ZW1cIjoge1xuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgcGFkZGluZzogXCI1cHggMCA1cHggMFwiLFxuICAgICAgY29sb3I6IENvbG9ycy53aGl0ZSxcbiAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgXCJmb250LXNpemVcIjogXCIycmVtXCJcbiAgICB9LFxuXG4gICAgXCIuc2lkZW1lbnVfaXRlbTphY3RpdmVcIjoge1xuICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IENvbG9ycy50dXJxdW9pc2VcbiAgICB9XG5cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgY29uc29sZS5sb2coXCJTaWRlTWVudSBIaXRcIik7XG4gICAgfSxcblxuICAgICd0b3VjaCAuc2lkZW1lbnVfaXRlbSc6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcbiAgICAgIEFwcC5lbWl0KFwiZmFkZWQtb3ZlcmxheTpoaWRlXCIpO1xuXG4gICAgICB2YXIgcGFnZSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhZ2VcIik7XG5cbiAgICAgIC8vIG9ubHkgbmF2aWdhdGUgaWYgdGhleSBhcmVuJ3Qgb24gdGhlIHBhZ2VcbiAgICAgIGlmIChwYWdlICE9PSBBcHAuUm91dGVyLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgIEFwcC5Sb3V0ZXIubmF2aWdhdGUocGFnZSwgXCJyaWdodFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9LFxuXG4gIGFwcEV2ZW50czoge1xuXG4gICAgJ2hlYWRlci1idXR0b246aGl0JzogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmhhbmRsZVNpZGVNZW51KCk7XG4gICAgfSxcblxuICAgICdmYWRlZC1vdmVybGF5OmhpdCc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge1xuICAgIGhhbmRsZVNpZGVNZW51OiBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gaWYgdGhlIHNpZGVtZW51IGlzIGNsb3NlZCB0aGVuIG9wZW4gaXQsIGlmIG9wZW4gdGhlbiBjbG9zZSBpdFxuICAgICAgaWYgKHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgcm91dGVyOiB7XG4gICAgYmVmb3JlQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcblxuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LFxuXG4gICAgZHVyaW5nQW5pbWF0ZTogZnVuY3Rpb24oZGF0YSkgeyAvLyBubyBjYWxsYmFja1xuXG4gICAgfVxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuXG4gICAgICBwYWdlczogW1xuICAgICAgICB7cGFnZTpcImhvbWVcIiwgZGlzcGxheTpcIkhvbWVcIn0sXG4gICAgICAgIHtwYWdlOlwibG9naW5cIiwgZGlzcGxheTpcIkxvZ2luXCJ9XG4gICAgICBdXG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgc2lkZW1lbnUgZWxlbWVudFxuICAgIEFwcC5ET00uc2Ftc29uX3NpZGVtZW51ID0gdGhpcy5lbGVtZW50O1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyByaWdodCBiZWZvcmUgdGhlIFBhZ2UgaXMgZGVzdHJveWVkXG4gIGJlZm9yZVJlbW92ZSA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBkZWxldGUgdGhlIHNpZGVtZW51IGVsZW1lbnQgZnJvbSB0aGUgY2FjaGVcbiAgICBkZWxldGUgQXBwLkRPTS5zYW1zb25fc2lkZW1lbnU7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKHBhZ2VzLCB1bmRlZmluZWQpIHtcbi8vIGl0ZXJhdGUgcGFnZXNcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gcGFnZXM7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciBpdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wYWdlXCIsIGl0ZW0ucGFnZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJzaWRlbWVudV9pdGVtXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBpdGVtLmRpc3BsYXkpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciBpdGVtID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5hdHRyKFwiZGF0YS1wYWdlXCIsIGl0ZW0ucGFnZSwgdHJ1ZSwgZmFsc2UpKSArIFwiIGNsYXNzPVxcXCJzaWRlbWVudV9pdGVtXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBpdGVtLmRpc3BsYXkpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTtcbiAgICB9XG5cbiAgfVxufSkuY2FsbCh0aGlzKTtcbn0uY2FsbCh0aGlzLFwicGFnZXNcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnBhZ2VzOnR5cGVvZiBwYWdlcyE9PVwidW5kZWZpbmVkXCI/cGFnZXM6dW5kZWZpbmVkLFwidW5kZWZpbmVkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51bmRlZmluZWQ6dHlwZW9mIHVuZGVmaW5lZCE9PVwidW5kZWZpbmVkXCI/dW5kZWZpbmVkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZWw6ICdzYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheScsXG4gIHN0eWxlOiB7XG5cbiAgICBcIiNzYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheVwiOiB7XG4gICAgICBcImJhY2tncm91bmQtY29sb3JcIjogXCIjMDAwXCIsXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHJpZ2h0OiAwLFxuICAgICAgYm90dG9tOiAwLFxuICAgICAgXCJ6LWluZGV4XCI6IDEwLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCJcbiAgICB9LFxuXG4gICAgXCIjc2Ftc29uX3RyYW5zcGFyZW50X292ZXJsYXkuc2hvd1wiOiB7XG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIlxuICAgIH1cbiAgfSxcblxuICBkb21FdmVudHM6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgY29uc29sZS5sb2coXCJUcmFucGFyZW50IE92ZXJsYXkgSGl0XCIpO1xuICAgICAgQXBwLmVtaXQoXCJ0cmFuc3BhcmVudC1vdmVybGF5OmhpdFwiKTtcbiAgICB9XG5cbiAgfSxcblxuICBhcHBFdmVudHM6IHtcblxuICAgICd0cmFuc3BhcmVudC1vdmVybGF5OnNob3cnOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICB9LFxuXG4gICAgJ3RyYW5zcGFyZW50LW92ZXJsYXk6aGlkZSc6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIH1cblxuICB9LFxuXG4gIGV4dGVuZDoge30sXG5cbiAgcm91dGVyOiB7XG5cbiAgICBiZWZvcmVBbmltYXRlOiBmdW5jdGlvbihkYXRhLCBjYWxsYmFjaykge1xuXG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0sXG5cbiAgICBhZnRlckFuaW1hdGU6IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICAvLyBjYWNoZSB0aGUgdHJhbnNwYXJlbnQgb3ZlcmxheSBlbGVtZW50XG4gICAgQXBwLkRPTS5zYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheSA9IHRoaXMuZWxlbWVudDtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgLy8gZGVsZXRlIHRoZSB0cmFuc3BhcmVudCBvdmVybGF5IGVsZW1lbnQgZnJvbSB0aGUgY2FjaGVcbiAgICBkZWxldGUgQXBwLkRPTS5zYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheTtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBuYW1lOiAnaG9tZScsXG4gIHN1YlBhZ2VPZjogZmFsc2UsXG4gIHByZXZpb3VzUGFnZTogZmFsc2UsXG4gIHRlbXBsYXRlOiByZXF1aXJlKFwiLi90ZW1wbGF0ZS5qYWRlXCIpLFxuICBzdHlsZToge1xuXG4gICAgXCIjaG9tZS1wYWdlXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgfSxcblxuICAgIFwiLmhvbWUtcGFnZS10aXRsZVwiOiB7XG4gICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgXCJmb250LXNpemVcIjogXCIzcmVtXCIsXG4gICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgIFwiY29sb3JcIjogQ29sb3JzLnR1cnF1b2lzZVxuICAgIH1cblxuICB9LFxuXG4gIGRvbUV2ZW50cyA6IHtcblxuICAgICd0b3VjaCcgOiBmdW5jdGlvbihldmVudCwgdGFyZ2V0KSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkhvbWUgUGFnZSBoaXRcIik7XG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzIDoge1xuXG4gIH0sXG5cbiAgZXh0ZW5kIDoge1xuXG4gIH0sXG5cbiAgY29tcG9uZW50cyA6IHtcblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgbmFtZTogXCJIb21lIFBhZ2VcIlxuICAgIH07XG5cbiAgICByZXR1cm4gc3RhdGU7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgYmVmb3JlIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGJlZm9yZVJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBBcHAuRGF0YS5IZWFkZXJUaXRsZSA9IFwiSG9tZVwiO1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9LFxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gcnVucyBhZnRlciB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBhZnRlclJlbmRlciA6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIHJpZ2h0IGJlZm9yZSB0aGUgUGFnZSBpcyBkZXN0cm95ZWRcbiAgYmVmb3JlUmVtb3ZlIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIC8vdGhpcy50b3BCb3gub2ZmKCdjbGlja2VkJyk7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH1cblxufTtcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hbWUpIHtcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiaG9tZS1wYWdlLXRpdGxlXFxcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBuYW1lKSA9PSBudWxsID8gJycgOiBqYWRlX2ludGVycCkpICsgXCI8L2Rpdj5cIik7fS5jYWxsKHRoaXMsXCJuYW1lXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5uYW1lOnR5cGVvZiBuYW1lIT09XCJ1bmRlZmluZWRcIj9uYW1lOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIlxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgaG9tZTogcmVxdWlyZSgnLi9ob21lJyksXG5cbiAgbG9naW46IHJlcXVpcmUoJy4vbG9naW4nKVxuXG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBuYW1lOiAnbG9naW4nLFxuICBzdWJQYWdlT2Y6IGZhbHNlLFxuICBwcmV2aW91c1BhZ2U6IGZhbHNlLFxuICBiYWNrU2FmZTogdHJ1ZSxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3RlbXBsYXRlLmphZGVcIiksXG4gIHN0eWxlOiB7XG5cbiAgICBcIiNsb2dpbi1wYWdlXCI6IHtcbiAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgfSxcblxuICAgIFwiLmxvZ2luLXBhZ2UtdGl0bGVcIjoge1xuICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgIFwiZm9udC1zaXplXCI6IFwiM3JlbVwiLFxuICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICBcImNvbG9yXCI6IENvbG9ycy5ibHVlXG4gICAgfVxuXG4gIH0sXG5cbiAgZXh0ZW5kOiB7XG4gICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gIH0sXG5cbiAgZG9tRXZlbnRzIDoge1xuXG4gICAgJ3RvdWNoJyA6IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9naW4gUGFnZSBoaXRcIik7XG4gICAgfVxuXG4gIH0sXG5cbiAgYXBwRXZlbnRzIDoge1xuICB9LFxuXG4gIHNldENvbXBvbmVudHMgOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBjb21wb25lbnRzID0ge307XG5cbiAgICByZXR1cm4gY29tcG9uZW50cztcblxuICB9LFxuXG4gIC8vIG11c3Qgc3luY2hyb25vdXNseSByZXR1cm4gYW4gb2JqZWN0IHRoYXQgd2lsbCBzZXQgdGhlIGluaXRpYWwgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC4gdGhpcyBvYmplY3Qgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHRlbXBsYXRpbmcgZW5naW5lXG4gIHNldEluaXRpYWxTdGF0ZSA6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgbmFtZTogXCJMb2dpbiBQYWdlXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHN0YXRlO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGJlZm9yZSB0aGUgUGFnZSBpcyByZW5kZXJlZFxuICBiZWZvcmVSZW5kZXIgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgQXBwLkRhdGEuSGVhZGVyVGl0bGUgPSBcIkxvZ2luXCI7XG5cbiAgICBjYWxsYmFjaygpO1xuXG4gIH0sXG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBydW5zIGFmdGVyIHRoZSBQYWdlIGlzIHJlbmRlcmVkXG4gIGFmdGVyUmVuZGVyIDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAgIGNhbGxiYWNrKCk7XG5cbiAgfSxcblxuICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBQYWdlIGlzIGRlc3Ryb3llZFxuICBiZWZvcmVSZW1vdmUgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gICAgY2FsbGJhY2soKTtcblxuICB9XG5cbn07XG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYW1lKSB7XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImxvZ2luLXBhZ2UtdGl0bGVcXFwiPlwiICsgKGphZGUuZXNjYXBlKChqYWRlX2ludGVycCA9IG5hbWUpID09IG51bGwgPyAnJyA6IGphZGVfaW50ZXJwKSkgKyBcIjwvZGl2PlwiKTt9LmNhbGwodGhpcyxcIm5hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hbWU6dHlwZW9mIG5hbWUhPT1cInVuZGVmaW5lZFwiP25hbWU6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiLy8gVGlueSBBc3luYyBsaWJyYXJ5IGZvciB1c2UgaW4gbW9kZXJuIGVudmlyb25tZW50c1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gcm9vdCBpcyBnbG9iYWwgb24gdGhlIHNlcnZlciwgYW5kIHdpbmRvdyBpbiB0aGUgYnJvd3NlclxuICB2YXIgcm9vdDtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgdGhpcyA9PT0gd2luZG93KSB7XG4gICAgcm9vdCA9IHdpbmRvdztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIHRoaXMgPT09IGdsb2JhbCkge1xuICAgIHJvb3QgPSBnbG9iYWw7XG4gIH0gZWxzZSB7XG4gICAgcm9vdCA9IHRoaXM7XG4gIH1cblxuICAvLyBjYWNoZWQgZm9yIHBlcmZvcm1hbmNlXG4gIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICB2YXIgT2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzO1xuXG4gIC8vIGlzQXJyYXkgYW5kIGlzT2JqZWN0IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBpc0FycmF5KGFycikge1xuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKTtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0S2V5cyhvYmopLmxlbmd0aCA+IDApO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9FYWNoKGFyciwgaXRlcmF0b3IpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlcmF0b3IoYXJyW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2FvbGFuL2FzeW5jXG4gIGZ1bmN0aW9uIGRvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJDYWxsYmFjayBhbHJlYWR5IGNhbGxlZC5cIik7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkocm9vdCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBfZG9PbmNlKGZuKSB7XG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsZWQpIHJldHVybjtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICB2YXIgYXN5bmMgPSB7XG5cbiAgICAvLyBydW5zIHRoZSB0YXNrIG9uIGV2ZXJ5IGl0ZW0gaW4gdGhlIGFycmF5IGF0IG9uY2VcbiAgICBlYWNoIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgZG9FYWNoKGFyciwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpdGVyYXRvcihpdGVtLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVkKys7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkID49IGFtb3VudCkgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gcnVucyB0aHJvdWdoIHRoZSBhcnJheSBvbmUgaXRlbSBhdCBhIHRpbWVcbiAgICBlYWNoU2VyaWVzIDogZnVuY3Rpb24oYXJyLCBpdGVyYXRvciwgY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gX2RvT25jZShjYWxsYmFjayB8fCBub29wKTtcbiAgICAgIHZhciBhbW91bnQgPSBhcnIubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBjb21wbGV0ZWQgPSAwO1xuICAgICAgdmFyIGl0ZXJhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyW2NvbXBsZXRlZF0sIGRvT25jZShmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBub29wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA8IGFtb3VudCkge1xuICAgICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgICAgaXRlcmF0ZSgpO1xuICAgIH0sXG5cbiAgICAvLyBjYW4gYWNjZXB0IGFuIG9iamVjdCBvciBhcnJheVxuICAgIC8vIHdpbGwgcmV0dXJuIGFuIG9iamVjdCBvciBhcnJheSBvZiByZXN1bHRzIGluIHRoZSBjb3JyZWN0IG9yZGVyXG4gICAgcGFyYWxsZWwgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgdmFyIGtleXM7IHZhciBsZW5ndGg7IHZhciBpOyB2YXIgcmVzdWx0czsgdmFyIGtpbmQ7XG4gICAgICB2YXIgdXBkYXRlZF90YXNrcyA9IFtdO1xuICAgICAgdmFyIGlzX29iamVjdDtcbiAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgaWYgKGlzQXJyYXkodGFza3MpKSB7XG5cbiAgICAgICAgbGVuZ3RoID0gdGFza3MubGVuZ3RoO1xuICAgICAgICByZXN1bHRzID0gW107XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGFza3MpKSB7XG5cbiAgICAgICAgaXNfb2JqZWN0ID0gdHJ1ZTtcbiAgICAgICAga2V5cyA9IE9iamVjdEtleXModGFza3MpO1xuICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IHt9O1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChpPTA7IGk8bGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBpZiAoaXNfb2JqZWN0KSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazoga2V5c1tpXSwgdDogdGFza3Nba2V5c1tpXV0gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlZF90YXNrcy5wdXNoKHsgazogaSwgdDogdGFza3NbaV0gfSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkX3Rhc2tzLmZvckVhY2goZnVuY3Rpb24odGFza19vYmplY3QpIHtcblxuICAgICAgICB0YXNrX29iamVjdC50KGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG5cbiAgICAgICAgICByZXN1bHRzW3Rhc2tfb2JqZWN0LmtdID0gcmVzdWx0O1xuXG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIGlmIChjb3VudGVyID09IGxlbmd0aCkgY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICAvLyBvbmx5IGFjY2VwdHMgYW4gYXJyYXkgc2luY2UgdGhlIHByZXNlcnZhdGlvbiBvZiB0aGUgb3JkZXIgb2YgcHJvcGVydGllcyBvbiBhbiBvYmplY3QgY2FuJ3QgYmUgZ3VhcmFudGVlZFxuICAgIC8vIHJldHVybnMgYW4gYXJyYXkgb2YgcmVzdWx0cyBpbiBvcmRlclxuICAgIHNlcmllcyA6IGZ1bmN0aW9uKHRhc2tzLCBjYWxsYmFjaykge1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFza3MpKSByZXR1cm4gY2FsbGJhY2soKTtcblxuICAgICAgdmFyIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgIGZ1bmN0aW9uIHJ1blRhc2soaW5kZXgpIHtcbiAgICAgICAgdGFza3NbaW5kZXhdKGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgcmVzdWx0c1tpbmRleF0gPSByZXN1bHQ7XG4gICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSkgcmV0dXJuIHJ1blRhc2soaW5kZXggKyAxKTtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgcmVzdWx0cyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBydW5UYXNrKDApO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBhc3luYztcbiAgfVxuICAvLyBBTUQgLyBSZXF1aXJlSlNcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFzeW5jO1xuICAgIH0pO1xuICB9XG4gIC8vIGluY2x1ZGVkIGRpcmVjdGx5IHZpYSA8c2NyaXB0PiB0YWdcbiAgZWxzZSB7XG4gICAgcm9vdC5hc3luYyA9IGFzeW5jO1xuICB9XG5cbn0oKSk7XG4iLG51bGwsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCIvLyBTYW1zb24uQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uXG4vLyBVc2VkIHRvIHNpbXBsaWZ5IGNvbXBvbmVudCByZW5kZXJpbmcgYW5kIHRyYW5zaXRpb25zIGluIHNpbmdsZSBwYWdlIGFwcHNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBTaGFyZWQgPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGpzcyA9IHJlcXVpcmUoJ2pzcycpO1xuXG4vKiBvcHRpb25zIGNhbiBpbmNsdWRlOlxuLy8gZWwgLSB0aGUgaWQgb2YgdGhlIGVsZW1lbnQgdGhhdCB0aGUgdmlldyB3aWxsIHJlbmRlciBpbnRvXG4vLyB0ZW1wbGF0ZS9yZW5kZXIgLSB0aGUgZnVuY3Rpb24gdGhhdCBvdXRwdXRzIGFuIEhUTUwgc3RyaW5nIHRoYXQgZ2V0cyBhdHRhY2hlZCB0byB0aGUgRE9NXG4vLyBzdHlsZSAtIEpTUyBzdHlsZSBvYmplY3Rcbi8vIGNvbXBvbmVudHMgLSBhbnkgb3RoZXIgY29tcG9uZW50cyB0aGF0IHNob3VsZCBiZSBsb2FkZWQvcmVmcmVzaGVkIHdpdGggdGhpcyBjb21wb25lbnRcbi8vIGV2ZW50cy9kb21FdmVudHMgLSBhbnkgZXZlbnRMaXN0ZW5lcnMgdG8gYXR0YWNoIHRvIERPTSBub2Rlc1xuLy8gYXBwRXZlbnRzIC0gYW55IGludGVybmFsIGFwcCBldmVudExpc3RlbmVyc1xuLy8gYmVmb3JlUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWQgKHVwZGF0ZSBtb2RlbHMsIHNvcnQgY29sbGVjdGlvbnMpXG4vLyBhZnRlclJlbmRlciAtIGEgZnVuY3Rpb24gdGhhdCBydW5zIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWQgKHNjcm9sbCB0byB0aGUgdG9wIG9mIHRoZSBwYWdlLCBtYXJrZWQgY2hlY2tib3hlcyBhcyBjaGVja2VkKVxuLy8gYmVmb3JlUmVtb3ZlIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgcmlnaHQgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZnVsbHkgZGVzdHJveWVkIChjbGVhbnVwIG1vZGVscywgdXBkYXRlIGFjdGl2aXR5IGhpc3RvcnkpXG4vLyBjdXN0b20vZXh0ZW5kIC0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgY3VzdG9tIG1ldGhvZHMvcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIENvbXBvbmVudCBpbnN0YW5jZSBpZiB0aGVyZSBhcmUgbm8gbmFtaW5nIGNvbmZsaWN0cyB3aXRoIHJlc2VydmVkIHByb3BlcnRpZXNcbiovXG5cbmZ1bmN0aW9uIFNhbXNvbkNvbXBvbmVudChvcHRpb25zKSB7XG5cbiAgLy8gc2V0IHRoZSBlbGVtZW50J3Mgc2VsZWN0b3IgdGhhdCB3aWxsIGRldGVybWluZSB3aGVyZSB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkXG4gIHRoaXMuZWwgPSAob3B0aW9ucy5lbC5jaGFyQXQoMCkgPT09IFwiI1wiKSA/IG9wdGlvbnMuZWwuc2xpY2UoMSkgOiBvcHRpb25zLmVsO1xuXG4gIC8vIGpzcyBzdHlsZVNoZWV0XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHlsZSA9PT0gXCJvYmplY3RcIikge1xuICAgIHRoaXMuc3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldChvcHRpb25zLnN0eWxlLCB7bmFtZWQ6IGZhbHNlfSk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGNvbXBvbmVudCBldmVudHMgaWYgdGhleSBhcmUgc3BlY2lmaWVkXG4gIHRoaXMuZG9tRXZlbnRzID0gb3B0aW9ucy5ldmVudHMgPyBvcHRpb25zLmV2ZW50cyA6IChvcHRpb25zLmRvbUV2ZW50cyB8fCB7fSk7XG4gIHRoaXMuYXBwRXZlbnRzID0gb3B0aW9ucy5hcHBFdmVudHMgfHwge307XG5cbiAgLy8gc3ViY29tcG9uZW50c1xuICB0aGlzLnNldENvbXBvbmVudHMgPSBvcHRpb25zLnNldENvbXBvbmVudHMgfHwgZnVuY3Rpb24oKSB7IHJldHVybiAob3B0aW9ucy5jb21wb25lbnRzIHx8IHt9KTsgfTtcbiAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG4gIHRoaXMuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcblxuICAvLyBzZXRJbml0aWFsU3RhdGUgZnVuY3Rpb25cbiAgdGhpcy5zZXRJbml0aWFsU3RhdGUgPSBvcHRpb25zLnNldEluaXRpYWxTdGF0ZSB8fCBTaGFyZWQuanVzdFJldHVybk9iamVjdDtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xuICB0aGlzLl9pbml0aWFsU3RhdGVTZXQgPSBmYWxzZTtcbiAgdGhpcy5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgdGhpcy5fbG9hZGVkRXZlbnRzID0gW107XG5cbiAgLy8gc2V0IHRoZSBjb21wb25lbnQncyByZW5kZXIgZnVuY3Rpb24gdGhhdCB3aWxsIG91dHB1dCBhbiBodG1sIHN0cmluZ1xuICAvLyBpZiBubyByZW5kZXIgZnVuY3Rpb24gd2FzIHBhc3NlZCBpbiwgd2UgY2hlY2sgZm9yIGEgdGVtcGxhdGUgZnVuY3Rpb25cbiAgdGhpcy5fdGVtcGxhdGUgPSBvcHRpb25zLnJlbmRlciB8fCBvcHRpb25zLnRlbXBsYXRlO1xuXG4gIC8vIHNldCB0aGUgYmVmb3JlUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5iZWZvcmVSZW5kZXIgPSBvcHRpb25zLmJlZm9yZVJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgYWZ0ZXJSZW5kZXIgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZFxuICB0aGlzLmFmdGVyUmVuZGVyID0gb3B0aW9ucy5hZnRlclJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgcmVtb3ZlL2Nsb3NlIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWQsIG90aGVyd2lzZSBqdXN0IGludm9rZSBjYWxsYmFja1xuICB0aGlzLmJlZm9yZVJlbW92ZSA9IG9wdGlvbnMuYmVmb3JlUmVtb3ZlIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gYWRkIGFueSByb3V0ZXItcmVsYXRlZCB0YXNrc1xuICB0aGlzLl91dWlkID0gdGhpcy5lbCArIFwiLVwiICsgRGF0ZS5ub3coKTsgLy8gdGhlIHV1aWQgYWxsb3dzIHVzIHRvIGVhc2lseSByZWZlcmVuY2UgdGhlIGFkZGVkIHJvdXRlciB0YXNrc1xuICB0aGlzLl9yb3V0ZXIgPSBvcHRpb25zLlJvdXRlciB8fCBvcHRpb25zLnJvdXRlciB8fCB7fTtcbiAgU2hhcmVkLmFkZFJvdXRlclRhc2tzKHRoaXMpO1xuXG4gIC8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHBhc3NlZCBpbnRvIHRoZSBjdXN0b20gb3IgZXh0ZW5kIG9iamVjdFxuICB2YXIgY3VzdG9tID0gb3B0aW9ucy5leHRlbmQgfHwgb3B0aW9ucy5jdXN0b20gfHwge307XG4gIFV0aWxzLmV4dGVuZCh0aGlzLCBjdXN0b20sIFNoYXJlZC5yZXNlcnZlZCk7XG5cbn1cblxuLy8gSGF2ZSB0aGUgU2Ftc29uQ29tcG9uZW50IGNsYXNzIGluaGVyaXQgYW55IHNoYXJlZCBtZXRob2RzIGZyb20gUGFnZUNvbXBvbmVudEJhc2VcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3R5cGUgPSBcIkNvbXBvbmVudFwiO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IFNoYXJlZC5zZXRTdGF0ZTtcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2RvRmlyc3QgPSBTaGFyZWQuX2RvRmlyc3Q7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9sb2FkRXZlbnRzID0gU2hhcmVkLl9sb2FkRXZlbnRzO1xuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fZGVzdHJveUV2ZW50cyA9IFNoYXJlZC5fZGVzdHJveUV2ZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX2xvYWRDb21wb25lbnRzID0gU2hhcmVkLl9sb2FkQ29tcG9uZW50cztcblNhbXNvbkNvbXBvbmVudC5wcm90b3R5cGUuX3JlbmRlckNvbXBvbmVudHMgPSBTaGFyZWQuX3JlbmRlckNvbXBvbmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9kZXN0cm95Q29tcG9uZW50cyA9IFNoYXJlZC5fZGVzdHJveUNvbXBvbmVudHM7XG5TYW1zb25Db21wb25lbnQucHJvdG90eXBlLl9yZW1vdmUgPSBTaGFyZWQuX3JlbW92ZTtcblxuLy8gcmVuZGVyIHRoZSBjb21wb25lbnQgdG8gdGhlIERPTVxuU2Ftc29uQ29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24oZm9yY2VfdXBkYXRlLCBjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLl9sb2FkQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZVJlbmRlclwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgaWYgKCFzZWxmLl9pbml0aWFsU3RhdGVTZXQpIHtcbiAgICAgICAgc2VsZi5zdGF0ZSA9IHNlbGYuc2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgIHNlbGYuX2luaXRpYWxTdGF0ZVNldCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHNlbGYuc3R5bGUpIHNlbGYuc3R5bGUuYXR0YWNoKCk7IC8vIGxvYWQgdGhlIHN0eWxlc2hlZXQgb24gZmlyc3QgcmVuZGVyXG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgY29tcG9uZW50IGVsZW1lbnRcbiAgICAgIGlmICghc2VsZi5lbGVtZW50IHx8IChmb3JjZV91cGRhdGUgfHwgc2VsZi5fc3RhdGVDaGFuZ2VkKSkge1xuICAgICAgICBmb3JjZV91cGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxmLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxmLmVsKTtcblxuICAgICAgICBpZiAoIXNlbGYuZWxlbWVudCkge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coXCJObyBlbGVtZW50IHdpdGggdGhlIGlkIFwiICsgc2VsZi5lbCArIFwiIGV4aXN0cyBpbiB0aGUgRE9NIHNvIHdlIHdpbGwgY3JlYXRlIGl0IGFuZCBhcHBlbmQgaXQgdG8gaXRzIHBhcmVudC5cIik7XG4gICAgICAgICAgc2VsZi5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBzZWxmLmVsZW1lbnQuaWQgPSBzZWxmLmVsO1xuXG4gICAgICAgICAgaWYgKHNlbGYuX3RlbXBsYXRlKSB7XG4gICAgICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucGFyZW50ICYmIHNlbGYucGFyZW50LmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHNlbGYucGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGVyZSBpcyBubyBwYXJlbnQgdG8gYXBwZW5kIFwiICsgc2VsZi5lbCArIFwiIHRvLlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VsZi5fdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5pbm5lckhUTUwgPSBzZWxmLl90ZW1wbGF0ZShzZWxmLnN0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICBzZWxmLl9sb2FkRXZlbnRzKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNlbGYuX3JlbmRlckNvbXBvbmVudHMoZm9yY2VfdXBkYXRlLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJlc2V0IHN0YXRlQ2hhbmdlZFxuICAgICAgICAgIHNlbGYuX3N0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyUmVuZGVyXCIsIGZ1bmN0aW9uKCkgeyBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7IH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNhbXNvbkNvbXBvbmVudDtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBBZGRFdmVudHModGFyZ2V0KSB7XG5cbiAgdmFyIGV2ZW50cyA9IHt9OyB2YXIgZW1wdHkgPSBbXTtcblxuICAvLyBzdGFydCBsaXN0ZW5pbmdcbiAgdGFyZ2V0Lm9uID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlciwgY29udGV4dCkge1xuICAgIChldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW10pLnB1c2goW2hhbmRsZXIsIGNvbnRleHRdKTtcbiAgfTtcblxuICAvLyBzdG9wIGxpc3RlbmluZ1xuICB0YXJnZXQub2ZmID0gZnVuY3Rpb24odHlwZSwgaGFuZGxlcikge1xuICAgIHR5cGUgfHwgKGV2ZW50cyA9IHt9KVxuICAgIHZhciBsaXN0ID0gZXZlbnRzW3R5cGVdIHx8IGVtcHR5LFxuICAgIGkgPSBsaXN0Lmxlbmd0aCA9IGhhbmRsZXIgPyBsaXN0Lmxlbmd0aCA6IDBcbiAgICB3aGlsZShpLS0pIGhhbmRsZXIgPT0gbGlzdFtpXVswXSAmJiBsaXN0LnNwbGljZShpLDEpXG4gIH07XG5cbiAgLy8gc2VuZCB0aGUgZXZlbnQgdG8gYW55b25lIGxpc3RlbmluZ1xuICB0YXJnZXQuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICAgIHZhciBhcmdzID0gZW1wdHkuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgIGxpc3QgPSBldmVudHNbdHlwZV0gfHwgZW1wdHksIGk9MCwgalxuICAgIHdoaWxlKGo9bGlzdFtpKytdKSBqWzBdLmFwcGx5KGpbMV0sIGFyZ3MpXG4gIH07XG5cbn07XG4iLCIvKiFcbiAqIFNhbXNvbi5qc1xuICogQ29weXJpZ2h0KGMpIDIwMTUgU2FtIERlbGdhZG9cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciAkID0gcmVxdWlyZSgnLi9tb2R1bGVzL3F1by5qcycpO1xudmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xuXG4vLyBKU1MgYW5kIHBsdWdpbnNcbnZhciBqc3MgPSByZXF1aXJlKCdqc3MnKTtcbnZhciBqc3NWZW5kb3JQcmVmaXhlciA9IHJlcXVpcmUoJ2pzcy12ZW5kb3ItcHJlZml4ZXInKTtcbnZhciBqc3NFeHRlbmQgPSByZXF1aXJlKCdqc3MtZXh0ZW5kJyk7XG5qc3MudXNlKGpzc1ZlbmRvclByZWZpeGVyKTtcbmpzcy51c2UoanNzRXh0ZW5kKTtcblxudmFyIGNzc19yZXNldCA9IHJlcXVpcmUoJy4vc3R5bGVzL3Jlc2V0Jyk7XG52YXIgYmFzZV9zdHlsZXMgPSByZXF1aXJlKCcuL3N0eWxlcy9iYXNlX3N0eWxlcycpO1xuXG4vLyByZXNlcnZlZCBwcm9wZXJ0aWVzIGZvciB0aGUgU2Ftc29uLkFwcCBvYmplY3QuIGFsbCBwcm9wZXJ0aWVzIHN0YXJ0aW5nIHdpdGggXyBhcmUgYWxzbyByZXNlcnZlZFxudmFyIHJlc2VydmVkID0gW1wiJFwiLCBcIkRPTVwiLCBcInN0eWxlU2hlZXRcIiwgXCJiYXNlU3R5bGVcIiwgXCJzdHlsZVwiLCBcImNvbXBvbmVudHNcIiwgXCJzZXRDb21wb25lbnRzXCIsIFwiUm91dGVyXCIsIFwiUGFnZXNcIiwgXCJvblwiLCBcImVtaXRcIiwgXCJvZmZcIl07XG5cbi8vIGNyZWF0ZSB0aGUgU2Ftc29uIG9iamVjdCB0aGF0IHdpbGwgYmUgZXhwb3J0ZWRcbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uID0ge307XG5cblNhbXNvbi5FdmVudHMgPSByZXF1aXJlKCcuL2V2ZW50cycpOyAvLyBhIG1peGluIHRoYXQgd2lsbCBhdHRhY2ggb24sIG9mZiwgYW5kIGVtaXQgbWV0aG9kcyB0byBhbiBvYmplY3RcblxuU2Ftc29uLlJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJyk7XG5TYW1zb24uY3JlYXRlUm91dGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgcm91dGVyID0gbmV3IFNhbXNvbi5Sb3V0ZXIob3B0aW9ucyk7XG4gIHJldHVybiByb3V0ZXI7XG59O1xuXG5TYW1zb24uUGFnZSA9IHJlcXVpcmUoJy4vcGFnZScpO1xuU2Ftc29uLmNyZWF0ZVBhZ2UgPSBmdW5jdGlvbihvcHRpb25zLCBhZGRfZXZlbnRzKSB7XG4gIHZhciBwYWdlID0gbmV3IFNhbXNvbi5QYWdlKG9wdGlvbnMpO1xuICBpZiAoYWRkX2V2ZW50cykgU2Ftc29uLkV2ZW50cyhwYWdlKTtcbiAgcmV0dXJuIHBhZ2U7XG59O1xuXG5TYW1zb24uQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcblNhbXNvbi5jcmVhdGVDb21wb25lbnQgPSBmdW5jdGlvbihvcHRpb25zLCBhZGRfZXZlbnRzKSB7XG4gIHZhciBjb21wb25lbnQgPSBuZXcgU2Ftc29uLkNvbXBvbmVudChvcHRpb25zKTtcbiAgaWYgKGFkZF9ldmVudHMpIFNhbXNvbi5FdmVudHMoY29tcG9uZW50KTtcbiAgcmV0dXJuIGNvbXBvbmVudDtcbn07XG5cbi8vIFNhbXNvbi5ET00gd2lsbCBjYWNoZSByZWZlcmVuY2VzIHRvIGFueSBTYW1zb24gY3JlYXRlZCBET00gZWxlbWVudHMgbGlrZSAjc2Ftc29uLWFwcFxuU2Ftc29uLkRPTSA9IHt9O1xuXG4vLyB0aGUgaW5zdGFudGlhdGVkIGFwcCB3aWxsIGJlIGF0dGFjaGVkIHRvIFNhbXNvbi5BcHAgZm9yIHF1aWNrIGFjY2Vzc1xuU2Ftc29uLkFwcDtcblxuLy8gb25seSBvbmUgU2Ftc29uIEFwcCBjYW4gZXhpc3QgYXQgYSB0aW1lLCBzbyBpZiBvbmUgaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkLCBzaW1wbHkgcmV0dXJuIGl0XG5TYW1zb24uY3JlYXRlQXBwID0gZnVuY3Rpb24oKSB7XG4gIGlmIChTYW1zb24uQXBwKSB7XG4gICAgcmV0dXJuIFNhbXNvbi5BcHA7XG4gIH0gZWxzZSB7XG4gICAgU2Ftc29uLkFwcCA9IG5ldyBTYW1zb25BcHAoKTtcbiAgICBTYW1zb24uRXZlbnRzKFNhbXNvbi5BcHApOyAvLyBtYWtlIHRoZSBtYWluIGFwcCBvYmplY3QgYW4gZXZlbnQgYnVzXG4gICAgU2Ftc29uLkFwcC5ET00gPSBTYW1zb24uRE9NO1xuICAgIHJldHVybiBTYW1zb24uQXBwO1xuICB9XG59O1xuXG4vLyB0aGUgU2Ftc29uQXBwIGNsYXNzXG5mdW5jdGlvbiBTYW1zb25BcHAoKSB7XG4gIHRoaXMuX2lzQ29uZmlndXJlZCA9IGZhbHNlO1xufVxuXG5TYW1zb25BcHAucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICghdGhpcy5faXNDb25maWd1cmVkKSB7XG5cbiAgICAvLyBhZGQgUXVvSlMgdG8gdGhlIGFwcCBvYmplY3QgZm9yIHF1aWNrIGFjY2Vzc1xuICAgIHRoaXMuJCA9ICQ7XG5cbiAgICAvLyBsb2FkIHRoZSBjc3MgcmVzZXQgYW5kIHNldHVwIHRoZSBhcHAncyBiYXNlIHN0eWxlc1xuICAgIGJhc2Vfc3R5bGVzID0gb3B0aW9ucy5iYXNlX3N0eWxlcyB8fCBiYXNlX3N0eWxlcztcblxuICAgIHRoaXMuYmFzZVN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQoY3NzX3Jlc2V0LCB7bmFtZWQ6IGZhbHNlfSk7XG4gICAgdGhpcy5iYXNlU3R5bGUuYWRkUnVsZXMoYmFzZV9zdHlsZXMpO1xuICAgIHRoaXMuYmFzZVN0eWxlLmF0dGFjaCgpO1xuXG4gICAgdGhpcy5zdHlsZVNoZWV0ID0gb3B0aW9ucy5zdHlsZSB8fCB7fTtcbiAgICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQodGhpcy5zdHlsZVNoZWV0LCB7bmFtZWQ6IGZhbHNlfSk7XG4gICAgdGhpcy5zdHlsZS5hdHRhY2goKTtcblxuICAgIC8vIGFkZCBhbnkgZm9udHMgdG8gdGhlIHN0eWxlc2hlZXRcbiAgICB0aGlzLmZvbnRzID0ge307XG4gICAgdmFyIGZvbnQ7XG4gICAgZm9yIChmb250IGluIG9wdGlvbnMuZm9udHMpIHtcbiAgICAgIHRoaXMuZm9udHNbZm9udF0gPSBqc3MuY3JlYXRlU3R5bGVTaGVldChvcHRpb25zLmZvbnRzW2ZvbnRdLCB7bmFtZWQ6IGZhbHNlfSkuYXR0YWNoKCk7XG4gICAgfVxuXG4gICAgLy8gc2V0dXAgdGhlIGFwcCdzIERhdGEgb2JqZWN0XG4gICAgdGhpcy5EYXRhID0gb3B0aW9ucy5EYXRhIHx8IG9wdGlvbnMuZGF0YSB8fCB7fTtcblxuICAgIC8vIHNldHVwIHRoZSBhcHAncyBwYWdlc1xuICAgIHRoaXMuUGFnZXMgPSBvcHRpb25zLlBhZ2VzIHx8IG9wdGlvbnMucGFnZXMgfHwge307XG5cbiAgICAvLyBzZXR1cCB0aGUgYXBwJ3MgYmFzZSBjb21wb25lbnRzXG4gICAgdGhpcy5zZXRDb21wb25lbnRzID0gb3B0aW9ucy5zZXRDb21wb25lbnRzIHx8IGZ1bmN0aW9uKCkgeyByZXR1cm4gKG9wdGlvbnMuY29tcG9uZW50cyB8fCB7fSk7IH07XG4gICAgdGhpcy5jb21wb25lbnRzID0gdGhpcy5zZXRDb21wb25lbnRzKCk7XG5cbiAgICAvKiBGaXJzdCBzZXR1cCB0aGUgcmVxdWlyZWQgRE9NIGVsZW1lbnRzIGFuZCBjb21wb25lbnRzIG9mIGEgU2Ftc29uIEFwcCAqL1xuXG4gICAgLy8gYWRkIHRoZSBjb3JlIGRpdnMgdG8gdGhlIGJvZHlcbiAgICAvLyAjc2Ftc29uX2FwcCwgI3NhbXNvbl9wYWdlcywgI3NhbXNvbl9wYWdlXzEsICNzYW1zb25fcGFnZV8yLCAjc2Ftc29uX2ZhZGVkX292ZXJsYXksICNzYW1zb25fdHJhbnNwYXJlbnRfb3ZlcmxheVxuICAgIFNhbXNvbi5ET00uc2Ftc29uX2FwcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fYXBwLmlkID0gXCJzYW1zb25fYXBwXCI7XG5cbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMuaWQgPSBcInNhbXNvbl9wYWdlc1wiO1xuXG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzEuaWQgPSBcInNhbXNvbl9wYWdlXzFcIjtcbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzEuY2xhc3NMaXN0LmFkZChcInNhbXNvbi1wYWdlXCIsIFwiYWN0aXZlXCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VzLmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMSk7XG5cbiAgICBTYW1zb24uRE9NLnNhbXNvbl9wYWdlXzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMi5pZCA9IFwic2Ftc29uX3BhZ2VfMlwiO1xuICAgIFNhbXNvbi5ET00uc2Ftc29uX3BhZ2VfMi5jbGFzc0xpc3QuYWRkKFwic2Ftc29uLXBhZ2VcIik7XG4gICAgU2Ftc29uLkRPTS5zYW1zb25fcGFnZXMuYXBwZW5kQ2hpbGQoU2Ftc29uLkRPTS5zYW1zb25fcGFnZV8yKTtcblxuICAgIFNhbXNvbi5ET00uc2Ftc29uX2FwcC5hcHBlbmRDaGlsZChTYW1zb24uRE9NLnNhbXNvbl9wYWdlcyk7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFNhbXNvbi5ET00uc2Ftc29uX2FwcCk7IC8vIGFkZCB0aGUgYmFzZSBkaXZzIHRvIHRoZSBib2R5XG5cbiAgICAvLyBzZXR1cCB0aGUgYXBwJ3Mgcm91dGVyIGFmdGVyIGxvYWRpbmcgYW55IGV4dHJhIGNvbXBvbmVudHNcbiAgICB0aGlzLlJvdXRlciA9IFNhbXNvbi5jcmVhdGVSb3V0ZXIob3B0aW9ucy5Sb3V0ZXIgfHwgb3B0aW9ucy5yb3V0ZXIgfHwge30pO1xuXG4gICAgLy8gYWRkIGFueSB1bnJlc2VydmVkIHByb3BlcnRpZXMgcGFzc2VkIGludG8gdGhlIGN1c3RvbS9leHRlbmQgb2JqZWN0XG4gICAgdmFyIGN1c3RvbSA9IG9wdGlvbnMuZXh0ZW5kIHx8IG9wdGlvbnMuY3VzdG9tIHx8IHt9O1xuICAgIFV0aWxzLmV4dGVuZCh0aGlzLCBjdXN0b20sIHJlc2VydmVkKTtcblxuICAgIC8vIExvYWQgYW55IG90aGVyIGNvbXBvbmVudHNcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHNlbGYuY29tcG9uZW50cyk7XG4gICAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICAgIHNlbGZba2V5XSA9IFNhbXNvbi5jcmVhdGVDb21wb25lbnQoc2VsZi5jb21wb25lbnRzW2tleV0pO1xuICAgICAgc2VsZltrZXldLnBhcmVudCA9IHtlbGVtZW50OiBTYW1zb24uRE9NLnNhbXNvbl9hcHAsIGRlbGVnYXRlOiAkKFNhbXNvbi5ET00uc2Ftc29uX2FwcCl9O1xuXG4gICAgICBzZWxmW2tleV0uX3JlbmRlcihmYWxzZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNiKCk7XG4gICAgICB9KTtcblxuICAgIH0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyB0aGUgU2Ftc29uIEFwcCBpcyBub3cgY29uZmlndXJlZFxuICAgICAgc2VsZi5faXNDb25maWd1cmVkID0gdHJ1ZTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIFNhbXNvbiBBcHAgaGFzIGFscmVhZHkgYmVlbiBjb25maWd1cmVkIVwiKTtcbiAgfVxuXG59O1xuIiwiLyoqXG4gKiBRdW9KUyAtIE1pY3JvICNKYXZhU2NyaXB0IExpYnJhcnkgZm9yIE1vYmlsZSBEZXZpY2VzLlxuICogQHZlcnNpb24gdjMuMC43XG4gKiBAbGluayAgICBodHRwOi8vcXVvanMudGFwcXVvLmNvbVxuICogQGF1dGhvciAgSmF2aSBKaW1lbmV6IFZpbGxhciAoQHNveWphdmkpIChodHRwczovL3R3aXR0ZXIuY29tL3NveWphdmkpXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuKGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQsbj1bXS5pbmRleE9mfHxmdW5jdGlvbih0KXtmb3IodmFyIG49MCxlPXRoaXMubGVuZ3RoO2U+bjtuKyspaWYobiBpbiB0aGlzJiZ0aGlzW25dPT09dClyZXR1cm4gbjtyZXR1cm4tMX07dD1mdW5jdGlvbigpe3ZhciB0LG4sZSxyLGksdSxvLGEsYyxsLHMsZixoLGQscCx2LGc7cmV0dXJuIHI9W10sYT1PYmplY3QucHJvdG90eXBlLG89L15cXHMqPChcXHcrfCEpW14+XSo+LyxlPVsxLDksMTFdLG49L15cXC4oW1xcdy1dKykkLyx1PS9eI1tcXHdcXGQtXSskLyxzPS9eW1xcdy1dKyQvLGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpLGw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpLGk9e3RyOmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKSx0Ym9keTpjLHRoZWFkOmMsdGZvb3Q6Yyx0ZDpsLHRoOmwsXCIqXCI6ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKX0sdD1mdW5jdGlvbihuLGUpe3ZhciByO3JldHVybiBuP1wiZnVuY3Rpb25cIj09PXQudG9UeXBlKG4pP3QoZG9jdW1lbnQpLnJlYWR5KG4pOihyPXAobixlKSx2KHIsbikpOnYoKX0sdC5xdWVyeT1mdW5jdGlvbih0LGUpe3ZhciByO3JldHVybiBuLnRlc3QoZSk/cj10LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZS5yZXBsYWNlKFwiLlwiLFwiXCIpKTpzLnRlc3QoZSk/cj10LmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpOnUudGVzdChlKSYmdD09PWRvY3VtZW50PyhyPXQuZ2V0RWxlbWVudEJ5SWQoZS5yZXBsYWNlKFwiI1wiLFwiXCIpKSxyfHwocj1bXSkpOnI9dC5xdWVyeVNlbGVjdG9yQWxsKGUpLHIubm9kZVR5cGU/W3JdOkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHIpfSx0LmV4dGVuZD1mdW5jdGlvbih0KXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLmZvckVhY2goZnVuY3Rpb24obil7dmFyIGUscjtyPVtdO2ZvcihlIGluIG4pci5wdXNoKHRbZV09bltlXSk7cmV0dXJuIHJ9KSx0fSx0LnRvVHlwZT1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj1hLnRvU3RyaW5nLmNhbGwodCkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pLG4ubGVuZ3RoPjE/blsxXS50b0xvd2VyQ2FzZSgpOlwib2JqZWN0XCJ9LHQuZWFjaD1mdW5jdGlvbihuLGUpe3ZhciByLGksdSxvLGE7aWYoaT12b2lkIDAsbz12b2lkIDAsXCJhcnJheVwiPT09dC50b1R5cGUobikpZm9yKGk9dT0wLGE9bi5sZW5ndGg7YT51O2k9Kyt1KXI9bltpXSxlLmNhbGwocixpLHIpPT09ITE7ZWxzZSBmb3IobyBpbiBuKWUuY2FsbChuW29dLG8sbltvXSk9PT0hMTtyZXR1cm4gbn0sdC5tYXA9ZnVuY3Rpb24obixlKXt2YXIgcixpLHUsbztpZihvPVtdLHI9dm9pZCAwLGk9dm9pZCAwLFwiYXJyYXlcIj09PXQudG9UeXBlKG4pKWZvcihyPTA7cjxuLmxlbmd0aDspdT1lKG5bcl0sciksbnVsbCE9dSYmby5wdXNoKHUpLHIrKztlbHNlIGZvcihpIGluIG4pdT1lKG5baV0saSksbnVsbCE9dSYmby5wdXNoKHUpO3JldHVybiBoKG8pfSx0Lm1peD1mdW5jdGlvbigpe3ZhciB0LG4sZSxyLGk7Zm9yKGU9e30sdD0wLHI9YXJndW1lbnRzLmxlbmd0aDtyPnQ7KXtuPWFyZ3VtZW50c1t0XTtmb3IoaSBpbiBuKWcobixpKSYmdm9pZCAwIT09bltpXSYmKGVbaV09bltpXSk7dCsrfXJldHVybiBlfSx2PWZ1bmN0aW9uKHQsbil7cmV0dXJuIG51bGw9PW4mJihuPVwiXCIpLHQ9dHx8cix0LnNlbGVjdG9yPW4sdC5fX3Byb3RvX189di5wcm90b3R5cGUsdH0scD1mdW5jdGlvbihuLHIpe3ZhciBpLHU7cmV0dXJuIGk9bnVsbCx1PXQudG9UeXBlKG4pLFwiYXJyYXlcIj09PXU/aT1mKG4pOlwic3RyaW5nXCI9PT11JiZvLnRlc3Qobik/KGk9ZChuLnRyaW0oKSxSZWdFeHAuJDEpLG49bnVsbCk6XCJzdHJpbmdcIj09PXU/KGk9dC5xdWVyeShkb2N1bWVudCxuKSxyJiYoaT0xPT09aS5sZW5ndGg/dC5xdWVyeShpWzBdLHIpOnQubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHQucXVlcnkoaSxyKX0pKSk6KGUuaW5kZXhPZihuLm5vZGVUeXBlKT49MHx8bj09PXdpbmRvdykmJihpPVtuXSxuPW51bGwpLGl9LGQ9ZnVuY3Rpb24obixlKXt2YXIgcjtyZXR1cm4gbnVsbD09ZSYmKGU9XCIqXCIpLGUgaW4gaXx8KGU9XCIqXCIpLHI9aVtlXSxyLmlubmVySFRNTD1cIlwiK24sdC5lYWNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHIuY2hpbGROb2RlcyksZnVuY3Rpb24oKXtyZXR1cm4gci5yZW1vdmVDaGlsZCh0aGlzKX0pfSxmPWZ1bmN0aW9uKHQpe3JldHVybiB0LmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dD90OnZvaWQgMH0pfSxoPWZ1bmN0aW9uKHQpe3JldHVybiB0Lmxlbmd0aD4wP3IuY29uY2F0LmFwcGx5KHIsdCk6dH0sZz1mdW5jdGlvbih0LG4pe3JldHVybiBhLmhhc093blByb3BlcnR5LmNhbGwodCxuKX0sdi5wcm90b3R5cGU9dC5mbj17fSx0LmZuLmVhY2g9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihuLGUpe3JldHVybiB0LmNhbGwobixlLG4pfSksdGhpc30sdC5mbi5maWx0ZXI9ZnVuY3Rpb24obil7cmV0dXJuIHQoci5maWx0ZXIuY2FsbCh0aGlzLGZ1bmN0aW9uKGUpe3JldHVybiBlLnBhcmVudE5vZGUmJnQucXVlcnkoZS5wYXJlbnROb2RlLG4pLmluZGV4T2YoZSk+PTB9KSl9LHQuZm4uZm9yRWFjaD1yLmZvckVhY2gsdC5mbi5pbmRleE9mPXIuaW5kZXhPZix0LnZlcnNpb249XCIzLjAuN1wiLHR9KCksdGhpcy5RdW89dGhpcy4kJD10LFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm51bGwhPT1tb2R1bGUmJihtb2R1bGUuZXhwb3J0cz10KSxmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGg7cmV0dXJuIG49e1RZUEU6XCJHRVRcIixNSU1FOlwianNvblwifSxyPXtzY3JpcHQ6XCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIixqc29uOlwiYXBwbGljYXRpb24vanNvblwiLHhtbDpcImFwcGxpY2F0aW9uL3htbCwgdGV4dC94bWxcIixodG1sOlwidGV4dC9odG1sXCIsdGV4dDpcInRleHQvcGxhaW5cIn0sZT0wLHQuYWpheFNldHRpbmdzPXt0eXBlOm4uVFlQRSxhc3luYzohMCxzdWNjZXNzOnt9LGVycm9yOnt9LGNvbnRleHQ6bnVsbCxkYXRhVHlwZTpuLk1JTUUsaGVhZGVyczp7fSx4aHI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdH0sY3Jvc3NEb21haW46ITEsdGltZW91dDowfSx0LmFqYXg9ZnVuY3Rpb24oZSl7dmFyIHIsbyxjLGY7aWYoYz10Lm1peCh0LmFqYXhTZXR0aW5ncyxlKSxjLnR5cGU9PT1uLlRZUEU/Yy51cmwrPXQuc2VyaWFsaXplKGMuZGF0YSxcIj9cIik6Yy5kYXRhPXQuc2VyaWFsaXplKGMuZGF0YSksaShjLnVybCkpcmV0dXJuIHUoYyk7Zj1jLnhocigpLGYub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7cmV0dXJuIDQ9PT1mLnJlYWR5U3RhdGU/KGNsZWFyVGltZW91dChyKSxzKGYsYykpOnZvaWQgMH0sZi5vcGVuKGMudHlwZSxjLnVybCxjLmFzeW5jKSxsKGYsYyksYy50aW1lb3V0PjAmJihyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gaChmLGMpfSxjLnRpbWVvdXQpKTt0cnl7Zi5zZW5kKGMuZGF0YSl9Y2F0Y2goZCl7bz1kLGY9byxhKFwiUmVzb3VyY2Ugbm90IGZvdW5kXCIsZixjKX1yZXR1cm4gZn0sdC5nZXQ9ZnVuY3Rpb24obixlLHIsaSl7cmV0dXJuIHQuYWpheCh7dXJsOm4sZGF0YTplLHN1Y2Nlc3M6cixkYXRhVHlwZTppfSl9LHQucG9zdD1mdW5jdGlvbih0LG4sZSxyKXtyZXR1cm4gYyhcIlBPU1RcIix0LG4sZSxyKX0sdC5wdXQ9ZnVuY3Rpb24odCxuLGUscil7cmV0dXJuIGMoXCJQVVRcIix0LG4sZSxyKX0sdFtcImRlbGV0ZVwiXT1mdW5jdGlvbih0LG4sZSxyKXtyZXR1cm4gYyhcIkRFTEVURVwiLHQsbixlLHIpfSx0Lmpzb249ZnVuY3Rpb24obixlLHIpe3JldHVybiB0LmFqYXgoe3VybDpuLGRhdGE6ZSxzdWNjZXNzOnJ9KX0sdC5zZXJpYWxpemU9ZnVuY3Rpb24odCxuKXt2YXIgZSxyO251bGw9PW4mJihuPVwiXCIpLHI9bjtmb3IoZSBpbiB0KXQuaGFzT3duUHJvcGVydHkoZSkmJihyIT09biYmKHIrPVwiJlwiKSxyKz1lbmNvZGVVUklDb21wb25lbnQoZSkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KHRbZV0pKTtyZXR1cm4gcj09PW4/XCJcIjpyfSx1PWZ1bmN0aW9uKG4pe3ZhciByLGksdSxvO3JldHVybiBuLmFzeW5jPyhpPVwianNvbnBcIisgKytlLHU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSxvPXthYm9ydDpmdW5jdGlvbigpe3JldHVybiB0KHUpLnJlbW92ZSgpLGkgaW4gd2luZG93P3dpbmRvd1tpXT17fTp2b2lkIDB9fSxyPXZvaWQgMCx3aW5kb3dbaV09ZnVuY3Rpb24oZSl7cmV0dXJuIGNsZWFyVGltZW91dChyKSx0KHUpLnJlbW92ZSgpLGRlbGV0ZSB3aW5kb3dbaV0sZihlLG8sbil9LHUuc3JjPW4udXJsLnJlcGxhY2UoUmVnRXhwKFwiPVxcXFw/XCIpLFwiPVwiK2kpLHQoXCJoZWFkXCIpLmFwcGVuZCh1KSxuLnRpbWVvdXQ+MCYmKHI9c2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBoKG8sbil9LG4udGltZW91dCkpLG8pOmNvbnNvbGUuZXJyb3IoXCJRdW9KUy5hamF4OiBVbmFibGUgdG8gbWFrZSBqc29ucCBzeW5jaHJvbm91cyBjYWxsLlwiKX0scz1mdW5jdGlvbih0LG4pe3Quc3RhdHVzPj0yMDAmJnQuc3RhdHVzPDMwMHx8MD09PXQuc3RhdHVzP24uYXN5bmMmJmYobyh0LG4pLHQsbik6YShcIlF1b0pTLmFqYXg6IFVuc3VjY2VzZnVsIHJlcXVlc3RcIix0LG4pfSxmPWZ1bmN0aW9uKHQsbixlKXtlLnN1Y2Nlc3MuY2FsbChlLmNvbnRleHQsdCxuKX0sYT1mdW5jdGlvbih0LG4sZSl7ZS5lcnJvci5jYWxsKGUuY29udGV4dCx0LG4sZSl9LGw9ZnVuY3Rpb24odCxuKXt2YXIgZTtuLmNvbnRlbnRUeXBlJiYobi5oZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdPW4uY29udGVudFR5cGUpLG4uZGF0YVR5cGUmJihuLmhlYWRlcnMuQWNjZXB0PXJbbi5kYXRhVHlwZV0pO2ZvcihlIGluIG4uaGVhZGVycyl0LnNldFJlcXVlc3RIZWFkZXIoZSxuLmhlYWRlcnNbZV0pfSxoPWZ1bmN0aW9uKHQsbil7dC5vbnJlYWR5c3RhdGVjaGFuZ2U9e30sdC5hYm9ydCgpLGEoXCJRdW9KUy5hamF4OiBUaW1lb3V0IGV4Y2VlZGVkXCIsdCxuKX0sYz1mdW5jdGlvbihuLGUscixpLHUpe3JldHVybiB0LmFqYXgoe3R5cGU6bix1cmw6ZSxkYXRhOnIsc3VjY2VzczppLGRhdGFUeXBlOnUsY29udGVudFR5cGU6XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIn0pfSxpPWZ1bmN0aW9uKHQpe3JldHVybiBSZWdFeHAoXCI9XFxcXD9cIikudGVzdCh0KX0sbz1mdW5jdGlvbih0LGUpe3ZhciByLGk7aWYoaT10LHQucmVzcG9uc2VUZXh0KXtpZihlLmRhdGFUeXBlPT09bi5NSU1FKXRyeXtpPUpTT04ucGFyc2UodC5yZXNwb25zZVRleHQpfWNhdGNoKHUpe3I9dSxpPXIsYShcIlF1b0pTLmFqYXg6IFBhcnNlIEVycm9yXCIsdCxlKX1cInhtbFwiPT09ZS5kYXRhVHlwZSYmKGk9dC5yZXNwb25zZVhNTCl9cmV0dXJuIGl9fSh0KSxmdW5jdGlvbih0KXt2YXIgbixlLHI7cmV0dXJuIG49W1wiLXdlYmtpdC1cIixcIi1tb3otXCIsXCItbXMtXCIsXCItby1cIixcIlwiXSx0LmZuLmFkZENsYXNzPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgbixyLGksdSxvO2ZvcihpPWUodCksdT1bXSxuPTAscj1pLmxlbmd0aDtyPm47bisrKW89aVtuXSx1LnB1c2godGhpcy5jbGFzc0xpc3QuYWRkKG8pKTtyZXR1cm4gdX0pfSx0LmZuLnJlbW92ZUNsYXNzPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgbixyLGksdSxvO2ZvcihpPWUodCksdT1bXSxuPTAscj1pLmxlbmd0aDtyPm47bisrKW89aVtuXSx1LnB1c2godGhpcy5jbGFzc0xpc3QucmVtb3ZlKG8pKTtyZXR1cm4gdX0pfSx0LmZuLnRvZ2dsZUNsYXNzPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgbixyLGksdSxvO2ZvcihpPWUodCksdT1bXSxuPTAscj1pLmxlbmd0aDtyPm47bisrKW89aVtuXSx1LnB1c2godGhpcy5jbGFzc0xpc3QudG9nZ2xlKG8pKTtyZXR1cm4gdX0pfSx0LmZuLmhhc0NsYXNzPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmxlbmd0aD4wJiZ0aGlzWzBdLmNsYXNzTGlzdC5jb250YWlucyh0KX0sdC5mbi5saXN0Q2xhc3M9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGg+MD90aGlzWzBdLmNsYXNzTGlzdDp2b2lkIDB9LHQuZm4uc3R5bGU9dC5mbi5jc3M9ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gbnVsbCE9bj90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHlsZVt0XT1ufSk6KGU9dGhpc1swXSxlLnN0eWxlW3RdfHxyKGUsdCkpfSx0LmZuLnZlbmRvcj1mdW5jdGlvbih0LGUpe3ZhciByLGksdSxvO2ZvcihvPVtdLHI9MCxpPW4ubGVuZ3RoO2k+cjtyKyspdT1uW3JdLG8ucHVzaCh0aGlzLnN0eWxlKFwiXCIrdSt0LGUpKTtyZXR1cm4gb30scj1mdW5jdGlvbih0LG4pe3JldHVybiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKHQsXCJcIilbbl19LGU9ZnVuY3Rpb24odCl7cmV0dXJuIEFycmF5LmlzQXJyYXkodCl8fCh0PVt0XSksdH19KHQpLGZ1bmN0aW9uKHQpe3JldHVybiB0LmZuLmF0dHI9ZnVuY3Rpb24obixlKXtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmXCJzdHJpbmdcIj09PXQudG9UeXBlKG4pP251bGwhPWU/dGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2V0QXR0cmlidXRlKG4sZSl9KTp0aGlzWzBdLmdldEF0dHJpYnV0ZShuKTp2b2lkIDB9LHQuZm4ucmVtb3ZlQXR0cj1mdW5jdGlvbihuKXtyZXR1cm4gdGhpcy5sZW5ndGg+MCYmXCJzdHJpbmdcIj09PXQudG9UeXBlKG4pP3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuKX0pOnZvaWQgMH0sdC5mbi5kYXRhPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMuYXR0cihcImRhdGEtXCIrdCxuKX0sdC5mbi5yZW1vdmVEYXRhPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnJlbW92ZUF0dHIoXCJkYXRhLVwiK3QpfSx0LmZuLnZhbD1mdW5jdGlvbih0KXtyZXR1cm4gbnVsbCE9dD90aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52YWx1ZT10LnRvU3RyaW5nKCl9KTp0aGlzLmxlbmd0aD4wP3RoaXNbMF0udmFsdWU6bnVsbH0sdC5mbi5zaG93PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3R5bGUoXCJkaXNwbGF5XCIsXCJibG9ja1wiKX0sdC5mbi5oaWRlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3R5bGUoXCJkaXNwbGF5XCIsXCJub25lXCIpfSx0LmZuLmZvY3VzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbMF0uZm9jdXMoKX0sdC5mbi5ibHVyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXNbMF0uYmx1cigpfSx0LmZuLm9mZnNldD1mdW5jdGlvbigpe3ZhciB0LG47cmV0dXJuIHRoaXMubGVuZ3RoPjAmJih0PXRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj17bGVmdDp0LmxlZnQrd2luZG93LnBhZ2VYT2Zmc2V0LHRvcDp0LnRvcCt3aW5kb3cucGFnZVlPZmZzZXQsd2lkdGg6dC53aWR0aCxoZWlnaHQ6dC5oZWlnaHR9KSxufX0odCksZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvO3JldHVybiByPW51bGwsbj0vV2ViS2l0XFwvKFtcXGQuXSspLyxlPXtBbmRyb2lkOi8oQW5kcm9pZClcXHMrKFtcXGQuXSspLyxpcGFkOi8oaVBhZCkuKk9TXFxzKFtcXGRfXSspLyxpcGhvbmU6LyhpUGhvbmVcXHNPUylcXHMoW1xcZF9dKykvLEJsYWNrYmVycnk6LyhCbGFja0JlcnJ5fEJCMTB8UGxheWJvb2spLipWZXJzaW9uXFwvKFtcXGQuXSspLyxGaXJlZm94T1M6LyhNb3ppbGxhKS4qTW9iaWxlW15cXC9dKlxcLyhbXFxkXFwuXSopLyx3ZWJPUzovKHdlYk9TfGhwd09TKVtcXHNcXC9dKFtcXGQuXSspL30sdC5pc01vYmlsZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVudmlyb25tZW50KCksci5pc01vYmlsZX0sdC5lbnZpcm9ubWVudD1mdW5jdGlvbigpe3ZhciB0LG47cmV0dXJuIHJ8fChuPW5hdmlnYXRvci51c2VyQWdlbnQsdD11KG4pLHI9e2Jyb3dzZXI6aShuKSxpc01vYmlsZTohIXQsc2NyZWVuOm8oKSxvczp0fSkscn0saT1mdW5jdGlvbih0KXt2YXIgZTtyZXR1cm4gZT10Lm1hdGNoKG4pLGU/ZVswXTp0fSx1PWZ1bmN0aW9uKHQpe3ZhciBuLHIsaTtmb3IociBpbiBlKWlmKGk9dC5tYXRjaChlW3JdKSl7bj17bmFtZTpcImlwaG9uZVwiPT09cnx8XCJpcGFkXCI9PT1yfHxcImlwb2RcIj09PXI/XCJpb3NcIjpyLHZlcnNpb246aVsyXS5yZXBsYWNlKFwiX1wiLFwiLlwiKX07YnJlYWt9cmV0dXJuIG59LG89ZnVuY3Rpb24oKXtyZXR1cm57d2lkdGg6d2luZG93LmlubmVyV2lkdGgsaGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodH19fSh0KSxmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGgsZDtyZXR1cm4gbj0xLGk9e30scj17cHJldmVudERlZmF1bHQ6XCJpc0RlZmF1bHRQcmV2ZW50ZWRcIixzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246XCJpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFwiLHN0b3BQcm9wYWdhdGlvbjpcImlzUHJvcGFnYXRpb25TdG9wcGVkXCJ9LGU9e3RvdWNoc3RhcnQ6XCJtb3VzZWRvd25cIix0b3VjaG1vdmU6XCJtb3VzZW1vdmVcIix0b3VjaGVuZDpcIm1vdXNldXBcIix0b3VjaDpcImNsaWNrXCIsb3JpZW50YXRpb25jaGFuZ2U6XCJyZXNpemVcIn0sdT0vY29tcGxldGV8bG9hZGVkfGludGVyYWN0aXZlLyx0LmZuLm9uPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gbnVsbD09ZXx8XCJmdW5jdGlvblwiPT09dC50b1R5cGUoZSk/dGhpcy5iaW5kKG4sZSk6dGhpcy5kZWxlZ2F0ZShlLG4scil9LHQuZm4ub2ZmPWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gbnVsbD09ZXx8XCJmdW5jdGlvblwiPT09dC50b1R5cGUoZSk/dGhpcy51bmJpbmQobixlKTp0aGlzLnVuZGVsZWdhdGUoZSxuLHIpfSx0LmZuLnJlYWR5PWZ1bmN0aW9uKG4pe3JldHVybiB1LnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSk/bi5jYWxsKHRoaXMsdCk6dC5mbi5hZGRFdmVudChkb2N1bWVudCxcIkRPTUNvbnRlbnRMb2FkZWRcIixmdW5jdGlvbigpe3JldHVybiBuLmNhbGwodGhpcyx0KX0pfSx0LmZuLmJpbmQ9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBoKGUsdCxuKX0pfSx0LmZuLnVuYmluZD1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gZCh0aGlzLHQsbil9KX0sdC5mbi5kZWxlZ2F0ZT1mdW5jdGlvbihuLGUscil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpLHUpe3JldHVybiBoKHUsZSxyLG4sZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKHIpe3ZhciBpLGE7cmV0dXJuIGE9dChyLnRhcmdldCkuY2xvc2VzdChuLHUpLmdldCgwKSxhPyhpPXQuZXh0ZW5kKG8ocikse2N1cnJlbnRUYXJnZXQ6YSxsaXZlRmlyZWQ6dX0pLGUuYXBwbHkoYSxbaV0uY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpKSkpOnZvaWQgMH19KX0pfSx0LmZuLnVuZGVsZWdhdGU9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtyZXR1cm4gZCh0aGlzLG4sZSx0KX0pfSx0LmZuLnRyaWdnZXI9ZnVuY3Rpb24obixlLHIpe3JldHVyblwic3RyaW5nXCI9PT10LnRvVHlwZShuKSYmKG49bChuLGUpKSxudWxsIT1yJiYobi5vcmlnaW5hbEV2ZW50PXIpLHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLmRpc3BhdGNoRXZlbnQobil9KX0sdC5mbi5hZGRFdmVudD1mdW5jdGlvbih0LG4sZSl7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcj90LmFkZEV2ZW50TGlzdGVuZXIobixlLCExKTp0LmF0dGFjaEV2ZW50P3QuYXR0YWNoRXZlbnQoXCJvblwiK24sZSk6dFtcIm9uXCIrbl09ZX0sdC5mbi5yZW1vdmVFdmVudD1mdW5jdGlvbih0LG4sZSl7cmV0dXJuIHQucmVtb3ZlRXZlbnRMaXN0ZW5lcj90LnJlbW92ZUV2ZW50TGlzdGVuZXIobixlLCExKTp0LmRldGFjaEV2ZW50P3QuZGV0YWNoRXZlbnQoXCJvblwiK24sZSk6dFtcIm9uXCIrbl09bnVsbH0sbD1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBlPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRzXCIpLGUuaW5pdEV2ZW50KHQsITAsITAsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwpLG4mJihlLnRvdWNoPW4pLGV9LGg9ZnVuY3Rpb24obixlLHIsdSxvKXt2YXIgbCxzLGgsZDtyZXR1cm4gZT1jKGUpLGg9ZihuKSxzPWlbaF18fChpW2hdPVtdKSxsPW8mJm8ocixlKSxkPXtldmVudDplLGNhbGxiYWNrOnIsc2VsZWN0b3I6dSxwcm94eTphKGwscixuKSxkZWxlZ2F0ZTpsLGluZGV4OnMubGVuZ3RofSxzLnB1c2goZCksdC5mbi5hZGRFdmVudChuLGQuZXZlbnQsZC5wcm94eSl9LGQ9ZnVuY3Rpb24obixlLHIsdSl7dmFyIG87cmV0dXJuIGU9YyhlKSxvPWYobikscyhvLGUscix1KS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBkZWxldGUgaVtvXVtlLmluZGV4XSx0LmZuLnJlbW92ZUV2ZW50KG4sZS5ldmVudCxlLnByb3h5KX0pfSxmPWZ1bmN0aW9uKHQpe3JldHVybiB0Ll9pZHx8KHQuX2lkPW4rKyl9LGM9ZnVuY3Rpb24obil7dmFyIHI7cmV0dXJuIHI9KFwiZnVuY3Rpb25cIj09dHlwZW9mIHQuaXNNb2JpbGU/dC5pc01vYmlsZSgpOnZvaWQgMCk/bjplW25dLHJ8fG59LGE9ZnVuY3Rpb24odCxuLGUpe3ZhciByO3JldHVybiBuPXR8fG4scj1mdW5jdGlvbih0KXt2YXIgcjtyZXR1cm4gcj1uLmFwcGx5KGUsW3RdLmNvbmNhdCh0LmRhdGEpKSxyPT09ITEmJnQucHJldmVudERlZmF1bHQoKSxyfX0scz1mdW5jdGlvbih0LG4sZSxyKXtyZXR1cm4oaVt0XXx8W10pLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hKCF0fHxuJiZ0LmV2ZW50IT09bnx8ZSYmdC5jYWxsYmFjayE9PWV8fHImJnQuc2VsZWN0b3IhPT1yKX0pfSxvPWZ1bmN0aW9uKG4pe3ZhciBlO3JldHVybiBlPXQuZXh0ZW5kKHtvcmlnaW5hbEV2ZW50Om59LG4pLHQuZWFjaChyLGZ1bmN0aW9uKHQscil7cmV0dXJuIGVbdF09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tyXT1mdW5jdGlvbigpe3JldHVybiEwfSxuW3RdLmFwcGx5KG4sYXJndW1lbnRzKX0sZVtyXT1mdW5jdGlvbigpe3JldHVybiExfX0pLGV9fSh0KSxmdW5jdGlvbih0KXtyZXR1cm4gdC5mbi50ZXh0PWZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P3RoaXMuZWFjaChmdW5jdGlvbigpe3JldHVybiB0aGlzLnRleHRDb250ZW50PXR9KTp0aGlzLmxlbmd0aD4wP3RoaXNbMF0udGV4dENvbnRlbnQ6XCJcIn0sdC5mbi5odG1sPWZ1bmN0aW9uKG4pe3ZhciBlO3JldHVybiBudWxsIT1uPyhlPXQudG9UeXBlKG4pLHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVyblwic3RyaW5nXCI9PT1lP3RoaXMuaW5uZXJIVE1MPW46XCJhcnJheVwiPT09ZT9uLmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB0KG4pLmh0bWwoZSl9fSh0aGlzKSk6dGhpcy5pbm5lckhUTUwrPXQobikuaHRtbCgpfSkpOnRoaXMubGVuZ3RoPjA/dGhpc1swXS5pbm5lckhUTUw6XCJcIn0sdC5mbi5yZW1vdmU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIG51bGwhPXRoaXMucGFyZW50Tm9kZT90aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk6dm9pZCAwfSl9LHQuZm4uZW1wdHk9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaW5uZXJIVE1MPW51bGx9KX0sdC5mbi5hcHBlbmQ9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuXCJzdHJpbmdcIj09PWU/dGhpcy5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIixuKTpcImFycmF5XCI9PT1lP24uZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHQobikuYXBwZW5kKGUpfX0odGhpcykpOnRoaXMuYXBwZW5kQ2hpbGQobil9KX0sdC5mbi5wcmVwZW5kPWZ1bmN0aW9uKG4pe3ZhciBlO3JldHVybiBlPXQudG9UeXBlKG4pLHRoaXMuZWFjaChmdW5jdGlvbigpe3JldHVyblwic3RyaW5nXCI9PT1lP3RoaXMuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLG4pOlwiYXJyYXlcIj09PWU/bi5lYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihuLGUpe3JldHVybiB0Lmluc2VydEJlZm9yZShlLHQuZmlyc3RDaGlsZCl9fSh0aGlzKSk6dGhpcy5pbnNlcnRCZWZvcmUobix0aGlzLmZpcnN0Q2hpbGQpfSl9LHQuZm4ucmVwbGFjZVdpdGg9ZnVuY3Rpb24obil7dmFyIGU7cmV0dXJuIGU9dC50b1R5cGUobiksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGFyZW50Tm9kZT9cInN0cmluZ1wiPT09ZT90aGlzLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZUJlZ2luXCIsbik6XCJhcnJheVwiPT09ZT9uLmVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKG4sZSl7cmV0dXJuIHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZSx0KX19KHRoaXMpKTp0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG4sdGhpcyk6dm9pZCAwfSksdGhpcy5yZW1vdmUoKX19KHQpLGZ1bmN0aW9uKG4pe3ZhciBlLHIsaSx1O3JldHVybiBlPVwicGFyZW50Tm9kZVwiLG4uZm4uZmluZD1mdW5jdGlvbihlKXt2YXIgcjtyZXR1cm4gcj0xPT09dGhpcy5sZW5ndGg/dC5xdWVyeSh0aGlzWzBdLGUpOnRoaXMubWFwKGZ1bmN0aW9uKCl7cmV0dXJuIHQucXVlcnkodGhpcyxlKX0pLG4ocil9LG4uZm4ucGFyZW50PWZ1bmN0aW9uKHQpe3ZhciBuO3JldHVybiBuPXQ/aSh0aGlzKTp0aGlzLmluc3RhbmNlKGUpLHIobix0KX0sbi5mbi5jaGlsZHJlbj1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj10aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmNoaWxkcmVuKX0pLHIobix0KX0sbi5mbi5zaWJsaW5ncz1mdW5jdGlvbih0KXt2YXIgbjtyZXR1cm4gbj10aGlzLm1hcChmdW5jdGlvbih0LG4pe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChuLnBhcmVudE5vZGUuY2hpbGRyZW4pLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4gdCE9PW59KX0pLHIobix0KX0sbi5mbi5nZXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXNbdF18fG51bGx9LG4uZm4uZmlyc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbih0aGlzWzBdKX0sbi5mbi5sYXN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4odGhpc1t0aGlzLmxlbmd0aC0xXSl9LG4uZm4uY2xvc2VzdD1mdW5jdGlvbih0LGUpe3ZhciByLGk7Zm9yKGk9dGhpc1swXSxyPW4odCksci5sZW5ndGh8fChpPW51bGwpO2kmJnIuaW5kZXhPZihpKTwwOylpPWkhPT1lJiZpIT09ZG9jdW1lbnQmJmkucGFyZW50Tm9kZTtyZXR1cm4gbihpKX0sbi5mbi5uZXh0PWZ1bmN0aW9uKCl7cmV0dXJuIHUuY2FsbCh0aGlzLFwibmV4dFNpYmxpbmdcIil9LG4uZm4ucHJldj1mdW5jdGlvbigpe3JldHVybiB1LmNhbGwodGhpcyxcInByZXZpb3VzU2libGluZ1wiKX0sbi5mbi5pbnN0YW5jZT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1t0XX0pfSxuLmZuLm1hcD1mdW5jdGlvbih0KXtyZXR1cm4gbi5tYXAodGhpcyxmdW5jdGlvbihuLGUpe3JldHVybiB0LmNhbGwobixlLG4pfSl9LGk9ZnVuY3Rpb24odCl7dmFyIGU7Zm9yKGU9W107dC5sZW5ndGg+MDspdD1uLm1hcCh0LGZ1bmN0aW9uKHQpe3JldHVybiB0PXQucGFyZW50Tm9kZSx0IT09ZG9jdW1lbnQmJmUuaW5kZXhPZih0KTwwPyhlLnB1c2godCksdCk6dm9pZCAwfSk7cmV0dXJuIGV9LHI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbnVsbCE9ZT9uKHQpLmZpbHRlcihlKTpuKHQpfSx1PWZ1bmN0aW9uKHQpe3ZhciBlO2ZvcihlPXRoaXNbMF1bdF07ZSYmMSE9PWUubm9kZVR5cGU7KWU9ZVt0XTtyZXR1cm4gbihlKX19KHQpLHQuR2VzdHVyZXM9ZnVuY3Rpb24odCl7dmFyIGUscixpLHUsbyxhLGMsbCxzLGYsaCxkLHAsdjtyZXR1cm4gZD0hMSxsPXt9LG89bnVsbCxmPW51bGwsaT1bXCJpbnB1dFwiLFwic2VsZWN0XCIsXCJ0ZXh0YXJlYVwiXSxwPWZ1bmN0aW9uKHQpe3JldHVybiBsW3QubmFtZV09dC5oYW5kbGVyLGUodC5ldmVudHMpfSx2PWZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gdChuKS50cmlnZ2VyKGUscixmKX0saD1mdW5jdGlvbih0KXt2YXIgZTtyZXR1cm4gZT0odC5zcmNFbGVtZW50fHx0LnRhcmdldCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpLG4uY2FsbChpLGUpPj0wP3Quc3RvcFByb3BhZ2F0aW9uKCk6KGQ9ITAsZj10fHxldmVudCxvPWEodCksYyhcInN0YXJ0XCIsdC50YXJnZXQsbykpfSxzPWZ1bmN0aW9uKHQpe3JldHVybiBkPyhmPXR8fGV2ZW50LG89YSh0KSxvLmxlbmd0aD4xJiZmLnByZXZlbnREZWZhdWx0KCksYyhcIm1vdmVcIix0LnRhcmdldCxvKSk6dm9pZCAwfSx1PWZ1bmN0aW9uKHQpe3JldHVybiBkPyhmPXR8fGV2ZW50LGMoXCJlbmRcIix0LnRhcmdldCxvKSxkPSExKTp2b2lkIDB9LHI9ZnVuY3Rpb24odCl7cmV0dXJuIGQ9ITEsYyhcImNhbmNlbFwiKX0sZT1mdW5jdGlvbihuKXtyZXR1cm4gbi5mb3JFYWNoKGZ1bmN0aW9uKG4pe3JldHVybiB0LmZuW25dPWZ1bmN0aW9uKGUpe3JldHVybiB0KGRvY3VtZW50LmJvZHkpLmRlbGVnYXRlKHRoaXMuc2VsZWN0b3IsbixlKX19KSx0aGlzfSxjPWZ1bmN0aW9uKHQsbixlKXt2YXIgcixpLHU7dT1bXTtmb3IoaSBpbiBsKXI9bFtpXSxyW3RdJiZ1LnB1c2goclt0XS5jYWxsKHIsbixlKSk7cmV0dXJuIHV9LGE9ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdTtmb3Iocj10LnRvdWNoZXN8fFt0XSxpPVtdLG49MCxlPXIubGVuZ3RoO2U+bjtuKyspdT1yW25dLGkucHVzaCh7eDp1LnBhZ2VYLHk6dS5wYWdlWX0pO3JldHVybiBpfSx0KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe3ZhciBuO3JldHVybiBuPXQoZG9jdW1lbnQuYm9keSksbi5iaW5kKFwidG91Y2hzdGFydFwiLGgpLG4uYmluZChcInRvdWNobW92ZVwiLHMpLG4uYmluZChcInRvdWNoZW5kXCIsdSksbi5iaW5kKFwidG91Y2hjYW5jZWxcIixyKX0pLHthZGQ6cCx0cmlnZ2VyOnZ9fSh0KSx0Lkdlc3R1cmVzLmFkZCh7bmFtZTpcImJhc2ljXCIsZXZlbnRzOltcInRvdWNoXCIsXCJob2xkXCIsXCJkb3VibGVUYXBcIl0saGFuZGxlcjpmdW5jdGlvbih0KXt2YXIgbixlLHIsaSx1LG8sYSxjLGwscyxmLGg7cmV0dXJuIGU9MTUsbj17VEFQOjIwMCxET1VCTEVfVEFQOjQwMCxIT0xEOjQwMH0saT1udWxsLGM9ITAsYT1udWxsLG89bnVsbCx1PW51bGwsaD1mdW5jdGlvbihlLHIpe3JldHVybiAxPT09ci5sZW5ndGg/KG89e3RpbWU6bmV3IERhdGUseDpyWzBdLngseTpyWzBdLnl9LGE9ZSxpPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gdC50cmlnZ2VyKGUsXCJob2xkXCIsclswXSl9LG4uSE9MRCkpOmwoKX0sZj1mdW5jdGlvbih0LG4pe3ZhciBpO3JldHVybiBudWxsIT09byYmKGk9cihvLG5bMF0pLGkueD5lfHxpLnk+ZXx8bi5sZW5ndGg+MSk/bCgpOnZvaWQgMH0scz1mdW5jdGlvbihlLGEpe3ZhciBjLHM7aWYobylyZXR1cm4gYz1yKG8sYVswXSksMCE9PWMueHx8MCE9PWMueT9sKCk6KGNsZWFyVGltZW91dChpKSxzPW5ldyBEYXRlLHMtby50aW1lPG4uVEFQP3MtdTxuLkRPVUJMRV9UQVA/KHQudHJpZ2dlcihlLFwiZG91YmxlVGFwXCIsYVswXSksdT1udWxsKToodT1zLHQudHJpZ2dlcihlLFwidG91Y2hcIixhWzBdKSk6dm9pZCAwKX0sbD1mdW5jdGlvbigpe3JldHVybiBvPW51bGwsYz0hMSxjbGVhclRpbWVvdXQoaSl9LHI9ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gZT17eDpuLngtdC54LHk6bi55LXQueX19LHtzdGFydDpoLG1vdmU6ZixlbmQ6cyxjYW5jZWw6bH19KHQuR2VzdHVyZXMpfSksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJkcmFnXCIsZXZlbnRzOltcImRyYWdcIixcImRyYWdnaW5nXCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZixoO3JldHVybiBuPXdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvPj0yPzE1OjIwLGM9bnVsbCxvPW51bGwsYT1udWxsLHU9bnVsbCxoPWZ1bmN0aW9uKHQsbil7cmV0dXJuIG4ubGVuZ3RoPj0yPyhjPXQsbz1uLmxlbmd0aCxhPWUobikpOnZvaWQgMH0sZj1mdW5jdGlvbih0LG4pe3ZhciBlO3JldHVybiBuLmxlbmd0aD09PW8/KGU9cihuKSx1PXt0b3VjaGVzOm4sZGVsdGE6ZX0saSghMCkpOnZvaWQgMH0sbD1zPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGEmJnU/KGkoITEpLG89bnVsbCxhPW51bGwsdT1udWxsKTp2b2lkIDB9LHI9ZnVuY3Rpb24odCl7dmFyIG47cmV0dXJuIG49ZSh0KSx7eDpuLngtYS54LHk6bi55LWEueX19LGU9ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdTtmb3IoaT0wLHU9MCxuPTAsZT10Lmxlbmd0aDtlPm47bisrKXI9dFtuXSxpKz1wYXJzZUludChyLngpLHUrPXBhcnNlSW50KHIueSk7cmV0dXJue3g6aS90Lmxlbmd0aCx5OnUvdC5sZW5ndGh9fSxpPWZ1bmN0aW9uKGUpe3JldHVybiBlP3QudHJpZ2dlcihjLFwiZHJhZ2dpbmdcIix1KTpNYXRoLmFicyh1LmRlbHRhLngpPm58fE1hdGguYWJzKHUuZGVsdGEueSk+bj90LnRyaWdnZXIoYyxcImRyYWdcIix1KTp2b2lkIDB9LHtzdGFydDpoLG1vdmU6ZixlbmQ6c319KHQuR2VzdHVyZXMpfSksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJwaW5jaFwiLGV2ZW50czpbXCJwaW5jaFwiLFwicGluY2hpbmdcIixcInBpbmNoSW5cIixcInBpbmNoT3V0XCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHM7cmV0dXJuIG49d2luZG93LmRldmljZVBpeGVsUmF0aW8+PTI/MTU6MjAsbz1udWxsLHU9bnVsbCxpPW51bGwscz1mdW5jdGlvbih0LG4pe3JldHVybiAyPT09bi5sZW5ndGg/KG89dCx1PXIoblswXSxuWzFdKSk6dm9pZCAwfSxsPWZ1bmN0aW9uKHQsbil7dmFyIG87cmV0dXJuIHUmJjI9PT1uLmxlbmd0aD8obz1yKG5bMF0sblsxXSksaT17dG91Y2hlczpuLGRlbHRhOm8tdX0sZSghMCkpOnZvaWQgMH0sYT1jPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHUmJmk/KGUoITEpLHU9bnVsbCxpPW51bGwpOnZvaWQgMH0scj1mdW5jdGlvbih0LG4pe3JldHVybiBNYXRoLnNxcnQoKG4ueC10LngpKihuLngtdC54KSsobi55LXQueSkqKG4ueS10LnkpKX0sZT1mdW5jdGlvbihlKXt2YXIgcjtyZXR1cm4gZT90LnRyaWdnZXIobyxcInBpbmNoaW5nXCIsaSk6TWF0aC5hYnMoaS5kZWx0YSk+bj8odC50cmlnZ2VyKG8sXCJwaW5jaFwiLGkpLHI9aS5kZWx0YT4wP1wicGluY2hPdXRcIjpcInBpbmNoSW5cIix0LnRyaWdnZXIobyxyLGkpKTp2b2lkIDB9LHtzdGFydDpzLG1vdmU6bCxlbmQ6Y319KHQuR2VzdHVyZXMpfSksdC5HZXN0dXJlcy5hZGQoe25hbWU6XCJyb3RhdGlvblwiLGV2ZW50czpbXCJyb3RhdGVcIixcInJvdGF0aW5nXCIsXCJyb3RhdGVMZWZ0XCIsXCJyb3RhdGVSaWdodFwiXSxoYW5kbGVyOmZ1bmN0aW9uKHQpe3ZhciBuLGUscixpLHUsbyxhLGMsbCxzLGYsaCxkO3JldHVybiBuPTUsZT0yMCxsPW51bGwsdT0wLGM9bnVsbCxpPW51bGwsZD1mdW5jdGlvbih0LG4pe3JldHVybiAyPT09bi5sZW5ndGg/KGw9dCx1PTAsYz1vKG5bMF0sblsxXSkpOnZvaWQgMH0saD1mdW5jdGlvbih0LG4pe3ZhciBsO3JldHVybiBjJiYyPT09bi5sZW5ndGg/KGw9byhuWzBdLG5bMV0pLWMsaSYmTWF0aC5hYnMoaS5kZWx0YS1sKT5lJiYobCs9MzYwKmEoaS5kZWx0YSkpLE1hdGguYWJzKGwpPjM2MCYmKHUrKyxsLT0zNjAqYShpLmRlbHRhKSksaT17dG91Y2hlczpuLGRlbHRhOmwscm90YXRpb25zQ291bnQ6dX0scighMCkpOnZvaWQgMH0scz1mPWZ1bmN0aW9uKHQsbil7cmV0dXJuIGMmJmk/KHIoITEpLGw9bnVsbCx1PTAsYz1udWxsLGk9bnVsbCxjPW51bGwpOnZvaWQgMH0sYT1mdW5jdGlvbih0KXtyZXR1cm4gMD50Py0xOjF9LG89ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gZT1NYXRoLmF0YW4yKHQueS1uLnksdC54LW4ueCksMTgwKigwPmU/ZSsyKk1hdGguUEk6ZSkvTWF0aC5QSX0scj1mdW5jdGlvbihlKXt2YXIgcjtyZXR1cm4gZT90LnRyaWdnZXIobCxcInJvdGF0aW5nXCIsaSk6TWF0aC5hYnMoaS5kZWx0YSk+bj8odC50cmlnZ2VyKGwsXCJyb3RhdGVcIixpKSxyPWkuZGVsdGE+MD9cInJvdGF0ZVJpZ2h0XCI6XCJyb3RhdGVMZWZ0XCIsdC50cmlnZ2VyKGwscixpKSk6dm9pZCAwfSx7c3RhcnQ6ZCxtb3ZlOmgsZW5kOmZ9fSh0Lkdlc3R1cmVzKX0pLHQuR2VzdHVyZXMuYWRkKHtuYW1lOlwic3dpcGVcIixldmVudHM6W1wic3dpcGVcIixcInN3aXBlTGVmdFwiLFwic3dpcGVSaWdodFwiLFwic3dpcGVVcFwiLFwic3dpcGVEb3duXCIsXCJzd2lwaW5nXCIsXCJzd2lwaW5nSG9yaXpvbnRhbFwiLFwic3dpcGluZ1ZlcnRpY2FsXCJdLGhhbmRsZXI6ZnVuY3Rpb24odCl7dmFyIG4sZSxyLGksdSxvLGEsYyxsLHMsZjtyZXR1cm4gbj1NYXRoLnJvdW5kKDIwL3dpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSxhPW51bGwsdT1udWxsLG89bnVsbCxpPW51bGwsZj1mdW5jdGlvbih0LG4pe3JldHVybiAxPT09bi5sZW5ndGg/KGE9dCx1PW5bMF0saT1udWxsKTp2b2lkIDB9LHM9ZnVuY3Rpb24odCxuKXt2YXIgcixvO3JldHVybiAxPT09bi5sZW5ndGg/KHI9e3g6blswXS54LXUueCx5Om5bMF0ueS11Lnl9LG89bnVsbD09PWksaT17eDpuWzBdLngseTpuWzBdLnksZGVsdGE6cn0sZSghMCxvKSk6aT1udWxsfSxjPWw9ZnVuY3Rpb24odCxuKXt2YXIgcjtyZXR1cm4gbnVsbD09aSYmbi5sZW5ndGg+PTEmJihyPXt4Om5bMF0ueC11LngseTpuWzBdLnktdS55fSxpPXt4Om5bMF0ueCx5Om5bMF0ueSxkZWx0YTpyfSksaT8oZSghMSksaT1udWxsKTp2b2lkIDB9LGU9ZnVuY3Rpb24oZSx1KXt2YXIgYyxsLHMsZixoO2lmKG51bGw9PXUmJih1PSExKSxlKXJldHVybiB1JiYobz1yKGkuZGVsdGEueCxpLmRlbHRhLnkpKSxudWxsIT09byYmdC50cmlnZ2VyKGEsXCJzd2lwaW5nXCIrbyxpKSx0LnRyaWdnZXIoYSxcInN3aXBpbmdcIixpKTtpZihsPVtdLE1hdGguYWJzKGkuZGVsdGEueSk+bj9sLnB1c2goaS5kZWx0YS55PDA/XCJVcFwiOlwiRG93blwiKTpNYXRoLmFicyhpLmRlbHRhLngpPm4mJmwucHVzaChpLmRlbHRhLng8MD9cIkxlZnRcIjpcIlJpZ2h0XCIpLGwubGVuZ3RoKXtmb3IodC50cmlnZ2VyKGEsXCJzd2lwZVwiLGkpLGg9W10scz0wLGY9bC5sZW5ndGg7Zj5zO3MrKyljPWxbc10saC5wdXNoKHQudHJpZ2dlcihhLFwic3dpcGVcIitjLGkpKTtyZXR1cm4gaH19LHI9ZnVuY3Rpb24odCxuKXt2YXIgZTtyZXR1cm4gZT1udWxsLE1hdGgucm91bmQoTWF0aC5hYnModC9uKSk+PTI/ZT1cIkhvcml6b250YWxcIjpNYXRoLnJvdW5kKE1hdGguYWJzKG4vdCkpPj0yJiYoZT1cIlZlcnRpY2FsXCIpLGV9LHtzdGFydDpmLG1vdmU6cyxlbmQ6bH19KHQuR2VzdHVyZXMpfSl9KS5jYWxsKHRoaXMpO1xuIiwiLy8gU2Ftc29uLlBhZ2UgY29uc3RydWN0b3IgZnVuY3Rpb25cbi8vIFVzZWQgdG8gc2ltcGxpZnkgcGFnZSByZW5kZXJpbmcgYW5kIHRyYW5zaXRpb25zIGluIHNpbmdsZSBwYWdlIGFwcHNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcbnZhciBTaGFyZWQgPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xudmFyIFV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyICQgPSByZXF1aXJlKCcuL21vZHVsZXMvcXVvLmpzJyk7XG52YXIganNzID0gcmVxdWlyZSgnanNzJyk7XG5cbi8qIG9wdGlvbnMgY2FuIGluY2x1ZGU6XG4vLyBuYW1lIC0gbmFtZSBvZiB0aGUgcGFnZVxuLy8gc3ViUGFnZU9mIC0gYW4gb3B0aW9uYWwgcGFyZW50IHBhZ2UgdGhhdCBpcyB0aGUgc3RhcnQgb2YgYSBzcGVjaWZpYyBjYXRlZ29yeSAtIGV4OiBVc2VyIEJpbyBQYWdlIGlzIHN1YlBhZ2VPZiBvZiBQcm9maWxlIFBhZ2Vcbi8vIHByZXZpb3VzUGFnZSAtIGFuIG9wdGlvbmFsIHByZXZpb3VzIHBhZ2UgdG8gbWFrZSBnb2luZyBiYWNrIGVhc2llclxuLy8gYmFja1NhZmUgLSBmYWxzZSBieSBkZWZhdWx0LiBzZXQgdG8gdHJ1ZSBpZiBpdCBpcyBzYWZlIHRvIGdvIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gYW55IG90aGVyIHBhZ2UgaW4gdGhlIGFwcFxuLy8gdGVtcGxhdGUvcmVuZGVyIC0gdGhlIGZ1bmN0aW9uIHRoYXQgb3V0cHV0cyBhbiBIVE1MIHN0cmluZyB0aGF0IGdldHMgYXR0YWNoZWQgdG8gdGhlIERPTVxuLy8gc3R5bGUgLSBKU1Mgc3R5bGUgb2JqZWN0XG4vLyBjb21wb25lbnRzIC0gYW55IG90aGVyIGNvbXBvbmVudHMgdGhhdCBzaG91bGQgYmUgbG9hZGVkL3JlZnJlc2hlZCB3aXRoIHRoZSBwYWdlXG4vLyBldmVudHMgLSBhbnkgZXZlbnRzIHRvIGF0dGFjaCB0byB0aGUgcGFnZVxuLy8gYmVmb3JlUmVuZGVyIC0gYSBmdW5jdGlvbiB0aGF0IHJ1bnMgYmVmb3JlIHRoZSBwYWdlIGlzIHJlbmRlcmVkICh1cGRhdGUgbW9kZWxzLCBzb3J0IGNvbGxlY3Rpb25zKVxuLy8gYWZ0ZXJSZW5kZXIgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyBhZnRlciB0aGUgcGFnZSBpcyByZW5kZXJlZCAoc2Nyb2xsIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UsIG1hcmtlZCBjaGVja2JveGVzIGFzIGNoZWNrZWQpXG4vLyBiZWZvcmVSZW1vdmUgLSBhIGZ1bmN0aW9uIHRoYXQgcnVucyByaWdodCBiZWZvcmUgdGhlIHBhZ2UgaXMgZnVsbHkgZGVzdHJveWVkIChjbGVhbnVwIG1vZGVscywgdXBkYXRlIGFjdGl2aXR5IGhpc3RvcnkpXG4vLyBjdXN0b20vZXh0ZW5kIC0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgY3VzdG9tIG1ldGhvZHMvcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgZGlyZWN0bHkgdG8gdGhlIFBhZ2UgaW5zdGFuY2UgaWYgdGhlcmUgYXJlIG5vIG5hbWluZyBjb25mbGljdHMgd2l0aCByZXNlcnZlZCBwcm9wZXJ0aWVzXG4qL1xuXG5mdW5jdGlvbiBTYW1zb25QYWdlKG9wdGlvbnMpIHtcblxuICAvLyBzZXQgdGhlIG5hbWUgb2YgdGhlIHBhZ2VcbiAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lO1xuXG4gIC8vIGpzcyBzdHlsZVNoZWV0XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5zdHlsZSA9PT0gXCJvYmplY3RcIikge1xuICAgIHRoaXMuc3R5bGUgPSBqc3MuY3JlYXRlU3R5bGVTaGVldChvcHRpb25zLnN0eWxlLCB7bmFtZWQ6IGZhbHNlfSk7XG4gIH1cblxuICAvLyBzdWJQYWdlT2YgaXMgZmFsc2UgaWYgaXQgaXMgYSB0b3AtbGV2ZWwgcGFnZSwgb3RoZXJ3aXNlIGl0IGlzIHRoZSBuYW1lIG9mIHRoZSB0b3AtbGV2ZWwgcGFnZSBpdCBpcyBsaW5rZWQgdG9cbiAgdGhpcy5zdWJQYWdlT2YgPSBvcHRpb25zLnN1YlBhZ2VPZiB8fCBmYWxzZTtcblxuICAvLyBzZXQgdGhlIHByZXZpb3VzUGFnZSBpZiBpdCBpcyBzcGVjaWZpZWRcbiAgdGhpcy5wcmV2aW91c1BhZ2UgPSBvcHRpb25zLnByZXZpb3VzUGFnZSB8fCBmYWxzZTtcblxuICAvLyBzZXQgdGhlIGJhY2tBbmltYXRpb24gaWYgaXQgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmFja0FuaW1hdGlvbiA9IG9wdGlvbnMuYmFja0FuaW1hdGlvbiB8fCBmYWxzZTtcblxuICAvLyBzZXQgYmFja1NhZmUgaWYgaXQgaXMgc3BlY2lmaWVkXG4gIHRoaXMuYmFja1NhZmUgPSBvcHRpb25zLmJhY2tTYWZlIHx8IGZhbHNlO1xuXG4gIC8vIHNldCB0aGUgcGFnZSBldmVudHMgaWYgdGhleSBhcmUgc3BlY2lmaWVkXG4gIHRoaXMuZG9tRXZlbnRzID0gb3B0aW9ucy5ldmVudHMgPyBvcHRpb25zLmV2ZW50cyA6IChvcHRpb25zLmRvbUV2ZW50cyB8fCB7fSk7XG4gIHRoaXMuYXBwRXZlbnRzID0gb3B0aW9ucy5hcHBFdmVudHMgfHwge307XG5cbiAgLy8gc2V0dXAgdGhlIHBhZ2UncyBjb21wb25lbnRzXG4gIHRoaXMuc2V0Q29tcG9uZW50cyA9IG9wdGlvbnMuc2V0Q29tcG9uZW50cyB8fCBmdW5jdGlvbigpIHsgcmV0dXJuIChvcHRpb25zLmNvbXBvbmVudHMgfHwge30pOyB9O1xuICB0aGlzLmNvbXBvbmVudHMgPSB0aGlzLnNldENvbXBvbmVudHMoKTtcbiAgdGhpcy5fY29tcG9uZW50c0xvYWRlZCA9IGZhbHNlO1xuXG4gIC8vIHNldEluaXRpYWxTdGF0ZSBmdW5jdGlvblxuICB0aGlzLnNldEluaXRpYWxTdGF0ZSA9IG9wdGlvbnMuc2V0SW5pdGlhbFN0YXRlIHx8IFNoYXJlZC5qdXN0UmV0dXJuT2JqZWN0O1xuICB0aGlzLnN0YXRlID0ge307XG4gIHRoaXMuX2luaXRpYWxTdGF0ZVNldCA9IGZhbHNlO1xuICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSBmYWxzZTtcblxuICB0aGlzLl9sb2FkZWRFdmVudHMgPSBbXTtcblxuICAvLyBzZXQgdGhlIHBhZ2UncyByZW5kZXIgZnVuY3Rpb24gdGhhdCB3aWxsIG91dHB1dCBhbiBodG1sIHN0cmluZ1xuICAvLyBpZiBubyByZW5kZXIgZnVuY3Rpb24gd2FzIHBhc3NlZCBpbiwgd2UgY2hlY2sgZm9yIGEgdGVtcGxhdGUgZnVuY3Rpb25cbiAgdGhpcy5fdGVtcGxhdGUgPSBvcHRpb25zLnJlbmRlciB8fCBvcHRpb25zLnRlbXBsYXRlO1xuICBpZiAoIXRoaXMuX3RlbXBsYXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJZb3VyIHBhZ2UgXCIgKyB0aGlzLm5hbWUgKyBcIiBtdXN0IGhhdmUgYSByZW5kZXIgb3IgdGVtcGxhdGUgZnVuY3Rpb24gdGhhdCBvdXRwdXRzIGFuIEhUTUwgc3RyaW5nXCIpO1xuXG4gIC8vIHNldCB0aGUgYmVmb3JlUmVuZGVyIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWRcbiAgdGhpcy5iZWZvcmVSZW5kZXIgPSBvcHRpb25zLmJlZm9yZVJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgYWZ0ZXJSZW5kZXIgZnVuY3Rpb24gaWYgb25lIGlzIHNwZWNpZmllZFxuICB0aGlzLmFmdGVyUmVuZGVyID0gb3B0aW9ucy5hZnRlclJlbmRlciB8fCBTaGFyZWQuanVzdENhbGxiYWNrO1xuXG4gIC8vIHNldCB0aGUgcmVtb3ZlL2Nsb3NlIGZ1bmN0aW9uIGlmIG9uZSBpcyBzcGVjaWZpZWQsIG90aGVyd2lzZSBqdXN0IGludm9rZSBjYWxsYmFja1xuICB0aGlzLmJlZm9yZVJlbW92ZSA9IG9wdGlvbnMuYmVmb3JlUmVtb3ZlIHx8IFNoYXJlZC5qdXN0Q2FsbGJhY2s7XG5cbiAgLy8gYWRkIGFueSByb3V0ZXItcmVsYXRlZCB0YXNrc1xuICB0aGlzLl91dWlkID0gdGhpcy5uYW1lICsgXCItXCIgKyBEYXRlLm5vdygpOyAvLyB0aGUgdXVpZCBhbGxvd3MgdXMgdG8gZWFzaWx5IHJlZmVyZW5jZSB0aGUgYWRkZWQgcm91dGVyIHRhc2tzXG4gIHRoaXMuX3JvdXRlciA9IG9wdGlvbnMuUm91dGVyIHx8IG9wdGlvbnMucm91dGVyIHx8IHt9O1xuICBTaGFyZWQuYWRkUm91dGVyVGFza3ModGhpcyk7XG5cbiAgLy8gYWRkIGFueSB1bnJlc2VydmVkIHByb3BlcnRpZXMgcGFzc2VkIGludG8gdGhlIGN1c3RvbSBvciBleHRlbmQgb2JqZWN0XG4gIHZhciBjdXN0b20gPSBvcHRpb25zLmV4dGVuZCB8fCBvcHRpb25zLmN1c3RvbSB8fCB7fTtcbiAgVXRpbHMuZXh0ZW5kKHRoaXMsIGN1c3RvbSwgU2hhcmVkLnJlc2VydmVkKTtcblxufVxuXG4vLyBIYXZlIHRoZSBTYW1zb25QYWdlIGNsYXNzIGluaGVyaXQgYW55IHNoYXJlZCBtZXRob2RzXG5TYW1zb25QYWdlLnByb3RvdHlwZS5fdHlwZSA9IFwiUGFnZVwiO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuc2V0U3RhdGUgPSBTaGFyZWQuc2V0U3RhdGU7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fZG9GaXJzdCA9IFNoYXJlZC5fZG9GaXJzdDtcblNhbXNvblBhZ2UucHJvdG90eXBlLl9sb2FkRXZlbnRzID0gU2hhcmVkLl9sb2FkRXZlbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX2Rlc3Ryb3lFdmVudHMgPSBTaGFyZWQuX2Rlc3Ryb3lFdmVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fbG9hZENvbXBvbmVudHMgPSBTaGFyZWQuX2xvYWRDb21wb25lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbmRlckNvbXBvbmVudHMgPSBTaGFyZWQuX3JlbmRlckNvbXBvbmVudHM7XG5TYW1zb25QYWdlLnByb3RvdHlwZS5fZGVzdHJveUNvbXBvbmVudHMgPSBTaGFyZWQuX2Rlc3Ryb3lDb21wb25lbnRzO1xuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbW92ZSA9IFNoYXJlZC5fcmVtb3ZlO1xuXG4vLyByZW5kZXIgdGhlIHBhZ2UgdG8gdGhlIERPTVxuU2Ftc29uUGFnZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgcGFnZV9jb250YWluZXIsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuX2xvYWRDb21wb25lbnRzKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG5cbiAgICBzZWxmLl9kb0ZpcnN0KFwiYmVmb3JlUmVuZGVyXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBjcmVhdGUgdGhlIGluaXRpYWwgc3RhdGUgb2JqZWN0IG9mIHRoZSBwYWdlIHRoYXQgaXMgcGFzc2VkIGludG8gdGhlIHJlbmRlciBjYWxsXG4gICAgICBpZiAoIXNlbGYuX2luaXRpYWxTdGF0ZVNldCkge1xuICAgICAgICBzZWxmLnN0YXRlID0gc2VsZi5zZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgc2VsZi5faW5pdGlhbFN0YXRlU2V0ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoc2VsZi5zdHlsZSkgc2VsZi5zdHlsZS5hdHRhY2goKTsgLy8gbG9hZCB0aGUgc3R5bGVzaGVldCBvbiBmaXJzdCByZW5kZXJcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRoZSBwYWdlIGVsZW1lbnRcbiAgICAgIGlmICghc2VsZi5lbGVtZW50KSB7XG4gICAgICAgIHNlbGYuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNlbGYuZWxlbWVudC5pZCA9IHNlbGYubmFtZSArIFwiLXBhZ2VcIjtcbiAgICAgICAgc2VsZi5lbGVtZW50LmlubmVySFRNTCA9IHNlbGYuX3RlbXBsYXRlKHNlbGYuc3RhdGUpO1xuICAgICAgICBwYWdlX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxmLmVsZW1lbnQpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBwYWdlIGFzIGFuIGV2ZW50IGRlbGVnYXRvciBmb3IgYWxsIGl0cyBzdWJjb21wb25lbnRzXG4gICAgICAgIHNlbGYuZGVsZWdhdGUgPSAkKHNlbGYuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB3aGV0aGVyIG9yIG5vdCB3ZSB3aWxsIGZvcmNlIHN1YmNvbXBvbmVudHMgdG8gdXBkYXRlXG4gICAgICBpZiAoZm9yY2VfdXBkYXRlIHx8IHNlbGYuX3N0YXRlQ2hhbmdlZCkge1xuICAgICAgICBmb3JjZV91cGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxmLmVsZW1lbnQuaW5uZXJIVE1MID0gc2VsZi5fdGVtcGxhdGUoc2VsZi5zdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2xvYWRFdmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2VsZi5fcmVuZGVyQ29tcG9uZW50cyhmb3JjZV91cGRhdGUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgLy8gcmVzZXQgc3RhdGVDaGFuZ2VkXG4gICAgICAgICAgc2VsZi5fc3RhdGVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJSZW5kZXJcIiwgZnVuY3Rpb24oKSB7IGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTsgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSk7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uUGFnZTtcbiIsIlxudmFyIGFuaW1hdGlvbkFtb3VudCA9IFwiMTAwJVwiO1xudmFyIGFuaW1hdGlvbkR1cmF0aW9uID0gXCIwLjZzXCI7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIG5hbWVzOiB7XG5cbiAgICBcInRvcFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tYm90dG9tXCIsIG5leHQ6IFwibW92ZS1mcm9tLXRvcFwiIH0sXG4gICAgXCJib3R0b21cIiA6IHsgY3VycmVudDogXCJtb3ZlLXRvLXRvcFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1ib3R0b21cIiB9LFxuICAgIFwibGVmdFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tcmlnaHRcIiwgbmV4dDogXCJtb3ZlLWZyb20tbGVmdFwiIH0sXG4gICAgXCJyaWdodFwiIDogeyBjdXJyZW50OiBcIm1vdmUtdG8tbGVmdFwiLCBuZXh0OiBcIm1vdmUtZnJvbS1yaWdodFwiIH0sXG4gICAgXCJzY2FsZVwiIDogeyBjdXJyZW50OiBcInNjYWxlLW91dFwiLCBuZXh0OiBcInNjYWxlLWluXCIgfSxcbiAgICBcImZhZGVcIiA6IHsgY3VycmVudDogXCJmYWRlLW91dFwiLCBuZXh0OiBcImZhZGUtaW5cIiB9XG5cbiAgfSxcblxuICBzdHlsZXM6IHtcblxuICAgIFwiLm1vdmUtdG8tdG9wXCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9Ub3BcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLWZyb20tdG9wXCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbVRvcFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluXCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS10by1ib3R0b21cIjoge1xuICAgICAgXCJhbmltYXRpb24tbmFtZVwiOiBcIm1vdmVUb0JvdHRvbVwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluXCJcbiAgICB9LFxuXG4gICAgXCIubW92ZS1mcm9tLWJvdHRvbVwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21Cb3R0b21cIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pblwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtdG8tbGVmdFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZVRvTGVmdFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1sZWZ0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlRnJvbUxlZnRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5tb3ZlLXRvLXJpZ2h0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJtb3ZlVG9SaWdodFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLm1vdmUtZnJvbS1yaWdodFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwibW92ZUZyb21SaWdodFwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLW91dFwiXG4gICAgfSxcblxuICAgIFwiLnNjYWxlLW91dFwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwic2NhbGVPdXRcIixcbiAgICAgIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IGFuaW1hdGlvbkR1cmF0aW9uLFxuICAgICAgXCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCI6IFwiZWFzZS1pbi1vdXRcIlxuICAgIH0sXG5cbiAgICBcIi5zY2FsZS1pblwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwic2NhbGVJblwiLFxuICAgICAgXCJhbmltYXRpb24tZHVyYXRpb25cIjogYW5pbWF0aW9uRHVyYXRpb24sXG4gICAgICBcImFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb25cIjogXCJlYXNlLWluLW91dFwiXG4gICAgfSxcblxuICAgIFwiLmZhZGUtb3V0XCI6IHtcbiAgICAgIFwiYW5pbWF0aW9uLW5hbWVcIjogXCJmYWRlT3V0XCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9LFxuXG4gICAgXCIuZmFkZS1pblwiOiB7XG4gICAgICBcImFuaW1hdGlvbi1uYW1lXCI6IFwiZmFkZUluXCIsXG4gICAgICBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBhbmltYXRpb25EdXJhdGlvbixcbiAgICAgIFwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1RvcFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWSgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21Ub3BcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWSgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvQm90dG9tXCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVZKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tQm90dG9tXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVkoXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZVRvTGVmdFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgtXCIgKyBhbmltYXRpb25BbW91bnQgKyBcIilcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgbW92ZUZyb21MZWZ0XCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoLVwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVUb1JpZ2h0XCIgOiB7XG4gICAgICB0byA6IHtcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgYW5pbWF0aW9uQW1vdW50ICsgXCIpXCJcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJAa2V5ZnJhbWVzIG1vdmVGcm9tUmlnaHRcIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIFwiVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIGFuaW1hdGlvbkFtb3VudCArIFwiKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBzY2FsZU91dFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgICBcIlRyYW5zZm9ybVwiOiBcInNjYWxlKC4xKVwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBzY2FsZUluXCIgOiB7XG4gICAgICBmcm9tIDoge1xuICAgICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICAgICAgXCJUcmFuc2Zvcm1cIjogXCJzY2FsZSguMSlcIlxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcIkBrZXlmcmFtZXMgZmFkZU91dFwiIDoge1xuICAgICAgdG8gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiQGtleWZyYW1lcyBmYWRlSW5cIiA6IHtcbiAgICAgIGZyb20gOiB7XG4gICAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufTtcbiIsIi8vIFNhbXNvbi5Sb3V0ZXIgY29uc3RydWN0b3IgZnVuY3Rpb25cbi8vIFVzZWQgdG8gaGFuZGxlIHBhZ2UgaGlzdG9yeSBhbmQgdHJhbnNpdGlvbnNcblxudmFyIFNhbXNvbiA9IHJlcXVpcmUoJy4uL2luZGV4Jyk7XG52YXIgYXN5bmMgPSByZXF1aXJlKCdhc3luYy1saXRlJyk7XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGpzcyA9IHJlcXVpcmUoXCJqc3NcIik7XG5cbnZhciBiYXNlX3JvdXRlcl9hbmltYXRpb25zID0gcmVxdWlyZSgnLi9iYXNlX3JvdXRlcl9hbmltYXRpb25zJyk7XG5cbmZ1bmN0aW9uIFNhbXNvblJvdXRlcihvcHRpb25zKSB7XG5cbiAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IFwic2Ftc29uX3BhZ2VfMVwiO1xuICB0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnQgPSBcInNhbXNvbl9wYWdlXzJcIjtcblxuICAvLyBvdXIgcGFnZSBjYWNoZSB3aWxsIHN0b3JlIHRoZSBpbml0aWFsaXplZCBwYWdlc1xuICB0aGlzLnBhZ2VDYWNoZSA9IHt9O1xuXG4gIC8vIGNyZWF0ZSB0aGUgYXBwIHJvdXRlciBoaXN0b3J5XG4gIHRoaXMuaGlzdG9yeSA9IFtdO1xuXG4gIC8vIGEgcXVldWUgb2YgYW55IHJvdXRlciBldmVudHMgdGhhdCBoYXZlbid0IGJlZW4gaGFuZGxlZCB5ZXRcbiAgdGhpcy5xdWV1ZSA9IFtdO1xuXG4gIC8vIHNldCB0aGUgYXBwJ3MgYW5pbWF0aW9uc1xuICB0aGlzLmFuaW1hdGlvbnMgPSBiYXNlX3JvdXRlcl9hbmltYXRpb25zLm5hbWVzO1xuICB0aGlzLnN0eWxlID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQoYmFzZV9yb3V0ZXJfYW5pbWF0aW9ucy5zdHlsZXMsIHtuYW1lZDogZmFsc2V9KTtcblxuICB2YXIgY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zID0gb3B0aW9ucy5hbmltYXRpb25zIHx8IHt9O1xuXG4gIGlmIChjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMubmFtZXMgJiYgY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLnN0eWxlcykge1xuICAgIHRoaXMuc3R5bGUuYWRkUnVsZXMoY3VzdG9tX3JvdXRlcl9hbmltYXRpb25zLnN0eWxlcyk7XG5cbiAgICB2YXIga2V5O1xuICAgIGZvciAoa2V5IGluIGN1c3RvbV9yb3V0ZXJfYW5pbWF0aW9ucy5uYW1lcykge1xuICAgICAgdGhpcy5hbmltYXRpb25zW2tleV0gPSBjdXN0b21fcm91dGVyX2FuaW1hdGlvbnMubmFtZXNba2V5XTtcbiAgICB9XG4gIH1cbiAgdGhpcy5zdHlsZS5hdHRhY2goKTsgLy8gYXR0YWNoIHRoZSBhbmltYXRpb25zIHRvIHRoZSBydW5uaW5nIGFwcFxuXG4gIHRoaXMuY3VycmVudFBhZ2UgPSBmYWxzZTsgLy8gdGhlIG5hbWUgb2YgdGhlIHBhZ2Ugd2UgYXJlIGN1cnJlbnRseSBvblxuXG4gIHRoaXMucHJldmlvdXNQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwcmV2aW91cyBwYWdlIHdlIHdlcmUgb25cblxuICB0aGlzLm5leHRQYWdlID0gZmFsc2U7IC8vIHRoZSBuYW1lIG9mIHRoZSBwYWdlIHdlIGFyZSB0cmFuc2l0aW9uaW5nIHRvXG5cbiAgdGhpcy5pc0J1c3kgPSBmYWxzZTsgLy8gc2V0IHRvIHRydWUgd2hlbmV2ZXIgdGhlIHJvdXRlIGlzIHN0aWxsIGhhbmRsaW5nIGFuIGV2ZW50XG5cbiAgdGhpcy5wYWdlc0FuaW1hdGluZyA9IGZhbHNlOyAvLyBzZXQgdG8gdHJ1ZSBpZiBhIG5ldyBwYWdlIGlzIGJlaW5nIGxvYWRlZFxuXG4gIC8vIHNldCB0aGUgZGVmYXVsdCBuYXZpZ2F0ZSBhbmltYXRpb25cbiAgdGhpcy5uYXZpZ2F0ZUFuaW1hdGlvbiA9IG9wdGlvbnMuZGVmYXVsdE5hdmlnYXRlQW5pbWF0aW9uIHx8IFwicmlnaHRcIjtcblxuICAvL3NldCB0aGUgZGVmYXVsdCBiYWNrIGFuaW1hdGlvblxuICB0aGlzLmJhY2tBbmltYXRpb24gPSBvcHRpb25zLmRlZmF1bHRCYWNrQW5pbWF0aW9uIHx8IFwibGVmdFwiO1xuXG4gIHRoaXMuYmVmb3JlTmF2aWdhdGUgPSB7fTtcbiAgdGhpcy5hZnRlck5hdmlnYXRlID0ge307XG4gIHRoaXMuYmVmb3JlQW5pbWF0ZSA9IHt9O1xuICB0aGlzLmR1cmluZ0FuaW1hdGUgPSB7fTtcbiAgdGhpcy5hZnRlckFuaW1hdGUgPSB7fTtcbiAgdGhpcy5iZWZvcmVCYWNrID0ge307XG4gIHRoaXMuYWZ0ZXJCYWNrID0ge307XG5cbiAgaWYgKG9wdGlvbnMuYmVmb3JlTmF2aWdhdGUpIHsgdGhpcy5iZWZvcmVOYXZpZ2F0ZS5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZU5hdmlnYXRlOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyTmF2aWdhdGUpIHsgdGhpcy5hZnRlck5hdmlnYXRlLnJvdXRlciA9IG9wdGlvbnMuYWZ0ZXJOYXZpZ2F0ZTsgfVxuICBpZiAob3B0aW9ucy5iZWZvcmVBbmltYXRlKSB7IHRoaXMuYmVmb3JlQW5pbWF0ZS5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZUFuaW1hdGU7IH1cbiAgaWYgKG9wdGlvbnMuZHVyaW5nQW5pbWF0ZSkgeyB0aGlzLmR1cmluZ0FuaW1hdGUucm91dGVyID0gb3B0aW9ucy5kdXJpbmdBbmltYXRlOyB9XG4gIGlmIChvcHRpb25zLmFmdGVyQW5pbWF0ZSkgeyB0aGlzLmFmdGVyQW5pbWF0ZS5yb3V0ZXIgPSBvcHRpb25zLmFmdGVyQW5pbWF0ZTsgfVxuICBpZiAob3B0aW9ucy5iZWZvcmVCYWNrKSB7IHRoaXMuYmVmb3JlQmFjay5yb3V0ZXIgPSBvcHRpb25zLmJlZm9yZUJhY2s7IH1cbiAgaWYgKG9wdGlvbnMuYWZ0ZXJCYWNrKSB7IHRoaXMuYWZ0ZXJCYWNrLnJvdXRlciA9IG9wdGlvbnMuYWZ0ZXJCYWNrOyB9XG5cbn07XG5cbi8vIGdldCB0aGUgcm91dGVyJ3MgY3VycmVudCBwYWdlIGRhdGFcblNhbXNvblJvdXRlci5wcm90b3R5cGUuZ2V0UGFnZURhdGEgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50UGFnZSA6IHRoaXMuY3VycmVudFBhZ2UsXG4gICAgcHJldmlvdXNQYWdlIDogdGhpcy5wcmV2aW91c1BhZ2UsXG4gICAgbmV4dFBhZ2UgOiB0aGlzLm5leHRQYWdlLFxuICAgIHBhZ2VzQW5pbWF0aW5nIDogdGhpcy5wYWdlc0FuaW1hdGluZyxcbiAgICBhY3RpdmVQYWdlRWxlbWVudCA6IHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQsXG4gICAgaW5hY3RpdmVQYWdlRWxlbWVudCA6IHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudFxuICB9O1xufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5fZG9GaXJzdCA9IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHRhc2tzID0gT2JqZWN0LmtleXModGhpc1tuYW1lXSk7XG4gIGFzeW5jLmVhY2godGFza3MsIGZ1bmN0aW9uKHRhc2ssIGNiKSB7XG4gICAgc2VsZltuYW1lXVt0YXNrXShzZWxmLmdldFBhZ2VEYXRhKCksIGZ1bmN0aW9uKGVycikge1xuICAgICAgY2IoZXJyKTtcbiAgICB9KTtcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY2FsbGJhY2soZXJyKTtcbiAgfSk7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLl9kdXJpbmdBbmltYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIHRoaXMuZHVyaW5nQW5pbWF0ZSkge1xuICAgIHRoaXMuZHVyaW5nQW5pbWF0ZVtrZXldKHRoaXMuZ2V0UGFnZURhdGEoKSk7XG4gIH1cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUudXBkYXRlSGlzdG9yeSA9IGZ1bmN0aW9uKGtpbmQsIG1lc3NhZ2UpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdmFyIGhpc3Rvcnlfb2JqZWN0ID0ge307XG4gIGhpc3Rvcnlfb2JqZWN0LmRhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gIC8vIGlmIHdlIGFyZSBuYXZpZ2F0aW5nIGZvcndhcmRcbiAgaWYgKGtpbmQgPT09IFwibmF2aWdhdGVcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMubmV4dFBhZ2U7XG4gICAgdGhpcy5oaXN0b3J5LnB1c2goaGlzdG9yeV9vYmplY3QpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGN1cnJlbnRQYWdlIGlzIHNhZmUgdG8gZ28gYmFjayB0byBmcm9tIGFueXdoZXJlXG4gICAgdmFyIGJhY2tfc2FmZSA9IHRoaXMuY3VycmVudFBhZ2UgPyBTYW1zb24uQXBwLlBhZ2VzW3RoaXMuY3VycmVudFBhZ2VdLmJhY2tTYWZlIDogZmFsc2U7XG5cbiAgICAvLyBpZiB0aGUgY3VycmVudFBhZ2UgaXMgYmFja1NhZmUsIHRoZW4gc2V0IGl0IGFzIHRoZSBwcmV2aW91c1BhZ2UsIG90aGVyd2lzZSBzZXQgdGhlIGNvbmZpZ3VyZWQgcHJldmlvdXNQYWdlXG4gICAgdGhpcy5wcmV2aW91c1BhZ2UgPSBiYWNrX3NhZmUgPyB0aGlzLmN1cnJlbnRQYWdlIDogU2Ftc29uLkFwcC5QYWdlc1t0aGlzLm5leHRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIHRoZSBwYWdlIHdlIGFyZSBnb2luZyB0b1xuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLm5leHRQYWdlO1xuXG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImJhY2tcIikge1xuXG4gICAgaGlzdG9yeV9vYmplY3Qua2luZCA9IGtpbmQ7XG4gICAgaGlzdG9yeV9vYmplY3QucGFnZSA9IHRoaXMucHJldmlvdXNQYWdlO1xuICAgIHRoaXMuaGlzdG9yeS5wdXNoKGhpc3Rvcnlfb2JqZWN0KTtcblxuICAgIC8vIHdlIGFyZSBnb2luZyBiYWNrLCBzbyBzZXQgb3VyIGN1cnJlbnRQYWdlIGFzIG91ciBwcmV2aW91c1BhZ2VcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wcmV2aW91c1BhZ2U7XG5cbiAgICAvLyB3ZSBhcmUgZ29pbmcgYmFjaywgc28gc2V0IHRoZSBwcmV2aW91c1BhZ2UgdG8gdGhlIGN1cnJlbnQgUGFnZSdzIHByZXZpb3VzUGFnZVxuICAgIHRoaXMucHJldmlvdXNQYWdlID0gU2Ftc29uLkFwcC5QYWdlc1t0aGlzLmN1cnJlbnRQYWdlXS5wcmV2aW91c1BhZ2U7XG5cbiAgfSBlbHNlIGlmIChraW5kID09PSBcImZhaWxlZFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJSb3V0ZXIgZXZlbnQgZmFpbGVkIGJlY2F1c2U6IFwiICsgbWVzc2FnZSk7XG4gIH1cblxuICAvLyBpZiBpdCB3YXNuJ3QganVzdCBhIHBhZ2UgdXBkYXRlLCB0aGVuIHN3aXRjaCB0aGUgYWN0aXZlUGFnZUVsZW1lbnQgYW5kIGluYWN0aXZlUGFnZUVsZW1lbnQgdmFsdWVzXG4gIGlmIChraW5kICE9PSBcInVwZGF0ZVwiICYmIGtpbmQgIT09IFwiZmFpbGVkXCIpIHtcbiAgICB2YXIgbmV3X2FjdGl2ZV9wYWdlID0gdGhpcy5pbmFjdGl2ZVBhZ2VFbGVtZW50O1xuICAgIHRoaXMuaW5hY3RpdmVQYWdlRWxlbWVudCA9IHRoaXMuYWN0aXZlUGFnZUVsZW1lbnQ7XG4gICAgdGhpcy5hY3RpdmVQYWdlRWxlbWVudCA9IG5ld19hY3RpdmVfcGFnZTtcbiAgfVxuXG4gIHRoaXMubmV4dFBhZ2UgPSBmYWxzZTtcblxuICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYW5vdGhlciByb3V0ZXIgZXZlbnQgaW4gdGhlIHF1ZXVlXG4gIHZhciBxdWV1ZV9ldmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgaWYgKHF1ZXVlX2V2ZW50KSB7XG5cbiAgICBpZiAocXVldWVfZXZlbnQua2luZCA9PT0gXCJuYXZpZ2F0ZVwiKSB7XG5cbiAgICAgIC8vIGFkZGVkIGEgMjBtcyBkZWxheSBkdWUgdG8gc29tZSB3ZWlyZCBiZWhhdmlvciB3aXRoIGNzcyBhbmltYXRpb25zIG5vdCB3b3JraW5nIHdpdGhvdXQgaXRcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgIHNlbGYubmF2aWdhdGUocXVldWVfZXZlbnQubmV4dF9wYWdlLCBxdWV1ZV9ldmVudC5hbmltYXRpb24sIHF1ZXVlX2V2ZW50LmNhbGxiYWNrKTtcbiAgICAgIH0sIDIwKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2socXVldWVfZXZlbnQuY2FsbGJhY2spO1xuICAgIH1cblxuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5nZXRBbmltYXRpb25EYXRhID0gZnVuY3Rpb24oYW5pbWF0aW9uKSB7XG4gIHZhciBkYXRhID0ge307XG4gIGRhdGEuY3VycmVudCA9IFwibm9uZVwiO1xuICBkYXRhLm5leHQgPSBcIm5vbmVcIjtcblxuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiB0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICBpZiAoYW5pbWF0aW9uID09PSBrZXkpIHtcbiAgICAgIGRhdGEuY3VycmVudCA9IHRoaXMuYW5pbWF0aW9uc1trZXldLmN1cnJlbnQ7XG4gICAgICBkYXRhLm5leHQgPSB0aGlzLmFuaW1hdGlvbnNba2V5XS5uZXh0O1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLmRvQW5pbWF0aW9uID0gZnVuY3Rpb24oYW5pbWF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgU2Ftc29uLkRPTVt0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5hZGQoYW5pbWF0ZS5uZXh0LCBcImFjdGl2ZVwiKTtcbiAgU2Ftc29uLkRPTVt0aGlzLmFjdGl2ZVBhZ2VFbGVtZW50XS5jbGFzc0xpc3QuYWRkKGFuaW1hdGUuY3VycmVudCk7XG4gIFNhbXNvbi5ET01bdGhpcy5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblxuICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyB3aGlsZSB0aGUgcGFnZXMgYXJlIGFuaW1hdGluZy4gRXg6IHVwZGF0ZSBoZWFkZXIgb3IgZm9vdGVyXG4gIHRoaXMuX2R1cmluZ0FuaW1hdGUoKTtcblxuICB2YXIgYW5pbWF0aW9uRXZlbnQgPSBVdGlscy53aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cbiAgVXRpbHMub25jZShTYW1zb24uRE9NW3RoaXMuaW5hY3RpdmVQYWdlRWxlbWVudF0sIGFuaW1hdGlvbkV2ZW50LCBhbmltYXRpb25FbmRlZCk7XG5cbiAgLy8gbGlzdGVuIGZvciB0aGUgZW5kIG9mIHRoZSBhbmltYXRpb25cbiAgZnVuY3Rpb24gYW5pbWF0aW9uRW5kZWQoKSB7XG5cbiAgICAvLyByZW1vdmUgdGhlIGFuaW1hdGlvbiBjbGFzcyBmcm9tIHRoZSBwYWdlIHdlIGp1c3QgbWFkZSBhY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuaW5hY3RpdmVQYWdlRWxlbWVudF0uY2xhc3NMaXN0LnJlbW92ZShhbmltYXRlLm5leHQpO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBhbmltYXRpb24gY2xhc3MgZnJvbSB0aGUgcGFnZSB3ZSBqdXN0IG1hZGUgaW5hY3RpdmVcbiAgICBTYW1zb24uRE9NW3NlbGYuYWN0aXZlUGFnZUVsZW1lbnRdLmNsYXNzTGlzdC5yZW1vdmUoYW5pbWF0ZS5jdXJyZW50KTtcblxuICAgIHNlbGYucGFnZXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICAgIC8vIHJlbW92ZSB0aGUgb2xkIHBhZ2UgaW5jbHVkaW5nIGFsbCBvZiBpdHMgdmlld3MgYW5kIGV2ZW50cyBmcm9tIHRoZSBET01cbiAgICAvLyBhbHNvIHJlbW92ZSB0aGUgZW50aXJlIHBhZ2UgaW5zdGFuY2UgZnJvbSB0aGUgcm91dGVyJ3MgcGFnZUNhY2hlXG4gICAgaWYgKHNlbGYuY3VycmVudFBhZ2UpIHtcbiAgICAgIHNlbGYucGFnZUNhY2hlW3NlbGYuY3VycmVudFBhZ2VdLl9yZW1vdmUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxmLnBhZ2VDYWNoZVtzZWxmLmN1cnJlbnRQYWdlXTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxufTtcblxuU2Ftc29uUm91dGVyLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24obmV4dF9wYWdlLCBhbmltYXRpb24sIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMucGFnZXNBbmltYXRpbmcgPSB0cnVlO1xuXG4gIGlmIChhbmltYXRpb24gPT09IFwidXBkYXRlXCIpIHtcblxuICAgIHRoaXMucGFnZUNhY2hlW25leHRfcGFnZV0uX3JlbmRlcih0cnVlLCBudWxsLCBmdW5jdGlvbigpIHtcblxuICAgICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZUFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcblxuICAgIC8vIGRldGVybWluZSB0aGUgdHlwZSBvZiBhbmltYXRpb24gdGhhdCB3aWxsIGJlIHVzZWRcbiAgICB2YXIgYW5pbWF0aW9uX2RhdGEgPSB0aGlzLmdldEFuaW1hdGlvbkRhdGEoYW5pbWF0aW9uKTtcblxuICAgIC8vIHJlbmRlciB0aGUgbmV3IHBhZ2Ugb2ZmIHNjcmVlblxuICAgIHRoaXMucGFnZUNhY2hlW25leHRfcGFnZV0uX3JlbmRlcihmYWxzZSwgU2Ftc29uLkRPTVt0aGlzLmluYWN0aXZlUGFnZUVsZW1lbnRdLCBmdW5jdGlvbigpIHtcblxuICAgICAgc2VsZi5fZG9GaXJzdChcImJlZm9yZUFuaW1hdGVcIiwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgLy8gcnVuIHRoZSBhbmltYXRpb24gbm93IHRoYXQgdGhlIG5ldyBwYWdlIGlzIGZ1bGx5IHJlbmRlcmVkIG9mZnNjcmVlblxuICAgICAgICBzZWxmLmRvQW5pbWF0aW9uKGFuaW1hdGlvbl9kYXRhLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuXG5TYW1zb25Sb3V0ZXIucHJvdG90eXBlLm5hdmlnYXRlID0gZnVuY3Rpb24obmV4dF9wYWdlLCBhbmltYXRpb24sIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIGNoZWNrIHRvIHNlZSBpZiBhbm90aGVyIFJvdXRlciBldmVudCBpcyBhbHJlYWR5IGJlaW5nIGhhbmRsZWQsIGlmIG9uZSBpcyB0aGVuIGFkZCB0aGlzIGV2ZW50IHRvIGEgcXVldWVcbiAgaWYgKHRoaXMuaXNCdXN5KSB7XG5cbiAgICB0aGlzLnF1ZXVlLnB1c2goe1xuICAgICAga2luZDogXCJuYXZpZ2F0ZVwiLFxuICAgICAgbmV4dF9wYWdlOiBuZXh0X3BhZ2UsXG4gICAgICBhbmltYXRpb246IGFuaW1hdGlvbixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhcIlJvdXRlciBpcyBidXN5LiBUaGlzIGV2ZW50IGlzICNcIiArIHNlbGYucXVldWUubGVuZ3RoICsgXCIgaW4gbGluZVwiKTtcblxuICB9IGVsc2Uge1xuXG4gICAgdGhpcy5pc0J1c3kgPSB0cnVlO1xuXG4gICAgdmFyIGNob3Nlbl9hbmltYXRpb24gPSBhbmltYXRpb24gfHwgdGhpcy5uYXZpZ2F0ZUFuaW1hdGlvbjtcblxuICAgIC8vIGlmIGEgcGFnZSB1cGRhdGUgaXMgcmVxdWVzdGVkLCBidXQgaXQgaXNuJ3QgdGhlIGN1cnJlbnQgcGFnZSwgdGhlbiB3ZSB3aWxsIHNpbXBseSBuYXZpZ2F0ZSB0byBpdCBsaWtlIG5vcm1hbFxuICAgIGlmIChjaG9zZW5fYW5pbWF0aW9uID09PSBcInVwZGF0ZVwiICYmIG5leHRfcGFnZSAhPT0gdGhpcy5jdXJyZW50UGFnZSkge1xuICAgICAgY2hvc2VuX2FuaW1hdGlvbiA9IHRoaXMubmF2aWdhdGVBbmltYXRpb247XG4gICAgfVxuXG4gICAgdGhpcy5uZXh0UGFnZSA9IG5leHRfcGFnZTtcblxuICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGJlZm9yZSB3ZSBzdGFydCB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgdGhpcy5fZG9GaXJzdChcImJlZm9yZU5hdmlnYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHBhZ2UgZXhpc3RzIGJlZm9yZSB0cnlpbmcgdG8gbmF2aWdhdGVcbiAgICAgIGlmICghU2Ftc29uLkFwcC5QYWdlc1tuZXh0X3BhZ2VdICYmICFlcnIpIHtcbiAgICAgICAgZXJyID0gXCJUaGF0IHBhZ2UgZG9lcyBub3QgZXhpc3RcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnIpIHtcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgd2UgYXJlIHN0YXlpbmcgb24gdGhlIHNhbWUgcGFnZSwgaWYgd2UgYXJlIHRoZW4gc2ltcGx5IHVwZGF0ZSB0aGUgcGFnZVxuICAgICAgICBpZiAobmV4dF9wYWdlID09PSBzZWxmLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgICAgY2hvc2VuX2FuaW1hdGlvbiA9IFwidXBkYXRlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5wYWdlQ2FjaGVbbmV4dF9wYWdlXSA9IFNhbXNvbi5jcmVhdGVQYWdlKFNhbXNvbi5BcHAuUGFnZXNbbmV4dF9wYWdlXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbmltYXRlIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgc2VsZi5hbmltYXRlKG5leHRfcGFnZSwgY2hvc2VuX2FuaW1hdGlvbiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciB0aGUgcGFnZSB0cmFuc2l0aW9uXG4gICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyQW5pbWF0ZVwiLCBmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBjaGFuZ2VzIHRvIHRoZSBwYWdlIGhpc3RvcnlcbiAgICAgICAgICAgIGlmIChjaG9zZW5fYW5pbWF0aW9uID09PSBcInVwZGF0ZVwiKSB7XG4gICAgICAgICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcInVwZGF0ZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNlbGYudXBkYXRlSGlzdG9yeShcIm5hdmlnYXRlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBhZnRlciBuYXZpZ2F0aW5nXG4gICAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJOYXZpZ2F0ZVwiLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwiZmFpbGVkXCIsIGVycik7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cblNhbXNvblJvdXRlci5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAvLyBjaGVjayB0byBzZWUgaWYgYW5vdGhlciBSb3V0ZXIgZXZlbnQgaXMgYWxyZWFkeSBiZWluZyBoYW5kbGVkLCBpZiBvbmUgaXMgdGhlbiBhZGQgdGhpcyBldmVudCB0byBhIHF1ZXVlXG4gIGlmICh0aGlzLmlzQnVzeSkge1xuXG4gICAgdGhpcy5xdWV1ZS5wdXNoKHtcbiAgICAgIGtpbmQ6IFwiYmFja1wiLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKFwiUm91dGVyIGlzIGJ1c3kuIFRoaXMgZXZlbnQgaXMgI1wiICsgc2VsZi5xdWV1ZS5sZW5ndGggKyBcIiBpbiBsaW5lXCIpO1xuXG4gIH0gZWxzZSB7XG5cbiAgICB0aGlzLmlzQnVzeSA9IHRydWU7XG5cbiAgICAvLyBydW4gYW55IG5lY2Vzc2FyeSB0YXNrcyBiZWZvcmUgd2Ugc3RhcnQgdGhlIHBhZ2UgdHJhbnNpdGlvblxuICAgIHRoaXMuX2RvRmlyc3QoXCJiZWZvcmVCYWNrXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgaXMgYSBwYWdlIHRvIGdvIGJhY2sgdG9cbiAgICAgIGlmICghc2VsZi5wcmV2aW91c1BhZ2UgJiYgIWVycikge1xuICAgICAgICBlcnIgPSBcIk5vIHBhZ2UgdG8gZ28gYmFjayB0b1wiO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVycikge1xuXG4gICAgICAgIC8vIGxvYWQgdGhlIHByZXZpb3VzUGFnZSBpbnRvIHRoZSBwYWdlQ2FjaGVcbiAgICAgICAgc2VsZi5wYWdlQ2FjaGVbc2VsZi5wcmV2aW91c1BhZ2VdID0gU2Ftc29uLmNyZWF0ZVBhZ2UoU2Ftc29uLkFwcC5QYWdlc1tzZWxmLnByZXZpb3VzUGFnZV0pO1xuXG4gICAgICAgIC8vIGlmIHRoZSBwYWdlIHdhbnRzIGEgY3VzdG9tIGJhY2sgYW5pbWF0aW9uIHRoZW4gdXNlIGl0LCBvdGhlcndpc2UgdXNlIHRoZSBkZWZhdWx0IGJhY2sgYW5pbWF0aW9uXG4gICAgICAgIHZhciBiYWNrQW5pbWF0aW9uID0gU2Ftc29uLkFwcC5QYWdlc1tzZWxmLmN1cnJlbnRQYWdlXS5iYWNrQW5pbWF0aW9uIHx8IHNlbGYuYmFja0FuaW1hdGlvbjtcblxuICAgICAgICAvLyBhbmltYXRlIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgc2VsZi5hbmltYXRlKHNlbGYucHJldmlvdXNQYWdlLCBiYWNrQW5pbWF0aW9uLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgIC8vIHJ1biBhbnkgbmVjZXNzYXJ5IHRhc2tzIGFmdGVyIHRoZSBwYWdlIHRyYW5zaXRpb25cbiAgICAgICAgICBzZWxmLl9kb0ZpcnN0KFwiYWZ0ZXJBbmltYXRlXCIsIGZ1bmN0aW9uKGVycikge1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGNoYW5nZXMgdG8gdGhlIHBhZ2UgaGlzdG9yeVxuICAgICAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwiYmFja1wiKTtcblxuICAgICAgICAgICAgLy8gcnVuIGFueSBuZWNlc3NhcnkgdGFza3MgYWZ0ZXIgZ29pbmcgYmFja1xuICAgICAgICAgICAgc2VsZi5fZG9GaXJzdChcImFmdGVyQmFja1wiLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi51cGRhdGVIaXN0b3J5KFwiZmFpbGVkXCIsIGVycik7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Ftc29uUm91dGVyO1xuIiwiXG52YXIgU2Ftc29uID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIGFzeW5jID0gcmVxdWlyZSgnYXN5bmMtbGl0ZScpO1xudmFyIGlzRXF1YWwgPSByZXF1aXJlKCdsb2Rhc2guaXNlcXVhbCcpO1xuXG52YXIgc2hhcmVkID0ge307XG5cbi8vIHJlc2VydmVkIHByb3BlcnRpZXMgZm9yIGNvbXBvbmVudHMgYW5kIHBhZ2VzXG5zaGFyZWQucmVzZXJ2ZWQgPSBbXCJuYW1lXCIsIFwiZWxcIiwgXCJlbGVtZW50XCIsIFwidGVtcGxhdGVcIiwgXCJzdWJQYWdlT2ZcIiwgXCJwcmV2aW91c1BhZ2VcIiwgXCJiYWNrQW5pbWF0aW9uXCIsIFwic3R5bGVcIiwgXCJjb21wb25lbnRzXCIsIFwiZXZlbnRzXCIsIFwiZG9tRXZlbnRzXCIsIFwiYXBwRXZlbnRzXCIsIFwic3RhdGVcIiwgXCJzZXRTdGF0ZVwiLCBcInNldEluaXRpYWxTdGF0ZVwiLCBcImJlZm9yZVJlbmRlclwiLCBcImFmdGVyUmVuZGVyXCIsIFwiYmVmb3JlUmVtb3ZlXCIsIFwicmVuZGVyXCIsIFwicGFyZW50XCIsIFwib25cIiwgXCJlbWl0XCIsIFwib2ZmXCJdO1xuXG4vLyBjYWNoZWQgZm9yIHBlcmZvcm1hbmNlXG5zaGFyZWQuanVzdENhbGxiYWNrID0gZnVuY3Rpb24oY2IpIHsgY2IoKTsgfTtcbnNoYXJlZC5qdXN0Q2FsbGJhY2tUcnVlID0gZnVuY3Rpb24oY2IpIHsgY2IodHJ1ZSk7IH07XG5zaGFyZWQuanVzdFJldHVybk9iamVjdCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4ge307IH07XG5cbi8vIGdldCB0aGUgdG9wbW9zdCBwYXJlbnQgcGFnZSBvciBjb21wb25lbnQgb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50XG4vLyB1c2VkIGluIHRoZSBzZXRTdGF0ZSBtZXRob2Qgb24gY29tcG9uZW50cyBhbmQgcGFnZXNcbmZ1bmN0aW9uIGdldFRvcFBhcmVudChjb21wb25lbnQpIHtcbiAgaWYgKGNvbXBvbmVudC5wYXJlbnQpIHtcbiAgICByZXR1cm4gZ2V0VG9wUGFyZW50KGNvbXBvbmVudC5wYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb21wb25lbnQ7XG4gIH1cbn1cblxuLy8gdGhlIG1ldGhvZHMgdGhhdCBQYWdlcyBhbmQgQ29tcG9uZW50cyBzaGFyZVxuc2hhcmVkLnNldFN0YXRlID0gZnVuY3Rpb24obmV3X3N0YXRlKSB7IC8vIG5ld19zdGF0ZSBtdXN0IGJlIGFuIG9iamVjdFxuICBpZiAodHlwZW9mIG5ld19zdGF0ZSA9PT0gXCJvYmplY3RcIikge1xuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG5cbiAgICB2YXIgcHJvcDtcbiAgICBmb3IgKHByb3AgaW4gbmV3X3N0YXRlKSB7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgaGFzIGNoYW5nZWRcbiAgICAgIGlmICh0aGlzLnN0YXRlW3Byb3BdID09PSB1bmRlZmluZWQpIHsgLy8gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHN0YXRlIG9iamVjdCB0aGVuIGl0IHdpbGwgdXBkYXRlZFxuICAgICAgICB0aGlzLnN0YXRlW3Byb3BdID0gbmV3X3N0YXRlW3Byb3BdO1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzRXF1YWwodGhpcy5zdGF0ZVtwcm9wXSwgbmV3X3N0YXRlW3Byb3BdKSkgeyAvLyBpZiB0aGUgZXhpc3RpbmcgcHJvcGVydHkgb24gdGhlIHN0YXRlIG9iamVjdCBpcyBub3QgZXF1YWwgdG8gdGhlIHZhbHVlIG9uIHRoZSBuZXdfc3RhdGUgb2JqZWN0IHRoZW4gaXQgd2lsbCBiZSB1cGRhdGVkXG4gICAgICAgIHRoaXMuc3RhdGVbcHJvcF0gPSBuZXdfc3RhdGVbcHJvcF07XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZCA9IHRydWU7XG5cbiAgICAgIGlmICghdGhpcy5wYXJlbnQgfHwgIXRoaXMucGFyZW50Ll90eXBlKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcihmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGFyZW50ID0gZ2V0VG9wUGFyZW50KHRoaXMpO1xuICAgICAgICBwYXJlbnQuX3JlbmRlcihmYWxzZSk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYWtlIHN1cmUgdG8gcGFzcyBhbiBvYmplY3QgaW50byBzZXRTdGF0ZVwiKTtcbiAgfVxufTtcblxuLy8gcnVuIHRoZSBuYW1lZCBmdW5jdGlvbiBiZWZvcmUgY2FsbGluZyBiYWNrXG5zaGFyZWQuX2RvRmlyc3QgPSBmdW5jdGlvbihuYW1lLCBjYWxsYmFjaykge1xuICB0aGlzW25hbWVdKGZ1bmN0aW9uKCkge1xuICAgIGNhbGxiYWNrKCk7XG4gIH0pO1xufTtcblxuLy8gYWRkIGFueSB0YXNrcyB0aGF0IHRoaXMgcGFnZSBvciBjb21wb25lbnQgd2FudHMgcnVuIGF0IGRpZmZlcmVudCBldmVudHMgZHVyaW5nIHJvdXRlciBuYXZpZ2F0aW9uXG5zaGFyZWQuYWRkUm91dGVyVGFza3MgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHRhc2s7XG4gIGZvciAodGFzayBpbiBvYmouX3JvdXRlcikge1xuICAgIFNhbXNvbi5BcHAuUm91dGVyW3Rhc2tdW29iai5fdXVpZF0gPSBvYmouX3JvdXRlclt0YXNrXS5iaW5kKG9iaik7XG4gIH1cbn1cblxuc2hhcmVkLl9sb2FkRXZlbnRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLl9sb2FkZWRFdmVudHMubGVuZ3RoKSB7XG5cbiAgICB2YXIgZGVsZWdhdGUgPSBnZXRUb3BQYXJlbnQodGhpcykuZGVsZWdhdGU7XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuZG9tRXZlbnRzKTtcblxuICAgIHZhciBzZWxlY3Rvcl9lbGVtZW50ID0gKHRoaXMuX3R5cGUgPT09IFwiUGFnZVwiKSA/IG51bGwgOiBcIiNcIiArICB0aGlzLmVsO1xuXG4gICAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICAgIHZhciBldmVudCA9IHt9O1xuICAgICAgdmFyIHNwbGl0X2V2ZW50ID0ga2V5LnNwbGl0KFwiIFwiKTsgLy8gc3BsaXQgYnkgYSBzaW5nbGUgc3BhY2VcbiAgICAgIGV2ZW50LnR5cGUgPSBzcGxpdF9ldmVudC5zaGlmdCgpO1xuICAgICAgZXZlbnQuc2VsZWN0b3IgPSBzcGxpdF9ldmVudC5sZW5ndGggPiAxID8gc3BsaXRfZXZlbnQuam9pbihcIiBcIikgOiBzcGxpdF9ldmVudFswXTtcbiAgICAgIGV2ZW50LnNlbGVjdG9yID0gZXZlbnQuc2VsZWN0b3IgfHwgc2VsZWN0b3JfZWxlbWVudDtcblxuICAgICAgZXZlbnQuaGFuZGxlciA9IGZ1bmN0aW9uIGZpeGVkRXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgc2VsZi5kb21FdmVudHNba2V5XS5jYWxsKHNlbGYsIGUsIHRoaXMpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGV2ZW50LnNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlLm9uKGV2ZW50LnR5cGUsIGV2ZW50LnNlbGVjdG9yLCBldmVudC5oYW5kbGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGVnYXRlLm9uKGV2ZW50LnR5cGUsIGV2ZW50LmhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9sb2FkZWRFdmVudHMucHVzaChldmVudCk7XG5cbiAgICAgIGNiKCk7XG5cbiAgICB9LCBmdW5jdGlvbigpIHtcblxuICAgICAgLy8gbG9hZCBhbnkgYXBwIGV2ZW50c1xuICAgICAgdmFyIGFwcEV2ZW50O1xuICAgICAgZm9yIChhcHBFdmVudCBpbiBzZWxmLmFwcEV2ZW50cykge1xuICAgICAgICBTYW1zb24uQXBwLm9uKGFwcEV2ZW50LCBzZWxmLmFwcEV2ZW50c1thcHBFdmVudF0sIHNlbGYpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gIH1cblxufTtcblxuc2hhcmVkLl9kZXN0cm95RXZlbnRzID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAvLyBkZXN0cm95IERPTSBldmVudCBsaXN0ZW5lcnNcbiAgdmFyIGRlbGVnYXRlID0gZ2V0VG9wUGFyZW50KHRoaXMpLmRlbGVnYXRlO1xuICB2YXIgaTsgdmFyIGRvbUV2ZW50O1xuICBmb3IgKGk9MDsgaTx0aGlzLl9sb2FkZWRFdmVudHMubGVuZ3RoO2krKykge1xuICAgIGRvbUV2ZW50ID0gdGhpcy5fbG9hZGVkRXZlbnRzW2ldO1xuICAgIGlmIChkb21FdmVudC5zZWxlY3Rvcikge1xuICAgICAgZGVsZWdhdGUub2ZmKGRvbUV2ZW50LnR5cGUsIGRvbUV2ZW50LnNlbGVjdG9yLCBkb21FdmVudC5oYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZWdhdGUub2ZmKGRvbUV2ZW50LnR5cGUsIGRvbUV2ZW50LmhhbmRsZXIpO1xuICAgIH1cbiAgfVxuICB0aGlzLl9sb2FkZWRFdmVudHMgPSBbXTtcblxuICAvLyBub3cgZGVzdHJveSBhcHAgZXZlbnQgbGlzdGVuZXJzXG4gIHZhciBhcHBFdmVudDtcbiAgZm9yIChhcHBFdmVudCBpbiB0aGlzLmFwcEV2ZW50cykge1xuICAgIFNhbXNvbi5BcHAub2ZmKGFwcEV2ZW50LCB0aGlzLmFwcEV2ZW50c1thcHBFdmVudF0pO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuXG59O1xuXG4vLyBhdHRhY2ggdGhlIGNvbXBvbmVudHMgcGFzc2VkIGJhY2sgZnJvbSB0aGUgc2V0Q29tcG9uZW50cyBmdW5jdGlvblxuc2hhcmVkLl9sb2FkQ29tcG9uZW50cyA9IGZ1bmN0aW9uKGZvcmNlX3VwZGF0ZSwgY2FsbGJhY2spIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gSWYgdGhlIGNvbXBvbmVudHMgYXJlbid0IGxvYWRlZCwgb3IgZm9yY2VfdXBkYXRlIGlzIHRydWUsIHRoZW4gbG9hZCB0aGUgY29tcG9uZW50c1xuICBpZiAoIXRoaXMuX2NvbXBvbmVudHNMb2FkZWQgfHwgZm9yY2VfdXBkYXRlKSB7XG5cbiAgICB2YXIgbmV3X2NvbXBvbmVudHMgPSB0aGlzLnNldENvbXBvbmVudHMoKTtcblxuICAgIC8vIEZpcnN0IHdlIGdvIHRocm91Z2ggZWFjaCBjdXJyZW50bHkgYXR0YWNoZWQgY29tcG9uZW50LCBhbmQgY2hlY2sgdG8gc2VlIGlmIGl0IHNob3VsZCBzdGlsbCBleGlzdFxuICAgIHZhciBvbGRfY29tcG9uZW50cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cyk7XG4gICAgYXN5bmMuZWFjaChvbGRfY29tcG9uZW50cywgZnVuY3Rpb24ob2xkX2NvbXBvbmVudCwgY2IpIHtcblxuICAgICAgdmFyIHNob3VsZF9iZV9sb2FkZWQgPSBmYWxzZTtcbiAgICAgIHZhciBuZXdfY29tcG9uZW50O1xuICAgICAgZm9yIChuZXdfY29tcG9uZW50IGluIG5ld19jb21wb25lbnRzKSB7XG4gICAgICAgIGlmIChvbGRfY29tcG9uZW50ID09PSBuZXdfY29tcG9uZW50KSBzaG91bGRfYmVfbG9hZGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgbG9hZGVkIGJ1dCBpc24ndCwgdGhlbiB3ZSBsb2FkIGl0LiBPdGhlcndpc2Ugd2UganVzdCBza2lwIGl0XG4gICAgICBpZiAoc2hvdWxkX2JlX2xvYWRlZCkge1xuICAgICAgICAvLyBpZiB0aGUgY29tcG9uZW50IGhhc24ndCBiZWVuIGxvYWRlZCB5ZXQsIHRoZW4gbG9hZCBpdFxuICAgICAgICBpZiAoIXNlbGZbb2xkX2NvbXBvbmVudF0pIHtcbiAgICAgICAgICBzZWxmW29sZF9jb21wb25lbnRdID0gU2Ftc29uLmNyZWF0ZUNvbXBvbmVudChzZWxmLmNvbXBvbmVudHNbb2xkX2NvbXBvbmVudF0pO1xuICAgICAgICAgIHNlbGZbb2xkX2NvbXBvbmVudF0ucGFyZW50ID0gc2VsZjtcbiAgICAgICAgfVxuICAgICAgICBjYigpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZW1vdmUgdGhlIGNvbXBvbmVudCBzaW5jZSBpdCBzaG91bGRuJ3QgYmUgbG9hZGVkXG4gICAgICAgIGlmIChzZWxmW29sZF9jb21wb25lbnRdKSB7XG4gICAgICAgICAgc2VsZltvbGRfY29tcG9uZW50XS5fcmVtb3ZlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVsZXRlIHNlbGZbb2xkX2NvbXBvbmVudF07XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0sIGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBOb3cgdGhhdCB3ZSBoYW5kbGVkIGFsbCBvZiB0aGUgZXhpc3RpbmcgY29tcG9uZW50cywgd2UgbG9hZCBhbnkgbmV3IGNvbXBvbmVudHMgdGhhdCBkb24ndCBleGlzdCB5ZXRcbiAgICAgIHNlbGYuY29tcG9uZW50cyA9IG5ld19jb21wb25lbnRzO1xuXG4gICAgICB2YXIgY29tcG9uZW50O1xuICAgICAgZm9yIChjb21wb25lbnQgaW4gc2VsZi5jb21wb25lbnRzKSB7XG4gICAgICAgIGlmICghc2VsZltjb21wb25lbnRdKSB7XG4gICAgICAgICAgc2VsZltjb21wb25lbnRdID0gU2Ftc29uLmNyZWF0ZUNvbXBvbmVudChzZWxmLmNvbXBvbmVudHNbY29tcG9uZW50XSk7XG4gICAgICAgICAgc2VsZltjb21wb25lbnRdLnBhcmVudCA9IHNlbGY7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi5fY29tcG9uZW50c0xvYWRlZCA9IHRydWU7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgfSk7XG5cbiAgfSBlbHNlIHtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gIH1cblxufTtcblxuLy8gcmVuZGVyIHRoZSBjb21wb25lbnRzIGF0dGFjaGVkIHRvIHRoZSBwYWdlXG5zaGFyZWQuX3JlbmRlckNvbXBvbmVudHMgPSBmdW5jdGlvbihmb3JjZV91cGRhdGUsIGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRzKTtcblxuICBhc3luYy5lYWNoKGtleXMsIGZ1bmN0aW9uKGtleSwgY2IpIHtcblxuICAgIHNlbGZba2V5XS5fcmVuZGVyKGZvcmNlX3VwZGF0ZSwgZnVuY3Rpb24oKSB7XG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gIH0sIGZ1bmN0aW9uKCl7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG5cbn07XG5cbnNoYXJlZC5fZGVzdHJveUNvbXBvbmVudHMgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50cyk7XG5cbiAgYXN5bmMuZWFjaChrZXlzLCBmdW5jdGlvbihrZXksIGNiKSB7XG5cbiAgICBzZWxmW2tleV0uX3JlbW92ZShmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSBzZWxmW2tleV07XG4gICAgICBjYigpO1xuICAgIH0pO1xuXG4gIH0sIGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuX2NvbXBvbmVudHNMb2FkZWQgPSBmYWxzZTtcbiAgICBjYWxsYmFjaygpO1xuICB9KTtcblxufTtcblxuLy8gcmVtb3ZlcyBhbGwgZXZlbnQgbGlzdGVuZXJzLCBET00gbm9kZXMsIGFuZCBjaGlsZCBjb21wb25lbnRzXG5zaGFyZWQuX3JlbW92ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIHJlbW92ZSB0aGUgc3R5bGVzaGVldFxuICBpZiAodGhpcy5zdHlsZSkgdGhpcy5zdHlsZS5kZXRhY2goKTtcblxuICB0aGlzLl9kb0ZpcnN0KFwiYmVmb3JlUmVtb3ZlXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgc2VsZi5fZGVzdHJveUNvbXBvbmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgIHNlbGYuX2Rlc3Ryb3lFdmVudHMoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLy8gZGVzdHJveSB0aGUgRE9NIGVsZW1lbnRcbiAgICAgICAgaWYgKHNlbGYuZWxlbWVudCAmJiBzZWxmLmVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHNlbGYuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNlbGYuZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIERPTSBub2RlIGlzIHJlbW92ZWQgZnJvbSBtZW1vcnkgcXVpY2tseVxuICAgICAgICBkZWxldGUgc2VsZi5lbGVtZW50O1xuXG4gICAgICAgIC8vIHJlbW92ZSBhbnkgcm91dGVyIHJlbGF0ZWQgdGFza3NcbiAgICAgICAgdmFyIHRhc2s7XG4gICAgICAgIGZvciAodGFzayBpbiBzZWxmLl9yb3V0ZXIpIHtcbiAgICAgICAgICBkZWxldGUgU2Ftc29uLkFwcC5Sb3V0ZXJbdGFza11bc2VsZi5fdXVpZF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlIGV2ZW50IGRlbGVnYXRvciBpZiBpdCBleGlzdHNcbiAgICAgICAgZGVsZXRlIHNlbGYuZGVsZWdhdGU7XG5cbiAgICAgICAgLy8gcmVzZXQgdGhlIHBhZ2UncyBzdGF0ZVxuICAgICAgICBzZWxmLnN0YXRlID0ge307XG4gICAgICAgIHNlbGYuX2luaXRpYWxTdGF0ZVNldCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaGFyZWQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCIqLCAqOmJlZm9yZSwgKjphZnRlclwiOiB7XG4gICAgXCItd2Via2l0LWJveC1zaXppbmdcIjogXCJib3JkZXItYm94XCIsXG4gICAgXCJib3gtc2l6aW5nXCI6IFwiYm9yZGVyLWJveFwiXG4gIH0sXG4gIFwiaHRtbCwgYm9keSwgI3NhbXNvbl9hcHBcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLFxuICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgXCJoZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI0ZGRlwiXG4gIH0sXG4gIFwiI3NhbXNvbl9wYWdlc1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogXCIwXCIsXG4gICAgXCJsZWZ0XCI6IFwiMFwiLFxuICAgIFwicmlnaHRcIjogXCIwXCIsXG4gICAgXCJib3R0b21cIjogXCIwXCIsXG4gICAgXCJ6LWluZGV4XCI6IDEsXG4gICAgXCJvdmVyZmxvd1wiOiBcImhpZGRlblwiXG4gIH0sXG4gIFwiLnNhbXNvbi1wYWdlXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiBcIjBcIixcbiAgICBcImxlZnRcIjogXCIwXCIsXG4gICAgXCJyaWdodFwiOiBcIjBcIixcbiAgICBcImJvdHRvbVwiOiBcIjBcIixcbiAgICBcIm9wYWNpdHlcIjogMSxcbiAgICBcIlRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiXG4gIH0sXG4gIFwiLnNhbXNvbi1wYWdlLmFjdGl2ZVwiOiB7XG4gICAgXCJ6LWluZGV4XCI6IDJcbiAgfVxufTtcbiIsIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE0IEl2YW4gR2FicmllbGVcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZlxudGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpblxudGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xudXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXNcbm9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkb1xuc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiKlwiOiB7XG4gICAgXCItd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3JcIjogXCJyZ2JhKDAsMCwwLDApXCJcbiAgfSxcbiAgXCI6Zm9jdXNcIjoge1xuICAgIFwib3V0bGluZVwiOiBcIm5vbmVcIlxuICB9LFxuICBcImh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLCBhLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGJ1dHRvbiwgY2l0ZSwgY29kZSwgZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLCBzbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLCBiLCB1LCBpLCBjZW50ZXIsIGRsLCBkdCwgZGQsIG9sLCB1bCwgbGksIGZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgdGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsIGFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBmaWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LCB0aW1lLCBtYXJrLCBhdWRpbywgdmlkZW9cIjoge1xuICAgIFwibWFyZ2luXCI6IFwiMFwiLFxuICAgIFwicGFkZGluZ1wiOiBcIjBcIixcbiAgICBcImJvcmRlclwiOiBcIjBcIixcbiAgICBcImZvbnQtc2l6ZVwiOiBcIjEwMCVcIixcbiAgICBcImZvbnRcIjogXCJpbmhlcml0XCIsXG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcImJhc2VsaW5lXCJcbiAgfSxcbiAgXCJhcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb25cIjoge1xuICAgIFwiZGlzcGxheVwiOiBcImJsb2NrXCJcbiAgfSxcbiAgXCJhXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiaW5oZXJpdFwiLFxuICAgIFwib3V0bGluZVwiOiBcIm5vbmVcIixcbiAgICBcInRleHQtZGVjb3JhdGlvblwiOiBcIm5vbmVcIlxuICB9LFxuICBcImJsb2NrcXVvdGUsIHFcIjoge1xuICAgIFwicXVvdGVzXCI6IFwibm9uZVwiXG4gIH0sXG4gIFwiYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsIHE6YmVmb3JlLCBxOmFmdGVyXCI6IHtcbiAgICBcImNvbnRlbnRcIjogXCJub25lXCJcbiAgfSxcbiAgXCJib2R5XCI6IHtcbiAgICBcImZvbnQtc21vb3RoaW5nXCI6IFwiYW50aWFsaWFzZWRcIixcbiAgICBcInRleHQtc2l6ZS1hZGp1c3RcIjogXCJub25lXCIsXG4gICAgXCJ0b3VjaC1jYWxsb3V0XCI6IFwibm9uZVwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWigwKVwiLFxuICAgIFwidXNlci1zZWxlY3RcIjogXCJub25lXCIsXG4gICAgXCJsaW5lLWhlaWdodFwiOiBcIjFcIlxuICB9LFxuICBcImNhcHRpb24sIHRoXCI6IHtcbiAgICBcInRleHQtYWxpZ25cIjogXCJsZWZ0XCJcbiAgfSxcbiAgXCJmaWVsZHNldCwgaW1nXCI6IHtcbiAgICBcImJvcmRlclwiOiBcIjBcIlxuICB9LFxuICBcImh0bWxcIjoge1xuICAgIFwiY29sb3JcIjogXCIjMDAwXCIsXG4gICAgXCJiYWNrZ3JvdW5kXCI6IFwiI2ZmZlwiXG4gIH0sXG4gIFwibGVnZW5kXCI6IHtcbiAgICBcImNvbG9yXCI6IFwiIzAwMFwiXG4gIH0sXG4gIFwib2wsIHVsXCI6IHtcbiAgICBcImxpc3Qtc3R5bGVcIjogXCJub25lXCJcbiAgfSxcbiAgXCJzdWJcIjoge1xuICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0ZXh0LWJvdHRvbVwiXG4gIH0sXG4gIFwic3VwXCI6IHtcbiAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwidGV4dC10b3BcIlxuICB9LFxuICBcInRhYmxlXCI6IHtcbiAgICBcImJvcmRlci1jb2xsYXBzZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgXCJib3JkZXItc3BhY2luZ1wiOiBcIjBcIlxuICB9LFxuICBcInRleHRhcmVhXCI6IHtcbiAgICBcInJlc2l6ZVwiOiBcIm5vbmVcIlxuICB9XG59O1xuIiwiLy8gVXRpbGl0eSBmdW5jdGlvbnNcblxudmFyIHV0aWxzID0ge307XG5cbi8vIGFkZCBhbnkgdW5yZXNlcnZlZCBwcm9wZXJ0aWVzIHRvIHRoZSBwYXNzZWQgaW4gb2JqZWN0XG4vLyBhbnkgcHJvcGVydGllcyBzdGFydGluZyB3aXRoIF8gYXJlIHJlc2VydmVkXG5mdW5jdGlvbiBzdGFydHNXaXRoXyh3b3JkKSB7XG4gIHJldHVybiAod29yZC5jaGFyQXQoMCkgPT0gXCJfXCIpID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG51dGlscy5leHRlbmQgPSBmdW5jdGlvbihvYmosIGN1c3RvbV9wcm9wcywgcmVzZXJ2ZWQpIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gY3VzdG9tX3Byb3BzKSB7XG4gICAgaWYgKCFzdGFydHNXaXRoXyhrZXkpICYmIHJlc2VydmVkLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgIG9ialtrZXldID0gY3VzdG9tX3Byb3BzW2tleV07XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiB3aGljaEV2ZW50TmFtZShldmVudF90eXBlKSB7XG4gIHZhciBrZXk7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2UnKTtcblxuICB2YXIgZXZlbnRfbmFtZXMgPSB7XG4gICAgdHJhbnNpdGlvbnMgOiB7XG4gICAgICAndHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJzonb1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ01velRyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcbiAgICAgICdXZWJraXRUcmFuc2l0aW9uJzond2Via2l0VHJhbnNpdGlvbkVuZCdcbiAgICB9LFxuICAgIGFuaW1hdGlvbnMgOiB7XG4gICAgICAnYW5pbWF0aW9uJzonYW5pbWF0aW9uZW5kJyxcbiAgICAgICdPQW5pbWF0aW9uJzonb0FuaW1hdGlvbkVuZCcsXG4gICAgICAnTW96QW5pbWF0aW9uJzonYW5pbWF0aW9uZW5kJyxcbiAgICAgICdXZWJraXRBbmltYXRpb24nOid3ZWJraXRBbmltYXRpb25FbmQnXG4gICAgfVxuICB9O1xuXG4gIGZvciAoa2V5IGluIGV2ZW50X25hbWVzW2V2ZW50X3R5cGVdKSB7XG4gICAgaWYoZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiBldmVudF9uYW1lc1tldmVudF90eXBlXVtrZXldO1xuICAgIH1cbiAgfVxufVxuXG51dGlscy53aGljaFRyYW5zaXRpb25FdmVudCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gd2hpY2hFdmVudE5hbWUoXCJ0cmFuc2l0aW9uc1wiKTtcbn07XG5cbnV0aWxzLndoaWNoQW5pbWF0aW9uRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHdoaWNoRXZlbnROYW1lKFwiYW5pbWF0aW9uc1wiKTtcbn07XG5cbi8vIGxpc3RlbiB0byBhbiBldmVudCBvbmNlIHdpdGhvdXQganF1ZXJ5XG51dGlscy5vbmNlID0gZnVuY3Rpb24oZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spIHtcblxuICAvLyBjcmVhdGUgZXZlbnRcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmN0aW9uKGUpIHtcbiAgICAvLyByZW1vdmUgZXZlbnRcbiAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGUudHlwZSwgYXJndW1lbnRzLmNhbGxlZSk7XG4gICAgLy8gY2FsbCBoYW5kbGVyXG4gICAgcmV0dXJuIGNhbGxiYWNrKGUpO1xuICB9KTtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscztcbiIsIi8vIFRpbnkgQXN5bmMgbGlicmFyeSBmb3IgdXNlIGluIG1vZGVybiBlbnZpcm9ubWVudHNcblxuKGZ1bmN0aW9uKCkge1xuXG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIHJvb3QgaXMgZ2xvYmFsIG9uIHRoZSBzZXJ2ZXIsIGFuZCB3aW5kb3cgaW4gdGhlIGJyb3dzZXJcbiAgdmFyIHJvb3Q7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHRoaXMgPT09IHdpbmRvdykge1xuICAgIHJvb3QgPSB3aW5kb3c7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiB0aGlzID09PSBnbG9iYWwpIHtcbiAgICByb290ID0gZ2xvYmFsO1xuICB9IGVsc2Uge1xuICAgIHJvb3QgPSB0aGlzO1xuICB9XG5cbiAgLy8gY2FjaGVkIGZvciBwZXJmb3JtYW5jZVxuICBmdW5jdGlvbiBub29wKCkge31cbiAgdmFyIE9iamVjdEtleXMgPSBPYmplY3Qua2V5cztcblxuICAvLyBpc0FycmF5IGFuZCBpc09iamVjdCBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcbiAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkoYXJyKSAmJiBhcnIubGVuZ3RoID4gMCk7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIE9iamVjdEtleXMob2JqKS5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvRWFjaChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZXJhdG9yKGFycltpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nhb2xhbi9hc3luY1xuICBmdW5jdGlvbiBkb09uY2UoZm4pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGNhbGxlZCkgdGhyb3cgbmV3IEVycm9yKFwiQ2FsbGJhY2sgYWxyZWFkeSBjYWxsZWQuXCIpO1xuICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KHJvb3QsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jYW9sYW4vYXN5bmNcbiAgZnVuY3Rpb24gX2RvT25jZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoY2FsbGVkKSByZXR1cm47XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGFzeW5jID0ge1xuXG4gICAgLy8gcnVucyB0aGUgdGFzayBvbiBldmVyeSBpdGVtIGluIHRoZSBhcnJheSBhdCBvbmNlXG4gICAgZWFjaCA6IGZ1bmN0aW9uKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IF9kb09uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICB2YXIgYW1vdW50ID0gYXJyLmxlbmd0aDtcblxuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIGRvRWFjaChhcnIsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaXRlcmF0b3IoaXRlbSwgZG9PbmNlKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG5vb3A7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCA+PSBhbW91bnQpIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIHJ1bnMgdGhyb3VnaCB0aGUgYXJyYXkgb25lIGl0ZW0gYXQgYSB0aW1lXG4gICAgZWFjaFNlcmllcyA6IGZ1bmN0aW9uKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IF9kb09uY2UoY2FsbGJhY2sgfHwgbm9vcCk7XG4gICAgICB2YXIgYW1vdW50ID0gYXJyLmxlbmd0aDtcblxuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHJldHVybiBjYWxsYmFjaygpO1xuXG4gICAgICB2YXIgY29tcGxldGVkID0gMDtcbiAgICAgIHZhciBpdGVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycltjb21wbGV0ZWRdLCBkb09uY2UoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbm9vcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21wbGV0ZWQrKztcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgPCBhbW91bnQpIHtcbiAgICAgICAgICAgICAgaXRlcmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICAgIGl0ZXJhdGUoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FuIGFjY2VwdCBhbiBvYmplY3Qgb3IgYXJyYXlcbiAgICAvLyB3aWxsIHJldHVybiBhbiBvYmplY3Qgb3IgYXJyYXkgb2YgcmVzdWx0cyBpbiB0aGUgY29ycmVjdCBvcmRlclxuICAgIHBhcmFsbGVsIDogZnVuY3Rpb24odGFza3MsIGNhbGxiYWNrKSB7XG5cbiAgICAgIHZhciBrZXlzOyB2YXIgbGVuZ3RoOyB2YXIgaTsgdmFyIHJlc3VsdHM7IHZhciBraW5kO1xuICAgICAgdmFyIHVwZGF0ZWRfdGFza3MgPSBbXTtcbiAgICAgIHZhciBpc19vYmplY3Q7XG4gICAgICB2YXIgY291bnRlciA9IDA7XG5cbiAgICAgIGlmIChpc0FycmF5KHRhc2tzKSkge1xuXG4gICAgICAgIGxlbmd0aCA9IHRhc2tzLmxlbmd0aDtcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRhc2tzKSkge1xuXG4gICAgICAgIGlzX29iamVjdCA9IHRydWU7XG4gICAgICAgIGtleXMgPSBPYmplY3RLZXlzKHRhc2tzKTtcbiAgICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIHJlc3VsdHMgPSB7fTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaT0wOyBpPGxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgaWYgKGlzX29iamVjdCkge1xuICAgICAgICAgIHVwZGF0ZWRfdGFza3MucHVzaCh7IGs6IGtleXNbaV0sIHQ6IHRhc2tzW2tleXNbaV1dIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVwZGF0ZWRfdGFza3MucHVzaCh7IGs6IGksIHQ6IHRhc2tzW2ldIH0pO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdXBkYXRlZF90YXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRhc2tfb2JqZWN0KSB7XG5cbiAgICAgICAgdGFza19vYmplY3QudChmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuXG4gICAgICAgICAgcmVzdWx0c1t0YXNrX29iamVjdC5rXSA9IHJlc3VsdDtcblxuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICBpZiAoY291bnRlciA9PSBsZW5ndGgpIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLy8gb25seSBhY2NlcHRzIGFuIGFycmF5IHNpbmNlIHRoZSBwcmVzZXJ2YXRpb24gb2YgdGhlIG9yZGVyIG9mIHByb3BlcnRpZXMgb24gYW4gb2JqZWN0IGNhbid0IGJlIGd1YXJhbnRlZWRcbiAgICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIHJlc3VsdHMgaW4gb3JkZXJcbiAgICBzZXJpZXMgOiBmdW5jdGlvbih0YXNrcywgY2FsbGJhY2spIHtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhc2tzKSkgcmV0dXJuIGNhbGxiYWNrKCk7XG5cbiAgICAgIHZhciBsZW5ndGggPSB0YXNrcy5sZW5ndGg7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICBmdW5jdGlvbiBydW5UYXNrKGluZGV4KSB7XG4gICAgICAgIHRhc2tzW2luZGV4XShmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gcmVzdWx0O1xuICAgICAgICAgIGlmIChpbmRleCA8IGxlbmd0aCAtIDEpIHJldHVybiBydW5UYXNrKGluZGV4ICsgMSk7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcnVuVGFzaygwKTtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gYXN5bmM7XG4gIH1cbiAgLy8gQU1EIC8gUmVxdWlyZUpTXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhc3luYztcbiAgICB9KTtcbiAgfVxuICAvLyBpbmNsdWRlZCBkaXJlY3RseSB2aWEgPHNjcmlwdD4gdGFnXG4gIGVsc2Uge1xuICAgIHJvb3QuYXN5bmMgPSBhc3luYztcbiAgfVxuXG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuLyoqXG4gKiBIYW5kbGUgYGV4dGVuZGAgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtSdWxlfSBydWxlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgdmFyIHN0eWxlID0gcnVsZS5zdHlsZVxuXG4gICAgaWYgKCFzdHlsZSB8fCAhc3R5bGUuZXh0ZW5kKSByZXR1cm5cblxuICAgIHZhciBuZXdTdHlsZSA9IHt9XG5cbiAgICA7KGZ1bmN0aW9uIGV4dGVuZChzdHlsZSkge1xuICAgICAgICBpZiAodG9TdHJpbmcuY2FsbChzdHlsZS5leHRlbmQpID09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGUuZXh0ZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHN0eWxlLmV4dGVuZFtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGUuZXh0ZW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT0gJ2V4dGVuZCcpIGV4dGVuZChzdHlsZS5leHRlbmQuZXh0ZW5kKVxuICAgICAgICAgICAgICAgIGVsc2UgbmV3U3R5bGVbcHJvcF0gPSBzdHlsZS5leHRlbmRbcHJvcF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvcHkgYmFzZSBzdHlsZS5cbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZSkge1xuICAgICAgICAgICAgaWYgKHByb3AgIT0gJ2V4dGVuZCcpIG5ld1N0eWxlW3Byb3BdID0gc3R5bGVbcHJvcF1cbiAgICAgICAgfVxuICAgIH0oc3R5bGUpKVxuXG4gICAgcnVsZS5zdHlsZSA9IG5ld1N0eWxlXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIHZlbmRvciA9IHJlcXVpcmUoJ2Nzcy12ZW5kb3InKVxuXG52YXIgS0VZRlJBTUVTID0gJ0BrZXlmcmFtZXMnXG52YXIgS0VZRlJBTUVTX0xFTkdIVCA9IEtFWUZSQU1FUy5sZW5ndGhcblxuLyoqXG4gKiBBZGQgdmVuZG9yIHByZWZpeCB0byBhIHByb3BlcnR5IG5hbWUgd2hlbiBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtSdWxlfSBydWxlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChydWxlKSB7XG4gICAgdmFyIHN0eWxlID0gcnVsZS5zdHlsZVxuXG4gICAgaWYgKHJ1bGUuaXNBdFJ1bGUgJiYgcnVsZS5zZWxlY3Rvci5zdWJzdHIoMCwgS0VZRlJBTUVTX0xFTkdIVCkgPT0gS0VZRlJBTUVTKSB7XG4gICAgICAgIHJ1bGUuc2VsZWN0b3IgPSAnQCcgKyB2ZW5kb3IucHJlZml4LmNzcyArICdrZXlmcmFtZXMnICsgcnVsZS5zZWxlY3Rvci5zdWJzdHIoS0VZRlJBTUVTX0xFTkdIVClcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZVtwcm9wXVxuXG4gICAgICAgIHZhciBjaGFuZ2VQcm9wID0gZmFsc2VcbiAgICAgICAgdmFyIHN1cHBvcnRlZFByb3AgPSB2ZW5kb3Iuc3VwcG9ydGVkUHJvcGVydHkocHJvcClcbiAgICAgICAgaWYgKHN1cHBvcnRlZFByb3AgJiYgc3VwcG9ydGVkUHJvcCAhPT0gcHJvcCkgY2hhbmdlUHJvcCA9IHRydWVcblxuICAgICAgICB2YXIgY2hhbmdlVmFsdWUgPSBmYWxzZVxuICAgICAgICB2YXIgc3VwcG9ydGVkVmFsdWUgPSB2ZW5kb3Iuc3VwcG9ydGVkVmFsdWUoc3VwcG9ydGVkUHJvcCwgdmFsdWUpXG4gICAgICAgIGlmIChzdXBwb3J0ZWRWYWx1ZSAmJiBzdXBwb3J0ZWRWYWx1ZSAhPT0gdmFsdWUpIGNoYW5nZVZhbHVlID0gdHJ1ZVxuXG4gICAgICAgIGlmIChjaGFuZ2VQcm9wIHx8IGNoYW5nZVZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlUHJvcCkgZGVsZXRlIHN0eWxlW3Byb3BdXG4gICAgICAgICAgICBzdHlsZVtzdXBwb3J0ZWRQcm9wXSA9IHN1cHBvcnRlZFZhbHVlXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBWZW5kb3IgcHJlZml4IHN0cmluZyBmb3IgdGhlIGN1cnJlbnQgYnJvd3Nlci5cbiAqXG4gKiBAdHlwZSB7e2pzOiBTdHJpbmcsIGNzczogU3RyaW5nfX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMucHJlZml4ID0gcmVxdWlyZSgnLi9saWIvcHJlZml4JylcblxuLyoqXG4gKiBUZXN0IGlmIGEgcHJvcGVydHkgaXMgc3VwcG9ydGVkLCByZXR1cm5zIHByb3BlcnR5IHdpdGggdmVuZG9yXG4gKiBwcmVmaXggaWYgcmVxdWlyZWQsIG90aGVyd2lzZSBgZmFsc2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXG4gKiBAcmV0dXJuIHtTdHJpbmd8Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMuc3VwcG9ydGVkUHJvcGVydHkgPSByZXF1aXJlKCcuL2xpYi9zdXBwb3J0ZWQtcHJvcGVydHknKVxuXG4vKipcbiAqIFJldHVybnMgcHJlZml4ZWQgdmFsdWUgaWYgbmVlZGVkLiBSZXR1cm5zIGBmYWxzZWAgaWYgdmFsdWUgaXMgbm90IHN1cHBvcnRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfEJvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG4gZXhwb3J0cy5zdXBwb3J0ZWRWYWx1ZSA9IHJlcXVpcmUoJy4vbGliL3N1cHBvcnRlZC12YWx1ZScpXG4iLCIndXNlIHN0cmljdCdcblxudmFyIHJlZ0V4cCA9IC9bLVxcc10rKC4pPy9nXG5cbi8qKlxuICogQ29udmVydCBkYXNoIHNlcGFyYXRlZCBzdHJpbmdzIHRvIGNhbWVsIGNhc2VkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnRXhwLCB0b1VwcGVyKVxufVxuXG5mdW5jdGlvbiB0b1VwcGVyKG1hdGNoLCBjKSB7XG4gICAgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlKCkgOiAnJ1xufVxuXG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBFeHBvcnQgamF2YXNjcmlwdCBzdHlsZSBhbmQgY3NzIHN0eWxlIHZlbmRvciBwcmVmaXhlcy5cbiAqIEJhc2VkIG9uIFwidHJhbnNmb3JtXCIgc3VwcG9ydCB0ZXN0LlxuICovXG5cbnZhciBqc0Nzc01hcCA9IHtcbiAgICBXZWJraXQ6ICctd2Via2l0LScsXG4gICAgTW96OiAnLW1vei0nLFxuICAgIC8vIElFIGRpZCBpdCB3cm9uZyBhZ2FpbiAuLi5cbiAgICBtczogJy1tcy0nLFxuICAgIE86ICctby0nXG59XG5cbnZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKS5zdHlsZVxudmFyIHRlc3RQcm9wID0gJ1RyYW5zZm9ybSdcblxuZm9yICh2YXIganMgaW4ganNDc3NNYXApIHtcbiAgICBpZiAoKGpzICsgdGVzdFByb3ApIGluIHN0eWxlKSB7XG4gICAgICAgIGV4cG9ydHMuanMgPSBqc1xuICAgICAgICBleHBvcnRzLmNzcyA9IGpzQ3NzTWFwW2pzXVxuICAgICAgICBicmVha1xuICAgIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgcHJlZml4ID0gcmVxdWlyZSgnLi9wcmVmaXgnKVxudmFyIGNhbWVsaXplID0gcmVxdWlyZSgnLi9jYW1lbGl6ZScpXG5cbnZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuXG4vKipcbiAqIFdlIHRlc3QgZXZlcnkgcHJvcGVydHkgb24gdmVuZG9yIHByZWZpeCByZXF1aXJlbWVudC5cbiAqIE9uY2UgdGVzdGVkLCByZXN1bHQgaXMgY2FjaGVkLiBJdCBnaXZlcyB1cyB1cCB0byA3MCUgcGVyZiBib29zdC5cbiAqIGh0dHA6Ly9qc3BlcmYuY29tL2VsZW1lbnQtc3R5bGUtb2JqZWN0LWFjY2Vzcy12cy1wbGFpbi1vYmplY3RcbiAqXG4gKiBQcmVmaWxsIGNhY2hlIHdpdGgga25vd24gY3NzIHByb3BlcnRpZXMgdG8gcmVkdWNlIGFtb3VudCBvZlxuICogcHJvcGVydGllcyB3ZSBuZWVkIHRvIGZlYXR1cmUgdGVzdCBhdCBydW50aW1lLlxuICogaHR0cDovL2Rhdmlkd2Fsc2gubmFtZS92ZW5kb3ItcHJlZml4XG4gKi9cbnZhciBjYWNoZSA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICcnKVxuICAgIHZhciBjYWNoZSA9IHt9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICAgICAgY2FjaGVbY29tcHV0ZWRba2V5XV0gPSBjb21wdXRlZFtrZXldXG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlXG59KCkpXG5cbi8qKlxuICogVGVzdCBpZiBhIHByb3BlcnR5IGlzIHN1cHBvcnRlZCwgcmV0dXJucyBzdXBwb3J0ZWQgcHJvcGVydHkgd2l0aCB2ZW5kb3JcbiAqIHByZWZpeCBpZiByZXF1aXJlZC4gUmV0dXJucyBgZmFsc2VgIGlmIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgZGFzaCBzZXBhcmF0ZWRcbiAqIEByZXR1cm4ge1N0cmluZ3xCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgIC8vIFdlIGhhdmUgbm90IHRlc3RlZCB0aGlzIHByb3AgeWV0LCBsZXRzIGRvIHRoZSB0ZXN0LlxuICAgIGlmIChjYWNoZVtwcm9wXSAhPSBudWxsKSByZXR1cm4gY2FjaGVbcHJvcF1cblxuICAgIC8vIENhbWVsaXphdGlvbiBpcyByZXF1aXJlZCBiZWNhdXNlIHdlIGNhbid0IHRlc3QgdXNpbmdcbiAgICAvLyBjc3Mgc3ludGF4IGZvciBlLmcuIGluIEZGLlxuICAgIC8vIFRlc3QgaWYgcHJvcGVydHkgaXMgc3VwcG9ydGVkIGFzIGl0IGlzLlxuICAgIGlmIChjYW1lbGl6ZShwcm9wKSBpbiBlbC5zdHlsZSkge1xuICAgICAgICBjYWNoZVtwcm9wXSA9IHByb3BcbiAgICAvLyBUZXN0IGlmIHByb3BlcnR5IGlzIHN1cHBvcnRlZCB3aXRoIHZlbmRvciBwcmVmaXguXG4gICAgfSBlbHNlIGlmICgocHJlZml4LmpzICsgY2FtZWxpemUoJy0nICsgcHJvcCkpIGluIGVsLnN0eWxlKSB7XG4gICAgICAgIGNhY2hlW3Byb3BdID0gcHJlZml4LmNzcyArIHByb3BcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYWNoZVtwcm9wXSA9IGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIGNhY2hlW3Byb3BdXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIHByZWZpeCA9IHJlcXVpcmUoJy4vcHJlZml4JylcblxudmFyIGNhY2hlID0ge31cblxudmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG5cbi8qKlxuICogUmV0dXJucyBwcmVmaXhlZCB2YWx1ZSBpZiBuZWVkZWQuIFJldHVybnMgYGZhbHNlYCBpZiB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd8Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycgfHwgIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxMCkpKSByZXR1cm4gdmFsdWVcblxuICAgIHZhciBjYWNoZUtleSA9IHByb3BlcnR5ICsgdmFsdWVcblxuICAgIGlmIChjYWNoZVtjYWNoZUtleV0gIT0gbnVsbCkgcmV0dXJuIGNhY2hlW2NhY2hlS2V5XVxuXG4gICAgLy8gVGVzdCB2YWx1ZSBhcyBpdCBpcy5cbiAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZVxuXG4gICAgLy8gVmFsdWUgaXMgc3VwcG9ydGVkIGFzIGl0IGlzLlxuICAgIGlmIChlbC5zdHlsZVtwcm9wZXJ0eV0gPT0gdmFsdWUpIHtcbiAgICAgICAgY2FjaGVbY2FjaGVLZXldID0gdmFsdWVcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUZXN0IHZhbHVlIHdpdGggdmVuZG9yIHByZWZpeC5cbiAgICAgICAgdmFsdWUgPSBwcmVmaXguY3NzICsgdmFsdWVcbiAgICAgICAgZWwuc3R5bGVbcHJvcGVydHldID0gdmFsdWVcblxuICAgICAgICAvLyBWYWx1ZSBpcyBzdXBwb3J0ZWQgd2l0aCB2ZW5kb3IgcHJlZml4LlxuICAgICAgICBpZiAoZWwuc3R5bGVbcHJvcGVydHldID09IHZhbHVlKSBjYWNoZVtjYWNoZUtleV0gPSB2YWx1ZVxuICAgIH1cblxuICAgIGlmICghY2FjaGVbY2FjaGVLZXldKSBjYWNoZVtjYWNoZUtleV0gPSBmYWxzZVxuXG4gICAgcmV0dXJuIGNhY2hlW2NhY2hlS2V5XVxufVxuIiwiLyoqXG4gKiBTdHlsZVNoZWV0cyB3cml0dGVuIGluIGphdmFzY3JpcHQuXG4gKlxuICogQGNvcHlyaWdodCBPbGVnIFNsb2JvZHNrb2kgMjAxNFxuICogQHdlYnNpdGUgaHR0cHM6Ly9naXRodWIuY29tL2pzc3R5bGVzL2pzc1xuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpXG4iLCIndXNlIHN0cmljdCdcblxudmFyIHBsdWdpbnMgPSByZXF1aXJlKCcuL3BsdWdpbnMnKVxuXG52YXIgdWlkID0gMFxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbi8qKlxuICogUnVsZSBpcyBzZWxlY3RvciArIHN0eWxlIGhhc2guXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFtzZWxlY3Rvcl1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3R5bGVdIGRlY2xhcmF0aW9ucyBibG9ja1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gUnVsZShzZWxlY3Rvciwgc3R5bGUsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09ICdvYmplY3QnKSB7XG4gICAgICAgIG9wdGlvbnMgPSBzdHlsZVxuICAgICAgICBzdHlsZSA9IHNlbGVjdG9yXG4gICAgICAgIHNlbGVjdG9yID0gbnVsbFxuICAgIH1cblxuICAgIHRoaXMuaWQgPSBSdWxlLnVpZCsrXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIGlmICh0aGlzLm9wdGlvbnMubmFtZWQgPT0gbnVsbCkgdGhpcy5vcHRpb25zLm5hbWVkID0gdHJ1ZVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvclxuICAgICAgICB0aGlzLmlzQXRSdWxlID0gc2VsZWN0b3JbMF0gPT0gJ0AnXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0F0UnVsZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuY2xhc3NOYW1lID0gUnVsZS5OQU1FU1BBQ0VfUFJFRklYICsgJy0nICsgdGhpcy5pZFxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gJy4nICsgdGhpcy5jbGFzc05hbWVcbiAgICB9XG5cbiAgICB0aGlzLnN0eWxlID0gc3R5bGVcbiAgICAvLyBXaWxsIGJlIHNldCBieSBTdHlsZVNoZWV0I2xpbmsgaWYgbGluayBvcHRpb24gaXMgdHJ1ZS5cbiAgICB0aGlzLkNTU1J1bGUgPSBudWxsXG4gICAgLy8gV2hlbiBhdC1ydWxlIGhhcyBzdWIgcnVsZXMuXG4gICAgdGhpcy5ydWxlcyA9IG51bGxcbiAgICBpZiAodGhpcy5pc0F0UnVsZSAmJiB0aGlzLnN0eWxlKSB0aGlzLmV4dHJhY3RBdFJ1bGVzKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSdWxlXG5cbi8qKlxuICogQ2xhc3MgbmFtZSBwcmVmaXggd2hlbiBnZW5lcmF0ZWQuXG4gKlxuICogQHR5cGUge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SdWxlLk5BTUVTUEFDRV9QUkVGSVggPSAnanNzJ1xuXG4vKipcbiAqIEluZGVudGF0aW9uIHN0cmluZyBmb3IgZm9ybWF0dGluZyB0b1N0cmluZyBvdXRwdXQuXG4gKlxuICogQHR5cGUge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SdWxlLklOREVOVEFUSU9OID0gJyAgJ1xuXG4vKipcbiAqIFVuaXF1ZSBpZCwgcmlnaHQgbm93IGp1c3QgYSBjb3VudGVyLCBiZWNhdXNlIHRoZXJlIGlzIG5vIG5lZWQgZm9yIGJldHRlciB1aWQuXG4gKlxuICogQHR5cGUge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SdWxlLnVpZCA9IDBcblxuLyoqXG4gKiBHZXQgb3Igc2V0IGEgc3R5bGUgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gW3ZhbHVlXVxuICogQHJldHVybiB7UnVsZXxTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUucHJvcCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIC8vIEl0cyBhIHNldHRlci5cbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBpZiAoIXRoaXMuc3R5bGUpIHRoaXMuc3R5bGUgPSB7fVxuICAgICAgICB0aGlzLnN0eWxlW25hbWVdID0gdmFsdWVcbiAgICAgICAgLy8gSWYgbGlua2VkIG9wdGlvbiBpbiBTdHlsZVNoZWV0IGlzIG5vdCBwYXNzZWQsIENTU1J1bGUgaXMgbm90IGRlZmluZWQuXG4gICAgICAgIGlmICh0aGlzLkNTU1J1bGUpIHRoaXMuQ1NTUnVsZS5zdHlsZVtuYW1lXSA9IHZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLy8gSXRzIGEgZ2V0dGVyLlxuICAgIGlmICh0aGlzLnN0eWxlKSB2YWx1ZSA9IHRoaXMuc3R5bGVbbmFtZV1cblxuICAgIC8vIFJlYWQgdGhlIHZhbHVlIGZyb20gdGhlIERPTSBpZiBpdHMgbm90IGNhY2hlZC5cbiAgICBpZiAodmFsdWUgPT0gbnVsbCAmJiB0aGlzLkNTU1J1bGUpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLkNTU1J1bGUuc3R5bGVbbmFtZV1cbiAgICAgICAgLy8gQ2FjaGUgdGhlIHZhbHVlIGFmdGVyIHdlIGhhdmUgZ290IGl0IGZyb20gdGhlIERPTSBvbmNlLlxuICAgICAgICB0aGlzLnN0eWxlW25hbWVdID0gdmFsdWVcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVcbn1cblxuLyoqXG4gKiBBZGQgY2hpbGQgcnVsZS4gUmVxdWlyZWQgZm9yIHBsdWdpbnMgbGlrZSBcIm5lc3RlZFwiLlxuICogU3R5bGVTaGVldCB3aWxsIHJlbmRlciB0aGVtIGFzIGEgc2VwYXJhdGUgcnVsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBydWxlIG9wdGlvbnNcbiAqIEByZXR1cm4ge1J1bGV9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUnVsZS5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHN0eWxlLCBvcHRpb25zKSB7XG4gICAgaWYgKCF0aGlzLmNoaWxkcmVuKSB0aGlzLmNoaWxkcmVuID0ge31cbiAgICB0aGlzLmNoaWxkcmVuW3NlbGVjdG9yXSA9IHtcbiAgICAgICAgc3R5bGU6IHN0eWxlLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBZGQgY2hpbGQgcnVsZS4gUmVxdWlyZWQgZm9yIHBsdWdpbnMgbGlrZSBcIm5lc3RlZFwiLlxuICogU3R5bGVTaGVldCB3aWxsIHJlbmRlciB0aGVtIGFzIGEgc2VwYXJhdGUgcnVsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZVxuICogQHJldHVybiB7UnVsZX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJ1bGUucHJvdG90eXBlLmV4dHJhY3RBdFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5ydWxlcykgdGhpcy5ydWxlcyA9IHt9XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMuc3R5bGUpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZVtuYW1lXVxuICAgICAgICAvLyBOb3QgYSBuZXN0ZWQgcnVsZS5cbiAgICAgICAgaWYgKHR5cGVvZiBzdHlsZSA9PSAnc3RyaW5nJykgYnJlYWtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gdGhpcy5vcHRpb25zLm5hbWVkID8gdW5kZWZpbmVkIDogbmFtZVxuICAgICAgICB2YXIgcnVsZSA9IHRoaXMucnVsZXNbbmFtZV0gPSBuZXcgUnVsZShzZWxlY3Rvciwgc3R5bGUsIHRoaXMub3B0aW9ucylcbiAgICAgICAgcGx1Z2lucy5ydW4ocnVsZSlcbiAgICAgICAgZGVsZXRlIHRoaXMuc3R5bGVbbmFtZV1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEFwcGx5IHJ1bGUgdG8gYW4gZWxlbWVudCBpbmxpbmUuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUnVsZS5wcm90b3R5cGUuYXBwbHlUbyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLnN0eWxlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc3R5bGVbcHJvcF1cbiAgICAgICAgaWYgKHRvU3RyaW5nLmNhbGwodmFsdWUpID09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gdmFsdWVbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgcnVsZSB0byBjc3Mgc3RyaW5nLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblJ1bGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlXG5cbiAgICAvLyBBdCBydWxlcyBsaWtlIEBjaGFyc2V0XG4gICAgaWYgKHRoaXMuaXNBdFJ1bGUgJiYgIXRoaXMuc3R5bGUgJiYgIXRoaXMucnVsZXMpIHJldHVybiB0aGlzLnNlbGVjdG9yICsgJzsnXG5cbiAgICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuICAgIGlmIChvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwgPT0gbnVsbCkgb3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsID0gMFxuXG4gICAgdmFyIHN0ciA9IGluZGVudChvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwsIHRoaXMuc2VsZWN0b3IgKyAnIHsnKVxuXG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzdHlsZVtwcm9wXVxuICAgICAgICAvLyBXZSB3YW50IHRvIGdlbmVyYXRlIG11bHRpcGxlIHN0eWxlIHdpdGggaWRlbnRpY2FsIHByb3BlcnR5IG5hbWVzLlxuICAgICAgICBpZiAodG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHN0ciArPSAnXFxuJyArIGluZGVudChvcHRpb25zLmluZGVudGF0aW9uTGV2ZWwgKyAxLCBwcm9wICsgJzogJyArIHZhbHVlW2ldICsgJzsnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyICs9ICdcXG4nICsgaW5kZW50KG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCArIDEsIHByb3AgKyAnOiAnICsgdmFsdWUgKyAnOycpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXZSBhcmUgaGF2ZSBhbiBhdC1ydWxlIHdpdGggbmVzdGVkIHN0YXRlbWVudHMuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL0F0LXJ1bGVcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMucnVsZXMpIHtcbiAgICAgICAgdmFyIHJ1bGVTdHIgPSB0aGlzLnJ1bGVzW25hbWVdLnRvU3RyaW5nKHtcbiAgICAgICAgICAgIGluZGVudGF0aW9uTGV2ZWw6IG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCArIDFcbiAgICAgICAgfSlcbiAgICAgICAgc3RyICs9ICdcXG4nICsgaW5kZW50KG9wdGlvbnMuaW5kZW50YXRpb25MZXZlbCwgcnVsZVN0cilcbiAgICB9XG5cbiAgICBzdHIgKz0gJ1xcbicgKyBpbmRlbnQob3B0aW9ucy5pbmRlbnRhdGlvbkxldmVsLCAnfScpXG5cbiAgICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogUmV0dXJucyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBydWxlLlxuICogTmVzdGVkIHJ1bGVzLCBhdC1ydWxlcyBhbmQgYXJyYXkgdmFsdWVzIGFyZSBub3Qgc3VwcG9ydGVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJ1bGUucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3R5bGUgPSB7fVxuXG4gICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLnN0eWxlKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc3R5bGVbcHJvcF1cbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWVcbiAgICAgICAgaWYgKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgc3R5bGVbcHJvcF0gPSB2YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlXG59XG5cbi8qKlxuICogSW5kZW50IGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBpbmRlbnQobGV2ZWwsIHN0cikge1xuICAgIHZhciBpbmRlbnRTdHIgPSAnJ1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGV2ZWw7IGkrKykgaW5kZW50U3RyICs9IFJ1bGUuSU5ERU5UQVRJT05cbiAgICByZXR1cm4gaW5kZW50U3RyICsgc3RyXG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIFJ1bGUgPSByZXF1aXJlKCcuL1J1bGUnKVxudmFyIHBsdWdpbnMgPSByZXF1aXJlKCcuL3BsdWdpbnMnKVxuXG4vKipcbiAqIFN0eWxlU2hlZXQgYWJzdHJhY3Rpb24sIGNvbnRhaW5zIHJ1bGVzLCBpbmplY3RzIHN0eWxlc2hlZXQgaW50byBkb20uXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbWVkaWFgIHN0eWxlIGVsZW1lbnQgYXR0cmlidXRlXG4gKiAgLSBgdGl0bGVgIHN0eWxlIGVsZW1lbnQgYXR0cmlidXRlXG4gKiAgLSBgdHlwZWAgc3R5bGUgZWxlbWVudCBhdHRyaWJ1dGVcbiAqICAtIGBuYW1lZGAgdHJ1ZSBieSBkZWZhdWx0IC0ga2V5cyBhcmUgbmFtZXMsIHNlbGVjdG9ycyB3aWxsIGJlIGdlbmVyYXRlZCxcbiAqICAgIGlmIGZhbHNlIC0ga2V5cyBhcmUgZ2xvYmFsIHNlbGVjdG9ycy5cbiAqICAtIGBsaW5rYCBsaW5rIGpzcyBSdWxlIGluc3RhbmNlcyB3aXRoIERPTSBDU1NSdWxlIGluc3RhbmNlcyBzbyB0aGF0IHN0eWxlcyxcbiAqICBjYW4gYmUgbW9kaWZpZWQgZHluYW1pY2FsbHksIGZhbHNlIGJ5IGRlZmF1bHQgYmVjYXVzZSBpdCBoYXMgc29tZSBwZXJmb3JtYW5jZSBjb3N0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcnVsZXNdIG9iamVjdCB3aXRoIHNlbGVjdG9ycyBhbmQgZGVjbGFyYXRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBTdHlsZVNoZWV0KHJ1bGVzLCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIGlmICh0aGlzLm9wdGlvbnMubmFtZWQgPT0gbnVsbCkgdGhpcy5vcHRpb25zLm5hbWVkID0gdHJ1ZVxuICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgICB0aGlzLmF0dGFjaGVkID0gZmFsc2VcbiAgICB0aGlzLm1lZGlhID0gdGhpcy5vcHRpb25zLm1lZGlhXG4gICAgdGhpcy50eXBlID0gdGhpcy5vcHRpb25zLnR5cGVcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5vcHRpb25zLnRpdGxlXG4gICAgdGhpcy5ydWxlcyA9IHt9XG4gICAgLy8gT25seSB3aGVuIG9wdGlvbnMubmFtZWQ6IHRydWUuXG4gICAgdGhpcy5jbGFzc2VzID0ge31cbiAgICB0aGlzLmRlcGxveWVkID0gZmFsc2VcbiAgICB0aGlzLmxpbmtlZCA9IGZhbHNlXG5cbiAgICAvLyBEb24ndCBjcmVhdGUgZWxlbWVudCBpZiB3ZSBhcmUgbm90IGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudCgpXG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIHJ1bGVzKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUnVsZXMoa2V5LCBydWxlc1trZXldKVxuICAgIH1cbn1cblxuU3R5bGVTaGVldC5BVFRSSUJVVEVTID0gWyd0aXRsZScsICd0eXBlJywgJ21lZGlhJ11cblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZVNoZWV0XG5cbi8qKlxuICogSW5zZXJ0IHN0eWxlc2hlZXQgZWxlbWVudCB0byByZW5kZXIgdHJlZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHJldHVybiB7U3R5bGVTaGVldH1cbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmF0dGFjaGVkKSByZXR1cm4gdGhpc1xuXG4gICAgaWYgKCF0aGlzLmRlcGxveWVkKSB7XG4gICAgICAgIHRoaXMuZGVwbG95KClcbiAgICAgICAgdGhpcy5kZXBsb3llZCA9IHRydWVcbiAgICB9XG5cbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudClcblxuICAgIC8vIEJlZm9yZSBlbGVtZW50IGlzIGF0dGFjaGVkIHRvIHRoZSBkb20gcnVsZXMgYXJlIG5vdCBjcmVhdGVkLlxuICAgIGlmICghdGhpcy5saW5rZWQgJiYgdGhpcy5vcHRpb25zLmxpbmspIHtcbiAgICAgICAgdGhpcy5saW5rKClcbiAgICAgICAgdGhpcy5saW5rZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgdGhpcy5hdHRhY2hlZCA9IHRydWVcblxuICAgIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogUmVtb3ZlIHN0eWxlc2hlZXQgZWxlbWVudCBmcm9tIHJlbmRlciB0cmVlLlxuICpcbiAqIEByZXR1cm4ge1N0eWxlU2hlZXR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5kZXRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmF0dGFjaGVkKSByZXR1cm4gdGhpc1xuXG4gICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KVxuICAgIHRoaXMuYXR0YWNoZWQgPSBmYWxzZVxuXG4gICAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBEZXBsb3kgc3R5bGVzIHRvIHRoZSBlbGVtZW50LlxuICpcbiAqIEByZXR1cm4ge1N0eWxlU2hlZXR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnXFxuJyArIHRoaXMudG9TdHJpbmcoKSArICdcXG4nXG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEZpbmQgQ1NTUnVsZSBvYmplY3RzIGluIHRoZSBET00gYW5kIGxpbmsgdGhlbSBpbiB0aGUgY29ycmVzcG9uZGluZyBSdWxlIGluc3RhbmNlLlxuICpcbiAqIEByZXR1cm4ge1N0eWxlU2hlZXR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgQ1NTUnVsZUxpc3QgPSB0aGlzLmVsZW1lbnQuc2hlZXQuY3NzUnVsZXNcbiAgICB2YXIgcnVsZXMgPSB0aGlzLnJ1bGVzXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IENTU1J1bGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBDU1NSdWxlID0gQ1NTUnVsZUxpc3RbaV1cbiAgICAgICAgdmFyIHJ1bGUgPSBydWxlc1tDU1NSdWxlLnNlbGVjdG9yVGV4dF1cbiAgICAgICAgaWYgKHJ1bGUpIHJ1bGUuQ1NTUnVsZSA9IENTU1J1bGVcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEFkZCBhIHJ1bGUgdG8gdGhlIGN1cnJlbnQgc3R5bGVzaGVldC4gV2lsbCBpbnNlcnQgYSBydWxlIGFsc28gYWZ0ZXIgdGhlIHN0eWxlc2hlZXRcbiAqIGhhcyBiZWVuIHJlbmRlcmVkIGZpcnN0IHRpbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtrZXldIGNhbiBiZSBzZWxlY3RvciBvciBuYW1lIGlmIGBvcHRpb25zLm5hbWVkYCBpcyB0cnVlXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGUgcHJvcGVydHkvdmFsdWUgaGFzaFxuICogQHJldHVybiB7UnVsZX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmFkZFJ1bGUgPSBmdW5jdGlvbiAoa2V5LCBzdHlsZSkge1xuICAgIHZhciBydWxlcyA9IHRoaXMuY3JlYXRlUnVsZXMoa2V5LCBzdHlsZSlcblxuICAgIC8vIERvbid0IGluc2VydCBydWxlIGRpcmVjdGx5IGlmIHRoZXJlIGlzIG5vIHN0cmluZ2lmaWVkIHZlcnNpb24geWV0LlxuICAgIC8vIEl0IHdpbGwgYmUgaW5zZXJ0ZWQgYWxsIHRvZ2V0aGVyIHdoZW4gLmF0dGFjaCBpcyBjYWxsZWQuXG4gICAgaWYgKHRoaXMuZGVwbG95ZWQpIHtcbiAgICAgICAgdmFyIHNoZWV0ID0gdGhpcy5lbGVtZW50LnNoZWV0XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBuZXh0SW5kZXggPSBzaGVldC5jc3NSdWxlcy5sZW5ndGhcbiAgICAgICAgICAgIHZhciBydWxlID0gcnVsZXNbaV1cbiAgICAgICAgICAgIHNoZWV0Lmluc2VydFJ1bGUocnVsZS50b1N0cmluZygpLCBuZXh0SW5kZXgpXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpbmspIHJ1bGUuQ1NTUnVsZSA9IHNoZWV0LmNzc1J1bGVzW25leHRJbmRleF1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVwbG95KClcbiAgICB9XG5cbiAgICByZXR1cm4gcnVsZXNcbn1cblxuLyoqXG4gKiBDcmVhdGUgcnVsZXMsIHdpbGwgcmVuZGVyIGFsc28gYWZ0ZXIgc3R5bGVzaGVldCB3YXMgcmVuZGVyZWQgdGhlIGZpcnN0IHRpbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJ1bGVzIGtleTpzdHlsZSBoYXNoLlxuICogQHJldHVybiB7U3R5bGVTaGVldH0gdGhpc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuYWRkUnVsZXMgPSBmdW5jdGlvbiAocnVsZXMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcnVsZXMpIHtcbiAgICAgICAgdGhpcy5hZGRSdWxlKGtleSwgcnVsZXNba2V5XSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIEdldCBhIHJ1bGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleSBjYW4gYmUgc2VsZWN0b3Igb3IgbmFtZSBpZiBgbmFtZWRgIGlzIHRydWUuXG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUuZ2V0UnVsZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlc1trZXldXG59XG5cbi8qKlxuICogQ29udmVydCBydWxlcyB0byBhIGNzcyBzdHJpbmcuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuU3R5bGVTaGVldC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9ICcnXG4gICAgdmFyIHJ1bGVzID0gdGhpcy5ydWxlc1xuICAgIHZhciBzdHJpbmdpZmllZCA9IHt9XG4gICAgZm9yICh2YXIga2V5IGluIHJ1bGVzKSB7XG4gICAgICAgIHZhciBydWxlID0gcnVsZXNba2V5XVxuICAgICAgICAvLyBXZSBoYXZlIHRoZSBzYW1lIHJ1bGUgcmVmZXJlbmNlZCB0d2ljZSBpZiB1c2luZyBuYW1lZCB1cmxlcy5cbiAgICAgICAgLy8gQnkgbmFtZSBhbmQgYnkgc2VsZWN0b3IuXG4gICAgICAgIGlmIChzdHJpbmdpZmllZFtydWxlLmlkXSkgY29udGludWVcbiAgICAgICAgaWYgKHN0cikgc3RyICs9ICdcXG4nXG4gICAgICAgIHN0ciArPSBydWxlc1trZXldLnRvU3RyaW5nKClcbiAgICAgICAgc3RyaW5naWZpZWRbcnVsZS5pZF0gPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHN0clxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHJ1bGUsIHdpbGwgbm90IHJlbmRlciBhZnRlciBzdHlsZXNoZWV0IHdhcyByZW5kZXJlZCB0aGUgZmlyc3QgdGltZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW3NlbGVjdG9yXSBpZiB5b3UgZG9uJ3QgcGFzcyBzZWxlY3RvciAtIGl0IHdpbGwgYmUgZ2VuZXJhdGVkXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0eWxlXSBkZWNsYXJhdGlvbnMgYmxvY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gcnVsZSBvcHRpb25zXG4gKiBAcmV0dXJuIHtBcnJheX0gcnVsZSBjYW4gY29udGFpbiBjaGlsZCBydWxlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblN0eWxlU2hlZXQucHJvdG90eXBlLmNyZWF0ZVJ1bGVzID0gZnVuY3Rpb24gKGtleSwgc3R5bGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgcnVsZXMgPSBbXVxuICAgIHZhciBzZWxlY3RvciwgbmFtZVxuXG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cbiAgICB2YXIgbmFtZWQgPSB0aGlzLm9wdGlvbnMubmFtZWRcbiAgICAvLyBTY29wZSBvcHRpb25zIG92ZXJ3cml0ZSBpbnN0YW5jZSBvcHRpb25zLlxuICAgIGlmIChvcHRpb25zLm5hbWVkICE9IG51bGwpIG5hbWVkID0gb3B0aW9ucy5uYW1lZFxuXG4gICAgaWYgKG5hbWVkKSBuYW1lID0ga2V5XG4gICAgZWxzZSBzZWxlY3RvciA9IGtleVxuXG4gICAgdmFyIHJ1bGUgPSBuZXcgUnVsZShzZWxlY3Rvciwgc3R5bGUsIHtcbiAgICAgICAgc2hlZXQ6IHRoaXMsXG4gICAgICAgIG5hbWVkOiBuYW1lZCxcbiAgICAgICAgbmFtZTogbmFtZVxuICAgIH0pXG4gICAgcnVsZXMucHVzaChydWxlKVxuXG4gICAgdGhpcy5ydWxlc1tydWxlLnNlbGVjdG9yXSA9IHJ1bGVcbiAgICBpZiAobmFtZSkge1xuICAgICAgICB0aGlzLnJ1bGVzW25hbWVdID0gcnVsZVxuICAgICAgICB0aGlzLmNsYXNzZXNbbmFtZV0gPSBydWxlLmNsYXNzTmFtZVxuICAgIH1cblxuICAgIHBsdWdpbnMucnVuKHJ1bGUpXG5cbiAgICBmb3IgKGtleSBpbiBydWxlLmNoaWxkcmVuKSB7XG4gICAgICAgIHJ1bGVzLnB1c2godGhpcy5jcmVhdGVSdWxlcyhcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHJ1bGUuY2hpbGRyZW5ba2V5XS5zdHlsZSxcbiAgICAgICAgICAgIHJ1bGUuY2hpbGRyZW5ba2V5XS5vcHRpb25zXG4gICAgICAgICkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJ1bGVzXG59XG5cbi8qKlxuICogQ3JlYXRlIHN0eWxlIHNoZWV0IGVsZW1lbnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5TdHlsZVNoZWV0LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuXG4gICAgU3R5bGVTaGVldC5BVFRSSUJVVEVTLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXNbbmFtZV0pIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHRoaXNbbmFtZV0pXG4gICAgfSwgdGhpcylcblxuICAgIHJldHVybiBlbGVtZW50XG59XG4iLCIndXNlIHN0cmljdCdcblxudmFyIFN0eWxlU2hlZXQgPSByZXF1aXJlKCcuL1N0eWxlU2hlZXQnKVxudmFyIFJ1bGUgPSByZXF1aXJlKCcuL1J1bGUnKVxuXG5leHBvcnRzLlN0eWxlU2hlZXQgPSBTdHlsZVNoZWV0XG5cbmV4cG9ydHMuUnVsZSA9IFJ1bGVcblxuZXhwb3J0cy5wbHVnaW5zID0gcmVxdWlyZSgnLi9wbHVnaW5zJylcblxuLyoqXG4gKiBDcmVhdGUgYSBzdHlsZXNoZWV0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBydWxlcyBpcyBzZWxlY3RvcjpzdHlsZSBoYXNoLlxuICogQHBhcmFtIHtPYmplY3R9IFtuYW1lZF0gcnVsZXMgaGF2ZSBuYW1lcyBpZiB0cnVlLCBjbGFzcyBuYW1lcyB3aWxsIGJlIGdlbmVyYXRlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXR0cmlidXRlc10gc3R5bGVzaGVldCBlbGVtZW50IGF0dHJpYnV0ZXMuXG4gKiBAcmV0dXJuIHtTdHlsZVNoZWV0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5jcmVhdGVTdHlsZVNoZWV0ID0gZnVuY3Rpb24gKHJ1bGVzLCBuYW1lZCwgYXR0cmlidXRlcykge1xuICAgIHJldHVybiBuZXcgU3R5bGVTaGVldChydWxlcywgbmFtZWQsIGF0dHJpYnV0ZXMpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcnVsZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gW3NlbGVjdG9yXVxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlIGlzIHByb3BlcnR5OnZhbHVlIGhhc2guXG4gKiBAcmV0dXJuIHtSdWxlfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5jcmVhdGVSdWxlID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBzdHlsZSkge1xuICAgIHZhciBydWxlID0gbmV3IFJ1bGUoc2VsZWN0b3IsIHN0eWxlKVxuICAgIGV4cG9ydHMucGx1Z2lucy5ydW4ocnVsZSlcbiAgICByZXR1cm4gcnVsZVxufVxuXG4vKipcbiAqIFJlZ2lzdGVyIHBsdWdpbi4gUGFzc2VkIGZ1bmN0aW9uIHdpbGwgYmUgaW52b2tlZCB3aXRoIGEgcnVsZSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy51c2UgPSBleHBvcnRzLnBsdWdpbnMudXNlXG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZWdpc3RlcmVkIHBsdWdpbnMuXG4gKlxuICogQHR5cGUge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0cy5yZWdpc3RyeSA9IFtdXG5cbi8qKlxuICogUmVnaXN0ZXIgcGx1Z2luLiBQYXNzZWQgZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIHdpdGggYSBydWxlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLnVzZSA9IGZ1bmN0aW9uIChmbikge1xuICAgIGV4cG9ydHMucmVnaXN0cnkucHVzaChmbilcbn1cblxuLyoqXG4gKiBFeGVjdXRlIGFsbCByZWdpc3RlcmVkIHBsdWdpbnMuXG4gKlxuICogQHBhcmFtIHtSdWxlfSBydWxlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZXhwb3J0cy5ydW4gPSBmdW5jdGlvbiAocnVsZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwb3J0cy5yZWdpc3RyeS5sZW5ndGg7IGkrKykge1xuICAgICAgICBleHBvcnRzLnJlZ2lzdHJ5W2ldKHJ1bGUpXG4gICAgfVxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjQgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWlzZXF1YWwnKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCdsb2Rhc2guX2JpbmRjYWxsYmFjaycpO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmVcbiAqIGVxdWl2YWxlbnQuIElmIGBjdXN0b21pemVyYCBpcyBwcm92aWRlZCBpdCBpcyBpbnZva2VkIHRvIGNvbXBhcmUgdmFsdWVzLlxuICogSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGAgY29tcGFyaXNvbnMgYXJlIGhhbmRsZWQgYnkgdGhlIG1ldGhvZFxuICogaW5zdGVhZC4gVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZVxuICogYXJndW1lbnRzOiAodmFsdWUsIG90aGVyIFssIGluZGV4fGtleV0pLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyBjb21wYXJpbmcgYXJyYXlzLCBib29sZWFucywgYERhdGVgIG9iamVjdHMsXG4gKiBudW1iZXJzLCBgT2JqZWN0YCBvYmplY3RzLCByZWdleGVzLCBhbmQgc3RyaW5ncy4gT2JqZWN0cyBhcmUgY29tcGFyZWQgYnlcbiAqIHRoZWlyIG93biwgbm90IGluaGVyaXRlZCwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLiBGdW5jdGlvbnMgYW5kIERPTSBub2Rlc1xuICogYXJlICoqbm90Kiogc3VwcG9ydGVkLiBQcm92aWRlIGEgY3VzdG9taXplciBmdW5jdGlvbiB0byBleHRlbmQgc3VwcG9ydFxuICogZm9yIGNvbXBhcmluZyBvdGhlciB2YWx1ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBlcVxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgdmFsdWUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIHZhciBvdGhlciA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBvYmplY3QgPT0gb3RoZXI7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNFcXVhbChvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBhcnJheSA9IFsnaGVsbG8nLCAnZ29vZGJ5ZSddO1xuICogdmFyIG90aGVyID0gWydoaScsICdnb29kYnllJ107XG4gKlxuICogXy5pc0VxdWFsKGFycmF5LCBvdGhlciwgZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gKiAgIGlmIChfLmV2ZXJ5KFt2YWx1ZSwgb3RoZXJdLCBSZWdFeHAucHJvdG90eXBlLnRlc3QsIC9eaCg/Oml8ZWxsbykkLykpIHtcbiAqICAgICByZXR1cm4gdHJ1ZTtcbiAqICAgfVxuICogfSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCB0aGlzQXJnKSB7XG4gIGN1c3RvbWl6ZXIgPSB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nID8gYmluZENhbGxiYWNrKGN1c3RvbWl6ZXIsIHRoaXNBcmcsIDMpIDogdW5kZWZpbmVkO1xuICB2YXIgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIG90aGVyKSA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuICByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplcikgOiAhIXJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjcgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2guaXN0eXBlZGFycmF5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW55IGVsZW1lbnQgcGFzc2VzIHRoZSBwcmVkaWNhdGUgY2hlY2ssXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYHRoaXNgIGJpbmRpbmdcbiAqIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzTG9vc2VdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdCh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIG9iamVjdHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IGFycmF5VGFnLFxuICAgICAgb3RoVGFnID0gYXJyYXlUYWc7XG5cbiAgaWYgKCFvYmpJc0Fycikge1xuICAgIG9ialRhZyA9IG9ialRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbiAgICBpZiAob2JqVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG9ialRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG9ialRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG9iaklzQXJyID0gaXNUeXBlZEFycmF5KG9iamVjdCk7XG4gICAgfVxuICB9XG4gIGlmICghb3RoSXNBcnIpIHtcbiAgICBvdGhUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG90aGVyKTtcbiAgICBpZiAob3RoVGFnID09IGFyZ3NUYWcpIHtcbiAgICAgIG90aFRhZyA9IG9iamVjdFRhZztcbiAgICB9IGVsc2UgaWYgKG90aFRhZyAhPSBvYmplY3RUYWcpIHtcbiAgICAgIG90aElzQXJyID0gaXNUeXBlZEFycmF5KG90aGVyKTtcbiAgICB9XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiAhKG9iaklzQXJyIHx8IG9iaklzT2JqKSkge1xuICAgIHJldHVybiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZyk7XG4gIH1cbiAgaWYgKCFpc0xvb3NlKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpJc1dyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCwgb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyLCBjdXN0b21pemVyLCBpc0xvb3NlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgfVxuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gZGV0ZWN0aW5nIGNpcmN1bGFyIHJlZmVyZW5jZXMgc2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jSk8uXG4gIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcblxuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IG9iamVjdCkge1xuICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdID09IG90aGVyO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgYG9iamVjdGAgYW5kIGBvdGhlcmAgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICBzdGFja0EucHVzaChvYmplY3QpO1xuICBzdGFja0IucHVzaChvdGhlcik7XG5cbiAgdmFyIHJlc3VsdCA9IChvYmpJc0FyciA/IGVxdWFsQXJyYXlzIDogZXF1YWxPYmplY3RzKShvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKTtcblxuICBzdGFja0EucG9wKCk7XG4gIHN0YWNrQi5wb3AoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBhcnJheXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFycmF5cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEFycmF5cyhhcnJheSwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc0xvb3NlICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKGlzTG9vc2UgPyBvdGhWYWx1ZSA6IGFyclZhbHVlLCBpc0xvb3NlID8gYXJyVmFsdWUgOiBvdGhWYWx1ZSwgaW5kZXgpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChpc0xvb3NlKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcpIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kIGJvb2xlYW5zXG4gICAgICAvLyB0byBgMWAgb3IgYDBgIHRyZWF0aW5nIGludmFsaWQgZGF0ZXMgY29lcmNlZCB0byBgTmFOYCBhcyBub3QgZXF1YWwuXG4gICAgICByZXR1cm4gK29iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gVHJlYXQgYE5hTmAgdnMuIGBOYU5gIGFzIGVxdWFsLlxuICAgICAgcmV0dXJuIChvYmplY3QgIT0gK29iamVjdClcbiAgICAgICAgPyBvdGhlciAhPSArb3RoZXJcbiAgICAgICAgOiBvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzIHByaW1pdGl2ZXMgYW5kIHN0cmluZ1xuICAgICAgLy8gb2JqZWN0cyBhcyBlcXVhbC4gU2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjEwLjYuNCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0xvb3NlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNMb29zZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNMb29zZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaW5kZXggPSBvYmpMZW5ndGg7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICBpZiAoIShpc0xvb3NlID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgdmFyIHNraXBDdG9yID0gaXNMb29zZTtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIoaXNMb29zZSA/IG90aFZhbHVlIDogb2JqVmFsdWUsIGlzTG9vc2U/IG9ialZhbHVlIDogb3RoVmFsdWUsIGtleSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZCA/IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzTG9vc2UsIHN0YWNrQSwgc3RhY2tCKSA6IHJlc3VsdCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmICghc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgW3NwZWNpYWwgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpLlxuICogSW4gYWRkaXRpb24gdG8gc3BlY2lhbCBjaGFyYWN0ZXJzIHRoZSBmb3J3YXJkIHNsYXNoIGlzIGVzY2FwZWQgdG8gYWxsb3cgZm9yXG4gKiBlYXNpZXIgYGV2YWxgIHVzZSBhbmQgYEZ1bmN0aW9uYCBjb21waWxhdGlvbi5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0J3Mgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKGZuVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gZ2V0TmF0aXZlKEFycmF5LCAnaXNBcnJheScpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSXNIb3N0Q3Rvci50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIi9cIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLFxuICogXCIqXCIsIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6XFwvXFwvbG9kYXNoXFwuY29tXFwvXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMiAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9XG50eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9IHR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmpUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBnZXROYXRpdmUgPSByZXF1aXJlKCdsb2Rhc2guX2dldG5hdGl2ZScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJ2xvZGFzaC5pc2FycmF5Jyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eXFxkKyQvO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2tleXMnKTtcblxuLyoqXG4gKiBVc2VkIGFzIHRoZSBbbWF4aW11bSBsZW5ndGhdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoKGFsbG93SW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgfHwgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG52YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QgPT0gbnVsbCA/IG51bGwgOiBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmICgodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0KSB8fFxuICAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzQXJndW1lbnRzKG9iamVjdCkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjkuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBbc3BlY2lhbCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbCkuXG4gKiBJbiBhZGRpdGlvbiB0byBzcGVjaWFsIGNoYXJhY3RlcnMgdGhlIGZvcndhcmQgc2xhc2ggaXMgZXNjYXBlZCB0byBhbGxvdyBmb3JcbiAqIGVhc2llciBgZXZhbGAgdXNlIGFuZCBgRnVuY3Rpb25gIGNvbXBpbGF0aW9uLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQncyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAoZm5Ub1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KSlcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSXNIb3N0Q3Rvci50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIi9cIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLFxuICogXCIqXCIsIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6XFwvXFwvbG9kYXNoXFwuY29tXFwvXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4zIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcbiJdfQ==
