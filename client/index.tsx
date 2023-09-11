import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Auth0Provider } from '@auth0/auth0-react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './Routes'

const queryClient = new QueryClient()
export const router = createBrowserRouter(routes)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="mako-2023-eden.au.auth0.com"
      clientId="eczwHXmWpQ6y9wF75nDHXrECrr0FA6wu"
      redirectUri={window.location.origin}
      audience="https://taskmaster/api"
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
