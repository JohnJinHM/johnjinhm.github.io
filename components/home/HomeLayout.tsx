'use client'

import { routeMeta, Route } from '@/data/routes'
import { localizedExperiences, routeText, ui } from '@/data/i18n'
import type { SocialIconKind } from '@/components/social-icons'
import { useLocale } from '@/components/LocaleProvider'
import Timeline from './Timeline'

const socialLabels: Record<SocialIconKind, string> = {
  mail: 'Email',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  bluesky: 'Bluesky',
  x: 'X',
  twitter: 'Twitter',
  facebook: 'Facebook',
  youtube: 'YouTube',
  mastodon: 'Mastodon',
  threads: 'Threads',
  medium: 'Medium',
}

export default function HomeLayout({ route }: { route: Route }) {
  const { locale } = useLocale()
  const t = ui[locale]
  const text = routeText[locale][route]
  const { socials } = routeMeta[route]
  const role = [text.occupation, text.company].filter(Boolean).join(' · ')

  return (
    <div className="flex min-h-[min(calc(100svh-5rem),48rem)] flex-col">
      <div className="pt-10 md:pt-16">
        <h1 className="font-display text-[length:var(--text-display)] leading-[var(--leading-tight)] font-black tracking-[-0.035em]">
          {text.name}
        </h1>
        {role && (
          <p className="font-display mt-4 text-[length:var(--text-lg)] font-medium">{role}</p>
        )}
        <p className="mt-6 max-w-[var(--measure)]">{text.homeIntro}</p>
        <ul className="font-display mt-6 flex flex-wrap gap-x-8 gap-y-3 font-bold">
          {socials.map((social) => (
            <li key={`${social.kind}-${social.href}`}>
              <a
                href={social.href}
                className="link-fill"
                {...(social.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {socialLabels[social.kind]}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto pt-16 pb-4">
        <Timeline
          experiences={localizedExperiences[locale][route]}
          label={t.experience}
          presentLabel={t.present}
        />
      </div>
    </div>
  )
}
