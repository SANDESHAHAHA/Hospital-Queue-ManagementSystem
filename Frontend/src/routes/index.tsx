import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '../pages/UserHomePage/Landing_page/landing-page'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LandingPage />
}
