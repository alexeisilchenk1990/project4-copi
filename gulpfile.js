var browserSync = require('browser-sync'),
gulp = require('gulp'),
sass = require('gulp-sass'),
jade = require('gulp-jade'),
autoprefixer = require('gulp-autoprefixer'),
notify = require("gulp-notify");

gulp.src("./src/test.ext")
.pipe(notify("Found file: <%= file.relative %>!"));

gulp.task('sass', function(){
return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', notify.onError(
        {
            message: "<%= error.message %>",
            title: "Sass Error!"
        }
    )))
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('jade', function(){
gulp.src('app/jade/**/*.jade')
.pipe(jade().on('error', notify.onError(
    {
        message: "<%= error.message %>",
        title: "Jade Error!"
    }
)))
.pipe(jade())
.pipe(gulp.dest('app/html'))
.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
browserSync({
    server: {
        baseDir:'app',
        index: 'html/index.html'
    },
    notify: false
});
});

gulp.task('watch',['browser-sync','sass','jade'],function() {
gulp.watch('app/scss/**/*.scss',['sass']),
gulp.watch('app/jade/**/*.jade', ['jade']),
gulp.watch('app/js/**/*.js', browserSync.reload);
})

