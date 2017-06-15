(function (rx) {
    'use strict';

    angular.module('thecalculator', ['flux']);

    angular.module('thecalculator').config(TheCalculatorConfiguration);
    angular.module('thecalculator').controller('CalculatorController', CalculatorController);

    function TheCalculatorConfiguration() {
        //Configure main application module here...
    }

    //TODO: next step we still move to another file
    CalculatorController.$inject = ['$scope', 'TypesStore', 'TypesActions', 'OperatorsStore', 'OperationFactory', 'OperationsLogStore', 'OperationsLogActions'];
    function CalculatorController($scope, TypesStore, TypesActions, OperatorsStore, OperationFactory, OperationsLogStore, OperationsLogActions) {
        $scope.title = 'The Calculator';
        $scope.subTitle = 'Think more, do less...';
        $scope.calculatorTypes = [];
        $scope.calculatorOperators = [];
        $scope.currentOperation = OperationFactory.new({});
        $scope.savedOperations = [];

        function clearView() {
            $scope.currentOperation.leftValue = 0;
            $scope.currentOperation.rightValue = 0;
            $scope.currentOperation.operationResult = 0;
            $scope.currentOperation.operator = $scope.calculatorOperators[0];
            //TODO: clear store of the operation history
        }

        OperationsLogStore.get().addNewToLog(function addOperationLogObserver(operations) {
            $scope.savedOperations = operations;
        });

        OperationsLogStore.get().undoStepLog(function undoStepObserver(operations) {
            $scope.savedOperations = operations;
        });

        OperationsLogStore.get().redoStepLog(function redoStepObserver(operations) {
            $scope.savedOperations = operations;
        });

        TypesStore.get().getAllTypes(function allTypesObserver(types) {
            if (types) {
                $scope.calculatorTypes = types;
            }
        });

        TypesStore.get().getChangeType(function changeTypeObserver(types) {
            if (types) {
                $scope.calculatorTypes = types;
                clearView();
            }
        });

        // OperatorsStore.get().getAllOperators(function allOperatorsObserver(operators) {
        //     if (operators) {
        //         $scope.calculatorOperators = operators;
        //     }
        // });

        OperatorsStore.get().getOperatorsByType(function getOperatorsByTypeObserver(operators) {
            if (operators) {
                $scope.calculatorOperators = operators;
                $scope.currentOperation.operator = operators[0];
            }
        });

        OperatorsStore.get().getSelectedOperator(function selectedOperatorObserver(operator) {
            $scope.currentOperation.operator = operator;
            $scope.currentOperation.operationResult = $scope.currentOperation.result();
        });

        //Controller-View logic

        $scope.executeOperation = function () {
            if (!angular.isNumber($scope.currentOperation.leftValue)) {
                return;
            }
            if (!angular.isNumber($scope.currentOperation.rightValue)) {
                return;
            }
            $scope.currentOperation.operationResult = $scope.currentOperation.result();
        }

        $scope.saveOperation = function () {
            var logOperation = $scope.currentOperation.toStatement();
            OperationsLogActions.get().addNewOperation(logOperation);
            clearView();
        }

        $scope.undo = function () {
            OperationsLogActions.get().undoOperationLog();
        }

        $scope.redo = function () {
            OperationsLogActions.get().redoOperationLog();
        }
    }

})(Rx);