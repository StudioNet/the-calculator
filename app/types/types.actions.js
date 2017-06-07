(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('TypesActions', TypesActions);

    TypesActions.$inject = ['BaseAction'];
    function TypesActions(BaseAction) {
        var actionsTypes = {
            GetTypes: 'GET_TYPES',
            ChangeType: 'CHANGE_TYPE'
        };

        function TypesActions() {
            var actions = BaseAction.create(actionsTypes);

            return Object.create(actions, {
                getTypes: {
                    configurable: false,
                    enumerable: false,
                    value: function () {
                        this.dispatch(actionsTypes.GetTypes, null);
                    }
                }
            });
        }

        var singleton = new TypesActions();

        return {
            get: function () { return singleton; },
            types: actionsTypes
        };
    }
})();