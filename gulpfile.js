(function () {

  var gulp = require('gulp');
  var del = require('del');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');
  var uglify = require('gulp-uglify');
  var conf = {
    src: 'src',
    dist: 'dist'
  };

  gulp.task('clean', function () {
    del(conf.dist);
  });

  gulp.task('uglify', function () {
    gulp.src(conf.src+'/*.js')
      .pipe(concat('Template.js'))
      //.pipe(uglify())
      //.pipe(rename({
      //  extname: '.min.js'
      //}))
      .pipe(gulp.dest('dist'));
  });

  gulp.task('default', ['clean', 'uglify']);

}());
