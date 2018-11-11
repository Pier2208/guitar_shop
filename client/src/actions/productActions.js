import axios from 'axios'
import {
    GET_BRANDS,
    GET_WOODS,
    GET_FILTERED_PRODUCTS,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL,
    ADD_PRODUCT,
    CLEAR_ERROR,
    SET_FORM_ERROR,
    CLEAR_PRODUCT
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

export const getFilteredProducts = (limit, skip, filters={}, previousState=[]) => async dispatch => {

    try {
        //create an object data to submit to server made available on req.body
        const dataToSubmit = {
            limit,
            skip,
            filters
        }

        //http request to shop endpoint
        const response = await axios.post('api/products/shop', dataToSubmit)

        //merge previous state with current state
        let newState = [
            ...previousState,
            ...response.data.articles
        ]

        //if response.status===200 || response.statusText ==="OK"
        dispatch({
            type: GET_FILTERED_PRODUCTS,
            payload: {
                products: newState,
                size: response.data.filteredProductsSize
            }
        })

    } catch(err) {
        console.log(err)
    }
}

export const getProductsByArrival = () => async dispatch => {

    try {
        //http request to 'api/products/search?sortBy=createdAt&order=desc&limit=3'
        const response = await axios.get('api/products/search?sortBy=createdAt&order=desc&limit=3')

        //if response.status === 200 || response.statusText === "OK"
        dispatch({
            type: GET_PRODUCTS_BY_ARRIVAL,
            payload: response.data
        })

    } catch(err) {
        console.log(err)
    }
}

export const getProductsBySell = () => async dispatch => {

    try {
        //http request to 'api/products/search?sortBy=sold&order=desc&limit=4'
        const response = await axios.get('api/products/search?sortBy=sold&order=desc&limit=4')

        //if response.status === 200 || response.statusText === "OK"
        dispatch({
            type: GET_PRODUCTS_BY_SELL,
            payload: response.data
        })

    } catch(err) {
        console.log(err)
    }
}

export const addProduct = (formdata, resetForm, setFieldError, setSubmitting) => async dispatch => {

    try {
        //http request to 'api/products/new_product'
        const response = await axios.post('/api/products/new_product', formdata)

        //if response.status === 200 || response.statusText === 'OK'
        dispatch({
            type: ADD_PRODUCT,
            payload: response.data
        })

        //and clear all form error if any
        dispatch({
            type: CLEAR_ERROR
        })

        //and reset form fields
        resetForm()

    } catch(err) {

        //if response.status > 299 || response.statusText === "bad request"
        console.log('err.response.status', err.response.status)
        console.log('err.response.statusText', err.response.statusText)

        //then dispatch action to errorReducer
        dispatch({
            type: SET_FORM_ERROR,
            payload: err.response.data
        })

        setSubmitting(false)

        //map error to form field
        //case: email already exists in db
        setFieldError('name', err.response.data.name)

    }
}

export const clearProduct = () => ({
    type: CLEAR_PRODUCT
})