var Note = require('../models/Note');

module.exports = {

  getNotes: function(req, res, next) {
      // get all notes based on user
      Note.find({}, function(err, dbRes) {
        if(err) {
          res.status(500).json(err);
        }
        else {
          res.status(200).json(dbRes);
        }
      });
  },

  createNote: function(req, res, next) {
    // create note on patient account
      Note.create(req.body, function(err, dbRes) {
        if(err) {
          console.log(err);
          res.status(500).json(err);
        }
        else {
          res.json(dbRes);
        }
      });
  },

  updateNote: function(req, res, next) {
      // update note
      var noteId = req.params.id;
      Note.findByIdAndUpdate(noteId, req.body, function(err, dbRes) {
        if(err) {
          res.status(500).json(err);
        }
        else {
          res.status(200).json(dbRes);
        }
      });
  }

};
