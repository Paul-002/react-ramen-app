/* eslint-disable */
import React from 'react';
import classes from './Button.css';

const button = ({
  disabled, btn, customStyle, clicked, children,
}) => (
    <button
      type="button"
      disabled={disabled}
      className={[classes.Button, classes[btn], classes[customStyle]].join(' ')}
      onClick={clicked}
    >
      {children}
    </button>
  );

export default button;
