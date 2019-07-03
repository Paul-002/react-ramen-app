import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Aux from './auxiliary';

const errorHandler = (WrappedComponent, axios) => class extends Component {
  state = {
    error: null,
  }

  componentWillMount() {
    axios.interceptors.request.use((req) => {
      this.setState({ error: null });
      return req;
    });

    axios.interceptors.response.use(res => res, (error) => {
      this.setState({ error });
    });
  }

  errorConfirmedHandler = () => {
    this.setState({ error: null });
  }

  render() {
    const { error, error: { message } } = this.state;

    return (
      <Aux>
        <Modal
          show={error}
          clickedBackDrop={this.errorConfirmedHandler}
        >
          {error ? message : null}
        </Modal>
        <WrappedComponent {...this.props} />
      </Aux>
    );
  }
};
export default errorHandler;
