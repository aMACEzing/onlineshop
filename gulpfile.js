/// <binding BeforeBuild='build-all' ProjectOpened='build-all' />
var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

var root_path = {
    webroot: "./Public/",
    JS: "./Public/assets/js/",
    CSS: "./Public/assets/css/"
};



gulp.task('reference-js', function () {
    var s = './Angular/JS/Reference/*.js';
    gulp.src([s])
        .pipe(concat('reference.js'))
        .pipe(gulp.dest(root_path.JS));
});


gulp.task('System-js', function () {
    var s = './Angular/JS/System/*.js';
    gulp.src([s])
        .pipe(concat('system.js'))
        .pipe(gulp.dest(root_path.JS));
});

gulp.task('Misc-js', function () {
    var s = './Angular/JS/Misc/*.js';
    gulp.src([s])
        .pipe(concat('misc.js'))
        .pipe(gulp.dest(root_path.JS));
});

gulp.task('App-js', function () {
    var s = './Angular/JS/App/*.js';
    gulp.src([s])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(root_path.JS));
});

gulp.task('Reference-css', function () {
    var s = './Angular/CSS/Reference/*.css';
    gulp.src([s])
        .pipe(concat('reference.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(root_path.CSS));
});


gulp.task('copy-template', function () {
    gulp.src('./Angular/View/*.html')
        .pipe(gulp.dest(root_path.webroot));
});

gulp.task("build-all", ["reference-js", "System-js", "Misc-js", "App-js", "Reference-css", "copy-template"]);
//Build End
