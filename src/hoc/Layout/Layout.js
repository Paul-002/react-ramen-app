import React, { Component } from 'react';
import Navbar from '../../components/NavBar/NavBar'
import SideDrawer from '../../components/NavBar/SideDrawer/SideDrawer'
import Aux from '../auxiliary'

//redux
import { connect } from 'react-redux'

class Layout extends Component {
  state = {
    SideDrawer: false
  }

  showTheSideDrawer = () => {
    this.setState((prevState) => {
      return { SideDrawer: !prevState.SideDrawer }
    })
  }

  clickedBackDrop = () => {
    this.setState({ SideDrawer: false })
  }

  render() {
    return (
      <Aux>
        <Navbar
          clickTheBurgerButton={this.showTheSideDrawer}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          show={this.state.SideDrawer}
          clickedBackDrop={this.clickedBackDrop}
          isAuth={this.props.isAuth}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authData.token !== null,
    userEmail: state.authData.userEmail
  }
}

export default connect(mapStateToProps)(Layout);