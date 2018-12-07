import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_CURRENT_USER,
    ADD_TO_CART
} from '../actions/types'

const INITIAL_STATE = {
    userInfo: null,
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
        default:
            return state
    }
}