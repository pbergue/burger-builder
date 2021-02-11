import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let burgerIngredients = Object.keys(props.ingredients)
        .map( igType => {
          return [...Array(props.ingredients[igType])].map( (x, i) => {
            return <BurgerIngredient key={igType + i} type={igType} />;
          });
        })
        .reduce( (arr, el) => {
          return arr.concat(el)
        }, []);

  if (burgerIngredients.length === 0) {
    burgerIngredients = <p>Please add ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {burgerIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;
