angular.module('ff.directives').directive('twitter', function() {
  return {
    restrict: 'EA',
    templateUrl: '../../views/twitter.html',
    replace: false,
    scope: {
      post: '='
    },
  };
});