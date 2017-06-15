(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('OperationsLogActions', OperationsLogActionsFactory);

    angular.module('thecalculator')
        .constant('OperationsLogActionsTypes', {
            AddNewOperation: 'ADD_NEW_OPERATION',
            UndoState: 'UNDO_STATE',
            RedoState: 'REDO_STATE'
        });

    OperationsLogActionsFactory.$inject = ['BaseAction', 'OperationsLogActionsTypes'];
    function OperationsLogActionsFactory(BaseAction, OperationsLogActionsTypes) {

        function OperationsLogActions() {
            var actions = BaseAction.create(OperationsLogActionsTypes);

            return Object.create(actions, {
                addNewOperation: {
                    configurable: false,
                    enumerable: false,
                    value: function (operation) {
                        this.dispatch(OperationsLogActionsTypes.AddNewOperation, operation);
                    }
                },
                undoOperationLog: {
                    configurable: false,
                    enumerable: false,
                    value: function () {
                        this.dispatch(OperationsLogActionsTypes.UndoState);
                    }
                },
                redoOperationLog: {
                    configurable: false,
                    enumerable: false,
                    value: function () {
                        this.dispatch(OperationsLogActionsTypes.RedoState);
                    }
                }
            });
        }

        var singleton = new OperationsLogActions();

        return {
            get: function () { return singleton; },
            types: OperationsLogActionsTypes
        };
    }

})();