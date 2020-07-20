import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './contactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        let formData = {}
        for (let form in this.state.orderForm) {
            formData[form] = this.state.orderForm[form].value
        }
        const body = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderData: formData
        }
        axios.post('/orders.json', body)
            .then((e) => {
                console.log(e);
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch((c) => {
                console.log(c);
                this.setState({
                    loading: false
                })
            })
    }

    inputChnagedHandler = (e, inputIdentifier) => {
        console.log(inputIdentifier, e.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] }
        console.log(updatedOrderFormElement);
        updatedOrderFormElement.value = e.target.value
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement
        this.setState({
            orderForm: updatedOrderForm
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
                    changed={(e) => this.inputChnagedHandler(e, formElem.id)}
                />
            ))}
            <Button btnType='Success'>ORDER</Button>
        </form>)
        if (this.state.loading) {
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

export default ContactData;