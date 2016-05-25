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

    checkAuth: function(req, res, next) {
      if(req.user) {
        res.status(200).json(req.user.type);
      }
      if(!req.user) {
        res.status(200).json('unauthorized');
      }
    },

    me: function(req, res, next) {
        User.findById(req.user._id)
            .populate('appointment')
            .populate('notes')
            .exec(function(err, dbRes) {
                if (err) res.status(500).json(err);
                res.status(200).json(dbRes);
            });
    },

    getUser: function(req, res, next) {
        // get user account and account information. all documents and contact info, initial balance, balance due, frequency
        var userId = req.params.id;
        User.findById(userId)
            .populate('appointment')
            .populate('notes')
            .exec(function(err, dbRes) {
                if (err) res.status(500).json(err);
                res.status(200).json(dbRes);
            });
    },

    getPending: function(req, res, next) {
        User.find(req.query, function(err, dbRes) {
            if (err) res.status(500).json(err);
            res.status(200).json(dbRes);
        })
    },

    getAllUsers: function(req, res, next) {
        // get all users (doctor page?)
        if (!req.body.firstname) {
            req.body.firstname = '.*';
        }
        if (!req.body.lastname) {
            req.body.lastname = '.*';
        }
        User.find({
            "name.firstname": new RegExp(req.body.firstname, 'i'),
            "name.lastname": new RegExp(req.body.lastname, 'i')

        }).exec(function(err, dbRes) {
            if (err) res.status(500).json(err);
            res.status(200).json(dbRes);
        })
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

    cancelAppointment: function(req, res, next) {
        User.findByIdAndUpdate(req.body.user, {
            $unset: {
                appointment: ''
            }
        }, function(err, dbRes) {
            if (err) res.status(500).json(err);
            res.status(200).json(dbRes);
        });
    },

    createNote: function(req, res, next) {
        User.findByIdAndUpdate(req.body.user, {
            $push: {
                notes: req.noteId
            }
        }, function(err, dbRes) {
            if (err) res.status(500).json(err);
            res.status(200).json(dbRes);
        });
    },

    logout: function(req, res, next) {
        // user logout
        req.logout();
        return res.status(200).json('logged out');
    }
};
