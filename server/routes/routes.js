
// server/routes/routes.js
var state = false;

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
  
  app.get('/printSession', function(req, res) {
    console.log('/printSession | req.session.oauth', req.session.oauth);
    // res.send(200, '/feed | whats up');
    res.send(200, 'print session');
  });
  
  app.get('/', function(req, res){
    console.log('/login ran: ');
    if ( !state ) {
      console.log('oauth session init ==================================');
      req.session.oauth = {};                        // Creates oauth session object
      state = true;
    }
    res.redirect('/login');
  });
  
  // Front End Routes - handle all angular requests
  // app.get('*', function(req, res) {
  app.get('/login', function(req, res) {
    // alert('/');
    console.log('/========================YEEEEE========================');
    res.sendfile('./client/index.html'); // load our public/index.html file
  });
};
    
    