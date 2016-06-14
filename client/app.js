var ff = angular.module('feedfuse', [
  'ff.controllers',
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
    .state('test', {
      url: '/test',
      // abstract: true,
      templateUrl: 'index.html',
      controller: 'MainController'
    });

}]);

// ff.run(['$state', function($state) {}]);