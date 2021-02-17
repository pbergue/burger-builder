import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.purchasing !== this.props.purchasing;
  }

  render() {
    return (
      <Auxiliary>
        <Backdrop show={this.props.purchasing} exit={this.props.exitModal}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.purchasing ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Auxiliary>
    );
  }
};

export default Modal;
