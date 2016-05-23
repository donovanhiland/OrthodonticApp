var Note = require('../models/NoteModel');

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
        if(err) res.status(500).json(err);
        console.log(dbRes);
        req.noteId = dbRes._id;
        next();
      });
  },

  updateNote: function(req, res, next) {
      // update note
      var noteId = req.params.id;
      Note.findByIdAndUpdate(noteId, req.body, function(err, dbRes) {
        if(err) res.status(500).json(err);
        res.status(200).json(dbRes);
      });
  }

};
