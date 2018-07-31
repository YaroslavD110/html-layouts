var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	rename       = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	cssNano      = require('gulp-cssnano'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache');

gulp.task("sass", function() {
	return gulp.src("app/sass/*.sass")
			.pipe(sass())
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
			.pipe(gulp.dest("app/css"))
			.pipe(cssNano())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest("app/css"))
			.pipe(browserSync.reload({stream: true}));
});

gulp.task("csslibs", ["sass"], function() {
	return gulp.src("app/sass/libs.sass")
			.pipe(cssNano())
			.pipe(rename({suffix: ".min"}))
			.pipe(gulp.dest("app/css"));
});

gulp.task("scripts", function() {
	return gulp.src([
			"app/libs/jquery/dist/jquery.min.js",
			"app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js",
			"app/libs/owl-carousel/owl-carousel/owl.carousel.min.js",
			"app/libs/page-scroll-to-id/jquery.malihu.PageScroll2id.js",
			"app/libs/magnific-popup/dist/jquery.magnific-popup.min.js",
			"app/libs/magnific-popup/dist/jquery.magnific-popup.js"
		])
			.pipe(concat("libs.min.js"))
			.pipe(uglify())
			.pipe(gulp.dest("app/js"));
});

gulp.task("browser-sync", function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task("img", function() {
	return gulp.src("app/img/**/*")
			.pipe(cache(imagemin({
				interlaced: true,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				une: [pngquant()]
			})))
			.pipe(gulp.dest("dist/img"));
});

gulp.task("clear", function() {
	return cache.clearAll();
});

gulp.task("start", ["browser-sync", "csslibs", "scripts"], function() {
	gulp.watch("app/sass/*.sass", ["sass"]);
	gulp.watch("app/*.html", browserSync.reload);
	gulp.watch("app/js/**/*.js", browserSync.reload);
});

gulp.task("clean", function() {
	return del.sync("dist");
});

gulp.task("build", ["clean", "sass", "scripts", "img"], function() {
	var bildCss = gulp.src("app/css/**/*.min.css")
		.pipe(gulp.dest("dist/css"));

	var buildFonts = gulp.src("app/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"));

	var buildJS = gulp.src("app/js/**/*.js")
		.pipe(gulp.dest("dist/js"));

	var buildHtml = gulp.src("app/*.html")
		.pipe(gulp.dest("dist"));
});