import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cardsData: false,
  errorOrderCards: false,
  errorPostFail: false,
  response: null,
  loading: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_SUCCESS:
      return {
        ...state,
        response: action.response.status,
        loading: false
      }

    case actionTypes.POST_FAIL:
      return {
        ...state,
        errorPostFail: action.errorPostFail,
      }

    case actionTypes.FETCHING_ORDERS:
      return {
        ...state,
        cardsData: action.response.data
      }

    case actionTypes.FETCHING_ORDERS_FAIL:
      return {
        ...state,
        errorOrderCards: action.errorOrderCards
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