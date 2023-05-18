import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build",
  },
};

const handlePug = () => {
  return gulp
    .src(routes.pug.src) // 새로고침 되려면 index.pug 저장을 눌러야만 함
    .pipe(gulpPug())
    .pipe(gulp.dest(routes.pug.dest));
};

const clean = () => del([routes.pug.dest]);

const webserver = () =>
  gulp.src(routes.pug.dest).pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.pug.watch, handlePug);
};

const prepare = gulp.series([clean]);

const assets = gulp.series([handlePug]);

const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);
