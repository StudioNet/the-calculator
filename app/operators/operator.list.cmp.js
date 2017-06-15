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
            + '<select name=\'operatorsSelect\' ng-change=\'$ctrl.changeOperator()\''
            + '         ng-model=\'$ctrl.selectedOperator\' ng-options=\'o.symbol for o in $ctrl.operators\''
            + '         class=\'form-control\'>'
            + '</select>',
            controller: OperatorListController,
            controllerAs: '$ctrl',
            bindings: {
                operators: '<',
            }
        });

    OperatorListController.$inject = ['OperatorActions'];
    function OperatorListController(OperatorActions) {
        var $ctrl = this;

        function updateViewState(operators) {
            $ctrl.selectedOperator = operators[0];
        }

        $ctrl.changeOperator = function () {
            OperatorActions.get().getSelectedOperator($ctrl.selectedOperator.name);
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