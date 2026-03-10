import { useState, useEffect } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import {  Clock, Loader2 } from "lucide-react"
import { useVerifyOtp } from "../../globals/hooks/Auth/useVerifyotp"
import { useAppSelector } from "../../store/hooks"
import type { User } from "../../globals/types/authTypes"

export function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(120) 
  console.log("this is otp",otp)

  const verifyOtpMutation = useVerifyOtp()



  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const {user} = useAppSelector((state)=>state.auth) 

  const data = {
    email:(user as User)?.email as string,
    otp
  }
  console.log("this is ddata form the state",user)
  const handlSendOtp = ()=>{
    verifyOtpMutation.mutate(data)
  }

  useEffect(() => {
    // Only start if there's remaining time
    if (timeLeft <= 0) return
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">OTP Code</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                >
                  <InputOTPGroup className="gap-2">
                    <InputOTPSlot
                      index={0}
                      className="h-12 w-12 text-lg font-semibold"
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-12 w-12 text-lg font-semibold"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-12 w-12 text-lg font-semibold"
                    />
                    <InputOTPSlot
                      index={3}
                      className="h-12 w-12 text-lg font-semibold"
                    />
                    <InputOTPSlot
                      index={4}
                      className="h-12 w-12 text-lg font-semibold"
                    />
                    <InputOTPSlot
                      index={5}
                      className="h-12 w-12 text-lg font-semibold"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>
                Expires in: <span className="font-semibold text-gray-900">{minutes}:{seconds.toString().padStart(2, '0')}</span>
              </span>
            </div>

            {/* Resend Option */}
            <div className="text-center text-sm text-gray-600">
              <p>
                Didn't receive the code?{" "}
                <button
                  
                  className="font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        
      </CardContent>

      <CardFooter className="flex-col gap-2">
          <>
            <Button
              onClick={handlSendOtp}
              className="w-full"
              disabled ={verifyOtpMutation.isPending}
            >
          {verifyOtpMutation.isPending && (
            <Loader2 className="w-4 h-4 animate-spin" />
          )}
          {verifyOtpMutation.isPending ? "Verifying...":"Verify"}
            </Button>
            <p className="text-xs text-center text-gray-500">
              OTP consists of 6 digits
            </p>
          </>
      
      </CardFooter>
    </Card>
  )
}
