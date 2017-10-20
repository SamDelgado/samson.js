!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Samson",[],e):"object"==typeof exports?exports.Samson=e():t.Samson=e()}(this,function(){return function(t){function e(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"SamsonApp",function(){return o});var a=n(9),o={};const i={VERSION:"0.6.11",APP_CREATED:!1,App:o,createApp:a.a};e.Samson=i},function(t,e,n){(function(n){var a,o;!function(){"use strict";function i(){}function s(t){return Array.isArray(t)&&t.length>0}function r(t){return"object"==typeof t&&l(t).length>0}function c(t,e){var n,a=t.length;for(n=0;n<a;n++)e(t[n])}function u(t){var e=!1;return function(){if(e)throw new Error("Callback already called.");e=!0,t.apply(f,arguments)}}function p(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}var f;f="object"==typeof window&&this===window?window:"object"==typeof n&&this===n?n:this;var l=Object.keys,m={each:function(t,e,n){n=p(n||i);var a=t.length;if(!s(t))return n();var o=0;c(t,function(t){e(t,u(function(t){t?(n(t),n=i):++o>=a&&n(null)}))})},eachSeries:function(t,e,n){n=p(n||i);var a=t.length;if(!s(t))return n();var o=0,r=function(){e(t[o],u(function(t){t?(n(t),n=i):(o++,o<a?r():n(null))}))};r()},parallel:function(t,e){var n,a,o,i,c,u=[],p=0;if(s(t))a=t.length,i=[];else{if(!r(t))return e();c=!0,n=l(t),a=n.length,i={}}for(o=0;o<a;o++)c?u.push({k:n[o],t:t[n[o]]}):u.push({k:o,t:t[o]});u.forEach(function(t){t.t(function(n,o){if(n)return e(n);i[t.k]=o,++p==a&&e(null,i)})})},series:function(t,e){function n(i){t[i](function(t,s){return t?e(t):(o[i]=s,i<a-1?n(i+1):e(null,o))})}if(!s(t))return e();var a=t.length,o=[];n(0)}};void 0!==t&&t.exports?t.exports=m:(a=[],void 0!==(o=function(){return m}.apply(e,a))&&(t.exports=o))}()}).call(e,n(11))},function(t,e,n){"use strict";function a(t,e){var n=this;!0===e&&Object(i.a)(this),this.isPage=t.isPage||!1,this.isPage?(this.path=t.path,this.title=t.title||this.path,this.childOf=t.childOf||!1,this.previousPage=t.previousPage||!1,this.backAnimation=t.backAnimation||!1,this.isBackSafe=t.isBackSafe||!0,this.__name=this.path,this.onVisible=t.onVisible||c.a):(this.el="#"===t.el.charAt(0)?t.el.slice(1):t.el,this.__name=this.el,this.tag=t.tag||"div"),this.events=t.events||{},this.__AppEvents=[],this.__DOMEvents=[],this.__loadedAppEvents=[],this.__loadedDOMEvents=[],Object.keys(this.events).forEach(function(t){var e={};if("@"===t.charAt(0))e.type=t.slice(1),e.handler=n.events[t],n.__AppEvents.push(e);else{var a=t.split(" ");e.type=a.shift(),e.selector=a.length>1?a.join(" "):a[0],e.selector||(e.selector=!0!==n.isPage&&"#"+n.el),e.handler=function(e){n.events[t].call(n,e,this)},e.onCapture=-1!==P.a.indexOf(e.type),n.__DOMEvents.push(e)}}),this.__components=t.components||{},this.__componentsLoaded=!1,this.Components={};var a=t.state;this.setInitialState="object"==typeof a?function(){return a}:t.setInitialState||c.c,this.state={},this.__initialStateSet=!1,this.__stateChanged=!1,this.__loaded=!1,this.__template=t.render||t.template,this.__templateData={App:o.SamsonApp,this:n},this.beforeRender=t.beforeRender||c.b,this.afterRender=t.afterRender||c.b,this.onLoad=t.onLoad||c.a,this.beforeRemove=t.beforeRemove||c.b,this.afterRemove=t.afterRemove||c.b,this.__uuid=this._name+"-"+Date.now(),this.__routerEvents=t.Router||t.router||{},Object(s.a)(this),Object(r.a)(this,t,y.a)}e.a=a;var o=n(0),i=n(6),s=n(24),r=n(7),c=n(3),u=n(25),p=n(26),f=n(27),l=n(29),m=n(30),h=n(31),d=n(32),_=n(33),v=n(34),g=n(35),A=n(36),S=n(37),b=n(38),y=n(39),P=n(40);a.prototype.__type="Component",a.prototype.__fixAutoFocusElements=u.a,a.prototype.__render=p.a,a.prototype.setState=f.a,a.prototype.resetState=l.a,a.prototype.clearState=m.a,a.prototype.forceUpdate=h.a,a.prototype.__doFirst=d.a,a.prototype.__loadEvents=_.a,a.prototype.__destroyEvents=v.a,a.prototype.__loadSubComponents=g.a,a.prototype.__renderSubComponents=A.a,a.prototype.__destroySubComponents=S.a,a.prototype.__remove=b.a},function(t,e,n){"use strict";function a(){}function o(t){t&&t()}function i(){return{}}e.a=a,e.b=o,e.c=i},function(t,e,n){"use strict";function a(t){return t.parent?a(t.parent):t}e.a=a},function(t,e){!function(){function e(t,e,n){var a="blur"==e||"focus"==e;t.element.addEventListener(e,n,a)}function n(t){t.preventDefault(),t.stopPropagation()}function a(t){return p||(p=t.matches?t.matches:t.webkitMatchesSelector?t.webkitMatchesSelector:t.mozMatchesSelector?t.mozMatchesSelector:t.msMatchesSelector?t.msMatchesSelector:t.oMatchesSelector?t.oMatchesSelector:u.matchesSelector)}function o(t,e,n){if("_root"==e)return n;if(t!==n)return a(t).call(t,e)?t:t.parentNode?(f++,o(t.parentNode,e,n)):void 0}function i(t,e,n,a){m[t.id]||(m[t.id]={}),m[t.id][e]||(m[t.id][e]={}),m[t.id][e][n]||(m[t.id][e][n]=[]),m[t.id][e][n].push(a)}function s(t,e,n,a){if(m[t.id])if(e){if(!a&&!n)return void(m[t.id][e]={});if(!a)return void delete m[t.id][e][n];if(m[t.id][e][n])for(var o=0;o<m[t.id][e][n].length;o++)if(m[t.id][e][n][o]===a){m[t.id][e][n].splice(o,1);break}}else for(var i in m[t.id])m[t.id].hasOwnProperty(i)&&(m[t.id][i]={})}function r(t,e,n){if(m[t][n]){var a,i,s=e.target||e.srcElement,r={},c=0,p=0;f=0;for(a in m[t][n])m[t][n].hasOwnProperty(a)&&(i=o(s,a,h[t].element))&&u.matchesEvent(n,h[t].element,i,"_root"==a,e)&&(f++,m[t][n][a].match=i,r[f]=m[t][n][a]);for(e.stopPropagation=function(){e.cancelBubble=!0},c=0;c<=f;c++)if(r[c])for(p=0;p<r[c].length;p++){if(!1===r[c][p].call(r[c].match,e))return void u.cancel(e);if(e.cancelBubble)return}}}function c(t,e,n,a){if(this.element){t instanceof Array||(t=[t]),n||"function"!=typeof e||(n=e,e="_root");var o,c=this.id;for(o=0;o<t.length;o++)a?s(this,t[o],e,n):(m[c]&&m[c][t[o]]||u.addEvent(this,t[o],function(t){return function(e){r(c,e,t)}}(t[o])),i(this,t[o],e,n));return this}}function u(t,e){if(!(this instanceof u)){for(var n in h)if(h[n].element===t)return h[n];return l++,h[l]=new u(t,l),h[l]}this.element=t,this.id=e}var p,f=0,l=0,m={},h={};u.prototype.on=function(t,e,n){return c.call(this,t,e,n)},u.prototype.off=function(t,e,n){return c.call(this,t,e,n,!0)},u.matchesSelector=function(){},u.cancel=n,u.addEvent=e,u.matchesEvent=function(){return!0},void 0!==t&&t.exports&&(t.exports=u),window.Gator=u}()},function(t,e,n){"use strict";function a(t){var e={},n=[];t.on=function(t,n,a){(e[t]=e[t]||[]).push([n,a])},t.off=function(t,a){t||(e={});for(var o=e[t]||n,i=o.length=a?o.length:0;i--;)a==o[i][0]&&o.splice(i,1)},t.emit=function(t){for(var a,o=n.slice.call(arguments,1),i=e[t]||n,s=0;a=i[s++];)a[0].apply(a[1],o)}}e.a=a},function(t,e,n){"use strict";function a(t){return"__"==t.charAt(0)}function o(t,e,n){Object.keys(e).forEach(function(o){t[o]||a(o)||-1!==n.indexOf(o)||(t[o]=e[o])})}e.a=o},function(t,e,n){t.exports=n(0).Samson},function(t,e,n){"use strict";function a(t){return t&&"object"==typeof t?t:!(!window._SAMSON_APP_BUNDLE_||"object"!=typeof window._SAMSON_APP_BUNDLE_)&&window._SAMSON_APP_BUNDLE_}function o(t){if(this.APP_CREATED)console.log("[Samson] A Samson App has already been created. Only 1 Samson App can exist at a time.");else{var e=a(t);if(e)return Object(i.a)(e),this.APP_CREATED=!0,this.App.DEBUG&&this.App.log("The Samson App is now created"),this.App;console.log("[Samson] A Samson App object was not passed to Samson.createApp(), or a SamsonAppBundle was not automatically built")}}e.a=o;var i=n(10)},function(t,e,n){"use strict";function a(t){r.SamsonApp.Name=t.Name||"App",r.SamsonApp.DEBUG=t.DEBUG||window&&window.DEBUG,Object(p.a)(r.SamsonApp),r.SamsonApp.log=Object(u.a)(r.SamsonApp.Name,r.SamsonApp.DEBUG),r.SamsonApp.Storage=l.a,r.SamsonApp.DOM={},Object(h.a)(),r.SamsonApp.Data=t.Data||{},r.SamsonApp.Config=t.Config||{},r.SamsonApp.Modules=t.Modules||{},r.SamsonApp.Pages=t.Pages||{},r.SamsonApp.__components=t.Components||{},r.SamsonApp.Components={},r.SamsonApp.Router=new c.a(t.Router||{}),Object(f.a)(r.SamsonApp,t,_.a),r.SamsonApp.delegate=s()(r.SamsonApp.DOM.App);const e=t.Setup||{},n=e.launchTasks||{};r.SamsonApp.loadState=e.loadState||m.b,r.SamsonApp.launch=Object(d.a)(n)}e.a=a;var o=n(1),i=(n.n(o),n(5)),s=n.n(i),r=n(0),c=n(12),u=n(42),p=n(6),f=n(7),l=n(43),m=n(3),h=n(44),d=n(45),_=n(46)},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";function a(t){var e=this;this.activePage="Page_1",this.inactivePage="Page_2",this.Cache={},this.__cache=t.cache||!1,this.History=[],this.Queue=[],this.Animations=o.a;var n,a=t.animations||{};for(n in a)this.Animations[n]=a[n];this.currentPage=!1,this.previousPage=!1,this.nextPage=!1,this.currentAnimation=!1,this.isBusy=!1,this.isAnimating=!1,this.navigateAnimation=t.defaultNavigateAnimation||"right",this.backAnimation=t.defaultBackAnimation||"left",this.beforeNavigate={},this.afterNavigate={},this.beforeAnimate={},this.duringAnimate={},this.afterAnimate={},this.beforeBack={},this.afterBack={};var i;for(i in t.events)e[i].router=t.events[i]}e.a=a;var o=n(13),i=n(14),s=n(15),r=n(16),c=n(17),u=n(18),p=n(19),f=n(22),l=n(23),m=n(41);a.prototype.__getRouterData=i.a,a.prototype.__doFirst=s.a,a.prototype.__doFirstNoCallback=r.a,a.prototype.__updateHistory=c.a,a.prototype.__getAnimationData=u.a,a.prototype.__doAnimation=p.a,a.prototype.__animate=f.a,a.prototype.navigate=l.a,a.prototype.back=m.a},function(t,e,n){"use strict";const a={top:{current:"move-to-bottom",next:"move-from-top"},bottom:{current:"move-to-top",next:"move-from-bottom"},left:{current:"move-to-right",next:"move-from-left"},right:{current:"move-to-left",next:"move-from-right"},scale:{current:"scale-out",next:"scale-in"},fade:{current:"fade-out",next:"fade-in"}};e.a=a},function(t,e,n){"use strict";function a(){return{currentPage:this.currentPage,previousPage:this.previousPage,nextPage:this.nextPage,isAnimating:this.isAnimating,activePage:this.activePage,inactivePage:this.inactivePage,currentAnimation:this.currentAnimation}}e.a=a},function(t,e,n){"use strict";function a(t,e){var n=this,a=Object.keys(this[t]);i.a.each(a,function(e,a){n[t][e](n.__getRouterData(),function(t){a(t)})},function(t){e(t)})}e.a=a;var o=n(1),i=n.n(o)},function(t,e,n){"use strict";function a(t,e){var n;for(n in this[t])this[t][n](this.__getRouterData());e&&e()}e.a=a},function(t,e,n){"use strict";function a(t,e){var n=this,a={};if(a.date=new Date,"navigate"===t){a.kind=t,a.page=this.nextPage,this.History.push(a);var i=!!this.currentPage&&o.SamsonApp.Pages[this.currentPage].isBackSafe;this.previousPage=i?this.currentPage:o.SamsonApp.Pages[this.nextPage].previousPage,this.currentPage=this.nextPage}else"back"===t?(a.kind=t,a.page=this.previousPage,this.History.push(a),this.currentPage=this.previousPage,this.previousPage=o.SamsonApp.Pages[this.currentPage].previousPage):"failed"===t&&o.SamsonApp.DEBUG&&o.SamsonApp.log("The Samson Router event failed: "+e);if("update"!==t&&"failed"!==t){var s=this.inactivePage;this.inactivePage=this.activePage,this.activePage=s}this.nextPage=!1;var r=this.Queue.shift();r?"navigate"===r.kind?setTimeout(function(){n.isBusy=!1,n.navigate(r.next_page,r.animation,r.callback)},20):this.back(r.callback):this.isBusy=!1}e.a=a;var o=n(0)},function(t,e,n){"use strict";function a(t){var e={};e.current="none",e.next="none";var n;for(n in this.Animations)if(t===n){e.current=this.Animations[n].current,e.next=this.Animations[n].next;break}return e}e.a=a},function(t,e,n){"use strict";function a(t,e){function n(){o.SamsonApp.DOM[a.inactivePage].classList.remove(t.next),o.SamsonApp.DOM[a.activePage].classList.remove(t.current),a.isAnimating=!1,a.currentPage?a.Cache[a.currentPage].__remove(function(){a.__cache||delete a.Cache[a.currentPage],e()}):e()}var a=this;o.SamsonApp.DOM[this.inactivePage].classList.add(t.next,"active"),o.SamsonApp.DOM[this.activePage].classList.add(t.current),o.SamsonApp.DOM[this.activePage].classList.remove("active"),this.__doFirstNoCallback("duringAnimate");var r=Object(s.a)("animations");"none"!==t.next?Object(i.a)(o.SamsonApp.DOM[this.inactivePage],r,n):n()}e.a=a;var o=n(0),i=n(20),s=n(21)},function(t,e,n){"use strict";function a(t,e,n){t.addEventListener(e,function a(o){return t.removeEventListener(e,a),n()})}e.a=a},function(t,e,n){"use strict";function a(t){if("transitions"===t&&o)return o;if("animations"===t&&i)return i;var e,n=document.createElement("fake"),a={transitions:{transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"},animations:{animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"}};for(e in a[t])if(void 0!==n.style[e]){if("transitions"===t)return o=a[t][e];if("animations"===t)return i=a[t][e]}}e.a=a;var o,i},function(t,e,n){"use strict";function a(t,e,n){var a=this;if(this.isAnimating=!0,"update"===e)this.Cache[t].__render(!0,null,function(){a.Cache[t].__loaded=!0,a.Cache[t].onLoad(),a.__doFirst("beforeAnimate",function(e){a.Cache[t].onVisible(),n&&n()})});else{var i=this.__getAnimationData(e);document.activeElement.blur(),this.Cache[t].__render(!1,o.SamsonApp.DOM[this.inactivePage],function(){a.Cache[t].__loaded=!0,a.Cache[t].onLoad(),a.__doFirst("beforeAnimate",function(e){a.__doAnimation(i,function(){a.Cache[t].onVisible();var e=o.SamsonApp.DOM[a.inactivePage].querySelector(".SF");e&&(setTimeout(function(){e.focus();var t=e.value;e.value="",e.value=t},0),e.classList.remove("SF")),n&&n()})})})}}e.a=a;var o=n(0)},function(t,e,n){"use strict";function a(t,e,n){var a=this;if(this.isBusy)this.Queue.push({kind:"navigate",next_page:t,animation:e,callback:n}),o.SamsonApp.DEBUG&&o.SamsonApp.log("The Samson Router is busy. This event is #"+a.Queue.length+" in line");else{this.isBusy=!0;var s=e||this.navigateAnimation;"update"===s&&t!==this.currentPage&&(s=this.navigateAnimation),this.nextPage=t,this.__doFirst("beforeNavigate",function(e){o.SamsonApp.Pages[t]||e||(e="That page does not exist"),e?a.__updateHistory("failed",e):(t===a.currentPage?s="update":a.Cache[t]||(a.Cache[t]=new i.a(o.SamsonApp.Pages[t],!1)),a.currentAnimation=s,a.__animate(t,s,function(){a.__doFirstNoCallback("afterAnimate"),"update"===s?a.__updateHistory("update"):a.__updateHistory("navigate"),a.__doFirst("afterNavigate",function(t){n&&n()})}))})}}e.a=a;var o=n(0),i=n(2)},function(t,e,n){"use strict";function a(t){Object.keys(t.__routerEvents).forEach(function(e){o.SamsonApp.Router[e][t.__uuid]=t.__routerEvents[e].bind(t)})}e.a=a;var o=n(0)},function(t,e,n){"use strict";function a(){var t,e=this.element.querySelectorAll("[autofocus='autofocus']");for(t=0;t<e.length;t++){var n=e[t];0==t&&n.classList.add("SF"),n.removeAttribute("autofocus"),n.blur()}}e.a=a},function(t,e,n){"use strict";function a(t,e,n){var a=this;this.__loadSubComponents(t,function(){a.__initialStateSet||(a.state=a.setInitialState(),a.__initialStateSet=!0),a.__doFirst("beforeRender",function(){a.isPage?(a.element||(a.element=document.createElement("div"),a.element.id=a.path+"-page",a.element.innerHTML=a.__template(a.__templateData),e.appendChild(a.element),a.delegate=i()(a.element)),(t||a.__stateChanged)&&(t=!0,a.element.innerHTML=a.__template(a.__templateData))):(!a.element||t||a.__stateChanged)&&(t=!0,a.element=document.getElementById(a.el),a.element?a.__template&&(a.element.innerHTML=a.__template(a.__templateData)):(a.element=document.createElement(a.tag),a.element.id=a.el,a.__template&&(a.element.innerHTML=a.__template(a.__templateData)),a.parent&&a.parent.element?a.parent.element.appendChild(a.element):s.SamsonApp.DEBUG&&s.SamsonApp.log("There is no parent Samson Component to append "+a.el+" to."))),a.__loadEvents(function(){a.__renderSubComponents(t,function(){a.__stateChanged=!1,a.__fixAutoFocusElements(),a.__doFirst("afterRender",function(){a.isPage||a.__loaded||(a.__loaded=!0,a.onLoad()),n&&n()})})})})})}e.a=a;var o=n(5),i=n.n(o),s=n(0)},function(t,e,n){"use strict";function a(t,e){var n=this;if("object"==typeof t){var a=!1;Object.keys(t).forEach(function(e){Object(i.a)(n.state[e],t[e])||(n.state[e]=t[e],a=!0)}),a&&(this.__stateChanged=!0,!e&&n.__loaded&&this.__render(!1))}else o.SamsonApp.DEBUG&&o.SamsonApp.log("A valid object was not passed into the Samson Component's setState function")}e.a=a;var o=n(0),i=n(28);n(4)},function(t,e,n){"use strict";function a(t,e){return JSON.stringify(t)===JSON.stringify(e)}e.a=a},function(t,e,n){"use strict";function a(t){var e=this.setInitialState();this.setState(e,t)}e.a=a},function(t,e,n){"use strict";function a(){this.state={},this.__render(!0)}e.a=a},function(t,e,n){"use strict";function a(){this.__render(!0)}e.a=a},function(t,e,n){"use strict";function a(t,e){this[t](function(t){e(t)})}e.a=a},function(t,e,n){"use strict";function a(t){var e=this;i.a.parallel({loadDOMEvents:function(t){if(e.__loadedDOMEvents.length)t();else{var n=Object(r.a)(e),a=n.element,o=n.delegate;i.a.each(e.__DOMEvents,function(t,n){t.selector?o.on(t.type,t.selector,t.handler,t.onCapture):a.addEventListener(t.type,t.handler,t.onCapture),e.__loadedDOMEvents.push(t),n()},function(){t()})}},loadAppEvents:function(t){e.__loadedAppEvents.length?t():i.a.each(e.__AppEvents,function(t,n){s.SamsonApp.on(t.type,t.handler,e),e.__loadedAppEvents.push(t),n()},function(){t()})}},function(){t&&t()})}e.a=a;var o=n(1),i=n.n(o),s=n(0),r=n(4)},function(t,e,n){"use strict";function a(t){var e=this;i.a.parallel({destroyDOMEvents:function(t){if(e.__loadedDOMEvents.length){var n=Object(r.a)(e),a=n.element,o=n.delegate;i.a.each(e.__DOMEvents,function(t,e){t.selector?o.off(t.type,t.selector,t.handler,t.onCapture):a.removeEventListener(t.type,t.handler,t.onCapture),e()},function(){e.__loadedDOMEvents=[],t()})}else t()},destroyAppEvents:function(t){e.__loadedAppEvents.length?i.a.each(e.__AppEvents,function(t,e){s.SamsonApp.off(t.type,t.handler),e()},function(){e.__loadedAppEvents=[],t()}):t()}},function(){t&&t()})}e.a=a;var o=n(1),i=n.n(o),s=n(0),r=n(4)},function(t,e,n){"use strict";function a(t,e){var n=this;if(!this.__componentsLoaded||t){var a=Object.keys(this.__components);i.a.each(a,function(t,e){n.Components[t]||(n.Components[t]=new s.a(n.__components[t],!1),n.Components[t].parent=n),e()},function(){n.__componentsLoaded=!0,e&&e()})}else e&&e()}e.a=a;var o=n(1),i=n.n(o),s=n(2)},function(t,e,n){"use strict";function a(t,e){var n=this,a=Object.keys(this.__components);i.a.each(a,function(e,a){n.Components[e].__render(t,null,function(){a()})},function(){e()})}e.a=a;var o=n(1),i=n.n(o)},function(t,e,n){"use strict";function a(t){var e=this,n=Object.keys(this.__components);i.a.each(n,function(t,n){e.Components[t].__remove(function(){delete e.Components[t],n()})},function(){e.__componentsLoaded=!1,t()})}e.a=a;var o=n(1),i=n.n(o)},function(t,e,n){"use strict";function a(t){var e=this;this.__doFirst("beforeRemove",function(){e.__destroySubComponents(function(){e.__destroyEvents(function(){e.element&&e.element.parentNode&&e.element.parentNode.removeChild(e.element),delete e.element,Object.keys(e.__routerEvents).forEach(function(t){delete o.SamsonApp.Router[t][e.__uuid]}),delete e.delegate,e.state={},e.__initialStateSet=!1,e.__doFirst("afterRemove",function(){t&&t()})})})})}e.a=a;var o=n(0)},function(t,e,n){"use strict";const a=["path","el","element","tag","name","template","childOf","previousPage","isBackSafe","backAnimation","style","Components","components","router","Router","events","DOMEvents","AppEvents","state","setState","resetState","clearState","setInitialState","beforeRender","afterRender","onLoad","onVisible","beforeRemove","render","parent","on","emit","off"];e.a=a},function(t,e,n){"use strict";const a=["blur","error","focus","load","resize","scroll"];e.a=a},function(t,e,n){"use strict";function a(t,e){"function"==typeof t&&(e=t);var n=this;if(n.isBusy)n.Queue.push({kind:"back",callback:e}),o.SamsonApp.DEBUG&&o.SamsonApp.log("The Samson Router is busy. This event is #"+n.Queue.length+" in line");else{var a;n.isBusy=!0,n.__doFirst("beforeBack",function(s){var r;if("string"==typeof t?o.SamsonApp.Pages[t]?(n.previousPage=t,r=!0):a="The requested page to go back to does not exist":n.previousPage||(!1!==o.SamsonApp.Pages[n.currentPage].previousPage?n.previousPage=o.SamsonApp.Pages[n.currentPage].previousPage:!1!==o.SamsonApp.Pages[n.currentPage].childOf?n.previousPage=o.SamsonApp.Pages[n.currentPage].childOf:a="There is no page to go back to"),!0===o.SamsonApp.Pages[n.previousPage].isBackSafe||r||(a="The previous page isn't safe to go back to"),a||s)n.__updateHistory("failed",s||a);else{n.nextPage=n.previousPage,n.Cache[n.previousPage]||(n.Cache[n.previousPage]=new i.a(o.SamsonApp.Pages[n.previousPage],!1));var c=o.SamsonApp.Pages[n.currentPage].backAnimation||n.backAnimation;n.currentAnimation=c,n.__animate(n.previousPage,c,function(){n.__doFirstNoCallback("afterAnimate"),n.__updateHistory("back"),n.__doFirst("afterBack",function(t){e&&e()})})}})}}e.a=a;var o=n(0),i=n(2)},function(t,e,n){"use strict";function a(t){var e=t.getHours(),n=t.getMinutes(),a=t.getSeconds(),o=t.getMilliseconds();return(e<10?"0"+e:e)+":"+(n<10?"0"+n:n)+":"+(a<10?"0"+a:a)+"."+("00"+o).slice(-3)}function o(t,e){if(e){var n=function(){};const o=t?"["+t+"]-[":"[";return n.toString=function(){return o+a(new Date)+"]"},console.log.bind(console,"%s",n)}return i.a}e.a=o;var i=n(3)},function(t,e,n){"use strict";function a(t,e,n){return e=void 0!==e&&null!==e&&!1!==e?e:"",n||(e=JSON.stringify(e)),localStorage.setItem(t,e),!0}function o(t,e){var n,a=localStorage.getItem(t);return a&&(n=e?a:JSON.parse(a)),n}function i(t){return localStorage.removeItem(t),!0}function s(){return localStorage.clear(),!0}function r(){return Object.keys(localStorage)}function c(){for(var t={},e=Object.keys(localStorage),n=e.length;n--;){var a=e[n];t[a]=o(a)}return t}const u={save:a,set:a,find:o,get:o,remove:i,delete:i,removeAll:s,deleteAll:s,clear:s,keys:r,items:c};e.a=u},function(t,e,n){"use strict";function a(){o.SamsonApp.DOM.App=document.getElementById("App"),o.SamsonApp.DOM.Pages=document.getElementById("Pages"),o.SamsonApp.DOM.Page_1=document.getElementById("Page_1"),o.SamsonApp.DOM.Page_2=document.getElementById("Page_2")}e.a=a;var o=n(0)},function(t,e,n){"use strict";function a(t){function e(t,e){return function(n){s.SamsonApp.DEBUG&&s.SamsonApp.log("Running all "+t+"Launch tasks"),i.a.series(e,function(){s.SamsonApp.DEBUG&&s.SamsonApp.log("All "+t+"Launch tasks have completed successfully"),n()})}}function n(t){s.SamsonApp.DEBUG&&s.SamsonApp.log("Loading all top-level components");var e=s.SamsonApp.__components,n=s.SamsonApp.Components;i.a.each(Object.keys(e),function(t,a){n[t]=new r.a(e[t],!1),n[t].parent={element:s.SamsonApp.DOM.App,delegate:s.SamsonApp.delegate},n[t].__render(!1,null,function(){a()})},function(){s.SamsonApp.DEBUG&&s.SamsonApp.log("All top-level components were loaded successfully"),t()})}function a(t){s.SamsonApp.DEBUG&&s.SamsonApp.log("Configuring all modules");var e=s.SamsonApp.Modules;i.a.each(Object.keys(e),function(t,n){e[t].configure&&e[t].configure(),n()},function(){s.SamsonApp.DEBUG&&s.SamsonApp.log("All modules were configured successfully"),t()})}var o=t.before||[],c=t.after||[],u=[n,a];return function(){const t=window.cordova?"deviceready":"DOMContentLoaded";document.addEventListener(t,function(){s.SamsonApp.DEBUG&&s.SamsonApp.log(t),i.a.series([e("before",o),e("during",u),e("after",c)],function(t,e){s.SamsonApp.emit("app:ready"),s.SamsonApp.loadState()})},!1)}}e.a=a;var o=n(1),i=n.n(o),s=n(0),r=n(2)},function(t,e,n){"use strict";const a=["Components","Config","Data","delegate","DOM","Modules","Name","Router","launch","loadState","log","Pages","Setup","Storage","on","emit","off"];e.a=a}])});
//# sourceMappingURL=samson.js.map