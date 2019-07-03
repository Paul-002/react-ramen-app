/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.css';

const navItem = props => (
  <li className={classes.NavItem}>
    <NavLink to={props.roadTo} activeClassName={classes.active} exact>
      {props.children}
    </NavLink>
  </li>
);
export default navItem;
