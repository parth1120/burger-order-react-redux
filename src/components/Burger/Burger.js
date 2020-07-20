import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(e => {
            return [...Array(props.ingredients[e])].map((_, i) => {
                return <BurgerIngredient key={e + i} type={e} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if(!transformedIngredients.length){
        transformedIngredients = <p>Please start adding Ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;
