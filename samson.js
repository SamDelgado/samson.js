(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var reserved = ["$", "DOM", "Async", "Data", "styleSheet", "baseStyle", "style", "components", "setComponents", "Router", "Pages", "do", "on", "emit", "off"];

// create the Samson object that will be exported
module.exports = Samson = {};

Samson.VERSION = '0.1.11'; // keep in sync with package.json

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
    Samson.App.Data = {};
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

},{"./component":2,"./events":3,"./modules/quo.js":4,"./page":5,"./router":7,"./utils":9,"async-lite":10}],2:[function(require,module,exports){
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

    self._doFirst("beforeRender", function(reset_initial_state) {

      if (!self._initialStateSet || reset_initial_state) {
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

},{"./index":undefined,"./shared":8,"./utils":9}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){
/**
 * QuoJS - Micro #JavaScript Library for Mobile Devices.
 * @version v3.0.7
 * @link    http://quojs.tapquo.com
 * @author  Javi Jimenez Villar (@soyjavi) (https://twitter.com/soyjavi)
 * @license MIT
 */
(function(){"use strict";var t,n=[].indexOf||function(t){for(var n=0,e=this.length;e>n;n++)if(n in this&&this[n]===t)return n;return-1};t=function(){var t,n,e,r,i,u,o,a,c,l,s,f,h,d,p,v,g;return r=[],a=Object.prototype,o=/^\s*<(\w+|!)[^>]*>/,e=[1,9,11],n=/^\.([\w-]+)$/,u=/^#[\w\d-]+$/,s=/^[\w-]+$/,c=document.createElement("table"),l=document.createElement("tr"),i={tr:document.createElement("tbody"),tbody:c,thead:c,tfoot:c,td:l,th:l,"*":document.createElement("div")},t=function(n,e){var r;return n?"function"===t.toType(n)?t(document).ready(n):(r=p(n,e),v(r,n)):v()},t.query=function(t,e){var r;return n.test(e)?r=t.getElementsByClassName(e.replace(".","")):s.test(e)?r=t.getElementsByTagName(e):u.test(e)&&t===document?(r=t.getElementById(e.replace("#","")),r||(r=[])):r=t.querySelectorAll(e),r.nodeType?[r]:Array.prototype.slice.call(r)},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(n){var e,r;r=[];for(e in n)r.push(t[e]=n[e]);return r}),t},t.toType=function(t){var n;return n=a.toString.call(t).match(/\s([a-z|A-Z]+)/),n.length>1?n[1].toLowerCase():"object"},t.each=function(n,e){var r,i,u,o,a;if(i=void 0,o=void 0,"array"===t.toType(n))for(i=u=0,a=n.length;a>u;i=++u)r=n[i],e.call(r,i,r)===!1;else for(o in n)e.call(n[o],o,n[o])===!1;return n},t.map=function(n,e){var r,i,u,o;if(o=[],r=void 0,i=void 0,"array"===t.toType(n))for(r=0;r<n.length;)u=e(n[r],r),null!=u&&o.push(u),r++;else for(i in n)u=e(n[i],i),null!=u&&o.push(u);return h(o)},t.mix=function(){var t,n,e,r,i;for(e={},t=0,r=arguments.length;r>t;){n=arguments[t];for(i in n)g(n,i)&&void 0!==n[i]&&(e[i]=n[i]);t++}return e},v=function(t,n){return null==n&&(n=""),t=t||r,t.selector=n,t.__proto__=v.prototype,t},p=function(n,r){var i,u;return i=null,u=t.toType(n),"array"===u?i=f(n):"string"===u&&o.test(n)?(i=d(n.trim(),RegExp.$1),n=null):"string"===u?(i=t.query(document,n),r&&(i=1===i.length?t.query(i[0],r):t.map(function(){return t.query(i,r)}))):(e.indexOf(n.nodeType)>=0||n===window)&&(i=[n],n=null),i},d=function(n,e){var r;return null==e&&(e="*"),e in i||(e="*"),r=i[e],r.innerHTML=""+n,t.each(Array.prototype.slice.call(r.childNodes),function(){return r.removeChild(this)})},f=function(t){return t.filter(function(t){return null!=t?t:void 0})},h=function(t){return t.length>0?r.concat.apply(r,t):t},g=function(t,n){return a.hasOwnProperty.call(t,n)},v.prototype=t.fn={},t.fn.each=function(t){return this.forEach(function(n,e){return t.call(n,e,n)}),this},t.fn.filter=function(n){return t(r.filter.call(this,function(e){return e.parentNode&&t.query(e.parentNode,n).indexOf(e)>=0}))},t.fn.forEach=r.forEach,t.fn.indexOf=r.indexOf,t.version="3.0.7",t}(),this.Quo=this.$$=t,"undefined"!=typeof module&&null!==module&&(module.exports=t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n={TYPE:"GET",MIME:"json"},r={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},e=0,t.ajaxSettings={type:n.TYPE,async:!0,success:{},error:{},context:null,dataType:n.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:!1,timeout:0},t.ajax=function(e){var r,o,c,f;if(c=t.mix(t.ajaxSettings,e),c.type===n.TYPE?c.url+=t.serialize(c.data,"?"):c.data=t.serialize(c.data),i(c.url))return u(c);f=c.xhr(),f.onreadystatechange=function(){return 4===f.readyState?(clearTimeout(r),s(f,c)):void 0},f.open(c.type,c.url,c.async),l(f,c),c.timeout>0&&(r=setTimeout(function(){return h(f,c)},c.timeout));try{f.send(c.data)}catch(d){o=d,f=o,a("Resource not found",f,c)}return f},t.get=function(n,e,r,i){return t.ajax({url:n,data:e,success:r,dataType:i})},t.post=function(t,n,e,r){return c("POST",t,n,e,r)},t.put=function(t,n,e,r){return c("PUT",t,n,e,r)},t["delete"]=function(t,n,e,r){return c("DELETE",t,n,e,r)},t.json=function(n,e,r){return t.ajax({url:n,data:e,success:r})},t.serialize=function(t,n){var e,r;null==n&&(n=""),r=n;for(e in t)t.hasOwnProperty(e)&&(r!==n&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(t[e]));return r===n?"":r},u=function(n){var r,i,u,o;return n.async?(i="jsonp"+ ++e,u=document.createElement("script"),o={abort:function(){return t(u).remove(),i in window?window[i]={}:void 0}},r=void 0,window[i]=function(e){return clearTimeout(r),t(u).remove(),delete window[i],f(e,o,n)},u.src=n.url.replace(RegExp("=\\?"),"="+i),t("head").append(u),n.timeout>0&&(r=setTimeout(function(){return h(o,n)},n.timeout)),o):console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")},s=function(t,n){t.status>=200&&t.status<300||0===t.status?n.async&&f(o(t,n),t,n):a("QuoJS.ajax: Unsuccesful request",t,n)},f=function(t,n,e){e.success.call(e.context,t,n)},a=function(t,n,e){e.error.call(e.context,t,n,e)},l=function(t,n){var e;n.contentType&&(n.headers["Content-Type"]=n.contentType),n.dataType&&(n.headers.Accept=r[n.dataType]);for(e in n.headers)t.setRequestHeader(e,n.headers[e])},h=function(t,n){t.onreadystatechange={},t.abort(),a("QuoJS.ajax: Timeout exceeded",t,n)},c=function(n,e,r,i,u){return t.ajax({type:n,url:e,data:r,success:i,dataType:u,contentType:"application/x-www-form-urlencoded"})},i=function(t){return RegExp("=\\?").test(t)},o=function(t,e){var r,i;if(i=t,t.responseText){if(e.dataType===n.MIME)try{i=JSON.parse(t.responseText)}catch(u){r=u,i=r,a("QuoJS.ajax: Parse Error",t,e)}"xml"===e.dataType&&(i=t.responseXML)}return i}}(t),function(t){var n,e,r;return n=["-webkit-","-moz-","-ms-","-o-",""],t.fn.addClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.add(o));return u})},t.fn.removeClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.remove(o));return u})},t.fn.toggleClass=function(t){return this.each(function(){var n,r,i,u,o;for(i=e(t),u=[],n=0,r=i.length;r>n;n++)o=i[n],u.push(this.classList.toggle(o));return u})},t.fn.hasClass=function(t){return this.length>0&&this[0].classList.contains(t)},t.fn.listClass=function(){return this.length>0?this[0].classList:void 0},t.fn.style=t.fn.css=function(t,n){var e;return null!=n?this.each(function(){return this.style[t]=n}):(e=this[0],e.style[t]||r(e,t))},t.fn.vendor=function(t,e){var r,i,u,o;for(o=[],r=0,i=n.length;i>r;r++)u=n[r],o.push(this.style(""+u+t,e));return o},r=function(t,n){return document.defaultView.getComputedStyle(t,"")[n]},e=function(t){return Array.isArray(t)||(t=[t]),t}}(t),function(t){return t.fn.attr=function(n,e){return this.length>0&&"string"===t.toType(n)?null!=e?this.each(function(){return this.setAttribute(n,e)}):this[0].getAttribute(n):void 0},t.fn.removeAttr=function(n){return this.length>0&&"string"===t.toType(n)?this.each(function(){return this.removeAttribute(n)}):void 0},t.fn.data=function(t,n){return this.attr("data-"+t,n)},t.fn.removeData=function(t){return this.removeAttr("data-"+t)},t.fn.val=function(t){return null!=t?this.each(function(){return this.value=t.toString()}):this.length>0?this[0].value:null},t.fn.show=function(){return this.style("display","block")},t.fn.hide=function(){return this.style("display","none")},t.fn.focus=function(){return this[0].focus()},t.fn.blur=function(){return this[0].blur()},t.fn.offset=function(){var t,n;return this.length>0&&(t=this[0].getBoundingClientRect(),n={left:t.left+window.pageXOffset,top:t.top+window.pageYOffset,width:t.width,height:t.height}),n}}(t),function(t){var n,e,r,i,u,o;return r=null,n=/WebKit\/([\d.]+)/,e={Android:/(Android)\s+([\d.]+)/,ipad:/(iPad).*OS\s([\d_]+)/,iphone:/(iPhone\sOS)\s([\d_]+)/,Blackberry:/(BlackBerry|BB10|Playbook).*Version\/([\d.]+)/,FirefoxOS:/(Mozilla).*Mobile[^\/]*\/([\d\.]*)/,webOS:/(webOS|hpwOS)[\s\/]([\d.]+)/},t.isMobile=function(){return this.environment(),r.isMobile},t.environment=function(){var t,n;return r||(n=navigator.userAgent,t=u(n),r={browser:i(n),isMobile:!!t,screen:o(),os:t}),r},i=function(t){var e;return e=t.match(n),e?e[0]:t},u=function(t){var n,r,i;for(r in e)if(i=t.match(e[r])){n={name:"iphone"===r||"ipad"===r||"ipod"===r?"ios":r,version:i[2].replace("_",".")};break}return n},o=function(){return{width:window.innerWidth,height:window.innerHeight}}}(t),function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=1,i={},r={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},e={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touch:"click",orientationchange:"resize"},u=/complete|loaded|interactive/,t.fn.on=function(n,e,r){return null==e||"function"===t.toType(e)?this.bind(n,e):this.delegate(e,n,r)},t.fn.off=function(n,e,r){return null==e||"function"===t.toType(e)?this.unbind(n,e):this.undelegate(e,n,r)},t.fn.ready=function(n){return u.test(document.readyState)?n.call(this,t):t.fn.addEvent(document,"DOMContentLoaded",function(){return n.call(this,t)})},t.fn.bind=function(t,n){return this.forEach(function(e){return h(e,t,n)})},t.fn.unbind=function(t,n){return this.each(function(){return d(this,t,n)})},t.fn.delegate=function(n,e,r){return this.each(function(i,u){return h(u,e,r,n,function(e){return function(r){var i,a;return a=t(r.target).closest(n,u).get(0),a?(i=t.extend(o(r),{currentTarget:a,liveFired:u}),e.apply(a,[i].concat([].slice.call(arguments,1)))):void 0}})})},t.fn.undelegate=function(t,n,e){return this.each(function(){return d(this,n,e,t)})},t.fn.trigger=function(n,e,r){return"string"===t.toType(n)&&(n=l(n,e)),null!=r&&(n.originalEvent=r),this.each(function(){return this.dispatchEvent(n)})},t.fn.addEvent=function(t,n,e){return t.addEventListener?t.addEventListener(n,e,!1):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e},t.fn.removeEvent=function(t,n,e){return t.removeEventListener?t.removeEventListener(n,e,!1):t.detachEvent?t.detachEvent("on"+n,e):t["on"+n]=null},l=function(t,n){var e;return e=document.createEvent("Events"),e.initEvent(t,!0,!0,null,null,null,null,null,null,null,null,null,null,null,null),n&&(e.touch=n),e},h=function(n,e,r,u,o){var l,s,h,d;return e=c(e),h=f(n),s=i[h]||(i[h]=[]),l=o&&o(r,e),d={event:e,callback:r,selector:u,proxy:a(l,r,n),delegate:l,index:s.length},s.push(d),t.fn.addEvent(n,d.event,d.proxy)},d=function(n,e,r,u){var o;return e=c(e),o=f(n),s(o,e,r,u).forEach(function(e){return delete i[o][e.index],t.fn.removeEvent(n,e.event,e.proxy)})},f=function(t){return t._id||(t._id=n++)},c=function(n){var r;return r=("function"==typeof t.isMobile?t.isMobile():void 0)?n:e[n],r||n},a=function(t,n,e){var r;return n=t||n,r=function(t){var r;return r=n.apply(e,[t].concat(t.data)),r===!1&&t.preventDefault(),r}},s=function(t,n,e,r){return(i[t]||[]).filter(function(t){return!(!t||n&&t.event!==n||e&&t.callback!==e||r&&t.selector!==r)})},o=function(n){var e;return e=t.extend({originalEvent:n},n),t.each(r,function(t,r){return e[t]=function(){return this[r]=function(){return!0},n[t].apply(n,arguments)},e[r]=function(){return!1}}),e}}(t),function(t){return t.fn.text=function(t){return null!=t?this.each(function(){return this.textContent=t}):this.length>0?this[0].textContent:""},t.fn.html=function(n){var e;return null!=n?(e=t.toType(n),this.each(function(){return"string"===e?this.innerHTML=n:"array"===e?n.forEach(function(n){return function(e){return t(n).html(e)}}(this)):this.innerHTML+=t(n).html()})):this.length>0?this[0].innerHTML:""},t.fn.remove=function(){return this.each(function(){return null!=this.parentNode?this.parentNode.removeChild(this):void 0})},t.fn.empty=function(){return this.each(function(){return this.innerHTML=null})},t.fn.append=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("beforeend",n):"array"===e?n.forEach(function(n){return function(e){return t(n).append(e)}}(this)):this.appendChild(n)})},t.fn.prepend=function(n){var e;return e=t.toType(n),this.each(function(){return"string"===e?this.insertAdjacentHTML("afterbegin",n):"array"===e?n.each(function(t){return function(n,e){return t.insertBefore(e,t.firstChild)}}(this)):this.insertBefore(n,this.firstChild)})},t.fn.replaceWith=function(n){var e;return e=t.toType(n),this.each(function(){return this.parentNode?"string"===e?this.insertAdjacentHTML("beforeBegin",n):"array"===e?n.each(function(t){return function(n,e){return t.parentNode.insertBefore(e,t)}}(this)):this.parentNode.insertBefore(n,this):void 0}),this.remove()}}(t),function(n){var e,r,i,u;return e="parentNode",n.fn.find=function(e){var r;return r=1===this.length?t.query(this[0],e):this.map(function(){return t.query(this,e)}),n(r)},n.fn.parent=function(t){var n;return n=t?i(this):this.instance(e),r(n,t)},n.fn.children=function(t){var n;return n=this.map(function(){return Array.prototype.slice.call(this.children)}),r(n,t)},n.fn.siblings=function(t){var n;return n=this.map(function(t,n){return Array.prototype.slice.call(n.parentNode.children).filter(function(t){return t!==n})}),r(n,t)},n.fn.get=function(t){return this[t]||null},n.fn.first=function(){return n(this[0])},n.fn.last=function(){return n(this[this.length-1])},n.fn.closest=function(t,e){var r,i;for(i=this[0],r=n(t),r.length||(i=null);i&&r.indexOf(i)<0;)i=i!==e&&i!==document&&i.parentNode;return n(i)},n.fn.next=function(){return u.call(this,"nextSibling")},n.fn.prev=function(){return u.call(this,"previousSibling")},n.fn.instance=function(t){return this.map(function(){return this[t]})},n.fn.map=function(t){return n.map(this,function(n,e){return t.call(n,e,n)})},i=function(t){var e;for(e=[];t.length>0;)t=n.map(t,function(t){return t=t.parentNode,t!==document&&e.indexOf(t)<0?(e.push(t),t):void 0});return e},r=function(t,e){return null!=e?n(t).filter(e):n(t)},u=function(t){var e;for(e=this[0][t];e&&1!==e.nodeType;)e=e[t];return n(e)}}(t),t.Gestures=function(t){var e,r,i,u,o,a,c,l,s,f,h,d,p,v;return d=!1,l={},o=null,f=null,i=["input","select","textarea"],p=function(t){return l[t.name]=t.handler,e(t.events)},v=function(n,e,r){return t(n).trigger(e,r,f)},h=function(t){var e;return e=(t.srcElement||t.target).tagName.toLowerCase(),n.call(i,e)>=0?t.stopPropagation():(d=!0,f=t||event,o=a(t),c("start",t.target,o))},s=function(t){return d?(f=t||event,o=a(t),o.length>1&&f.preventDefault(),c("move",t.target,o)):void 0},u=function(t){return d?(f=t||event,c("end",t.target,o),d=!1):void 0},r=function(t){return d=!1,c("cancel")},e=function(n){return n.forEach(function(n){return t.fn[n]=function(e){return t(document.body).delegate(this.selector,n,e)}}),this},c=function(t,n,e){var r,i,u;u=[];for(i in l)r=l[i],r[t]&&u.push(r[t].call(r,n,e));return u},a=function(t){var n,e,r,i,u;for(r=t.touches||[t],i=[],n=0,e=r.length;e>n;n++)u=r[n],i.push({x:u.pageX,y:u.pageY});return i},t(document).ready(function(){var n;return n=t(document.body),n.bind("touchstart",h),n.bind("touchmove",s),n.bind("touchend",u),n.bind("touchcancel",r)}),{add:p,trigger:v}}(t),t.Gestures.add({name:"basic",events:["touch","hold","doubleTap"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return e=15,n={TAP:200,DOUBLE_TAP:400,HOLD:400},i=null,c=!0,a=null,o=null,u=null,h=function(e,r){return 1===r.length?(o={time:new Date,x:r[0].x,y:r[0].y},a=e,i=setTimeout(function(){return t.trigger(e,"hold",r[0])},n.HOLD)):l()},f=function(t,n){var i;return null!==o&&(i=r(o,n[0]),i.x>e||i.y>e||n.length>1)?l():void 0},s=function(e,a){var c,s;if(o)return c=r(o,a[0]),0!==c.x||0!==c.y?l():(clearTimeout(i),s=new Date,s-o.time<n.TAP?s-u<n.DOUBLE_TAP?(t.trigger(e,"doubleTap",a[0]),u=null):(u=s,t.trigger(e,"touch",a[0])):void 0)},l=function(){return o=null,c=!1,clearTimeout(i)},r=function(t,n){var e;return e={x:n.x-t.x,y:n.y-t.y}},{start:h,move:f,end:s,cancel:l}}(t.Gestures)}),t.Gestures.add({name:"drag",events:["drag","dragging"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h;return n=window.devicePixelRatio>=2?15:20,c=null,o=null,a=null,u=null,h=function(t,n){return n.length>=2?(c=t,o=n.length,a=e(n)):void 0},f=function(t,n){var e;return n.length===o?(e=r(n),u={touches:n,delta:e},i(!0)):void 0},l=s=function(t,n){return a&&u?(i(!1),o=null,a=null,u=null):void 0},r=function(t){var n;return n=e(t),{x:n.x-a.x,y:n.y-a.y}},e=function(t){var n,e,r,i,u;for(i=0,u=0,n=0,e=t.length;e>n;n++)r=t[n],i+=parseInt(r.x),u+=parseInt(r.y);return{x:i/t.length,y:u/t.length}},i=function(e){return e?t.trigger(c,"dragging",u):Math.abs(u.delta.x)>n||Math.abs(u.delta.y)>n?t.trigger(c,"drag",u):void 0},{start:h,move:f,end:s}}(t.Gestures)}),t.Gestures.add({name:"pinch",events:["pinch","pinching","pinchIn","pinchOut"],handler:function(t){var n,e,r,i,u,o,a,c,l,s;return n=window.devicePixelRatio>=2?15:20,o=null,u=null,i=null,s=function(t,n){return 2===n.length?(o=t,u=r(n[0],n[1])):void 0},l=function(t,n){var o;return u&&2===n.length?(o=r(n[0],n[1]),i={touches:n,delta:o-u},e(!0)):void 0},a=c=function(t,n){return u&&i?(e(!1),u=null,i=null):void 0},r=function(t,n){return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))},e=function(e){var r;return e?t.trigger(o,"pinching",i):Math.abs(i.delta)>n?(t.trigger(o,"pinch",i),r=i.delta>0?"pinchOut":"pinchIn",t.trigger(o,r,i)):void 0},{start:s,move:l,end:c}}(t.Gestures)}),t.Gestures.add({name:"rotation",events:["rotate","rotating","rotateLeft","rotateRight"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f,h,d;return n=5,e=20,l=null,u=0,c=null,i=null,d=function(t,n){return 2===n.length?(l=t,u=0,c=o(n[0],n[1])):void 0},h=function(t,n){var l;return c&&2===n.length?(l=o(n[0],n[1])-c,i&&Math.abs(i.delta-l)>e&&(l+=360*a(i.delta)),Math.abs(l)>360&&(u++,l-=360*a(i.delta)),i={touches:n,delta:l,rotationsCount:u},r(!0)):void 0},s=f=function(t,n){return c&&i?(r(!1),l=null,u=0,c=null,i=null,c=null):void 0},a=function(t){return 0>t?-1:1},o=function(t,n){var e;return e=Math.atan2(t.y-n.y,t.x-n.x),180*(0>e?e+2*Math.PI:e)/Math.PI},r=function(e){var r;return e?t.trigger(l,"rotating",i):Math.abs(i.delta)>n?(t.trigger(l,"rotate",i),r=i.delta>0?"rotateRight":"rotateLeft",t.trigger(l,r,i)):void 0},{start:d,move:h,end:f}}(t.Gestures)}),t.Gestures.add({name:"swipe",events:["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","swiping","swipingHorizontal","swipingVertical"],handler:function(t){var n,e,r,i,u,o,a,c,l,s,f;return n=Math.round(20/window.devicePixelRatio),a=null,u=null,o=null,i=null,f=function(t,n){return 1===n.length?(a=t,u=n[0],i=null):void 0},s=function(t,n){var r,o;return 1===n.length?(r={x:n[0].x-u.x,y:n[0].y-u.y},o=null===i,i={x:n[0].x,y:n[0].y,delta:r},e(!0,o)):i=null},c=l=function(t,n){var r;return null==i&&n.length>=1&&(r={x:n[0].x-u.x,y:n[0].y-u.y},i={x:n[0].x,y:n[0].y,delta:r}),i?(e(!1),i=null):void 0},e=function(e,u){var c,l,s,f,h;if(null==u&&(u=!1),e)return u&&(o=r(i.delta.x,i.delta.y)),null!==o&&t.trigger(a,"swiping"+o,i),t.trigger(a,"swiping",i);if(l=[],Math.abs(i.delta.y)>n?l.push(i.delta.y<0?"Up":"Down"):Math.abs(i.delta.x)>n&&l.push(i.delta.x<0?"Left":"Right"),l.length){for(t.trigger(a,"swipe",i),h=[],s=0,f=l.length;f>s;s++)c=l[s],h.push(t.trigger(a,"swipe"+c,i));return h}},r=function(t,n){var e;return e=null,Math.round(Math.abs(t/n))>=2?e="Horizontal":Math.round(Math.abs(n/t))>=2&&(e="Vertical"),e},{start:f,move:s,end:l}}(t.Gestures)})}).call(this);

},{}],5:[function(require,module,exports){
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

    self._doFirst("beforeRender", function(reset_initial_state) {

      // create the initial state object of the page that is passed into the render call
      if (!self._initialStateSet || reset_initial_state) {
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

},{"./index":undefined,"./shared":8,"./utils":9}],6:[function(require,module,exports){

module.exports = {

  "top" : { current: "move-to-bottom", next: "move-from-top" },
  "bottom" : { current: "move-to-top", next: "move-from-bottom" },
  "left" : { current: "move-to-right", next: "move-from-left" },
  "right" : { current: "move-to-left", next: "move-from-right" },
  "scale" : { current: "scale-out", next: "scale-in" },
  "fade" : { current: "fade-out", next: "fade-in" }

};

},{}],7:[function(require,module,exports){
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

  // if options.cache is true, then all pages will remain cached
  this.cache = options.cache || false;

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

  // set the default back animation
  this.backAnimation = options.defaultBackAnimation || "left";

  // set the router events/hooks
  this.beforeNavigate = {};
  this.afterNavigate = {};
  this.beforeAnimate = {};
  this.duringAnimate = {};
  this.afterAnimate = {};
  this.beforeBack = {};
  this.afterBack = {};

  // load the default router events
  var event;
  for (event in options.events) {
    console.log(options.events[key]);
    this[event].router = options.events[key];
  }

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

  // if the animation is not "none", then listen for the animation's end event
  if (animate.next !== "none") {
    Utils.once(Samson.DOM[this.inactivePageElement], animationEvent, animationEnded);
  }

  // otherwise run the animationEnded immediately
  else {
    animationEnded();
  }

  // listen for the end of the animation
  function animationEnded() {

    // remove the animation class from the page we just made active
    Samson.DOM[self.inactivePageElement].classList.remove(animate.next);

    // remove the animation class from the page we just made inactive
    Samson.DOM[self.activePageElement].classList.remove(animate.current);

    self.pagesAnimating = false;

    // remove the old page including all of its views and events from the DOM
    // also remove the entire page instance from the router's pageCache if the cache option is false
    if (self.currentPage) {
      self.pageCache[self.currentPage]._remove(function() {

        if (!self.cache) delete self.pageCache[self.currentPage];
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

              // move the cursor to the end of the textarea
              var val = focusElement.value; //store the value of the element
              focusElement.value = ''; //clear the value of the element
              focusElement.value = val; //set that value back.

            }, 0);

            // move the cursor to the end of the textarea
            /* This solution isn't working with 'email' input types on Chrome
            var value_length = focusElement.value.length;
            focusElement.setSelectionRange(value_length, value_length);
            */

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
          // if the next page isn't already cached then cache it
          if (!self.pageCache[next_page]) {
            self.pageCache[next_page] = Samson.createPage(Samson.App.Pages[next_page]);
          }
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

        // load the previousPage into the pageCache if it isn't already
        if (!self.pageCache[self.previousPage]) {
          self.pageCache[self.previousPage] = Samson.createPage(Samson.App.Pages[self.previousPage]);
        }

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

},{"../index":undefined,"../utils":9,"./base_router_animations":6,"async-lite":10}],8:[function(require,module,exports){

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
shared.setState = function(new_state, dont_reload) { // new_state must be an object
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

      // the page or component will reload by default unless the dont_reload is true
      if (!dont_reload) {

        if (!this.parent || !this.parent._type) {
          this._render(false);
        } else {
          var parent = getTopParent(this);
          parent._render(false);
        }

      }

    }

  } else {
    throw new Error("Make sure to pass an object into setState");
  }
};

shared.resetState = function(dont_reload) {
  var new_state = this.setInitialState();
  this.setState(new_state, dont_reload);
};

// run the named function before calling back, and passthrough the first callback argument if one exists
shared._doFirst = function(name, callback) {
  this[name](function(callbackArg) {
    callback(callbackArg);
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

},{"./index":undefined,"async-lite":10,"lodash.isequal":11}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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

},{"lodash._baseisequal":12,"lodash._bindcallback":18}],12:[function(require,module,exports){
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

},{"lodash.isarray":13,"lodash.istypedarray":14,"lodash.keys":15}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"lodash._getnative":16,"lodash.isarguments":17,"lodash.isarray":13}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}]},{},[1]);
