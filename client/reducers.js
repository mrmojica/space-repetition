var actions = require('./actions');

var qCounter = 0;

var initialState = {
	id: 999,
	french: "null",
	english: "null",
	score:0,
	feedback: ""
}

var reducer = function(state, action) {
	state = state || initialState;
	console.log("Hit the reducer")
    if(action.type === actions.FETCH_WORD_SUCCESS) {
      // TODO: add react immutability helpers
			console.log("words" + action.words[0].quizHistory);
			state = Object.assign({}, state, {
					id: action.words[0].quizHistory[qCounter].id,
					french: action.words[0].quizHistory[qCounter].french,
					english: action.words[0].quizHistory[qCounter].english
			});
      return state;
    }
		else if (action.type === actions.FETCH_WORD_ERROR) {
      console.log(action.error);
    }
		else if (action.type === actions.MAKE_GUESS) {
			var guess = action.english;
			console.log(action.english);
			var currentScore = state.score;
			var currentFeedback = state.feedback;
			console.log("Make guess")

			if (guess == state.english) {
				currentScore = currentScore + 1;
				currentFeedback = "Correct"
			}
			else {currentFeedback = "Incorrect"}

			qCounter++;
			state = Object.assign({}, state, {
				score: currentScore,
				feedback: currentFeedback

			});

			return state;
		}
    return state;
}



module.exports = reducer;
