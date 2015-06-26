'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var run = require('gulp-run');
var replace = require('gulp-replace-task');

// set our device and environment variables
var production = false; // are we running the app in production

var destination = "./www";
var filename = "app";

/******************************************************************/

// bundle our javascript with browserify and move it to the /www folder
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {

  var browserify_options = {
    entries: ['./app/app.js'],
    debug: !production
  };

  // require aliases
  var aliasify_options = {
    aliases: {
      "samson.js": "../../lib",
      "common": "./app/common",
      "modules": "./app/common/modules",
      "utils": "./app/common/utils",
      "settings": "./app/common/settings",
      "pages": "./app/pages",
      "components": "./app/components"
    },
    verbose: false
  };

  var browserifyStream = browserify(browserify_options)
    .transform('jadeify') // auto converts our required jade templates into functions
    .transform('aliasify', aliasify_options)
    .bundle()
    .pipe(source(filename + '.js'))
    .pipe(gulp.dest(destination + "/js"))
    .on("err", function(err) {
      console.log(err);
    })

  return browserifyStream;

});

// uglify our bundles javascript for production
var uglify = require('gulp-uglify');

gulp.task('uglify', function () {

  var uglifyStream = gulp.src(destination + "/js/" + filename + ".js")
    .pipe(uglify({
      mangle: true
    }))
    .pipe(gulp.dest(destination + "/js"))
    .on("err", function(err) {
      console.log(err);
    })

  return uglifyStream;

});

// copy the assets to the www folder
gulp.task('copy-assets', function() {
  return gulp.src('./app/assets/**')
    .pipe(gulp.dest('./www/'));
});


// Live reload the cordova app
var liveReload = require('gulp-livereload');

var serverHost = require('ip').address();
var serverPort = 8000;

// Prepare the cordova app and reload the server
gulp.task('prepare-and-reload', function (callback) {
  run('cordova prepare').exec('preparing...', function() {
    liveReload.reload();
    callback();
  });
});

gulp.task('start-livereload-server', function(callback) {
  liveReload.listen();
  console.log("Livereload server now listening on port 35729");
  callback();
});

// Emulate the cordova app
gulp.task('cordova-emulate', function(callback) {
  var cordovaEmulateIOS = new run.Command('cordova emulate ios', {silent: true});
  var cordovaRunAndroid = new run.Command('cordova run android --device', {silent: true});
  cordovaEmulateIOS.exec();
  cordovaRunAndroid.exec();
  callback();
});

gulp.task('start-cordova-server', function(callback) {
  var cordovaServe = new run.Command('cordova serve', {silent: true});
  var cordovaEmulateIOS = new run.Command('cordova emulate ios'); // , {silent: true}
  var cordovaRunAndroid = new run.Command('cordova run android --device', {silent: true});
  cordovaServe.exec();
  cordovaEmulateIOS.exec();
  cordovaRunAndroid.exec();
  console.log('Cordova server now listening on port 8000');
  callback();
});

gulp.task('watch-for-file-changes',  function() {

  // watch for changes to the index.html file
  gulp.watch(['./app/assets/index.html'], ['copy-html']);

  // watch for changes to the app's JS or jade files
  gulp.watch(['./app/**/*.js', './app/**/*.jade'], ['build-js']);

  // watch for changes to the Samson.js lib files
  gulp.watch(['../../lib/**/*.js'], ['build-js']);

});

// html injection
gulp.task('inject-html', function() {
  return gulp.src('./www/index.html')
    .pipe(replace({
      patterns: [
        {
          match: /<head>/,
          replacement: "<head><script type='text/javascript' src='http://" + serverHost + ":35729/livereload.js?snipver=1'></script>"
        },
        {
          match: /<\/body>/,
          replacement: "<script>document.addEventListener('deviceready', function () {var __devSite = 'http://" + serverHost + ":" + serverPort + "/';if (!/^http/.test(location)) {var contentPath = /\\/www\\/.+$/.exec(location)[0];__devSite = __devSite + cordova.platformId + contentPath;location.replace(__devSite);}}, false);</script></body>"
        }
      ]
    }))
    .pipe(gulp.dest('./www/'))
});

function developmentBuild(callback) {
  production = false;
  runSequence('browserify', 'copy-assets', 'inject-html', 'start-livereload-server', 'start-cordova-server', 'watch-for-file-changes', callback);
}

/***************** Gulp Tasks *********************/
// Build the app for development
gulp.task('default', developmentBuild); // gulp
gulp.task('dev', developmentBuild); // gulp dev

// Build the app for production (uglified)
gulp.task('prod', function(callback) {
  production = true;
  runSequence('browserify', 'uglify', 'copy-assets', callback);
});

gulp.task('copy-html', function(callback) {
  runSequence('copy-assets', 'inject-html', 'prepare-and-reload', callback);
});

gulp.task('build-js', function(callback) {
  runSequence('browserify', 'prepare-and-reload', callback);
});
