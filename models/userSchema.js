var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	quizHistory: {type: Array, required: true}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
