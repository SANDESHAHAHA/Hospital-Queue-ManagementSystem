import { User } from "lucide-react"
import * as z from "zod"

export const RegisterUserSchema = z.object({
    id:z.string().optional(),
    userName:z.string(),
    password:z.string().min(6,"Password must be more than 6 characters"),
    email:z.email(),
    phoneNumber:z.string().regex(/^(98|97)\d{8}$/,"Invalid phone Number"),
    image:z.file().optional()
})

export  type RegisterUserData = z.infer<typeof RegisterUserSchema> 

export const LoginUserSchema = z.object({
    email:z.email(),
    password:z.string().min(6),
})

export type LoginData = z.infer<typeof LoginUserSchema>

export const UserSchema = RegisterUserSchema.extend({
    token:z.string()

})
export type User = z.infer<typeof UserSchema>

export const AuthSchema = z.object({
    user:User
})

export type AuthState = z.infer<typeof AuthSchema>