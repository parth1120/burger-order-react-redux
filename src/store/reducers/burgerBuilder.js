import * as actionType from '../actions/actionTypes'

const intialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };

        case actionType.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case actionType.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }

}

export default reducer;