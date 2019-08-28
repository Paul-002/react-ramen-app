import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/Spinner/Spinner';
import classes from './MyOrders.css';
import ErrorMessage from '../../components/ErrorLoadingMessage/ErrorMessage';
import * as actionCreators from '../../store/actions/actionCreators';


class MyOrders extends Component {
  componentDidMount() {
    const { token, userId, getOrderCards } = this.props;
    getOrderCards(token, userId);
  }

  render() {
    const { cardsData, errorOrderCards } = this.props;
    let orderCard;
    orderCard = <Spinner />;

    if (cardsData && Object.keys(cardsData).length) {
      const fetchingData = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const key in cardsData) {
        if (cardsData) {
          fetchingData.push({
            ...cardsData[key],
            id: key,
          });
        }
      }

      orderCard = (
        <div className={classes.OrdersCardContainer}>
          {fetchingData.map(order => (
            <Order
              name={order.contactInfo.name}
              surname={order.contactInfo.surname}
              email={order.contactInfo.email}
              street={order.contactInfo.street}
              city={order.contactInfo.city}
              payment={order.contactInfo.cardPayment}
              totalPrice={order.totalPrice}
              ingredients={order.ingredients}
              key={order.id}
            />
          ))}
        </div>
      );
    }

    if (errorOrderCards) {
      orderCard = <ErrorMessage withBorder />;
    }

    if (cardsData) {
      if (!Object.keys(cardsData).length) {
        orderCard = (
          <div className={classes.EmptyOrderCard}>
            <p>
              There are no orders yet.
              <br />
              <br />
              Go to the homepage to create your favorite ramen!
            </p>
          </div>
        );
      }
    }

    return (
      <div>
        {orderCard}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cardsData: state.orderData.cardsData,
  errorOrderCards: state.orderData.errorOrderCards,
  token: state.authData.token,
  userId: state.authData.userId,
});

const mapDispatchToProps = dispatch => ({
  getOrderCards: (token, userId) => dispatch(actionCreators.axiosGetOrderCards(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
