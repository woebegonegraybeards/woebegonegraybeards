
// server/routes/routes.js

module.exports = function(app) {

  // Handles GET requests
  // app.get('/', function(req, res) {
  
  // });
  
  // Front End Routes - handle all angular requests
  app.get('*', function(req, res) {
    console.log('routes.js called');
    res.sendfile('./client/index.html'); // load our public/index.html file
  });

};
    
    