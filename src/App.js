import React, { Component } from "react";
import "./App.css";
import Aux from "./hoc/auxiliary";
import RamenBuilder from "./containers/RamenBuilder";
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import MyOrders from "./containers/MyOrders/MyOrders";
import classes from './App.css';
import Auth from './components/Auth/Auth';
import Logout from "./components/Auth/Logout/logout";

//redux
import { connect } from 'react-redux';
import * as actions from './store/actions/actionAuth'

class App extends Component {

  componentDidMount() {
    this.props.autoSignup();
  }

  render() {
    let isAuth;

    if (this.props.auth) {
      isAuth = (
        <Switch>
          <Route path='/my-orders' component={MyOrders}></Route>
          <Route path='/check-before-buy' component={Checkout}></Route>
          <Route path='/logout' component={Logout}></Route>
          <Route path='/' exact component={RamenBuilder}></Route>
          <Redirect to='/' />
        </Switch>
      )
    } else {
      isAuth = (
        <Switch>
          <Route path='/sign' component={Auth}></Route>
          <Route path='/' exact component={RamenBuilder}></Route>
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Aux>
        <div className={classes.Background}>
          <Layout />
          {isAuth}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authData.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
