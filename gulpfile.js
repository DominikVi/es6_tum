var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    bower = require('gulp-bower'),
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

// Html
gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
});

// Css
gulp.task('css', function () {
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('dist'));
});

// Bower
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('dist/lib'));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/js', '*.html', '*.css'], cb);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('scripts', 'html', 'css', 'bower');
});

// Watch
gulp.task('watch', function() {

  // Watch .html files
  gulp.watch('app/**/*.html', ['html']);

  // Watch .css files
  gulp.watch('app/**/*.css', ['css']);

  // Watch .js files
  gulp.watch('app/js/**/*.js', ['scripts']);

});
