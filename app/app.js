(function (rx) {
    'use strict';

    angular.module('thecalculator', ['flux']);

    angular.module('thecalculator').config(TheCalculatorConfiguration);
    angular.module('thecalculator').controller('CalculatorController', CalculatorController);

    function TheCalculatorConfiguration() {
        //Configure main application module here...
    }

    //TODO: next step we still move to another file
    CalculatorController.$inject = ['$scope', 'TypesStore', 'TypesActions', 'OperatorsStore'];
    function CalculatorController($scope, TypesStore, TypesActions, OperatorsStore) {
        $scope.title = 'The Calculator';
        $scope.subTitle = 'Think more, do less...';
        $scope.calculatorTypes = [];
        $scope.calculatorOperators = [];

        TypesStore.get().getAllTypes(function allTypesObserver (types) {
            if (types) {
                $scope.calculatorTypes = types;
            }
        });

        TypesStore.get().getChangeType(function changeTypeObserver(types) {
            if (types) {
                $scope.calculatorTypes = types;
            }
        });

        OperatorsStore.get().getAllOperators(function(operators) {
            debugger;
            if (operators) {
                $scope.calculatorOperators = operators;    
            }
        });
    }

})(Rx);