
var db = require('modules/db');

module.exports = function Todos() {

  var todos = db.get("Todos") || [];

  this.add = function(todo_text) {

    // give the todo a unique id
    var todo = {
      _id : "todo-" + Date.now(),
      text: todo_text
    };

    todos.push(todo);

    // resave the array of todos in localStorage
    db.save("Todos", todos);

  };

  this.remove = function(todo_id) {

    for (var i=0; i<todos.length; i++) {
      // remove the todo from the todos array if the _id's match
      if (todos[i]._id === todo_id) {
        todos.splice(i, 1);
        break;
      }
    }

    // resave the array of todos in localStorage
    db.save("Todos", todos);

  };

  this.update = function(todo_id, todo_text) {

    for (var i=0; i<todos.length; i++) {
      if (todos[i]._id === todo_id) {
        todos[i].text = todo_text;
        break;
      }
    }

    // resave the array of todos in localStorage
    db.save("Todos", todos);

  };

  this.get = function(todo_id) {

    for (var i=0; i<todos.length; i++) {
      if (todos[i]._id === todo_id) {
        return todos[i];
      }
    }

  };

  this.getAll = function() {
    return todos.slice(0);
  };

  this.reset = function() {

    todos = [];

    db.save("Todos", []);

  };

};
