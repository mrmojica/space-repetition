var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	quizHistory: {type: Array, required: true },
	googleId: { type: String, index: true },
	accessToken: { type: String, required: true },
	displayName: { type: String, required: true },
	name: { type: String, required: true }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;


					// googleId: profile.id,
				 //  	accessToken: accessToken,
				 //  	displayName: profile.displayName,
				 //  	name: profile.name