import { createFileRoute } from '@tanstack/react-router'
import Home from '../../pages/UserHomePage/Home/homepage'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Home />
}
