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
            + '<label class=\'radio-inline\'>'
            + '<input type=\'radio\' ng-model=\'$ctrl.selected\' value=\'{{::$ctrl.item.name}}\' ng-change=\'$ctrl.onSelected()\'/>'
            + '{{::$ctrl.item.name}}'
            + '</label>',
            controller: TypeListItemController,
            controllerAs: '$ctrl',
            bindings: {
                item: '<',
            }
        });

    TypeListItemController.$inject = ['$scope', 'TypesActions', 'OperatorActions'];
    function TypeListItemController($scope, TypesActions, OperatorActions) {
        var $ctrl = this;

        function updateViewState() {
            $ctrl.selected = $ctrl.item.selected ? $ctrl.item.name : '';
        }

        function defaultSelection() {
            if ($ctrl.item.selected) {
                OperatorActions.get().getByType($ctrl.item.name.toLowerCase());
            }
        }

        //TODO: Variant Number 1 [Angular must be updated to 1.6.X version]
        $ctrl.$doCheck = function () {
            updateViewState();
        };

        //TODO: Variant number 2 [Bad variant]
        // $scope.$itemObserver = $ctrl.item;
        // $scope.$watch('$itemObserver', function(oldv, newv) {
        //     //debugger;
        //     if (oldv !== newv) {
        //         updateViewState();
        //     }
        //});

        $ctrl.onSelected = function () {
            TypesActions.get().changeType($ctrl.item.name);
            OperatorActions.get().getByType($ctrl.item.name.toLowerCase());
        }

        $ctrl.$onInit = function () {
            updateViewState();
            defaultSelection();
        };

        $ctrl.$onChanges = function (changesObj) {
            //debugger;
        };
        $ctrl.$onDestroy = function () { };
    }
})();