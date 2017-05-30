"use strict";

function StreamPromiseBuilder(stream) {

    function PromiseBuilder(stream) {
        var endStream = stream;
        var beginStream = stream;

        return Object.create({}, {
            pipe: {
                enumerable: false,
                value: function(pipe) {
                    endStream = endStream.pipe(pipe);
                    return this;
                }
            },
            done: {
                enumerable: false,
                value: function() {
                    var self = this;
                    return new Promise(function(resolveHandler, rejectHandler) {
                        endStream.resume();
                        
                        endStream.on('end', function() {
                            resolveHandler();
                        });

                        endStream.on('error', function(err) {
                            beginStream.end();

                            rejectHandler(err);
                        });
                    }); 
                }
            }
        })
    }

    return new PromiseBuilder(stream);
}

module.exports = StreamPromiseBuilder;