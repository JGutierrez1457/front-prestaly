import { AUTH, LOGOUT } from "../constants/actionsTypes";
const auth = (state = { auth : JSON.parse(localStorage.getItem('token'))}, action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('token', JSON.stringify({...action?.payload}));
            return { ...state, auth : action?.payload }
        case LOGOUT:
            localStorage.removeItem('token');
            return { ...state, auth : null }
        default : return state
    }
}
export default auth;