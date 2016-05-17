var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    user: [{
        type: String,
        ref: "User"
    }],
    notes: {
        category: { // instructions or financial
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
});

module.exports = mongoose.model("Note", noteSchema);
