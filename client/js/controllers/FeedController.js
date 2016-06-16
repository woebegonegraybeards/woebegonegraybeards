angular.module('ff.controllers').controller('FeedController', function($scope, Twitter, Instagram) {
  $scope.getTwitterData = function() {
    Twitter.getData().then(function(results) {
      $scope.twitterData = results.data;
    }, function(error) {
      console.error(error);
    })
  };

  $scope.getInstagramData = function() {
    Instagram.getData().then(function(results) {
      $scope.instagramData = results.data;
    }, function(error) {
      console.error(error);
    })
  };

  $scope.getTwitterData(); // Initial call
  $scope.getInstagramData(); // Initial call

});