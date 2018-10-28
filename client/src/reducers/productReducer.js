import {
    GET_BRANDS,
    GET_WOODS
} from '../actions/types'

const INITIAL_STATE = {}


export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        case GET_WOODS:
            return {
                ...state,
                woods: action.payload
            }
        default:
            return state
    }
}