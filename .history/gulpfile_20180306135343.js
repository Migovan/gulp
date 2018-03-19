const gulp = require('gulp'),
	  stylus = require('gulp-stylus'),
	  browserSync = require('browser-sync').create(),
   	  del = require('del'),
	  rev = require('gulp-rev'),
	  pug = require('gulp-pug');


gulp.task('styles', function () {
	return gulp.src('frontend/styles/main.styl')
	.pipe(stylus())
	.pipe(cssnano())
	.pipe(gulp.dest('public/styles'));
});

gulp.task('pug', function () {
	return gulp.src('frontend/assets/*.pug')
	.pipe(pug({
	  pretty: true
	}))
	.pipe(gulp.dest('frontend/assets'))
  });

gulp.task('clean', function () {
	return del('public');
});

gulp.task('assets', function () {
	return gulp.src('./frontend/assets/**', {since: gulp.lastRun('assets')})
	.pipe(gulp.dest('./public'));
});

gulp.task('styles:assets', function () {
	return gulp.src('./frontend/styles/**/*.png', {since: gulp.lastRun('styles:assets')})
	.pipe(gulp.dest('./public/styles'));
});

gulp.task('build', gulp.series('clean', 'styles:assets', 'styles', 'assets'));


gulp.task('watch', function () {
	gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
	gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
	gulp.watch('frontend/styles/**/*.png', gulp.series('styles:assets'));
});


gulp.task('serve', function () {
	browserSync.init({
		server: 'public'
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});



gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));