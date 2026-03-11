import axios from 'axios'

export const API = axios.create({
    baseURL : "http://localhost:3002",
    headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
})

export const AuthenticatedAPI = axios.create({
    baseURL:"http://localhost:3002",
    headers:{
        "Content-Type": "application/josn",
        "Accept":"application/json",
        "Authorization": localStorage.getItem("token")
    }
})

AuthenticatedAPI.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = token
    }
    return config
})