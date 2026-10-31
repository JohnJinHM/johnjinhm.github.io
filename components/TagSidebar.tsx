'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import { Route } from '@/data/routes'
import tagData from 'app/tag-data.json'

const TagSidebar = ({ route }: { route: Route }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const tagCounts = (tagData as Record<string, Record<string, number>>)[route] || {}
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = decodeURI(pathname.split('/tags/')[1] || '').replace(/\/.*$/, '')
  const close = () => setOpen(false)
  const rowClass =
    'flex items-baseline justify-between py-2 text-ink-2 hover:text-ink aria-[current=page]:text-accent transition-colors'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
        Tags
      </button>

      <Dialog open={open} onClose={close} className="relative z-50">
        <div className="fixed inset-0 bg-[oklch(0_0_0/0.5)]" aria-hidden="true" />
        <DialogPanel
          transition
          className="bg-ground border-rule fixed top-0 right-0 flex h-full w-[min(320px,85vw)] flex-col overflow-auto border-l px-6 pb-8 transition duration-[var(--dur-base)] ease-[var(--ease-out)] data-closed:translate-x-4 data-closed:opacity-0"
        >
          <div className="flex h-20 items-center justify-between">
            <DialogTitle className="font-display text-[length:var(--text-lg)] font-bold">
              Tags
            </DialogTitle>
            <button
              type="button"
              onClick={close}
              aria-label="Close tags"
              className="text-ink-2 hover:text-ink -mr-1 p-1"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <ul className="divide-rule font-display divide-y text-[length:var(--text-ui)]">
            <li>
              <Link
                href={`/${route}/blog`}
                onClick={close}
                aria-current={pathname.replace(/\/$/, '') === `/${route}/blog` ? 'page' : undefined}
                className={`${rowClass} font-bold`}
              >
                All posts
              </Link>
            </li>
            {sortedTags.map((t) => (
              <li key={t}>
                <Link
                  href={`/${route}/tags/${slug(t)}`}
                  onClick={close}
                  aria-current={activeTag === slug(t) ? 'page' : undefined}
                  aria-label={`View posts tagged ${t}`}
                  className={rowClass}
                >
                  <span>{t}</span>
                  <span className="meta">{tagCounts[t]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </DialogPanel>
      </Dialog>
    </>
  )
}

export default TagSidebar
