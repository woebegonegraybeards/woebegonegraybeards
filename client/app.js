var ff = angular.module('feedfuse', [
  'ui.router',
  'ngAnimate'
]);

ff.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/'
    });
});