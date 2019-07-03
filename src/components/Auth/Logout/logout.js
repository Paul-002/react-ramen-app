import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/actionAuth';

class Logout extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.logoutProperty();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  logoutProperty: () => dispatch(actions.logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
