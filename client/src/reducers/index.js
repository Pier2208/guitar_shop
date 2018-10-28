import { combineReducers } from 'redux'

//reducers
import user from './userReducer'
import error from './errorReducer'
import products from './productReducer'

export default combineReducers({
    user,
    error,
    products
}) 