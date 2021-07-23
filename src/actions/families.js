import { GET_MY_FAMILIES, EDIT_MEMBERS, EDIT_ADMINS} from '../constants/actionsTypes'
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
            type : EDIT_MEMBERS,
            payload : data
        })
         return message;
    } catch (error) {
        return error.response.data?.message;
    }
}
export const removeMemberFamily = (idfamily, username)=>async(dispatch)=>{
    try {
        const { data } = await API.removeMember(idfamily, username);
        const datafamilies= await API.getMembers();
        console.log(datafamilies)

        const message = data.message;
        delete data.message;
        dispatch({
            type : EDIT_MEMBERS,
            payload : data
        })
        dispatch({
            type : GET_MY_FAMILIES,
            payload : datafamilies.data
        })
         return message;
    } catch (error) {
        console.log(error)

        return error.response.data?.message;
    }
}
export const addAdminFamily = (idfamily, username)=>async(dispatch)=>{
    try {
        const { data } = await API.addAdmin(idfamily, username);
        const message = data.message;
        delete data.message;
        dispatch({
            type : EDIT_ADMINS,
            payload : data
        })
         return message;
    } catch (error) {
        return error.response.data?.message;
    }
}
export const removeAdminFamily = (idfamily, username)=>async(dispatch)=>{
    try {
        const { data } = await API.removeAdmin(idfamily, username);
        const message = data.message;
        delete data.message;
        dispatch({
            type : EDIT_ADMINS,
            payload : data
        })
         return message;
    } catch (error) {
        return error.response.data?.message;
    }
}