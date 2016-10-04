var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');

var Score = React.createClass({
	componentDidMount: function() {
	this.props.dispatch(actions.fetchData());
},

	render: function() {

		return(
			<div>{this.props.feedback}
			<br />Score: {this.props.score}
			</div>
			);


	}



});

var mapStateToProps = function(state, props) {
    return {
        score: state.score,
				feedback: state.feedback
    };
};

var Container = connect(mapStateToProps)(Score);


module.exports = Container;
