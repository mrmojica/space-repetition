var React = require('react');
var ReactDOM = require('react-dom');
var Landing = require('./client/components/landing');
var Quiz = require('./client/components/quiz');

var App = function() {
    return (
        <div>
	        <Landing />
	        <Quiz />
        </div>
    );
};

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<App />, document.getElementById('app'));
});
