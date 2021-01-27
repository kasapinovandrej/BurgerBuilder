import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = []

    for (let ingName in props.ingredients) {
        ingredients.push({ name: ingName, amount: props.ingredients[ingName] })
    }

    const ingredientOutput = ingredients.map(ign => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
            }}
            key={ign.name}>{ign.name} ({ign.amount})</span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong> </p>
        </div>
    )
}

export default order;
