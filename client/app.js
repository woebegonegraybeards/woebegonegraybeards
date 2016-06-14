var ff = angular.module('feedfuse', [
  'ff.controllers',
  'ff.services',
  'ui.router',
  'ngAnimate'
]);

ff.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
      url: '/',
      // abstract: true,
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })
    .state('twitter', {
      url: '/auth/twitter',
      // abstract: true,
      templateUrl: 'index.html',
      controller: 'AuthController'
    });

}]);

// ff.run(['$state', function($state) {}]);