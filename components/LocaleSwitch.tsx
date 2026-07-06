'use client'

import { useLocale } from './LocaleProvider'
import { ui } from '@/data/i18n'

const LocaleSwitch = () => {
  const { locale, setLocale } = useLocale()
  const next = locale === 'en' ? 'zh' : 'en'

  return (
    <button
      aria-label={ui[locale].localeSwitchLabel}
      onClick={() => setLocale(next)}
      className="hover:text-primary-500 dark:hover:text-primary-400 flex h-6 min-w-6 items-center justify-center text-sm font-semibold text-gray-900 dark:text-gray-100"
    >
      {next === 'zh' ? '中' : 'EN'}
    </button>
  )
}

export default LocaleSwitch
