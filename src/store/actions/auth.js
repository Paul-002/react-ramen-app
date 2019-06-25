import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    // reducer -> loading to true
  }
};

export const authSuccess = (response) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: response
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.response.data.error
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
    // token to null
    // userId to null
  }
}

export const timeLeftToLogout = (expiresIn) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000)
  }
};

export const auth = (inputValues, signInOrSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const signUp = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDClURYPBpedqRXvWX8un0Y6TwnTgSlBD4'
    const signIn = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDClURYPBpedqRXvWX8un0Y6TwnTgSlBD4'
    const authData = {
      email: inputValues.email,
      password: inputValues.password,
      returnSecureToken: true
    }
    axios.post(signInOrSignUp ? signUp : signIn, authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response))
        dispatch(timeLeftToLogout(response.data.expiresIn))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFail(error))
      })
  }
}