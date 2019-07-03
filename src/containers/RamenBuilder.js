import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../hoc/auxiliary';
import classes from './RamenBuilder.css';
import ButtonsSection from './ButtonsSection';
import TotalCost from '../components/TotalCost/TotalCost';
import SubmitButton from '../components/Buttons/SubmitButton';
import Modal from '../components/Modal/Modal';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/ErrorLoadingMessage/ErrorMessage';
import * as actionCreators from '../store/actions/actionCreators';
import * as authCreator from '../store/actions/actionAuth';

const RAMEN_PRICES = {
  chicken: 5,
  duck: 4,
  pork: 3.2,
  wakame: 2,
  egg: 1.5,
  onion: 1,
  mun: 3.7,
  shiitake: 3,
  reishi: 3.3,
};

class RamenBuilder extends Component {
  state = {
    showModal: false,
  };

  componentDidMount() {
    const { axiosGetIngredientsHandler } = this.props;
    axiosGetIngredientsHandler();
  }

  changeModalVievAndClearResponse = () => {
    const { isAuth, setRedirectPath, history: { push } } = this.props;

    if (!isAuth) {
      setRedirectPath('/check-before-buy');
      push('/sign');
    } else {
      this.setState({ showModal: true });
    }
  }

  changeBackDropViev = () => { this.setState({ showModal: false }); }

  orderTheRamen = () => {
    const { history: { push } } = this.props;

    this.setState({ showModal: false });
    push('/check-before-buy');
  }

  render() {
    const {
      errorGetIngredients, ramen, totalPrice, isAuth,
      addCountHandler, addTotalPriceHandler, subCountHandler, subTotalPriceHandler,
    } = this.props;

    let order = null;
    let buttonSection = <Spinner />;

    if (errorGetIngredients) {
      buttonSection = <ErrorMessage withBorder />;
    }

    if (ramen) {
      const checkArray = [];
      const disabledButton = {
        ...ramen,
      };

      // eslint-disable-next-line no-restricted-syntax
      for (const key in disabledButton) {
        if (disabledButton) {
          checkArray.push(disabledButton[key]);
          disabledButton[key] = {
            subButton: disabledButton[key] === 0,
            addButton: disabledButton[key] >= 3,
          };
        }
      }

      const disabledSubmitButton = checkArray.every(val => val === 0);

      buttonSection = (
        <Aux>
          <div className={classes.TotalCostContainer}>
            <TotalCost totalPrice={totalPrice} />
          </div>
          <ButtonsSection
            addCount={(e) => { addCountHandler(e); addTotalPriceHandler(e); }}
            removeCount={(e) => { subCountHandler(e); subTotalPriceHandler(e); }}
            count={ramen}
            disabled={disabledButton}
          />
          <SubmitButton
            disabled={disabledSubmitButton}
            showModal={this.changeModalVievAndClearResponse}
            onlyForUsers={isAuth}
          />
        </Aux>
      );

      order = (
        <OrderSummary
          ingredientsList={ramen}
          hideTheModal={this.changeBackDropViev}
          orderTheRamen={this.orderTheRamen}
          totalPrice={totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          // eslint-disable-next-line react/destructuring-assignment
          show={this.state.showModal}
          clickedBackDrop={this.changeBackDropViev}
        >
          {order}
        </Modal>
        {buttonSection}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ramen: state.ramenData.ramen,
  totalPrice: state.ramenData.totalPrice,
  errorGetIngredients: state.ramenData.errorGetIngredients,
  isAuth: state.authData.token !== null,
});

const mapDispatchToProps = dispatch => ({
  addCountHandler: evt => dispatch(actionCreators.add(1, evt)),
  subCountHandler: evt => dispatch(actionCreators.sub(1, evt)),
  addTotalPriceHandler: evt => dispatch(actionCreators.addTotalPrice(RAMEN_PRICES[evt])),
  subTotalPriceHandler: evt => dispatch(actionCreators.subTotalPrice(RAMEN_PRICES[evt])),
  axiosGetIngredientsHandler: () => dispatch(actionCreators.axiosGetIngredients()),
  setRedirectPath: path => dispatch(authCreator.redirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RamenBuilder);
