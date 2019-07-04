/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import classes from './SideDrawer.css';
import NavItems from '../NavItems/NavItems';
import BackDrop from '../../BackDrop/BackDrop';
import Aux from '../../../hoc/auxiliary';

const sideDrawer = (props) => {
  const { show, closeSideDrawer, isAuth } = props;
  let openOrClosed = [classes.SideDrawer, classes.CloseTheSideDrawerAnim];

  if (show) {
    openOrClosed = [classes.SideDrawer, classes.OpenTheSideDrawerAnim];
  }

  return (
    <Aux>
      <BackDrop show={show} clickedBackDrop={closeSideDrawer} />
      <div className={openOrClosed.join(' ')} onClick={closeSideDrawer} >
        <div className={classes.Text}>
          {
            localStorage.getItem('userEmail')
              ? <span> Hello user! <br /> {localStorage.getItem('userEmail')} </span>
              : <span> Welcome guest. <br /> Please sign in/up </span>
          }
        </div>
        <nav className={classes.NavItemsContainer}>
          <NavItems isAuth={isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
