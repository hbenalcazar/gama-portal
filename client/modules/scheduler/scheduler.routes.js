;(function () {
  'use strict'

  angular
    .module('app.scheduler')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'schedulerCreate',
        config: {
          url: '/scheduler/create',
          templateUrl: 'modules/scheduler/create.view.html',
          controller: 'SchedulerController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: 'schedulerEdit',
        config: {
          url: '/scheduler/edit/:id',
          templateUrl: 'modules/scheduler/edit.view.html',
          controller: 'SchedulerController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: 'schedulerList',
        config: {
          url: '/scheduler/list',
          templateUrl: 'modules/scheduler/list.view.html',
          controller: 'SchedulerController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'schedulerView',
        config: {
          url: '/scheduler/view/:id',
          templateUrl: 'modules/scheduler/view.view.html',
          controller: 'SchedulerController',
          controllerAs: 'vm'
        }
      }

    ]
  }
})()
