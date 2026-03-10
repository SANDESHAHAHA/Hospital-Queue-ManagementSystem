import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";



export function useSignOut(){
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async()=>{
            localStorage.removeItem("token")
        },
        onSuccess:()=>{
            navigate({to:"/login"})
        }
        
    })
}