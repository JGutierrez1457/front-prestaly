import { GET_MY_LOANS } from '../constants/actionsTypes';
const loans = ( state = [ ], action )=>{
    switch(action.type){
        case GET_MY_LOANS:
            return action.payload
        default:
            return state
    }
}
export default loans;