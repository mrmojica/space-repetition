var actions = require('./actions');

var initialState = {

	id: 999,
	french: 'fromage',
	english: 'cheese'

}

var reducer = function(state, action) {
	state = state || initialState;

    if(action.type === actions.FETCH_WORD_SUCCESS) {
      // TODO: add react immutability helpers
      return {french: action.french}

    } else if (action.type === actions.FETCH_WORD_ERROR) {
      console.log(action.error);
    }
    return state;





}



module.exports = reducer;