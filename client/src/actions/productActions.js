import axios from 'axios'
import {
    GET_BRANDS,
    GET_WOODS
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