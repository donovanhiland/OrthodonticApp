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
var UserCtrl = require('./controller/UserCtrl');
var UserCtrl = require('./controller/UserCtrl');
var UserCtrl = require('./controller/UserCtrl');
var UserCtrl = require('./controller/UserCtrl');

// POLICIES //
var isAuthed = function() {
  if(!req.isAuthenticated()) {
    return res.status(401).json();
  }
  else {
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
app.get('/logout', User.logout);
app.get('/orthoApp/users', isAuthed, UserCtrl.getAllUsers);
app.get('/orthoApp/users/:id', isAuthed, UserCtrl.getUser);
app.get('/orthoApp/appointments', ApptsCtrl.getAppointments);
app.get('/orthoApp/payments', PaymentsCtrl.getPayments);
app.get('/orthoApp/notes', NotesCtrl.getNotes);

// POST
app.post('/login', passport.authenticate('local'), UserCtrl.loginCallback);
app.post('/orthoApp/users', UserCtrl.register);
app.post('/orthoApp/appointments', ApptsCtrl.createAppointments);
app.post('/orthoApp/payments', PaymentsCtrl.makePayment);
app.post('/orthoApp/notes', NotesCtrl.createNote);

// PUT
app.put('/orthoApp/users/:id', isAuthed, UserCtrl.update);
app.put('/orthoApp/appointments/:id', ApptsCtrl.updateAppointment);
app.put('/orthoApp/notes/:id', NotesCtrl.updateNote);

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
