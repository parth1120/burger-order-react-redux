import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './contactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index'


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    valuetype: 'Name',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    valuetype: 'Street',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    valuetype: 'ZIP Code',
                    placeholder: 'Your ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    valuetype: 'Country',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    valuetype: 'Email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false,
       
    }

    orderHandler = (e) => {
        e.preventDefault()

        let formData = {}
        for (let form in this.state.orderForm) {
            formData[form] = this.state.orderForm[form].value
        }
        const body = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData
        }
        this.props.onOrderBurger(body)

        // axios.post('/orders.json', body)
        //     .then((e) => {
        //         console.log(e);
        //         this.setState({
        //             loading: false
        //         })
        //         this.props.history.push('/')
        //     })
        //     .catch((c) => {
        //         console.log(c);
        //         this.setState({
        //             loading: false
        //         })
        //     })
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;

    }

    inputChnagedHandler = (e, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedOrderFormElement.value = e.target.value
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation)
        updatedOrderFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        let formIsValid = true;
        for (let inputValid in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputValid].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementArray = [];
        for (let keys in this.state.orderForm) {
            formElementArray.push(
                {
                    id: keys,
                    config: this.state.orderForm[keys],

                }
            )
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formElementArray.map(formElem => (
                <Input
                    key={formElem.id}
                    elementType={formElem.config.elementType}
                    elementConfig={formElem.config.elementConfig}
                    value={formElem.config.value}
                    invalid={!formElem.config.valid}
                    shouldValidate={formElem.config.validation}
                    touched={formElem.config.touched}
                    valuetype={formElem.config.elementConfig.valuetype}
                    changed={(e) => this.inputChnagedHandler(e, formElem.id)}
                />
            ))}
            <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
        </form>)
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuildereducer.ingredients,
        price: state.burgerBuildereducer.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));