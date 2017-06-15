(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('OperationsLogStore', OperationsLogStoreFactory);

    OperationsLogStoreFactory.$inject = ['BaseStore', 'OperationsLogActions', 'OperationsLogActionsTypes'];
    function OperationsLogStoreFactory(BaseStore, OperationsLogActions, OperationsLogActionsTypes) {
        var initialState = [];

        function OperationsLogStore() {
            var store = BaseStore.create(initialState, OperationsLogActions.get());
            store.enableUndoRedoFeature(true);

            function addToLog(payload) {
                //debugger;
                var newState = angular.copy(store.state);
                newState.push(payload.data);
                store.stateChange(newState);
            }

            return Object.create(store, {
                addNewToLog: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        this.subscribe(consumer, store);
                        this.attachAction(OperationsLogActionsTypes.AddNewOperation, addToLog.bind(store), store);
                    }
                },
                undoStepLog: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        this.subscribe(consumer, store);
                    }
                },
                redoStepLog: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        this.subscribe(consumer, store);
                    }
                }
            });
        }

        var singleton = new OperationsLogStore();

        return {
            get: function () { return singleton; }
        };
    }

})();