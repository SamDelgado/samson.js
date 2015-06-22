# Samson.js

A performant and easy to learn mobile app framework that will allow you to rapidly build native-like apps that target modern devices (iOS 7+ / Android 4+). Used with Browserify, Samson is a great foundation for your next Cordova/Phonegap app. A specific project structure is recommended for maximum productivity. Full app examples can be found in the examples folder.

## Installation and Usage

```bash
$ npm install samson.js
```

```js
var Samson = require('samson.js');
var App = Samson.createApp();
var options = {};

App.configure(options, function() {

  // The App is initialized
  console.log("Showtime!");

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
  * You love Javascript. So much so that you would write your CSS in JS/JSON files if you could (with Samson.js you can)

## When Shouldn't You Use It?

  * Your app has no concept of pages
  * You want the most flexible framework possible (check out: http://backbonejs.org/)
  * You have a strong opinion about the best way to structure projects (You probably won't see eye to eye with Samson)
  * You don't enjoy using or aren't interested in learning Browserify/CommonJS

## Features

  * A CSS Reset for Cordova/Phonegap apps (from: https://github.com/ivangabriele/Cordova-CSS-Reset)
  * An extensible page router with default transition animations
  * "Pages" and "Components" that automatically handle their whole lifecycle. No more "zombie" views or event listeners
