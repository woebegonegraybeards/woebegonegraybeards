
angular.module('ff.services').service('TwitterCheck', function($http) {
  var checkAuth = function() {
    return $http({
      method: 'GET',
      url: '/api/twittercheck/'   // Checks if we're authorized yet
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    })
  };

  return {
    checkAuth: checkAuth
  };
});

angular.module('ff.services').service('InstagramCheck', function($http) {
  var checkAuth = function() {
    return $http({
      method: 'GET',
      url: '/api/instagramcheck/'   // Checks if we're authorized yet
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    })
  };

  return {
    checkAuth: checkAuth
  };
});