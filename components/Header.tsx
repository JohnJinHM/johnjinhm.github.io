'use client'

import { usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import navLinks from '@/data/headerNavLinks'
import { otherRoute, routeFromPathname } from '@/data/routes'
import { routeText, ui } from '@/data/i18n'
import Logo from '@/data/logo.svg'
import Link from './Link'
import RouteSwitchLink from './RouteSwitchLink'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LocaleSwitch from './LocaleSwitch'
import SearchButton from './SearchButton'
import { useLocale } from './LocaleProvider'

const Header = () => {
  const pathname = usePathname()
  const route = routeFromPathname(pathname)
  const next = otherRoute(route)
  const { locale } = useLocale()
  const t = ui[locale]

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href={`/${route}`} aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {navLinks(route)
            .filter((link) => link.href !== `/${route}`)
            .map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
              >
                {t.nav[link.key]}
              </Link>
            ))}
        </div>
        <RouteSwitchLink
          href={`/${next}`}
          className="border-primary-500 text-primary-500 hover:bg-primary-500 hidden rounded-full border px-3 py-1 text-sm font-medium hover:text-white sm:block"
          aria-label={t.switchTo(routeText[locale][next].label)}
        >
          {routeText[locale][next].label}
        </RouteSwitchLink>
        <SearchButton />
        <LocaleSwitch />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
