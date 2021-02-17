import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import classes from './BurgerBuilder.module.css';
import burgerAPI from '../../axios-orders';

const ING_PRICES = {
  salad: 0.40,
  meat: 1.30,
  cheese: 0.60,
  bacon: 0.80
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: true,
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    burgerAPI.get('/ingredients.json')
    .then(response => {
      // console.log(response);
      this.setState({ingredients: response.data});
    })
    .catch(error => {});
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
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Pete',
        address: {
          street: '10 Lilouli',
          zipCode: 45012,
          country: 'France'
        }
      },
      deliveryMethod: 'fastest'
    };

    burgerAPI.post('/orders.json', order)
      .then(response => {
        this.setState({loading : false, purchasing: false})
      })
      .catch(error => {
        this.setState({loading : false, purchasing: false})
      });
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
    };



    let burger = <Spinner />;
    let loading = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
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

      if (!this.state.loading) {
        loading = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        continue={this.continueHandler}
        cancel={this.exitModalHandler}
        />;
      }
    }
    return (
      <Auxiliary>
        <Modal purchasing={this.state.purchasing} exitModal={this.exitModalHandler}>
          {loading}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, burgerAPI);
