var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
      firstname: {
        type: String,
        trim: true,
        required: true
      },
      lastname: {
        type: String,
        trim: true,
        required: true
      }
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    documents: {
        type: Array
    },
    financial: {
        initialbalance: {
            type: Number
        },
        monthlypaymentamount: {
            type: Number
        },
        paymentfrequency: {
            type: Number
        },
    },
    status: {
      type: String,
      default: 'pending'
    }
});

module.exports = mongoose.model("User", userSchema);
