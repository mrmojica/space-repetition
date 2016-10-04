var mongoose = require('mongoose');

var WordSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	french: { type: String, required: true },
    english: { type: String, required: true }
});

var Word = mongoose.model('Word', WordSchema);

module.exports = Word;