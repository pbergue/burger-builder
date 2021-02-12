import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = props => {
  const ingredientControls = Object.keys(props.ingredients)
        .map( control => {
          return <BuildControl
              key={control}
              type={control}
              label={control.toUpperCase()}
              more={() => props.moreIng(control)}
              less={() => props.lessIng(control)}
              disabled={props.disabled[control]}
          />;
        });
  return (
    <div className={classes.BuildControls}>
      <h2 className={classes.Price}>{props.price.toFixed(2)}$</h2>
      {ingredientControls}
      <button
        className={classes.OrderButton}
        disabled={props.purchasable}
        onClick={props.clicked}>ORDER</button>
    </div>
  );
};

export default buildControls;
