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

            function allOperators(consumerFunc) {
                var currentState = rx.Observable.of(store.state);
                currentState.map(function(state) {
                    return state.standard.concat(state.scientific).concat(state.programmer);
                }).subscribe({
                    next: function(concatenatedModel) {
                        consumerFunc(concatenatedModel);
                    }
                });
            }

            return Object.create(store, {
                getAllOperators: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        this.subscribe(allOperators.bind(store, consumer), store);
                        //this.attachAction(OperatorsActionsTypes.GetAll, allOperators.bind(store), store);
                    }
                }
            }); 
        }

        var singleton = new OperatorsStore();

        return {
            get: function () { return singleton; }
        };
    }

})(Rx);