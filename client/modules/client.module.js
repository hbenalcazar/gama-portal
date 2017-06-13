;(function () {
  'use strict'

  // register all the services
  angular.module('app', [
    'app.core',
    'app.index',
    'app.header',
    'app.footer',
    'app.user',
    'app.blog',
    'app.admin',
    'app.scheduler',
    'app.pilotdata',
    'app.training'
  ])
})()
