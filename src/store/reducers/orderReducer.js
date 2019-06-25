import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cardsData: null,
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
      }

    case actionTypes.FETCHING_ORDERS:
      return {
        ...state,
        cardsData: action.response.data
      }

    case actionTypes.FETCHING_ORDERS_FAIL:
      return {
        ...state,
        error: action.error
      }

    case actionTypes.CHANGE_LOADING_VAL:  //loading spinner
      return {
        ...state,
        loading: true
      }

    case actionTypes.CLEAR_RESPONSE_STATUS:  //change response status when subButton are clicked
      return {
        ...state,
        response: null
      }

    default:
      return state
  }
}

export default orderReducer;