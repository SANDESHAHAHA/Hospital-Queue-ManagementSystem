import { Link } from "@tanstack/react-router"
import { Button } from "../../components/ui/button"
import { Loader2 } from "lucide-react"
import { useForm, type SubmitHandler, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card, CardAction, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Eye, EyeOff, Upload, X } from "lucide-react"
import { useState } from "react"
import { useRegister } from "../../globals/hooks/Auth/useRegister"

// ✅ Fixed schema
const formSchema = z.object({
  userName: z.string().min(3, "Username must be more than 3 characters!"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().regex(/^(98|97)\d{8}$/, "Phone Number must start with 98 or 97 and must be 10 digits"),
  image: z.preprocess( // for form validation on submitting
    (val) => val instanceof FileList ? val[0] : val,
    z.instanceof(File, { message: "Image is required" })
  )
})

type FormFields = z.infer<typeof formSchema>

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")

  const registerMutation = useRegister()

  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    resolver: zodResolver(formSchema) as Resolver<FormFields>
  })

  const clearImage = () => {
    setProfileImage(null)
    setFileName("")
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    registerMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate> {/* ✅ noValidate added */}
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center text-center pb-2">
          <div className="mb-4">
            {profileImage ? (
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-lg"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="w-28 h-28 rounded-full border-4 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <Input
                  {...register("image", {
                    onChange: (e) => { // for preview
                      const file = e.target.files?.[0]
                      if (file) {
                        setFileName(file.name)
                        const reader = new FileReader()
                        reader.onload = (event) => setProfileImage(event.target?.result as string)
                        reader.readAsDataURL(file)
                      }
                    }
                  })}
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                {errors.image && (
                  <p className="text-xs text-red-500 mt-1">{errors.image.message as string}</p>
                )}
              </label>
            )}
          </div>

          <p className="text-xs text-gray-600 font-medium mb-3">
            {profileImage ? `Selected: ${fileName}` : "Tap to upload photo"}
          </p>

          <CardTitle>Register to sign In</CardTitle>
          <CardDescription>Enter your details below</CardDescription>
          <CardAction>
            <div className="flex items-center gap-1 mt-2">
              <p className="text-sm text-gray-600">Already have an account?</p>
              <Link to="/login">
                <Button variant="link" className="p-0 h-auto text-sm font-semibold">Sign In</Button>
              </Link>
            </div>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="userName" className="text-sm font-medium">UserName</Label>
                <Input
                  {...register("userName")}
                  id="userName"
                  type="text"
                  placeholder="john doe"
                  className="mt-1"
                />
                {errors.userName && <p className="text-xs text-red-500 mt-1">{errors.userName.message}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  className="mt-1"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
                <Input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  type="tel"
                  placeholder="9800000005"
                  maxLength={10}
                  className="mt-1"
                />
                {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
            {registerMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {registerMutation.isPending ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}