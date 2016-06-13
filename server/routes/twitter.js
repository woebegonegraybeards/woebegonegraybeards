
// server/routes/twitter.js

module.exports = function(app) {

  // Handles GET requests
  app.get('/api/twitter', function(req, res) {
    console.log('api twitter');
    res.send(200, 'api twitter response');
  });

};
    
    