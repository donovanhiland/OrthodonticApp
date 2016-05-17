var Appointments = require('../models/Appointments');

module.exports = {
  getAppointments: function(req, res, next) {
      // get all appointments
      Appointments.find({}, function(err, dbRes) {
        if(err) {
          res.status(500).json(err);
        }
        else {
          res.status(200).json(dbRes);
        }
      });
  },

  createAppointments: function(req, res, next) {
      //create appointments
      Appointments.create(req.body, function(err, dbRes) {
        if(err) {
          console.log(err);
          res.status(500).json(err);
        }
        else {
          res.json(dbRes);
        }
      });
  },

  updateAppointment: function(req, res, next) {
      // schedule, reschedule (delete appt, schedule appt), cancel appt
      var appointmentId = req.params.id;
      Appointments.findByIdAndUpdate(appointmentId, req.body, function(err, dbRes) {
        if(err) {
          res.status(500).json(err);
        }
        else {
          res.status(200).json(dbRes);
        }
      });
  }
};
