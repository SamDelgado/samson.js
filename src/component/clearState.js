
// make the state an empty object. this is different than resetState

export default function clearState() {

  this.state = {};
  this.__render(true);

}
