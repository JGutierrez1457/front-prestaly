import { GET_MY_FAMILIES, EDIT_ADMINS, EDIT_MEMBERS, EDIT_CREATOR, GET_MEMBERS_BY_FAMILY, GET_BALANCES_BY_FAMILY, GET_NO_BALANCEDS_BY_FAMILY, GENERATE_BALANCE_BY_FAMILY, EDIT_LOAN, ADD_LOAN, POST_IMAGE } from '../constants/actionsTypes';
const families = ( state = JSON.parse(localStorage.getItem('token'))?.families || [], action )=>{
    switch(action.type){
        case GET_MY_FAMILIES:
            return action.payload
        case GET_MEMBERS_BY_FAMILY:
            return state.map( f => (f._id === action.payload._id )?{ ...f, ...action.payload}:f)
        case GET_BALANCES_BY_FAMILY:
            return state.map( f => (f._id === action.payload._id )?{ ...f, balances : action.payload.balances }:f)
        case GENERATE_BALANCE_BY_FAMILY:
            return state.map( f => (f._id === action.payload._id )?{ ...f, balances : [ ...f.balances, action.payload.balance] }:f)
        case POST_IMAGE:
            return state.map( f => (f._id === action.payload.family)?{...f, no_balanceds : f.no_balanceds.map( l =>(l._id === action.payload.idloan)?({...l, images : [...l.images, action.payload.image]}):(l)) }:f)
        case GET_NO_BALANCEDS_BY_FAMILY:
            return state.map( f => (f._id === action.payload.idfamily )?{ ...f, no_balanceds : action.payload.loans }:f)
        case EDIT_MEMBERS:
            return state.map( f => (f._id === action.payload.family)?{...f, members : action.payload.members }:f)
        case EDIT_ADMINS:
            return state.map( f => (f._id === action.payload.family)?{...f, admins : action.payload.admins }:f)
        case EDIT_CREATOR:
            return state.map( f => (f._id === action.payload.family)?{...f, creator : action.payload.creator }:f)
        case EDIT_LOAN:
            return state.map( f => (f._id === action.payload.family)?{...f, no_balanceds : f.no_balanceds.map( l =>(l._id === action.payload.idloan)?(action.payload.loan):(l)) }:f)
        case ADD_LOAN:
            return state.map( f => (f._id === action.payload.family)?{...f, no_balanceds : [...f.no_balanceds, action.payload.loan] }:f)
        default:
            return state
    }
}
export default families