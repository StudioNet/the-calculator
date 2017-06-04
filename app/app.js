(function() {
    'use strict';

    angular.module('thecalculator', [

    ]);

    angular.module('thecalculator').config(TheCalculatorConfiguration);
    angular.module('thecalculator').controller('CalculatorController', CalculatorController);

    function TheCalculatorConfiguration() {
        //Configure main application module here...
    }

    //TODO: next step we still move to another file
    CalculatorController.$inject = ['$scope'];
    function CalculatorController($scope) {
        $scope.title = 'The Calculator';
        $scope.subTitle = 'The amazing of methematic';
    }

})();