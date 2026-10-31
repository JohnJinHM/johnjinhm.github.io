'use client'

import { usePathname } from 'next/navigation'
import { routeFromPathname } from '@/data/routes'

// Re-mounts the page on a route switch so the content fades in while the grids pan.
export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const route = routeFromPathname(usePathname())
  return (
    <div key={route} className="enter">
      {children}
    </div>
  )
}
