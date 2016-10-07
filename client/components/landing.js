var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;


var Landing = function(){

	return (
		<div>
			<h1>Welcome to FrenchX</h1>
			<button className='button btn btn-primary'><a href="/auth/google">Register/Login</a></button>
		</div>

		)




};


module.exports = Landing;
