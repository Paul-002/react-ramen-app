import React, { Component } from "react";
// import NavBar from "../components/NavBar/NavBar";
import Aux from "../hoc/auxiliary";
import classes from './RamenBuilder.css';
import ButtonsSection from "./ButtonsSection";
import TotalCost from '../components/TotalCost/TotalCost'
import SubmitButton from '../components/Buttons/SubmitButton'
import Modal from '../components/Modal/Modal'
import OrderSummary from '../components/OrderSummary/OrderSummary'
//import Layout from '../hoc/Layout/Layout'
//import axios from '../axiosInstance.js'
import Spinner from "../components/Spinner/Spinner";
//import errorHandler from "../hoc/errorHandler";

//redux
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

const RAMEN_PRICES = {
  chicken: 5,
  duck: 4,
  pork: 3.2,
  wakame: 2,
  egg: 1.5,
  onion: 1,
  mun: 3.7,
  shiitake: 3,
  reishi: 3.3
}

class RamenBuilder extends Component {
  state = {
    showModal: false,
    spinner: false,
    error: false,
  };

  componentDidMount() {
    // console.log(this.props);
    // axios.get('https://react-builder-9c971.firebaseio.com/ramen.json')
    //   .then(response => { this.setState({ ramen: response.data }) }).catch(error => { this.setState({ error: true }) })
    // this.props.history.push('/check-before-buy')

  }

  changeModalViev = () => {
    this.setState({ showModal: true });
  }

  changeBackDropViev = () => {
    this.setState({ showModal: false });
  }

  orderTheRamen = () => {
    this.setState({ showModal: false })

    this.props.history.push({
      pathname: '/check-before-buy',
    })
  }

  render() {
    const checkArray = [];
    const disabledButton = {
      ...this.props.ramen
    };

    for (let key in disabledButton) {
      checkArray.push(disabledButton[key])
      disabledButton[key] = {
        subButton: disabledButton[key] === 0, // initial prevent 
        addButton: disabledButton[key] >= 3,
      }
    }

    const disabledSubmitButton = checkArray.every(val => val === 0);

    let order = null;
    let buttonSection = this.state.error ? <p> Oops... Somethig went wrong... :/</p> : <Spinner />; // when axios reaching ingredients from the server 

    // if (this.state.ramen) { //get method from axios
    buttonSection =
      <Aux>
        <div className={classes.TotalCostContainer}>
          <TotalCost totalPrice={this.props.totalPrice}></TotalCost>
        </div>
        <ButtonsSection
          addCount={(e) => { this.props.addCountHandler(e); this.props.addTotalPriceHandler(e) }}
          removeCount={(e) => { this.props.subCountHandler(e); this.props.subTotalPriceHandler(e) }}
          count={this.props.ramen}
          disabled={disabledButton}
        />
        <SubmitButton disabled={disabledSubmitButton} showModal={this.changeModalViev} />
      </Aux>

    order =
      <OrderSummary
        ingredientsList={this.props.ramen}
        hideTheModal={this.changeBackDropViev}
        orderTheRamen={this.orderTheRamen}
        totalPrice={this.props.totalPrice}
      />
    //  }

    if (this.state.spinner) {
      order = <Spinner>Loading...</Spinner>
    };

    return (
      <Aux>
        <Modal
          show={this.state.showModal}
          clickedBackDrop={this.changeBackDropViev} >
          {order}
        </Modal>
        {buttonSection}
        {/* 
        <Route path='/home' component={Checkout}></Route>
        <Route path='/compose-your-ramen' component={Checkout}></Route>
        <Route path='/idenify' component={Checkout}></Route>
         */}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ramen: state.ramen,
    totalPrice: state.totalPrice.price
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCountHandler: (evt) =>
      dispatch(actionCreators.add(1, evt)),

    subCountHandler: (evt) =>
      dispatch(actionCreators.sub(1, evt)),

    addTotalPriceHandler: (evt) =>
      dispatch(actionCreators.addTotalPrice(RAMEN_PRICES[evt])),

    subTotalPriceHandler: (evt) =>
      dispatch(actionCreators.subTotalPrice(RAMEN_PRICES[evt])),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RamenBuilder)