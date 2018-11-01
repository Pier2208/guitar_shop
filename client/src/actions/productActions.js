import axios from 'axios'
import {
    GET_BRANDS,
    GET_WOODS,
    GET_FILTERED_PRODUCTS
} from './types'


export const getBrands = () => async dispatch => {

    try {
        //http request to api/products/brandsawait
        const response = await axios.get('api/products/brands')

        //if response.status===200 || response.statusText==='OK
        dispatch({
            type: GET_BRANDS,
            payload: response.data
        })

    } catch(err) {
        throw err
    }
}

export const getWoods = () => async dispatch => {

    try {
        //http request to api/products/brandsawait
        const response = await axios.get('api/products/woods')

        //if response.status===200 || response.statusText==='OK
        dispatch({
            type: GET_WOODS,
            payload: response.data
        })

    } catch(err) {
        throw err
    }
}

export const getFilteredProducts = (limit, skip, filters={}) => async dispatch => {

    try {
        //create an object data to submit to server made available on req.body
        const dataToSubmit = {
            limit,
            skip,
            filters
        }

        //http request to shop endpoint
        const response = await axios.post('api/products/shop', dataToSubmit)

        //if response.status===200 || response.statusText ==="OK"
        dispatch({
            type: GET_FILTERED_PRODUCTS,
            payload: response.data
        })

    } catch(err) {
        console.log(err)
    }
}