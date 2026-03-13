import { useAppDispatch } from "../../../store/hooks";
import {useMutation} from "@tanstack/react-query"
import type { RegisterUserData } from "../../types/authTypes";
import { API } from "../../../axiosInstance";
import { setUser } from "../../../store/authSlice";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useRegister(){
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data:RegisterUserData) =>{
            const res = await API.post("/register",data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            return res.data
        },
        onSuccess:(data)=>{
            dispatch(setUser(data.data))
            toast.success("User Registered successfully !")
            navigate({to:"/login"})
        },
        onError:()=>{
            toast.error("Failed to register the user !")
        }
    })
}