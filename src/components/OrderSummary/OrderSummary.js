import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import classes from './OrderSummary.css';
import Button from '../Buttons/Button';
// import { Link } from 'react-router-dom'

class OrderSummary extends Component {

  render() {
    const {
      ingredientsList,
      totalPrice,
      orderTheRamen,
      hideTheModal,
    } = this.props;

    const ingredientsListData = Object.keys(ingredientsList)
      .map(item => (
        <li className={`${classes.SingleList} ${!(ingredientsList[item]) ? classes.LineTrough : ' '}`} key={item}>
          {item}
          <span className={classes.ValueOnList}
          >
            : {ingredientsList[item]}
          </span>
        </li>
      ));

    return (
      <Aux>
        <h1 className={classes.Heading}>Your order</h1>
        <ul className={classes.UlContainer}>
          {ingredientsListData}
        </ul>
        <p className={classes.TotalCost}>
          <span className={classes.Price}>
            {`Total cost: ${totalPrice.toFixed(2)} zł`}
          </span>
        </p>
        <div className={classes.Buttons}>
          <Button clicked={orderTheRamen} btn="Continue">Go to summary</Button>
          <Button clicked={hideTheModal} btn="Back">Back</Button>
        </div>
      </Aux>
    );
  }
}

export default OrderSummary;
