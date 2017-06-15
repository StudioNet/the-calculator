(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thecalculator')
        .component('operationsLog', {
            template: '<ul class=\list-group\>'
            + '<li class=\'list-group-item\' ng-repeat=\'op in $ctrl.operations track by $index\'>{{::op}}'
            + '</li>'
            + '</ul>',
            controller: OperationsLogController,
            controllerAs: '$ctrl',
            bindings: {
                operations: '<',
            },
        });

    OperationsLogController.$inject = [];
    function OperationsLogController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();