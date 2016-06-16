
// server/routes/routes.js

var twitterAPI      = require('node-twitter-api');
var Config          = require('../config/config');  // Contains API Keys

var twitter = new twitterAPI({
  consumerKey: Config.twitterConfig.key,                    // FeedFuse app key
  consumerSecret: Config.twitterConfig.secret,              // FeedFuse app secret key
  callback: "http://127.0.0.1:5000/auth/twitter/callback"   // Redirect-callback URL after /auth/twitter redirect passes
});

module.exports = function(app) {

  // Handles GET requests
  app.get('/api', function(req, res) {
    console.log('/api route');
    res.send(200, 'api response');
  });
  
  // oauth test
  app.get('/feed', function(req, res) {
    var allData = [];
    var instagramData = [];
    var twitterData = [];
    if ( req.session.twitter !== undefined ){     // Checks if Twitter access token exists
      console.log('req.session.twitter IS DEFINED');
      twitter.getTimeline('home',                                       // Makes home time line request
                          {count: 2},                                   // Number of Tweets requested
                          req.session.twitter.accessToken,        // Passes session accessToken
                          req.session.twitter.accessTokenSecret,  // Passes session accessTokenSecret
                          function(err, data, response){
        console.log('data: ', data);
        twitterData.push(data);
        // res.json(data);                 // Sends data back to front-end
      });
    } else {
      // If not authenticated DO SOMETHING
    }
    
    // console.log('/feed | req.session', req.session);
    console.log('twitter data: ', data);
    allData.push(twitterData);
    
    // res.send(200, '/feed | whats up');
    
    res.json(allData);    // Sends all of the data back 
  });
  
  app.get('/printSession', function(req, res) {
    console.log('/printSession | req.session.oauth', req.session);
    // res.send(200, '/feed | whats up');
    res.send(200, 'print session');
  });
    
  // Front End Routes - handle all angular requests
  // app.get('*', function(req, res) {
  app.get('/', function(req, res) {
    // alert('/');
    console.log('/========================YEEEEE========================');
    res.sendfile('./client/index.html'); // load our public/index.html file
  });
};
    
    