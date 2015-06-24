
var db = require('modules/db');
var autosize = require('autosize');

module.exports = {

  path: 'addTodos',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),
  style: {

    "#addTodos-page": {
      position: "absolute",
      width: "100%",
      height: "100%"
    },

    ".add-new-todo-box": {
      "margin": "40px 0 20px 0",
      "padding": "0 20px 0 20px",
      "width": "100%"
    },

    "#new-todo-textarea": {
      width: "100%",
      "font-size": "1.3rem",
      "line-height": 1.2,
      padding: "3px",
      "margin-bottom": "20px",
      "background-color": Colors.white,
      "border-radius": "5px",
      "border": "3px solid " + Colors.gray
    },

    "#new-todo-submit-button": {
      "width": "100%",
      "height": "30px",
      "background-color": Colors.turquoise,
      "border-radius": "5px",
      color: Colors.white,
      "font-size": "2rem",
      "line-height": "30px",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    'input #new-todo-textarea': function(e) {

      autosize.update(App.DOM.new_todo_textarea);

      // store the current value of the new ToDo Item
      App.Models.TodoItem = App.DOM.new_todo_textarea.value;
      db.save("TodoItem", App.DOM.new_todo_textarea.value);

    },

    'touch #new-todo-submit-button': function() {

      App.$("#new-todo-form").trigger("submit");

    },

    'submit #new-todo-form': function(e) {

      var todo = App.DOM.new_todo_textarea.value;

      App.DOM.new_todo_textarea.value = "";
      App.Models.TodoItem = "";
      db.remove("TodoItem");

      App.Collections.Todos.add(todo);

    }

  },

  appEvents : {},

  router: {

    afterAnimate: function(data, callback) {
      callback();
    }

  },

  // must synchronously return an object that will set the initial state of the component. this object will be passed to the templating engine
  setInitialState : function() {

    var state = {
      todo_item: App.Models.TodoItem
    };

    return state;

  },

  // this function runs before the Page is rendered
  beforeRender : function(callback) {

    App.Data.Header.title = "Add ToDos";

    // check if a TodoItem is already in localStorage
    if (App.Models.TodoItem === undefined) {
      App.Models.TodoItem = db.get("TodoItem") || "";
    }

    callback();

  },

  // this function runs after the Page is rendered
  afterRender : function(callback) {

    App.DOM.new_todo_textarea = document.getElementById("new-todo-textarea");

    autosize(App.DOM.new_todo_textarea);

    callback();

  },

  // this function runs right before the Page is destroyed
  beforeRemove : function(callback) {

    autosize.destroy(App.DOM.new_todo_textarea);

    delete App.DOM.new_todo_textarea;

    callback();

  }

};
