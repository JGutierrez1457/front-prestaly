import { GET_MY_FAMILIES } from '../constants/actionsTypes'
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