var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');

var app = express();
var port = 9001;

app.use(express.static(__dirname + '/public'));
app.use(session({secret: "session secret words"}));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var checkAuth = function(req, res, next) {
  if(!req.isAuthenticated()) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.redirect('/#/account/signin');
  }
  else {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.redirect('/#/account/dashboard');
  }
  return next();
};


passport.use(new FacebookStrategy({
  clientID: keys.facebookKey,
  clientSecret: keys.facebookSecret,
  callbackURL: 'http://localhost:'+ port +'/auth/facebook/callback'
}, function(token, tokenSecret, userProfile, done) {
  return done(null, userProfile);
}));

// start

app.get('/auth/facebook', passport.authenticate('facebook'));

// callback for facebook

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/#/account/dashboard',
  failureRedirect: '/auth/facebook'
}));

passport.serializeUser(function(user, done) {
  // go to mongo get _id for user, put that on session
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // get data off of session (see serializeUser)
  done(null, obj);
  // put it on req.user in EVERY ENDPOINT
});

// app.get('/account/dashboard', checkAuth);

app.listen(port, function() {
  console.log('server started succesfully on port ' + port);
});
