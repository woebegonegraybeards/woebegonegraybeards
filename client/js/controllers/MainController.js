angular.module('ff.controllers').controller('MainController', function($scope, Twitter) {
  $scope.getTimeline = function() {
    Twitter.getTimeline().then(function(data) {
      console.log('twitter data:', data);
    }, function(error) {
      console.error(error);
    });
  }
});