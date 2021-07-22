import { combineReducers } from 'redux'
import families from './families'
import loans from './loans'

export default combineReducers({
    families, loans
})