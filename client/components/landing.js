var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;

var Button = function(){

	


	return (
		<div>
		<button><Link to={'/quiz'}>Register/Login</Link></button>
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

