(function (rx) {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thecalculator')
        .component('operatorList', {
            template: ''
            + '<select name=\'operatorsSelect\''
            + '         ng-model=\'$ctrl.selectedOperator\' ng-options=\'o.symbol for o in $ctrl.operators\''
            + '         class=\'form-control\'>'
            + '</select>',
            controller: OperatorListController,
            controllerAs: '$ctrl',
            bindings: {
                operators: '<',
            }
        });

    OperatorListController.$inject = [];
    function OperatorListController() {
        var $ctrl = this;

        function updateViewState(operators) {
            $ctrl.selectedOperator = operators[0];
        }

        $ctrl.$onInit = function () {
            updateViewState($ctrl.operators);
        };

        $ctrl.$onChanges = function (changesObj) {
            updateViewState(changesObj.operators.currentValue);
        };

        $ctrl.$onDestroy = function () { };
    }
})(Rx);