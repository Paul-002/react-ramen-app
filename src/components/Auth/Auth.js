/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Buttons/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/actionAuth';
import Spinner from '../Spinner/Spinner';

class Auth extends Component {
  state = {
    inputPattern: {
      email: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'email',
          placeholder: 'Email',
        },
        inputLabel: {
          label: '',
        },
        validation: {
          isRequired: true,
          valid: false,
          touch: false,
        },
      },

      password: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'password',
          placeholder: 'Password',
        },
        inputLabel: {
          label: '',
        },
        validation: {
          isRequired: true,
          valid: false,
          touch: false,
          minLength: 6,
        },
      },
    },
    readyToSubmit: false,
    signUp: true,
  }

  componentDidMount() {
    const { pickedIngredient, authRedirect, setAuthRedirect } = this.props;

    if (!pickedIngredient && authRedirect !== '/') {
      setAuthRedirect();
    }
  }

  bindButton = () => {
    this.setState(prevState => ({
      signUp: !prevState.signUp,
    }));
  }

  submitButton = (evt) => {
    const { signUp, inputPattern } = this.state;

    evt.preventDefault();
    const signInOrSignUp = signUp;
    const inputValues = {};

    for (const key in inputPattern) {
      inputValues[key] = inputPattern[key].value;
    }

    this.props.onAuth(inputValues, signInOrSignUp);
  }

  onChangeHandler = (evt, objName) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const stateObjCopy = JSON.parse(JSON.stringify(this.state.inputPattern)); // obj deep clone
    let readyToSubmit = true;

    stateObjCopy[objName].value = evt.target.value;
    stateObjCopy[objName].validation.valid = this.checkForValidity(
      stateObjCopy[objName].value,
      stateObjCopy[objName].validation.isRequired,
      objName,
    );
    stateObjCopy[objName].validation.touch = true;

    for (const objNames in stateObjCopy) {
      readyToSubmit = stateObjCopy[objNames].validation.valid && readyToSubmit;
    }

    this.setState({
      inputPattern: stateObjCopy, readyToSubmit,
    });
  }

  checkForValidity(value, required, id) {
    let isValid = false;

    if (!required) {
      isValid = true;
    }

    switch (id) {
      case 'email':
        isValid = value.length >= 2 && value.trim() !== '' && /\S+@\S+\.\S+/.test(value);
        break;

      case 'password':
        isValid = value.length >= 6 && value.trim() !== '';
        break;

      default:
        alert('something wrong');
    }
    return isValid;
  }

  render() {
    // destructuring obj
    const { inputPattern, signUp } = this.state;
    const {
      loading, error, error: { message }, isAuth, authRedirect,
    } = this.props;

    const configArray = [];

    for (const key in inputPattern) {
      configArray.push({
        id: key,
        value: inputPattern[key].value,
        config: inputPattern[key].inputSettings,
        inputLabel: inputPattern[key].inputLabel,
        validation: inputPattern[key].validation,
      });
    }

    let form = configArray.map(input => (
      <Input
        key={input.id}
        inputtype={input.config.inputType}
        type={input.config.type}
        placeholder={input.config.placeholder}
        value={input.value}
        label={input.inputLabel.label}
        valid={!input.validation.valid}
        touch={input.validation.touch}
        change={evt => this.onChangeHandler(evt, input.id)}
      />
    ));

    if (loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (error) {
      errorMessage = <p className={classes.SignInOrUpMessage}>{message}</p>;
    }

    let logInRedirect = null;
    if (isAuth) {
      logInRedirect = <Redirect to={authRedirect} />;
    }

    return (
      <div className={classes.FormContainer}>
        {logInRedirect}
        <div className={classes.SignInOrUpContainer}>
          <div className={classes.SignInOrUpMessage}><b>{signUp ? 'Sign up' : 'Sign in'}</b></div>
          <Button
            clicked={this.bindButton}
            btn="Swich"
            customStyle="CustomSwich"
          >
            &#8646; Swich
          </Button>
        </div>
        {errorMessage}
        <form className={classes.Auth}>
          {form}
          <div className={classes.ButtonContainer}>
            <Button
              clicked={this.submitButton}
              btn="SubmitButton"
            >
              {signUp ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.authData.loading,
  error: state.authData.error,
  isAuth: state.authData.token !== null,
  authRedirect: state.authData.authRedirect,
  pickedIngredient: state.ramenData.pick,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (inputValues, signInOrSignUp) => dispatch(actions.auth(inputValues, signInOrSignUp)),
  setAuthRedirect: () => dispatch(actions.redirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
