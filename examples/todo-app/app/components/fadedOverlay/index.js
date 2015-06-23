
module.exports = {

  el: 'samson_faded_overlay',
  style: {

    "#samson_faded_overlay": {
      "background-color": "#000",
      position: "absolute",
      top: "60px",
      left: 0,
      right: 0,
      bottom: 0,
      "z-index": 10,
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.2s linear, visibility 0s linear 0.2s"
    },

    "#samson_faded_overlay.show": {
      opacity: "0.6",
      visibility: "visible",
      "transition-delay": "0s"
    }
  },

  domEvents: {

    'touch' : function(event) {
      this.element.classList.remove("show");
      App.emit("faded-overlay:hit");
    }

  },

  appEvents: {

    'faded-overlay:show': function() {
      this.element.classList.add("show");
    },

    'faded-overlay:hide': function() {
      this.element.classList.remove("show");
    },

    'header-button:hit': function() {
      this.element.classList.add("show");
    }

  },

  extend: {},

  router: {
    beforeAnimate: function(data, callback) {

      callback();
    },

    duringAnimate: function(data) { // no callback

    }
  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the faded overlay element
    App.DOM.samson_faded_overlay = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the faded overlay element from the cache
    delete App.DOM.samson_faded_overlay;

    callback();

  }

};
