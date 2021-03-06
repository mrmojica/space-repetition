var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('../config');
var words = require('./words');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Word = require('../models/wordSchema');
var User = require('../models/userSchema');
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
  function(accessToken, refreshToken, profile, done) {
  	console.log('ACCESSTOKEN******', accessToken);
  	console.log('PROFILE*********', profile);
  	// console.log('*_*_*_*_*_', user);

   User.findOne({
            'googleId': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                var newUser = {
				  	googleId: profile.id,
				  	accessToken: accessToken,
				  	displayName: profile.displayName,
				  	name: profile.name.givenName + " " + profile.name.familyName,
					// quizHistory: [{
					//   id: 0,
					//   wrongAmt: 0
					// }]
                };

								User.create(newUser, function(err, user) {
		if (err || !newUser) {
				console.error("Could not create user", newUser.name);
				return done(err, user);
		}
		console.log("Created user", newUser.name);
		return done(err, user);
});
                // user.save(function(err) {
                //     if (err) console.log(err);
                //     return done(err, user);
                // });
            } else {
                //found user. Return + UPDATEwww

                return done(err, user);
            }
  });

// return cb(null, user);
  }));

  // var user = {
  // 	googleId: profile.id,
  // 	accessToken: accessToken,
  // 	displayName: profile.displayName,
  // 	name: profile.name
   // };

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.cookie('accessToken', req.user.accessToken, {expires:0});
    res.redirect('/#/quiz');
  });

// accessToken: ya29.Ci9zA3DQVNgXLBa-z59TOPMH5KohT1LCsARqxQ7Un65KwDL1uEsbVfr4nEUATjOYCA

// passport.use(new BearerStrategy(
//   function(token, done) {
//   	console.log('token', token);
//   	//we need the token to equal the accessToken
//   	if(token == 'ya29.Ci9zA3DQVNgXLBa-z59TOPMH5KohT1LCsARqxQ7Un65KwDL1uEsbVfr4nEUATjOYCA') {
//   		var user = {user:'bob'};
//   		return done(null, user, {scope: 'read'});
//   	} else {
//   		return done(null, false);
//   	}
//   }
// ));


passport.use(new BearerStrategy(
  function(token, done) {
  	console.log('token', token);
  	User.find({ accesToken: token}, function(err, users) {
  		if(err) {
  			return done(err)
  		}
  		if(!users) {
  			console.log('no user found');
  			return done(null, false)
  		}
  		console.log('found user');
  		return done(null, users, {scope: 'read'});
  	});
}
));




app.get('/user',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
  		User.find(function(err, words){
		if (err) {
			return res.status(500).json({
				message:'Internal Server Error'
			});

		}
		res.json(words);
	});
});


function spacedAlgo(history){

  var newSess = [];
  for (var i = 0; i < history.length; i ++){

  	if (history[i].wrongAmt >= 3) {
      newSess.push(history[i].id);
      newSess.push(history[i].id);
      newSess.push(history[i].id);

     }
    else if (history[i].wrongAmt > 0){
      newSess.push(history[i].id);
      newSess.push(history[i].id);
    }
    
    else {
      newSess.push(history[i].id);
    }
  }

  function shuffle(array) {
	var m = array.length, t, i;
	// While there remain elements to shuffle
	while (m) {
		// Pick a remaining element
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element
		t = array[m];
		array[m] = array[i];
		array[i] = t;
		}
  	return array;
	}
  shuffle(newSess);
  return newSess;
}

//Update
app.put('/user/:id', jsonParser, function(req, res) {

    // return the index of the object
    var id = req.params.id;
		var newHistory = req.body.quizHistory;
		var newSession = spacedAlgo(newHistory);
    User.findOneAndUpdate(
    	{_id: id },
    	{quizHistory: newHistory,
			quizSession: newSession},
    	function(err, doc){
    		if(err) {
    			console.log('Could not update data!');
    		}
    		console.log(doc);

    });



    if (!req.params.id) {
        return res.sendStatus(404);
    }

    res.status(200).json("Success");
    // console.log(storage.items);

});

  //   res.json(req.user);
  // });


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
mongoose.Promise = global.Promise;
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

// 	if (error || null) {
// 			return res.status(500).json({
// 				message:'Internal Server Error'
// 			});
// 		}

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



// route for logging out
app.get('/logout', function(req, res) {
	console.log('logging out');
    req.logout();
    res.redirect('/');
});







exports.app = app;
exports.runServer = runServer;


// app.listen(8080, function () {
//   console.log('Listening at 8080!');
// });
