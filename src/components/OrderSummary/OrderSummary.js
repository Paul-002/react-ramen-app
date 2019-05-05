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
      .map(item => { return <li key={item}>{item} : <span className={classes.NumberOfIngredients}>{this.props.ingredientsList[item]}</span></li> });
    return (
      <Aux>
        <h1>Order</h1>
        <ul>
          {ingredientsList}
        </ul>
        <p>Total cost: {this.props.totalPrice.toFixed(2)} zł</p>
        <Button clicked={this.props.orderTheRamen} btn='Continue'>Order Now!</Button>
        <Button clicked={this.props.hideTheModal} btn='Back'>Back to ingredients...</Button>
      </Aux>
    );
  }
}

export default OrderSummary;