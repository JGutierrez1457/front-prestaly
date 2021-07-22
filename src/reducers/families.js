import { GET_MY_FAMILIES } from '../constants/actionsTypes';
const families = ( state = [ ], action )=>{
    switch(action.type){
        case GET_MY_FAMILIES:
            return action.payload
        default:
            return state
    }
}
export default families