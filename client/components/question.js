var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux');.connect;
var actions = require('../actions');

var Question = React.createClass({


	render: function() {

		return(
			<div>
				{this.props.question}
			</div>
			);


	}



});



module.exports = Question;

