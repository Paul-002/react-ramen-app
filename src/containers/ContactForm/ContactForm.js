import React, { Component } from 'react';
import classes from './ContactForm.css'
import Button from '../../components/Buttons/Button';
import axios from '../../axiosInstance'
import Spinner from '../../components/Spinner/Spinner';
import Input from '../../components/Input/Input';

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

      contactlessPayment: {
        value: 'false',
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
    readyToSubmit: false,
    loading: false
  }

  submitButton = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    let stateValues = {};

    for (let key in this.state.inputPattern) {
      stateValues[key] = this.state.inputPattern[key].value
    }

    let contact = {
      ingredients: this.props.checkoutState,
      totalPrice: this.props.totalPrice,
      contactInfo: stateValues
    }

    axios.post('/order.json', contact)
      .then(response => {
        this.setState({ loading: false })
        this.props.history.push('/')
      });
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

  onChangeHandler = (event, objName) => {
    let stateObjCopy = JSON.parse(JSON.stringify(this.state.inputPattern));

    stateObjCopy[objName].value = event.target.value;
    stateObjCopy[objName].validation.valid = this.checkForValidity(stateObjCopy[objName].value, stateObjCopy[objName].validation.isRequired, objName)
    stateObjCopy[objName].validation.touch = true;

    let readyToSubmit = true;
    for (let objNames in stateObjCopy) {
      readyToSubmit = stateObjCopy[objNames].validation.valid && readyToSubmit;
    }

    //  console.log(stateObjCopy[objName].validation.valid);  do sprawdzenia czy zmienia sie na true lub false
    console.log(this.state.readyToSubmit)
    this.setState({
      inputPattern: stateObjCopy, readyToSubmit: readyToSubmit
    })
  }

  render() {
    let message = 'Please enter your details...'
    let configArray = [];

    for (let key in this.state.inputPattern) {      //to trzeba poprawić! wysłać obiekt a nie właściwości
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
        change={(event) => this.onChangeHandler(event, input.id)}>
      </Input>
    ))

    if (this.state.loading) {
      form = <Spinner />
      message = 'Order sent, check yours orders in "My orders"'
    }

    return (
      <div className={classes.FormContainer}>
        <h4 className={classes.FormHeader}>{message}</h4>
        <form className={classes.Form}>
          {form}
          <Button clicked={this.submitButton} disabled={!this.state.readyToSubmit} btn='SubmitButton'>Order now!</Button>
        </form >
      </div>
    );
  }
}

export default ContactForm;
