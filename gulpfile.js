const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const notify = require("gulp-notify");
const sass = require("gulp-sass");
const clean = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

// task for scss
gulp.task("scss", () => {
  gulp
    .src("./scss/**/*.scss")
    .pipe(sass())
    .on("error", notify.onError())
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(clean())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.stream());
});

// task for js
gulp.task("js", () => {
  gulp
    .src("./js/main.js")
    .pipe(uglify())
    .on("error", notify.onError())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("./js"))
    .pipe(browserSync.stream());
});

// default task
gulp.task("default", ["js", "scss"], () => {
  browserSync.init({
    server: "./",
    notify: false
  });

  gulp.watch("./**/*.html").on("change", browserSync.reload);
  gulp.watch("./js/**/*.js", ["js"]);
  gulp.watch("./scss/**/*.scss", ["scss"]);
});
