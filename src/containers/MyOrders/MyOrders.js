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
        console.log(response);
        const fetchingData = [];
        for (let key in response.data) {
          fetchingData.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ loading: false, myOrders: fetchingData })
      })
      .catch(error => { alert(error) })
  }
  render() {

    let orderCard = (
      <div className={classes.OrdersCardContainer}>
        {this.state.myOrders.map(order => (
          <Order
            city={order.contactInfo.city}
            street={order.contactInfo.street}
            email={order.contactInfo.email}
            key={order.id}
            name={order.contactInfo.name}
            surname={order.contactInfo.surname}
            totalPrice={order.totalPrice}
            ingredients={order.ingredients}
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