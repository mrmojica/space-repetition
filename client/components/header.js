var React = require('react');
var ReactDOM = require('react-dom');

var Logout = function(){
	return (
		<div id="logout-button">
		<button className='button btn btn-primary'><a href="/logout">Log Out</a></button>
		</div>
		);
};

var Header = function() {
	return(
		<div id="quiz-header">
		<h2>FrenchX</h2>
			<Logout />
		</div>
		)
}


module.exports = Header;

