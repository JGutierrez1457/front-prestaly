import { combineReducers } from 'redux'
import families from './families'
import auth from './auth'

export default combineReducers({
    families, auth
})