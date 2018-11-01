import {
    GET_BRANDS,
    GET_WOODS,
    GET_FILTERED_PRODUCTS
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
        case GET_FILTERED_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload.articles,
                filteredProductsSize: action.payload.size
            }
        default:
            return state
    }
}