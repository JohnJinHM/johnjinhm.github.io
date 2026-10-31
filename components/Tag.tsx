'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { Route, routeFromPathname } from '@/data/routes'

interface Props {
  text: string
  route?: Route
  count?: number
  current?: boolean
}

const Tag = ({ text, route, count, current }: Props) => {
  const pathname = usePathname()
  const activeRoute = route ?? routeFromPathname(pathname)
  return (
    <Link
      href={`/${activeRoute}/tags/${slug(text)}`}
      aria-current={current ? 'page' : undefined}
      className="border-rule text-ink-2 hover:text-ink aria-[current=page]:bg-accent-soft aria-[current=page]:text-ink inline-flex items-baseline gap-1.5 rounded-[var(--radius)] border px-2 py-0.5 text-[length:var(--text-xs)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--accent)] aria-[current=page]:border-[var(--accent)]"
    >
      {text.split(' ').join('-')}
      {count !== undefined && <span className="text-ink-3 tabular-nums">{count}</span>}
    </Link>
  )
}

export default Tag
