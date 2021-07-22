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

export const signIn = (data)=>API.post('/api/auth/signin',data);