
// server/routes/routes.js

var twitterAPI      = require('node-twitter-api');
var Config          = require('../config/config');  // Contains API Keys

module.exports = function(app) {

  app.get('/api/twittercheck', function(req, res) {         // This runs every time the homepage is loaded to see if your authenticated
    var authorized = req.session.twitter ? true : false;    // Checks if we're authorized yet, sends back boolean
    res.send(200, authorized);
  });
  
  app.get('/api/instagramcheck', function(req, res) {       // This runs every time the homepage is loaded to see if your authenticated
    var authorized = req.session.instagram ? true : false;  // Checks if we're authorized yet, sends back boolean
    res.send(200, authorized);
  });
  
  // Handles GET requests
  // app.get('/api', function(req, res) {   // We don't actually use this route
  //   console.log('/api route');
  //   res.send(200, 'api response');
  // });
  
  // /feed Route
  // app.get('/feed', function(req, res) {    // We don't actually use this route
  //   res.send(200, '/feed | whats up');
  // });
    
  // Front End Routes - handle all angular requests
  // app.get('/', function(req, res) {        // We don't actually use this route
  //   res.sendfile('./client/index.html'); // load our public/index.html file
  // });
};
    
    