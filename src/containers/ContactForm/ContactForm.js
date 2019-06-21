import React, { Component } from 'react';
import classes from './ContactForm.css'
import Button from '../../components/Buttons/Button';
import Spinner from '../../components/Spinner/Spinner';
import Input from '../../components/Input/Input';

//redux
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/actionCreators'

class ContactForm extends Component {
  state = {
    inputPattern: {
      name: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'text',
          placeholder: 'Name'
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

      surname: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'text',
          placeholder: 'Surname'
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

      email: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'text',
          placeholder: 'E-mail'
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

      street: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'text',
          placeholder: 'Street'
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

      city: {
        value: '',
        inputSettings: {
          inputType: 'input',
          type: 'text',
          placeholder: 'City'
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

      cardPayment: {
        value: false,
        inputSettings: {
          inputType: 'checkbox',
          type: 'checkbox',
        },
        inputLabel: {
          label: 'Card payment'
        },
        validation: {
          isRequired: false,
          valid: true,
          touch: false
        }
      },
    },
    readyToSubmit: false // state validation
  }

  submitButton = (evt) => {
    evt.preventDefault();
    this.props.changeLoadingVal();
    const stateValues = {};

    for (let key in this.state.inputPattern) {
      stateValues[key] = this.state.inputPattern[key].value
    }

    let contact = {
      ingredients: this.props.ramen,
      totalPrice: this.props.totalPrice,
      contactInfo: stateValues
    }

    this.props.axiosPostOrderHandler(contact);
  }
  /* first solution for complex inputs
  
    checkForValidity(value, required, id) {
      let isValid = false;
  
      if (!required) {
        return isValid = true;
      }
  
      let whitespaces = value.trim() !== '';
      let minLength = value.length >= 2
  
      switch (id) {
        case 'name':
          isValid = whitespaces && minLength
          break;
        case 'surname':
          isValid = whitespaces && minLength
          break;
  
        case 'email':
          isValid = /\S+@\S+\.\S+/.test(value)
          break;
  
        case 'Street':
          isValid = whitespaces && minLength
          break;
  
        case 'City':
          isValid = whitespaces && minLength
          break;
  
        default:
        alert('something wrong');
      }
      return isValid;
    }
    */

  checkForValidity(value, required, id) {
    let isValid = false;

    if (!required) {
      return isValid = true;
    }

    id === 'email' ? isValid = /\S+@\S+\.\S+/.test(value) : isValid = value.trim() !== '' && value.length >= 2
    return isValid
  }

  onChangeHandler = (evt, objName) => {
    let stateObjCopy = JSON.parse(JSON.stringify(this.state.inputPattern)); //obj deep clone
    let readyToSubmit = true;

    stateObjCopy[objName].value = evt.target.value;
    stateObjCopy[objName].validation.valid = this.checkForValidity(stateObjCopy[objName].value, stateObjCopy[objName].validation.isRequired, objName)
    stateObjCopy[objName].validation.touch = true;

    for (let objNames in stateObjCopy) {
      readyToSubmit = stateObjCopy[objNames].validation.valid && readyToSubmit;
    }

    if (objName === 'cardPayment') {
      stateObjCopy[objName].value = evt.target.checked
    }

    this.setState({
      inputPattern: stateObjCopy, readyToSubmit: readyToSubmit
    })
  }

  render() {
    let message = <h4 className={classes.FormHeader}>Please enter your details...</h4>;
    let configArray = [];

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
        placeholder={input.config.placeholder}
        value={input.value}
        label={input.inputLabel.label}
        valid={!input.validation.valid}
        touch={input.validation.touch}
        change={(evt) => this.onChangeHandler(evt, input.id)}>
      </Input>
    ))

    let subButton =
      <Button clicked={this.submitButton} disabled={!this.state.readyToSubmit} btn='SubmitButton'>
        Order now!
      </Button>

    if (this.props.loading) {
      form = <Spinner />
      message = <div style={{ display: 'none' }}> </div>
      subButton = ''
    }

    return (
      <div className={classes.FormContainer}>
        {message}
        <form className={classes.Form}>
          {form}
          {subButton}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ramen: state.ramenData.ramen,
    totalPrice: state.ramenData.totalPrice,
    error: state.orderData.error,
    loading: state.orderData.loading,
    response: state.orderData.response
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    axiosPostOrderHandler: (contact) => {
      dispatch(actionCreators.axiosPostOrder(contact))
    },

    changeLoadingVal: () =>
      dispatch(actionCreators.changeLoadingVal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
