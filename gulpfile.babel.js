import gulp from "gulp";
import gulpPug from "gulp-pug";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build",
  },
};

export const pug = () => {
  return gulp
    .src(routes.pug.src)
    .pipe(gulpPug())
    .pipe(gulp.dest(routes.pug.dest));
};

export const dev = gulp.series([pug]);
