(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thecalculator')
        .component('calculatorTypeListItem', {
            replace: true,
            template: '' 
            +'<label class=\'radio-inline\'>'
            +'<input id=\'$ctrl.item\' type=\'radio\' name=\'calculatorType\' checked=\'checked\'/> {{::$ctrl.item}}'
            +'</label>',
            controller: TypeListItemController,
            controllerAs: '$ctrl',
            bindings: {
                item: '<',
            }
        });

    TypeListItemController.$inject = [];
    function TypeListItemController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { 
            console.info($ctrl.item);
        };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();