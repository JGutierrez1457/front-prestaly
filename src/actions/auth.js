import { AUTH, GET_MY_FAMILIES } from '../constants/actionsTypes';
import * as API from '../api';
export const signin = (dataUser)=>async(dispatch)=>{
    try {
        const { data } = await API.signIn(dataUser);
        const { user, families, token, message } = data;
        dispatch({
            type : GET_MY_FAMILIES,
            payload : families
        })
        dispatch({
            type : AUTH,
            payload : { user, token, families }
        })
        return message;
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }
}
export const signup = (dataUser)=>async(dispatch)=>{
    try {
        const { data } = await API.signUp(dataUser);
        const { user, families, token, message } = data;
        dispatch({
            type : GET_MY_FAMILIES,
            payload : families
        })
        dispatch({
            type : AUTH,
            payload : { user, token, families }
        })
        return message;
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
        }
}