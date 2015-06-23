'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');

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

gulp.task('uglify', ['browserify'], function () {

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

// Emulate the cordova app
gulp.task('cordova-emulate', shell.task(
  ['cordova emulate ios'], {quiet: true} // add 'cordova emulate android' if necessary
));

// Prepare the cordova app and reload the server
function prepareAndReload() {
  return gulp.src('')
    .pipe(shell(['cordova prepare'], {quiet: true}))
    .pipe(liveReload());
}

// Live reload the cordova app
var liveReload = require('gulp-livereload');
var http = require('http');
var ecstatic = require('ecstatic');

function liveReloadServer() {

  var host = require('ip').address();
  var port = 8000;
  var url = "http://" + host + ":" + port + "/";
  http.createServer(ecstatic({
    root: "platforms",
    cache: 0
  })).listen(port);

  liveReload.listen();

  console.log("Livereload server listening on port " + port);

  // watch for changes to the index.html file
  gulp.watch(['./www/index.html'], prepareAndReload);

  // watch for changes to the app's JS or jade files
  gulp.watch(['./app/**/*.js', './app/**/*.jade'], ['build-js']);

  // watch for changes to the Samson.js lib files
  gulp.watch(['../../lib/**/*.js'], ['build-js']);

}

function developmentBuild() {
  production = false;
  runSequence('browserify', 'copy-assets', 'cordova-emulate', liveReloadServer);
}

/***************** Gulp Tasks *********************/
// Build the app for development
gulp.task('default', developmentBuild); // gulp
gulp.task('dev', developmentBuild); // gulp dev

// Build the app for production (uglified)
gulp.task('prod', function(callback) {
  production = true;
  runSequence('uglify', 'copy-assets', callback);
});

gulp.task('build-js', ['browserify'], prepareAndReload);
