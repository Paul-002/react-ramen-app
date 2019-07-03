/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classes from './TotalCost.css';
import Aux from '../../hoc/auxiliary';

const TotalCost = props => (
  <Aux>
    <p className={classes.Sum}>
      Total cost: {props.totalPrice.toFixed(2)} zł
    </p>
  </Aux>
);
export default TotalCost;
