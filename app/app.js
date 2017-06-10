(function (rx) {
    'use strict';

    angular.module('thecalculator', [
        'flux'
    ]);

    angular.module('thecalculator').config(TheCalculatorConfiguration);
    angular.module('thecalculator').controller('CalculatorController', CalculatorController);

    function TheCalculatorConfiguration() {
        //Configure main application module here...
    }

    //TODO: next step we still move to another file
    CalculatorController.$inject = ['$scope', 'TypesStore', 'TypesActions'];
    function CalculatorController($scope, TypesStore, TypesActions) {
        $scope.title = 'The Calculator';
        $scope.subTitle = 'Think more, do less...';
        $scope.calculatorTypes = [];

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
    }

})(Rx);