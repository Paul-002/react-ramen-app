import React, { useState } from "react";
import classes from "./Order.css";
import Modal from "../Modal/Modal";
import Aux from "../../hoc/auxiliary";
import Button from "../Buttons/Button";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators";

const order = props => {
  const [modalView, setView] = useState(false);

  const deleteOrderModalHandler = (orderId) => {
    setView(!modalView);
    props.deleteOrder(props.token, orderId);
  };

  const ingredientsList = Object.keys(props.ingredients).map(item =>
    props.ingredients[item] ? (
      <li key={item}>
        {item}: <b>{props.ingredients[item]}</b>
      </li>
    ) : null
  );

  let cardPayment;
  if (props.payment) {
    cardPayment = "Yes";
  } else {
    cardPayment = "No";
  }

  return (
    <Aux>
      <Modal show={modalView} clickedBackDrop={() => setView(!modalView)}>
        <h1>Please confirm...</h1>
        <p>Do you wanna delete the order?</p>
        <Button btn="Back" clicked={() => setView(!modalView)}>
          Back
        </Button>
        <Button btn="Continue" clicked={() => deleteOrderModalHandler(props.orderId)}>
          Yes, I want to delete...
        </Button>
      </Modal>

      <div className={classes.OrderCard}>
        <div
          onClick={() => setView(!modalView)}
          className={classes.DeleteOrderButton}
        />
        <p>
          Name:
          <b>{`${props.name} ${props.surname}`}</b>
        </p>
        <p>
          E-mail:
          <b>{props.email}</b>
        </p>
        <p>
          Street:
          <b>{props.street}</b>
        </p>
        <p>
          City:
          <b>{props.city}</b>
        </p>
        <p>
          Card payment:<b>{cardPayment}</b>
        </p>
        <p>
          Total price:
          <b>{`${props.totalPrice} zł`}</b>
        </p>
        <p>
          Ingredients:
          {ingredientsList}
        </p>
      </div>
    </Aux>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteOrder: (token, orderId) =>
    dispatch(actionCreators.axiosDeleteOrder(token, orderId)),
});

export default connect(null, mapDispatchToProps)(order);
