import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: false,
  response: null,
  loading: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_SUCESS:
      return {
        ...state,
        response: action.response.status,
        loading: false
      }

    case actionTypes.POST_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }

    case actionTypes.CHANGE_LOADING_VAL:
      return {
        ...state,
        loading: true
      }

    case actionTypes.CLEAR_RESPONSE_STATUS:
      return {
        ...state,
        response: null
      }

    default:
      return state
  }
}

export default orderReducer;