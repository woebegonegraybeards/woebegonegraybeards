
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
        req.session.twitter = {};                                     // Creates twitter session object
        req.session.twitter.requestToken = requestToken;              // Stores token in session
        req.session.twitter.requestTokenSecret = requestTokenSecret;  // Store tokenSecret in session
        res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + requestToken);
      }
    });
  });
  
  // After you're authorized
  app.get('/auth/twitter/callback', function(req, res) {
    req.session.twitter.oauth_verifier = req.query['oauth_verifier']; // Stores oauth_verifier in session
    twitter.getAccessToken(req.session.twitter.requestToken,
                           req.session.twitter.requestTokenSecret, 
                           req.session.twitter.oauth_verifier, 
                           function(error, accessToken, accessTokenSecret, results) {
      if (error) {
        console.log('ERROR: Twitter Callback');
        console.log(' >>>>>>>>>', error.body);
      } else {
        req.session.twitter.accessToken = accessToken;              // Stores accessToken in session
        req.session.twitter.accessTokenSecret = accessTokenSecret;  // Stores accessTokenSecret in session
        res.redirect('/');                                           // Redirects to '/login' with both access tokens      
      }
    });
  });
  
  // API Twitter Calls ----------------------------------------------------------------
  
  // More info on different twitter methods
  // https://www.npmjs.com/package/node-twitter-api

  // https://dev.twitter.com/rest/reference/get/statuses/home_timeline
  
  // 10 recent tweets from homepage
  app.post('/api/twitter', function(req, res) {
    
    // Parse our req.body for query
    var query = req.body.search;
    if ( req.session.twitter ){
      if ( req.session.twitter.accessToken !== undefined ){         // Checks if Twitter access token exists
        // since_id: 744004317619716100
        // twitter.getTimeline('home',                              // Makes home time line request
        twitter.search( { q: '%23' + query, count: 10, result_type: 'recent' }, // Number of Tweets requested
                            req.session.twitter.accessToken,        // Passes session accessToken
                            req.session.twitter.accessTokenSecret,  // Passes session accessTokenSecret
                            function(err, data, response){
          // console.log('API: Twitter -----------------------------' );
          // console.log('>>>>>>>>>>>>>> Twitter Data: ', data.statuses);
          res.json(data.statuses);                 // Sends data back to front-end
        });
      } else {
        res.send(404, undefined); // Sends back undefined if you're not authorized
      }
    } else {
      res.send(404, undefined); // Sends back undefined if you don't have a twitter session
    }
  });
  
  /* BACKLOG -----------
  
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
  
    BACKLOG -----------
  */
  
};