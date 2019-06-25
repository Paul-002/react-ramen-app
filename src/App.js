import React, { Component } from "react";
import "./App.css";
import Aux from "./hoc/auxiliary";
import RamenBuilder from "./containers/RamenBuilder";
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import MyOrders from "./containers/MyOrders/MyOrders";
import classes from './App.css';
import Auth from './components/Auth/Auth';
import Logout from "./components/Auth/Logout/logout";

class App extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.Background}>
          <Layout />
          <Switch>
            <Route path='/my-orders' component={MyOrders}></Route>
            <Route path='/check-before-buy' component={Checkout}></Route>
            <Route path='/sign' component={Auth}></Route>
            <Route path='/logout' component={Logout}></Route>
            <Route path='/' exact component={RamenBuilder}></Route>
          </Switch>
        </div>
      </Aux>
    );
  }
}

export default App;
