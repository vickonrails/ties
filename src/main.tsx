import { RootRoute, Route, Router, RouterProvider, redirect } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Root from './app/root'

import { supabase } from './core/supabase'
import ConnectionDetails from './pages/connection-details'

import './index.css'
import Auth from './pages/auth'
import Connections from './pages/connections'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// How to do 404 page in Tanstack router
// How to do authentication in Tanstack router

async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// API calls
// post loaders
// loader clients
// router context

const rootRoute = new RootRoute({
  component: Root,
})

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth
})

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'app',
  beforeLoad: async () => {
    if (!await isAuthenticated()) {
      throw redirect({
        to: '/auth',
        // search: {
        //   // Use the current location to power a redirect after login
        //   // (Do not use `router.state.resolvedLocation` as it can
        //   // potentially lag behind the actual current location)
        //   redirect: router.state.location.href,
        // },
      })
    }
  },
})

const appIndexRoute = new Route({
  path: '/',
  getParentRoute: () => appRoute,
  component: Connections,
})

type Params = {
  connectionId: string
}

export type RouteProps = {
  params: Params
}

const connectionDetails = new Route({
  getParentRoute: () => appRoute,
  path: '$connectionId',
  // TODO: fix the correct types here
  // @ts-ignore
  loader: async ({ params }: RouteProps) => {
    const connection = ((await supabase.from('connection').select().eq('id', params.connectionId)))

    return {
      connection: connection?.data?.[0]
    }
  },
  component: ConnectionDetails,
})

const routeTree = rootRoute.addChildren([
  authRoute,
  appRoute.addChildren([appIndexRoute, connectionDetails])
])

const router = new Router({ routeTree })

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
