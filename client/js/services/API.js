angular.module('ff.services').service('Twitter', function($q, $http) {
  var getData = function(query) {
    return $http({
      method: 'POST',
      url: '/api/twitter/',
      data: JSON.stringify({search: query})
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
  var getData = function(query) {
    return $http({
      method: 'GET',
      url: '/api/instagram/',
      // data: JSON.stringify({search: query})
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