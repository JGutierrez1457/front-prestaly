import { combineReducers } from 'redux'
import families from './families'
import loans from './loans'
import auth from './auth'

export default combineReducers({
    families, loans, auth
})