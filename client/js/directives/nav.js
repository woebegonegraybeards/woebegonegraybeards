angular.module('ff.directives').directive('nav', function() {
  return {
    restrict: 'E',
    templateUrl: '../../views/nav.html',
    replace: false
  };
});