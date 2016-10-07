var React = require('react');
var ReactDOM = require('react-dom');

var Header = require('./header');
var Question = require('./question');
var Input = require('./input');
var Score = require('./score');



var Quiz = React.createClass({


	render: function() {

		return(
			<div>
				<Header />
						<Question />
						<Input />
				<Score />
			</div>
			);


	}



});



module.exports = Quiz;
