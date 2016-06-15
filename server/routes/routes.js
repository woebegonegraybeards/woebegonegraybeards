
// server/routes/routes.js

module.exports = function(app) {

  // Handles GET requests
  app.get('/api', function(req, res) {
    console.log('/api route');
    res.send(200, 'api response');
  });
  
  // oauth test
  app.get('/feed', function(req, res) {
    console.log('/feed | req.session.oauth', req.session.oauth);
    res.send(200, '/feed | whats up');
  });
  
  // Front End Routes - handle all angular requests
  // app.get('*', function(req, res) {
  app.get('/', function(req, res) {
    console.log('/ route');
    res.sendfile('./client/index.html'); // load our public/index.html file
  });

};
    
    