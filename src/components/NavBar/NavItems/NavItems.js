import React from "react";
import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = props => {
  return (
    <ul className={classes.NavItems}>
      <NavItem roadTo='/'>Home</NavItem>
      <NavItem roadTo='/my-orders'>My orders</NavItem>
      <NavItem roadTo='/about-me'>About me</NavItem>
    </ul>
  );
};

export default navItems;
