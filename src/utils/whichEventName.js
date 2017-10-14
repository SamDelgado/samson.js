
var transition_name;
var animation_name;

export default function whichEventName(event_type) {

  if (event_type === 'transitions' && transition_name) {

    return transition_name;

  } else if (event_type === 'animations' && animation_name) {

    return animation_name;

  } else {

    var key;
    var el = document.createElement('fake');
  
    var event_names = {
      transitions : {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
      },
      animations : {
        'animation':'animationend',
        'OAnimation':'oAnimationEnd',
        'MozAnimation':'animationend',
        'WebkitAnimation':'webkitAnimationEnd'
      }
    };
 
    for (key in event_names[event_type]) {
      if(el.style[key] !== undefined){

        if (event_type === 'transitions') {
          transition_name = event_names[event_type][key];
          return transition_name;
        } else if (event_type === 'animations') {
          animation_name = event_names[event_type][key];
          return animation_name;
        }

      }
    }

  }

}
