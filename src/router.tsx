import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { getContext } from './integrations/tanstack-query/root-provider'

export function getRouter() {
 const context = getContext()

 const router = createTanStackRouter({
 routeTree,
  context,
  scrollRestoration: true,
  // Cross-fade between pages (View Transitions API; ignored where unsupported).
  defaultViewTransition: true,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: () => <p>Not Found</p>,
  })

 setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

 return router
}

declare module '@tanstack/react-router' {
 interface Register {
 router: ReturnType<typeof getRouter>
 }
}
