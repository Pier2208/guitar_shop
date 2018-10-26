import { REGISTER_USER, SET_FORM_ERROR, CLEAR_ERROR } from "./types";
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

        //if response.status > 299 || response.statusText === "OK"
        console.log('err.response.status', err.response.status)
        console.log('err.response.statusText', err.response.statusText)

        //then dispatch action to errorReducer
        dispatch({
            type: SET_FORM_ERROR,
            payload: err.response.data.email
        })

        setSubmitting(false)

        //map error to field
        setFieldError('email', err.response.data.email)
    }
}