var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');



var Input = React.createClass({
    submitGuess: function(event) {
        event.preventDefault();
        var value = this.refs.input.value;
        console.log("submitted")
        this.props.dispatch(actions.makeGuess(value.toLowerCase()));
        this.props.dispatch(actions.fetchData());
        this.refs.input.value = "";
    },


    render: function() {
        return (
            <form onSubmit={this.submitGuess}>
                <input type="text" name="submitGuess" id="submitGuess" className="text" autoComplete="off" required ref="input" />
                <input type="submit" id="inputButton" className="button" name="submit" value="Submit"/>
            </form>
        );
    }



});


var mapStateToProps = function(state) {
    return {
    };
};

var Container = connect(mapStateToProps)(Input);

module.exports = Container;
