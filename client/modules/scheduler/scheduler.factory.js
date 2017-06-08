;(function () {
  'use strict'

  angular
    .module('app.scheduler')
    .factory('SchedulerFactory', SchedulerFactory)

  SchedulerFactory.$inject = ['$resource']
  /* @ngInject */
  function SchedulerFactory ($resource) {
    return $resource('/api/scheduler/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    })
  }
}())
