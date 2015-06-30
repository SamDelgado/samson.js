
var Utils = require('common/utils');
var autosize = require('autosize');

module.exports = {

path: 'viewTodos',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),

  extend: {
    fullscreen: false,
  },

  domEvents : {

    // remove a todo item if the remove button is touched
    'touch .todo-item-remove-button' : function(e, target) {

      var todo_id = target.parentNode.getAttribute("data-id");

      App.emit("alert:error", todo_id + " destroyed");

      // remove the autosize listener on this items textarea
      autosize.destroy(target.parentNode.querySelector("textarea"));

      App.Collections.Todos.remove(todo_id);
      this.resetState();

    },

    // remove focus from any textarea if the user touches off of it
    'touch #viewTodos-page': function(e) {
      console.log("touched the page");

      if (e.target.id === "viewTodos-page") {
        document.activeElement.blur();
      }

    },

    // store the new array of todos if any todo item's value is updated
    'input .todo-item-text': function(e) {

      var todo_id = e.target.parentNode.getAttribute("data-id");
      var todo_text = e.target.value;

      App.Collections.Todos.update(todo_id, todo_text);
      this.resetState();

    }

  },

  appEvents : {},

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      todos: App.Collections.Todos.getAll()
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    App.Data.Header.title = "Your ToDo List";

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    autosize(this.element.querySelectorAll("textarea"));

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    autosize.destroy(this.element.querySelectorAll("textarea"));

    callback();

  }

};
