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
    this.props.getOrderCards(this.props.token)
  }

  render() {
    let orderCard = <Spinner />

    if (this.props.error) {   //!!!post error => true!!!
      orderCard = <ErrorMessage />
    }

    if (this.props.cardsData && this.props.cardsData !== 'order') {
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

    if (this.props.cardsData === 'order') {
      orderCard = (
        <div className={classes.OrdersCardContainer}>
          <div className={classes.EmptyOrderCard}>
            <h1>There is no orders yet :(</h1>
            <h5>Go to the Homepage for create your favorite ramen! </h5>
          </div>
        </div>
      )
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
    error: state.orderData.error,
    token: state.authData.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderCards: (token) =>
      dispatch(actionCreators.axiosGetOrderCards(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);