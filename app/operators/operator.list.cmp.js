(function(rx) {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thecalculator')
        .component('operatorList', {
            template:''
            +'<select name=\'operatorsSelect\' ng-model=\'$ctrl.selectedOperator\' class=\'form-control\'>'
                +'<option ng-repeat="option in $ctrl.operators" value="{{::option.name}}">{{::option.symbol}}</option>'
            +'</select>',
            controller: OperatorListController,
            controllerAs: '$ctrl',
            bindings: {
                operators: '<',
            },
        });

    OperatorListController.$inject = [];
    function OperatorListController() {
        var $ctrl = this;
        
        $ctrl.$onInit = function() { 
            $ctrl.selectedOperator = $ctrl.operators[0];
        };

        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})(Rx);