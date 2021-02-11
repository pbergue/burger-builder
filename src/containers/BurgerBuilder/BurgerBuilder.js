import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import classes from './BurgerBuilder.module.css';

const ING_PRICES = {
  salad: 0.40,
  meat: 1.30,
  cheese: 0.60,
  bacon: 0.80
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 5
  }

  moreIngHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + ING_PRICES[type];
    const updatedIng = {
      ...this.state.ingredients
    };

    updatedIng[type] = newCount;
    console.log(newPrice);
    this.setState({
      ingredients: updatedIng,
      totalPrice: Math.round(newPrice * 100) / 100
    });
  }
  lessIngHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - ING_PRICES[type];
    const updatedIng = {
      ...this.state.ingredients
    };

    updatedIng[type] = newCount;
    console.log(newPrice);
    this.setState({
      ingredients: updatedIng,
      totalPrice: Math.round(newPrice * 100) / 100
    });
  }

  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <h2 className={classes.Price}>{this.state.totalPrice}$</h2>
        <BuildControls
          ingredients={this.state.ingredients}
          moreIng={this.moreIngHandler}
          lessIng={this.lessIngHandler}
          />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
