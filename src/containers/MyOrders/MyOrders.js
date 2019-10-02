import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import Spinner from "../../components/Spinner/Spinner";
import classes from "./MyOrders.css";
import ErrorMessage from "../../components/ErrorLoadingMessage/ErrorMessage";
import * as actionCreators from "../../store/actions/actionCreators";

class MyOrders extends Component {
  componentDidMount() {
    const { token, userId, getOrderCards } = this.props;
    getOrderCards(token, userId);
  }

  render() {
    const { token, cardsData, errorOrderCards } = this.props;

    const convertToArrObjAndSort = (data) => {
      const fetchedData = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const key in data) {
        if (data) {
          fetchedData.push({
            ...data[key],
            id: key
          });
        }
      }
      fetchedData.sort((a, b) => b.orderDate - a.orderDate);
      return fetchedData;
    }

    let orderCard;
    orderCard = <Spinner />

    if (cardsData && Object.keys(cardsData).length) {
      orderCard = (
        <div className={classes.OrdersCardContainer}>
          {convertToArrObjAndSort(cardsData).map((order, index) => (
            <Order
              {...order}
              key={order.id}
              index={index}
              token={token}
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
          <div className={classes.AlignCenter}>
            <div className={classes.EmptyOrderCard}>
              <p>
                There are no orders yet.
              <br />
                <br />
                Go to the homepage to create your favorite ramen!
            </p>
            </div>
          </div>
        );
      }
    }
    return <div>{orderCard}</div>;
  }
}

const mapStateToProps = state => ({
  cardsData: state.orderData.cardsData,
  errorOrderCards: state.orderData.errorOrderCards,
  token: state.authData.token,
  userId: state.authData.userId
});

const mapDispatchToProps = dispatch => ({
  getOrderCards: (token, userId) =>
    dispatch(actionCreators.axiosGetOrderCards(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);
