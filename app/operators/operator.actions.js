(function (rx) {
    'use strict';

    angular
        .module('thecalculator')
        .factory('OperatorActions', OperatorActionsFactory);

    angular
        .module('thecalculator')
        .constant('OperatorsActionsTypes', {
            GetAll: 'GET_ALL_OPERATORS',
            GetByType: 'GET_BY_TYPE',
            GetSelectedOperator: 'GET_SELECTED_OPERATOR'
        });

    OperatorActionsFactory.$inject = ['BaseAction', 'OperatorsActionsTypes'];
    function OperatorActionsFactory(BaseAction, OperatorsActionsTypes) {

        function OperatorActions() {
            var actions = BaseAction.create(OperatorsActionsTypes);

            return Object.create(actions, {
                getAllOperators: {
                    configurable: false,
                    enumerable: false,
                    value: function () {
                        this.dispatch(OperatorsActionsTypes.GetAll, null);
                    }
                },
                getByType: {
                    configurable: false,
                    enumerable: false,
                    value: function (calculatorType) {
                        this.dispatch(OperatorsActionsTypes.GetByType, calculatorType);
                    }
                },
                getSelectedOperator: {
                    configurable: false,
                    enumerable: false,
                    value: function (operatorName) {
                        this.dispatch(OperatorsActionsTypes.GetSelectedOperator, operatorName);
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