(function () {
    'use strict';

    angular
        .module('app', ['app.flux']).directive('appTest', appTestDirective);

    appTestDirective.$inject = [];
    function appTestDirective() {

        return {
            restrict: 'E',
            replace: true,
            scope: {},
            bindToController: true,
            controller: appTestDirectiveController,
            controllerAs: 'vm',
            template: ''
            + '<div class="app-test">'
            + '  <div class="app-test-load">'
            + '    <button ng-click="vm.getApplications()">Load</button>'
            + '  </div>'
            + '  <div class="app-test-get">'
            + '    <button ng-click="vm.getApplication()">Get {{ vm.app.name }}</button>'
            + '  </div>'
            + '  <div class="app-test-add">'
            + '    <button ng-click="vm.addApplication()">Add</button>'
            + '  </div>'
            + '  <ul>'
            + '    <li ng-repeat="app in vm.apps">{{ app.name }}</li>'
            + '  </ul>'
            + '</div>'
        };

    }

    appTestDirectiveController.$inject = ['ApplicationStore', 'ApplicationListStore', 'ApplicationActions'];

    function appTestDirectiveController(ApplicationStore, ApplicationListStore, ApplicationActions) {

        var vm = this;

        vm.init = function () {

            ApplicationActions.getApplication(1);

            ApplicationStore.getApplicationObservable().subscribe(function (app) {
                vm.app = app;
            });

            ApplicationListStore.getApplicationsObservable().subscribe(function (apps) {
                vm.apps = apps;
            });
        };

        vm.getApplications = function () {

            ApplicationActions.getApplications();

        };

        vm.getApplication = function () {
            ApplicationActions.getApplication(new Date().getTime());
        };

        vm.addApplication = function () {
            ApplicationActions.addApplication({
                id: new Date().getTime(),
                name: 'Application New ' + new Date().getTime()
            });
        };

        vm.init();

    }

})();

(function () {
    'use strict';

    angular.module('app.flux', ['app.flux.application']).service('Dispatcher', Rx.Subject);
})();

(function () {
    'use strict';

    angular
        .module('app.flux.application', ['app.flux']).constant('APPLICATION_ACTIONS',
        {
            'GET_APPLICATIONS': 'GET_APPLICATIONS',
            'GET_APPLICATION': 'GET_APPLICATION',
            'ADD_APPLICATION': 'ADD_APPLICATION'
        });

})();

(function () {
    'use strict';

    class ApplicationActions {

        constructor(Dispatcher, APPLICATION_ACTIONS) {
            this.dispatcher = Dispatcher;
            this.APPLICATION_ACTIONS = APPLICATION_ACTIONS;
        }

        getApplications() {

            this.dispatcher.onNext({
                type: this.APPLICATION_ACTIONS.GET_APPLICATIONS
            });

        }

        getApplication(appId) {

            this.dispatcher.onNext({
                type: this.APPLICATION_ACTIONS.GET_APPLICATION,
                appId: appId
            });

        }

        addApplication(app) {

            this.dispatcher.onNext({
                type: this.APPLICATION_ACTIONS.ADD_APPLICATION,
                app: app
            });

        }

    }

    ApplicationActions.$inject = ['Dispatcher', 'APPLICATION_ACTIONS'];

    angular
        .module('app.flux.application')
        .service('ApplicationActions', ApplicationActions);

})();

(function () {
    'use strict';

    class ApplicationListStore {

        constructor(Dispatcher, APPLICATION_ACTIONS, $q) {

            this.dispatcher = Dispatcher;
            this.APPLICATION_ACTIONS = APPLICATION_ACTIONS;
            this.$q = $q;

            this.observable = new Rx.Subject();
            this.applications = [];

            this.registerHandlers();

        }

        registerHandlers() {

            this.dispatcher
                .filter((action) => action.type === this.APPLICATION_ACTIONS.ADD_APPLICATION)
                .subscribe((action) => this.addApplication(action.app));

            this.dispatcher
                .filter((action) => action.type === this.APPLICATION_ACTIONS.GET_APPLICATIONS)
                .subscribe((action) => this.getApplications());

        }

        addApplication(app) {

            // Make some http call and append the result to the list.
            this.$q.when(app)
                .then((res) => {
                    this.applications.push(app);
                    this.observable.onNext(this.applications);
                });

        }

        getApplications() {

            var data = [
                { id: Math.random(), name: 'Application ' + Math.random() },
                { id: Math.random(), name: 'Application ' + Math.random() }
            ];

            // Make some http call and get list of applications.
            this.$q.when(data)
                .then((res) => {
                    this.applications = res;
                    this.observable.onNext(this.applications);
                });

        }

        getApplicationsObservable() {

            return this.observable;

        }

    }

    ApplicationListStore.$inject = ['Dispatcher', 'APPLICATION_ACTIONS', '$q'];

    angular
        .module('app.flux.application')
        .service('ApplicationListStore', ApplicationListStore);

})();

(function () {
    'use strict';

    class ApplicationStore {

        constructor(Dispatcher, APPLICATION_ACTIONS, $q) {

            this.dispatcher = Dispatcher;
            this.APPLICATION_ACTIONS = APPLICATION_ACTIONS;
            this.$q = $q;

            this.observable = new Rx.Subject();

            this.registerHandlers();

        }

        registerHandlers() {

            this.dispatcher
                .filter((action) => action.type === this.APPLICATION_ACTIONS.GET_APPLICATION)
                .subscribe((action) => this.getApplication(action.appId));

        }

        getApplication(appId) {

            this.$q.when({ id: appId, name: 'Application ' + appId })
                .then((res) => {
                    this.observable.onNext(res);
                });

        }

        getApplicationObservable() {

            return this.observable;

        }

    }

    ApplicationStore.$inject = ['Dispatcher', 'APPLICATION_ACTIONS', '$q'];

    angular
        .module('app.flux.application')
        .service('ApplicationStore', ApplicationStore);

})();