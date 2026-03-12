import { useMutation } from "@tanstack/react-query";
import { applyForDocSchema, type applyforDocData } from "../../types/docTypes";
import { AuthenticatedAPI } from "../../../axiosInstance";
import {z} from 'zod'
import { toast } from "sonner";

export function useApplyForDoctor({closeModal}:{closeModal:()=>void}){

        return useMutation({
                mutationFn:async (data:applyforDocData)=>{
                    const parsed = applyForDocSchema.safeParse(data)
                    if(!parsed.success){
                        console.log(z.treeifyError(parsed.error))
                        return
                    }
                    await AuthenticatedAPI.post("/applyDoctor",data)
                },
                onSuccess:()=>{
                        closeModal()
                        toast.success("Doctor Application has been submitted successfully !")
                },
                onError:()=>{
                    toast.error("You have already applied as a doctor !")
                }
        })
}