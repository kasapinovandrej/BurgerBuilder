import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredient();
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    updatePurchaseState = (updIng) => {
        const ingredients = { ...updIng }
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }


    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        //console.log(disabledInfo)

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummery = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Auxi>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingridientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price} />
                </Auxi>
            );
            orderSummery = <OrderSummery
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredients={this.props.ings} />
        }
        return (
            <Auxi>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </Auxi>
        );

    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
