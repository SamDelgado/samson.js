
module.exports = {

  el: 'samson_transparent_overlay',
  style: {

    "#samson_transparent_overlay": {
      "background-color": "#000",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      "z-index": 10,
      opacity: 0,
      visibility: "hidden"
    },

    "#samson_transparent_overlay.show": {
      visibility: "visible"
    }
  },

  domEvents: {

    'touch' : function(event) {
      console.log("Tranparent Overlay Hit");
      App.emit("transparent-overlay:hit");
    }

  },

  appEvents: {

    'transparent-overlay:show': function() {
      this.element.classList.add("show");
    },

    'transparent-overlay:hide': function() {
      this.element.classList.remove("show");
    }

  },

  extend: {},

  router: {

    beforeAnimate: function(data, callback) {

      this.element.classList.add("show");
      callback();
    },

    afterAnimate: function(data, callback) {
      this.element.classList.remove("show");
      callback();
    }

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    // cache the transparent overlay element
    App.DOM.samson_transparent_overlay = this.element;

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    // delete the transparent overlay element from the cache
    delete App.DOM.samson_transparent_overlay;

    callback();

  }

};
