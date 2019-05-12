import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import classes from './Checkout.css'
import Button from '../../components/Buttons/Button'
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
      .map(item => {
        return (
          <li
            className={classes.LiItem} key={item}>{item} : <span className={classes.SpanItem}>{this.state.ingredients[item]}</span>
          </li>
        )
      });

    return (
      <Aux>
        <div className={classes.CheckoutContainer}>
          <div className={classes.ContentContainer}>
            <div className={classes.TextContainer}>
              <h2>Great! :)</h2>
              <h2>Only one step to order your favourite ramen!</h2>
              <h5>Please check the ingredients below and press confirm button to show contact form.</h5>
              <div className={classes.ArrowContainer}>
                <span className={classes.Arrow} />
              </div>
            </div>
            <div className={classes.IngredientsList}>
              {ingredientsList}
            </div>
          </div>
        </div>
        <div className={classes.ButtonsContainer}>
          <p><Button clicked={this.backViev} btn='Back'>Back to homepage</Button></p>
          <p><Button clicked={this.goForm} btn='Continue'>Show me form!</Button></p>
        </div>
        <Route path={this.props.match.path + '/go-form'}
          render={(props) => (<ContactForm checkoutState={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)}></Route>
      </Aux>
    );
  }
}

export default Checkout;