import { AUTH, LOGOUT } from "../constants/actionsTypes";
const auth = (state = { auth : JSON.parse(localStorage.getItem('token'))}, action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('token', JSON.stringify({...action?.data}));
            return { ...state, auth : action?.data }
        case LOGOUT:
            localStorage.removeItem('token');
            return { ...state, auth : null }
        default : return state
    }
}
export default auth;