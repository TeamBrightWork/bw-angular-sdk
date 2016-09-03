'use strict';

/**
 * @ngdoc overview
 * @name demoApp
 * @description
 * # demoApp
 *
 * Main module of the application.
 */
angular
  .module('photos', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'brightwork'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          '$bw' : ['$bw', function($bw) {
              return $bw.init();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$bwProvider', function($bw){
    $bw.apiKey('227776a1d35f484dbd90096012e7c011');
    $bw.appName('photos');
  }]);
