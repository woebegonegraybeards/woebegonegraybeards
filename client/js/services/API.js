angular.module('ff.services', [])

.service('API', function($q, $http) {
  var getData = function() {
    return $http({
      method: 'GET',
      url: '/feed'
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    })
  };

  return {
    getData: getData
  };
});