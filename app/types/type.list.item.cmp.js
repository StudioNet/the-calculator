(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('thecalculator')
        .component('calculatorTypeListItem', {
            template: '' +
            '<label class=\'radio-inline">\'' +
            '<input id=\'$ctrl.item.name\' type=\'radio\' name=\'calculatorType\' checked=\'checked\'/> {{::$ctrl.item.name}} ' +
            '</label>',
            controller: TypeListItemController,
            controllerAs: '$ctrl',
            bindings: {
                item: '<',
            }
        });

    TypeListItemController.$inject = [''];
    function TypeListItemController() {
        var $ctrl = this;

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();