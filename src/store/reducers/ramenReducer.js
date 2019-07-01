import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ramen: null,
  totalPrice: 0,
  error: false,
  errorGetIngredients: false,
  pick: false
}

const ramenReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        ramen: {
          ...state.ramen,
          [action.typeOfIngredient]: state.ramen[action.typeOfIngredient] + action.value,
        },
        pick: true
      }

    case actionTypes.SUB:
      return {
        ...state,
        ramen: {
          ...state.ramen,
          [action.typeOfIngredient]: state.ramen[action.typeOfIngredient] - action.value,
        },
        pick: true
      }

    case actionTypes.ADD_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice + action.value
      }

    case actionTypes.SUB_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: state.totalPrice - action.value
      }

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ramen: action.fetchedIngredients,
        pick: false,
        totalPrice: 15.20
      }

    case actionTypes.ERROR_INGREDIENTS:
      return {
        ...state,
        errorGetIngredients: action.errorGetIngredients
      }

    default:
      return state
  }
}

export default ramenReducer;