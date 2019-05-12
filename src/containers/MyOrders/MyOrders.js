import React, { Component } from 'react';
import axios from '../../axiosInstance'
import Order from '../../components/Order/Order';
import Spinner from '../../components/Spinner/Spinner';
import classes from './MyOrders.css';

class MyOrders extends Component {
  state = {
    myOrders: [],
    loading: true
  }

  componentDidMount() {

    axios.get('/order.json')
      .then(response => {
        const fetchingData = [];
        for (let key in response.data) {
          fetchingData.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ loading: false, myOrders: fetchingData })
      })
      .catch(error => { alert("Something went wrong. Please back after few minutes...") })
  }
  render() {

    let orderCard = (
      <div className={classes.OrdersCardContainer}>
        {this.state.myOrders.map(order => (
          <Order
            name={order.contactInfo.name}
            surname={order.contactInfo.surname}
            email={order.contactInfo.email}
            street={order.contactInfo.street}
            city={order.contactInfo.city}
            totalPrice={order.totalPrice}
            ingredients={order.ingredients}
            key={order.id}
          />
        ))}
      </div>
    );

    if (this.state.loading) {
      orderCard = <Spinner />
    }

    return (
      <div>
        {orderCard}
      </div>
    );
  }
}

export default MyOrders;