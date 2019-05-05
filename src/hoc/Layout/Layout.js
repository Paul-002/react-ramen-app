import React, { Component } from 'react';
import Navbar from '../../components/NavBar/NavBar'
import SideDrawer from '../../components/NavBar/SideDrawer/SideDrawer'
//import classes from './Layout.css'
import Aux from '../auxiliary'

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
        <Navbar clickTheBurgerButton={this.showTheSideDrawer}></Navbar>
        <SideDrawer show={this.state.SideDrawer} clickedBackDrop={this.clickedBackDrop}></SideDrawer>
      </Aux>
    );
  }
}

export default Layout;