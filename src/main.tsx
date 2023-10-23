import React from 'react'
import ReactDOM from 'react-dom/client'
import { RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Auth from './app/auth'
import Index from './app/index'
import Root from './app/root'

import './index.css'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootRoute = new RootRoute({
  component: Root,
})

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Auth,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

const routeTree = rootRoute.addChildren([authRoute, indexRoute])

const router = new Router({ routeTree })

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
