var actions = require('./actions');

var qCounter = 0;

var initialState = {
	french: "null",
	english: "null",
	score:0
}

var reducer = function(state, action) {
	state = state || initialState;
	console.log("Hit the reducer")
    if(action.type === actions.FETCH_WORD_SUCCESS) {
      // TODO: add react immutability helpers
			console.log("words" + action.words);
			state = Object.assign({}, state, {
					french: action.words[qCounter].french,
					english: action.words[qCounter].english
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
			console.log("Make guess")

			if (guess == state.english) {
				currentScore = currentScore + 1;
			}

			qCounter++;
			state = Object.assign({}, state, {
				score: currentScore

			});

			return state;
		}
    return state;
}



module.exports = reducer;
