import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
        <div className='flex justify-center items-center w-full min-h-screen'>
      <Outlet />
        </div>
    </React.Fragment>
  )
}
