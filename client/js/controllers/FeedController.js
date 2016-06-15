angular.module('ff.controllers').controller('FeedController', function($scope, Twitter) {
  $scope.getTwitterHomeTimeline = function() {
    Twitter.getTimeline().then(function(results) {
      $scope.data = results.data;
    }, function(error) {
      console.error(error);
    });
  }

  $scope.getTwitterHomeTimeline();
});