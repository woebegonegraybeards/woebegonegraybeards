angular.module('ff.services').service('Feed', function($http) {
  var _query = '';
  
  return {
    getQuery: function() {
      return _query;
    },

    setQuery: function(value) {
      _query = value;
    }
  };
});