require('isomorphic-fetch');



var FETCH_WORD_SUCCESS = 'FETCH_WORD_SUCCESS';
var fetchWordSuccess = function(words) {
    return {
        type: FETCH_WORD_SUCCESS,
        words: words

    };
};

var FETCH_WORD_ERROR= 'FETCH_WORD_ERROR';
var fetchWordError = function(error) {
    return {
        type: FETCH_WORD_ERROR,
        error: error
    };
};

var MAKE_GUESS = 'MAKE_GUESS';
var makeGuess = function(enword) {
    return {
        type: MAKE_GUESS,
        english: enword
    };
};


var fetchData = function() {
   return function(dispatch) {
       var url = 'http://localhost:8080/api/question';
       return fetch(url).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("DATA", data);
           return dispatch(
               fetchWordSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               fetchWordError(error)
           );
       });
   }
};






exports.FETCH_WORD_SUCCESS = FETCH_WORD_SUCCESS;
exports.fetchWordSuccess = fetchWordSuccess;
exports.FETCH_WORD_ERROR = FETCH_WORD_ERROR;
exports.fetchWordError = fetchWordError;
exports.MAKE_GUESS = MAKE_GUESS;
exports.makeGuess = makeGuess;
exports.fetchData = fetchData;
