import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const add = (value, typeOfIngredient) => {
  return {
    type: actionTypes.ADD,
    value: value,
    typeOfIngredient: typeOfIngredient
    // pick: true
  }
};

export const sub = (value, typeOfIngredient) => {
  return {
    type: actionTypes.SUB,
    value: value,
    typeOfIngredient: typeOfIngredient
    // pick: true
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

// GET INGREDIENTS FROM FIREBASE
export const setAxiosIngredients = (response) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    fetchedIngredients: response
    // pick: false
  }
};

export const errorAxiosIngredients = (error) => {
  return {
    type: actionTypes.ERROR_INGREDIENTS,
    errorGetIngredients: error
  }
};

// POST ORDER
export const postSuccess = (response) => {
  return {
    type: actionTypes.POST_SUCCESS,
    response: response
  }
};

export const postFail = (error) => {
  return {
    type: actionTypes.POST_FAIL,
    errorPostFail: error
  }
};

// ORDER CARDS
export const getOrderCardsSuccess = (response) => {
  return {
    type: actionTypes.FETCHING_ORDERS,
    response: response
    // loading: true
  }
};

export const getOrderCardsFail = (error) => {
  return {
    type: actionTypes.FETCHING_ORDERS_FAIL,
    errorOrderCards: error
  }
};

//UI FEATURES
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
        dispatch(errorAxiosIngredients(error)) //fix that
      })
  }
};

export const axiosPostOrder = (contact, token) => {
  return dispatch => {
    axios.post(`/order.json?auth=${token}`, contact)
      .then(response => {
        dispatch(postSuccess(response))
      })
      .catch(error => {
        dispatch(postFail(true)) //fix that
      });
  }
};

export const axiosGetOrderCards = (token, userId) => {
  return dispatch => {
    axios.get(`/order.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(response => {
        dispatch(getOrderCardsSuccess(response))
      })
      .catch(error => {
        dispatch(getOrderCardsFail(true))  //fix that
      })
  }
}