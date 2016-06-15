
// server/routes/routes.js

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
    console.log('/feed | req.session', req.session);
    res.send(200, '/feed | whats up');
    
    res.json(allData);    // Sends 
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
    
    