/*!
 * Samson.js
 * Copyright(c) 2013-2017 Sam Delgado
 * MIT Licensed
 */

module.exports = Samson = {_VERSION: '0.5.1'}; // Keep version in sync with package.json

global.App = Samson.App = {_isConfigured: false}; // expose the App as a global object

Samson.log = console.log.bind(console, '[Samson]'); // Custom Logging prefixed with [Samson]

Samson.createComponent = require('./createComponent');
Samson.createRouter = require('./createRouter');

Samson.createApp = require('./createApp'); // Function that will be called to create and configure the Samson.App object
