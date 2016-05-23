var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    user: {
        type: String,
        ref: "User"
    },
    category: { // instructions or financial
        type: String,
        required: true,
        default: 'instructions'
    },
    date: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Note", noteSchema);
