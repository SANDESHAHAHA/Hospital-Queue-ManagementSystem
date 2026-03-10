import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../../types/authTypes";
import { API } from "../../../axiosInstance";
import { useNavigate } from "@tanstack/react-router";



export function useLogin(){
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data:LoginData)=>{
            const res = await API.post("/login",data)
            return res.data
        },
        onSuccess:()=>{
            navigate({to:"/verifyotp"})
        }
    })
}