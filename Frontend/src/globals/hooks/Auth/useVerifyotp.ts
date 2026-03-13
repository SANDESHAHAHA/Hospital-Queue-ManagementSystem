import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { VerifyOtpData } from "../../types/authTypes";
import { API } from "../../../axiosInstance";
import { toast } from "sonner";




export function useVerifyOtp(){
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async(data:VerifyOtpData)=>{
            const res = await API.post("/verifyotp",data)
            return res.data
        },
        onSuccess:(data)=>{
            localStorage.setItem("token",data.token)
            toast.success("Otp verified sucessfully !")
            navigate({to:"/home"})
        },
        onError:()=>{
            toast.error("Provide valid otp !")
        }
    })
}