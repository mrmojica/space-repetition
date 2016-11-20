var actions = require('./actions');

var qCounter = 0;

var initialState = {
	userId: "null",
	id: 999,
	french: "null",
	english: "null",
	score:0,
	feedback: "",
	endGame: false,
	newHistory: []
}

// The currentSession grabs/holds the session data from the user database.
var currentSession = [];
//added currenthistory variable to make copy of user data from the server.  This makes it easier editing the state. 
var currentHistory = [];

//Quiz Session will be an array of question IDs
var reducer = function(state, action) {
	// console.log('actions', actions);
	state = state || initialState;
	console.log("Hit the reducer");
	console.log("new history is ", state.newHistory);
	console.log("current session ", currentSession);
    if(action.type === actions.FETCH_WORD_SUCCESS) {
    	console.log('fetchword success');
			if (currentSession[qCounter] == undefined) {
				state = Object.assign({}, state, {
						endGame: true
				});
				return state;
			}

      // TODO: add react immutability helpers
			console.log("words ", action.words);
			state = Object.assign({}, state, {
					id: action.words[currentSession[qCounter]].id,
					french: action.words[currentSession[qCounter]].french,
					english: action.words[currentSession[qCounter]].english
			});
      return state;
    }
		else if (action.type === actions.FETCH_WORD_ERROR) {
      console.log(action.error);
    }
    	//fetchUser is grabbing the session array index list (the index list is used as a index for the questions)
		else if (action.type === actions.FETCH_USER_SUCCESS) {
			console.log("user " + action.user);
			if (currentHistory.length == 0) {
				currentHistory = action.user[0].quizHistory
			}
			currentSession = action.user[0].quizSession;
			state = Object.assign({}, state, {
					userId: action.user[0]._id
			});
			return state;
		}
		else if (action.type === actions.FETCH_USER_ERROR) {
			console.log(action.error);
		}
		else if (action.type === actions.MAKE_GUESS) {
			var guess = action.english;
			console.log(action.english);
			var currentScore = state.score;
			var currentFeedback = state.feedback;
			console.log("Make guess")

			if (guess == state.english) {
				//if user answers correctly decrease wrong amount
				currentHistory[currentSession[qCounter]].wrongAmt--;
				currentScore = currentScore + 1;
				currentFeedback = "Correct"
			}
			//if user answers incorrectly increase wrong amount 
			else {currentHistory[currentSession[qCounter]].wrongAmt++;
				currentFeedback = "Incorrect"}
				qCounter++;
				// Update state
			state = Object.assign({}, state, {
				score: currentScore,
				feedback: currentFeedback,
				newHistory: currentHistory

			});

			return state;
		}
		//user history gets updated in databse
		else if (action.type === actions.NEW_GAME) {
			console.log('New Game');
			qCounter = 0;
			state = Object.assign({}, state, {
				score: 0,
				feedback: '',
				endGame: false


			});
			return state;
		}
		


    return state;
}



module.exports = reducer;
