angular.module('ff.controllers').controller('FeedController', function($scope, API) {
  $scope.getData = function() {
    API.getData().then(function(results) {
      $scope.data = results.data;
    }, function(error) {
      console.error(error);
    })
  }

  $scope.getData(); // Initial call
});