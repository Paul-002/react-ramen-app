import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";
import Logo from "../../Logo/Logo";

const navItems = (props) => {

  const isAuthLogout = props.isAuth
    ? <NavItem roadTo='/logout'>Logout</NavItem>
    : <NavItem roadTo='/sign'>Sign in/up</NavItem>

  const isAuthOrder = props.isAuth
    ? <NavItem roadTo='/my-orders'>My orders</NavItem>
    : null

  return (
    <ul className={classes.NavItems}>
      <li className={classes.LogoContainer}>
        <Logo />
      </li>
      <NavItem roadTo='/' exact>Home</NavItem>
      {isAuthOrder}
      {isAuthLogout}
    </ul>
  );
};

export default navItems;
