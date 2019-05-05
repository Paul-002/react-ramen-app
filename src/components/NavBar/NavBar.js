import React from "react";
import classes from "./NavBar.css";
import NavItems from "./NavItems/NavItems";
import MenuButton from './NavItems/MenuButton/MenuButton'

const navBar = props => {
  return (
    <header className={classes.NavBar}>
      <MenuButton clickTheBurgerButton={props.clickTheBurgerButton} />
      <nav className={classes.NavItems}>
        <NavItems />
      </nav>
    </header>
  );
};

export default navBar;
