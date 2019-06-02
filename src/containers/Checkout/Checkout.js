import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import classes from './Checkout.css'
import Button from '../../components/Buttons/Button'
import Aux from '../../hoc/auxiliary'
import ContactForm from '../ContactForm/ContactForm';

//redux
import { connect } from 'react-redux';


class Checkout extends Component {

  backViev = () => {
    this.props.history.goBack();
  }

  goForm = () => {
    this.props.history.replace('/check-before-buy/go-form')
  }

  render() {
    const ingredientsList = Object.keys(this.props.ramen)
      .map(item => {
        if (this.props.ramen[item] === 0) { //preventing from display 0 value
          return false
        } else {
          return (
            <li
              className={classes.LiItem} key={item}>{item} : <span className={classes.SpanItem}>{this.props.ramen[item]}</span>
            </li>
          )
        };
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
          component={ContactForm} />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ramen: state.ramen,
    totalPrice: state.totalPrice.price
  }
}
/*
const mapDispatchToProps = dispatch => {
  return {
    //  addCountHandler: (e) =>
    //  dispatch({ type: actionTypes.ADD, value: 1, typeOfIngredient: e }),
  }
}
*/
export default connect(mapStateToProps)(Checkout);