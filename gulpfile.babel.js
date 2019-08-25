/* eslint-env node */

import gulp from 'gulp';
const $ = require('gulp-load-plugins')();
import del from 'del';
import autoprefixer from 'autoprefixer';

gulp.task('clean', () => del(['assets/css/acf-flexible-content-extended.css', 'assets/js/acf-flexible-content-extended.js']));

gulp.task('sass', () => gulp.src('assets/src/acf-flexible-content-extended.scss')
  .pipe($.sass({
    outputStyle: 'expanded',
    errLogToConsole: true
  }))
  .pipe($.postcss([
    autoprefixer({
      cascade: false,
      grid: true
    })
  ]))
  .pipe(gulp.dest('assets/css/'))
);

gulp.task('js:lint', () => gulp.src('assets/src/acf-flexible-content-extended.js')
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError())
);

gulp.task('js:transpile', () => gulp.src('assets/src/acf-flexible-content-extended.js')
  .pipe($.babel({
    presets: ['@babel/preset-env']
  }))
  .pipe(gulp.dest('assets/js/'))
);

gulp.task('js', gulp.series('js:lint', 'js:transpile'));

gulp.task('default', gulp.series('clean', gulp.parallel('sass', 'js')));
