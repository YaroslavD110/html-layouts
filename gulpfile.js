/* ******************************************* */
/*                 Modules                     */
/* ******************************************* */
const gulp = require("gulp");
const sass = require("gulp-sass");
const less = require("gulp-less");
const browserSync = require("browser-sync");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const log = require("fancy-log");
const colors = require("colors/safe");
const image = require("gulp-image");
const del = require("del");

/* ******************************************* */
/*                  Settings                   */
/* ******************************************* */
const settings = {
  // Main settings
  preprocessor: "less", // You can use: [ "sass", "scss", "less" ]
  mainCssFile: "main", // Name of main styles file
  jsLibsName: "libs", // Name of file with all js libs
  mainJsFile: "main", // Name of file with custom scripts
  allScripts: "scripts" // Name of file with all scripts
};

const path = {
  // Paths setup
  build: "dist", // Build directory
  src: "src" // Source directory
};

/* ******************************************* */
/*                Gulp tasks                   */
/* ******************************************* */

// Starting local browser task
gulp.task("BrowserSync", function() {
  browserSync.init({
    server: {
      baseDir: `${path.src}`
    },
    notify: false
    // open: false,
    // online: false, // Work Offline Without Internet Connection
  });
});

// Less compiling task
gulp.task("styles", function() {
  const lang = settings.preprocessor;
  let styles = null;

  // Log task
  log.info(colors.green(`Building ${lang} files`));

  // Choosing preprocessor for compiling
  if (lang === "less") {
    styles = less; // Choose less
  } else {
    styles = sass; // Choose sass
  }

  // Return task instance
  return gulp
    .src(`./${path.src}/${lang}/**/[^_]*.${lang}`) // Get files
    .pipe(styles().on("error", notify.onError())) // Compiling styles
    .pipe(gcmq().on("error", notify.onError())) // Group media queries
    .pipe(autoprefixer([ "last 15 versions" ])) // Use autoprefixer
    .pipe(rename({ suffix: ".min" })) // Add ".min" suffix for files
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Clean css
    .pipe(gulp.dest(`./${path.src}/css`)) // Get out files in dist directory
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Scripts compiling task
// ** Compiling JSLibs
gulp.task("JSLibs", function() {
  // Log task
  log.info(colors.green("Building js libraries"));

  // Compile libs scripts
  return gulp
    .src([
      // Get js files
      "./node_modules/jquery/dist/jquery.min.js"
    ])
    .pipe(uglify().on("error", notify.onError())) // Miniify js files
    .pipe(concat(`${settings.jsLibsName}.min.js`)) // Concat files in one
    .pipe(gulp.dest(`./${path.src}/js`)); // Get out file in dist directory
});

// ** Compile custom scripts
gulp.task("CustomJS", function() {
  // Log task
  log.info(colors.green("Minify scripts"));

  // Return task instance
  return gulp
    .src(`./${path.src}/js/${settings.mainJsFile}.js`) // Get file
    .pipe(uglify().on("error", notify.onError())) // Minify code
    .pipe(
      // Add sufix for file
      rename({ suffix: ".min" })
    )
    .pipe(gulp.dest(`./${path.src}/js`)); // Get out file in dist directory
});

// ** Concat all scripts
gulp.task("ConcatJS", function() {
  // Log task
  log.info(colors.green("Concating all scripts"));

  // Return task instance
  return gulp
    .src([
      // Get js files
      `./${path.src}/js/${settings.jsLibsName}.min.js`,
      `./${path.src}/js/${settings.mainJsFile}.min.js`
    ])
    .pipe(concat(`${settings.allScripts}.min.js`)) // Concat js files
    .pipe(gulp.dest(`./${path.src}/js`)) // get out scripts in dist directory
    .pipe(browserSync.reload({ stream: true })); // Reload browser
});

// Builld task
// ** Dest files
gulp.task("dest", function() {
  // Log task
  log.info(colors.green("Get out files in build directory"));

  // Dest images
  gulp.src(`./${path.src}/img/**/*`).pipe(gulp.dest(`./${path.build}/img`));
  // Dest fonts
  gulp.src(`./${path.src}/fonts/**/*`).pipe(gulp.dest(`./${path.build}/fonts`));
  // Dest styles
  gulp
    .src(`./${path.src}/css/${settings.mainCssFile}.min.css`)
    .pipe(gulp.dest(`./${path.build}/css`));
  // dest sccripts
  gulp
    .src(`./${path.src}/js/${settings.allScripts}.min.js`)
    .pipe(gulp.dest(`./${path.build}/js`));
  // Dest html
  return gulp.src(`./${path.src}/**/*.html`).pipe(gulp.dest(`./${path.build}`));
});

// ** Clean build derictory
gulp.task("CleanDist", function() {
  // Log task
  log.info(colors.green("Cleaning build directory"));

  // Return task instance
  return del(`./${path.build}`);
});

// ** Images minifing
gulp.task("ImagesMinify", function() {
  // Log task
  log.info(colors.green("Minifing images"));

  // Return task instance
  return gulp
    .src(`./${path.src}/img/**/*`) // Get images
    .pipe(image()) // Minify images
    .pipe(gulp.dest(`./${path.src}/img`)); // Get out in dist directory
});

// ** Building project
gulp.task(
  "build",
  gulp.series(
    "CleanDist",
    "styles",
    "JSLibs",
    "CustomJS",
    "ConcatJS",
    "ImagesMinify",
    "dest"
  )
);

// Watch task
gulp.task("watch", function() {
  const lang = settings.preprocessor;

  // Watch for html files changing
  gulp.watch(`./${path.src}/**/*.html`).on("change", browserSync.reload);
  // Watch for styles files changing
  gulp.watch(`./${path.src}/${lang}/**/*.${lang}`, gulp.parallel("styles"));
  gulp.watch(
    // Watch for js files changing
    `./${path.src}/js/${settings.mainJsFile}.js`,
    gulp.series("CustomJS", "ConcatJS")
  );
});

// Default task
gulp.task(
  "default",
  gulp.series(
    "styles",
    "JSLibs",
    "CustomJS",
    "ConcatJS",
    gulp.parallel("watch", "BrowserSync")
  )
);
