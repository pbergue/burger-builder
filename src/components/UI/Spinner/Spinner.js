import React from 'react';
import classes from './Spinner.module.css';

const spinner = props => {
  return (
    <div className={classes['lds-ring']}><div></div><div></div><div></div><div></div></div>
  );
};

export default spinner;
