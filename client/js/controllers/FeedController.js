angular.module('ff.controllers').controller('FeedController', function($scope, Feed, Twitter, Instagram) {
  // $scope.getTwitterData = function() {
  //   Twitter.getData().then(function(results) {
  //     $scope.twitterData = results.data;
  //   }, function(error) {
  //     console.error(error);
  //   })
  // };

  // $scope.getInstagramData = function() {
  //   Instagram.getData().then(function(results) {
  //     $scope.instagramData = results.data;
  //   }, function(error) {
  //     console.error(error);
  //   })
  // };

  // $scope.getTwitterData(); // Initial call
  // $scope.getInstagramData(); // Initial call
  // $scope.query = Feed.query;

  // console.log($scope.query);

  $scope.$watch(function() {
    return Feed.getQuery();
  }, function(newQuery, oldQuery) {
    if (newQuery !== null) {
      $scope.query = newQuery;
      Twitter.getData($scope.query).then(function(results) {
        $scope.twitterData = results.data;
      }, function(error) {
        console.error(error);
      });

      Instagram.getData($scope.query).then(function(results) {
        $scope.instagramData = results.data;
      }, function(error) {
        console.error(error);
      });
    }
  }, true);
});