var React = require('react');
var ReactDOM = require('react-dom');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var hashHistory = router.hashHistory;
var Link = router.Link;

var Landing = require('./client/components/landing');
var Quiz = require('./client/components/quiz');



var App = function(props) {
    return (
        <div>
	       {props.children}
        </div>
    );
};



var routes = (
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
	        <IndexRoute component={Landing} />
        </Route>
        <Route path="/quiz" component={App}>
	        <IndexRoute component={Quiz} />
        </Route>              
    </Router>
);


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    	routes, 
    	document.getElementById('app'));
});
