var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');



var Input = React.createClass({
    submitInput: function(event) {
        event.preventDefault();
        var value = this.refs.input.value;
       // this.props.dispatch(actions.makeGuess(this.refs.input.value));

    },



    render: function() {
        return (
            <form onSubmit={this.submitInput}>
                <input type="text" name="userInput" id="userInput" className="text" autoComplete="off" required ref="input" />
                <input type="submit" id="inputButton" className="button" name="submit" value="Submit"/>
            </form>
        );
    }



});



module.exports = Input;