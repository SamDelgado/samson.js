# Samson.js

[![Build Status via Travis CI](https://travis-ci.org/SamDelgado/samson.js.svg?branch=master)](https://travis-ci.org/SamDelgado/samson.js)
[![NPM version](http://img.shields.io/npm/v/samson.js.svg)](https://www.npmjs.org/package/samson.js)

A performant and easy to learn mobile app framework that will allow you to rapidly build native-like apps that target modern devices (iOS 8+ / Android 4+). Used with Browserify, Samson is a great foundation for your next Cordova/Phonegap app. A specific project structure is recommended for maximum productivity. Full app examples can be found in the examples folder.

## Disclaimer

Samson.js is under heavy development and does not currently have a stable API. I will be working hard to complete the basic documentation, and start creating tests so that people can feel comfortable using this in their next project. I would love to get any feedback about Samson's architecture, complexity, or code quality.

## Installation and Usage

```bash
$ npm install samson.js
```

```js
var Samson = require('samson.js')(false); // pass true when requiring Samson to make the 'App' object global by default
var Config = {}; // Samson config data goes here

Samson.createApp(Config, function(app) { // if you passed true when requiring Samson then the app object will not be passed back in this callback since it is already global

  // app is now initialized
  console.log(app);

});
```
## When Should You Use It?

  * You need a framework that solves the hardest SPA (single page app) structural problems and then gets out of your way
  * You need robust page routing and animated transitions that just work
  * You want to use the most popular mobile interface elements like headers, tabs, or side menus
  * You want to get started with Cordova/Phonegap development but just don't know where to start (A full Cordova ToDo App example is provided in the examples folder)
  * You want to be told exactly how to structure your project files and folders so that you can just start writing code
  * You would love to a have a premade build script that automatically packages your app for you
  * You want to be able to quickly and easily add new features and components to your app

## When Shouldn't You Use It?

  * Your app has no concept of pages
  * You are making an app that you want to run on older mobile devices (anything older than iOS 8 or Android 4)
  * You want the most flexible framework possible (check out: http://backbonejs.org/)
  * You have a strong opinion about the best way to structure projects (You probably won't see eye to eye with Samson)
  * You don't enjoy using or aren't interested in learning Browserify/CommonJS

## Features

  * A CSS Reset for Cordova/Phonegap apps (from: https://github.com/ivangabriele/Cordova-CSS-Reset)
  * An extensible page router with default transition animations
  * "Pages" and "Components" that automatically handle their whole lifecycle. No more "zombie" views or event listeners
  * Lots more that I will add here later...

## Framework Comparison

  * Need to fill this out

## To Do

  * Documentation the codebase
  * Complete Cordova ToDo App example
  * Add Tests
  * Go into detail about why Samson was created and how best to use it
  * Refactor any confusing code

## Getting Started
