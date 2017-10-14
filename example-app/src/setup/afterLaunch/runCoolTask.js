/* Run this method after the app launches */

module.exports = function runCoolTask(callback) { // fire the callback when done

  DEBUG && App.log('Running a cool task');

  // run the cool task here

  callback();

};
