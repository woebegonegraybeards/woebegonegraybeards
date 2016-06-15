
// server/routes/instagram.js

var express         = require('express');
var expressSession  = require('express-session');
var Config          = require('../config/config');            // Contains API Keys
var ig              = require('instagram-node').instagram();  // Requires ig package

// https://www.npmjs.com/package/instagram-node

// ig.use({ access_token: 'YOUR_ACCESS_TOKEN' });
ig.use({                                         // Sets our ig id and secret
  client_id: Config.instagramConfig.id,
  client_secret: Config.instagramConfig.secret 
});

// Sets a redirect url for our authorization
var ig_redirect_uri = 'http://127.0.0.1:5000/auth/instagram/callback';

module.exports = function(app) {
  
  // Instagram Authentication --------------------------------------------------
  
  // Authentication
  app.get('/auth/instagram', function(req, res) {
    res.redirect(ig.get_authorization_url(ig_redirect_uri));    // This redirects to Instagram to authorize
  });

  // After you're authorized
  app.get('/auth/instagram/callback', function(req, res) {
    ig.authorize_user(req.query.code,           // authorize_user receives and sets access_token to our session
                      ig_redirect_uri,          // Passes our redirect uri
                      function(err, result) {
      if (err) {                                // Checks for error
        console.log(err.body);
        res.send("Didn't work");
      } else {
        // req.session.oauth = {};                        // Creates oauth session object
        req.session.oauth.instagram = {};                                 // Creates session instagram oauth object
        req.session.oauth.instagram.access_token = result.access_token;   // Stores access token in instagram session
        // res.redirect('/');                                           // Redirects to '/login' with both access tokens
      }
    });
    
  });
  
  // Instagram API calls -------------------------------------------------------

  // 
  app.get('/api/instagram', function(req, res) {
    console.log('api instagram');
    
    // Check if req.session.oauth.instagram.access_token exists
      // If true, make API req
    
    res.send(200, 'api instagram response');
  });

};
    
    