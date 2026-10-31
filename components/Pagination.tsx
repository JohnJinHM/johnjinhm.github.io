'use client'

import { usePathname } from 'next/navigation'
import Link from './Link'
import Arrow from './Arrow'

export interface PaginationProps {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <nav
      aria-label="Pagination"
      className="border-rule font-display mt-8 flex items-center justify-between border-t pt-6 text-[length:var(--text-ui)] font-bold"
    >
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className="link-fill"
        >
          <Arrow direction="left" /> Newer
        </Link>
      ) : (
        <span className="text-ink-3 opacity-60" aria-disabled="true">
          <Arrow direction="left" /> Newer
        </span>
      )}
      <span className="meta">
        Page {currentPage} of {totalPages}
      </span>
      {nextPage ? (
        <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next" className="link-fill">
          Older <Arrow direction="right" />
        </Link>
      ) : (
        <span className="text-ink-3 opacity-60" aria-disabled="true">
          Older <Arrow direction="right" />
        </span>
      )}
    </nav>
  )
}
