import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../../types/authTypes";
import { API } from "../../../axiosInstance";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/authSlice";
import { toast } from "sonner";



export function useLogin(){
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: async (data:LoginData)=>{
            const res = await API.post("/login",data)
            return res.data
        },
        onSuccess:(data)=>{
            dispatch(setUser(data.data))
            toast.success("You can further proceed for otp verification !")
            navigate({to:"/verifyotp"})
        },
        onError:()=>{
            toast.error("Please provide the valid data !")
        }
    })
}