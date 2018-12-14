import {
    REGISTER_USER,
    SET_FORM_ERROR,
    CLEAR_ERROR,
    LOGIN_USER,
    LOGOUT_USER,
    GET_CURRENT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM
} from "./types";
import axios from 'axios'


export const registerUser = (formdata, resetForm, setFieldError, setSubmitting) => async dispatch => {

    try {
        console.log('called')

        //http request --> register user endpoint
        const response = await axios.post('/api/users/register', formdata)

        //if response.status === 200 || response.statusText === "OK"
        //console.log('response.statusText', response.statusText)
        //console.log('response.status', response.status)

        //then dispatch to userReducer
        dispatch({
            type: REGISTER_USER,
            payload: response.data
        })

        //and clear all form error if any
        dispatch({
            type: CLEAR_ERROR
        })

        //and reset form fields
        resetForm()

    } catch (err) {

        //if response.status > 299 || response.statusText === "bad request"
        console.log('error', err.response.data)

        //then dispatch action to errorReducer
        dispatch({
            type: SET_FORM_ERROR,
            payload: err.response.data
        })

        setSubmitting(false)

        //map error to form field
        //case: email already exists in db
        setFieldError('email', err.response.data.email)
    }
}


export const loginUser = (formdata, resetForm, setSubmitting, setFieldError, history) => async dispatch => {

    try {
        //http request to login user endpoint
        const response = await axios.post('/api/users/login', formdata)

        //if response.status === 200 || response.statusText === 'OK'
        dispatch({
            type: LOGIN_USER,
            payload: response.data
        })

        //clear any form error if any
        dispatch({
            type: CLEAR_ERROR
        })

        //then reset form fields
        resetForm()

        //redirect
        history.push('/user/dashboard')

    } catch (err) {
        //if err.response.status > 299 or err.response.statusText==='Bad request'
        dispatch({
            type: SET_FORM_ERROR,
            payload: err.response.data
        })

        setSubmitting(false)

        //map errors to form fields
        //cases: email not found in DB || password not found in DB
        setFieldError('email', err.response.data.email)
        setFieldError('password', err.response.data.password)
    }
}

export const logoutUser = history => async dispatch => {

    try {
        const response = await axios.get('/api/users/logout')

        dispatch({
            type: LOGOUT_USER,
            payload: response.data
        })

        history.push('/')


    } catch (err) {
        console.log(err)
    }
}


export const getCurrentUser = () => async dispatch => {

    try {
        //http request to authUser endpoint
        const response = await axios.get('/api/users/auth')

        //if response.status===200 || response.statusText==='OK'
        if (response) {
            dispatch({
                type: GET_CURRENT_USER,
                payload: response.data
            })
        }

    } catch (err) {
        //if response.status===401 (unauthorized)
        dispatch({
            type: GET_CURRENT_USER,
            payload: err.response.data
        })
    }
}

export const addToCart = id => async dispatch => {

    try {
        //http request to '/api/users/addtocart?productId="uiyhftg"
        const response = await axios.post(`/api/users/addtocart?productId=${id}`)

        dispatch({
            type: ADD_TO_CART,
            payload: response.data
        })

    } catch (err) {
        throw err
    }
}

export const getCartItems = (productIds, quantity) => async dispatch => {

    try {
        //http request to 'api/products/search_by_id?id=AAABBBCCC,SSSFFFTTT&type=array/single
        let response = await axios.get(`/api/products/search_by_id?id=${productIds}&type=array`)
        let data = response.data
        //add quantity field to response.data
        quantity.forEach(item => data.forEach((itemChild, index) => {
            if (item._id === itemChild._id) {
                data[index].quantity = item.quantity
            }
        })
        )

        dispatch({
            type: GET_CART_ITEMS,
            payload: data
        })

    } catch (err) {

        throw err
    }
}

export const removeItemFromCart = id => async dispatch => {

    try {
        //http request to '/api/users/remove_item?id=""
        let response = await axios.get(`/api/users/remove_item?id=${id}`)
        let cartSummary = response.data.cartSummary
        let cart = response.data.cart

        // merge what's in the response: cart & cartSummary (basically add the qty field)
        response.data.cart.forEach(item => cartSummary.forEach((itemChild, index) => {
            if (item._id === itemChild._id) {
                cartSummary[index].quantity = item.quantity
            }
        }))

        dispatch({
            type: REMOVE_CART_ITEM,
            cartSummary,
            cart
        })

    } catch (err) {
        throw err
    }
}