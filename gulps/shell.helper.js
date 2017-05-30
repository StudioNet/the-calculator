"use strict";
var shelljs = require('shelljs');

function ShellHelper() {
    return Object.create({}, {
        execute: {
            enumerable: false,
            writable: false,
            value: function(command, options) {
                console.log("Start execute command -> \n" + command);
                return new Promise(function(resolveHandler, rejectHandler) {
                    options = options || {};
                    if(options.openNewCommandWindow) {
                        if(process.platform == "win32") {
                            command = "START" + command;
                        }
                    }

                    shelljs.exec(command, options, function(code) {
                        if(code != 0) {
                            rejectHandler(new Error("Executed command " + command + " failed with exit code " + code));
                        }
                        else {
                            resolveHandler();
                        }
                    })
                });
            }
        },
        empty: {
            configurable: false,
            value: function(pathToClearFolder) {
                console.log("Start clear folder -> \n" + pathToClearFolder);
                if (pathToClearFolder == null || !pathToClearFolder || pathToClearFolder == "") {
                    throw new Error("Path must be exist");
                }
                return new Promise(function(resolveHandler, rejectHandler) {
                    try {
                        shelljs.rm('-rf', pathToClearFolder + '/*');
                        resolveHandler();    
                    } catch (error) {
                        console.error(error);
                        rejectHandler(error);
                    }
                });
            }
        }
    })
}

module.exports = new ShellHelper();