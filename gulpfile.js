var gulp    = require('gulp'),
    pug     = require('gulp-pug'),
    sass    = require('gulp-sass'),
    prefix  = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'), // لعمل خريطة للكود
    concat  = require('gulp-concat'),
    minify  = require('gulp-minify'),
    notify  = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    zip = require('gulp-zip');


// Task Html
gulp.task('html', function(done) {
  done();
  return gulp.src('stage/html/**/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist'))
    .pipe(notify('Html In Done'))
    .pipe(livereload());
});

// Task Css
gulp.task('css', function(done) {
  done();
  return gulp.src(['stage/css/**/*.css', 'stage/css/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify('Css In Done'))
    .pipe(livereload());
});

// Task Javascript
gulp.task('js', function (done) {
  done();
  return gulp.src('stage/js/*.js')
    .pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify('Js In Done'))
    .pipe(livereload());
});

// Compress Files
gulp.task('compress', function (done) {
  done();
  return gulp.src('dist/**/*.*')
    .pipe(zip('WebSite.zip'))
    .pipe(gulp.dest('.'));
});


// Watch Task
gulp.task('watch', function() {
  require('./server.js');
  livereload.listen();
  gulp.watch('stage/html/**/*.pug', gulp.series('html'));
  gulp.watch(['stage/css/**/*.css', 'stage/css/**/*.scss'], gulp.series('css'));
  gulp.watch('stage/js/*.js', gulp.series('js'));
  gulp.watch('dist/**/*.*', gulp.series('compress'));

});

// Default Task
gulp.task('default', gulp.parallel('watch'));
