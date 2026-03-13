import { Link } from "@tanstack/react-router"
import { Button } from "../../components/ui/button"
import {useForm, type SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState, type ChangeEvent } from "react"
import { useLogin } from "../../globals/hooks/Auth/useLogin"
import { LoginUserSchema, type LoginData } from "../../globals/types/authTypes"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [data,setData] = useState<LoginData>({
    "email":"",
    "password":""
  })
  const loginMutation = useLogin()

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setData({
      ...data,
      [name]:value
    })
  }


  const {register,handleSubmit,formState:{errors}} = useForm<LoginData>({
  resolver: zodResolver(LoginUserSchema)
  })

  const onSubmit:SubmitHandler<LoginData> = (data) =>{
    loginMutation.mutate(data)
  }
  return (
<form onSubmit={handleSubmit(onSubmit)}>

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your credentials to sign in
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-1 mt-2">
            <p className="text-sm text-gray-600">
              Don't have an account?
            </p>
            <Link to="/register">
            <Button variant="link" className="p-0 h-auto text-sm font-semibold">
              Sign Up
            </Button>
            </Link>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email",{
                  onChange:handleInputChange
                })}
                name="email"
                placeholder="johndoe@example.com"
                required
                className="mt-1"
              />
            </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            {/* Password Field with Eye Toggle */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs text-blue-600 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  {...register("password",{
                    onChange:handleInputChange
                  })}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pr-10"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {loginMutation.isPending ? "Logging...":"Login"}
        </Button>
      </CardFooter>
    </Card>
  </form>

  )
}
