import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  loading: null,
  error: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: false,
      }

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.authData.data.idToken,
        userId: action.authData.data.localId,
        loading: false,
        error: false
      }

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      }

    default:
      return state
  }
};

export default authReducer;