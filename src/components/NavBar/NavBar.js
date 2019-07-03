/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classes from './NavBar.css';
import NavItems from './NavItems/NavItems';
import MenuButton from './NavItems/MenuButton/MenuButton';
import Logo from '../Logo/Logo';

const navBar = props => (
  <header className={classes.NavBar}>
    {/* show BurgerButton < 500 */}
    <MenuButton clickTheBurgerButton={props.clickTheBurgerButton} />
    <div className={classes.LogoContainer}>
      {/* show logo < 500 */}
      <Logo />
    </div>
    <nav className={classes.NavBox}>
      {/* show NavItems > 500 */}
      <NavItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default navBar;
