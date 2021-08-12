import { AUTH, LOGOUT } from "../constants/actionsTypes";
const auth = (state = JSON.parse(localStorage.getItem('token')) || {}, action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('token', JSON.stringify({...state, ...action?.payload}));
            return {...state, ...action.payload}
        case LOGOUT:
            localStorage.removeItem('token');
            return null
        default : return state
    }
}
export default auth;