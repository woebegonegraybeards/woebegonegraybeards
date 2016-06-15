angular.module('ff.controllers').controller('LoginController', function($scope, Login) {
  $scope.login = function() {
    Login.session();
  }

  $scope.login();
});