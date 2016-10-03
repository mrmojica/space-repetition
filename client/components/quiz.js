var React = require('react');
var ReactDOM = require('react-dom');

var Logout = require('./logout');
var Question = require('./question');
var Input = require('./input');
var Score = require('./score');



var Quiz = React.createClass({


	render: function() {

		return(
			<div>
				<Logout />
						<Question />
						<Input />
				<Score />
			</div>
			);


	}



});



module.exports = Quiz;
