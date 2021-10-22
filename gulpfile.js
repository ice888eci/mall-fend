const gulp = require('gulp')
const zip = require('gulp-zip')

gulp.task('copy', function() {
  return gulp.src('run/*').pipe(gulp.dest('dist/'))
})

gulp.task('zip', () =>
  gulp
    .src('dist/**/*')
    .pipe(zip('code.zip'))
    .pipe(gulp.dest('./'))
)
