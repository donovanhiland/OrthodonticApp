var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var keys = require('./keys.js');

var app = express();
var port = 9001;

app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "session secret words"
}));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//local auth -->
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function(username, password, done) {
        /// ...
    }));
//<-- local auth


// GET
app.get('/users', function(req, res, next) {
    res.status(200).json('/users');
    // get all users (doctor page?)

});
app.get('/users/:id', function(req, res, next) {
    // get user account and account information. all documents and contact info, initial balance, balance due, frequency

});
app.get('/appointments', function(req, res, next) {
    // get all appointments

});
app.get('/payments', function(req, res, next) {
    // get payments based on user

});
app.get('/notes', function(req, res, next) {
    // get all notes based on user

});


// POST
app.post('/users', function(req, res, next) {
    // save user information on signup

});
app.post('/users/:id', function(req, res, next) {
    // save paperwork upon completion and after account creation

});
app.post('/appointments', function(req, res, next) {
    // schedule an appointment
    // reschedule appointment

});
app.post('/payments', function(req, res, next) {
    // make a payment

});


// PUT
app.put('/users/:id', function() {
    // update information on user account

});
app.put('/appointments/:id', function(req, res, next) {
    // schedule, reschedule (delete appt, schedule appt), cancel appt

});
app.put('/notes/:id', function() {
    // update note

});



app.listen(port, function() {
    console.log('server started succesfully on port ' + port);
});
