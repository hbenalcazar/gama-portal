;(function () {
  'use strict'

  angular
    .module('app.training')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'trainingCreate',
        config: {
          url: '/training/create',
          templateUrl: 'modules/training/create.view.html',
          controller: 'TrainingController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: 'trainingEdit',
        config: {
          url: '/training/edit/:id',
          templateUrl: 'modules/training/edit.view.html',
          controller: 'TrainingController',
          controllerAs: 'vm',
          resolve: {
            loggedin: function (UserFactory) {
              return UserFactory.checkLoggedin()
            }
          }
        }
      },
      {
        state: 'trainingList',
        config: {
          url: '/training/list',
          templateUrl: 'modules/training/list.view.html',
          controller: 'TrainingController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'trainingView',
        config: {
          url: '/training/view/:id',
          templateUrl: 'modules/training/view.view.html',
          controller: 'TrainingController',
          controllerAs: 'vm'
        }
      }

    ]
  }
})()
