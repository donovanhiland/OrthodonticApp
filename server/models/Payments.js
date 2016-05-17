var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentsSchema = new Schema({
    user: [{
        type: String,
        ref: "User"
    }],
    payments: {
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        paymenttype: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model("Payments", paymentsSchema);
