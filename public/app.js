'use strict';

var app = angular.module('jsdataWorkshop', ['js-data', 'ui.router'])
  .config(function(DSProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');


    DSProvider.defaults.basePath = '/api';
    DSProvider.defaults.idAttribute = '_id';
    
  })


