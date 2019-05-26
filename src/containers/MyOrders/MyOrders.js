import React, { Component } from 'react';
import axios from '../../axiosInstance'
import Order from '../../components/Order/Order';
import Spinner from '../../components/Spinner/Spinner';
import classes from './MyOrders.css';

class MyOrders extends Component {
  state = {
    myOrders: [],
    loading: true,
    emptyOrder: false
  }

  componentDidMount() {
    axios.get('/order.json')
      .then(response => {
        if (response.data === "order") {
          this.setState({ emptyOrder: true })
          return false
        }
        const fetchingData = [];
        for (let key in response.data) {
          fetchingData.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ loading: false, myOrders: fetchingData })
      })
      .catch(error => { alert("There is something with the connection, please back after few minutes...") })
  }
  render() {
    let orderCard;

    if (this.state.myOrders.length) {
      orderCard = (
        <div className={classes.OrdersCardContainer}>
          {this.state.myOrders.map(order => (
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

    if (this.state.loading) {
      orderCard = <Spinner />
    }

    if (this.state.emptyOrder) {
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

export default MyOrders;