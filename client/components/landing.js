var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;

var Button = function(){




	return (
		<div>
		<button><a href="/auth/google">Register/Login</a></button>
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
