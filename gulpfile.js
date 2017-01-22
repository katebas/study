var gulp = require('gulp'),
	styl = require('gulp-stylus'),
	cleaner = require('gulp-clean-css'),
	autoprefix = require('gulp-autoprefixer'),
	connect = require('gulp-connect');

gulp.task('styl', function(){
	return gulp.src('./stylus/*.styl')
				.pipe(styl())
				.pipe(cleaner())
				.pipe(autoprefix({
					browsers: ['last 10 versions']
				}))
				.pipe(gulp.dest('./css'))
				.pipe(connect.reload());
});

gulp.task('start', function(){
	return connect.server({
		livereload: true
	});
});

gulp.task('reload', function(){
	return gulp.src(['./*.html', './js/*.js'])
				.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['./*.html', './js/.js'], gulp.series('reload'));
	gulp.watch(['./stylus/*.styl'], gulp.series('styl'));
});

gulp.task('default', function(){
	return gulp.parallel('start', 'watch')();
});