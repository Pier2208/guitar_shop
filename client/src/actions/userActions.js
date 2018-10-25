import axios from 'axios'
import { REGISTER_USER, SET_FORM_ERROR, CLEAR_FORM } from './types.js'

export const registerUser = (formData, resetForm, setSubmitting, setFieldError) => async dispatch => {

    try {
        //http request register endpoint
        const response = await axios.post('/api/users/register', formData)
        const data = await response.data

        dispatch({
            type: REGISTER_USER,
            payload: data
        })

        dispatch({
            type: CLEAR_FORM
        })

        resetForm()

    } catch (err) {

        dispatch({
            type: SET_FORM_ERROR,
            payload: err.response.data
        })
        setSubmitting(false)
        setFieldError('email', err.response.data.error)
    }
}