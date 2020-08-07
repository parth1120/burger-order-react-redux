import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'




class BurgerBuilder extends Component {

    state = {
        isOrder: false,
    }
    componentDidMount() {
       this.props.onInitIngredient()
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

    purchaseCancel = () => {
        this.setState({
            isOrder: false
        })
    }
    purchaseContinue = () => {
        this.props.onInitPurchase()
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

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        
        if (this.props.ings) {
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                totalPice={this.props.totalPrice}
                purchaseCancel={this.purchaseCancel}
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

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.isOrder} modalClosed={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux >
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuildereducer.ingredients,
        totalPrice: state.burgerBuildereducer.totalPrice,
        error: state.burgerBuildereducer.error,
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onIngredientAddedd: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler(BurgerBuilder, axios));