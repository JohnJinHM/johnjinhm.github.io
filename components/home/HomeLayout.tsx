'use client'

import { routeMeta, Route } from '@/data/routes'
import { localizedExperiences, routeText, ui } from '@/data/i18n'
import type { SocialIconKind } from '@/components/social-icons'
import { useLocale } from '@/components/LocaleProvider'
import Link from '@/components/Link'
import Image from '@/components/Image'
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
  const { socials, avatar, avatarFocus } = routeMeta[route]
  const role = [text.occupation, text.company].filter(Boolean).join(' · ')

  return (
    <div className="flex min-h-[min(calc(100svh-5rem),48rem)] flex-col">
      {/*
        Below xl the portrait is a small square above the name, zoomed on the face. From xl it
        sits in a reserved right-hand column, pinned to the text row's top (the name's cap
        height) and bottom (the link row); aspect-square derives its width from that height, so
        it stays square and aligned whatever the copy length or locale. The column is wider
        than the tallest measured text block, so the square never reaches the text.
      */}
      <div className="grid gap-6 pt-10 md:pt-16 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-x-16 xl:gap-y-0">
        <div className="relative xl:col-start-2 xl:row-start-1 xl:mt-[calc(var(--text-display)*0.1)]">
          <div className="border-rule relative aspect-square w-24 overflow-hidden rounded-[var(--radius)] border sm:w-32 xl:absolute xl:inset-y-0 xl:right-0 xl:w-auto">
            <Image
              src={avatar}
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 320px, (min-width: 640px) 128px, 96px"
              className="scale-150 object-cover xl:scale-100"
              style={{ objectPosition: avatarFocus, transformOrigin: avatarFocus }}
            />
          </div>
        </div>
        <div className="min-w-0 xl:col-start-1 xl:row-start-1">
          <h1 className="font-display text-[length:var(--text-display)] leading-[var(--leading-tight)] font-black tracking-[-0.035em]">
            {text.name}
          </h1>
          {role && (
            <p className="font-display mt-4 text-[length:var(--text-base)] font-medium sm:text-[length:var(--text-lg)]">
              {role}
            </p>
          )}
          <p className="mt-6 max-w-[var(--measure)]">{text.homeIntro}</p>
          <ul className="font-display mt-8 flex flex-wrap gap-x-5 gap-y-3 font-bold sm:gap-x-8">
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
            <li>
              <Link href={`/${route}/experience`} className="link-fill">
                {t.experience}
              </Link>
            </li>
          </ul>
        </div>
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
