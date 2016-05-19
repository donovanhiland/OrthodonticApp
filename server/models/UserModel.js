var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-schematypes-extend')(mongoose);
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    type: {
      type: String,
      default: 'user'
    },
    name: {
        firstname: {
            type: String,
            trim: true,
            required: true,
            capitalize: true,
            nomultispaces: true
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            capitalize: true,
            nomultispaces: true
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
    phoneNumber: {
      type: String
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
    ett: {
      type: Number
    },
    status: {
        type: String,
        default: 'pending'
    }
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next(null, user);
});
// userSchema.pre('save', function (next) {
//   // capitalize
//   var user = this;
//   this.name.firstname.charAt(0).toUpperCase() + this.name.slice(1);
//   this.name.lastname.charAt(0).toUpperCase() + this.name.slice(1);
//   next();
// });

userSchema.methods.verifyPassword = function(reqBodyPassword) {
    var user = this;
    return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
