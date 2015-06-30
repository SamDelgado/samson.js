var async = require('async-lite');
var Log = require('modules/log');

module.exports = function() {

  async.parallel({

    // do things here before we navigate to the first page
    loadDeviceEvents: function(callback) {
      callback(null);
    },

  }, function(err) {

    if (err) {
      Log("Error loading the app");
    } else {

      Log("App is done loading");

      App.emit("app:initialized");

      // Navigate to the Home page
      App.Router.navigate("home", "fade");

    }

  });

};
