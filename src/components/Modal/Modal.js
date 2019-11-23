import React, { Component } from 'react';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../hoc/auxiliary';
import ModalAnimation from './ModalAnimation.css';
import CSSTransition from 'react-transition-group/CSSTransition';

class Modal extends Component {
  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProps, nextState) {
    // eslint-disable-next-line react/destructuring-assignment
    return nextProps.show !== this.props.show; // || (nextProps.children !== this.props.children)
  }

  render() {
    const { show, clickedBackDrop, children } = this.props;
    const animationTiming = {
      enter: 300,
      exit: 300,
    };

    return (
      <>
        <CSSTransition
          classNames={ModalAnimation}
          in={show}
          timeout={animationTiming}
          mountOnEnter
          unmountOnExit
        >
          <div className={classes.Modal}>{children}</div>
        </CSSTransition>
        <BackDrop show={show} clickedBackDrop={clickedBackDrop} />
      </>
    );
  }
}

export default Modal;
