(function (rx) {
    'use strict';

    angular.module('thecalculator', ['flux']);

    angular.module('thecalculator').config(TheCalculatorConfiguration);
    angular.module('thecalculator').controller('CalculatorController', CalculatorController);

    function TheCalculatorConfiguration() {
        //Configure main application module here...
    }

    //TODO: next step we still move to another file
    CalculatorController.$inject = ['$scope', 'TypesStore', 'TypesActions', 'OperatorsStore', 'OperationFactory'];
    function CalculatorController($scope, TypesStore, TypesActions, OperatorsStore, OperationFactory) {
        $scope.title = 'The Calculator';
        $scope.subTitle = 'Think more, do less...';
        $scope.calculatorTypes = [];
        $scope.calculatorOperators = [];
        $scope.currentOperation = OperationFactory.new({});

        TypesStore.get().getAllTypes(function allTypesObserver(types) {
            if (types) {
                $scope.calculatorTypes = types;
            }
        });

        TypesStore.get().getChangeType(function changeTypeObserver(types) {
            if (types) {
                $scope.calculatorTypes = types;
            }
        });

        // OperatorsStore.get().getAllOperators(function allOperatorsObserver(operators) {
        //     if (operators) {
        //         $scope.calculatorOperators = operators;
        //     }
        // });

        OperatorsStore.get().getOperatorsByType(function getOperatorsByTypeObserver(operators) {
            debugger;
            if (operators) {
                $scope.calculatorOperators = operators;
                $scope.currentOperation.operator = operators[0];
            }
        });

        //Controller-View logic
        $scope.saveOperation = function () {
            if (!angular.isNumber($scope.currentOperation.leftValue)) {
                return;
            }
            if (!angular.isNumber($scope.currentOperation.rightValue)) {
                return;
            }
        }


    }

})(Rx);