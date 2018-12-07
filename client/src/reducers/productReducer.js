import {
    GET_BRANDS,
    GET_WOODS,
    GET_FILTERED_PRODUCTS,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_DETAIL,
    ADD_PRODUCT,
    CLEAR_PRODUCT
} from '../actions/types'

const INITIAL_STATE = {
    brands: [],
    woods: [],
    filteredProducts: [],
    productDetail: {
        images: []
    }
}


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
                filteredProducts: action.payload.products,
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
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            }
        case CLEAR_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: {}
            }
        case ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            }
        case CLEAR_PRODUCT:
            return {
                ...state,
                addProduct: ''
            }
        default:
            return state
    }
}