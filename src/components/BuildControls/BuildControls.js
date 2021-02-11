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
              more={props.moreIng}
              less={props.lessIng}
          />;
        });
  return (
    <div className={classes.BuildControls}>
      {ingredientControls}
    </div>
  );
};

export default buildControls;
