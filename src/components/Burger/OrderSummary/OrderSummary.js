import React from 'react';

// import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

import classes from './OrderSummary.module.css';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
        .map( ing => {
          return (
            <li key={ing}>
              {ing.toUpperCase()} x{props.ingredients[ing]}
            </li>
          )
        });
  return (
    <div className={classes.OrderSummary}>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <h4>Total price {props.price.toFixed(2)}$</h4>
      <p>Proceed to checkout?</p>
      <Button classType='Danger' clicked={props.cancel}>CANCEL</Button>
      <Button classType='Success' clicked={props.continue}>CONTINUE</Button>
    </div>
  )
};

export default orderSummary;
