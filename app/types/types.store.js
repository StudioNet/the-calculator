(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('TypesStore', TypesStore);

    TypesStore.$inject = ['BaseStore', 'TypesActions', 'TypesActionsTypes'];
    function TypesStore(BaseStore, TypesActions, TypesActionsTypes) {
        var initialState = [
            { 'name': 'Standard' },
            { 'name': 'Scientific' },
            { 'name': 'Programmer' }
        ];

        function TypesStore() {
            var store = BaseStore.create(initialState, TypesActions.get());

            var getTypesSubscription = null;

            return Object.create(store, {
                getAllTypes: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        debugger;
                        getTypesSubscription = this.attachAction(TypesActionsTypes.GetTypes, consumer, store);
                    }
                }
            });
        }

        var singleton = new TypesStore();

        return {
            get: function () { return singleton; }
        };

    }

})();