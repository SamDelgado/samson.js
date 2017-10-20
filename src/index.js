/*!
 * Samson.js
 * Copyright(c) 2013-2017 Sam Delgado
 * MIT Licensed
 */

import createSamsonApp from './app/createSamsonApp.js';

export var SamsonApp = {};

export const Samson = {

  VERSION: '0.6.11', // this keeps in sync with the package.json version

  APP_CREATED: false, // this will be set to true once the app is created, and is used to prevent any other Samson Apps from being created

  App: SamsonApp,

  createApp: createSamsonApp

};
