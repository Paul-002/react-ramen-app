import React, { Component } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './App.css';
import Aux from './hoc/auxiliary';
import RamenBuilder from './containers/RamenBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import MyOrders from './containers/MyOrders/MyOrders';
import Auth from './components/Auth/Auth';
import Logout from './components/Auth/Logout/logout';
import * as actions from './store/actions/actionAuth';

class App extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.autoSignup();
  }

  render() {
    let isAuth;

    // eslint-disable-next-line react/destructuring-assignment
    if (this.props.auth) {
      isAuth = (
        <Switch>
          <Route path="/my-orders" component={MyOrders} />
          <Route path="/check-before-buy" component={Checkout} />
          <Route path="/sign" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={RamenBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    } else {
      isAuth = (
        <Switch>
          <Route path="/sign" component={Auth} />
          <Route path="/" exact component={RamenBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Aux>
        <Layout />
        {isAuth}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authData.token !== null,
});

const mapDispatchToProps = dispatch => ({
  autoSignup: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
