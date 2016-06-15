angular.module('ff.services', [])

.service('Login', function($q, $http) {
  var session = function() {
    return $http({
      method: 'GET',
      url: '/'
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  }
  return {
    session: session
  };
});