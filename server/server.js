var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config');
var words = require('./words');

var Word = require('../models/wordSchema');


var jsonParser = bodyParser.json();
var app = express();


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

// 	if (error || null) {
// 			return res.status(500).json({
// 				message:'Internal Server Error'
// 			});
// 		}

// });

// db.words.dropDatabase();


//To clear database run the code below.
// Word.collection.remove();


app.use('/', express.static('build'));




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