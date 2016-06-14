angular.module('ff.services', [])

.service('Twitter', function($q, $http) {
  var auth = function() {
    console.log('Twitter auth API call');
    return $http.get('/auth/twitter').then(function(data) {
      return data;
    });
  };

  return {
    auth: auth
  };
});