
var Samson = require('samson.js');

module.exports = {

  el: 'samson_alerts',
  style: {

    "#samson_alerts": {
      "background-color": "#000",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      "z-index": 10,
      opacity: 0,
      visibility: "hidden"
    }

  },

  domEvents: {


  },

  appEvents: {},

  extend: {


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
