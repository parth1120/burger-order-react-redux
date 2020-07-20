import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classess from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={classess.CheckoutSummary}>
            <h1>We hope it taste well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.onCheckoutCancelled}>
                CANCLE
                </Button>
            <Button
                btnType="Success"
                clicked={props.onCheckoutContinued}>
                CONTINUE
                </Button>
        </div>
    )

}

export default checkoutSummary