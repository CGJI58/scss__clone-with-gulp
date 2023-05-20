import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";

const sass = gulpSass(dartSass);

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css/",
  },
};

const handlePugs = () => {
  return gulp
    .src(routes.pug.src) // 새로고침 되려면 index.pug 저장을 눌러야만 함
    .pipe(gulpPug())
    .pipe(gulp.dest(routes.pug.dest));
};

const handleStyles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(csso())
    .pipe(autoPrefixer({ overrideBrowserslist: ["last 2 versions"] }))
    .pipe(gulp.dest(routes.scss.dest));

const clean = () => del([routes.pug.dest]);

const webserver = () =>
  gulp.src(routes.pug.dest).pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, handlePugs);
  gulp.watch(routes.scss.watch, handleStyles);
};

const prepare = gulp.series([clean]);

const assets = gulp.series([handlePugs, handleStyles]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);
