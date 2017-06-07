;(function () {
  'use strict'

  angular
    .module('app.training')
    .factory('TrainingFactory', TrainingFactory)

  TrainingFactory.$inject = ['$resource']
  /* @ngInject */
  function TrainingFactory ($resource) {
    return $resource('/api/training/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
