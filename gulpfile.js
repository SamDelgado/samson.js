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
    .ignore('jquery')
    .bundle()
    .pipe(source('samson.js'))
    .pipe(gulp.dest("./"))
    .on("err", function(err) {
      console.log(err);
    })

  return browserifyStream;

});

// uglify bundles javascript for production
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

// handle LESS compilation
var less = require('gulp-less');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('less', function() {

  var lessStream = gulp.src('./lib/less/index.less')
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(rename("samson.min.css"))
    .pipe(gulp.dest('./'))

  return lessStream;

});

/************** Gulp Tasks *****************/
gulp.task('default', ['browserify', 'uglify', 'less']);
