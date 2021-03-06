import * as actionType from '../actions/actionTypes'
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case action.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default reducer