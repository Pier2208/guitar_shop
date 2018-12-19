import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_CURRENT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    UPDATE_QUANTITY
} from '../actions/types'

const INITIAL_STATE = {
    userInfo: {
        cartSummary: [],
        cart: []
    },
    registerSuccess: '',
    loginSuccess: '',
    logoutSuccess: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                registerSuccess: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload
            }
        case LOGOUT_USER:
            return {
                userInfo: null,
                registerSuccess: '',
                loginSuccess: '',
                logoutSuccess: action.payload
            }
        case GET_CURRENT_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        case ADD_TO_CART:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cart: action.payload
                }
            }
        case GET_CART_ITEMS:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cartSummary: action.payload
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cartSummary: action.cartSummary,
                    cart: action.cart
                }
            }
        case UPDATE_QUANTITY: 
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cart: action.cart,
                    cartSummary: action.cartSummary
                }
            }
        default:
            return state
    }
}