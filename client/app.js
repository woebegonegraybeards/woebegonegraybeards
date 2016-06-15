var ff = angular.module('feedfuse', [
  'ff.directives',
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
      url: '/login',
      // abstract: true,
      templateUrl: 'views/home.html',
      controller: 'LoginController'
    })
    .state('feed', {
      url: '/feed',
      templateUrl: 'views/feed.html',
      controller: 'FeedController'
    });

}]);

// ff.run(['$state', function($state) {}]);