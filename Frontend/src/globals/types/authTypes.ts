import { User } from "lucide-react"
import * as z from "zod"

export const RegisterUserSchema = z.object({
    id:z.string().optional(),
    userName:z.string(),
    password:z.string().min(6,"Password must be more than 6 characters"),
    email:z.email(),
    role:z.string().optional(),
    phoneNumber:z.string().regex(/^(98|97)\d{8}$/,"Invalid phone Number"),
    image:z.union([z.file(),z.string()]).optional()
})
export  type RegisterUserData = z.infer<typeof RegisterUserSchema> 

export const LoginUserSchema = z.object({
    email:z.email("Email is required"),
    password:z.string().min(6,"Password must be atleast of 6 characters !"),
})
export type LoginData = z.infer<typeof LoginUserSchema>

export const UserSchema = RegisterUserSchema.extend({
    token:z.string()

})
export type User = z.infer<typeof UserSchema>

export const VerifyOtpSchema = z.object({
    email:z.email(),
    otp:z.string()
})
export type VerifyOtpData = z.infer<typeof VerifyOtpSchema>

export const AuthSchema = z.object({
    user:User
})

export type AuthState = z.infer<typeof AuthSchema>