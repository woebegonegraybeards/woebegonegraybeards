angular.module('ff.services').service('Feed', function($q) {
  var _query = '';
  var dataExists = true; // Flag for whether APIs returned data
  
  return {
    getQuery: function() {
      return _query;
    },

    setQuery: function(value) {
      _query = value;
    },

    getTwitterWidget: function() {
      var deferred = $q.defer();

      // $.ajax is jQuery AJAX request, used to retain dataType
      // Could probably be refactored to use $http
      $.ajax({
        url: 'http://platform.twitter.com/widgets.js',
        dataType: 'script',
        cache: true
      }).done(function(data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    },

    getInstagramWidget: function() {
      var deferred = $q.defer();

      // $.ajax is jQuery AJAX request, used to retain dataType
      // Could probably be refactored to use $http
      $.ajax({
        url: 'http://platform.instagram.com/en_US/embeds.js',
        dataType: 'script',
        cache: true
      }).then(function(data) {
        deferred.resolve(data);
      });

      return deferred.promise;
    },

    getDataExists: function () {
      return dataExists;
    },

    setDataExists: function(bool) {
      dataExists = bool;
    }
  };
});