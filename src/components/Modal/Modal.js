import React, { Component } from 'react';
import classes from './Modal.css'
import BackDrop from '../BackDrop/BackDrop'
import Aux from '../../hoc/auxiliary'

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.show !== this.props.show) // || (nextProps.children !== this.props.children)

  }

  componentWillUpdate() {
    console.log('modal will update');
  }


  render() {
    const modalAnimation = {
      transform: this.props.show ? 'translate(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
    }
    return (
      <Aux>
        <BackDrop show={this.props.show} clickedBackDrop={this.props.clickedBackDrop} />
        <div className={classes.Modal} style={modalAnimation}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal;