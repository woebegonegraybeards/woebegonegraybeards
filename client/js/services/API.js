angular.module('ff.services').service('Twitter', function($q, $http) {
  var getData = function() {
    return $http({
      method: 'GET',
      url: '/api/twitter'
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

angular.module('ff.services').service('Instagram', function($q, $http) {
  var getData = function() {
    return $http({
      method: 'GET',
      url: '/api/instagram'
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