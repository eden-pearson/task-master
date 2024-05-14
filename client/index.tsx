import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Auth0Provider } from '@auth0/auth0-react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

const queryClient = new QueryClient()
export const router = createBrowserRouter(routes)

const domain = process.env.REACT_APP_AUTH0_DOMAIN!
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI!
const audience = process.env.REACT_APP_AUTH0_AUDIENCE!

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
