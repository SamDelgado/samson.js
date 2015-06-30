
var Samson = require('samson.js');

var success_color = "green";
var error_color = "red";
var info_color = "blue";

module.exports = {

  el: 'samson_alerts_container',

  domEvents: {},

  appEvents: {

    'alert:success': function(message) {
      this.createAlert(message, "success");
    },

    'alert:error': function(message) {
      this.createAlert(message, "error");
    },

    'alert:info': function(message) {
      this.createAlert(message, "info");
    },

    'alert': function(message, bg_color, text_color) {
      this.createAlert(message, "info", bg_color, text_color);
    }

  },

  extend: {

    createAlert: function(message, alert_type, bg_color, text_color) {

      if (typeof message === 'number') {
        message = message + "";
      } else if (typeof message !== 'string') {
        throw new Error("Alert messages must be a string or number");
      }

      var alert = document.createElement("div")
      alert.id = "alert-" + Date.now();
      alert.classList.add("samson_alert");

      // add the success or error alert class if that is the chosen alert_type
      if (!bg_color && !text_color && alert_type !== "info") alert.classList.add(alert_type + "_alert");

      // add the background color if provided
      if (bg_color) alert.style.backgroundColor = bg_color;

      // add the text color if provided
      if (text_color) alert.style.color = text_color;
      alert.textContent = message;

      // append the alert to the samson_alerts_container
      var firstChild = Samson.App.DOM.samson_alerts.firstChild;
      if (firstChild) {
        Samson.App.DOM.samson_alerts.insertBefore(alert, firstChild);
      } else {
        Samson.App.DOM.samson_alerts.appendChild(alert);
      }

      // initiate the alert fade in

      // use getComputedStyle to make sure the element is already added to the DOM before applying the transition class
      window.getComputedStyle(alert).cssText;
      alert.classList.add("show");

      // show the notification for 3 seconds before removing
      setTimeout(function() {

        alert.style.opacity = 0;

        setTimeout(function() {
          alert.parentNode.removeChild(alert);
        }, 800);

      }, 3000);

    },

    success: function(message) {
      this.createAlert(message, "success");
    },

    error: function(message) {
      this.createAlert(message, "error");
    },

    info: function(message) {
      this.createAlert(message, "info");
    },

    custom: function(message, bg_color, text_color) {
      this.createAlert(message, "info", bg_color, text_color);
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
