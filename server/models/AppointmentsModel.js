var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        required: true
    },
    type: {
      type: String,
      capitalize: true,
      default: 'Short'
    },
    duration: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Appointments", appointmentsSchema);
