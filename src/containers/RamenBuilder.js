import React, { Component } from "react";
import Aux from "../hoc/auxiliary";
import classes from './RamenBuilder.css';
import ButtonsSection from "./ButtonsSection";
import TotalCost from '../components/TotalCost/TotalCost';
import SubmitButton from '../components/Buttons/SubmitButton';
import Modal from '../components/Modal/Modal';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from '../components/ErrorLoadingMessage/ErrorMessage';
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
  };

  componentDidMount() {
    this.props.axiosGetIngredientsHandler()
  }

  changeModalVievAndClearResponse = () => {
    !this.props.isAuth
      ? this.props.history.push('/sign')
      : this.setState({ showModal: true })
  }

  changeBackDropViev = () => { this.setState({ showModal: false }) }

  orderTheRamen = () => {
    this.setState({ showModal: false })
    this.props.history.push({
      pathname: '/check-before-buy',
    })
  }

  render() {
    let order = null;
    let buttonSection = <Spinner />;

    if (this.props.error) {
      buttonSection = <ErrorMessage />
    }

    if (this.props.ramen) {
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

      buttonSection =
        <Aux>
          <div className={classes.TotalCostContainer}>
            <TotalCost totalPrice={this.props.totalPrice} />
          </div>
          <ButtonsSection
            addCount={(e) => { this.props.addCountHandler(e); this.props.addTotalPriceHandler(e) }}
            removeCount={(e) => { this.props.subCountHandler(e); this.props.subTotalPriceHandler(e) }}
            count={this.props.ramen}
            disabled={disabledButton}
          />
          <SubmitButton
            disabled={disabledSubmitButton}
            showModal={this.changeModalVievAndClearResponse} //props hildren to component?
            onlyForUsers={this.props.isAuth}
          />
        </Aux>

      order =
        <OrderSummary
          ingredientsList={this.props.ramen}
          hideTheModal={this.changeBackDropViev}
          orderTheRamen={this.orderTheRamen}
          totalPrice={this.props.totalPrice}
        />
    }

    return (
      <Aux>
        <Modal
          show={this.state.showModal}
          clickedBackDrop={this.changeBackDropViev} >
          {order}
        </Modal>
        {buttonSection}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ramen: state.ramenData.ramen,
    totalPrice: state.ramenData.totalPrice,
    error: state.ramenData.error,
    isAuth: state.authData.token !== null
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

    axiosGetIngredientsHandler: () =>
      dispatch(actionCreators.axiosGetIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RamenBuilder)