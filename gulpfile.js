'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const csso = require('postcss-csso');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');

// Styles

const styles = () => {
  return gulp.src('src/css/style.css')
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
};

exports.styles = styles;

// Images

const images = () => {
  return gulp.src('src/assets/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.mozjpeg({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('dist/assets'));
};

exports.images = images;

// Html

const html = () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
};

exports.html = html;

// Clean

const clean = () => {
  return del('dist');
};

exports.clean = clean;

const build = gulp.series(
  gulp.parallel(
    styles,
    html,
    images
  )
);

exports.build = build;
