/// <reference path="./gulps/gulp.config.js" />

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var print = require('gulp-print');
var webserver = require('gulp-webserver');
var appConfig = require('./gulps/gulp.config')('.');
var buildProcess = require('./gulps/build.process');

gulp.task('config:paths', function () {
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
    console.info('-------End--------');
});


gulp.task('copy:index', function () {
    return gulp.src(appConfig.index)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.path));
});

gulp.task('copy:libs', function () {
    return gulp.src(appConfig.src.code.libs)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.libs));
});

gulp.task('copy:appjs', function () {
    return gulp.src(appConfig.src.code.appjs)
        .pipe(print())
        .pipe(gulp.dest(appConfig.build.app));
});

gulp.task('build:clean', function () {
    new buildProcess(appConfig).clean();
});

gulp.task('build:dev', ['build:clean', 'copy:index', 'copy:libs', 'copy:appjs']);

gulp.task('serve:dev', ['build:dev'], function () {
    gulp.src(appConfig.build.path)
        .pipe(webserver({ open: true }));
});










