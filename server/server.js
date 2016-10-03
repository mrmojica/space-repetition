var express = require('express');
var bodyParser = require('body-parser');

var words = require('./words');


var jsonParser = bodyParser.json();
var app = express();



app.use('/', express.static('build'));




app.get('/api/question' , function(req, res) {
	res.json(words);


});

app.post('/api/question' , jsonParser, function(req, res) {



});





app.listen(8080, function () {
  console.log('Listening at 8080!');
});