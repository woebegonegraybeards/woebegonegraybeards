angular.module('ff.controllers').controller('MainController', function($scope, Feed) {
  $scope.processSearch = function(query) {
    Feed.setQuery(query);
  }; 
});