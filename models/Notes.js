var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SaveNotes = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

var Note = mongoose.model("Note", SaveNotes);

module.exports = Note;