
export default function getAnimationData(animation) {

  var data = {};
  data.current = "none";
  data.next = "none";

  var key;
  for (key in this.Animations) {
    if (animation === key) {
      data.current = this.Animations[key].current;
      data.next = this.Animations[key].next;
      break;
    }
  }

  return data;

}
