import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
  // reducer -> loading to true
});

export const authSuccess = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  localId,
});

export const authFail = errorMessage => ({
  type: actionTypes.AUTH_FAIL,
  //  reducer -> changing error loading to true
  errorMessage: errorMessage
});

export const logout = () => {
  localStorage.clear();
  return {
    type: actionTypes.AUTH_LOGOUT,
    // reducer -> token to null
    // reducer -> userId to null
  };
};

export const timeLeftToLogout = expiresIn => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expiresIn * 1000);
};

export const redirectPath = path => ({
  type: actionTypes.REDIRECT_PATH,
  path,
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = new Date(localStorage.getItem('expiresTime'));
    if (expirationTime <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(timeLeftToLogout((expirationTime.getTime() - new Date().getTime()) / 1000));
    }
  }
};

export const auth = (inputValues, signInOrSignUp) => (dispatch) => {
  dispatch(authStart());
  const signUp = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDClURYPBpedqRXvWX8un0Y6TwnTgSlBD4';
  const signIn = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDClURYPBpedqRXvWX8un0Y6TwnTgSlBD4';
  const authData = {
    email: inputValues.email,
    password: inputValues.password,
    returnSecureToken: true,
  };
  axios.post(signInOrSignUp ? signUp : signIn, authData)
    .then((response) => {
      const expiresTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expiresTime', expiresTime);
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('userEmail', response.data.email);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(timeLeftToLogout(response.data.expiresIn));
    })
    .catch((error) => {
      if (error.response !== undefined) {
        dispatch(authFail(error.response.data.error.message));
      } else {
        if (error.message === "Network Error") {
          dispatch(authFail("No internet connection"));
        } else {
          dispatch(authFail("Auth problem..."));
        }
      }
    });
};
