"use strict";

// Project Specific Variables
const projectPath 		= './';
const devPath 			= projectPath + '_dev';
const buildPath 		= projectPath + 'assets';
const projectURL 		= projectPath + './_site';

// npm packages
const gulp 				= require('gulp');
const gulpLoadPlugins 	= require('gulp-load-plugins');
const cp = require("child_process");
const rename			= require('gulp-rename');
const newer				= require('gulp-newer');
const path 				= require('path');
const sass 				= require('gulp-sass');
const autoprefixer 		= require('gulp-autoprefixer');
const cleanCSS 			= require('gulp-clean-css');
const concat 			= require('gulp-concat');
const uglify			= require('gulp-uglify');
const imagemin			= require('gulp-imagemin');
const pngquant			= require('imagemin-pngquant');
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");
const browsersync = require("browser-sync").create();
const del = require("del");
//const reload = browserSync.reload;
const $ = gulpLoadPlugins();


var paths = {
    styles: {
        src: "assets/**/*.scss",
        dest: "assets/css"
    }
};


// BrowserSync
function browserSync() {
	//console.log('browser sync');
  browsersync.init({
    server: {
      baseDir: "./_site/"
    },
	open: false,
	injectChanges: true,
    port: 3000,
	files: [buildPath + '/css/*.css', buildPath + '/js/*.js', projectPath + '*.html']
  });
 // done();
}


// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/css/"]);
}

function css() {

  return gulp
    .src([devPath + '/scss/index.scss'])
	.pipe(rename({ basename: "main" }))
    .pipe(sass({includePaths: ['node_modules/']}).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
	.pipe(cleanCSS())
    .pipe(gulp.dest("./assets/css/"))
	.pipe(browsersync.stream());
    //.pipe(browsersync.stream());
}


function js() {
	console.log('Scripts...');
	return (
		gulp
			.src([devPath + '/js/main.js'])
			//.pipe(plumber())
			.pipe(webpackstream(webpackconfig, webpack))
			//.pipe(uglify())
			// folder only, filename is specified in webpack config
			.pipe(gulp.dest(buildPath + '/js/'))
			.pipe(browsersync.stream())
	);
}

// function images() {
// 	return gulp
// 	.src([devPath + '/images/**/*.{png,jpg,gif,ico,svg}'])
// 	.pipe(newer(buildPath + '/images/'))
// 	.pipe(imagemin({
// 		progressive: true,
// 		use: [pngquant()]
// 	}))
// 	.pipe(gulp.dest(buildPath + '/images/'))
// }

// Jekyll
function jekyll() {
	console.log('recompile jekyll');
	return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}


function watchFiles() {
	css();
	js();
	jekyll();

	gulp.watch(
	    [
	      "./_dev/scss/**/*"
	    ],
	    gulp.series(css, browserSyncReload)
	);
	gulp.watch(
	    [
	      "./_dev/js/main.js"
	    ],
	    gulp.series(js, jekyll, browserSyncReload)
	);
	gulp.watch(
    [
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*",
      "./_projects/**/*"
    ],
	  gulp.series(jekyll, browserSyncReload)
	);
	//gulp.watch("./assets/img/**/*", images);
}


const jekylll = gulp.series(clean, gulp.parallel(css,js,jekyll));
const watch = gulp.parallel(watchFiles, browserSync);

gulp.task('default', watch);

exports.css = css;
exports.js = js;
exports.jekyll = jekyll;
exports.jekylll = jekylll;
exports.clean = clean;
exports.watch = watch;
exports.watchFiles = watchFiles;
