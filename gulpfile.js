/// <reference path="./gulps/gulp.config.js" />

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var print = require('gulp-print');
var webserver = require('gulp-webserver');
var injector = require('gulp-inject');
var series = require('stream-series')
var appConfig = require('./gulps/gulp.config')('.');
var BuildProcess = require('./gulps/build.process');

//initialize build process helper
var buildProcess = new BuildProcess(appConfig);

gulp.task('print-paths', function () {
    console.info('Assets paths: ');
    console.info('-------Start--------');
    console.info(appConfig.assets.css);
    console.info(appConfig.assets.images);
    console.info(appConfig.assets.fonts);
    console.info('-------End--------');

    console.info('Source folder paths: ');
    console.info('-------Start--------');
    console.info(appConfig.src.app);
    console.info(appConfig.src.code.libs);
    console.info(appConfig.src.code.appjs);
    console.info(appConfig.src.code.sass);
    console.info('-------End--------');

    console.info('Build paths: ');
    console.info('-------Start--------');
    console.info(appConfig.build.path);
    console.info(appConfig.build.libs);
    console.info(appConfig.build.app);
    console.info(appConfig.build.assets.css);
    console.info(appConfig.build.assets.fonts);
    console.info('-------End--------');
});

gulp.task('copy:index', function () {
    return gulp.src(appConfig.index)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.path));
});

gulp.task('watch:index', function () {
    gulp.watch(appConfig.index, ['copy:index']);
});

gulp.task('copy:libs', function () {
    return gulp.src(appConfig.src.code.libs)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.libs));
});

gulp.task('copy:css', function () {
    return gulp.src(appConfig.assets.css)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.assets.css))
});

gulp.task('copy:fonts', function () {
    return gulp.src(appConfig.assets.fonts)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.assets.fonts))
});

gulp.task('copy:appjs', function () {
    return gulp.src(appConfig.src.code.appjs)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.app));
});

gulp.task('watch:appjs', function () {
    gulp.watch(appConfig.src.code.appjs, ['copy:appjs']);
});

gulp.task('build:clean', function () {
    buildProcess.clean();
});

gulp.task('build:index', function () {
    var targetIndex = gulp.src(appConfig.index);
    var vendorsSource = gulp.src(appConfig.src.code.libs, { read: false });
    var appSource = gulp.src(appConfig.src.code.appjs, { read: false });

    return targetIndex.pipe(injector(series(vendorsSource, appSource)))
        .pipe(gulp.dest(appConfig.build.path));
});


gulp.task('build:dev', ['build:clean', 'copy:index', 'copy:libs', 'copy:appjs', 'copy:css', 'copy:fonts']);

gulp.task('watch', ['watch:index', 'watch:appjs']);

gulp.task('serve:dev', ['build:dev', 'watch'], function () {
    gulp.src(appConfig.build.path)
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            port: 9999
        }));
});










