var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Link = router.Link;


var Landing = function(){

	return (
		<div id="landing">
			<div id="landing-header"><h1>Welcome to FrenchX</h1></div>
			<span>FrenchX is a vocabulary learning app that uses the spaced repetition technique to help bolster your memory with the words you have trouble with.</span>
			<button className='button btn btn-primary'><a href="/auth/google">Register/Login</a></button>
		</div>

		)




};


module.exports = Landing;
