# Samson.js

[![NPM version](http://img.shields.io/npm/v/samson.js.svg)](https://www.npmjs.org/package/samson.js)

A performant and easy to learn JavaScript framework that will allow you to rapidly build apps targeted for modern browsers.

## Installation and Usage

```bash
$ npm install samson.js
```

### CommonJS or ES6
```js
var Samson = require('samson.js');
var SamsonAppConfig = require('./config');
/*          or          */
import Samson from 'samson.js';
import { SamsonAppConfig } from './config';

var App = Samson.createApp(SamsonAppConfig);

global.App = App; // Make 'App' global for quick access in all of your files

App.launch(); // The app is now launched
```

## Getting Started

  * [Components](docs/components.md)
  * [Pages](docs/pages.md)
  * [Router](docs/router.md)
  * [Modules](docs/modules.md)

## Features

  * A CSS Reset for Cordova/Phonegap apps (from: https://github.com/ivangabriele/Cordova-CSS-Reset)
  * An extensible page router with default transition animations and the ability to easily add your own
  * "Pages" and "Components" that automatically handle their whole lifecycle

