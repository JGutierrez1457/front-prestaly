import { AUTH } from '../constants/actionsTypes';
import * as API from '../api';
export const signin = (dataUser)=>async(dispatch)=>{
    try {
        const { data } = await API.signIn(dataUser);
        const message = data.message;
        delete data.message;
        dispatch({
            type : AUTH,
            payload : data
        })
        return message;
    } catch (error) {
        return error.response.data?.message;
    }
}