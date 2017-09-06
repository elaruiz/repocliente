const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const del = require('del');

gulp.task("default", ["build", "serve"]);

gulp.task("clean", () => {
    del(["./dist"]);
});

gulp.task("copyConfigFiles", () => {
    gulp.src("./app/config/*")
        .pipe(gulp.dest("./dist/config"));
});

gulp.task("build", ["copyConfigFiles"], () => {
    gulp.src(["./app/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("./dist"));
});

gulp.task("serve", () => nodemon({ script : './dist/index.js', ext : 'js' }));