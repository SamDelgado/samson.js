
var Samson = require('samson.js');

var success_color = "green";
var error_color = "red";
var info_color = "blue";

module.exports = {

  el: 'samson_alerts_container',
  style: {

    "#samson_alerts_container": {
      position: "absolute",
      top: "60px", right: "10px", bottom: "10px", left: "10px",
      "text-align": "center"
    },

    ".samson_alert_row": {
      width: "100%",
      "text-align": "center",
      "margin-bottom": "5px"
    },

    ".samson_alert": {
      display: "inline-block",
      position: "relative",
      "z-index": 11,
      padding: "0 8px 0 8px",
      "font-size": "1.3rem",
      "line-height": "1.4",
      color: "#fff",
      "text-align": "center",
      "background-color": "blue",
      border: "2px solid blue",
      "border-radius": "5px",
      opacity: 0,
      transition: "all 0.3s ease"
    },

    ".samson_alert.show": {
      opacity: 1
    }

  },

  domEvents: {


  },

  appEvents: {},

  extend: {

    createAlert: function(options, color) {

      var message; var title; var data;

      if (typeof options === 'string' || typeof options === 'number') {
        message = options;
      } else if (typeof options === 'object') {

        if (options.message) {
          message = options.message;
        }

        if (options.title) {
          title = options.title;
        }

        if (options.data) {
          data = options.data;
        }

      } else {
        throw new Error("You must pass a string or object into the alert function");
      }

      var html_string;
      var alert_row = document.createElement("div");
      alert_row.id = "alert-row-" + Date.now();
      alert_row.classList.add("samson_alert_row");

      var alert = document.createElement("div")
      alert.id = "alert-" + Date.now();
      alert.classList.add("samson_alert");
      alert.style.backgroundColor = color;
      alert.style.borderColor = color;
      alert.textContent = message;

      alert_row.appendChild(alert);

      // append the alert row to the samson_alerts_container
      var firstChild = Samson.App.DOM.samson_alerts.firstChild;
      if (firstChild) {
        Samson.App.DOM.samson_alerts.insertBefore(alert_row, firstChild);
      } else {
        Samson.App.DOM.samson_alerts.appendChild(alert_row);
      }

      // initiate the alert fade in
      alert.classList.add("show");

      setTimeout(function() {

        alert.classList.remove("show");

        setTimeout(function() {
          alert_row.parentNode.removeChild(alert_row);
        }, 500);

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
