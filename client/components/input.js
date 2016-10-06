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
        this.props.dispatch(actions.fetchWords());
        this.refs.input.value = "";
    },

    endGame: function(e) {
      if (this.props.endGame == true){
        this.props.dispatch(actions.sendUser(this.props.userId, this.props.newHistory))
        return (
          <div>DONE YO</div>
        )
      }
    },

    render: function() {
        return (<div>
            <form onSubmit={this.submitGuess}>
                <input type="text" name="submitGuess" id="submitGuess" className="text" autoComplete="off" required ref="input" />
                <input type="submit" id="inputButton" className="button" name="submit" value="Submit"/>
            </form>
            <div>{this.endGame()}</div></div>
        );
    }



});


var mapStateToProps = function(state) {
    return {
      endGame: state.endGame,
      userId: state.userId,
      newHistory: state.newHistory
    };
};

var Container = connect(mapStateToProps)(Input);

module.exports = Container;
