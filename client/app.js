var ff = angular.module('feedfuse', [
  'ff.directives',
  'ff.controllers',
  'ff.services',
  'ui.router',
  'ngAnimate',
  'ngSanitize'
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
    .state('feed', {
      url: '/feed',
      templateUrl: 'views/feed.html',
      controller: 'FeedController'
    });

}]);

/* https://gist.github.com/rishabhmhjn/7028079 */
ff.filter('tweetLinky',['$filter', '$sce',
  function($filter, $sce) {
    return function(text, target) {
      if (!text) return text;

      var replacedText = $filter('linky')(text, target);
      var targetAttr = "";
      if (angular.isDefined(target)) {
          targetAttr = ' target="' + target + '"';
      }

      // replace #hashtags
      var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
      replacedText = replacedText.replace(replacePattern1, '$1<a href="https://twitter.com/search?q=%23$2"' + targetAttr + '>#$2</a>');

      // replace @mentions
      var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="https://twitter.com/$2"' + targetAttr + '>@$2</a>');

      $sce.trustAsHtml(replacedText);
      return replacedText;
    };
  }
]);
