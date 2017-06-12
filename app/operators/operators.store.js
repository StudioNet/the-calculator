(function (rx) {
    'use strict';

    angular
        .module('thecalculator')
        .factory('OperatorsStore', OperatorsStore);

    OperatorsStore.$inject = ['BaseStore', 'OperatorActions', 'OperatorsActionsTypes'];
    function OperatorsStore(BaseStore, OperatorActions, OperatorsActionsTypes) {

        var initialState = {
            standard: [
                { symbol: "+", name: "addition", execute: function (addend1, addend2) { return addend1 + addend2; } },
                { symbol: "-", name: "subtraction ", execute: function (minuend, substrahend) { return minuend - substrahend; } },
                { symbol: "*", name: "multiplication ", execute: function (multiplier, multiplicand) { return multiplier * multiplicand; } },
                { symbol: "/", name: "division", execute: function (devidend, devisor) { return devidend / devisor; } }
            ],
            scientific: [
                { symbol: "^", name: "power", execute: function (base, exponent) { return Math.pow(base, exponent); } },
                { symbol: "xRooty", name: "nth root", execute: function (degree, radicand) { return Math.pow(radicand, (1 / degree)); } }
            ],
            programmer: [
                { symbol: "mod", name: "modolo", execute: function (devidend, devisor) { return devidend % devisor; } }
            ]
        };

        function OperatorsStore() {
            var store = BaseStore.create(initialState, OperatorActions.get());

            function allOperators(storeFunc, consumerFunc) {
                var currentState = rx.Observable.of(store.state);
                currentState.map(function (state) {
                    return state.standard.concat(state.scientific).concat(state.programmer);
                }).subscribe({
                    next: function (concatenatedModel) {
                        consumerFunc(concatenatedModel);
                    }
                });
            }

            /**
             * Sometimes we have state that doesn't change at application life cycle
             * We are only retrieve from its collection
             */
            function operatorsByType(payload, consumerFunc) {
                console.info(arguments);
                var currentState = rx.Observable.of(store.state);
                currentState.map(function (state) {
                    var combined = [];
                    if (payload.data !== 'standard') {
                        combined = combined.concat(state['standard'])
                    }
                    return angular.isDefined(state[payload.data])
                        ? combined.concat(state[payload.data])
                        : state[payload.data];
                }).subscribe({
                    next: function (operators) {
                        consumerFunc(operators);
                    }
                });
            }

            return Object.create(store, {
                getAllOperators: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        /**
                         * When we only need once action in order to retrieve some paylod from our store. 
                         * In that case we are not bind any action in oder to dispatch it later...
                         */
                        this.subscribe(allOperators.bind(store), store, consumer);
                        //this.attachAction(OperatorsActionsTypes.GetAll, allOperators.bind(store), store);
                    }
                },
                getOperatorsByType: {
                    configurable: true,
                    enumerable: true,
                    value: function (consumer) {
                        //this.subscribe(consumer, store);
                        /**
                         * When we need action to dispatch business logic process on the store we'll attach 
                         * the action to the actions dispatcher in order to dispatch it whenever we need that. 
                         */
                        this.attachAction(OperatorsActionsTypes.GetByType, operatorsByType.bind(store), store, consumer);
                    }
                }
            });
        }

        //Always only onse instance of concrete store
        var singleton = new OperatorsStore();

        return {
            get: function () { return singleton; }
        };
    }

})(Rx);