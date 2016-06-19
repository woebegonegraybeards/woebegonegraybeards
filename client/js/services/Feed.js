angular.module('ff.services').service('Feed', function($http, $q) {
  var _query = '';
  
  return {
    getQuery: function() {
      return _query;
    },

    setQuery: function(value) {
      _query = value;
    },

    getTwitterWidget: function() {
      var deferred = $q.defer();
      $.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true}).done(function(data) {
        deferred.resolve(data);
      });

      // $http.get('http://platform.twitter.com/widgets.js', {
      //   cache: true
      // }).then(function(script) {
      //   deferred.resolve(script);
      // }, function(error) {
      //   deferred.reject(error);
      // });

      return deferred.promise;
    },

    getInstagramWidget: function() {
      var deferred = $q.defer();
      $.ajax({ url: 'http://platform.instagram.com/en_US/embeds.js', dataType: 'script', cache:true}).then(function(data) {
        deferred.resolve(data);
      });

      // $http.get('http://platform.instagram.com/en_US/embeds.js', {
      //   cache: true
      // }).then(function(script) {
      //   deferred.resolve(script);
      // }, function(error) {
      //   deferred.reject(error);
      // });

      return deferred.promise;

    }
  };
});