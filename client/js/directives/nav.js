angular.module('ff.directives', [])

.directive('nav', function() {
  return {
    templateUrl: '../../views/nav.html',
    replace: false,
    restrict: 'E',
    controller: function($scope) {
      
    }
  };
});