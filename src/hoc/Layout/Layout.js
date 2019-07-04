import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/NavBar/NavBar';
import SideDrawer from '../../components/NavBar/SideDrawer/SideDrawer';
import Aux from '../auxiliary';

class Layout extends Component {
  state = {
    SideDrawer: false,
  }

  showTheSideDrawer = () => {
    this.setState(prevState => ({ SideDrawer: !prevState.SideDrawer }));
  }

  closeSideDrawer = () => {
    this.setState({ SideDrawer: false });
  }

  render() {
    const { isAuth } = this.props;

    return (
      <Aux>
        <Navbar
          clickTheBurgerButton={this.showTheSideDrawer}
          isAuth={isAuth}
        />
        <SideDrawer
          // eslint-disable-next-line react/destructuring-assignment
          show={this.state.SideDrawer}
          closeSideDrawer={this.closeSideDrawer}
          isAuth={isAuth}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.authData.token !== null,
  userEmail: state.authData.userEmail,
});

export default connect(mapStateToProps)(Layout);
