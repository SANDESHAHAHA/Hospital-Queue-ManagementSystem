import { useMutation } from "@tanstack/react-query"
import { API } from "../../../axiosInstance"




export function useResendOtp(){
return useMutation({
    mutationFn: async (email:string)=>{
        await API.post("/resendOtp/"+email)
    }
})
}