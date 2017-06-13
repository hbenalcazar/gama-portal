;(function () { 
  'use strict'

  angular
    .module('app.pilotdata', []) // create new module
    .controller('PilotdataController', PilotdataController)

  PilotdataController.$inject = ['$http', '$stateParams', 'PilotdataFactory', 'logger', '$location', 'UserFactory']
  /* @ngInject */
  function PilotdataController ($http, $stateParams, PilotdataFactory, logger, $location, UserFactory) {
    var vm = this 
    vm.title = 'Pilot Data'
    vm.pilotdata = {}
    vm.UserFactory = UserFactory
    activate()
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ADD LOGBOOK ENTRY
    vm.addLogbookEntry = function (newType, newTime){
      var newEntry = {}
      newEntry.type = newType
      newEntry.time = newTime

      vm.pilotdata.logbook.push(newEntry)
      vm.update(true)
    }  

    vm.getTotalTime = function (pic, sic){
      return parseInt(pic) + parseInt(sic)
    }

    vm.deleteLogbookEntry = function (entry){
      var index = vm.pilotdata.logbook.indexOf(entry)
      vm.pilotdata.logbook.splice(index, 1)
      vm.update(true)
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    vm.create = function (validated) {
      if (!validated) {
        logger.warning('Data not valid', vm, 'Create Pilotdata Validation')
        return
      }
      var pilotdata = new PilotdataFactory(vm.pilotdata)
      pilotdata.user = vm.UserFactory.user
      pilotdata.$save(function (response) {
        vm.pilotdata = response
        //  window.location.href
        $location.url('/pilotdata/list')
      }, function (error) {
        logger.error(error)
      })
    }
    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // FIND    
    vm.find = function () {

      //console.log("$stateParams: " + JSON.stringify($stateParams))

      PilotdataFactory.get(
        {
          id: '593caa2cd7315b4f0de6df01' 
          //id: $stateParams.id 
        }, 
        function (success) {
          vm.pilotdata = success
        }, 
        function (error) {
          logger.error(error)
        }
      )
    }

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // LIST
    vm.list = function () {
      PilotdataFactory.query(function (success) {
        vm.pilotdatas = success
      }, function (error) {
        logger.error(error)
      })
    }
    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // UPDATE
    vm.update = function (validated) {
      
      if (!validated) {
        logger.warning('Data not valid', vm, 'Edit Crew Data Post Validation')
        return
      }
      
      PilotdataFactory.update(
        { id: $stateParams.id }, 
        vm.pilotdata,
        function (success) { $location.url('/pilotdata/view/' + $stateParams.id) },
        function (error) { logger.error(error) }
      )
    }

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // DELETE
    vm.delete = function (pilotdataId) {
      // Confirm disabled for testing purposes
      var deleteConfirm = true
      // var deleteConfirm = confirm('Are you sure you want to delete this pilotdata?') // eslint-disable-line
      if (deleteConfirm === true) {
        PilotdataFactory.remove({
          id: pilotdataId
        },
          function (success) {
            for (var i in vm.pilotdatas) {
              if (vm.pilotdatas[i]._id === pilotdataId) {
                vm.pilotdatas.splice(i, 1)
              }
            }
          },
          function (error) {
            logger.error(error)
          })
      }
    }
    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ACTIVATE    
    function activate () {
      logger.info('Activated Pilotdata View')
    }

  } // END: function PilotdataController ($http, $stateParams, PilotdataFactory, logger, $location, UserFactory)

})()
