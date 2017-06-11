;(function () {
  'use strict'

  angular
    .module('app.pilotdata')
    .factory('PilotdataFactory', PilotdataFactory)

  PilotdataFactory.$inject = ['$resource']
  /* @ngInject */
  function PilotdataFactory ($resource) {
    return $resource('/api/pilotdata/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
