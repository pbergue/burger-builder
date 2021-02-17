import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, burgerAPI) => {
  return (
    class extends Component {
      constructor(props){
        super(props);
        this.state = {
          error: null
        }

        this.reqInt = burgerAPI.interceptors.request.use(req => {
          this.setState({error: null})
          return req;
        });

        this.resInt = burgerAPI.interceptors.response.use(
          res => res,
          error => {
            console.log(error);
            this.setState({error: error});
          }
        );
      }

      componentWillUnmount(){
        burgerAPI.interceptors.request.reject(this.reqInt);
        burgerAPI.interceptors.response.reject(this.resInt);
      }


      clearErrorHandler = () => {
        this.setState({error: null});
      }

      render(){
        return (
          <Aux>
            <Modal purchasing={this.state.error} exitModal={this.clearErrorHandler}>{this.state.error ? this.state.error.message : null}</Modal>
            <WrappedComponent {...this.props} />
          </Aux>
        );
      }
    }
  );
};

export default withErrorHandler;
