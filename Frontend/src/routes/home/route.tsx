import { createFileRoute, Outlet } from '@tanstack/react-router'
import Navbar from '../../pages/UserHomePage/Navbar/navbar'

export const Route = createFileRoute('/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Navbar at top - full width */}
      <div className="shrink-0 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Main content - takes remaining space, full width */}
      <main className="flex-1 overflow-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
