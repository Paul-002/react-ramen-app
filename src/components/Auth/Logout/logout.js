import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/actionAuth'

class Logout extends Component {
  componentDidMount() {
    this.props.logoutProperty()
  }
  render() {
    return <Redirect to="/" />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutProperty: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);