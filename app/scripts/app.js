'use strict';

var todoAngularYeomanApp = angular.module('todoAngularYeomanApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
        })
        .when('/todo', {
          templateUrl: 'views/todo.html',
          controller: 'TodoCtrl'
        })
        .when('/todo/:todoStatus', {
            templateUrl: 'views/todo.html',
            controller: 'TodoCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
