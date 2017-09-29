const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const del = require('del');

gulp.task("default", ["watch"]);

gulp.task("clean", () => {
    del(["./dist"]);
});

gulp.task("copyConfigFiles", () => {
    gulp.src("./app/config/*")
        .pipe(gulp.dest("./dist/config"));
});
gulp.task("copyTemplates", () => {
    gulp.src("./app/templates/*")
        .pipe(gulp.dest("./dist/templates"));
});
gulp.task("build", ["copyConfigFiles", "copyTemplates"], () => {
    gulp.src(["./app/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("./dist"));
});

// gulp.task("serve", () => nodemon({ script : './dist/index.js', ext : 'js' }));

gulp.task('watch', ['build'], function () {
  var stream = nodemon({
                 script: './dist/index.js' // run ES5 code
               , watch: 'app' // watch ES2015 code
               , tasks: ['build'] // compile synchronously onChange
               })

  return stream
})