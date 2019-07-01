import React from 'react';
import classes from './SideDrawer.css'
import NavItems from '../NavItems/NavItems'
import BackDrop from '../../BackDrop/BackDrop';
import Aux from '../../../hoc/auxiliary';

const sideDrawer = (props) => {
  let openOrClosed = [classes.SideDrawer, classes.CloseTheSideDrawerAnim];

  if (props.show) {
    openOrClosed = [classes.SideDrawer, classes.OpenTheSideDrawerAnim];
  }
  return (
    <Aux>
      <BackDrop show={props.show} clickedBackDrop={props.clickedBackDrop} />
      <div className={openOrClosed.join(' ')}>
        <div className={classes.Text}>
          {localStorage.getItem('userEmail')
            ? <span>Hello user! <br /> {localStorage.getItem('userEmail')}</span>
            : <span>Welcome guest. <br /> Please sign in/up </span>}
          <span></span>
        </div>
        <nav className={classes.NavItemsContainer}>
          <NavItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
}

export default sideDrawer;