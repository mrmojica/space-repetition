var express = require('express');
var bodyParser = require('body-parser');


var jsonParser = bodyParser.json();
var app = express();

app.use('/', express.static('build'));




app.get('/api/question' , function(req, res) {
	


});

app.post('/api/question' , jsonParser, function(req, res) {



});





app.listen(3000, function () {
  console.log('Listening at 3000!');
});