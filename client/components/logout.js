var React = require('react');
var ReactDOM = require('react-dom');

var Logout = function(){
	return (
		<div>
		<button className='button btn btn-primary'><a href="/logout">Log Out</a></button>
		</div>
		);
};


module.exports = Logout;

