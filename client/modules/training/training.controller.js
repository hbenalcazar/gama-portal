;(function () {
  'use strict'

  angular
    .module('app.training', [])
    .controller('TrainingController', TrainingController)

  TrainingController.$inject = ['$http', '$stateParams', 'TrainingFactory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function TrainingController ($http, $stateParams, TrainingFactory, logger, $location, UserFactory) {
    var vm = this
    vm.title = 'training'
    vm.training = {}
    vm.UserFactory = UserFactory
    activate()

    vm.create = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Create Training Validation')
        return
      }
      var training = new TrainingFactory(vm.training)
      training.user = vm.UserFactory.user
      training.$save(function (response) {
        vm.training = response
        //  window.location.href
        $location.url('/training/list')
      }, function (error) {
        logger.error(error)
      })
    }
    vm.find = function () {
      TrainingFactory.get({
        id: $stateParams.id
      }, function (success) {
        vm.training = success
      }, function (error) {
        logger.error(error)
      })
    }
    vm.list = function () {
      TrainingFactory.query(function (success) {
        vm.trainings = success
      }, function (error) {
        logger.error(error)
      })
    }
    vm.update = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Edit Training Post Validation')
        return
      }
      TrainingFactory.update({
        id: $stateParams.id
      }, vm.training,
        function (success) {
          $location.url('/training/view/' + $stateParams.id)
        },
        function (error) {
          logger.error(error)
        })
    }
    vm.delete = function (trainingId) {
      // Confirm disabled for testing purposes
      var deleteConfirm = true
      // var deleteConfirm = confirm('Are you sure you want to delete this training?') // eslint-disable-line
      if (deleteConfirm === true) {
        TrainingFactory.remove({
          id: trainingId
        },
          function (success) {
            for (var i in vm.trainings) {
              if (vm.trainings[i]._id === trainingId) {
                vm.trainings.splice(i, 1)
              }
            }
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    function activate () {
      logger.info('Activated Training View')
    }
  }
})()
