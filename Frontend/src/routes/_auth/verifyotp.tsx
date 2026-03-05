import { createFileRoute } from '@tanstack/react-router'
import { VerifyOtp } from '../../pages/verify-otp/verifyOtp'

export const Route = createFileRoute('/_auth/verifyotp')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VerifyOtp />
}
