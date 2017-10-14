/* Our app's Router configuration */

module.exports = {

  cache: false, // determines if the Router should cache loaded Pages (performance is great without caching and it might cause issues if turned on)
  defaultNavigateAnimation: "right", // the default animation to use when navigating to the next page
  defaultBackAnimation: "fade", // the default animation to use when going back to the last page

  // any custom animations that the Router can use
  animations: {
    // "right-lightspeed" : { current: "move-to-left-lightspeed", next: "move-from-right-lightspeed" } // - example custom animation
  },

  /* any methods that link into a Router event

    Event order:

    beforeNavigate / beforeBack : function(data, callback) {} - Must callback
    beforeAnimate : function(data, callback) {} - Must callback
    duringAnimate : function(data) {} - No callback
    afterAnimate : function(data, callback) {} - Must callback
    afterNavigate / afterBack : function(data, callback) {} - Must callback

  */
  events: {

    afterNavigate: function(routerData, callback) {

      const current_page = routerData.currentPage;

      DEBUG && App.log('Navigated to the ' +  current_page + ' page');

      // store the currentPage as "last_page" in the app's DB so that we can go right back to it when the app restarts or resumes after closing
      App.DB.save("last_page", current_page);
      App.Data.last_page = current_page;

      callback();

    },

    afterBack: function(routerData, callback) {

      const current_page = routerData.currentPage;

      DEBUG && App.log('Went back to the ' +  current_page + ' page');

      // store the currentPage as "last_page" in the app's DB so that we can go right back to it when the app restarts or resumes after closing
      App.DB.save("last_page", current_page);
      App.Data.last_page = current_page;

      callback();

    }

  }

};
