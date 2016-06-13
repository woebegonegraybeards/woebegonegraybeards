
// server/routes/facebook.js

module.exports = function(app) {

  // Handles GET requests
  app.get('/api/facebook', function(req, res) {
    console.log('api facebook');
    res.send(200, 'api facebook response');
  });

};
    
    