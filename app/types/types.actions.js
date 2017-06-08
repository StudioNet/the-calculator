(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('TypesActions', TypesActions);

    angular
        .module('thecalculator')
        .constant('TypesActionsTypes', {
            GetTypes: 'GET_TYPES',
            ChangeType: 'CHANGE_TYPE'
        });

    TypesActions.$inject = ['BaseAction', 'TypesActionsTypes'];
    function TypesActions(BaseAction, TypesActionsTypes) {

        function TypesActions() {
            var actions = BaseAction.create(TypesActionsTypes);

            return Object.create(actions, {
                getTypes: {
                    configurable: false,
                    enumerable: false,
                    value: function () {
                        this.dispatch(TypesActionsTypes.GetTypes, null);
                    }
                },
                changeType: {
                    configurable: false,
                    enumerable: false,
                    value: function (type) {
                        this.dispatch(TypesActionsTypes.ChangeType, type);
                    }
                }
            });
        }

        var singleton = new TypesActions();

        return {
            get: function () { return singleton; },
            types: TypesActionsTypes
        };
    }
})();