
// server/routes/twitter.js

var express             = require('express');
var passport            = require('passport');
var connectEnsureLogin  = require('connect-ensure-login');
  
module.exports = function(app) {

  app.get('/auth/twitter',
    passport.authenticate('twitter')
  );

  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
  });
  
  app.get('/feed',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.render('feed', { user: req.user });
  });
    
};