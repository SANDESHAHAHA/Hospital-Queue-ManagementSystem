import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";



export function useSignOut(){
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async()=>{
            localStorage.removeItem("token")
        },
        onSuccess:()=>{
            toast.success("User logged out successfully !")
            navigate({to:"/login"})
        },
        onError:()=>{
            toast.error("Couldn't perfomr logout operations !")
        }
        
    })
}