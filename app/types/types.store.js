(function (rx) {
    'use strict';

    angular
        .module('thecalculator')
        .factory('TypesStore', TypesStore);

    TypesStore.$inject = ['BaseStore', 'TypesActions', 'TypesActionsTypes'];
    function TypesStore(BaseStore, TypesActions, TypesActionsTypes) {
        var initialState = [
            { 'name': 'Standard', 'selected': true },
            { 'name': 'Scientific', 'selected': false },
            { 'name': 'Programmer', 'selected': false }
        ];

        function TypesStore() {
            var store = BaseStore.create(initialState, TypesActions.get());

            var getTypesSubscription = null;
            var getTypesObserverSubscription = null;
            var getChangeTypeSubscription = null;
            var getChangeTypeObserverSubscription = null;

            function allTypes() {
                store.stateChange()
            }

            function changeType(payload) {
                //get state from store
                var observable = rx.Observable.from(store.state);
                observable.map(function (storeItem, idx, obser) {
                    storeItem.selected = false;
                }).subscribe();

                observable.filter(function queryByTypeName(storeItem) {
                    return storeItem.name === payload.data;
                })
                    .do(function selectFiltered(storeItem) {
                        storeItem.selected = true;
                    })
                    .subscribe(function () {
                        store.stateChange();
                    });
            }

            return Object.create(store, {
                getAllTypes: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        debugger;
                        getTypesObserverSubscription = this.subscribe(consumer, store);
                        getTypesSubscription = this.attachAction(TypesActionsTypes.GetTypes, allTypes.bind(store), store);
                    }
                },
                getChangeType: {
                    configurable: false,
                    enumerable: false,
                    value: function (consumer) {
                        getChangeTypeObserverSubscription = this.subscribe(consumer, store);
                        getChangeTypeSubscription = this.attachAction(TypesActionsTypes.ChangeType, changeType.bind(store), store);
                    }
                }
            });
        }

        var singleton = new TypesStore();

        return {
            get: function () { return singleton; }
        };

    }

})(Rx);