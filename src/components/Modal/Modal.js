import React, { Component } from 'react';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../hoc/auxiliary';

class Modal extends Component {
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState) {
    // eslint-disable-next-line react/destructuring-assignment
    return (nextProps.show !== this.props.show); // || (nextProps.children !== this.props.children)
  }

  componentWillUpdate() {
    console.log('modal will update');
  }

  render() {
    const { show, clickedBackDrop, children } = this.props;
    const modalAnimation = {
      transform: show ? 'translateX(0)' : 'translateY(-100vh)',
      opacity: show ? '1' : '0',
    };

    return (
      <Aux>
        <BackDrop show={show} clickedBackDrop={clickedBackDrop} />
        <div className={classes.Modal} style={modalAnimation}>
          {children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
