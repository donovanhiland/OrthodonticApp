var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

var scssPath = 'public/assets/styles/scss/*.scss';
var scssDest = 'public/assets/styles';
var appJsPath =  'public/app/**/*.js';
var appJsDest = 'public/assets/js';

gulp.task('styles', function() {
  return gulp.src(scssPath)
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(scssDest));
});

gulp.task('frontend-scripts', function() {
  return gulp.src(appJsPath)
  // .pipe(ngmin())
  .pipe(concat('all.js'))
  // .pipe(uglify())
  .pipe(gulp.dest(appJsDest));
});

gulp.task('default', function() {
  gulp.watch(appJsPath, ['frontend-scripts']);
  gulp.watch(scssPath, ['styles']);
});
