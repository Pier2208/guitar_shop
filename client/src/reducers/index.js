import { combineReducers } from 'redux'
import user from './userReducer'
import error from './errorReducer'

export default combineReducers({
    user,
    error
}) 