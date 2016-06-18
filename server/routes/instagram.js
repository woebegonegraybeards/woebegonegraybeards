
// server/routes/instagram.js

var express         = require('express');
var expressSession  = require('express-session');
var request         = require('request');
var Config          = require('../config/config');            // Contains API Keys
var ig              = require('instagram-node').instagram();  // Requires ig package

// https://www.npmjs.com/package/instagram-node
// ig.use({ access_token: aToken });
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
        console.log('ERROR: Instagram Callback');
        console.log(' >>>>>>>>>', err.body);
        res.send("Didn't work");
      } else {
        req.session.instagram = {};                                 // Creates session instagram oauth object
        req.session.instagram.access_token = result.access_token;   // Stores access token in instagram session
        // ig.use({ access_token: result.access_token });
        res.redirect('/');                                           // Redirects to '/login' with both access tokens
      }
    });
    
  });
  
  // Instagram API calls -------------------------------------------------------
  
  // app.get('/api/instagram')
  // https://api.instagram.com/v1/tags/{tag-name}?access_token=ACCESS-TOKEN
  
  // YOU HAVE TO DO THIS BEFORE ANYTHING TO AUTH INSTAGRAM PUBLIC CONTENT REQUESTS
  // https://www.instagram.com/oauth/authorize/?client_id=d4767b89c3f4466cbaafab1abed7d151&redirect_uri=http://127.0.0.1:5000/auth/instagram/callback&response_type=code&scope=public_content

  // 
  app.post('/api/instagram', function(req, res) {
    var query = req.body.search;
    request('https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=' + req.session.instagram.access_token + '&count=10', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('Instagram WORK!!!', JSON.parse(body));
        res.json(JSON.parse(body));
      }
    });
    
    /*
    ig.use({                                         // Sets our ig id and secret
      client_id: Config.instagramConfig.id,
      client_secret: Config.instagramConfig.secret 
    });
    
    // Check if req.session.instagram.access_token exists
    if ( req.session.instagram.access_token !== undefined ) {
      console.log('WE HAVE INSTAGRAM ACCESS TOKENS');
      ig.use({ access_token: req.session.instagram.access_token });
      // If true, make API req
      // ig.user('tsaopow', function(err, result, remaining, limit) {
      ig.user_search('pizza', { count: 10 }, function(err, users, remaining, limit) {
      // ig.user_self_feed( function(err, medias, pagination, remaining, limit) {
      // ig.user_self_media_recent( function(err, medias, pagination, remaining, limit) {
      // ig.tag_search('pizza', function(err, result, remaining, limit) {
        if ( err ){ 
          console.log('ERROR: Instagram API');
          console.log(' >>>>>>>>>', err);
          return;
        } 
        console.log('API: Instagram ---------------------------');
        console.log('>>>>>>>>>>>>>> Instagram Medias: ', result);
        res.json(result);
      });
    } else {
      // DO SOMETHING
      res.json({'Error': "Sorry you're not authorized for Instagram"});
      // res.send(404, "Sorry you're not authorized for Instagram");
    }
    */
    // res.send(200, 'api instagram response');
    
  });

};
    
    