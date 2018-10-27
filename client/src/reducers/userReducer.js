import { REGISTER_USER, 
         LOGIN_USER,
         GET_CURRENT_USER } from '../actions/types'

const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
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
        case GET_CURRENT_USER: 
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state
    }
}