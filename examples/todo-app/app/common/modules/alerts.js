// /alert.js - App Alerts and Notifications

// alerts are passed an options object that can contain a message, title,
// and optional data object
// if the options argument is a string and not an object, then we assume that this is the message
// to display in the alert

function createAlert(options, alert_type) {

  var message;
  var title;
  var data;

  if (typeof options === 'string') {
    message = options;
  }

  if (typeof options === 'object') {

    if (options.message) {
      message = options.message;
    }

    if (options.title) {
      title = options.title;
    }

    if (options.data) {
      data = options.data;
    }

  }

  var html_string;
  var alert_row_id = "alert-row-" + Date.now();
  var alert_id = "alert-" + Date.now();


  if (!title && !data) {
    html_string = "<div id='" + alert_row_id + "' class='alert-row'><div id='" + alert_id + "' class='alert alert-" + alert_type + " fade-in'>" + message + "</div></div>";
  } else if (!title && data) {
    html_string = "<div id='" + alert_row_id + "' class='alert-row'><div id='" + alert_id + "' class='alert alert-" + alert_type + " fade-in'>" + message + "</div></div>";
  } else if (title && !data) {
    html_string = "<div id='" + alert_row_id + "' class='alert-row'><div id='" + alert_id + "' class='alert alert-" + alert_type + " fade-in'>" + message + "</div></div>";
  }

  // add the alert to the page, and fade it out after 5 seconds
  // first check if the #alert-box exists
  if (!$('#alert-box')) {

    var alert_box_html = "<div id='alert-box'>" + html_string + "</div>";
    $('body').append(alert_box_html);

  } else {

    $('#alert-box').append(html_string);

  }

  setTimeout(function() {
    var the_alert = document.getElementById(alert_id);

    the_alert.classList.remove("fade-in");
    the_alert.classList.add("fade-out");

    setTimeout(function() {
      $("#" + alert_row_id).remove();
    }, 500);

  }, 3000);

};

var Alert = {

  success : function(options) {

    createAlert(options, "success");

  },

  error : function(options) {

    createAlert(options, "error");

  },

  info : function(options) {

    createAlert(options, "info");

  },

  powerup : function(options) {

    createAlert(options, "powerup");

  }

};

module.exports = Alert;
