
import createBaseSamsonAppObject from './createBaseSamsonAppObject.js';

export default function createSamsonApp (SamsonAppBundle) {
  // make sure a Samson App hasn't already been created
  if (!this.APP_CREATED) {
    if (SamsonAppBundle && typeof SamsonAppBundle === 'object') {
      // Create the base App object
      createBaseSamsonAppObject(SamsonAppBundle);

      // the Samson App is now created
      this.APP_CREATED = true;

      this.App.DEBUG && this.App.log('The Samson App is now created');

      return this.App;
    } else {
      console.log('[Samson] A Samson App object was not passed to Samson.createApp(), or a SamsonAppBundle was not automatically built');
    }
  } else {
    console.log('[Samson] A Samson App has already been created. Only 1 Samson App can exist at a time.');
  }
}
