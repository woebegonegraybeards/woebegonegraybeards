angular.module('ff.controllers').controller('MainController', function($scope, Feed, TwitterCheck, InstagramCheck) {
  $scope.twitterCheckShow = false; // Hides check mark until we're authorized
  $scope.instagramCheckShow = false; // Hides check mark until we're authorized
  
  $scope.processSearch = function(query) {
    Feed.setQuery(query);
    Feed.setDataExists(true);
  }; 
  
  $scope.checkAuths = function(){
    // Sends GET req to backend to check sessions auth for Twitter
    TwitterCheck.checkAuth().then(function(result){
      if (result.data === true) {
        $scope.twitterCheckShow = true; // If Twitter is authorized, show check mark
      };
    }).catch(function(err) {
      console.error(err);
    });
    
    // Sends GET req to backend to check sessions auth for Instagram
    InstagramCheck.checkAuth().then(function(result){
      if (result.data === true) {
        $scope.instagramCheckShow = true; // If Instagram is authorized, show check mark
      };
    }).catch(function(err) {
      console.error(err);
    });
  };

  // Watch for whether Feed lacks data to show 'no data found' alert
  $scope.$watch(function() {
    return Feed.getDataExists();
  }, function(newVal, oldVal) {
    if (newVal === false) {
      $scope.dataExists = false;
    }
  });

  $scope.checkAuths(); // Invoke this function on controller load
});