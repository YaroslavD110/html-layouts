var syntax = "sсss"; // Syntax: sass or scss;
var path = require("path");
var gulp = require("gulp"),
  gutil = require("gulp-util"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  cleancss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  autoprefixer = require("gulp-autoprefixer"),
  notify = require("gulp-notify"),
  rsync = require("gulp-rsync");

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });
});

gulp.task("styles", function() {
  return gulp
    .src("./app/scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", notify.onError()))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  return gulp
    .src([
      "./app/libs/jquery/dist/jquery.min.js",
      "./app/libs/modal-video/js/jquery-modal-video.min.js",
      "./app/libs/OwlCarousel2-2.3.4/dist/owl.carousel.min.js",
      "./app/js/common.js" // Always at the end
    ])
    .pipe(concat("scripts.min.js"))
    .pipe(uglify()) // Mifify js (opt.)
    .pipe(gulp.dest("./app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", ["styles", "js", "browser-sync"], function() {
  gulp.watch("./app/scss/**/*.scss", ["styles"]);
  gulp.watch("./app/js/common.js", ["js"]);
  gulp.watch("./app/*.html", browserSync.reload);
});

gulp.task("default", ["watch"]);
