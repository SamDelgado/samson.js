
var Samson = require('samson.js');

module.exports = {

  el: 'samson_sidemenu',
  template: require("./template.jade"),

  domEvents: {

    // handle any .samson_sidemenu_item being touched
    'touch .samson_sidemenu_item': function(event, target) {

      // make sure the router isn't already busy before accepting any events from the sidemenu
      if (!Samson.App.Router.isBusy) {

        var path = target.getAttribute("data-page");

        // set selected as true on the targeted side_menu_item
        Samson.App.Data.sideMenu.pages.forEach(function(page) {
          if (page.path === path) {
            Samson.App.Data.sideMenu.selected = path;
          }
        });

        // force the sidemenu to rerender if the selected sidemenu_item has changed
        this.resetState();

        // only navigate if we aren't already on the selected page
        if (path !== Samson.App.Router.currentPage) {

          // remove the focus_element so that it doesn't try to refocus during the page animation
          delete Samson.App.DOM.samson_focus_element;

          // navigate to the new page
          Samson.App.Router.navigate(path, "right");

        } else {
          this.closeSideMenu();
          Samson.App.emit("side-menu:hit");
        }

      }

    }

  },

  appEvents: {

    'header:menu-button:hit': function() {
      this.toggleSideMenu();
    },

    'faded-overlay:hit': function() {
      if (this.isOpen) {
        this.closeSideMenu();
      }
    }

  },

  extend: {

    isOpen: false,

    closeSideMenu: function() {
      this.element.classList.remove("open");
      this.isOpen = false;

      // restore focus to the element that had focus before the sideMenu was open
      if (Samson.App.DOM.samson_focus_element) {
        Samson.App.DOM.samson_focus_element.focus();

        // move the cursor to the end of the text
        var value_length = Samson.App.DOM.samson_focus_element.oldCursorPosition === undefined ? false : Samson.App.DOM.samson_focus_element.oldCursorPosition;
        value_length = (value_length === false) ? Samson.App.DOM.samson_focus_element.value.length : value_length;
        Samson.App.DOM.samson_focus_element.setSelectionRange(value_length, value_length);

        delete Samson.App.DOM.samson_focus_element;
      }

    },

    openSideMenu: function() {
      this.element.classList.add("open");
      this.isOpen = true;

      // hide the keyboard and remove focus from an input/textarea element if necessary
      if (document.activeElement !== document.body) {
        Samson.App.DOM.samson_focus_element = document.activeElement;
        Samson.App.DOM.samson_focus_element.oldCursorPosition = Samson.App.DOM.samson_focus_element.selectionStart;

        Samson.App.DOM.samson_focus_element.blur();
      }

    },

    toggleSideMenu: function() { // if the sidemenu is closed then open it, if open then close it
      if (this.isOpen) {
        this.closeSideMenu();
      } else {
        this.openSideMenu();
      }
    }

  },

  router: {

    // make sure that the side menu is closed before any new page is transitioned to
    beforeAnimate: function(data, callback) {

      if (this.isOpen  && data.currentAnimation !== "update") {
        this.closeSideMenu();
      }

      callback();
    }

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {

      pages: Samson.App.Data.sideMenu.pages,
      selected: Samson.App.Data.sideMenu.selected

    };

    return state;

  },

  // this function runs after the Component is rendered
  afterRender : function(callback) {

    // cache the sidemenu element
    Samson.App.DOM.samson_sidemenu = this.element;

    callback();

  },

  // this function runs right before the Component is destroyed
  beforeRemove : function(callback) {

    // delete the sidemenu element from the cache
    delete Samson.App.DOM.samson_sidemenu;

    callback();

  }

};
