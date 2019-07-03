/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classes from './Spinner.css';

const spinner = props => (
  <div className={classes.SpinnerContainer}>
    <div className={classes.Spinner}>
      {props.children}
    </div>
  </div>
);

export default spinner;
