'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { routeFromPathname } from '@/data/routes'

const WARP_MS = 600

// Pages that hold a reading column get quieter grids.
const isReadingPage = (pathname: string) => /^\/(blog|photos)\//.test(pathname)

/**
 * The two grid planes behind every page (styles in css/scene.css). Feeds pointer
 * and scroll position to the planes as CSS variables, and pans them quickly when
 * the route changes.
 */
export default function Scene() {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const route = routeFromPathname(pathname)
  const lastRoute = useRef(route)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let px = 0
    let py = 0

    const flush = () => {
      frame = 0
      el.style.setProperty('--scene-px', px.toFixed(3))
      el.style.setProperty('--scene-py', py.toFixed(3))
      el.style.setProperty('--scene-scroll', String(Math.round(window.scrollY)))
    }
    const queue = () => {
      if (!frame && !reduce.matches) frame = requestAnimationFrame(flush)
    }
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      px = (e.clientX / window.innerWidth) * 2 - 1
      py = (e.clientY / window.innerHeight) * 2 - 1
      queue()
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', queue, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', queue)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || lastRoute.current === route) return
    lastRoute.current = route
    el.setAttribute('data-warp', '')
    const timer = window.setTimeout(() => el.removeAttribute('data-warp'), WARP_MS)
    return () => window.clearTimeout(timer)
  }, [route])

  return (
    <div
      ref={ref}
      className="scene scene-backdrop"
      data-calm={isReadingPage(pathname) ? '' : undefined}
      aria-hidden="true"
    >
      <div className="scene-grid scene-grid-far" />
      <div className="scene-grid scene-grid-near" />
    </div>
  )
}
