import {
    GET_BRANDS,
    GET_WOODS,
    GET_FILTERED_PRODUCTS,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL
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
        case GET_PRODUCTS_BY_SELL: 
            return {
                ...state,
                productsBySell: action.payload
            }
        case GET_PRODUCTS_BY_ARRIVAL:
            return {
                ...state,
                productsByArrival: action.payload
            }
        default:
            return state
    }
}