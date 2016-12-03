'use strict';

var gulp = require('gulp');
var rename = require("gulp-rename");

/******************************************************************/

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
gulp.task('default', ['less']);
