var Appointments = require('../models/AppointmentsModel');
var moment = require('moment');
var _ = require('lodash');

module.exports = {

    createAppointments: function() {
      if(moment().format('LT') === /*'12:01 AM'*/moment().format('LT')) {
        console.log("checking appointments", "apptsctrl line 8");

        Appointments.find({}, function(err, dbRes) {
          if(err) {
            res.status(500).json(err);
          }
          else {
            console.log(dbRes.length);
            (function(dbRes) {
              dbRes.forEach(function(element, i, dbRes) {
                if(dbRes[i].date < moment().add(45, 'days')) {
                  console.log(dbRes[i].date);
                  console.log(moment().add(45, 'days').toDate());
                  // console.log('lets make more appointments');
                }
              })
            })(dbRes);
          }
          // get all appointments and if there are days missing between date range, create those appointments
        })
      }
        // const Appt = (date) => {
        //     this.date = date;
        //     this.duration = 30;
        // }
        // var Appt = function(date) {
        //   this.date = date;
        //   this.duration = 30;
        // }
        //
        // for(var i = 0; i < 2; i++) {
        //   var startMoment = moment().startOf('day').add(6, 'hours').add(31, 'minute');
        //   var apptDate = startMoment.add(i, 'days');
        //   for(var j = 0; j < 10; j ++) {
        //     var apptDateAndTime = apptDate.add(30, 'minutes').format('lll');
        //     console.log(apptDateAndTime);
        //     var appt = new Appt(apptDateAndTime);
        //     Appointments.create(appt);
        //   }
        // }

    },

    getAppointments: function(req, res, next) {
        // get all appointments
        Appointments.find({}, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(dbRes);
            }
        });
    },
    //
    // createAppointments: function(req, res, next) {
    //     //create appointments
    //     Appointments.create(req.body, function(err, dbRes) {
    //       if(err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //       }
    //       else {
    //         res.json(dbRes);
    //       }
    //     });
    // },

    updateAppointment: function(req, res, next) {
        // schedule, reschedule (delete appt, schedule appt), cancel appt
        var appointmentId = req.params.id;
        Appointments.findByIdAndUpdate(appointmentId, req.body, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(dbRes);
            }
        });
    },


};
