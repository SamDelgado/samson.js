
// cached functions for better performance
export function emptyFunction() {}
export function justCallback(cb) { if (cb) cb() }
//export function justCallbackTrue(cb) { cb(true) }
export function justReturnObject() { return {} }
