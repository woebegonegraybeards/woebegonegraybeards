
// server/routes/twitter.js

// server/routes/twitter.js
var express   = require('express');
var passport  = require('passport');
  

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
 
 /*
 +  
 +  app.get('/auth/twitter', function(req, res) {
 +    console.log('auth twitter');
 +    res.send(200, 'auth twitter response');
 +  });
 +  
 +  app.get('/auth/twitter/login', function(req, res) {
 +    console.log('auth twitter login');
 +    res.send(200, 'auth twitter login response');
 +  });
 +  
 +  app.get('/auth/twitter/login/return', 
 +    passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
 +    res.redirect('/');
    });
    */
    
};