
module.exports = function resetState(dont_reload) {

  var new_state = this.setInitialState();
  this.setState(new_state, dont_reload);

};
