(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('OperatorsStore', OperatorsStore);

    OperatorsStore.$inject = ['BaseStore', 'BaseAction'];
    function OperatorsStore(BaseStore, BaseAction) {

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
        //var store = BaseStore.new();
    }

})();