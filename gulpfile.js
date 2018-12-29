/*********************************************/
/*                 Modules                   */
/*********************************************/
const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const zip = require("gulp-zip");

/*********************************************/
/*                  Settings                 */
/*********************************************/
const settings = {
  // Main settings
  preprocessor: "less" // You can use: [ "sass", "scss", "less" ]
};

const path = {
  // Paths setup
  build: "./dist",
  src: "./src"
};
