
// server/server.js

var express         = require('express');
var express-session = require('express-session');
var cookie-parser   = require('cookie-parser');
var app             = express();
var bodyParser      = require('body-parser');
var morgan          = require('morgan');       // used for logging incoming request
var methodOverride  = require('method-override');
var Config          = require('./config/config');  // Contains API Keys
var passport        = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

// Configure the Twitter strategy for use by Passport.
    // May need to move this to twitter.js route file
passport.use(new TwitterStrategy({
  consumerKey: Config.twitterConfig.key,
  consumerSecret: Config.twitterConfig.secret,
  callbackURL: "http://127.0.0.1:5000/auth/twitter/callback"
},
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());                                       // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));   // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true }));               // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override'));  // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
// app.use(express.static(__dirname + './client'));     // Set the static file location to /client
app.use(express.static('client'));     // Set the static file location to /client
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore auth state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Creates an instance of an express router
var router            = express.Router();
var twitterRouter     = express.Router();
var instagramRouter   = express.Router();
var facebookRouter    = express.Router();

// Prefixes all routes with /api
app.use('/api', router);
app.use('/auth/twitter', twitterRouter);
app.use('/auth/instagram', instagramRouter);
app.use('/auth/facebook', facebookRouter);

// Configures our routes
require('./routes/routes.js')(app);
require('./routes/twitter.js')(app);
require('./routes/instagram.js')(app);
require('./routes/facebook.js')(app);

// Starts app
app.listen(port);

console.log('Currently on port ' + port);

// exports app
exports = module.exports = app;