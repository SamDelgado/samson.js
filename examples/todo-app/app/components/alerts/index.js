
var Samson = require('samson.js');

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
