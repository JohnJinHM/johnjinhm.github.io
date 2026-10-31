'use client'

import { usePathname } from 'next/navigation'
import { routeFromPathname } from '@/data/routes'

// Sets data-route, which selects the route accent in css/tokens.css.
export default function RouteAccent({ children }: { children: React.ReactNode }) {
  const route = routeFromPathname(usePathname())
  return <div data-route={route}>{children}</div>
}
