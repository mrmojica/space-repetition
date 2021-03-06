var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var store = require('./client/store');
var Provider = require('react-redux').Provider;
var actions = require('./client/actions');

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
        <div className="container">
	       {props.children}
        </div>
    );
};



var routes = (
	<Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
	        <IndexRoute component={Landing} />
          <Route path="/quiz" component={Quiz} />
      </Route>
    </Router>
    </Provider>
);

/*
<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Landing} />
      </Route>
      <Route path="/quiz" component={App}>
        <IndexRoute component={Quiz} />
      </Route>
  </Router>
  </Provider>
*/

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    		routes,
    	document.getElementById('app'));
});
