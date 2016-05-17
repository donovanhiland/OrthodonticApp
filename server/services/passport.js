var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
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
