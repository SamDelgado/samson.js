'use strict';

var gulp = require('gulp');
var rename = require("gulp-rename");

/******************************************************************/

// bundle our javascript with browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {

  var browserify_options = {
    entries: ['./lib/index.js']
  };

  var browserifyStream = browserify(browserify_options)
    .bundle()
    .pipe(source('samson.js'))
    .pipe(gulp.dest("./"))
    .on("err", function(err) {
      console.log(err);
    })

  return browserifyStream;

});

// uglify our bundles javascript for production
var uglify = require('gulp-uglify');

gulp.task('uglify', ['browserify'], function () {

  var uglifyStream = gulp.src("./samson.js")
    .pipe(uglify({
      mangle: true,
      compress: {},
      output: {}
    }))
    .pipe(rename("samson.min.js"))
    .pipe(gulp.dest("./"))
    .on("err", function(err) {
      console.log(err);
    })

  return uglifyStream;

});

/************** Gulp Tasks *****************/
gulp.task('build', ['browserify', 'uglify']);
