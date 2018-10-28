import {
    REGISTER_USER,
    SET_FORM_ERROR,
    CLEAR_ERROR,
    LOGIN_USER,
    GET_CURRENT_USER
} from "./types";
import axios from 'axios'


export const registerUser = (formdata, resetForm, setFieldError, setSubmitting) => async dispatch => {

    try {
        //http request --> register user endpoint
        const response = await axios.post('/api/users/register', formdata)

        //if response.status === 200 || response.statusText === "OK"
        console.log('response.statusText', response.statusText)
        console.log('response.status', response.status)

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
        setFieldError('email', err.response.data.email)
    }
}


export const loginUser = (formdata, resetForm, setSubmitting, setFieldError) => async dispatch => {

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


export const getCurrentUser = () => async dispatch => {

    try {
        //http request to authUser endpoint
        const response = await axios.get('/api/users/auth')

        //if response.status===200 || response.statusText==='OK'
        dispatch({
            type: GET_CURRENT_USER,
            payload: response.data
        })
    
    } catch (err) {
        //if response.status===401 (unauthorized)
        dispatch({
            type: GET_CURRENT_USER,
            payload: err.response.data
        })
    }
}