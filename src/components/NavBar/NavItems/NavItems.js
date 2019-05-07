import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";
import Logo from "../../Logo/Logo";

const navItems = props => {
  return (
    <ul className={classes.NavItems}>
      <li className={classes.LogoContainer}>
        <Logo />
      </li>
      <NavItem roadTo='/'>Home</NavItem>
      <NavItem roadTo='/my-orders'>My orders</NavItem>
      <NavItem roadTo='/about-me'>About me</NavItem>
    </ul>
  );
};

export default navItems;
