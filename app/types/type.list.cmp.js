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
        
        $ctrl.$onInit = function () { 
            console.info('On init types list:');
            console.table($ctrl.types);
        };

        $ctrl.$onChanges = function (changesObj) { 
            console.info('On change types list:');
            console.table(changesObj)
        };

        $ctrl.$onDestroy = function () { };
    }
})();