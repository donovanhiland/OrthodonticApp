var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentsSchema = new Schema({
    user: [{
        type: String,
        ref: "User"
    }],
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    appointmenttype: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Appointments", appointmentsSchema);
