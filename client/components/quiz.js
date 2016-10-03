var React = require('react');
var ReactDOM = require('react-dom');



var Quiz = React.createClass({


	render: function() {

		return(
			<div>
				<h1>FrenchX</h1>
				<Logout />
						<Question />
						<Input />
				<Score />
			</div>
			);


	}



});



module.exports = Quiz;


