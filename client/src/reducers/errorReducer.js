import { SET_FORM_ERROR,
         CLEAR_ERROR }
        from '../actions/types'
         
const INITIAL_STATE = {}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_FORM_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR: 
            return INITIAL_STATE
        default:
           return state
    }
}