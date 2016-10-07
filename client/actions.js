require('isomorphic-fetch');
var Cookies = require('js-cookie');




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

var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user) {
    return {
        type: FETCH_USER_SUCCESS,
        user: user

    };
};

var FETCH_USER_ERROR= 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
    return {
        type: FETCH_USER_ERROR,
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

var NEW_GAME = 'NEW_GAME';
var newGame = function() {
    return {
        type: NEW_GAME
    };
};








// var getToken = function() {
//   var cookies = document.cookie;
//   var accessToken = cookies.split('=');
//   console.log('accessToken function', accessToken);
//   return accessToken[1];
// }


var fetchWords = function() {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
    console.log('header', headers);
       var url = 'http://localhost:8080/api/question';

       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("WORD DATA", data);
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


var fetchUser = function() {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
    console.log('header', headers);
       var url = 'http://localhost:8080/user';

       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("USER DATA", data);
           return dispatch(
               fetchUserSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               fetchUserError(error)
           );
       });
   }
};



//UPDATE DATA ACTION
var sendUser = function(id, newHistory) {
   return function(dispatch) {
       var url = 'http://localhost:8080/user/' + id;
       return fetch(url,
       {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
          quizHistory: newHistory
        })


       }

        ).then(function(response) {
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
               fetchUserSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               fetchUserError(error)
           );
       });
   }
};



exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;

exports.FETCH_WORD_SUCCESS = FETCH_WORD_SUCCESS;
exports.fetchWordSuccess = fetchWordSuccess;
exports.FETCH_WORD_ERROR = FETCH_WORD_ERROR;
exports.fetchWordError = fetchWordError;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.fetchUserSuccess = fetchUserSuccess;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.fetchUserError = fetchUserError;
exports.MAKE_GUESS = MAKE_GUESS;
exports.makeGuess = makeGuess;
exports.fetchWords = fetchWords;
exports.fetchUser = fetchUser;
exports.sendUser = sendUser;
