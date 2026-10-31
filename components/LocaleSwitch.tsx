'use client'

import { useLocale } from './LocaleProvider'
import { ui } from '@/data/i18n'

const LocaleSwitch = () => {
  const { locale, setLocale } = useLocale()
  const next = locale === 'en' ? 'zh' : 'en'

  return (
    <button
      type="button"
      aria-label={ui[locale].localeSwitchLabel}
      onClick={() => setLocale(next)}
      className="text-ink-2 hover:text-ink font-display flex h-7 min-w-7 items-center justify-center font-bold transition-colors duration-[var(--dur-fast)]"
    >
      {next === 'zh' ? '中' : 'EN'}
    </button>
  )
}

export default LocaleSwitch
