
var autosize = require('autosize');

module.exports = {

path: 'viewTodos',
  subPageOf: false,
  previousPage: false,
  backSafe: true,
  template: require("./template.jade"),
  style: {

    "#viewTodos-page": {
      position: "absolute",
      width: "100%",
      height: "100%",
      padding: "20px 20px 0 20px",
    },

    ".todo-item": {
      display: "inline-block",
      position: "relative",
      "margin-bottom": "15px",
      "width": "92%"
    },

    ".todo-item-text": {
      width: "100%",
      "background-color": Colors.blue,
      color: Colors.white,
      "border-radius": "4px",
      padding: "4px",
      "font-size": "1.5rem",
      "line-height": 1.2,
      "border": "3px solid " + Colors.blue
    },

    ".todo-item-text:focus": {
      "background-color": Colors.white,
      color: Colors.black
    },

    ".todo-item-remove-button": {
      position: "absolute",
      top: "6px", right: "-26px",
      width: "20px",
      height: "20px",
      "line-height": "20px",
      "font-size": "1.5rem",
      "text-align": "center",
      "vertical-align": "middle",
      "background-color": Colors.red,
      "border-radius": "5px",
      color: Colors.white
    }

  },

  extend: {
    fullscreen: false,
  },

  domEvents : {

    // remove a todo item if the remove button is touched
    'touch .todo-item-remove-button' : function(e, target) {

      var todo_id = target.parentNode.getAttribute("data-id");

      // remove the autosize listener on this items textarea
      autosize.destroy(target.parentNode.querySelector("textarea"));

      App.Collections.Todos.remove(todo_id);
      this.resetState();

    },

    // remove focus from any textarea if the user touches off of it
    'touch #viewTodos-page': function(e) {

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

    },

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
