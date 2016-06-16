angular.module('ff.controllers').controller('FeedController', function($scope, Twitter, Instagram) {
  $scope.getTwitterData = function() {
    Twitter.getData().then(function(results) {
      $scope.data = results.data;
    }, function(error) {
      console.error(error);
    })
  };

  $scope.getTwitterData(); // Initial call

});