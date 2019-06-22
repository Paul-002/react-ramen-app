import React from 'react'
import classes from './ErrorMessage.css'

const errorMessage = () => {
  return (
    <p className={classes.MessageError}>
      Whoops! Sorry, something went wrong. <br /> Please come back in a few minutes and try again.
    </p>
  );
}

export default errorMessage;