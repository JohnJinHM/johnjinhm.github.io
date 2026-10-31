'use client'

import { Dialog, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import { ui } from '@/data/i18n'
import Link from './Link'
import RouteSwitch from './RouteSwitch'
import { useNavItems } from './Header'
import { useLocale } from './LocaleProvider'

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const { locale } = useLocale()
  const t = ui[locale]
  const items = useNavItems()
  const close = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        aria-label={t.openMenu}
        onClick={() => setOpen(true)}
        className="text-ink-2 hover:text-ink -mr-1 p-1 md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <Dialog open={open} onClose={close} className="relative z-60 md:hidden">
        <DialogPanel
          transition
          className="bg-ground fixed inset-0 flex flex-col px-4 transition duration-[var(--dur-base)] ease-[var(--ease-out)] data-closed:translate-y-2 data-closed:opacity-0 sm:px-8"
        >
          <div className="flex h-20 items-center justify-end">
            <button
              type="button"
              aria-label={t.closeMenu}
              onClick={close}
              className="text-ink-2 hover:text-ink -mr-1 p-1"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Main" className="mt-4 flex flex-col">
            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={close}
                aria-current={item.current ? 'page' : undefined}
                className="font-display border-rule text-ink-2 aria-[current=page]:text-ink border-b py-4 text-[length:var(--text-xl)] font-bold aria-[current=page]:underline aria-[current=page]:decoration-[var(--accent)] aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <RouteSwitch onNavigate={close} className="mt-8 flex text-[length:var(--text-lg)]" />
        </DialogPanel>
      </Dialog>
    </>
  )
}

export default MobileNav
