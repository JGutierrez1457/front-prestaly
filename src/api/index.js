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

export const getMembers = (cancel, idfamily) =>API.get(`/api/families/${idfamily}/members`,{ cancelToken : cancel});
export const getBalances = (cancel, idfamily) =>API.get(`/api/balances/families/${idfamily}`,{ cancelToken : cancel});
export const getNoBalanceds = (cancel, idfamily) =>API.get(`/api/loans/no/balanced/families/${idfamily}`,{ cancelToken : cancel});
export const getPDFNoBalanceds = (idfamily) => API.get(`/api/loans/no/balanced/families/${idfamily}/pdf`,{ responseType: 'blob'});

export const generateBalance = (idfamily)=> API.post(`api/balances/families/${idfamily}`);
export const postImage = (idloan, idfamily, data, handleProgress)=> API.post(`api/loans/${idloan}/families/${idfamily}/image`,data, { onUploadProgress: handleProgress});

export const addMember = (idfamily,username)=>API.patch(`/api/families/${idfamily}/members/${username}/add`)
export const removeMember = (idfamily,username)=>API.patch(`/api/families/${idfamily}/members/${username}/delete`)
export const addAdmin = (idfamily,username)=>API.patch(`/api/families/${idfamily}/admins/${username}/add`)
export const removeAdmin = (idfamily,username)=>API.patch(`/api/families/${idfamily}/admins/${username}/delete`)

export const updateLoan = (idloan, idfamily, data)=>API.patch(`/api/loans/${idloan}/families/${idfamily}`,data)

export const addLoan = (idfamily, data)=>API.post(`/api/loans/families/${idfamily}`,data)

export const signIn = (data)=>API.post('/api/auth/signin',data);