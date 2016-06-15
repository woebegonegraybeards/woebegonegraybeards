
// server/routes/twitter.js

var express         = require('express');
var expressSession  = require('express-session');
var request         = require('request');
var twitterAPI      = require('node-twitter-api');
var Config          = require('../config/config');  // Contains API Keys

var twitter = new twitterAPI({
  consumerKey: Config.twitterConfig.key,                    // FeedFuse app key
  consumerSecret: Config.twitterConfig.secret,              // FeedFuse app secret key
  callback: "http://127.0.0.1:5000/auth/twitter/callback"   // Redirect-callback URL after /auth/twitter redirect passes
});
  
module.exports = function(app) {
  
  // Twitter Authentication --------------------------------------------------------
  
  // Authentication
  app.get('/auth/twitter', function(req, res) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
      if (error) {
        console.log("Error getting OAuth request token : " + error);
      } else {
        // req.session.oauth = {};                        // Creates oauth session object
        req.session.oauth.twitter = {};                                     // Creates twitter session object
        req.session.oauth.twitter.requestToken = requestToken;              // Stores token in session
        req.session.oauth.twitter.requestTokenSecret = requestTokenSecret;  // Store tokenSecret in session
        res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + requestToken);
      }
    });
  });
  
  // After you're authorized
  app.get('/auth/twitter/callback', function(req, res) {
    req.session.oauth.twitter.oauth_verifier = req.query['oauth_verifier']; // Stores oauth_verifier in session
    twitter.getAccessToken(req.session.oauth.twitter.requestToken,
                           req.session.oauth.twitter.requestTokenSecret, 
                           req.session.oauth.twitter.oauth_verifier, 
                           function(error, accessToken, accessTokenSecret, results) {
      if (error) {
        console.log(error);
      } else {
        req.session.oauth.twitter.accessToken = accessToken;              // Stores accessToken in session
        req.session.oauth.twitter.accessTokenSecret = accessTokenSecret;  // Stores accessTokenSecret in session
        // res.redirect('/');                                           // Redirects to '/login' with both access tokens      
      }
    });
  });
  
  // API Twitter Calls ----------------------------------------------------------------
  
  // More info on different twitter methods
  // https://www.npmjs.com/package/node-twitter-api

  // https://dev.twitter.com/rest/reference/get/statuses/home_timeline
  
  // 10 recent tweets from homepage
  app.get('/api/twitter', function(req, res) {
    if ( req.session.oauth.twitter.accessToken ){     // Checks if Twitter access token exists
      twitter.getTimeline('home',                                       // Makes home time line request
                          {count: 2},                                   // Number of Tweets requested
                          req.session.oauth.twitter.accessToken,        // Passes session accessToken
                          req.session.oauth.twitter.accessTokenSecret,  // Passes session accessTokenSecret
                          function(err, data, response){
        console.log('data: ', data);
        res.json(data);                 // Sends data back to front-end
      });
    } else {
      // If not authenticated DO SOMETHING
    }
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
  
  
};