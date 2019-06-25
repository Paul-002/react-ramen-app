import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const add = (value, typeOfIngredient) => {
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

export const setAxiosIngredients = (response) => {    //get ingredients
  return {
    type: actionTypes.SET_INGREDIENTS,
    fetchedIngredients: response
  }
};

export const errorAxiosIngredients = (error) => {     //error ingredients
  return {
    type: actionTypes.ERROR_INGREDIENTS,
    error: error
  }
};

export const postSucess = (response) => {    //post order
  return {
    type: actionTypes.POST_SUCESS,
    response: response
  }
};

export const postFail = (error) => {     //fail order
  return {
    type: actionTypes.POST_FAIL,
    error: error
  }
};

export const getOrderCardsSucess = (response) => {     //get order cards
  return {
    type: actionTypes.FETCHING_ORDERS,
    response: response
    //reducer change loading to true
  }
};

export const getOrderCardsFail = (error) => {     //fail order cards
  return {
    type: actionTypes.FETCHING_ORDERS_FAIL,
    error: error
  }
};

export const changeLoadingVal = () => {
  return {
    type: actionTypes.CHANGE_LOADING_VAL,
    //reducer change loading to true
  }
};

export const clearResponseStatus = () => {
  return {
    type: actionTypes.CLEAR_RESPONSE_STATUS,
    //reducer change response to null
  }
};

export const axiosGetIngredients = () => {
  return dispatch => {
    axios.get('/ramen.json')
      .then(response => {
        dispatch(setAxiosIngredients(response.data))
      })
      .catch(error => {
        dispatch(errorAxiosIngredients(true)) //fix that
      })
  }
};

export const axiosPostOrder = (contact, token) => {
  return dispatch => {
    axios.post('/order.json?auth=' + token, contact)
      .then(response => {
        dispatch(postSucess(response))
      })
      .catch(error => {
        dispatch(postFail(true)) //fix that
      });
  }
};

export const axiosGetOrderCards = (token) => {
  return dispatch => {
    axios.get('/order.json?auth=' + token)
      .then(response => {
        dispatch(getOrderCardsSucess(response))
      })
      .catch(error => {
        dispatch(getOrderCardsFail(true))  //fix that
      })
  }
}