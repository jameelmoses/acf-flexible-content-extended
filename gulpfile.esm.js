/* eslint-env node */

import gulp from 'gulp';

import del from 'del';

import eslint from 'gulp-eslint';

const sass = require('gulp-sass')(require('sass'));
import Fiber from 'fibers';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

gulp.task('clean', () => del(['assets/css/acf-flexible-content-extended.css', 'assets/js/acf-flexible-content-extended.js']));

gulp.task('sass', () => gulp.src('assets/src/acf-flexible-content-extended.scss')
  .pipe(sass({
    fiber: Fiber,
    outputStyle: 'expanded',
    errLogToConsole: true
  }))
  .pipe(postcss([
    autoprefixer({
      cascade: false,
      grid: true
    })
  ]))
  .pipe(gulp.dest('assets/css/'))
);

gulp.task('js:lint', () => gulp.src('assets/src/acf-flexible-content-extended.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

gulp.task('js:dist', () => gulp.src('assets/src/acf-flexible-content-extended.js')
  .pipe(gulp.dest('assets/js/'))
);

gulp.task('js', gulp.series('js:lint', 'js:dist'));

gulp.task('default', gulp.series('clean', gulp.parallel('sass', 'js')));
