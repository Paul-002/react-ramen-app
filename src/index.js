import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ramenReducer from './store/reducers/ramenReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';

const logger = store => next => (action) => {
  const result = next(action);
  return result;
};

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;

const combinedReducers = combineReducers({
  ramenData: ramenReducer,
  orderData: orderReducer,
  authData: authReducer,
});

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/react-ramen-app/" >
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
