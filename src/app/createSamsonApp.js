
import createBaseSamsonAppObject from './createBaseSamsonAppObject.js';

function getSamsonAppBundle(SamsonAppBundle) {

  // A SamsonAppBundle object was passed to Samson.createApp()
  if (SamsonAppBundle && typeof SamsonAppBundle === 'object') {

    return SamsonAppBundle;

  // A SamsonAppBundle was automatically built by WebPack
  } else if (window._SAMSON_APP_BUNDLE_ && typeof window._SAMSON_APP_BUNDLE_ === 'object') {

    return window._SAMSON_APP_BUNDLE_;

  } else {

    return false;

  }

}

export default function createSamsonApp(SamsonAppBundle) {

  // make sure a Samson App hasn't already been created
  if (!this._APP_CREATED_) {

    var FoundSamsonAppBundle = getSamsonAppBundle(SamsonAppBundle);

    if (FoundSamsonAppBundle) {

      // Create the base App object
      createBaseSamsonAppObject(FoundSamsonAppBundle);

      // the Samson App is now created
      this._APP_CREATED_ = true;
           
      this.App.DEBUG && this.App.log("The Samson App is now created");

      return this.App;

    } else {

      console.log('[Samson] A Samson App object was not passed to Samson.createApp(), or a SamsonAppBundle was not automatically built');

    }

  } else {

    console.log('[Samson] A Samson App has already been created. Only 1 Samson App can exist at a time.');

  }

}
