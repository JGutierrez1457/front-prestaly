import { GET_MY_FAMILIES, ADD_MEMBER } from '../constants/actionsTypes';
const families = ( state = [ ], action )=>{
    switch(action.type){
        case GET_MY_FAMILIES:
            return action.payload
        case ADD_MEMBER:
            return state.map( f => (f._id === action.payload.family)?{...f, members : action.payload.members }:f)
        default:
            return state
    }
}
export default families