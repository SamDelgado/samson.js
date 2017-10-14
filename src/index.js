/*!
 * Samson.js
 * Copyright(c) 2013-2017 Sam Delgado
 * MIT Licensed
 */

import createSamsonApp from './app/createSamsonApp.js';

export var SamsonApp = {};

export const Samson = {

  _VERSION_: '0.6.0', // this keeps in sync with the package.json version

  _APP_CREATED_: false, // this will be set to true once the app is created, and is used to prevent any other Samson Apps from being created

  App: SamsonApp,

  createApp: createSamsonApp

};
