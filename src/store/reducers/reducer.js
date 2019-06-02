import * as actionTypes from '../actions';

const initialState = {
  ramen: {
    chicken: 0,
    duck: 0,
    pork: 0,
    wakame: 0,
    egg: 0,
    onion: 0,
    mun: 0,
    shiitake: 0,
    reishi: 0
  },
  totalPrice: {
    price: 3
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        ramen: {
          ...state.ramen,
          [action.typeOfIngredient]: state.ramen[action.typeOfIngredient] + 1
        },
      }
    case actionTypes.SUB:
      return {
        ...state,
        ramen: {
          ...state.ramen,
          [action.typeOfIngredient]: state.ramen[action.typeOfIngredient] - 1
        },
      }
    case actionTypes.ADD_TOTAL_PRICE:
      console.log(action.value)
      return {
        ...state,
        totalPrice: {
          ...state.totalPrice,
          price: state.totalPrice.price + action.value
        },
      }
    case actionTypes.SUB_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: {
          ...state.totalPrice,
          price: state.totalPrice.price - action.value
        },
      }

  }
  return state;
}

export default reducer;