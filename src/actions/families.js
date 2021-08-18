import { AUTH, GET_MEMBERS_BY_FAMILY, EDIT_MEMBERS, EDIT_ADMINS, EDIT_CREATOR, GET_BALANCES_BY_FAMILY, GET_NO_BALANCEDS_BY_FAMILY, GENERATE_BALANCE_BY_FAMILY, EDIT_LOAN, ADD_LOAN, POST_IMAGE, DELETE_IMAGE, ADD_FAMILY, REMOVE_FAMILY, DELETE_LOAN} from '../constants/actionsTypes'
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
        const dataMembers = await API.getMembers(cancel, idfamily);
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
export const postImageLoan = (idloan, idfamily, formData, handleProgress) => async(dispatch)=>{
    try {
        const { data } = await API.postImage(idloan, idfamily, formData, handleProgress);
        const message = data.message;
        delete data.message;
        dispatch({
            type : POST_IMAGE,
            payload : data
        })
        return {message, url : data.image.url, idimage : data.image._id};
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }
}
export const deleteImageLoan = (idloan, idfamily, idimage) => async(dispatch)=>{
    try {
        const { data } = await API.deleteImage(idloan, idfamily, idimage);
        const message = data.message;
        delete data.message;
        dispatch({
            type : DELETE_IMAGE,
            payload : data
        })
        return message;
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }
}
export const deleteLoan = (idloan, idfamily ) => async(dispatch)=>{
    try {
        const { data } = await API.deleteLoan(idloan, idfamily);
        const message = data.message;
        delete data.message;
        dispatch({
            type : DELETE_LOAN,
            payload : data
        })
        return message;
    } catch (error) {
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
    let familiesUser ;
    let messageUser;
    try {
        const { data } = await API.removeMember(idfamily, username);
        familiesUser = data.familiesUser;
        messageUser = data.message;
        const datafamilies= await API.getMembers(null, idfamily);

        const message = data.message;
        delete data.familiesUser;
        delete data.message;
        /* dispatch({
            type : EDIT_MEMBERS,
            payload : data
        }) */
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
        if(error.response.data === 'Usuario no es miembro'){
            dispatch({
                type : REMOVE_FAMILY,
                payload : { _id : idfamily }
            })
            dispatch({
                type : AUTH,
                payload : { families : familiesUser }
            })
            return messageUser;
        }
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
export const updateLoan = (idloan, idfamily, dataLoan)=>async(dispatch)=>{
    try {
        const { data } = await API.updateLoan(idloan, idfamily, dataLoan);
        const message = data.message;
        delete data.message;
        dispatch({
            type : EDIT_LOAN,
            payload : data
        })
        return message;
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }

}
export const addLoan = (idfamily, dataLoan)=>async(dispatch)=>{
    try {
        const { data } = await API.addLoan(idfamily, dataLoan);
        const message = data.message;
        delete data.message;
        dispatch({
            type : ADD_LOAN,
            payload : data
        })
        return {message, loan : data.loan._id};
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }

}
export const addFamily = (dataFamily)=>async(dispatch)=>{
    try {
        const { data } = await API.addFamily(dataFamily);
        const { families, family } = data
        const message = data.message;
        delete data.message;
        dispatch({
            type : ADD_FAMILY,
            payload : family
        })
        dispatch({
            type : AUTH,
            payload : { families }
        })
        return {message};
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }

}
export const deleteFamily = (idfamily, password)=>async(dispatch)=>{
    try {
        const { data } = await API.deleteFamily(idfamily, password);
        const { families } = data
        const message = data.message;
        delete data.message;
        dispatch({
            type : REMOVE_FAMILY,
            payload : { _id : idfamily }
        })
        dispatch({
            type : AUTH,
            payload : { families }
        })
        return message;
    } catch (error) {
        let err = new Error(error.response.data);
        err.status = error.response.status;
        throw err;
    }

}