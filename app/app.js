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

        //debugger;
        //TypesStore.get().init();

        TypesStore.get().getAllTypes(function (payload) {
            if (payload.data) {
                $scope.calculatorTypes = payload.data;
            }
            else {
                //$scope.calculatorTypes = 
            }
        });


        function loadTypes() {
            debugger;
            var actions = TypesActions.get();
            actions.getTypes();

            // var observable = rx.Observable.create(function (observer) {
            //     observer.next(10);
            //     observer.next(20);
            //     observer.next(30);
            //     observer.next(40);
            //     observer.next(50);
            //     observer.complete();
            // });

            // observable.subscribe({
            //     next: function (val) {
            //         console.log('current value: ' + val);
            //     },
            //     error: function (err) {
            //         console.error('error occured -> ' + err);
            //     },
            //     complete: function () {
            //         console.log('Complete observe');
            //     }
            // });

            // var store = new rx.BehaviorSubject({
            //     'Standard': 'Standard',
            //     'Scientific': 'Scientific',
            //     'Programmer': 'Programmer'
            // });

            // store.subscribe({
            //     next: function (observer) { console.log('First -> ' + observer) }
            // });

            // store.next(1);
            // store.next(2);

            // store.subscribe({
            //     next: function (observer) { console.log('Second -> ' + observer) }
            // });

            // store.next(3);
        }

        loadTypes();
    }

})(Rx);