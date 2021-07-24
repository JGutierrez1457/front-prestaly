import axios from 'axios';
let API_URL='http://localhost:3000';
const API = axios.create({ baseURL : API_URL});
API.interceptors.request.use(req=>{
    const userLocal = localStorage.getItem('token');
    if(userLocal){
        req.headers.authorization = `Bearer ${JSON.parse(userLocal).token}`
    }
    return req;
})

export const getMembers = (cancel) =>API.get(`/api/families`,{ cancelToken : cancel});
export const addMember = (idfamily,username)=>API.patch(`/api/families/${idfamily}/members/${username}/add`)
export const removeMember = (idfamily,username)=>API.patch(`/api/families/${idfamily}/members/${username}/delete`)
export const addAdmin = (idfamily,username)=>API.patch(`/api/families/${idfamily}/admins/${username}/add`)
export const removeAdmin = (idfamily,username)=>API.patch(`/api/families/${idfamily}/admins/${username}/delete`)



export const signIn = (data)=>API.post('/api/auth/signin',data);