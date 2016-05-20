var User = require('../models/UserModel');

module.exports = {

    register: function(req, res, next) {
        // save user information on signup
        User.create(req.body, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
              console.log('account creation successful');
                res.json(dbRes);
            }
        });
    },

    me: function(req, res, next) {
      res.send(req.user);
    },

    getUser: function(req, res, next) {
        // get user account and account information. all documents and contact info, initial balance, balance due, frequency
        var userId = req.params.id;
        User.findById(userId, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(dbRes);
            }
        });
    },

    getAllUsers: function(req, res, next) {
        // get all users (doctor page?)
        User.find({}, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(dbRes);
            }
        });
    },

    update: function(req, res, next) {
        // update information on user account
        var userId = req.params.id;
        User.findByIdAndUpdate(userId, req.body, function(err, dbRes) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json('user updated');
            }
        });
    },


    logout: function(req, res, next) {
        // user logout
        req.logout();
        return res.status(200).json('logged out');
    }
};
