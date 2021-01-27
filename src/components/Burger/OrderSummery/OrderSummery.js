import React from 'react';
import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';


const orderSummery = (props) => {
    const ingredientSummery = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>);
        });
    return (
        <Auxi>
            <h3>Your Order</h3>
            <p>A delicious burger with thie following ingredients:</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>Continue</Button>
        </Auxi>
    )
}

export default orderSummery;
