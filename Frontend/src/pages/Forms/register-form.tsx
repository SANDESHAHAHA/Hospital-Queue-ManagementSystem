import { Link } from "@tanstack/react-router"
import { Button } from "../../components/ui/button"
import { Loader2 } from "lucide-react"

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
import { Eye, EyeOff, Upload, X } from "lucide-react"
import { useState, type ChangeEvent } from "react"
import type { RegisterUserData } from "../../globals/types/authTypes"
import { useRegister } from "../../globals/hooks/useRegister"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")

  const [data,setData] = useState<RegisterUserData>({
    userName:"",
    password:"",
    phoneNumber:"",
    email:"",
  })

  const registerMutation = useRegister()


  const clearImage = () => {
    setProfileImage(null)
    setFileName("")
  }
 const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
  
    const file = e.target.files?.[0]

    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }

  const {name,value} = e.target

  setData({
    ...data,
    [name]: name === "image" ? e.target.files &&  e.target.files[0] as File : value

  })
 }

const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault()
  registerMutation.mutate(data)
 }

  return (
    <form onSubmit={handleSubmit}>
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
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer">
              <div className="w-28 h-28 rounded-full border-4 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <div className="flex flex-col items-center gap-1">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <Input
                id="profile-image"
                name="image"
                type="file"
                required
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <p className="text-xs text-gray-600 font-medium mb-3">
          {profileImage ? `Selected: ${fileName}` : "Tap to upload photo"}
        </p>

        <CardTitle>Register to sign In</CardTitle>
        <CardDescription>
          Enter your details below
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-1 mt-2">
            <p className="text-sm text-gray-600">
              Already have an account?
            </p>
            <Link to="/login">
            <Button variant="link" className="p-0 h-auto text-sm font-semibold">
              Sign In
            </Button>
            </Link>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
          <div className="flex flex-col gap-5">
            {/* User Information */}
            <div className="grid gap-4">
              <div>
                <Label htmlFor="username" className="text-sm font-medium">
                  UserName
                </Label>
                <Input
                  id="username"
                  name="userName"
                  onChange={handleChange}
                  type="text"
                  placeholder="john doe"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="PhoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder="9800000005"
                  onChange={handleChange}
                  minLength={10}
                  maxLength={10}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs text-blue-600 underline-offset-4 hover:underline"
                >
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  onChange={handleChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="pr-10"
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
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
          {registerMutation.isPending && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {registerMutation.isPending ? "Registering...":"Register"}
        </Button>
      </CardFooter>
    </Card>
  </form>

  )
}
