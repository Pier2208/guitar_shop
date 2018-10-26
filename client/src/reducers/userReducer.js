import { REGISTER_USER, LOGIN_USER } from '../actions/types'

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
        default:
            return state
    }
}