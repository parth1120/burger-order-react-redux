import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux';
import * as actionType from '../../store/action'



class BurgerBuilder extends Component {

    state = {
        isOrder: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         console.log(res);
        //         this.setState({
        //             ingredients: res.data
        //         })

        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         this.setState({
        //             error: true
        //         })
        //     })
    }

    // addInd = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     const updatedCounter = oldCount + 1
    //     const updatedInds = {
    //         ...this.state.ingredients,
    //     }
    //     updatedInds[type] = updatedCounter;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedInds
    //     }, () => {
    //         this.updatePurachase();
    //     })

    // }

    // removeInd = (type) => {
    //     if (this.state.ingredients[type] !== 0) {
    //         const oldCount = this.state.ingredients[type]
    //         const updatedCounter = oldCount - 1
    //         const updatedInds = {
    //             ...this.state.ingredients,
    //         }
    //         updatedInds[type] = updatedCounter;
    //         const priceAddition = INGREDIENT_PRICE[type];
    //         const oldPrice = this.state.totalPrice
    //         const newPrice = oldPrice - priceAddition
    //         this.setState({
    //             totalPrice: newPrice,
    //             ingredients: updatedInds
    //         }, () => {
    //             this.updatePurachase();
    //         })
    //     }
    // }

    updatePurachase = (ingre) => {
        const sum = Object.keys(ingre)
            .map(ingKey => {
                return ingre[ingKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)

      return sum > 0
    }

    purchaseHandler = () => {
        this.setState({
            isOrder: true
        })
    }

    purchaseCancle = () => {
        this.setState({
            isOrder: false
        })
    }
    purchaseContinue = () => {
        this.props.history.push('/checkout')
        // const queryParam = [];
        // for (let i in this.state.ingredients) {
        //     queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParam.push('price=' + this.state.totalPrice)
        // const queryString = queryParam.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        // this.setState({
        //     loading: true
        // })
        // const body = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice.toFixed(2),
        //     customer: {
        //         name: 'Dhruv Shrivastava',
        //         address: {
        //             street: 'Sector 91',
        //             zipCode: '201304',
        //             country: 'India'
        //         },
        //         email: 'parth@test.com'
        //     },
        //     deliveryMethod: 'paytm'
        // }
        // axios.post('/orders.json', body)
        //     .then((e) => {
        //         console.log(e);
        //         this.setState({
        //             loading: false,
        //             isOrder: false
        //         })
        //     })
        //     .catch((c) => {
        //         console.log(c);
        //         this.setState({
        //             loading: false,
        //             isOrder: false
        //         })
        //     })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let keys in disabledInfo) {
            disabledInfo[keys] = disabledInfo[keys] <= 0
        }
        let orderSummary = <Spinner />

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ings) {
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                totalPice={this.props.totalPrice}
                purchaseCancle={this.purchaseCancle}
                purchaseContinue={this.purchaseContinue} />

            burger = (
                <Aux><Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAddedd}
                        ingredientremove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.updatePurachase(this.props.ings)}
                        isOrdered={this.purchaseHandler} />
                </Aux>
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.isOrder} modalClosed={this.purchaseCancle}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux >
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispachToProps = dispach => {
    return {
        onIngredientAddedd: (ingName) => dispach({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispach({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispachToProps)(withErrorHandler(BurgerBuilder, axios));