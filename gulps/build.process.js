"use strict";

var path = require('path');
var gulp = require('gulp');
var open = require('gulp-open');
var shell = require('./shell.helper');
var PromiseBuilder = require('./stream.promise.builder');

function BuildProcess(processConfig) {
    if (processConfig == null || !processConfig) {
        throw new Error("Build process must have configuration for run");
    }

    function cleanBuildFolder() {
        if (!processConfig.build) {
            throw new Error("Build folder must be exist");
        }
        shell.empty(processConfig.build.path);
    }

    function copyJsFiles() {
        if (!processConfig.copy || !processConfig.copy.js) {
            throw new Error("Copy JS files sections must be configured...");
        }
        console.info("Start copying JS files...");
        PromiseBuilder(gulp.src(processConfig.copy.js.from))
            .pipe(gulp.dest(processConfig.copy.js.to))
            .done();
    }

    function startApplication() {
        if (!processConfig.baseUrl) {
            throw new Error("Base URI of application must be configured...");
        }
        console.info("Opening the application start page...");
        open(processConfig.baseUrl);
    }

    return Object.create({}, {
        build: {
            enumerable: false,
            writable: false,
            value: function build() {
                return Promise.resolve()
                    .then(cleanBuildFolder.bind(this))
                    .then(copyJsFiles.bind(this));
            }
        },
        clean: {
            enumerable: false,
            writable: false,
            value: function clean() {
                return Promise.resolve()
                    .then(cleanBuildFolder.bind(this));
            }
        }
    });

}

module.exports = BuildProcess;