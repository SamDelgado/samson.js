// Samson.Router constructor function
// Used to handle page history and transitions

import { BASE_ROUTER_ANIMATIONS } from './base_router_animations.js';

/* Router Prototype Methods */
import getRouterData from './getRouterData.js';
import doFirst from './doFirst.js';
import doFirstNoCallback from './doFirstNoCallback.js';
import updateHistory from './updateHistory.js';
import getAnimationData from './getAnimationData.js';
import doAnimation from './doAnimation.js';
import animate from './animate.js';
import navigate from './navigate.js';
import back from './back.js';

export default function SamsonRouter(options) {

  var self = this;

  this.activePage = "Page_1";
  this.inactivePage = "Page_2";

  // our page cache will store the initialized pages
  this.Cache = {};

  // if options.cache is true, then all pages will remain cached
  this.__cache = options.cache || false;

  // create the app router history
  this.History = [];

  // a queue of any router events that haven't been handled yet
  this.Queue = [];

  // set the app's animations
  this.Animations = BASE_ROUTER_ANIMATIONS;

  var custom_router_animations = options.animations || {};
  var key;
  for (key in custom_router_animations) {
    this.Animations[key] = custom_router_animations[key];
  }

  this.currentPage = false; // the name of the page we are currently on

  this.previousPage = false; // the name of the previous page we were on

  this.nextPage = false; // the name of the page we are transitioning to

  this.currentAnimation = false; // the name of the currently running animation

  this.isBusy = false; // set to true whenever the router is still handling an event

  this.isAnimating = false; // set to true if a new page is being animated onto the screen

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
    self[event].router = options.events[event];
  }

}

SamsonRouter.prototype.__getRouterData = getRouterData; // get the router's current page data
SamsonRouter.prototype.__doFirst = doFirst;
SamsonRouter.prototype.__doFirstNoCallback = doFirstNoCallback;
SamsonRouter.prototype.__updateHistory = updateHistory;
SamsonRouter.prototype.__getAnimationData = getAnimationData;
SamsonRouter.prototype.__doAnimation = doAnimation;
SamsonRouter.prototype.__animate = animate;
SamsonRouter.prototype.navigate = navigate;
SamsonRouter.prototype.back = back;
