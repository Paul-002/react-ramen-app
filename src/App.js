import React, { Component } from "react";
import "./App.css";
import Aux from "./hoc/auxiliary";
import RamenBuilder from "./containers/RamenBuilder";
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import MyOrders from "./containers/MyOrders/MyOrders";

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout />
        <Switch>
          <Route path='/my-orders' component={MyOrders}></Route>
          <Route path='/check-before-buy' component={Checkout}></Route>
          <Route path='/' component={RamenBuilder}></Route>
        </Switch>
      </Aux>
    );
  }
}

export default App;
