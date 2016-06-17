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
  
  // Word.GET()
  //       .then( function( res ){
  //         $scope.allWords = res;
  //       })
  //       .catch(function( err ) {
  //         console.error(err);
  //       });

  $scope.$watch(function() {
    return Feed.getQuery();
  }, function(newQuery, oldQuery) {
    if (newQuery !== null) {
      $scope.query = newQuery;                                    // Grabs query
      Twitter.getData($scope.query)                               // Call Twitter API with query
        .then(function(results) {
          $scope.twitterData = results.data;                      // Stores the Twitter results array
        }, function(error) {
          console.error(error);
        })
        .then(function(){
          Instagram.getData($scope.query).then(function(results) {  // Call Instagram API with query
            $scope.instagramData = results.data.data;               // Stores the Instagram results array
          }, function(error) {
            console.error(error);
          })
          .then(function(){
            $scope.sort($scope.twitterData, $scope.instagramData);  // Invoke sort function with twitterData and instagramData
          })
        })
        .catch(function( err ) {
          console.error(err);
        });

      
    }
  }, true);
  
  // Sort function organizes 
  $scope.sort = function( twitter, instagram ) {
    
    var epochConverter = function(str){
      var fullDate = str,
          day = str.substring(8,10),
          mon = str.substring(4,7),
          year = str.substring(26),
          hour = str.substring(11,13),
          min = str.substring(14,16),
          sec = str.substring(17,19);
      var mnths = { 
        Jan:"01", Feb:"02", Mar:"03", Apr:"04", May:"05", Jun:"06",
        Jul:"07", Aug:"08", Sep:"09", Oct:"10", Nov:"11", Dec:"12" };
      return Date.UTC(year, mnths[mon], day, hour, min, sec);
    };
    
    // 1466097346
    instagram.forEach(function(val){    // Converts Instagram created_time to uniform dat with Twitter
      var time = val.created_time;
      val.created_at = parseInt(time);
    });
    
    // 1468712716000
    twitter.forEach(function(val){      // Converts Twitter created_at to epoch time to match Instagram
      var time = val.created_at;
      val.created_at = epochConverter(time);
    });
    
    $scope.unsorted = [];   // Creates unsorted array
    
    instagram.forEach(function(val){
      $scope.unsorted.push(val);      // Pushes 
    });
    
    twitter.forEach(function(val){
      $scope.unsorted.push(val);
    });
    
    console.log('unsorted: ', $scope.unsorted);
    
    $scope.unsorted.sort(function(val){
      return val.created_at;
    });
    
    console.log('unsorted after sort: ', $scope.unsorted);
    
    console.log('has twitter data? ', twitter );
    console.log('has instagram data?: ', instagram);
  };
});




