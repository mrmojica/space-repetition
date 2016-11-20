var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions');
// var router = require('react-router');
// var Link = router.Link;



var Input = React.createClass({
    submitGuess: function(event) {
        event.preventDefault();
        var value = this.refs.input.value;
        console.log("submitted")
        this.props.dispatch(actions.makeGuess(value.toLowerCase()));
        this.props.dispatch(actions.fetchWords());
        this.refs.input.value = "";
    },

    newSession: function(event) {
        event.preventDefault();
        console.log('New Session clicked');
        this.props.dispatch(actions.newGame());
        this.props.dispatch(actions.fetchUser());
        this.props.dispatch(actions.fetchWords());
        
    },

    endGame: function(e) {
      console.log('endgame ran');
      console.log('endGame', this.props.endGame);
      if (this.props.endGame == false) {
                return (
            <form onSubmit={this.submitGuess}>
                <input type="text" name="submitGuess" id="submitGuess" className="text" autoComplete="off" required ref="input" />
                <input type="submit" id="inputButton" className="button btn btn-primary" name="submit" value="Submit"/>
            </form>
           
        );

      }  
      else {
        console.log('userId', this.props.userId);
        console.log('newhistory', this.props.newHistory);
        this.props.dispatch(actions.sendUser(this.props.userId, this.props.newHistory))
        return (
          <div>
          <h1>Session Completed</h1>
            <form onSubmit={this.newSession}>
             <input type="submit" id="newSessionButton" className="button btn btn-primary" name="newSession" value="New Session"/>
            </form>
          </div>
        )
      }
    },



    render: function() {
        return (
       
            <div>{this.endGame()}</div>
          
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
