import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './contactData/contactData'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0
    //     for (let param of query.entries()) {
    //         if (param[0] !== 'price') {
    //             ingredients[param[0]] = +param[1]
    //         } else {
    //             price = +param[1]
    //         }

    //     }

    //     this.setState({ ingredients: ingredients, totalPrice: price })
    // }

    componentWillMount() {
        this.props.onInitPurchase()
    }

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            let purchased = this.props.purchased ?  <Redirect to='/' /> : null
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary ingredients={this.props.ings}
                        onCheckoutCancelled={this.onCheckoutCancelled}
                        onCheckoutContinued={this.onCheckoutContinued} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                    {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)} /> */}
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuildereducer.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToPops = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToPops)(Checkout);
