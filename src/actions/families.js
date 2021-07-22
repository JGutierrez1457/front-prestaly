import { GET_MY_FAMILIES, ADD_MEMBER } from '../constants/actionsTypes'
import * as API from '../api'
export const getMembersFamily = ()=>async(dispatch)=>{
    try {
        const { data } = await API.getMembers();
        dispatch({
            type : GET_MY_FAMILIES,
            payload : data
        })
        return 'success'
    } catch (error) {
        if(error.response.status === 401 ){
            dispatch({
                type : GET_MY_FAMILIES,
                payload : []
            })
        }
    }
}
export const addMemberFamily = (idfamily, username)=>async(dispatch)=>{
    try {
        const { data } = await API.addMember(idfamily, username);
        const message = data.message;
        delete data.message;
        dispatch({
            type : ADD_MEMBER,
            payload : data
        })
         return message;
    } catch (error) {
        return error.response.data?.message;
    }
}