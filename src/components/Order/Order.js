import React from 'react'
import classes from './Order.css'

const order = (props) => {
    const ing = []

    for (let inggs in props.ingredients) {
        ing.push(
            {
                name: inggs,
                amount: props.ingredients[inggs]

            }
        )
    }

    const ingOutput = ing.map(ig => {
        return <span key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.order}>
            <p>Ingredients: {ingOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;