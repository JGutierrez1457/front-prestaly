import { AUTH, LOGOUT } from "../constants/actionsTypes";
const auth = (state = JSON.parse(localStorage.getItem('token')) || {}, action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('token', JSON.stringify({...action?.payload}));
            return action.payload
        case LOGOUT:
            localStorage.removeItem('token');
            return null
        default : return state
    }
}
export default auth;