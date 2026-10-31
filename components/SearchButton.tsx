'use client'

import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import siteMetadata from '@/data/siteMetadata'
import { ui } from '@/data/i18n'
import { useLocale } from './LocaleProvider'

const SearchButton = () => {
  const { locale } = useLocale()
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <SearchButtonWrapper
        aria-label={ui[locale].search}
        className="text-ink-2 hover:text-ink flex items-center gap-2 transition-colors duration-[var(--dur-fast)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          strokeLinecap="round"
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <kbd className="border-rule text-ink-3 hidden rounded-[var(--radius)] border px-1.5 font-mono text-[11px] leading-5 lg:inline">
          ⌘K
        </kbd>
      </SearchButtonWrapper>
    )
  }
  return null
}

export default SearchButton
