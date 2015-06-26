
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
      height: "100%",
      padding: "20px"
    },

    "#new-todo-textarea": {
      width: "100%",
      "font-size": "1.5rem",
      "line-height": 1.2,
      padding: "4px",
      "margin-bottom": "40px",
      "background-color": Colors.white,
      "border-radius": "5px",
      "border": "3px solid " + Colors.gray
    },

    "#new-todo-submit-button": {
      width: "100%",
      "height": "40px",
      "background-color": Colors.turquoise,
      "border-radius": "5px",
      color: Colors.white,
      "font-size": "2.5rem",
      "line-height": "40px",
      "text-align": "center",
      "vertical-align": "middle"
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    // update the value of the current todo in localStorage and resize the textarea if necessary
    'input #new-todo-textarea': function(e) {

      // store the current value of the new ToDo Item
      App.Models.TodoItem = App.DOM.new_todo_textarea.value;
      db.save("TodoItem", App.DOM.new_todo_textarea.value);

    },

    // validate the todo and add it to the Todos collection
    'touch #new-todo-submit-button': function() {

      var todo = App.DOM.new_todo_textarea.value;

      App.DOM.new_todo_textarea.value = "";
      autosize.update(App.DOM.new_todo_textarea);

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
