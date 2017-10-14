// check if two objects are equal by stringifying and comparing them

export default function isEqual(a, b) {

  return JSON.stringify(a) === JSON.stringify(b);

}
