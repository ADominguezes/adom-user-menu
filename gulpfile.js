
/* ======================================================================================================
* Plugins
* ======================================================================================================*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-rimraf'),
    bower = require('gulp-bower'),
    fs = require('fs'),
    replace = require('gulp-replace'),
    bower = require('gulp-bower')



/* ======================================================================================================
* task about styles
* ======================================================================================================*/
gulp.task('styles', function () {
    gulp.src("./*.scss")
        //.pipe(sourcemaps.init())
        .pipe(sass()).on('error', notify.onError(function (error) {
            return 'Error al compilar sass.\n Detalles en la consola.\n' + error;
        }))
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

/* ======================================================================================================
* Task for insert estiles en el adom-user-menu-styles.html
* ======================================================================================================*/
gulp.task('styles-replace', ['styles'], function () {
    return gulp.src('./adom-user-menu-styles.html')
        .pipe(replace(/<style>[^>]*<\/style>/, function (s) {
            var style = fs.readFileSync('./dist/css/adom-user-menu.css', 'utf8');
            return '<style>\n' + style + '\n</style>';
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

/* ======================================================================================================
* Task for server component
* ======================================================================================================*/
gulp.task('serve', ['styles-replace', 'styles', 'watch'], function () {
    browserSync.init({
        injectChanges: true,
        files: ['./*.{html, scss}', './demo/index.html', './adom-user-menu.js', './dist/css/adom-user-menu.css'],
        server: "./",
    });
});

/* ======================================================================================================
* watch changes in files adom-user-menu.scss and adom-user-menu.html
* ======================================================================================================*/
gulp.task('watch', function () {
    gulp.watch('./adom-user-menu.html', ['styles-replace']); // Vigila cambios en el html
    gulp.watch('./dist/css/adom-user-menu.css', ['styles-replace']); // Vigila cambios en el html
    gulp.watch('./*.scss', ['styles']); // Vigila cambios en los estilos
});

/* ======================================================================================================
 * Task for install bower
 * ======================================================================================================*/
gulp.task('bower', ['bower-remove', 'bower-cache-clean'], function () {
    return bower();
});

/* ======================================================================================================
 * task for remove package bower
 * ======================================================================================================*/
gulp.task('bower-remove', function () {
    return gulp.src(['./bower_components'], { read: false })
        .pipe(clean({ force: true }));
});

/* ======================================================================================================
 * Task for clean cache in bower
 * ======================================================================================================*/
gulp.task('bower-cache-clean', function () {
    return bower({ cmd: 'cache clean' });
});


/* ======================================================================================================
* Default Task
* ======================================================================================================*/
gulp.task('default', ['bower', 'styles', 'browser-sync', 'watch']);