
// server/routes/twitter.js

var express             = require('express');
var passport            = require('passport');
var connectEnsureLogin  = require('connect-ensure-login');
  
module.exports = function(app) {

  // Authentication
  app.get('/auth/twitter',
    passport.authenticate('twitter')
  );
  
  // After you're authorized
  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
  });
  
  app.get('/feed',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.render('feed', { user: req.user });
  });
  
  // https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi
  
  // API Call: Recent Posts
  app.get('/api/twitter', function(req, res) {
    // Request recent timeline
    // example: q=pizza&result_type=recent
    // q= + 'search string'
    // &result_type=recent = set results to recent
    
    // URL = 'https://api.twitter.com/1.1/search/tweets.json?' + query
    res.send(200, '/api/twitter route works yee')
  });
  
  // API Call: Top Posts
  app.get('/api/twitter/top', function(req, res) {
    // Request top posts
    res.send(200, '/api/twitter route works yee')
  });
  
  // API Call: Hash Tag Search
  app.get('/api/twitter/hash', function(req, res) {
    // hashtag = %23 + 'string'
    res.send(200, '/api/twitter route works yee')
  });
    
};