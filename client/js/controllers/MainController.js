angular.module('ff.controllers').controller('MainController', function($scope, Twitter) {
  $scope.greeting = 'Hello world';

  $scope.authTwitter = function() {
    Twitter.auth().then(function(data) {
      console.log('le data:', data);
    }, function(error) {
      console.error(error);
    });
  }
});