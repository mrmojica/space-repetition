var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');

var Question = React.createClass({
	componentDidMount: function() {
	this.props.dispatch(actions.fetchUser());
	this.props.dispatch(actions.fetchWords());
},

	render: function() {
		return(
			<div>
				{this.props.french}
			</div>
			);
	}
});

var mapStateToProps = function(state, props) {
    return {
        french: state.french
    };
};

var Container = connect(mapStateToProps)(Question);

module.exports = Container;
