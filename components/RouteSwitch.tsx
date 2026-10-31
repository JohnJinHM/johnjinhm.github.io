'use client'

import { usePathname } from 'next/navigation'
import { routeFromPathname, routes } from '@/data/routes'
import { routeText, ui } from '@/data/i18n'
import Link from './Link'
import { useLocale } from './LocaleProvider'

// Both routes side by side; the current one carries the accent.
export default function RouteSwitch({
  className = '',
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const route = routeFromPathname(usePathname())
  const { locale } = useLocale()

  return (
    <div className={`font-display gap-4 font-bold tracking-[0.02em] ${className}`}>
      {routes.map((r) => {
        const label = routeText[locale][r].label
        return (
          <Link
            key={r}
            href={`/${r}`}
            onClick={onNavigate}
            aria-current={r === route ? 'true' : undefined}
            aria-label={r === route ? label : ui[locale].switchTo(label)}
            className="text-ink-3 hover:text-ink aria-[current=true]:text-accent transition-colors duration-[var(--dur-fast)]"
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
