import { GET_MY_FAMILIES, EDIT_ADMINS, EDIT_MEMBERS, EDIT_CREATOR, GET_MEMBERS_BY_FAMILY } from '../constants/actionsTypes';
const families = ( state = JSON.parse(localStorage.getItem('token'))?.families || [], action )=>{
    switch(action.type){
        case GET_MY_FAMILIES:
            return action.payload
        case GET_MEMBERS_BY_FAMILY:
            return state.map( f => (f._id === action.payload._id )?{ ...f, ...action.payload}:f)
        case EDIT_MEMBERS:
            return state.map( f => (f._id === action.payload.family)?{...f, members : action.payload.members }:f)
        case EDIT_ADMINS:
            return state.map( f => (f._id === action.payload.family)?{...f, admins : action.payload.admins }:f)
        case EDIT_CREATOR:
            return state.map( f => (f._id === action.payload.family)?{...f, creator : action.payload.creator }:f)
        default:
            return state
    }
}
export default families