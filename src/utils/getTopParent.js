// get the topmost parent component of the current component

export default function getTopParent(component) {

  if (component.parent) {

    return getTopParent(component.parent);

  } else {

    return component;
    
  }

}
