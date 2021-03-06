var Appointments = require('../models/AppointmentsModel');
var User = require('../models/UserModel');
var moment = require('moment');

module.exports = {

    createAppointments: function(req, res, next) {
        // get all appointments and if there are days missing between date range, create those appointments
        var Appt = function(date) {
            this.date = date;
            this.duration = 30;
        };

        Appointments.find({}, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            }
            if (dbRes.length === 0) {
                console.log('no appointments scheduled, apptsCtrl line 19');

                for (var i = 0; i < 45; i++) {
                    var startMoment = moment().startOf('day').add(6, 'hours').add(30, 'minute');
                    var apptDate = startMoment.add(i, 'days');
                    for (var j = 0; j < 16; j++) {
                        var apptDateAndTime = apptDate.add(30, 'minutes').format('lll');
                        console.log(apptDateAndTime);
                        var appt = new Appt(apptDateAndTime);
                        Appointments.create(appt);
                    }
                }
                return;
            }
            if (dbRes[dbRes.length - 1].date < moment().startOf('day').add(43, 'days').add(6, 'hours').add(30, 'minute')) {
                console.log('creating appointments - ApptsCtrl line 38');
                (function(dbRes) {
                    if (dbRes[dbRes.length - 1].date < moment().add(45, 'days').toDate()) {
                        var newApptStart = moment().startOf('day').add(44, 'days').add(6, 'hours').add(30, 'minute');
                        for (var j = 0; j < 16; j++) {
                            var apptDateAndTime = newApptStart.add(30, 'minutes').format('lll');
                            console.log(apptDateAndTime);
                            var appt = new Appt(apptDateAndTime);
                            Appointments.create(appt);
                        }
                    }
                })(dbRes);
                console.log('appointments created');
            } else {
                console.log('appointments up to date');
            }
        });
    },

    getAppointments: function(req, res, next) {

        Appointments.find(req.body, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(dbRes);
            }
        });
    },

    scheduleAppointment: function(req, res, next) {
        // schedule, reschedule (delete appt, schedule appt), cancel appt
        var appointmentId = req.params.id;
        req.user.appointment = appointmentId;
        Appointments.findByIdAndUpdate(appointmentId, req.body, function(err, dbRes) {
            if (err) res.status(500).json(err);
            User.findByIdAndUpdate(req.user._id, {
                appointment: dbRes._id
            }, function(err, dbRes) {
                if (err) res.status(500).json(err);
                res.status(200).json(dbRes);
            });
        });
    },

    cancelAppointment: function(req, res, next) {
        Appointments.findByIdAndUpdate(req.params.id, {
            $unset: {
                user: ''
            }
        }, function(err, dbRes) {
            if (err) res.status(500).json(err);
            next();
        });
    },

    getSchedule: function(req, res, next) {
      Appointments.find(req.body)
      .populate('user')
      .exec(function(err, dbRes) {
        if(err) res.status(500).json(err);
        res.status(200).json(dbRes);
      });
    }


};
