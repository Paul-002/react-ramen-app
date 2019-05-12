import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary'
import classes from './OrderSummary.css'
import Button from '../../components/Buttons/Button'
//import { Link } from 'react-router-dom'

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('orderSummary will update');
  }

  render() {
    const ingredientsList = Object.keys(this.props.ingredientsList)
      .map(item => {
        return (
          <li className={`${classes.SingleList} ${!(this.props.ingredientsList[item]) ? classes.LineTrough : ' '}`} key={item}>
            {item} : <span className={classes.ValueOnList}>{this.props.ingredientsList[item]}</span>
          </li>
        )
      });

    return (
      <Aux>
        <h1 className={classes.Heading}>Your order</h1>
        <ul className={classes.UlContainer}>
          {ingredientsList}
        </ul>
        <p className={classes.TotalCost}
        >
          Total cost: <span className={classes.Price}>{this.props.totalPrice.toFixed(2)} zł</span>
        </p>
        <div className={classes.Buttons}>
          <Button clicked={this.props.orderTheRamen} btn='Continue'>Go to summary</Button>
          <Button clicked={this.props.hideTheModal} btn='Back'>Back</Button>
        </div>
      </Aux>
    );
  }
}

export default OrderSummary;