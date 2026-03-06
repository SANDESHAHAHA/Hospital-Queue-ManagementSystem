import { createFileRoute } from '@tanstack/react-router'
import Feed from '../../pages/Feed/feed'

export const Route = createFileRoute('/home/feed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Feed />
}
