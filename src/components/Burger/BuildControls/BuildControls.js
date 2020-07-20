import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildCnts'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(e =>
            <BuildControl
                added={() => props.ingredientAdded(e.type)}
                remove={() => props.ingredientremove(e.type)}
                key={e.label}
                label={e.label} 
                disable={props.disabled[e.type]}/>
        )}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.isOrdered}>ORDER NOW</button>
    </div>
);

export default buildControls;