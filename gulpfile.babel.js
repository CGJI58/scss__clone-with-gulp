import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build",
  },
};

const pug = () => {
  return gulp
    .src(routes.pug.src)
    .pipe(gulpPug())
    .pipe(gulp.dest(routes.pug.dest));
};

const clean = () => del([routes.pug.dest]);

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

export const dev = gulp.series([prepare, assets]);
