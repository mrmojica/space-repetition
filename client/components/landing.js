var React = require('react');
var ReactDOM = require('react-dom');

var Button = function(){
	return (
		<div>
		<button>Register/Login</button>
		</div>
		);
};

var Landing = function(){

	return (
		<div><h1>Welcome to FrenchX</h1>
		<Button />
		</div>

		)




};


module.exports = Landing;

