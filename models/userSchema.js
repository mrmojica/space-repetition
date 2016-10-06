var mongoose = require('mongoose');
var Words = require('../server/words');

var UserSchema = new mongoose.Schema({
	googleId: { type: Number, index: true },
	accessToken: { type: String, required: true },
	displayName: { type: String, required: true },
	name: { type: String, required: true },
	quizHistory: {type: Array, default: Words }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;


					// googleId: profile.id,
				 //  	accessToken: accessToken,
				 //  	displayName: profile.displayName,
				 //  	name: profile.name
