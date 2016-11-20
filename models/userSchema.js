var mongoose = require('mongoose');
var Words = require('../server/words');

var starterSession = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var starterHistory = [{
id: 0,
wrongAmt: 0
},{
id: 1,
wrongAmt: 0
},{
id: 2,
wrongAmt: 0
},{
id: 3,
wrongAmt: 0
},{
id: 4,
wrongAmt: 0
},{
id: 5,
wrongAmt: 0
},{
id: 6,
wrongAmt: 0
},{
id: 7,
wrongAmt: 0
},{
id: 8,
wrongAmt: 0
},{
id: 9,
wrongAmt: 0
},
{
id: 10,
wrongAmt: 0
},
{
id: 11,
wrongAmt: 0
},
{
id: 12,
wrongAmt: 0
},
{
id: 13,
wrongAmt: 0
},
{
id: 14,
wrongAmt: 0
},
{
id: 15,
wrongAmt: 0
},
{
id: 16,
wrongAmt: 0
},
{
id: 17,
wrongAmt: 0
},
{
id: 18,
wrongAmt: 0
},
{
id: 19,
wrongAmt: 0
},
{
id: 20,
wrongAmt: 0
}];

var UserSchema = new mongoose.Schema({
	googleId: { type: Number, index: true },
	accessToken: { type: String, required: true },
	displayName: { type: String, required: true },
	name: { type: String, required: true },
	quizHistory: {type: Array, default: starterHistory},
	quizSession: {type: Array, default: starterSession}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
