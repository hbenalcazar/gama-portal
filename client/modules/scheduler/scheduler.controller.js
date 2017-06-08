;(function () {
  'use strict'

  angular
    .module('app.scheduler', [])
    .controller('SchedulerController', SchedulerController)

  SchedulerController.$inject = ['$http', '$stateParams', 'SchedulerFactory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function SchedulerController ($http, $stateParams, SchedulerFactory, logger, $location, UserFactory) {
    var vm = this
    vm.title = 'scheduler'
    vm.scheduler = {}
    vm.UserFactory = UserFactory
    activate()

    vm.create = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Create Scheduler Validation')
        return
      }
      var scheduler = new SchedulerFactory(vm.scheduler)
      scheduler.user = vm.UserFactory.user
      scheduler.$save(function (response) {
        vm.scheduler = response
        //  window.location.href
        $location.url('/scheduler/list')
      }, function (error) {
        logger.error(error)
      })
    }
    vm.find = function () {
      SchedulerFactory.get({
        id: $stateParams.id
      }, function (success) {
        vm.scheduler = success
      }, function (error) {
        logger.error(error)
      })
    }
    vm.list = function () {
      SchedulerFactory.query(function (success) {
        vm.schedulers = success
      }, function (error) {
        logger.error(error)
      })
    }
    vm.update = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Edit Scheduler Post Validation')
        return
      }
      SchedulerFactory.update({
        id: $stateParams.id
      }, vm.scheduler,
        function (success) {
          $location.url('/scheduler/view/' + $stateParams.id)
        },
        function (error) {
          logger.error(error)
        })
    }
    vm.delete = function (schedulerId) {
      // Confirm disabled for testing purposes
      var deleteConfirm = true
      // var deleteConfirm = confirm('Are you sure you want to delete this scheduler?') // eslint-disable-line
      if (deleteConfirm === true) {
        SchedulerFactory.remove({
          id: schedulerId
        },
          function (success) {
            for (var i in vm.schedulers) {
              if (vm.schedulers[i]._id === schedulerId) {
                vm.schedulers.splice(i, 1)
              }
            }
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    function activate () {
      logger.info('Activated Scheduler View')
    }
  }
})()
