import { SET_FORM_ERROR , CLEAR_FORM } from '../actions/types'
const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_FORM_ERROR:
            return {
                ...state,
                error: action.payload
            }
        break
        case CLEAR_FORM:
            return INITIAL_STATE
        break
        default:
           return state
    }
}