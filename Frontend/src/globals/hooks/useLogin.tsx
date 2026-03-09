import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../types/authTypes";
import { API } from "../../axiosInstance";
import { useAppDispatch } from "../../store/hooks";
import { setToken } from "../../store/authSlice";
import { useNavigate } from "@tanstack/react-router";



export function useLogin(){
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data:LoginData)=>{
            const res = await API.post("/login",data)
            return res.data
        },
        onSuccess:(data)=>{
            dispatch(setToken(data.token))
            navigate({to:"/home"})
        }
    })
}