import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./Checkout.css";
import Button from "../../components/Buttons/Button";
import Aux from "../../hoc/auxiliary";
import ContactForm from "../ContactForm/ContactForm";

// redux
import * as actionCreators from "../../store/actions/actionCreators";

class Checkout extends Component {
  // eslint-disable-next-line react/destructuring-assignment
  backView = () => {
    this.props.history.goBack();
  };

  // eslint-disable-next-line react/destructuring-assignment
  goForm = () => {
    this.props.history.replace("/check-before-buy/go-form");
  };

  render() {
    const {
      ramen,
      response,
      clearStatus,
      match: { path }
    } = this.props;

    let ingredientsList = <Redirect to="/" />;

    if (ramen) {
      ingredientsList = Object.keys(ramen).map(item => {
        if (ramen[item] === 0) {
          return false;
        }
        return (
          <li className={classes.LiItem} key={item}>
            <span>{`${item}: ${ramen[item]}`}</span>
          </li>
        );
      });
    }

    if (response) {
      clearStatus();
      ingredientsList = <Redirect to="/" />;
    }

    return (
      <Aux>
        <div className={classes.CheckoutContainer}>
          <div className={classes.ContentContainer}>
            <div className={classes.TextContainer}>
              <h2>Great! :)</h2>
              <h2>Only one step to order your favourite ramen!</h2>
              <h5>
                Please check the ingredients below and press confirm button to
                show contact form.
              </h5>
              <div className={classes.ArrowContainer}>
                <span className={classes.Arrow} />
              </div>
            </div>
            <div className={classes.IngredientsList}>{ingredientsList}</div>
          </div>
        </div>
        <div className={classes.ButtonsContainer}>
          <p>
            <Button clicked={this.backView} btn="Back">
              Back to homepage
            </Button>
          </p>
          <p>
            <Button clicked={this.goForm} btn="Continue">
              Show me form!
            </Button>
          </p>
        </div>
        <Route path={`${path}/go-form`} component={ContactForm} />
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ramen: state.ramenData.ramen,
  response: state.orderData.response
});

const mapDispatchToProps = dispatch => ({
  clearStatus: () => dispatch(actionCreators.clearResponseStatus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
