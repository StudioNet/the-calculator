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
            +'<input type=\'radio\' ng-model=\'$ctrl.selected\' value=\'{{::$ctrl.item.name}}\' ng-change=\'$ctrl.onSelected()\'/>'
            + '{{::$ctrl.item.name}}'
            +'</label>',
            controller: TypeListItemController,
            controllerAs: '$ctrl',
            bindings: {
                item: '<',
            }
        });

    TypeListItemController.$inject = ['$scope', 'TypesActions'];
    function TypeListItemController($scope, TypesActions) {
        var $ctrl = this;

        function updateViewState() {
            $ctrl.selected = $ctrl.item.selected ? $ctrl.item.name : '';
        }

        //TODO: Variant Number 1
        $ctrl.$doCheck = function() {
            updateViewState();
        };

        //TODO: Variant number 2 [Not working good]
        // $scope.$itemObserver = $ctrl.item;
        // $scope.$watch('$itemObserver', function(oldv, newv) {
        //     //debugger;
        //     if (oldv !== newv) {
        //         updateViewState();
        //     }
        //});

        $ctrl.onSelected = function() {
            TypesActions.get().changeType($ctrl.item.name);
        }

        $ctrl.$onInit = function () { 
            updateViewState();
        };

        $ctrl.$onChanges = function (changesObj) { 
            //debugger;
        };
        $ctrl.$onDestroy = function () { };
    }
})();