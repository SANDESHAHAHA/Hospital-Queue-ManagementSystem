import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { Provider } from 'react-redux'
import store from './store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./index.css"

import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
  if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  const queryClient = new QueryClient()
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </StrictMode>,
  )
}