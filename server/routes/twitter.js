
// server/routes/twitter.js

var express        = require('express');
var request        = require('request');
var twitterAPI     = require('node-twitter-api');
var Config         = require('../config/config');  // Contains API Keys

var twitter = new twitterAPI({
  consumerKey: Config.twitterConfig.key,                    // FeedFuse app key
  consumerSecret: Config.twitterConfig.secret,              // FeedFuse app secret key
  callback: "http://127.0.0.1:5000/auth/twitter/callback"   // Redirect-callback URL after /auth/twitter redirect passes
});

var reqToken = null,        // Stores requestToken
    reqTokenSecret = null,  // Stores requestTokenSecret
    o_verifier = null,      // Stores oauth_verifier
    userResults = null,     // Stores results
    aToken = null,          // Stores accessToken
    aTokenSecret;           // Stores accessTokenSecret
  
module.exports = function(app) {
  
  // Twitter Authentication --------------------------------------------------------
  
  // Authentication
  app.get('/auth/twitter', function(req, res) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
      if (error) {
        console.log("Error getting OAuth request token : " + error);
      } else {
        reqToken = requestToken;              // Stores token
        reqTokenSecret = requestTokenSecret;  // Store tokenSecret
        // Redirect user to Twitter with their reqToken
        res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + reqToken);
      }
    });
  });
  
  // After you're authorized
  app.get('/auth/twitter/callback', function(req, res){
    o_verifier = req.query['oauth_verifier'];
    console.log('/auth/twitter/callback RAN', req.query['oauth_verifier']);
    twitter.getAccessToken(reqToken, reqTokenSecret, o_verifier, function(error, accessToken, accessTokenSecret, results) {
      if (error) {
        console.log(error);
      } else {
        aToken = accessToken;               // Stores accessToken          
        aTokenSecret = accessTokenSecret;   // Stores accessTokenSecret
        userResults = results;              // Stores results
        res.redirect('/api/twitter');       // Redirects to /api/twitter with both access tokens      
      }
    });
  // });
  
  
  // API Twitter Calls ----------------------------------------------------------------
  
  // More info on different twitter methods
  // https://www.npmjs.com/package/node-twitter-api
  
  // https://dev.twitter.com/rest/reference/get/statuses/home_timeline
  
  // 10 recent tweets from homepage
  app.get('/api/twitter', function(req, res) {
    
    twitter.getTimeline('home', {count: 1}, aToken, aTokenSecret, function(err, data, response){
      console.log('/api/twitter 10 recent tweets!');
      
      // Data = 10 recent Tweets from authorized users Twitter feed
      // Need to send this data back to front-end to be organized and sorted
      console.log('data: ', data);
      // return data;
      // res.json(data);
      // res.send(200, '/');
      res.sendfile('./client/index.html'); // TEMPORARY FIX
    });
    
  });
  
  // Top Posts
  app.get('/api/twitter/top', function(req, res) {
    // Request top posts
    res.send(200, '/api/twitter route works yee')
  });
  
  // Hash Tag Search
  app.get('/api/twitter/hash', function(req, res) {
    // hashtag = %23 + 'string'
    res.send(200, '/api/twitter route works yee')
  });
  
  // app.get('/feed',
  //   // require('connect-ensure-login').ensureLoggedIn(),
  //   // function(req, res){
  //   //   res.render('feed', { user: req.user });
  // });
    
    });
};