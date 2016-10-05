var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config');
var words = require('./words');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Word = require('../models/wordSchema');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;


var jsonParser = bodyParser.json();
var app = express();


app.use('/', express.static('build'));

app.get('/public', function(req, res) {
	res.json({
		message:'google strategy'

	});


});

passport.use(new GoogleStrategy({
    clientID: '795463927891-vluhma4lng78uci0k4i43daua8u5l2gd.apps.googleusercontent.com',
    clientSecret: 'TO02h4HSv-CGhR2Yv2Jcn3ty',
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log('-------', accessToken, profile);
  
  //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // return cb(err, user);
  //   });
  var user = {
  	googleId: profile.id,
  	accessToken: accessToken,
  	displayName: profile.displayName,
  	name: profile.name

  }
  	return cb(null, user);

  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.cookie('accessToken', req.user.accessToken, {expires:0, httpOnly: true});
    res.redirect('/public');
  });



passport.use(new BearerStrategy(
  function(token, done) {
  	console.log('token', token);
  	//we need the token to equal the accessToken
  	if(token == 12345) {
  		var user = {user:'bob'};
  		return done(null, user, {scope: 'read'});
  	} else {
  		return done(null, false);
  	}
  }
));

app.get('/profile', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });








var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};


// db.collection.insert()
//this inserts the database (word.js) we created to our mongodb.
// Word.collection.insert(words, function(error) {
//
// 	if (error || null) {
// 			return res.status(500).json({
// 				message:'Internal Server Error'
// 			});
// 		}
//
// });

// db.words.dropDatabase();


//To clear database run the code below.
// Word.collection.remove();





app.get('/api/question' , function(req, res) {
	Word.find(function(err, words){
		if (err) {
			return res.status(500).json({
				message:'Internal Server Error'
			});
		}
		res.json(words);
	});
});

app.post('/api/question' , jsonParser, function(req, res) {



});


exports.app = app;
exports.runServer = runServer;


// app.listen(8080, function () {
//   console.log('Listening at 8080!');
// });
