import { useAppDispatch } from "../../store/hooks";
import {useMutation} from "@tanstack/react-query"
import type { RegisterUserData } from "../types/authTypes";
import { API } from "../../axiosInstance";
import { setUser } from "../../store/authSlice";

export function useRegister(){
    const dispatch = useAppDispatch()

    return useMutation({
        mutationFn: async (data:RegisterUserData) =>{
            const res = await API.post("/register",data)
            return res.data
        },
        onSuccess:(data)=>{
            dispatch(setUser(data.data))

        }
    })
}