import React, { Component } from 'react';
import classes from './Checkout.css'
import Button from '../../components/Buttons/Button'
import { Route } from 'react-router-dom'
import Aux from '../../hoc/auxiliary'
import ContactForm from '../ContactForm/ContactForm';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  backViev = () => {
    this.props.history.goBack();
  }

  goForm = () => {
    this.props.history.replace('/check-before-buy/go-form')
  }

  render() {
    const ingredientsList = Object.keys(this.state.ingredients)
      .map(item => { return <li key={item}>{item} : <span>{this.state.ingredients[item]}</span></li> });
    return (
      <Aux>
        <div className={classes.CheckoutContener}>
          <h1>Excellent! You decide to buy a delicious ramen! </h1>
          <h3>Please check the ingredients and press a submit button!</h3>
          <div className={classes.IngredientsList}>
            {ingredientsList}
          </div>
        </div>
        <div className={classes.CheckoutContener}>
          <p><Button clicked={this.backViev} btn='Back'>Back to homepage</Button></p>
          <p><Button clicked={this.goForm} btn='Continue'>Go form!</Button></p>
        </div>
        <Route path={this.props.match.path + '/go-form'}
          render={(props) => (<ContactForm checkoutState={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)}></Route>
      </Aux>
    );
  }
}

export default Checkout;