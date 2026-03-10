import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { VerifyOtpData } from "../../types/authTypes";
import { API } from "../../../axiosInstance";




export function useVerifyOtp(){
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async(data:VerifyOtpData)=>{
            const res = await API.post("/verifyotp",data)
            return res.data
        },
        onSuccess:(data)=>{
            localStorage.setItem("token",data.token)
            navigate({to:"/home"})
        }
    })
}