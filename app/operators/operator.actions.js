(function(rx) {
    'use strict';

    angular
        .module('thecalculator') 
        .factory('OperatorActions', OperatorActionsFactory);

    angular
        .module('thecalculator')
        .constant('OperatorsActionsTypes', {
            GetAll: 'GET_ALL_OPERATORS',
            GetByType: 'GET_BY_TYPE',
            ExecuteOperator: 'EXECUTE_OPERATOR'
        });

    OperatorActionsFactory.$inject = ['BaseAction', 'OperatorsActionsTypes'];
    function OperatorActionsFactory(BaseAction, OperatorsActionsTypes) {

       function OperatorActions() {
            var actions = BaseAction.create(OperatorsActionsTypes);

            return Object.create(actions, {
                GetAllOperators: {
                    configurable: false,
                    enumerable: false,
                    value: function() {
                        this.dispatch(OperatorsActionsTypes.GetAll, null);
                    }
                },
                GetByType: {
                    configurable: false, 
                    enumerable: false,
                    value: function(calculatorType) {
                        this.dispatch(OperatorsActionsTypes.GetByType, calculatorType);
                    }
                },
                ExecuteOperator: {
                    configurable: false,
                    enumerable: false,
                    value: function(operation) {
                        this.dispatch(OperatorsActionsTypes.ExecuteOperator, operation);
                    }
                }
            });
       }

       var singleton = new OperatorActions();

        return {
            get: function () { return singleton; },
            types: OperatorsActionsTypes
        };
    }
})(Rx);