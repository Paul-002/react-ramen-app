import React, { useState } from 'react';
import classes from './Order.css';
import Modal from '../Modal/Modal';
import Aux from '../../hoc/auxiliary';
import Button from '../Buttons/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

const order = props => {
  const {
    contactInfo: { name, surname, email, street, city, cardPayment },
    totalPrice,
    ingredients,
    id,
    userId,
    token,
    orderDate,
    index,
    deleteOrder,
  } = props;

  const [showModalView, setModalView] = useState(false);
  const [createModalForCard, setCreate] = useState(false);
  const [currentOrderId, setOrderId] = useState(null);

  const modalControlHandler = orderId => {
    setCreate(true);
    setModalView(!showModalView);
    setOrderId(orderId);
  };

  const timeLeft = timeInMilis => {
    const timeCheck = Date.now() - timeInMilis;
    if (timeCheck <= 1000 * 3600) {
      const timeLeftToHour = 1000 * 3600 - timeCheck;
      const minutes = Math.floor(timeLeftToHour / (1000 * 60));
      const seconds = ((timeLeftToHour % (1000 * 60)) / 1000).toFixed(0);
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
    return false;
  };

  const deleteOrderHandler = currentOrderId => {
    setModalView(!showModalView);
    deleteOrder(token, currentOrderId, userId);
  };

  const ingredientsList = Object.keys(ingredients).map(item =>
    ingredients[item] ? (
      <li key={item}>
        {item}: <b>{ingredients[item]}</b>
      </li>
    ) : null
  );

  let payment;
  if (cardPayment) {
    payment = 'Yes';
  } else {
    payment = 'No';
  }

  let modalAction;
  if (!createModalForCard) {
    modalAction = null;
  }

  if (createModalForCard) {
    if (timeLeft(orderDate)) {
      modalAction = (
        <>
          <div className={classes.ModalMessage}>
            <h2>Your order is being processed...</h2>
            <p>The order will be delivered within one hour.</p>
            <div className={classes.AligningButtons}>
              <p>
                <b>{timeLeft(orderDate)}</b> minutes left...
              </p>
              <Button btn="Back" clicked={() => setModalView(!showModalView)}>
                Back
              </Button>
            </div>
          </div>
        </>
      );
    } else {
      modalAction = (
        <>
          <div className={classes.ModalMessage}>
            <h2>Please confirm...</h2>
            <p>Do you wanna delete the order?</p>
            <div className={classes.AlignRight}>
              <span>
                <Button btn="Back" clicked={() => setModalView(!showModalView)}>
                  Back
                </Button>
              </span>
              <Button
                btn="Continue"
                clicked={() => deleteOrderHandler(currentOrderId)}
              >
                Yes, delete
              </Button>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <Aux>
      <Modal
        show={showModalView}
        clickedBackDrop={() => setModalView(!showModalView)}
      >
        {modalAction}
      </Modal>
      <div
        className={`
          ${classes.OrderCard}
          ${
            Date.now() - orderDate <= 1000 * 3600
              ? classes.OrderBlue
              : classes.OrderGreen
          }
          `}
      >
        <div
          className={classes.DeleteOrderButton}
          onClick={() => modalControlHandler(id)}
        />
        <div className={classes.OrderCardListNumber}>
          <b>#{index + 1}</b>
        </div>
        <p>
          Name:
          <b>{`${name} ${surname}`}</b>
        </p>
        <p>
          E-mail:
          <b>{email}</b>
        </p>
        <p>
          Street:
          <b>{street}</b>
        </p>
        <p>
          City:
          <b>{city}</b>
        </p>
        <p>
          Card payment:<b>{payment}</b>
        </p>
        <p>
          Total price:
          <b>{`${totalPrice} zł`}</b>
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
  deleteOrder: (token, orderId, userId) =>
    dispatch(actionCreators.axiosDeleteOrder(token, orderId, userId)),
});

export default connect(null, mapDispatchToProps)(order);
