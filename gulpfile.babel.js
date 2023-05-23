import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import ghPages from "gulp-gh-pages";
import gulpImg from "gulp-image";

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
  img: {
    src: "src/img/*",
    dest: "build/img",
  },
  deploy: {
    src: "build/**/*",
    publish: "./.publish",
  },
};

const cleanBuild = () => del([routes.pug.dest]);

const handlePugs = () => {
  return gulp
    .src(routes.pug.watch)
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

const handleImages = () =>
  gulp.src(routes.img.src).pipe(gulpImg()).pipe(gulp.dest(routes.img.dest));

const webserver = () =>
  gulp.src(routes.pug.dest).pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, handlePugs);
  gulp.watch(routes.scss.watch, handleStyles);
};

const ghDeploy = () => gulp.src(routes.deploy.src).pipe(ghPages());
const postDeploy = () => del(routes.deploy.publish);

const prepare = gulp.series([cleanBuild, handleImages]);
const assets = gulp.series([handlePugs, handleStyles]);
const postDev = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, postDev]);
export const deploy = gulp.series([build, ghDeploy, postDeploy]);
