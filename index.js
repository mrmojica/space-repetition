var React = require('react');
var ReactDOM = require('react-dom');
var Landing = require('./client/components/landing');

var App = function() {
    return (
        <div>
        <Landing />

        </div>
    );
};

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<App />, document.getElementById('app'));
});
