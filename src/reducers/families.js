import { GET_MY_FAMILIES, EDIT_ADMINS, EDIT_MEMBERS } from '../constants/actionsTypes';
const families = ( state = [ ], action )=>{
    switch(action.type){
        case GET_MY_FAMILIES:
            return action.payload
        case EDIT_MEMBERS:
            return state.map( f => (f._id === action.payload.family)?{...f, members : action.payload.members }:f)
        case EDIT_ADMINS:
            return state.map( f => (f._id === action.payload.family)?{...f, admins : action.payload.admins }:f)
        default:
            return state
    }
}
export default families