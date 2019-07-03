import React from 'react';
import classes from './SubmitButton.css';

const submitButton = ({ disabled, showModal, onlyForUsers }) => (
  <div className={classes.ButtonContainer}>
    <button
      type="button"
      disabled={disabled}
      className={classes.SubmitButton}
      onClick={showModal}
    >
      {onlyForUsers ? 'My order' : 'Sign in/up to continue'}
    </button>
  </div>
);

export default submitButton;
