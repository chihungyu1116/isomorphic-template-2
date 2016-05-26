var gulp = require('gulp'),
  $ = require('gulp-load-plugins')();

gulp.task('css', function() {
  gulp.src('app/styles/main.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
      }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('./dist'));

  gulp.src('app/styles/bootstrap/bootstrap.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
      }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('./dist'));

  gulp.src('app/styles/fontawesome/font-awesome.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
      }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('./dist'));

  gulp.src(['app/styles/fonts/*']).pipe(gulp.dest('./dist/fonts'));
})

gulp.task('css:watch', function() {
  gulp.watch('app/styles/**/*.scss', ['css']);
});

gulp.task('css:build', ['css'], function() {
  gulp.src('./dist/main.css')
      .pipe($.rev())
      .pipe(gulp.dest('./dist'))
      .pipe($.rev.manifest())
      .pipe(gulp.dest('./dist'));

  gulp.src('./dist/bootstrap/bootstrap.css')
      .pipe($.rev())
      .pipe(gulp.dest('./dist'))
      .pipe($.rev.manifest())
      .pipe(gulp.dest('./dist'));

  gulp.src('./dist/fontawesome/font-awesome.css')
      .pipe($.rev())
      .pipe(gulp.dest('./dist'))
      .pipe($.rev.manifest())
      .pipe(gulp.dest('./dist'));

  gulp.src(['app/styles/fonts/*']).pipe(gulp.dest('./dist/fonts'));
})
