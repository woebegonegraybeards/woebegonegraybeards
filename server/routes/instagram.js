
// server/routes/instagram.js

var express         = require('express');
var expressSession  = require('express-session');
var request         = require('request');
var Config          = require('../config/env');            // Contains API Keys
var ig              = require('instagram-node').instagram();  // Requires ig package

// https://www.npmjs.com/package/instagram-node
// ig.use({ access_token: aToken });
ig.use({                                         // Sets our ig client_id and client_secret
  client_id: Config.instagramConfig.id,          // Sets our id from our config file
  client_secret: Config.instagramConfig.secret   // Sets our secret key from our config file
});

// Sets a redirect url for our authorization
// var ig_redirect_uri = 'http://127.0.0.1:5000/auth/instagram/callback';
var ig_redirect_uri = 'http://feedfuse.herokuapp.com/auth/instagram/callback';

module.exports = function(app) {
  
  // Instagram Authentication --------------------------------------------------
  
  // Authentication
  app.get('/auth/instagram', function(req, res) {             // Handles Instagram Authorization requests from home.html
    res.redirect(ig.get_authorization_url(ig_redirect_uri));  // This redirects to Instagram to authorize, then redirects to our
                                                              // uri on line 18.
  });

  // After you're authorized
  app.get('/auth/instagram/callback', function(req, res) {    // After you authorize app on Instagram, you will redirect here.
    ig.authorize_user(req.query.code,           // This uses the 'instagram-node' module. Look at docs for more info.
                                                // authorize_user receives and sets access_token to our session
                      ig_redirect_uri,          // Passes our redirect uri from line 18 above.
                      function(err, result) {
      if (err) {                                // Checks for error
        // console.log('ERROR: Instagram Callback');
        // console.log(' >>>>>>>>>', err.body);
        res.send("Didn't work");
      } else {                                                      // Below we're using node's 'session' module to store access tokens.
        req.session.instagram = {};                                 // Creates session instagram oauth object
        req.session.instagram.access_token = result.access_token;   // Stores access token in instagram session
        res.redirect('/');                                          // Redirects to '/' after storing access token
      }
    });
    
  });
  
  // Instagram API calls -------------------------------------------------------
  
  // Example of 
  // https://api.instagram.com/v1/tags/{tag-name}?access_token=ACCESS-TOKEN
  
  //          \  /
  //           \/   Read the below
  
  // YOU HAVE TO DO THIS BEFORE ANYTHING TO AUTH INSTAGRAM PUBLIC CONTENT REQUESTS
  // https://www.instagram.com/oauth/authorize/?client_id=d4767b89c3f4466cbaafab1abed7d151&redirect_uri=http://127.0.0.1:5000/auth/instagram/callback&response_type=code&scope=public_content
  // https://www.instagram.com/oauth/authorize/?client_id=d4767b89c3f4466cbaafab1abed7d151&redirect_uri=http://feedfuse.herokuapp.com/auth/instagram/callback&response_type=code&scope=public_content
  
  
  //           /\
  //          /  \  Read the above
  
  // The Instagram API will only search hashtags of IG accounts we've added to our IG development account. This is very limiting.
  // Talk to Andrew about switching which IG accounts we've added. You can only add 9 or 10 different accounts to this app/api.
  // Read the docs for more info. The app is current in sandbox mode.
  // https://www.instagram.com/developer/sandbox/
  
  app.post('/api/instagram', function(req, res) { // Handles Instagram API calls from FeedController
    var query = req.body.search;              // Parse our req.body for query, this is the search term from the homepage
                                              // The below request is a node module for making http/api requests
                                              // The URL is from Instagram's docs. 'query' is the hashtag search term passed in from
                                              // the front end. req.session.instagram.access_token is created in your 
                                              // /auth/instagram/callback route. 
    request('https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=' + req.session.instagram.access_token + '&count=10', function (error, response, body) {
                                              // Sets count to 10. Check Instagram's docs for more parameters.
      if (!error && response.statusCode == 200) {   // If there is no error and
        console.log('Instagram WORK!!!', JSON.parse(body));  // Console logs the API results to the server
        res.json(JSON.parse(body));           // Sends back the API results to the front-end - FeedController.js line 21-23
      }
    });
    
  });

};
    
    