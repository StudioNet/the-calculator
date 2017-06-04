/// <reference path="/node_modules/rxjs/dist/global/Rx.js" />

(function (rx) {
    'use strict';

    angular
        .module('flux')
        .factory('BaseAction', BaseActionFactory);

    BaseActionFactory.$inject = ['$cacheFactory'];
    function BaseActionFactory($cacheFactory) {

        function BaseAction(actionTypes) {
            var actionSubject = new rx.BehaviorSubject({ type: '', data: null });

            for (var name in actionTypes) {
                if (actionTypes.hasOwnProperty(name)) {
                    var element = actionTypes[name];
                    Object.defineProperty(this, name, {
                        configurable: true,
                        enumerable: true,
                        get: function () {
                            return actionTypes[name];
                        }
                    });
                }
            }

            return Object.create({}, {
                dispatch: {
                    configurable: true,
                    value: function (actionType, actionPayload) {
                        if (angular.isUndefined(actionType) && angular.isUndefined(actionPayload)) {
                            throw Error('Missing required arguments {actionType} & {actionPayload}');
                        }
                        else {
                            actionSubject.onNext({
                                type: actionType,
                                data: actionPayload
                            });
                        }
                    }
                },
                subscribe: {
                    configurable: true,
                    value: function (actionType, consumerFunc, context) {
                        if (angular.isUndefined(actionType) || this.hasOwnProperty(actionType)) {
                            throw Error('Missing required arguments {actionType}');
                        }
                        if (!angular.isFunction(consumerFunc)) {
                            throw Error('Missing required argument {consumerFunc} or argument is not a function');
                        }
                        return actionSubject
                                .filter(function (payload) {
                                    return payload.type === this[actionType];
                                })
                                .subscribe(function (payload) {
                                    consumerFunc.apply(context, [payload]);
                                });
                    }
                },
                dispose: {
                    configurable: true,
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
            @types -> thus action types to default initialization
        */
        function createAction(types) {
            return new BaseAction(types);
        }

        return {
            create: createAction
        }

    }
})(Rx);