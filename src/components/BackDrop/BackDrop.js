import React from 'react';
import classes from './BackDrop.css';

const backDrop = ({ show, clickedBackDrop }) => (
  show
    ? <div className={classes.BackDrop} onClick={clickedBackDrop} role="presentation" />
    : null
);

export default backDrop;
