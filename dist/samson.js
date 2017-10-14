!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Samson",[],t):"object"==typeof exports?exports.Samson=t():e.Samson=t()}(this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=8)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"SamsonApp",function(){return o});var a=n(9),o={};const i={_VERSION_:"0.6.0",_APP_CREATED_:!1,App:o,createApp:a.a};t.Samson=i},function(e,t,n){(function(n){var a,o;!function(){"use strict";function i(){}function s(e){return Array.isArray(e)&&e.length>0}function r(e){return"object"==typeof e&&l(e).length>0}function c(e,t){var n,a=e.length;for(n=0;n<a;n++)t(e[n])}function u(e){var t=!1;return function(){if(t)throw new Error("Callback already called.");t=!0,e.apply(f,arguments)}}function p(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var f;f="object"==typeof window&&this===window?window:"object"==typeof n&&this===n?n:this;var l=Object.keys,m={each:function(e,t,n){n=p(n||i);var a=e.length;if(!s(e))return n();var o=0;c(e,function(e){t(e,u(function(e){e?(n(e),n=i):++o>=a&&n(null)}))})},eachSeries:function(e,t,n){n=p(n||i);var a=e.length;if(!s(e))return n();var o=0,r=function(){t(e[o],u(function(e){e?(n(e),n=i):(o++,o<a?r():n(null))}))};r()},parallel:function(e,t){var n,a,o,i,c,u=[],p=0;if(s(e))a=e.length,i=[];else{if(!r(e))return t();c=!0,n=l(e),a=n.length,i={}}for(o=0;o<a;o++)c?u.push({k:n[o],t:e[n[o]]}):u.push({k:o,t:e[o]});u.forEach(function(e){e.t(function(n,o){if(n)return t(n);i[e.k]=o,++p==a&&t(null,i)})})},series:function(e,t){function n(i){e[i](function(e,s){return e?t(e):(o[i]=s,i<a-1?n(i+1):t(null,o))})}if(!s(e))return t();var a=e.length,o=[];n(0)}};void 0!==e&&e.exports?e.exports=m:(a=[],void 0!==(o=function(){return m}.apply(t,a))&&(e.exports=o))}()}).call(t,n(11))},function(e,t,n){"use strict";function a(e,t){var n=this;!0===t&&Object(o.a)(this),this.isPage=e.isPage||!1,this.isPage?(this.path=e.path,this.childOf=e.childOf||!1,this.previousPage=e.previousPage||!1,this.backAnimation=e.backAnimation||!1,this.isBackSafe=e.isBackSafe||!0,this._name=this.path,this.onVisible=e.onVisible||r.a):(this.el="#"===e.el.charAt(0)?e.el.slice(1):e.el,this._name=this.el,this.tag=e.tag||"div"),this.events=e.events||{},this.AppEvents=[],this.DOMEvents=[],this._loadedAppEvents=[],this._loadedDOMEvents=[];var a=Object.keys(this.events);a.length&&a.forEach(function(e){var t={};if("@"===e.charAt(0))t.type=e.slice(1),t.handler=n.events[e],n.AppEvents.push(t);else{var a=e.split(" ");t.type=a.shift(),t.selector=a.length>1?a.join(" "):a[0],t.selector||(t.selector=!0!==n.isPage&&"#"+n.el),t.handler=function(t){n.events[e].call(n,t,this)},t.onCapture=-1!==_.a.indexOf(t.type),n.DOMEvents.push(t)}}),this._components=e.components||{},this._componentsLoaded=!1,this.Components={},this.setInitialState=e.setInitialState||r.c,this.state={},this._initialStateSet=!1,this._stateChanged=!1,this._loaded=!1,this._template=e.render||e.template,this.beforeRender=e.beforeRender||r.b,this.afterRender=e.afterRender||r.b,this.onLoad=e.onLoad||r.a,this.beforeRemove=e.beforeRemove||r.b,this.afterRemove=e.afterRemove||r.b,this._uuid=this._name+"-"+Date.now(),this._routerEvents=e.Router||e.router||{},Object(i.a)(this);var c=e.extend||e.custom||{};Object(s.a)(this,c,S.a)}t.a=a;var o=n(6),i=n(24),s=n(7),r=n(3),c=n(25),u=n(26),p=n(27),f=n(29),l=n(30),m=n(31),h=n(32),d=n(33),v=n(34),g=n(35),A=n(36),S=n(37),_=n(38);a.prototype._type="Component",a.prototype._fixAutoFocusElements=c.a,a.prototype._render=u.a,a.prototype.setState=p.a,a.prototype.resetState=f.a,a.prototype._doFirst=l.a,a.prototype._loadEvents=m.a,a.prototype._destroyEvents=h.a,a.prototype._loadSubComponents=d.a,a.prototype._renderSubComponents=v.a,a.prototype._destroySubComponents=g.a,a.prototype._remove=A.a},function(e,t,n){"use strict";function a(){}function o(e){e&&e()}function i(){return{}}t.a=a,t.b=o,t.c=i},function(e,t,n){"use strict";function a(e){return e.parent?a(e.parent):e}t.a=a},function(e,t){!function(){function t(e,t,n){var a="blur"==t||"focus"==t;e.element.addEventListener(t,n,a)}function n(e){e.preventDefault(),e.stopPropagation()}function a(e){return p||(p=e.matches?e.matches:e.webkitMatchesSelector?e.webkitMatchesSelector:e.mozMatchesSelector?e.mozMatchesSelector:e.msMatchesSelector?e.msMatchesSelector:e.oMatchesSelector?e.oMatchesSelector:u.matchesSelector)}function o(e,t,n){if("_root"==t)return n;if(e!==n)return a(e).call(e,t)?e:e.parentNode?(f++,o(e.parentNode,t,n)):void 0}function i(e,t,n,a){m[e.id]||(m[e.id]={}),m[e.id][t]||(m[e.id][t]={}),m[e.id][t][n]||(m[e.id][t][n]=[]),m[e.id][t][n].push(a)}function s(e,t,n,a){if(m[e.id])if(t){if(!a&&!n)return void(m[e.id][t]={});if(!a)return void delete m[e.id][t][n];if(m[e.id][t][n])for(var o=0;o<m[e.id][t][n].length;o++)if(m[e.id][t][n][o]===a){m[e.id][t][n].splice(o,1);break}}else for(var i in m[e.id])m[e.id].hasOwnProperty(i)&&(m[e.id][i]={})}function r(e,t,n){if(m[e][n]){var a,i,s=t.target||t.srcElement,r={},c=0,p=0;f=0;for(a in m[e][n])m[e][n].hasOwnProperty(a)&&(i=o(s,a,h[e].element))&&u.matchesEvent(n,h[e].element,i,"_root"==a,t)&&(f++,m[e][n][a].match=i,r[f]=m[e][n][a]);for(t.stopPropagation=function(){t.cancelBubble=!0},c=0;c<=f;c++)if(r[c])for(p=0;p<r[c].length;p++){if(!1===r[c][p].call(r[c].match,t))return void u.cancel(t);if(t.cancelBubble)return}}}function c(e,t,n,a){if(this.element){e instanceof Array||(e=[e]),n||"function"!=typeof t||(n=t,t="_root");var o,c=this.id;for(o=0;o<e.length;o++)a?s(this,e[o],t,n):(m[c]&&m[c][e[o]]||u.addEvent(this,e[o],function(e){return function(t){r(c,t,e)}}(e[o])),i(this,e[o],t,n));return this}}function u(e,t){if(!(this instanceof u)){for(var n in h)if(h[n].element===e)return h[n];return l++,h[l]=new u(e,l),h[l]}this.element=e,this.id=t}var p,f=0,l=0,m={},h={};u.prototype.on=function(e,t,n){return c.call(this,e,t,n)},u.prototype.off=function(e,t,n){return c.call(this,e,t,n,!0)},u.matchesSelector=function(){},u.cancel=n,u.addEvent=t,u.matchesEvent=function(){return!0},void 0!==e&&e.exports&&(e.exports=u),window.Gator=u}()},function(e,t,n){"use strict";function a(e){var t={},n=[];e.on=function(e,n,a){(t[e]=t[e]||[]).push([n,a])},e.off=function(e,a){e||(t={});for(var o=t[e]||n,i=o.length=a?o.length:0;i--;)a==o[i][0]&&o.splice(i,1)},e.emit=function(e){for(var a,o=n.slice.call(arguments,1),i=t[e]||n,s=0;a=i[s++];)a[0].apply(a[1],o)}}t.a=a},function(e,t,n){"use strict";function a(e){return"_"==e.charAt(0)}function o(e,t,n){var o;for(o in t)a(o)||-1!==n.indexOf(o)||(e[o]=t[o])}t.a=o},function(e,t,n){e.exports=n(0).Samson},function(e,t,n){"use strict";function a(e){return e&&"object"==typeof e?e:!(!window._SAMSON_APP_BUNDLE_||"object"!=typeof window._SAMSON_APP_BUNDLE_)&&window._SAMSON_APP_BUNDLE_}function o(e){if(this._APP_CREATED_)console.log("[Samson] A Samson App has already been created. Only 1 Samson App can exist at a time.");else{var t=a(e);if(t)return Object(i.a)(t),this._APP_CREATED_=!0,this.App.DEBUG&&this.App.log("The Samson App is now created"),this.App;console.log("[Samson] A Samson App object was not passed to Samson.createApp(), or a SamsonAppBundle was not automatically built")}}t.a=o;var i=n(10)},function(e,t,n){"use strict";function a(e){r.SamsonApp.Name=e.Name||"App",r.SamsonApp.DEBUG=e.DEBUG||window&&window.DEBUG,Object(p.a)(r.SamsonApp),r.SamsonApp.log=Object(u.a)(r.SamsonApp.Name,r.SamsonApp.DEBUG),r.SamsonApp.DOM={},r.SamsonApp.Data=e.Data||{},r.SamsonApp.Config=e.Config||{},r.SamsonApp.Modules=e.Modules||{},r.SamsonApp.Pages=e.Pages||{},r.SamsonApp._components=e.Components||{},r.SamsonApp.Components={},r.SamsonApp.Router=new c.a(e.Router||{}),"object"==typeof e.Extend&&Object(f.a)(r.SamsonApp,e.Extend,h.a),r.SamsonApp.delegate=s()(r.SamsonApp.DOM.App);const t=e.Setup||{},n=t.launchTasks||{};r.SamsonApp.loadState=t.loadState||l.b,r.SamsonApp.launch=Object(m.a)(n)}t.a=a;var o=n(1),i=(n.n(o),n(5)),s=n.n(i),r=n(0),c=n(12),u=n(40),p=n(6),f=n(7),l=n(3),m=n(41),h=n(42)},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";function a(e){var t=this;this.activePageElement="Page_1",this.inactivePageElement="Page_2",this.pageCache={},this.cache=e.cache||!1,this.history=[],this.queue=[],this.animations=o.a;var n,a=e.animations||{};for(n in a)this.animations[n]=a[n];this.currentPage=!1,this.previousPage=!1,this.nextPage=!1,this.currentAnimation=!1,this.isBusy=!1,this.isAnimating=!1,this.navigateAnimation=e.defaultNavigateAnimation||"right",this.backAnimation=e.defaultBackAnimation||"left",this.beforeNavigate={},this.afterNavigate={},this.beforeAnimate={},this.duringAnimate={},this.afterAnimate={},this.beforeBack={},this.afterBack={};var i;for(i in e.events)t[i].router=e.events[i]}t.a=a;var o=n(13),i=n(14),s=n(15),r=n(16),c=n(17),u=n(18),p=n(19),f=n(22),l=n(23),m=n(39);a.prototype.getRouterData=i.a,a.prototype._doFirst=s.a,a.prototype._doFirstNoCallback=r.a,a.prototype.updateHistory=c.a,a.prototype.getAnimationData=u.a,a.prototype.doAnimation=p.a,a.prototype.animate=f.a,a.prototype.navigate=l.a,a.prototype.back=m.a},function(e,t,n){"use strict";const a={top:{current:"move-to-bottom",next:"move-from-top"},bottom:{current:"move-to-top",next:"move-from-bottom"},left:{current:"move-to-right",next:"move-from-left"},right:{current:"move-to-left",next:"move-from-right"},scale:{current:"scale-out",next:"scale-in"},fade:{current:"fade-out",next:"fade-in"}};t.a=a},function(e,t,n){"use strict";function a(){return{currentPage:this.currentPage,previousPage:this.previousPage,nextPage:this.nextPage,isAnimating:this.isAnimating,activePageElement:this.activePageElement,inactivePageElement:this.inactivePageElement,currentAnimation:this.currentAnimation}}t.a=a},function(e,t,n){"use strict";function a(e,t){var n=this,a=Object.keys(this[e]);i.a.each(a,function(t,a){n[e][t](n.getRouterData(),function(e){a(e)})},function(e){t(e)})}t.a=a;var o=n(1),i=n.n(o)},function(e,t,n){"use strict";function a(e,t){var n;for(n in this[e])this[e][n](this.getRouterData());t&&t()}t.a=a},function(e,t,n){"use strict";function a(e,t){var n=this,a={};if(a.date=new Date,"navigate"===e){a.kind=e,a.page=this.nextPage,this.history.push(a);var i=!!this.currentPage&&o.SamsonApp.Pages[this.currentPage].isBackSafe;this.previousPage=i?this.currentPage:o.SamsonApp.Pages[this.nextPage].previousPage,this.currentPage=this.nextPage}else"back"===e?(a.kind=e,a.page=this.previousPage,this.history.push(a),this.currentPage=this.previousPage,this.previousPage=o.SamsonApp.Pages[this.currentPage].previousPage):"failed"===e&&o.SamsonApp.DEBUG&&o.SamsonApp.log("The Samson Router event failed: "+t);if("update"!==e&&"failed"!==e){var s=this.inactivePageElement;this.inactivePageElement=this.activePageElement,this.activePageElement=s}this.nextPage=!1;var r=this.queue.shift();r?"navigate"===r.kind?setTimeout(function(){n.isBusy=!1,n.navigate(r.next_page,r.animation,r.callback)},20):this.back(r.callback):this.isBusy=!1}t.a=a;var o=n(0)},function(e,t,n){"use strict";function a(e){var t={};t.current="none",t.next="none";var n;for(n in this.animations)if(e===n){t.current=this.animations[n].current,t.next=this.animations[n].next;break}return t}t.a=a},function(e,t,n){"use strict";function a(e,t){function n(){o.SamsonApp.DOM[a.inactivePageElement].classList.remove(e.next),o.SamsonApp.DOM[a.activePageElement].classList.remove(e.current),a.isAnimating=!1,a.currentPage?a.pageCache[a.currentPage]._remove(function(){a.cache||delete a.pageCache[a.currentPage],t()}):t()}var a=this;o.SamsonApp.DOM[this.inactivePageElement].classList.add(e.next,"active"),o.SamsonApp.DOM[this.activePageElement].classList.add(e.current),o.SamsonApp.DOM[this.activePageElement].classList.remove("active"),this._doFirstNoCallback("duringAnimate");var r=Object(s.a)("animations");"none"!==e.next?Object(i.a)(o.SamsonApp.DOM[this.inactivePageElement],r,n):n()}t.a=a;var o=n(0),i=n(20),s=n(21)},function(e,t,n){"use strict";function a(e,t,n){e.addEventListener(t,function(e){return e.target.removeEventListener(e.type,arguments.callee),n(e)})}t.a=a},function(e,t,n){"use strict";function a(e){if("transitions"===e&&o)return o;if("animations"===e&&i)return i;var t,n=document.createElement("fake"),a={transitions:{transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"},animations:{animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"}};for(t in a[e])if(void 0!==n.style[t]){if("transitions"===e)return o=a[e][t];if("animations"===e)return i=a[e][t]}}t.a=a;var o,i},function(e,t,n){"use strict";function a(e,t,n){var a=this;if(this.isAnimating=!0,"update"===t)this.pageCache[e]._render(!0,null,function(){a.pageCache[e]._loaded=!0,a.pageCache[e].onLoad(),a._doFirst("beforeAnimate",function(t){a.pageCache[e].onVisible(),n&&n()})});else{var i=this.getAnimationData(t);document.activeElement.blur(),this.pageCache[e]._render(!1,o.SamsonApp.DOM[this.inactivePageElement],function(){a.pageCache[e]._loaded=!0,a.pageCache[e].onLoad(),a._doFirst("beforeAnimate",function(t){a.doAnimation(i,function(){a.pageCache[e].onVisible();var t=o.SamsonApp.DOM[a.inactivePageElement].querySelector(".SF");t&&(setTimeout(function(){t.focus();var e=t.value;t.value="",t.value=e},0),t.classList.remove("SF")),n&&n()})})})}}t.a=a;var o=n(0)},function(e,t,n){"use strict";function a(e,t,n){var a=this;if(this.isBusy)this.queue.push({kind:"navigate",next_page:e,animation:t,callback:n}),o.SamsonApp.DEBUG&&o.SamsonApp.log("The Samson Router is busy. This event is #"+a.queue.length+" in line");else{this.isBusy=!0;var s=t||this.navigateAnimation;"update"===s&&e!==this.currentPage&&(s=this.navigateAnimation),this.nextPage=e,this._doFirst("beforeNavigate",function(t){o.SamsonApp.Pages[e]||t||(t="That page does not exist"),t?a.updateHistory("failed",t):(e===a.currentPage?s="update":a.pageCache[e]||(a.pageCache[e]=new i.a(o.SamsonApp.Pages[e],!1)),a.currentAnimation=s,a.animate(e,s,function(){a._doFirstNoCallback("afterAnimate"),"update"===s?a.updateHistory("update"):a.updateHistory("navigate"),a._doFirst("afterNavigate",function(e){n&&n()})}))})}}t.a=a;var o=n(0),i=n(2)},function(e,t,n){"use strict";function a(e){var t;for(t in e._routerEvents)o.SamsonApp.Router[t][e._uuid]=e._routerEvents[t].bind(e)}t.a=a;var o=n(0)},function(e,t,n){"use strict";function a(){var e,t=this.element.querySelectorAll("[autofocus='autofocus']");for(e=0;e<t.length;e++){var n=t[e];0==e&&n.classList.add("SF"),n.removeAttribute("autofocus"),n.blur()}}t.a=a},function(e,t,n){"use strict";function a(e,t,n){var a=this;this._loadSubComponents(e,function(){a._doFirst("beforeRender",function(o){a._initialStateSet&&!o||(a.state=a.setInitialState(),a._initialStateSet=!0),a.isPage?(a.element||(a.element=document.createElement("div"),a.element.id=a.path+"-page",a.element.innerHTML=a._template(a.state),t.appendChild(a.element),a.delegate=i()(a.element)),(e||a._stateChanged)&&(e=!0,a.element.innerHTML=a._template(a.state))):(!a.element||e||a._stateChanged)&&(e=!0,a.element=document.getElementById(a.el),a.element?a._template&&(a.element.innerHTML=a._template(a.state)):(a.element=document.createElement(a.tag),a.element.id=a.el,a._template&&(a.element.innerHTML=a._template(a.state)),a.parent&&a.parent.element?a.parent.element.appendChild(a.element):s.SamsonApp.DEBUG&&s.SamsonApp.log("There is no parent Samson Component to append "+a.el+" to."))),a._loadEvents(function(){a._renderSubComponents(e,function(){a._stateChanged=!1,a._fixAutoFocusElements(),a._doFirst("afterRender",function(){a.isPage||a._loaded||(a._loaded=!0,a.onLoad()),n&&n()})})})})})}t.a=a;var o=n(5),i=n.n(o),s=n(0)},function(e,t,n){"use strict";function a(e,t){var n=this;if("object"==typeof e){var a=!1;if(!Object(i.a)(this.state,e)){this.state={};Object.keys(e).forEach(function(t){n.state[t]=e[t]}),a=!0}if(a&&(this._stateChanged=!0,!t))if(this.parent&&this.parent._type){var r=Object(s.a)(this);r._render(!1)}else this._render(!1)}else o.SamsonApp.DEBUG&&o.SamsonApp.log("A valid object was not passed into the Samson Component's setState function")}t.a=a;var o=n(0),i=n(28),s=n(4)},function(e,t,n){"use strict";function a(e,t){return JSON.stringify(e)===JSON.stringify(t)}t.a=a},function(e,t,n){"use strict";function a(e){var t=this.setInitialState();this.setState(t,e)}t.a=a},function(e,t,n){"use strict";function a(e,t){this[e](function(e){t(e)})}t.a=a},function(e,t,n){"use strict";function a(e){var t=this;i.a.parallel({loadDOMEvents:function(e){if(t._loadedDOMEvents.length)e();else{var n=Object(r.a)(t),a=n.element,o=n.delegate;i.a.each(t.DOMEvents,function(e,n){e.selector?o.on(e.type,e.selector,e.handler,e.onCapture):a.addEventListener(e.type,e.handler,e.onCapture),t._loadedDOMEvents.push(e),n()},function(){e()})}},loadAppEvents:function(e){t._loadedAppEvents.length?e():i.a.each(t.AppEvents,function(e,n){s.SamsonApp.on(e.type,e.handler,t),t._loadedAppEvents.push(e),n()},function(){e()})}},function(){e&&e()})}t.a=a;var o=n(1),i=n.n(o),s=n(0),r=n(4)},function(e,t,n){"use strict";function a(e){var t=this;i.a.parallel({destroyDOMEvents:function(e){if(t._loadedDOMEvents.length){var n=Object(r.a)(t),a=n.element,o=n.delegate;i.a.each(t.DOMEvents,function(e,t){e.selector?o.off(e.type,e.selector,e.handler,e.onCapture):a.removeEventListener(e.type,e.handler,e.onCapture),t()},function(){t._loadedDOMEvents=[],e()})}else e()},destroyAppEvents:function(e){t._loadedAppEvents.length?i.a.each(t.AppEvents,function(e,t){s.SamsonApp.off(e.type,e.handler),t()},function(){t._loadedAppEvents=[],e()}):e()}},function(){e&&e()})}t.a=a;var o=n(1),i=n.n(o),s=n(0),r=n(4)},function(e,t,n){"use strict";function a(e,t){var n=this;if(!this._componentsLoaded||e){var a=Object.keys(this._components);i.a.each(a,function(e,t){n.Components[e]||(n.Components[e]=new s.a(n._components[e],!1),n.Components[e].parent=n),t()},function(){n._componentsLoaded=!0,t&&t()})}else t&&t()}t.a=a;var o=n(1),i=n.n(o),s=n(2)},function(e,t,n){"use strict";function a(e,t){var n=this,a=Object.keys(this._components);i.a.each(a,function(t,a){n.Components[t]._render(e,null,function(){a()})},function(){t()})}t.a=a;var o=n(1),i=n.n(o)},function(e,t,n){"use strict";function a(e){var t=this,n=Object.keys(this._components);i.a.each(n,function(e,n){t.Components[e]._remove(function(){delete t.Components[e],n()})},function(){t._componentsLoaded=!1,e()})}t.a=a;var o=n(1),i=n.n(o)},function(e,t,n){"use strict";function a(e){var t=this;this._doFirst("beforeRemove",function(){t._destroySubComponents(function(){t._destroyEvents(function(){t.element&&t.element.parentNode&&t.element.parentNode.removeChild(t.element),delete t.element;var n;for(n in t._routerEvents)delete o.SamsonApp.Router[n][t._uuid];delete t.delegate,t.state={},t._initialStateSet=!1,t._doFirst("afterRemove",function(){e&&e()})})})})}t.a=a;var o=n(0)},function(e,t,n){"use strict";const a=["path","el","element","tag","template","childOf","previousPage","isBackSafe","backAnimation","style","Components","events","DOMEvents","AppEvents","state","setState","resetState","setInitialState","beforeRender","afterRender","onLoad","onVisible","beforeRemove","render","parent","on","emit","off"];t.a=a},function(e,t,n){"use strict";const a=["blur","error","focus","load","resize","scroll"];t.a=a},function(e,t,n){"use strict";function a(e,t){"function"==typeof e&&(t=e);var n=this;if(n.isBusy)n.queue.push({kind:"back",callback:t}),o.SamsonApp.DEBUG&&o.SamsonApp.log("The Samson Router is busy. This event is #"+n.queue.length+" in line");else{var a;n.isBusy=!0,n._doFirst("beforeBack",function(s){var r;if("string"==typeof e?o.SamsonApp.Pages[e]?(n.previousPage=e,r=!0):a="The requested page to go back to does not exist":n.previousPage||(!1!==o.SamsonApp.Pages[n.currentPage].previousPage?n.previousPage=o.SamsonApp.Pages[n.currentPage].previousPage:!1!==o.SamsonApp.Pages[n.currentPage].childOf?n.previousPage=o.SamsonApp.Pages[n.currentPage].childOf:a="There is no page to go back to"),!0===o.SamsonApp.Pages[n.previousPage].isBackSafe||r||(a="The previous page isn't safe to go back to"),a||s)n.updateHistory("failed",s||a);else{n.nextPage=n.previousPage,n.pageCache[n.previousPage]||(n.pageCache[n.previousPage]=new i.a(o.SamsonApp.Pages[n.previousPage],!1));var c=o.SamsonApp.Pages[n.currentPage].backAnimation||n.backAnimation;n.currentAnimation=c,n.animate(n.previousPage,c,function(){n._doFirstNoCallback("afterAnimate"),n.updateHistory("back"),n._doFirst("afterBack",function(e){t&&t()})})}})}}t.a=a;var o=n(0),i=n(2)},function(e,t,n){"use strict";function a(e){var t=e.getHours(),n=e.getMinutes(),a=e.getSeconds(),o=e.getMilliseconds();return(t<10?"0"+t:t)+":"+(n<10?"0"+n:n)+":"+(a<10?"0"+a:a)+"."+("00"+o).slice(-3)}function o(e,t){if(t){var n=function(){};const o=e?"["+e+"]-[":"[";return n.toString=function(){return o+a(new Date)+"]"},console.log.bind(console,"%s",n)}return i.a}t.a=o;var i=n(3)},function(e,t,n){"use strict";function a(e){function t(e,t){return function(n){s.SamsonApp.DEBUG&&s.SamsonApp.log("Running all "+e+"Launch tasks"),i.a.parallel(t,function(){s.SamsonApp.DEBUG&&s.SamsonApp.log("All "+e+"Launch tasks have completed successfully"),n()})}}function n(e){s.SamsonApp.DEBUG&&s.SamsonApp.log("Loading all top-level components");var t=s.SamsonApp._components,n=s.SamsonApp.Components;i.a.each(Object.keys(t),function(e,a){n[e]=new r.a(t[e],!1),n[e].parent={element:s.SamsonApp.DOM.App,delegate:s.SamsonApp.delegate},n[e]._render(!1,null,function(){a()})},function(){s.SamsonApp.DEBUG&&s.SamsonApp.log("All top-level components were loaded successfully"),e()})}function a(e){s.SamsonApp.DEBUG&&s.SamsonApp.log("Configuring all modules"),i.a.each(Object.keys(s.SamsonApp.Modules),function(e,t){e.configure&&e.configure(),t()},function(){s.SamsonApp.DEBUG&&s.SamsonApp.log("All modules were configured successfully"),e()})}var o=e.before||[],c=e.during||[];c.push(n);var u=e.after||[];return u.push(a),function(){const e=window.cordova?"deviceready":"DOMContentLoaded";document.addEventListener(e,function(){s.SamsonApp.DEBUG&&s.SamsonApp.log(e),i.a.series([t("before",o),t("during",c),t("after",u)],function(e,t){s.SamsonApp.emit("app:ready"),s.SamsonApp.loadState()})},!1)}}t.a=a;var o=n(1),i=n.n(o),s=n(0),r=n(2)},function(e,t,n){"use strict";const a=["Components","Config","Data","DOM","Modules","Router","launch","loadState","Pages","on","emit","off"];t.a=a}])});
//# sourceMappingURL=samson.js.map