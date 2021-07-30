import { GET_MEMBERS_BY_FAMILY, EDIT_MEMBERS, EDIT_ADMINS, EDIT_CREATOR, GET_BALANCES_BY_FAMILY, GET_NO_BALANCEDS_BY_FAMILY, GENERATE_BALANCE_BY_FAMILY} from '../constants/actionsTypes'
import * as API from '../api'
export const getMembersFamily = (cancel, idfamily)=>async(dispatch)=>{
    try {
        const { data } = await API.getMembers(cancel, idfamily);
        dispatch({
            type : GET_MEMBERS_BY_FAMILY,
            payload : data
        })
        return 'success'
    } catch (error) {
        if(error.response.status === 401 ){
            dispatch({
                type : GET_MEMBERS_BY_FAMILY,
                payload : []
            })
        }
    }
}
export const getBalancesFamily = (cancel, idfamily)=>async(dispatch)=>{
    try {
        const { data } = await API.getBalances(cancel, idfamily);
        dispatch({
            type : GET_BALANCES_BY_FAMILY,
            payload : data
        })
        return 'success'
    } catch (error) {
        if(error.response.status === 401 ){
            dispatch({
                type : GET_BALANCES_BY_FAMILY,
                payload : []
            })
        }
    }
}
export const getNoBalancedsFamily = (cancel, idfamily)=>async(dispatch)=>{
    try {
        const { data } = await API.getNoBalanceds(cancel, idfamily);
        const dataMembers = await API.getMembers(null, idfamily);
        dispatch({
            type : GET_MEMBERS_BY_FAMILY,
            payload : dataMembers.data
        })
        dispatch({
            type : GET_NO_BALANCEDS_BY_FAMILY,
            payload : data
        })
        return 'success'
    } catch (error) {
        if(error.response.status === 401 ){
            dispatch({
                type : GET_NO_BALANCEDS_BY_FAMILY,
                payload : []
            })
        }
    }
}
export const generateBalanceByFamily = (idfamily)=>async(dispatch)=>{
    try {
        const { data } = await API.generateBalance( idfamily);
        const dataNoBalanceds = await API.getNoBalanceds(null, idfamily);
        const message = data.message;
        delete data.message;
        dispatch({
            type : GENERATE_BALANCE_BY_FAMILY,
            payload : data
        })
        dispatch({
            type : GET_NO_BALANCEDS_BY_FAMILY,
            payload : dataNoBalanceds.data
        })
        return message
    } catch (error) {
        if(error.response.status === 401 ){
            dispatch({
                type : GENERATE_BALANCE_BY_FAMILY,
                payload : []
            })
        }
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
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
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }
}
export const removeMemberFamily = (idfamily, username)=>async(dispatch)=>{
    try {
        const { data } = await API.removeMember(idfamily, username);
        const datafamilies= await API.getMembers(null, idfamily);

        const message = data.message;
        delete data.message;
        dispatch({
            type : EDIT_MEMBERS,
            payload : data
        })
        dispatch({
            type : GET_MEMBERS_BY_FAMILY,
            payload : datafamilies.data
        })
        if(data?.creator){
            dispatch({
                type : EDIT_CREATOR,
                payload : data
            })
        }
         return message;
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
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
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
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
        if(data?.creator){
            dispatch({
                type : EDIT_CREATOR,
                payload : data
            })
        }
         return message;
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }
}