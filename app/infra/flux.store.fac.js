(function (rx) {
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

            function undo() {
                if (historyDeep > 0) {
                    historyDeep--;
                }
                if (storeState !== storeHistory[historyDeep]) {
                    storeState = storeHistory[historyDeep];
                    store.onNext(storeState);
                }
            }

            function redo() {
                if (historyDeep < storeHistory.length - 1) {
                    historyDeep++;
                }
                if (storeState !== storeHistory[historyDeep]) {
                    storeState = storeHistory[historyDeep];
                    store.onNext(storeState);
                }
            }

            return Object.create({}, {
                init: {
                    configurable: false,
                    value: function () {
                        this.stateChange();
                    }
                },
                stateChange: {
                    configurable: false,
                    value: function () {
                        if (this.isUndoRedo) {
                            historyDeep++;
                            storeHistory.push(storeState);
                        }
                        store.onNext(storeState);
                    }
                },
                subscribe: {
                    configurable: false,
                    value: function (consumerFunc, context) {
                        debugger;
                        if (!angular.isFunction(consumerFunc)) {
                            throw Error('Missing required argument {consumerFunc} or argument is not a function');
                        }
                        return store.subscribe(function (payload) {
                            consumerFunc.apply(context, [payload]);
                        });
                    }
                },
                dispose: {
                    configurable: false,
                    value: function (subscription) {
                        if (angular.isDefined(subscription)) {
                            subscription.dispose();
                        }
                        else {
                            store.dispose();
                        }
                    }
                },
                registerAction: {
                    configurable: false,
                    enumerable: false,
                    value: function (actionType, actionFunc, actionContext) {
                        return action.subscribe(actionType, actionFunc, actionContext);
                    }
                },
                unregisterAction: {
                    configurable: false,
                    enumerable: false,
                    value: function (actionSubscription) {
                        if (angular.isDefined(actionSubscription)) {
                            action.dispose(actionSubscription);
                        }
                    }
                },
                enableUndoRedoFeature: {
                    configurable: true,
                    enumerable: false,
                    value: function (enableFeature) {
                        this.isUndoRedo = enableFeature;
                        if (enableFeature) {
                            if (!this.undoSubscription) {
                                this.undoSubscription = this.handleAction("UNDO-STATE",
                                    undo.bind(this),
                                    this);
                            }
                            if (!this.redoSubscription) {
                                this.redoSubscription = this.handleAction('REDO-STATE',
                                    redo.bind(this),
                                    this);
                            }
                        }
                        else {
                            if (this.undoSubscription) {
                                this.unHandleAction(this.undoSubscription);
                                this.undoSubscription = null;
                            }
                            if (this.redoSubscription) {
                                this.unHandleAction(this.redoSubscription);
                                this.redoSubscription = null;
                            }
                        }
                    }
                }
            });
        }

        /*
           Method calling in order to create concrete store
           Created store must be intialized 
           with base store state and defaultaction

           -> @storeData initialized state 
           -> @defaultAction required for any created store
        */
        function createStore(storeData, defaultAction) {
            return new BaseStore(storeData, defaultAction);
        }

        return {
            new: createStore
        };
    }

})(Rx);