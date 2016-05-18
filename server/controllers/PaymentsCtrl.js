var Payments = require('../models/PaymentsModel');

module.exports = {

    getPayments: function(req, res, next) {
        // get payments based on user
        Payments.find({}, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(dbRes);
            }
        });
    },

    makePayment: function(req, res, next) {
        // make a payment
        Payments.create(req.body, function(err, dbRes) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.json(dbRes);
            }
        });
    }

};
