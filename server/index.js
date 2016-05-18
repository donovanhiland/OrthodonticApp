// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');

// PASSPORT //
var passport = require('./services/passport');

// CONFIG //
var config = require('./config');

// CONTROLLERS
var UserCtrl = require('./controllers/UserCtrl');
var ApptsCtrl = require('./controllers/ApptsCtrl');
var PaymentsCtrl = require('./controllers/PaymentsCtrl');
var NotesCtrl = require('./controllers/NotesCtrl');

// POLICIES //
var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json();
    } else {
        return next();
    }
};

// EXPRESS //
var app = express();

app.use(express.static(__dirname + './../public'));
app.use(session({
    secret: config.SESSIONSECRET,
    saveUninitialized: false,
    resave: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// GET
app.get('/logout', UserCtrl.logout);
app.get('/me', UserCtrl.me);
app.get('/users', isAuthed, UserCtrl.getAllUsers);
app.get('/users/:id', isAuthed, UserCtrl.getUser);
app.get('/appointments', isAuthed, ApptsCtrl.getAppointments);
app.get('/payments', isAuthed, PaymentsCtrl.getPayments);
app.get('/notes', isAuthed, NotesCtrl.getNotes);

// POST
app.post('/login', passport.authenticate('local', {
    successRedirect: '/me'
}));
app.post('/orthoApp/users', UserCtrl.register);
app.post('/appointments', isAuthed, ApptsCtrl.createAppointments);
app.post('/payments', isAuthed, PaymentsCtrl.makePayment);
app.post('/notes', isAuthed, NotesCtrl.createNote);

// PUT
app.put('/users/:id', isAuthed, UserCtrl.update);
app.put('/appointments/:id', isAuthed, ApptsCtrl.updateAppointment);
app.put('/notes/:id', isAuthed, NotesCtrl.updateNote);

// CONNECTIONS //
var mongoURI = config.MONGOURI;
var port = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
    app.listen(port, function() {
        console.log('server started succesfully on port ' + config.PORT);
    });
});
