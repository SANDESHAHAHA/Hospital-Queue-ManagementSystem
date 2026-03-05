import { useState } from "react"
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
import { CheckCircle, Clock } from "lucide-react"

export function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120) // 5 minutes

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true)
      // Simulate API call
      setTimeout(() => {
        setIsVerifying(false)
        setIsVerified(true)
      }, 1500)
    }
  }

  const handleResendOTP = () => {
    setOtp("")
    setIsVerified(false)
    setTimeLeft(300)
    // Add your resend OTP logic here
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {isVerified ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                Email verified!
              </p>
              <p className="text-sm text-gray-600">
                Your email has been successfully verified
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">OTP Code</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={isVerifying}
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
                  onClick={handleResendOTP}
                  className="font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2">
        {isVerified ? (
          <Button className="w-full">Continue</Button>
        ) : (
          <>
            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6 || isVerifying}
              className="w-full"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>
            <p className="text-xs text-center text-gray-500">
              OTP consists of 6 digits
            </p>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
