(function (rx) {
    'use strict';

    angular
        .module('flux')
        .factory('BaseStore', BaseStoreFactory);

    BaseStoreFactory.$inject = ['$cacheFactory'];
    function BaseStoreFactory($cacheFactory) {

        function BaseStore(storeData, actions) {
            //debugger;
            var store = new rx.BehaviorSubject(storeData);
            var storeState = storeData;
            var storeHistory = [];
            var historyDeep = -1;
            var defaultActions = actions;
            var subscriptions = {};

            function undo() {
                if (historyDeep > 0) {
                    historyDeep--;
                }
                if (storeState !== storeHistory[historyDeep]) {
                    storeState = storeHistory[historyDeep];
                    store.next(storeState);
                }
            }

            function redo() {
                if (historyDeep < storeHistory.length - 1) {
                    historyDeep++;
                }
                if (storeState !== storeHistory[historyDeep]) {
                    storeState = storeHistory[historyDeep];
                    store.next(storeState);
                }
            }

            return Object.create({}, {
                state: {
                    configurable: false,
                    enumerable: false,
                    get: function () {
                        return store.getValue();
                    }
                },
                init: {
                    configurable: false,
                    value: function () {
                        //store.subscribe(defaultActions);
                        this.stateChange();
                    }
                },
                /**
                 * calling to the changeState method will update 
                 * the current state with next value parameter
                 */
                stateChange: {
                    configurable: false,
                    value: function (nextState) {
                        if (this.isUndoRedo) {
                            historyDeep++;
                            storeHistory.push(storeState);
                        }
                        if (angular.isDefined(nextState)) {
                            storeState = nextState;
                        }
                        store.next(storeState);
                    }
                },
                subscribe: {
                    /**
                     * Current method explore elegant way to other modules / components 
                     * to subscribe to current store's observable
                     */
                    configurable: false,
                    value: function (storeFunc, context, consumerFunc) {
                        if (!angular.isFunction(storeFunc)) {
                            throw Error('Missing required argument {consumerFunc} or argument is not a function');
                        }
                        return store.subscribe({
                            next: function (payload) {
                                if (angular.isFunction(consumerFunc)) {
                                    storeFunc.apply(context, [payload, consumerFunc]);
                                }
                                else {
                                    storeFunc.apply(context, [payload]);
                                }
                            }
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
                attachAction: {
                    configurable: false,
                    enumerable: false,
                    value: function (actionType, actionFunc, actionContext, consumerFunc) {
                        return defaultActions.subscribe(actionType, actionFunc, actionContext, consumerFunc);
                    }
                },
                detachAction: {
                    configurable: false,
                    enumerable: false,
                    value: function (actionSubscription) {
                        if (angular.isDefined(actionSubscription)) {
                            defaultActions.dispose(actionSubscription);
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
                                this.undoSubscription = this.attachAction("UNDO-STATE", undo.bind(this), this);
                            }
                            if (!this.redoSubscription) {
                                this.redoSubscription = this.attachAction('REDO-STATE', redo.bind(this), this);
                            }
                        }
                        else {
                            if (this.undoSubscription) {
                                this.detachAction(this.undoSubscription);
                                this.undoSubscription = null;
                            }
                            if (this.redoSubscription) {
                                this.detachAction(this.redoSubscription);
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
           with base store state and default action

           -> @storeData initialized state 
           -> @defaultAction required for any created store
        */
        function createStore(storeData, defaultActions) {
            return new BaseStore(storeData, defaultActions);
        }

        return {
            create: createStore
        };
    }

})(Rx);