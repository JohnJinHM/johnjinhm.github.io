'use client'

import { usePathname } from 'next/navigation'
import navLinks from '@/data/headerNavLinks'
import { routeFromPathname } from '@/data/routes'
import { routeText, ui } from '@/data/i18n'
import Link from './Link'
// import RouteSwitch from './RouteSwitch' // temporarily hidden
import MobileNav from './MobileNav'
import LocaleSwitch from './LocaleSwitch'
import SearchButton from './SearchButton'
import { useLocale } from './LocaleProvider'

export function useNavItems() {
  const pathname = usePathname()
  const route = routeFromPathname(pathname)
  const { locale } = useLocale()
  const text = routeText[locale][route]
  const labels = {
    home: ui[locale].nav.home,
    experience: ui[locale].nav.experience,
    blog: text.blogTitle,
    photos: text.photosTitle,
    tags: ui[locale].nav.tags,
  }
  return navLinks(route).map((link) => ({
    ...link,
    label: labels[link.key],
    current:
      link.key === 'home'
        ? pathname.replace(/\/$/, '') === link.href
        : pathname.startsWith(link.href),
  }))
}

const Header = () => {
  const pathname = usePathname()
  const route = routeFromPathname(pathname)
  const { locale } = useLocale()
  const items = useNavItems()
  // With only a couple of links the menu button costs more than it saves; show them inline.
  const collapse = items.length > 2

  return (
    <header className="flex h-20 items-center justify-between gap-6">
      <Link
        href={`/${route}`}
        className="font-display text-ink text-[length:var(--text-ui)] font-black tracking-[0.04em] uppercase"
      >
        {routeText[locale][route].name}
      </Link>
      <nav
        aria-label="Main"
        className="flex items-center gap-5 text-[length:var(--text-ui)] lg:gap-8"
      >
        <div
          className={`${collapse ? 'hidden lg:flex' : 'flex'} items-center gap-5 sm:gap-6 lg:gap-8`}
        >
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className="text-ink-2 hover:text-ink aria-[current=page]:text-ink py-1 transition-colors duration-[var(--dur-fast)] aria-[current=page]:shadow-[inset_0_-2px_0_var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <SearchButton />
        <LocaleSwitch />
        {/* Route switch temporarily hidden; /casual is still built and reachable by URL. */}
        {/* <RouteSwitch className="hidden lg:flex" /> */}
        {collapse && <MobileNav />}
      </nav>
    </header>
  )
}

export default Header
