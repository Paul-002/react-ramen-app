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
import axios from '../axiosInstance.js'
import Spinner from "../components/Spinner/Spinner";
import errorHandler from "../hoc/errorHandler";

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
    ramen: {
      chicken: 0,
      duck: 0,
      pork: 0,
      wakame: 0,
      egg: 0,
      onion: 0,
      mun: 0,
      shiitake: 0,
      reishi: 0
    },
    totalPrice: 4,
    showModal: false,
    spinner: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    // axios.get('https://react-builder-9c971.firebaseio.com/ramen.json')
    //   .then(response => { this.setState({ ramen: response.data }) }).catch(error => { this.setState({ error: true }) })
    // this.props.history.push('/check-before-buy')

  }

  addCountHandler = e => {
    const oldCount = this.state.ramen[e];
    const updatedIngredients = {
      ...this.state.ramen
    };
    updatedIngredients[e] = oldCount + 1;
    this.setState({ ramen: updatedIngredients });

    const priceAdd = this.state.totalPrice + RAMEN_PRICES[e];
    this.setState({ totalPrice: priceAdd })
  };

  removeCountHandler = e => {
    const oldCount = this.state.ramen[e];
    if (oldCount <= 0) {
      return
    };
    const updatedIngredients = {
      ...this.state.ramen
    };
    updatedIngredients[e] = oldCount - 1;
    this.setState({ ramen: updatedIngredients });

    const priceSubtract = (this.state.totalPrice) - RAMEN_PRICES[e];
    this.setState({ totalPrice: priceSubtract })
  };

  changeModalViev = () => {
    this.setState({ showModal: true });
  }

  changeBackDropViev = () => {
    this.setState({ showModal: false });
  }

  orderTheRamen = () => {
    this.setState({ showModal: false })
    const stateValues = [];
    const copyOfState = {
      ...this.state.ramen
    }

    for (let i in copyOfState) {
      if (copyOfState[i]) {
        stateValues.push(encodeURI(i) + '=' + encodeURI(this.state.ramen[i]))
      }
    }
    stateValues.push('price=' + this.state.totalPrice.toFixed(2));

    const stateString = stateValues.join('&');
    this.props.history.push({
      pathname: '/check-before-buy',
      search: '?' + stateString
    })
  }

  render() {
    const checkArray = [];
    const disabledButton = {
      ...this.state.ramen
    };

    for (let key in disabledButton) {
      checkArray.push(disabledButton[key])
      disabledButton[key] = {
        addButton: disabledButton[key] >= 3,
        subButton: disabledButton[key] <= 0,
      }
    }

    const disabledSubmitButton = checkArray.every(val => val === 0);

    let order = null;
    let buttonSection = this.state.error ? <p> Oops... Somethig went wrong... :/</p> : <Spinner />; // when axios reaching ingredients from the server 

    if (this.state.ramen) {
      buttonSection =
        <Aux>
          <div className={classes.TotalCostContainer}>
            <TotalCost totalPrice={this.state.totalPrice}></TotalCost>
          </div>
          <ButtonsSection
            addCount={this.addCountHandler}
            removeCount={this.removeCountHandler}
            count={this.state.ramen}
            disabled={disabledButton}
          />
          <SubmitButton disabled={disabledSubmitButton} showModal={this.changeModalViev} />
        </Aux>

      order =
        <OrderSummary
          ingredientsList={this.state.ramen}
          hideTheModal={this.changeBackDropViev}
          orderTheRamen={this.orderTheRamen}
          totalPrice={this.state.totalPrice}
        />
    }

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

export default errorHandler(RamenBuilder, axios);