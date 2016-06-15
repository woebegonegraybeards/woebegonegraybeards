angular.module('ff.services', [])

.service('Twitter', function($q, $http) {
  var getTimeline = function() {
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
    getTimeline: getTimeline
  };
});