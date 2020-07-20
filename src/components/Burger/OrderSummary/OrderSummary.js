import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // This could be a functional component
    render() {
        const ingSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return (<li key={ingKey}>
                    <span style={{ textTransform: 'capitalize' }}>{ingKey}:</span>
                    {this.props.ingredients[ingKey]}
                </li>
                )
            })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingSummary}</ul>
                <p><strong>Total Price: {this.props.totalPice.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancle}>CANCLE</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}
export default OrderSummary;
