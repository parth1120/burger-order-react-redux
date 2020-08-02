import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './contactData/contactData'
import { connect } from 'react-redux';


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

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log(this.props.match.path)
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                    onCheckoutCancelled={this.onCheckoutCancelled}
                    onCheckoutContinued={this.onCheckoutContinued} />
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
                {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />)} /> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);
