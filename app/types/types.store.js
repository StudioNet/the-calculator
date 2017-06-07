(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('TypesStore', TypesStore);

    TypesStore.$inject = ['BaseStore', 'TypesActions'];
    function TypesStore(BaseStore, TypesActions) {
        var initialState = {
            'Standard': 'Standard',
            'Scientific': 'Scientific',
            'Programmer': 'Programmer'
        };

        function TypesStore() {
            var store = BaseStore.create(initialState, TypesActions.get());

            function typesArray() {
                return Object.keys(initialState);
            }

            var allTypesSubscription = null;

            return Object.create(store, {
                getAllTypes: {
                    configurable: false,
                    enumerable: false,
                    value: function () {
                        debugger;
                        allTypesSubscription = this.subscribe(typesArray, this);
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