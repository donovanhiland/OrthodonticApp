var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./../models/UserModel');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
  console.log(email, password, ' login attempt passport.js line 10');
    User.findOne({
            email: email
        })
        .exec(function(err, user) {
            if (err) {
                done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (user.verifyPassword(password)) {
                done(null, user);
            } else {
                return done(null, false);
            }
        });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
