import * as actionTypes from './actionTypes';

export const setAdd = (value, typeOfIngredient) => {
  return {
    type: actionTypes.ADD,
    value: value,
    typeOfIngredient: typeOfIngredient
  }
};

export const sub = (value, typeOfIngredient) => {
  return {
    type: actionTypes.SUB,
    value: value,
    typeOfIngredient: typeOfIngredient
  }
};

export const addTotalPrice = (price) => {
  return {
    type: actionTypes.ADD_TOTAL_PRICE,
    value: price
  }
};

export const subTotalPrice = (price) => {
  return {
    type: actionTypes.SUB_TOTAL_PRICE,
    value: price
  }
};

export const add = (value, typeOfIngredient) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(setAdd(value, typeOfIngredient));
    }, 2000)
  }

}