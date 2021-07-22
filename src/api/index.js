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

export const getMembers = () =>API.get(`/api/families`);
export const addMember = (idfamily,username)=>API.patch(`/api/families/${idfamily}/members/${username}/add`)

export const signIn = (data)=>API.post('/api/auth/signin',data);