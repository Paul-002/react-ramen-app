/* eslint-disable */
import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const add = (value, typeOfIngredient) => ({
  type: actionTypes.ADD,
  value,
  typeOfIngredient,
  // pick: true
});

export const sub = (value, typeOfIngredient) => ({
  type: actionTypes.SUB,
  value,
  typeOfIngredient,
  // pick: true
});

export const addTotalPrice = price => ({
  type: actionTypes.ADD_TOTAL_PRICE,
  value: price,
});

export const subTotalPrice = price => ({
  type: actionTypes.SUB_TOTAL_PRICE,
  value: price,
});

// GET INGREDIENTS FROM FIREBASE
export const setAxiosIngredients = response => ({
  type: actionTypes.SET_INGREDIENTS,
  fetchedIngredients: response,
  // pick: false
});

export const errorAxiosIngredients = error => ({
  type: actionTypes.ERROR_INGREDIENTS,
  errorGetIngredients: error,
});

// POST ORDER
export const postSuccess = response => ({
  type: actionTypes.POST_SUCCESS,
  response,
});

export const postFail = error => ({
  type: actionTypes.POST_FAIL,
  errorPostFail: error,
});

// ORDER CARDS
export const getOrderCardsSuccess = response => ({
  type: actionTypes.FETCHING_ORDERS,
  response,
  // loading: true
});

export const getOrderCardsFail = error => ({
  type: actionTypes.FETCHING_ORDERS_FAIL,
  errorOrderCards: error,
});

// UI FEATURES
export const changeLoadingVal = () => ({
  type: actionTypes.CHANGE_LOADING_VAL,
  // reducer change loading to true
});

export const clearResponseStatus = () => ({
  type: actionTypes.CLEAR_RESPONSE_STATUS,
  // reducer change response to null
});

export const axiosGetIngredients = () => (dispatch) => {
  axios.get('/ramen.json')
    .then((response) => {
      dispatch(setAxiosIngredients(response.data));
    })
    .catch((error) => {
      dispatch(errorAxiosIngredients(error)); // fix that
    });
};

export const axiosPostOrder = (contact, token) => (dispatch) => {
  axios.post(`/order.json?auth=${token}`, contact)
    .then((response) => {
      dispatch(postSuccess(response));
    })
    .catch((error) => {
      dispatch(postFail(true)); // fix that
    });
};

export const axiosGetOrderCards = (token, userId) => (dispatch) => {
  axios.get(`/order.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
    .then((response) => {
      dispatch(getOrderCardsSuccess(response));
    })
    .catch((error) => {
      dispatch(getOrderCardsFail(true)); // fix that
    });
};
