// Include gulp
var gulp = require('gulp');

// Gulp load plugins
var $ = require('gulp-load-plugins')();

// Include plugins
var gutil = require('gulp-util');
var cmq = require('gulp-combine-media-queries');
var browserSync = require('browser-sync').create();

// Error handler
var onError = function (error) {
	$.notify.onError({
		title: "Gulp Error in " + error.plugin,
		message: "\nError: " + error.message.substr(error.message.indexOf('static'))
	})(error);
	gutil.log();
	this.emit('end');
};

// Paths
var paths = {

	dist: 'static/dist',

	img: {
		src : 'static/**/*.{png,jpg,svg}',
		dest : 'static/'
	},

	css: {
		src: 'static/css',
		file: 'static/css/style.css'
	},

	scss: {
		src: 'static/scss/**/*',
		main: 'static/scss/style.scss'
	},

	js: {
		src: 'static/js/',
		main: 'static/js/js.js',
		watch: 'static/js/**/*',
		scripts: [
			// PLUGINS
			'static/js/vendor/jquery.js',
			// CUSTOM
			'static/js/main.js'
		]
	}

};

// Image min
gulp.task('imagemin', function(){
	return gulp.src(paths.img.src)
		.pipe($.imagemin({expand: true}))
		.pipe(gulp.dest(paths.img.dest))
});

// Build CSS
gulp.task('buildCSS', function () {
	return gulp.src(paths.css.file)
		.pipe(cmq())
		.pipe($.cssnano())
		.pipe($.rename('style.min.css'))
		.pipe(gulp.dest(paths.dist))
});

// Compile SCSS to CSS
gulp.task('sass', function() {
	return gulp.src(paths.scss.main)
		.pipe($.plumber({errorHandler: onError}))
		.pipe($.sourcemaps.init())
		.pipe($.sass())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.css.src));
});

// Concat JS
gulp.task('scripts', function() {
	return gulp.src(paths.js.scripts)
		.pipe($.concat('js.js'))
		.pipe(gulp.dest(paths.js.src))
});

// Build JS
gulp.task('buildJS', function () {
	return gulp.src(paths.js.main)
		.pipe($.uglify())
		.pipe($.rename('js.min.js'))
		.pipe(gulp.dest(paths.dist))
});


// BrowserSync.io
gulp.task('browser-sync', function() {
	browserSync.init([
		'static/css/*.css',
		'static/dist/*.css',
		'*.html',
		'*.php',
		'views/**/*.php',
		'static/js/*.js'
	]);
});

// Watch Files For Changes
gulp.task('watchAll', function() {
	gulp.watch(paths.js.watch, ['scripts']);
	gulp.watch(paths.scss.src, ['sass']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watchAll']);
gulp.task('build', ['buildCSS', 'buildJS']);