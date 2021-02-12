import React from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';


const modal = props => {
  return (
    <Auxiliary>
      <Backdrop show={props.purchasing} exit={props.exitModal}/>
      <div
        className={classes.Modal}
        style={{
          transform: props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.purchasing ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Auxiliary>
  );
};

export default modal;
