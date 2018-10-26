import { REGISTER_USER } from '../actions/types'

const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                registerSuccess: action.payload
            }
        default:
            return state
    }
}