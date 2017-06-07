(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thecalculator')
        .component('calculatorTypeList', {
            template: '<calculator-type-list-item ng-repeat=\'ti in $ctrl.types\' item=\'ti\'></calculator-type-list-item>',
            controller: TypeListController,
            controllerAs: '$ctrl',
            bindings: {
                types: '<',
            },
        });

    //TypeListController.$inject = [''];
    function TypeListController() {
        //debugger;
        var $ctrl = this;
        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();