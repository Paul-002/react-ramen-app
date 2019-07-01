import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    // reducer -> loading to true
  }
};

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    localId: localId,
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.response.data.error
  }
};

export const logout = () => {
  localStorage.clear();
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

export const redirectPath = (path) => {
  return {
    type: actionTypes.REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expiresTime'))
      if (expirationTime <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(timeLeftToLogout((expirationTime.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}

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
        const expiresTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expiresTime', expiresTime)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('userEmail', response.data.email)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(timeLeftToLogout(response.data.expiresIn))
      })
      .catch(error => {
        dispatch(authFail(error))
      })
  }
}