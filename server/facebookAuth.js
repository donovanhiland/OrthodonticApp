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
