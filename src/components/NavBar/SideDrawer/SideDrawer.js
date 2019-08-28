/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import classes from './SideDrawer.css';
import NavItems from '../NavItems/NavItems';
import BackDrop from '../../BackDrop/BackDrop';
import Aux from '../../../hoc/auxiliary';

const sideDrawer = (props) => {
  const { show, closeSideDrawer, isAuth } = props;
  let openOrClosed = [classes.SideDrawer, classes.CloseTheSideDrawerAnim];

  const loginStatus = () => {
    const userEmail = localStorage.getItem('userEmail');

    return userEmail
    ?
      <span>
        Hello user! <br />
        You are logged as <br />
          {
            userEmail.length >= 17
            ? userEmail.substring(0,17) + '...'
            : userEmail
          }
      </span>
    : <span> 
        Welcome guest. <br />
        Please sign in/up
      </span>
  }

  if (show) {
    openOrClosed = [classes.SideDrawer, classes.OpenTheSideDrawerAnim];
  }

  return (
    <Aux>
      <BackDrop show={show} clickedBackDrop={closeSideDrawer} />
      <div className={openOrClosed.join(' ')} onClick={closeSideDrawer} >
        <div className={classes.Text}>
        {loginStatus()}
        </div>
        <nav className={classes.NavItemsContainer}>
          <NavItems isAuth={isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
