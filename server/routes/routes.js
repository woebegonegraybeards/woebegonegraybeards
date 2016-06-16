
// server/routes/routes.js

var twitterAPI      = require('node-twitter-api');
var Config          = require('../config/config');  // Contains API Keys

module.exports = function(app) {

  // Handles GET requests
  app.get('/api', function(req, res) {
    console.log('/api route');
    res.send(200, 'api response');
  });
  
  // /feed Route
  app.get('/feed', function(req, res) {
    res.send(200, '/feed | whats up');
  });
    
  // Front End Routes - handle all angular requests
  // app.get('*', function(req, res) {
  app.get('/', function(req, res) {
    // alert('/');
    console.log('/========================YEEEEE========================');
    res.sendfile('./client/index.html'); // load our public/index.html file
  });
};
    
    