
// server/routes/instagram.js

module.exports = function(app) {

  // Handles GET requests
  app.get('/api/instagram', function(req, res) {
    console.log('api instagram');
    res.send(200, 'api instagram response');
  });

};
    
    