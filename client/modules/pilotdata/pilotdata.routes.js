;(function () {
  'use strict'

  angular
    .module('app.pilotdata')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      /*
      {
        state: 'pilotdataCreate',
        config: {
          url: '/pilotdata/create',
          templateUrl: 'modules/pilotdata/create.view.html',
          controller: 'PilotdataController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      */
      {
        state: 'pilotdataEdit',
        config: {
          url: '/pilotdata/edit/:id',
          templateUrl: 'modules/pilotdata/edit.view.html',
          controller: 'PilotdataController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      /*
      {
        state: 'pilotdataList',
        config: {
          url: '/pilotdata/list',
          templateUrl: 'modules/pilotdata/list.view.html',
          controller: 'PilotdataController',
          controllerAs: 'vm'
        }
      },
      */
      {
        state: 'pilotdataView',
        config: {
          url: '/pilotdata/view/:id',
          templateUrl: 'modules/pilotdata/view.view.html',
          controller: 'PilotdataController',
          controllerAs: 'vm'
        }
      }

    ]
  }
})()
