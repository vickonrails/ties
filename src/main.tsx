import React from 'react'
import ReactDOM from 'react-dom/client'
import { RootRoute, Route, Router, RouterProvider, redirect } from '@tanstack/react-router'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Auth from './app/auth'
import Index from './app/index'
import Root from './app/root'

import './index.css'
import { supabase } from './core/supabase'

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

const rootRoute = new RootRoute({
  component: Root,
})

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth,
})

const appRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'app',
  beforeLoad: async () => {
    console.log(`Calling from index route`)
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
  component: Index,
})

const friendDetails = new Route({
  getParentRoute: () => appRoute,
  path: '$friend',
  component: Friend
})

function Friend() {
  return <p>Friend</p>
}

const routeTree = rootRoute.addChildren([
  authRoute,
  appRoute.addChildren([appIndexRoute, friendDetails])
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
