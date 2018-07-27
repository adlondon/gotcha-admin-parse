import Parse from 'parse';
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  AUTH_LOADING,
  FORGOT_EMAIL_SUCCESS,
  RESET_SUCCESS
} from './AuthTypes';

import {
  UPDATE_USER,
  CLEAR_USER
} from '../UserTypes';

function _authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const clearError = () => ({
  type: CLEAR_ERROR
});

function _updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

function _clearUser() {
  return {
    type: CLEAR_USER
  };
}

export const signInUser = (email, password) => (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
  Parse.User.logIn(email, password, {
    success: (user) => {
      dispatch(_updateUser(user));
      dispatch({
        type: AUTH_USER,
        payload: user
      });
      browserHistory.push('/drivers');
    },
    error: (user, error) => {
      dispatch(_authError(error));
    }
  });
};

function _unAuthUser() {
  return new Promise((resolve) => {
    resolve(Parse.User.logOut());
  });
}

function _createUser(email, password) {
  return new Promise((resolve) => {
    const User = new Parse.User();
    User.set("username", email);
    User.set("email", email);
    User.set("password", password);
    User.set("role", "admin");
    resolve(User.signUp());
  });
}

export const signUpUser = (email, password) => (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
  });
  if (Parse.User.current()) {
    // If a session token exists, clear the user and then try to signUp
    // Otherwise, Parse will throw session token error
    _unAuthUser()
      .then(() => {
        dispatch(_clearUser());
        dispatch({ type: UNAUTH_USER });
        _createUser(email, password)
          .then((user) => {
            dispatch(_updateUser(user));
            dispatch({
              type: AUTH_USER,
              payload: user
            });
            browserHistory.push('/drivers');
          })
          .catch((error) => {
            dispatch(_authError(error));
          });
      })
      .catch((error) => {
        dispatch(_authError(error));
      });
  }
};

export const sendForgotPasswordEmail = email => (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  });
  Parse.User.requestPasswordReset(email, {
    success() {
      dispatch({
        type: FORGOT_EMAIL_SUCCESS
      });
    },
    error(error) {
      dispatch(_authError(error));
    }
  });
};

export const resetPassword = (password, username) => (dispatch) => {
  dispatch({
    type: AUTH_LOADING
  });
  Parse.Cloud.run("resetPassword", { username, password })
    .then(() => {
      dispatch({
        type: RESET_SUCCESS
      });
    })
    .catch((error) => {
      console.log("RESET PASS ERR:", error);
    });
};

export const logOutUser = () => (dispatch) => {
  browserHistory.push('/');
  Parse.User.logOut(null, {
    success: () => {
      dispatch(_clearUser());
      dispatch({ type: UNAUTH_USER });
    },
    error: (user, error) => {
      dispatch(_authError(error));
    },
  });
};
