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
    });

}]);

// ff.run(['$state', function($state) {}]);