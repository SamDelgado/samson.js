/* Load the App's event listeners here */

module.exports = function loadEventListeners(callback) { // fire the callback when done

  Object.keys(EventListeners).forEach(function(event) {
    document.addEventListener(event, EventListeners[event], false);
  });

  DEBUG && App.log('Event listeners loaded successfully');

  callback();

};

const EventListeners = {

  // handle Cordova's pause event
  'pause': function() {

    App.Data.PausedTime = Date.now();

    DEBUG && App.log('App paused');

    if (DEBUG) {

      App.Data.pauseCounter = 1;
      var lastLogCounter = 1;
      App.Data.pauseInterval = setInterval(function() {

        // log the amount of time the app has been paused every 10 seconds
        if (lastLogCounter >= 10) {
          App.log('App paused for - ' + App.Data.pauseCounter + ' seconds');
          lastLogCounter = 0;
        }

        App.Data.pauseCounter++;
        lastLogCounter++;

      }, 1000);

    }

  },

  // handle Cordova's resume event
  'resume': function() {

    if (App.Data.PausedTime) App.Data.PausedTime = Date.now() - App.Data.PausedTime;
    else App.Data.PausedTime = 0;

    DEBUG && App.log("App resumed");

    App.loadState();

    if (DEBUG) {
      clearInterval(App.Data.pauseInterval);
      App.log('The app and state have reloaded after being closed for ' + App.Data.pauseCounter + ' seconds');
      delete App.Data.pauseCounter;
    }

  },

  // Handle Cordova's backbutton event on Android
  'backbutton': function() {

    App.Router.back();

  }

};
