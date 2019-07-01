import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/Spinner/Spinner';
import classes from './MyOrders.css';
import ErrorMessage from '../../components/ErrorLoadingMessage/ErrorMessage';

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators'


class MyOrders extends Component {

  componentDidMount() {
    this.props.getOrderCards(this.props.token, this.props.userId)
  }

  render() {
    let orderCard;
    orderCard = <Spinner />

    if (this.props.cardsData && Object.keys(this.props.cardsData).length) {
      const fetchingData = [];
      for (let key in this.props.cardsData) {
        fetchingData.push({
          ...this.props.cardsData[key],
          id: key
        });
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

    if (this.props.errorOrderCards) {
      orderCard = <ErrorMessage withBorder />
    }

    if (this.props.cardsData) {
      if (!Object.keys(this.props.cardsData).length) {
        orderCard = (
          <div className={classes.EmptyOrderCard}>
            <p>There is no orders yet. <br /> <br /> Go to the Homepage for create your favorite ramen!</p>
          </div>
        )
      }
    }


    return (
      <div>
        {orderCard}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cardsData: state.orderData.cardsData,
    errorOrderCards: state.orderData.errorOrderCards,
    token: state.authData.token,
    userId: state.authData.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderCards: (token, userId) =>
      dispatch(actionCreators.axiosGetOrderCards(token, userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);