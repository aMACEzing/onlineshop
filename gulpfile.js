/// <binding BeforeBuild='build-all' ProjectOpened='build-all' />
var gulp = require("gulp"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");
version = require("gulp-version-append"),
  jsonchange = require("gulp-json-modify"),
  htmlmin = require('gulp-htmlmin'),
  fs = require("fs");

var root_path = {
  webroot: "./Public/",
  template: "./Public/template/",
  JS: "./Public/assets/js/",
  CSS: "./Public/assets/css/"
};



gulp.task('reference-js', function() {
  var s = './Angular/JS/Reference/*.js';
  gulp.src([s])
    .pipe(concat('reference.js'))
    .pipe(gulp.dest(root_path.JS));
});


gulp.task('System-js', function() {
  var s = './Angular/JS/Sy  stem/*.js';
  gulp.src([s])
    .pipe(concat('system.js'))
    .pipe(gulp.dest(root_path.JS));
});

gulp.task('Misc-js', function() {
  var s = './Angular/JS/Misc/*.js';
  gulp.src([s])
    .pipe(concat('misc.js'))
    .pipe(gulp.dest(root_path.JS));
});

gulp.task('App-js', function() {
  var s = './Angular/';
  gulp.src([s + 'JS/App/*.js',s + 'controller/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(root_path.JS));
});

gulp.task('Reference-css', function() {
  var s = './Angular/CSS/Reference/*.css';
  gulp.src([s])
    .pipe(concat('reference.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(root_path.CSS));
});


gulp.task('copy-template', function() {
  gulp.src('./Angular/View/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(root_path.template));
});


gulp.task('copy-index', function() {
  gulp.src('Angular/Index.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(root_path.webroot));
});

gulp.task('version-change', function() {
  var json = JSON.parse(fs.readFileSync('Angular/version.json'));
  var v3 = (parseInt(json.third) + (parseInt(json.third) !== 99 ? 1 : 0)).toString();
  var v2 = (parseInt(json.second) + (parseInt(v3) === 99 && parseInt(json.second) < 99 ? 1 : 0)).toString();
  var v1 = (parseInt(json.first) + (parseInt(v2) === 99 && parseInt(json.first) < 99 ? 1 : 0)).toString();
  var version = v1 + "." + v2 + "." + v3;
  var end = parseInt(v1) === 99 && parseInt(v2) === 99 && parseInt(v3) === 99 ? "0" : "";
  v1 = end === "" ? v1 : end;
  v2 = end === "" ? v2 : end;
  v3 = end === "" ? v3 : end;
  gulp.src('Angular/version.json')
    .pipe(jsonchange({
      key: 'version',
      value: version
    }))
    .pipe(jsonchange({
      key: 'first',
      value: v1
    }))
    .pipe(jsonchange({
      key: 'second',
      value: v2
    }))
    .pipe(jsonchange({
      key: 'third',
      value: v3
    }))
    .pipe(gulp.dest("Angular/"));
});

gulp.task('version-index', function() {
  gulp.src(root_path.webroot + 'Index.html')
    .pipe(version(['html', 'js', 'css'], {
      appendType: 'name',
      versionFile: 'Angular/version.json'
    }))
    .pipe(gulp.dest(root_path.webroot));
});




gulp.task("z-build-all", ["reference-js", "System-js", "Misc-js", "App-js", "Reference-css", "copy-template", "copy-index", "version-change"]);
gulp.task("z-reversion-index", ["version-index"]);
