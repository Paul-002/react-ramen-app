/* eslint-disable */
import React from 'react';
import Aux from '../../hoc/auxiliary';
import classes from './Input.css';

const input = (props) => {
  const {
    valid, touch, inputtype, change, type, name, placeholder, label,
  } = props;

  let inputData = null;
  const checkboxClass = [classes.InputCheckbox];
  const InvalidClass = [classes.FormInput];

  if (valid && touch) {
    InvalidClass.push(classes.Invalid);
  }

  InvalidClass.push(classes.Valid);

  switch (inputtype) {
    case 'input':
      inputData = (
        <input
          className={InvalidClass.join(' ')}
          onChange={change}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      );
      break;

    case 'checkbox':
      inputData = (
        <label className={classes.CheckboxLabel}>
          <input
            className={checkboxClass}
            onChange={change}
            type={type}
            name={name}
          >
          </input>
          {label}
        </label>
      );
      break;

    default:
      alert('something wrong');
  }

  return (
    <Aux>
      {inputData}
    </Aux>
  );
};

export default input;
