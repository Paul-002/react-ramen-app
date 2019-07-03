import React from 'react';
import ramen from '../../assets/ramen128.png';
import classes from './Logo.css';

const Logo = () => (
  <img src={ramen} alt="Ramen" className={classes.Logo} />
);

export default Logo;
