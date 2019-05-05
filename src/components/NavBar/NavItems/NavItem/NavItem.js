import React from "react";
import classes from "./NavItem.css";
import { NavLink } from 'react-router-dom'

const navItem = props => {
  return (
    <li className={classes.NavItem}>
      <NavLink to={props.roadTo} activeClassName={classes.active} exact>{props.children}</NavLink>
    </li>
  );
};
export default navItem;
