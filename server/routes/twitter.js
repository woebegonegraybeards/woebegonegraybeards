
// server/routes/twitter.js

var express        = require('express');
var request        = require('request');
var twitterAPI     = require('node-twitter-api');
var Config         = require('../config/config');  // Contains API Keys

var twitter = new twitterAPI({
  consumerKey: Config.twitterConfig.key,
  consumerSecret: Config.twitterConfig.secret,
  callback: "http://127.0.0.1:5000/auth/twitter/callback"
  // callback: "http://www.google.com"
});

// var passport            = require('passport');
// var connectEnsureLogin  = require('connect-ensure-login');
  
var reqToken = null,
    reqTokenSecret = null,
    o_verifier = null,
    aToken = null,
    aTokenSecret;
  
module.exports = function(app) {
  
  // Authentication
  app.get('/auth/twitter', function(req, res) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
      if (error) {
        console.log("Error getting OAuth request token : " + error);
      } else {
        //store token and tokenSecret somewhere, you'll need them later; redirect user 
        // store token
        console.log('token: ', requestToken);
        reqToken = requestToken;
        // store tokenSecret
        console.log('token secret: ', requestTokenSecret);
        reqTokenSecret = requestTokenSecret;
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
        //store accessToken and accessTokenSecret somewhere (associated to the user) 
        aToken = accessToken;
        aTokenSecret = accessTokenSecret;
        console.log('accessToken: ', accessToken);
        console.log('accessTokenSecret: ', accessTokenSecret);
        console.log('results: ', results);
        // res.json(results);
        res.redirect('/api/twitter');
        
        /*
        //Step 4: Verify Credentials belongs here 
        twitter.verifyCredentials(aToken, aTokenSecret, params, function(error, data, response) {
          console.log('Credentials params: ', params);
          if (error) {
            //something was wrong with either accessToken or accessTokenSecret 
            //start over with Step 1 
            console.log('error with Credentials: ', error);
            res.redirect('/');
          } else {
            //accessToken and accessTokenSecret can now be used to make api-calls (not yet implemented) 
            //data contains the user-data described in the official Twitter-API-docs 
            //you could e.g. display his screen_name 
            console.log('data: ', data);
            console.log(data["screen_name"]);
            // MAKE OUR API CALL BIIIISH
            
              
          }
        });
        */
        
      }
    });
  
  // API TWEEEEET
  app.get('/api/twitter', function(req, res) {
    
    twitter.getTimeline('home', {count: 10}, aToken, aTokenSecret, function(err, data, res){
      console.log('made it inside of getTimeline');
      console.log('/api/twitter DATA: ', data);
      return data;
      // res.json(data);
    });
    
    // Request top posts
    // res.send(200, '/api/twitter route works yee')
    // console.log('/api/twitter req: ', req.body);
    // console.log('/api/twitter res: ', res.body);
    // res.json(body)
    // res.send(200, 'You"re not on api/twitter, deal with it');
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
    
    // console.log('/auth/twitter/callback');
    // res.send(200, 'YO');
    // res.json(body);  
  //   // passport.authenticate('twitter', { failureRedirect: '/login' }),
  //   // function(req, res) {
  //   //   // Successful authentication, redirect home.
  //   //   res.redirect('/');
  
  });
  
  // app.get('/feed',
  //   // require('connect-ensure-login').ensureLoggedIn(),
  //   // function(req, res){
  //   //   res.render('feed', { user: req.user });
  // });
  
  // https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi
  
  // API Call: Recent Posts
  // app.get('/api/twitter', function(req, res) {
  //   console.log('/api/twitter route ran');
    
    // Request recent timeline
    // example: q=pizza&result_type=recent
    // q= + 'search string'
    // &result_type=recent = set results to recent
    
    // URL = 'https://api.twitter.com/1.1/search/tweets.json?' + query
    
    // console.log('req.body: ', req.body);
    
    // if (!req.params.id) { 
    //   res.status(500); 
    //   res.send({"Error": "Looks like you are not senging the product id to get the product details."}); 
    //   console.log("Looks like you are not senging the product id to get the product detsails."); 
    // } 
    
    // https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi
    // andrewtsao
    
    // request({ url: "https://api.twitter.com/1.1/statuses/home_timeline.json" }, function(error, response, body) { 
    // request.get({ url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=andrewtsao" }, function(error, response, body) { 
      // console.log('request ran');
      
      // if( error ){ console.log('request ERROR: ', error); return; }
      
      // if (!error && response.statusCode == 200) { 
        // console.log('request 200 response: ');
        // res.json(body); 
      // } 
     // });
     
    // request('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=andrewtsao', function (error, response, body) {
    //   console.log('google request: ');
    //   // if (!error && response.statusCode == 200) {
    //     res.json(body);
    //     // console.log(body) // Print the google web page.
    //   // }
    // });


    
    // res.send(200, '/api/twitter route works yee')
  // });
    
};