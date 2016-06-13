
// server/server.js

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var morgan         = require('morgan');       // used for logging incoming request
var methodOverride = require('method-override');

var port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());                                       // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));   // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true }));               // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override'));  // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + './client'));     // Set the static file location to /client

// Creates an instance of an express router
var router = express.Router();
// Sets up a User Router
// var twitterRouter = express.Router();
// var instagramRouter = express.Router();
// var facebookRouter = express.Router();

// Prefixes all routes with /api
app.use('/api', router);
// Use user router for all user request
// app.use('/api/users', userRouter);
// Configures our routes
require('./routes/routes.js')(app);


// Injects our routers into their respective route files
// require('./routes/twitter.js')(twitterRouter);
// require('./routes/instagram.js')(instagramRouter);
// require('./routes/facebook.js')(facebookRouter);



// Starts app
app.listen(port);

console.log('Currently on port ' + port);

// exports app
exports = module.exports = app;