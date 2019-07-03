/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classes from './ErrorMessage.css';

const errorMessage = props => (
  <p className={props.withBorder ? classes.MessageErrorWithBorder : classes.MessageError}>
    Whoops! Sorry, something went wrong.
    <br />
    <br />
    Please come back in a few minutes and try again.
  </p>
);

export default errorMessage;
