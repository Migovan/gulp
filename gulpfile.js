const gulp = require('gulp'),
      stylus = require('gulp-stylus'),
      concat = require('gulp-concat');

gulp.task('styles', function () {
	return gulp.src('frontend/styles/main.styl')
	.pipe(stylus())
	// .pipe(concat('all.css'))
	.pipe(gulp.dest('public'));
});

gulp.task('assets', function () {
	return gulp.src('fronted/assets/**', {since: gulp.lastRun('assets')})
	.pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series('styles', 'assets')
	);



gulp.task('watch', function () {
	gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
    gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('dev', gulp.series('build', 'watch'));