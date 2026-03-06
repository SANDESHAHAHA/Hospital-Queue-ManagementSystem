import { createFileRoute } from '@tanstack/react-router'
import AdminDashboard from '../../pages/Admin/adminPage'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminDashboard />
}
