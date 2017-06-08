(function (rx) {
    'use strict';

    angular
        .module('flux')
        .factory('BaseAction', BaseActionFactory);

    BaseActionFactory.$inject = ['$cacheFactory'];
    function BaseActionFactory($cacheFactory) {

        function BaseAction(actionTypes) {
            var actionSubject = new rx.BehaviorSubject({ type: '', data: null });
            //debugger;
            /**
             * when actions collection instantiated 
             * we  need to bind all action types 
             * to the current instance
             */
            var self = this;
            angular.forEach(actionTypes, function (type, idx) {
                Object.defineProperty(self, type, {
                    enumerable: true,
                    get: function () {
                        return actionTypes[idx];
                    }
                });
            });

            return Object.create(self, {
                dispatch: {
                    configurable: false,
                    value: function (actionType, actionPayload) {
                        debugger;
                        if (angular.isUndefined(actionType) && angular.isUndefined(actionPayload)) {
                            throw Error('Missing required arguments {actionType} & {actionPayload}');
                        }
                        else {
                            actionSubject.next({
                                type: actionType,
                                data: actionPayload
                            });
                        }
                    }
                },
                subscribe: {
                    configurable: false,
                    value: function (actionType, consumerFunc, context) {
                        if (angular.isUndefined(actionType) || this.hasOwnProperty(actionType)) {
                            throw Error('Missing required arguments {actionType}');
                        }
                        if (!angular.isFunction(consumerFunc)) {
                            throw Error('Missing required argument {consumerFunc} or argument is not a function');
                        }
                        var self = this;
                        return actionSubject
                            .filter(function (payload) {
                                return payload.type === self[actionType];
                            })
                            .subscribe({
                                next: function (payload) {
                                    debugger;
                                    consumerFunc.apply(context, [payload]);
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
                            actionSubject.dispose();
                        }
                    }
                }
            });
        }

        /*
            Method calling 
            @types -> thus action types to default initialization
        */
        function createAction(types) {
            return new BaseAction(types);
        }

        return {
            create: createAction
        };

    }
})(Rx);