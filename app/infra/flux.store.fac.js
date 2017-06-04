/// <reference path="/build/libs/Rx.js" />

(function(rx) {
    'use strict';

    angular
        .module('flux')
        .factory('BaseStore', BaseStoreFactory);

    BaseStoreFactory.$inject = ['$cacheFactory'];
    function BaseStoreFactory($cacheFactory) {

        function BaseStore(storeData, defaultAction) { 
            var store = rx.BehaviorSubject(storeData);
            var storeState = storeData;
            var storeHistory = [];
            var historyDeep = -1;
            var action = defaultAction;

            return Object.create({}, {
                init: {
                    configurable: false,
                    value: function() {
                        this.historyChange();
                    }
                },
                historyChange: {
                    configurable: true,
                    value: function() {
                        if (this.isUndoRedo) {
                            historyDeep++;
                            storeHistory.push(storeState);
                        }
                        store.onNext(storeState);;
                    }
                },
                subscribe: {
                    configurable: true,
                    value: function(consumerFunc, context) {
                        if (!angular.isFunction(consumerFunc)) {
                            throw Error('Missing required argument {consumerFunc} or argument is not a function');
                        }
                        return store.subscribe(function (payload) {
                            consumerFunc.apply(context, [payload]);
                        });
                    }
                },
                disapose: {
                    configurable: true,
                    value: function(subscription) {
                        if (angular.isDefined(subscription)) {
                            subscription.dispose();
                        }
                        else {
                            store.dispose();
                        }
                    }
                }
            });
        }
    }

})(Rx);