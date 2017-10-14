/* Our App's Launch Configuration */

module.exports = {

  // Add any tasks that should run before, during, and after the app launches (loading assets, data, eventListeners, etc)
  // All tasks within each category will run in parallel.
  launchTasks: {

    before: [require('setup/beforeLaunch/loadData')],

    during: [require('setup/duringLaunch/loadAssets'), require('setup/duringLaunch/loadEventListeners')],

    after: [require('setup/afterLaunch/runCoolTask')]

  },

  loadState: function(callback) {

    // hide splashcreen

    //App.Router.navigate('entry', 'fade');

    DEBUG && App.log("The app's state has now been loaded");

    if (callback) callback();

  }

};
