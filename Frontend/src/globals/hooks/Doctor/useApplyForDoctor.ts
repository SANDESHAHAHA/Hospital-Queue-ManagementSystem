import { useMutation } from "@tanstack/react-query";
import type { applyforDocData } from "../../types/docTypes";
import { AuthenticatedAPI } from "../../../axiosInstance";


export function useApplyForDoctor(){
    
    return useMutation({
        mutationFn:async (data:applyforDocData)=>{
             await AuthenticatedAPI.post("/applyDoctor",data)
        },
        onSuccess:()=>{
            alert("You will be notified after your approval of request ! !")
        }
    })
}