import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import classes from './BurgerBuilder.module.css';

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
    totalPrice: 5,
    purchasable: true,
    purchasing: false
  }

  isPurchasable(ingredients) {
    const sum = Object.keys(ingredients)
        .map( ing => {
          return ingredients[ing];
        })
        .reduce((sum, x) => {
          return sum + x;
        }, 0);
    this.setState({purchasable: sum <= 0});
  };

  isPurchasing = () => {
    this.setState({purchasing: true});
  };

  continueHandler = () => {
    alert('You continued!');
  };

  exitModalHandler = () => {
    this.setState({purchasing: false});
  };

  moreIngHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    if (newCount < 0) {
      return;
    }

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + ING_PRICES[type];
    const updatedIng = {
      ...this.state.ingredients
    };

    updatedIng[type] = newCount;

    this.setState({
      ingredients: updatedIng,
      totalPrice: newPrice
    });

    this.isPurchasable(updatedIng);
  }
  lessIngHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;
    if (newCount < 0) {
      return;
    }

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - ING_PRICES[type];
    const updatedIng = {
      ...this.state.ingredients
    };

    updatedIng[type] = newCount;

    this.setState({
      ingredients: updatedIng,
      totalPrice: newPrice
    });

    this.isPurchasable(updatedIng);
  }

  render() {
    const disableBtn = {
      ...this.state.ingredients
    };
    for (let key in disableBtn) {
      disableBtn[key] = disableBtn[key] <= 0
    }
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <Modal purchasing={this.state.purchasing} exitModal={this.exitModalHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            continue={this.continueHandler}
            cancel={this.exitModalHandler}
          />
        </Modal>
        <BuildControls
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          moreIng={this.moreIngHandler}
          lessIng={this.lessIngHandler}
          disabled={disableBtn}
          purchasable={this.state.purchasable}
          purchasing={this.state.purchasing}
          clicked={this.isPurchasing}
          />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
