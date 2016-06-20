angular.module('ff.controllers').controller('FeedController', function($scope, Feed, Twitter, Instagram, $timeout, $q) {
  $scope.loading = true;

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
  // $scope.twitterData = null;
  // $scope.instagramData = null;

  $scope.$watch(function() {
    return Feed.getQuery();
  }, function(newQuery, oldQuery) {
    if (newQuery !== null) {                     // Makes sure there is a search term
      $scope.query = newQuery;                   // Grabs query
      Twitter.getData($scope.query)              // Call Twitter API with query
        .then(function(results) {
          if ( !results.data ) {                 // Checks to see if Twitter was authorized
            $scope.twitterData = undefined;      // If not, set twitter data to undefined
          } else {                               // If it was authorized, store the results data
            $scope.twitterData = results.data;   // Stores the Twitter results array
          }
        }, function(error) {
          console.error(error);
        })
        .then(function(){
          Instagram.getData($scope.query).then(function(results) {  // Call Instagram API with query
            $scope.instagramData = results.data.data;               // Stores the Instagram results array
          })                                                        // If we're not authorized, this will be set to undefined
          .then(function(){
            if ( $scope.twitterData !== undefined && $scope.instagramData !== undefined ){        // If both data sets exist
              $scope.sort($scope.twitterData, $scope.instagramData);  // Invoke sort function with twitterData and instagramData
            } else if ( $scope.twitterData !== undefined && $scope.instagramData === undefined ) {  // If only Twitter data exists
              $scope.sort($scope.twitterData, null);                  // Invoke only Twitter, pass null for Instagram
            } else if ( $scope.instagramData !== undefined && $scope.twitterData === undefined ) {  // If only Instagram data exists
              $scope.sort(null, $scope.instagramData);                // Invoke only Instagram, pass null for Twitter
            }
          })
          .catch(function( err ) {
            console.error(err);
          });
        })
        .catch(function( err ) {
          console.error(err);
        });
    }
  }, true);
  
  // Sort function organizes the API responses from Twitter and Instagram into one final sorted array
  $scope.sort = function( twitter, instagram ) {
    
    $scope.unsorted = [];                 // Creates unsorted array
    
    var epochConverter = function(str){   // Designed to convert Twitters original user.created_at string into epoch time
      var fullDate = str,
          day = str.substring(8,10),
          mon = str.substring(4,7),
          year = str.substring(26),
          hour = str.substring(11,13),
          min = str.substring(14,16),
          sec = str.substring(17,19);
      var mnths = { 
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
      return Date.UTC(year, mnths[mon], day, hour, min, sec);
    };
    
    if ( instagram !== null) {            // Checks to see if Instagram data was passed
      instagram.forEach(function(val){    // Converts Instagram created_time to uniform dat with Twitter
        var time = val.created_time;
        val.source_network = 'instagram';
        val.created_at = parseInt(time) * 1000;
        val.userName = val.user.full_name;
      });
      
      instagram.forEach(function(val){  // If true, push data into unsorted array
        $scope.unsorted.push(val);      // Pushes each post into the unsorted array
      });
    }

    if ( twitter !== null) {              // Checks to see if Twitter data was passed
      twitter.forEach(function(val){      // Converts Twitter created_at to epoch time to match Instagram
        var time = val.created_at;
        val.time_string = time;
        var offset = val.user.utc_offset;
        var epochTime = epochConverter(time);                   // Converts created_at string to an epoch time integer
        var correctedTime = epochTime;
        // var time2 = correctedTime.toString().substring(0,11);  // Makes the epoch time 10 digits like Instagram
        val.source_network = 'twitter';                         // Adds a source_network property
        val.created_at = parseInt(correctedTime);               // Turns epoch time to a string again after last line
        val.userName = val.user.name;
      });
      
      twitter.forEach(function(val){    // If true, push data into unsorted array
        $scope.unsorted.push(val);      // Pushes each tweet into the unsorted array
      });
    }
    
    $scope.reverseSort = _.sortBy($scope.unsorted, function(val){    // Creates a sorted array out of unsorted array
      return val.created_at;                                    // This new array is sorted by created_at property
    });
    
    $scope.sorted = $scope.reverseSort.reverse();   // Reverses sorted array so newest posts are on top
    
    // console.log('after sort: ', $scope.sorted);
  };

  $scope.refreshWidgets = function() {
    twttr.widgets.load();
    instgrm.Embeds.process();
  };

  var twitterWidget = Feed.getTwitterWidget();
  var instagramWidget = Feed.getInstagramWidget();

  $q.all([twitterWidget, instagramWidget]).then(function(results) {
    $timeout(function() {
      $scope.refreshWidgets();
      $scope.loading = false;
    }, 2500);
  });

  // $timeout(function() {
  //   console.log('calling widget: ');
  //   $.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true});
    
  //   $.ajax({ url: 'http://platform.instagram.com/en_US/embeds.js', dataType: 'script', cache:true});
  //   $scope.refreshWidgets();
  //   $scope.loading = false;
  // }, 2500);
  
});
