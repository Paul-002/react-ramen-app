import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Buttons/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    inputPattern: {
      email: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'email',
          placeholder: 'Email'
        },
        inputLabel: {
          label: ''
        },
        validation: {
          isRequired: true,
          valid: false,
          touch: false
        }
      },

      password: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'password',
          placeholder: 'Password'
        },
        inputLabel: {
          label: ''
        },
        validation: {
          isRequired: true,
          valid: false,
          touch: false,
          minLength: 6
        }
      },
    },
    readyToSubmit: false,
    signUp: true
  }

  submitButton = (evt) => {
    evt.preventDefault();
    const signInOrSignUp = this.state.signUp;
    const inputValues = {};

    for (let key in this.state.inputPattern) {
      inputValues[key] = this.state.inputPattern[key].value
    }

    this.props.onAuth(inputValues, signInOrSignUp);
  }

  checkForValidity(value, required, id) {
    let isValid = false;

    if (!required) {
      return isValid = true;
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

  onChangeHandler = (evt, objName) => {
    const stateObjCopy = JSON.parse(JSON.stringify(this.state.inputPattern)); //obj deep clone
    let readyToSubmit = true;

    stateObjCopy[objName].value = evt.target.value;
    stateObjCopy[objName].validation.valid = this.checkForValidity(stateObjCopy[objName].value, stateObjCopy[objName].validation.isRequired, objName)
    stateObjCopy[objName].validation.touch = true;

    for (let objNames in stateObjCopy) {
      readyToSubmit = stateObjCopy[objNames].validation.valid && readyToSubmit;
    }

    this.setState({
      inputPattern: stateObjCopy, readyToSubmit: readyToSubmit
    })
  }

  bindButton = () => {
    this.setState(prevState => ({
      signUp: !prevState.signUp
    }));
  }

  render() {
    const configArray = [];

    for (let key in this.state.inputPattern) {
      configArray.push({
        id: key,
        value: this.state.inputPattern[key].value,
        config: this.state.inputPattern[key].inputSettings,
        inputLabel: this.state.inputPattern[key].inputLabel,
        validation: this.state.inputPattern[key].validation,
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
        change={(evt) => this.onChangeHandler(evt, input.id)}>
      </Input>
    ))

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.SignInOrUpMessage}>{this.props.error.message}</p>
    }

    let logInRedirect = null;

    logInRedirect = this.props.isAuth ? <Redirect to='/' /> : null;

    return (
      <div className={classes.FormContainer}>
        {logInRedirect}
        <div className={classes.SignInOrUpContainer}>
          <div className={classes.SignInOrUpMessage}><b>{this.state.signUp ? 'Sign up' : 'Sign in'}</b></div>
          <Button
            clicked={this.bindButton} btn='Swich' customStyle='CustomSwich'> &#8646; Swich
          </Button>
        </div>
        {errorMessage}
        <form className={classes.Auth}>
          {form}
          <div className={classes.ButtonContainer}>
            <Button
              clicked={this.submitButton} btn='SubmitButton'>{this.state.signUp ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authData.loading,
    error: state.authData.error,
    isAuth: state.authData.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (inputValues, signInOrSignUp) => dispatch(actions.auth(inputValues, signInOrSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
