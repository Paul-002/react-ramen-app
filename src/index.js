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
  // eslint-disable-next-line no-console
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  // eslint-disable-next-line no-console
  console.log('[Middleware] nexState', store.getState());
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
  ramenData: ramenReducer,
  orderData: orderReducer,
  authData: authReducer,
});

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
