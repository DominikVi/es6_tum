var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    del = require('del');

// Scripts
gulp.task('scripts', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({modules: 'amd'}))
    .on('error', function(err) {
      console.log(err.message);
      this.end();
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/js'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('scripts');
});
